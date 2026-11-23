'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gift,
  Plus,
  X,
  Send,
  ShoppingBag,
  Sparkles,
  Check,
  Flame,
  Award,
  Scroll,
} from 'lucide-react';
import { CATALOG, ProductSKU } from '@/data/catalog';
import { getLocalizedProduct } from '@/data/catalogI18n';
import { useCart } from '@/lib/cartStore';
import { useLanguage } from '@/lib/i18n';
import { useCurrency } from '@/lib/currencyStore';
import { buildGiftBoxOrderUrl } from '@/lib/whatsapp';

// Filter retail jar spices suitable for presentation gift boxes (exclude bulk sacks)
const AVAILABLE_GIFT_SPICES = CATALOG.filter((s) => s.category !== 'Bulk & Export');

type BoxFormat = 'trio' | 'vault';

interface BoxConfig {
  id: BoxFormat;
  slots: number;
  priceNgn: number;
  retailNgn: number;
}

const BOX_CONFIGS: Record<BoxFormat, BoxConfig> = {
  trio: {
    id: 'trio',
    slots: 3,
    priceNgn: 8900,
    retailNgn: 10500,
  },
  vault: {
    id: 'vault',
    slots: 5,
    priceNgn: 13900,
    retailNgn: 17500,
  },
};

export function CustomSpiceBox() {
  const [boxFormat, setBoxFormat] = useState<BoxFormat>('trio');
  const [selectedSpices, setSelectedSpices] = useState<ProductSKU[]>([
    AVAILABLE_GIFT_SPICES[0], // Jollof Rice Blend pre-selected
    AVAILABLE_GIFT_SPICES[1], // Yaji Suya Pepper pre-selected
  ]);
  const [recipientName, setRecipientName] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [activeSpiceFilter, setActiveSpiceFilter] = useState<'All' | 'Signature' | 'Powders'>('All');
  const [addedNotice, setAddedNotice] = useState(false);

  const { addItem, openSimulator, setIsCartOpen } = useCart();
  const { t, language } = useLanguage();
  const { formatPrice, currency } = useCurrency();

  const currentConfig = BOX_CONFIGS[boxFormat];
  const maxSlots = currentConfig.slots;
  const isFull = selectedSpices.length === maxSlots;
  const remainingSlots = maxSlots - selectedSpices.length;

  const handleFormatChange = (format: BoxFormat) => {
    setBoxFormat(format);
    if (format === 'trio' && selectedSpices.length > 3) {
      setSelectedSpices(selectedSpices.slice(0, 3));
    }
  };

  const handleAddSpice = (spice: ProductSKU) => {
    if (selectedSpices.length >= maxSlots) return;
    setSelectedSpices([...selectedSpices, spice]);
  };

  const handleRemoveSpice = (index: number) => {
    const updated = [...selectedSpices];
    updated.splice(index, 1);
    setSelectedSpices(updated);
  };

  const handleDirectWhatsAppOrder = () => {
    if (selectedSpices.length === 0) return;

    const boxTitle = boxFormat === 'trio' ? t.customBox.trioTitle : t.customBox.vaultTitle;
    const orderData = buildGiftBoxOrderUrl({
      boxTitle,
      jarCount: maxSlots,
      spices: selectedSpices,
      priceNgn: currentConfig.priceNgn,
      recipientName,
      giftMessage,
      currencyCode: currency,
      currencyPrice: formatPrice(currentConfig.priceNgn),
      lang: language,
    });

    openSimulator({
      url: orderData.url,
      rawText: orderData.rawText,
      title: `${t.customBox.orderWhatsApp}: ${boxTitle}`,
    });
  };

  const handleAddToCart = () => {
    if (selectedSpices.length === 0) return;

    const boxTitle = boxFormat === 'trio' ? t.customBox.trioTitle : t.customBox.vaultTitle;
    const spiceNames = selectedSpices.map((s) => s.name).join(' • ');

    const bundleItem: ProductSKU = {
      id: `custom-box-${boxFormat}-${Date.now()}`,
      name: `${boxTitle} (${maxSlots} Jars)`,
      slug: `curated-gift-box-${boxFormat}`,
      category: 'Signature Blends',
      subtitle: spiceNames,
      price: currentConfig.priceNgn,
      priceDisplay: formatPrice(currentConfig.priceNgn),
      packaging: `Bespoke Presentation Wooden Box + Gift Note`,
      heatIndex: Math.round(
        selectedSpices.reduce((sum, s) => sum + s.heatIndex, 0) / (selectedSpices.length || 1)
      ),
      heatLabel: 'Curated Assortment',
      origin: 'Nigeria (Stone-Milled)',
      description: `Bespoke Curated Gift Box containing: ${spiceNames}.${
        giftMessage ? ` Gift Note: "${giftMessage}"` : ''
      }${recipientName ? ` Recipient: ${recipientName}` : ''}`,
      dishImage: selectedSpices[0]?.dishImage || '/images/heritage_banner.jpg',
      tastingNotes: ['Artisanal Gift Box', 'Calligraphy Card', '100% Stone-Milled'],
      aromaProfile: 'Rich aromatic West African pantry bouquet',
      pairingDish: 'Versatile culinary gift assortment',
      commercialTarget: 'D2C Gift & Gourmet Hampers',
    };

    addItem(bundleItem, 1);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      setIsCartOpen(true);
    }, 900);
  };

  const filteredSpices = AVAILABLE_GIFT_SPICES.filter((spice) => {
    if (activeSpiceFilter === 'Signature') return spice.category === 'Signature Blends';
    if (activeSpiceFilter === 'Powders') return spice.category === 'Pure Powders';
    return true;
  });

  return (
    <section id="gift-box" className="py-20 md:py-28 bg-[#FAF4E8] relative overflow-x-clip border-t border-[#E7DAC8]">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#E7DAC8]/30 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#E7DAC8] bg-[#F4ECE0] text-[#6B1713] text-xs font-semibold tracking-widest uppercase mb-3 font-montserrat">
            <Gift className="w-3.5 h-3.5 text-[#6B1713]" />
            <span>{t.customBox.kicker}</span>
          </div>

          <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-bold text-[#35160E] tracking-tight leading-tight">
            {t.customBox.title}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#35160E]/80 max-w-2xl mx-auto leading-relaxed">
            {t.customBox.subtitle}
          </p>

          {/* Box Size Toggle Pills */}
          <div className="inline-flex items-center p-1.5 mt-8 bg-[#F4ECE0] rounded-2xl border border-[#E7DAC8] shadow-xs">
            <button
              onClick={() => handleFormatChange('trio')}
              className={`relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all z-10 ${
                boxFormat === 'trio' ? 'text-[#FAF4E8]' : 'text-[#35160E]/80 hover:text-[#35160E]'
              }`}
            >
              {boxFormat === 'trio' && (
                <motion.div
                  layoutId="activeBoxFormat"
                  className="absolute inset-0 bg-[#6B1713] rounded-xl z-[-1] shadow-sm"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="font-montserrat">{t.customBox.trioTitle} (3 Jars)</span>
            </button>

            <button
              onClick={() => handleFormatChange('vault')}
              className={`relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all z-10 ${
                boxFormat === 'vault' ? 'text-[#FAF4E8]' : 'text-[#35160E]/80 hover:text-[#35160E]'
              }`}
            >
              {boxFormat === 'vault' && (
                <motion.div
                  layoutId="activeBoxFormat"
                  className="absolute inset-0 bg-[#6B1713] rounded-xl z-[-1] shadow-sm"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="font-montserrat">{t.customBox.vaultTitle} (5 Jars)</span>
            </button>
          </div>
        </div>

        {/* 2-Column Studio: Presentation Gift Box (Left) & Spice Picker + Calligraphy Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Visual Wooden Presentation Box Tray */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#F4ECE0] rounded-3xl p-6 sm:p-8 border-2 border-[#E7DAC8] shadow-[0_15px_40px_-10px_rgba(53,22,14,0.12)] relative overflow-hidden">
              {/* Box Header & Pricing Line */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#E7DAC8]">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#6B1713] font-montserrat block">
                    {boxFormat === 'trio' ? 'Sampler Box' : 'Master Collection'}
                  </span>
                  <h3 className="font-montserrat text-xl sm:text-2xl font-bold text-[#35160E]">
                    {boxFormat === 'trio' ? t.customBox.trioTitle : t.customBox.vaultTitle}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="flex items-baseline gap-2 justify-end">
                    <span className="text-xs text-[#35160E]/50 line-through tabular-nums">
                      {formatPrice(currentConfig.retailNgn)}
                    </span>
                    <span className="text-2xl font-bold text-[#6B1713] tabular-nums font-montserrat">
                      {formatPrice(currentConfig.priceNgn)}
                    </span>
                  </div>
                  <span className="inline-block text-[10px] font-bold text-[#2C5E3B] bg-[#EBF2EC] border border-[#2C5E3B]/20 px-2 py-0.5 rounded-md mt-0.5">
                    {t.customBox.saveBadge}
                  </span>
                </div>
              </div>

              {/* Progress & Slot Status Indicator */}
              <div className="py-4 flex items-center justify-between text-xs text-[#35160E]/75">
                <span className="font-semibold font-montserrat">
                  {t.customBox.slotsLabel}: {selectedSpices.length} / {maxSlots}
                </span>
                <span className={isFull ? 'text-[#2C5E3B] font-bold' : 'text-[#6B1713] font-medium'}>
                  {isFull
                    ? `✓ ${t.customBox.boxComplete}`
                    : `${remainingSlots} ${t.customBox.spicesRemaining}`}
                </span>
              </div>

              {/* Interactive Wooden Recessed Jar Slots */}
              <div
                className={`grid gap-4 py-4 ${
                  boxFormat === 'trio' ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-3'
                }`}
              >
                {Array.from({ length: maxSlots }).map((_, slotIdx) => {
                  const spice = selectedSpices[slotIdx];
                  const localizedSpice = spice ? getLocalizedProduct(spice, language) : null;

                  return (
                    <div
                      key={slotIdx}
                      className="aspect-square rounded-2xl bg-[#FAF4E8] border-2 border-dashed border-[#E7DAC8] flex flex-col items-center justify-center p-3 relative group transition-all"
                    >
                      {localizedSpice ? (
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="w-full h-full flex flex-col items-center justify-between relative"
                        >
                          {/* Remove X Button */}
                          <button
                            onClick={() => handleRemoveSpice(slotIdx)}
                            className="absolute -top-1 -right-1 z-20 p-1 rounded-full bg-[#6B1713] text-[#FAF4E8] hover:bg-[#55120F] shadow-sm transition-transform hover:scale-110"
                            title="Remove from box"
                          >
                            <X className="w-3 h-3" />
                          </button>

                          {/* Platter Image Thumbnail */}
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-[#E7DAC8] shadow-sm relative">
                            <img
                              src={localizedSpice.dishImage || '/images/heritage_banner.jpg'}
                              alt={localizedSpice.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="text-center w-full">
                            <h4 className="font-montserrat text-[11px] sm:text-xs font-bold text-[#35160E] truncate">
                              {localizedSpice.name}
                            </h4>
                            <div className="flex items-center justify-center gap-1 mt-0.5">
                              <Flame className="w-2.5 h-2.5 text-[#6B1713] fill-[#6B1713]" />
                              <span className="text-[10px] text-[#35160E]/60">
                                {localizedSpice.heatIndex}/5
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="text-center text-[#35160E]/40 flex flex-col items-center">
                          <div className="w-9 h-9 rounded-full border border-dashed border-[#E7DAC8] flex items-center justify-center mb-1">
                            <Plus className="w-4 h-4 text-[#35160E]/50" />
                          </div>
                          <span className="text-[10px] font-semibold font-montserrat">
                            Slot {slotIdx + 1}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Complimentary Presentation Wax Seal Note */}
              <div className="mt-4 pt-4 border-t border-[#E7DAC8] flex items-center gap-2.5 text-[11px] text-[#35160E]/70">
                <Award className="w-4 h-4 text-[#6B1713] shrink-0" />
                <span>{t.customBox.parchmentNotice}</span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleDirectWhatsAppOrder}
                disabled={selectedSpices.length === 0}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#6B1713] text-[#FAF4E8] font-bold text-sm shadow-md hover:bg-[#55120F] disabled:opacity-50 disabled:cursor-not-allowed transition-all group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                <span>
                  {t.customBox.orderWhatsApp} ({formatPrice(currentConfig.priceNgn)})
                </span>
              </button>

              <button
                onClick={handleAddToCart}
                disabled={selectedSpices.length === 0}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-[#2C5E3B]/35 bg-[#FAF4E8] hover:bg-[#2C5E3B] hover:text-[#FAF4E8] hover:border-[#2C5E3B] text-[#2C5E3B] text-xs font-semibold shadow-xs disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t.customBox.addedToBag}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t.customBox.addToBag}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Spice Picker & Personalized Calligraphy Card */}
          <div className="lg:col-span-6 space-y-6">
            {/* Spice Picker Tray */}
            <div className="bg-[#FAF4E8] rounded-3xl p-6 sm:p-7 border border-[#E7DAC8] shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h4 className="font-montserrat text-base font-bold text-[#35160E]">
                  {t.customBox.chooseBlends}
                </h4>

                {/* Filter tags */}
                <div className="flex items-center gap-1.5 text-xs">
                  {(['All', 'Signature', 'Powders'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveSpiceFilter(filter)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                        activeSpiceFilter === filter
                          ? 'bg-[#2C5E3B] text-[#FAF4E8]'
                          : 'bg-[#F4ECE0] text-[#35160E]/75 hover:bg-[#EBF2EC] hover:text-[#2C5E3B]'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spice Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {filteredSpices.map((spice) => {
                  const localized = getLocalizedProduct(spice, language);
                  const alreadySelectedCount = selectedSpices.filter((s) => s.id === spice.id).length;

                  return (
                    <div
                      key={spice.id}
                      className="p-3 rounded-2xl bg-[#F4ECE0]/80 border border-[#E7DAC8] flex items-center justify-between gap-3 hover:bg-[#EBF2EC]/45 hover:border-[#2C5E3B]/40 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-11 h-11 rounded-full overflow-hidden border border-[#E7DAC8] shrink-0">
                          <img
                            src={localized.dishImage || '/images/heritage_banner.jpg'}
                            alt={localized.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="min-w-0">
                          <h5 className="font-montserrat text-xs font-bold text-[#35160E] truncate">
                            {localized.name}
                          </h5>
                          <span className="text-[10px] text-[#35160E]/60 block truncate">
                            {localized.packaging}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddSpice(spice)}
                        disabled={isFull}
                        className={`p-2 rounded-xl border text-xs font-semibold transition-all shrink-0 ${
                          isFull
                            ? 'opacity-40 cursor-not-allowed bg-[#FAF4E8] border-[#E7DAC8]'
                            : 'bg-[#2C5E3B] border-[#2C5E3B] text-[#FAF4E8] hover:bg-[#21482D] shadow-xs active:scale-95'
                        }`}
                        title={isFull ? 'Box full' : `Add ${localized.name} to box`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Personalized Calligraphy Card Input */}
            <div className="bg-[#FAF4E8] rounded-3xl p-6 sm:p-7 border border-[#E7DAC8] shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Scroll className="w-4 h-4 text-[#6B1713]" />
                <h4 className="font-montserrat text-sm sm:text-base font-bold text-[#35160E]">
                  {t.customBox.giftCardHeading}
                </h4>
              </div>

              <div>
                <label
                  htmlFor="gift-recipient"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-[#35160E]/70 mb-1 font-montserrat"
                >
                  Recipient
                </label>
                <input
                  id="gift-recipient"
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder={t.customBox.recipientPlaceholder}
                  className="w-full rounded-xl border border-[#E7DAC8] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#35160E] placeholder-[#35160E]/40 focus:outline-hidden focus:ring-2 focus:ring-[#6B1713]/30"
                />
              </div>

              <div>
                <label
                  htmlFor="gift-message"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-[#35160E]/70 mb-1 font-montserrat"
                >
                  Calligraphy Message
                </label>
                <textarea
                  id="gift-message"
                  rows={2}
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder={t.customBox.messagePlaceholder}
                  className="w-full rounded-xl border border-[#E7DAC8] bg-white px-3.5 py-2.5 text-xs text-[#35160E] placeholder-[#35160E]/40 focus:outline-hidden focus:ring-2 focus:ring-[#6B1713]/30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
