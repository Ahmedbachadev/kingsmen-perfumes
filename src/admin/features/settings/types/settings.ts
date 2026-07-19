export interface GeneralSettings {
  storeName: string;
  storeDescription: string;
  logo: string;
  favicon: string;
  timezone: string;
  currency: string;
  language: string;
}

export interface StoreInfoSettings {
  businessName: string;
  ownerName: string;
  businessEmail: string;
  phoneNumber: string;
  businessAddress: string;
}

export interface ContactSettings {
  supportEmail: string;
  supportPhone: string;
  whatsappNumber: string;
  businessHours: string;
  googleMapsUrl: string;
}

export interface SocialMediaPlatform {
  platform: string;
  url: string;
  isVisible: boolean;
}

export interface SocialMediaSettings {
  platforms: SocialMediaPlatform[];
}

export interface ShippingSettings {
  shippingCost: number;
  freeShippingThreshold: number;
  estimatedDeliveryTime: string;
  cashOnDelivery: boolean;
  shippingRegions: string[];
}

export interface PaymentSettings {
  cashOnDeliveryEnabled: boolean;
}

export interface SEOSettings {
  homepageTitle: string;
  metaDescription: string;
  keywords: string;
  openGraphImage: string;
  twitterCardImage: string;
}

export interface HomepageSettings {
  featuredCollectionId: string;
  featuredProductIds: string[];
  showHero: boolean;
  showSignature: boolean;
  showGentlemen: boolean;
  showLadies: boolean;
  showUnisex: boolean;
  showFAQ: boolean;
  showNewsletter: boolean;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  newOrderAlerts: boolean;
  lowStockAlerts: boolean;
  newsletterAlerts: boolean;
}

export interface PreferencesSettings {
  lowStockThreshold: number;
  defaultProductStatus: 'Draft' | 'Active' | 'Archived';
  productsPerPage: number;
  defaultSortOrder: 'Newest' | 'Oldest' | 'Price: Low to High' | 'Price: High to Low';
  themePreference: 'System' | 'Light' | 'Dark';
}

export interface StoreSettings {
  general: GeneralSettings;
  store_info: StoreInfoSettings;
  contact: ContactSettings;
  social_media: SocialMediaPlatform[];
  shipping: ShippingSettings;
  payments: PaymentSettings;
  seo: SEOSettings;
  homepage: HomepageSettings;
  notifications: NotificationSettings;
  preferences: PreferencesSettings;
}

export type AdminRole = 'Super Admin' | 'Admin' | 'Content Manager';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  role: AdminRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
