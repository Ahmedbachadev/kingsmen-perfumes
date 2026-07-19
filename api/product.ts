import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ShopifyClient } from '../src/services/shopify/client';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { handle } = req.query;
    if (!handle || typeof handle !== 'string') {
      return res.status(400).json({ error: 'Missing handle parameter' });
    }
    const product = await ShopifyClient.getProductByHandle(handle);
    res.status(200).json({ product });
  } catch (error) {
    console.error('Error fetching product from Shopify:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
}
