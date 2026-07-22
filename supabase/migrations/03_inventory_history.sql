-- Inventory History Table
-- Tracks all stock changes with reasons, timestamps, and user info
CREATE TABLE inventory_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    previous_quantity INTEGER NOT NULL DEFAULT 0,
    new_quantity INTEGER NOT NULL DEFAULT 0,
    change_amount INTEGER NOT NULL DEFAULT 0,
    reason TEXT NOT NULL DEFAULT 'Manual Adjustment',
    notes TEXT,
    updated_by TEXT NOT NULL DEFAULT 'Admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add reserved_stock column to products for future order integration
ALTER TABLE products ADD COLUMN IF NOT EXISTS reserved_stock INTEGER DEFAULT 0;

-- Index for fast history lookups by product
CREATE INDEX idx_inventory_history_product_id ON inventory_history(product_id);
CREATE INDEX idx_inventory_history_created_at ON inventory_history(created_at DESC);

-- Row Level Security
ALTER TABLE inventory_history ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access for inventory_history" ON inventory_history FOR SELECT USING (true);

-- Authenticated write access
CREATE POLICY "Enable insert for authenticated users only" ON inventory_history FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON inventory_history FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON inventory_history FOR DELETE TO authenticated USING (true);
