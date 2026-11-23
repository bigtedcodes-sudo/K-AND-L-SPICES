'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { LuxuryHero } from '@/components/LuxuryHero';
import { FarmToKitchenStrip } from '@/components/FarmToKitchenStrip';
import { AnimatedCatalog } from '@/components/AnimatedCatalog';
import { CustomSpiceBox } from '@/components/CustomSpiceBox';
import { BrandHeritage } from '@/components/BrandHeritage';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { WhatsAppSimulator } from '@/components/WhatsAppSimulator';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { ProductSKU } from '@/data/catalog';

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductSKU | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF4E8] text-[#35160E] flex flex-col font-sans selection:bg-[#6B1713] selection:text-[#FAF4E8] overflow-x-clip">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Section 1: Kinetic Hero & Tasting Stage */}
        <LuxuryHero />

        {/* Agricultural Provenance Strip: Farm-to-Kitchen Bridge */}
        <FarmToKitchenStrip />

        {/* Section 2: Floating Plate Product Catalog (13 SKUs across 3 tiers) */}
        <AnimatedCatalog onSelectProduct={(prod) => setSelectedProduct(prod)} />

        {/* Section 3: Interactive Custom Gift Box Studio (Trio & Grand Vault) */}
        <CustomSpiceBox />

        {/* Section 4: Heritage Stone-Milling & B2B Commodity Export Desk */}
        <BrandHeritage />

        {/* Section 5: Corporate Story, Core Values, Management Team & Board of Directors */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Overlays */}
      <CartDrawer />
      <WhatsAppSimulator />
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
