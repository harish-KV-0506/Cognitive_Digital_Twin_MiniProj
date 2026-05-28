/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Cpu, Play, RefreshCw, BarChart2, CheckCircle2, AlertTriangle, 
  Sparkles, DollarSign, Users, Package, Flame, Clock, Radio, CornerRightDown
} from 'lucide-react';
import { SimulationState, CognitiveResult, CognitiveRecommendation } from '../types';
import { industryOptions, focusAreaOptions, defaultCognitiveResult } from '../utils/dummyData';

interface SimulationProps {
  onUpdateState: (state: SimulationState) => void;
}

export default function SimulationEngine({ onUpdateState }: SimulationProps) {
  // Main simulation state
  const [industry, setIndustry] = useState('Light Manufacturing');
  const [priceAdjust, setPriceAdjust] = useState(1.1);
  const [marketingSpend, setMarketingSpend] = useState(1800);
  const [staffingLevel, setStaffingLevel] = useState(12);
  const [inventoryLevel, setInventoryLevel] = useState(65);
  const [focusArea, setFocusArea] = useState('Maximize Profit Margin');

  // Interactive controls
  const [isSimulating, setIsSimulating] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [simulationResult, setSimulationResult] = useState<CognitiveResult>(defaultCognitiveResult);
  const [source, setSource] = useState<string>('');

  // Dispatch What-if analysis
  const runSimulation = async () => {
    setIsSimulating(true);
    setTerminalLogs([]);

    const logPoints = [
      `[INIT] Initializing multi-domain clones for Industry: ${industry}`,
      "[SYNC] Syncing IoT and ERP physical telemetry points with Bayesian model...",
      `[SIM] Projecting elasticity demand against pricing coefficient: ${priceAdjust}x`,
      `[SIM] Evaluating workforce fatigue for capacity set-point: ${staffingLevel} FTE`,
      `[SIM] Calculating safety stock holdings with target buffer level: ${inventoryLevel}%`,
      "[DISPATCH] Passing simulated parameters to server-side Cognitive Reasoning Hub...",
      "[COGNITIVE] Running predictive constraint calculations via Gemini-3.5-Intelligence..."
    ];

    // Stagger terminal writeout visually
    for (let i = 0; i < logPoints.length; i++) {
      await new Promise(resolve => setTimeout(resolve, i === 0 ? 0 : 350));
      setTerminalLogs(prev => [...prev, logPoints[i]]);
    }

    try {
      const response = await fetch("/api/cognitive-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceAdjust,
          marketingSpend,
          staffingLevel,
          inventoryLevel,
          industryType: industry,
          focusArea
        })
      });

      if (!response.ok) {
        throw new Error("Received bad response from Cognitive Sync server.");
      }

      const data = await response.json();
      setSimulationResult(data.result);
      setSource(data.source === "gemini_cognitive_engine" ? "Gemini 3.5 AI Engine" : "Local Predictive Twin");
      
      onUpdateState({
        industryType: industry,
        priceAdjust,
        marketingSpend,
        staffingLevel,
        inventoryLevel,
        focusArea
      });

      setTerminalLogs(prev => [...prev, `[SUCCESS] Synthesis successful! Retrieved optimal course of action.`]);
    } catch (err: any) {
      console.error(err);
      setTerminalLogs(prev => [...prev, `[ERROR] Connection failed: ${err.message || 'Unknown network deviation'}`]);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Title block */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm tracking-tight text-slate-800 uppercase">What-If Cognitive Simulation Sandbox</h3>
          <p className="text-xs text-slate-500 mt-0.5">Manipulate operational inputs and run cognitive optimization to predict strategic margins shifts.</p>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2.5 py-1 rounded border border-blue-100 flex items-center gap-1 uppercase tracking-tight">
            <Cpu size={12} /> Live Optimization Sandboxed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left Interactive Input Sliders Card */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 text-white p-5 rounded-xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pr-1">
              <Cpu className="text-blue-400" size={18} />
              <h4 className="font-bold text-xs uppercase tracking-wider">Simulation Parameters</h4>
            </div>

            <div className="space-y-5">
              {/* Select: Industry Segment */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Industry segment</label>
                <select 
                  value={industry} 
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 font-sans uppercase font-bold"
                >
                  {industryOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Slider: Pricing factor */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400 uppercase tracking-tight">Pricing Strategy Ratio</span>
                  <span className="text-blue-400 font-mono font-bold">{priceAdjust}x</span>
                </div>
                <input 
                  type="range" min="0.5" max="2.0" step="0.1" 
                  value={priceAdjust} onChange={(e) => setPriceAdjust(Number(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Slider: Marketing budget */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400 uppercase tracking-tight">Monthly Marketing Splurge</span>
                  <span className="text-blue-400 font-mono font-bold">${marketingSpend.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="0" max="10000" step="100" 
                  value={marketingSpend} onChange={(e) => setMarketingSpend(Number(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Slider: Staffing Level */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400 uppercase tracking-tight">Staffing Capacity</span>
                  <span className="text-blue-400 font-mono font-bold">{staffingLevel} FTE</span>
                </div>
                <input 
                  type="range" min="2" max="50" step="1" 
                  value={staffingLevel} onChange={(e) => setStaffingLevel(Number(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Slider: Target safety buffer */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400 uppercase tracking-tight">Inventory Safety buffer</span>
                  <span className="text-blue-400 font-mono font-bold">{inventoryLevel}%</span>
                </div>
                <input 
                  type="range" min="10" max="100" step="5" 
                  value={inventoryLevel} onChange={(e) => setInventoryLevel(Number(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Select: Optimization Goal Focus */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Primary Operations Goal</label>
                <select 
                  value={focusArea} 
                  onChange={(e) => setFocusArea(e.target.value)}
                  className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 font-sans uppercase font-bold"
                >
                  {focusAreaOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="w-full mt-6 py-2 bg-blue-600 hover:bg-blue-700 transition text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-900/40 cursor-pointer flex items-center justify-center gap-2"
          >
            {isSimulating ? (
              <>
                <RefreshCw size={12} className="animate-spin" /> Computing Dynamic Trajectory...
              </>
            ) : (
              <>
                <Play size={12} className="text-blue-105 fill-blue-200/50" /> Compute Dynamic Trajectory
              </>
            )}
          </button>
        </div>

        {/* Right Side: Virtual Simulation Terminals & Intelligence Outputs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Animated Log Console Terminal */}
          <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-[11px] text-slate-300 space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-900 mb-2.5 text-slate-500 font-bold uppercase tracking-wider text-[9px]">
              <span className="flex items-center gap-1.5"><Radio size={12} className="text-blue-400" /> Virtual Engine Telemetry</span>
              <span>Modbus-RPC Session</span>
            </div>
            
            <div className="space-y-1 max-h-[8rem] overflow-y-auto">
              {terminalLogs.length === 0 ? (
                <p className="text-slate-650 text-slate-600">Terminal idle. Click "Compute Dynamic Trajectory" to initialize simulation telemetry clone session...</p>
              ) : (
                terminalLogs.map((log, i) => {
                  let colorClass = "text-slate-300";
                  if (log.startsWith("[SUCCESS]")) colorClass = "text-emerald-400 font-bold";
                  if (log.startsWith("[ERROR]")) colorClass = "text-rose-400 font-bold";
                  if (log.startsWith("[INIT]")) colorClass = "text-blue-400";
                  return (
                    <p key={i} className={`${colorClass} leading-relaxed`}>{log}</p>
                  );
                })
              )}
            </div>
          </div>

          {/* AI Predicted Outcome Gauges */}
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Dynamic Predictions Outputs</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Quantified metrics variance simulated for current sector inputs</p>
              </div>
              {source && (
                <span className="text-[10px] bg-slate-900 text-slate-100 font-mono font-bold py-0.5 px-2 rounded uppercase tracking-wider">
                  Source: {source}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              
              {/* Box 1: Revenue delta */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Revenue Shift</span>
                  <DollarSign size={13} className="text-blue-600" />
                </div>
                <div className="mt-2.5">
                  <p className={`text-xl font-black font-mono tracking-tight ${simulationResult.predictions.projectedRevenueChange >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {simulationResult.predictions.projectedRevenueChange >= 0 ? '+' : ''}
                    {simulationResult.predictions.projectedRevenueChange}%
                  </p>
                  <p className="text-[8px] text-slate-400 mt-0.5 uppercase tracking-wider">Growth Shift</p>
                </div>
              </div>

              {/* Box 2: Marginal Costs delta */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Costs Shift</span>
                  <Package size={13} className="text-slate-500" />
                </div>
                <div className="mt-2.5">
                  <p className={`text-xl font-black font-mono tracking-tight ${simulationResult.predictions.projectedMarginalCostChange <= 0 ? 'text-emerald-600' : 'text-slate-700'}`}>
                    {simulationResult.predictions.projectedMarginalCostChange >= 0 ? '+' : ''}
                    {simulationResult.predictions.projectedMarginalCostChange}%
                  </p>
                  <p className="text-[8px] text-slate-400 mt-0.5 uppercase tracking-wider">Overhead Shift</p>
                </div>
              </div>

              {/* Box 3: Customer churn score / retention */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Retention</span>
                  <Users size={13} className="text-blue-600" />
                </div>
                <div className="mt-2.5">
                  <p className="text-xl font-black font-mono tracking-tight text-slate-800">
                    {simulationResult.predictions.projectedCustomerRetention}%
                  </p>
                  <p className="text-[8px] text-slate-400 mt-0.5 uppercase tracking-wider">Loyalty Shift</p>
                </div>
              </div>

              {/* Box 4: Fatigue Quotient */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Fatigue</span>
                  <Flame size={13} className="text-rose-500" />
                </div>
                <div className="mt-2.5">
                  <p className={`text-xl font-black font-mono tracking-tight ${simulationResult.predictions.projectedWorkforceFatigue > 65 ? 'text-rose-600' : 'text-slate-700'}`}>
                    {simulationResult.predictions.projectedWorkforceFatigue}%
                  </p>
                  <p className="text-[8px] text-slate-400 mt-0.5 uppercase tracking-wider">Human Load</p>
                </div>
              </div>
            </div>

            {/* Simulated Executive Translation and Diagnostics Details */}
            <div className="mt-5 pt-4 border-t border-slate-100 space-y-3.5">
              <div className="bg-blue-50/20 p-3.5 rounded-lg border border-blue-100">
                <div className="flex items-center gap-1.5 text-[10px] text-blue-700 font-bold uppercase tracking-wider mb-1">
                  <Sparkles size={14} className="text-blue-600 animate-pulse" /> Executive Cognitive Diagnosis
                </div>
                <p className="text-xs text-slate-600 leading-normal font-sans">{simulationResult.executiveSummary}</p>
              </div>

              {/* Grid of micro domain remarks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-sans mt-3">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-150 border-slate-200">
                  <span className="font-bold text-[9px] uppercase tracking-wider text-blue-600 block mb-0.5">Market Sensitivity</span>
                  <p className="text-slate-500 leading-normal text-[10px]">{simulationResult.diagnostics.marketSensitivity}</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="font-bold text-[9px] uppercase tracking-wider text-rose-500 block mb-0.5">Workforce Risk</span>
                  <p className="text-slate-500 leading-normal text-[10px]">{simulationResult.diagnostics.workforceRisk}</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="font-bold text-[9px] uppercase tracking-wider text-emerald-600 block mb-0.5">Supply Status</span>
                  <p className="text-slate-500 leading-normal text-[10px]">{simulationResult.diagnostics.supplyChainStatus}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cognitive Optimization step actions table */}
          {simulationResult.recommendations && simulationResult.recommendations.length > 0 && (
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Sparkles size={16} className="text-blue-500" /> Smart Action Realignment Playbook
              </h4>
              
              <div className="space-y-3 font-sans">
                {simulationResult.recommendations.map((rec, i) => (
                  <div key={i} className="flex gap-4 p-3 border border-slate-100 hover:border-blue-155 hover:border-blue-200 rounded-lg hover:bg-slate-50/40 transition">
                    <div className="shrink-0 flex flex-col items-center gap-1 text-center font-bold tracking-tight text-[10px] font-mono text-slate-400 bg-slate-50 py-2 px-1.5 rounded-lg border border-slate-200 h-14 w-20 border-l-2 border-l-blue-600">
                      <Clock size={14} className="text-blue-500" />
                      <span className="text-[8px] leading-tight text-slate-500 mt-1 uppercase">{rec.tier.split(' ')[0]}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h5 className="font-bold text-xs text-slate-800 uppercase">{rec.title}</h5>
                        <span className="inline-block text-[9px] font-bold bg-blue-50 text-blue-750 text-blue-700 px-2 py-0.5 rounded border border-blue-100 font-mono">
                          {rec.impact}
                        </span>
                      </div>
                      <p className="text-[11px] leading-normal text-slate-500">{rec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
