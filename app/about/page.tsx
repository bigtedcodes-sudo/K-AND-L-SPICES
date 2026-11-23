'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { BookOpen, ShieldCheck, Users, Landmark, ArrowRight } from 'lucide-react';
import { AboutSubpageShell } from '@/components/AboutSubpageShell';
import { useLanguage } from '@/lib/i18n';
import { ABOUT_SUBPAGES, AboutSubpageLink } from '@/data/about';

const SUBPAGE_ICONS: Record<AboutSubpageLink['slug'], React.ElementType> = {
  'learn-about-us': BookOpen,
  'core-values': ShieldCheck,
  'management-team': Users,
  'board-of-directors': Landmark,
};

export default function AboutOverviewPage() {
  const { t, language } = useLanguage();

  return (
    <AboutSubpageShell
      activeSlug="overview"
      title={t.about.title}
      subtitle={t.about.subtitle}
      kicker={t.about.kicker}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ABOUT_SUBPAGES.map((sub, idx) => {
          const Icon = SUBPAGE_ICONS[sub.slug];
          return (
            <motion.div
              key={sub.slug}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Link
                href={sub.href}
                className="group h-full bg-[#F4ECE0]/70 hover:bg-[#FAF4E8] rounded-3xl p-7 border border-[#E7DAC8] hover:border-[#2C5E3B]/45 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#EBF2EC] border border-[#2C5E3B]/20 flex items-center justify-center text-[#2C5E3B] group-hover:bg-[#2C5E3B] group-hover:text-[#FAF4E8] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-montserrat text-xs font-bold text-[#35160E]/40 group-hover:text-[#2C5E3B]/75 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>
                  <h2 className="font-montserrat text-2xl font-bold text-[#35160E] group-hover:text-[#2C5E3B] transition-colors">
                    {t.about[sub.key]}
                  </h2>
                  <p className="mt-2.5 text-sm text-[#35160E]/80 leading-relaxed">
                    {sub.summary[language]}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E7DAC8] flex items-center justify-between text-xs font-bold text-[#2C5E3B] font-montserrat">
                  <span>{t.about.explorePage}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </AboutSubpageShell>
  );
}
