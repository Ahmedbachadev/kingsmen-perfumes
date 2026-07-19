import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ShopifyClient } from '../src/services/shopify/client';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const products = await ShopifyClient.getProducts();
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products from Shopify:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
