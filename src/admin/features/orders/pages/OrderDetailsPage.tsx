import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { useOrderDetails } from '../hooks/useOrderDetails';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { PaymentBadge } from '../components/PaymentBadge';
import { FulfillmentBadge } from '../components/FulfillmentBadge';
import { OrderItemsTable } from '../components/OrderItemsTable';
import { OrderSummary } from '../components/OrderSummary';
import { OrderTimeline } from '../components/OrderTimeline';
import { CustomerCard } from '../components/CustomerCard';
import { OrderNotes } from '../components/OrderNotes';
import type { OrderStatus, PaymentStatus, FulfillmentStatus } from '../types/order';

export const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { 
    order, 
    loading, 
    error, 
    actionLoading,
    updateStatus, 
    updatePayment, 
    updateFulfillment, 
    saveNotes 
  } = useOrderDetails(id);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-neutral-900">Order not found</h3>
        <p className="mt-2 text-sm text-neutral-500">{error}</p>
        <button
          onClick={() => navigate('/admin/orders')}
          className="mt-6 text-sm font-medium text-neutral-900 hover:underline"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as OrderStatus;
    if (window.confirm(`Are you sure you want to change the order status to ${newStatus}?`)) {
      await updateStatus(newStatus, `Order status updated to ${newStatus}`);
    }
  };

  const handlePaymentChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as PaymentStatus;
    await updatePayment(newStatus);
  };

  const handleFulfillmentChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as FulfillmentStatus;
    await updateFulfillment(newStatus);
  };

  const formatDateTime = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/orders')}
            className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-neutral-900">{order.order_number}</h1>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className="mt-1 text-sm text-neutral-500">{formatDateTime(order.created_at)}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
            <Download className="w-4 h-4" /> Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Main details) */}
        <div className="lg:col-span-2 space-y-6">
          <OrderItemsTable items={order.items} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OrderTimeline events={order.timeline} />
            <OrderSummary order={order} />
          </div>
        </div>

        {/* Right Column (Meta, Customer, Notes) */}
        <div className="space-y-6">
          
          {/* Status Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-4">
            <h2 className="text-base font-semibold text-neutral-900 mb-2">Order Statuses</h2>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Order Status</label>
              <select
                value={order.status}
                onChange={handleStatusChange}
                disabled={actionLoading}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white text-sm disabled:opacity-50"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="packed">Packed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Payment Status</label>
              <div className="flex items-center gap-3">
                <select
                  value={order.payment_status}
                  onChange={handlePaymentChange}
                  disabled={actionLoading}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white text-sm disabled:opacity-50"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="refunded">Refunded</option>
                  <option value="partially_refunded">Partially Refunded</option>
                  <option value="failed">Failed</option>
                </select>
                <PaymentBadge status={order.payment_status} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Fulfillment Status</label>
              <div className="flex items-center gap-3">
                <select
                  value={order.fulfillment_status}
                  onChange={handleFulfillmentChange}
                  disabled={actionLoading}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white text-sm disabled:opacity-50"
                >
                  <option value="unfulfilled">Unfulfilled</option>
                  <option value="partially_fulfilled">Partially Fulfilled</option>
                  <option value="fulfilled">Fulfilled</option>
                </select>
                <FulfillmentBadge status={order.fulfillment_status} />
              </div>
            </div>
          </div>

          <CustomerCard 
            customer={order.customer} 
            shippingAddress={order.shipping_address} 
            billingAddress={order.billing_address} 
          />

          <OrderNotes 
            notes={order.notes} 
            onSave={saveNotes} 
          />
          
        </div>
      </div>
    </div>
  );
};
