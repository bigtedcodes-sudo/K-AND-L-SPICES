'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, MessageSquare, Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { useCart } from '@/lib/cartStore';
import { useLanguage } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { CurrencySwitcher } from '@/components/CurrencySwitcher';
import { DISPLAY_PHONE_NUMBER, buildB2BInquiryUrl } from '@/lib/whatsapp';
import { ABOUT_SUBPAGES } from '@/data/about';
import { BrandLogo } from '@/components/BrandLogo';

export function Navbar() {
  const { totalItems, setIsCartOpen, openSimulator, isHydrated } = useCart();
  const { t, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const aboutMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (aboutMenuRef.current && !aboutMenuRef.current.contains(e.target as Node)) {
        setAboutMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuickWhatsApp = () => {
    const inquiry = buildB2BInquiryUrl(undefined, language);
    openSimulator({
      url: inquiry.url,
      rawText: inquiry.rawText,
      title: t.nav.fulfillmentDesk,
    });
  };

  const navLinks = [
    { href: '/#catalog', label: t.nav.catalog },
    { href: '/media', label: t.nav.media },
    { href: '/#gift-box', label: t.nav.giftBox },
    { href: '/#heritage', label: t.nav.heritage },
    { href: '/#wholesale', label: t.nav.wholesale },
  ];

  return (
    <>
      {/* Ultra-slim Top Announcement Strip: Crisp White + Botanical Green (scrolls away cleanly) */}
      <div className="w-full bg-white text-[#2C5E3B] border-b border-[#E7DAC8]/75 h-8 px-4 flex items-center justify-center">
        <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] uppercase truncate flex items-center gap-2">
          <span>{t.topRibbon.tagline}</span>
          <span aria-hidden="true" className="text-[#2C5E3B]/35 hidden sm:inline">·</span>
          <span className="hidden sm:inline font-medium text-[#2C5E3B]/85">{t.topRibbon.subtag}</span>
          <span aria-hidden="true" className="text-[#2C5E3B]/35 hidden md:inline">·</span>
          <span className="hidden md:inline font-medium text-[#2C5E3B]/85">{DISPLAY_PHONE_NUMBER}</span>
        </p>
      </div>

      {/* Sleek Single-Row Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF4E8]/95 border-b border-[#E7DAC8]/90 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Circular Botanical Crest + Refined Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group"
          >
            <BrandLogo size="md" className="group-hover:scale-105" />
            <span className="font-montserrat text-sm sm:text-base font-bold tracking-[0.22em] text-[#35160E] group-hover:text-[#2C5E3B] transition-colors">
              SPICES
            </span>
          </Link>

          {/* Zone 2: Clean Single-Line Navigation Links (Visible at lg+ / 1024px+) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-semibold tracking-wide text-[#35160E]/80">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[#2C5E3B] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {link.label}
              </Link>
            ))}

            {/* About Dropdown with 4 Sub-Pages */}
            <div
              ref={aboutMenuRef}
              className="relative"
              onMouseEnter={() => setAboutMenuOpen(true)}
              onMouseLeave={() => setAboutMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setAboutMenuOpen((prev) => !prev)}
                aria-expanded={aboutMenuOpen}
                className="inline-flex items-center gap-1 hover:text-[#2C5E3B] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                <span>{t.nav.about}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    aboutMenuOpen ? 'rotate-180 text-[#2C5E3B]' : ''
                  }`}
                />
              </button>

              {aboutMenuOpen && (
                <div className="absolute left-0 top-full pt-2 w-56 z-50">
                  <div className="bg-[#FAF4E8] rounded-2xl border border-[#E7DAC8] shadow-xl p-1.5 space-y-0.5">
                    <Link
                      href="/#about"
                      onClick={() => setAboutMenuOpen(false)}
                      className="block px-3 py-2 rounded-xl text-xs font-bold font-montserrat text-[#2C5E3B] hover:bg-[#EBF2EC] transition-colors border-b border-[#E7DAC8]/60 mb-1"
                    >
                      {t.about.overviewLink}
                    </Link>
                    {ABOUT_SUBPAGES.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={sub.href}
                        onClick={() => setAboutMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#35160E] hover:bg-[#2C5E3B] hover:text-[#FAF4E8] transition-colors"
                      >
                        <span>{t.about[sub.key]}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Minimalist Currency, Language & Brand Burgundy Bag CTA */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <CurrencySwitcher variant="dropdown" />
            <span aria-hidden="true" className="h-3.5 w-px bg-[#E7DAC8] mx-0.5 hidden sm:inline-block" />
            <LanguageSwitcher variant="dropdown" />

            <button
              onClick={() => setIsCartOpen(true)}
              suppressHydrationWarning
              className="ml-1 sm:ml-2 relative inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#6B1713] text-[#FAF4E8] font-semibold text-xs tracking-wide shadow-xs hover:bg-[#55120F] active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
              aria-label={`Shopping Cart with ${isHydrated ? totalItems : 0} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{t.nav.orderBag}</span>
              {isHydrated && totalItems > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#FAF4E8] text-[#6B1713] tabular-nums leading-none shrink-0">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile & Tablet Menu Button (Below lg) */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden ml-0.5 p-2 rounded-lg text-[#35160E] hover:bg-[#35160E]/5 transition-colors shrink-0"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Clean Mobile & Tablet Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E7DAC8] bg-[#FAF4E8] px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#E7DAC8]/60">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#F4ECE0]/70 text-xs font-semibold text-[#35160E] hover:bg-[#2C5E3B] hover:text-[#FAF4E8] transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              ))}
            </div>

            {/* About Sub-Pages Section */}
            <div className="pb-2 border-b border-[#E7DAC8]/60 space-y-1.5">
              <span className="block px-1 text-[10px] font-bold uppercase tracking-widest text-[#2C5E3B] font-montserrat">
                {t.nav.about}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {ABOUT_SUBPAGES.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={sub.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-[#E7DAC8] text-xs font-semibold text-[#35160E] hover:bg-[#2C5E3B] hover:text-[#FAF4E8] hover:border-[#2C5E3B] transition-colors"
                  >
                    <span className="truncate">{t.about[sub.key]}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between px-1 py-1">
              <span className="text-xs font-semibold text-[#35160E]/70 font-montserrat">
                Currency:
              </span>
              <CurrencySwitcher variant="segmented" />
            </div>

            <div className="flex items-center justify-between px-1 py-1">
              <span className="text-xs font-semibold text-[#35160E]/70 font-montserrat">
                Language / Langue:
              </span>
              <LanguageSwitcher variant="segmented" />
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleQuickWhatsApp();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#2C5E3B]/35 bg-[#EBF2EC]/60 text-[#2C5E3B] text-xs font-bold hover:bg-[#2C5E3B] hover:text-[#FAF4E8] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.nav.fulfillmentDesk} ({DISPLAY_PHONE_NUMBER})</span>
            </button>
          </div>
        )}
      </header>
    </>
  );
}
