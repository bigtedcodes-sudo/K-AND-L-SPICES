'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { AboutSubpageShell } from '@/components/AboutSubpageShell';
import { useLanguage } from '@/lib/i18n';
import { LEARN_ABOUT_CONTENT } from '@/data/about';

export default function LearnAboutUsPage() {
  const { language, t } = useLanguage();
  const content = LEARN_ABOUT_CONTENT[language];

  return (
    <AboutSubpageShell
      activeSlug="learn-about-us"
      title={t.about.learnAboutUs}
      subtitle={content.heroLead}
      kicker={content.heroKicker}
    >
      <div className="space-y-16">
        {/* Story + Authentic Stone-Milling Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-5"
          >
            <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-white leading-snug">
              {content.heroTitle}
            </h2>
            {content.paragraphs.map((para, idx) => (
              <p key={idx} className="text-sm sm:text-base text-white/85 leading-relaxed">
                {para}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="rounded-3xl overflow-hidden border border-[#E7DAC8] shadow-lg bg-[#F4ECE0] relative aspect-4/3">
              <img
                src="/images/heritage_banner.jpg"
                alt="K&L Spices Stone-Milling Craft"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#FAF4E8]">
                <span className="inline-flex items-center gap-1.5 font-montserrat font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t.heritage.badgeColdMilled}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4 Pillar Milestones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {content.milestones.map((m, idx) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-white/25 shadow-md space-y-2.5"
            >
              <span className="inline-block px-2.5 py-1 rounded-lg bg-[#6B1713] text-[#FAF4E8] text-[10px] font-bold uppercase tracking-wider font-montserrat">
                {m.year}
              </span>
              <h3 className="font-montserrat text-base font-bold text-[#35160E]">{m.title}</h3>
              <p className="text-xs sm:text-sm text-[#35160E]/75 leading-relaxed">{m.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Regional Nigerian Origin Footprint */}
        <div className="bg-white/10 backdrop-blur-md text-white rounded-3xl p-6 sm:p-10 border border-white/20 shadow-lg">
          <div className="flex items-center gap-2.5 mb-6">
            <Compass className="w-5 h-5 text-[#A8D5B5]" />
            <h3 className="font-montserrat text-xl sm:text-2xl font-bold text-white">
              {t.productModal.nativeOrigin} — Harvest Sourcing Map
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.regionalFootprint.map((item) => (
              <div
                key={item.region}
                className="bg-white text-[#35160E] rounded-2xl p-4 border border-white/30 shadow-sm flex items-start gap-3"
              >
                <MapPin className="w-4 h-4 text-[#6B1713] shrink-0 mt-1" />
                <div>
                  <span className="font-montserrat text-sm font-bold text-[#35160E] block">
                    {item.region}
                  </span>
                  <span className="text-xs text-[#35160E]/75 flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3 text-[#2C5E3B] shrink-0" />
                    <span>{item.crop}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AboutSubpageShell>
  );
}
