export type ProductStatus = 'draft' | 'active' | 'archived';

export interface BottleSize {
  size: string;
  price_adjustment: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price: number;
  compare_price: number | null;
  sku: string | null;
  stock: number;
  featured: boolean;
  status: ProductStatus;
  category: string | null;
  collection_id: string | null;
  thumbnail: string | null;
  seo_title: string | null;
  seo_description: string | null;
  // fragrance fields
  fragrance_family: string | null;
  top_notes: string[] | null;
  heart_notes: string[] | null;
  base_notes: string[] | null;
  concentration: string | null;
  longevity: string | null;
  projection: string | null;
  recommended_seasons: string[] | null;
  recommended_occasions: string[] | null;
  gender: string | null;
  bottle_sizes: BottleSize[] | null;
  // timestamps
  created_at: string;
  updated_at: string;
  // joined fields
  collection?: {
    name: string;
  } | null;
}

export interface ProductStats {
  total: number;
  active: number;
  outOfStock: number;
  featured: number;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  sort_order: number;
  alt_text: string | null;
  is_featured: boolean;
  created_at: string;
}
