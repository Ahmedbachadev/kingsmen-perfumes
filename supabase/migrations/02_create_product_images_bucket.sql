-- Create product-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true) 
ON CONFLICT (id) DO NOTHING;

-- Set up security policies
CREATE POLICY "Public View Access" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Public Insert Access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Public Update Access" ON storage.objects FOR UPDATE USING (bucket_id = 'product-images');
CREATE POLICY "Public Delete Access" ON storage.objects FOR DELETE USING (bucket_id = 'product-images');
