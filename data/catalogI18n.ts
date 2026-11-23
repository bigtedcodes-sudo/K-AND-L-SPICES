import { ProductSKU } from '@/data/catalog';
import { Language } from '@/lib/i18n';

interface LocalizedSKUContent {
  name: string;
  subtitle: string;
  category: string;
  packaging: string;
  heatLabel: string;
  description: string;
  tastingNotes: string[];
  aromaProfile: string;
  pairingDish: string;
}

const PRODUCT_TRANSLATIONS: Record<
  string,
  Partial<Record<Exclude<Language, 'en'>, LocalizedSKUContent>>
> = {
  'sku-jollof': {
    de: {
      name: 'Jollof-Reis Gewürzmischung',
      subtitle: 'Rauchiges Holzfeuer-Aroma mit steingemahlenen westafrikanischen Chilis',
      category: 'Signatur-Mischungen',
      packaging: '100g Glasbehälter',
      heatLabel: 'Warm & Rauchig (2/5)',
      description:
        'Traditionelle Steinmahlung für das unverwechselbare Party-Jollof-Aroma. Veredelt mit gerösteter Gemüsepaprika, edlem Lorbeerblatt, geräuchertem Paprikapulver und nativen Umami-Samen.',
      tastingNotes: ['Holzfeuer-Rauch', 'Süße Paprika', 'Erdiger Thymian', 'Goldenes Umami'],
      aromaProfile: 'Intensives geräuchertes Paprikaaroma, sonnengetrocknete Kräuter und karamellisierte Zwiebeln.',
      pairingDish: 'Party-Jollof-Reis, Meeresfrüchte-Paella, geröstetes Hähnchen und Kokosreis',
    },
    fr: {
      name: 'Mélange d’Épices Riz Jollof',
      subtitle: 'Essence de feu de bois et piments traditionnels moulus sur meule',
      category: 'Mélanges Signature',
      packaging: 'Bocal en verre 100g',
      heatLabel: 'Chaud & Fumé (2/5)',
      description:
        'Assemblage moulu sur pierre capturant la véritable saveur du Jollof festif. Composé de poivrons doux rôtis, laurier sauvage, paprika fumé, thym et graines umami ancestrales.',
      tastingNotes: ['Fumée de Bois', 'Poivron Rôti Doux', 'Thym Sauvage', 'Umami Doré'],
      aromaProfile: 'Paprika fumé chaleureux, herbes séchées au soleil et alliacées caramélisées.',
      pairingDish: 'Riz Jollof traditionnel, paella de la mer, poulet braisé et riz au coco',
    },
  },
  'sku-native-soup': {
    de: {
      name: 'Traditionelles Nigerianisches Suppengewürz',
      subtitle: 'Aromatische Flusskräuter mit Uziza & fermentierten Heuschreckenbohnen',
      category: 'Signatur-Mischungen',
      packaging: '100g Glasbehälter',
      heatLabel: 'Pfeffrig & Küstennah (3/5)',
      description:
        'Tiefe, erdige Brühenbasis mit steingemahlenen Uziza-Samen, Uda-Schoten, traditionellem Dawadawa und Meereskräutern. Verleiht Schmorgerichten authentische Geschmackstiefe.',
      tastingNotes: ['Gebrochenes Uziza', 'Geröstetes Dawadawa', 'Aromatische Schoten', 'Kräuterbrühe'],
      aromaProfile: 'Würzig-holziger Pfeffer mit tiefen fermentierten Umami-Nuancen.',
      pairingDish: 'Rivers Native Soup, Ofe Nsala (Weiße Suppe), Banga und gedämpfte Fischbrühen',
    },
    fr: {
      name: 'Épice pour Soupe Traditionnelle Nigériane',
      subtitle: 'Infusion d’herbes fluviales avec uziza et fèves de caroube fermentées',
      category: 'Mélanges Signature',
      packaging: 'Bocal en verre 100g',
      heatLabel: 'Poivré & Côtier (3/5)',
      description:
        'Base de bouillon profond avec graines d’uziza moulues sur pierre, gousses d’uda, dawadawa affiné et botaniques côtières séchées. Révèle la richesse des soupes mijotées.',
      tastingNotes: ['Uziza Concassé', 'Dawadawa Rôti', 'Gousses Boisées', 'Herbes Côtières'],
      aromaProfile: 'Poivre boisé piquant aux notes intenses d’umami fermenté.',
      pairingDish: 'Soupe indigène de Rivers, Ofe Nsala, Banga et bouillons de poissons de rivière',
    },
  },
  'sku-yaji-suya': {
    de: {
      name: 'Yaji Suya Grillpfeffer',
      subtitle: 'Original nordnigerianischer Street-Food-Rub mit gerösteten Erdnüssen',
      category: 'Signatur-Mischungen',
      packaging: '100g Glasbehälter',
      heatLabel: 'Feurig & Nussig (4/5)',
      description:
        'Der legendäre Barbecue-Rub Nordnigerias. Steingemahlene geröstete Erdnussflocken, feurige Vogelaugenchilis, gemahlener Ingwer, Knoblauch, Nelken und afrikanische Muskatnuss.',
      tastingNotes: ['Geröstete Erdnuss', 'Feuriger Chili', 'Frischer Ingwer', 'Afrikanische Muskatnuss'],
      aromaProfile: 'Röstnussiges Bouquet mit stechender Chili-Schärfe und warmen Gewürznoten.',
      pairingDish: 'Gegrillte Rindfleisch-Spieße (Suya), Lammkoteletts, Hähnchenflügel und Grillmais',
    },
    fr: {
      name: 'Piment Yaji Suya Barbecue',
      subtitle: 'Rub de street-food authentique du Nord aux éclats d’arachides grillées',
      category: 'Mélanges Signature',
      packaging: 'Bocal en verre 100g',
      heatLabel: 'Piquant & Noisetté (4/5)',
      description:
        'Le rub incontournable des grillades d’Abuja et Kano. Tourteau d’arachide grillé moulu sur meule, piment œil d’oiseau, gingembre sauvage, ail et noix de muscade africaine.',
      tastingNotes: ['Arachide Rôtie', 'Piment Brûlant', 'Gingembre Vif', 'Muscade Africaine'],
      aromaProfile: 'Notes chaleureuses de noix grillées et de piment torréfié.',
      pairingDish: 'Brochettes Suya de bœuf, côtelettes d’agneau braisées, ailes croustillantes et maïs grillé',
    },
  },
  'sku-pepper-soup': {
    de: {
      name: 'Pepper Soup Gewürzmischung',
      subtitle: 'Revitalisierendes Elixier mit Kalebassen-Muskat und Negerpfeffer',
      category: 'Signatur-Mischungen',
      packaging: '100g Glasbehälter',
      heatLabel: 'Belebend & Heilsam (4/5)',
      description:
        'Eine belebende Kräuterkomposition aus zerstoßenem Ehuru, Uda, Uziza und Alligatorpfeffer. In ganz Westafrika geschätzt für ihre wärmende Kraft.',
      tastingNotes: ['Kampferartiges Ehuru', 'Uda-Pfeffer', 'Pikanter Uziza', 'Wärmendes Kräuterbett'],
      aromaProfile: 'Harzige Kiefernnoten, feuchtes Holz und wärmende Zitrusfrische.',
      pairingDish: 'Wels-Pfeffersuppe, Ziegenfleisch-Asun-Brühe und kräftige Hühnerbrühe',
    },
    fr: {
      name: 'Mélange pour Pepper Soup Revitalisante',
      subtitle: 'Élixir réconfortant à la muscade de calebasse et poivre de Guinée',
      category: 'Mélanges Signature',
      packaging: 'Bocal en verre 100g',
      heatLabel: 'Revigorant & Médicinal (4/5)',
      description:
        'Mélange thérapeutique traditionnel à base d’Ehuru, d’Uda, d’Uziza et de graines de paradis. Réputé pour réchauffer le corps et stimuler la vitalité.',
      tastingNotes: ['Ehuru Camphré', 'Amertume Poivrée d’Uda', 'Uziza Piquant', 'Herbes Chaudes'],
      aromaProfile: 'Notes de pin camphré, d’écorce fumée et d’agrumes chauds.',
      pairingDish: 'Pepper soup au poisson-chat, bouillon de chèvre asun et consommé de volaille fermière',
    },
  },
  'sku-yellow-habanero': {
    de: {
      name: 'Getrocknete Gelbe Habanero-Chilis',
      subtitle: 'Sonnengereifte reinsortige Nsukka Scotch Bonnet Flocken',
      category: 'Signatur-Mischungen',
      packaging: '100g Glasbehälter',
      heatLabel: 'Extreme Tropische Schärfe (5/5)',
      description:
        'Sehr aromatische Nsukka-Gelbchilis, schonend getrocknet zur Bewahrung ihrer floral-tropischen Fruchtnoten vor der Grobzerkleinerung zu leuchtend goldenen Flocken.',
      tastingNotes: ['Tropische Mango/Papaya', 'Direkte Blitzschärfe', 'Frische Zitrusnote', 'Klarer Abgang'],
      aromaProfile: 'Explosion von tropischen Früchten gefolgt von reinem Capsaicin.',
      pairingDish: 'Scharfe Meeresschnecken, feurige Saucen, Marinaden und Chilisaucen',
    },
    fr: {
      name: 'Piment Habanero Jaune Séché',
      subtitle: 'Flocons de scotch bonnet jaune de Nsukka séchés au soleil',
      category: 'Mélanges Signature',
      packaging: 'Bocal en verre 100g',
      heatLabel: 'Chaleur Tropicale Extrême (5/5)',
      description:
        'Piments jaunes de Nsukka cueillis à maturité et séchés à basse température pour concentrer leur parfum floral avant concassage en flocons dorés.',
      tastingNotes: ['Mangue/Papaye Exotique', 'Feu Instantané', 'Éclat d’Agrumes', 'Finale Nette'],
      aromaProfile: 'Notes fruitées tropicales intenses suivies de capsaïcine pure.',
      pairingDish: 'Escargots pimentés, sauces piquantes pour fruits de mer et marinades grillades',
    },
  },
  'sku-turmeric-powder': {
    de: {
      name: 'Reines Kurkumawurzel-Pulver',
      subtitle: 'Kurkumin-reiches reinsortiges Goldpulver ohne Füllstoffe',
      category: 'Reine Pulver',
      packaging: '100g Aromabeutel',
      heatLabel: 'Mild & Erdig (0/5)',
      description:
        'Bio-Kurkumawurzeln aus Kaduna, schonend sonnengetrocknet und mikrofein vermahlen. Intensiv goldene Farbgebung und hoher Kurkumingehalt ohne Bitterkeit.',
      tastingNotes: ['Warme Erde', 'Feiner Ingwer', 'Wurzelwürze', 'Mild-süß'],
      aromaProfile: 'Frische Erde, Ingwer und dezente florale Gewürznoten.',
      pairingDish: 'Goldene Milch, Currys, Kurkumareis und vitalisierende Tees',
    },
    fr: {
      name: 'Poudre Pure de Racine de Curcuma',
      subtitle: 'Poudre d’or riche en curcumine, garantie 100% sans additifs',
      category: 'Poudres Pures',
      packaging: 'Sachet refermable 100g',
      heatLabel: 'Doux & Terreux (0/5)',
      description:
        'Racines de curcuma naturel de Kaduna séchées au soleil et micro-moulues. Richesse en curcumine sans amertume, parfaite pour la haute cuisine et le bien-être.',
      tastingNotes: ['Terre Chaude', 'Touche Gingembre', 'Racine Boisée', 'Douceur Suave'],
      aromaProfile: 'Senteur de terre fraîchement retournée et d’épice florale.',
      pairingDish: 'Lait d’or, currys parfumés, riz safrané au curcuma et infusions bien-être',
    },
  },
  'sku-white-onion': {
    de: {
      name: 'Reines Weißes Zwiebelpulver',
      subtitle: '100% schonend getrocknete Allium-Zwiebeln, ohne Stärke',
      category: 'Reine Pulver',
      packaging: '100g Aromabeutel',
      heatLabel: 'Süß & Herzhaft (0/5)',
      description:
        'Entwässerte weiße milde Zwiebeln aus Nordnigeria, rein vermahlen ohne Siliciumdioxid, Salz oder Rieselhilfen. Löst sich cremig in Bratensaucen und Rubs.',
      tastingNotes: ['Karamellisierte Süße', 'Volles Zwiebelaroma', 'Herzhafte Basis', 'Klarer Abgang'],
      aromaProfile: 'Süßlich geröstete Zwiebeln ohne Bitterkeit.',
      pairingDish: 'Eintöpfe, Fleischmarinaden, Ofengemüse und Feingewürzmischungen',
    },
    fr: {
      name: 'Poudre d’Oignon Blanc Pur',
      subtitle: '100% oignons doux déshydratés, sans fécule ni antimottant',
      category: 'Poudres Pures',
      packaging: 'Sachet refermable 100g',
      heatLabel: 'Doux & Savoureux (0/5)',
      description:
        'Oignons blancs doux du nord réduits en poudre fine sans fécule ajoutée. Se dissout instantanément dans les jus de braisage et marinades.',
      tastingNotes: ['Douceur Caramélisée', 'Profondeur Alliacée', 'Fond Savoureux', 'Texture Fine'],
      aromaProfile: 'Oignon doux doré sans acidité.',
      pairingDish: 'Ragoûts mijotés, marinades de volaille, légumes rôtis et rubs maison',
    },
  },
  'sku-chilli-powder': {
    de: {
      name: 'Reines Rotes Chilipulver',
      subtitle: 'Reinsortig steingemahlene Shombo- & Rodo-Chilis',
      category: 'Reine Pulver',
      packaging: '100g Aromabeutel',
      heatLabel: 'Stechende Schärfe (4/5)',
      description:
        'Frisch gemahlene nigerianische rote Chilis, ausgewählt für brillante rote Farbe und reine, unverfälschte Schärfe mit natürlichen ätherischen Ölen.',
      tastingNotes: ['Reines Capsaicin', 'Getrockneter Chili', 'Leichte Paprikanote', 'Scharfer Antritt'],
      aromaProfile: 'Getoastete Chilischoten mit warmer Pikanz.',
      pairingDish: 'Würzmarinaden, Jollof-Schärfung, gebratene Kochbananen und Saucen',
    },
    fr: {
      name: 'Poudre de Piment Rouge Pur',
      subtitle: 'Piments Shombo et Ata Rodo indigènes broyés sur pierre',
      category: 'Poudres Pures',
      packaging: 'Sachet refermable 100g',
      heatLabel: 'Chaleur Vive (4/5)',
      description:
        'Piments rouges indigènes moulus pour préserver leurs huiles aromatiques. Offre une couleur rubis naturelle et une chaleur instantanée et franche.',
      tastingNotes: ['Capsaïcine Nette', 'Piment Solaire', 'Sous-note Poivron', 'Piquant Franc'],
      aromaProfile: 'Piments séchés torréfiés.',
      pairingDish: 'Marinades de viandes rouges, relevé de riz Jollof, bananes plantains frites',
    },
  },
  'sku-garlic-powder': {
    de: {
      name: 'Aromatisches Knoblauchpulver',
      subtitle: 'Alte Knoblauchsorten aus den Höhenlagen von Plateau',
      category: 'Reine Pulver',
      packaging: '100g Aromabeutel',
      heatLabel: 'Würzig & Aromatisch (0/5)',
      description:
        'Handverlesener Knoblauch in Kleinmengen schonend getrocknet. Hoher Allicin-Gehalt für ein ungleich kräftigeres Bukett als Massenware.',
      tastingNotes: ['Voller Knoblauchgeschmack', 'Röstnoten', 'Nussige Nuancen', 'Langer Nachklang'],
      aromaProfile: 'Kräftiger Knoblauch mit gerösteter Süße.',
      pairingDish: 'Knoblauch-Kräuterbutter, Grillfleisch, Pfannengerichte und Röstkartoffeln',
    },
    fr: {
      name: 'Poudre d’Ail Aromatique Ancestral',
      subtitle: 'Gousses d’ail du terroir de Plateau State à haute teneur en allicine',
      category: 'Poudres Pures',
      packaging: 'Sachet refermable 100g',
      heatLabel: 'Puissant & Aromatise (0/5)',
      description:
        'Ail local épluché et déshydraté avec soin. Exceptionnellement riche en essences naturelles pour un pouvoir parfumant supérieur.',
      tastingNotes: ['Arôme Puissant', 'Notes Rôties', 'Rondeur Noisette', 'Longueur en Bouche'],
      aromaProfile: 'Ail confit et notes chaleureuses.',
      pairingDish: 'Beurre d’ail aux herbes, viandes braisées, poêlées et pommes de terre rôties',
    },
  },
  'sku-ginger-slices': {
    de: {
      name: 'Getrocknete Ingwerscheiben',
      subtitle: 'Exportqualität mit hohem Gingerolgehalt für Verarbeiter',
      category: 'Großhandel & Export',
      packaging: 'Großgebinde / Sack (Kg)',
      heatLabel: 'Warm & Würzig (2/5)',
      description:
        'Geschälte, sonnengetrocknete nigerianische Ingwerscheiben mit hoher ätherischer Dichte für Teeproduzenten, Getränkehersteller und Extraktfabriken weltweit.',
      tastingNotes: ['Warme Schärfe', 'Zitrusabrieb', 'Tiefe Pikanz', 'Saubere Trocknung'],
      aromaProfile: 'Frische, pfeffrige Ingwer-Zitrus-Noten mit warmem Holzton.',
      pairingDish: 'Extrakte, Craft Ginger Beer, Kräutertees und Würzstoff-Produktion',
    },
    fr: {
      name: 'Lamelles de Gingembre Séché',
      subtitle: 'Qualité export à haute concentration en gingérol pour l’industrie',
      category: 'Vrac & Export',
      packaging: 'Sac vrac (Kg)',
      heatLabel: 'Chaud & Épicé (2/5)',
      description:
        'Tranches de gingembre du Sud-Kaduna pelées et séchées au soleil. Très haute teneur en huiles pour infusion, brasserie artisanale et extraction.',
      tastingNotes: ['Piquant Chaud', 'Zeste de Citron', 'Profondeur Vive', 'Pureté Minérale'],
      aromaProfile: 'Gingembre vif et frais avec nuances de sous-bois.',
      pairingDish: 'Extraits industriels, bières de gingembre artisanales, thés et mélanges',
    },
  },
  'sku-white-pepper': {
    de: {
      name: 'Weiße Pfefferkörner',
      subtitle: 'Natürlich geröstete und gewässerte weiße Pfeffersaat',
      category: 'Großhandel & Export',
      packaging: 'Großgebinde / Sack (Kg)',
      heatLabel: 'Scharf & Rein (3/5)',
      description:
        'Vollreife Beeren, in Quellwasser eingeweicht und sonnengetrocknet. Liefert saubere Piperin-Schärfe, ohne helle Gourmet-Saucen optisch zu verfärben.',
      tastingNotes: ['Reine Schärfe', 'Fermentiertes Piperin', 'Erdige Nuancen', 'Präziser Abgang'],
      aromaProfile: 'Dezente florale Aromatik mit stechender Schärfe beim Zerstoßen.',
      pairingDish: 'Helle Saucen, Cremesuppen, Wurstwaren und feine Fleischfonds',
    },
    fr: {
      name: 'Grains de Poivre Blanc Pur',
      subtitle: 'Baies mûres débarrassées de leur péricarpe à l’eau de source',
      category: 'Vrac & Export',
      packaging: 'Sac vrac (Kg)',
      heatLabel: 'Chaleur Nette & Pure (3/5)',
      description:
        'Grains cueillis à pleine maturité et trempés en eau de source naturelle avant séchage. Apporte un piquant puissant sans altérer la couleur des veloutés.',
      tastingNotes: ['Chaleur Nette', 'Pipérine Fermentée', 'Nuance Végétale', 'Finale Vive'],
      aromaProfile: 'Discrétion florale au nez et piquant intense à la mouture.',
      pairingDish: 'Sauces blanches, veloutés gastronomiques, charcuterie fine et bouillons clairs',
    },
  },
  'sku-black-pepper': {
    de: {
      name: 'Schwarze Pfefferkörner (Piper guineense)',
      subtitle: 'Aromaintensive sonnengetrocknete Urwald-Pfefferkörner',
      category: 'Großhandel & Export',
      packaging: 'Großgebinde / Sack (Kg)',
      heatLabel: 'Kräftig & Harzig (3/5)',
      description:
        'Tief gerunzelte schwarze Pfefferkörner aus den Regenwäldern von Cross River. Reich an ätherischen Ölen mit charakteristischen Nadelwald- und Kampfernoten.',
      tastingNotes: ['Kräftige Schärfe', 'Kiefernharz', 'Rauchige Hölzer', 'Zitrische Frische'],
      aromaProfile: 'Harziges Bouquet mit feinen Tönen von grünem Pfeffer und Holzrauch.',
      pairingDish: 'Universelle Vermahlung, Gewürzbeizen, Dry Rubs und Fleischverarbeitung',
    },
    fr: {
      name: 'Grains de Poivre Noir Sauvage',
      subtitle: 'Baies fripées cueillies à la main en lisière des forêts primaires',
      category: 'Vrac & Export',
      packaging: 'Sac vrac (Kg)',
      heatLabel: 'Corsé & Résineux (3/5)',
      description:
        'Grains de poivre noir séchés immédiatement après récolte manuelle. Teneur exceptionnelle en huiles volatiles délivrant des arômes d’écorce et de pin.',
      tastingNotes: ['Piquant Corsé', 'Résine de Pin', 'Bois Fumé', 'Notes d’Agrumes'],
      aromaProfile: 'Notes camphrées, boisées et résineuses très expressives.',
      pairingDish: 'Mouture quotidienne, marinades gibier, salaisons et rubs de barbecue',
    },
  },
  'sku-turmeric-roots': {
    de: {
      name: 'Ganze Kurkumawurzeln',
      subtitle: 'Sonnengereifte Wurzelabschnitte mit tief orangerotem Kern',
      category: 'Großhandel & Export',
      packaging: 'Großgebinde / Sack (Kg)',
      heatLabel: 'Erdig & Natürlich (0/5)',
      description:
        'Ganze getrocknete Kurkumafinger für industrielle Farbstoffherstellung, Pharmazie und Lebensmittelverarbeiter weltweit.',
      tastingNotes: ['Erdig', 'Tiefe Mineralik', 'Holzige Trockenheit', 'Feiner Ingwer'],
      aromaProfile: 'Erdig, warm und kräuterartig.',
      pairingDish: 'Industrielle Extraktion, natürliche Lebensmittelfarben und Vermahlung',
    },
    fr: {
      name: 'Racines Entières de Curcuma',
      subtitle: 'Doigts de curcuma séchés à cœur orange vif pour l’industrie',
      category: 'Vrac & Export',
      packaging: 'Sac vrac (Kg)',
      heatLabel: 'Terreux & Pur (0/5)',
      description:
        'Doigts de curcuma entiers sélectionnés pour leur densité en curcuminoïdes. Destinés aux herboristeries, laboratoires et broyeurs d’épices.',
      tastingNotes: ['Terreux', 'Minéralité Profonde', 'Bois Sec', 'Touche Gingembre'],
      aromaProfile: 'Notes d’humus et d’écorce dorée.',
      pairingDish: 'Extraction de principes actifs, colorants naturels et meunerie de gros',
    },
  },
};

export function getLocalizedProduct(product: ProductSKU, lang: Language): ProductSKU {
  if (lang === 'en') return product;

  const translation = PRODUCT_TRANSLATIONS[product.id]?.[lang];
  if (!translation) return product;

  return {
    ...product,
    name: translation.name || product.name,
    subtitle: translation.subtitle || product.subtitle,
    category: (translation.category as any) || product.category,
    packaging: translation.packaging || product.packaging,
    heatLabel: translation.heatLabel || product.heatLabel,
    description: translation.description || product.description,
    tastingNotes: translation.tastingNotes || product.tastingNotes,
    aromaProfile: translation.aromaProfile || product.aromaProfile,
    pairingDish: translation.pairingDish || product.pairingDish,
  };
}
