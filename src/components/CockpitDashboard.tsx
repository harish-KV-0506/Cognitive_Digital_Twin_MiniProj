/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, Users, Package, Eye, Radio, 
  ArrowUpRight, ArrowDownRight, RefreshCw, Layers, ShieldCheck, Activity, Brain
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { TelemetryEvent, HistoricMetricPoint } from '../types';

interface CockpitProps {
  historicData: HistoricMetricPoint[];
  telemetry: TelemetryEvent[];
  onTriggerSync: () => void;
  isSyncing: boolean;
  industry: string;
}

export default function CockpitDashboard({ 
  historicData, 
  telemetry: initialTelemetry, 
  onTriggerSync, 
  isSyncing,
  industry
}: CockpitProps) {
  const [telemetryEvents, setTelemetryEvents] = useState<TelemetryEvent[]>(initialTelemetry);
  const [mistValue, setMistValue] = useState(74); // visibility index %
  const [tunnelValue, setTunnelValue] = useState(88); // optimality alignment %

  // Append a live sync ticker event every 12 seconds
  useEffect(() => {
    const messages = [
      "IoT sensor array: Production line thermal index calibrated at 42°C",
      "Sales feed: Average order value increased by 4.2% in response segment",
      "Supply chain: Raw delivery freight delays calculated as under 4 hrs",
      "Cognitive Twin: Predictive validation engine recalculating optimal paths...",
      "Workforce logs: Rest periods aligned with fatigue curves, productivity indexed at 94%"
    ];
    const domains: Array<'sales' | 'inventory' | 'workforce' | 'systems'> = ['systems', 'sales', 'inventory', 'systems', 'workforce'];
    const severities: Array<'info' | 'success' | 'warning'> = ['success', 'info', 'success', 'info', 'success'];

    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * messages.length);
      const now = new Date();
      const timestamp = now.toTimeString().split(' ')[0];
      const newEvent: TelemetryEvent = {
        id: `t-dyn-${Date.now()}`,
        timestamp,
        domain: domains[randomIdx],
        message: messages[randomIdx],
        severity: severities[randomIdx]
      };
      setTelemetryEvents(prev => [newEvent, ...prev.slice(0, 7)]);
      // subtle changes to mock active simulation
      setMistValue(prev => Math.min(100, Math.max(50, prev + Math.floor(Math.random() * 5) - 2)));
      setTunnelValue(prev => Math.min(100, Math.max(65, prev + Math.floor(Math.random() * 3) - 1)));
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  // Use current values based on historic data
  const latestMonth = historicData[historicData.length - 1];
  const previousMonth = historicData[historicData.length - 2];

  const pctRevChange = ((latestMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100).toFixed(1);
  const pctEffChange = ((latestMonth.workforceEfficiency - previousMonth.workforceEfficiency) / previousMonth.workforceEfficiency * 100).toFixed(1);
  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Upper Grid: Cognitive Status & Dynamic Trajectory Indices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left Card: The Mist Predictability index */}
        <div className="bg-slate-900 border border-slate-800 text-white p-5 rounded-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Radio size={140} className="text-white" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 animate-pulse">
                <span className="p-1 px-1.5 rounded bg-blue-500/10 text-blue-400">
                  <Eye size={16} />
                </span>
                <h3 className="font-bold text-slate-200 text-xs uppercase tracking-wider">The "Mist" Visibility</h3>
              </div>
              <span className="text-[10px] bg-blue-505 bg-slate-800 text-blue-400 font-mono px-2 py-0.5 rounded font-bold">ACTIVE TWIN</span>
            </div>
            
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-4xl font-extrabold font-mono tracking-tight">{mistValue}%</span>
              <span className="text-[10px] text-blue-300 flex items-center gap-0.5 font-bold uppercase tracking-wider">
                <ArrowUpRight size={12} /> High Clarity
              </span>
            </div>
            
            <p className="text-[11px] text-slate-400 leading-normal mt-3">
              Measures live clarity through complex market noise. Values above 70% indicate robust predictive integrity with low environmental uncertainty.
            </p>
          </div>

          <div className="mt-4">
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-blue-500 h-full transition-all duration-1000" 
                style={{ width: `${mistValue}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Middle Card: The Tunnel Guideline index */}
        <div className="bg-slate-900 border border-slate-800 text-white p-5 rounded-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Layers size={140} className="text-white" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="p-1 px-1.5 rounded bg-emerald-500/10 text-emerald-400">
                  <Layers size={16} />
                </span>
                <h3 className="font-bold text-slate-200 text-xs uppercase tracking-wider">The "Tunnel" Alignment</h3>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-300 font-mono px-2 py-0.5 rounded font-bold">OPTIMAL PATH</span>
            </div>

            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-4xl font-extrabold font-mono tracking-tight">{tunnelValue}%</span>
              <span className="text-[10px] text-emerald-300 flex items-center gap-0.5 font-bold uppercase tracking-wider">
                <ArrowUpRight size={12} /> Optimized Path
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal mt-3">
              Compares current physical resources against the AI-computed steady-state path. Elevated percentages reflect minimal waste and optimized margins.
            </p>
          </div>

          <div className="mt-4">
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-1000" 
                style={{ width: `${tunnelValue}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Right Card: Cognitive Sync Status */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <span className="p-1.5 rounded bg-blue-50 text-blue-600">
                  <Brain size={16} />
                </span>
                <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Cognitive Engine</h3>
              </div>
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
            </div>

            <div className="space-y-2 mt-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Industry Configured</span>
                <span className="text-slate-800 font-bold">{industry}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Twin Refresh Rate</span>
                <span className="text-slate-800 font-mono font-medium">1.0 Hz (Continuous)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">AI Optimization Engine</span>
                <span className="text-slate-800 flex items-center gap-1 font-bold text-blue-600">
                  <ShieldCheck size={13} className="text-blue-600" /> Gemini-3.5-Active
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onTriggerSync}
            disabled={isSyncing}
            className="w-full mt-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 cursor-pointer shadow-sm"
          >
            {isSyncing ? (
              <>
                <RefreshCw size={12} className="animate-spin" /> Synchronizing Digital Twin...
              </>
            ) : (
              <>
                <RefreshCw size={12} /> Synchronize ERP & Physical Twins
              </>
            )}
          </button>
        </div>
      </div>

      {/* Core Executive KPI Cards - High Density Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Live Revenue */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Total Monthly Revenue</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600`}>
              +{pctRevChange}%
            </span>
          </div>
          <p className="mt-1 text-xl font-black text-slate-800 font-mono tracking-tight">${latestMonth.revenue.toLocaleString()}</p>
        </div>

        {/* KPI 2: Live Operational Cost */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Operating Cost</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-600">
              Overhead Friction
            </span>
          </div>
          <p className="mt-1 text-xl font-black text-slate-800 font-mono tracking-tight">${latestMonth.cost.toLocaleString()}</p>
        </div>

        {/* KPI 3: Operational Efficiency */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Overall Efficiency</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600`}>
              +{pctEffChange}%
            </span>
          </div>
          <p className="mt-1 text-xl font-black text-slate-800 font-mono tracking-tight">{latestMonth.workforceEfficiency}%</p>
        </div>

        {/* KPI 4: Digital Twin Integrity */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Synthesis Integrity</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-500">
              Optimal
            </span>
          </div>
          <p className="mt-1 text-xl font-black text-slate-800 font-mono tracking-tight">99.4%</p>
        </div>
      </div>

      {/* Dynamic Mid-Grid: Performance Plots & Live Telemetry Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Main Forecasting Area Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="flex justify-between items-center mb-4 shrink-0">
            <div>
              <h3 className="font-bold text-sm tracking-tight text-slate-700 uppercase">Performance Forecasting (7D Lookback)</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Physical financial revenue matched directly with modeled overhead twin threshold</p>
            </div>
            <div className="flex gap-3">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span> Realized Revenue
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-tight font-sans">
                <span className="w-2 h-1.5 bg-slate-300 inline-block rounded"></span> Projected Cost
              </span>
            </div>
          </div>

          <div className="h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicData}>
                <defs>
                  <linearGradient id="gradientRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="period" stroke="#94a3b8" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#gradientRev)" />
                <Area type="monotone" dataKey="cost" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Digital Twin Telemetry Feed */}
        <div className="bg-slate-950 p-5 rounded-xl shadow-sm border border-slate-900 flex flex-col justify-between text-slate-100">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-900 pb-2.5">
              <div className="flex items-center gap-1.5">
                <Activity size={16} className="text-emerald-400 animate-pulse" />
                <h3 className="font-bold text-xs uppercase tracking-wider">Active Twin Telemetry</h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span> Live Sync
              </span>
            </div>

            <div className="space-y-3 max-h-[16rem] overflow-y-auto pr-1">
              {telemetryEvents.map((tEvent) => (
                <div key={tEvent.id} className="text-[11px] space-y-1 hover:bg-slate-900/50 p-1.5 rounded transition-colors border-l-2 border-slate-800">
                  <div className="flex justify-between text-[9px] text-slate-500">
                    <span className="font-mono">{tEvent.timestamp}</span>
                    <span className="uppercase font-extrabold tracking-wider text-[8px] bg-slate-900 px-1 py-0.5 rounded text-slate-400">
                      {tEvent.domain}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-normal font-sans">{tEvent.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-900 pt-2.5 mt-3 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>Buffer Limit: 100/100 packets</span>
            <span>Protocols: ERP Sync</span>
          </div>
        </div>
      </div>
    </div>
  );;
}
