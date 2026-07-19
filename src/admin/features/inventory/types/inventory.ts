export interface InventoryHistory {
  id: string;
  product_id: string;
  previous_quantity: number;
  new_quantity: number;
  change_amount: number;
  reason: string;
  updated_by: string | null;
  created_at: string;
}

export type InventoryChangeReason = 
  | 'Manual Adjustment'
  | 'New Shipment'
  | 'Damaged Items'
  | 'Returned Items'
  | 'Correction'
  | 'Other';

export interface InventoryAdjustment {
  productId: string;
  previousQuantity: number;
  newQuantity: number;
  reason: InventoryChangeReason | string;
  updatedBy?: string;
}
