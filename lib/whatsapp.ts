import { ProductSKU } from '@/data/catalog';
import { Language } from '@/lib/i18n';

export const WHATSAPP_PHONE_NUMBER = '2348104835175';
export const DISPLAY_PHONE_NUMBER = '+234 810 483 5175';

export interface CartItem {
  product: ProductSKU;
  quantity: number;
}

/**
 * Builds direct WhatsApp URL for a single item purchase in user's language
 */
export function buildSingleItemOrderUrl(
  product: ProductSKU,
  quantity: number = 1,
  lang: Language = 'en',
  formattedUnitPrice?: string,
  formattedTotalPrice?: string
): {
  url: string;
  rawText: string;
} {
  const isB2B = product.category === 'Bulk & Export' || product.price === null;
  const total = (product.price || 0) * quantity;

  const baseUnitNgn = `₦${product.price?.toLocaleString()}`;
  const baseTotalNgn = `₦${total.toLocaleString()}`;
  const unitDisplay =
    formattedUnitPrice && formattedUnitPrice !== baseUnitNgn
      ? `${formattedUnitPrice} (${baseUnitNgn})`
      : baseUnitNgn;
  const totalDisplay =
    formattedTotalPrice && formattedTotalPrice !== baseTotalNgn
      ? `${formattedTotalPrice} (${baseTotalNgn})`
      : formattedUnitPrice && quantity === 1 && formattedUnitPrice !== baseUnitNgn
      ? `${formattedUnitPrice} (${baseTotalNgn})`
      : baseTotalNgn;

  let rawText = '';

  if (lang === 'de') {
    if (isB2B) {
      rawText = `Hallo K&L Spices! 🌿\n\nIch möchte Großhandelspreise anfragen für:\n• Produkt: *${product.name}* (${product.packaging})\n• Benötigte Menge: ${quantity} Einheit(en)\n• Lieferort / Hafen:\n\nBitte senden Sie Ihre aktuellen FOB/Door-Tarife. Vielen Dank!`;
    } else {
      rawText = `Hallo K&L Spices! 🌿\n\nIch möchte bestellen:\n• Produkt: *${product.name}* (${product.packaging})\n• Menge: ${quantity}\n• Stückpreis: ${unitDisplay}\n• Gesamtbetrag: *${totalDisplay}*\n\nBitte bestätigen Sie die Verfügbarkeit und Versanddetails für meine Adresse:`;
    }
  } else if (lang === 'fr') {
    if (isB2B) {
      rawText = `Bonjour K&L Spices ! 🌿\n\nJe souhaite demander un devis de gros pour :\n• Produit : *${product.name}* (${product.packaging})\n• Volume requis : ${quantity} unité(s)\n• Destination / Port :\n\nMerci de me transmettre vos tarifs actuels FOB/Port. Cordialement !`;
    } else {
      rawText = `Bonjour K&L Spices ! 🌿\n\nJe souhaite commander :\n• Produit : *${product.name}* (${product.packaging})\n• Quantité : ${quantity}\n• Prix unitaire : ${unitDisplay}\n• Total estimé : *${totalDisplay}*\n\nMerci de confirmer la disponibilité et les modalités de livraison à mon adresse :`;
    }
  } else {
    // English default
    if (isB2B) {
      rawText = `Hello K&L Spices! 🌿\n\nI want to request wholesale/bulk pricing for:\n• Product: *${product.name}* (${product.packaging})\n• Quantity Requirement: ${quantity} Unit(s)\n• Destination / Location:\n\nPlease share your current FOB/Door delivery rate card. Thank you!`;
    } else {
      rawText = `Hello K&L Spices! 🌿\n\nI want to order:\n• Product: *${product.name}* (${product.packaging})\n• Quantity: ${quantity}\n• Unit Price: ${unitDisplay}\n• Estimated Total: *${totalDisplay}*\n\nPlease confirm product availability and delivery dispatch details to my address:`;
    }
  }

  const encodedText = encodeURIComponent(rawText);
  return {
    url: `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedText}`,
    rawText,
  };
}

/**
 * Builds direct WhatsApp URL for multi-item cart checkout in user's language
 */
export function buildMultiItemOrderUrl(
  items: CartItem[],
  customerNote: string = '',
  lang: Language = 'en'
): {
  url: string;
  rawText: string;
} {
  if (items.length === 0) {
    const greeting =
      lang === 'de'
        ? 'Hallo K&L Spices! 🌿 Ich interessiere mich für Ihre traditionellen Gewürze.'
        : lang === 'fr'
        ? 'Bonjour K&L Spices ! 🌿 Je m’intéresse à vos épices traditionnelles.'
        : 'Hello K&L Spices! 🌿 I would like to inquire about your heritage spices.';
    return {
      url: `https://wa.me/${WHATSAPP_PHONE_NUMBER}`,
      rawText: greeting,
    };
  }

  let totalNgn = 0;
  let hasB2B = false;

  const itemLines = items
    .map((item) => {
      const isB2B = item.product.price === null;
      if (isB2B) {
        hasB2B = true;
        const quoteNote =
          lang === 'de'
            ? '[Angebot erforderlich]'
            : lang === 'fr'
            ? '[Devis Requis]'
            : '[Quote Required]';
        return `• ${item.quantity}x *${item.product.name}* (${item.product.packaging}) - ${quoteNote}`;
      }
      const lineTotal = (item.product.price || 0) * item.quantity;
      totalNgn += lineTotal;
      return `• ${item.quantity}x *${item.product.name}* (${item.product.packaging}) - ₦${lineTotal.toLocaleString()}`;
    })
    .join('\n');

  let rawText = '';
  if (lang === 'de') {
    rawText = `Hallo K&L Spices! 🌿\n\nIch möchte folgende Bestellung aufgeben:\n${itemLines}\n\n`;
    if (totalNgn > 0) {
      rawText += `*Geschätzte Gesamtsumme: ₦${totalNgn.toLocaleString()}*`;
      if (hasB2B) rawText += ` (+ Großhandels-Positionen)`;
      rawText += '\n';
    }
    if (customerNote.trim()) {
      rawText += `• Lieferhinweis: "${customerNote.trim()}"\n`;
    }
    rawText += `\nBitte bestätigen Sie die Verfügbarkeit und Lieferdetails für meine Adresse:`;
  } else if (lang === 'fr') {
    rawText = `Bonjour K&L Spices ! 🌿\n\nJe souhaite passer la commande suivante :\n${itemLines}\n\n`;
    if (totalNgn > 0) {
      rawText += `*Total Estimé : ₦${totalNgn.toLocaleString()}*`;
      if (hasB2B) rawText += ` (+ Articles sur devis)`;
      rawText += '\n';
    }
    if (customerNote.trim()) {
      rawText += `• Note : "${customerNote.trim()}"\n`;
    }
    rawText += `\nMerci de me confirmer la disponibilité et le délai d’expédition :`;
  } else {
    rawText = `Hello K&L Spices! 🌿\n\nI would like to place an order:\n${itemLines}\n\n`;
    if (totalNgn > 0) {
      rawText += `*Estimated Total: ₦${totalNgn.toLocaleString()}*`;
      if (hasB2B) rawText += ` (+ Bulk Quote items)`;
      rawText += '\n';
    }
    if (customerNote.trim()) {
      rawText += `• Note: "${customerNote.trim()}"\n`;
    }
    rawText += `\nPlease confirm availability and delivery timelines to my location:`;
  }

  const encodedText = encodeURIComponent(rawText);
  return {
    url: `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedText}`,
    rawText,
  };
}

/**
 * Builds general B2B inquiry URL in user's language
 */
export function buildB2BInquiryUrl(
  productName?: string,
  lang: Language = 'en'
): {
  url: string;
  rawText: string;
} {
  let rawText = '';

  if (lang === 'de') {
    const target = productName ? `*${productName}*` : 'Ihre Rohexport-Gewürze';
    rawText = `Hallo K&L Spices! 🌿\n\nIch kontaktiere Ihre Exportabteilung für B2B-Konditionen zu ${target}.\n\n• Unternehmen:\n• Abnahmemenge (Kg/Tonnen):\n• Zielort / Hafen:`;
  } else if (lang === 'fr') {
    const target = productName ? `*${productName}*` : 'vos denrées d’export brutes';
    rawText = `Bonjour K&L Spices ! 🌿\n\nJe contacte votre service commercial pour obtenir vos tarifs de gros pour ${target}.\n\n• Société / Établissement :\n• Volume prévisionnel (Kg/T) :\n• Destination / Port :`;
  } else {
    const target = productName ? `*${productName}*` : 'your bulk raw export commodities';
    rawText = `Hello K&L Spices! 🌿\n\nI am contacting your Commercial Desk to request B2B wholesale pricing and container specifications for ${target}.\n\n• Company / Organization:\n• Sourcing Volume (Kg/MT):\n• Port / Delivery City:`;
  }

  const encodedText = encodeURIComponent(rawText);
  return {
    url: `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedText}`,
    rawText,
  };
}

/**
 * Builds direct WhatsApp URL for a custom curated gift box
 */
export function buildGiftBoxOrderUrl(params: {
  boxTitle: string;
  jarCount: number;
  spices: ProductSKU[];
  priceNgn: number;
  recipientName?: string;
  giftMessage?: string;
  currencyCode?: string;
  currencyPrice?: string;
  lang?: Language;
}): {
  url: string;
  rawText: string;
} {
  const {
    boxTitle,
    jarCount,
    spices,
    priceNgn,
    recipientName = '',
    giftMessage = '',
    currencyPrice,
    lang = 'en',
  } = params;

  const spiceList = spices.map((s, i) => `  ${i + 1}. *${s.name}* (${s.packaging})`).join('\n');
  const priceDisplay = currencyPrice
    ? `${currencyPrice} (₦${priceNgn.toLocaleString()})`
    : `₦${priceNgn.toLocaleString()}`;

  let rawText = '';

  if (lang === 'de') {
    rawText = `Hallo K&L Spices! 🎁\n\nIch möchte eine maßgeschneiderte K&L Gewürzbox bestellen:\n• Kollektion: *${boxTitle}* (${jarCount} Gläser)\n• Ausgewählte Gewürze:\n${spiceList}\n• Paketpreis: *${priceDisplay}*`;
    if (recipientName.trim()) {
      rawText += `\n• Empfänger: ${recipientName.trim()}`;
    }
    if (giftMessage.trim()) {
      rawText += `\n• Grußbotschaft: "${giftMessage.trim()}"`;
    }
    rawText += `\n\nBitte bestätigen Sie die Geschenkverpackung und die Lieferdetails:`;
  } else if (lang === 'fr') {
    rawText = `Bonjour K&L Spices ! 🎁\n\nJe souhaite commander un Coffret Cadeau d'Épices Personnalisé :\n• Format : *${boxTitle}* (${jarCount} bocaux)\n• Épices sélectionnées :\n${spiceList}\n• Prix du coffret : *${priceDisplay}*`;
    if (recipientName.trim()) {
      rawText += `\n• Destinataire : ${recipientName.trim()}`;
    }
    if (giftMessage.trim()) {
      rawText += `\n• Message personnalisé : "${giftMessage.trim()}"`;
    }
    rawText += `\n\nMerci de confirmer la confection du coffret cadeau et l'adresse de livraison :`;
  } else {
    rawText = `Hello K&L Spices! 🎁\n\nI want to order a Custom Curated Heritage Spice Gift Box:\n• Format: *${boxTitle}* (${jarCount} Jars)\n• Selected Blends:\n${spiceList}\n• Bundle Price: *${priceDisplay}*`;
    if (recipientName.trim()) {
      rawText += `\n• Recipient: ${recipientName.trim()}`;
    }
    if (giftMessage.trim()) {
      rawText += `\n• Custom Gift Note: "${giftMessage.trim()}"`;
    }
    rawText += `\n\nPlease confirm presentation gift box packaging and dispatch details:`;
  }

  const encodedText = encodeURIComponent(rawText);
  return {
    url: `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedText}`,
    rawText,
  };
}
