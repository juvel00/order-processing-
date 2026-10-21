import React, { useState } from 'react';
import {
  ShoppingBag,
  Star,
  Plus,
  Minus,
  Check,
  Flame,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';

const CATEGORY_NAMES = {
  VEGETABLES: 'Fresh Vegetables',
  FRUITS: 'Fresh Fruits',
  GRAINS_PULSES: 'Grains & Pulses',
  DAIRY: 'Dairy & Eggs',
  HERBS_SPICES: 'Herbs & Seasoning',
  ORGANIC_HONEY: 'Organic Honey',
  PROCESSED_GOODS: 'Pantry & Oils',
};

export default function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const hasDiscount = product.effectivePrice < product.basePrice;
  const isOutOfStock = product.stockQuantity <= 0;

  const handleAdd = async () => {
    if (isOutOfStock) return;
    setAdding(true);
    try {
      await onAddToCart(product.id, quantity);
      setQuantity(1);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div
      className={`group relative flex flex-col rounded-3xl bg-white border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden ${
        hasDiscount
          ? 'border-amber-300 ring-2 ring-amber-400/20'
          : 'border-slate-200/90'
      }`}
    >
      {/* Top Banner Tag */}
      <div className="p-4 pb-0 flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-full">
          {CATEGORY_NAMES[product.category] || product.category}
        </span>

        {hasDiscount ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-white shadow-sm">
            <Flame className="w-3.5 h-3.5" />
            25% OFF
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <Check className="w-3 h-3" />
            Verified Pure
          </span>
        )}
      </div>

      {/* Body Details */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-extrabold text-base text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            {product.description || 'Premium quality pantry & fresh grocery item.'}
          </p>

          {/* Ratings & Trust */}
          <div className="flex items-center gap-2 mt-3 text-xs">
            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-md border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>4.9</span>
            </div>
            <span className="text-slate-400 text-[11px]">(1,240+ verified ratings)</span>
          </div>

          <div className="mt-3 flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
            <Clock className="w-3 h-3 text-emerald-600" />
            <span>Delivered in 15–30 mins</span>
          </div>
        </div>

        {/* Pricing & Cart Action */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">
                  ₹{Number(product.effectivePrice).toFixed(2)}
                </span>
                <span className="text-xs text-slate-400 font-medium">/{product.unit}</span>
                {hasDiscount && (
                  <span className="text-xs text-slate-400 line-through">
                    ₹{Number(product.basePrice).toFixed(2)}
                  </span>
                )}
              </div>
              {hasDiscount && (
                <p className="text-[10px] text-amber-600 font-bold mt-0.5">
                  Save ₹{(product.basePrice - product.effectivePrice).toFixed(2)} today
                </p>
              )}
            </div>

            <div className="text-right">
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                  isOutOfStock
                    ? 'bg-rose-50 text-rose-600'
                    : product.stockQuantity < 15
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                {isOutOfStock
                  ? 'Out of Stock'
                  : product.stockQuantity < 15
                  ? `Only ${product.stockQuantity} left`
                  : 'In Stock'}
              </span>
            </div>
          </div>

          {/* Stepper + Add Button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1 || isOutOfStock}
                className="p-2 text-slate-500 hover:text-slate-900 disabled:opacity-30 transition"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-bold text-slate-800">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                disabled={quantity >= product.stockQuantity || isOutOfStock}
                className="p-2 text-slate-500 hover:text-slate-900 disabled:opacity-30 transition"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={isOutOfStock || adding}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs shadow-sm transition-all duration-200 ${
                isOutOfStock
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-brand-600 text-white hover:bg-brand-700 active:scale-95'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{adding ? 'Adding...' : 'Add to Cart'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
