/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  TrendingUp, Users, DollarSign, Percent, 
  ArrowRight, ShieldCheck, AlertTriangle, Lightbulb 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';

export default function SalesTwin() {
  // Simulator inputs for customer metrics
  const [traffic, setTraffic] = useState(5000);
  const [conversionRate, setConversionRate] = useState(2.2); // percentile
  const [avgOrderVal, setAvgOrderVal] = useState(75); // $ dollars

  // Calculated values
  const simulatedAcquisitions = Math.round(traffic * (conversionRate / 100));
  const simulatedRevenue = Math.round(simulatedAcquisitions * avgOrderVal);
  const estimatedCAC = Math.round(2500 / Math.max(1, simulatedAcquisitions)); // assuming standard $2.5k core spend

  // Elasticity baseline (price factor from 0.5 to 2.0 and expected demand volume)
  const elasticityData = [
    { multiplier: '0.5x', volume: 200, grossRev: 200 * 0.5 * 75, optimal: false },
    { multiplier: '0.8x', volume: 160, grossRev: 160 * 0.8 * 75, optimal: false },
    { multiplier: '1.0x (Base)', volume: 100, grossRev: 100 * 1.0 * 75, optimal: false },
    { multiplier: '1.2x', volume: 84, grossRev: 84 * 1.2 * 75, optimal: true },
    { multiplier: '1.4x', volume: 68, grossRev: 68 * 1.4 * 75, optimal: false },
    { multiplier: '1.6x', volume: 50, grossRev: 50 * 1.6 * 75, optimal: false },
    { multiplier: '1.8x', volume: 35, grossRev: 35 * 1.8 * 75, optimal: false },
    { multiplier: '2.0x', volume: 20, grossRev: 20 * 2.0 * 75, optimal: false },
  ];

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Tab Header with Context */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm tracking-tight text-slate-800 uppercase">Sales & Customer Behavior Digital Twin</h3>
          <p className="text-xs text-slate-500 mt-0.5">Continuous feedback loop projecting demand volume shifts and elasticity curves.</p>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2.5 py-1 rounded border border-blue-100 flex items-center gap-1 uppercase tracking-tight">
            <ShieldCheck size={12} /> Elasticity Calibration Active
          </span>
        </div>
      </div>

      {/* Grid: Simulator & Static Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left Interactive Calculator Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="text-blue-600" size={18} />
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Conversion Sandbox</h4>
            </div>

            <p className="text-xs text-slate-500 leading-normal mb-5">
              Adjust monthly traffic levels, raw conversion efficiency, and pricing basket size to project physical market outcomes.
            </p>

            <div className="space-y-4">
              {/* Slider 1: Traffic */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500 uppercase tracking-tight">Monthly Web Traffic</span>
                  <span className="text-slate-800 font-mono text-[11px] font-bold">{traffic.toLocaleString()} visits</span>
                </div>
                <input 
                  type="range" min="1000" max="25000" step="500" 
                  value={traffic} onChange={(e) => setTraffic(Number(e.target.value))}
                  className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Slider 2: Conversion Rate */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500 uppercase tracking-tight">Customer Conversion</span>
                  <span className="text-blue-600 font-mono text-[11px] font-bold">{conversionRate}%</span>
                </div>
                <input 
                  type="range" min="0.5" max="8.0" step="0.1" 
                  value={conversionRate} onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Slider 3: Average Order Value */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500 uppercase tracking-tight">Average Order Value</span>
                  <span className="text-emerald-600 font-mono text-[11px] font-bold">${avgOrderVal}</span>
                </div>
                <input 
                  type="range" min="10" max="300" step="5" 
                  value={avgOrderVal} onChange={(e) => setAvgOrderVal(Number(e.target.value))}
                  className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Sandbox Results Metrics */}
          <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">Projected Customers acquired</span>
              <span className="font-mono font-bold text-slate-800">{simulatedAcquisitions} / mo</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">Estimated CAC</span>
              <span className="font-mono font-bold text-slate-800">${estimatedCAC}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-700 uppercase tracking-tight text-xs">Projected Volume</span>
              <span className="font-mono font-black text-blue-600">${simulatedRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right Graph: Elasticity Demand Curves */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Pricing Elasticity Projection</h4>
              <p className="text-xs text-slate-400 mt-0.5">Model analyzing customer abandonment limits relative to margin gains</p>
            </div>
            <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded uppercase font-mono">Elasticity coefficient: -1.4</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={elasticityData}>
                <defs>
                  <linearGradient id="gradientGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" vertical={false} />
                <XAxis dataKey="multiplier" stroke="#94a3b8" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                />
                <Area type="monotone" name="Projected Margin ($)" dataKey="grossRev" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#gradientGold)" />
                <Area type="monotone" name="Expected Volume Index" dataKey="volume" stroke="#0ea5e9" strokeWidth={1} strokeDasharray="3 3" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3.5 flex items-center gap-2 bg-blue-50/40 p-3 rounded-lg border border-blue-100 text-xs text-blue-850 leading-relaxed font-sans">
            <Lightbulb size={16} className="shrink-0 text-blue-600" />
            <span>
              <strong>Digital Twin Prediction:</strong> A pricing strategy optimization factor of <strong>1.2x</strong> is predicted to yield the maximum mathematical profit threshold (revenue: ${84 * 1.2 * 75}) before customer attrition overrides the unit rate premium.
            </span>
          </div>
        </div>
      </div>

      {/* Under-Grid: Sales Behavioral Telemetry & Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Customer LTV Index</span>
            <p className="text-lg font-black font-mono text-slate-800">$640.00</p>
            <p className="text-[10px] text-slate-400">Average tenure: 8.6 months</p>
          </div>
          <span className="p-2.5 bg-blue-50 text-blue-600 rounded-lg"><DollarSign size={18} /></span>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Acquisition ROI</span>
            <p className="text-lg font-black font-mono text-slate-800">4.12x Ratio</p>
            <p className="text-[10px] text-slate-400">LTV / active CAC ($155)</p>
          </div>
          <span className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg"><Percent size={18} /></span>
        </div>

        {/* Metric 3: Critical warnings alerts */}
        <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-start gap-2.5 text-rose-800">
          <AlertTriangle size={18} className="text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h5 className="font-bold text-xs uppercase tracking-wider">Segment Churn Warning</h5>
            <p className="text-[11px] leading-normal text-rose-700">
              Low-tier discount buyers are exhibiting a churn trend. Avoid further pricing compromises; support retention via value services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
