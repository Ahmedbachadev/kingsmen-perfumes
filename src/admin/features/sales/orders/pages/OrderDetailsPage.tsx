import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Download, Clock } from 'lucide-react';
import { OrderService, type OrderWithItems } from '../services/orderService';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { PaymentBadge } from '../components/PaymentBadge';
import { FulfillmentBadge } from '../components/FulfillmentBadge';
import { CustomerCard } from '../components/CustomerCard';
import { OrderItemsTable } from '../components/OrderItemsTable';
import { OrderTimeline } from '../components/OrderTimeline';
import { formatDate } from '../../../../../utils/format';

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderWithItems | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [note, setNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const data = await OrderService.getOrderDetails(id);
      setOrder(data);
    } catch (error) {
      console.error('Failed to load order:', error);
      alert('Order not found');
      navigate('/admin/sales/orders');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: any) => {
    if (!order) return;
    if (!window.confirm(`Are you sure you want to change the order status to ${newStatus}?`)) return;

    try {
      setIsUpdatingStatus(true);
      await OrderService.updateOrderStatus(order.id, newStatus);
      await loadOrder(); // reload to get updated timeline and status
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update order status');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleAddNote = async () => {
    if (!order || !note.trim()) return;
    try {
      setIsAddingNote(true);
      await OrderService.addOrderNote(order.id, note.trim());
      setNote('');
      await loadOrder();
    } catch (error) {
      console.error('Failed to add note:', error);
      alert('Failed to add note');
    } finally {
      setIsAddingNote(false);
    }
  };

  if (isLoading || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
        <Clock className="w-8 h-8 mb-4 animate-spin" />
        <p>Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <button
            onClick={() => navigate('/admin/sales/orders')}
            className="mt-1 w-10 h-10 bg-white border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Order {order.order_number}
              </h1>
              <OrderStatusBadge status={order.order_status} />
            </div>
            <p className="text-slate-500 text-sm">
              Placed on {formatDate(order.created_at, true)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/60 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium">
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/60 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium">
            <Download className="w-4 h-4" />
            Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <OrderItemsTable order={order} />

          {/* Timeline & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OrderTimeline timeline={order.timeline} />
            
            <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-6 flex flex-col h-full">
              <h3 className="font-semibold text-slate-900 mb-4">Internal Notes</h3>
              <div className="flex-1">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a private note (not visible to customer)..."
                  className="w-full h-32 p-3 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none text-sm"
                />
                <button
                  onClick={handleAddNote}
                  disabled={!note.trim() || isAddingNote}
                  className="mt-3 w-full py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  {isAddingNote ? 'Adding...' : 'Add Note'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Management */}
          <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Manage Order</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Order Status
                </label>
                <select
                  value={order.order_status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  disabled={isUpdatingStatus}
                  className="w-full px-3 py-2 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm bg-white disabled:bg-slate-50"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="packed">Packed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Payment Status
                </label>
                <div className="flex items-center gap-2">
                  <PaymentBadge status={order.payment_status} className="text-sm px-3 py-1" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Fulfillment Status
                </label>
                <div className="flex items-center gap-2">
                  <FulfillmentBadge status={order.fulfillment_status} className="text-sm px-3 py-1" />
                </div>
              </div>
            </div>
          </div>

          <CustomerCard order={order} />
        </div>
      </div>
    </div>
  );
}
