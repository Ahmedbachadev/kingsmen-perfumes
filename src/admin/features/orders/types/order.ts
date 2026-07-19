export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'packed' | 'shipped' | 'delivered' | 'cancelled' | 'archived';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'partially_refunded' | 'failed';
export type FulfillmentStatus = 'unfulfilled' | 'partially_fulfilled' | 'fulfilled';

export interface CustomerAddress {
  id: string;
  customer_id: string;
  first_name: string;
  last_name: string;
  company: string | null;
  address1: string;
  address2: string | null;
  city: string;
  province: string | null;
  postal_code: string;
  country: string;
  phone: string | null;
}

export interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  sku: string | null;
  price: number;
  quantity: number;
  total: number;
}

export interface OrderTimelineEvent {
  id: string;
  order_id: string;
  status: OrderStatus;
  title: string;
  description: string | null;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string | null;
  status: OrderStatus;
  payment_status: PaymentStatus;
  fulfillment_status: FulfillmentStatus;
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  
  // Relations mapped by Supabase joins
  customer?: Customer;
  shipping_address?: CustomerAddress;
  billing_address?: CustomerAddress;
  items?: OrderItem[];
  timeline?: OrderTimelineEvent[];
}

export interface OrderStats {
  total_orders: number;
  pending_orders: number;
  processing_orders: number;
  completed_orders: number;
  cancelled_orders: number;
  today_revenue: number;
}
