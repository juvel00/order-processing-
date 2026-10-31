import React from 'react';
import { Film, Clapperboard, Ticket, BarChart3, Search, User } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, searchQuery, setSearchQuery, bookingsCount }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('movies')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-amber-400 bg-clip-text text-transparent">
                CineReserve
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-indigo-400">
                Theater Seat Booking
              </span>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search movies, genres, languages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('movies')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                activeTab === 'movies'
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Clapperboard className="w-4 h-4" />
              <span className="hidden sm:inline">Now Showing</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                activeTab === 'bookings'
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span className="hidden sm:inline">My Bookings</span>
              {bookingsCount > 0 && (
                <span className="px-1.5 py-0.5 text-xs font-bold rounded-full bg-amber-500 text-slate-950">
                  {bookingsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                activeTab === 'analytics'
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Theater Stats & OOP</span>
            </button>

            {/* Customer Profile Pill */}
            <div className="hidden lg:flex items-center gap-2.5 ml-2 pl-3 border-l border-slate-800">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-bold text-slate-200">Rahul Sharma</p>
                <p className="text-[10px] font-semibold text-amber-400">GOLD VIP Member</p>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
