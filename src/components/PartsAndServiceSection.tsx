import React, { useState } from 'react';
import { 
  Wrench, 
  ShieldCheck, 
  Clock, 
  PackageCheck, 
  Search, 
  CheckCircle2, 
  Truck, 
  PhoneCall, 
  FileText, 
  ArrowRight,
  Sparkles,
  Layers,
  MapPin
} from 'lucide-react';
import { MAINTENANCE_KITS, GENUINE_SPARE_PARTS, ASEAN_SERVICE_HUBS } from '../data/aftermarket';
import { gensetPartsServiceImg } from '../assets/images';

interface PartsAndServiceSectionProps {
  onOpenRfq: (modelId?: string) => void;
}

export const PartsAndServiceSection: React.FC<PartsAndServiceSectionProps> = ({
  onOpenRfq
}) => {
  const [activeTab, setActiveTab] = useState<'maintenance' | 'parts' | 'network'>('maintenance');
  const [partsCategoryFilter, setPartsCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHub, setSelectedHub] = useState(ASEAN_SERVICE_HUBS[0]);

  const filteredParts = GENUINE_SPARE_PARTS.filter(p => {
    const matchesCategory = partsCategoryFilter === 'All' || p.category === partsCategoryFilter;
    const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.compatibleEngines.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="parts-service" className="py-16 lg:py-24 bg-slate-50/60 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Perkins-Style Engineering Support) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2">
              <Wrench className="w-3.5 h-3.5 text-blue-600" /> Genuine Parts &amp; ASEAN Lifecycle Support
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
              Perkins-Grade Aftermarket &amp; Preventative Maintenance
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Protect your generator investment with 100% factory-original Yuchai filtration, electronic AVRs, and scheduled service kits. Backed by regional stocking depots across Vietnam, Indonesia, and the Philippines.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 bg-white p-1.5 rounded-xl border border-slate-200 text-xs font-semibold shadow-xs">
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'maintenance'
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Service Kits (250–5000h)
            </button>
            <button
              onClick={() => setActiveTab('parts')}
              className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'parts'
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Genuine Spares BOM
            </button>
            <button
              onClick={() => setActiveTab('network')}
              className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === 'network'
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              ASEAN Service Hubs
            </button>
          </div>
        </div>

        {/* TAB 1: Scheduled Maintenance Kits */}
        {activeTab === 'maintenance' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {MAINTENANCE_KITS.map((kit) => (
                <div 
                  key={kit.id}
                  className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-md transition-all shadow-xs group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {kit.intervalHours} HOURS
                      </span>
                      <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold">
                        {kit.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {kit.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {kit.description}
                    </p>

                    <div className="border-t border-slate-100 pt-3 space-y-1.5">
                      <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                        Package Contents:
                      </div>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {kit.includedParts.map((part, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-snug text-[11px]">{part}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-slate-100 mt-4 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>Labor: ~{kit.estimatedLaborHours} hrs</span>
                      <span className="text-emerald-600 font-bold">100% OEM Fit</span>
                    </div>
                    <button
                      onClick={() => onOpenRfq()}
                      className="w-full py-2 rounded-xl bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold border border-slate-200 hover:border-blue-600 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>Inquire Kit Pricing</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Perkins Maintenance Assurance Banner with Visual Parts Photo */}
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <img
                  src={gensetPartsServiceImg}
                  alt="Zhiqiang Genuine Generator Spare Parts"
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-slate-200 shrink-0 shadow-2xs"
                />
                <div className="space-y-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                    <ShieldCheck className="w-4 h-4 text-blue-600" /> Factory Direct Genuine Spare Parts
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">
                    Factory Extended 24-Month / 2,000-Hour Protection Plan
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
                    Adhering to scheduled 500h maintenance using genuine Zhiqiang/Yuchai service kits maintains uninterrupted factory warranty coverage and guarantees 30,000+ hour operating life.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onOpenRfq()}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-md shadow-blue-500/20 transition-all"
              >
                Request Service Contract &rarr;
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Genuine Spare Parts BOM */}
        {activeTab === 'parts' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                {['All', 'Filters', 'Electrical & AVR', 'Overhaul Kits', 'Cooling & Exhaust'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPartsCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      partsCategoryFilter === cat
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Part No., Name, Engine..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Parts Table */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-mono uppercase text-[11px] bg-slate-50">
                    <th className="p-3.5">Part Number</th>
                    <th className="p-3.5">Description &amp; Specification</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Compatible Engines</th>
                    <th className="p-3.5">Lead Time</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredParts.map((part) => (
                    <tr key={part.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-blue-700 whitespace-nowrap">
                        {part.partNumber}
                      </td>
                      <td className="p-3.5 min-w-[240px]">
                        <div className="font-semibold text-slate-900">{part.name}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{part.description}</div>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[11px]">
                          {part.category}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600 text-[11px]">
                        {part.compatibleEngines.join(', ')}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="text-emerald-700 font-medium">{part.availability}</div>
                        <div className="text-[10px] text-slate-400">{part.leadTimeDays}</div>
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={() => onOpenRfq()}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-semibold text-xs border border-blue-200 hover:border-blue-600 transition-all cursor-pointer"
                        >
                          Quote Part
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ASEAN Service Hubs & Field Engineering */}
        {activeTab === 'network' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
            {/* Country Selector Column */}
            <div className="lg:col-span-4 space-y-2">
              <div className="text-xs font-mono text-slate-500 uppercase mb-2 font-semibold">
                Select Regional Service Depot
              </div>
              {ASEAN_SERVICE_HUBS.map((hub) => (
                <button
                  key={hub.country}
                  onClick={() => setSelectedHub(hub)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    selectedHub.country === hub.country
                      ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className={`w-4 h-4 ${selectedHub.country === hub.country ? 'text-blue-600' : 'text-slate-400'}`} />
                    <div>
                      <div className="font-bold text-sm text-slate-900">{hub.country}</div>
                      <div className="text-xs text-slate-500">{hub.city}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                    Active Hub
                  </span>
                </button>
              ))}
            </div>

            {/* Details Panel */}
            <div className="lg:col-span-8 rounded-2xl bg-white border border-slate-200 p-6 space-y-5 shadow-xs">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="text-xs font-mono text-blue-700 font-semibold uppercase">
                    Authorized Regional Service &amp; Parts Center
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {selectedHub.country} Support Center ({selectedHub.city})
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {selectedHub.address}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-slate-400">Emergency Dispatch</div>
                  <div className="text-sm font-bold text-emerald-600">{selectedHub.responseTime}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="text-xs font-mono text-slate-500 uppercase">Local Spares Stockpile</div>
                  <div className="text-sm font-semibold text-slate-900">{selectedHub.partsWarehouse}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="text-xs font-mono text-slate-500 uppercase">Local Support Line</div>
                  <div className="text-sm font-bold text-blue-700 font-mono">{selectedHub.phone}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-500 uppercase font-semibold">Scope of On-Site Capabilities:</div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedHub.services.map((svc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{svc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-mono">Form E duty-free clearance documents provided direct from Nansha/Qinzhou customs.</span>
                <button
                  onClick={() => onOpenRfq()}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-sm shadow-blue-500/20 whitespace-nowrap"
                >
                  Contact Local Dispatcher
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

