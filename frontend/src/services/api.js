const API_BASE = '/api';

async function handleResponse(response) {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody.message ||
      (errorBody.errors ? Object.values(errorBody.errors).join(', ') : null) ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }
  return response.json();
}

export const api = {
  // Movies
  getMovies: (genre, search) => {
    const params = new URLSearchParams();
    if (genre) params.append('genre', genre);
    if (search) params.append('search', search);
    const query = params.toString() ? `?${params.toString()}` : '';
    return fetch(`${API_BASE}/movies${query}`).then(handleResponse);
  },
  getMovieById: (id) => fetch(`${API_BASE}/movies/${id}`).then(handleResponse),

  // Showtimes & Interactive Seat Map
  getShowtimes: () => fetch(`${API_BASE}/showtimes`).then(handleResponse),
  getShowtimesByMovie: (movieId) => fetch(`${API_BASE}/showtimes/movie/${movieId}`).then(handleResponse),
  getShowtimeDetails: (showtimeId) => fetch(`${API_BASE}/showtimes/${showtimeId}`).then(handleResponse),

  // Bookings & Polymorphic Checkout
  createBooking: (bookingData) =>
    fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    }).then(handleResponse),
  getBookingById: (id) => fetch(`${API_BASE}/bookings/${id}`).then(handleResponse),
  getBookingByReference: (ref) => fetch(`${API_BASE}/bookings/reference/${ref}`).then(handleResponse),
  getBookingsByCustomer: (customerId = 1) => fetch(`${API_BASE}/bookings/customer/${customerId}`).then(handleResponse),
  getAllBookings: () => fetch(`${API_BASE}/bookings`).then(handleResponse),
  cancelBooking: (id) =>
    fetch(`${API_BASE}/bookings/${id}/cancel`, {
      method: 'PUT',
    }).then(handleResponse),

  // Analytics
  getStats: () => fetch(`${API_BASE}/stats`).then(handleResponse),
};
