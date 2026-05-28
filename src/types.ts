/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BusinessDomain = 'cockpit' | 'sales' | 'inventory' | 'workforce' | 'simulation' | 'knowledge';

export interface CognitiveDiagnostics {
  marketSensitivity: string;
  workforceRisk: string;
  supplyChainStatus: string;
}

export interface CognitivePredictions {
  projectedRevenueChange: number;
  projectedMarginalCostChange: number;
  projectedCustomerRetention: number;
  projectedWorkforceFatigue: number;
}

export interface CognitiveRecommendation {
  tier: string;
  title: string;
  impact: string;
  description: string;
}

export interface CognitiveResult {
  executiveSummary: string;
  diagnostics: CognitiveDiagnostics;
  predictions: CognitivePredictions;
  recommendations: CognitiveRecommendation[];
}

export interface SimulationState {
  industryType: string;
  priceAdjust: number;
  marketingSpend: number;
  staffingLevel: number;
  inventoryLevel: number;
  focusArea: string;
}

export interface TelemetryEvent {
  id: string;
  timestamp: string;
  domain: 'sales' | 'inventory' | 'workforce' | 'systems';
  message: string;
  severity: 'info' | 'success' | 'warning' | 'danger';
}

export interface HistoricMetricPoint {
  period: string;
  revenue: number;
  cost: number;
  reorderLevel: number;
  currentStock: number;
  staffRetention: number;
  workforceEfficiency: number;
}
