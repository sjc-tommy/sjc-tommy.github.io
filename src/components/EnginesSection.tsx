import React from 'react';
import { Cpu, Zap, Fuel, Gauge } from 'lucide-react';
import { ENGINE_SERIES } from '../data/engines';

interface EnginesSectionProps {
  onOpenRfq: (modelId?: string) => void;
  onViewSpecs?: (engine: any) => void;
}

export const EnginesSection: React.FC<EnginesSectionProps> = ({ onOpenRfq, onViewSpecs }) => {
  return (
    <section id="engines" className="py-16 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            Yuchai Diesel Engines
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            15 Engine Series · 60+ Models · 20–2673 kW
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
            Genuine Yuchai G-Drive diesel engines — the heart of every Zhiqiang generator set.
            From compact 4-cylinder units to massive V16 powerhouses, all with global parts support.
          </p>
        </div>

        {/* Engine Series Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {ENGINE_SERIES.map(series => (
            <button
              key={series.id}
              onClick={() => onViewSpecs?.(series)}
              className="group p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-md transition-all text-left cursor-pointer w-full"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-black text-slate-900">{series.name}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  series.cylinders <= 4 ? 'bg-blue-100 text-blue-700' :
                  series.cylinders <= 6 ? 'bg-emerald-100 text-emerald-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {series.cylinders}Cyl
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">{series.chineseName}</p>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Zap className="w-3 h-3 text-emerald-600" />
                  <span>{series.powerRangeKw.min}–{series.powerRangeKw.max} kW</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Fuel className="w-3 h-3 text-emerald-600" />
                  <span>{series.displacementL}L</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Gauge className="w-3 h-3 text-emerald-600" />
                  <span>{series.aspiration}</span>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                {series.applications.slice(0, 2).join(' · ')}
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => onOpenRfq()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-sm transition-all cursor-pointer"
          >
            Request Engine Quote →
          </button>
        </div>
      </div>
    </section>
  );
};
