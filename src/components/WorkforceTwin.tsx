/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, Flame, Award, Watch, ArrowRight, ShieldCheck, 
  Lightbulb, Activity, CheckCircle2 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

export default function WorkforceTwin() {
  const [shiftHours, setShiftHours] = useState(8); // hours per shift

  // Calculate dynamic outputs based on scheduled shift hours
  const calculatedFatigue = Math.round(Math.min(100, Math.max(10, (shiftHours * 10) - (8 - shiftHours) * 3)));
  const calculatedProductivity = Math.round(Math.max(30, 96 - Math.max(0, shiftHours - 8) * 12));

  // Fatigue vs Productivity historical matrix
  const historicalLoadCurve = [
    { name: '4 Hrs', productivity: 75, stress: 15 },
    { name: '6 Hrs', productivity: 90, stress: 28 },
    { name: '8 Hrs (Base)', productivity: 95, stress: 40 },
    { name: '10 Hrs', productivity: 82, stress: 68 },
    { name: '12 Hrs', productivity: 50, stress: 92 },
  ];

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Overview Block */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm tracking-tight text-slate-800 uppercase">Workforce Fatigue & Shift Operations Twin</h3>
          <p className="text-xs text-slate-500 mt-0.5">Continuous human-resources modeling pairing physical timekeeping metrics with AI fatigue predictions.</p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="bg-emerald-50 text-emerald-600 font-bold px-2.5 py-1 rounded border border-emerald-100 flex items-center gap-1 uppercase tracking-tight text-[10px]">
            <CheckCircle2 size={12} /> Scheduling Compliant
          </span>
        </div>
      </div>

      {/* Main Analysis Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left Interactive Core */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Watch className="text-blue-600" size={18} />
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Operational Shifts Sandbox</h4>
            </div>

            <p className="text-xs text-slate-500 leading-normal mb-5 font-sans">
              Adjust scheduled shift length limits to view AI calculations of labor stress, work quality, and net operating efficiency.
            </p>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-500 uppercase tracking-tight">Shift Duration</span>
                  <span className="text-blue-600 font-mono font-bold text-[11px]">{shiftHours} Hours / day</span>
                </div>
                <input 
                  type="range" min="4" max="12" step="1" 
                  value={shiftHours} onChange={(e) => setShiftHours(Number(e.target.value))}
                  className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Dynamic Readouts */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    <Activity size={12} /> Productivity
                  </div>
                  <p className="text-lg font-black font-mono text-blue-600 mt-1">{calculatedProductivity}%</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">Calculated production efficiency</p>
                </div>

                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                  <div className="flex items-center gap-1.5 text-[9px] text-rose-500 font-bold uppercase tracking-wider">
                    <Flame size={12} className="text-rose-500" /> Fatigue
                  </div>
                  <p className="text-lg font-black font-mono text-rose-600 mt-1">{calculatedFatigue}%</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">Error possibility factor</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 text-xs">
            {shiftHours > 8 ? (
              <div className="p-2.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-lg leading-normal text-[11px]">
                ⚠️ <strong>Fatigue Risk Alert:</strong> Shift limits above 8 hours generate compounding worker stress indexes, dragging down aggregate accuracy.
              </div>
            ) : (
              <div className="p-2.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg leading-normal text-[11px]">
                ✅ <strong>Productive Threshold Met:</strong> Shift durations are within target sustainable buffers, avoiding stress deficits.
              </div>
            )}
          </div>
        </div>

        {/* Right Plot: Human Load Curves */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Stamina Curve Matching</h4>
              <p className="text-xs text-slate-400 mt-0.5">Continuous analysis modeling physical fatigue lines vs total hourly output efficiency</p>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded font-mono uppercase">N=240 shifts</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalLoadCurve}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 'bold' }} />
                <Line name="Operational Efficiency" type="monotone" dataKey="productivity" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line name="Fatigue Index" type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid: Shift Allocation & Performance Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Dynamic Shift Allocation */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-4">Team-Level Daily Efficiency Twin Status</h4>
          
          <div className="space-y-3.5 text-xs font-bold uppercase tracking-tight">
            <div>
              <div className="flex justify-between mb-1.5 text-slate-500">
                <span>Team Alpha (Assembly Shift 1)</span>
                <span className="text-slate-700">94% Efficiency</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
                <div className="bg-blue-600 h-full" style={{ width: '94%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5 text-slate-500">
                <span>Team Beta (Quality Inspection Shift 1)</span>
                <span className="text-slate-700">88% Efficiency</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
                <div className="bg-blue-500 h-full" style={{ width: '88%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5 text-slate-500">
                <span>Team Gamma (Warehouse Logistics Shift 2)</span>
                <span className="text-slate-700">79% Efficiency</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
                <div className="bg-blue-400 h-full" style={{ width: '79%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Heatmap Layout */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-1.5">Shift Hour Fatigue Heatmap</h4>
            <p className="text-xs text-slate-400 mb-3.5 font-sans">Color warmth represents peak localized fatigue concentration</p>
            
            <div className="grid grid-cols-6 gap-2">
              {[15, 20, 31, 42, 53, 75, 18, 25, 33, 40, 56, 82, 10, 15, 22, 35, 48, 62, 11, 14, 18, 27, 34, 49].map((item, idx) => (
                <div 
                  key={idx} 
                  className={`aspect-square rounded border flex items-center justify-center font-mono text-[9px] font-bold ${
                    item > 70 ? 'bg-rose-500 border-rose-600 text-white animate-pulse' :
                    item > 50 ? 'bg-amber-400 border-amber-500 text-slate-800' :
                    item > 30 ? 'bg-yellow-100 border-yellow-200 text-slate-700' :
                    'bg-emerald-100 border-emerald-205 text-emerald-800 text-emerald-800'
                  }`}
                  title={`Hour ${idx + 1}: ${item}% Fatigue`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between text-[9px] text-slate-400 uppercase tracking-widest font-extrabold mt-4">
            <span>Shift 1 (Day)</span>
            <span>Shift 2 (Swing)</span>
            <span>Shift 3 (Night)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
