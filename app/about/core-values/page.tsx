'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, Compass, Award, HeartHandshake, MessageCircle } from 'lucide-react';
import { AboutSubpageShell } from '@/components/AboutSubpageShell';
import { useLanguage } from '@/lib/i18n';
import { CORE_VALUES_DATA } from '@/data/about';

const VALUE_ICONS = [
  ShieldCheck,
  Sparkles,
  Compass,
  Award,
  HeartHandshake,
  MessageCircle,
];

export default function CoreValuesPage() {
  const { language, t } = useLanguage();
  const data = CORE_VALUES_DATA[language];

  return (
    <AboutSubpageShell
      activeSlug="core-values"
      title={t.about.coreValues}
      subtitle={data.subtitle}
      kicker={t.about.kicker}
    >
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.values.map((val, idx) => {
            const Icon = VALUE_ICONS[idx % VALUE_ICONS.length];
            return (
              <motion.article
                key={val.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-white/25 shadow-[0_16px_38px_-14px_rgba(0,0,0,0.34)] flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-[#EBF2EC] border border-[#2C5E3B]/20 flex items-center justify-center text-[#2C5E3B]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-montserrat text-sm font-bold text-[#2C5E3B]/75">
                      {val.code}
                    </span>
                  </div>

                  <h2 className="font-montserrat text-xl font-bold text-[#35160E]">
                    {val.title}
                  </h2>
                  <p className="text-sm text-[#35160E]/80 leading-relaxed">
                    {val.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E7DAC8]/70">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#2C5E3B] bg-[#EBF2EC] px-3 py-1.5 rounded-xl border border-[#2C5E3B]/20">
                    {val.standard}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </AboutSubpageShell>
  );
}
