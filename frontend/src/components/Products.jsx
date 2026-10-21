import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { Search, Flame, SlidersHorizontal, RefreshCw, X } from 'lucide-react';

const CATEGORIES = [
  { id: 'ALL', label: 'All Items', icon: '🛒' },
  { id: 'VEGETABLES', label: 'Fresh Vegetables', icon: '🥬' },
  { id: 'FRUITS', label: 'Fresh Fruits', icon: '🍎' },
  { id: 'GRAINS_PULSES', label: 'Grains & Pulses', icon: '🌾' },
  { id: 'DAIRY', label: 'Dairy & Eggs', icon: '🥛' },
  { id: 'HERBS_SPICES', label: 'Herbs & Spices', icon: '🌿' },
  { id: 'ORGANIC_HONEY', label: 'Organic Honey', icon: '🍯' },
  { id: 'PROCESSED_GOODS', label: 'Oils & Pantry', icon: '🫒' },
];

export default function Products({
  products,
  loading,
  onAddToCart,
  onRefresh,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) {
  const [dealsOnly, setDealsOnly] = useState(false);
  const [sortBy, setSortBy] = useState('DEFAULT');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'ALL') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (dealsOnly) {
      result = result.filter((p) => p.effectivePrice < p.basePrice || p.clearanceDiscountApplied);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'PRICE_ASC') {
      result.sort((a, b) => a.effectivePrice - b.effectivePrice);
    } else if (sortBy === 'PRICE_DESC') {
      result.sort((a, b) => b.effectivePrice - a.effectivePrice);
    }

    return result;
  }, [products, selectedCategory, dealsOnly, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Supermarket Catalog</h2>
          <p className="text-xs text-slate-500 mt-1">
            Browse our freshest daily staples, packaged pantry goods, and household essentials.
          </p>
        </div>

        {/* Hot Deals Toggle */}
        <button
          onClick={() => setDealsOnly(!dealsOnly)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm ${
            dealsOnly
              ? 'bg-amber-500 text-white shadow-amber-500/20 ring-2 ring-amber-400'
              : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
          }`}
        >
          <Flame className={`w-4 h-4 ${dealsOnly ? 'animate-bounce' : 'text-amber-600'}`} />
          <span>Hot Flash Deals (25% OFF)</span>
          {dealsOnly && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">ACTIVE</span>}
        </button>
      </div>

      {/* ── SEARCH & FILTER CONTROLS ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items by name, brand, or category..."
            className="w-full pl-10 pr-9 py-2 text-xs bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-brand-500 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="DEFAULT">Recommended</option>
            <option value="PRICE_ASC">Price: Low to High</option>
            <option value="PRICE_DESC">Price: High to Low</option>
          </select>

          <button
            onClick={onRefresh}
            className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition"
            title="Refresh Products"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── CATEGORY PILLS ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── PRODUCT GRID ── */}
      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center text-slate-400">
          <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-4" />
          <p className="text-xs font-semibold">Loading catalog...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl mx-auto mb-4">
            🔍
          </div>
          <h3 className="font-bold text-base text-slate-900">No products found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search terms or clearing your category filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setDealsOnly(false);
              setSearchQuery('');
            }}
            className="mt-5 px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 transition"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
            <span>Showing <strong className="text-slate-900">{filteredProducts.length}</strong> products</span>
            {dealsOnly && (
              <span className="text-amber-700 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> Showing 25% Flash Deals
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
