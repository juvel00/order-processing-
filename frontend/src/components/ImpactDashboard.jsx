import React from 'react';
import {
  TrendingUp,
  Percent,
  Clock,
  ShieldCheck,
  Package,
  Users,
  Award,
  Leaf,
  Scale,
  RefreshCw
} from 'lucide-react';

export default function ImpactDashboard({ metrics, loading, onRefresh }) {
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 flex flex-col items-center justify-center text-stone-400">
        <div className="w-10 h-10 border-4 border-farm-200 border-t-farm-600 rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium">Computing live UN SDG metrics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-farm-600">
            Real-Time Analytics
          </span>
          <h2 className="text-3xl font-extrabold text-stone-900 mt-1">
            UN Sustainable Development Goals Dashboard
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Tracking agricultural economic empowerment and post-harvest produce waste reduction.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 shadow-sm transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI 1 */}
        <div className="p-6 rounded-3xl bg-white border border-emerald-200/80 shadow-sm relative overflow-hidden">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-stone-500">Direct Producer Earnings</span>
          <p className="text-3xl font-black text-emerald-700 mt-1">
            ₹{Number(metrics?.totalDirectFarmerEarnings || 0).toFixed(2)}
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-800 font-bold">
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[10px]">
              90.0% Payout Ratio
            </span>
          </div>
          <p className="text-[11px] text-stone-400 mt-2">Direct bank-to-bank producer remuneration (SDG 2.3)</p>
        </div>

        {/* KPI 2 */}
        <div className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-sm relative overflow-hidden">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
            <Scale className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-stone-500">Middleman Margin Saved</span>
          <p className="text-3xl font-black text-amber-600 mt-1">
            ₹{Number(metrics?.estimatedMiddlemanCommissionEliminated || 0).toFixed(2)}
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-800 font-bold">
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-[10px]">
              35% Consumer Savings
            </span>
          </div>
          <p className="text-[11px] text-stone-400 mt-2">Eliminated third-party broker commission cuts</p>
        </div>

        {/* KPI 3 */}
        <div className="p-6 rounded-3xl bg-white border border-green-200/80 shadow-sm relative overflow-hidden">
          <div className="w-10 h-10 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-4">
            <Leaf className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-stone-500">Food Waste Prevented</span>
          <p className="text-3xl font-black text-green-700 mt-1">
            {Number(metrics?.estimatedKgFoodWastePrevented || 0).toFixed(1)} <span className="text-lg font-bold">kg</span>
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-green-800 font-bold">
            <span className="px-2 py-0.5 rounded-full bg-green-100 text-[10px]">
              {metrics?.clearanceProduceUnitsSold || 0} Clearance Units
            </span>
          </div>
          <p className="text-[11px] text-stone-400 mt-2">Saved via 25% dynamic shelf-life discount (SDG 12.3)</p>
        </div>

        {/* KPI 4 */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm relative overflow-hidden">
          <div className="w-10 h-10 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center mb-4">
            <Package className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-stone-500">Platform Deliveries</span>
          <p className="text-3xl font-black text-stone-900 mt-1">
            {metrics?.totalOrdersCompleted || 0}
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-stone-700 font-bold">
            <span className="px-2 py-0.5 rounded-full bg-stone-100 text-[10px]">
              {metrics?.totalRegisteredFarmers || 0} Registered Farmers
            </span>
          </div>
          <p className="text-[11px] text-stone-400 mt-2">Total gross throughput: ₹{Number(metrics?.totalGrossPlatformSales || 0).toFixed(0)}</p>
        </div>

      </div>

      {/* Target Breakdown Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* SDG 2 Deep Dive */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-900 to-farm-900 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
              UN SDG Goal 2
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold">
              Target 2.3
            </span>
          </div>
          <h3 className="text-2xl font-black">Zero Hunger &amp; Producer Livelihoods</h3>
          <p className="text-emerald-100 text-sm leading-relaxed">
            {metrics?.sdg2Description ||
              'Doubling agricultural productivity and incomes of small-scale food producers through direct producer-to-consumer monetization.'}
          </p>
          <div className="pt-4 border-t border-white/15 space-y-2 text-xs">
            <div className="flex justify-between text-emerald-200">
              <span>Direct Compensation Mechanism</span>
              <span className="font-bold text-white">Immutable OrderItem.farmerEarning</span>
            </div>
            <div className="flex justify-between text-emerald-200">
              <span>Commission Taken by Platform</span>
              <span className="font-bold text-white">10% (Logistics only)</span>
            </div>
          </div>
        </div>

        {/* SDG 12 Deep Dive */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-900 to-yellow-900 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              UN SDG Goal 12
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold">
              Target 12.3
            </span>
          </div>
          <h3 className="text-2xl font-black">Responsible Consumption &amp; Production</h3>
          <p className="text-amber-100 text-sm leading-relaxed">
            {metrics?.sdg12Description ||
              'Halving per capita food waste via dynamic freshness pricing and transparent farm-to-table traceability.'}
          </p>
          <div className="pt-4 border-t border-white/15 space-y-2 text-xs">
            <div className="flex justify-between text-amber-200">
              <span>Algorithmic Trigger</span>
              <span className="font-bold text-white">Remaining Shelf Life ≤ 35%</span>
            </div>
            <div className="flex justify-between text-amber-200">
              <span>Clearance Discount Applied</span>
              <span className="font-bold text-white">25% Automatic Price Reduction</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
