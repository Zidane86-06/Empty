import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import AnalyticsChart from './components/AnalyticsChart';
import TransactionsTable from './components/TransactionsTable';
import NewItemModal from './components/NewItemModal';
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Award,
  Zap,
  Globe,
  ShieldCheck,
  BellRing,
  Sparkles
} from 'lucide-react';

const INITIAL_TRANSACTIONS = [
  {
    id: 'TX-9482',
    customer: 'Eleanor Vance',
    email: 'eleanor.v@acme.com',
    amount: 1250.00,
    category: 'Software',
    status: 'Completed',
    date: 'Sep 17, 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
  },
  {
    id: 'TX-9481',
    customer: 'Marcus Chen',
    email: 'm.chen@techflow.io',
    amount: 3400.50,
    category: 'Consulting',
    status: 'Completed',
    date: 'Sep 16, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
  },
  {
    id: 'TX-9480',
    customer: 'Sophia Martinez',
    email: 'sophia@lumina.dev',
    amount: 890.00,
    category: 'Subscription',
    status: 'Pending',
    date: 'Sep 16, 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
  },
  {
    id: 'TX-9479',
    customer: 'David Kim',
    email: 'david@nexus.org',
    amount: 4500.00,
    category: 'Hardware',
    status: 'Completed',
    date: 'Sep 15, 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
  },
  {
    id: 'TX-9478',
    customer: 'Hannah Abbott',
    email: 'hannah@designcraft.co',
    amount: 620.00,
    category: 'Software',
    status: 'Failed',
    date: 'Sep 14, 2026',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      triggerToast('Dashboard metrics updated');
    }, 800);
  };

  const handleAddTransaction = (newTx) => {
    setTransactions([newTx, ...transactions]);
    triggerToast(`Added transaction ${newTx.id}`);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
    triggerToast(`Removed transaction ${id}`);
  };

  // Calculate dynamic stats
  const totalRevenue = transactions
    .filter(t => t.status === 'Completed')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200 border border-indigo-400/30">
          <Sparkles className="w-5 h-5 text-indigo-200" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Header Bar */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenModal={() => setIsModalOpen(true)}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        isCollapsed={isCollapsed}
      />

      {/* Main Content Area */}
      <main 
        className={`flex-1 p-4 md:p-8 transition-all duration-300 ${
          isCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Tab Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                {activeTab === 'overview' && 'Executive Dashboard'}
                {activeTab === 'analytics' && 'Financial & Performance Analytics'}
                {activeTab === 'customers' && 'Customer CRM & Directory'}
                {activeTab === 'orders' && 'Orders & Inventory Log'}
                {activeTab === 'settings' && 'System Configuration & Settings'}
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Real-time insights and data management for your business operations
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                Live System Operational
              </span>
            </div>
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <>
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard
                  title="Total Revenue"
                  value={`$${(totalRevenue + 94250).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                  change="+18.4%"
                  isPositive={true}
                  icon={DollarSign}
                  color="indigo"
                  subtext="vs last 30 days"
                />
                <StatCard
                  title="Active Customers"
                  value="2,840"
                  change="+12.1%"
                  isPositive={true}
                  icon={Users}
                  color="emerald"
                  subtext="vs last month"
                />
                <StatCard
                  title="Total Orders"
                  value="1,429"
                  change="-2.3%"
                  isPositive={false}
                  icon={ShoppingCart}
                  color="purple"
                  subtext="vs last month"
                />
                <StatCard
                  title="Conversion Rate"
                  value="4.65%"
                  change="+3.8%"
                  isPositive={true}
                  icon={TrendingUp}
                  color="amber"
                  subtext="vs last week"
                />
              </div>

              {/* Analytics Chart Component */}
              <AnalyticsChart />

              {/* Transactions Table Component */}
              <TransactionsTable
                transactions={transactions}
                onDeleteTransaction={handleDeleteTransaction}
                searchQuery={searchQuery}
              />
            </>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <AnalyticsChart />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
                  <div className="p-3 w-fit rounded-xl bg-indigo-500/10 text-indigo-400 mb-4">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg text-white">High Growth Sectors</h4>
                  <p className="text-xs text-slate-400 mt-2">
                    SaaS Subscriptions grew by 34% this quarter, driven by enterprise tier upgrades.
                  </p>
                </div>
                <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
                  <div className="p-3 w-fit rounded-xl bg-emerald-500/10 text-emerald-400 mb-4">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg text-white">Global Distribution</h4>
                  <p className="text-xs text-slate-400 mt-2">
                    North America accounts for 58% of revenue, followed by Europe (26%) and Asia-Pacific (16%).
                  </p>
                </div>
                <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
                  <div className="p-3 w-fit rounded-xl bg-purple-500/10 text-purple-400 mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg text-white">Customer Retention</h4>
                  <p className="text-xs text-slate-400 mt-2">
                    Net Revenue Retention (NRR) currently stands at 118%, with 94.2% monthly churn health score.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CUSTOMERS TAB */}
          {activeTab === 'customers' && (
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Customer Directory</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {transactions.map((t) => (
                  <div key={t.id} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center gap-4">
                    <img src={t.avatar} alt={t.customer} className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/30" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{t.customer}</h4>
                      <p className="text-xs text-slate-400">{t.email}</p>
                      <span className="text-[11px] text-indigo-400 font-semibold mt-1 inline-block">
                        Total Spent: ${t.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <TransactionsTable
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
              searchQuery={searchQuery}
            />
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 max-w-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Dashboard Preferences</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between py-3 border-b border-slate-700">
                  <div>
                    <span className="font-semibold text-white block">Email Notifications</span>
                    <span className="text-xs text-slate-400">Receive daily summary reports</span>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-800 text-indigo-600" />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-700">
                  <div>
                    <span className="font-semibold text-white block">Automatic Refresh</span>
                    <span className="text-xs text-slate-400">Sync data every 5 minutes</span>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-800 text-indigo-600" />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <span className="font-semibold text-white block">Dark Mode Theme</span>
                    <span className="text-xs text-slate-400">Enabled high-contrast dark palette</span>
                  </div>
                  <input type="checkbox" defaultChecked disabled className="rounded border-slate-700 bg-slate-800 text-indigo-600" />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* New Transaction Modal */}
      <NewItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
}
