import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { Search, Flame, SlidersHorizontal, Sparkles, RefreshCw } from 'lucide-react';

const CATEGORIES = [
  { id: 'ALL', label: 'All Produce', icon: '🌱' },
  { id: 'VEGETABLES', label: 'Vegetables', icon: '🥬' },
  { id: 'FRUITS', label: 'Fruits', icon: '🍎' },
  { id: 'GRAINS_PULSES', label: 'Grains & Pulses', icon: '🌾' },
  { id: 'DAIRY', label: 'Dairy', icon: '🥛' },
  { id: 'HERBS_SPICES', label: 'Herbs & Spices', icon: '🌿' },
  { id: 'ORGANIC_HONEY', label: 'Honey', icon: '🍯' },
  { id: 'PROCESSED_GOODS', label: 'Processed Goods', icon: '🫒' },
];

export default function Products({ products, loading, onAddToCart, onRefresh }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [clearanceOnly, setClearanceOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('DEFAULT');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'ALL') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (clearanceOnly) {
      result = result.filter((p) => p.clearanceDiscountApplied);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.farmerName?.toLowerCase().includes(q) ||
          p.farmLocation?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'PRICE_ASC') {
      result.sort((a, b) => a.effectivePrice - b.effectivePrice);
    } else if (sortBy === 'PRICE_DESC') {
      result.sort((a, b) => b.effectivePrice - a.effectivePrice);
    } else if (sortBy === 'SHELF_LIFE') {
      result.sort((a, b) => (a.remainingShelfLifeDays ?? 999) - (b.remainingShelfLifeDays ?? 999));
    }

    return result;
  }, [products, selectedCategory, clearanceOnly, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-farm-600 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Direct Farm Catalog
          </div>
          <h2 className="text-3xl font-extrabold text-stone-900 mt-1">Farm-Fresh Marketplace</h2>
          <p className="text-sm text-stone-500 mt-1">
            Produce harvested by certified organic producers and local cultivators.
          </p>
        </div>

        {/* Freshness Saver Toggle (SDG 12.3) */}
        <button
          onClick={() => setClearanceOnly(!clearanceOnly)}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm ${
            clearanceOnly
              ? 'bg-amber-500 text-white shadow-amber-500/20 ring-2 ring-amber-400'
              : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
          }`}
        >
          <Flame className={`w-4 h-4 ${clearanceOnly ? 'animate-bounce' : 'text-amber-600'}`} />
          <span>Freshness-Saver Deals (SDG 12.3)</span>
          {clearanceOnly && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">ACTIVE</span>}
        </button>
      </div>

      {/* ── SEARCH & FILTERS BAR ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-3 rounded-2xl border border-stone-200 shadow-sm">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search produce, farmer, or region (e.g., tomatoes, Nashik)..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-stone-50 border border-transparent rounded-xl focus:bg-white focus:border-farm-500 focus:outline-none transition-all"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-stone-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-semibold bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-700 focus:outline-none focus:ring-2 focus:ring-farm-500"
          >
            <option value="DEFAULT">Default Order</option>
            <option value="PRICE_ASC">Price: Low to High</option>
            <option value="PRICE_DESC">Price: High to Low</option>
            <option value="SHELF_LIFE">Shelf Life (Urgent First)</option>
          </select>

          <button
            onClick={onRefresh}
            className="p-2 rounded-xl border border-stone-200 text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition"
            title="Refresh Produce"
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
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isSelected
                  ? 'bg-farm-600 text-white shadow-md shadow-farm-600/20'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
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
        <div className="py-24 flex flex-col items-center justify-center text-stone-400">
          <div className="w-10 h-10 border-4 border-farm-200 border-t-farm-600 rounded-full animate-spin mb-4" />
          <p className="text-sm font-medium">Loading freshly harvested produce...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-stone-200 p-8 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-2xl mx-auto mb-4">
            🌾
          </div>
          <h3 className="font-bold text-lg text-stone-900">No produce matched your filter</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
            Try adjusting your search query, turning off clearance filter, or selecting a different produce category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setClearanceOnly(false);
              setSearchQuery('');
            }}
            className="mt-5 px-5 py-2.5 rounded-xl text-xs font-bold bg-farm-600 text-white hover:bg-farm-700 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-4 px-1">
            <span>Showing <strong className="text-stone-800">{filteredProducts.length}</strong> items</span>
            {clearanceOnly && (
              <span className="text-amber-700 font-semibold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> Filtered by 25% Waste Clearance
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
