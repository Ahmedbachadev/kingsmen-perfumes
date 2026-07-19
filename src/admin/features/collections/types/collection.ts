export type CollectionStatus = 'draft' | 'published' | 'archived';

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  banner: string | null;
  featured_image: string | null; // Used as Thumbnail
  status: CollectionStatus;
  sort_order: number;
  featured: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
  // Computed fields / Joined
  products_count?: number;
}

export interface CollectionStats {
  total: number;
  published: number;
  draft: number;
  featured: number;
}
