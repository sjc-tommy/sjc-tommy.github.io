import React, { useState } from 'react';
import { 
  X, 
  Zap, 
  Gauge, 
  CheckCircle2, 
  FileText, 
  Printer, 
  Download,
  MessageSquare,
  ArrowRight,
  Fuel,
  Weight,
  Ruler,
  Volume2,
  Settings,
  Power
} from 'lucide-react';
import { EngineSeries, EngineProduct } from '../types';
import { ENGINE_MODELS } from '../data/engines';

interface EngineDetailModalProps {
  engine: EngineSeries | EngineProduct | null;
  onClose: () => void;
  onOpenRfq: (modelId?: string) => void;
}

export const EngineDetailModal: React.FC<EngineDetailModalProps> = ({
  engine,
  onClose,
  onOpenRfq,
}) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'models' | 'applications'>('specs');

  if (!engine) return null;

  const isSeries = 'family' in engine;
  const series = isSeries ? engine : null;
  const model = !isSeries ? engine as EngineProduct : null;

  // If viewing a series, get models in that series
  const modelsInSeries = series 
    ? ENGINE_MODELS.filter(m => m.seriesId === series.id)
    : [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        id="engine-detail-modal"
        className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 shadow-2xs">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900 font-display">
                  {engine.name || engine.model}
                  {model && ` · ${model.primePowerKw} kW`}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {engine.emissions || engine.emissionStandard}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {series ? `${series.chineseName} · ${series.configuration} · ${series.displacementL}L` : `${engine.chineseName} · ${engine.configuration}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Print Specification Sheet"
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer border border-slate-200"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer border border-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 bg-white shrink-0">
          <div className="flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Specifications
            </button>
            {series && (
              <button
                onClick={() => setActiveTab('models')}
                className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'models'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Models in Series ({modelsInSeries.length})
              </button>
            )}
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'applications'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Applications
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Specs Tab */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              
              {/* Power Rating Highlight */}
              {(model || series) && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 p-4">
                    <div className="text-[11px] text-emerald-700 font-semibold uppercase tracking-wider mb-1">Prime Power</div>
                    <div className="text-2xl font-black text-emerald-900 font-mono">
                      {model ? `${model.primePowerKw} kW` : `${series?.powerRangeKw.min}–${series?.powerRangeKw.max} kW`}
                    </div>
                    <div className="text-xs text-emerald-600 mt-1">Continuous rated output</div>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-4">
                    <div className="text-[11px] text-blue-700 font-semibold uppercase tracking-wider mb-1">Standby Power</div>
                    <div className="text-2xl font-black text-blue-900 font-mono">
                      {model ? `${model.standbyPowerKw} kW` : `${series ? Math.round(series.powerRangeKw.max * 1.1) : 'N/A'} kW`}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">Maximum backup output</div>
                  </div>
                </div>
              )}

              {/* Basic Parameters */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-slate-600" />
                  Basic Parameters
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2.5 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Configuration</span>
                    <span className="font-semibold text-slate-900 font-mono text-xs">{engine.configuration}</span>
                  </div>
                  <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2.5 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Cylinders</span>
                    <span className="font-semibold text-slate-900 font-mono text-xs">{engine.cylinders}</span>
                  </div>
                  <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2.5 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Displacement</span>
                    <span className="font-semibold text-slate-900 font-mono text-xs">{engine.displacementL} L</span>
                  </div>
                  <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2.5 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Aspiration</span>
                    <span className="font-semibold text-slate-900 font-mono text-xs">{engine.aspiration}</span>
                  </div>
                  {model && (
                    <>
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2.5 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500">Rated Speed</span>
                        <span className="font-semibold text-slate-900 font-mono text-xs">{model.ratedSpeedRpm} RPM</span>
                      </div>
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2.5 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500">Fuel System</span>
                        <span className="font-semibold text-slate-900 font-mono text-xs">{model.fuelSystem}</span>
                      </div>
                    </>
                  )}
                  <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2.5 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Emission Standard</span>
                    <span className="font-semibold text-emerald-600 font-mono text-xs">{engine.emissions || engine.emissionStandard}</span>
                  </div>
                  <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2.5 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Cooling Type</span>
                    <span className="font-semibold text-slate-900 font-mono text-xs">{model?.coolingType || 'Water-cooled'}</span>
                  </div>
                </div>
              </div>

              {/* Performance Parameters (if model) */}
              {model && (
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-slate-600" />
                    Performance Parameters
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {model.dryWeightKg && (
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2.5 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Weight className="w-3 h-3" /> Dry Weight
                        </span>
                        <span className="font-semibold text-slate-900 font-mono text-xs">{model.dryWeightKg} kg</span>
                      </div>
                    )}
                    {model.dimensionsMm && (
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2.5 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Ruler className="w-3 h-3" /> Dimensions
                        </span>
                        <span className="font-semibold text-slate-900 font-mono text-xs">{model.dimensionsMm} mm</span>
                      </div>
                    )}
                    {model.oilCapacityL && (
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2.5 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Fuel className="w-3 h-3" /> Oil Capacity
                        </span>
                        <span className="font-semibold text-slate-900 font-mono text-xs">{model.oilCapacityL} L</span>
                      </div>
                    )}
                    <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2.5 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Power className="w-3 h-3" /> Start Method
                      </span>
                      <span className="font-semibold text-slate-900 font-mono text-xs">{model.startMethod}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Core Features */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Core Features
                </h4>
                <div className="space-y-2">
                  {[
                    `Genuine Yuchai ${engine.configuration} diesel engine`,
                    `${engine.displacementL}L displacement with ${engine.aspiration.toLowerCase()}`,
                    `${engine.emissions || engine.emissionStandard} emissions compliance`,
                    'Direct injection fuel system for optimal efficiency',
                    'Water-cooled design for reliable operation',
                    'Electric start with CCW rotation (facing power output end)',
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Models Tab (for series view) */}
          {activeTab === 'models' && series && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 mb-4">
                Select a specific model to view detailed specifications or request a quote.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {modelsInSeries.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-xl border border-slate-200 p-4 hover:border-emerald-400 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-bold text-slate-900 font-mono text-sm">{m.model}</h5>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {m.primePowerKw} kW
                      </span>
                    </div>
                    <div className="space-y-1 text-[11px] text-slate-600 mb-3">
                      <div className="flex justify-between">
                        <span>Standby:</span>
                        <span className="font-semibold text-slate-900">{m.standbyPowerKw} kW</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Speed:</span>
                        <span className="font-semibold text-slate-900">{m.ratedSpeedRpm} RPM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fuel System:</span>
                        <span className="font-semibold text-slate-900">{m.fuelSystem}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          // Could open model-specific view
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        View Specs
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenRfq(m.id);
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        Quote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">Typical Applications</h4>
                <div className="flex flex-wrap gap-2">
                  {(engine.applications || []).map((app, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">Output Interface</h4>
                <div className="rounded-lg bg-slate-50 border border-slate-100 p-3 text-xs text-slate-700">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Rotation Direction:</span>
                      <span className="font-semibold text-slate-900">{model?.rotationDirection || 'CCW (facing power output end)'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SAE Housing:</span>
                      <span className="font-semibold text-slate-900">Standard SAE 1 / SAE 2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flange:</span>
                      <span className="font-semibold text-slate-900">11.5" / 14" disc</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">Compatible Genset Models</h4>
                {model && model.gensetApplications && model.gensetApplications.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {model.gensetApplications.map((genset, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold"
                      >
                        {genset}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-slate-500">
                    {series ? `This series powers ${modelsInSeries.length} genset models in our lineup.` : 'Contact us for compatible genset models.'}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-500">
            {series 
              ? `${modelsInSeries.length} models available in ${series.name}`
              : `Model: ${model?.model} · ${model?.primePowerKw} kW prime power`
            }
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenRfq(model?.id);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
