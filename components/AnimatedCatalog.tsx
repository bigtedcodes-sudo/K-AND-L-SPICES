'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import {
  Flame,
  ShoppingBag,
  Send,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sprout,
} from 'lucide-react';
import { CATALOG, ProductSKU, getProductImages } from '@/data/catalog';
import { getLocalizedProduct } from '@/data/catalogI18n';
import { useCart } from '@/lib/cartStore';
import { useLanguage } from '@/lib/i18n';
import { useCurrency } from '@/lib/currencyStore';
import { buildSingleItemOrderUrl } from '@/lib/whatsapp';

type CategoryFilter = 'All' | 'Signature Blends' | 'Pure Powders' | 'Bulk & Export';

interface ProductCardProps {
  product: ProductSKU;
  index: number;
  onSelectProduct?: (product: ProductSKU) => void;
  onAddToCart: (product: ProductSKU, e: React.MouseEvent) => void;
  onDirectWhatsApp: (product: ProductSKU, e: React.MouseEvent) => void;
  isRecentlyAdded: boolean;
}

function ProductCard({
  product,
  index,
  onSelectProduct,
  onAddToCart,
  onDirectWhatsApp,
  isRecentlyAdded,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const { t, language } = useLanguage();
  const { formatPrice, isHydrated } = useCurrency();
  const localized = getLocalizedProduct(product, language);
  const isB2B = localized.category === 'Bulk & Export' || localized.price === null;

  const slides = getProductImages(localized);
  const hasMultipleSlides = slides.length > 1;
  const activeSlide = slides[slideIdx % slides.length];

  const handleCycleSlide = (delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIdx((prev) => (prev + delta + slides.length) % slides.length);
  };

  // Track card's vertical passage through viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Calculate rhythmic parallax based on grid column position (0, 1, 2)
  const colIndex = index % 3;
  const parallaxDirection = colIndex === 1 ? -1 : 1;
  const parallaxAmount = 14;

  // Kinetic scroll-driven transforms
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxAmount * parallaxDirection, -parallaxAmount * parallaxDirection]
  );
  const rawRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [-10 * parallaxDirection, 10 * parallaxDirection]
  );
  const rawImageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1.04, 0.97]);
  const rawImageY = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  // Spring physics smoothing for luxurious inertial fluidity
  const smoothY = useSpring(rawY, { stiffness: 120, damping: 24 });
  const smoothRotate = useSpring(rawRotate, { stiffness: 100, damping: 22 });
  const smoothScale = useSpring(rawImageScale, { stiffness: 120, damping: 24 });
  const smoothImageY = useSpring(rawImageY, { stiffness: 120, damping: 24 });

  const displayPrice =
    isB2B || localized.price === null
      ? localized.priceDisplay
      : isHydrated
      ? formatPrice(localized.price)
      : localized.priceDisplay;

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelectProduct && onSelectProduct(localized)}
      className="group relative bg-[#FCF9F4] rounded-3xl p-5 sm:p-6 pt-21 border border-[#E7DAC8]/90 shadow-[0_8px_28px_-12px_rgba(53,22,14,0.08)] hover:shadow-[0_18px_38px_-12px_rgba(53,22,14,0.16)] hover:border-[#2C5E3B]/35 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Floating Parallax Platter with Per-Product Photo Carousel */}
      <motion.div
        style={{
          y: smoothY,
          rotate: smoothRotate,
        }}
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full p-1.5 bg-[#FAF4E8] border-2 border-[#E7DAC8] shadow-[0_20px_40px_-10px_rgba(53,22,14,0.32)] group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-300 z-10 will-change-transform"
      >
        <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner bg-[radial-gradient(circle_at_center,#FAF4E8_0%,#EFE5D4_72%,#E4D5BF_100%)]">
          <motion.div
            style={{
              scale: smoothScale,
              y: smoothImageY,
            }}
            className={`w-full h-full relative will-change-transform flex items-center justify-center ${
              activeSlide.backdrop === 'cutout' ? 'p-2.5' : ''
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeSlide.url}
                src={activeSlide.url}
                alt={`${localized.name} — ${activeSlide.label}`}
                referrerPolicy="no-referrer"
                initial={{ opacity: 0.4, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.4 }}
                transition={{ duration: 0.22 }}
                className={
                  activeSlide.backdrop === 'cutout'
                    ? 'w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500'
                    : 'w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                }
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10 pointer-events-none" />
          </motion.div>
        </div>

        {/* Per-Product Angle Arrows */}
        {hasMultipleSlides && (
          <>
            <button
              type="button"
              onClick={(e) => handleCycleSlide(-1, e)}
              aria-label={`Previous photo for ${localized.name}`}
              className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF4E8] border border-[#E7DAC8] text-[#35160E] hover:bg-[#2C5E3B] hover:text-[#FAF4E8] hover:border-[#2C5E3B] shadow-md flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-20"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={(e) => handleCycleSlide(1, e)}
              aria-label={`Next photo for ${localized.name}`}
              className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF4E8] border border-[#E7DAC8] text-[#35160E] hover:bg-[#2C5E3B] hover:text-[#FAF4E8] hover:border-[#2C5E3B] shadow-md flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all z-20"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Platter Slide Dot Indicators */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FAF4E8] border border-[#E7DAC8] shadow-xs z-20"
            >
              {slides.map((s, idx) => (
                <button
                  key={`${s.url}-${idx}`}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSlideIdx(idx);
                  }}
                  aria-label={`View ${s.label}`}
                  className={`h-1.5 rounded-full transition-all ${
                    slideIdx % slides.length === idx
                      ? 'w-3.5 bg-[#2C5E3B]'
                      : 'w-1.5 bg-[#35160E]/25 hover:bg-[#2C5E3B]/55'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* Card Content Top — Light, Airy & Scannable */}
      <div>
        {/* Packaging & Category Line */}
        <div className="flex items-center justify-between text-[11px] text-[#35160E]/55 mb-2">
          <span className="font-bold text-[#2C5E3B] uppercase tracking-wider font-montserrat">
            {localized.category}
          </span>
          <span>{localized.packaging}</span>
        </div>

        {/* Title & Single-Line Subtitle */}
        <h3 className="font-montserrat text-lg font-bold text-[#35160E] group-hover:text-[#6B1713] transition-colors leading-snug">
          {localized.name}
        </h3>
        <p className="text-xs text-[#35160E]/70 line-clamp-1 mt-1 mb-4">
          {localized.subtitle}
        </p>

        {/* Single Clean Heat + Agricultural Origin Row (No Tag Clutter) */}
        <div className="flex items-center justify-between gap-2 text-[11px] text-[#35160E]/75 mb-5">
          <span className="inline-flex items-center gap-1 font-medium">
            <Flame
              className={`w-3.5 h-3.5 shrink-0 ${
                localized.heatIndex > 0
                  ? 'text-[#6B1713] fill-[#6B1713]'
                  : 'text-[#E7DAC8]'
              }`}
            />
            <span>{localized.heatLabel}</span>
          </span>

          <span className="inline-flex items-center gap-1 text-[#2C5E3B] font-medium truncate">
            <Sprout className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{localized.origin.split(',')[0]}</span>
          </span>
        </div>
      </div>

      {/* Card Footer: Price & Direct Actions */}
      <div className="pt-4 border-t border-[#E7DAC8] flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <span className="block text-[10px] text-[#35160E]/60 uppercase tracking-widest font-semibold truncate">
            {isB2B ? t.catalog.commercial : t.catalog.standard}
          </span>
          <span className="text-base sm:text-lg font-bold text-[#35160E] tabular-nums font-montserrat block truncate">
            {displayPrice}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={(e) => onAddToCart(localized, e)}
            className="p-2 sm:p-2.5 rounded-xl border border-[#2C5E3B]/35 bg-[#EBF2EC]/65 hover:bg-[#2C5E3B] hover:text-[#FAF4E8] hover:border-[#2C5E3B] text-[#2C5E3B] transition-all shrink-0"
            title="Add to order bag"
          >
            {isRecentlyAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={(e) => onDirectWhatsApp(localized, e)}
            className="inline-flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl bg-[#6B1713] text-[#FAF4E8] hover:bg-[#55120F] text-xs font-semibold shadow-sm transition-all whitespace-nowrap shrink-0"
            title={isB2B ? t.catalog.quoteButton : t.catalog.orderButton}
          >
            <Send className="w-3.5 h-3.5 shrink-0" />
            <span>{isB2B ? t.catalog.quoteButton : t.catalog.orderButton}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function AnimatedCatalog({
  onSelectProduct,
}: {
  onSelectProduct?: (product: ProductSKU) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const { addItem, openSimulator } = useCart();
  const { t, language } = useLanguage();
  const { formatPrice, isHydrated } = useCurrency();

  const filteredProducts =
    activeCategory === 'All'
      ? CATALOG
      : CATALOG.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (category: CategoryFilter) => {
    setActiveCategory(category);
  };

  const handleAddToCart = (product: ProductSKU, e?: React.MouseEvent) => {
    e?.stopPropagation();
    addItem(product, 1);
    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 2000);
  };

  const handleDirectWhatsApp = (product: ProductSKU, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const unitDisplay =
      isHydrated && product.price !== null ? formatPrice(product.price) : undefined;
    const orderData = buildSingleItemOrderUrl(product, 1, language, unitDisplay, unitDisplay);
    openSimulator({
      url: orderData.url,
      rawText: orderData.rawText,
      title: `${t.catalog.orderButton}: ${product.name}`,
    });
  };

  const categoryTabLabels: { key: CategoryFilter; label: string }[] = [
    { key: 'All', label: t.catalog.filterAll },
    { key: 'Signature Blends', label: t.catalog.filterSignature },
    { key: 'Pure Powders', label: t.catalog.filterPowders },
    { key: 'Bulk & Export', label: t.catalog.filterBulk },
  ];

  return (
    <section id="catalog" className="py-20 md:py-28 bg-[#F4ECE0]/60 relative overflow-x-clip">
      {/* Subtle background ambient kinetic elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-10 w-96 h-96 rounded-full bg-[#E7DAC8]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-10 w-96 h-96 rounded-full bg-[#E7DAC8]/30 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs uppercase tracking-widest text-[#6B1713] font-bold font-montserrat block mb-2">
            {t.catalog.tagline}
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-bold text-[#35160E] tracking-tight">
            {t.catalog.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#35160E]/75 leading-relaxed">
            {t.catalog.description}
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex items-center justify-center">
            <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1.5 bg-[#FAF4E8] rounded-2xl border border-[#E7DAC8] shadow-sm max-w-full overflow-x-auto scrollbar-none">
              {categoryTabLabels.map((tab) => {
                const isActive = activeCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => handleCategoryChange(tab.key)}
                    className={`relative px-3 sm:px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-colors z-10 ${
                      isActive ? 'text-[#FAF4E8]' : 'text-[#35160E]/75 hover:text-[#2C5E3B]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCatalogPill"
                        className="absolute inset-0 bg-[#6B1713] rounded-xl z-[-1] shadow-sm"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Clean Scannable Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-8 pt-20 sm:pt-24"
        >
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onSelectProduct={onSelectProduct}
                onAddToCart={handleAddToCart}
                onDirectWhatsApp={handleDirectWhatsApp}
                isRecentlyAdded={recentlyAddedId === product.id}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Connected Media & Kitchen Discovery Bar */}
        <div className="mt-14 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#1D462B] to-[#275A37] text-[#FAF4E8] border border-[#2C5E3B] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#A8D5B5] font-montserrat block">
              {t.media.kicker}
            </span>
            <p className="text-sm sm:text-base font-bold text-[#FAF4E8] font-montserrat mt-0.5">
              {t.media.reelsHeading} · {t.media.recipesHeading}
            </p>
          </div>
          <Link
            href="/media"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#6B1713] hover:bg-[#55120F] text-[#FAF4E8] text-xs font-bold font-montserrat shadow-md transition-all whitespace-nowrap shrink-0"
          >
            <span>{t.nav.media}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
