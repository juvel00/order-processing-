import React from 'react';
import { X, Printer, CheckCircle, Ticket, MapPin, Clock, Calendar, QrCode } from 'lucide-react';

export default function TicketModal({ booking, onClose }) {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = booking.showTime
    ? new Date(booking.showTime).toLocaleDateString([], {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const formattedTime = booking.showTime
    ? new Date(booking.showTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-slate-100 overflow-hidden my-auto">
        
        {/* Modal close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Ticket Area */}
        <div className="p-6 sm:p-8" id="printable-ticket">
          
          {/* Header Banner */}
          <div className="text-center pb-6 border-b border-dashed border-slate-700">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/20">
              <Ticket className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-amber-400">
              Official Cinema Admission Pass
            </span>
            <h2 className="text-2xl font-black text-white mt-1">
              {booking.movieTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Ref: <span className="font-mono font-bold text-indigo-400">{booking.bookingReference}</span>
            </p>
          </div>

          {/* Ticket Information Grid */}
          <div className="py-6 space-y-4">
            
            <div className="grid grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Date</span>
                <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  {formattedDate}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Showtime</span>
                <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  {formattedTime}
                </span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-800/80">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Auditorium / Screen</span>
                <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {booking.screenName}
                </span>
              </div>
            </div>

            {/* Reserved Seats List */}
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
                Reserved Seats ({booking.seatNumbers?.length || 0})
              </span>
              <div className="flex flex-wrap gap-2">
                {booking.seatNumbers?.map((seatNum, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-black text-sm flex items-center gap-1.5"
                  >
                    <span>Seat {seatNum}</span>
                    {booking.seatTiers?.[idx] && (
                      <span className="text-[10px] opacity-75 font-semibold">({booking.seatTiers[idx]})</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction metadata */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <div>
                <span>Paid via: </span>
                <span className="font-semibold text-slate-200">{booking.paymentMethod}</span>
              </div>
              <div>
                <span>Amount: </span>
                <span className="text-base font-black text-amber-400">₹{Number(booking.totalAmount).toFixed(2)}</span>
              </div>
            </div>

            {/* Barcode / Scan Box */}
            <div className="pt-4 border-t border-dashed border-slate-700 text-center">
              <div className="h-12 w-4/5 mx-auto bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-around px-4 opacity-85">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-8 ${i % 3 === 0 ? 'w-1 bg-white' : i % 2 === 0 ? 'w-0.5 bg-slate-300' : 'w-1.5 bg-slate-100'}`}
                  />
                ))}
              </div>
              <p className="text-[10px] tracking-widest text-slate-500 font-mono mt-1.5">
                *{booking.bookingReference}*
              </p>
            </div>

          </div>

          {/* Action buttons */}
          <div className="pt-2 flex gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 rounded-2xl font-bold bg-slate-800 hover:bg-slate-700 text-white transition flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Ticket</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-lg shadow-indigo-600/30"
            >
              Done
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
