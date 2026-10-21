import React, { useState } from 'react';
import {
  PackageCheck,
  Calendar,
  MapPin,
  FileText,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Clock
} from 'lucide-react';
import OrderDetailModal from './OrderDetailModal';

export default function Orders({ orders, loading, onBrowseMarketplace }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 flex flex-col items-center justify-center text-slate-400">
        <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-4" />
        <p className="text-xs font-semibold">Loading your order history...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-6">
          <PackageCheck className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">No Orders Placed Yet</h2>
        <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto">
          You haven't placed any orders with us yet. Start shopping now for fresh groceries!
        </p>
        <button
          onClick={onBrowseMarketplace}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-600 text-white font-bold text-xs shadow-md hover:bg-brand-700 transition"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">My Order History</h2>
        <p className="text-xs text-slate-500 mt-1">
          Review your previous purchases, track deliveries, and view official tax invoices.
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
          const isConfirmed = order.status === 'CONFIRMED' || order.status === 'DELIVERED';
          return (
            <div
              key={order.orderId}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-black text-sm text-slate-900">
                      Order #{order.orderNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        isConfirmed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Recent'}
                    </span>
                    <span>•</span>
                    <span>Paid via <strong>{order.paymentMethod}</strong></span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-2xl font-black text-slate-900">
                    ₹{Number(order.totalAmount).toFixed(2)}
                  </span>
                  <p className="text-[11px] text-emerald-600 font-bold">
                    ✓ Paid in Full
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {order.items?.map((item) => (
                  <div
                    key={item.orderItemId}
                    className="flex items-center justify-between text-xs py-1 text-slate-700"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-bold text-slate-900">{item.quantity}×</span>
                      <span className="truncate">{item.productName}</span>
                      {item.clearanceDiscountApplied && (
                        <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded font-bold">
                          Flash Deal
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-slate-900 shrink-0">
                      ₹{Number(item.subtotal).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate max-w-sm">{order.deliveryAddress}</span>
                </div>

                <button
                  onClick={() => setSelectedOrder(order)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200 transition"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Tax Invoice</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Invoice Modal */}
      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

    </div>
  );
}
