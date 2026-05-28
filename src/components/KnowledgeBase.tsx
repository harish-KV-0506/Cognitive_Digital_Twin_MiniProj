/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  BookOpen, Layers, ShieldCheck, Cpu, ArrowRight, EyeOff, Radio, Box, Terminal, Lightbulb, Users
} from 'lucide-react';

export default function KnowledgeBase() {
  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Visual Metaphor Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 relative overflow-hidden shadow-lg border border-slate-800">
        <div className="absolute top-0 right-0 p-12 opacity-5 translate-x-12 translate-y-[-10px]">
          <BookOpen size={240} className="text-white" />
        </div>
        
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2.5 py-1 rounded uppercase tracking-widest border border-blue-500/30">
            Framework Philosophy
          </span>
          <h3 className="text-2xl font-black tracking-tight uppercase">The "Mist-In-Tunnel" Scientific Moniker</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Small and Medium Enterprises (MSMEs) operate in a highly volatile market environment characterized by severe structural noise—this is <strong>"The Mist"</strong>.
            Conventional business dashboards are purely retrospective, failing to illuminate the road ahead. Our Cognitive Digital Twin constructs a virtual high-fidelity model that acts as a secure, optimized guideline pathway—this is <strong>"The Tunnel"</strong>.
          </p>
        </div>
      </div>

      {/* Grid: Architecture Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        
        {/* Left 3 columns: Interactive Flow Diagram */}
        <div className="lg:col-span-3 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Cognitive Digital Twin (CDT) Architecture Overview</h4>
            <p className="text-[11px] text-slate-550 text-slate-400 mt-1">Multi-layered simulation from real-world sensors to smart generative business advice.</p>
          </div>

          {/* Core Diagram Stages */}
          <div className="space-y-3.5">
            
            {/* Layer 1: Data ingestion */}
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg flex gap-3 items-start hover:border-blue-200 transition">
              <span className="p-2 bg-blue-50 text-blue-600 rounded shrink-0">
                <Radio size={16} />
              </span>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-700 uppercase tracking-tight">
                  <span>Layer 1: Real-World Twin Telemetry Ingest</span>
                  <span className="text-[9px] bg-blue-50 text-blue-600 font-mono px-1.5 py-0.5 rounded font-bold">ERP / IoT</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Continuous feed of sales CRM logs, physical catalog inventory counts, freight delivery times, and worker hours.
                </p>
              </div>
            </div>

            {/* Downward arrow marker */}
            <div className="flex justify-center text-slate-300">
              <CornerDownRight size={18} className="translate-x-[-120px]" />
            </div>

            {/* Layer 2: Digital Twin Simulation Modeling */}
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg flex gap-3 items-start hover:border-blue-200 transition">
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded shrink-0">
                <Box size={16} />
              </span>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-700 uppercase tracking-tight">
                  <span>Layer 2: Multi-Domain Steady State Simulation</span>
                  <span className="text-[9px] bg-emerald-50 text-emerald-600 font-mono px-1.5 py-0.5 rounded font-bold">Twin Sandbox</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Mathematical sandboxing evaluating demand curves, material carrying margins, and human fatigue load thresholds.
                </p>
              </div>
            </div>

            {/* Downward arrow marker */}
            <div className="flex justify-center text-slate-300">
              <CornerDownRight size={18} className="translate-x-[-120px]" />
            </div>

            {/* Layer 3: Cognitive reasoning broker */}
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg flex gap-3 items-start hover:border-blue-200 transition">
              <span className="p-2 bg-blue-50 text-blue-600 rounded shrink-0">
                <Cpu size={16} />
              </span>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-700 uppercase tracking-tight">
                  <span>Layer 3: Cognitive Decision Intelligence Broker</span>
                  <span className="text-[9px] bg-blue-50 text-blue-600 font-mono px-1.5 py-0.5 rounded font-bold">Gemini API</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Generative constraints modeling and smart heuristics optimization recommending action playbooks from structural simulations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2 columns: Academic Reference and Methodology specifics */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Framework indicators card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3.5">
            <h4 className="font-bold text-slate-850 text-slate-800 text-xs uppercase tracking-wider">Key Academic Pillars for MSMEs</h4>
            
            <div className="space-y-3.5 text-xs font-sans">
              <div className="space-y-1">
                <h5 className="font-bold text-slate-700 uppercase tracking-tight text-[11px]">1. Predictive Sustainability</h5>
                <p className="text-slate-500 leading-normal text-[11px]">
                  Transforms traditional backward-looking analytics into automated predictive recommendations, removing human intuitive delays.
                </p>
              </div>

              <div className="space-y-1">
                <h5 className="font-bold text-slate-700 uppercase tracking-tight text-[11px]">2. Constraint Awareness</h5>
                <p className="text-slate-500 leading-normal text-[11px]">
                  Bridges workforce stress limits with safety stockpiles, ensuring pricing optimizations do not overload operations.
                </p>
              </div>

              <div className="space-y-1">
                <h5 className="font-bold text-slate-700 uppercase tracking-tight text-[11px]">3. Scalable Accessibility</h5>
                <p className="text-slate-500 leading-normal text-[11px]">
                  Specifies a high-performance framework optimized specifically for smaller enterprises, eliminating expensive supercomputer requirements.
                </p>
              </div>
            </div>
          </div>

          {/* Sample citations box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              <BookOpen size={14} className="text-blue-600" />
              <span>Recommended Presentation Citation</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed italic font-sans pr-1">
              "Integrating Cognitive Intelligence with Digital Twin technology constructs virtual pathways to transition small business management from reactive crisis response into proactive, predictive margins calibration."
            </p>
            <div className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider mt-1.5">
              - MistInTunnel CDT Framework Whitepaper (2026)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple layout indicator helper
const CornerDownRight = ({ size, className }: { size: number; className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m15 10-5 5-5-5" />
    <path d="M10 3v12" />
  </svg>
);
