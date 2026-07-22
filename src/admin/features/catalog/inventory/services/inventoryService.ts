import { supabase } from '../../../../../lib/supabase';
import type { ProductWithRelations } from '../../../../../services/supabase/products.service';

// ─── Types ─────────────────────────────────────────────────────────────────

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export type AdjustmentReason =
  | 'Manual Adjustment'
  | 'New Shipment'
  | 'Damaged Items'
  | 'Returned Items'
  | 'Correction'
  | 'Other';

export const ADJUSTMENT_REASONS: AdjustmentReason[] = [
  'Manual Adjustment',
  'New Shipment',
  'Damaged Items',
  'Returned Items',
  'Correction',
  'Other',
];

export type AdjustmentMode = 'increase' | 'decrease' | 'set';

export interface InventoryHistoryRecord {
  id: string;
  product_id: string;
  previous_quantity: number;
  new_quantity: number;
  change_amount: number;
  reason: string;
  notes: string | null;
  updated_by: string;
  created_at: string;
  product?: { name: string; images: { url: string }[] } | null;
}

export interface InventoryProduct extends ProductWithRelations {
  reserved_stock: number;
}

export interface InventoryStats {
  total: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
}

export interface InventoryFiltersState {
  search: string;
  stockStatus: StockStatus | null;
  isFeatured: boolean | null;
  collectionId: string | null;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

export function getStockStatus(
  inventory: number,
  threshold: number
): StockStatus {
  if (inventory <= 0) return 'out_of_stock';
  if (inventory <= threshold) return 'low_stock';
  return 'in_stock';
}

export function getAvailableStock(inventory: number, reserved: number): number {
  return Math.max(0, inventory - reserved);
}

// ─── Service ───────────────────────────────────────────────────────────────

export const InventoryService = {
  /**
   * Fetch products with inventory data, with filtering and search
   */
  async getInventoryProducts(options?: {
    page?: number;
    limit?: number;
    search?: string;
    stockStatus?: StockStatus | null;
    isFeatured?: boolean | null;
    collectionId?: string | null;
  }) {
    let query = supabase
      .from('products')
      .select(
        '*, variants:product_variants(*), images:product_images(*), category:categories(name), collection:collections(name)',
        { count: 'exact' }
      );

    // Search by name, SKU (via variant), or collection
    if (options?.search) {
      const term = `%${options.search}%`;
      query = query.or(`name.ilike.${term},slug.ilike.${term}`);
    }

    // Filter by featured
    if (options?.isFeatured === true) {
      query = query.eq('is_featured', true);
    }

    // Filter by collection
    if (options?.collectionId) {
      query = query.eq('collection_id', options.collectionId);
    }

    // Filter by stock status (applied post-query for threshold-based logic)
    // We do server-side filtering for out_of_stock and basic in_stock
    if (options?.stockStatus === 'out_of_stock') {
      query = query.lte('inventory', 0);
    } else if (options?.stockStatus === 'low_stock') {
      // Low stock: inventory > 0 AND inventory <= low_stock_threshold
      // Supabase doesn't support column-to-column comparisons directly in filters,
      // so we fetch products with inventory > 0 and filter client-side
      query = query.gt('inventory', 0);
    } else if (options?.stockStatus === 'in_stock') {
      query = query.gt('inventory', 0);
    }

    // Pagination
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('inventory', { ascending: true }).range(from, to);

    const { data, error, count } = await query;
    if (error) throw error;

    let products = (data || []) as InventoryProduct[];

    // Client-side filtering for low_stock (needs threshold comparison)
    if (options?.stockStatus === 'low_stock') {
      products = products.filter(
        (p) => p.inventory > 0 && p.inventory <= (p.low_stock_threshold || 10)
      );
    } else if (options?.stockStatus === 'in_stock') {
      products = products.filter(
        (p) => p.inventory > (p.low_stock_threshold || 10)
      );
    }

    // If searching by SKU, do additional client-side filter
    if (options?.search) {
      const term = options.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.slug.toLowerCase().includes(term) ||
          p.variants?.some((v) => v.sku?.toLowerCase().includes(term)) ||
          (p.collection as any)?.name?.toLowerCase().includes(term)
      );
    }

    return {
      products,
      count: count || 0,
      page,
      limit,
    };
  },

  /**
   * Get inventory stats
   */
  async getInventoryStats(): Promise<InventoryStats> {
    const { data, error } = await supabase
      .from('products')
      .select('inventory, low_stock_threshold');

    if (error) throw error;

    const products = data || [];
    const total = products.length;
    let outOfStock = 0;
    let lowStock = 0;
    let inStock = 0;

    for (const p of products) {
      const inv = p.inventory ?? 0;
      const threshold = p.low_stock_threshold ?? 10;
      if (inv <= 0) {
        outOfStock++;
      } else if (inv <= threshold) {
        lowStock++;
      } else {
        inStock++;
      }
    }

    return { total, inStock, lowStock, outOfStock };
  },

  /**
   * Adjust stock level for a product
   */
  async adjustStock(params: {
    productId: string;
    currentStock: number;
    mode: AdjustmentMode;
    amount: number;
    reason: AdjustmentReason;
    notes?: string;
  }) {
    const { productId, currentStock, mode, amount, reason, notes } = params;

    let newQuantity: number;
    switch (mode) {
      case 'increase':
        newQuantity = currentStock + amount;
        break;
      case 'decrease':
        newQuantity = Math.max(0, currentStock - amount);
        break;
      case 'set':
        newQuantity = Math.max(0, amount);
        break;
      default:
        newQuantity = currentStock;
    }

    const changeAmount = newQuantity - currentStock;

    // Update product inventory
    const { error: updateError } = await supabase
      .from('products')
      .update({ inventory: newQuantity } as any)
      .eq('id', productId);

    if (updateError) throw updateError;

    // Insert history record
    const { error: historyError } = await supabase
      .from('inventory_history' as any)
      .insert({
        product_id: productId,
        previous_quantity: currentStock,
        new_quantity: newQuantity,
        change_amount: changeAmount,
        reason,
        notes: notes || null,
        updated_by: 'Admin',
      } as any);

    if (historyError) {
      console.error('Failed to insert history record:', historyError);
      // Don't throw — the stock update succeeded
    }

    return { newQuantity, changeAmount };
  },

  /**
   * Get stock change history (paginated)
   */
  async getStockHistory(options?: {
    productId?: string;
    page?: number;
    limit?: number;
  }) {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('inventory_history' as any)
      .select('*, product:products(name, images:product_images(url))', {
        count: 'exact',
      });

    if (options?.productId) {
      query = query.eq('product_id', options.productId);
    }

    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data, error, count } = await query;
    if (error) throw error;

    return {
      records: (data || []) as unknown as InventoryHistoryRecord[],
      count: count || 0,
      page,
      limit,
    };
  },

  /**
   * Get low stock products sorted by lowest stock first
   */
  async getLowStockProducts(options?: { page?: number; limit?: number }) {
    const page = options?.page || 1;
    const limit = options?.limit || 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Fetch products with inventory > 0 where we'll filter by threshold client-side,
    // plus products at 0 (out of stock)
    const { data, error, count } = await supabase
      .from('products')
      .select(
        '*, variants:product_variants(*), images:product_images(*), collection:collections(name)',
        { count: 'exact' }
      )
      .order('inventory', { ascending: true })
      .range(from, to);

    if (error) throw error;

    // Filter to only include products at or below their threshold
    const lowStockProducts = ((data || []) as InventoryProduct[]).filter(
      (p) => p.inventory <= (p.low_stock_threshold || 10)
    );

    return {
      products: lowStockProducts,
      count: count || 0,
      page,
      limit,
    };
  },

  /**
   * Get all collections for filter dropdown
   */
  async getCollections() {
    const { data, error } = await supabase
      .from('collections')
      .select('id, name')
      .order('name');

    if (error) throw error;
    return data || [];
  },

  /**
   * Update low stock threshold for a product
   */
  async updateThreshold(productId: string, threshold: number) {
    const { error } = await supabase
      .from('products')
      .update({ low_stock_threshold: threshold } as any)
      .eq('id', productId);

    if (error) throw error;
  },
};
