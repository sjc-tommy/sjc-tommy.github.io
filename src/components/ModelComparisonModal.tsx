import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Scale, 
  Zap, 
  Cpu, 
  Fuel, 
  Gauge, 
  Layers, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Plus,
  Trash2
} from 'lucide-react';
import { GensetProduct } from '../types';
import { GENSET_PRODUCTS } from '../data/gensets';

interface ModelComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModels: GensetProduct[];
  onRemoveModel: (modelId: string) => void;
  onAddModel: (model: GensetProduct) => void;
  onOpenRfq: (modelId: string) => void;
  onViewSpecs: (model: GensetProduct) => void;
}

export const ModelComparisonModal: React.FC<ModelComparisonModalProps> = ({
  isOpen,
  onClose,
  selectedModels,
  onRemoveModel,
  onAddModel,
  onOpenRfq,
  onViewSpecs,
}) => {
  const [highlightDifferences, setHighlightDifferences] = useState(true);
  const [selectorDropdownOpen, setSelectorDropdownOpen] = useState(false);

  if (!isOpen) return null;

  const availableProductsToAdd = GENSET_PRODUCTS.filter(
    p => !selectedModels.some(m => m.id === p.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl rounded-2xl bg-white border border-slate-200 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 shadow-2xs">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Perkins-Grade Side-by-Side Model Comparator
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-mono font-semibold border border-blue-200">
                  {selectedModels.length}/3 Models Selected
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Compare electrical power, engine displacement, fuel burn curves, and Perkins cross-benchmarks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="hidden sm:flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
              <input 
                type="checkbox" 
                checked={highlightDifferences}
                onChange={(e) => setHighlightDifferences(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
              />
              <span>Highlight Differences</span>
            </label>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors border border-slate-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-white">
          
          {selectedModels.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <Scale className="w-12 h-12 text-slate-400 mx-auto" />
              <div className="text-base text-slate-800 font-semibold">No generator models currently selected</div>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Choose up to 3 generator sets from our catalog or quick-select below to evaluate technical specifications side-by-side.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {GENSET_PRODUCTS.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onAddModel(p)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 hover:border-blue-200 flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-blue-600" />
                    <span>{p.model} ({p.primePowerKw}kW)</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs">
                {/* Header Row: Products */}
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-3 w-48 text-slate-600 font-mono uppercase text-[11px] bg-slate-50">
                      Engineering Metric
                    </th>
                    {selectedModels.map((m) => (
                      <th key={m.id} className="p-3 min-w-[240px] align-top bg-slate-50/50 border-l border-slate-200">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[10px] font-mono text-blue-700 font-bold uppercase">
                                {m.engineFamily}
                              </span>
                              <div className="text-base font-bold text-slate-900 tracking-tight">{m.model}</div>
                              <div className="text-xs text-slate-500">{m.primePowerKw} kW / {m.primePowerKva} kVA Prime</div>
                            </div>
                            <button
                              onClick={() => onRemoveModel(m.id)}
                              className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Remove from comparison"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={() => onOpenRfq(m.id)}
                              className="flex-1 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] text-center shadow-xs cursor-pointer transition-colors"
                            >
                              Quote Model
                            </button>
                            <button
                              onClick={() => onViewSpecs(m)}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold border border-slate-200 cursor-pointer transition-colors"
                            >
                              Specs
                            </button>
                          </div>
                        </div>
                      </th>
                    ))}

                    {/* Add another column if less than 3 */}
                    {selectedModels.length < 3 && (
                      <th className="p-3 min-w-[200px] border-l border-slate-200 align-middle bg-slate-50/30">
                        <div className="relative">
                          <button
                            onClick={() => setSelectorDropdownOpen(!selectorDropdownOpen)}
                            className="w-full py-6 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-blue-600 transition-all cursor-pointer bg-white"
                          >
                            <Plus className="w-5 h-5 text-blue-600" />
                            <span className="text-xs font-semibold">Add Model to Compare</span>
                          </button>

                          {selectorDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-64 max-h-60 overflow-y-auto rounded-xl bg-white border border-slate-200 shadow-xl p-1 z-50">
                              <div className="px-3 py-1.5 text-[10px] uppercase font-mono text-slate-500 border-b border-slate-100 font-semibold">
                                Select Genset Model
                              </div>
                              {availableProductsToAdd.map((p) => (
                                <button
                                  key={p.id}
                                  onClick={() => {
                                    onAddModel(p);
                                    setSelectorDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-3 py-2 text-xs hover:bg-blue-50 hover:text-blue-700 rounded-lg text-slate-700 flex items-center justify-between transition-colors"
                                >
                                  <span className="font-semibold">{p.model}</span>
                                  <span className="text-[11px] font-mono text-slate-500">{p.primePowerKw} kW</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </th>
                    )}
                  </tr>
                </thead>

                {/* Table Groups */}
                <tbody className="divide-y divide-slate-200">
                  {/* Category 1: Power & Electrical */}
                  <tr className="bg-blue-50/80 font-bold text-blue-800 font-mono text-[10px] tracking-wider uppercase">
                    <td colSpan={selectedModels.length + 2} className="py-2 px-3">
                      1. Power &amp; Electrical Ratings (ISO 8528)
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-slate-600">Prime Output (kW / kVA)</td>
                    {selectedModels.map((m) => (
                      <td key={m.id} className="p-3 border-l border-slate-200 font-bold text-slate-900 text-sm">
                        {m.primePowerKw} kW / {m.primePowerKva} kVA
                      </td>
                    ))}
                    {selectedModels.length < 3 && <td className="border-l border-slate-200"></td>}
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-slate-600">Standby Rating (kW / kVA)</td>
                    {selectedModels.map((m) => (
                      <td key={m.id} className="p-3 border-l border-slate-200 text-blue-700 font-semibold">
                        {m.standbyPowerKw} kW / {m.standbyPowerKva} kVA
                      </td>
                    ))}
                    {selectedModels.length < 3 && <td className="border-l border-slate-200"></td>}
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-slate-600">Alternator Architecture</td>
                    {selectedModels.map((m) => (
                      <td key={m.id} className="p-3 border-l border-slate-200 text-slate-800">
                        {m.alternatorModel} (100% Electrolytic Copper)
                      </td>
                    ))}
                    {selectedModels.length < 3 && <td className="border-l border-slate-200"></td>}
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-slate-600">Perkins Equivalent Benchmark</td>
                    {selectedModels.map((m) => (
                      <td key={m.id} className="p-3 border-l border-slate-200">
                        <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono text-[11px] font-semibold">
                          {m.perkinsBenchmark || 'Perkins Equivalent'}
                        </span>
                      </td>
                    ))}
                    {selectedModels.length < 3 && <td className="border-l border-slate-200"></td>}
                  </tr>

                  {/* Category 2: Diesel Engine Platform */}
                  <tr className="bg-blue-50/80 font-bold text-blue-800 font-mono text-[10px] tracking-wider uppercase">
                    <td colSpan={selectedModels.length + 2} className="py-2 px-3">
                      2. Yuchai Diesel Engine Architecture
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-slate-600">Engine Model &amp; Cylinders</td>
                    {selectedModels.map((m) => (
                      <td key={m.id} className="p-3 border-l border-slate-200 text-slate-900 font-mono font-semibold">
                        {m.engineModel} ({m.cylinders} Cylinders)
                      </td>
                    ))}
                    {selectedModels.length < 3 && <td className="border-l border-slate-200"></td>}
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-slate-600">Displacement &amp; Bore x Stroke</td>
                    {selectedModels.map((m) => (
                      <td key={m.id} className="p-3 border-l border-slate-200 text-slate-700">
                        {m.displacementL} Litres &bull; {m.boreStroke}
                      </td>
                    ))}
                    {selectedModels.length < 3 && <td className="border-l border-slate-200"></td>}
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-slate-600">Aspiration System</td>
                    {selectedModels.map((m) => (
                      <td key={m.id} className="p-3 border-l border-slate-200 text-slate-700">
                        {m.aspiration || 'Turbocharged & Intercooled'}
                      </td>
                    ))}
                    {selectedModels.length < 3 && <td className="border-l border-slate-200"></td>}
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-slate-600">Fuel Injection / Governor</td>
                    {selectedModels.map((m) => (
                      <td key={m.id} className="p-3 border-l border-slate-200 text-emerald-700 font-medium">
                        {m.governorType}
                      </td>
                    ))}
                    {selectedModels.length < 3 && <td className="border-l border-slate-200"></td>}
                  </tr>

                  {/* Category 3: Fuel Consumption Profile */}
                  <tr className="bg-blue-50/80 font-bold text-blue-800 font-mono text-[10px] tracking-wider uppercase">
                    <td colSpan={selectedModels.length + 2} className="py-2 px-3">
                      3. Fuel Consumption Curve &amp; Economy
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-slate-600">100% Prime Fuel Burn</td>
                    {selectedModels.map((m) => (
                      <td key={m.id} className="p-3 border-l border-slate-200 font-bold text-emerald-700 font-mono text-sm">
                        {m.fuelConsumptionLh} L/h ({m.fuelRateGkwh} g/kWh)
                      </td>
                    ))}
                    {selectedModels.length < 3 && <td className="border-l border-slate-200"></td>}
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-slate-600">75% Load (Continuous Duty)</td>
                    {selectedModels.map((m) => (
                      <td key={m.id} className="p-3 border-l border-slate-200 font-mono text-slate-800">
                        {m.fuelCurve?.at75Percent || Math.round(m.fuelConsumptionLh * 0.77)} L/h
                      </td>
                    ))}
                    {selectedModels.length < 3 && <td className="border-l border-slate-200"></td>}
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-slate-600">50% Load (Off-Peak)</td>
                    {selectedModels.map((m) => (
                      <td key={m.id} className="p-3 border-l border-slate-200 font-mono text-slate-600">
                        {m.fuelCurve?.at50Percent || Math.round(m.fuelConsumptionLh * 0.54)} L/h
                      </td>
                    ))}
                    {selectedModels.length < 3 && <td className="border-l border-slate-200"></td>}
                  </tr>

                  {/* Category 4: Physical & Acoustics */}
                  <tr className="bg-blue-50/80 font-bold text-blue-800 font-mono text-[10px] tracking-wider uppercase">
                    <td colSpan={selectedModels.length + 2} className="py-2 px-3">
                      4. Acoustic Levels, Cooling &amp; Dimensions
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-slate-600">Sound Pressure (Silent @ 7m)</td>
                    {selectedModels.map((m) => (
                      <td key={m.id} className="p-3 border-l border-slate-200 text-emerald-700 font-semibold">
                        &le; {m.noiseLevelSilentDb || 72} dB(A)
                      </td>
                    ))}
                    {selectedModels.length < 3 && <td className="border-l border-slate-200"></td>}
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-slate-600">Dry Weight (Open Skid)</td>
                    {selectedModels.map((m) => (
                      <td key={m.id} className="p-3 border-l border-slate-200 text-slate-800 font-mono">
                        {m.dryWeightKg.toLocaleString()} kg
                      </td>
                    ))}
                    {selectedModels.length < 3 && <td className="border-l border-slate-200"></td>}
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-slate-600">Dimensions (L × W × H mm)</td>
                    {selectedModels.map((m) => (
                      <td key={m.id} className="p-3 border-l border-slate-200 text-slate-600 font-mono text-[11px]">
                        {m.dimensionsMm}
                      </td>
                    ))}
                    {selectedModels.length < 3 && <td className="border-l border-slate-200"></td>}
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-slate-600">ElectropaK Ready Package</td>
                    {selectedModels.map((m) => (
                      <td key={m.id} className="p-3 border-l border-slate-200 text-emerald-700 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Factory Standard 50°C</span>
                      </td>
                    ))}
                    {selectedModels.length < 3 && <td className="border-l border-slate-200"></td>}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-600 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Need engineering drawings or STEP files? Our Luchuan technical team replies within 2 hours.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-medium transition-colors border border-slate-200 cursor-pointer"
            >
              Close
            </button>
            {selectedModels.length > 0 && (
              <button
                onClick={() => {
                  onClose();
                  onOpenRfq(selectedModels[0].id);
                }}
                className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>Request Comparative Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
