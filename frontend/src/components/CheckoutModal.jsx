import React, { useState } from 'react';
import {
  X,
  CreditCard,
  QrCode,
  Banknote,
  ShieldCheck,
  Lock,
  Truck,
  CheckCircle2
} from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  currentUser,
  onCheckoutSuccess,
  showToast,
}) {
  if (!isOpen || !cart) return null;

  const [deliveryAddress, setDeliveryAddress] = useState(
    currentUser?.address || 'Flat 402, Green Meadows Apartment, Indiranagar, Bengaluru - 560038'
  );
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  // Payment Form fields
  const [upiId, setUpiId] = useState('shopper@okhdfcbank');
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
      showToast(err.message || 'Payment processing failed. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-slide-in">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-xl text-slate-900">Secure Checkout</h3>
              <p className="text-xs text-slate-500">256-Bit Encrypted Payment Gateway</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Shipping Address */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Delivery Address
            </label>
            <textarea
              rows="2"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full text-xs p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50 focus:bg-white transition"
              placeholder="Flat/House no., building name, street, city, pin code..."
              required
            />
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Select Payment Method
            </label>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                  paymentMethod === 'UPI'
                    ? 'border-brand-600 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <QrCode className="w-5 h-5 text-brand-600" />
                <span className="text-xs font-bold">UPI</span>
                <span className="text-[10px] text-slate-500">GPay, PhonePe, Paytm</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('CREDIT_CARD')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                  paymentMethod === 'CREDIT_CARD'
                    ? 'border-brand-600 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-brand-600" />
                <span className="text-xs font-bold">Card</span>
                <span className="text-[10px] text-slate-500">Visa, Master, RuPay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('CASH_ON_DELIVERY')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                  paymentMethod === 'CASH_ON_DELIVERY'
                    ? 'border-brand-600 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Banknote className="w-5 h-5 text-brand-600" />
                <span className="text-xs font-bold">Cash</span>
                <span className="text-[10px] text-slate-500">Pay on Delivery</span>
              </button>
            </div>
          </div>

          {/* Conditional Payment Inputs */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            {paymentMethod === 'UPI' && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">UPI Virtual Payment Address (VPA)</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. mobile@upi or username@okhdfcbank"
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  required
                />
                <p className="text-[10px] text-slate-500">
                  You will receive a payment confirmation prompt on your UPI mobile app.
                </p>
              </div>
            )}

            {paymentMethod === 'CREDIT_CARD' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4111 2222 3333 4444"
                    maxLength={19}
                    className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Name on Card</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Cardholder Name"
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">CVV</label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      maxLength={4}
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'CASH_ON_DELIVERY' && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Delivery Instructions (Optional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Leave with security / Ring doorbell"
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <p className="text-[10px] text-slate-500">
                  Pay with exact cash or scan the delivery agent's QR code upon arrival.
                </p>
              </div>
            )}
          </div>

          {/* Amount Overview */}
          <div className="p-4 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500">Total Payable Amount</span>
              <p className="text-2xl font-black text-brand-900">
                ₹{Number(cart.totalAmount).toFixed(2)}
              </p>
            </div>
            <div className="text-right text-[11px] text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Free Delivery Included</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl bg-brand-600 text-white font-black text-sm shadow-lg shadow-brand-600/30 hover:bg-brand-700 transition disabled:opacity-50"
            >
              {submitting ? 'Authorizing Payment...' : `Pay ₹${Number(cart.totalAmount).toFixed(2)} & Place Order`}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
