import React from 'react';
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  CreditCard,
  Clock,
  ArrowRight,
  Flame,
  Percent,
  CheckCircle2,
  Tag,
  Star
} from 'lucide-react';

const CATEGORY_TILES = [
  { id: 'VEGETABLES', name: 'Fresh Vegetables', icon: '🥬', count: '100% Farm Fresh' },
  { id: 'FRUITS', name: 'Fresh Fruits', icon: '🍎', count: 'Seasonal & Sweet' },
  { id: 'GRAINS_PULSES', name: 'Grains & Pulses', icon: '🌾', count: 'Staple Essentials' },
  { id: 'DAIRY', name: 'Dairy & Eggs', icon: '🥛', count: 'Pure & Organic' },
  { id: 'HERBS_SPICES', name: 'Herbs & Seasoning', icon: '🌿', count: 'Aromatic Spices' },
  { id: 'ORGANIC_HONEY', name: 'Organic & Honey', icon: '🍯', count: 'Raw & Natural' },
  { id: 'PROCESSED_GOODS', name: 'Oils & Pantry', icon: '🫒', count: 'Cold Pressed & Pure' },
];

export default function Home({ onExplore, onSelectCategory }) {
  return (
    <div className="space-y-12 pb-20">
      
      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 hero-gradient text-white shadow-xl">
        <div className="relative max-w-6xl mx-auto px-6 py-16 sm:py-24 flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold mb-6">
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Super Saver Week • Flat 25% Off Daily Essentials</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl leading-tight">
            Fresh Grocery &amp; Daily Essentials <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-200 to-white">
              Delivered Fast to Your Door
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base text-indigo-100 max-w-xl leading-relaxed">
            Shop best-quality farm vegetables, premium organic honey, cold-pressed cooking oils, and daily pantry staples at unbeatable wholesale prices.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onExplore}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-brand-900 font-extrabold text-sm shadow-xl hover:bg-slate-100 hover:scale-105 transition-all duration-200"
            >
              <span>Start Shopping Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExplore}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-sm backdrop-blur-md transition-colors"
            >
              <Tag className="w-4 h-4 text-amber-300" />
              <span>View Flash Deals</span>
            </button>
          </div>

          {/* Quick Features Row */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl text-left">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <span className="text-2xl">⚡</span>
              <h4 className="font-bold text-sm text-white mt-1">Express Delivery</h4>
              <p className="text-[11px] text-indigo-200 mt-0.5">Delivered fresh in under 30 minutes</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <span className="text-2xl">🏷️</span>
              <h4 className="font-bold text-sm text-white mt-1">Best Price Promise</h4>
              <p className="text-[11px] text-indigo-200 mt-0.5">Direct source pricing without markups</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <span className="text-2xl">🌿</span>
              <h4 className="font-bold text-sm text-white mt-1">100% Quality Check</h4>
              <p className="text-[11px] text-indigo-200 mt-0.5">Strict quality grading on all produce</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <span className="text-2xl">💳</span>
              <h4 className="font-bold text-sm text-white mt-1">Easy Payments</h4>
              <p className="text-[11px] text-indigo-200 mt-0.5">UPI, Cards &amp; Cash on Delivery</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── SHOP BY CATEGORY ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Shop by Category</h2>
            <p className="text-xs text-slate-500 mt-0.5">Pick from our hand-picked assortment of premium groceries</p>
          </div>
          <button
            onClick={onExplore}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>See All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {CATEGORY_TILES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-500 hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 group-hover:bg-brand-50 flex items-center justify-center text-3xl mb-3 transition-colors">
                {cat.icon}
              </div>
              <h4 className="font-bold text-xs text-slate-900 group-hover:text-brand-700 transition-colors">
                {cat.name}
              </h4>
              <span className="text-[10px] text-slate-400 mt-0.5">{cat.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── PROMOTIONAL BANNER STRIP ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider">
              Limited Time Deals
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">Get Flat 25% Off on Fast-Moving Essentials</h3>
            <p className="text-xs sm:text-sm text-amber-100 max-w-lg">
              Stock up your kitchen with certified organic produce, authentic forest honey, and cold-pressed oils.
            </p>
          </div>
          <button
            onClick={onExplore}
            className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 font-black text-xs shadow-md hover:bg-slate-100 transition whitespace-nowrap"
          >
            Explore Deals →
          </button>
        </div>
      </section>

    </div>
  );
}
