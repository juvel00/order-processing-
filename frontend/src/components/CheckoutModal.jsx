import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Building2, ShieldCheck, Lock, Loader2, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export default function CheckoutModal({ bookingData, onClose, onBookingSuccess, addToast }) {
  const { showtime, selectedSeats, subtotal, convenienceFee, grandTotal } = bookingData;

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [upiId, setUpiId] = useState('rahul.sharma@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 8923 1102 9942');
  const [cardHolder, setCardHolder] = useState('Rahul Sharma');
  const [expiryMonth, setExpiryMonth] = useState('12');
  const [expiryYear, setExpiryYear] = useState('2028');
  const [cvv, setCvv] = useState('842');
  const [bankName, setBankName] = useState('HDFC Bank');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        showtimeId: showtime.id,
        customerId: 1, // Demo active customer
        showtimeSeatIds: selectedSeats.map((s) => s.showtimeSeatId),
        payment: {
          paymentMethod,
          ...(paymentMethod === 'UPI' && { upiId }),
          ...(paymentMethod === 'CARD' && {
            cardNumber: cardNumber.replace(/\s+/g, ''),
            cardHolderName: cardHolder,
            expiryMonth: parseInt(expiryMonth, 10),
            expiryYear: parseInt(expiryYear, 10),
            cvv,
          }),
          ...(paymentMethod === 'NET_BANKING' && { bankName }),
        },
      };

      const response = await api.createBooking(payload);
      addToast({
        type: 'success',
        message: `Booking confirmed! Reference: ${response.bookingReference}`,
      });
      onBookingSuccess(response);
    } catch (err) {
      addToast({
        type: 'error',
        message: err.message || 'Payment processing failed. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-slate-100 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-6 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Secure Checkout</h2>
              <p className="text-xs text-slate-400">Polymorphic Payment Strategy Pattern</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Reservation Summary */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-white text-base">{showtime.movieTitle}</h4>
                <p className="text-xs text-slate-400">
                  {showtime.screenName} • {new Date(showtime.showTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-400 block">Seats ({selectedSeats.length})</span>
                <span className="text-xs font-black text-amber-400">
                  {selectedSeats.map((s) => s.seatNumber).join(', ')}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between text-xs text-slate-300">
              <span>Tickets Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>Convenience Fee (₹25 × {selectedSeats.length})</span>
              <span>₹{convenienceFee.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between font-black text-base text-white">
              <span>Total Payable</span>
              <span className="text-amber-400 text-lg">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Strategy Pattern Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Select Payment Strategy:
            </label>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-2 ${
                  paymentMethod === 'UPI'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-850 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Smartphone className="w-5 h-5 text-indigo-400" />
                <span className="text-xs font-bold">UPI Transfer</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('CARD')}
                className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-2 ${
                  paymentMethod === 'CARD'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-850 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <CreditCard className="w-5 h-5 text-purple-400" />
                <span className="text-xs font-bold">Debit / Credit</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('NET_BANKING')}
                className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-2 ${
                  paymentMethod === 'NET_BANKING'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-850 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Building2 className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold">Net Banking</span>
              </button>
            </div>
          </div>

          {/* Method specific inputs */}
          <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-4">
            {paymentMethod === 'UPI' && (
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Virtual Payment Address (UPI ID)
                </label>
                <input
                  type="text"
                  required
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="username@bank"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Simulates Instant NPCI VPA authorization via UpiPaymentStrategy.
                </p>
              </div>
            )}

            {paymentMethod === 'CARD' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4532 0000 0000 0000"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Card Holder Name</label>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Expiry</label>
                      <input
                        type="text"
                        required
                        value={`${expiryMonth}/${expiryYear.slice(-2)}`}
                        onChange={(e) => {
                          const parts = e.target.value.split('/');
                          if (parts[0]) setExpiryMonth(parts[0]);
                          if (parts[1]) setExpiryYear('20' + parts[1]);
                        }}
                        placeholder="MM/YY"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-2 text-sm text-center text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength="4"
                        required
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-2 text-sm text-center text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'NET_BANKING' && (
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Select Institutional Gateway
                </label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="State Bank of India">State Bank of India (SBI)</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="Axis Bank">Axis Bank</option>
                  <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                </select>
              </div>
            )}
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-2xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-400 transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 active:scale-98"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Authorizing via Strategy Pattern...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Authorize & Pay ₹{grandTotal.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
