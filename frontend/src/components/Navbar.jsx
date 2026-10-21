import React, { useState } from 'react';
import {
  ShoppingBag,
  Package,
  Search,
  User,
  Menu,
  X,
  Flame,
  Percent,
  ChevronDown,
  Sparkles,
  Truck
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  cartItemCount,
  currentUser,
  users,
  onUserChange,
  searchQuery,
  setSearchQuery,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      
      {/* Top Promotional Announcement Strip */}
      <div className="bg-brand-900 text-white text-[11px] font-semibold py-1.5 px-4 text-center tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline">⚡ Super Saver Week: Flat 25% OFF on Selected Grocery Essentials!</span>
          <span className="mx-auto sm:mx-0 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-accent-500" />
            <span>FREE Express Delivery on all orders above ₹299</span>
          </span>
          <span className="hidden md:inline text-slate-300">24x7 Customer Support</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <span className="font-black text-2xl text-slate-900 tracking-tight">Shop<span className="text-brand-600">Direct</span></span>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Supermarket &amp; Daily Essentials</p>
              </div>
            </button>
          </div>

          {/* Global Search Bar (Center) */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-6">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'products') {
                    setActiveTab('products');
                  }
                }}
                placeholder="Search for groceries, vegetables, pulses, dairy, oils..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'home'
                  ? 'bg-slate-100 text-brand-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'products'
                  ? 'bg-slate-100 text-brand-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              All Products
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-slate-100 text-brand-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Package className="w-4 h-4 text-slate-400" />
              My Orders
            </button>
          </nav>

          {/* User Account & Cart Button */}
          <div className="flex items-center gap-3">
            
            {/* User Account Switcher */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50">
              <User className="w-4 h-4 text-slate-400" />
              <select
                value={currentUser.id}
                onChange={(e) => onUserChange(Number(e.target.value))}
                className="text-xs font-semibold bg-transparent text-slate-700 focus:outline-none cursor-pointer"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setActiveTab('cart')}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all ${
                activeTab === 'cart'
                  ? 'bg-brand-700 text-white'
                  : 'bg-brand-600 text-white hover:bg-brand-700 hover:shadow-md'
              }`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-accent-500 text-white text-[9px] font-black flex items-center justify-center animate-bounce">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">My Cart</span>
              {cartItemCount > 0 && (
                <span className="bg-brand-800 px-1.5 py-0.5 rounded text-[10px]">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Mobile Search Input */}
        <div className="lg:hidden pb-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'products') {
                  setActiveTab('products');
                }
              }}
              placeholder="Search all items..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
            />
          </div>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
          <button
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold ${activeTab === 'home' ? 'bg-slate-100 text-brand-700' : 'text-slate-700'}`}
          >
            Home
          </button>
          <button
            onClick={() => { setActiveTab('products'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold ${activeTab === 'products' ? 'bg-slate-100 text-brand-700' : 'text-slate-700'}`}
          >
            All Products
          </button>
          <button
            onClick={() => { setActiveTab('orders'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold ${activeTab === 'orders' ? 'bg-slate-100 text-brand-700' : 'text-slate-700'}`}
          >
            My Orders
          </button>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Logged In Account:</span>
            <select
              value={currentUser.id}
              onChange={(e) => onUserChange(Number(e.target.value))}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded px-2 py-1"
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

    </header>
  );
}
