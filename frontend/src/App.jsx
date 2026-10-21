import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Orders from './components/Orders';
import ImpactDashboard from './components/ImpactDashboard';
import CheckoutModal from './components/CheckoutModal';
import AddProduceModal from './components/AddProduceModal';
import Toast from './components/Toast';
import { api } from './services/api';
import { Sprout, ExternalLink, Heart, ShieldCheck } from 'lucide-react';

const SEED_USERS = [
  { id: 3, name: 'Aarav Sharma', role: 'Consumer', address: 'Flat 402, Green Meadows Apartment, Indiranagar, Bengaluru' },
  { id: 4, name: 'Priya Menon', role: 'Consumer', address: 'B-12 Orchid Residency, Koregaon Park, Pune' },
  { id: 1, name: 'Ramesh Patel', role: 'Farmer', address: 'Farm Plot #14, Dindori Valley, Nashik' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentUser, setCurrentUser] = useState(SEED_USERS[0]);
  
  // Data states
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const [orders, setOrders] = useState([]);
  const [impactMetrics, setImpactMetrics] = useState(null);

  // Loading states
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingImpact, setLoadingImpact] = useState(false);

  // Modals
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAddProduceOpen, setIsAddProduceOpen] = useState(false);

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
      // Cart might be empty
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

  const fetchImpact = useCallback(async () => {
    setLoadingImpact(true);
    try {
      const data = await api.getImpactSummary();
      setImpactMetrics(data);
    } catch (err) {
      // silent
    } finally {
      setLoadingImpact(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchProducts();
    fetchCart();
    fetchImpact();
  }, [fetchProducts, fetchCart, fetchImpact]);

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
    showToast(`Switched active profile to ${user.name} (${user.role})`, 'info');
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      const updatedCart = await api.addToCart(currentUser.id, productId, quantity);
      setCart(updatedCart);
      showToast(`Added ${quantity} item(s) to basket!`, 'success');
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
      showToast('Item removed from basket', 'info');
    } catch (err) {
      showToast(err.message || 'Could not remove item', 'error');
    }
  };

  const handleClearCart = async () => {
    try {
      const updatedCart = await api.clearCart(currentUser.id);
      setCart(updatedCart);
      showToast('Basket cleared', 'info');
    } catch (err) {
      showToast(err.message || 'Could not clear basket', 'error');
    }
  };

  const handleCheckoutSuccess = async (checkoutData) => {
    const order = await api.checkout(checkoutData);
    showToast(`Order #${order.orderNumber} confirmed! Payout credited to farmer.`, 'success');
    // Refresh cart, orders, and metrics
    await fetchCart();
    await fetchOrders();
    await fetchImpact();
    await fetchProducts();
    setActiveTab('orders');
  };

  const handleProduceAdded = async (produceData) => {
    await api.createProduct(produceData);
    await fetchProducts();
    await fetchImpact();
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-farm-100 selection:text-farm-900">
      
      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartItemCount={cart?.totalItemCount || 0}
        currentUser={currentUser}
        users={SEED_USERS}
        onUserChange={handleUserChange}
        onOpenAddProduce={() => setIsAddProduceOpen(true)}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Home
            onExplore={() => setActiveTab('products')}
            impactMetrics={impactMetrics}
          />
        )}

        {activeTab === 'products' && (
          <Products
            products={products}
            loading={loadingProducts}
            onAddToCart={handleAddToCart}
            onRefresh={fetchProducts}
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
            onBrowseMarketplace={() => setActiveTab('products')}
          />
        )}

        {activeTab === 'orders' && (
          <Orders
            orders={orders}
            loading={loadingOrders}
            onBrowseMarketplace={() => setActiveTab('products')}
          />
        )}

        {activeTab === 'impact' && (
          <ImpactDashboard
            metrics={impactMetrics}
            loading={loadingImpact}
            onRefresh={fetchImpact}
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

      {/* Add Produce Listing Modal */}
      <AddProduceModal
        isOpen={isAddProduceOpen}
        onClose={() => setIsAddProduceOpen(false)}
        onProduceAdded={handleProduceAdded}
        showToast={showToast}
      />

      {/* ── FOOTER ── */}
      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Brand Col */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-farm-600 flex items-center justify-center text-white">
                  <Sprout className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-xl text-white">Farm<span className="text-farm-400">Direct</span></span>
              </div>
              <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
                Direct Producer-to-Consumer platform eliminating intermediate broker markups, guaranteeing 90% farmer payouts, and halting post-harvest produce waste through algorithmic freshness discounts.
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span>Java 21</span>
                <span>•</span>
                <span>Spring Boot 3.4.2</span>
                <span>•</span>
                <span>React 18 + Tailwind CSS</span>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-3">Navigation</h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-white transition">Home Overview</button></li>
                <li><button onClick={() => setActiveTab('products')} className="hover:text-white transition">Produce Market</button></li>
                <li><button onClick={() => setActiveTab('cart')} className="hover:text-white transition">My Basket</button></li>
                <li><button onClick={() => setActiveTab('orders')} className="hover:text-white transition">Orders &amp; Receipts</button></li>
                <li><button onClick={() => setActiveTab('impact')} className="hover:text-white transition">UN SDG Analytics</button></li>
              </ul>
            </div>

            {/* Academic & Developer */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-3">Developer Endpoints</h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li>
                  <a href="/swagger-ui.html" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition">
                    <span>Swagger UI (API Docs)</span>
                    <ExternalLink className="w-3 h-3 text-stone-500" />
                  </a>
                </li>
                <li>
                  <a href="/h2-console" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition">
                    <span>H2 Database Console</span>
                    <ExternalLink className="w-3 h-3 text-stone-500" />
                  </a>
                </li>
                <li>
                  <a href="/v3/api-docs" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition">
                    <span>OpenAPI JSON Schema</span>
                    <ExternalLink className="w-3 h-3 text-stone-500" />
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <span>© 2026 FarmDirect — Direct Producer-to-Consumer Platform. All rights reserved.</span>
            <div className="flex items-center gap-1">
              <span>Aligned with UN Sustainable Development Goals 2 &amp; 12</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
