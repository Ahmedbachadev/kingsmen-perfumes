export interface GeneralSettings {
 storeName: string;
 storeDescription: string;
 logo?: string;
 favicon?: string;
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
 url: string;
 visible: boolean;
}

export interface SocialMediaSettings {
 instagram: SocialMediaPlatform;
 facebook: SocialMediaPlatform;
 tiktok: SocialMediaPlatform;
 youtube: SocialMediaPlatform;
 linkedin: SocialMediaPlatform;
 twitter: SocialMediaPlatform;
}

export interface ShippingSettings {
 shippingCost: number;
 freeShippingThreshold: number;
 estimatedDeliveryTime: string;
 cashOnDelivery: boolean;
 shippingRegions: string[];
}

export interface PaymentSettings {
 cashOnDelivery: boolean;
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
 featuredProductsIds: string[];
 showFeaturedCollection: boolean;
 showFeaturedProducts: boolean;
 showNewsletter: boolean;
}

export interface NotificationSettings {
 emailNotifications: boolean;
 newOrderAlerts: boolean;
 lowStockAlerts: boolean;
 newsletterAlerts: boolean;
}

export interface PreferenceSettings {
 lowStockThreshold: number;
 defaultProductStatus: 'draft' | 'active' | 'archived';
 productsPerPage: number;
 defaultSortOrder: 'newest' | 'oldest' | 'price_high' | 'price_low' | 'alphabetical';
 themePreference: 'light' | 'dark' | 'system';
}

export interface StoreSettings {
 id: 'global';
 general: GeneralSettings;
 store_info: StoreInfoSettings;
 contact: ContactSettings;
 social_media: SocialMediaSettings;
 shipping: ShippingSettings;
 payments: PaymentSettings;
 seo: SEOSettings;
 homepage: HomepageSettings;
 notifications: NotificationSettings;
 preferences: PreferenceSettings;
 updated_at: string;
}

export type AdminRole = 'Super Admin' | 'Admin' | 'Content Manager';

export interface AdminUser {
 id: string; // UUID from auth.users
 email: string;
 full_name: string;
 role: AdminRole;
 status: 'active' | 'inactive';
 created_at: string;
 updated_at: string;
}
