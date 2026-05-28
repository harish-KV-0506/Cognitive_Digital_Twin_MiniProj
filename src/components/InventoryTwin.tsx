/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Package, AlertTriangle, ShieldCheck, Box, 
  CornerDownRight, Truck, TrendingUp, DollarSign 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts';

export default function InventoryTwin() {
  const [bufferTarget, setBufferTarget] = useState(55); // target safety buffer percentile

  // Dynamic holding vs stockout calculation based on safety buffer Target
  const calculatedHoldingCost = Math.round(bufferTarget * 62); 
  const calculatedStockoutRisk = Math.round(Math.max(1, 100 - (bufferTarget * 1.5)));

  const categoriesData = [
    { name: 'Raw Coils', stock: 45, reorder: 35, unitCost: 12 },
    { name: 'Copper Tubes', stock: 20, reorder: 30, unitCost: 28 }, // Stockout!
    { name: 'Composite Resin', stock: 85, reorder: 40, unitCost: 18 },
    { name: 'Alloy Castings', stock: 32, reorder: 25, unitCost: 45 },
    { name: 'Finished Motors', stock: 65, reorder: 20, unitCost: 120 }
  ];

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Overview Card */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm tracking-tight text-slate-800 uppercase">Inventory & Supply Chain Digital Asset Twin</h3>
          <p className="text-xs text-slate-500 mt-0.5">Verifying live shipping registries, warehouse levels, and reorder margins.</p>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2.5 py-1 rounded border border-amber-100 flex items-center gap-1 uppercase tracking-tight">
            <AlertTriangle size={12} className="text-amber-500 animate-pulse" /> 1 Material Stockout Flag
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left Side: Stock Levels Bar Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
            <Box size={16} className="text-blue-600" /> Key Material Reserves Index (%)
          </h4>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                />
                <Bar name="Present Buffer %" dataKey="stock" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                  {categoriesData.map((entry, index) => {
                    const isBelowReorder = entry.stock < entry.reorder;
                    return (
                      <Cell key={`cell-${index}`} fill={isBelowReorder ? '#ef4444' : '#3b82f6'} />
                    );
                  })}
                </Bar>
                <Bar name="Safety Reorder Threshold %" dataKey="reorder" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-tight justify-center text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-500 rounded"></span> Healthy Buffer</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-red-500 rounded"></span> Safety Deficit</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-slate-300 rounded"></span> Reorder Threshold</span>
          </div>
        </div>

        {/* Right Side: Carrying Cost Simulator */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="text-emerald-600" size={16} />
              <h4 className="font-bold text-slate-850 text-xs uppercase tracking-wider">Buffer Economics Engine</h4>
            </div>
            
            <p className="text-xs text-slate-500 leading-normal mb-5 font-sans">
              Balance carrying capacity costs against the mathematical likelihood of an empty-shelf event. Dynamic reorder points automatically compute.
            </p>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500 uppercase tracking-tight">Material Safety Buffer</span>
                  <span className="text-blue-600 font-mono font-bold text-[11px]">{bufferTarget}%</span>
                </div>
                <input 
                  type="range" min="10" max="95" step="5" 
                  value={bufferTarget} onChange={(e) => setBufferTarget(Number(e.target.value))}
                  className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Economic Balance Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    <DollarSign size={10} className="text-slate-400" /> Carrying Cost
                  </div>
                  <p className="text-base font-black font-mono text-slate-800 mt-1">${calculatedHoldingCost}/mo</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">Leasing friction</p>
                </div>

                <div className="bg-rose-50/50 p-3 rounded-lg border border-rose-100">
                  <div className="flex items-center gap-1 text-[9px] text-rose-500 font-bold uppercase tracking-wider">
                    <AlertTriangle size={10} className="text-rose-500" /> Stockout Risk
                  </div>
                  <p className="text-base font-black font-mono text-rose-700 mt-1">{calculatedStockoutRisk}%</p>
                  <p className="text-[9px] text-rose-400 mt-0.5">Project pause likelihood</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200">
              <Truck size={14} className="text-slate-400" />
              <span className="font-medium text-[11px]">Recommended Buffer Target: <strong>55% to 65%</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Under-List: Active Materials Log */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Automated Supply Reorder Log</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-400 uppercase tracking-wider font-bold text-[9px] border-b border-slate-200">
                <th className="py-2 px-4">Material Group</th>
                <th className="py-2 px-4">Present Stock %</th>
                <th className="py-2 px-4">Trigger Marker</th>
                <th className="py-2 px-4">Estimated Material Cost</th>
                <th className="py-2 px-4">Live Health Status</th>
                <th className="py-2 px-4 text-right">Adaptive Action Trigger</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categoriesData.map((item, idx) => {
                const stockout = item.stock < item.reorder;
                return (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-slate-700">{item.name}</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-600">{item.stock}%</td>
                    <td className="py-2.5 px-4 font-mono text-slate-400">{item.reorder}%</td>
                    <td className="py-2.5 px-4 font-mono font-medium">${item.unitCost} / unit</td>
                    <td className="py-2.5 px-4">
                      {stockout ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-50 text-rose-600 border border-rose-100">
                          <span className="h-1 w-1 rounded-full bg-rose-600 animate-pulse"></span> Deficit Warning
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <ShieldCheck size={10} className="text-emerald-500" /> Buffer Safe
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      {stockout ? (
                        <button className="text-[9px] bg-rose-600 hover:bg-rose-700 text-white font-bold py-1 px-2.5 rounded cursor-pointer shadow-sm">
                          Dispatch Supplier Order
                        </button>
                      ) : (
                        <span className="text-slate-400 text-[9px] font-semibold uppercase tracking-tight">Autopurchase Idle</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
