'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'NGN' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  label: string;
  rateFromNgn: number;
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  NGN: { code: 'NGN', symbol: '₦', label: 'NGN (₦)', rateFromNgn: 1 },
  USD: { code: 'USD', symbol: '$', label: 'USD ($)', rateFromNgn: 1 / 1500 },
  EUR: { code: 'EUR', symbol: '€', label: 'EUR (€)', rateFromNgn: 1 / 1650 },
  GBP: { code: 'GBP', symbol: '£', label: 'GBP (£)', rateFromNgn: 1 / 1950 },
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceInNgn: number | null | undefined, showReference?: boolean) => string;
  convertPrice: (priceInNgn: number) => number;
  symbol: string;
  isHydrated: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_STORAGE_KEY = 'kl_spices_currency_v1';

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('NGN');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(CURRENCY_STORAGE_KEY) as Currency;
        if (saved && CURRENCIES[saved]) {
          setCurrencyState(saved);
        }
      } catch {
        // ignore
      }
      setIsHydrated(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, c);
    } catch {
      // ignore
    }
  };

  const convertPrice = (priceInNgn: number): number => {
    const rate = CURRENCIES[currency].rateFromNgn;
    return priceInNgn * rate;
  };

  const formatPrice = (
    priceInNgn: number | null | undefined,
    showReference: boolean = false
  ): string => {
    if (priceInNgn === null || priceInNgn === undefined) {
      return 'Quote';
    }

    const config = CURRENCIES[currency];

    if (currency === 'NGN') {
      return `₦${priceInNgn.toLocaleString()}`;
    }

    const converted = convertPrice(priceInNgn);
    const formattedConverted = `${config.symbol}${converted.toFixed(2)}`;

    if (showReference) {
      return `${formattedConverted} (₦${priceInNgn.toLocaleString()})`;
    }

    return formattedConverted;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        symbol: CURRENCIES[currency].symbol,
        isHydrated,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
