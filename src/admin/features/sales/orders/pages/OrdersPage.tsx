import React from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { OrderSummary } from '../components/OrderSummary';
import { OrdersTable } from '../components/OrdersTable';

export default function OrdersPage() {
  const { 
    data: orders, 
    stats, 
    isLoading, 
    filters, 
    updateFilters 
  } = useOrders(50); // limit 50 for now

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Orders</h1>
          <p className="text-slate-500 mt-1">Manage and track customer orders</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/60 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <OrderSummary stats={stats} isLoading={isLoading} />

      <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by order number, customer name, or email..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="w-full pl-9 pr-4 py-2 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={filters.order_status}
            onChange={(e) => updateFilters({ order_status: e.target.value as any })}
            className="px-3 py-2 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-600 bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="packed">Packed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={filters.payment_status}
            onChange={(e) => updateFilters({ payment_status: e.target.value as any })}
            className="px-3 py-2 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-600 bg-white"
          >
            <option value="all">All Payments</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="refunded">Refunded</option>
            <option value="failed">Failed</option>
          </select>
          
          <button className="p-2 border border-slate-200/60 text-slate-400 rounded-xl hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <OrdersTable orders={orders} isLoading={isLoading} />
    </div>
  );
}
