import React, { useState } from 'react';
import { X, Plus, DollarSign, User, Mail, Tag } from 'lucide-react';

export default function NewItemModal({ isOpen, onClose, onAddTransaction }) {
  const [customer, setCustomer] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Software');
  const [status, setStatus] = useState('Completed');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer || !amount) return;

    const newTx = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      customer,
      email: email || `${customer.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      amount: parseFloat(amount),
      category,
      status,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random()*100)}?w=80&auto=format&fit=crop&q=80`,
    };

    onAddTransaction(newTx);
    onClose();
    // Reset form
    setCustomer('');
    setEmail('');
    setAmount('');
    setCategory('Software');
    setStatus('Completed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Add Transaction</h3>
              <p className="text-xs text-slate-400">Record a new payment or order item</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Customer Name *
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g. Sarah Jenkins"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Customer Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="sarah@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Amount ($) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="299.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="Software">Software</option>
                <option value="Consulting">Consulting</option>
                <option value="Subscription">Subscription</option>
                <option value="Hardware">Hardware</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Completed', 'Pending', 'Failed'].map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => setStatus(st)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
                    status === st
                      ? st === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : st === 'Pending' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                      : 'bg-slate-800/50 text-slate-400 border-slate-700/60 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
            >
              Create Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
