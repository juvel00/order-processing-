import React from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  Sparkles,
  AlertCircle
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
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 flex flex-col items-center justify-center text-stone-400">
        <div className="w-10 h-10 border-4 border-farm-200 border-t-farm-600 rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium">Fetching basket...</p>
      </div>
    );
  }

  const items = cart?.items || [];
  const isEmpty = items.length === 0;

  if (isEmpty) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-stone-900">Your Basket is Empty</h2>
        <p className="text-sm text-stone-500 mt-2 max-w-sm mx-auto">
          Support local cultivators directly. Add fresh seasonal vegetables, fruits, and cold-pressed products to your basket.
        </p>
        <button
          onClick={onBrowseMarketplace}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-farm-600 text-white font-bold text-sm shadow-md hover:bg-farm-700 transition"
        >
          <span>Browse Fresh Produce</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-stone-900">Your Fresh Produce Basket</h2>
          <p className="text-sm text-stone-500 mt-1">
            Shopping as <strong className="text-stone-800">{cart.userName}</strong> • {cart.totalItemCount} produce unit(s)
          </p>
        </div>
        <button
          onClick={onClearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 transition"
        >
          Clear Basket
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.cartItemId}
              className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-stone-900 truncate">
                    {item.productName}
                  </h4>
                  {item.clearanceDiscountApplied && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                      25% Waste Saver
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  🧑‍🌾 Direct Producer: <span className="font-medium text-stone-700">{item.farmerName}</span>
                </p>
                <p className="text-xs text-stone-400 mt-0.5">
                  Rate: ₹{Number(item.unitPrice).toFixed(2)} / {item.unit}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                {/* Quantity */}
                <div className="flex items-center rounded-xl border border-stone-200 bg-stone-50 overflow-hidden">
                  <button
                    onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                    className="p-2 text-stone-500 hover:text-stone-900 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center text-xs font-bold text-stone-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                    className="p-2 text-stone-500 hover:text-stone-900 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[80px]">
                  <span className="font-extrabold text-base text-stone-900">
                    ₹{Number(item.subtotal).toFixed(2)}
                  </span>
                  <p className="text-[10px] text-emerald-600 font-semibold">
                    ₹{(item.subtotal * 0.9).toFixed(1)} to farm
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={() => onRemoveItem(item.productId)}
                  className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Breakdown Box */}
        <div className="lg:col-span-4 sticky top-28 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5">
            <h3 className="font-extrabold text-lg text-stone-900">Summary &amp; Fair Share</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Items Subtotal</span>
                <span className="font-semibold text-stone-900">₹{Number(cart.totalAmount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Direct Delivery Logistics</span>
                <span className="font-semibold text-emerald-600">FREE (Farm Direct)</span>
              </div>
              <div className="pt-3 border-t border-stone-100 flex justify-between items-baseline">
                <span className="font-bold text-stone-900">Grand Total</span>
                <span className="text-2xl font-black text-stone-900">
                  ₹{Number(cart.totalAmount).toFixed(2)}
                </span>
              </div>
            </div>

            {/* UN SDG Transparent Revenue Breakdown */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200/80 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>UN SDG 2: Direct Farmer Remuneration</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-stone-600">Farmer Direct Payout (90%)</span>
                <span className="font-extrabold text-emerald-700">
                  ₹{Number(cart.directFarmerShare).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xs pt-1 border-t border-emerald-200/50">
                <span className="text-stone-600">Est. Middleman Markup Saved</span>
                <span className="font-extrabold text-amber-700 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  ₹{Number(cart.estimatedConsumerSavings).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={onProceedCheckout}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-farm-600 text-white font-extrabold text-sm shadow-lg shadow-farm-600/30 hover:bg-farm-700 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
