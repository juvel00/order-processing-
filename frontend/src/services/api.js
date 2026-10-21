const API_BASE = '/api';

async function handleResponse(response) {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody.message || 
      (errorBody.validationErrors ? Object.values(errorBody.validationErrors).join(', ') : null) || 
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }
  return response.json();
}

export const api = {
  // Products
  getProducts: () => fetch(`${API_BASE}/products`).then(handleResponse),
  getProductById: (id) => fetch(`${API_BASE}/products/${id}`).then(handleResponse),
  getProductsByCategory: (category) => fetch(`${API_BASE}/products/category/${category}`).then(handleResponse),
  getClearanceProducts: () => fetch(`${API_BASE}/products/clearance`).then(handleResponse),
  createProduct: (data) =>
    fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),

  // Cart
  getCart: (userId) => fetch(`${API_BASE}/cart/${userId}`).then(handleResponse),
  addToCart: (userId, productId, quantity) =>
    fetch(`${API_BASE}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId, quantity }),
    }).then(handleResponse),
  updateCartItem: (userId, productId, quantity) =>
    fetch(`${API_BASE}/cart/${userId}/items/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    }).then(handleResponse),
  removeCartItem: (userId, productId) =>
    fetch(`${API_BASE}/cart/${userId}/items/${productId}`, {
      method: 'DELETE',
    }).then(handleResponse),
  clearCart: (userId) =>
    fetch(`${API_BASE}/cart/${userId}`, {
      method: 'DELETE',
    }).then(handleResponse),

  // Orders
  checkout: (checkoutData) =>
    fetch(`${API_BASE}/orders/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checkoutData),
    }).then(handleResponse),
  getOrderByNumber: (orderNumber) => fetch(`${API_BASE}/orders/${orderNumber}`).then(handleResponse),
  getOrdersByUser: (userId) => fetch(`${API_BASE}/orders/user/${userId}`).then(handleResponse),
  getAllOrders: () => fetch(`${API_BASE}/orders`).then(handleResponse),

  // UN SDG Impact
  getImpactSummary: () => fetch(`${API_BASE}/impact/summary`).then(handleResponse),
};
