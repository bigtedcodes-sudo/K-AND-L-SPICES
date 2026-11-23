'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, Language } from '@/lib/i18n';
import { Globe, ChevronDown, Check } from 'lucide-react';

export interface LanguageOption {
  code: Language;
  label: string;
  native: string;
  short: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', native: 'English', short: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'French', native: 'Français', short: 'FR', flag: '🇫🇷' },
  { code: 'de', label: 'German', native: 'Deutsch', short: 'DE', flag: '🇩🇪' },
];

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'segmented' | 'buttons';
  compact?: boolean;
  className?: string;
}

export function LanguageSwitcher({
  variant = 'dropdown',
  className = '',
}: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  // Segmented / button-set presentation
  if (variant === 'segmented' || variant === 'buttons') {
    return (
      <div
        className={`inline-flex items-center p-1 rounded-xl bg-[#F4ECE0] border border-[#E7DAC8] shadow-xs shrink-0 ${className}`}
        role="group"
        aria-label="Language selection"
      >
        <span className="sr-only">Switch language</span>
        {LANGUAGES.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              aria-pressed={isActive}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#2C5E3B] text-[#FAF4E8] shadow-xs'
                  : 'text-[#35160E]/75 hover:text-[#2C5E3B] hover:bg-[#EBF2EC]'
              }`}
              title={`${lang.native} (${lang.label})`}
            >
              <span>{lang.short}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Minimalist Dropdown Presentation (Default for Navbar)
  return (
    <div ref={dropdownRef} className={`relative inline-block text-left shrink-0 ${className}`}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`inline-flex items-center gap-1 px-2 py-1.5 text-[11px] font-semibold rounded-lg text-[#35160E]/80 hover:text-[#2C5E3B] hover:bg-[#2C5E3B]/8 transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#2C5E3B]/20 shrink-0 ${
          isOpen ? 'bg-[#2C5E3B]/10 text-[#2C5E3B]' : ''
        }`}
        title={`Current Language: ${activeOption.native}. Click to change.`}
      >
        <Globe className="w-3.5 h-3.5 text-[#2C5E3B] shrink-0" aria-hidden="true" />
        <span className="font-montserrat tracking-wider uppercase">{activeOption.short}</span>
        <ChevronDown
          className={`w-3 h-3 text-[#35160E]/50 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-[#2C5E3B]' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu Popover */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 mt-1.5 w-44 rounded-2xl bg-[#FAF4E8] border border-[#E7DAC8] shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
        >
          <div className="px-2.5 py-1 text-[10px] font-semibold text-[#35160E]/50 uppercase tracking-wider font-montserrat border-b border-[#E7DAC8]/60 mb-1">
            Language / Langue / Sprache
          </div>

          {LANGUAGES.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors text-left ${
                  isSelected
                    ? 'bg-[#2C5E3B] text-[#FAF4E8] font-semibold shadow-xs'
                    : 'text-[#35160E] hover:bg-[#EBF2EC] hover:text-[#2C5E3B] font-medium'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm" aria-hidden="true">
                    {lang.flag}
                  </span>
                  <div>
                    <span className="block leading-none">{lang.native}</span>
                    <span
                      className={`text-[10px] ${
                        isSelected ? 'text-[#FAF4E8]/80' : 'text-[#35160E]/50'
                      }`}
                    >
                      {lang.label}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <Check className="w-3.5 h-3.5 shrink-0 text-[#FAF4E8]" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
