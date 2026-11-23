'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { BookOpen, ShieldCheck, Users, Landmark, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { ABOUT_SUBPAGES, AboutSubpageLink } from '@/data/about';

const SUBPAGE_ICONS: Record<AboutSubpageLink['slug'], React.ElementType> = {
  'learn-about-us': BookOpen,
  'core-values': ShieldCheck,
  'management-team': Users,
  'board-of-directors': Landmark,
};

export function AboutSection() {
  const { t, language } = useLanguage();

  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-white border-t border-[#E7DAC8] relative overflow-x-clip"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 w-80 h-80 rounded-full bg-[#2C5E3B]/8 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-[#6B1713] font-bold font-montserrat block mb-2">
            {t.about.kicker}
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-bold text-[#35160E] tracking-tight">
            {t.about.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#35160E]/80 leading-relaxed">
            {t.about.subtitle}
          </p>
        </motion.div>

        {/* 4 About Sub-Page Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ABOUT_SUBPAGES.map((sub, idx) => {
            const Icon = SUBPAGE_ICONS[sub.slug];
            const title = t.about[sub.key];
            const summary = sub.summary[language];

            return (
              <motion.div
                key={sub.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group"
              >
                <Link
                  href={sub.href}
                  className="h-full bg-[#FAF4E8] rounded-3xl p-6 border border-[#E7DAC8] shadow-xs hover:shadow-lg hover:border-[#2C5E3B]/45 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-2xl bg-[#EBF2EC] border border-[#2C5E3B]/20 flex items-center justify-center text-[#2C5E3B] group-hover:bg-[#2C5E3B] group-hover:text-[#FAF4E8] transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-montserrat text-xs font-bold text-[#35160E]/35 group-hover:text-[#2C5E3B]/70 transition-colors">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-montserrat text-lg font-bold text-[#35160E] group-hover:text-[#2C5E3B] transition-colors mb-2">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#35160E]/75 leading-relaxed">
                      {summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E7DAC8]/70 flex items-center justify-between text-xs font-bold text-[#2C5E3B] font-montserrat">
                    <span>{t.about.explorePage}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
