import type { Order, CustomerAddress } from '../../orders/types/order';

export type CustomerStatus = 'active' | 'inactive' | 'vip';

export interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  status: CustomerStatus;
  notes: string | null;
  created_at?: string;
  
  // Computed fields (via joins/aggregations)
  total_spent?: number;
  total_orders?: number;
  last_order_date?: string;
  
  // Relations
  orders?: Order[];
  addresses?: CustomerAddress[];
}

export interface CustomerStats {
  totalCustomers: number;
  returningCustomers: number;
  newCustomers: number;
  newsletterSubscribers: number;
}
