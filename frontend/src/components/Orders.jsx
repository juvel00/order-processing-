import React, { useState } from 'react';
import {
  PackageCheck,
  Calendar,
  MapPin,
  FileText,
  ExternalLink,
  ShieldCheck,
  TrendingDown,
  ArrowRight
} from 'lucide-react';
import OrderDetailModal from './OrderDetailModal';

export default function Orders({ orders, loading, onBrowseMarketplace }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 flex flex-col items-center justify-center text-stone-400">
        <div className="w-10 h-10 border-4 border-farm-200 border-t-farm-600 rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium">Loading orders &amp; invoices...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <PackageCheck className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-stone-900">No Orders Yet</h2>
        <p className="text-sm text-stone-500 mt-2 max-w-sm mx-auto">
          You haven't placed any farm-direct orders yet. Support local agriculture today!
        </p>
        <button
          onClick={onBrowseMarketplace}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-farm-600 text-white font-bold text-sm shadow-md hover:bg-farm-700 transition"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div>
        <h2 className="text-3xl font-extrabold text-stone-900">Orders &amp; Farm Invoices</h2>
        <p className="text-sm text-stone-500 mt-1">
          Historical transactions with itemized direct farmer payouts (SDG 2.3).
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-5">
        {orders.map((order) => {
          const isConfirmed = order.status === 'CONFIRMED' || order.status === 'DELIVERED';
          return (
            <div
              key={order.orderId}
              className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-extrabold text-base text-stone-900">
                      Order #{order.orderNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isConfirmed
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Recent'}
                    </span>
                    <span>•</span>
                    <span>Pay Method: <strong>{order.paymentMethod}</strong></span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xl font-black text-stone-900">
                    ₹{Number(order.totalAmount).toFixed(2)}
                  </span>
                  <p className="text-xs text-emerald-600 font-semibold">
                    ₹{Number(order.totalFarmerPayout).toFixed(2)} to Farmers
                  </p>
                </div>
              </div>

              {/* Items Preview */}
              <div className="space-y-2">
                {order.items?.map((item) => (
                  <div
                    key={item.orderItemId}
                    className="flex items-center justify-between text-xs py-1 text-stone-700"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-bold text-stone-900">{item.quantity}×</span>
                      <span className="truncate">{item.productName}</span>
                      <span className="text-stone-400">({item.farmerName})</span>
                      {item.clearanceDiscountApplied && (
                        <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 font-semibold">
                          Waste Discount
                        </span>
                      )}
                    </div>
                    <span className="font-semibold shrink-0">
                      ₹{Number(item.subtotal).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer / Actions */}
              <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate max-w-sm">{order.deliveryAddress}</span>
                </div>

                <button
                  onClick={() => setSelectedOrder(order)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-stone-100 text-stone-800 hover:bg-stone-200 transition"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Farm Invoice</span>
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
