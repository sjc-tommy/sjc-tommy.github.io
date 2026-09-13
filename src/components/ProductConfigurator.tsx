import React, { useState, useMemo } from 'react';
import { Settings, ChevronRight, Zap, RotateCcw, MessageSquare, Download } from 'lucide-react';
import { ENGINE_SERIES, ENGINE_MODELS } from '../data/engines';
import { ALL_ALTERNATORS, TFW_MODELS, STC_MODELS, ST_MODELS, ALTERNATOR_SERIES } from '../data/alternators';
import { GENSET_PRODUCTS } from '../data/gensets';
import { BUSINESS } from '../data/site';

interface ProductConfiguratorProps {
  onOpenRfq?: (modelId?: string) => void;
  onViewSpecs?: (product: any) => void;
}

export const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({ onOpenRfq, onViewSpecs }) => {
  // Step 1: Select engine series
  const [selectedSeriesId, setSelectedSeriesId] = useState<string>('');
  // Step 2: Select engine model
  const [selectedEngineId, setSelectedEngineId] = useState<string>('');
  // Step 3: Select alternator series
  const [selectedAltSeriesId, setSelectedAltSeriesId] = useState<string>('');
  // Step 4: Select alternator model
  const [selectedAltId, setSelectedAltId] = useState<string>('');

  // Derived data
  const selectedSeries = ENGINE_SERIES.find(s => s.id === selectedSeriesId);
  const enginesInSeries = ENGINE_MODELS.filter(e => e.seriesId === selectedSeriesId);
  const selectedEngine = ENGINE_MODELS.find(e => e.id === selectedEngineId);
  const selectedAltSeries = ALTERNATOR_SERIES.find(s => s.id === selectedAltSeriesId);
  const altsInSeries = ALL_ALTERNATORS.filter(a => a.seriesId === selectedAltSeriesId);
  const selectedAlt = ALL_ALTERNATORS.find(a => a.id === selectedAltId);

  // Find matching genset
  const matchedGenset = useMemo(() => {
    if (!selectedEngine || !selectedAlt) return null;
    return GENSET_PRODUCTS.find(
      g => g.engineId === selectedEngine.id && g.alternatorId === selectedAlt.id
    ) || null;
  }, [selectedEngine, selectedAlt]);

  // Auto-filter alternator series based on engine power
  const compatibleAltSeries = useMemo(() => {
    if (!selectedEngine) return ALTERNATOR_SERIES;
    const kw = selectedEngine.primePowerKw;
    // TFW: 18-600kW, STC: 3-64kW, ST: 3-30kW
    const series: string[] = [];
    if (kw <= 600 && kw >= 18) series.push('tfw');
    if (kw <= 64 && kw >= 3) series.push('stc');
    if (kw <= 30 && kw >= 3) series.push('st');
    return ALTERNATOR_SERIES.filter(s => series.includes(s.id));
  }, [selectedEngine]);

  const handleReset = () => {
    setSelectedSeriesId('');
    setSelectedEngineId('');
    setSelectedAltSeriesId('');
    setSelectedAltId('');
  };

  const handleSeriesSelect = (seriesId: string) => {
    setSelectedSeriesId(seriesId);
    setSelectedEngineId('');
    setSelectedAltSeriesId('');
    setSelectedAltId('');
  };

  const handleEngineSelect = (engineId: string) => {
    setSelectedEngineId(engineId);
    setSelectedAltSeriesId('');
    setSelectedAltId('');
  };

  const handleAltSeriesSelect = (altSeriesId: string) => {
    setSelectedAltSeriesId(altSeriesId);
    setSelectedAltId('');
  };

  const currentStep = !selectedSeriesId ? 1 : !selectedEngineId ? 2 : !selectedAltSeriesId ? 3 : !selectedAltId ? 4 : 5;

  return (
    <section id="configurator" className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Settings className="w-3.5 h-3.5" />
            Product Configurator
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Build Your Custom Genset
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
            Select your preferred Yuchai engine and Zhiqiang alternator to create a matched generator set.
            Our factory assembles and tests every configuration to specification.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[
            { n: 1, label: 'Engine Series' },
            { n: 2, label: 'Engine Model' },
            { n: 3, label: 'Alternator Type' },
            { n: 4, label: 'Alternator Model' },
            { n: 5, label: 'Result' },
          ].map((step, i) => (
            <React.Fragment key={step.n}>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentStep === step.n
                  ? 'bg-blue-600 text-white shadow-md'
                  : currentStep > step.n
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-slate-100 text-slate-400'
              }`}>
                <span className="w-5 h-5 rounded-full bg-white/20 grid place-items-center text-[10px]">{step.n}</span>
                <span className="hidden sm:inline">{step.label}</span>
              </div>
              {i < 4 && <ChevronRight className="w-4 h-4 text-slate-300" />}
            </React.Fragment>
          ))}
        </div>

        {/* Configuration Area */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Step 1: Engine Series */}
          <div className={`p-6 border-b border-slate-100 ${currentStep === 1 ? 'bg-blue-50/50' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full grid place-items-center text-xs ${
                  selectedSeriesId ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}>1</span>
                Select Engine Series
              </h3>
              {selectedSeriesId && (
                <span className="text-xs font-semibold text-blue-600">{selectedSeries?.name} — {selectedSeries?.chineseName}</span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {ENGINE_SERIES.map(series => {
                const isSelected = selectedSeriesId === series.id;
                const modelCount = ENGINE_MODELS.filter(e => e.seriesId === series.id).length;
                return (
                  <button
                    key={series.id}
                    onClick={() => handleSeriesSelect(series.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                        : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                    }`}
                  >
                    <p className="text-sm font-bold text-slate-900">{series.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{series.cylinders} Cyl · {series.powerRangeKw.min}–{series.powerRangeKw.max} kW</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{modelCount} models</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Engine Model */}
          {selectedSeriesId && (
            <div className={`p-6 border-b border-slate-100 ${currentStep === 2 ? 'bg-blue-50/50' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full grid place-items-center text-xs ${
                    selectedEngineId ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>2</span>
                  Select Engine Model
                </h3>
                {selectedEngineId && (
                  <span className="text-xs font-semibold text-blue-600">{selectedEngine?.model} — {selectedEngine?.primePowerKw} kW</span>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
                      <th className="pb-2 pr-4 font-semibold">Model</th>
                      <th className="pb-2 pr-4 font-semibold">Prime Power</th>
                      <th className="pb-2 pr-4 font-semibold">Standby</th>
                      <th className="pb-2 pr-4 font-semibold">Cylinders</th>
                      <th className="pb-2 pr-4 font-semibold">Displacement</th>
                      <th className="pb-2 pr-4 font-semibold">Aspiration</th>
                      <th className="pb-2 font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {enginesInSeries.map(engine => (
                      <tr
                        key={engine.id}
                        onClick={() => handleEngineSelect(engine.id)}
                        className={`border-b border-slate-50 cursor-pointer transition-colors ${
                          selectedEngineId === engine.id
                            ? 'bg-blue-50'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-2.5 pr-4 font-semibold text-slate-900">{engine.model}</td>
                        <td className="py-2.5 pr-4 font-bold text-blue-700">{engine.primePowerKw} kW</td>
                        <td className="py-2.5 pr-4 text-slate-600">{engine.standbyPowerKw} kW</td>
                        <td className="py-2.5 pr-4 text-slate-600">{engine.cylinders} {engine.configuration}</td>
                        <td className="py-2.5 pr-4 text-slate-600">{engine.displacementL} L</td>
                        <td className="py-2.5 pr-4 text-slate-600">{engine.aspiration}</td>
                        <td className="py-2.5">
                          {selectedEngineId === engine.id && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">Selected</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Step 3: Alternator Series */}
          {selectedEngineId && (
            <div className={`p-6 border-b border-slate-100 ${currentStep === 3 ? 'bg-blue-50/50' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full grid place-items-center text-xs ${
                    selectedAltSeriesId ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>3</span>
                  Select Alternator Type
                </h3>
                {selectedAltSeriesId && (
                  <span className="text-xs font-semibold text-blue-600">{selectedAltSeries?.name}</span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {compatibleAltSeries.map(series => {
                  const isSelected = selectedAltSeriesId === series.id;
                  const models = ALL_ALTERNATORS.filter(a => a.seriesId === series.id);
                  const powerRange = { min: Math.min(...models.map(m => m.primePowerKw)), max: Math.max(...models.map(m => m.primePowerKw)) };
                  return (
                    <button
                      key={series.id}
                      onClick={() => handleAltSeriesSelect(series.id)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                          : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-base font-bold text-slate-900">{series.name}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          series.id === 'tfw' ? 'bg-blue-100 text-blue-700' :
                          series.id === 'stc' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>{series.phase}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{series.chineseName}</p>
                      <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-600">
                        <span>{powerRange.min}–{powerRange.max} kW</span>
                        <span>·</span>
                        <span>{models.length} models</span>
                        <span>·</span>
                        <span>{series.insulationClass}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Alternator Model */}
          {selectedAltSeriesId && (
            <div className={`p-6 border-b border-slate-100 ${currentStep === 4 ? 'bg-blue-50/50' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full grid place-items-center text-xs ${
                    selectedAltId ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>4</span>
                  Select Alternator Model
                </h3>
                {selectedAltId && (
                  <span className="text-xs font-semibold text-blue-600">{selectedAlt?.model} — {selectedAlt?.primePowerKw} kW</span>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
                      <th className="pb-2 pr-4 font-semibold">Model</th>
                      <th className="pb-2 pr-4 font-semibold">Frame</th>
                      <th className="pb-2 pr-4 font-semibold">Power (kW)</th>
                      <th className="pb-2 pr-4 font-semibold">Power (kVA)</th>
                      <th className="pb-2 pr-4 font-semibold">Voltage</th>
                      <th className="pb-2 pr-4 font-semibold">Current</th>
                      <th className="pb-2 font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {altsInSeries.map(alt => (
                      <tr
                        key={alt.id}
                        onClick={() => setSelectedAltId(alt.id)}
                        className={`border-b border-slate-50 cursor-pointer transition-colors ${
                          selectedAltId === alt.id ? 'bg-blue-50' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-2.5 pr-4 font-semibold text-slate-900">{alt.model}</td>
                        <td className="py-2.5 pr-4 text-slate-600">{alt.frameSize}</td>
                        <td className="py-2.5 pr-4 font-bold text-blue-700">{alt.primePowerKw}</td>
                        <td className="py-2.5 pr-4 text-slate-600">{alt.primePowerKva}</td>
                        <td className="py-2.5 pr-4 text-slate-600">{alt.ratedVoltageV}V</td>
                        <td className="py-2.5 pr-4 text-slate-600">{alt.ratedCurrentA}A</td>
                        <td className="py-2.5">
                          {selectedAltId === alt.id && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">Selected</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Step 5: Result */}
          {selectedAltId && (
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white grid place-items-center text-xs">5</span>
                Configuration Result
              </h3>

              {matchedGenset ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-blue-200">
                    <Zap className="w-8 h-8 text-blue-600 shrink-0" />
                    <div>
                      <p className="text-lg font-black text-slate-900">{matchedGenset.model}</p>
                      <p className="text-xs text-slate-500">Pre-configured genset match found!</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-2xl font-black text-blue-700">{matchedGenset.primePowerKw} <span className="text-sm">kW</span></p>
                      <p className="text-xs text-slate-500">{matchedGenset.primePowerKva} kVA</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="rounded-lg bg-white p-3 border border-slate-200">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Engine</p>
                      <p className="text-sm font-bold text-slate-900">{selectedEngine?.model}</p>
                    </div>
                    <div className="rounded-lg bg-white p-3 border border-slate-200">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Alternator</p>
                      <p className="text-sm font-bold text-slate-900">{selectedAlt?.model}</p>
                    </div>
                    <div className="rounded-lg bg-white p-3 border border-slate-200">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Fuel @ 100%</p>
                      <p className="text-sm font-bold text-slate-900">{matchedGenset.fuelConsumptionLh} L/h</p>
                    </div>
                    <div className="rounded-lg bg-white p-3 border border-slate-200">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Weight</p>
                      <p className="text-sm font-bold text-slate-900">{matchedGenset.dryWeightKg} kg</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => onViewSpecs?.(matchedGenset)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      View Full Specs
                    </button>
                    <a
                      href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello Zhiqiang Power, I configured a custom genset: ${matchedGenset.model} (${matchedGenset.primePowerKw}kW) with ${selectedEngine?.model} engine and ${selectedAlt?.model} alternator. Please send me a quotation.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-sm transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Request Quote
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-amber-200">
                    <Settings className="w-8 h-8 text-amber-600 shrink-0" />
                    <div>
                      <p className="text-base font-bold text-slate-900">Custom Configuration</p>
                      <p className="text-xs text-slate-500">This combination is available as a custom build. Our engineers will match and test it to your specifications.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="rounded-lg bg-white p-3 border border-slate-200">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Engine</p>
                      <p className="text-sm font-bold text-slate-900">{selectedEngine?.model}</p>
                      <p className="text-xs text-slate-500">{selectedEngine?.primePowerKw} kW</p>
                    </div>
                    <div className="rounded-lg bg-white p-3 border border-slate-200">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Alternator</p>
                      <p className="text-sm font-bold text-slate-900">{selectedAlt?.model}</p>
                      <p className="text-xs text-slate-500">{selectedAlt?.primePowerKw} kW / {selectedAlt?.primePowerKva} kVA</p>
                    </div>
                    <div className="rounded-lg bg-white p-3 border border-slate-200">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Est. Output</p>
                      <p className="text-sm font-bold text-blue-700">~{selectedEngine?.primePowerKw} kW</p>
                      <p className="text-xs text-slate-500">Limited by engine rating</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello Zhiqiang Power, I configured a custom genset with ${selectedEngine?.model} engine (${selectedEngine?.primePowerKw}kW) and ${selectedAlt?.model} alternator (${selectedAlt?.primePowerKw}kW). Please provide a quotation and lead time.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-sm transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Request Custom Quote
                    </a>
                    {onOpenRfq && (
                      <button
                        onClick={() => onOpenRfq()}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition-all cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        Fill RFQ Form
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Reset Button */}
        {selectedSeriesId && (
          <div className="mt-4 text-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Start Over
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
