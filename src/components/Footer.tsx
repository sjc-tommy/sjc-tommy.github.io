import React, { useEffect } from 'react';
import { 
  Zap, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ShieldCheck, 
  ArrowUp, 
  MessageSquare,
  FileText
} from 'lucide-react';
import { SCHEMA_ORGANIZATION } from '../data/faqAeo';
import { ASEAN_COUNTRIES } from '../data/asean';

interface FooterProps {
  onOpenRfq: () => void;
  onNavigateTo: (sectionId: string) => void;
  onSelectCountry: (countryId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRfq,
  onNavigateTo,
  onSelectCountry,
}) => {
  // Inject Organization JSON-LD into DOM head for GEO/AEO
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(SCHEMA_ORGANIZATION);
    script.id = 'schema-org-jsonld';
    
    // Replace if exists
    const existing = document.getElementById('schema-org-jsonld');
    if (existing) {
      existing.remove();
    }
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('schema-org-jsonld');
      if (el) el.remove();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      
      {/* Pre-Footer Global Inquiry Callout Bar */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-10 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight font-['Space_Grotesk'] text-white">
              Ready to Source Heavy-Duty Yuchai Diesel Generators Direct from Factory?
            </h3>
            <p className="text-xs font-medium text-blue-100 max-w-2xl">
              Get an official FOB/CIF quotation within 24–48 hours. Form E preferential 0% tariff certificate provided with all export documentation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/8613635028889"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: +86 136 3502 8889</span>
            </a>

            <button
              onClick={onOpenRfq}
              className="px-6 py-3 rounded-xl bg-white hover:bg-blue-50 text-blue-900 font-extrabold text-xs shadow-xl transition-all cursor-pointer"
            >
              Request Fast FOB / CIF Quote &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Directory Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & NAP Entity (E-E-A-T Foundation) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold shadow-md">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-tight font-['Space_Grotesk']">
                  LUCHUAN ZHIQIANG ELECTRICAL MACHINERY
                </span>
                <p className="text-[11px] text-blue-400 font-mono font-semibold">陆川县志强电机厂 &bull; Established 2000</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Dedicated Chinese manufacturer of industrial diesel generator sets (30–2200kW) powered by genuine Yuchai G-Drive engines and self-wound TFW high-copper brushless alternators. Direct export hub serving ASEAN.
            </p>

            {/* Official NAP Data */}
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Longhao Entrepreneurship Park, West Ring Road, Luchuan County, Yulin City, Guangxi, China (537700)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Tel: +86-775-7221888 &bull; Mobile: +86-13635028889 / 13977542866</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Email: export@zhiqiang-power.com / sales@zhiqiang-power.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Generator Sets Range */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Diesel Gensets (30–2200kW)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateTo('products')} className="hover:text-blue-400 transition-colors">
                  Compact Units: 30kW – 80kW
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('products')} className="hover:text-blue-400 transition-colors">
                  Industrial Bestsellers: 100kW – 300kW
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('products')} className="hover:text-blue-400 transition-colors">
                  Heavy Mining: 400kW – 900kW
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('products')} className="hover:text-blue-400 transition-colors">
                  High-Voltage Megawatt: 1000kW – 2200kW
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('products')} className="hover:text-blue-400 transition-colors">
                  Soundproof Silent Canopy Gensets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('products')} className="hover:text-blue-400 transition-colors">
                  20ft / 40ft Containerized Units
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: ASEAN Markets & Grids */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Target ASEAN Ports
            </h4>
            <ul className="space-y-2 text-xs">
              {ASEAN_COUNTRIES.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      onSelectCountry(c.id);
                      onNavigateTo('asean-hub');
                    }}
                    className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>{c.flag}</span>
                    <span>{c.name} ({c.frequency})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Alternators & Engineering Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Engineering & Alternators
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateTo('alternators')} className="hover:text-blue-400 transition-colors">
                  TFW Brushless Alternator Series
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('alternators')} className="hover:text-blue-400 transition-colors">
                  STC Harmonic 3-Phase Alternators
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('calculator')} className="hover:text-blue-400 transition-colors">
                  kVA Sizing & Fuel Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('factory-trust')} className="hover:text-blue-400 transition-colors">
                  100% Load-Bank Testing Protocols
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTo('technical-faq')} className="hover:text-blue-400 transition-colors">
                  Technical FAQs & 93-Keyword Matrix
                </button>
              </li>
              <li>
                <button onClick={onOpenRfq} className="hover:text-blue-400 transition-colors">
                  Request Form E Duty Exemption
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Luchuan Zhiqiang Electrical Machinery Factory. All Rights Reserved. 
            Official Partner of Guangxi Yuchai Marine & Genset Power Co., Ltd.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-blue-400 flex items-center gap-1 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> ISO 8528 &bull; CE &bull; Tier 3
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </footer>
  );
};
