import { HistoricMetricPoint, TelemetryEvent, SimulationState, CognitiveResult } from '../types';

export const initialTelemetry: TelemetryEvent[] = [
  {
    id: 't1',
    timestamp: '14:48:12',
    domain: 'systems',
    message: 'Cognitive loop synced: local telemetry accuracy calculated at 99.4%',
    severity: 'success'
  },
  {
    id: 't2',
    timestamp: '14:50:05',
    domain: 'inventory',
    message: 'Inventory warning: RAW_STEEL_B buffering near trigger point of 40%',
    severity: 'warning'
  },
  {
    id: 't3',
    timestamp: '14:52:19',
    domain: 'sales',
    message: 'Pricing update: customer elasticity indices stable at 1.05 benchmark',
    severity: 'info'
  },
  {
    id: 't4',
    timestamp: '14:55:00',
    domain: 'workforce',
    message: 'FTE shift complete: Morning fatigue quotient resolved within standard tolerances',
    severity: 'success'
  },
  {
    id: 't5',
    timestamp: '14:56:10',
    domain: 'inventory',
    message: 'Incoming delivery finalized: 50 units raw copper buffer deposited safely',
    severity: 'success'
  }
];

export const historicMetrics: HistoricMetricPoint[] = [
  { period: 'Jan', revenue: 24000, cost: 18500, reorderLevel: 50, currentStock: 75, staffRetention: 95, workforceEfficiency: 88 },
  { period: 'Feb', revenue: 27000, cost: 19100, reorderLevel: 50, currentStock: 68, staffRetention: 95, workforceEfficiency: 90 },
  { period: 'Mar', revenue: 31000, cost: 23000, reorderLevel: 55, currentStock: 80, staffRetention: 92, workforceEfficiency: 85 },
  { period: 'Apr', revenue: 29000, cost: 21500, reorderLevel: 55, currentStock: 52, staffRetention: 92, workforceEfficiency: 86 },
  { period: 'May', revenue: 35000, cost: 24200, reorderLevel: 60, currentStock: 90, staffRetention: 96, workforceEfficiency: 92 },
  { period: 'Jun', revenue: 39000, cost: 26800, reorderLevel: 60, currentStock: 78, staffRetention: 94, workforceEfficiency: 95 },
  { period: 'Jul', revenue: 42000, cost: 28000, reorderLevel: 60, currentStock: 65, staffRetention: 94, workforceEfficiency: 91 }
];

export const industryOptions = [
  { value: 'Light Manufacturing', label: '🛠️ Light Manufacturing' },
  { value: 'Retail & E-commerce', label: '🛍️ Retail & E-commerce' },
  { value: 'Business Services', label: '💼 Professional & B2B Services' },
  { value: 'Food & Hospitality', label: '🍵 Food & Beverage Services' }
];

export const focusAreaOptions = [
  { value: 'Maximize Profit Margin', label: '📈 Maximize Operating Margin' },
  { value: 'Mitigate Stockout Risk', label: '📦 Supply Chain Resilience' },
  { value: 'Employee Retention & Comfort', label: '👥 Workforce Sustainability' },
  { value: 'Balanced Steady State', label: '⚖️ Integrated Equilibrium' }
];

export const defaultCognitiveResult = {
  executiveSummary: "Cognitive Twin ready. Enter target adjustments and click 'Compute Dynamic Trajectory' above to dispatch a high-fidelity prediction session to our Gemini Intelligence Engine.",
  diagnostics: {
    marketSensitivity: "Pending active simulation run parameters.",
    workforceRisk: "Pending active workforce parameters.",
    supplyChainStatus: "Pending live materials parameters."
  },
  predictions: {
    projectedRevenueChange: 0,
    projectedMarginalCostChange: 0,
    projectedCustomerRetention: 90,
    projectedWorkforceFatigue: 45
  },
  recommendations: []
};
