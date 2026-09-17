import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  MoreHorizontal, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight,
  Trash2,
  Eye
} from 'lucide-react';

export default function TransactionsTable({ transactions, onDeleteTransaction, searchQuery }) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter logic
  const filtered = transactions.filter((t) => {
    const matchesSearch = 
      t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSelectAll = () => {
    if (selectedIds.length === paginated.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginated.map(p => p.id));
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
      case 'Failed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle className="w-3.5 h-3.5" /> Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl shadow-xl overflow-hidden">
      {/* Table Top Controls */}
      <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60">
        <div>
          <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
          <p className="text-xs text-slate-400 mt-0.5">Manage and review all incoming and outgoing payments</p>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1 p-1 bg-slate-900/80 rounded-xl border border-slate-700/80 text-xs">
          {['All', 'Completed', 'Pending', 'Failed'].map((st) => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/50 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-700/60">
            <tr>
              <th className="p-4 w-10">
                <input
                  type="checkbox"
                  checked={paginated.length > 0 && selectedIds.length === paginated.length}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                />
              </th>
              <th className="p-4 font-semibold">Transaction ID</th>
              <th className="p-4 font-semibold">Customer</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold text-right">Amount</th>
              <th className="p-4 font-semibold text-center">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/40">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-8 text-center text-slate-400">
                  No transactions found matching your criteria.
                </td>
              </tr>
            ) : (
              paginated.map((row) => {
                const isSelected = selectedIds.includes(row.id);
                return (
                  <tr
                    key={row.id}
                    className={`hover:bg-slate-700/30 transition-colors ${
                      isSelected ? 'bg-indigo-900/20' : ''
                    }`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(row.id)}
                        className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                      />
                    </td>
                    <td className="p-4 font-mono text-xs text-slate-400 font-medium">
                      {row.id}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={row.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80'}
                          alt={row.customer}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700"
                        />
                        <div>
                          <span className="font-semibold text-white block">{row.customer}</span>
                          <span className="text-xs text-slate-400">{row.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-xs font-medium text-slate-400">
                      <span className="px-2 py-1 rounded-md bg-slate-800 border border-slate-700">
                        {row.category}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-400">{row.date}</td>
                    <td className="p-4 font-semibold text-right text-white">
                      ${row.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4 text-center">{getStatusBadge(row.status)}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onDeleteTransaction(row.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete Transaction"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
        <span>
          Showing <strong className="text-white">{filtered.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> to{' '}
          <strong className="text-white">{Math.min(currentPage * itemsPerPage, filtered.length)}</strong> of{' '}
          <strong className="text-white">{filtered.length}</strong> results
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border border-slate-700/80 bg-slate-800/60 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-semibold text-slate-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl border border-slate-700/80 bg-slate-800/60 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
