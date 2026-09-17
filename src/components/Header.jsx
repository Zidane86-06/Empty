import React, { useState } from 'react';
import { Search, Bell, Plus, Filter, RefreshCw, CheckCircle, Clock } from 'lucide-react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  onOpenModal, 
  onRefresh, 
  isRefreshing,
  isCollapsed 
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'New order #1089 received', time: '5m ago', unread: true },
    { id: 2, title: 'Weekly sales report ready', time: '1h ago', unread: true },
    { id: 3, title: 'Server performance optimal', time: '3h ago', unread: false },
  ];

  return (
    <header 
      className={`sticky top-0 z-30 h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 transition-all duration-300 px-4 md:px-8 flex items-center justify-between gap-4 ${
        isCollapsed ? 'ml-20' : 'ml-64'
      }`}
    >
      {/* Search Input */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions, customers, reports... (Ctrl+K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
      </div>

      {/* Header Right Actions */}
      <div className="flex items-center gap-3">
        {/* Manual Refresh Data */}
        <button
          onClick={onRefresh}
          className={`p-2 rounded-xl border border-slate-800 bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-800 transition-all ${
            isRefreshing ? 'animate-spin text-indigo-400' : ''
          }`}
          title="Refresh Data"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl border border-slate-800 bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-slate-900"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <h4 className="text-sm font-semibold text-white">Notifications</h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-medium">
                  2 New
                </span>
              </div>
              <div className="divide-y divide-slate-700/50 my-1">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5 flex items-start gap-3 hover:bg-slate-700/30 px-2 rounded-lg transition-colors cursor-pointer">
                    <div className="mt-0.5 text-indigo-400">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-200 font-medium">{n.title}</p>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {n.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setShowNotifications(false)} 
                className="w-full mt-2 pt-2 text-center text-xs text-indigo-400 hover:text-indigo-300 font-medium border-t border-slate-700"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        <button
          onClick={onOpenModal}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Transaction</span>
        </button>
      </div>
    </header>
  );
}
