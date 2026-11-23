'use client';

import React from 'react';
import { CartProvider } from '@/lib/cartStore';
import { LanguageProvider } from '@/lib/i18n';
import { CurrencyProvider } from '@/lib/currencyStore';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <CartProvider>{children}</CartProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}
