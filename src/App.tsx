/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, TrendingUp, Package, Users, Cpu, BookOpen, 
  Activity, Layers, Sparkles, RefreshCw
} from 'lucide-react';
import { BusinessDomain, HistoricMetricPoint, TelemetryEvent, SimulationState } from './types';
import { historicMetrics, initialTelemetry } from './utils/dummyData';

// Modular Sub-Components
import CockpitDashboard from './components/CockpitDashboard';
import SalesTwin from './components/SalesTwin';
import InventoryTwin from './components/InventoryTwin';
import WorkforceTwin from './components/WorkforceTwin';
import SimulationEngine from './components/SimulationEngine';
import KnowledgeBase from './components/KnowledgeBase';

export default function App() {
  const [activeTab, setActiveTab] = useState<BusinessDomain>('cockpit');
  const [isSyncing, setIsSyncing] = useState(false);
  const [historicData, setHistoricData] = useState<HistoricMetricPoint[]>(historicMetrics);
  const [telemetry, setTelemetry] = useState<TelemetryEvent[]>(initialTelemetry);
  
  // Simulated core state for current active twin parameters
  const [twinConfig, setTwinConfig] = useState<SimulationState>({
    industryType: 'Light Manufacturing',
    priceAdjust: 1.1,
    marketingSpend: 1800,
    staffingLevel: 12,
    inventoryLevel: 65,
    focusArea: 'Maximize Profit Margin'
  });

  // Handler to update global simulated factors across tabs
  const handleUpdateSimState = (newState: SimulationState) => {
    setTwinConfig(newState);

    // Dynamic adjustment of the historic metrics array based on user adjustments
    const multiplier = (newState.priceAdjust * 0.95) + (Math.log10(1 + newState.marketingSpend) / 4.4);
    
    const adjustedHistory = historicMetrics.map(pt => ({
      ...pt,
      revenue: Math.round(pt.revenue * multiplier),
      cost: Math.round(pt.cost * (0.85 + (newState.staffingLevel * 1200 + newState.marketingSpend * 0.9) / 25000)),
      currentStock: Math.round(Math.min(100, Math.max(10, pt.currentStock * (newState.inventoryLevel / 65)))),
      workforceEfficiency: Math.round(Math.max(30, Math.min(100, pt.workforceEfficiency * (98 - Math.max(0, newState.priceAdjust - 1.2) * 15) / 98)))
    }));

    setHistoricData(adjustedHistory);

    // Append a custom event to the logging telemetry matching the simulation dispatch
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0];
    const simEvent: TelemetryEvent = {
      id: `sim-ev-${Date.now()}`,
      timestamp,
      domain: 'systems',
      message: `Cognitive parameters synchronized! Price: ${newState.priceAdjust}x / Staff: ${newState.staffingLevel} FTE / Buffer: ${newState.inventoryLevel}%`,
      severity: 'success'
    };
    setTelemetry(prev => [simEvent, ...prev]);
  };

  // ERP Sync handler
  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      
      // Induce slight variety to simulate active physical sync
      const randomFactor = 0.98 + (Math.random() * 0.04);
      const syncedHistory = historicData.map(pt => ({
        ...pt,
        revenue: Math.round(pt.revenue * randomFactor),
        cost: Math.round(pt.cost * (0.99 + Math.random() * 0.02)),
        currentStock: Math.round(Math.min(100, Math.max(10, pt.currentStock * (0.97 + Math.random() * 0.06))))
      }));
      setHistoricData(syncedHistory);

      const now = new Date();
      const timestamp = now.toTimeString().split(' ')[0];
      const syncEvent: TelemetryEvent = {
        id: `sync-ev-${Date.now()}`,
        timestamp,
        domain: 'systems',
        message: 'Active Physical-Twin Sync: Modbus registers and sales ledger databases synced successfully.',
        severity: 'success'
      };
      setTelemetry(prev => [syncEvent, ...prev]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800 overflow-hidden">
      
      {/* Sidebar navigation drawer */}
      <aside className="w-60 bg-slate-950 text-white flex flex-col shrink-0 border-r border-slate-800 justify-between">
        <div>
          {/* Logo Brand Header */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center font-bold text-sm tracking-tighter">
                MT
              </div>
              <h1 className="text-lg font-bold tracking-tight text-white">MistInTunnel</h1>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Decision Intelligence</span>
            </div>
          </div>

          {/* Navigation Items list */}
          <nav className="flex-1 px-3 space-y-1">
            <NavItem 
              active={activeTab === 'cockpit'} 
              onClick={() => setActiveTab('cockpit')} 
              icon={<LayoutDashboard size={16} />} 
              label="Cockpit Dashboard" 
            />
            
            <div className="pt-3 pb-1 px-3">
              <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest block">Simulation Layers</span>
            </div>

            <NavItem 
              active={activeTab === 'sales'} 
              onClick={() => setActiveTab('sales')} 
              icon={<TrendingUp size={16} />} 
              label="Sales & Demand" 
            />
            <NavItem 
              active={activeTab === 'inventory'} 
              onClick={() => setActiveTab('inventory')} 
              icon={<Package size={16} />} 
              label="Supply Chain Twin" 
            />
            <NavItem 
              active={activeTab === 'workforce'} 
              onClick={() => setActiveTab('workforce')} 
              icon={<Users size={16} />} 
              label="Workforce & Fatigue" 
            />

            <div className="pt-3 pb-1 px-3">
              <span className="text-[9px] text-slate-500 font-extrabold uppercase tracking-widest block">Intelligent Core</span>
            </div>

            <NavItem 
              active={activeTab === 'simulation'} 
              onClick={() => setActiveTab('simulation')} 
              icon={<Cpu size={16} />} 
              label="What-If Simulator" 
            />
            <NavItem 
              active={activeTab === 'knowledge'} 
              onClick={() => setActiveTab('knowledge')} 
              icon={<BookOpen size={16} />} 
              label="Methodology Info" 
            />
          </nav>
        </div>

        {/* Footer info box describing digital twin sync status */}
        <div className="p-4 mt-auto">
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Twin Synced</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              Last ERP Update: active. System status healthy.
            </p>
          </div>
        </div>
      </aside>

      {/* Main workspace container */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Dynamic header */}
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 shrink-0 shadow-sm relative z-10">
          <div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <span>Cognitive Decision Intelligence Workspace</span>
              <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono border border-blue-100 font-bold uppercase tracking-wider">
                Active Client
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Predictive MSME Digital Twin Modeling v2.4
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick sync Action */}
            <button
              onClick={handleTriggerSync}
              disabled={isSyncing}
              className="px-4 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg tracking-tight transition flex items-center gap-1.5 disabled:bg-slate-100 disabled:text-slate-400 cursor-pointer"
            >
              <RefreshCw size={13} className={isSyncing ? "animate-spin" : ""} />
              {isSyncing ? "Syncing..." : "Sync ERP Data"}
            </button>
            
            <div className="h-6 w-px bg-slate-200"></div>

            <div className="bg-slate-50 rounded-lg p-1 flex items-center gap-2 border border-slate-200">
              <span className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold font-mono">
                AI
              </span>
              <span className="text-xs font-semibold text-slate-700 pr-1.5">SME Node 1</span>
            </div>
          </div>
        </header>

        {/* Dynamic Workspace Switcher */}
        <div className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {activeTab === 'cockpit' && (
            <CockpitDashboard 
              historicData={historicData} 
              telemetry={telemetry}
              onTriggerSync={handleTriggerSync}
              isSyncing={isSyncing}
              industry={twinConfig.industryType}
            />
          )}

          {activeTab === 'sales' && <SalesTwin />}

          {activeTab === 'inventory' && <InventoryTwin />}

          {activeTab === 'workforce' && <WorkforceTwin />}

          {activeTab === 'simulation' && (
            <SimulationEngine onUpdateState={handleUpdateSimState} />
          )}

          {activeTab === 'knowledge' && <KnowledgeBase />}
        </div>
      </main>
    </div>
  );
}

// Sub-navigation element helper
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition duration-200 cursor-pointer text-left ${
        active 
          ? 'bg-blue-600/10 text-blue-400 font-bold border border-blue-500/10' 
          : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
      }`}
    >
      <span className={active ? "text-blue-400" : "text-slate-500"}>
        {icon}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
