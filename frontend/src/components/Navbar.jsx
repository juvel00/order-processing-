import React, { useState } from 'react';
import {
  Sprout,
  ShoppingBag,
  PackageCheck,
  TrendingUp,
  PlusCircle,
  User,
  Menu,
  X,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  cartItemCount,
  currentUser,
  users,
  onUserChange,
  onOpenAddProduce,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Sprout },
    { id: 'products', label: 'Produce Market', icon: ShoppingBag },
    { id: 'cart', label: 'Basket', icon: ShoppingBag, badge: cartItemCount },
    { id: 'orders', label: 'Orders & Receipts', icon: PackageCheck },
    { id: 'impact', label: 'SDG Impact', icon: TrendingUp },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-farm-700 to-farm-500 flex items-center justify-center text-white shadow-md shadow-farm-600/20 group-hover:scale-105 transition-transform duration-200">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl text-stone-900 tracking-tight">Farm<span className="text-farm-600">Direct</span></span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Direct P2C
                  </span>
                </div>
                <p className="text-xs text-stone-500">Fair Farmer Earnings • Zero Waste</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-farm-50 text-farm-700 font-semibold shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-farm-600' : 'text-stone-400'}`} />
                  {item.label}
                  {item.badge > 0 && (
                    <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-farm-600 text-white rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions & User Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            {/* List Produce Button for Farmer */}
            <button
              onClick={onOpenAddProduce}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition shadow-sm"
              title="Add farm produce listing"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>List Farm Produce</span>
            </button>

            {/* User Switcher */}
            <div className="flex items-center gap-2 pl-3 border-l border-stone-200">
              <User className="w-4 h-4 text-stone-400" />
              <select
                value={currentUser.id}
                onChange={(e) => onUserChange(Number(e.target.value))}
                className="text-xs font-medium bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-700 focus:outline-none focus:ring-2 focus:ring-farm-500"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setActiveTab('cart')}
              className="relative p-2 text-stone-700"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-farm-600 text-white rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-farm-50 text-farm-700 font-bold' : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  {item.label}
                </div>
                {item.badge > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-farm-600 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAddProduce();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 text-white text-xs font-semibold"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              List Farm Produce
            </button>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-stone-500 font-medium">Active Profile:</span>
              <select
                value={currentUser.id}
                onChange={(e) => onUserChange(Number(e.target.value))}
                className="text-xs bg-stone-50 border border-stone-200 rounded-lg px-2 py-1"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
