import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Zap, 
  FileSpreadsheet, 
  FileText, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Eye,
  Scale,
  ArrowUpRight
} from 'lucide-react';
import { GENSET_PRODUCTS } from '../data/gensets';
import { GensetProduct } from '../types';

interface ProductCatalogProps {
  onOpenRfq: (modelId: string) => void;
  onViewSpecs: (product: GensetProduct) => void;
  onOpenDatasheet: (product: GensetProduct) => void;
  comparisonList: GensetProduct[];
  onToggleCompare: (product: GensetProduct) => void;
  onOpenComparisonModal: () => void;
  activePowerFilter: string;
  setActivePowerFilter: (filter: string) => void;
  featured?: boolean;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onOpenRfq,
  onViewSpecs,
  onOpenDatasheet,
  comparisonList,
  onToggleCompare,
  onOpenComparisonModal,
  activePowerFilter,
  setActivePowerFilter,
  featured = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [perkinsSeriesFilter, setPerkinsSeriesFilter] = useState<'400-1104' | '1106' | '2000' | '4000'>('400-1104');

  const filteredProducts = useMemo(() => {
    let products = GENSET_PRODUCTS.filter((item) => {
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQuery = 
          item.model.toLowerCase().includes(query) ||
          item.engineModel.toLowerCase().includes(query) ||
          item.primePowerKw.toString().includes(query) ||
          (item.perkinsBenchmark && item.perkinsBenchmark.toLowerCase().includes(query)) ||
          item.targetAseanMarkets.some(m => m.toLowerCase().includes(query));
        if (!matchesQuery) return false;
      }

      // Perkins Benchmark Filter
      if (perkinsSeriesFilter === '400-1104') {
        if (item.primePowerKw > 100) return false;
      } else if (perkinsSeriesFilter === '1106') {
        if (item.primePowerKw < 120 || item.primePowerKw > 250) return false;
      } else if (perkinsSeriesFilter === '2000') {
        if (item.primePowerKw < 300 || item.primePowerKw > 800) return false;
      } else if (perkinsSeriesFilter === '4000') {
        if (item.primePowerKw < 1000) return false;
      }

      // Power range filter
      if (activePowerFilter === '30-80') {
        if (item.primePowerKw < 30 || item.primePowerKw > 80) return false;
      } else if (activePowerFilter === '100-300') {
        if (item.primePowerKw < 100 || item.primePowerKw > 300) return false;
      } else if (activePowerFilter === '400-900') {
        if (item.primePowerKw < 400 || item.primePowerKw > 900) return false;
      } else if (activePowerFilter === '1000-2200') {
        if (item.primePowerKw < 1000) return false;
      }

      return true;
    });
    
    // If featured mode, only show first 3 products (TFW30, TFW50, TFW100)
    if (featured) {
      return products.slice(0, 3);
    }
    
    return products;
  }, [searchQuery, activePowerFilter, perkinsSeriesFilter, featured]);

  return (
    <section id="products" className="bg-slate-50/50 py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5 text-blue-600" /> Full Power Lineup &bull; 30–2200 kW
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Yuchai-Powered Diesel Generator Sets
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl">
              Equipped with genuine Yuchai T3 G-Drive engines and Zhiqiang high-copper TFW brushless alternators. 
              Factory direct supply with B2B quotation, OEM customization, and full ASEAN compliance.
            </p>
          </div>

          {/* Sizing Callout */}
          <div className="text-xs bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 shrink-0 shadow-2xs">
            <span className="text-blue-600 font-bold">Strict B2B Policy:</span> All units quoted upon inquiry. No retail markups.
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 mb-8 space-y-4 shadow-sm">
          
          {/* Top Row: Search & Segment Tabs */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Power Segment Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
              {[
                { id: '30-80', label: '30–80 kW (Compact)' },
                { id: '100-300', label: '100–300 kW (Industrial Main)' },
                { id: '400-900', label: '400–900 kW (Heavy Mine)' },
                { id: '1000-2200', label: '1000–2200 kW (Megawatt/HV)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-power-${tab.id}`}
                  onClick={() => setActivePowerFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activePowerFilter === tab.id
                      ? 'bg-blue-600 text-white shadow-sm font-bold'
                      : 'bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search model, kW, Yuchai engine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
              />
            </div>

          </div>

          {/* Bottom Secondary Quick Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex flex-wrap items-center gap-2 text-slate-600">
              <span className="font-semibold text-blue-700 font-mono text-[11px] uppercase">Perkins Series Equiv:</span>
              <div className="flex flex-wrap gap-1">
                {[
                  { id: '400-1104', label: '400 & 1104 (30–100kW)' },
                  { id: '1106', label: '1106 Series (120–250kW)' },
                  { id: '2000', label: '1500 & 2000 (300–800kW)' },
                  { id: '4000', label: '4000 & 5000 (1000–2200kW)' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setPerkinsSeriesFilter(s.id as any)}
                    className={`px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                      perkinsSeriesFilter === s.id 
                        ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200' 
                        : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => {
            const isCompared = comparisonList.some(c => c.id === p.id);

            return (
              <div
                key={p.id}
                id={`product-card-${p.id}`}
                className={`rounded-2xl bg-white border transition-all flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-xl hover:border-blue-500 ${
                  isCompared 
                    ? 'border-blue-500 ring-2 ring-blue-500/20' 
                    : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Image Header with Spec Pills — opens specs modal */}
                  <button
                    onClick={() => onViewSpecs(p)}
                    aria-label={`${p.model} ${p.primePowerKw} kW diesel generator — view specifications`}
                    className="relative h-48 bg-slate-100 overflow-hidden block group/img cursor-pointer w-full text-left"
                  >
                    <img
                      src={p.image}
                      alt={`${p.model} ${p.primePowerKw}kW Yuchai Diesel Generator`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    
                    {/* Power Rating Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                      <Zap className="w-3.5 h-3.5 text-blue-600" />
                      <span className="font-extrabold text-blue-900 text-xs font-mono">
                        {p.primePowerKw} kW / {p.primePowerKva} kVA
                      </span>
                    </div>

                    {/* Compare Checkbox in Top Right */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleCompare(p);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold flex items-center gap-1.5 backdrop-blur transition-all cursor-pointer ${
                          isCompared 
                            ? 'bg-blue-600 text-white font-bold shadow-xs' 
                            : 'bg-white/90 text-slate-700 hover:text-blue-600 border border-slate-200 shadow-xs'
                        }`}
                        title="Add to side-by-side comparison"
                      >
                        <Check className={`w-3 h-3 ${isCompared ? 'stroke-[3]' : 'opacity-40'}`} />
                        <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                      </button>
                    </div>

                    {/* Model Name & Engine on Bottom */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div>
                        <h3 className="text-xl font-black text-white font-display tracking-tight">
                          {p.model}
                        </h3>
                        <div className="text-xs text-blue-300 font-mono font-semibold">
                          Engine: {p.engineModel}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Body Specs — aligned 2-col spec rows, same values as detail view */}
                  <div className="p-4 space-y-3">
                    
                    {/* Spec Table: label left, value right, uniform rows */}
                    <div className="grid grid-cols-1 gap-1.5 text-xs">
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-500 shrink-0">Prime Power</span>
                        <span className="font-semibold text-blue-700 font-mono text-right">{p.primePowerKw} kW / {p.primePowerKva} kVA</span>
                      </div>
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-500 shrink-0">Standby Power</span>
                        <span className="font-semibold text-slate-900 font-mono text-right">{p.standbyPowerKw} kW / {p.standbyPowerKva} kVA</span>
                      </div>
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-500 shrink-0">Rated Current</span>
                        <span className="font-semibold text-slate-900 font-mono text-right">{p.ratedCurrentA} A @ 400V</span>
                      </div>
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-500 shrink-0">Rated Voltage</span>
                        <span className="font-semibold text-slate-900 font-mono text-right truncate" title={p.ratedVoltage}>{p.ratedVoltage}</span>
                      </div>
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-500 shrink-0">Engine</span>
                        <span className="font-semibold text-slate-900 font-mono text-right truncate" title={p.engineModel}>{p.engineModel}</span>
                      </div>
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-500 shrink-0">Displacement</span>
                        <span className="font-semibold text-slate-900 font-mono text-right">{p.displacementL} L · {p.cylinders} Cyl</span>
                      </div>
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-500 shrink-0">Fuel (100% load)</span>
                        <span className="font-semibold text-emerald-600 font-mono text-right">{p.fuelConsumptionLh} L/h</span>
                      </div>
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-500 shrink-0">Dry Weight</span>
                        <span className="font-semibold text-slate-900 font-mono text-right">{p.dryWeightKg} kg</span>
                      </div>
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-500 shrink-0">Noise Level</span>
                        <span className="font-semibold text-slate-900 font-mono text-right">{p.noiseLevelOpenDb} dB(A) Open</span>
                      </div>
                      <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-500 shrink-0">Alternator</span>
                        <span className="font-semibold text-slate-900 font-mono text-right truncate" title={p.alternatorModel}>{p.alternatorModel}</span>
                      </div>
                    </div>

                    {/* Target ASEAN Countries — fixed 2-line height for equal card heights */}
                    <div className="flex items-center gap-1 flex-wrap text-[11px] text-slate-500 pt-0.5 min-h-[2.75rem]">
                      <span className="shrink-0">Key Markets:</span>
                      {p.targetAseanMarkets.map((m, idx) => (
                        <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium">
                          {m}
                        </span>
                      ))}
                    </div>

                    {/* Competitive Highlight Callout — fixed height for equal card heights */}
                    <p className="text-[11px] text-slate-600 line-clamp-2 h-[3rem] leading-relaxed bg-blue-50/50 px-3 py-1.5 rounded-lg border border-blue-100 overflow-hidden">
                      <strong className="text-blue-800 font-semibold">Edge:</strong> {p.competitiveHighlight}
                    </p>

                  </div>
                </div>

                {/* Bottom Action Footer (3-Way: Specs, Printable Datasheet, RFQ) */}
                <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <button
                    id={`btn-view-spec-${p.id}`}
                    onClick={() => onViewSpecs(p)}
                    className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
                    title="Interactive 3D Canopy & Deep Specs"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                    <span className="hidden sm:inline">Specs</span>
                  </button>

                  <button
                    id={`btn-datasheet-${p.id}`}
                    onClick={() => onOpenDatasheet(p)}
                    className="flex-1 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    title="Open Official Engineering Specification Sheet"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                    <span>Datasheet</span>
                  </button>

                  <button
                    id={`btn-rfq-${p.id}`}
                    onClick={() => onOpenRfq(p.id)}
                    className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-md shadow-blue-600/20 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Quote</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Catalog Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-white to-sky-50 border border-blue-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Need a Custom Megawatt or High Voltage (6.3kV / 10.5kV) Parallel Configuration?
            </h4>
            <p className="text-xs text-slate-600">
              We design parallel synchronized switchboards, 50°C tropical cooling radiators, and custom soundproof attenuation to 65 dBA.
            </p>
          </div>
          <button
            onClick={() => onOpenRfq()}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-sm shadow-blue-600/20"
          >
            Consult Engineering Team &rarr;
          </button>
        </div>

      </div>

      {/* Floating Side-by-Side Comparison Dock */}
      {comparisonList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-4xl bg-white/95 backdrop-blur-md border border-blue-300 rounded-2xl shadow-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center gap-3 overflow-x-auto w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-blue-700 font-bold shrink-0">
              <Scale className="w-4 h-4" />
              <span>Compare ({comparisonList.length}/3):</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {comparisonList.map((m) => (
                <div 
                  key={m.id} 
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 shrink-0 shadow-2xs"
                >
                  <span className="font-bold">{m.model}</span>
                  <span className="text-[10px] text-blue-600 font-mono font-bold">({m.primePowerKw}kW)</span>
                  <button 
                    onClick={() => onToggleCompare(m)}
                    className="ml-1 text-slate-400 hover:text-rose-600 font-bold cursor-pointer"
                    title="Remove from comparison"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={onOpenComparisonModal}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <span>Launch Side-by-Side Comparison</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
