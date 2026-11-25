'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Landmark, MapPin, ShieldCheck } from 'lucide-react';
import { AboutSubpageShell } from '@/components/AboutSubpageShell';
import { useLanguage } from '@/lib/i18n';
import { BOARD_DIRECTORS_DATA } from '@/data/about';

export default function BoardOfDirectorsPage() {
  const { language, t } = useLanguage();
  const data = BOARD_DIRECTORS_DATA[language];

  return (
    <AboutSubpageShell
      activeSlug="board-of-directors"
      title={t.about.boardOfDirectors}
      subtitle={data.subtitle}
      kicker={t.about.kicker}
    >
      <div className="space-y-12">
        {/* Governance Charter Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white/10 backdrop-blur-md text-white rounded-3xl p-6 sm:p-8 border border-white/20 shadow-lg flex flex-col md:flex-row items-start md:items-center gap-6"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#6B1713] text-[#FAF4E8] flex items-center justify-center shrink-0 shadow-sm border border-[#FAF4E8]/20">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-montserrat text-lg sm:text-xl font-bold text-[#FAF4E8]">
              {data.charterTitle}
            </h2>
            <p className="text-sm text-[#FAF4E8]/85 leading-relaxed mt-1.5">
              {data.charterText}
            </p>
          </div>
        </motion.div>

        {/* Directors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {data.directors.map((director, idx) => (
            <motion.article
              key={director.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-white/25 shadow-[0_16px_38px_-14px_rgba(0,0,0,0.34)] flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#2C5E3B] text-[#FAF4E8] flex items-center justify-center font-montserrat text-xl font-bold shrink-0 shadow-md border-2 border-[#E7DAC8]">
                    {director.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-montserrat text-xl font-bold text-[#35160E]">
                      {director.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-[#6B1713] mt-0.5">
                      {director.role}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-[#35160E]/65">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#6B1713]" />
                        {director.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#6B1713]" />
                        {director.tenureOrCommittee}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#35160E]/85 leading-relaxed">{director.bio}</p>
              </div>

              <div className="pt-4 border-t border-[#E7DAC8]/80 flex flex-wrap gap-1.5">
                {director.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="px-2.5 py-1 rounded-lg bg-[#F4ECE0] text-[#35160E] text-xs font-medium border border-[#E7DAC8]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Standing Board Committees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.committees.map((committee) => (
            <div
              key={committee.name}
              className="bg-white rounded-2xl p-5 border border-white/25 shadow-md space-y-2"
            >
              <h3 className="font-montserrat text-sm font-bold text-[#6B1713]">
                {committee.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#35160E]/80 leading-relaxed">
                {committee.mandate}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AboutSubpageShell>
  );
}
