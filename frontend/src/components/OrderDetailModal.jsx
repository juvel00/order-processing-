import React from 'react';
import { X, Printer, ShieldCheck, Sprout, MapPin, CheckCircle2 } from 'lucide-react';

export default function OrderDetailModal({ order, onClose }) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal / Invoice */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-slide-in p-6 sm:p-8 space-y-6">
        
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2 text-farm-700">
            <Sprout className="w-6 h-6" />
            <span className="font-extrabold text-lg">FarmDirect Tax Invoice</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition"
              title="Print Invoice"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Header Details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-stone-400 font-medium">Invoice / Order #</span>
            <p className="font-mono font-bold text-stone-900 text-sm mt-0.5">{order.orderNumber}</p>
          </div>
          <div>
            <span className="text-stone-400 font-medium">Order Date</span>
            <p className="font-bold text-stone-900 text-sm mt-0.5">
              {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Today'}
            </p>
          </div>
          <div>
            <span className="text-stone-400 font-medium">Payment Method</span>
            <p className="font-bold text-stone-900 text-sm mt-0.5">{order.paymentMethod}</p>
          </div>
          <div className="col-span-2">
            <span className="text-stone-400 font-medium">Billed &amp; Delivered To</span>
            <p className="font-bold text-stone-900 mt-0.5">{order.customerName}</p>
            <p className="text-stone-500 text-[11px] mt-0.5">{order.deliveryAddress}</p>
          </div>
          <div>
            <span className="text-stone-400 font-medium">Status</span>
            <div className="mt-0.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {order.status}
              </span>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto border rounded-2xl border-stone-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
              <tr>
                <th className="p-3">Produce Item</th>
                <th className="p-3">Producer Farm</th>
                <th className="p-3 text-right">Qty</th>
                <th className="p-3 text-right">Unit Rate</th>
                <th className="p-3 text-right">Subtotal</th>
                <th className="p-3 text-right text-emerald-700">Farmer Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {order.items?.map((item) => (
                <tr key={item.orderItemId}>
                  <td className="p-3 font-semibold text-stone-900">
                    {item.productName}
                    {item.clearanceDiscountApplied && (
                      <span className="block text-[10px] text-amber-700 font-normal">
                        25% Waste Clearance Discount
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-stone-600">{item.farmerName}</td>
                  <td className="p-3 text-right font-medium">{item.quantity}</td>
                  <td className="p-3 text-right">₹{Number(item.unitPrice).toFixed(2)}</td>
                  <td className="p-3 text-right font-bold text-stone-900">
                    ₹{Number(item.subtotal).toFixed(2)}
                  </td>
                  <td className="p-3 text-right font-bold text-emerald-700">
                    ₹{Number(item.farmerEarning).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals & SDG Metrics */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
          <div className="flex justify-between text-stone-600">
            <span>Total Value</span>
            <span className="font-bold text-stone-900 text-sm">₹{Number(order.totalAmount).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-emerald-700 font-semibold">
            <span>🧑‍🌾 Direct Farmer Remuneration (90%)</span>
            <span className="font-bold text-sm">₹{Number(order.totalFarmerPayout).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-amber-700 font-semibold pt-1 border-t border-stone-200">
            <span>💰 Est. Middleman Commission Saved</span>
            <span className="font-bold text-sm">₹{Number(order.estimatedBrokerMarkupSaved).toFixed(2)}</span>
          </div>
        </div>

        {/* Notice */}
        <div className="text-[11px] text-stone-400 text-center leading-relaxed">
          Thank you for supporting smallholder agricultural sustainability. <br />
          Empowered by Object-Oriented Java 21 &amp; Spring Boot.
        </div>

      </div>
    </div>
  );
}
