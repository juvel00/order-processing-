import React from 'react';
import {
  Sprout,
  ShieldCheck,
  TrendingUp,
  Percent,
  Clock,
  ArrowRight,
  HeartHandshake,
  Sparkles,
  Layers,
  Leaf
} from 'lucide-react';

export default function Home({ onExplore, impactMetrics }) {
  return (
    <div className="space-y-16 pb-20">
      
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 hero-mesh text-white shadow-2xl">
        <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28 flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UN SDG 2 (Zero Hunger) &amp; UN SDG 12 (Responsible Production)</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight">
            Direct Producer-to-Consumer <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-amber-200 to-green-100">
              Fair Farm Commerce
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-emerald-50 max-w-2xl leading-relaxed">
            Eliminating broker exploitation in agriculture. Farmers receive <span className="font-bold text-white underline decoration-amber-400 decoration-2">90% of every sale</span>, 
            consumers save up to 35%, and perishable produce is saved from farm waste through dynamic freshness clearance algorithms.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onExplore}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-farm-900 font-bold text-sm shadow-lg hover:bg-emerald-50 hover:scale-105 transition-all duration-200"
            >
              <span>Explore Farm Produce</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/swagger-ui.html"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-md transition-colors"
            >
              Swagger REST Docs
            </a>
          </div>

          {/* Impact Quick Strip */}
          {impactMetrics && (
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl text-left">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="text-xs text-emerald-200 font-medium">Direct Farmer Payout</span>
                <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  ₹{Number(impactMetrics.totalDirectFarmerEarnings || 0).toFixed(0)}
                </p>
                <span className="text-[10px] text-emerald-300 font-semibold">90% Direct Remuneration</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="text-xs text-amber-200 font-medium">Broker Markup Bypassed</span>
                <p className="text-xl sm:text-2xl font-extrabold text-amber-300 mt-1">
                  ₹{Number(impactMetrics.estimatedMiddlemanCommissionEliminated || 0).toFixed(0)}
                </p>
                <span className="text-[10px] text-amber-200 font-semibold">Saved vs Retail Middlemen</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="text-xs text-green-200 font-medium">Waste Prevented</span>
                <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {Number(impactMetrics.estimatedKgFoodWastePrevented || 0).toFixed(1)} kg
                </p>
                <span className="text-[10px] text-green-300 font-semibold">Via 25% Freshness Discounts</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="text-xs text-emerald-200 font-medium">Completed Orders</span>
                <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {impactMetrics.totalOrdersCompleted || 0}
                </p>
                <span className="text-[10px] text-emerald-300 font-semibold">{impactMetrics.totalRegisteredFarmers || 0} Registered Producers</span>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── UN SDG ALIGNMENT SPOTLIGHT ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-farm-600">Societal Impact</span>
          <h2 className="text-3xl font-extrabold text-stone-900 mt-2">Mapped to UN Sustainable Development Goals</h2>
          <p className="text-sm text-stone-600 mt-2">Addressing food supply chain inequality and post-harvest produce waste through software engineering.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* SDG 2 */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-50/70 to-white border border-emerald-200 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl mb-6 shadow-md shadow-emerald-600/30">
              2
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
              Target 2.3: Double Farmer Incomes
            </span>
            <h3 className="text-xl font-bold text-stone-900 mt-4">SDG 2: Zero Hunger &amp; Fair Livelihoods</h3>
            <p className="text-stone-600 text-sm mt-3 leading-relaxed">
              Traditional agricultural supply chains siphon 40%–70% of harvest value to middlemen, depressing smallholder income. 
              <strong> FarmDirect guarantees 90% direct payout</strong> recorded immutable on each line item (<code className="text-xs bg-emerald-100 text-emerald-900 px-1 py-0.5 rounded">OrderItem.farmerEarning</code>).
            </p>
            <ul className="mt-6 space-y-2 text-xs font-medium text-stone-700">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Direct bank settlement to farmer UPI accounts
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% transparent pricing without opaque wholesale commission
              </li>
            </ul>
          </div>

          {/* SDG 12 */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-50/70 to-white border border-amber-200 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-black text-xl mb-6 shadow-md shadow-amber-600/30">
              12
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full">
              Target 12.3: Halve Post-Harvest Food Loss
            </span>
            <h3 className="text-xl font-bold text-stone-900 mt-4">SDG 12: Responsible Consumption &amp; Production</h3>
            <p className="text-stone-600 text-sm mt-3 leading-relaxed">
              Prolonged warehouse transit and shelf stagnation rot tons of agricultural produce every year. 
              FarmDirect tracks <code className="text-xs bg-amber-100 text-amber-900 px-1 py-0.5 rounded">harvestDate</code> and triggers an automated 
              <strong> 25% Freshness-Saver clearance discount</strong> when produce hits its final 35% shelf life.
            </p>
            <ul className="mt-6 space-y-2 text-xs font-medium text-stone-700">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                Live shelf-life countdown on perishable produce cards
              </li>
              <li className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-amber-600" />
                Automatic algorithmic price drop drives rapid consumer pickup before spoilage
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── OOP PILLARS SHOWCASE ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-stone-900 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Object-Oriented Design</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2">Built on Core OOP Principles in Java 21</h2>
            <p className="text-stone-400 text-sm mt-2">Architecture demonstrated across backend entities, polymorphic payment strategies, and service abstractions.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-3">
                ENC
              </div>
              <h4 className="font-bold text-base text-white">Encapsulation</h4>
              <p className="text-stone-400 text-xs mt-2 leading-relaxed">
                Domain entities (<code className="text-emerald-300">Product</code>, <code className="text-emerald-300">Cart</code>, <code className="text-emerald-300">Order</code>) guard inventory with synchronized <code className="text-emerald-300">reduceStock()</code> and bean validation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm mb-3">
                INH
              </div>
              <h4 className="font-bold text-base text-white">Inheritance</h4>
              <p className="text-stone-400 text-xs mt-2 leading-relaxed">
                <code className="text-sky-300">BaseEntity</code> mapped superclass inherited by domain models; <code className="text-sky-300">Product</code> extended by <code className="text-sky-300">PerishableProduce</code> and <code className="text-sky-300">ProcessedProduce</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm mb-3">
                PLY
              </div>
              <h4 className="font-bold text-base text-white">Polymorphism</h4>
              <p className="text-stone-400 text-xs mt-2 leading-relaxed">
                <code className="text-purple-300">PaymentStrategy</code> dynamically executes UPI, Card, or COD; polymorphic pricing adjusts perishable shelf-life discounts at runtime.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm mb-3">
                ABS
              </div>
              <h4 className="font-bold text-base text-white">Abstraction</h4>
              <p className="text-stone-400 text-xs mt-2 leading-relaxed">
                Service interfaces (<code className="text-amber-300">ProductService</code>, <code className="text-amber-300">OrderService</code>) completely decouple REST controllers from JPA persistence logic.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
