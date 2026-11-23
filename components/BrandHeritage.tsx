'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Send, SunMedium, Sparkles, ShieldCheck, Waves, Layers } from 'lucide-react';
import { useCart } from '@/lib/cartStore';
import { useLanguage } from '@/lib/i18n';
import { buildB2BInquiryUrl, DISPLAY_PHONE_NUMBER } from '@/lib/whatsapp';

export function BrandHeritage() {
  const { openSimulator } = useCart();
  const { t, language } = useLanguage();
  const [selectedCommodity, setSelectedCommodity] = useState('Dried Ginger Slices');

  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // Subtle scroll parallax for the stone-milling imagery
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const rawImageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const rawImageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.0, 1.06]);
  const smoothImageY = useSpring(rawImageY, { stiffness: 90, damping: 20 });
  const smoothImageScale = useSpring(rawImageScale, { stiffness: 90, damping: 20 });

  const handleB2BSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = buildB2BInquiryUrl(selectedCommodity, language);
    openSimulator({
      url: data.url,
      rawText: data.rawText,
      title: `B2B: ${selectedCommodity}`,
    });
  };

  const processSteps = [
    {
      num: '01',
      icon: SunMedium,
      title: t.heritage.processStep1Title,
      desc: t.heritage.processStep1Desc,
    },
    {
      num: '02',
      icon: Waves,
      title: t.heritage.processStep2Title,
      desc: t.heritage.processStep2Desc,
    },
    {
      num: '03',
      icon: Layers,
      title: t.heritage.processStep3Title,
      desc: t.heritage.processStep3Desc,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="heritage"
      className="py-20 md:py-28 bg-[#FAF4E8] relative overflow-hidden"
    >
      {/* Ambient background kinetic lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#E7DAC8]/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-[#6B1713]/5 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heritage Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-20">
          {/* Left Column: Philosophy & Metrics Reveal */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-[#6B1713] font-bold font-montserrat block mb-2">
                {t.heritage.kicker}
              </span>
              <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-bold text-[#35160E] tracking-tight leading-tight">
                {t.heritage.title}
              </h2>
              <p className="text-sm sm:text-base text-[#35160E]/80 leading-relaxed mt-4">
                {t.heritage.p1}
              </p>
              <p className="text-sm sm:text-base text-[#35160E]/80 leading-relaxed mt-3">
                {t.heritage.p2}
              </p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E7DAC8]">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="block font-montserrat text-2xl sm:text-3xl font-bold text-[#6B1713]">100%</span>
                <span className="text-xs text-[#35160E]/70 font-medium">{t.heritage.metric1Label}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="block font-montserrat text-2xl sm:text-3xl font-bold text-[#6B1713]">0%</span>
                <span className="text-xs text-[#35160E]/70 font-medium">{t.heritage.metric2Label}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="block font-montserrat text-2xl sm:text-3xl font-bold text-[#6B1713]">&lt;24h</span>
                <span className="text-xs text-[#35160E]/70 font-medium">{t.heritage.metric3Label}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Cascading Stone-Milling Process Imagery Reveal */}
          <div ref={visualRef} className="lg:col-span-7 flex flex-col gap-5">
            {/* Main Stone-Milling Process Card (Cascades from right) */}
            <motion.div
              initial={{ opacity: 0, x: 65, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: 'spring',
                stiffness: 90,
                damping: 22,
                mass: 0.9,
              }}
              className="relative w-full h-[320px] sm:h-[380px] lg:h-[400px] rounded-3xl overflow-hidden border-2 border-[#E7DAC8] shadow-[0_20px_50px_-15px_rgba(53,22,14,0.18)] bg-[#F4ECE0] group"
            >
              <motion.div
                style={{
                  y: smoothImageY,
                  scale: smoothImageScale,
                }}
                className="w-full h-full relative will-change-transform"
              >
                <img
                  src="/images/heritage_banner.jpg"
                  alt="K&L Artisanal Stone-Milled Heritage Spices"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* Ceramic glaze lighting and depth gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating Process Badge 1 (Cascades from top-right) */}
              <motion.div
                initial={{ opacity: 0, x: 45, y: -15, scale: 0.85 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 110,
                  damping: 18,
                  delay: 0.25,
                }}
                className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF4E8]/95 backdrop-blur-md border border-[#E7DAC8] text-[#6B1713] text-[11px] font-bold shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#6B1713]" />
                <span>{t.heritage.badgeColdMilled}</span>
              </motion.div>

              {/* Floating Process Badge 2 (Cascades from bottom-right) */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: 20, scale: 0.85 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 110,
                  damping: 18,
                  delay: 0.4,
                }}
                className="absolute top-16 right-4 z-20 hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#35160E]/90 backdrop-blur-md border border-[#E7DAC8]/30 text-[#FAF4E8] text-[11px] font-semibold shadow-md"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.heritage.badgeTerpenes}</span>
              </motion.div>

              {/* Banner Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-8 text-[#FAF4E8]">
                <span className="text-xs uppercase tracking-widest font-semibold block text-[#FAF4E8]/85 font-montserrat mb-1">
                  {t.heritage.bannerSub}
                </span>
                <h3 className="font-montserrat text-xl sm:text-2xl lg:text-3xl font-bold leading-snug">
                  {t.heritage.bannerTitle}
                </h3>
              </div>
            </motion.div>

            {/* Cascading 3-Step Stone-Milling Process Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {processSteps.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: 45, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      type: 'spring',
                      stiffness: 100,
                      damping: 20,
                      delay: 0.25 + idx * 0.15,
                    }}
                    className="p-4 rounded-2xl bg-[#F4ECE0] border border-[#E7DAC8] hover:border-[#2C5E3B]/45 transition-all hover:bg-[#EBF2EC]/45 group shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-xl bg-[#FAF4E8] border border-[#E7DAC8] flex items-center justify-center text-[#2C5E3B] group-hover:bg-[#2C5E3B] group-hover:text-[#FAF4E8] transition-colors shadow-xs">
                        <StepIcon className="w-4 h-4" />
                      </div>
                      <span className="font-montserrat text-xs font-bold text-[#2C5E3B]/70">
                        {step.num}
                      </span>
                    </div>

                    <h4 className="font-montserrat text-xs sm:text-sm font-bold text-[#35160E] group-hover:text-[#2C5E3B] transition-colors leading-snug mb-1">
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-[#35160E]/70 leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Wholesale & B2B Export Inquiries Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          id="wholesale"
          className="bg-gradient-to-br from-[#1B4328] via-[#235333] to-[#193C24] text-[#FAF4E8] rounded-3xl p-6 sm:p-12 border border-[#2C5E3B] shadow-xl"
        >
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-[#A8D5B5] font-bold font-montserrat block mb-2">
              {t.heritage.b2bKicker}
            </span>
            <h3 className="font-montserrat text-2xl sm:text-3xl font-bold text-[#FAF4E8]">
              {t.heritage.b2bTitle}
            </h3>
            <p className="mt-2 text-sm text-[#FAF4E8]/85">
              {t.heritage.b2bDesc}
            </p>
          </div>

          <form
            onSubmit={handleB2BSubmit}
            className="max-w-xl mx-auto bg-[#FAF4E8] text-[#35160E] rounded-2xl p-6 border border-[#FAF4E8]/40 shadow-lg space-y-4"
          >
            <div>
              <label
                htmlFor="b2b-commodity"
                className="block text-xs font-semibold uppercase tracking-wider text-[#35160E] mb-2 font-montserrat"
              >
                {t.heritage.b2bSelectLabel}
              </label>
              <select
                id="b2b-commodity"
                value={selectedCommodity}
                onChange={(e) => setSelectedCommodity(e.target.value)}
                className="w-full rounded-xl border border-[#E7DAC8] bg-white p-3 text-xs sm:text-sm text-[#35160E] focus:outline-hidden focus:ring-2 focus:ring-[#6B1713]/30"
              >
                <option value="Dried Ginger Slices (Bulk Sack Kg)">Dried Ginger Slices (Bulk Sack Kg)</option>
                <option value="White Pepper Seeds (Bulk Sack Kg)">White Pepper Seeds (Bulk Sack Kg)</option>
                <option value="Black Pepper Seeds (Bulk Sack Kg)">Black Pepper Seeds (Bulk Sack Kg)</option>
                <option value="Whole Turmeric Roots (Bulk Sack Kg)">Whole Turmeric Roots (Bulk Sack Kg)</option>
                <option value="Jollof Rice Spice Mix (Commercial Foodservice Buckets)">Jollof Rice Spice Mix (Foodservice Buckets)</option>
                <option value="Yaji Suya Pepper (Bulk Restaurant Packs)">Yaji Suya Pepper (Bulk Restaurant Packs)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#6B1713] text-[#FAF4E8] font-bold text-xs sm:text-sm shadow-md hover:bg-[#55120F] transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{t.heritage.b2bButton}</span>
            </button>

            <p className="text-center text-[11px] text-[#35160E]/60">
              {t.heritage.b2bFooter} ({DISPLAY_PHONE_NUMBER})
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
