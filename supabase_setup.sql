-- Kingsmen Perfumes: Settings Module Supabase Setup Script
-- Please execute this in your Supabase SQL Editor.

-- ==========================================
-- 1. store_settings Table
-- ==========================================
CREATE TABLE IF NOT EXISTS store_settings (
  id int PRIMARY KEY DEFAULT 1,
  general jsonb NOT NULL DEFAULT '{}'::jsonb,
  store_info jsonb NOT NULL DEFAULT '{}'::jsonb,
  contact jsonb NOT NULL DEFAULT '{}'::jsonb,
  social_media jsonb NOT NULL DEFAULT '[]'::jsonb,
  shipping jsonb NOT NULL DEFAULT '{}'::jsonb,
  payments jsonb NOT NULL DEFAULT '{}'::jsonb,
  seo jsonb NOT NULL DEFAULT '{}'::jsonb,
  homepage jsonb NOT NULL DEFAULT '{}'::jsonb,
  notifications jsonb NOT NULL DEFAULT '{}'::jsonb,
  preferences jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT single_row_check CHECK (id = 1)
);

-- Row Level Security for store_settings
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to settings
CREATE POLICY "Public read access for store_settings"
  ON store_settings FOR SELECT
  USING (true);

-- Allow authenticated users to update settings
CREATE POLICY "Authenticated users can update store_settings"
  ON store_settings FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert store_settings"
  ON store_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert default row if it doesn't exist
INSERT INTO store_settings (id, general, store_info, contact, social_media, shipping, payments, seo, homepage, notifications, preferences)
VALUES (
  1,
  '{"storeName": "Kingsmen Perfumes", "storeDescription": "Premium fragrances crafted for the modern gentleman.", "logo": "", "favicon": "", "timezone": "Asia/Karachi", "currency": "PKR", "language": "en"}'::jsonb,
  '{"businessName": "Kingsmen Perfumes LLC", "ownerName": "", "businessEmail": "contact@kingsmenperfumes.com", "phoneNumber": "", "businessAddress": ""}'::jsonb,
  '{"supportEmail": "support@kingsmenperfumes.com", "supportPhone": "", "whatsappNumber": "", "businessHours": "Mon-Fri, 9am-6pm", "googleMapsUrl": ""}'::jsonb,
  '[
    {"platform": "Instagram", "url": "https://instagram.com/kingsmen", "isVisible": true},
    {"platform": "Facebook", "url": "https://facebook.com/kingsmen", "isVisible": true},
    {"platform": "TikTok", "url": "", "isVisible": false},
    {"platform": "YouTube", "url": "", "isVisible": false},
    {"platform": "LinkedIn", "url": "", "isVisible": false},
    {"platform": "X (Twitter)", "url": "", "isVisible": false}
  ]'::jsonb,
  '{"shippingCost": 200, "freeShippingThreshold": 5000, "estimatedDeliveryTime": "3-5 Business Days", "cashOnDelivery": true, "shippingRegions": ["Nationwide"]}'::jsonb,
  '{"cashOnDeliveryEnabled": true}'::jsonb,
  '{"homepageTitle": "Kingsmen Perfumes - Premium Fragrances", "metaDescription": "Discover the signature collection of Kingsmen Perfumes.", "keywords": "perfume, fragrance, kingsmen, pk", "openGraphImage": "", "twitterCardImage": ""}'::jsonb,
  '{"featuredCollectionId": "", "featuredProductIds": [], "showHero": true, "showSignature": true, "showGentlemen": true, "showLadies": true, "showUnisex": true, "showFAQ": true, "showNewsletter": true}'::jsonb,
  '{"emailNotifications": true, "newOrderAlerts": true, "lowStockAlerts": true, "newsletterAlerts": true}'::jsonb,
  '{"lowStockThreshold": 5, "defaultProductStatus": "Draft", "productsPerPage": 20, "defaultSortOrder": "Newest", "themePreference": "System"}'::jsonb
) ON CONFLICT (id) DO NOTHING;


-- ==========================================
-- 2. admin_users Table
-- ==========================================
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  role text NOT NULL CHECK (role IN ('Super Admin', 'Admin', 'Content Manager')),
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security for admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read admin_users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Super Admins can update admin_users"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (true); 

CREATE POLICY "Super Admins can insert admin_users"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Function to handle new user creation from auth (optional trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  -- Insert a default 'Admin' profile for all new authenticated users (for development simplicity)
  INSERT INTO public.admin_users (id, email, full_name, role, is_active)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', 'Admin', true)
  ON CONFLICT DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
   NEW.updated_at = timezone('utc'::text, now());
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_store_settings_updated_at ON store_settings;
CREATE TRIGGER update_store_settings_updated_at
BEFORE UPDATE ON store_settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
BEFORE UPDATE ON admin_users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
