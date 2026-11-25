'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, ShieldCheck, Users, Landmark, Send } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { WhatsAppSimulator } from '@/components/WhatsAppSimulator';
import { useLanguage } from '@/lib/i18n';
import { useCart } from '@/lib/cartStore';
import { ABOUT_SUBPAGES, AboutSubpageLink } from '@/data/about';
import { buildB2BInquiryUrl } from '@/lib/whatsapp';

const SUBPAGE_ICONS: Record<AboutSubpageLink['slug'], React.ElementType> = {
  'learn-about-us': BookOpen,
  'core-values': ShieldCheck,
  'management-team': Users,
  'board-of-directors': Landmark,
};

interface AboutSubpageShellProps {
  activeSlug: AboutSubpageLink['slug'] | 'overview';
  title: string;
  subtitle: string;
  kicker?: string;
  children: React.ReactNode;
}

export function AboutSubpageShell({
  activeSlug,
  title,
  subtitle,
  kicker,
  children,
}: AboutSubpageShellProps) {
  const { t, language } = useLanguage();
  const { openSimulator } = useCart();

  const handleDeskContact = () => {
    const inquiry = buildB2BInquiryUrl('Corporate / Export Partnership', language);
    openSimulator({
      url: inquiry.url,
      rawText: inquiry.rawText,
      title: t.nav.fulfillmentDesk,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#173A22] via-[#215231] to-[#14321D] text-white flex flex-col font-sans selection:bg-[#6B1713] selection:text-[#FAF4E8] overflow-x-clip">
      <Navbar />

      <main className="flex-1">
        {/* Top Editorial Banner */}
        <section className="relative bg-transparent text-[#FAF4E8] border-b border-white/12 py-12 sm:py-16 overflow-x-clip">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-0 w-96 h-96 rounded-full bg-[#FAF4E8]/8 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-10 w-80 h-80 rounded-full bg-[#6B1713]/20 blur-3xl"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[#FAF4E8]/75">
              <Link
                href="/"
                className="hover:text-white transition-colors inline-flex items-center gap-1 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.about.backToAbout}</span>
              </Link>
              <span className="text-[#FAF4E8]/40">/</span>
              <Link href="/about" className="hover:text-white transition-colors font-medium">
                {t.nav.about}
              </Link>
              {activeSlug !== 'overview' && (
                <>
                  <span className="text-[#FAF4E8]/40">/</span>
                  <span className="text-[#FAF4E8] font-semibold">{title}</span>
                </>
              )}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-3xl"
            >
              <span className="text-xs uppercase tracking-[0.18em] text-[#A8D5B5] font-bold font-montserrat block mb-2">
                {kicker || t.about.kicker}
              </span>
              <h1 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF4E8] tracking-tight leading-tight">
                {title}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#FAF4E8]/85 leading-relaxed">
                {subtitle}
              </p>
            </motion.div>

            {/* Sub-Page Switcher Tabs */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {ABOUT_SUBPAGES.map((sub) => {
                const Icon = SUBPAGE_ICONS[sub.slug];
                const isActive = activeSlug === sub.slug;
                return (
                  <Link
                    key={sub.slug}
                    href={sub.href}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#6B1713] text-[#FAF4E8] shadow-md ring-1 ring-[#FAF4E8]/40'
                        : 'bg-[#FAF4E8]/12 text-[#FAF4E8]/90 border border-[#FAF4E8]/20 hover:bg-[#FAF4E8] hover:text-[#1B4328] hover:border-[#FAF4E8]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.about[sub.key]}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Sub-Page Content over Continuous Green Canvas */}
        <section className="py-14 sm:py-20 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
        </section>

        {/* Bottom Direct Fulfillment / Partnership Strip */}
        <section className="py-12 bg-white/8 backdrop-blur-xs text-[#FAF4E8] border-t border-white/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-[11px] uppercase tracking-widest text-[#A8D5B5] font-montserrat font-semibold block mb-1">
                {t.nav.fulfillmentDesk}
              </span>
              <h2 className="font-montserrat text-xl sm:text-2xl font-bold text-[#FAF4E8]">
                {t.heritage.b2bTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#FAF4E8]/80 mt-1">{t.heritage.b2bDesc}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/#catalog"
                className="px-4 py-2.5 rounded-xl border border-[#FAF4E8]/30 bg-[#FAF4E8]/10 text-xs font-semibold text-[#FAF4E8] hover:bg-[#FAF4E8] hover:text-[#1B4328] transition-colors"
              >
                {t.nav.catalog}
              </Link>
              <button
                type="button"
                onClick={handleDeskContact}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6B1713] text-[#FAF4E8] text-xs font-bold hover:bg-[#55120F] transition-colors shadow-md border border-[#FAF4E8]/15"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.heritage.b2bButton}</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CartDrawer />
      <WhatsAppSimulator />
    </div>
  );
}
