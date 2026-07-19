import { shopifyFetch } from './graphql';
import { GET_PRODUCTS_QUERY, GET_PRODUCT_BY_HANDLE_QUERY } from './queries';
import type { ShopifyProduct } from './types';

export class ShopifyClient {
  public static async getProducts(): Promise<ShopifyProduct[]> {
    const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(GET_PRODUCTS_QUERY);
    return data.products.edges.map(edge => edge.node);
  }

  public static async getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
    const data = await shopifyFetch<{ product: ShopifyProduct }>(GET_PRODUCT_BY_HANDLE_QUERY, { handle });
    return data.product;
  }
}
