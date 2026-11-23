'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Flame, ShoppingBag, Send, Compass, Check } from 'lucide-react';
import { ProductSKU, getProductImages } from '@/data/catalog';
import { getLocalizedProduct } from '@/data/catalogI18n';
import { useCart } from '@/lib/cartStore';
import { useLanguage } from '@/lib/i18n';
import { useCurrency } from '@/lib/currencyStore';
import { buildSingleItemOrderUrl } from '@/lib/whatsapp';
import { ProductPhotoCarousel } from '@/components/ProductPhotoCarousel';

export function ProductDetailModal({
  product,
  onClose,
}: {
  product: ProductSKU | null;
  onClose: () => void;
}) {
  const { addItem, openSimulator } = useCart();
  const { t, language } = useLanguage();
  const { formatPrice, isHydrated } = useCurrency();
  const [added, setAdded] = React.useState(false);

  if (!product) return null;

  const localized = getLocalizedProduct(product, language);
  const isB2B = localized.category === 'Bulk & Export' || localized.price === null;
  const images = getProductImages(localized);

  const displayPrice =
    isB2B || localized.price === null
      ? localized.priceDisplay
      : isHydrated
      ? formatPrice(localized.price)
      : localized.priceDisplay;

  const handleAddToCart = () => {
    addItem(localized, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const handleWhatsAppOrder = () => {
    const orderData = buildSingleItemOrderUrl(localized, 1, language, displayPrice, displayPrice);
    openSimulator({
      url: orderData.url,
      rawText: orderData.rawText,
      title: `${isB2B ? t.catalog.quoteButton : t.catalog.orderButton}: ${localized.name}`,
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#FAF4E8] rounded-3xl shadow-2xl border border-[#E7DAC8] overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-30 p-2 rounded-full bg-white/90 hover:bg-white text-[#35160E] shadow-md border border-[#E7DAC8] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="overflow-y-auto">
            {/* Top Image Carousel Showcase */}
            <div className="p-4 pb-0 sm:p-5 sm:pb-0">
              <ProductPhotoCarousel
                key={localized.id}
                images={images}
                alt={localized.name}
                packaging={localized.packaging}
                origin={localized.origin}
                aspectClass="h-64 sm:h-72"
                showThumbnails={images.length > 1}
                enableLightbox={true}
                bottomLeftBadge={
                  <span className="px-3 py-1 rounded-full bg-[#6B1713] text-[#FAF4E8] text-xs font-semibold uppercase tracking-wider font-montserrat shadow-sm">
                    {localized.category}
                  </span>
                }
                bottomRightBadge={
                  <span className="text-lg sm:text-xl font-bold text-[#6B1713] tabular-nums bg-[#FAF4E8]/95 px-3 py-1 rounded-xl font-montserrat border border-[#E7DAC8] shadow-sm">
                    {displayPrice}
                  </span>
                }
              />
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <span className="text-xs text-[#35160E]/60 block mb-1">
                  {t.productModal.packagingLabel}: {localized.packaging} · {t.productModal.commercialFocus}: {localized.commercialTarget}
                </span>
                <h3 className="font-montserrat text-2xl sm:text-3xl font-bold text-[#35160E]">
                  {localized.name}
                </h3>
                <p className="text-sm text-[#35160E]/80 italic mt-1">&ldquo;{localized.subtitle}&rdquo;</p>
              </div>

              {/* Heat Index and Origin */}
              <div className="grid grid-cols-2 gap-3 py-3 px-4 bg-[#F4ECE0] rounded-2xl border border-[#E7DAC8]">
                <div>
                  <span className="text-[10px] text-[#35160E]/60 uppercase tracking-widest block font-semibold">
                    {t.productModal.heatIndex}
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Flame
                        key={i}
                        className={`w-4 h-4 ${
                          i < localized.heatIndex
                            ? 'text-[#6B1713] fill-[#6B1713]'
                            : 'text-[#E7DAC8]'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-semibold ml-1 text-[#35160E]">
                      {localized.heatLabel}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-[#35160E]/60 uppercase tracking-widest block font-semibold">
                    {t.productModal.nativeOrigin}
                  </span>
                  <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-[#35160E]">
                    <Compass className="w-3.5 h-3.5 text-[#2C5E3B]" />
                    <span>{localized.origin}</span>
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#35160E]/70 block mb-1.5 font-montserrat">
                  {t.productModal.craftMilling}
                </span>
                <p className="text-sm text-[#35160E]/90 leading-relaxed">
                  {localized.description}
                </p>
              </div>

              {/* Aroma & Tasting Notes */}
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#35160E]/70 block mb-2 font-montserrat">
                  {t.productModal.characteristics}
                </span>
                <div className="flex flex-wrap gap-2 mb-3">
                  {localized.tastingNotes.map((note, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-[#F4ECE0] text-[#35160E] text-xs font-medium border border-[#E7DAC8]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[#35160E]/75 italic">
                  <strong>{t.productModal.aroma}:</strong> {localized.aromaProfile}
                </p>
              </div>

              {/* Culinary Pairing */}
              <div className="p-3.5 rounded-xl bg-[#F4ECE0]/60 border border-[#E7DAC8] text-xs text-[#35160E]/85">
                <span className="font-bold text-[#35160E] block mb-0.5 font-montserrat">
                  {t.productModal.culinaryApp}
                </span>
                {localized.pairingDish}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E7DAC8] space-y-2.5">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#6B1713] text-[#FAF4E8] font-bold text-sm shadow-md hover:bg-[#55120F] transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isB2B
                      ? t.productModal.requestQuote
                      : `${t.productModal.instantOrder} (${displayPrice})`}
                  </span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#2C5E3B]/35 bg-[#FAF4E8] hover:bg-[#2C5E3B] hover:text-[#FAF4E8] hover:border-[#2C5E3B] text-[#2C5E3B] text-xs font-semibold transition-all"
                >
                  {added ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{t.productModal.added}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{t.productModal.add}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
