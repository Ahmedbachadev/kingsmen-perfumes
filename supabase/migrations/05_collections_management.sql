-- Add new columns to collections
ALTER TABLE collections ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';
ALTER TABLE collections ADD COLUMN IF NOT EXISTS short_description TEXT;
ALTER TABLE collections ADD COLUMN IF NOT EXISTS banner_image_url TEXT;
ALTER TABLE collections ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE collections ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE collections ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE collections ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE collections ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE;

-- Add collection_display_order to products
ALTER TABLE products ADD COLUMN IF NOT EXISTS collection_display_order INTEGER DEFAULT 0;

-- Ensure indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_collections_status ON collections(status);
CREATE INDEX IF NOT EXISTS idx_collections_deleted_at ON collections(deleted_at);
CREATE INDEX IF NOT EXISTS idx_products_collection_order ON products(collection_id, collection_display_order);
