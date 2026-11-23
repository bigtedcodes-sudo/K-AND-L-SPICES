'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Search,
  Sun,
  Layers,
  Move,
} from 'lucide-react';
import { ProductImageSlide } from '@/data/catalog';

interface ProductMacroLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: ProductImageSlide[];
  initialIndex?: number;
  productName: string;
  packaging: string;
  origin: string;
}

const ZOOM_STEPS = [1, 2, 3.5] as const;

export function ProductMacroLightbox(props: ProductMacroLightboxProps) {
  if (!props.isOpen) return null;
  return (
    <ProductMacroLightboxInner
      key={`${props.productName}-${props.initialIndex ?? 0}`}
      {...props}
    />
  );
}

function ProductMacroLightboxInner({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  productName,
  packaging,
  origin,
}: ProductMacroLightboxProps) {
  const safeImages =
    images.length > 0
      ? images
      : [{ url: '/images/heritage_banner.jpg', label: 'Studio View', backdrop: 'studio' as const }];

  const [activeIndex, setActiveIndex] = useState(
    Math.min(initialIndex, safeImages.length - 1)
  );
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [loupeEnabled, setLoupeEnabled] = useState(true);
  const [loupePos, setLoupePos] = useState<{ xPct: number; yPct: number; visible: boolean }>({
    xPct: 50,
    yPct: 50,
    visible: false,
  });
  const [backdropTone, setBackdropTone] = useState<'parchment' | 'daylight'>('parchment');

  const stageRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ clientX: number; clientY: number; startX: number; startY: number } | null>(null);
  const didDragRef = useRef(false);

  const activeSlide = safeImages[Math.min(activeIndex, safeImages.length - 1)];
  const hasMultiple = safeImages.length > 1;

  const resetZoom = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  const selectSlide = (idx: number) => {
    const normalized = (idx + safeImages.length) % safeImages.length;
    setActiveIndex(normalized);
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  const clampPan = (x: number, y: number, zoom: number) => {
    if (zoom <= 1 || !stageRef.current) return { x: 0, y: 0 };
    const rect = stageRef.current.getBoundingClientRect();
    const maxX = ((zoom - 1) * rect.width) / 2;
    const maxY = ((zoom - 1) * rect.height) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const handleZoomChange = (nextZoom: number, focalClientX?: number, focalClientY?: number) => {
    if (nextZoom <= 1) {
      resetZoom();
      return;
    }

    if (focalClientX !== undefined && focalClientY !== undefined && stageRef.current) {
      const rect = stageRef.current.getBoundingClientRect();
      const offsetX = focalClientX - (rect.left + rect.width / 2);
      const offsetY = focalClientY - (rect.top + rect.height / 2);
      const scaleFactor = nextZoom / zoomLevel;
      const targetX = (pan.x - offsetX) * scaleFactor + offsetX * 0.25;
      const targetY = (pan.y - offsetY) * scaleFactor + offsetY * 0.25;
      setZoomLevel(nextZoom);
      setPan(clampPan(targetX, targetY, nextZoom));
    } else {
      setZoomLevel(nextZoom);
      setPan((prev) => clampPan(prev.x, prev.y, nextZoom));
    }
  };

  const cycleZoomAtPoint = (e: React.MouseEvent<HTMLDivElement>) => {
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }
    const currentStepIdx = ZOOM_STEPS.findIndex((z) => Math.abs(z - zoomLevel) < 0.1);
    const nextZoom =
      currentStepIdx === -1 || currentStepIdx === ZOOM_STEPS.length - 1
        ? 1
        : ZOOM_STEPS[currentStepIdx + 1];
    handleZoomChange(nextZoom, e.clientX, e.clientY);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasMultiple) selectSlide(activeIndex + 1);
      if (e.key === 'ArrowLeft' && hasMultiple) selectSlide(activeIndex - 1);
      if (e.key === '+' || e.key === '=') {
        setZoomLevel((z) => Math.min(3.5, Number((z + 0.75).toFixed(2))));
      }
      if (e.key === '-') {
        setZoomLevel((z) => {
          const next = Math.max(1, Number((z - 0.75).toFixed(2)));
          if (next <= 1) setPan({ x: 0, y: 0 });
          return next;
        });
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (stageRef.current) {
      const rect = stageRef.current.getBoundingClientRect();
      const xPct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const yPct = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      setLoupePos({ xPct, yPct, visible: zoomLevel === 1 });
    }

    if (isDragging && dragStartRef.current && zoomLevel > 1) {
      const dx = e.clientX - dragStartRef.current.clientX;
      const dy = e.clientY - dragStartRef.current.clientY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        didDragRef.current = true;
      }
      setPan(clampPan(dragStartRef.current.startX + dx, dragStartRef.current.startY + dy, zoomLevel));
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    didDragRef.current = false;
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      startX: pan.x,
      startY: pan.y,
    };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  if (!isOpen) return null;

  const isCutout = activeSlide.backdrop === 'cutout';

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${productName} Macro Inspection Lightbox`}
        className="fixed inset-0 z-[70] flex flex-col bg-[#1E0F0A]/92 backdrop-blur-md text-[#FAF4E8]"
      >
        {/* Top Studio Inspector Bar */}
        <div className="flex items-center justify-between gap-4 px-4 sm:px-8 py-3.5 border-b border-[#FAF4E8]/12 bg-[#1E0F0A]/75 shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#FAF4E8]/60 font-montserrat font-semibold">
              <span className="truncate">{productName}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#A8D5B5] whitespace-nowrap">{activeSlide.label}</span>
            </div>
            <p className="text-xs text-[#FAF4E8]/70 mt-0.5 hidden sm:block">
              {activeSlide.note || `${packaging} · ${origin} · Click image to cycle macro zoom`}
            </p>
          </div>

          {/* Interactive Zoom & Studio Backdrop Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Backdrop Tone Switcher */}
            <button
              type="button"
              onClick={() =>
                setBackdropTone((prev) => (prev === 'parchment' ? 'daylight' : 'parchment'))
              }
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF4E8]/10 hover:bg-[#FAF4E8]/18 border border-[#FAF4E8]/15 text-xs font-medium text-[#FAF4E8] transition-colors"
              title="Toggle warm parchment or neutral daylight backdrop"
            >
              <Sun className="w-3.5 h-3.5 text-[#E7DAC8]" />
              <span>{backdropTone === 'parchment' ? 'Warm Stone' : 'Daylight White'}</span>
            </button>

            {/* Magnifier Loupe Toggle (active at 1x) */}
            <button
              type="button"
              onClick={() => setLoupeEnabled((v) => !v)}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                loupeEnabled
                  ? 'bg-[#2C5E3B] border-[#2C5E3B] text-[#FAF4E8]'
                  : 'bg-[#FAF4E8]/10 border-[#FAF4E8]/15 text-[#FAF4E8]/80 hover:bg-[#FAF4E8]/18'
              }`}
              title="Toggle 2.5x hover magnifier loupe"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Loupe</span>
            </button>

            {/* Step Zoom Buttons */}
            <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#FAF4E8]/10 border border-[#FAF4E8]/15">
              {ZOOM_STEPS.map((step) => {
                const active = Math.abs(zoomLevel - step) < 0.1;
                return (
                  <button
                    key={step}
                    type="button"
                    onClick={() => handleZoomChange(step)}
                    className={`px-2 sm:px-2.5 py-1 rounded-lg text-[11px] font-bold tabular-nums font-montserrat transition-colors ${
                      active
                        ? 'bg-[#FAF4E8] text-[#35160E]'
                        : 'text-[#FAF4E8]/80 hover:text-white'
                    }`}
                  >
                    {step}x
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => handleZoomChange(Math.max(1, Number((zoomLevel - 0.5).toFixed(2))))}
              disabled={zoomLevel <= 1}
              aria-label="Zoom out"
              className="p-2 rounded-xl bg-[#FAF4E8]/10 hover:bg-[#FAF4E8]/20 disabled:opacity-35 border border-[#FAF4E8]/15 transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => handleZoomChange(Math.min(3.5, Number((zoomLevel + 0.5).toFixed(2))))}
              disabled={zoomLevel >= 3.5}
              aria-label="Zoom in"
              className="p-2 rounded-xl bg-[#FAF4E8]/10 hover:bg-[#FAF4E8]/20 disabled:opacity-35 border border-[#FAF4E8]/15 transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {zoomLevel > 1 && (
              <button
                type="button"
                onClick={resetZoom}
                aria-label="Reset zoom"
                className="p-2 rounded-xl bg-[#FAF4E8]/10 hover:bg-[#FAF4E8]/20 border border-[#FAF4E8]/15 transition-colors"
                title="Reset view"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close macro lightbox"
              className="p-2 rounded-xl bg-[#6B1713] hover:bg-[#841D18] text-[#FAF4E8] border border-[#FAF4E8]/20 transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Studio Viewport Stage */}
        <div className="relative flex-1 min-h-0 flex items-center justify-center p-4 sm:p-8 select-none">
          {/* Prev / Next Arrows */}
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={() => selectSlide(activeIndex - 1)}
                aria-label="Previous slide"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#FAF4E8]/90 hover:bg-[#2C5E3B] hover:text-[#FAF4E8] text-[#35160E] shadow-xl border border-[#E7DAC8] transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => selectSlide(activeIndex + 1)}
                aria-label="Next slide"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#FAF4E8]/90 hover:bg-[#2C5E3B] hover:text-[#FAF4E8] text-[#35160E] shadow-xl border border-[#E7DAC8] transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Harmonized Studio Stage Card */}
          <div
            ref={stageRef}
            onClick={cycleZoomAtPoint}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
              handleMouseUp();
              setLoupePos((p) => ({ ...p, visible: false }));
            }}
            className={`relative w-full max-w-4xl h-full max-h-[68vh] rounded-3xl overflow-hidden border shadow-2xl flex items-center justify-center transition-colors ${
              backdropTone === 'parchment'
                ? 'bg-[radial-gradient(circle_at_center,#FAF4E8_0%,#EFE5D4_65%,#E4D5BF_100%)] border-[#E7DAC8]/40'
                : 'bg-[#FFFFFF] border-white/30'
            } ${zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'}`}
          >
            <motion.div
              animate={{
                scale: zoomLevel,
                x: pan.x,
                y: pan.y,
              }}
              transition={
                isDragging
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 260, damping: 28 }
              }
              className="w-full h-full flex items-center justify-center p-4 sm:p-8"
            >
              <img
                src={activeSlide.url}
                alt={`${productName} — ${activeSlide.label}`}
                referrerPolicy="no-referrer"
                draggable={false}
                className={`max-w-full max-h-full object-contain rounded-2xl ${
                  isCutout && backdropTone === 'parchment' ? 'mix-blend-multiply' : 'shadow-md'
                }`}
              />
            </motion.div>

            {/* Hover Precision Loupe Magnifier at 1x */}
            {loupeEnabled && zoomLevel === 1 && loupePos.visible && (
              <div
                aria-hidden="true"
                className="pointer-events-none hidden md:block absolute w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FAF4E8] shadow-[0_12px_36px_rgba(0,0,0,0.45)] overflow-hidden z-20 ring-2 ring-[#2C5E3B]"
                style={{
                  left: `${loupePos.xPct}%`,
                  top: `${loupePos.yPct}%`,
                  backgroundColor: backdropTone === 'parchment' ? '#FAF4E8' : '#FFFFFF',
                  backgroundImage: `url(${activeSlide.url})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '260%',
                  backgroundPosition: `${loupePos.xPct}% ${loupePos.yPct}%`,
                }}
              >
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/65 text-[#FAF4E8] text-[9px] font-bold tracking-wider uppercase font-montserrat">
                  2.6x
                </div>
              </div>
            )}

            {/* Status Pill inside Stage */}
            <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/55 backdrop-blur-md text-[11px] font-medium text-[#FAF4E8]">
              {zoomLevel > 1 ? (
                <>
                  <Move className="w-3.5 h-3.5 text-[#A8D5B5]" />
                  <span>Drag to pan · {zoomLevel}x macro · Click to cycle</span>
                </>
              ) : (
                <>
                  <Layers className="w-3.5 h-3.5 text-[#A8D5B5]" />
                  <span>Click anywhere to zoom {ZOOM_STEPS[1]}x</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Thumbnails & Slide Selector */}
        {hasMultiple && (
          <div className="px-4 sm:px-8 py-3.5 border-t border-[#FAF4E8]/12 bg-[#1E0F0A]/80 shrink-0">
            <div className="max-w-4xl mx-auto flex items-center justify-center gap-2.5 overflow-x-auto pb-0.5 scrollbar-none">
              {safeImages.map((slide, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={`${slide.url}-${idx}`}
                    type="button"
                    onClick={() => selectSlide(idx)}
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-2xl border text-xs font-semibold transition-all shrink-0 ${
                      isSelected
                        ? 'bg-[#2C5E3B] border-[#2C5E3B] text-[#FAF4E8] shadow-md'
                        : 'bg-[#FAF4E8]/8 border-[#FAF4E8]/15 text-[#FAF4E8]/75 hover:bg-[#FAF4E8]/15 hover:text-white'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl overflow-hidden bg-[#EFE5D4] shrink-0 border border-white/20">
                      <img
                        src={slide.url}
                        alt={slide.label}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover ${
                          slide.backdrop === 'cutout' ? 'mix-blend-multiply' : ''
                        }`}
                      />
                    </div>
                    <span className="pr-1 whitespace-nowrap">{slide.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}
