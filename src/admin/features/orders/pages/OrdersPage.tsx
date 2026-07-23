import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { OrdersTable } from '../components/OrdersTable';

export const OrdersPage = () => {
  const { 
    orders, 
    stats, 
    loading, 
    search, 
    setSearch, 
    status, 
    setStatus,
    paymentStatus,
    setPaymentStatus,
    fulfillmentStatus,
    setFulfillmentStatus,
    page,
    setPage,
    totalPages,
    refresh,
    archiveOrder
  } = useOrders();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Orders</h1>
          <p className="mt-1 text-sm text-neutral-500">Manage and track customer orders.</p>
        </div>
        <button
          onClick={() => refresh()}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500 mb-1">Total</p>
          <p className="text-2xl font-semibold text-neutral-900">{stats?.total_orders || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500 mb-1">Pending</p>
          <p className="text-2xl font-semibold text-yellow-600">{stats?.pending_orders || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500 mb-1">Processing</p>
          <p className="text-2xl font-semibold text-indigo-600">{stats?.processing_orders || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500 mb-1">Completed</p>
          <p className="text-2xl font-semibold text-green-600">{stats?.completed_orders || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500 mb-1">Cancelled</p>
          <p className="text-2xl font-semibold text-red-600">{stats?.cancelled_orders || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500 mb-1">Today's Revenue</p>
          <p className="text-2xl font-semibold text-neutral-900">{formatCurrency(stats?.today_revenue || 0)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search order number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row md:col-span-3 gap-4">
          <div className="flex-1 flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-400 hidden sm:block" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
            >
              <option value="all">All Order Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="packed">Packed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex-1">
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value as any)}
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
            >
              <option value="all">All Payment Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="refunded">Refunded</option>
              <option value="partially_refunded">Partially Refunded</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="flex-1">
            <select
              value={fulfillmentStatus}
              onChange={(e) => setFulfillmentStatus(e.target.value as any)}
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
            >
              <option value="all">All Fulfillment</option>
              <option value="unfulfilled">Unfulfilled</option>
              <option value="partially_fulfilled">Partially Fulfilled</option>
              <option value="fulfilled">Fulfilled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <OrdersTable 
            orders={orders} 
            onArchive={archiveOrder}
          />
          
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <span className="flex items-center px-4 text-sm text-neutral-500">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
