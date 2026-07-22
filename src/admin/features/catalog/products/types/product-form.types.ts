export interface ProductFormData {
  // Section 1: Info
  name: string;
  slug: string;
  short_description: string;
  description: string;
  
  // Section 2: Media
  images: { id: string; url: string; file?: File; isUploading?: boolean; isThumbnail?: boolean }[];

  // Section 3: Pricing
  regular_price: number;
  sale_price: number | null;

  // Section 4: Inventory
  inventory: number;
  track_inventory: boolean;
  continue_selling: boolean;

  // Section 5: Organization
  category_id: string | null;
  collection_id: string | null;
  tags: string[];
  is_featured: boolean;
  status: 'active' | 'draft' | 'archived';

  // Section 6: Fragrance
  fragrance_family: string | null;
  concentration: string | null;
  top_notes: string[];
  heart_notes: string[];
  base_notes: string[];
  longevity: string | null;
  projection: string | null;
  recommended_seasons: string[];
  recommended_occasions: string[];
  bottle_sizes: { size: string; price_adjustment: number | null }[];

  // Section 7: SEO
  seo_title: string;
  seo_description: string;
}

export type ProductFormErrors = Partial<Record<keyof ProductFormData, string>>;

export const DEFAULT_FORM_DATA: ProductFormData = {
  name: '',
  slug: '',
  short_description: '',
  description: '',
  images: [],
  regular_price: 0,
  sale_price: null,
  inventory: 0,
  track_inventory: true,
  continue_selling: false,
  category_id: null,
  collection_id: null,
  tags: [],
  is_featured: false,
  status: 'draft',
  fragrance_family: null,
  concentration: null,
  top_notes: [],
  heart_notes: [],
  base_notes: [],
  longevity: null,
  projection: null,
  recommended_seasons: [],
  recommended_occasions: [],
  bottle_sizes: [],
  seo_title: '',
  seo_description: ''
};

export interface ProductFormProps {
  formData: ProductFormData;
  errors: ProductFormErrors;
  isSubmitting: boolean;
  hasUnsavedChanges: boolean;
  updateField: (field: keyof ProductFormData, value: any) => void;
  addImages: (files: File[]) => Promise<void>;
  removeImage: (id: string) => void;
  setThumbnail: (id: string) => void;
  reorderImages: (startIndex: number, endIndex: number) => void;
  submitForm: (status?: 'active' | 'draft' | 'archived') => Promise<boolean>;
  cancel: () => void;
  isEditMode?: boolean;
}
