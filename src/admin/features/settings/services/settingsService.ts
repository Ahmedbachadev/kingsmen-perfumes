import { supabase } from '../../../../lib/supabase';
import type { StoreSettings } from '../types/settings';

export const getStoreSettings = async (): Promise<StoreSettings> => {
  const { data, error } = await supabase
    .from('store_settings')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      throw new Error('Settings not found. Have you executed the supabase_setup.sql script?');
    }
    throw error;
  }

  return {
    general: data.general,
    store_info: data.store_info,
    contact: data.contact,
    social_media: data.social_media,
    shipping: data.shipping,
    payments: data.payments,
    seo: data.seo,
    homepage: data.homepage,
    notifications: data.notifications,
    preferences: data.preferences,
  };
};

export const updateSettingsSection = async <K extends keyof StoreSettings>(
  section: K,
  data: StoreSettings[K]
): Promise<void> => {
  const { error } = await supabase
    .from('store_settings')
    .update({ [section]: data })
    .eq('id', 1);

  if (error) {
    throw error;
  }
};
