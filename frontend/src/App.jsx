import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Orders from './components/Orders';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';
import { api } from './services/api';
import { ShoppingBag, ShieldCheck, Truck, Headphones, RotateCcw, ExternalLink } from 'lucide-react';

const SEED_USERS = [
  { id: 3, name: 'Aarav Sharma', role: 'Verified Customer', address: 'Flat 402, Green Meadows Apartment, Indiranagar, Bengaluru' },
  { id: 4, name: 'Priya Menon', role: 'Verified Customer', address: 'B-12 Orchid Residency, Koregaon Park, Pune' },
  { id: 1, name: 'Rohan Verma', role: 'Verified Customer', address: 'Plot #14, Dindori Valley, Nashik' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('tab') || 'home';
    }
    return 'home';
  });
  const [currentUser, setCurrentUser] = useState(SEED_USERS[0]);
  
  // Search & Category Filters state shared across views
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Data states
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const [orders, setOrders] = useState([]);

  // Loading states
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Modals
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('checkout') === 'true';
    }
    return false;
  });

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // ── Fetchers ──
  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      showToast('Could not load products: ' + err.message, 'error');
    } finally {
      setLoadingProducts(false);
    }
  }, [showToast]);

  const fetchCart = useCallback(async () => {
    setLoadingCart(true);
    try {
      const data = await api.getCart(currentUser.id);
      setCart(data);
    } catch (err) {
      // Cart might be empty initially
    } finally {
      setLoadingCart(false);
    }
  }, [currentUser.id]);

  const fetchOrders = useCallback(async () => {
    setLoadingOrders(true);
    try {
      const data = await api.getOrdersByUser(currentUser.id);
      setOrders(data);
    } catch (err) {
      showToast('Could not load orders: ' + err.message, 'error');
    } finally {
      setLoadingOrders(false);
    }
  }, [currentUser.id, showToast]);

  // Initial load
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [fetchProducts, fetchCart]);

  // Load orders when switching to orders tab or changing user
  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
    fetchCart();
  }, [activeTab, currentUser, fetchOrders, fetchCart]);

  // ── Handlers ──
  const handleUserChange = (userId) => {
    const user = SEED_USERS.find((u) => u.id === userId) || SEED_USERS[0];
    setCurrentUser(user);
    showToast(`Switched active profile to ${user.name}`, 'info');
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      const updatedCart = await api.addToCart(currentUser.id, productId, quantity);
      setCart(updatedCart);
      showToast(`Added ${quantity} item(s) to cart!`, 'success');
    } catch (err) {
      showToast(err.message || 'Failed to add item', 'error');
    }
  };

  const handleUpdateCartQuantity = async (productId, quantity) => {
    try {
      const updatedCart = await api.updateCartItem(currentUser.id, productId, quantity);
      setCart(updatedCart);
    } catch (err) {
      showToast(err.message || 'Could not update quantity', 'error');
    }
  };

  const handleRemoveCartItem = async (productId) => {
    try {
      const updatedCart = await api.removeCartItem(currentUser.id, productId);
      setCart(updatedCart);
      showToast('Item removed from cart', 'info');
    } catch (err) {
      showToast(err.message || 'Could not remove item', 'error');
    }
  };

  const handleClearCart = async () => {
    try {
      const updatedCart = await api.clearCart(currentUser.id);
      setCart(updatedCart);
      showToast('Cart cleared', 'info');
    } catch (err) {
      showToast(err.message || 'Could not clear cart', 'error');
    }
  };

  const handleCheckoutSuccess = async (checkoutData) => {
    const order = await api.checkout(checkoutData);
    showToast(`Order #${order.orderNumber} placed successfully!`, 'success');
    await fetchCart();
    await fetchOrders();
    await fetchProducts();
    setActiveTab('orders');
  };

  const handleCategorySelectFromHome = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveTab('products');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-brand-100 selection:text-brand-900">
      
      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartItemCount={cart?.totalItemCount || 0}
        currentUser={currentUser}
        users={SEED_USERS}
        onUserChange={handleUserChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Home
            onExplore={() => {
              setSelectedCategory('ALL');
              setActiveTab('products');
            }}
            onSelectCategory={handleCategorySelectFromHome}
          />
        )}

        {activeTab === 'products' && (
          <Products
            products={products}
            loading={loadingProducts}
            onAddToCart={handleAddToCart}
            onRefresh={fetchProducts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {activeTab === 'cart' && (
          <Cart
            cart={cart}
            loading={loadingCart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onProceedCheckout={() => setIsCheckoutOpen(true)}
            onBrowseProducts={() => {
              setSelectedCategory('ALL');
              setActiveTab('products');
            }}
          />
        )}

        {activeTab === 'orders' && (
          <Orders
            orders={orders}
            loading={loadingOrders}
            onBrowseProducts={() => {
              setSelectedCategory('ALL');
              setActiveTab('products');
            }}
          />
        )}
      </main>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        currentUser={currentUser}
        onCheckoutSuccess={handleCheckoutSuccess}
        showToast={showToast}
      />

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 mt-auto">
        {/* Value Props Row */}
        <div className="border-b border-slate-800/80 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Free Express Delivery</h5>
                  <p className="text-[11px] text-slate-400">On all orders above ₹299</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">100% Quality Assured</h5>
                  <p className="text-[11px] text-slate-400">Strict hygiene &amp; freshness checks</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Easy Replacements</h5>
                  <p className="text-[11px] text-slate-400">Instant refund or replacement</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">24/7 Dedicated Support</h5>
                  <p className="text-[11px] text-slate-400">Quick assistance on orders</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Brand Col */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-xl text-white">Shop<span className="text-brand-400">Direct</span></span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Your premier online destination for fresh produce, daily dairy, organic pantry staples, and kitchen essentials. Order today and experience seamless doorstep delivery.
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                <span>Secure Payments:</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-bold text-slate-300">UPI</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-bold text-slate-300">VISA</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-bold text-slate-300">Mastercard</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-bold text-slate-300">COD</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-3">Shop Categories</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button onClick={() => handleCategorySelectFromHome('VEGETABLES')} className="hover:text-white transition">
                    Fresh Vegetables
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategorySelectFromHome('FRUITS')} className="hover:text-white transition">
                    Seasonal Fruits
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategorySelectFromHome('GRAINS_PULSES')} className="hover:text-white transition">
                    Grains &amp; Pulses
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategorySelectFromHome('DAIRY')} className="hover:text-white transition">
                    Dairy &amp; Farm Eggs
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategorySelectFromHome('PROCESSED_GOODS')} className="hover:text-white transition">
                    Cooking Oils &amp; Pantry
                  </button>
                </li>
              </ul>
            </div>

            {/* Customer Care & Developer Docs */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-3">Customer Service</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => setActiveTab('orders')} className="hover:text-white transition">Track My Order</button></li>
                <li><span className="text-slate-400">Shipping Policy</span></li>
                <li><span className="text-slate-400">Terms &amp; Privacy</span></li>
                <li className="pt-2">
                  <a href="/swagger-ui.html" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-brand-400 hover:text-brand-300 transition">
                    <span>API Documentation</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>© 2026 ShopDirect Online Retail Pvt Ltd. All rights reserved.</span>
            <div className="flex items-center gap-4 text-xs">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Security</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}