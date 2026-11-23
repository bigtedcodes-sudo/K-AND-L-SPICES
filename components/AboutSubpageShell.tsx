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
    <div className="min-h-screen bg-[#FAF4E8] text-[#35160E] flex flex-col font-sans selection:bg-[#6B1713] selection:text-[#FAF4E8] overflow-x-clip">
      <Navbar />

      <main className="flex-1">
        {/* Top Editorial Banner */}
        <section className="bg-[#F4ECE0]/80 border-b border-[#E7DAC8] py-12 sm:py-16 relative overflow-x-clip">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[#35160E]/65">
              <Link
                href="/"
                className="hover:text-[#2C5E3B] transition-colors inline-flex items-center gap-1 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.about.backToAbout}</span>
              </Link>
              <span>/</span>
              <Link href="/about" className="hover:text-[#2C5E3B] transition-colors font-medium">
                {t.nav.about}
              </Link>
              {activeSlug !== 'overview' && (
                <>
                  <span>/</span>
                  <span className="text-[#35160E] font-semibold">{title}</span>
                </>
              )}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-3xl"
            >
              <span className="text-xs uppercase tracking-widest text-[#6B1713] font-bold font-montserrat block mb-2">
                {kicker || t.about.kicker}
              </span>
              <h1 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-bold text-[#35160E] tracking-tight leading-tight">
                {title}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#35160E]/80 leading-relaxed">
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
                        ? 'bg-[#6B1713] text-[#FAF4E8] shadow-sm'
                        : 'bg-[#FAF4E8] text-[#35160E]/80 border border-[#E7DAC8] hover:border-[#2C5E3B]/45 hover:bg-[#EBF2EC]/60 hover:text-[#2C5E3B]'
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

        {/* Main Sub-Page Content */}
        <section className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
        </section>

        {/* Bottom Direct Fulfillment / Partnership Strip */}
        <section className="py-12 bg-[#35160E] text-[#FAF4E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-[11px] uppercase tracking-widest text-[#E7DAC8]/75 font-montserrat font-semibold block mb-1">
                {t.nav.fulfillmentDesk}
              </span>
              <h2 className="font-montserrat text-xl sm:text-2xl font-bold text-[#FAF4E8]">
                {t.heritage.b2bTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#FAF4E8]/75 mt-1">{t.heritage.b2bDesc}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/#catalog"
                className="px-4 py-2.5 rounded-xl border border-[#8CB89A]/55 text-xs font-semibold text-[#FAF4E8] hover:bg-[#2C5E3B] hover:border-[#2C5E3B] transition-colors"
              >
                {t.nav.catalog}
              </Link>
              <button
                type="button"
                onClick={handleDeskContact}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF4E8] text-[#6B1713] text-xs font-bold hover:bg-[#F4ECE0] transition-colors shadow-md"
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
