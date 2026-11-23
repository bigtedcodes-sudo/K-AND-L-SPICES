'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, ArrowUp } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { CurrencySwitcher } from '@/components/CurrencySwitcher';
import { DISPLAY_PHONE_NUMBER } from '@/lib/whatsapp';
import { ABOUT_SUBPAGES } from '@/data/about';
import { BrandLogo } from '@/components/BrandLogo';

export function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF4E8] border-t border-[#E7DAC8] text-[#35160E] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group"
            >
              <BrandLogo size="lg" className="group-hover:scale-105" />
              <span className="font-montserrat text-2xl font-bold tracking-widest text-[#35160E] group-hover:text-[#6B1713] transition-colors">
                SPICES
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#35160E]/75 leading-relaxed max-w-sm">
              {t.footer.description}
            </p>
            <div className="text-xs text-[#35160E]/80 space-y-1.5 pt-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#6B1713]" />
                <span>{t.footer.deskLabel}: {DISPLAY_PHONE_NUMBER}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#6B1713]" />
                <span>{t.footer.facilityLabel}</span>
              </div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-montserrat text-xs font-bold uppercase tracking-wider text-[#6B1713]">
              {t.footer.navHeading}
            </h4>
            <ul className="text-xs space-y-2 text-[#35160E]/80 font-medium">
              <li>
                <Link href="/#tasting-stage" className="hover:text-[#2C5E3B] transition-colors">
                  {t.nav.tastingStage}
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="hover:text-[#2C5E3B] transition-colors">
                  {t.nav.catalog}
                </Link>
              </li>
              <li>
                <Link href="/media" className="hover:text-[#2C5E3B] transition-colors">
                  {t.nav.media}
                </Link>
              </li>
              <li>
                <Link href="/#heritage" className="hover:text-[#2C5E3B] transition-colors">
                  {t.nav.heritage}
                </Link>
              </li>
              <li>
                <Link href="/#wholesale" className="hover:text-[#2C5E3B] transition-colors">
                  {t.nav.wholesale}
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Governance Sub-Pages */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-montserrat text-xs font-bold uppercase tracking-wider text-[#6B1713]">
              {t.nav.about}
            </h4>
            <ul className="text-xs space-y-2 text-[#35160E]/80 font-medium">
              {ABOUT_SUBPAGES.map((sub) => (
                <li key={sub.slug}>
                  <Link href={sub.href} className="hover:text-[#2C5E3B] transition-colors">
                    {t.about[sub.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Commercial Tiers */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-montserrat text-xs font-bold uppercase tracking-wider text-[#6B1713]">
              {t.footer.tiersHeading}
            </h4>
            <div className="text-xs text-[#35160E]/75 space-y-2">
              <div>
                <strong className="text-[#35160E] block">{t.footer.tier1Title}</strong>
                <span>{t.footer.tier1Desc}</span>
              </div>
              <div>
                <strong className="text-[#35160E] block">{t.footer.tier2Title}</strong>
                <span>{t.footer.tier2Desc}</span>
              </div>
              <div>
                <strong className="text-[#35160E] block">{t.footer.tier3Title}</strong>
                <span>{t.footer.tier3Desc}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with Language Switcher */}
        <div className="pt-8 border-t border-[#E7DAC8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#35160E]/60">
          <div className="flex items-center gap-4">
            <p suppressHydrationWarning>© {new Date().getFullYear()} K&amp;L Spices. {t.footer.rights}</p>
            <div className="hidden sm:flex items-center gap-2">
              <CurrencySwitcher variant="dropdown" />
              <LanguageSwitcher variant="segmented" />
            </div>
          </div>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-[#2C5E3B] transition-colors font-medium"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
