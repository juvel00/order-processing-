import React from 'react';
import { Ticket, Calendar, Clock, MapPin, XCircle, Eye, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export default function BookingsView({ bookings, loading, onSelectBookingForTicket, onReloadBookings, addToast }) {
  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking? Reserved seats will be released.')) {
      return;
    }

    try {
      await api.cancelBooking(bookingId);
      addToast({ type: 'success', message: 'Booking cancelled successfully. Seats have been released.' });
      onReloadBookings();
    } catch (err) {
      addToast({ type: 'error', message: err.message || 'Failed to cancel booking' });
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-semibold text-slate-400">Loading your reservations...</p>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="py-24 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-500 mx-auto mb-4">
          <Ticket className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Bookings Yet</h3>
        <p className="text-sm text-slate-400 mb-6">
          Explore movies currently showing in our auditoriums and reserve your favorite seats!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Your Cinema Reservations</h2>
          <p className="text-xs text-slate-400">View admission tickets or manage bookings</p>
        </div>
        <span className="px-3 py-1 rounded-xl text-xs font-bold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
          {bookings.length} Total Records
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {bookings.map((b) => {
          const isCancelled = b.status === 'CANCELLED';
          const formattedDate = b.showTime
            ? new Date(b.showTime).toLocaleDateString([], {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })
            : '';
          const formattedTime = b.showTime
            ? new Date(b.showTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : '';

          return (
            <div
              key={b.id}
              className={`p-5 rounded-3xl border transition duration-300 flex flex-col justify-between ${
                isCancelled
                  ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                  : 'bg-slate-900/90 border-slate-800 hover:border-indigo-500/40 shadow-xl'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
                      {b.bookingReference}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5 line-clamp-1">
                      {b.movieTitle}
                    </h3>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                      isCancelled
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                {/* Show details */}
                <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800/60 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{formattedDate} • {formattedTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{b.screenName}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
                    <span className="font-semibold text-slate-400">Seats:</span>
                    <span className="font-bold text-amber-300">{b.seatNumbers?.join(', ')}</span>
                  </div>
                </div>

                {/* Amount and payment details */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4 px-1">
                  <span>Method: <strong className="text-slate-200">{b.paymentMethod || 'UPI'}</strong></span>
                  <span>Total: <strong className="text-base text-amber-400">₹{Number(b.totalAmount).toFixed(2)}</strong></span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
                <button
                  onClick={() => onSelectBookingForTicket(b)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Ticket</span>
                </button>

                {!isCancelled && (
                  <button
                    onClick={() => handleCancel(b.id)}
                    className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 text-slate-400 border border-slate-700/60 transition flex items-center justify-center gap-1.5"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
