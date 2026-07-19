import { supabase } from '../../../../lib/supabase';
import type { InventoryHistory, InventoryAdjustment } from '../types/inventory';

export const getInventoryProducts = async (
  page = 1,
  limit = 20,
  search = '',
  statusFilter = 'all', // 'all', 'in_stock', 'low_stock', 'out_of_stock'
  lowStockThreshold = 10
) => {
  let query = supabase
    .from('products')
    .select('id, name, sku, stock, updated_at, status, thumbnail, collection:collections!products_collection_id_fkey(name)', { count: 'exact' });

  if (search) {
    query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%`);
  }

  // Handle inventory status filters
  if (statusFilter === 'in_stock') {
    query = query.gt('stock', lowStockThreshold);
  } else if (statusFilter === 'low_stock') {
    query = query.lte('stock', lowStockThreshold).gt('stock', 0);
  } else if (statusFilter === 'out_of_stock') {
    query = query.lte('stock', 0);
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  
  query = query.order('name', { ascending: true }).range(from, to);

  const { data, count, error } = await query;
  if (error) throw error;

  return {
    products: data,
    count: count || 0,
  };
};

export const getLowStockProducts = async (threshold = 10) => {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, sku, stock, thumbnail')
    .lte('stock', threshold)
    .order('stock', { ascending: true })
    .limit(5);
    
  if (error) throw error;
  return data;
};

export const adjustInventory = async (adjustment: InventoryAdjustment) => {
  const changeAmount = adjustment.newQuantity - adjustment.previousQuantity;
  
  // Update product stock
  const { error: updateError } = await supabase
    .from('products')
    .update({ stock: adjustment.newQuantity, updated_at: new Date().toISOString() })
    .eq('id', adjustment.productId);
    
  if (updateError) throw updateError;
  
  // Insert history record
  const { error: historyError } = await supabase
    .from('inventory_history')
    .insert([{
      product_id: adjustment.productId,
      previous_quantity: adjustment.previousQuantity,
      new_quantity: adjustment.newQuantity,
      change_amount: changeAmount,
      reason: adjustment.reason,
      updated_by: adjustment.updatedBy || 'Admin'
    }]);
    
  if (historyError) throw historyError;
  
  return true;
};

export const getProductInventoryHistory = async (productId: string, page = 1, limit = 10) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from('inventory_history')
    .select('*', { count: 'exact' })
    .eq('product_id', productId)
    .order('created_at', { ascending: false })
    .range(from, to);
    
  if (error) throw error;
  
  return {
    history: data as InventoryHistory[],
    count: count || 0
  };
};
