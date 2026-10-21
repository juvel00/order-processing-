import React from 'react';
import { X, Printer, ShieldCheck, ShoppingBag, MapPin, CheckCircle2, FileText } from 'lucide-react';

export default function OrderDetailModal({ order, onClose }) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const subtotal = Number(order.totalAmount || 0);
  const gstAmount = Number((subtotal * 0.05).toFixed(2));
  const grandTotal = subtotal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal / Invoice */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-slide-in p-6 sm:p-8 space-y-6">
        
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5 text-brand-700">
            <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base text-slate-900 block leading-tight">ShopDirect Retail Invoice</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Official Purchase Receipt</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
              title="Print Tax Invoice"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Header Details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Invoice / Order #</span>
            <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">{order.orderNumber}</p>
          </div>
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Order Date &amp; Time</span>
            <p className="font-bold text-slate-900 text-sm mt-0.5">
              {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Today'}
            </p>
          </div>
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Payment Method</span>
            <p className="font-bold text-brand-700 text-sm mt-0.5">{order.paymentMethod}</p>
          </div>
          <div className="col-span-2">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Delivery &amp; Billing Address</span>
            <p className="font-bold text-slate-900 mt-0.5">{order.customerName}</p>
            <p className="text-slate-500 text-[11px] mt-0.5 leading-snug">{order.deliveryAddress}</p>
          </div>
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Payment Status</span>
            <div className="mt-0.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {order.status || 'CONFIRMED'}
              </span>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto border rounded-2xl border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Item Description</th>
                <th className="p-3 text-right">Qty</th>
                <th className="p-3 text-right">Unit Price</th>
                <th className="p-3 text-right">Discount</th>
                <th className="p-3 text-right">Net Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {order.items?.map((item) => (
                <tr key={item.orderItemId || item.productId}>
                  <td className="p-3 font-semibold text-slate-900">
                    {item.productName}
                    {item.clearanceDiscountApplied && (
                      <span className="block text-[10px] text-amber-600 font-bold">
                        Special Flash Deal Applied (-25%)
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right font-medium text-slate-700">{item.quantity}</td>
                  <td className="p-3 text-right text-slate-600">₹{Number(item.unitPrice).toFixed(2)}</td>
                  <td className="p-3 text-right text-emerald-600 font-medium">
                    {item.clearanceDiscountApplied ? '25% OFF' : '—'}
                  </td>
                  <td className="p-3 text-right font-bold text-slate-900">
                    ₹{Number(item.subtotal).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bill Breakdown */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Items Subtotal</span>
            <span className="font-semibold text-slate-900">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Standard Express Delivery</span>
            <span className="font-semibold text-emerald-600">FREE</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Applicable GST &amp; Taxes</span>
            <span className="text-slate-500">Included in prices</span>
          </div>
          <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-200">
            <span>Total Paid (INR)</span>
            <span className="text-brand-600">₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Guarantee strip */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-1.5 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Genuine Products • 7 Days Easy Replacement</span>
          </div>
          <span>ShopDirect Retail Network</span>
        </div>

      </div>
    </div>
  );
}