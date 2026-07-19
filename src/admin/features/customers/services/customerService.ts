import { supabase } from '../../../../lib/supabase';
import type { Customer, CustomerStats, CustomerStatus } from '../types/customer';

export const customerService = {
  async getCustomers(page = 1, limit = 10, search = '', filter = 'all') {
    let query = supabase
      .from('customers')
      .select(`
        *,
        orders:orders(id, total, created_at, status)
      `, { count: 'exact' });

    if (search) {
      // Basic search on common fields
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
    }

    if (filter !== 'all') {
      if (filter === 'active' || filter === 'inactive' || filter === 'vip') {
        query = query.eq('status', filter);
      }
      // Note: "new" vs "returning" would ideally be done via a view or RPC in Supabase, 
      // but for simplicity we will fetch and filter if required, or skip complex filtering
      // if not natively supported without RPC.
    }

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to).order('created_at', { ascending: false });

    const { data, error, count } = await query;
    if (error) throw new Error(error.message);

    // Compute aggregates manually since we fetched orders
    const customers = data.map(customer => {
      const orders = customer.orders || [];
      // Calculate total spent only from non-cancelled/non-archived orders
      const validOrders = orders.filter((o: any) => o.status !== 'cancelled' && o.status !== 'archived');
      
      const total_spent = validOrders.reduce((sum: number, o: any) => sum + (o.total || 0), 0);
      const total_orders = validOrders.length;
      
      // Sort orders by created_at descending to get the last order date
      const sortedOrders = [...validOrders].sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      const last_order_date = sortedOrders.length > 0 ? sortedOrders[0].created_at : undefined;

      return {
        ...customer,
        total_spent,
        total_orders,
        last_order_date
      };
    });

    return { customers, count: count || 0 };
  },

  async getCustomerDetails(id: string): Promise<Customer> {
    const { data, error } = await supabase
      .from('customers')
      .select(`
        *,
        orders (*),
        addresses:customer_addresses (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);

    const validOrders = (data.orders || []).filter((o: any) => o.status !== 'cancelled' && o.status !== 'archived');
    const total_spent = validOrders.reduce((sum: number, o: any) => sum + (o.total || 0), 0);
    const total_orders = validOrders.length;
    
    const sortedOrders = [...validOrders].sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    const last_order_date = sortedOrders.length > 0 ? sortedOrders[0].created_at : undefined;

    return {
      ...data,
      total_spent,
      total_orders,
      last_order_date,
      orders: sortedOrders, // pass sorted valid orders, or pass all orders if we want to show cancelled in history
    };
  },

  async updateCustomer(id: string, updates: Partial<Customer>) {
    const { error } = await supabase
      .from('customers')
      .update({
        notes: updates.notes,
        status: updates.status,
      })
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  },

  async getCustomerStats(): Promise<CustomerStats> {
    // Basic stats gathering. 
    // For a real production app, this should be done via Supabase RPC/Views for performance.
    
    const { data: allCustomers, error } = await supabase
      .from('customers')
      .select('id, created_at');

    if (error) throw new Error(error.message);

    const totalCustomers = allCustomers.length;
    
    // Simplistic breakdown
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
    
    const newCustomers = allCustomers.filter(c => new Date(c.created_at) >= thirtyDaysAgo).length;

    return {
      totalCustomers,
      returningCustomers: Math.max(0, totalCustomers - newCustomers), // simplistic representation
      newCustomers,
      newsletterSubscribers: 0 // Mocked for now
    };
  }
};
