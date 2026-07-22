// Fragrance-specific constants and options

export const FRAGRANCE_FAMILIES = [
  'Woody',
  'Floral',
  'Oriental',
  'Fresh',
  'Citrus',
  'Fruity',
  'Aquatic',
  'Aromatic',
  'Spicy',
  'Leather',
  'Gourmand',
  'Amber',
  'Musky',
] as const;

export const CONCENTRATIONS = [
  { value: 'EDC', label: 'Eau de Cologne (EDC)' },
  { value: 'EDT', label: 'Eau de Toilette (EDT)' },
  { value: 'EDP', label: 'Eau de Parfum (EDP)' },
  { value: 'Parfum', label: 'Parfum' },
  { value: 'Extrait', label: 'Extrait de Parfum' },
] as const;

export const LONGEVITY_OPTIONS = [
  '2–4 Hours',
  '4–6 Hours',
  '6–8 Hours',
  '8–12 Hours',
  '12+ Hours',
] as const;

export const PROJECTION_OPTIONS = [
  'Soft',
  'Moderate',
  'Strong',
  'Beast Mode',
] as const;

export const SEASONS = [
  'Spring',
  'Summer',
  'Autumn',
  'Winter',
] as const;

export const OCCASIONS = [
  'Office',
  'Daily Wear',
  'Formal',
  'Wedding',
  'Date Night',
  'Party',
  'Casual',
  'Travel',
  'Special Occasion',
] as const;

export const SUGGESTED_NOTES = [
  'Bergamot',
  'Lemon',
  'Orange',
  'Grapefruit',
  'Lime',
  'Mandarin',
  'Lavender',
  'Rose',
  'Jasmine',
  'Ylang-Ylang',
  'Iris',
  'Peony',
  'Tuberose',
  'Geranium',
  'Neroli',
  'Vanilla',
  'Amber',
  'Patchouli',
  'Cedarwood',
  'Sandalwood',
  'Vetiver',
  'Musk',
  'Oud',
  'Tonka Bean',
  'Benzoin',
  'Frankincense',
  'Myrrh',
  'Saffron',
  'Cardamom',
  'Cinnamon',
  'Black Pepper',
  'Pink Pepper',
  'Tobacco',
  'Leather',
  'Suede',
  'Coffee',
  'Chocolate',
  'Caramel',
  'Honey',
  'Coconut',
  'Peach',
  'Apple',
  'Raspberry',
  'Fig',
  'Watermelon',
  'Sea Salt',
  'Aquatic Notes',
  'Green Tea',
  'White Tea',
  'Mint',
  'Basil',
  'Rosemary',
  'Thyme',
] as const;

export const BOTTLE_SIZE_PRESETS = [
  '30 ml',
  '50 ml',
  '75 ml',
  '100 ml',
  '150 ml',
  '200 ml',
] as const;

export type FragranceFamily = typeof FRAGRANCE_FAMILIES[number];
export type Concentration = typeof CONCENTRATIONS[number]['value'];
export type Longevity = typeof LONGEVITY_OPTIONS[number];
export type Projection = typeof PROJECTION_OPTIONS[number];
export type Season = typeof SEASONS[number];
export type Occasion = typeof OCCASIONS[number];
