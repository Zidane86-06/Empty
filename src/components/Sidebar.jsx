import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  ShoppingCart, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  LogOut,
  HelpCircle
} from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }) {
  return (
    <aside 
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-slate-900 border-r border-slate-800 flex flex-col justify-between ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white tracking-wide leading-tight">ApexDash</span>
                <span className="text-xs text-indigo-400 font-medium">Enterprise Suite</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5 mt-2">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Main Menu
            </div>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                {!isCollapsed && <span>{item.label}</span>}
                {isActive && (
                  <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Account */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
          title={isCollapsed ? "Help & Support" : undefined}
        >
          <HelpCircle className="w-5 h-5 shrink-0 text-slate-400" />
          {!isCollapsed && <span>Help & Support</span>}
        </button>

        <div className={`pt-2 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-2'}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="User Avatar"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/50"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-sm font-semibold text-slate-200 truncate">Alex Morgan</span>
                <span className="text-xs text-slate-400 truncate">alex@apex.io</span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button 
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
