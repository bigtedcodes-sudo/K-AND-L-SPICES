'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Briefcase } from 'lucide-react';
import { AboutSubpageShell } from '@/components/AboutSubpageShell';
import { useLanguage } from '@/lib/i18n';
import { MANAGEMENT_TEAM_DATA } from '@/data/about';

export default function ManagementTeamPage() {
  const { language, t } = useLanguage();
  const data = MANAGEMENT_TEAM_DATA[language];

  return (
    <AboutSubpageShell
      activeSlug="management-team"
      title={t.about.managementTeam}
      subtitle={data.subtitle}
      kicker={t.about.kicker}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {data.members.map((member, idx) => (
          <motion.article
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-white/25 shadow-[0_16px_38px_-14px_rgba(0,0,0,0.34)] flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                {/* Editorial Monogram Crest */}
                <div className="w-16 h-16 rounded-2xl bg-[#6B1713] text-[#FAF4E8] flex items-center justify-center font-montserrat text-xl font-bold shrink-0 shadow-md border-2 border-[#E7DAC8]">
                  {member.initials}
                </div>
                <div className="min-w-0">
                  <h2 className="font-montserrat text-xl sm:text-2xl font-bold text-[#35160E]">
                    {member.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-[#6B1713] mt-0.5">
                    {member.role}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-[#35160E]/65">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#6B1713]" />
                      {member.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-[#6B1713]" />
                      {member.tenureOrCommittee}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#35160E]/85 leading-relaxed">{member.bio}</p>
            </div>

            <div className="pt-4 border-t border-[#E7DAC8]/80 flex flex-wrap gap-1.5">
              {member.focusAreas.map((area) => (
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
    </AboutSubpageShell>
  );
}
