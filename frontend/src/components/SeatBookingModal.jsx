import React, { useState, useEffect } from 'react';
import { X, Clock, Calendar, Volume2, ShieldCheck, Armchair, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function SeatBookingModal({ movie, onClose, onProceedToCheckout, addToast }) {
  const [showtimes, setShowtimes] = useState([]);
  const [selectedShowtimeId, setSelectedShowtimeId] = useState(null);
  const [showtimeDetails, setShowtimeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);

  // 1. Fetch showtimes for this movie
  useEffect(() => {
    if (!movie?.id) return;
    setLoading(true);
    api.getShowtimesByMovie(movie.id)
      .then((data) => {
        setShowtimes(data);
        if (data.length > 0) {
          setSelectedShowtimeId(data[0].id);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        addToast({ type: 'error', message: err.message || 'Failed to load showtimes' });
        setLoading(false);
      });
  }, [movie]);

  // 2. Fetch seat layout when showtime changes
  useEffect(() => {
    if (!selectedShowtimeId) return;
    setLoading(true);
    setSelectedSeatIds([]); // clear selected seats on showtime switch
    api.getShowtimeDetails(selectedShowtimeId)
      .then((details) => {
        setShowtimeDetails(details);
        setLoading(false);
      })
      .catch((err) => {
        addToast({ type: 'error', message: err.message || 'Failed to load seat layout' });
        setLoading(false);
      });
  }, [selectedShowtimeId]);

  // Toggle seat selection
  const handleSeatClick = (seat) => {
    if (seat.status === 'BOOKED') return;

    if (selectedSeatIds.includes(seat.showtimeSeatId)) {
      setSelectedSeatIds(selectedSeatIds.filter((id) => id !== seat.showtimeSeatId));
    } else {
      if (selectedSeatIds.length >= 8) {
        addToast({ type: 'warning', message: 'Maximum 8 seats can be booked in a single transaction' });
        return;
      }
      setSelectedSeatIds([...selectedSeatIds, seat.showtimeSeatId]);
    }
  };

  // Calculate pricing breakdown
  const selectedSeatsList = showtimeDetails?.seats?.filter((s) => selectedSeatIds.includes(s.showtimeSeatId)) || [];
  const subtotal = selectedSeatsList.reduce((sum, s) => sum + Number(s.price), 0);
  const convenienceFee = selectedSeatsList.length * 25.0; // flat 25 per ticket
  const grandTotal = subtotal + convenienceFee;

  // Group seats by row
  const rowsMap = {};
  if (showtimeDetails?.seats) {
    showtimeDetails.seats.forEach((seat) => {
      if (!rowsMap[seat.rowName]) {
        rowsMap[seat.rowName] = [];
      }
      rowsMap[seat.rowName].push(seat);
    });
  }

  const handleCheckoutClick = () => {
    if (selectedSeatIds.length === 0) {
      addToast({ type: 'warning', message: 'Please select at least one seat to continue.' });
      return;
    }

    onProceedToCheckout({
      showtime: showtimeDetails,
      selectedSeats: selectedSeatsList,
      subtotal,
      convenienceFee,
      grandTotal,
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const date = new Date(timeStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timeStr) => {
    if (!timeStr) return '';
    const date = new Date(timeStr);
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-slate-100 overflow-hidden my-auto">
        
        {/* Header bar */}
        <div className="p-6 bg-slate-950/70 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-14 h-20 object-cover rounded-xl shadow-md border border-slate-800 hidden sm:block"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 border border-slate-700 text-indigo-300">
                  {movie.rating}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {movie.durationMinutes} mins • {movie.language}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {movie.title}
              </h2>
              <p className="text-xs text-indigo-400 font-medium">
                {showtimeDetails ? `${showtimeDetails.screenName} (${showtimeDetails.soundSystem})` : 'Select Showtime'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Showtime selector pills */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800/80 flex items-center gap-3 overflow-x-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0">
            Available Shows:
          </span>
          {showtimes.map((st) => (
            <button
              key={st.id}
              onClick={() => setSelectedShowtimeId(st.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedShowtimeId === st.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(st.showTime)}</span>
              <span className="opacity-75">({st.screenName.split('-')[0].trim()})</span>
              {st.primeTime && (
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-400 text-slate-950 font-black">
                  PRIME
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Seat layout and screen map */}
        <div className="p-6 overflow-x-auto">
          {loading ? (
            <div className="py-24 text-center">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-400">Loading live theater seating matrix...</p>
            </div>
          ) : (
            <div className="min-w-[620px] flex flex-col items-center">
              
              {/* Curved Cinema Screen */}
              <div className="w-4/5 max-w-xl mx-auto mb-10 text-center">
                <div className="h-2.5 w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full screen-glow opacity-80" />
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400 mt-2">
                  Cinema Screen — All Eyes Front
                </p>
              </div>

              {/* Seat Matrix */}
              <div className="space-y-3.5 w-full max-w-2xl">
                {Object.keys(rowsMap).sort().map((rowName) => {
                  const seatsInRow = rowsMap[rowName];
                  const sampleSeat = seatsInRow[0];
                  const tier = sampleSeat.seatTier;

                  let tierColorClass = 'text-slate-400';
                  let tierLabel = 'Standard';
                  if (tier === 'PREMIUM') {
                    tierColorClass = 'text-indigo-400';
                    tierLabel = 'Premium';
                  } else if (tier === 'VIP_RECLINER') {
                    tierColorClass = 'text-amber-400';
                    tierLabel = 'VIP Recliner';
                  }

                  return (
                    <div key={rowName} className="flex items-center gap-3">
                      {/* Row Label */}
                      <span className="w-6 text-center font-black text-xs text-slate-400">
                        {rowName}
                      </span>

                      {/* Tier Pill */}
                      <span className={`w-24 text-[10px] font-bold uppercase tracking-wider ${tierColorClass} hidden sm:block text-right pr-2`}>
                        {tierLabel}
                      </span>

                      {/* Seats in this row */}
                      <div className="flex-1 flex items-center justify-center gap-2">
                        {seatsInRow.map((seat) => {
                          const isSelected = selectedSeatIds.includes(seat.showtimeSeatId);
                          const isBooked = seat.status === 'BOOKED';

                          let buttonStyle = 'bg-slate-800 text-slate-200 border-slate-700 hover:border-indigo-400 hover:bg-slate-700';

                          if (isBooked) {
                            buttonStyle = 'bg-slate-900/40 text-slate-600 border-slate-800 cursor-not-allowed';
                          } else if (isSelected) {
                            buttonStyle = 'bg-amber-400 text-slate-950 font-black border-amber-300 ring-4 ring-amber-400/20 scale-105';
                          } else {
                            if (seat.seatTier === 'VIP_RECLINER') {
                              buttonStyle = 'bg-amber-950/30 text-amber-300 border-amber-500/40 hover:border-amber-400 hover:bg-amber-900/40';
                            } else if (seat.seatTier === 'PREMIUM') {
                              buttonStyle = 'bg-indigo-950/30 text-indigo-300 border-indigo-500/40 hover:border-indigo-400 hover:bg-indigo-900/40';
                            }
                          }

                          return (
                            <button
                              key={seat.showtimeSeatId}
                              disabled={isBooked}
                              onClick={() => handleSeatClick(seat)}
                              title={`${seat.seatNumber} (${seat.seatTier}) - ₹${seat.price} | ${seat.amenityDescription}`}
                              className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg border text-xs font-bold transition flex items-center justify-center ${buttonStyle}`}
                            >
                              {isBooked ? '✕' : seat.columnNumber}
                            </button>
                          );
                        })}
                      </div>

                      {/* Row right label */}
                      <span className="w-6 text-center font-black text-xs text-slate-400">
                        {rowName}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-slate-800 border border-slate-600" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center">✓</span>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded bg-slate-900/40 border border-slate-800 text-slate-600 text-[10px] flex items-center justify-center">✕</span>
                  <span>Booked</span>
                </div>
                <div className="flex items-center gap-2 pl-4 border-l border-slate-800">
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-400" />
                  <span>Standard (₹200+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-indigo-500" />
                  <span>Premium (₹270+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-400" />
                  <span>VIP Recliner (₹410+)</span>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Bottom Checkout Action Strip */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Selected Seats ({selectedSeatsList.length}):
              </span>
              <div className="flex flex-wrap gap-1">
                {selectedSeatsList.map((s) => (
                  <span key={s.showtimeSeatId} className="px-2 py-0.5 rounded text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {s.seatNumber}
                  </span>
                ))}
                {selectedSeatsList.length === 0 && (
                  <span className="text-xs text-slate-500 italic">None selected</span>
                )}
              </div>
            </div>

            {selectedSeatsList.length > 0 && (
              <p className="text-xs text-slate-400 mt-1">
                Subtotal: <span className="text-white font-semibold">₹{subtotal.toFixed(2)}</span> + Convenience fee: <span className="text-white font-semibold">₹{convenienceFee.toFixed(2)}</span>
              </p>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Grand Total</span>
              <span className="text-2xl font-black text-amber-400">₹{grandTotal.toFixed(2)}</span>
            </div>

            <button
              disabled={selectedSeatsList.length === 0}
              onClick={handleCheckoutClick}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold shadow-lg transition active:scale-95 ${
                selectedSeatsList.length > 0
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Continue to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
