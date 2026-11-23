import { Language } from '@/lib/i18n';

export interface AboutSubpageLink {
  slug: 'learn-about-us' | 'core-values' | 'management-team' | 'board-of-directors';
  href: string;
  key: 'learnAboutUs' | 'coreValues' | 'managementTeam' | 'boardOfDirectors';
  summary: Record<Language, string>;
}

export const ABOUT_SUBPAGES: AboutSubpageLink[] = [
  {
    slug: 'learn-about-us',
    href: '/about/learn-about-us',
    key: 'learnAboutUs',
    summary: {
      en: 'Our origin story from West African spice farms to ambient stone-milling in Lagos and Kaduna.',
      de: 'Unsere Herkunftsgeschichte von westafrikanischen Farmen bis zur Steinmahlung in Lagos und Kaduna.',
      fr: 'Notre histoire, des récoltes ouest-africaines à la meunerie sur pierre à Lagos et Kaduna.',
    },
  },
  {
    slug: 'core-values',
    href: '/about/core-values',
    key: 'coreValues',
    summary: {
      en: 'Six non-negotiable standards governing single-origin purity, cold milling, and grower partnerships.',
      de: 'Sechs unverhandelbare Prinzipien für Sortenreinheit, Kaltmahlung und faire Partnerschaften.',
      fr: 'Six engagements stricts guidant la pureté botanique, le broyage à froid et l’éthique.',
    },
  },
  {
    slug: 'management-team',
    href: '/about/management-team',
    key: 'managementTeam',
    summary: {
      en: 'Meet the operational executives leading agronomy sourcing, stone-milling QA, and WhatsApp fulfillment.',
      de: 'Das operative Führungsteam für Anbau, Qualitätskontrolle und Exportabwicklung.',
      fr: 'L’équipe dirigeante supervisant l’agronomie, la meunerie, la qualité et l’expédition.',
    },
  },
  {
    slug: 'board-of-directors',
    href: '/about/board-of-directors',
    key: 'boardOfDirectors',
    summary: {
      en: 'Strategic governance, agricultural stewardship, and international export oversight.',
      de: 'Strategische Unternehmensführung, Agrar-Governance und internationale Exportaufsicht.',
      fr: 'Gouvernance stratégique, supervision agricole et conformité export internationale.',
    },
  },
];

export interface CoreValueItem {
  code: string;
  title: string;
  description: string;
  standard: string;
}

export interface LeadershipProfile {
  initials: string;
  name: string;
  role: string;
  location: string;
  tenureOrCommittee: string;
  bio: string;
  focusAreas: string[];
}

export interface AboutStoryContent {
  heroKicker: string;
  heroTitle: string;
  heroLead: string;
  paragraphs: string[];
  milestones: { year: string; title: string; detail: string }[];
  regionalFootprint: { region: string; crop: string }[];
}

export const LEARN_ABOUT_CONTENT: Record<Language, AboutStoryContent> = {
  en: {
    heroKicker: 'Learn About Us',
    heroTitle: 'Preserving West African Culinary Heritage Through Cold Stone-Milling',
    heroLead:
      'K&L Spices was founded to bridge smallholder spice growers across Nigeria’s richest agricultural belts with discerning home kitchens, chefs, and international food importers.',
    paragraphs: [
      'Across West Africa, flavor begins with soil, sun-curing, and patience. Yet commercial mass-market spices routinely pass through high-heat industrial hammer mills that scorch delicate volatile oils and dilute blends with starch or anti-caking powders.',
      'From our sourcing hubs in Kaduna, Kano, Enugu, Plateau, and Cross River to our small-batch stone-milling and glass-jarring facility in Lagos, K&L Spices refuses shortcuts. Every seed, pod, chili, and root is cleaned by hand, solar-dried, stone-milled below 28°C, and stamped with verifiable production and batch dates.',
      'Through our direct WhatsApp fulfillment desk and multi-currency storefront, families in Lagos, Berlin, Paris, London, and diaspora households worldwide receive the exact aroma found in heritage kitchens—and B2B buyers access export-ready ginger, peppers, and turmeric directly from origin.',
    ],
    milestones: [
      {
        year: 'Origin Belt',
        title: 'Direct Farm-Gate Sourcing Network',
        detail:
          'Established cooperative harvest partnerships across Kaduna ginger belts, Nsukka yellow pepper farms, and Cross River forest reserves.',
      },
      {
        year: 'Milling Craft',
        title: 'Ambient Granite Stone-Milling Launch',
        detail:
          'Replaced high-speed metal grinding with slow cold stone milling to retain 100% of native aromatic terpenes and essential oils.',
      },
      {
        year: 'Packaging',
        title: 'Airtight Jars, Traceable 100g Pouches & Bulk Export',
        detail:
          'Introduced UV-sealed glass jars, batch-coded 100g pouches, bespoke cedar gift boxes, and export-grade bulk commodity sacks.',
      },
      {
        year: 'Global Desk',
        title: 'Trilingual Storefront & Instant WhatsApp Fulfillment',
        detail:
          'Launched multi-currency ordering (NGN, USD, EUR, GBP) in English, German, and French routed directly to human fulfillment specialists.',
      },
    ],
    regionalFootprint: [
      { region: 'Nsukka Hills, Enugu', crop: 'Yellow Scotch Bonnet / Habanero Peppers' },
      { region: 'Southern Kaduna & Nassarawa', crop: 'High-Gingerol Split Ginger & Turmeric' },
      { region: 'Kano & Sokoto Plains', crop: 'Toasted Suya Groundnut Base, Sweet White Onion & Red Chili' },
      { region: 'Plateau State', crop: 'Heirloom Allicin-Rich Garlic Bulbs' },
      { region: 'Cross River Rainforest', crop: 'Whole Black & White Peppercorns, Uziza & Uda Pods' },
    ],
  },
  de: {
    heroKicker: 'Über uns erfahren',
    heroTitle: 'Bewahrung westafrikanischer Gewürzkultur durch kalte Steinmahlung',
    heroLead:
      'K&L Spices verbindet Kleinbauern aus den fruchtbarsten Anbauregionen Nigerias direkt mit anspruchsvollen Privatküchen, Spitzenköchen und internationalen Importeuren.',
    paragraphs: [
      'Authentischer westafrikanischer Geschmack entsteht durch Sonnengereiftheit und Geduld. Industrielle Massenware wird jedoch meist bei hoher Hitze vermahlen und mit Stärke oder Trennmitteln gestreckt.',
      'Von unseren Erzeugerregionen in Kaduna, Kano, Enugu, Plateau und Cross River bis zu unserer Abfüllung in Lagos verarbeitet K&L Spices jede Charge schonend bei unter 28°C auf Granitsteinen – vollständig rückverfolgbar mit Chargen- und Abfülldatum.',
      'Über unseren direkten WhatsApp-Service beliefern wir Haushalte in Afrika und Europa sowie gewerbliche B2B-Abnehmer mit sortenreinen Mischungen und Rohexport-Waren.',
    ],
    milestones: [
      {
        year: 'Anbau',
        title: 'Direkte Erzeuger-Partnerschaften',
        detail: 'Kooperationen mit Farmen in Kaduna, Nsukka, Kano und Cross River.',
      },
      {
        year: 'Handwerk',
        title: 'Kalte Granit-Steinmahlung',
        detail: 'Vollständiger Erhalt empfindlicher Terpene und ätherischer Öle.',
      },
      {
        year: 'Qualität',
        title: 'Chargencodierte Gläser & Aromabeutel',
        detail: 'Rückverfolgbare 100g-Gebinde ohne Rieselhilfen oder Zusatzstoffe.',
      },
      {
        year: 'Weltweit',
        title: 'Mehrsprachige Direktabwicklung',
        detail: 'Bestellabwicklung in EN, DE und FR mit NGN, EUR, USD und GBP.',
      },
    ],
    regionalFootprint: [
      { region: 'Nsukka Hills, Enugu', crop: 'Gelbe Habanero- & Scotch-Bonnet-Chilis' },
      { region: 'Süd-Kaduna & Nassarawa', crop: 'Export-Ingwer & Kurkumawurzeln' },
      { region: 'Kano & Sokoto', crop: 'Suya-Erdnussbasis, Weiße Zwiebeln & Rote Chilis' },
      { region: 'Plateau State', crop: 'Aromaintensiver Hochland-Knoblauch' },
      { region: 'Cross River Regenwald', crop: 'Schwarzer & Weißer Urwaldpfeffer, Uziza & Uda' },
    ],
  },
  fr: {
    heroKicker: 'À Propos de Nous',
    heroTitle: 'Préserver le Patrimoine Culinaire Ouest-Africain par la Meule de Pierre',
    heroLead:
      'K&L Spices relie directement les producteurs des terroirs nigérians aux cuisines exigeantes, chefs restaurateurs et importateurs internationaux.',
    paragraphs: [
      'En Afrique de l’Ouest, la saveur naît du soleil et de la patience. Pour préserver les huiles essentielles souvent détruites par le broyage industriel rapide, K&L Spices privilégie la mouture lente à température ambiante (<28°C).',
      'De nos bassins de récolte à Kaduna, Kano, Enugu, Plateau et Cross River jusqu’à notre atelier de Lagos, chaque graine et racine est triée à la main, moulue sur pierre et conditionnée avec une traçabilité par numéro de lot.',
      'Grâce à notre boutique multilingue et notre bureau de commande direct sur WhatsApp, particuliers et acheteurs professionnels B2B accèdent à la pureté d’origine sans intermédiaire.',
    ],
    milestones: [
      {
        year: 'Terroirs',
        title: 'Réseau de Producteurs Locaux',
        detail: 'Partenariats directs dans les zones de Kaduna, Nsukka, Kano et Cross River.',
      },
      {
        year: 'Meunerie',
        title: 'Mouture Lente sur Pierre à Froid',
        detail: 'Préservation intégrale des terpènes aromatiques et essences volatiles.',
      },
      {
        year: 'Conditionnement',
        title: 'Bocaux en Verre & Sachets Traçables 100g',
        detail: 'Zéro amidon, zéro additif, étiquetage par lot et date de production.',
      },
      {
        year: 'Service',
        title: 'Commande Directe Multidevises',
        detail: 'Service trilingue EN, FR et DE avec expédition locale et internationale.',
      },
    ],
    regionalFootprint: [
      { region: 'Collines de Nsukka, Enugu', crop: 'Piments Habanero / Scotch Bonnet Jaunes' },
      { region: 'Sud-Kaduna & Nassarawa', crop: 'Gingembre & Curcuma Haute Concentration' },
      { region: 'Plaines de Kano & Sokoto', crop: 'Base Suya, Oignons Blancs & Piments Rouges' },
      { region: 'État du Plateau', crop: 'Ail Ancestral Riche en Allicine' },
      { region: 'Forêt de Cross River', crop: 'Poivres Noir & Blanc, Uziza & Gousses d’Uda' },
    ],
  },
};

export const CORE_VALUES_DATA: Record<Language, { title: string; subtitle: string; values: CoreValueItem[] }> = {
  en: {
    title: 'Our Six Core Values',
    subtitle:
      'Every jar sealed, pouch packed, and export container dispatched is audited against six foundational commitments.',
    values: [
      {
        code: '01',
        title: 'Zero-Filler Purity',
        description:
          'We never dilute onion, garlic, or turmeric powders with cornstarch, wheat flour, rice hulls, synthetic dyes, or silica anti-caking agents.',
        standard: '100% Botanical Ingredient Declaration',
      },
      {
        code: '02',
        title: 'Cold Stone-Milling Craft',
        description:
          'Slow granite stone friction prevents thermal degradation, locking in the vibrant aromatics and medicinal capsaicinoids of every spice.',
        standard: 'Milled Below 28°C Ambient Threshold',
      },
      {
        code: '03',
        title: 'Single-Origin Provenance',
        description:
          'Each spice is harvested from the Nigerian microclimate where it naturally excels—from Nsukka yellow chilies to Southern Kaduna ginger.',
        standard: 'Region-Locked Harvest Sourcing',
      },
      {
        code: '04',
        title: 'Batch Traceability & Freshness',
        description:
          'Every sealed 100g pouch and glass jar carries a dedicated Production Date (PD), Best Before (BB), and unique Batch Number (BN).',
        standard: 'Small-Batch Lot Accountability',
      },
      {
        code: '05',
        title: 'Fair Smallholder Partnerships',
        description:
          'We purchase directly from farming cooperatives at harvest with transparent grading and fair-margin pricing that sustains rural agricultural communities.',
        standard: 'Direct Grower Compensation',
      },
      {
        code: '06',
        title: 'Human-First Fulfillment',
        description:
          'Whether ordering one 100g jar or five metric tons of split ginger, customers connect directly with real fulfillment specialists via WhatsApp.',
        standard: '2-Hour Desk Response Commitment',
      },
    ],
  },
  de: {
    title: 'Unsere sechs Grundwerte',
    subtitle:
      'Jedes versiegelte Glas, jeder 100g-Beutel und jede Exportlieferung unterliegt sechs verbindlichen Qualitätsversprechen.',
    values: [
      {
        code: '01',
        title: 'Reinheit ohne Füllstoffe',
        description:
          'Kein Zusatz von Stärke, Mehl, Farbstoffen oder Siliziumdioxid-Rieselhilfen in unseren Pulvern und Mischungen.',
        standard: '100% Deklarierte Rohstoffreinheit',
      },
      {
        code: '02',
        title: 'Kalte Steinmahlung',
        description:
          'Schonende Reibung auf Naturgranit verhindert Hitzeverlust und bewahrt ätherische Öle sowie Terpene.',
        standard: 'Vermahlung unter 28°C',
      },
      {
        code: '03',
        title: 'Reinsortige Herkunft',
        description:
          'Jedes Gewürz stammt aus der historischen Spitzenregion Nigerias – etwa Nsukka-Chili oder Kaduna-Ingwer.',
        standard: 'Regionale Ursprungsgarantie',
      },
      {
        code: '04',
        title: 'Vollständige Chargentransparenz',
        description:
          'Jede Verpackung trägt Produktionsdatum (PD), Mindesthaltbarkeit (BB) und Chargennummer (BN).',
        standard: 'Lückenlose Kleinserien-Prüfung',
      },
      {
        code: '05',
        title: 'Faire Erzeuger-Partnerschaft',
        description:
          'Direkter Einkauf bei Anbaukooperativen zu verlässlichen, fairen Erzeugerpreisen.',
        standard: 'Direkte Farm-Kooperation',
      },
      {
        code: '06',
        title: 'Persönlicher Kundenservice',
        description:
          'Direkter Kontakt zu geschulten Experten über WhatsApp statt anonymer Callcenter.',
        standard: '2-Stunden-Reaktionsziel',
      },
    ],
  },
  fr: {
    title: 'Nos Six Valeurs Fondamentales',
    subtitle:
      'Chaque bocal scellé, sachet 100g et lot d’exportation répond à six engagements qualité sans compromis.',
    values: [
      {
        code: '01',
        title: 'Pureté Sans Additifs',
        description:
          'Aucun amidon, aucune farine, aucun colorant ni agent antimottant dans nos poudres et mélanges.',
        standard: '100% Botanique Pur',
      },
      {
        code: '02',
        title: 'Mouture Lente sur Pierre',
        description:
          'La friction douce du granit évite l’échauffement thermique et préserve les huiles essentielles.',
        standard: 'Mouture à Froid <28°C',
      },
      {
        code: '03',
        title: 'Terroir d’Origine Unique',
        description:
          'Chaque récolte provient de sa région d’excellence naturelle : piments de Nsukka, gingembre de Kaduna.',
        standard: 'Traçabilité Terroir',
      },
      {
        code: '04',
        title: 'Traçabilité par Lot',
        description:
          'Chaque sachet et bocal mentionne sa date de production (PD), sa DLUO (BB) et son numéro de lot (BN).',
        standard: 'Contrôle Petit Lot',
      },
      {
        code: '05',
        title: 'Partenariat Agricole Équitable',
        description:
          'Achats directs auprès des coopératives rurales avec une rémunération juste dès la récolte.',
        standard: 'Commerce Direct Producteurs',
      },
      {
        code: '06',
        title: 'Relation Humaine Directe',
        description:
          'Un accompagnement personnalisé sur WhatsApp pour les commandes individuelles comme pour l’export.',
        standard: 'Réponse sous 2 Heures',
      },
    ],
  },
};

export const MANAGEMENT_TEAM_DATA: Record<
  Language,
  { title: string; subtitle: string; members: LeadershipProfile[] }
> = {
  en: {
    title: 'Executive Management Team',
    subtitle:
      'Our day-to-day leadership unites traditional spice craftsmanship, modern food safety compliance, and high-touch digital fulfillment.',
    members: [
      {
        initials: 'KO',
        name: 'Kunle Ogunleye',
        role: 'Chief Executive & Managing Director',
        location: 'Lagos Milling & HQ',
        tenureOrCommittee: 'Co-Founder · Strategy & Brand Stewardship',
        bio: 'Leads K&L Spices’ commercial vision, retail expansion, and international diaspora distribution strategy across West Africa and Europe.',
        focusAreas: ['Corporate Strategy', 'Brand Growth', 'Diaspora Retail'],
      },
      {
        initials: 'LA',
        name: 'Ladi Abdullahi',
        role: 'Head of Agronomy & Origin Sourcing',
        location: 'Kaduna & Kano Agricultural Belt',
        tenureOrCommittee: 'Co-Founder · Grower Network Lead',
        bio: 'Oversees smallholder cooperative partnerships, solar dehydration protocols, and raw crop grading across Northern and Eastern Nigeria.',
        focusAreas: ['Farm Cooperatives', 'Solar Curing QA', 'Bulk Raw Grading'],
      },
      {
        initials: 'CE',
        name: 'Chidinma Eze',
        role: 'Director of Stone-Milling & Food Safety',
        location: 'Lagos Production Facility',
        tenureOrCommittee: 'Operations · HACCP & Batch Traceability',
        bio: 'Directs ambient granite stone-milling production runs, moisture testing, and batch-coded airtight glass and foil-pouch packaging.',
        focusAreas: ['Cold Milling Ops', 'Batch Coding (BN)', 'Zero-Filler Audits'],
      },
      {
        initials: 'TB',
        name: 'Tunde Balogun',
        role: 'Head of B2B Export & WhatsApp Fulfillment',
        location: 'Lagos Export & Dispatch Desk',
        tenureOrCommittee: 'Commercial · HORECA & International Trade',
        bio: 'Manages direct WhatsApp conversion workflows, custom corporate spice gifting, HORECA accounts, and FOB commodity export logistics.',
        focusAreas: ['Export Logistics', 'HORECA Accounts', 'Client Fulfillment'],
      },
    ],
  },
  de: {
    title: 'Management-Team',
    subtitle:
      'Unser Führungsteam verbindet traditionelle Gewürzverarbeitung mit moderner Lebensmittelsicherheit und direktem Kundenservice.',
    members: [
      {
        initials: 'KO',
        name: 'Kunle Ogunleye',
        role: 'Geschäftsführer & Co-Founder',
        location: 'Lagos Hauptsitz',
        tenureOrCommittee: 'Unternehmensstrategie & Markenführung',
        bio: 'Leitet die kommerzielle Expansion von K&L Spices, den Einzelhandel sowie die internationale Diaspora-Versorgung in Europa.',
        focusAreas: ['Strategie', 'Markenentwicklung', 'Europa-Vertrieb'],
      },
      {
        initials: 'LA',
        name: 'Ladi Abdullahi',
        role: 'Leiter Agronomie & Rohstoffbeschaffung',
        location: 'Kaduna & Kano',
        tenureOrCommittee: 'Erzeugernetzwerk & Erntekontrolle',
        bio: 'Koordiniert Partnerschaften mit Bauernkooperativen, Sonnentrocknung und Rohwaren-Klassifizierung in den Anbauregionen.',
        focusAreas: ['Kooperativen', 'Trocknungs-QA', 'Erntequalität'],
      },
      {
        initials: 'CE',
        name: 'Chidinma Eze',
        role: 'Direktorin für Steinmahlung & Lebensmittelsicherheit',
        location: 'Produktionswerk Lagos',
        tenureOrCommittee: 'Produktion & Chargenprüfung',
        bio: 'Verantwortet die schonende Granit-Steinmahlung unter 28°C, Feuchtigkeitstests und chargenreine Abfüllung.',
        focusAreas: ['Kaltmahlung', 'Chargencodes', 'Reinheitskontrolle'],
      },
      {
        initials: 'TB',
        name: 'Tunde Balogun',
        role: 'Leiter Export, B2B & WhatsApp-Service',
        location: 'Lagos Export-Desk',
        tenureOrCommittee: 'Gastronomie & Internationaler Handel',
        bio: 'Steuert die direkte WhatsApp-Bestellabwicklung, Firmengeschenke, Gastronomiekunden und den internationalen FOB-Export.',
        focusAreas: ['Exportlogistik', 'HORECA', 'Kundenbetreuung'],
      },
    ],
  },
  fr: {
    title: 'Équipe de Direction',
    subtitle:
      'Notre direction opérationnelle réunit savoir-faire meunier ancestral, sûreté alimentaire rigoureuse et service client direct.',
    members: [
      {
        initials: 'KO',
        name: 'Kunle Ogunleye',
        role: 'Directeur Général & Co-Fondateur',
        location: 'Siège de Lagos',
        tenureOrCommittee: 'Stratégie & Développement de Marque',
        bio: 'Pilote la vision commerciale de K&L Spices, le déploiement retail et la distribution internationale vers la diaspora.',
        focusAreas: ['Stratégie', 'Croissance', 'Distribution Europe'],
      },
      {
        initials: 'LA',
        name: 'Ladi Abdullahi',
        role: 'Responsable Agronomie & Approvisionnement',
        location: 'Bassins de Kaduna & Kano',
        tenureOrCommittee: 'Réseau Coopératives & Récoltes',
        bio: 'Supervise les partenariats agricoles, le séchage solaire et la sélection des récoltes brutes d’exportation.',
        focusAreas: ['Coopératives', 'Séchage Solaire', 'Sélection Terroir'],
      },
      {
        initials: 'CE',
        name: 'Chidinma Eze',
        role: 'Directrice Meunerie & Sûreté Alimentaire',
        location: 'Atelier de Production Lagos',
        tenureOrCommittee: 'Production & Traçabilité',
        bio: 'Dirige le broyage sur pierre à froid (<28°C), le contrôle d’humidité et le conditionnement codé par lot.',
        focusAreas: ['Mouture à Froid', 'Numéros de Lot', 'Audits Pureté'],
      },
      {
        initials: 'TB',
        name: 'Tunde Balogun',
        role: 'Directeur Export B2B & Bureau WhatsApp',
        location: 'Pôle Expédition Lagos',
        tenureOrCommittee: 'CHR & Commerce International',
        bio: 'Gère l’architecture de conversion WhatsApp, les coffrets d’affaires, les comptes restauration et la logistique export.',
        focusAreas: ['Logistique Export', 'Comptes CHR', 'Service Client'],
      },
    ],
  },
};

export const BOARD_DIRECTORS_DATA: Record<
  Language,
  {
    title: string;
    subtitle: string;
    charterTitle: string;
    charterText: string;
    directors: LeadershipProfile[];
    committees: { name: string; mandate: string }[];
  }
> = {
  en: {
    title: 'Board of Directors',
    subtitle:
      'Independent oversight and strategic governance ensuring long-term agricultural sustainability, export compliance, and brand integrity.',
    charterTitle: 'Governance & Stewardship Charter',
    charterText:
      'The K&L Spices Board meets quarterly to audit raw-commodity sourcing ethics, review food-safety traceability metrics, approve capital expansion in stone-milling capacity, and guide international regulatory readiness across ECOWAS, UK, and EU markets.',
    directors: [
      {
        initials: 'AO',
        name: 'Dr. Adewale Olatunji',
        role: 'Chairman of the Board',
        location: 'Lagos & London',
        tenureOrCommittee: 'Governance & Capital Allocation Committee',
        bio: 'Agribusiness veteran with 22 years advising West African food processing enterprises on sustainable value-addition and export scaling.',
        focusAreas: ['Board Governance', 'Capital Expansion', 'Export Growth'],
      },
      {
        initials: 'HA',
        name: 'Hajiya Halima Aliyu',
        role: 'Director of Agricultural Supply Chain',
        location: 'Kaduna State',
        tenureOrCommittee: 'Grower Welfare & Sustainability Committee',
        bio: 'Specializes in Northern Nigerian spice agronomy, cooperative post-harvest storage, and climate-resilient solar curing infrastructure.',
        focusAreas: ['Agronomy Policy', 'Farmer Equity', 'Post-Harvest Yield'],
      },
      {
        initials: 'MS',
        name: 'Marcus Schneider',
        role: 'Independent Director — EU Compliance & Trade',
        location: 'Hamburg, Germany',
        tenureOrCommittee: 'Food Safety, Audit & Compliance Committee',
        bio: 'Advises on EU & UK phytosanitary spice import standards, ISO hygiene controls, and specialty European retail distribution.',
        focusAreas: ['EU Spice Standards', 'Phytosanitary QA', 'DACH Distribution'],
      },
      {
        initials: 'NN',
        name: 'Ngozi Nwosu',
        role: 'Director of Heritage Culinary Strategy',
        location: 'Enugu & Paris',
        tenureOrCommittee: 'Product Authenticity & Brand Advisory',
        bio: 'Culinary historian and product strategist safeguarding authentic regional flavor profiles across K&L’s signature seasoning blends.',
        focusAreas: ['Recipe Authenticity', 'Culinary Partnerships', 'Global Brand'],
      },
    ],
    committees: [
      {
        name: 'Quality, Traceability & Food Safety Committee',
        mandate: 'Quarterly laboratory verification of zero-filler claims, heavy-metal screening, and moisture thresholds.',
      },
      {
        name: 'Smallholder Grower Stewardship Committee',
        mandate: 'Audits direct harvest contracts, fair-margin farmer payouts, and cooperative solar-drying grants.',
      },
      {
        name: 'International Export & Compliance Committee',
        mandate: 'Oversees NAFDAC, NEPC, UK, and EU customs documentation for retail jars and bulk sacks.',
      },
    ],
  },
  de: {
    title: 'Verwaltungsrat (Board of Directors)',
    subtitle:
      'Strategische Aufsicht für nachhaltige Beschaffung, internationale Export-Compliance und langfristige Markenintegrität.',
    charterTitle: 'Governance-Charta',
    charterText:
      'Der Verwaltungsrat von K&L Spices tagt quartalsweise zur Prüfung von Lebensmittelsicherheit, fairen Erzeugerstandards, Ausbau der Steinmühl-Kapazitäten und Export-Compliance für die Märkte Westafrikas, Großbritanniens und der EU.',
    directors: [
      {
        initials: 'AO',
        name: 'Dr. Adewale Olatunji',
        role: 'Vorsitzender des Verwaltungsrats',
        location: 'Lagos & London',
        tenureOrCommittee: 'Ausschuss für Governance & Investitionen',
        bio: 'Seit über 22 Jahren Berater westafrikanischer Agrar- und Lebensmittelunternehmen für Wertschöpfung und Exportwachstum.',
        focusAreas: ['Governance', 'Kapitalallokation', 'Exportstrategie'],
      },
      {
        initials: 'HA',
        name: 'Hajiya Halima Aliyu',
        role: 'Direktorin für Agrar-Lieferketten',
        location: 'Kaduna State',
        tenureOrCommittee: 'Ausschuss für Erzeuger & Nachhaltigkeit',
        bio: 'Expertin für Gewürzagronomie in Nordnigeria, Kooperativen-Lagerung und klimaresiliente Solartrocknung.',
        focusAreas: ['Agrarpolitik', 'Erzeugergerechtigkeit', 'Erntesicherung'],
      },
      {
        initials: 'MS',
        name: 'Marcus Schneider',
        role: 'Unabhängiges Mitglied — EU-Handel & Compliance',
        location: 'Hamburg, Deutschland',
        tenureOrCommittee: 'Ausschuss für Lebensmittelsicherheit & Audit',
        bio: 'Berät zu EU- und UK-Einfuhrstandards für Gewürze, Hygienekontrollen und dem DACH-Fachhandel.',
        focusAreas: ['EU-Standards', 'Rückstands-QA', 'DACH-Handel'],
      },
      {
        initials: 'NN',
        name: 'Ngozi Nwosu',
        role: 'Direktorin für kulinarische Markenstrategie',
        location: 'Enugu & Paris',
        tenureOrCommittee: 'Beirat für Rezeptur-Authentizität',
        bio: 'Kulinarik-Historikerin zur Bewahrung unverfälschter westafrikanischer Geschmacksprofile.',
        focusAreas: ['Authentizität', 'Gastronomie-Allianzen', 'Markenprofil'],
      },
    ],
    committees: [
      {
        name: 'Ausschuss für Qualität & Lebensmittelsicherheit',
        mandate: 'Quartalsweise Laborprüfungen zu Reinheit, Feuchtigkeitswerten und Rückstandsfreiheit.',
      },
      {
        name: 'Ausschuss für Erzeuger-Nachhaltigkeit',
        mandate: 'Überprüfung fairer Direktverträge und Solartrocknungs-Unterstützung für Farmpartner.',
      },
      {
        name: 'Ausschuss für Export & Regulierung',
        mandate: 'Aufsicht über Zoll- und Exportdokumente für Einzelhandelsgläser und Großgebinde.',
      },
    ],
  },
  fr: {
    title: 'Conseil d’Administration',
    subtitle:
      'Une gouvernance indépendante garantissant l’éthique agricole, la conformité export et la pérennité de la maison K&L Spices.',
    charterTitle: 'Charte de Gouvernance & Pérennité',
    charterText:
      'Le Conseil se réunit chaque trimestre pour auditer la traçabilité alimentaire, valider les engagements envers les coopératives agricoles, piloter les investissements meuniers et encadrer la conformité réglementaire vers la CEDEAO, le Royaume-Uni et l’Union Européenne.',
    directors: [
      {
        initials: 'AO',
        name: 'Dr. Adewale Olatunji',
        role: 'Président du Conseil d’Administration',
        location: 'Lagos & Londres',
        tenureOrCommittee: 'Comité de Gouvernance & Investissements',
        bio: 'Fort de 22 ans d’expérience dans l’agro-industrie ouest-africaine, il accompagne la transformation locale et l’expansion export.',
        focusAreas: ['Gouvernance', 'Investissements', 'Expansion Export'],
      },
      {
        initials: 'HA',
        name: 'Hajiya Halima Aliyu',
        role: 'Administratrice Chaînes Agricoles',
        location: 'État de Kaduna',
        tenureOrCommittee: 'Comité Producteurs & Durabilité',
        bio: 'Spécialiste de l’agronomie des épices nigérianes, du stockage coopératif et du séchage solaire durable.',
        focusAreas: ['Agronomie', 'Équité Agricole', 'Qualité Post-Récolte'],
      },
      {
        initials: 'MS',
        name: 'Marcus Schneider',
        role: 'Administrateur Indépendant — Conformité UE',
        location: 'Hambourg, Allemagne',
        tenureOrCommittee: 'Comité Audit & Sûreté Alimentaire',
        bio: 'Conseille sur les réglementations phytosanitaires européennes et britanniques et la distribution gastronomique.',
        focusAreas: ['Normes UE/UK', 'Contrôles Sanitaires', 'Distribution Europe'],
      },
      {
        initials: 'NN',
        name: 'Ngozi Nwosu',
        role: 'Administratrice Stratégie Culinaire',
        location: 'Enugu & Paris',
        tenureOrCommittee: 'Comité Authenticité & Patrimoine',
        bio: 'Historienne culinaire veillant à la fidélité des assemblages ancestraux dans chaque création K&L Spices.',
        focusAreas: ['Authenticité', 'Partenariats Chefs', 'Rayonnement'],
      },
    ],
    committees: [
      {
        name: 'Comité Qualité, Traçabilité & Sûreté',
        mandate: 'Audits trimestriels confirmant l’absence d’additifs, les seuils d’humidité et la pureté botanique.',
      },
      {
        name: 'Comité Éthique & Producteurs Locaux',
        mandate: 'Suivi des contrats directs de récolte et du financement d’infrastructures solaires rurales.',
      },
      {
        name: 'Comité Conformité Export Internationale',
        mandate: 'Supervision des certifications NAFDAC, NEPC, britanniques et européennes pour le vrac et le détail.',
      },
    ],
  },
};
