import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Film, Layers, Shield, Cpu, RefreshCw } from 'lucide-react';
import { api } from '../services/api';

export default function AnalyticsView({ addToast }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = () => {
    setLoading(true);
    api.getStats()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        addToast({ type: 'error', message: err.message || 'Failed to fetch theater statistics' });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Theater Box Office & System Architecture</h2>
          <p className="text-xs text-slate-400">Live operational metrics and Object-Oriented Programming design</p>
        </div>
        <button
          onClick={fetchStats}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Box Office Revenue</span>
          <span className="text-2xl font-black text-white mt-0.5 block">
            ₹{stats?.totalRevenue ? Number(stats.totalRevenue).toFixed(2) : '0.00'}
          </span>
          <span className="text-[10px] text-amber-400 font-semibold mt-1 block">Live Settled Gross</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Seats Reserved</span>
          <span className="text-2xl font-black text-white mt-0.5 block">
            {stats?.totalSeatsSold || 0}
          </span>
          <span className="text-[10px] text-indigo-400 font-semibold mt-1 block">Auditorium Tickets</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
            <BarChart3 className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Seat Occupancy</span>
          <span className="text-2xl font-black text-white mt-0.5 block">
            {stats?.overallOccupancyRate || 0}%
          </span>
          <span className="text-[10px] text-purple-400 font-semibold mt-1 block">Across All Screenings</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
            <Film className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Active Movies & Shows</span>
          <span className="text-2xl font-black text-white mt-0.5 block">
            {stats?.totalMovies || 0} / {stats?.totalShowtimes || 0}
          </span>
          <span className="text-[10px] text-cyan-400 font-semibold mt-1 block">Scheduled Showtimes</span>
        </div>
      </div>

      {/* Java OOP Architecture Breakdown Cards */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <span>Object-Oriented Programming (OOP) Pillars Implementation</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Pillar 1: Encapsulation */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
              <Shield className="w-4 h-4" />
              <span>1. Encapsulation & State Invariants</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Domain models (<code className="text-indigo-300">ShowtimeSeat</code>, <code className="text-indigo-300">Booking</code>, <code className="text-indigo-300">Payment</code>) maintain private fields with strictly guarded domain invariants.
            </p>
            <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
              <li><strong className="text-slate-200">Double-Booking Guard:</strong> <code className="text-indigo-300">ShowtimeSeat.book(booking)</code> transitions state atomically and throws <code className="text-rose-400">SeatAlreadyBookedException</code> on conflicts.</li>
              <li><strong className="text-slate-200">Financial Integrity:</strong> <code className="text-indigo-300">Booking.recalculateTotals()</code> encapsulates ticket sums and convenience fees.</li>
            </ul>
          </div>

          {/* Pillar 2: Inheritance */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2.5 text-indigo-400 font-bold text-sm">
              <Layers className="w-4 h-4" />
              <span>2. Multi-Level Inheritance</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Extensive class hierarchies with JPA <code className="text-indigo-300">SINGLE_TABLE</code> and <code className="text-indigo-300">JOINED</code> strategies ensure code reusability:
            </p>
            <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
              <li><strong className="text-slate-200">Seat Hierarchy:</strong> Abstract <code className="text-indigo-300">Seat</code> is extended by <code className="text-indigo-300">StandardSeat</code>, <code className="text-indigo-300">PremiumSeat</code>, and <code className="text-indigo-300">VipReclinerSeat</code>.</li>
              <li><strong className="text-slate-200">User Hierarchy:</strong> <code className="text-indigo-300">User</code> base entity is extended by <code className="text-indigo-300">Customer</code> and <code className="text-indigo-300">TheaterAdmin</code>.</li>
              <li><strong className="text-slate-200">BaseEntity:</strong> Mapped superclass inheriting auto-timestamps and primary key.</li>
            </ul>
          </div>

          {/* Pillar 3: Polymorphism */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2.5 text-purple-400 font-bold text-sm">
              <Cpu className="w-4 h-4" />
              <span>3. Polymorphism & Strategy Pattern</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Demonstrates runtime polymorphism across pricing and multi-channel transaction authorization:
            </p>
            <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
              <li><strong className="text-slate-200">Polymorphic Seat Pricing:</strong> Abstract <code className="text-indigo-300">Seat.calculateEffectivePrice()</code> executes concrete tier calculations ($1.0\times$, $1.35\times$, $1.80\times$ + prime surge).</li>
              <li><strong className="text-slate-200">Payment Strategy Pattern:</strong> <code className="text-indigo-300">PaymentStrategy</code> dynamically resolved at runtime (<code className="text-indigo-300">CardPaymentStrategy</code>, <code className="text-indigo-300">UpiPaymentStrategy</code>, <code className="text-indigo-300">NetBankingPaymentStrategy</code>).</li>
            </ul>
          </div>

          {/* Pillar 4: Abstraction */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-sm">
              <Film className="w-4 h-4" />
              <span>4. Layered Service Abstraction</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Rigid architectural abstraction isolating presentation from persistence mechanics:
            </p>
            <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
              <li><strong className="text-slate-200">Contract Decoupling:</strong> Controllers communicate strictly through service interfaces (<code className="text-indigo-300">MovieService</code>, <code className="text-indigo-300">ShowtimeService</code>, <code className="text-indigo-300">BookingService</code>).</li>
              <li><strong className="text-slate-200">Persistence Shielding:</strong> Business logic isolated from Spring Data JPA Repositories and transactional isolation.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
