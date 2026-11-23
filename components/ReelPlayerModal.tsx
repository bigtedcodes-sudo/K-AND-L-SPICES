'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Check,
  MapPin,
  Clock,
  ArrowUpRight,
  Send,
} from 'lucide-react';
import { CulinaryReel } from '@/data/media';
import { CATALOG, ProductSKU, getProductImages } from '@/data/catalog';
import { getLocalizedProduct } from '@/data/catalogI18n';
import { useCart } from '@/lib/cartStore';
import { useLanguage } from '@/lib/i18n';
import { useCurrency } from '@/lib/currencyStore';
import { buildMultiItemOrderUrl } from '@/lib/whatsapp';

interface ReelPlayerModalProps {
  reels: CulinaryReel[];
  activeReelId: string | null;
  onClose: () => void;
  onSelectReel: (reelId: string) => void;
}

export function ReelPlayerModal({
  reels,
  activeReelId,
  onClose,
  onSelectReel,
}: ReelPlayerModalProps) {
  if (!activeReelId) return null;
  const activeIdx = Math.max(
    0,
    reels.findIndex((r) => r.id === activeReelId)
  );
  const reel = reels[activeIdx];
  if (!reel) return null;

  return (
    <ReelPlayerInner
      key={reel.id}
      reel={reel}
      reels={reels}
      activeIdx={activeIdx}
      onClose={onClose}
      onSelectReel={onSelectReel}
    />
  );
}

function ReelPlayerInner({
  reel,
  reels,
  activeIdx,
  onClose,
  onSelectReel,
}: {
  reel: CulinaryReel;
  reels: CulinaryReel[];
  activeIdx: number;
  onClose: () => void;
  onSelectReel: (reelId: string) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [addedAll, setAddedAll] = useState(false);

  const { addItem, setIsCartOpen, openSimulator } = useCart();
  const { t, language } = useLanguage();
  const { formatPrice, isHydrated } = useCurrency();

  const totalMs = reel.durationSeconds * 1000;

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setElapsedMs((prev) => {
        const next = prev + 100;
        if (next >= totalMs) return 0; // Seamless loop like vertical stories
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying, totalMs]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
      if (e.key === 'ArrowRight') {
        onSelectReel(reels[(activeIdx + 1) % reels.length].id);
      }
      if (e.key === 'ArrowLeft') {
        onSelectReel(reels[(activeIdx - 1 + reels.length) % reels.length].id);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIdx, onClose, onSelectReel, reels]);

  const progressPct = Math.min(100, (elapsedMs / totalMs) * 100);
  const currentBeatIdx = Math.min(
    reel.beats.length - 1,
    Math.floor((elapsedMs / totalMs) * reel.beats.length)
  );
  const currentBeat = reel.beats[currentBeatIdx];
  const displayVisual =
    currentBeatIdx % 2 === 1 && reel.accentImage ? reel.accentImage : reel.posterImage;

  const linkedSpices: ProductSKU[] = reel.spiceIds
    .map((id) => CATALOG.find((p) => p.id === id))
    .filter((p): p is ProductSKU => Boolean(p))
    .map((p) => getLocalizedProduct(p, language));

  const retailSpices = linkedSpices.filter((p) => p.price !== null);
  const bundleTotalNgn = retailSpices.reduce((sum, s) => sum + (s.price || 0), 0);

  const handleAddAllSpices = () => {
    linkedSpices.forEach((spice) => {
      addItem(spice, 1);
    });
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 2400);
  };

  const handleOrderReelKitWhatsApp = () => {
    const items = linkedSpices.map((product) => ({ product, quantity: 1 }));
    const orderData = buildMultiItemOrderUrl(
      items,
      `Prep Reel Kit: ${reel.title}`,
      language
    );
    openSimulator({
      url: orderData.url,
      rawText: orderData.rawText,
      title: `${t.media.orderRecipeKit}: ${reel.title}`,
    });
  };

  const formattedBundleTotal =
    bundleTotalNgn > 0
      ? isHydrated
        ? formatPrice(bundleTotalNgn)
        : `₦${bundleTotalNgn.toLocaleString()}`
      : 'Quote';

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={reel.title}
        className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-[#1A0D09]/92 backdrop-blur-md"
      >
        <div
          onClick={onClose}
          className="absolute inset-0"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 14 }}
          className="relative z-10 w-full max-w-4xl bg-[#FAF4E8] rounded-3xl border border-[#E7DAC8] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[92vh]"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close reel player"
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-[#FAF4E8]/95 hover:bg-[#6B1713] hover:text-[#FAF4E8] text-[#35160E] border border-[#E7DAC8] shadow-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left: Vertical 9:16 Timed Story Viewport */}
          <div className="md:col-span-5 bg-[#1C0E0A] relative flex flex-col justify-between aspect-[9/13] md:aspect-auto md:min-h-[540px] overflow-hidden select-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={displayVisual}
                src={displayVisual}
                alt={reel.title}
                referrerPolicy="no-referrer"
                initial={{ opacity: 0.75, scale: 1.02 }}
                animate={{
                  opacity: 1,
                  scale: isPlaying ? 1.1 : 1.04,
                }}
                transition={{
                  opacity: { duration: 0.4 },
                  scale: { duration: 5.5, ease: 'linear' },
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Measured dark contrast scrims */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/15 to-black/88 pointer-events-none" />

            {/* Story Progress Bars & Header */}
            <div className="relative z-20 p-4 space-y-3">
              {/* Segmented Beat Bars */}
              <div className="grid grid-cols-3 gap-1.5">
                {reel.beats.map((beat, idx) => {
                  const beatStart = (idx / reel.beats.length) * 100;
                  const beatSpan = 100 / reel.beats.length;
                  const fillPct =
                    progressPct <= beatStart
                      ? 0
                      : progressPct >= beatStart + beatSpan
                      ? 100
                      : ((progressPct - beatStart) / beatSpan) * 100;

                  return (
                    <div
                      key={beat.second}
                      className="h-1 rounded-full bg-white/30 overflow-hidden"
                    >
                      <div
                        className="h-full bg-[#FAF4E8] transition-all duration-100"
                        style={{ width: `${fillPct}%` }}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[#FAF4E8]">
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#A8D5B5] font-montserrat block">
                    {reel.category} · {reel.durationLabel}
                  </span>
                  <h3 className="text-sm font-bold font-montserrat truncate">
                    {reel.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((p) => !p)}
                    aria-label={isPlaying ? 'Pause reel' : 'Play reel'}
                    className="p-2 rounded-full bg-black/50 hover:bg-[#2C5E3B] text-[#FAF4E8] border border-white/20 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setElapsedMs(0);
                      setIsPlaying(true);
                    }}
                    aria-label="Restart reel"
                    className="p-2 rounded-full bg-black/50 hover:bg-[#2C5E3B] text-[#FAF4E8] border border-white/20 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Timed Step Cue Overlay + Navigation */}
            <div className="relative z-20 p-4 space-y-3">
              <div className="p-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-[#FAF4E8]">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#A8D5B5] font-montserrat mb-1">
                  <span>{currentBeat.cue}</span>
                  <span className="tabular-nums">{currentBeat.second}</span>
                </div>
                <p className="text-xs leading-relaxed text-[#FAF4E8]/95">
                  {currentBeat.caption}
                </p>
              </div>

              {/* Prev / Next Reel Controls */}
              <div className="flex items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={() =>
                    onSelectReel(reels[(activeIdx - 1 + reels.length) % reels.length].id)
                  }
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-black/55 hover:bg-[#2C5E3B] text-[#FAF4E8] border border-white/15 font-medium transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev Reel</span>
                </button>
                <span className="text-[11px] text-[#FAF4E8]/70 font-montserrat tabular-nums">
                  {activeIdx + 1} / {reels.length}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectReel(reels[(activeIdx + 1) % reels.length].id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-black/55 hover:bg-[#2C5E3B] text-[#FAF4E8] border border-white/15 font-medium transition-colors"
                >
                  <span>Next Reel</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Linked Catalog Spices & Instant Add-All Bar */}
          <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-5">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#35160E]/65 mb-1.5">
                  <span className="inline-flex items-center gap-1 font-semibold text-[#2C5E3B]">
                    <MapPin className="w-3.5 h-3.5" />
                    {reel.location}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {reel.chefOrSource}
                  </span>
                </div>
                <h2 className="font-montserrat text-xl sm:text-2xl font-bold text-[#35160E] pr-8">
                  {reel.title}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#35160E]/80 leading-relaxed">
                  {reel.summary}
                </p>
              </div>

              {/* Linked Catalog Items */}
              <div>
                <span className="block text-[11px] uppercase tracking-widest font-bold text-[#6B1713] font-montserrat mb-2.5">
                  Featured K&amp;L Spices ({linkedSpices.length})
                </span>
                <div className="space-y-2.5">
                  {linkedSpices.map((spice) => {
                    const slide = getProductImages(spice)[0];
                    const unitPrice =
                      spice.price === null
                        ? spice.priceDisplay
                        : isHydrated
                        ? formatPrice(spice.price)
                        : spice.priceDisplay;

                    return (
                      <div
                        key={spice.id}
                        className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-[#F4ECE0] border border-[#E7DAC8]"
                      >
                        <Link
                          href={`/products/${spice.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3 min-w-0 group flex-1"
                        >
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#EFE5D4] border border-[#E7DAC8] shrink-0">
                            <img
                              src={slide.url}
                              alt={spice.name}
                              referrerPolicy="no-referrer"
                              className={`w-full h-full object-cover ${
                                slide.backdrop === 'cutout' ? 'mix-blend-multiply' : ''
                              }`}
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="text-xs sm:text-sm font-bold text-[#35160E] group-hover:text-[#2C5E3B] transition-colors truncate font-montserrat">
                                {spice.name}
                              </span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#35160E]/40 group-hover:text-[#2C5E3B] shrink-0" />
                            </div>
                            <span className="text-[11px] text-[#35160E]/65 block truncate">
                              {spice.packaging} · {unitPrice}
                            </span>
                          </div>
                        </Link>

                        <button
                          type="button"
                          onClick={() => addItem(spice, 1)}
                          className="px-3 py-1.5 rounded-xl bg-[#FAF4E8] hover:bg-[#2C5E3B] hover:text-[#FAF4E8] text-[#2C5E3B] border border-[#2C5E3B]/35 text-xs font-semibold transition-all shrink-0 whitespace-nowrap"
                        >
                          + {t.catalog.orderButton}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Sticky Actions */}
            <div className="pt-5 mt-5 border-t border-[#E7DAC8] space-y-2.5">
              <button
                type="button"
                onClick={handleAddAllSpices}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-[#2C5E3B] hover:bg-[#21482D] text-[#FAF4E8] text-xs sm:text-sm font-bold shadow-md transition-all"
              >
                {addedAll ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t.media.addedAll}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {t.media.addAllToBag} ({formattedBundleTotal})
                    </span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleOrderReelKitWhatsApp}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#6B1713] hover:bg-[#55120F] text-[#FAF4E8] text-xs font-semibold transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.media.orderRecipeKit}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setIsCartOpen(true);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-[#2C5E3B]/35 bg-[#EBF2EC]/70 hover:bg-[#2C5E3B] hover:text-[#FAF4E8] text-[#2C5E3B] text-xs font-semibold transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{t.hero.reviewBag}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
