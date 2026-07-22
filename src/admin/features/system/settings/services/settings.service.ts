import { supabase } from '../../../../../lib/supabase';
import type { StoreSettings, AdminUser } from '../types';

export const SettingsService = {
 // === SETTINGS ===

 async getSettings(): Promise<StoreSettings | null> {
 try {
 const { data, error } = await supabase
 .from('store_settings')
 .select('*')
 .eq('id', 'global')
 .single();
 
 if (error) {
 // If no row exists yet, we should ideally fall back to defaults 
 // rather than throw, or wait for the SQL script to run
 if (error.code === 'PGRST116') {
 return this.getDefaultSettings();
 }
 throw error;
 }
 return data as StoreSettings;
 } catch (error) {
 console.error('Error fetching settings:', error);
 return this.getDefaultSettings(); // Fallback for dev mode without DB
 }
 },

 async updateSettingsCategory<K extends keyof Omit<StoreSettings, 'id' | 'updated_at'>>(
 category: K, 
 data: StoreSettings[K]
 ): Promise<boolean> {
 try {
 const { error } = await supabase
 .from('store_settings')
 .update({ [category]: data, updated_at: new Date().toISOString() })
 .eq('id', 'global');
 
 if (error) throw error;
 return true;
 } catch (error) {
 console.error(`Error updating settings category ${category}:`, error);
 return false;
 }
 },

 // === ADMIN USERS ===

 async getAdminUsers(): Promise<AdminUser[]> {
 try {
 const { data, error } = await supabase
 .from('admin_users')
 .select('*')
 .order('created_at', { ascending: false });

 if (error) throw error;
 return data as AdminUser[];
 } catch (error) {
 console.error('Error fetching admin users:', error);
 return []; // Return mock data if table doesn't exist yet
 }
 },

 async createAdminUser(user: Partial<AdminUser>): Promise<AdminUser | null> {
 try {
 // Note: Full implementation requires calling Supabase Admin Auth API to create auth user
 // For now we just insert into admin_users (will fail RLS without auth id, but mock for UI)
 const { data, error } = await supabase
 .from('admin_users')
 .insert([user])
 .select()
 .single();

 if (error) throw error;
 return data as AdminUser;
 } catch (error) {
 console.error('Error creating admin user:', error);
 return null;
 }
 },

 async updateAdminUser(id: string, updates: Partial<AdminUser>): Promise<boolean> {
 try {
 const { error } = await supabase
 .from('admin_users')
 .update({ ...updates, updated_at: new Date().toISOString() })
 .eq('id', id);

 if (error) throw error;
 return true;
 } catch (error) {
 console.error('Error updating admin user:', error);
 return false;
 }
 },

 async deleteAdminUser(id: string): Promise<boolean> {
 try {
 // Again, needs admin api to delete auth user, but for now delete record
 const { error } = await supabase
 .from('admin_users')
 .delete()
 .eq('id', id);

 if (error) throw error;
 return true;
 } catch (error) {
 console.error('Error deleting admin user:', error);
 return false;
 }
 },

 // === FALLBACK ===

 getDefaultSettings(): StoreSettings {
 return {
 id: 'global',
 general: {
 storeName: 'Kingsmen',
 storeDescription: 'Premium Perfumes',
 timezone: 'UTC',
 currency: 'USD',
 language: 'en'
 },
 store_info: {
 businessName: 'Kingsmen LLC',
 ownerName: '',
 businessEmail: '',
 phoneNumber: '',
 businessAddress: ''
 },
 contact: {
 supportEmail: 'support@kingsmen.com',
 supportPhone: '',
 whatsappNumber: '',
 businessHours: 'Mon-Fri 9AM-5PM',
 googleMapsUrl: ''
 },
 social_media: {
 instagram: { url: '', visible: true },
 facebook: { url: '', visible: true },
 tiktok: { url: '', visible: true },
 youtube: { url: '', visible: false },
 linkedin: { url: '', visible: false },
 twitter: { url: '', visible: false }
 },
 shipping: {
 shippingCost: 0,
 freeShippingThreshold: 50,
 estimatedDeliveryTime: '3-5 Business Days',
 cashOnDelivery: true,
 shippingRegions: ['US', 'CA', 'UK']
 },
 payments: {
 cashOnDelivery: true
 },
 seo: {
 homepageTitle: 'Kingsmen | Premium Perfumes',
 metaDescription: '',
 keywords: '',
 openGraphImage: '',
 twitterCardImage: ''
 },
 homepage: {
 featuredCollectionId: '',
 featuredProductsIds: [],
 showFeaturedCollection: true,
 showFeaturedProducts: true,
 showNewsletter: true
 },
 notifications: {
 emailNotifications: true,
 newOrderAlerts: true,
 lowStockAlerts: true,
 newsletterAlerts: false
 },
 preferences: {
 lowStockThreshold: 10,
 defaultProductStatus: 'draft',
 productsPerPage: 12,
 defaultSortOrder: 'newest',
 themePreference: 'system'
 },
 updated_at: new Date().toISOString()
 };
 }
};
