import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Zap, 
  FileText, 
  Download,
  Eye,
  Gauge,
  Fuel,
  Weight,
  Ruler,
  Volume2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { ENGINE_SERIES, ENGINE_MODELS } from '../data/engines';
import { EngineSeries, EngineProduct } from '../types';

interface EnginesSectionProps {
  onOpenRfq: (modelId?: string) => void;
  onViewSpecs: (engine: EngineSeries | EngineProduct) => void;
}

export const EnginesSection: React.FC<EnginesSectionProps> = ({
  onOpenRfq,
  onViewSpecs,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFamilyFilter, setActiveFamilyFilter] = useState<string>('all');
  const [frequencyFilter, setFrequencyFilter] = useState<'50' | '60' | 'all'>('all');

  // Group series by family
  const seriesByFamily = useMemo(() => {
    const grouped: Record<string, EngineSeries[]> = {
      'Compact Series (30-100kW)': [],
      'Workhorse Series (120-350kW)': [],
      'Heavy Industrial (400-800kW)': [],
      'Megawatt Power (1000-2200kW)': [],
    };
    
    ENGINE_SERIES.forEach(series => {
      if (grouped[series.family]) {
        grouped[series.family].push(series);
      }
    });
    
    return grouped;
  }, []);

  const filteredSeries = useMemo(() => {
    let series = ENGINE_SERIES;
    
    // Family filter
    if (activeFamilyFilter !== 'all') {
      series = series.filter(s => s.family === activeFamilyFilter);
    }
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      series = series.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.chineseName.toLowerCase().includes(query) ||
        s.applications.some(a => a.toLowerCase().includes(query))
      );
    }
    
    return series;
  }, [activeFamilyFilter, searchQuery]);

  const familyOrder = [
    'Compact Series (30-100kW)',
    'Workhorse Series (120-350kW)',
    'Heavy Industrial (400-800kW)',
    'Megawatt Power (1000-2200kW)',
  ];

  const familyLabels: Record<string, string> = {
    'Compact Series (30-100kW)': 'Compact (30-100kW)',
    'Workhorse Series (120-350kW)': 'Workhorse (120-350kW)',
    'Heavy Industrial (400-800kW)': 'Heavy Industrial (400-800kW)',
    'Megawatt Power (1000-2200kW)': 'Megawatt (1000-2200kW)',
  };

  return (
    <section id="engines" className="bg-white py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5 text-emerald-600" /> Yuchai Engine Lineup &bull; 15 Series
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Genuine Yuchai Diesel Engines
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl">
              From 30kW compact inline-4 to 2200kW V-16 megawatt power. All engines feature direct injection, 
              turbocharging, and China II emissions compliance. Factory direct with full ASEAN support.
            </p>
          </div>

          {/* Frequency Filter */}
          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-600 font-semibold">Frequency:</span>
            {(['all', '50', '60'] as const).map((freq) => (
              <button
                key={freq}
                onClick={() => setFrequencyFilter(freq)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  frequencyFilter === freq
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {freq === 'all' ? '50/60Hz' : `${freq}Hz`}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Family Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
              <button
                onClick={() => setActiveFamilyFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeFamilyFilter === 'all'
                    ? 'bg-emerald-600 text-white shadow-sm font-bold'
                    : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All Families
              </button>
              {familyOrder.map((family) => (
                <button
                  key={family}
                  onClick={() => setActiveFamilyFilter(family)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeFamilyFilter === family
                      ? 'bg-emerald-600 text-white shadow-sm font-bold'
                      : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {familyLabels[family]}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search series, application, model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
              />
            </div>

          </div>
        </div>

        {/* Engine Series Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeries.map((series) => {
            const modelsInSeries = ENGINE_MODELS.filter(m => m.seriesId === series.id);
            const firstModel = modelsInSeries[0];
            
            return (
              <div
                key={series.id}
                className="rounded-2xl bg-white border border-slate-200 transition-all flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-xl hover:border-emerald-500"
              >
                <div>
                  {/* Image Header with Power Badge */}
                  <button
                    onClick={() => onViewSpecs(series)}
                    className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden block group/img cursor-pointer w-full text-left"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl font-black text-slate-300 font-display">
                        {series.cylinders}Cyl
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    
                    {/* Power Rating Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                      <Gauge className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-extrabold text-emerald-900 text-xs font-mono">
                        {series.powerRangeKw.min}–{series.powerRangeKw.max} kW
                      </span>
                    </div>

                    {/* Model Count Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                      <span className="font-bold text-slate-700 text-xs font-mono">
                        {modelsInSeries.length} Models
                      </span>
                    </div>

                    {/* Series Name on Bottom */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-xl font-black text-white font-display tracking-tight">
                        {series.name}
                      </h3>
                      <div className="text-xs text-emerald-300 font-mono font-semibold">
                        {series.chineseName}
                      </div>
                    </div>
                  </button>

                  {/* Body Specs */}
                  <div className="p-4 space-y-3">
                    
                    {/* Spec Table */}
                    <div className="grid grid-cols-1 gap-1.5 text-xs">
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-500 shrink-0">Configuration</span>
                        <span className="font-semibold text-slate-900 font-mono text-right">{series.configuration}</span>
                      </div>
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-500 shrink-0">Displacement</span>
                        <span className="font-semibold text-slate-900 font-mono text-right">{series.displacementL} L</span>
                      </div>
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-500 shrink-0">Aspiration</span>
                        <span className="font-semibold text-slate-900 font-mono text-right">{series.aspiration}</span>
                      </div>
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-500 shrink-0">Emissions</span>
                        <span className="font-semibold text-emerald-600 font-mono text-right">{series.emissions}</span>
                      </div>
                    </div>

                    {/* Applications */}
                    <div className="flex items-center gap-1 flex-wrap text-[11px] text-slate-500 pt-0.5 min-h-[2.75rem]">
                      <span className="shrink-0">Applications:</span>
                      {series.applications.map((app, idx) => (
                        <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium">
                          {app}
                        </span>
                      ))}
                    </div>

                    {/* Core Highlights */}
                    <p className="text-[11px] text-slate-600 line-clamp-2 h-[3rem] leading-relaxed bg-emerald-50/50 px-3 py-1.5 rounded-lg border border-emerald-100 overflow-hidden">
                      <strong className="text-emerald-800 font-semibold">Features:</strong> {series.configuration} · {series.displacementL}L · {series.aspiration}
                    </p>

                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => onViewSpecs(series)}
                    className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
                    title="View detailed specifications"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">Specs</span>
                  </button>

                  <button
                    onClick={() => onViewSpecs(series)}
                    className="flex-1 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    title="Download technical datasheet"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                    <span>Datasheet</span>
                  </button>

                  <button
                    onClick={() => onOpenRfq(firstModel?.id)}
                    className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                    title="Request quotation for this engine series"
                  >
                    <span>Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSeries.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No engines found</h3>
            <p className="text-slate-600 text-sm">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onOpenRfq()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-sm transition-all cursor-pointer"
          >
            Request Engine Quote
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
