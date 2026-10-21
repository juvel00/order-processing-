import React, { useState } from 'react';
import { X, Sprout, PlusCircle, Calendar, ShieldCheck } from 'lucide-react';

const CATEGORIES = [
  'VEGETABLES',
  'FRUITS',
  'GRAINS_PULSES',
  'DAIRY',
  'HERBS_SPICES',
  'ORGANIC_HONEY',
  'PROCESSED_GOODS',
];

export default function AddProduceModal({ isOpen, onClose, onProduceAdded, showToast }) {
  if (!isOpen) return null;

  const [produceType, setProduceType] = useState('PERISHABLE');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('VEGETABLES');
  const [unit, setUnit] = useState('kg');
  const [basePrice, setBasePrice] = useState('60.00');
  const [stockQuantity, setStockQuantity] = useState(50);
  const [farmerId, setFarmerId] = useState(1);

  // Perishable fields
  const [harvestDate, setHarvestDate] = useState(new Date().toISOString().split('T')[0]);
  const [shelfLifeDays, setShelfLifeDays] = useState(7);
  const [coldStorageRequired, setColdStorageRequired] = useState(false);
  const [freshnessGrade, setFreshnessGrade] = useState('Grade A+ Fresh');

  // Processed fields
  const [processingMethod, setProcessingMethod] = useState('Cold Wood-Pressed');
  const [packagingDate, setPackagingDate] = useState(new Date().toISOString().split('T')[0]);
  const [shelfLifeMonths, setShelfLifeMonths] = useState(12);
  const [certificationStandard, setCertificationStandard] = useState('Jaivik Bharat Organic');

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Produce name is required', 'error');
      return;
    }

    const payload = {
      produceType,
      name,
      description,
      category,
      unit,
      basePrice: parseFloat(basePrice),
      stockQuantity: parseInt(stockQuantity),
      farmerId: parseInt(farmerId),
      // Perishable
      harvestDate: produceType === 'PERISHABLE' ? harvestDate : null,
      shelfLifeDays: produceType === 'PERISHABLE' ? parseInt(shelfLifeDays) : null,
      coldStorageRequired: produceType === 'PERISHABLE' ? coldStorageRequired : null,
      freshnessGrade: produceType === 'PERISHABLE' ? freshnessGrade : null,
      // Processed
      processingMethod: produceType === 'PROCESSED' ? processingMethod : null,
      packagingDate: produceType === 'PROCESSED' ? packagingDate : null,
      shelfLifeMonths: produceType === 'PROCESSED' ? parseInt(shelfLifeMonths) : null,
      certificationStandard: produceType === 'PROCESSED' ? certificationStandard : null,
    };

    setSubmitting(true);
    try {
      await onProduceAdded(payload);
      showToast(`Produce "${name}" listed successfully! 🎉`, 'success');
      onClose();
    } catch (err) {
      showToast(err.message || 'Failed to list produce', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-slide-in">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-farm-100 text-farm-700 flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-xl text-stone-900">List New Farm Produce</h3>
              <p className="text-xs text-stone-500">Direct producer listing with polymorphic classification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-xs">
          
          {/* Produce Classification (Inheritance) */}
          <div>
            <label className="block font-bold text-stone-700 uppercase tracking-wider mb-2">
              Produce Hierarchy (Inheritance Pillar)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setProduceType('PERISHABLE')}
                className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition ${
                  produceType === 'PERISHABLE'
                    ? 'border-farm-600 bg-farm-50 text-farm-900 ring-2 ring-farm-600/20'
                    : 'border-stone-200 text-stone-600'
                }`}
              >
                <span className="font-bold">Perishable Produce</span>
                <span className="text-[10px] text-stone-500">Fresh harvest, shelf-life tracked</span>
              </button>

              <button
                type="button"
                onClick={() => setProduceType('PROCESSED')}
                className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition ${
                  produceType === 'PROCESSED'
                    ? 'border-farm-600 bg-farm-50 text-farm-900 ring-2 ring-farm-600/20'
                    : 'border-stone-200 text-stone-600'
                }`}
              >
                <span className="font-bold">Processed / Artisanal</span>
                <span className="text-[10px] text-stone-500">Honey, cold-pressed oils, flours</span>
              </button>
            </div>
          </div>

          {/* Basic Fields */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Produce Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Organic Carrots, Cold Pressed Mustard Oil"
                className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-farm-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Description</label>
              <textarea
                rows="2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Cultivation methods, freshness notes, pesticide-free certifications..."
                className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-farm-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-farm-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Measurement Unit</label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="kg, bunch, dozen, 500g jar"
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-farm-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Base Price (₹ per unit)</label>
                <input
                  type="number"
                  step="0.01"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-farm-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Initial Stock Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-farm-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Listing Producer</label>
              <select
                value={farmerId}
                onChange={(e) => setFarmerId(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-white"
              >
                <option value="1">Ramesh Patel (Patel Organic Agro-Farms, Nashik)</option>
                <option value="2">Sunita Devi (Himalayan Bio-Organics, Almora)</option>
              </select>
            </div>
          </div>

          {/* Subclass-Specific Fields */}
          {produceType === 'PERISHABLE' ? (
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <span className="font-bold text-emerald-900 block">Perishable Produce Attributes</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 mb-1">Harvest Date</label>
                  <input
                    type="date"
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1">Shelf Life (Days)</label>
                  <input
                    type="number"
                    min="1"
                    value={shelfLifeDays}
                    onChange={(e) => setShelfLifeDays(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="coldStorage"
                  checked={coldStorageRequired}
                  onChange={(e) => setColdStorageRequired(e.target.checked)}
                  className="rounded text-farm-600"
                />
                <label htmlFor="coldStorage" className="text-stone-700">Cold storage chain required</label>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <span className="font-bold text-amber-900 block">Processed Produce Attributes</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 mb-1">Processing Method</label>
                  <input
                    type="text"
                    value={processingMethod}
                    onChange={(e) => setProcessingMethod(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1">Shelf Life (Months)</label>
                  <input
                    type="number"
                    min="1"
                    value={shelfLifeMonths}
                    onChange={(e) => setShelfLifeMonths(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-2xl bg-farm-600 text-white font-bold text-sm shadow-md hover:bg-farm-700 transition disabled:opacity-50"
          >
            {submitting ? 'Registering Produce...' : 'Publish Listing to Marketplace'}
          </button>

        </form>

      </div>
    </div>
  );
}
