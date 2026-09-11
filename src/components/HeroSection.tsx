import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Calculator, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Gauge, 
  Award,
  Globe2
} from 'lucide-react';
import { dieselGensetHeroImg } from '../assets/images';

interface HeroSectionProps {
  onOpenRfq: (modelId?: string) => void;
  onNavigateTo: (sectionId: string) => void;
  onFilterPowerRange: (range: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenRfq,
  onNavigateTo,
  onFilterPowerRange,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200">
      {/* Background Industrial Clean Grid & Technical Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 left-0 w-96 h-96 bg-sky-300/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-6 shadow-xs">
          <Award className="w-4 h-4 text-blue-600" />
          <span>Luchuan Zhiqiang Factory Direct &bull; Yuchai Marine & Genset Authorized Partner</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Positioning & Pitch */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-['Space_Grotesk']">
              Engineered For Southeast Asia:{' '}
              <span className="text-blue-600">
                Yuchai Diesel Generator Sets
              </span>{' '}
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-slate-700 mt-2 font-bold">
                30kW to 2200kW &bull; 50Hz / 60Hz Dual Frequency
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Manufactured by <strong className="text-slate-900">Luchuan Zhiqiang Electrical Machinery</strong>. Powered by genuine 
              <strong className="text-slate-900"> Yuchai T3 heavy-duty engines</strong> and self-produced <strong className="text-blue-600">TFW high-copper brushless alternators</strong>. 
              Full compliance with ASEAN grid standards, <strong>Tier 3 emission equivalence</strong>, and Certificate of Origin Form E for <strong className="text-emerald-700">0% preferential import tariffs</strong>.
            </p>

            {/* Core Verification Checkpoints */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>No Intermediate Markups</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>60Hz Dedicated for Philippines</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>SNI / TISI / SIRIM / CR Ready</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>100% Full-Load Bench Tested</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>15–25 Day Production Dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>948 Global Service Stations</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="hero-btn-rfq"
                onClick={() => onOpenRfq()}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Request B2B Quotation (FOB/CIF)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-btn-calc"
                onClick={() => onNavigateTo('calculator')}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-blue-500 shadow-xs transition-all cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-blue-600" />
                <span>Power & Fuel Sizer</span>
              </button>
            </div>

            {/* Interactive Quick Power Range Jump */}
            <div className="pt-6 border-t border-slate-200">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-blue-600" /> Quick Filter By Power Segment:
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: '30–80 kW (Commercial/Agri)', range: '30-80' },
                  { label: '100–300 kW (Industrial Main)', range: '100-300' },
                  { label: '400–900 kW (Heavy Mining)', range: '400-900' },
                  { label: '1000–2200 kW (Megawatt/HV)', range: '1000-2200' },
                ].map((item) => (
                  <button
                    key={item.range}
                    onClick={() => {
                      onFilterPowerRange(item.range);
                      onNavigateTo('products');
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 text-slate-700 shadow-xs transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Visual Industrial Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white border border-slate-200 p-6 shadow-xl shadow-blue-900/5 overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs font-mono text-slate-700 font-semibold tracking-wide">
                    FACTORY STATUS: DISPATCH READY
                  </span>
                </div>
                <span className="text-xs text-blue-600 font-mono font-bold">
                  ISO 8528 G3 STD
                </span>
              </div>

              {/* Genset Graphic & Technical Highlight */}
              <div className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 mb-5 group">
                <img
                  src={dieselGensetHeroImg}
                  alt="Zhiqiang Yuchai Diesel Generator Set"
                  referrerPolicy="no-referrer"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg border border-slate-200 text-blue-700 font-mono font-bold shadow-xs">
                    Model: TFW-100 (100kW / 125kVA)
                  </span>
                  <span className="bg-emerald-500/90 backdrop-blur px-2.5 py-1 rounded-lg text-white font-medium shadow-xs">
                    Yuchai YC6B180L-D20
                  </span>
                </div>
              </div>

              {/* Spec Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">Alternator System</div>
                  <div className="font-semibold text-slate-900 mt-0.5">TFW Brushless (100% Cu)</div>
                  <div className="text-[10px] text-blue-600 font-medium mt-0.5">AVR ±1% Class H IP21</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">Fuel Economy</div>
                  <div className="font-semibold text-slate-900 mt-0.5">24 L/h (100% Prime)</div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">≤200 g/(kW·h) Low Burn</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">Standard Grid</div>
                  <div className="font-semibold text-slate-900 mt-0.5">50Hz (1500) / 60Hz (1800)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">400V / 380V / 220V Dual</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">Tariff Preference</div>
                  <div className="font-semibold text-slate-900 mt-0.5">ACFTA Form E (0% Tariff)</div>
                  <div className="text-[10px] text-blue-600 font-medium mt-0.5">ASEAN Direct Clearance</div>
                </div>
              </div>

              {/* Quick Action in Card */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenRfq('tfw-100')}
                  className="w-full py-2.5 text-xs font-bold rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 border border-blue-200 hover:border-blue-600 transition-all text-center cursor-pointer"
                >
                  Inquire This 100kW Workhorse &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
