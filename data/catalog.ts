export interface ProductSKU {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  packaging: string;
  category: 'Signature Blends' | 'Pure Powders' | 'Bulk & Export';
  price: number | null; // null for B2B quote only
  priceDisplay: string;
  heatIndex: number; // 0 to 5
  heatLabel: string;
  commercialTarget: string;
  description: string;
  tastingNotes: string[];
  aromaProfile: string;
  pairingDish: string;
  origin: string;
  isHero?: boolean;
  dishImage?: string;
  secondaryImage?: string;
  pouchImage?: string;
}

export const CATALOG: ProductSKU[] = [
  {
    id: 'sku-yaji-suya',
    slug: 'yaji-suya-pepper',
    name: 'Yaji Suya Pepper',
    subtitle: 'Authentic stone-ground Northern barbecue rub with roasted peanut',
    packaging: '100g Glass Jar',
    category: 'Signature Blends',
    price: 3000,
    priceDisplay: '₦3,000',
    heatIndex: 4,
    heatLabel: 'Fiery & Nutty (4/5)',
    commercialTarget: 'BBQ & Grilling Enthusiasts',
    description:
      'The definitive Northern Nigerian street food rub. Stone-milled toasted groundnut cake, fiery bird’s eye chili, crushed ginger, garlic, cloves, and African nutmeg for irresistible crusting.',
    tastingNotes: ['Roasted Groundnut', 'Fiery Bird’s Eye', 'Zesty Ginger', 'African Nutmeg'],
    aromaProfile: 'Toasty nuttiness with pungent stinging heat and sweet spice fragrance.',
    pairingDish: 'Grilled Beef Skewers (Suya), Smoked Lamb Chops, Crispy Wings, and Roasted Corn',
    origin: 'Kano & Kaduna Agricultural Plains, Nigeria',
    isHero: true,
    dishImage: '/assets/aistudio/Suya_pepper_17c114ee.jpeg',
    secondaryImage: '/images/hero_suya_platter_1794402216427.jpg',
  },
  {
    id: 'sku-pepper-soup',
    slug: 'pepper-soup-spice-mix',
    name: 'Pepper Soup Spice Mix',
    subtitle: 'Ancestral restorative elixir with calabash nutmeg & negro pepper',
    packaging: '100g Glass Jar',
    category: 'Signature Blends',
    price: 3000,
    priceDisplay: '₦3,000',
    heatIndex: 4,
    heatLabel: 'Clearing & Medicinal (4/5)',
    commercialTarget: 'Restorative Soups',
    description:
      'A therapeutic medicinal blend of stone-crushed Ehuru (calabash nutmeg), Uda, Uziza, and alligator pepper. Known across West Africa for warming the body and invigorating the senses.',
    tastingNotes: ['Camphorous Ehuru', 'Negro Pepper Bitterness', 'Piquant Uziza', 'Warming Herb'],
    aromaProfile: 'High-camphor pine, smoked bark, and warming citrus notes.',
    pairingDish: 'Catfish Pepper Soup, Goat Meat Asun Broth, and Revitalizing Chicken Consommé',
    origin: 'Enugu & Imo Rainforest Forest Belt, Nigeria',
    isHero: true,
    dishImage: '/assets/aistudio/pepper_soup_spice_0474cc74.jpeg',
    secondaryImage: '/images/hero_native_soup_1794402217362.jpg',
  },
  {
    id: 'sku-yellow-habanero',
    slug: 'dried-yellow-habanero-pepper',
    name: 'Dried Yellow Habanero Pepper',
    subtitle: 'Sun-cured single-origin Nsukka yellow scotch bonnet flakes',
    packaging: '100g Glass Jar',
    category: 'Signature Blends',
    price: 3200,
    priceDisplay: '₦3,200',
    heatIndex: 5,
    heatLabel: 'Extreme Tropical Heat (5/5)',
    commercialTarget: 'High-Heat Purists',
    description:
      'Intensely fragrant, unadulterated Nsukka yellow peppers dried slowly at low temperatures to concentrate their intoxicating tropical floral aroma before crushing into vibrant golden flakes.',
    tastingNotes: ['Tropical Mango/Papaya', 'Instant Electric Heat', 'Crisp Citrus', 'Clean Finish'],
    aromaProfile: 'Burst of sweet tropical fruit followed by piercing capsaicin.',
    pairingDish: 'Peppered Snails, Fiery Seafood Sauces, Spicy Dips, and Marinades',
    origin: 'Nsukka Hills, Enugu State, Nigeria',
    isHero: true,
    dishImage: '/assets/aistudio/habanero_pepper_de25c925.jpeg',
    secondaryImage: '/assets/aistudio/Habanero_pepper_2_c7b2a50e.jpeg',
  },
  {
    id: 'sku-garlic-powder',
    slug: 'garlic-powder',
    name: 'Garlic Powder',
    subtitle: 'Aromatic Northern Nigerian heirloom garlic cloves',
    packaging: '100g Foil Pouch',
    category: 'Pure Powders',
    price: 2500,
    priceDisplay: '₦2,500',
    heatIndex: 0,
    heatLabel: 'Pungent & Aromatic (0/5)',
    commercialTarget: 'Aromatic Cooking',
    description:
      'Small-batch peeled and gently dried heirloom garlic. High in natural allicin oils, delivering a far punchier aromatic profile than mass-market imported alternatives.',
    tastingNotes: ['Robust Garlic Flavor', 'Roasted Notes', 'Nutty Sweetness', 'Long Finish'],
    aromaProfile: 'Rich, pungent garlic with sweet roasted undertones.',
    pairingDish: 'Garlic Herb Butter, Grilled Meats, Stir-Fries, and Roasted Potatoes',
    origin: 'Plateau State, Nigeria',
    isHero: true,
    dishImage: '/assets/aistudio/Garlic__24cc6674.jpeg',
    secondaryImage: '/assets/aistudio/garlic-pouch_dae845a4.jpg',
    pouchImage: '/assets/aistudio/garlic-pouch_dae845a4.jpg',
  },
  {
    id: 'sku-jollof',
    slug: 'jollof-rice-spice-mix',
    name: 'Jollof Rice Spice Mix',
    subtitle: 'Smoky firewood essence with stone-ground native peppers',
    packaging: '100g Glass Jar',
    category: 'Signature Blends',
    price: 3500,
    priceDisplay: '₦3,500',
    heatIndex: 2,
    heatLabel: 'Warm & Smoky (2/5)',
    commercialTarget: 'D2C Retail Home Cooks',
    description:
      'Stone-milled blend capturing the quintessential party-jollof aroma. Crafted with roasted sweet peppers, single-origin bay leaf, smoked paprika, thyme, and aromatic native umami seeds.',
    tastingNotes: ['Smoky Firewood', 'Sweet Roasted Bell Pepper', 'Earthy Thyme', 'Golden Umami'],
    aromaProfile: 'Rich smoked paprika, sun-dried herbs, and caramelized alliums.',
    pairingDish: 'Party Jollof Rice, Seafood Paella, Roasted Chicken & Coconut Rice',
    origin: 'Kaduna Valley & Cross River, Nigeria',
    isHero: true,
    dishImage: '/images/jollof_dish.jpg',
    secondaryImage: '/images/hero_jollof_platter_1794402215839.jpg',
  },
  {
    id: 'sku-white-onion',
    slug: 'white-onion-powder',
    name: 'White Onion Powder',
    subtitle: '100% dehydrated sweet allium bulbs, zero starch or anticaking agents',
    packaging: '100g Foil Pouch',
    category: 'Pure Powders',
    price: 2500,
    priceDisplay: '₦2,500',
    heatIndex: 0,
    heatLabel: 'Sweet & Savory (0/5)',
    commercialTarget: 'Kitchen Staple (No Starch)',
    description:
      'Dehydrated pure Northern Nigerian white sweet onions, finely powdered without added starches, silica, or salt. Dissolves cleanly into pan juices, soups, and dry spice rubs.',
    tastingNotes: ['Caramelized Sweetness', 'Pure Allium Depth', 'Savory Base', 'Clean Finish'],
    aromaProfile: 'Sweet toasted onion without moisture or bitterness.',
    pairingDish: 'Everyday Stews, Marinades, Roasted Vegetables, and House Seasonings',
    origin: 'Sokoto State, Nigeria',
    isHero: true,
    dishImage: '/assets/aistudio/white-onion-pouch_5e0b3978.jpg',
    secondaryImage: '/assets/aistudio/white-onion-pouch_5e0b3978.jpg',
    pouchImage: '/assets/aistudio/white-onion-pouch_5e0b3978.jpg',
  },
  {
    id: 'sku-native-soup',
    slug: 'nigerian-native-soup-spice',
    name: 'Nigerian Native Soup Spice',
    subtitle: 'Coastal river-herb infusion with uziza & fermented locust beans',
    packaging: '100g Glass Jar',
    category: 'Signature Blends',
    price: 3500,
    priceDisplay: '₦3,500',
    heatIndex: 3,
    heatLabel: 'Peppery & Coastal (3/5)',
    commercialTarget: 'Heritage Native Broths',
    description:
      'Deep, earthy broth base featuring stone-ground uziza seeds, uda pods, native dawadawa, and coastal dried seafood botanicals. Unlocks ancestral richness in any slow-simmered soup.',
    tastingNotes: ['Cracked Uziza', 'Roasted Dawadawa', 'Aromatic Pods', 'Coastal Herb'],
    aromaProfile: 'Pungent, woodsy pepper with deep fermented umami undertones.',
    pairingDish: 'Rivers Native Soup, Ofe Nsala (White Soup), Banga, and Steamed Fish Broths',
    origin: 'Niger Delta Coastal Basin, Nigeria',
    isHero: false,
    dishImage: '/images/native_soup_dish.jpg',
    secondaryImage: '/images/hero_native_soup_1794402217362.jpg',
  },
  {
    id: 'sku-turmeric-powder',
    slug: 'turmeric-root-powder',
    name: 'Turmeric Root Powder',
    subtitle: 'High-curcumin single-origin golden root, zero fillers',
    packaging: '100g Foil Pouch',
    category: 'Pure Powders',
    price: 2500,
    priceDisplay: '₦2,500',
    heatIndex: 0,
    heatLabel: 'Mild & Earthy (0/5)',
    commercialTarget: 'Wellness & Culinary Prep',
    description:
      'Naturally grown organic turmeric roots, harvested at peak maturity, peeled, solar-dried, and micro-milled. Offers vivid natural golden color and exceptional curcumin potency without bitter astringency.',
    tastingNotes: ['Warm Earth', 'Subtle Ginger Notes', 'Woodsy Root', 'Mild Sweetness'],
    aromaProfile: 'Fresh turned soil, sweet ginger, and floral spice.',
    pairingDish: 'Golden Milk, Curries, Turmeric Infused Rice, and Wellness Tonics',
    origin: 'Kaduna State, Nigeria',
    isHero: false,
    dishImage: '/images/studio_turmeric_powder_1795091037441.jpg',
    secondaryImage: '/images/studio_turmeric_roots_1795090935336.jpg',
    pouchImage: '/assets/aistudio/white-onion-pouch_5e0b3978.jpg',
  },
  {
    id: 'sku-chilli-powder',
    slug: 'chilli-pepper-powder',
    name: 'Chilli Pepper Powder',
    subtitle: 'Pure stone-crushed bird pepper, clean and stinging',
    packaging: '100g Foil Pouch',
    category: 'Pure Powders',
    price: 2500,
    priceDisplay: '₦2,500',
    heatIndex: 4,
    heatLabel: 'Pungent Heat (4/5)',
    commercialTarget: 'General Pungency',
    description:
      'Pure ground native red chilies (Shombo & Ata Rodo) selected for bright crimson hue and sharp, immediate heat. Stone-milled to preserve natural spice oils.',
    tastingNotes: ['Clean Capsaicin', 'Sun-Dried Chili', 'Slight Sweet Pepper', 'Sharp Heat'],
    aromaProfile: 'Warm toasted dried chili pods.',
    pairingDish: 'Meat Marinades, Jollof Enhancement, Fried Plantains (Dodo), and Stews',
    origin: 'Kano State, Nigeria',
    isHero: false,
    dishImage: '/images/studio_chilli_powder_1795090973495.jpg',
  },
  {
    id: 'sku-ginger-slices',
    slug: 'dried-ginger-slices',
    name: 'Dried Ginger Slices',
    subtitle: 'Export-grade high-gingerol split ginger root',
    packaging: 'Bulk Sack (Kg)',
    category: 'Bulk & Export',
    price: null,
    priceDisplay: 'B2B Quote Only',
    heatIndex: 2,
    heatLabel: 'Warm & Spicy (2/5)',
    commercialTarget: 'Commercial Processors',
    description:
      'Peeled and sun-dried Nigerian split ginger slices featuring high essential oil and gingerol content. Sourced for tea blenders, beverage manufacturers, extraction plants, and culinary packagers worldwide.',
    tastingNotes: ['Warm Zing', 'Citrus Peel', 'Deep Pungency', 'Clean Drying'],
    aromaProfile: 'Crisp, spicy ginger citrus with warm woodsy warmth.',
    pairingDish: 'Ginger Extracts, Craft Ginger Beer, Herbal Teas, and Industrial Blends',
    origin: 'Southern Kaduna Ginger Belt, Nigeria',
    isHero: false,
    dishImage: '/images/studio_ginger_slices_1795091047742.jpg',
    secondaryImage: '/images/heritage_banner.jpg',
  },
  {
    id: 'sku-white-pepper',
    slug: 'white-pepper-seeds',
    name: 'White Pepper Seeds',
    subtitle: 'Naturally retted whole white peppercorns',
    packaging: 'Bulk Sack (Kg)',
    category: 'Bulk & Export',
    price: null,
    priceDisplay: 'B2B Quote Only',
    heatIndex: 3,
    heatLabel: 'Sharp & Clean (3/5)',
    commercialTarget: 'Industrial Catering & Broths',
    description:
      'Whole ripe berries soaked in natural spring water to remove the outer husk, followed by thorough sun-curing. Delivers clean, penetrating piperine heat without darkening light culinary sauces.',
    tastingNotes: ['Clean Heat', 'Fermented Piperine', 'Earthy Nuance', 'Sharp Finish'],
    aromaProfile: 'Muted floral aroma with sharp, penetrating heat when cracked.',
    pairingDish: 'White Sauces, Cream Soups, Charcuterie, and Fine Dining Broths',
    origin: 'Cross River Rainforest, Nigeria',
    isHero: false,
    dishImage: '/images/studio_white_pepper_1795091066928.jpg',
    secondaryImage: '/images/heritage_banner.jpg',
  },
  {
    id: 'sku-black-pepper',
    slug: 'black-pepper-seeds',
    name: 'Black Pepper Seeds',
    subtitle: 'High-density sun-cured whole black peppercorns (Piper guineense)',
    packaging: 'Bulk Sack (Kg)',
    category: 'Bulk & Export',
    price: null,
    priceDisplay: 'B2B Quote Only',
    heatIndex: 3,
    heatLabel: 'Bold & Piney (3/5)',
    commercialTarget: 'Industrial Processing',
    description:
      'Deep wrinkled black peppercorns sun-dried immediately after hand picking. High in natural volatile essential oils with distinctive bold, camphoraceous notes.',
    tastingNotes: ['Bold Pungency', 'Pine Resins', 'Woodsmoke', 'Citrus Top-Notes'],
    aromaProfile: 'Pungent, woodsy resin with crushed pine and floral undertones.',
    pairingDish: 'Universal Grinding, Pickling Spice, Dry Rubs, and Seasoning Mixes',
    origin: 'Cross River Forest Reserves, Nigeria',
    isHero: false,
    dishImage: '/images/studio_black_pepper_1795091066765.jpg',
    secondaryImage: '/images/heritage_banner.jpg',
  },
  {
    id: 'sku-turmeric-roots',
    slug: 'whole-turmeric-roots',
    name: 'Whole Turmeric Roots',
    subtitle: 'Sun-cured fingers with deep orange-red core',
    packaging: 'Bulk Sack (Kg)',
    category: 'Bulk & Export',
    price: null,
    priceDisplay: 'B2B Quote Only',
    heatIndex: 0,
    heatLabel: 'Earthy (0/5)',
    commercialTarget: 'Industrial Dye & Extract',
    description:
      'Whole cured turmeric fingers selected for high curcuminoid density. Exported directly to pharmaceutical, natural food color, and specialty spice grinding firms globally.',
    tastingNotes: ['Earthy', 'Deep Mineral', 'Dry Woody', 'Subtle Ginger'],
    aromaProfile: 'Earthy, warm, and herbaceous.',
    pairingDish: 'Industrial Extraction, Natural Dye Processing, and Bulk Grinding',
    origin: 'Kaduna & Nassarawa, Nigeria',
    isHero: false,
    dishImage: '/images/studio_turmeric_roots_1795090935336.jpg',
    secondaryImage: '/images/spices_heritage_banner_1794402217794.jpg',
  },
];

export interface ProductImageSlide {
  url: string;
  label: string;
  backdrop?: 'studio' | 'cutout' | 'pouch' | 'dish';
  note?: string;
}

function classifyBackdrop(url: string): 'studio' | 'cutout' | 'pouch' | 'dish' {
  if (
    url.includes('pepper_soup_spice_0474cc74') ||
    url.includes('habanero_pepper_de25c925') ||
    url.includes('Garlic__24cc6674')
  ) {
    return 'cutout';
  }
  if (url.includes('pouch')) {
    return 'pouch';
  }
  if (url.includes('hero_') || url.includes('_dish')) {
    return 'dish';
  }
  return 'studio';
}

export function getProductImages(product: ProductSKU): ProductImageSlide[] {
  const primaryUrl = product.dishImage || '/images/heritage_banner.jpg';
  const primaryBackdrop = classifyBackdrop(primaryUrl);

  const candidates: ProductImageSlide[] = [
    {
      url: primaryUrl,
      label:
        product.category === 'Bulk & Export'
          ? 'Harvest Commodity'
          : primaryBackdrop === 'pouch'
          ? '100g Pouch & Batch Label'
          : 'Open Bowl Studio',
      backdrop: primaryBackdrop,
      note:
        primaryBackdrop === 'pouch'
          ? 'Zoom up to 3.5x to inspect sealed pouch stitching, batch number (BN), and production/expiry dates.'
          : 'Inspect grain uniformity, stone-milled texture, and natural spice oils in studio macro mode.',
    },
  ];

  if (product.secondaryImage) {
    const secBackdrop = classifyBackdrop(product.secondaryImage);
    const label =
      secBackdrop === 'pouch'
        ? '100g Sealed Pouch'
        : product.secondaryImage.includes('Habanero_pepper_2')
        ? 'Whole Peppers'
        : product.secondaryImage.includes('studio_turmeric_roots')
        ? 'Raw Cured Roots'
        : secBackdrop === 'dish'
        ? 'Culinary Dish'
        : 'Macro & Origin';

    candidates.push({
      url: product.secondaryImage,
      label,
      backdrop: secBackdrop,
      note:
        secBackdrop === 'dish'
          ? 'Finished culinary pairing plated with small-batch K&L stone-milled spice blends.'
          : 'Raw botanical origin view showing natural color intensity prior to milling.',
    });
  }

  if (product.pouchImage) {
    candidates.push({
      url: product.pouchImage,
      label: '100g Batch Pouch',
      backdrop: 'pouch',
      note: 'Zoom in to verify heat-sealed barrier pouch, batch traceability code (BN), PD, and best-before stamps.',
    });
  }

  // Deduplicate by URL preserving first label
  const seen = new Set<string>();
  return candidates.filter((item) => {
    if (!item.url || seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

