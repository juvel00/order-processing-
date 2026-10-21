import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  CheckCircle2
} from 'lucide-react';

export default function Cart({
  cart,
  loading,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedCheckout,
  onBrowseMarketplace,
}) {
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 flex flex-col items-center justify-center text-slate-400">
        <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-4" />
        <p className="text-xs font-semibold">Updating cart...</p>
      </div>
    );
  }

  const items = cart?.items || [];
  const isEmpty = items.length === 0;

  if (isEmpty) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our wide range of groceries!
        </p>
        <button
          onClick={onBrowseMarketplace}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-600 text-white font-bold text-xs shadow-md hover:bg-brand-700 transition"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Shopping Cart</h2>
          <p className="text-xs text-slate-500 mt-1">
            You have <strong className="text-slate-900">{cart.totalItemCount}</strong> item(s) in your cart
          </p>
        </div>
        <button
          onClick={onClearCart}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3.5 py-1.5 rounded-xl border border-rose-200 transition"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Item Rows */}
        <div className="lg:col-span-8 space-y-3">
          {items.map((item) => (
            <div
              key={item.cartItemId}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-base text-slate-900 truncate">
                    {item.productName}
                  </h4>
                  {item.clearanceDiscountApplied && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      25% Deal Applied
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Unit Rate: ₹{Number(item.unitPrice).toFixed(2)} / {item.unit}
                </p>
              </div>

              {/* Quantity Controls & Line Price */}
              <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
                  <button
                    onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                    className="p-2 text-slate-500 hover:text-slate-900 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center text-xs font-bold text-slate-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                    className="p-2 text-slate-500 hover:text-slate-900 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <span className="font-black text-base text-slate-900">
                    ₹{Number(item.subtotal).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => onRemoveItem(item.productId)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Remove from cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Delivery Note */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800 font-semibold">
            <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Eligible for Free Delivery! Your items will arrive neatly packed in 15–30 minutes.</span>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 sticky top-28 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-black text-lg text-slate-900">Bill Summary</h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-900">₹{Number(cart.totalAmount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Handling &amp; Packaging</span>
                <span className="font-bold text-slate-900">₹0.00</span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                <span className="font-black text-sm text-slate-900">Grand Total</span>
                <span className="text-2xl font-black text-slate-900">
                  ₹{Number(cart.totalAmount).toFixed(2)}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 text-right">Inclusive of all applicable taxes</p>
            </div>

            {/* Mock Coupon Code Input */}
            <div className="pt-3 border-t border-slate-100">
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1.5">Apply Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g. FLASH25"
                  className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none uppercase font-mono"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (couponCode.trim()) setCouponApplied(true);
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
                >
                  Apply
                </button>
              </div>
              {couponApplied && (
                <span className="text-[10px] text-emerald-600 font-bold mt-1.5 block">
                  ✓ Best promo offer already automatically applied on checkout!
                </span>
              )}
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={onProceedCheckout}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-brand-600 text-white font-extrabold text-sm shadow-lg shadow-brand-600/30 hover:bg-brand-700 hover:scale-[1.01] active:scale-95 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust Badges */}
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Safe Checkout</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                <span>Quality Guaranteed</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
