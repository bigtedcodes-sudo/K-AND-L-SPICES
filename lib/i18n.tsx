'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'de' | 'fr';

export interface TranslationDictionary {
  topRibbon: {
    tagline: string;
    subtag: string;
    deskLabel: string;
  };
  nav: {
    tastingStage: string;
    catalog: string;
    heritage: string;
    wholesale: string;
    giftBox: string;
    media: string;
    about: string;
    fulfillmentDesk: string;
    orderBag: string;
  };
  hero: {
    kicker: string;
    title: string;
    description: string;
    blendIndex: string;
    standardJar: string;
    heatIndex: string;
    flavorNotes: string;
    pairing: string;
    origin: string;
    instantBuy: string;
    addToBag: string;
    addedToBag: string;
    reviewBag: string;
    zeroSignup: string;
  };
  catalog: {
    tagline: string;
    title: string;
    description: string;
    filterAll: string;
    filterSignature: string;
    filterPowders: string;
    filterBulk: string;
    standard: string;
    commercial: string;
    orderButton: string;
    quoteButton: string;
    viewCarousel: string;
    viewGrid: string;
    viewFullDetails: string;
    previousProduct: string;
    nextProduct: string;
    productOf: string;
    aromaLabel: string;
    photoAngle: string;
  };
  cart: {
    title: string;
    itemsCount: string;
    emptyTitle: string;
    emptyDesc: string;
    exploreButton: string;
    deliveryNotes: string;
    deliveryPlaceholder: string;
    subtotal: string;
    dispatchLabel: string;
    dispatchValue: string;
    estimatedTotal: string;
    checkoutButton: string;
    clearBag: string;
    routingNotice: string;
  };
  simulator: {
    headerTitle: string;
    onlineBadge: string;
    subHeading: string;
    payloadHeader: string;
    benefitTitle: string;
    benefitText: string;
    copyMessage: string;
    messageCopied: string;
    copyLink: string;
    linkCopied: string;
    launchButton: string;
  };
  heritage: {
    kicker: string;
    title: string;
    p1: string;
    p2: string;
    metric1Label: string;
    metric2Label: string;
    metric3Label: string;
    bannerSub: string;
    bannerTitle: string;
    b2bKicker: string;
    b2bTitle: string;
    b2bDesc: string;
    b2bSelectLabel: string;
    b2bButton: string;
    b2bFooter: string;
    badgeColdMilled: string;
    badgeTerpenes: string;
    processStep1Title: string;
    processStep1Desc: string;
    processStep2Title: string;
    processStep2Desc: string;
    processStep3Title: string;
    processStep3Desc: string;
  };
  footer: {
    description: string;
    deskLabel: string;
    facilityLabel: string;
    navHeading: string;
    tiersHeading: string;
    tier1Title: string;
    tier1Desc: string;
    tier2Title: string;
    tier2Desc: string;
    tier3Title: string;
    tier3Desc: string;
    rights: string;
    backToTop: string;
  };
  productModal: {
    packagingLabel: string;
    commercialFocus: string;
    heatIndex: string;
    nativeOrigin: string;
    craftMilling: string;
    characteristics: string;
    aroma: string;
    culinaryApp: string;
    instantOrder: string;
    requestQuote: string;
    added: string;
    add: string;
    backToCatalog: string;
    milledInNigeria: string;
    unitPricing: string;
    heatRating: string;
    quantity: string;
    quickOrderFab: string;
    quickOrderDeskOnline: string;
  };
  customBox: {
    kicker: string;
    title: string;
    subtitle: string;
    trioTitle: string;
    trioDesc: string;
    vaultTitle: string;
    vaultDesc: string;
    saveBadge: string;
    slotsLabel: string;
    slotEmpty: string;
    boxComplete: string;
    spicesRemaining: string;
    chooseBlends: string;
    giftCardHeading: string;
    recipientPlaceholder: string;
    messagePlaceholder: string;
    parchmentNotice: string;
    orderWhatsApp: string;
    addToBag: string;
    addedToBag: string;
  };
  about: {
    kicker: string;
    title: string;
    subtitle: string;
    learnAboutUs: string;
    coreValues: string;
    managementTeam: string;
    boardOfDirectors: string;
    explorePage: string;
    overviewLink: string;
    backToAbout: string;
  };
  media: {
    kicker: string;
    title: string;
    subtitle: string;
    reelsHeading: string;
    reelsSubheading: string;
    recipesHeading: string;
    recipesSubheading: string;
    harvestHeading: string;
    harvestSubheading: string;
    addAllToBag: string;
    addedAll: string;
    orderRecipeKit: string;
    spicesUsed: string;
    watchReel: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    topRibbon: {
      tagline: 'Artisanal Heritage Spices',
      subtag: 'Stone-Milled in Small Batches',
      deskLabel: 'Direct WhatsApp Conversion Desk',
    },
    nav: {
      tastingStage: 'Tasting Stage',
      catalog: 'Catalog',
      heritage: 'Heritage',
      wholesale: 'Wholesale',
      giftBox: 'Gift Box',
      media: 'Media',
      about: 'About',
      fulfillmentDesk: 'WhatsApp Desk',
      orderBag: 'Bag',
    },
    hero: {
      kicker: 'Interactive Kinetic Tasting Studio',
      title: 'Artisanal West African Heritage Spices',
      description:
        'Small-batch, stone-milled native seasonings, single-origin peppers, and raw export commodities. Select a blend below to explore real-time tasting notes and instant WhatsApp dispatch.',
      blendIndex: 'Blend',
      standardJar: 'Standard Jar',
      heatIndex: 'Heat Index',
      flavorNotes: 'Key Flavor Notes',
      pairing: 'Culinary Pairing Suggestion',
      origin: 'Harvest Origin',
      instantBuy: 'Instant WhatsApp Buy',
      addToBag: 'Add to Order Bag',
      addedToBag: 'Added to Bag',
      reviewBag: 'Review Bag',
      zeroSignup: 'Zero account signup · Direct fulfillment desk dispatch',
    },
    catalog: {
      tagline: 'The Heritage Pantry',
      title: 'Curated Native Catalog',
      description:
        'Thirteen verified stone-milled seasonings, pure culinary powders, and raw export commodities packaged fresh at origin. Scroll to experience kinetic dish suspension.',
      filterAll: 'All Spices (13)',
      filterSignature: 'Signature Blends',
      filterPowders: 'Pure Powders',
      filterBulk: 'Bulk & Export',
      standard: 'Standard',
      commercial: 'Commercial',
      orderButton: 'Order',
      quoteButton: 'Quote',
      viewCarousel: 'Carousel View',
      viewGrid: 'Grid View',
      viewFullDetails: 'Full Product Page',
      previousProduct: 'Previous',
      nextProduct: 'Next',
      productOf: 'of',
      aromaLabel: 'Aroma Profile',
      photoAngle: 'Swipe angles',
    },
    cart: {
      title: 'Your Spice Bag',
      itemsCount: 'items selected',
      emptyTitle: 'Your bag is empty',
      emptyDesc: 'Explore our stone-milled blends and pure powders on the tasting stage.',
      exploreButton: 'Explore Spices',
      deliveryNotes: 'Special Delivery Notes / City',
      deliveryPlaceholder: 'e.g. Delivery to Lekki Phase 1, Lagos or Berlin / Paris...',
      subtotal: 'Subtotal',
      dispatchLabel: 'Fulfillment Dispatch',
      dispatchValue: 'Direct WhatsApp Quote',
      estimatedTotal: 'Estimated Total',
      checkoutButton: 'Execute WhatsApp Checkout',
      clearBag: 'Clear Bag',
      routingNotice: 'Instant routing to',
    },
    simulator: {
      headerTitle: 'K&L Spices Fulfillment Desk',
      onlineBadge: 'Online',
      subHeading: 'Direct WhatsApp Conversion Engine',
      payloadHeader: 'Generated Order Dispatch Payload',
      benefitTitle: 'Conversion Architecture Benefit:',
      benefitText:
        'Orders routed directly to human fulfillment personnel close with 3.2x higher conversion than standard multi-screen gateway forms.',
      copyMessage: 'Copy Message',
      messageCopied: 'Message Copied!',
      copyLink: 'Copy WA Link',
      linkCopied: 'Link Copied!',
      launchButton: 'Launch Order in WhatsApp Web / App',
    },
    heritage: {
      kicker: 'The Milling Philosophy',
      title: 'Stone-Milled Authenticity, Purged of Industrial Fillers',
      p1: 'Modern commercial spice grinding burns out volatile essential oils through high-velocity hammer mills and dilutes blends with starches and silica.',
      p2: 'At K&L Spices, our heritage seeds, pods, and roots are slow stone-milled at ambient temperature. This ancient technique preserves delicate aromatic terpenes, delivering the true, explosive taste of home-cooked West African cuisine.',
      metric1Label: 'Native Single-Origin',
      metric2Label: 'Added Starches or Fillers',
      metric3Label: 'Order-to-Fulfillment Dispatch',
      bannerSub: 'Purity In Every Batch',
      bannerTitle: 'Small-Batch Jars & Commercial Sacks',
      b2bKicker: 'Commercial Tier & Exports',
      b2bTitle: 'HORECA Supply & Raw Export Commodities',
      b2bDesc:
        'Direct container loads and pallet shipments for food processors, restaurants, and international spice importers.',
      b2bSelectLabel: 'Select Commodity / Blend For Quotation',
      b2bButton: 'Compile B2B WhatsApp Inquiry',
      b2bFooter: 'Direct connection to K&L Export Desk',
      badgeColdMilled: 'Ambient Stone-Milled <28°C',
      badgeTerpenes: '100% Volatile Terpenes Retained',
      processStep1Title: 'Sun-Dried Pods & Roots',
      processStep1Desc: 'Native harvests selected and sun-cured at origin',
      processStep2Title: 'Granite Friction Milling',
      processStep2Desc: 'Slow-RPM ambient grinding with zero motor burn',
      processStep3Title: 'Aroma-Sealed Packaging',
      processStep3Desc: 'Directly packed into amber glass & export sacks',
    },
    footer: {
      description:
        'Artisanal West African culinary purveyor offering small-batch, stone-milled native seasonings, single-origin peppers, and raw export commodities with direct WhatsApp fulfillment.',
      deskLabel: 'Fulfillment Desk',
      facilityLabel: 'Milling Facility: Lagos & Kaduna, Nigeria',
      navHeading: 'Navigation',
      tiersHeading: 'Commercial Tiers',
      tier1Title: 'D2C Retail Foodies',
      tier1Desc: '100g glass jars & foil pouches for quality-conscious home kitchens.',
      tier2Title: 'HORECA Buyers',
      tier2Desc: 'Restaurants, caterers, and grill masters ordering high-volume rubs.',
      tier3Title: 'Commodity Exporters',
      tier3Desc: 'Direct FOB/Door sourcing for raw ginger, black pepper, and turmeric.',
      rights: 'All rights reserved.',
      backToTop: 'Back to top',
    },
    productModal: {
      packagingLabel: 'Packaging',
      commercialFocus: 'Commercial Focus',
      heatIndex: 'Heat Index',
      nativeOrigin: 'Native Origin',
      craftMilling: 'Craft Milling & Profile',
      characteristics: 'Flavor Characteristics',
      aroma: 'Aroma',
      culinaryApp: 'Recommended Culinary Applications',
      instantOrder: 'Instant WhatsApp Order',
      requestQuote: 'Request Bulk Wholesale Quote on WhatsApp',
      added: 'Added to Bag!',
      add: 'Add to Order Bag',
      backToCatalog: 'Back to Catalog',
      milledInNigeria: 'Stone-Milled in Nigeria',
      unitPricing: 'Unit Pricing',
      heatRating: 'Heat Rating',
      quantity: 'Quantity',
      quickOrderFab: 'Quick Order via WhatsApp',
      quickOrderDeskOnline: 'Fulfillment Desk Online',
    },
    customBox: {
      kicker: 'Artisanal Gifting & Sampler Studio',
      title: 'Curate Your Own Heritage Spice Box',
      subtitle: 'Handpick 3 or 5 stone-milled seasonings into a bespoke presentation gift box with custom calligraphy card and direct WhatsApp gift dispatch.',
      trioTitle: 'The Heritage Trio',
      trioDesc: '3 Glass Jars (100g each) in a cedar gift tray. Perfect introduction to West African heritage seasoning.',
      vaultTitle: 'The Grand Pantry Vault',
      vaultDesc: '5 Glass Jars (100g each) in a master presentation box. Comprehensive culinary seasoning collection.',
      saveBadge: 'Bundle Savings Included',
      slotsLabel: 'Selected Box Jars',
      slotEmpty: '+ Pick Blend',
      boxComplete: 'Box Complete & Ready to Pack!',
      spicesRemaining: 'more jar(s) needed to complete your box',
      chooseBlends: 'Select From Available Stone-Milled Jars',
      giftCardHeading: 'Complimentary Calligraphy Gift Note',
      recipientPlaceholder: 'Recipient Name (e.g., Chef Amara)',
      messagePlaceholder: 'Gift Message (e.g., Wishing you joyful cooking adventures!)...',
      parchmentNotice: 'Includes complimentary K&L wax-sealed parchment certificate & grosgrain ribbon.',
      orderWhatsApp: 'Order Gift Box via WhatsApp',
      addToBag: 'Add Gift Box to Bag',
      addedToBag: 'Gift Box Added!',
    },
    about: {
      kicker: 'Corporate Heritage & Governance',
      title: 'Inside K&L Spices',
      subtitle:
        'Explore our farm-to-stone-mill story, non-negotiable purity values, operational leadership, and the governance board stewarding K&L Spices across West Africa and global markets.',
      learnAboutUs: 'Learn About Us',
      coreValues: 'Our Core Values',
      managementTeam: 'Management Team',
      boardOfDirectors: 'Board of Directors',
      explorePage: 'Read Full Page',
      overviewLink: 'About Overview',
      backToAbout: 'Back to Home',
    },
    media: {
      kicker: 'Culinary Studio & Origin Archive',
      title: 'Media & Shoppable Kitchen',
      subtitle:
        'Short vertical prep reels, harvest-to-stone-mill origin clips, and chef recipes linked directly to our catalog—tap once to load every spice into your order bag.',
      reelsHeading: '15-Second Prep & Milling Reels',
      reelsSubheading:
        'Click any vertical story reel to play timed cooking & milling cues and shop the exact blends featured.',
      recipesHeading: 'Shoppable Chef Recipes',
      recipesSubheading:
        'Step-by-step West African signatures with exact K&L spice dosages and one-tap kit ordering.',
      harvestHeading: 'Harvest & Stone-Milling Documentary',
      harvestSubheading:
        'Behind the scenes of our sub-28°C granite milling and solar curing hubs across Nigeria.',
      addAllToBag: 'Add All Spices to Bag',
      addedAll: 'Spices Added to Bag!',
      orderRecipeKit: 'Order Kit via WhatsApp',
      spicesUsed: 'K&L Spices Used in This Recipe',
      watchReel: 'Watch Prep Reel',
    },
  },
  de: {
    topRibbon: {
      tagline: 'Traditionelle Gewürzmanufaktur',
      subtag: 'Schonend steingemahlen in Kleinserien',
      deskLabel: 'Direkte WhatsApp-Bestellzentrale',
    },
    nav: {
      tastingStage: 'Verkostung',
      catalog: 'Sortiment',
      heritage: 'Erbe',
      wholesale: 'Export',
      giftBox: 'Geschenkbox',
      media: 'Medien',
      about: 'Über uns',
      fulfillmentDesk: 'WhatsApp-Desk',
      orderBag: 'Korb',
    },
    hero: {
      kicker: 'Interaktives Kinetisches Verkostungs-Studio',
      title: 'Westafrikanische Gewürze aus Traditionsanbau',
      description:
        'Steinvermahlene Originalgewürze, reinsortige Chilis und Rohexport-Waren aus nachhaltigem westafrikanischem Anbau. Wählen Sie unten eine Gewürzmischung für Aromaprofile und WhatsApp-Direktbestellung.',
      blendIndex: 'Mischung',
      standardJar: 'Standard-Glas',
      heatIndex: 'Schärfegrad',
      flavorNotes: 'Geschmacksnoten',
      pairing: 'Kulinarische Serviervorschläge',
      origin: 'Herkunftsregion',
      instantBuy: 'Sofort über WhatsApp kaufen',
      addToBag: 'In den Warenkorb',
      addedToBag: 'Hinzugefügt',
      reviewBag: 'Warenkorb ansehen',
      zeroSignup: 'Kein Kundenkonto erforderlich · Direkte Bestellabwicklung',
    },
    catalog: {
      tagline: 'Die Gewürzkammer',
      title: 'Kuratiertes Sortiment',
      description:
        'Dreizehn authentische steingemahlene Gewürze, sortenreine Wurzelpulver und Rohexport-Waren frisch vom Ursprung. Scrollen Sie für die kinetische Platten-Suspension.',
      filterAll: 'Alle Gewürze (13)',
      filterSignature: 'Signatur-Mischungen',
      filterPowders: 'Reine Pulver',
      filterBulk: 'Großhandel & Export',
      standard: 'Standard',
      commercial: 'Großgebinde',
      orderButton: 'Bestellen',
      quoteButton: 'Angebot',
      viewCarousel: 'Karussell-Ansicht',
      viewGrid: 'Raster-Ansicht',
      viewFullDetails: 'Zur Produktseite',
      previousProduct: 'Zurück',
      nextProduct: 'Weiter',
      productOf: 'von',
      aromaLabel: 'Aromaprofil',
      photoAngle: 'Ansichten wechseln',
    },
    cart: {
      title: 'Ihr Gewürz-Warenkorb',
      itemsCount: 'Artikel ausgewählt',
      emptyTitle: 'Ihr Warenkorb ist leer',
      emptyDesc: 'Entdecken Sie unsere steingemahlenen Mischungen auf der Verkostungsbühne.',
      exploreButton: 'Gewürze entdecken',
      deliveryNotes: 'Lieferhinweise / Lieferstadt',
      deliveryPlaceholder: 'z.B. Lieferung nach Berlin, München, Wien oder Lagos...',
      subtotal: 'Zwischensumme',
      dispatchLabel: 'Versandabwicklung',
      dispatchValue: 'WhatsApp-Tarifberechnung',
      estimatedTotal: 'Geschätzter Gesamtbetrag',
      checkoutButton: 'Über WhatsApp bestellen',
      clearBag: 'Warenkorb leeren',
      routingNotice: 'Sofortige Weiterleitung an',
    },
    simulator: {
      headerTitle: 'K&L Spices Bestellzentrale',
      onlineBadge: 'Online',
      subHeading: 'Direkte WhatsApp-Bestellarchitektur',
      payloadHeader: 'Generierte Bestelldaten',
      benefitTitle: 'Vorteil der Direktbestellung:',
      benefitText:
        'Bestellungen mit persönlicher WhatsApp-Betreuung erzielen eine 3,2-fach höhere Abschlussrate als herkömmliche Zahlungsformulare.',
      copyMessage: 'Text kopieren',
      messageCopied: 'Kopiert!',
      copyLink: 'WA-Link kopieren',
      linkCopied: 'Link kopiert!',
      launchButton: 'In WhatsApp öffnen',
    },
    heritage: {
      kicker: 'Die Mahlphilosophie',
      title: 'Authentische Steinmahlung ohne Füllstoffe',
      p1: 'Industrielle Gewürzmühlen verbrennen flüchtige ätherische Öle durch Hochgeschwindigkeits-Schlagwerke und strecken Mischungen mit Stärke und Kieselsäure.',
      p2: 'Bei K&L Spices werden unsere Samen, Schoten und Wurzeln langsam bei Raumtemperatur zwischen Mühlsteinen zerrieben. Dieses jahrhundertealte Verfahren bewahrt empfindliche Terpene für den vollen, explosiven Geschmack westafrikanischer Traditionsküche.',
      metric1Label: 'Reinsortiger Ursprung',
      metric2Label: 'Füllstoffe oder Stärke',
      metric3Label: 'Auftragsbearbeitung',
      bannerSub: 'Reinheit in jeder Charge',
      bannerTitle: 'Glas-Editionen & Großhandelssäcke',
      b2bKicker: 'Gewerbe & Export',
      b2bTitle: 'Gastronomiebedarf & Rohexport-Waren',
      b2bDesc:
        'Containerladungen und Palettensendungen für Lebensmittelhersteller, Gastronomie und internationale Gewürzimporteure.',
      b2bSelectLabel: 'Ware / Mischung für Angebot wählen',
      b2bButton: 'B2B WhatsApp-Anfrage erstellen',
      b2bFooter: 'Direkter Kontakt zur Exportabteilung',
      badgeColdMilled: 'Kalt steingemahlen <28°C',
      badgeTerpenes: '100% Flüchtige Terpene erhalten',
      processStep1Title: 'Sonnengereifte Rohstoffe',
      processStep1Desc: 'Traditionelle Ernte handverlesen am Ursprung',
      processStep2Title: 'Granit-Reibmahlung',
      processStep2Desc: 'Schonendes Vermahlen ohne thermische Belastung',
      processStep3Title: 'Aromageschützte Abfüllung',
      processStep3Desc: 'Direkt in Glasbehälter & Exportgebinde verpackt',
    },
    footer: {
      description:
        'Traditionelle westafrikanische Gewürzmanufaktur für steingemahlene Gewürzmischungen, Chilis und Rohexportgüter mit direkter WhatsApp-Auftragsabwicklung.',
      deskLabel: 'Bestellzentrale',
      facilityLabel: 'Mahlbetrieb: Lagos & Kaduna, Nigeria',
      navHeading: 'Navigation',
      tiersHeading: 'Kundensegmente',
      tier1Title: 'D2C Feinschmecker',
      tier1Desc: '100g Gläser und Aromabeutel für anspruchsvolle Gourmetküchen.',
      tier2Title: 'HORECA & Gastronomie',
      tier2Desc: 'Restaurants, Caterer und Grillmeister mit hohem Gewürzbedarf.',
      tier3Title: 'Rohstoff-Exporteure',
      tier3Desc: 'Direkte FOB/Door-Lieferung von Ingwer, weißem/schwarzem Pfeffer und Kurkuma.',
      rights: 'Alle Rechte vorbehalten.',
      backToTop: 'Nach oben',
    },
    productModal: {
      packagingLabel: 'Verpackung',
      commercialFocus: 'Zielgruppe',
      heatIndex: 'Schärfegrad',
      nativeOrigin: 'Herkunft',
      craftMilling: 'Mahlhandwerk & Profil',
      characteristics: 'Geschmacksnoten',
      aroma: 'Aromatik',
      culinaryApp: 'Empfohlene Gerichte',
      instantOrder: 'WhatsApp-Direktbestellung',
      requestQuote: 'Großhandelsangebot anfordern',
      added: 'Im Warenkorb!',
      add: 'In den Warenkorb',
      backToCatalog: 'Zurück zum Sortiment',
      milledInNigeria: 'Steingemahlen in Nigeria',
      unitPricing: 'Stückpreis',
      heatRating: 'Schärfe',
      quantity: 'Menge',
      quickOrderFab: 'Schnellbestellung via WhatsApp',
      quickOrderDeskOnline: 'Bestellzentrale online',
    },
    customBox: {
      kicker: 'Präsent- & Gourmet-Studio',
      title: 'Stellen Sie Ihre eigene Gewürzbox zusammen',
      subtitle: 'Wählen Sie 3 oder 5 steingemahlene Gewürze in einer edlen Geschenkbox mit handschriftlicher Grußkarte und direkter WhatsApp-Abwicklung.',
      trioTitle: 'Das Heritage-Trio',
      trioDesc: '3 Gläser (je 100g) in feiner Geschenkschatulle. Der perfekte Einstieg in die westafrikanische Traditionsküche.',
      vaultTitle: 'Das Grand-Pantry-Set',
      vaultDesc: '5 Gläser (je 100g) in Meister-Präsentbox. Umfassende Kollektion für leidenschaftliche Feinschmecker.',
      saveBadge: 'Paketvorteil inklusive',
      slotsLabel: 'Ausgewählte Gewürzgläser',
      slotEmpty: '+ Gewürz wählen',
      boxComplete: 'Box vollständig & bereit zum Verpacken!',
      spicesRemaining: 'weitere(s) Glas/Gläser erforderlich',
      chooseBlends: 'Wählen Sie aus verfügbaren Steingewürzen',
      giftCardHeading: 'Kostenlose Grußkarte & Widmung',
      recipientPlaceholder: 'Name des Empfängers (z.B. Chefkoch Daniel)',
      messagePlaceholder: 'Ihre persönliche Grußbotschaft...',
      parchmentNotice: 'Inklusive K&L Wachssiegel-Zertifikat & Geschenkband.',
      orderWhatsApp: 'Geschenkbox via WhatsApp bestellen',
      addToBag: 'Geschenkbox in den Warenkorb',
      addedToBag: 'Geschenkbox hinzugefügt!',
    },
    about: {
      kicker: 'Unternehmen & Verantwortung',
      title: 'Über K&L Spices',
      subtitle:
        'Erfahren Sie mehr über unsere Herkunft von der Ernte bis zur Steinmühle, unsere Reinheitswerte, die operative Führung sowie den Verwaltungsrat von K&L Spices.',
      learnAboutUs: 'Über uns erfahren',
      coreValues: 'Unsere Grundwerte',
      managementTeam: 'Management-Team',
      boardOfDirectors: 'Verwaltungsrat',
      explorePage: 'Mehr erfahren',
      overviewLink: 'Übersicht Über uns',
      backToAbout: 'Zurück zur Startseite',
    },
    media: {
      kicker: 'Kulinarik-Studio & Herkunftsarchiv',
      title: 'Medien & Shoppable Küche',
      subtitle:
        'Kurze Zubereitungs-Reels, Einblicke in die Steinmühle unter 28°C und Chefkoch-Rezepte direkt mit unserem Sortiment verknüpft.',
      reelsHeading: '15-Sekunden Koch- & Mühlen-Reels',
      reelsSubheading: 'Klicken Sie auf ein Hochformat-Reel, um Kochschritte abzuspielen und die verwendeten Gewürze direkt zu bestellen.',
      recipesHeading: 'Direkt bestellbare Rezepte',
      recipesSubheading: 'Authentische westafrikanische Klassiker mit exakter Gewürzdosierung und Ein-Klick-Warenkorb.',
      harvestHeading: 'Ernte & Steinmahl-Dokumentation',
      harvestSubheading: 'Hinter den Kulissen unserer Sonnentrocknung und Kaltvermahlung in Nigeria.',
      addAllToBag: 'Alle Gewürze in den Warenkorb',
      addedAll: 'In den Warenkorb gelegt!',
      orderRecipeKit: 'Set via WhatsApp bestellen',
      spicesUsed: 'Verwendete K&L Gewürze',
      watchReel: 'Reel ansehen',
    },
  },
  fr: {
    topRibbon: {
      tagline: 'Épices Héritage Artisanales',
      subtag: 'Moulues sur pierre en petites séries',
      deskLabel: 'Bureau de commande direct WhatsApp',
    },
    nav: {
      tastingStage: 'Dégustation',
      catalog: 'Catalogue',
      heritage: 'Héritage',
      wholesale: 'Export',
      giftBox: 'Coffret',
      media: 'Médias',
      about: 'À Propos',
      fulfillmentDesk: 'WhatsApp Desk',
      orderBag: 'Panier',
    },
    hero: {
      kicker: 'Studio Cinétique de Dégustation',
      title: 'Épices Ancestrales d’Afrique de l’Ouest',
      description:
        'Assaisonnements indigènes moulus sur pierre, piments d’origine unique et matières premières d’exportation. Choisissez un mélange pour révéler ses notes et commander sur WhatsApp.',
      blendIndex: 'Mélange',
      standardJar: 'Bocal Standard',
      heatIndex: 'Indice Piquant',
      flavorNotes: 'Notes Aromatiques',
      pairing: 'Suggestions Culinaires',
      origin: 'Origine de Récolte',
      instantBuy: 'Commander sur WhatsApp',
      addToBag: 'Ajouter au Panier',
      addedToBag: 'Ajouté au Panier',
      reviewBag: 'Voir le Panier',
      zeroSignup: 'Sans création de compte · Traitement direct par nos équipes',
    },
    catalog: {
      tagline: 'Le Garde-Manger Héritage',
      title: 'Catalogue Ancestral Sélectionné',
      description:
        'Treize épices moulues sur meule de pierre, poudres pures de racines et matières premières brutes. Faites défiler pour vivre la suspension cinétique.',
      filterAll: 'Toutes les Épices (13)',
      filterSignature: 'Mélanges Signature',
      filterPowders: 'Poudres Pures',
      filterBulk: 'Vrac & Export',
      standard: 'Standard',
      commercial: 'Commercial',
      orderButton: 'Commander',
      quoteButton: 'Devis',
      viewCarousel: 'Vue Carrousel',
      viewGrid: 'Vue Grille',
      viewFullDetails: 'Fiche Complète',
      previousProduct: 'Précédent',
      nextProduct: 'Suivant',
      productOf: 'sur',
      aromaLabel: 'Profil Aromatique',
      photoAngle: 'Changer de vue',
    },
    cart: {
      title: 'Votre Panier d’Épices',
      itemsCount: 'articles sélectionnés',
      emptyTitle: 'Votre panier est vide',
      emptyDesc: 'Explorez nos mélanges moulus sur pierre sur la scène de dégustation.',
      exploreButton: 'Explorer les Épices',
      deliveryNotes: 'Instructions de livraison / Ville',
      deliveryPlaceholder: 'ex. Livraison à Paris, Bruxelles, Genève ou Lagos...',
      subtotal: 'Sous-total',
      dispatchLabel: 'Expédition',
      dispatchValue: 'Devis direct WhatsApp',
      estimatedTotal: 'Total Estimé',
      checkoutButton: 'Finaliser sur WhatsApp',
      clearBag: 'Vider le Panier',
      routingNotice: 'Routage direct vers',
    },
    simulator: {
      headerTitle: 'Bureau des Commandes K&L Spices',
      onlineBadge: 'En Ligne',
      subHeading: 'Moteur de Commande Direct WhatsApp',
      payloadHeader: 'Message de Commande Généré',
      benefitTitle: 'Avantage de la conversion directe :',
      benefitText:
        'Les commandes traitées directement par notre équipe via WhatsApp convertissent 3,2 fois mieux que les formulaires de paiement classiques.',
      copyMessage: 'Copier le Message',
      messageCopied: 'Message Copié !',
      copyLink: 'Copier le Lien WA',
      linkCopied: 'Lien Copié !',
      launchButton: 'Ouvrir dans WhatsApp Web / App',
    },
    heritage: {
      kicker: 'La Philosophie de Meunerie',
      title: 'Authenticité de la Meule de Pierre, Sans Additifs',
      p1: 'Le broyage industriel moderne détruit les huiles essentielles volatiles par échauffement mécanique et dilue les épices avec des amidons et de la silice.',
      p2: 'Chez K&L Spices, nos graines, gousses et racines sont moulues lentement à température ambiante sur meules de pierre. Ce savoir-faire préserve les précieux terpènes aromatiques pour restituer la saveur explosive des mets traditionnels.',
      metric1Label: 'Origine Unique Indigène',
      metric2Label: 'Amidons ou Épaississants',
      metric3Label: 'Délai d’Expédition',
      bannerSub: 'Pureté à chaque lot',
      bannerTitle: 'Bocaux en Verre & Sacs de Vrac',
      b2bKicker: 'Gamme Commerciale & Export',
      b2bTitle: 'Approvisionnement CHR & Matières Premières',
      b2bDesc:
        'Expéditions par palettes ou conteneurs pour industriels de l’agroalimentaire, restaurateurs et importateurs d’épices.',
      b2bSelectLabel: 'Sélectionner le produit pour devis',
      b2bButton: 'Préparer la Demande B2B WhatsApp',
      b2bFooter: 'Connexion directe avec le service Export',
      badgeColdMilled: 'Moulu sur pierre froide <28°C',
      badgeTerpenes: '100% Terpènes volatils préservés',
      processStep1Title: 'Séchage Solaire Indigène',
      processStep1Desc: 'Gousses et racines récoltées et séchées au soleil',
      processStep2Title: 'Friction Lente du Granit',
      processStep2Desc: 'Broyage doux à froid sans échauffement moteur',
      processStep3Title: 'Mise en Bocal Protectrice',
      processStep3Desc: 'Conditionné sous verre hermétique et sacs de vrac',
    },
    footer: {
      description:
        'Maison d’épices ouest-africaines proposant des mélanges traditionnels moulus sur meule, des piments d’exception et des denrées d’export avec service direct WhatsApp.',
      deskLabel: 'Bureau des Commandes',
      facilityLabel: 'Atelier de meunerie : Lagos & Kaduna, Nigeria',
      navHeading: 'Navigation',
      tiersHeading: 'Secteurs Commerciaux',
      tier1Title: 'Particuliers & Gourmets',
      tier1Desc: 'Bocaux verre 100g et sachets pour les amateurs de haute cuisine.',
      tier2Title: 'Restaurateurs & Traiteurs',
      tier2Desc: 'Assaisonnements et rubs grand format pour cuisines professionnelles.',
      tier3Title: 'Importateurs & Négociants',
      tier3Desc: 'Approvisionnement direct FOB/Port de gingembre, poivres et curcuma.',
      rights: 'Tous droits réservés.',
      backToTop: 'Haut de page',
    },
    productModal: {
      packagingLabel: 'Conditionnement',
      commercialFocus: 'Usage Recommandé',
      heatIndex: 'Indice Piquant',
      nativeOrigin: 'Origine Native',
      craftMilling: 'Meunerie & Profil',
      characteristics: 'Caractéristiques Gustatives',
      aroma: 'Arôme',
      culinaryApp: 'Accords Culinaires Recommandés',
      instantOrder: 'Commande Directe WhatsApp',
      requestQuote: 'Demander un Devis B2B WhatsApp',
      added: 'Ajouté au Panier !',
      add: 'Ajouter au Panier',
      backToCatalog: 'Retour au Catalogue',
      milledInNigeria: 'Moulu sur pierre au Nigeria',
      unitPricing: 'Prix Unitaire',
      heatRating: 'Piquant',
      quantity: 'Quantité',
      quickOrderFab: 'Commande Rapide via WhatsApp',
      quickOrderDeskOnline: 'Service client en ligne',
    },
    customBox: {
      kicker: 'Studio Cadeaux & Dégustation',
      title: 'Composez Votre Propre Coffret d’Épices',
      subtitle: 'Sélectionnez 3 ou 5 assaisonnements moulus sur pierre dans un coffret de présentation sur mesure avec carte calligraphiée et commande WhatsApp.',
      trioTitle: 'Le Trio Héritage',
      trioDesc: '3 Bocaux en verre (100g chacun) dans un écrin cadeau. L’introduction idéale aux saveurs ouest-africaines.',
      vaultTitle: 'Le Grand Écrin Gourmet',
      vaultDesc: '5 Bocaux en verre (100g chacun) en coffret d’exception. La collection culinaire complète pour gastronomes.',
      saveBadge: 'Remise Coffret Incluse',
      slotsLabel: 'Bocaux Sélectionnés',
      slotEmpty: '+ Choisir l’épice',
      boxComplete: 'Coffret complet et prêt à emballer !',
      spicesRemaining: 'bocal(aux) restant(s) pour compléter le coffret',
      chooseBlends: 'Choisissez parmi nos épices moulues',
      giftCardHeading: 'Carte Cadeau Calligraphiée Gratuite',
      recipientPlaceholder: 'Nom du destinataire (ex. Chef Sophie)',
      messagePlaceholder: 'Votre message personnalisé...',
      parchmentNotice: 'Comprend un certificat scellé à la cire K&L et un ruban en gros-grain.',
      orderWhatsApp: 'Commander le Coffret sur WhatsApp',
      addToBag: 'Ajouter le Coffret au Panier',
      addedToBag: 'Coffret Ajouté !',
    },
    about: {
      kicker: 'Maison & Gouvernance',
      title: 'Découvrir K&L Spices',
      subtitle:
        'Découvrez notre histoire de la récolte à la meule de pierre, nos valeurs de pureté absolue, l’équipe dirigeante et le conseil d’administration de K&L Spices.',
      learnAboutUs: 'À Propos de Nous',
      coreValues: 'Nos Valeurs Fondamentales',
      managementTeam: 'Équipe de Direction',
      boardOfDirectors: 'Conseil d’Administration',
      explorePage: 'Découvrir la page',
      overviewLink: 'Aperçu À Propos',
      backToAbout: 'Retour à l’accueil',
    },
    media: {
      kicker: 'Studio Culinaire & Archives d’Origine',
      title: 'Médias & Cuisine Connectée',
      subtitle:
        'Courtes vidéos verticales de préparation, séquences de meunerie sur pierre et recettes de chefs reliées au catalogue en un clic.',
      reelsHeading: 'Reels de Préparation 15s & Meunerie',
      reelsSubheading: 'Cliquez sur une capsule vidéo pour suivre les gestes culinaires et ajouter chaque épice au panier.',
      recipesHeading: 'Recettes de Chefs Achetables',
      recipesSubheading: 'Classiques ouest-africains étape par étape avec dosages exacts et ajout groupé au panier.',
      harvestHeading: 'Récolte & Meunerie sur Pierre',
      harvestSubheading: 'Immersion au cœur du séchage solaire et du broyage à froid sous 28°C au Nigeria.',
      addAllToBag: 'Tout Ajouter au Panier',
      addedAll: 'Ajouté au Panier !',
      orderRecipeKit: 'Commander le Kit sur WhatsApp',
      spicesUsed: 'Épices K&L Utilisées',
      watchReel: 'Lire le Reel',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_STORAGE_KEY = 'kl_spices_lang_v1';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(LANG_STORAGE_KEY) as Language;
        if (saved && (saved === 'en' || saved === 'de' || saved === 'fr')) {
          setLanguageState(saved);
        }
      } catch {
        // ignore
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: TRANSLATIONS[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
