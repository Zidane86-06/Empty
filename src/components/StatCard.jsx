import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({ title, value, change, isPositive, icon: Icon, color, subtext }) {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      badge: 'bg-indigo-500/20 text-indigo-300',
    },
    emerald: {
      bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      badge: 'bg-emerald-500/20 text-emerald-300',
    },
    purple: {
      bg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      badge: 'bg-purple-500/20 text-purple-300',
    },
    amber: {
      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      badge: 'bg-amber-500/20 text-amber-300',
    },
  };

  const theme = colorMap[color] || colorMap.indigo;

  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 hover:border-slate-600 transition-all duration-300 shadow-xl relative overflow-hidden group">
      {/* Background Subtle Gradient Glow */}
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-2xl opacity-20 transition-opacity group-hover:opacity-40 ${
        color === 'indigo' ? 'bg-indigo-500' :
        color === 'emerald' ? 'bg-emerald-500' :
        color === 'purple' ? 'bg-purple-500' : 'bg-amber-500'
      }`} />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</span>
          <h3 className="text-2xl md:text-3xl font-bold text-white mt-1 tracking-tight">{value}</h3>
        </div>

        <div className={`p-3 rounded-xl border ${theme.bg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-semibold ${
            isPositive 
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
              : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
          }`}>
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5" />
            )}
            {change}
          </span>
          <span className="text-slate-400 ml-1">{subtext || 'vs last month'}</span>
        </div>
      </div>
    </div>
  );
}
