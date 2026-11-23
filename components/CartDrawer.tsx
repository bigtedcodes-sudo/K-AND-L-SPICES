'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, ShieldCheck } from 'lucide-react';
import { useCart } from '@/lib/cartStore';
import { useLanguage } from '@/lib/i18n';
import { useCurrency } from '@/lib/currencyStore';
import { getLocalizedProduct } from '@/data/catalogI18n';
import { buildMultiItemOrderUrl, DISPLAY_PHONE_NUMBER } from '@/lib/whatsapp';
import { BrandLogo } from '@/components/BrandLogo';

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    openSimulator,
    subtotal,
    totalItems,
  } = useCart();

  const { t, language } = useLanguage();
  const { formatPrice } = useCurrency();
  const [customerNote, setCustomerNote] = useState('');

  if (!isCartOpen) return null;

  const handleCheckoutWhatsApp = () => {
    const orderData = buildMultiItemOrderUrl(items, customerNote, language);
    openSimulator({
      url: orderData.url,
      rawText: orderData.rawText,
      title: t.cart.checkoutButton,
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="w-screen max-w-md bg-[#FAF4E8] shadow-2xl border-l border-[#E7DAC8] flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#E7DAC8] flex items-center justify-between bg-[#F4ECE0]/80">
              <div className="flex items-center gap-3">
                <BrandLogo size="sm" />
                <div>
                  <h2 className="font-montserrat text-lg font-bold text-[#35160E]">
                    {t.cart.title}
                  </h2>
                  <p className="text-xs text-[#35160E]/70">
                    {totalItems} {t.cart.itemsCount}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-black/5 text-[#35160E] transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items Scrollable Container */}
            <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#E7DAC8]/70">
              {items.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#F4ECE0] border border-[#E7DAC8] flex items-center justify-center text-[#35160E]/40 mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-montserrat text-base font-bold text-[#35160E] mb-1">
                    {t.cart.emptyTitle}
                  </h3>
                  <p className="text-xs text-[#35160E]/60 max-w-xs mb-6">
                    {t.cart.emptyDesc}
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-[#6B1713] text-[#FAF4E8] text-xs font-semibold shadow-sm hover:bg-[#55120F] transition-all"
                  >
                    {t.cart.exploreButton}
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pt-2">
                  {items.map((item) => {
                    const localized = getLocalizedProduct(item.product, language);
                    const isB2B = localized.price === null;
                    const itemTotal = (localized.price || 0) * item.quantity;

                    return (
                      <div
                        key={localized.id}
                        className="py-3 flex gap-3 items-center justify-between"
                      >
                        {/* Thumbnail */}
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#F4ECE0] border border-[#E7DAC8] shrink-0 relative">
                          <img
                            src={localized.dishImage || '/images/heritage_banner.jpg'}
                            alt={localized.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 pr-2">
                          <h4 className="font-montserrat text-xs font-bold text-[#35160E] truncate">
                            {localized.name}
                          </h4>
                          <span className="text-[10px] text-[#35160E]/60 block">
                            {localized.packaging}
                          </span>
                          <span className="text-xs font-semibold text-[#6B1713] tabular-nums font-montserrat">
                            {isB2B ? t.catalog.quoteButton : formatPrice(itemTotal)}
                          </span>
                        </div>

                        {/* Quantity Mutator */}
                        <div className="flex items-center gap-1.5 border border-[#E7DAC8] rounded-xl bg-white p-1 shadow-xs shrink-0">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 rounded-lg hover:bg-[#EBF2EC] hover:text-[#2C5E3B] text-[#35160E] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold tabular-nums text-[#35160E]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 rounded-lg hover:bg-[#EBF2EC] hover:text-[#2C5E3B] text-[#35160E] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1.5 text-[#35160E]/40 hover:text-red-700 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Order Notes / Address Input */}
              {items.length > 0 && (
                <div className="pt-5 mt-4">
                  <label
                    htmlFor="customer-note"
                    className="block text-xs font-semibold text-[#35160E] uppercase tracking-wider mb-2 font-montserrat"
                  >
                    {t.cart.deliveryNotes}
                  </label>
                  <textarea
                    id="customer-note"
                    rows={2}
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder={t.cart.deliveryPlaceholder}
                    className="w-full rounded-xl border border-[#E7DAC8] bg-white p-3 text-xs text-[#35160E] placeholder-[#35160E]/40 focus:outline-hidden focus:ring-2 focus:ring-[#6B1713]/30"
                  />
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout Button */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#E7DAC8] bg-[#F4ECE0]/80 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#35160E]/75">
                    <span>{t.cart.subtotal}</span>
                    <span className="tabular-nums font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#35160E]/75">
                    <span>{t.cart.dispatchLabel}</span>
                    <span className="text-[#2C5E3B] font-semibold">{t.cart.dispatchValue}</span>
                  </div>
                  <div className="flex items-center justify-between text-base font-bold text-[#35160E] pt-2 border-t border-[#E7DAC8]">
                    <span className="font-montserrat">{t.cart.estimatedTotal}</span>
                    <span className="text-[#6B1713] tabular-nums font-montserrat text-lg">
                      {formatPrice(subtotal, true)}
                    </span>
                  </div>
                </div>

                {/* Primary WhatsApp Checkout CTA */}
                <button
                  onClick={handleCheckoutWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#6B1713] text-[#FAF4E8] font-bold text-sm shadow-md hover:bg-[#55120F] active:scale-[0.99] transition-all group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  <span>{t.cart.checkoutButton}</span>
                </button>

                <div className="flex items-center justify-between text-[11px] text-[#35160E]/60 pt-1">
                  <button
                    onClick={clearCart}
                    className="hover:text-red-700 transition-colors"
                  >
                    {t.cart.clearBag}
                  </button>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2C5E3B]" />
                    <span>{t.cart.routingNotice} {DISPLAY_PHONE_NUMBER}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
