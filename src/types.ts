export type PowerCategory = 'compact' | 'medium' | 'heavy' | 'megawatt';

export type CanopyType = 'open' | 'silent' | 'container' | 'trailer';

export type FrequencyType = '50Hz' | '60Hz' | 'Dual';

export interface GensetProduct {
  id: string;
  model: string; // e.g. TFW-100
  primePowerKw: number;
  primePowerKva: number;
  standbyPowerKw: number;
  standbyPowerKva: number;
  engineModel: string; // e.g. YC6B180L-D20
  engineFamily?: 'Compact Series (30–100kW)' | 'Workhorse Series (120–350kW)' | 'Heavy Industrial (400–800kW)' | 'Megawatt Power (1000–2200kW)';
  perkinsBenchmark?: string; // Perkins equivalent model for cross-referencing
  electropakReady?: boolean; // ElectropaK pre-engineered radiator and base package
  cylinders: number;
  displacementL: number;
  boreStroke: string;
  aspiration?: string;
  fuelConsumptionLh: number; // L/h at 100% load
  fuelRateGkwh: number; // g/kWh (玉柴标定 <= 210)
  oilCapacityL: number;
  coolingSystem?: string;
  dimensionsMm: string; // L x W x H
  dryWeightKg: number;
  alternatorModel: string; // TFW brushless
  governorType: 'Electronic' | 'Electronic Unit Pump (EUP)' | 'High Pressure Common Rail (HPCR)';
  frequency: FrequencyType;
  ratedVoltage: string;
  targetAseanMarkets: string[];
  competitiveHighlight: string;
  applications: string[];
  emissionStandard: string;
  image: string;
  noiseLevelOpenDb?: number;
  noiseLevelSilentDb?: number;
  heatRejectionCoolantKw?: number;
  airflowM3Min?: number;
  fuelCurve?: {
    at50Percent: number;
    at75Percent: number;
    at100Percent: number;
    at110Percent: number;
  };
}

export interface MaintenanceKit {
  id: string;
  intervalHours: number;
  title: string;
  badge: string;
  description: string;
  includedParts: string[];
  recommendedFrequency: string;
  estimatedLaborHours: number;
  modelsSupported: string;
}

export interface SparePartItem {
  id: string;
  partNumber: string;
  name: string;
  category: 'Filters' | 'Electrical & AVR' | 'Overhaul Kits' | 'Cooling & Exhaust' | 'Valves & Gaskets';
  compatibleEngines: string[];
  leadTimeDays: string;
  availability: 'In Stock (Direct Dispatch)' | 'Made to Order (7 Days)';
  warrantyMonths: number;
  description: string;
}

export interface AlternatorItem {
  id: string;
  series: 'TFW' | 'STC';
  model: string;
  type: string;
  ratedPowerKw: number;
  ratedPowerKva: number;
  frameCenterHeight?: number;
  voltage: string;
  ratedCurrentA: number;
  speedRpm: number;
  frequency: string;
  powerFactor: number;
  voltageRegulation: string;
  insulationClass: string;
  protectionGrade: string;
  weightKg: number;
  copperType: 'Full Copper (全铜线)' | 'Semi-Copper (半铜线)';
}

export interface AseanCountry {
  id: string;
  name: string;
  chineseName: string;
  flag: string;
  voltageFrequency: string;
  voltage: string;
  frequency: string;
  mainCert: string;
  certAgency: string;
  tariffBenefit: string;
  priorityPowerRange: string;
  marketInsights: string;
  complianceTime: string;
  zhiqiangStatus: string;
  specialNotes: string;
}

export interface SeoKeywordItem {
  cluster: string;
  keyword: string;
  intent: 'Navigation' | 'Commercial' | 'Transaction' | 'Informational';
  targetPage: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface AeoFaqItem {
  id: string;
  category: string;
  question: string;
  shortAnswer: string;
  keyPoints: string[];
  relatedModelId?: string;
}

export interface RfqFormData {
  fullName: string;
  companyName: string;
  email: string;
  phoneOrWhatsApp: string;
  country: string;
  targetGensetModel: string;
  requiredKw: number;
  frequency: '50Hz / 400V' | '60Hz / 220V-380V' | 'Custom';
  canopyType: CanopyType;
  quantity: number;
  incoterm: 'FOB Nansha/Qinzhou' | 'CIF Haiphong' | 'CIF Manila' | 'CIF Jakarta' | 'CIF Klang' | 'CIF Bangkok' | 'EXW Factory';
  includeAts: boolean;
  notes: string;
}
