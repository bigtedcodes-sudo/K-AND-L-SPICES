'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, Currency, CURRENCIES } from '@/lib/currencyStore';
import { ChevronDown, Check } from 'lucide-react';

interface CurrencySwitcherProps {
  variant?: 'dropdown' | 'segmented';
  className?: string;
}

export function CurrencySwitcher({
  variant = 'dropdown',
  className = '',
}: CurrencySwitcherProps) {
  const { currency, setCurrency, isHydrated } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currencyList = Object.values(CURRENCIES);
  const currentConfig = CURRENCIES[currency] || CURRENCIES.NGN;

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

  const handleSelect = (code: Currency) => {
    setCurrency(code);
    setIsOpen(false);
  };

  if (variant === 'segmented') {
    return (
      <div
        className={`inline-flex items-center p-1 rounded-xl bg-[#F4ECE0] border border-[#E7DAC8] shadow-xs shrink-0 ${className}`}
        role="group"
        aria-label="Currency selection"
      >
        <span className="sr-only">Switch currency</span>
        {currencyList.map((item) => {
          const isActive = isHydrated && currency === item.code;
          return (
            <button
              key={item.code}
              onClick={() => handleSelect(item.code)}
              aria-pressed={isActive}
              className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#2C5E3B] text-[#FAF4E8] shadow-xs'
                  : 'text-[#35160E]/75 hover:text-[#2C5E3B] hover:bg-[#EBF2EC]'
              }`}
              title={item.label}
            >
              <span>{item.symbol} {item.code}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left shrink-0 ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`inline-flex items-center gap-1 px-2 py-1.5 text-[11px] font-semibold rounded-lg text-[#35160E]/80 hover:text-[#2C5E3B] hover:bg-[#2C5E3B]/8 transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#2C5E3B]/20 shrink-0 ${
          isOpen ? 'bg-[#2C5E3B]/10 text-[#2C5E3B]' : ''
        }`}
        title={`Current Currency: ${currentConfig.label}`}
      >
        <span className="font-montserrat font-bold text-xs text-[#2C5E3B]">
          {currentConfig.symbol}
        </span>
        <span className="hidden sm:inline font-montserrat tracking-wider text-[11px]">
          {currentConfig.code}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-[#35160E]/50 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-[#2C5E3B]' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select currency"
          className="absolute right-0 mt-1.5 w-40 rounded-2xl bg-[#FAF4E8] border border-[#E7DAC8] shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
        >
          <div className="px-2.5 py-1 text-[10px] font-semibold text-[#35160E]/50 uppercase tracking-wider font-montserrat border-b border-[#E7DAC8]/60 mb-1">
            Display Currency
          </div>

          {currencyList.map((item) => {
            const isSelected = isHydrated && currency === item.code;
            return (
              <button
                key={item.code}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(item.code)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors text-left ${
                  isSelected
                    ? 'bg-[#2C5E3B] text-[#FAF4E8] font-semibold shadow-xs'
                    : 'text-[#35160E] hover:bg-[#EBF2EC] hover:text-[#2C5E3B] font-medium'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-montserrat font-bold text-sm w-4 text-center">
                    {item.symbol}
                  </span>
                  <span>{item.code}</span>
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
