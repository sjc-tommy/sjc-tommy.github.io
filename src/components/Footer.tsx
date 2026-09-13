import React from 'react';
import { 
  Zap, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowUp, 
  MessageSquare,
  Facebook,
  Youtube,
  Linkedin
} from 'lucide-react';
import { ASEAN_COUNTRIES } from '../data/asean';
import { BUSINESS, SOCIAL_LINKS } from '../data/site';

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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      
      {/* Pre-Footer Global Inquiry Callout Bar */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-10 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight font-display text-white">
              Ready to Source Heavy-Duty Yuchai Diesel Generators Direct from Factory?
            </h3>
            <p className="text-xs font-medium text-blue-100 max-w-2xl">
              Get an official quotation within 24–48 hours. ACFTA Form E certificate provided with all export documentation; preferential duty eligibility subject to destination rules.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}`}
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
              Request Fast Quote &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Directory Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & NAP Entity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold shadow-md">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-tight font-display">
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
              <div className="flex items-center gap-2 text-slate-300">
                <MessageSquare className="w-4 h-4 text-blue-400 shrink-0" />
                <span>WhatsApp / Zalo: <a href={BUSINESS.zaloLink} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition-colors">+86-13635028889</a></span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                   className="grid h-8 w-8 place-items-center rounded-lg bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                   className="grid h-8 w-8 place-items-center rounded-lg bg-slate-800 text-slate-400 hover:bg-red-600 hover:text-white transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                   className="grid h-8 w-8 place-items-center rounded-lg bg-slate-800 text-slate-400 hover:bg-sky-700 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href={SOCIAL_LINKS.reddit} target="_blank" rel="noopener noreferrer" aria-label="Reddit"
                   className="grid h-8 w-8 place-items-center rounded-lg bg-slate-800 text-slate-400 hover:bg-orange-600 hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.687-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
                </a>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                   className="grid h-8 w-8 place-items-center rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-600 hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Generator Sets Range */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Diesel Gensets (30–2200kW)
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center min-h-7">
                <button onClick={() => onNavigateTo('products')} className="hover:text-blue-400 transition-colors">
                  Compact: 30kW – 80kW
                </button>
              </li>
              <li className="flex items-center min-h-7">
                <button onClick={() => onNavigateTo('products')} className="hover:text-blue-400 transition-colors">
                  Industrial: 100kW – 300kW
                </button>
              </li>
              <li className="flex items-center min-h-7">
                <button onClick={() => onNavigateTo('products')} className="hover:text-blue-400 transition-colors">
                  Heavy Mining: 400kW – 900kW
                </button>
              </li>
              <li className="flex items-center min-h-7">
                <button onClick={() => onNavigateTo('products')} className="hover:text-blue-400 transition-colors">
                  Megawatt HV: 1000kW – 2200kW
                </button>
              </li>
              <li className="flex items-center min-h-7">
                <button onClick={() => onNavigateTo('products')} className="hover:text-blue-400 transition-colors">
                  Silent Canopy Gensets
                </button>
              </li>
              <li className="flex items-center min-h-7">
                <button onClick={() => onNavigateTo('products')} className="hover:text-blue-400 transition-colors">
                  Containerized Units
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: ASEAN Markets & Grids */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Target ASEAN Ports
            </h4>
            <ul className="space-y-2.5 text-xs">
              {ASEAN_COUNTRIES.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      onSelectCountry(c.id);
                      onNavigateTo('asean-hub');
                    }}
                    className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Products & Engineering */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Products &amp; Engineering
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center min-h-7">
                <button onClick={() => onNavigateTo('engines')} className="hover:text-blue-400 transition-colors">
                  Yuchai Diesel Engines (15 Series)
                </button>
              </li>
              <li className="flex items-center min-h-7">
                <button onClick={() => onNavigateTo('alternators')} className="hover:text-blue-400 transition-colors">
                  TFW / STC Alternators (46 Models)
                </button>
              </li>
              <li className="flex items-center min-h-7">
                <button onClick={() => onNavigateTo('parts-service')} className="hover:text-blue-400 transition-colors">
                  Genuine Spare Parts &amp; Kits
                </button>
              </li>
              <li className="flex items-center min-h-7">
                <button onClick={() => onNavigateTo('calculator')} className="hover:text-blue-400 transition-colors">
                  kVA Sizing &amp; Fuel Calculator
                </button>
              </li>
              <li className="flex items-center min-h-7">
                <button onClick={() => onNavigateTo('factory-trust')} className="hover:text-blue-400 transition-colors">
                  100% Load-Bank Testing Protocols
                </button>
              </li>
              <li className="flex items-center min-h-7">
                <button onClick={onOpenRfq} className="hover:text-blue-400 transition-colors">
                  Request ACFTA Form E Info
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
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> ISO 8528 Tested &bull; Yuchai T3
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
