import React, { useState } from 'react';
import {
  X,
  CreditCard,
  QrCode,
  Banknote,
  ShieldCheck,
  CheckCircle,
  Truck,
  Sparkles,
  Lock
} from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  currentUser,
  onCheckoutSuccess,
  showToast,
}) {
  if (!isOpen) return null;

  const [deliveryAddress, setDeliveryAddress] = useState(
    currentUser?.address || 'Flat 402, Green Meadows, Indiranagar, Bengaluru'
  );
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  // Form fields
  const [upiId, setUpiId] = useState('consumer@okaxis');
  const [cardNumber, setCardNumber] = useState('4111222233334444');
  const [cardHolder, setCardHolder] = useState(currentUser?.name || 'Aarav Sharma');
  const [expiryMonth, setExpiryMonth] = useState('12');
  const [expiryYear, setExpiryYear] = useState('2028');
  const [cvv, setCvv] = useState('123');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!deliveryAddress.trim()) {
      showToast('Delivery address is required', 'error');
      return;
    }

    const paymentRequest = {
      paymentMethod,
      upiId: paymentMethod === 'UPI' ? upiId : null,
      cardNumber: paymentMethod.includes('CARD') ? cardNumber : null,
      cardHolderName: paymentMethod.includes('CARD') ? cardHolder : null,
      expiryMonth: paymentMethod.includes('CARD') ? parseInt(expiryMonth) : null,
      expiryYear: paymentMethod.includes('CARD') ? parseInt(expiryYear) : null,
      cvv: paymentMethod.includes('CARD') ? cvv : null,
      notes: paymentMethod === 'CASH_ON_DELIVERY' ? notes : null,
    };

    const checkoutData = {
      userId: currentUser.id,
      deliveryAddress,
      payment: paymentRequest,
    };

    setSubmitting(true);
    try {
      await onCheckoutSuccess(checkoutData);
      onClose();
    } catch (err) {
      showToast(err.message || 'Payment execution failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-slide-in">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-farm-100 text-farm-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-xl text-stone-900">Direct Farm Checkout</h3>
              <p className="text-xs text-stone-500">90% Direct Producer Payout Guaranteed</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Delivery Address */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Delivery Destination
            </label>
            <textarea
              rows="2"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full text-sm p-3.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-farm-500 bg-stone-50 focus:bg-white transition"
              placeholder="Full street address, apartment number, city and pincode..."
              required
            />
          </div>

          {/* Payment Method Tabs (Polymorphism) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Payment Mechanism (OOP Strategy Pattern)
              </label>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                Direct Settlement
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                  paymentMethod === 'UPI'
                    ? 'border-farm-600 bg-farm-50 text-farm-900 ring-2 ring-farm-600/20'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <QrCode className="w-5 h-5 text-farm-600" />
                <span className="text-xs font-bold">UPI / VPA</span>
                <span className="text-[10px] text-stone-500">Instant to Farmer</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('CREDIT_CARD')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                  paymentMethod === 'CREDIT_CARD'
                    ? 'border-farm-600 bg-farm-50 text-farm-900 ring-2 ring-farm-600/20'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-farm-600" />
                <span className="text-xs font-bold">Credit/Debit</span>
                <span className="text-[10px] text-stone-500">Masked Security</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('CASH_ON_DELIVERY')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                  paymentMethod === 'CASH_ON_DELIVERY'
                    ? 'border-farm-600 bg-farm-50 text-farm-900 ring-2 ring-farm-600/20'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <Banknote className="w-5 h-5 text-farm-600" />
                <span className="text-xs font-bold">Doorstep Cash</span>
                <span className="text-[10px] text-stone-500">Pay on Harvest Arrival</span>
              </button>
            </div>
          </div>

          {/* Conditional Payment Strategy Inputs */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            {paymentMethod === 'UPI' && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-stone-700">Farmer VPA / UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. farmer@okaxis"
                  className="w-full text-sm p-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-farm-500"
                  required
                />
                <p className="text-[11px] text-stone-500">
                  Simulates instant direct UPI transaction to the producer's authenticated bank VPA.
                </p>
              </div>
            )}

            {paymentMethod === 'CREDIT_CARD' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Card Number (16 Digits)</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4111 2222 3333 4444"
                    maxLength={19}
                    className="w-full text-sm p-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-farm-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Name on card"
                      className="w-full text-sm p-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-farm-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">CVV</label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      maxLength={4}
                      className="w-full text-sm p-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-farm-500"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'CASH_ON_DELIVERY' && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-stone-700">Delivery Notes for Farmer</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Ring doorbell, keep exact change ready"
                  className="w-full text-sm p-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-farm-500"
                />
                <p className="text-[11px] text-amber-700 font-medium">
                  Doorstep payment will be verified directly by the farm delivery agent. Zero transaction fee.
                </p>
              </div>
            )}
          </div>

          {/* Amount Overview */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-stone-500">Payable Amount</span>
              <p className="text-2xl font-black text-stone-900">
                ₹{Number(cart.totalAmount).toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-emerald-700 font-bold">Direct Farmer Payout</span>
              <p className="text-lg font-extrabold text-emerald-800">
                ₹{Number(cart.directFarmerShare).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl bg-farm-600 text-white font-extrabold text-base shadow-lg shadow-farm-600/30 hover:bg-farm-700 transition disabled:opacity-50"
            >
              {submitting ? 'Confirming Order & Authorizing...' : `Pay ₹${Number(cart.totalAmount).toFixed(2)} & Place Order`}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
