'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { ProductImageSlide } from '@/data/catalog';
import { ProductMacroLightbox } from '@/components/ProductMacroLightbox';

interface ProductPhotoCarouselProps {
  images: ProductImageSlide[];
  alt: string;
  packaging?: string;
  origin?: string;
  aspectClass?: string;
  showThumbnails?: boolean;
  enableLightbox?: boolean;
  topLeftBadge?: React.ReactNode;
  bottomLeftBadge?: React.ReactNode;
  bottomRightBadge?: React.ReactNode;
  onImageClick?: () => void;
}

export function ProductPhotoCarousel({
  images,
  alt,
  packaging = '100g',
  origin = 'Nigeria',
  aspectClass = 'aspect-square sm:aspect-4/3',
  showThumbnails = true,
  enableLightbox = true,
  topLeftBadge,
  bottomLeftBadge,
  bottomRightBadge,
  onImageClick,
}: ProductPhotoCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const safeSlides: ProductImageSlide[] =
    images.length > 0
      ? images
      : [{ url: '/images/heritage_banner.jpg', label: 'Craft Blend', backdrop: 'studio' }];

  const currentIdx = Math.min(activeSlide, safeSlides.length - 1);
  const currentSlide = safeSlides[currentIdx];
  const hasMultiple = safeSlides.length > 1;
  const isCutout = currentSlide.backdrop === 'cutout';
  const isPouch = currentSlide.backdrop === 'pouch';

  const goToSlide = (nextIdx: number, dir?: number) => {
    const normalized = (nextIdx + safeSlides.length) % safeSlides.length;
    setDirection(dir !== undefined ? dir : normalized >= currentIdx ? 1 : -1);
    setActiveSlide(normalized);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    goToSlide(currentIdx + 1, 1);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    goToSlide(currentIdx - 1, -1);
  };

  const handleStageClick = () => {
    if (enableLightbox) {
      setLightboxOpen(true);
    } else if (onImageClick) {
      onImageClick();
    }
  };

  return (
    <div className="space-y-3 w-full">
      {/* Main Interactive Studio Frame */}
      <div
        onClick={handleStageClick}
        className={`relative ${aspectClass} w-full rounded-3xl overflow-hidden bg-[radial-gradient(circle_at_center,#FAF4E8_0%,#EFE5D4_68%,#E4D5BF_100%)] border border-[#E7DAC8] shadow-lg group select-none ${
          enableLightbox || onImageClick ? 'cursor-zoom-in' : ''
        }`}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`${currentSlide.url}-${currentIdx}`}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 28 : -28, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction > 0 ? -28 : 28, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            drag={hasMultiple ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (!hasMultiple) return;
              if (info.offset.x < -45) {
                goToSlide(currentIdx + 1, 1);
              } else if (info.offset.x > 45) {
                goToSlide(currentIdx - 1, -1);
              }
            }}
            className={`w-full h-full relative flex items-center justify-center ${
              isCutout ? 'p-5 sm:p-8' : isPouch ? 'p-3 sm:p-4' : ''
            }`}
          >
            <img
              src={currentSlide.url}
              alt={`${alt} — ${currentSlide.label}`}
              referrerPolicy="no-referrer"
              className={
                isCutout
                  ? 'w-full h-full object-contain mix-blend-multiply drop-shadow-[0_14px_24px_rgba(53,22,14,0.14)] group-hover:scale-103 transition-transform duration-500'
                  : isPouch
                  ? 'w-full h-full object-cover rounded-2xl shadow-md border border-[#E7DAC8]/60 group-hover:scale-103 transition-transform duration-500'
                  : 'w-full h-full object-cover group-hover:scale-103 transition-transform duration-500'
              }
            />
          </motion.div>
        </AnimatePresence>

        {/* Measured Vignette Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

        {/* Top Left Overlay: Angle Switcher Pills or Custom Badge */}
        {hasMultiple ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3.5 left-3.5 z-20 flex flex-wrap gap-1.5 bg-black/50 backdrop-blur-md p-1 rounded-xl max-w-[calc(100%-6rem)]"
          >
            {safeSlides.map((slide, i) => (
              <button
                key={`${slide.url}-${i}`}
                type="button"
                onClick={() => goToSlide(i)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all whitespace-nowrap ${
                  currentIdx === i
                    ? 'bg-[#EBF2EC] text-[#2C5E3B] shadow-xs'
                    : 'text-[#FAF4E8]/85 hover:text-white'
                }`}
              >
                {slide.label}
              </button>
            ))}
          </div>
        ) : (
          topLeftBadge && (
            <div className="absolute top-3.5 left-3.5 z-20">{topLeftBadge}</div>
          )
        )}

        {/* Top Right: Interactive Macro Zoom Trigger */}
        {enableLightbox && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(true);
            }}
            aria-label={`Open macro zoom lightbox for ${alt}`}
            className="absolute top-3.5 right-3.5 z-20 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#FAF4E8]/92 hover:bg-[#2C5E3B] text-[#35160E] hover:text-[#FAF4E8] border border-[#E7DAC8] hover:border-[#2C5E3B] text-[10px] font-bold uppercase tracking-wider font-montserrat shadow-md transition-all"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Macro Zoom</span>
          </button>
        )}

        {/* Per-Product Left & Right Arrows */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous product photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#FAF4E8]/90 hover:bg-[#2C5E3B] hover:text-[#FAF4E8] hover:border-[#2C5E3B] text-[#35160E] border border-[#E7DAC8] shadow-md transition-all opacity-90 sm:opacity-80 sm:group-hover:opacity-100 hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next product photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#FAF4E8]/90 hover:bg-[#2C5E3B] hover:text-[#FAF4E8] hover:border-[#2C5E3B] text-[#35160E] border border-[#E7DAC8] shadow-md transition-all opacity-90 sm:opacity-80 sm:group-hover:opacity-100 hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Bottom Badges & Dot Indicators */}
        <div className="absolute bottom-3.5 left-4 right-4 z-20 flex items-end justify-between gap-2 pointer-events-none">
          <div className="pointer-events-auto">{bottomLeftBadge}</div>

          {hasMultiple && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md"
            >
              {safeSlides.map((slide, idx) => (
                <button
                  key={`${slide.url}-dot-${idx}`}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  aria-label={`View ${slide.label}`}
                  className={`h-1.5 rounded-full transition-all ${
                    currentIdx === idx
                      ? 'w-5 bg-[#FAF4E8]'
                      : 'w-1.5 bg-[#FAF4E8]/45 hover:bg-[#FAF4E8]/75'
                  }`}
                />
              ))}
            </div>
          )}

          <div className="pointer-events-auto">{bottomRightBadge}</div>
        </div>
      </div>

      {/* Clickable Photo Thumbnails Strip */}
      {showThumbnails && hasMultiple && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {safeSlides.map((slide, idx) => (
            <button
              key={`${slide.url}-thumb-${idx}`}
              type="button"
              onClick={() => goToSlide(idx)}
              className={`flex items-center gap-2 p-1.5 rounded-2xl border transition-all text-xs font-semibold shrink-0 ${
                currentIdx === idx
                  ? 'border-[#2C5E3B] bg-[#EBF2EC]/75 ring-2 ring-[#2C5E3B]/25 text-[#2C5E3B] shadow-xs'
                  : 'border-[#E7DAC8] bg-[#F4ECE0] text-[#35160E]/75 hover:bg-[#EBF2EC]/45 hover:border-[#2C5E3B]/40 hover:text-[#2C5E3B]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/60 bg-[#EFE5D4]">
                <img
                  src={slide.url}
                  alt={slide.label}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover ${
                    slide.backdrop === 'cutout' ? 'mix-blend-multiply' : ''
                  }`}
                />
              </div>
              <span className="pr-2 whitespace-nowrap">{slide.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Interactive Click-to-Zoom Macro Lightbox */}
      <ProductMacroLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={safeSlides}
        initialIndex={currentIdx}
        productName={alt}
        packaging={packaging}
        origin={origin}
      />
    </div>
  );
}
