import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Zap, 
  Fuel, 
  Clock, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  FileSpreadsheet,
  Globe
} from 'lucide-react';
import { GENSET_PRODUCTS } from '../data/gensets';
import { ASEAN_COUNTRIES } from '../data/asean';
import { GensetProduct } from '../types';

interface InteractiveSizerProps {
  onOpenRfqWithData: (modelId: string, customKw: number, freq: string, canopy: string) => void;
  onViewSpecs: (product: GensetProduct) => void;
}

export const InteractiveSizer: React.FC<InteractiveSizerProps> = ({
  onOpenRfqWithData,
  onViewSpecs,
}) => {
  const [inputKw, setInputKw] = useState<number>(100);
  const [safetyMargin, setSafetyMargin] = useState<number>(20); // 20%
  const [dailyHours, setDailyHours] = useState<number>(8);
  const [selectedCountryId, setSelectedCountryId] = useState<string>('philippines');
  const [applicationDuty, setApplicationDuty] = useState<'prime' | 'standby'>('prime');
  const [dieselPricePerLiter, setDieselPricePerLiter] = useState<number>(0.95); // USD approx

  const currentCountry = useMemo(() => {
    return ASEAN_COUNTRIES.find(c => c.id === selectedCountryId) || ASEAN_COUNTRIES[0];
  }, [selectedCountryId]);

  // Recommended generator sizing calculation
  const recommendedKw = useMemo(() => {
    return Math.round(inputKw * (1 + safetyMargin / 100));
  }, [inputKw, safetyMargin]);

  const recommendedKva = useMemo(() => {
    return Math.round(recommendedKw / 0.8);
  }, [recommendedKw]);

  // Find optimal matching model from GENSET_PRODUCTS
  const matchedGenset = useMemo(() => {
    // Find the closest model where primePowerKw >= recommendedKw
    const found = GENSET_PRODUCTS.find(g => g.primePowerKw >= recommendedKw);
    return found || GENSET_PRODUCTS[GENSET_PRODUCTS.length - 1];
  }, [recommendedKw]);

  // Fuel calculations
  const hourlyFuelBurnL = useMemo(() => {
    if (!matchedGenset) return 0;
    // Base is 100% prime load; if actual load is lower, adjust proportionally with realistic fuel curve
    const loadRatio = Math.min(1, Math.max(0.3, inputKw / matchedGenset.primePowerKw));
    return Math.round(matchedGenset.fuelConsumptionLh * (0.25 + 0.75 * loadRatio) * 10) / 10;
  }, [matchedGenset, inputKw]);

  const monthlyFuelLiters = useMemo(() => {
    return Math.round(hourlyFuelBurnL * dailyHours * 26); // 26 working days
  }, [hourlyFuelBurnL, dailyHours]);

  const monthlyFuelCostUsd = useMemo(() => {
    return Math.round(monthlyFuelLiters * dieselPricePerLiter);
  }, [monthlyFuelLiters, dieselPricePerLiter]);

  const recommendedCanopy = useMemo(() => {
    if (matchedGenset.primePowerKw >= 1000) return 'container';
    if (matchedGenset.primePowerKw >= 500) return 'container';
    if (inputKw <= 80 && applicationDuty === 'standby') return 'silent';
    return 'silent';
  }, [matchedGenset, inputKw, applicationDuty]);

  return (
    <section id="calculator" className="bg-slate-50/70 py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-blue-600" /> B2B Engineering Tool
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Diesel Generator Sizing & Fuel Consumption Calculator
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Instantly compute the exact Yuchai genset capacity, hourly diesel burn, and ASEAN grid compliance 
            tailored to your project load profile and destination port.
          </p>
        </div>

        {/* Two-Column Interactive Tool Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Parameters Controls */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                Step 1: Define Your Electrical Load
              </h3>
              <span className="text-xs text-blue-600 font-mono font-semibold">cos φ = 0.8</span>
            </div>

            {/* Load Input Slider & Direct Number */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <label className="text-slate-700 font-medium">Estimated Peak Power Load (kW):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={20}
                    max={2200}
                    value={inputKw}
                    onChange={(e) => setInputKw(Math.max(20, Math.min(2200, Number(e.target.value) || 20)))}
                    className="w-24 px-2 py-1 rounded-lg bg-slate-50 border border-slate-300 text-blue-700 font-mono font-bold text-right focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                  <span className="text-slate-500 text-xs font-mono">kW</span>
                </div>
              </div>
              <input
                type="range"
                min={20}
                max={1500}
                step={10}
                value={inputKw}
                onChange={(e) => setInputKw(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>30 kW (Shops)</span>
                <span>100 kW (Factory)</span>
                <span>500 kW (Mining)</span>
                <span>1000+ kW (Data Center)</span>
              </div>
            </div>

            {/* Quick Sizing Presets */}
            <div>
              <label className="block text-xs text-slate-500 mb-2 font-medium">Common Load Presets:</label>
              <div className="grid grid-cols-4 gap-2 text-xs">
                {[
                  { label: '50 kW', val: 50 },
                  { label: '100 kW', val: 100 },
                  { label: '200 kW', val: 200 },
                  { label: '500 kW', val: 500 },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => setInputKw(preset.val)}
                    className={`py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      inputKw === preset.val
                        ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Destination ASEAN Country & Electrical Grid */}
            <div className="space-y-2">
              <label className="block text-xs text-slate-700 font-medium flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                Target ASEAN Destination (Select for Grid Calibration):
              </label>
              <select
                value={selectedCountryId}
                onChange={(e) => setSelectedCountryId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-800 text-xs focus:border-blue-500 outline-none"
              >
                {ASEAN_COUNTRIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.flag} {c.name} — {c.voltageFrequency} ({c.mainCert})
                  </option>
                ))}
              </select>
              <div className="text-[11px] text-blue-600 flex items-center gap-1">
                <span className="text-slate-500">Grid match:</span>
                <span className="font-semibold text-slate-800">{currentCountry.voltageFrequency}</span>
                {currentCountry.id === 'philippines' && (
                  <span className="text-blue-700 font-bold ml-1">(Dedicated 60Hz 1800rpm required)</span>
                )}
              </div>
            </div>

            {/* Duty Type & Safety Margin */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-700 font-medium mb-1.5">Duty Cycle:</label>
                <div className="flex rounded-lg overflow-hidden border border-slate-300 p-0.5 bg-slate-100 text-xs">
                  <button
                    type="button"
                    onClick={() => setApplicationDuty('prime')}
                    className={`flex-1 py-1.5 rounded-md text-center transition-colors cursor-pointer ${
                      applicationDuty === 'prime' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Prime (Continuous)
                  </button>
                  <button
                    type="button"
                    onClick={() => setApplicationDuty('standby')}
                    className={`flex-1 py-1.5 rounded-md text-center transition-colors cursor-pointer ${
                      applicationDuty === 'standby' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Standby (Emergency)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-700 font-medium mb-1.5">
                  Startup Reserve Margin:
                </label>
                <select
                  value={safetyMargin}
                  onChange={(e) => setSafetyMargin(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-800 text-xs focus:border-blue-500 outline-none"
                >
                  <option value={15}>15% (Resistive / Light loads)</option>
                  <option value={20}>20% (Standard Industrial)</option>
                  <option value={30}>30% (Heavy Motor Inrush / Pumps)</option>
                  <option value={40}>40% (Crushers / Welders)</option>
                </select>
              </div>
            </div>

            {/* Operating Hours & Diesel Price for OPEX forecast */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs text-slate-700 font-medium mb-1">
                  Daily Run Time (Hours):
                </label>
                <input
                  type="number"
                  min={1}
                  max={24}
                  value={dailyHours}
                  onChange={(e) => setDailyHours(Math.max(1, Math.min(24, Number(e.target.value) || 1)))}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-800 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-700 font-medium mb-1">
                  Est. Fuel Cost (USD / Liter):
                </label>
                <input
                  type="number"
                  step={0.05}
                  min={0.5}
                  max={3}
                  value={dieselPricePerLiter}
                  onChange={(e) => setDieselPricePerLiter(Number(e.target.value) || 0.95)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-800 text-xs font-mono"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Calculated Engineering Results & Recommended Model */}
          <div className="lg:col-span-6 bg-white rounded-2xl border-2 border-blue-600 p-6 sm:p-8 space-y-6 shadow-xl shadow-blue-500/10 relative">
            
            {/* Recommendation Ribbon */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-blue-600 font-bold tracking-wider">
                  OPTIMAL MATCHED SPECIFICATION
                </span>
                <h3 className="text-2xl font-black text-slate-900 font-['Space_Grotesk'] mt-0.5">
                  {matchedGenset.model} &bull; {matchedGenset.primePowerKw} kW / {matchedGenset.primePowerKva} kVA
                </h3>
              </div>
              <div className="text-right">
                <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {matchedGenset.emissionStandard}
                </span>
              </div>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] text-slate-500">Recommended Prime</div>
                <div className="text-lg font-bold text-blue-600 font-mono">{matchedGenset.primePowerKw} kW</div>
                <div className="text-[10px] text-slate-500 font-mono">{matchedGenset.primePowerKva} kVA</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] text-slate-500">Engine Platform</div>
                <div className="text-sm font-bold text-slate-900 truncate mt-1">{matchedGenset.engineModel}</div>
                <div className="text-[10px] text-slate-500 font-mono">{matchedGenset.displacementL}L &bull; {matchedGenset.cylinders} Cyl</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] text-slate-500">Hourly Fuel Burn</div>
                <div className="text-lg font-bold text-emerald-600 font-mono">~{hourlyFuelBurnL} L/h</div>
                <div className="text-[10px] text-slate-500">at {Math.round(inputKw)}kW Load</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] text-slate-500">Alternator (100% Cu)</div>
                <div className="text-sm font-bold text-slate-900 truncate mt-1">TFW Brushless</div>
                <div className="text-[10px] text-blue-600 font-medium">AVR ±1% Class H</div>
              </div>
            </div>

            {/* Fuel OPEX Estimate Box */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-700 flex items-center gap-1.5 font-medium">
                  <Fuel className="w-4 h-4 text-blue-600" />
                  Estimated Monthly Fuel Consumption ({dailyHours} hrs/day, 26 days):
                </span>
                <span className="font-mono text-blue-700 font-bold text-sm">
                  {monthlyFuelLiters.toLocaleString()} Liters
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1.5 border-t border-blue-100">
                <span>Estimated Monthly Diesel Cost (at ${dieselPricePerLiter}/L):</span>
                <span className="font-mono text-slate-900 font-bold">
                  ~${monthlyFuelCostUsd.toLocaleString()} USD / month
                </span>
              </div>
            </div>

            {/* ASEAN Grid Compatibility Note */}
            <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-xs text-slate-700 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sky-900">{currentCountry.name} Market Compatibility:</strong>{' '}
                Calibrated for {currentCountry.voltageFrequency}. Zhiqiang factory supplies Form E certificate for{' '}
                <strong className="text-emerald-700">0% customs tariff</strong>. Compliance: {currentCountry.mainCert}.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => onViewSpecs(matchedGenset)}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                <span>View Full Spec Sheet</span>
              </button>

              <button
                onClick={() => onOpenRfqWithData(
                  matchedGenset.id, 
                  matchedGenset.primePowerKw, 
                  currentCountry.frequency.includes('60Hz') ? '60Hz / 220V-380V' : '50Hz / 400V',
                  recommendedCanopy
                )}
                className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Quotation for {matchedGenset.model}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
