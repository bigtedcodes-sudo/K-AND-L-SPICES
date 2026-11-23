export interface ReelBeat {
  second: string;
  cue: string;
  caption: string;
}

export interface CulinaryReel {
  id: string;
  title: string;
  category: 'Dish Sauté' | 'Fire Grill' | 'Broth & Herbs' | 'Origin & Milling';
  durationLabel: string;
  durationSeconds: number;
  chefOrSource: string;
  location: string;
  posterImage: string;
  accentImage: string;
  summary: string;
  spiceIds: string[];
  beats: ReelBeat[];
}

export interface RecipeIngredientSpice {
  productId: string;
  dosage: string;
}

export interface ShoppableRecipe {
  id: string;
  title: string;
  subtitle: string;
  category: 'Signature Dishes' | 'Grills & Marinades' | 'Broths & Soups' | 'Wellness & Brews';
  prepTime: string;
  servings: string;
  heatLevel: string;
  image: string;
  chefNote: string;
  spices: RecipeIngredientSpice[];
  pantryExtras: string[];
  steps: string[];
}

export interface HarvestClip {
  id: string;
  title: string;
  region: string;
  duration: string;
  metricBadge: string;
  image: string;
  summary: string;
  linkedProductId: string;
}

export const CULINARY_REELS: CulinaryReel[] = [
  {
    id: 'reel-jollof-saute',
    title: '15s Smoky Party Jollof Base',
    category: 'Dish Sauté',
    durationLabel: '0:15',
    durationSeconds: 15,
    chefOrSource: 'Chef Tunde Adeyemi · Test Kitchen',
    location: 'Victoria Island, Lagos',
    posterImage: '/images/hero_jollof_platter_1794402215839.jpg',
    accentImage: '/images/jollof_dish.jpg',
    summary:
      'See how blooming Jollof Rice Spice Mix and pure allium powders in sizzling tomato reduction builds firewood depth without artificial bouillon cubes.',
    spiceIds: ['sku-jollof', 'sku-white-onion', 'sku-chilli-powder'],
    beats: [
      {
        second: '00:00',
        cue: 'Bloom in Hot Oil',
        caption: 'Stir 2 tbsp K&L Jollof Rice Spice Mix into warm peanut oil for 25 seconds to awaken smoked paprika & bay leaf oils.',
      },
      {
        second: '00:05',
        cue: 'Layer Pure Alliums',
        caption: 'Fold in 1 tsp White Onion Powder + strained red pepper puree—zero lumps, zero starch fillers.',
      },
      {
        second: '00:11',
        cue: 'Crisp Bottom Roast',
        caption: 'Drop long-grain parboiled rice, cover tightly with foil, and let high-heat steam caramelize the signature party bottom crust.',
      },
    ],
  },
  {
    id: 'reel-suya-grill',
    title: '15s Kano Street-Style Yaji Sear',
    category: 'Fire Grill',
    durationLabel: '0:15',
    durationSeconds: 15,
    chefOrSource: 'Mai Suya Musa Atelier',
    location: 'Kano -> Lagos Pop-Up',
    posterImage: '/images/hero_suya_platter_1794402216427.jpg',
    accentImage: '/assets/aistudio/Suya_pepper_17c114ee.jpeg',
    summary:
      'Double-coat basted beef sirloin ribbons in stone-ground toasted peanut Yaji and heirloom garlic powder over glowing hardwood charcoal.',
    spiceIds: ['sku-yaji-suya', 'sku-garlic-powder'],
    beats: [
      {
        second: '00:00',
        cue: 'Oil & Garlic Massage',
        caption: 'Brush thin beef ribeye skewers with groundnut oil and heirloom Kaduna Garlic Powder so flavor penetrates before flame contact.',
      },
      {
        second: '00:06',
        cue: 'Charcoal Flash Sear',
        caption: 'Grill 4 minutes per side over white-hot wood coals until edges lock in juices and begin sizzling.',
      },
      {
        second: '00:11',
        cue: 'The Double-Yaji Coat',
        caption: 'Press warm skewers generously into freshly stone-milled K&L Yaji Suya Pepper and serve with crisp raw red onion rings.',
      },
    ],
  },
  {
    id: 'reel-pepper-soup',
    title: '18s Restorative Pepper Soup Simmer',
    category: 'Broth & Herbs',
    durationLabel: '0:18',
    durationSeconds: 18,
    chefOrSource: 'Chef Adaora Nwachukwu',
    location: 'Enugu & Port Harcourt',
    posterImage: '/images/hero_native_soup_1794402217362.jpg',
    accentImage: '/assets/aistudio/pepper_soup_spice_0474cc74.jpeg',
    summary:
      'Gentle aromatics infusion using stone-crushed Ehuru, Uda, and golden Nsukka yellow habanero flakes for crystal-clear restorative broth.',
    spiceIds: ['sku-pepper-soup', 'sku-yellow-habanero', 'sku-native-soup'],
    beats: [
      {
        second: '00:00',
        cue: 'Steep Whole Botanicals',
        caption: 'Simmer whisked K&L Pepper Soup Spice Mix directly in light fish or goat broth—camphorous Ehuru opens cleanly at 85°C.',
      },
      {
        second: '00:06',
        cue: 'Poach Without Boiling',
        caption: 'Slip in fresh Atlantic catfish steaks and aromatic scent leaf ribbons, keeping broth gently trembling.',
      },
      {
        second: '00:13',
        cue: 'Nsukka Golden Lift',
        caption: 'Finish with a pinch of Dried Yellow Habanero Pepper flakes right before serving for bright citrus-floral fire.',
      },
    ],
  },
  {
    id: 'reel-stone-mill',
    title: '22s Sub-28°C Granite Stone Milling',
    category: 'Origin & Milling',
    durationLabel: '0:22',
    durationSeconds: 22,
    chefOrSource: 'K&L Quality & Milling Team',
    location: 'Kaduna Millworks, Nigeria',
    posterImage: '/images/spices_heritage_banner_1794402217794.jpg',
    accentImage: '/images/studio_turmeric_powder_1795091037441.jpg',
    summary:
      'Go behind the millstone to see how solar-cured Kaduna turmeric, ginger slices, and garlic cloves are cold-milled to retain 100% essential terpenes.',
    spiceIds: ['sku-turmeric-powder', 'sku-garlic-powder', 'sku-white-onion'],
    beats: [
      {
        second: '00:00',
        cue: 'Solar-Table Moisture Check',
        caption: 'Roots and bulbs from Kaduna and Plateau farms are tested under 10% moisture before ever touching the granite wheel.',
      },
      {
        second: '00:08',
        cue: 'Slow Cold Friction (<28°C)',
        caption: 'High-RPM steel blades scorch delicate essential oils; slow carved stone keeps temperatures cool so color and aroma stay intact.',
      },
      {
        second: '00:16',
        cue: 'Small-Batch Foil & Glass Seal',
        caption: 'Freshly sifted batches are stamped with BN/PD batch codes and heat-sealed within 4 hours of milling.',
      },
    ],
  },
];

export const CHEF_RECIPES: ShoppableRecipe[] = [
  {
    id: 'recipe-party-jollof',
    title: 'Lagos Smokehouse Party Jollof Rice',
    subtitle: 'Firewood aroma engineered for home induction, gas, or outdoor coal pots',
    category: 'Signature Dishes',
    prepTime: '45 min',
    servings: '6 servings',
    heatLevel: 'Warm & Smoky (2/5)',
    image: '/images/hero_jollof_platter_1794402215839.jpg',
    chefNote:
      'Blooming the Jollof Spice Mix directly in the initial tomato-pepper oil reduction releases lipid-soluble bay leaf and roasted bell pepper notes.',
    spices: [
      { productId: 'sku-jollof', dosage: '2.5 tbsp' },
      { productId: 'sku-white-onion', dosage: '1.5 tsp' },
      { productId: 'sku-garlic-powder', dosage: '1 tsp' },
      { productId: 'sku-chilli-powder', dosage: '0.5 tsp' },
    ],
    pantryExtras: [
      '3 cups parboiled long-grain basmati or golden sella rice',
      '6 plum tomatoes + 2 red bell peppers (Tatashe), blended & reduced',
      '4 tbsp groundnut oil + 200ml roasted chicken or vegetable stock',
    ],
    steps: [
      'Reduce the blended tomato and Tatashe base over medium-high heat for 15 minutes until thick, glossy, and free of sour raw water.',
      'Stir in 2.5 tbsp K&L Jollof Rice Spice Mix, 1.5 tsp White Onion Powder, and 1 tsp Garlic Powder; fry for 3 minutes until fragrant oil separates.',
      'Fold washed rice into the crimson base, pour in warm stock just level with the grains, and sprinkle Chilli Pepper Powder to taste.',
      'Seal the pot rim tightly with parchment and foil, cook on low heat 20 minutes until tender, then raise heat for 90 seconds to toast the bottom.',
    ],
  },
  {
    id: 'recipe-suya-skewers',
    title: 'Kano Charcoal Beef Yaji Suya',
    subtitle: 'Nutty roasted-peanut crust with stinging bird’s eye chili heat',
    category: 'Grills & Marinades',
    prepTime: '25 min',
    servings: '4 servings',
    heatLevel: 'Fiery & Nutty (4/5)',
    image: '/images/hero_suya_platter_1794402216427.jpg',
    chefNote:
      'Always dust half the Yaji Suya rub onto oiled meat before grilling, and press the fresh half onto hot sliced ribbons immediately off the fire.',
    spices: [
      { productId: 'sku-yaji-suya', dosage: '4 tbsp' },
      { productId: 'sku-garlic-powder', dosage: '1 tsp' },
      { productId: 'sku-white-onion', dosage: '1 tsp' },
    ],
    pantryExtras: [
      '650g beef sirloin or ribeye, sliced into 4mm ribbons',
      '3 tbsp cold-pressed groundnut oil + pinch of sea salt',
      '1 crisp red onion & cherry tomatoes for serving',
    ],
    steps: [
      'Thread beef ribbons flat onto soaked bamboo skewers and brush evenly with groundnut oil.',
      'Dust skewers lightly with Garlic Powder, White Onion Powder, and 1.5 tbsp Yaji Suya Pepper; rest 10 minutes.',
      'Sear on a hot cast-iron griddle or wood grill 3–4 minutes per side, basting lightly with seasoned oil.',
      'Remove from heat, roll vigorously in the remaining 2.5 tbsp K&L Yaji Suya Pepper, and garnish with sliced red onions.',
    ],
  },
  {
    id: 'recipe-catfish-pepper-soup',
    title: 'Rainforest Point-and-Kill Catfish Pepper Soup',
    subtitle: 'Clear aromatic broth anchored in camphorous Ehuru & coastal Uziza',
    category: 'Broths & Soups',
    prepTime: '30 min',
    servings: '4 servings',
    heatLevel: 'Restorative Fire (4/5)',
    image: '/images/hero_native_soup_1794402217362.jpg',
    chefNote:
      'Do not over-boil once fresh catfish goes in—the herbal Pepper Soup elixir blooms cleanly in a gentle aromatic shimmer.',
    spices: [
      { productId: 'sku-pepper-soup', dosage: '2 tbsp' },
      { productId: 'sku-yellow-habanero', dosage: '0.5 tsp' },
      { productId: 'sku-native-soup', dosage: '1 tbsp' },
    ],
    pantryExtras: [
      '1.2kg fresh catfish steaks, rinsed cleanly with warm lime water',
      '1.2 liters water or light fish stock + peeled boiled yams on side',
      'Handful torn African scent leaf (Efirin) & sea salt',
    ],
    steps: [
      'Bring water to a rolling simmer in a wide pot and whisk in 2 tbsp Pepper Soup Spice Mix plus 1 tbsp Native Soup Spice.',
      'Allow the Ehuru, Uda, and fermented dawadawa aromatics to infuse uncovered for 8 minutes as the broth turns warm amber.',
      'Gently lower in catfish steaks and add Dried Yellow Habanero Pepper flakes without stirring vigorously.',
      'Simmer softly for 10–12 minutes until fish flakes cleanly, then scatter shredded scent leaf right before ladling.',
    ],
  },
  {
    id: 'recipe-golden-elixir',
    title: 'Kaduna Curcumin & Piperine Wellness Tonic',
    subtitle: 'Anti-inflammatory golden broth harnessing natural piperine activation',
    category: 'Wellness & Brews',
    prepTime: '10 min',
    servings: '2 mugs',
    heatLevel: 'Gentle Warmth (1/5)',
    image: '/images/studio_turmeric_powder_1795091037441.jpg',
    chefNote:
      'Black pepper’s natural piperine boosts curcumin absorption by up to 2,000%—crushed chilli adds circulation-warming thermogenesis.',
    spices: [
      { productId: 'sku-turmeric-powder', dosage: '2 tsp' },
      { productId: 'sku-chilli-powder', dosage: 'pinch' },
      { productId: 'sku-garlic-powder', dosage: '0.25 tsp' },
    ],
    pantryExtras: [
      '500ml oat milk, coconut milk, or rich bone broth',
      '1 tsp raw blossom honey or cold-pressed coconut oil',
      'Fresh cracked black pepper',
    ],
    steps: [
      'Warm milk or light broth in a saucepan over low heat until steaming (never boiling).',
      'Whisk in 2 tsp K&L Turmeric Root Powder, a pinch of Chilli Pepper Powder, and optional cracked black pepper.',
      'For savory recovery broth, whisk in Garlic Powder and a drop of olive oil; for dessert tonics, drizzle raw honey.',
      'Simmer 4 minutes to bloom essential curcuminoids, strain lightly into stoneware mugs, and sip warm.',
    ],
  },
];

export const HARVEST_CLIPS: HarvestClip[] = [
  {
    id: 'clip-ginger-kaduna',
    title: 'Southern Kaduna Split Ginger Solar Curing',
    region: 'Jaba & Kachia Farms, Kaduna',
    duration: '1:12 Documentary Clip',
    metricBadge: '6.8% Volatile Oil Yield',
    image: '/images/studio_ginger_slices_1795091047742.jpg',
    summary:
      'Single-origin Nigerian split ginger hand-washed in clean boreholes and dried slowly on raised elevated racks to prevent aflatoxins and lock in sharp citrus gingerol.',
    linkedProductId: 'sku-ginger-slices',
  },
  {
    id: 'clip-peppercorns-crossriver',
    title: 'Cross River Forest Peppercorn Retting',
    region: 'Ikom & Oban Hills, Cross River',
    duration: '0:58 Field Feature',
    metricBadge: '100% Sun-Washed Berry',
    image: '/images/studio_white_pepper_1795091066928.jpg',
    summary:
      'How ripe wild Piper guineense berries are soaked in mountain spring water to naturally loosen the outer skin, revealing cream-white cores for crisp sauces.',
    linkedProductId: 'sku-white-pepper',
  },
  {
    id: 'clip-turmeric-curcumin',
    title: 'High-Curcumin Rhizome Selection & Core Inspection',
    region: 'Nassarawa & Kaduna Corridor',
    duration: '1:05 QC Lot Audit',
    metricBadge: '>4.5% Curcumin Density',
    image: '/images/studio_turmeric_roots_1795090935336.jpg',
    summary:
      'Every harvested rhizome lot is hand-snapped at the intake dock to inspect deep terracotta-orange core saturation before curing or stone milling.',
    linkedProductId: 'sku-turmeric-roots',
  },
];
