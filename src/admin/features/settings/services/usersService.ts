import { supabase } from '../../../../lib/supabase';
import type { AdminUser } from '../types/settings';

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const updateAdminUser = async (id: string, updates: Partial<AdminUser>): Promise<void> => {
  const { error } = await supabase
    .from('admin_users')
    .update(updates)
    .eq('id', id);

  if (error) {
    throw error;
  }
};

// Creating a new user via Supabase Auth requires either calling signUp from the client 
// (which logs them in immediately) or using the Supabase Admin API via Edge Functions.
// For now, this is a placeholder/mock that inserts into admin_users (which will fail RLS if it's not matching auth.users)
// In a real production setup, use Edge Functions for user management.
export const mockCreateAdminUser = async (user: Omit<AdminUser, 'id' | 'created_at' | 'updated_at'>): Promise<AdminUser> => {
  const newId = crypto.randomUUID();
  const newUser = {
    ...user,
    id: newId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // We are not actually calling supabase here because we don't have the Admin API to create auth.users cleanly from frontend without side effects
  // This just returns the mocked user for UI demonstration
  return newUser as AdminUser;
};
