'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, ExternalLink, MessageCircle, Phone } from 'lucide-react';
import { useCart } from '@/lib/cartStore';
import { useLanguage } from '@/lib/i18n';
import { DISPLAY_PHONE_NUMBER } from '@/lib/whatsapp';
import { BrandLogo } from '@/components/BrandLogo';

export function WhatsAppSimulator() {
  const { isSimulatorOpen, setIsSimulatorOpen, simulatorData } = useCart();
  const { t } = useLanguage();
  const [copiedText, setCopiedText] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isSimulatorOpen) return null;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(simulatorData.rawText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2200);
    } catch {
      // fallback
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(simulatorData.url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2200);
    } catch {
      // fallback
    }
  };

  const handleLaunchWhatsApp = () => {
    if (simulatorData.url) {
      window.open(simulatorData.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSimulatorOpen(false)}
          className="absolute inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-[#FAF4E8] rounded-3xl shadow-2xl border border-[#E7DAC8] overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header styled as WhatsApp Business Banner with K&L Branding */}
          <div className="bg-gradient-to-r from-[#1B4328] to-[#265A37] text-[#FAF4E8] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BrandLogo size="sm" onDarkSurface />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-sm">{t.simulator.headerTitle}</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" title={t.simulator.onlineBadge} />
                </div>
                <div className="flex items-center gap-2 text-xs text-[#FAF4E8]/80">
                  <Phone className="w-3 h-3" />
                  <span>{DISPLAY_PHONE_NUMBER}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsSimulatorOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-[#FAF4E8]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subtitle / Mode Indicator */}
          <div className="bg-[#F4ECE0] px-5 py-2.5 border-b border-[#E7DAC8] flex items-center justify-between text-xs text-[#35160E]/75">
            <span className="font-medium">{t.simulator.subHeading}</span>
            <span className="text-[11px] font-mono text-[#6B1713]">URI-Encoded Dispatch</span>
          </div>

          {/* Message Preview Container simulating WhatsApp message bubble */}
          <div className="p-5 overflow-y-auto flex-1 bg-[#F5EFE6]/60">
            <div className="text-[11px] text-center text-[#35160E]/50 mb-3 uppercase tracking-wider">
              {t.simulator.payloadHeader}
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E7DAC8] text-xs text-[#35160E] space-y-2 whitespace-pre-wrap font-sans leading-relaxed">
              {simulatorData.rawText || 'No payload compiled.'}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-[#FAF4E8] border border-[#E7DAC8] text-[11px] text-[#35160E]/80">
              <span className="font-semibold block text-[#6B1713] mb-0.5">
                {t.simulator.benefitTitle}
              </span>
              {t.simulator.benefitText}
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="p-4 bg-[#FAF4E8] border-t border-[#E7DAC8] space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopyText}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#2C5E3B]/30 bg-white hover:bg-[#EBF2EC] hover:text-[#2C5E3B] hover:border-[#2C5E3B]/50 text-[#35160E] text-xs font-semibold transition-all shadow-sm"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#2C5E3B]" />
                    <span className="text-[#2C5E3B]">{t.simulator.messageCopied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#2C5E3B]" />
                    <span>{t.simulator.copyMessage}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyUrl}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#2C5E3B]/30 bg-white hover:bg-[#EBF2EC] hover:text-[#2C5E3B] hover:border-[#2C5E3B]/50 text-[#35160E] text-xs font-semibold transition-all shadow-sm"
              >
                {copiedUrl ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#2C5E3B]" />
                    <span className="text-[#2C5E3B]">{t.simulator.linkCopied}</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-3.5 h-3.5 text-[#2C5E3B]" />
                    <span>{t.simulator.copyLink}</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleLaunchWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#6B1713] text-[#FAF4E8] font-semibold text-xs sm:text-sm shadow-md hover:bg-[#55120F] active:scale-[0.99] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.simulator.launchButton}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
