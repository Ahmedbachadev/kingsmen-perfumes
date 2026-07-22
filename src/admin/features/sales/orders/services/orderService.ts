import { supabase } from '../../../../../lib/supabase';
import type { Database } from '../../../../../types/database.types';

export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderItem = Database['public']['Tables']['order_items']['Row'];
export type OrderTimeline = Database['public']['Tables']['order_timeline']['Row'];

export interface OrderWithItems extends Order {
  items: OrderItem[];
  timeline: OrderTimeline[];
}

export interface OrderFilters {
  search?: string;
  order_status?: Order['order_status'] | 'all';
  payment_status?: Order['payment_status'] | 'all';
  fulfillment_status?: Order['fulfillment_status'] | 'all';
  dateRange?: { from: Date; to: Date };
}

export interface OrderStats {
  total: number;
  pending: number;
  processing: number;
  completed: number;
  cancelled: number;
  todayRevenue: number;
}

export class OrderService {
  /**
   * Get paginated and filtered orders
   */
  static async getOrders(filters: OrderFilters, page: number = 1, limit: number = 20) {
    let query = supabase
      .from('orders')
      .select('*, items:order_items(count)', { count: 'exact' })
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters.search) {
      query = query.or(`order_number.ilike.%${filters.search}%,customer_name.ilike.%${filters.search}%,customer_email.ilike.%${filters.search}%`);
    }

    if (filters.order_status && filters.order_status !== 'all') {
      query = query.eq('order_status', filters.order_status);
    }

    if (filters.payment_status && filters.payment_status !== 'all') {
      query = query.eq('payment_status', filters.payment_status);
    }

    if (filters.fulfillment_status && filters.fulfillment_status !== 'all') {
      query = query.eq('fulfillment_status', filters.fulfillment_status);
    }

    if (filters.dateRange) {
      query = query
        .gte('created_at', filters.dateRange.from.toISOString())
        .lte('created_at', filters.dateRange.to.toISOString());
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, count, error } = await query;
    if (error) throw error;

    // Transform count payload
    const transformedData = data.map(order => ({
      ...order,
      items_count: Array.isArray(order.items) ? order.items[0]?.count || 0 : 0
    }));

    return {
      data: transformedData,
      count: count || 0
    };
  }

  /**
   * Get full order details by ID
   */
  static async getOrderDetails(id: string): Promise<OrderWithItems> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*),
        timeline:order_timeline(*)
      `)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    
    // Sort timeline descending
    if (data.timeline) {
      data.timeline.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return data as OrderWithItems;
  }

  /**
   * Get KPIs and aggregate stats
   */
  static async getOrderStats(): Promise<OrderStats> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [allOrdersRes, todayRevenueRes] = await Promise.all([
      // Get counts by status
      supabase.from('orders').select('order_status').is('deleted_at', null),
      // Get today's revenue (from paid orders)
      supabase
        .from('orders')
        .select('total_amount')
        .is('deleted_at', null)
        .gte('created_at', today.toISOString())
        .eq('payment_status', 'paid')
    ]);

    if (allOrdersRes.error) throw allOrdersRes.error;
    if (todayRevenueRes.error) throw todayRevenueRes.error;

    const stats = {
      total: 0,
      pending: 0,
      processing: 0,
      completed: 0,
      cancelled: 0,
      todayRevenue: 0
    };

    allOrdersRes.data.forEach(order => {
      stats.total++;
      if (order.order_status === 'pending') stats.pending++;
      if (order.order_status === 'processing') stats.processing++;
      if (order.order_status === 'delivered') stats.completed++;
      if (order.order_status === 'cancelled') stats.cancelled++;
    });

    todayRevenueRes.data.forEach(order => {
      stats.todayRevenue += Number(order.total_amount || 0);
    });

    return stats;
  }

  /**
   * Update Order Status
   */
  static async updateOrderStatus(id: string, status: Order['order_status'], adminUserId?: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ order_status: status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Add to timeline
    await supabase.from('order_timeline').insert({
      order_id: id,
      status_type: 'order_status',
      status_value: status,
      note: `Order status updated to ${status}`,
      created_by: adminUserId || null
    });

    return data;
  }

  /**
   * Add private note
   */
  static async addOrderNote(id: string, note: string, adminUserId?: string) {
    const { error } = await supabase.from('order_timeline').insert({
      order_id: id,
      status_type: 'note',
      status_value: 'note',
      note: note,
      created_by: adminUserId || null
    });

    if (error) throw error;
  }
}
