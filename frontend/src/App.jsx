import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import SeatBookingModal from './components/SeatBookingModal';
import CheckoutModal from './components/CheckoutModal';
import TicketModal from './components/TicketModal';
import BookingsView from './components/BookingsView';
import AnalyticsView from './components/AnalyticsView';
import Toast from './components/Toast';
import { api } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('movies');
  const [searchQuery, setSearchQuery] = useState('');

  // Data states
  const [movies, setMovies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(false);

  // Modals
  const [selectedMovieForBooking, setSelectedMovieForBooking] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);
  const [selectedBookingForTicket, setSelectedBookingForTicket] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = 'info', message }) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load Movies
  const fetchMovies = useCallback(() => {
    setLoadingMovies(true);
    api.getMovies()
      .then((data) => {
        setMovies(data);
        setLoadingMovies(false);
      })
      .catch((err) => {
        addToast({ type: 'error', message: err.message || 'Failed to load movies' });
        setLoadingMovies(false);
      });
  }, [addToast]);

  // Load Bookings for default user
  const fetchBookings = useCallback(() => {
    setLoadingBookings(true);
    api.getBookingsByCustomer(1)
      .then((data) => {
        setBookings(data);
        setLoadingBookings(false);
      })
      .catch((err) => {
        addToast({ type: 'error', message: err.message || 'Failed to load bookings' });
        setLoadingBookings(false);
      });
  }, [addToast]);

  useEffect(() => {
    fetchMovies();
    fetchBookings();
  }, [fetchMovies, fetchBookings]);

  // When checkout succeeds
  const handleBookingSuccess = (newBooking) => {
    setCheckoutData(null);
    setSelectedMovieForBooking(null);
    fetchBookings();
    setSelectedBookingForTicket(newBooking);
  };

  return (
    <div className="min-h-screen bg-slate-950 cinema-bg text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        bookingsCount={bookings.filter((b) => b.status === 'CONFIRMED').length}
      />

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'movies' && (
          <MovieList
            movies={movies}
            loading={loadingMovies}
            searchQuery={searchQuery}
            onSelectMovie={(movie) => setSelectedMovieForBooking(movie)}
          />
        )}

        {activeTab === 'bookings' && (
          <BookingsView
            bookings={bookings}
            loading={loadingBookings}
            onSelectBookingForTicket={(b) => setSelectedBookingForTicket(b)}
            onReloadBookings={fetchBookings}
            addToast={addToast}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView addToast={addToast} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-400">
            CineReserve — Enterprise Cinema Theater Seat Booking System
          </p>
          <p>
            Demonstrating Object-Oriented Programming (OOP) in Java 21 • Encapsulation • Multi-tier Inheritance • Polymorphism & Strategy Pattern • Layered Abstraction
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-2">
            <a href="/swagger-ui.html" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition underline">
              OpenAPI Swagger UI
            </a>
            <span>•</span>
            <a href="/h2-console" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition underline">
              H2 Database Console
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedMovieForBooking && (
        <SeatBookingModal
          movie={selectedMovieForBooking}
          onClose={() => setSelectedMovieForBooking(null)}
          onProceedToCheckout={(data) => {
            setCheckoutData(data);
          }}
          addToast={addToast}
        />
      )}

      {checkoutData && (
        <CheckoutModal
          bookingData={checkoutData}
          onClose={() => setCheckoutData(null)}
          onBookingSuccess={handleBookingSuccess}
          addToast={addToast}
        />
      )}

      {selectedBookingForTicket && (
        <TicketModal
          booking={selectedBookingForTicket}
          onClose={() => setSelectedBookingForTicket(null)}
        />
      )}

      {/* Floating Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
