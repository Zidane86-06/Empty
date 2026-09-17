import React, { useState } from 'react';
import { Calendar, Download, TrendingUp } from 'lucide-react';

export default function AnalyticsChart() {
  const [timeframe, setTimeframe] = useState('30d');
  const [hoveredBar, setHoveredBar] = useState(null);

  const chartDataMap = {
    '7d': [
      { label: 'Mon', revenue: 3200, expenses: 1400 },
      { label: 'Tue', revenue: 4500, expenses: 1900 },
      { label: 'Wed', revenue: 5100, expenses: 2100 },
      { label: 'Thu', revenue: 4200, expenses: 1800 },
      { label: 'Fri', revenue: 6800, expenses: 2600 },
      { label: 'Sat', revenue: 7400, expenses: 3100 },
      { label: 'Sun', revenue: 6100, expenses: 2400 },
    ],
    '30d': [
      { label: 'W1', revenue: 24000, expenses: 9500 },
      { label: 'W2', revenue: 31000, expenses: 12000 },
      { label: 'W3', revenue: 29000, expenses: 11400 },
      { label: 'W4', revenue: 42000, expenses: 16200 },
    ],
    '12m': [
      { label: 'Jan', revenue: 45000, expenses: 18000 },
      { label: 'Feb', revenue: 52000, expenses: 21000 },
      { label: 'Mar', revenue: 49000, expenses: 19500 },
      { label: 'Apr', revenue: 61000, expenses: 24000 },
      { label: 'May', revenue: 68000, expenses: 27000 },
      { label: 'Jun', revenue: 74000, expenses: 29000 },
      { label: 'Jul', revenue: 82000, expenses: 31000 },
      { label: 'Aug', revenue: 79000, expenses: 30000 },
      { label: 'Sep', revenue: 91000, expenses: 34000 },
      { label: 'Oct', revenue: 88000, expenses: 32000 },
      { label: 'Nov', revenue: 96000, expenses: 36000 },
      { label: 'Dec', revenue: 112000, expenses: 41000 },
    ],
  };

  const data = chartDataMap[timeframe] || chartDataMap['30d'];
  const maxVal = Math.max(...data.map(d => Math.max(d.revenue, d.expenses))) * 1.15;

  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 shadow-xl relative">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white">Revenue & Expenses Overview</h3>
            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
              <TrendingUp className="w-3 h-3" /> +14.8%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Track financial trends across different reporting windows</p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Legend */}
          <div className="hidden md:flex items-center gap-4 text-xs mr-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-indigo-600 to-indigo-400"></span>
              <span className="text-slate-300">Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-slate-600"></span>
              <span className="text-slate-400">Expenses</span>
            </div>
          </div>

          {/* Timeframe Buttons */}
          <div className="flex items-center p-1 bg-slate-900/80 rounded-xl border border-slate-700/80 text-xs">
            {[
              { id: '7d', label: '7 Days' },
              { id: '30d', label: '30 Days' },
              { id: '12m', label: '1 Year' },
            ].map((tf) => (
              <button
                key={tf.id}
                onClick={() => setTimeframe(tf.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  timeframe === tf.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Bar Chart */}
      <div className="h-64 w-full relative pt-4">
        {/* Horizontal grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="border-b border-slate-400 w-full"></div>
          <div className="border-b border-slate-400 w-full"></div>
          <div className="border-b border-slate-400 w-full"></div>
          <div className="border-b border-slate-400 w-full"></div>
        </div>

        {/* Bar container */}
        <div className="h-full flex items-end justify-between gap-2 sm:gap-4 relative z-10 px-2">
          {data.map((item, idx) => {
            const revHeight = (item.revenue / maxVal) * 100;
            const expHeight = (item.expenses / maxVal) * 100;
            const isHovered = hoveredBar === idx;

            return (
              <div
                key={item.label}
                onMouseEnter={() => setHoveredBar(idx)}
                onMouseLeave={() => setHoveredBar(null)}
                className="flex-1 h-full flex flex-col justify-end items-center group relative cursor-pointer"
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-14 bg-slate-900 border border-slate-700 text-white text-[11px] p-2 rounded-xl shadow-xl z-30 whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
                    <div className="font-bold text-slate-300 mb-0.5">{item.label} Summary</div>
                    <div className="text-indigo-400 font-semibold">Revenue: ${item.revenue.toLocaleString()}</div>
                    <div className="text-slate-400">Expenses: ${item.expenses.toLocaleString()}</div>
                  </div>
                )}

                {/* Bars */}
                <div className="w-full max-w-[48px] flex items-end justify-center gap-1 h-full">
                  {/* Revenue Bar */}
                  <div
                    style={{ height: `${revHeight}%` }}
                    className={`w-1/2 rounded-t-lg bg-gradient-to-t from-indigo-600 to-indigo-400 transition-all duration-300 ${
                      isHovered ? 'brightness-125 shadow-lg shadow-indigo-500/30' : 'opacity-90'
                    }`}
                  />
                  {/* Expense Bar */}
                  <div
                    style={{ height: `${expHeight}%` }}
                    className={`w-1/2 rounded-t-lg bg-slate-600 transition-all duration-300 ${
                      isHovered ? 'bg-slate-500' : 'opacity-70'
                    }`}
                  />
                </div>

                {/* X-Axis Label */}
                <span className={`text-[11px] font-medium mt-3 transition-colors ${
                  isHovered ? 'text-indigo-400 font-bold' : 'text-slate-400'
                }`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
