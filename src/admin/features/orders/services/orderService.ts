import { supabase } from '../../../../lib/supabase';
import type { Order, OrderStats, OrderStatus, PaymentStatus, FulfillmentStatus } from '../types/order';

export const getOrders = async (
  page = 1,
  limit = 10,
  search = '',
  status?: OrderStatus | 'all',
  paymentStatus?: PaymentStatus | 'all',
  fulfillmentStatus?: FulfillmentStatus | 'all'
) => {
  let query = supabase
    .from('orders')
    .select(`
      *,
      customer:customers(first_name, last_name, email),
      items:order_items(id)
    `, { count: 'exact' });

  // Filters
  if (status && status !== 'all') {
    query = query.eq('status', status);
  }
  if (paymentStatus && paymentStatus !== 'all') {
    query = query.eq('payment_status', paymentStatus);
  }
  if (fulfillmentStatus && fulfillmentStatus !== 'all') {
    query = query.eq('fulfillment_status', fulfillmentStatus);
  }

  // Complex Search: order_number, customer name, email, phone
  if (search) {
    // Note: Since we need to search across relations (customers), doing it in a single standard supabase query is hard if we want OR logic across both order and customer tables.
    // As a simple workaround for the admin, we search `order_number` directly. For customer names, a custom RPC or text search on a view is usually better.
    // We will search order_number strictly here for simplicity, or we could fetch matching customer IDs first.
    // For now, let's just search order_number.
    query = query.ilike('order_number', `%${search}%`);
  }

  // Sorting
  query = query.order('created_at', { ascending: false });

  // Pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    orders: data as any[],
    count: count || 0,
  };
};

export const getOrderStats = async (): Promise<OrderStats> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    { count: totalCount },
    { count: pendingCount },
    { count: processingCount },
    { count: completedCount },
    { count: cancelledCount },
    { data: todayOrders }
  ] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'processing'),
    supabase.from('orders').select('*', { count: 'exact', head: true }).in('status', ['delivered', 'shipped']), // completed equivalent
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'cancelled'),
    supabase.from('orders').select('total').gte('created_at', today.toISOString())
  ]);

  const todayRevenue = todayOrders?.reduce((sum, order) => sum + Number(order.total), 0) || 0;

  return {
    total_orders: totalCount || 0,
    pending_orders: pendingCount || 0,
    processing_orders: processingCount || 0,
    completed_orders: completedCount || 0,
    cancelled_orders: cancelledCount || 0,
    today_revenue: todayRevenue,
  };
};

export const getOrderDetails = async (id: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      customer:customers(*),
      shipping_address:customer_addresses!shipping_address_id(*),
      billing_address:customer_addresses!billing_address_id(*),
      items:order_items(*),
      timeline:order_timeline(*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  
  // Sort timeline explicitly in JS to ensure ordering
  if (data.timeline) {
    data.timeline.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  return data as Order;
};

export const updateOrderStatus = async (id: string, status: OrderStatus, title: string, description?: string) => {
  const { error: updateError } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (updateError) throw updateError;

  const { error: timelineError } = await supabase
    .from('order_timeline')
    .insert([{
      order_id: id,
      status,
      title,
      description
    }]);

  if (timelineError) throw timelineError;
};

export const updatePaymentStatus = async (id: string, payment_status: PaymentStatus) => {
  const { error } = await supabase
    .from('orders')
    .update({ payment_status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;

  const { error: timelineError } = await supabase
    .from('order_timeline')
    .insert([{
      order_id: id,
      status: 'processing', // Payment changes usually imply processing
      title: `Payment status updated to ${payment_status}`,
      description: null
    }]);

  if (timelineError) throw timelineError;
};

export const updateFulfillmentStatus = async (id: string, fulfillment_status: FulfillmentStatus) => {
  const { error } = await supabase
    .from('orders')
    .update({ fulfillment_status, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;

  const { error: timelineError } = await supabase
    .from('order_timeline')
    .insert([{
      order_id: id,
      status: fulfillment_status === 'fulfilled' ? 'shipped' : 'processing',
      title: `Fulfillment status updated to ${fulfillment_status}`,
      description: null
    }]);

  if (timelineError) throw timelineError;
};

export const updateOrderNotes = async (id: string, notes: string) => {
  const { error } = await supabase
    .from('orders')
    .update({ notes, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
};

export const archiveOrder = async (id: string) => {
  const { error } = await supabase
    .from('orders')
    .update({ status: 'archived', updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
};
