'use client';

import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  onDarkSurface?: boolean;
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<BrandLogoProps['size']>, string> = {
  sm: 'w-9 h-9 p-1',
  md: 'w-9 h-9 sm:w-10 sm:h-10 p-1',
  lg: 'w-12 h-12 sm:w-14 sm:h-14 p-1.5',
  hero: 'w-16 h-16 sm:w-20 sm:h-20 p-1.5',
};

export function BrandLogo({
  size = 'md',
  onDarkSurface = false,
  className = '',
}: BrandLogoProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-white shrink-0 overflow-hidden transition-transform duration-300 ${
        onDarkSurface
          ? 'ring-2 ring-[#FAF4E8]/75 border border-[#2C5E3B]/60 shadow-lg'
          : 'ring-1 ring-[#2C5E3B]/50 border border-[#E7DAC8] shadow-xs'
      } ${SIZE_CLASSES[size]} ${className}`}
    >
      <img
        src="/images/kl_logo_botanical.png"
        alt="K&L Spices"
        className="w-full h-full object-contain scale-105"
      />
    </span>
  );
}
