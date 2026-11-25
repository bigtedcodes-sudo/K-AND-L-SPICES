'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, ShoppingBag, Send, ChevronLeft, ChevronRight, Sparkles, Check, Sprout, ZoomIn } from 'lucide-react';
import { CATALOG, getProductImages } from '@/data/catalog';
import { getLocalizedProduct } from '@/data/catalogI18n';
import { useCart } from '@/lib/cartStore';
import { useLanguage } from '@/lib/i18n';
import { useCurrency } from '@/lib/currencyStore';
import { buildSingleItemOrderUrl } from '@/lib/whatsapp';
import { ProductMacroLightbox } from '@/components/ProductMacroLightbox';

// Filter hero spices (Signature Blends)
const HERO_SPICES = CATALOG.filter((s) => s.isHero);

export function LuxuryHero() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [viewMode, setViewMode] = useState<'primary' | 'secondary'>('primary');
  const [addedNotice, setAddedNotice] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const { addItem, openSimulator } = useCart();
  const { t, language } = useLanguage();
  const { formatPrice, isHydrated } = useCurrency();

  const rawSpice = HERO_SPICES[selectedIndex];
  const currentSpice = getLocalizedProduct(rawSpice, language);
  const currentSlides = getProductImages(currentSpice);
  const activeSlide =
    viewMode === 'secondary' && currentSlides.length > 1
      ? currentSlides[1]
      : currentSlides[0];
  const displayPrice =
    currentSpice.price === null
      ? currentSpice.priceDisplay
      : isHydrated
      ? formatPrice(currentSpice.price)
      : currentSpice.priceDisplay;

  const stepAngle = 360 / HERO_SPICES.length;

  const handleSelectSpice = (index: number) => {
    const diff = index - selectedIndex;
    setRotationAngle((prev) => prev + diff * stepAngle);
    setSelectedIndex(index);
    setViewMode('primary');
  };

  const handleManualRotate = (direction: 'cw' | 'ccw') => {
    const nextIndex =
      direction === 'cw'
        ? (selectedIndex + 1) % HERO_SPICES.length
        : (selectedIndex - 1 + HERO_SPICES.length) % HERO_SPICES.length;
    handleSelectSpice(nextIndex);
  };

  const handleDirectWhatsAppBuy = () => {
    const orderData = buildSingleItemOrderUrl(currentSpice, 1, language, displayPrice, displayPrice);
    openSimulator({
      url: orderData.url,
      rawText: orderData.rawText,
      title: `${t.catalog.orderButton}: ${currentSpice.name}`,
    });
  };

  const handleAddToCart = () => {
    addItem(currentSpice, 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  return (
    <section
      id="tasting-stage"
      className="relative overflow-hidden pt-8 pb-14 sm:pt-10 sm:pb-16 md:py-16 bg-gradient-to-br from-[#1B4328] via-[#245634] to-[#183B23] text-[#FAF4E8]"
    >
      {/* Subtle warm ambient illumination behind the kinetic platter */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[#FAF4E8]/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-0 w-[420px] h-[420px] rounded-full bg-[#6B1713]/18 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <div className="inline-flex items-center gap-1.5 text-[#A8D5B5] text-[11px] font-semibold tracking-[0.18em] uppercase mb-3 font-montserrat">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.hero.kicker}</span>
          </div>
          <h1 className="font-montserrat text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF4E8] tracking-tight leading-[1.14] text-balance">
            {t.hero.title}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#FAF4E8]/80 max-w-xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>
        </div>

        {/* 2-Column Showcase: Minimal Platter (Left) & Flavor Studio Specs (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Column 1: Clean Rotating Platter Stage */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative w-full">
            {/* Viewport-contained Platter Container */}
            <div className="relative w-[240px] h-[240px] min-[390px]:w-[290px] min-[390px]:h-[290px] sm:w-[370px] sm:h-[370px] md:w-[410px] md:h-[410px] max-w-full flex items-center justify-center">
              {/* Quiet, fine-line circular halo */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-[#FAF4E8]/20 pointer-events-none"
              />

              {/* Central Inertial Spring Platter — Rotating Rim + Always-Upright Spice Studio Frame */}
              <div className="relative w-[210px] h-[210px] min-[390px]:w-[255px] min-[390px]:h-[255px] sm:w-[330px] sm:h-[330px] md:w-[365px] md:h-[365px] rounded-full p-2 sm:p-2.5 flex items-center justify-center select-none">
                {/* Rotating Earthenware Plate Rim (rolls tactilely while product photo stays upright) */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-[#FAF4E8] border border-[#E7DAC8] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.42)] pointer-events-none"
                  animate={{ rotate: rotationAngle }}
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 20,
                    mass: 0.8,
                  }}
                >
                  <div className="absolute inset-1.5 rounded-full border border-dashed border-[#D8C5AA]/75" />
                  <span className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#6B1713]/75" />
                </motion.div>

                {/* Upright Earthenware Plate Center (Never rotates upside down) */}
                <div
                  onClick={() => setLightboxOpen(true)}
                  title="Click to inspect in 3.5x Macro Studio Lightbox"
                  className="relative z-10 w-full h-full rounded-full overflow-hidden border-3 sm:border-4 border-[#FAF4E8] shadow-inner bg-[radial-gradient(circle_at_center,#FAF4E8_0%,#EFE5D4_70%,#E4D5BF_100%)] cursor-zoom-in group"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentSpice.id}-${viewMode}`}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.3 }}
                      className={`w-full h-full relative flex items-center justify-center ${
                        activeSlide?.backdrop === 'cutout' ? 'p-5 sm:p-8' : ''
                      }`}
                    >
                      <img
                        src={
                          viewMode === 'secondary' && currentSpice.secondaryImage
                            ? currentSpice.secondaryImage
                            : currentSpice.dishImage || '/images/jollof_dish.jpg'
                        }
                        alt={currentSpice.name}
                        referrerPolicy="no-referrer"
                        className={
                          activeSlide?.backdrop === 'cutout'
                            ? 'w-full h-full object-contain mix-blend-multiply drop-shadow-[0_12px_20px_rgba(53,22,14,0.16)]'
                            : 'w-full h-full object-cover rounded-full'
                        }
                      />
                      {/* Gentle ceramic glaze sheen overlay */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Subtle Macro Zoom hover cue */}
                  <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-[#FAF4E8] text-[10px] font-bold uppercase tracking-wider font-montserrat opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <ZoomIn className="w-3 h-3" />
                    <span>Macro Zoom</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Single Clean Blend Selector Row + Optional Angle Toggle */}
            <div className="mt-6 flex flex-col items-center gap-3 w-full">
              <div className="flex items-center gap-1.5 sm:gap-2 max-w-full">
                <button
                  onClick={() => handleManualRotate('ccw')}
                  className="p-2 rounded-full text-[#FAF4E8]/80 hover:text-white hover:bg-[#FAF4E8]/12 transition-colors shrink-0"
                  aria-label="Previous spice"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
                  {HERO_SPICES.map((spice, idx) => {
                    const localizedThumbnail = getLocalizedProduct(spice, language);
                    const isActive = selectedIndex === idx;
                    return (
                      <button
                        key={spice.id}
                        onClick={() => handleSelectSpice(idx)}
                        className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                          isActive
                            ? 'bg-[#6B1713] text-[#FAF4E8] shadow-md ring-1 ring-[#FAF4E8]/60'
                            : 'bg-[#FAF4E8]/10 text-[#FAF4E8]/85 hover:bg-[#FAF4E8]/20 hover:text-white'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full overflow-hidden shrink-0 border border-white/50 block bg-[#EFE5D4]">
                          <img
                            src={spice.dishImage || '/images/jollof_dish.jpg'}
                            alt=""
                            className={`w-full h-full object-cover ${
                              getProductImages(spice)[0]?.backdrop === 'cutout'
                                ? 'mix-blend-multiply'
                                : ''
                            }`}
                          />
                        </span>
                        <span>{localizedThumbnail.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handleManualRotate('cw')}
                  className="p-2 rounded-full text-[#FAF4E8]/80 hover:text-white hover:bg-[#FAF4E8]/12 transition-colors shrink-0"
                  aria-label="Next spice"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {currentSpice.secondaryImage && currentSpice.secondaryImage !== currentSpice.dishImage && (
                <div className="inline-flex items-center gap-3 text-[11px] font-medium text-[#FAF4E8]/70">
                  <button
                    onClick={() => setViewMode('primary')}
                    className={`transition-colors ${
                      viewMode === 'primary'
                        ? 'text-[#FAF4E8] font-semibold underline underline-offset-4 decoration-[#FAF4E8]/80'
                        : 'hover:text-[#FAF4E8]'
                    }`}
                  >
                    Spice Bowl
                  </button>
                  <span aria-hidden="true" className="text-[#FAF4E8]/30">·</span>
                  <button
                    onClick={() => setViewMode('secondary')}
                    className={`transition-colors ${
                      viewMode === 'secondary'
                        ? 'text-[#FAF4E8] font-semibold underline underline-offset-4 decoration-[#FAF4E8]/80'
                        : 'hover:text-[#FAF4E8]'
                    }`}
                  >
                    Pouch &amp; Detail
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Clean, Focused Tasting Card & Instant Order */}
          <div className="lg:col-span-5 bg-[#FAF4E8] text-[#35160E] rounded-3xl p-6 sm:p-7 border border-[#FAF4E8]/40 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.35)] flex flex-col justify-between w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSpice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                {/* Category & Packaging Line */}
                <div className="flex items-center justify-between text-[11px] text-[#35160E]/60 mb-2 font-medium">
                  <span className="text-[#2C5E3B] font-bold tracking-wider uppercase font-montserrat">
                    {currentSpice.category}
                  </span>
                  <span>{currentSpice.packaging}</span>
                </div>

                {/* SKU Name & Subtitle */}
                <h2 className="font-montserrat text-2xl sm:text-[26px] font-bold text-[#35160E] leading-snug">
                  {currentSpice.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#35160E]/75 mt-1 italic">
                  &ldquo;{currentSpice.subtitle}&rdquo;
                </p>

                {/* Price & Heat Index Bar */}
                <div className="flex items-center justify-between my-4 py-3 px-4 bg-[#F4ECE0]/85 rounded-2xl border border-[#E7DAC8]/70">
                  <div>
                    <span className="block text-[10px] text-[#35160E]/55 uppercase tracking-widest font-semibold">
                      {t.hero.standardJar}
                    </span>
                    <span className="text-2xl font-bold text-[#6B1713] tabular-nums font-montserrat">
                      {displayPrice}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="block text-[10px] text-[#35160E]/55 uppercase tracking-widest font-semibold">
                      {t.hero.heatIndex}
                    </span>
                    <div className="flex items-center gap-0.5 justify-end mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Flame
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < currentSpice.heatIndex
                              ? 'text-[#6B1713] fill-[#6B1713]'
                              : 'text-[#E7DAC8]'
                          }`}
                        />
                      ))}
                      <span className="text-[11px] font-semibold text-[#35160E]/75 ml-1">
                        {currentSpice.heatLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Concise Description */}
                <p className="text-sm text-[#35160E]/85 leading-relaxed line-clamp-3 mb-4">
                  {currentSpice.description}
                </p>

                {/* Clean Agricultural Origin & Pairing Metadata */}
                <div className="space-y-2 py-3.5 border-t border-[#E7DAC8]/80 text-xs text-[#35160E]/80 mb-5">
                  <div className="flex items-center gap-2">
                    <Sprout className="w-3.5 h-3.5 text-[#2C5E3B] shrink-0" />
                    <span className="truncate">
                      <strong className="text-[#35160E] font-semibold">{t.hero.origin}:</strong>{' '}
                      {currentSpice.origin}
                    </span>
                  </div>
                  <p className="text-[#35160E]/75 line-clamp-2 pl-5.5">
                    <strong className="text-[#35160E] font-semibold">{t.hero.pairing}:</strong>{' '}
                    {currentSpice.pairingDish}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Clean Two-Action Footer: Primary Burgundy + Secondary Botanical Green */}
            <div className="space-y-2.5">
              <button
                onClick={handleDirectWhatsAppBuy}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#6B1713] text-[#FAF4E8] font-semibold text-sm shadow-md hover:bg-[#55120F] active:scale-[0.99] transition-all group"
              >
                <Send className="w-4 h-4 text-[#FAF4E8] group-hover:translate-x-0.5 transition-transform" />
                <span>{t.hero.instantBuy} ({displayPrice})</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#2C5E3B]/35 bg-white hover:bg-[#2C5E3B] hover:text-[#FAF4E8] hover:border-[#2C5E3B] text-[#2C5E3B] text-xs font-semibold transition-all"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{t.hero.addedToBag}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{t.hero.addToBag}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Macro Inspection Lightbox for Hero Platter */}
      <ProductMacroLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={currentSlides}
        initialIndex={viewMode === 'secondary' && currentSlides.length > 1 ? 1 : 0}
        productName={currentSpice.name}
        packaging={currentSpice.packaging}
        origin={currentSpice.origin}
      />
    </section>
  );
}
