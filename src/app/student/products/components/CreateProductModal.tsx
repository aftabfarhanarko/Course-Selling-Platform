import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useStudentCreateProductMutation } from '@/lib/api/student/products';

export default function CreateProductModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({ botName: '', country: '', amount: '' });
  const [createProduct, { isLoading }] = useStudentCreateProductMutation();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct({
        botName: formData.botName,
        countryCodes: formData.country.split(',').map((c) => c.trim()).filter(Boolean),
        totalAmount: Number(formData.amount) || 0,
      }).unwrap();
      
      alert('Product created successfully!');
      setFormData({ botName: '', country: '', amount: '' });
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to submit product');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-[16px] font-extrabold text-gray-900">Submit New Product</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
            <X size={15} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Bot Name</label>
            <input 
              required 
              type="text" 
              value={formData.botName} 
              onChange={(e) => setFormData({...formData, botName: e.target.value})} 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-[13px]" 
              placeholder="e.g. TradeBot Pro" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Country Codes</label>
            <input 
              required 
              type="text" 
              value={formData.country} 
              onChange={(e) => setFormData({...formData, country: e.target.value})} 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-[13px]" 
              placeholder="e.g. US, UK" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Amount ($)</label>
            <input 
              required 
              type="number" 
              step="0.01" 
              value={formData.amount} 
              onChange={(e) => setFormData({...formData, amount: e.target.value})} 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-[13px]" 
              placeholder="e.g. 49.99" 
            />
          </div>
          
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
