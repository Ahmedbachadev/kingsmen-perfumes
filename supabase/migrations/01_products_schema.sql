-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUMs for various statuses and types
CREATE TYPE product_status AS ENUM ('draft', 'active', 'archived');
CREATE TYPE product_gender AS ENUM ('men', 'women', 'unisex');
CREATE TYPE store_visibility AS ENUM ('homepage', 'hidden', 'featured', 'collection_only', 'search_visibility');
CREATE TYPE related_product_type AS ENUM ('related', 'frequently_bought_together');

-- Categories Table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Collections Table
CREATE TABLE collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Products Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT,
    description TEXT,
    brand TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
    tags TEXT[] DEFAULT '{}',
    
    -- Status & Flags
    status product_status DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT false,
    is_new_arrival BOOLEAN DEFAULT false,
    is_best_seller BOOLEAN DEFAULT false,
    gender product_gender,
    
    -- Pricing
    regular_price DECIMAL(10,2) NOT NULL DEFAULT 0,
    sale_price DECIMAL(10,2),
    cost_price DECIMAL(10,2),
    tax_class TEXT,
    
    -- Inventory tracking at base product level (can be overridden by variants)
    inventory INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 5,
    
    -- SEO
    seo_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    social_sharing_image TEXT,
    canonical_url TEXT,
    
    -- Visibility
    visibility store_visibility[] DEFAULT '{search_visibility}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Product Variants Table
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL, -- e.g., '50ml', '100ml'
    sku TEXT UNIQUE,
    barcode TEXT,
    price DECIMAL(10,2), -- if null, uses product's regular_price
    sale_price DECIMAL(10,2),
    inventory INTEGER DEFAULT 0,
    weight DECIMAL(10,2), -- in kg/g
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Product Images Table
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT,
    sort_order INTEGER DEFAULT 0,
    is_thumbnail BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Related Products Table
CREATE TABLE related_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    related_product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    type related_product_type DEFAULT 'related',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(product_id, related_product_id, type)
);

-- Update triggers for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_modtime BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_product_variants_modtime BEFORE UPDATE ON product_variants FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_categories_modtime BEFORE UPDATE ON categories FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_collections_modtime BEFORE UPDATE ON collections FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE related_products ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public profiles are viewable by everyone." ON categories FOR SELECT USING (true);
CREATE POLICY "Public profiles are viewable by everyone." ON collections FOR SELECT USING (true);
CREATE POLICY "Public profiles are viewable by everyone." ON products FOR SELECT USING (true);
CREATE POLICY "Public profiles are viewable by everyone." ON product_variants FOR SELECT USING (true);
CREATE POLICY "Public profiles are viewable by everyone." ON product_images FOR SELECT USING (true);
CREATE POLICY "Public profiles are viewable by everyone." ON related_products FOR SELECT USING (true);

-- For simplicity, allowing all operations for now (assuming an authenticated session is required in your app)
-- In a strict production environment, these should check for admin roles.
CREATE POLICY "Enable insert for authenticated users only" ON categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON categories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON categories FOR DELETE TO authenticated USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON collections FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON collections FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON collections FOR DELETE TO authenticated USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON products FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON products FOR DELETE TO authenticated USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON product_variants FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON product_variants FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON product_variants FOR DELETE TO authenticated USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON product_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON product_images FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON product_images FOR DELETE TO authenticated USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON related_products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON related_products FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON related_products FOR DELETE TO authenticated USING (true);
