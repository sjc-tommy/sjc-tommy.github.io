import React, { useState } from 'react';
import { Phone, MessageSquare, Menu, X, Zap, Facebook, Youtube, Linkedin, ChevronDown } from 'lucide-react';
import { BUSINESS, SOCIAL_LINKS } from '../data/site';

interface NavbarProps {
  onNavigateTo: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateTo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  const navItems: { label: string; section: string }[] = [
    { label: 'Home', section: 'home' },
    { label: 'Markets', section: 'asean-hub' },
    { label: 'Technical', section: 'technical' },
    { label: 'Factory', section: 'factory-trust' },
  ];

  const productItems: { label: string; section: string }[] = [
    { label: 'Diesel Gensets', section: 'products' },
    { label: 'Yuchai Engines', section: 'engines' },
    { label: 'Alternators (TFW/STC)', section: 'alternators' },
    { label: 'Spare Parts', section: 'parts-service' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      {/* 1. Contact Ribbon */}
      <div className="bg-slate-50 border-b border-slate-100 text-[11px] text-slate-500 py-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-hidden">
          <div className="flex items-center gap-2 truncate min-w-0">
            <span className="inline-flex items-center gap-1 text-blue-700 font-bold shrink-0">
              <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Yuchai Official Partner</span>
            </span>
            <span className="text-slate-300 hidden sm:inline">&bull;</span>
            <span className="text-slate-500 hidden sm:inline truncate">
              50Hz / 60Hz Dual Frequency &bull; 30–2200 kW
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-xs">
            <div className="hidden sm:flex items-center gap-1">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                 className="grid h-6 w-6 place-items-center rounded-md text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Facebook">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                 className="grid h-6 w-6 place-items-center rounded-md text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors" title="YouTube">
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                 className="grid h-6 w-6 place-items-center rounded-md text-slate-500 hover:bg-sky-50 hover:text-sky-700 transition-colors" title="LinkedIn">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href={SOCIAL_LINKS.reddit} target="_blank" rel="noopener noreferrer" aria-label="Reddit"
                 className="grid h-6 w-6 place-items-center rounded-md text-slate-500 hover:bg-orange-50 hover:text-orange-600 transition-colors" title="Reddit">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.687-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
              </a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                 className="grid h-6 w-6 place-items-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-black transition-colors" title="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
            </div>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp: +86 136 3502 8889</span>
            </a>
            <span className="text-slate-200 hidden md:inline">|</span>
            <a
              href={BUSINESS.zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 text-blue-700 hover:text-blue-800 font-semibold transition-colors"
              title="Zalo"
            >
              <span>Zalo: +86 136 3502 8889</span>
            </a>
            <span className="text-slate-200 hidden lg:inline">|</span>
            <a
              href="tel:+867757221888"
              className="hidden lg:inline-flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Phone className="w-3 h-3 text-slate-400" />
              <span>Factory: +86-775-7221888</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation — every item navigates to a section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-6">
          <button onClick={() => onNavigateTo('home')} className="flex items-center gap-2.5 sm:gap-3 group shrink-0 cursor-pointer bg-transparent border-none">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-all shrink-0">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 font-display">
                  ZHIQIANG <span className="text-blue-600">POWER</span>
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono font-bold uppercase">
                  OEM
                </span>
              </div>
              <p className="text-[11px] text-slate-500 tracking-tight hidden sm:block">
                Luchuan Direct &bull; Yuchai 30–2200kW
              </p>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => onNavigateTo(item.section)}
                className="px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap text-slate-600 hover:text-blue-600 hover:bg-slate-50 cursor-pointer bg-transparent border-none"
              >
                {item.label}
              </button>
            ))}
            
            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                onMouseEnter={() => setProductsDropdownOpen(true)}
                className="px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap text-slate-600 hover:text-blue-600 hover:bg-slate-50 cursor-pointer bg-transparent border-none flex items-center gap-1"
              >
                Products
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${productsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {productsDropdownOpen && (
                <div
                  onMouseLeave={() => setProductsDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50"
                >
                  {productItems.map((item) => (
                    <button
                      key={item.section}
                      onClick={() => {
                        onNavigateTo(item.section);
                        setProductsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer bg-transparent border-none"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl font-bold text-xs bg-green-600 hover:bg-green-700 text-white transition-all cursor-pointer whitespace-nowrap shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <a
              href="./request-a-quote/"
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all hover:shadow-md whitespace-nowrap shrink-0"
            >
              <span>Request Quote</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2 pb-1">Navigation</div>
          {navItems.map((item) => (
            <button
              key={item.section}
              onClick={() => {
                onNavigateTo(item.section);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 cursor-pointer bg-transparent border-none"
            >
              {item.label}
            </button>
          ))}
          
          {/* Products Submenu */}
          <div className="pt-2 border-t border-slate-100 mt-2">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2 pb-1">Products</div>
            {productItems.map((item) => (
              <button
                key={item.section}
                onClick={() => {
                  onNavigateTo(item.section);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 cursor-pointer bg-transparent border-none"
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="pt-3 border-t border-slate-100 mt-2">
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-green-600 text-white flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
