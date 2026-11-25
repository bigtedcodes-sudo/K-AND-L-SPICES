'use client';

import React from 'react';
import { Sprout, SunMedium, ShieldCheck, PackageCheck } from 'lucide-react';
import { useLanguage, Language } from '@/lib/i18n';

interface PillarItem {
  title: string;
  detail: string;
  accent: 'green' | 'burgundy';
  icon: React.ElementType;
}

const STRIP_COPY: Record<
  Language,
  {
    eyebrow: string;
    pillars: Omit<PillarItem, 'icon' | 'accent'>[];
  }
> = {
  en: {
    eyebrow: 'From Nigerian Farmlands to Your Kitchen',
    pillars: [
      {
        title: 'Direct Farm Harvest',
        detail: 'Kaduna ginger, Benue turmeric & Ogun peppers sourced from partner farms.',
      },
      {
        title: 'Sun-Dried & Stone-Milled',
        detail: 'Low-heat milling preserves deep color, volatile oils & bold aroma.',
      },
      {
        title: '100% Pure Botanicals',
        detail: 'Zero artificial dyes, zero starch fillers, zero preservatives.',
      },
      {
        title: 'Sealed Fresh at Origin',
        detail: 'Packed within 24 hours for home kitchens, chefs & bulk export.',
      },
    ],
  },
  de: {
    eyebrow: 'Von nigerianischem Ackerland direkt in Ihre Küche',
    pillars: [
      {
        title: 'Direkte Farmernte',
        detail: 'Ingwer aus Kaduna, Kurkuma aus Benue & Pfeffer aus Ogun direkt von Partnerhöfen.',
      },
      {
        title: 'Sonnengetrocknet & Steingemahlen',
        detail: 'Kaltvermahlung bewahrt natürliche Farbe, ätherische Öle & volles Aroma.',
      },
      {
        title: '100% Reine Botanik',
        detail: 'Keine Farbstoffe, keine Füllstoffe, keine Konservierungsmittel.',
      },
      {
        title: 'Frisch am Ursprung versiegelt',
        detail: 'Innerhalb von 24 Stunden verpackt für Küche, Gastronomie & Export.',
      },
    ],
  },
  fr: {
    eyebrow: 'Des Terres Nigérianes Directement à Votre Cuisine',
    pillars: [
      {
        title: 'Récolte Directe Ferme',
        detail: 'Gingembre de Kaduna, curcuma de Benue & poivres d’Ogun issus de fermes partenaires.',
      },
      {
        title: 'Séché au Soleil & Moulu sur Pierre',
        detail: 'Mouture douce préservant couleurs intenses, huiles essentielles et arômes.',
      },
      {
        title: '100% Épices Pures',
        detail: 'Sans colorants artificiels, sans additifs ni conservateurs.',
      },
      {
        title: 'Scellé Frais à l’Origine',
        detail: 'Conditionné sous 24h pour la maison, les chefs et l’exportation.',
      },
    ],
  },
};

const ICONS = [Sprout, SunMedium, ShieldCheck, PackageCheck];
const ACCENTS: Array<'green' | 'burgundy'> = ['green', 'burgundy', 'green', 'burgundy'];

export function FarmToKitchenStrip() {
  const { language } = useLanguage();
  const content = STRIP_COPY[language] || STRIP_COPY.en;

  return (
    <section
      aria-label={content.eyebrow}
      className="bg-white/6 backdrop-blur-xs border-y border-white/15 py-7 sm:py-9 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 mb-5 sm:mb-6">
          <span className="h-px w-6 sm:w-10 bg-white/30" aria-hidden="true" />
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#A8D5B5] font-montserrat text-center">
            {content.eyebrow}
          </p>
          <span className="h-px w-6 sm:w-10 bg-white/30" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x lg:divide-white/15">
          {content.pillars.map((pillar, idx) => {
            const Icon = ICONS[idx];
            const isGreen = ACCENTS[idx] === 'green';

            return (
              <div
                key={pillar.title}
                className="flex items-start gap-3.5 lg:px-6 first:lg:pl-0 last:lg:pr-0"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                    isGreen
                      ? 'bg-white text-[#2C5E3B]'
                      : 'bg-[#6B1713] text-white border border-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-montserrat text-xs sm:text-[13px] font-bold text-white leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/80 leading-relaxed mt-0.5">
                    {pillar.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
