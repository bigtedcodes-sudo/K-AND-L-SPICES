'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Play,
  ShoppingBag,
  Send,
  Check,
  Clock,
  Users,
  Flame,
  Film,
  ChefHat,
  Sprout,
  ArrowUpRight,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { WhatsAppSimulator } from '@/components/WhatsAppSimulator';
import { Footer } from '@/components/Footer';
import { ReelPlayerModal } from '@/components/ReelPlayerModal';
import {
  CULINARY_REELS,
  CHEF_RECIPES,
  HARVEST_CLIPS,
  ShoppableRecipe,
} from '@/data/media';
import { CATALOG, ProductSKU, getProductImages } from '@/data/catalog';
import { getLocalizedProduct } from '@/data/catalogI18n';
import { useCart } from '@/lib/cartStore';
import { useLanguage } from '@/lib/i18n';
import { useCurrency } from '@/lib/currencyStore';
import { buildMultiItemOrderUrl } from '@/lib/whatsapp';

type RecipeCategoryFilter =
  | 'All'
  | 'Signature Dishes'
  | 'Grills & Marinades'
  | 'Broths & Soups'
  | 'Wellness & Brews';

export default function MediaAndKitchenPage() {
  const [activeReelId, setActiveReelId] = useState<string | null>(null);
  const [recipeFilter, setRecipeFilter] = useState<RecipeCategoryFilter>('All');
  const [addedRecipeIds, setAddedRecipeIds] = useState<Record<string, boolean>>({});
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({
    'recipe-party-jollof': true,
    'recipe-suya-skewers': true,
  });

  const { addItem, setIsCartOpen, openSimulator } = useCart();
  const { t, language } = useLanguage();
  const { formatPrice, isHydrated } = useCurrency();

  const resolveSpices = (ids: string[]): ProductSKU[] =>
    ids
      .map((id) => CATALOG.find((item) => item.id === id))
      .filter((item): item is ProductSKU => Boolean(item))
      .map((item) => getLocalizedProduct(item, language));

  const filteredRecipes =
    recipeFilter === 'All'
      ? CHEF_RECIPES
      : CHEF_RECIPES.filter((r) => r.category === recipeFilter);

  const handleAddRecipeSpicesToBag = (recipe: ShoppableRecipe) => {
    const resolved = resolveSpices(recipe.spices.map((s) => s.productId));
    resolved.forEach((spice) => addItem(spice, 1));
    setAddedRecipeIds((prev) => ({ ...prev, [recipe.id]: true }));
    setTimeout(() => {
      setAddedRecipeIds((prev) => ({ ...prev, [recipe.id]: false }));
    }, 2600);
  };

  const handleOrderRecipeViaWhatsApp = (recipe: ShoppableRecipe) => {
    const resolved = resolveSpices(recipe.spices.map((s) => s.productId));
    const items = resolved.map((product) => ({ product, quantity: 1 }));
    const orderData = buildMultiItemOrderUrl(
      items,
      `Chef Recipe Kit: ${recipe.title}`,
      language
    );
    openSimulator({
      url: orderData.url,
      rawText: orderData.rawText,
      title: `${t.media.orderRecipeKit}: ${recipe.title}`,
    });
  };

  const toggleSteps = (recipeId: string) => {
    setExpandedSteps((prev) => ({ ...prev, [recipeId]: !prev[recipeId] }));
  };

  const recipeCategories: RecipeCategoryFilter[] = [
    'All',
    'Signature Dishes',
    'Grills & Marinades',
    'Broths & Soups',
    'Wellness & Brews',
  ];

  return (
    <div className="min-h-screen bg-white text-[#35160E] flex flex-col">
      <Navbar />
      <CartDrawer />
      <WhatsAppSimulator />

      <main className="flex-1">
        {/* Hero Editorial Header — Deep Botanical Forest Green */}
        <section className="relative py-14 sm:py-20 bg-gradient-to-br from-[#1B4328] via-[#245634] to-[#183B23] text-[#FAF4E8] border-b border-[#163620] overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-0 w-96 h-96 rounded-full bg-[#FAF4E8]/8 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-12 w-80 h-80 rounded-full bg-[#6B1713]/20 blur-3xl"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FAF4E8]/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.productModal.backToCatalog}</span>
              </Link>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#FAF4E8]/85">
                <a href="#prep-reels" className="hover:text-[#A8D5B5] transition-colors">
                  Prep Reels (4)
                </a>
                <span aria-hidden="true" className="text-[#FAF4E8]/40">·</span>
                <a href="#recipes" className="hover:text-[#A8D5B5] transition-colors">
                  Shoppable Recipes (4)
                </a>
                <span aria-hidden="true" className="text-[#FAF4E8]/40">·</span>
                <a href="#harvest-clips" className="hover:text-[#A8D5B5] transition-colors">
                  Harvest Documentary (3)
                </a>
              </div>
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4E8]/12 border border-[#FAF4E8]/25 text-[#A8D5B5] text-xs font-bold uppercase tracking-widest font-montserrat mb-4">
                <Film className="w-3.5 h-3.5" />
                <span>{t.media.kicker}</span>
              </div>

              <h1 className="font-montserrat text-3xl sm:text-5xl font-bold text-[#FAF4E8] tracking-tight leading-tight text-balance">
                {t.media.title}
              </h1>

              <p className="mt-4 text-sm sm:text-base text-[#FAF4E8]/85 leading-relaxed max-w-2xl">
                {t.media.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 1: Vertical 15-Second Culinary & Milling Reels (Crisp White Canvas) */}
        <section id="prep-reels" className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#2C5E3B] font-bold font-montserrat block mb-1.5">
                  Vertical Culinary Reels
                </span>
                <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-[#35160E]">
                  {t.media.reelsHeading}
                </h2>
                <p className="text-sm text-[#35160E]/75 mt-1.5 max-w-2xl">
                  {t.media.reelsSubheading}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CULINARY_REELS.map((reel, idx) => {
                const linkedSpices = resolveSpices(reel.spiceIds);
                return (
                  <motion.article
                    key={reel.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.35, delay: idx * 0.06 }}
                    onClick={() => setActiveReelId(reel.id)}
                    className="group cursor-pointer rounded-3xl overflow-hidden bg-[#1D0F0A] border border-[#E7DAC8] shadow-md hover:shadow-xl transition-all flex flex-col justify-between aspect-[9/14] relative"
                  >
                    {/* Poster Visual */}
                    <img
                      src={reel.posterImage}
                      alt={reel.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/25 to-black/45 pointer-events-none" />

                    {/* Top Meta & Play Trigger */}
                    <div className="relative z-10 p-4 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#FAF4E8] bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg font-montserrat">
                        {reel.category}
                      </span>
                      <span className="text-xs font-bold tabular-nums text-[#FAF4E8] bg-[#6B1713] px-2.5 py-1 rounded-lg font-montserrat shadow-sm">
                        {reel.durationLabel}
                      </span>
                    </div>

                    {/* Center Play Affordance */}
                    <div className="relative z-10 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#FAF4E8]/92 group-hover:bg-[#2C5E3B] text-[#6B1713] group-hover:text-[#FAF4E8] shadow-xl flex items-center justify-center transition-all group-hover:scale-110">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom Title & Linked SKU Preview */}
                    <div className="relative z-10 p-4 space-y-3 text-[#FAF4E8]">
                      <div>
                        <span className="text-[11px] text-[#A8D5B5] font-medium block">
                          {reel.location} · {reel.beats.length} steps
                        </span>
                        <h3 className="font-montserrat text-base sm:text-lg font-bold leading-snug mt-0.5">
                          {reel.title}
                        </h3>
                      </div>

                      {/* Linked SKU Chips Row */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/15">
                        <div className="flex -space-x-2">
                          {linkedSpices.map((s) => {
                            const slide = getProductImages(s)[0];
                            return (
                              <span
                                key={s.id}
                                className="w-7 h-7 rounded-full overflow-hidden border-2 border-[#FAF4E8] bg-[#EFE5D4] block"
                                title={s.name}
                              >
                                <img
                                  src={slide.url}
                                  alt={s.name}
                                  referrerPolicy="no-referrer"
                                  className={`w-full h-full object-cover ${
                                    slide.backdrop === 'cutout' ? 'mix-blend-multiply' : ''
                                  }`}
                                />
                              </span>
                            );
                          })}
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FAF4E8] group-hover:text-[#A8D5B5] font-montserrat transition-colors">
                          <span>{t.media.watchReel}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 2: Shoppable Chef Recipes with One-Tap "Add All to Bag" */}
        <section id="recipes" className="py-16 sm:py-24 bg-[#F4ECE0]/60 border-y border-[#E7DAC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#6B1713] font-bold font-montserrat mb-1.5">
                  <ChefHat className="w-4 h-4" />
                  <span>Direct Catalog Recipe Kits</span>
                </div>
                <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-[#35160E]">
                  {t.media.recipesHeading}
                </h2>
                <p className="text-sm text-[#35160E]/75 mt-1.5 max-w-2xl">
                  {t.media.recipesSubheading}
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl bg-[#FAF4E8] border border-[#E7DAC8] shadow-xs overflow-x-auto max-w-full scrollbar-none">
                {recipeCategories.map((cat) => {
                  const active = recipeFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setRecipeFilter(cat)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                        active
                          ? 'bg-[#6B1713] text-[#FAF4E8] shadow-xs'
                          : 'text-[#35160E]/75 hover:text-[#2C5E3B]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredRecipes.map((recipe) => {
                const recipeSpices = resolveSpices(recipe.spices.map((s) => s.productId));
                const totalNgn = recipeSpices.reduce((sum, s) => sum + (s.price || 0), 0);
                const formattedTotal = isHydrated
                  ? formatPrice(totalNgn)
                  : `₦${totalNgn.toLocaleString()}`;
                const isAdded = Boolean(addedRecipeIds[recipe.id]);
                const stepsOpen = Boolean(expandedSteps[recipe.id]);

                return (
                  <article
                    key={recipe.id}
                    className="bg-[#FAF4E8] rounded-3xl border border-[#E7DAC8] shadow-sm overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Dish Image */}
                      <div className="relative h-60 sm:h-68 w-full overflow-hidden bg-[#EFE5D4]">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-5 right-5 text-[#FAF4E8]">
                          <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-[#FAF4E8]/85 mb-1">
                            <span>{recipe.category}</span>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {recipe.prepTime}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {recipe.servings}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1">
                              <Flame className="w-3 h-3 text-[#FAF4E8]" />
                              {recipe.heatLevel}
                            </span>
                          </div>
                          <h3 className="font-montserrat text-xl sm:text-2xl font-bold leading-snug">
                            {recipe.title}
                          </h3>
                        </div>
                      </div>

                      {/* Recipe Body */}
                      <div className="p-6 space-y-5">
                        <p className="text-sm text-[#35160E]/80 italic">
                          &ldquo;{recipe.subtitle}&rdquo;
                        </p>

                        {/* Chef Tip Hairline Box */}
                        <div className="p-3.5 rounded-2xl bg-[#F4ECE0] border border-[#E7DAC8] text-xs text-[#35160E]/85 leading-relaxed">
                          <span className="font-bold text-[#6B1713] font-montserrat uppercase tracking-wider block text-[10px] mb-1">
                            Kitchen Technique Note
                          </span>
                          {recipe.chefNote}
                        </div>

                        {/* Shoppable K&L Spices Used */}
                        <div>
                          <div className="flex items-center justify-between mb-2.5">
                            <span className="text-xs uppercase tracking-wider font-bold text-[#35160E]/75 font-montserrat">
                              {t.media.spicesUsed} ({recipeSpices.length})
                            </span>
                            <span className="text-xs font-bold text-[#6B1713] tabular-nums font-montserrat">
                              Kit Total: {formattedTotal}
                            </span>
                          </div>

                          <div className="space-y-2">
                            {recipe.spices.map((entry) => {
                              const spice = recipeSpices.find((p) => p.id === entry.productId);
                              if (!spice) return null;
                              const slide = getProductImages(spice)[0];
                              const unitPrice =
                                spice.price === null
                                  ? spice.priceDisplay
                                  : isHydrated
                                  ? formatPrice(spice.price)
                                  : spice.priceDisplay;

                              return (
                                <div
                                  key={spice.id}
                                  className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-[#F4ECE0]/75 border border-[#E7DAC8]"
                                >
                                  <Link
                                    href={`/products/${spice.slug}`}
                                    className="flex items-center gap-3 min-w-0 group flex-1"
                                  >
                                    <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#EFE5D4] border border-[#E7DAC8] shrink-0">
                                      <img
                                        src={slide.url}
                                        alt={spice.name}
                                        referrerPolicy="no-referrer"
                                        className={`w-full h-full object-cover ${
                                          slide.backdrop === 'cutout' ? 'mix-blend-multiply' : ''
                                        }`}
                                      />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-1">
                                        <span className="text-xs sm:text-sm font-bold text-[#35160E] group-hover:text-[#2C5E3B] transition-colors truncate font-montserrat">
                                          {spice.name}
                                        </span>
                                        <ArrowUpRight className="w-3.5 h-3.5 text-[#35160E]/40 group-hover:text-[#2C5E3B] shrink-0" />
                                      </div>
                                      <span className="text-[11px] text-[#35160E]/65 block">
                                        Recipe Qty: <strong className="text-[#35160E]">{entry.dosage}</strong> · {spice.packaging}
                                      </span>
                                    </div>
                                  </Link>

                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className="text-xs font-bold text-[#35160E] tabular-nums font-montserrat">
                                      {unitPrice}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => addItem(spice, 1)}
                                      className="p-2 rounded-xl bg-white hover:bg-[#2C5E3B] hover:text-[#FAF4E8] text-[#2C5E3B] border border-[#2C5E3B]/30 transition-colors"
                                      title={`Add ${spice.name} to Bag`}
                                      aria-label={`Add ${spice.name} to Bag`}
                                    >
                                      <ShoppingBag className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Collapsible Fresh Ingredients & Method */}
                        <div className="pt-2 border-t border-[#E7DAC8]">
                          <button
                            type="button"
                            onClick={() => toggleSteps(recipe.id)}
                            className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-[#2C5E3B] hover:text-[#21482D] font-montserrat"
                          >
                            <span>
                              {stepsOpen
                                ? 'Hide Method & Fresh Ingredients'
                                : 'View Step-by-Step Method & Fresh Ingredients'}
                            </span>
                            <ChevronRight
                              className={`w-4 h-4 transition-transform ${
                                stepsOpen ? 'rotate-90' : ''
                              }`}
                            />
                          </button>

                          {stepsOpen && (
                            <div className="mt-3 space-y-4 text-xs text-[#35160E]/85">
                              <div>
                                <span className="font-bold text-[#35160E] block mb-1.5 font-montserrat">
                                  Fresh Pantry Ingredients:
                                </span>
                                <ul className="space-y-1 text-[#35160E]/75">
                                  {recipe.pantryExtras.map((extra, i) => (
                                    <li key={i}>• {extra}</li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <span className="font-bold text-[#35160E] block mb-2 font-montserrat">
                                  Chef Preparation Steps:
                                </span>
                                <ol className="space-y-2.5">
                                  {recipe.steps.map((step, i) => (
                                    <li key={i} className="flex gap-2.5 leading-relaxed">
                                      <span className="font-montserrat font-bold text-[#6B1713] tabular-nums shrink-0">
                                        0{i + 1}.
                                      </span>
                                      <span>{step}</span>
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* One-Tap Add All Spices to Bag + WhatsApp Kit Order */}
                    <div className="px-6 pb-6 pt-3 border-t border-[#E7DAC8] bg-[#F4ECE0]/45 space-y-2.5">
                      <button
                        type="button"
                        onClick={() => handleAddRecipeSpicesToBag(recipe)}
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-[#2C5E3B] hover:bg-[#21482D] text-[#FAF4E8] text-xs sm:text-sm font-bold shadow-md transition-all active:scale-[0.99]"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>{t.media.addedAll}</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span>
                              {t.media.addAllToBag} ({recipeSpices.length} Jars · {formattedTotal})
                            </span>
                          </>
                        )}
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleOrderRecipeViaWhatsApp(recipe)}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#6B1713] hover:bg-[#55120F] text-[#FAF4E8] text-xs font-semibold transition-all"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{t.media.orderRecipeKit}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsCartOpen(true)}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-[#2C5E3B]/35 bg-[#FAF4E8] hover:bg-[#EBF2EC] text-[#2C5E3B] text-xs font-semibold transition-all"
                        >
                          <span>{t.hero.reviewBag}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: Harvest & Milling Origin Documentary Clips (Botanical Forest Green Contrast Band) */}
        <section
          id="harvest-clips"
          className="py-16 sm:py-24 bg-gradient-to-br from-[#1B4328] via-[#235333] to-[#193C24] text-[#FAF4E8]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#A8D5B5] font-bold font-montserrat mb-1.5">
                <Sprout className="w-4 h-4" />
                <span>Farm-to-Mill Transparency</span>
              </div>
              <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-[#FAF4E8]">
                {t.media.harvestHeading}
              </h2>
              <p className="text-sm text-[#FAF4E8]/80 mt-1.5">
                {t.media.harvestSubheading}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HARVEST_CLIPS.map((clip) => {
                const rawLinked = CATALOG.find((c) => c.id === clip.linkedProductId);
                const linkedProduct = rawLinked
                  ? getLocalizedProduct(rawLinked, language)
                  : undefined;

                return (
                  <article
                    key={clip.id}
                    className="rounded-3xl bg-[#FAF4E8] text-[#35160E] border border-[#FAF4E8]/40 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-xl transition-all"
                  >
                    <div>
                      <div className="relative aspect-4/3 overflow-hidden bg-[#EFE5D4]">
                        <img
                          src={clip.image}
                          alt={clip.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[11px] font-semibold text-[#FAF4E8]">
                          <span>{clip.duration}</span>
                          <span className="bg-[#2C5E3B] px-2.5 py-0.5 rounded-lg font-montserrat shadow-xs">
                            {clip.metricBadge}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <span className="text-[11px] uppercase tracking-wider font-bold text-[#6B1713] font-montserrat block mb-1">
                          {clip.region}
                        </span>
                        <h3 className="font-montserrat text-lg font-bold text-[#35160E] leading-snug">
                          {clip.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-[#35160E]/80 leading-relaxed">
                          {clip.summary}
                        </p>
                      </div>
                    </div>

                    {linkedProduct && (
                      <div className="px-6 pb-6 pt-3 border-t border-[#E7DAC8]">
                        <Link
                          href={`/products/${linkedProduct.slug}`}
                          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#6B1713] hover:bg-[#55120F] text-[#FAF4E8] text-xs font-bold transition-all font-montserrat shadow-xs"
                        >
                          <span>Inspect {linkedProduct.name}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <ReelPlayerModal
        reels={CULINARY_REELS}
        activeReelId={activeReelId}
        onClose={() => setActiveReelId(null)}
        onSelectReel={(id) => setActiveReelId(id)}
      />

      <Footer />
    </div>
  );
}
