-- Add fragrance-specific columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS fragrance_family TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS concentration TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS top_notes TEXT[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS heart_notes TEXT[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS base_notes TEXT[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS longevity TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS projection TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS recommended_seasons TEXT[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS recommended_occasions TEXT[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS bottle_sizes JSONB DEFAULT '[]';
