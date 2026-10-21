import React, { useState } from 'react';
import {
  Sparkles,
  Clock,
  MapPin,
  Check,
  Plus,
  Minus,
  ShoppingBag,
  Flame,
  Award
} from 'lucide-react';

const CATEGORY_ICONS = {
  VEGETABLES: '🥬',
  FRUITS: '🍎',
  GRAINS_PULSES: '🌾',
  DAIRY: '🥛',
  HERBS_SPICES: '🌿',
  ORGANIC_HONEY: '🍯',
  PROCESSED_GOODS: '🫒',
};

export default function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const isPerishable = product.produceType === 'PERISHABLE';
  const isClearance = product.clearanceDiscountApplied;
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
        isClearance
          ? 'border-amber-300 ring-2 ring-amber-400/30'
          : 'border-stone-200/80'
      }`}
    >
      {/* Top Tag Strip */}
      <div className="p-4 pb-0 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700">
          <span>{CATEGORY_ICONS[product.category] || '🌱'}</span>
          <span className="capitalize">{product.category.replace('_', ' ').toLowerCase()}</span>
        </span>

        {isClearance && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm shadow-amber-500/30 animate-pulse">
            <Flame className="w-3.5 h-3.5" />
            25% Off Waste Saver
          </span>
        )}

        {!isClearance && product.organicCertified && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Award className="w-3 h-3" />
            Organic
          </span>
        )}
      </div>

      {/* Main Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-stone-900 group-hover:text-farm-700 transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description || 'Farm-fresh harvest delivered directly to your doorstep.'}
          </p>

          {/* Farmer & Location Attribution */}
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
            <div className="flex items-center gap-1.5 font-medium truncate">
              <span className="text-sm">🧑‍🌾</span>
              <span className="truncate">{product.farmerName}</span>
            </div>
            <div className="flex items-center gap-1 text-stone-400 shrink-0">
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate max-w-[110px]">{product.farmLocation}</span>
            </div>
          </div>

          {/* Shelf Life / Process details */}
          <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-2">
            {isPerishable ? (
              <span className={`inline-flex items-center gap-1 font-medium ${isClearance ? 'text-amber-700 font-bold' : 'text-stone-500'}`}>
                <Clock className="w-3 h-3" />
                Remaining Shelf Life: {product.remainingShelfLifeDays} day(s)
              </span>
            ) : (
              <span className="text-stone-500">
                Artisanal: {product.processingMethod || 'Pure Local'}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="mt-5 pt-4 border-t border-stone-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-stone-900">
                  ₹{Number(product.effectivePrice).toFixed(2)}
                </span>
                <span className="text-xs text-stone-400 font-medium">/{product.unit}</span>
                {isClearance && (
                  <span className="text-xs text-stone-400 line-through">
                    ₹{Number(product.basePrice).toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                90% directly to farmer (₹{(product.effectivePrice * 0.9).toFixed(1)})
              </p>
            </div>

            <div className="text-right">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                  isOutOfStock
                    ? 'bg-rose-50 text-rose-600'
                    : product.stockQuantity < 15
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                {isOutOfStock
                  ? 'Out of Stock'
                  : `${product.stockQuantity} ${product.unit} left`}
              </span>
            </div>
          </div>

          {/* Add to Basket Control */}
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl border border-stone-200 bg-stone-50 overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1 || isOutOfStock}
                className="p-2 text-stone-500 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-bold text-stone-800">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                disabled={quantity >= product.stockQuantity || isOutOfStock}
                className="p-2 text-stone-500 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-farm-600 text-white hover:bg-farm-700 hover:shadow-farm-600/20 active:scale-95'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{adding ? 'Adding...' : 'Add to Basket'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
