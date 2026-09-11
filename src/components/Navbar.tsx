import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  Globe, 
  ShieldCheck, 
  FileText, 
  Menu, 
  X, 
  Zap, 
  MessageSquare, 
  ChevronDown, 
  Building, 
  HelpCircle, 
  Calculator,
  Wrench,
  Scale
} from 'lucide-react';
import { ASEAN_COUNTRIES } from '../data/asean';

interface NavbarProps {
  onOpenRfq: (modelId?: string) => void;
  onSelectCountry: (countryId: string) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  comparisonCount?: number;
  onOpenComparisonModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRfq,
  onSelectCountry,
  activeSection,
  setActiveSection,
  comparisonCount = 0,
  onOpenComparisonModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [engineeringDropdownOpen, setEngineeringDropdownOpen] = useState(false);

  const countryRef = useRef<HTMLDivElement>(null);
  const engineeringRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setCountryDropdownOpen(false);
      }
      if (engineeringRef.current && !engineeringRef.current.contains(event.target as Node)) {
        setEngineeringDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavItems = [
    { id: 'products', label: 'Generator Sets' },
    { id: 'alternators', label: 'Alternators' },
    { id: 'applications', label: 'Applications' },
  ];

  const engineeringNavItems = [
    { id: 'calculator', label: 'Power & Fuel Sizer', desc: 'Calculate kVA, kW & hourly diesel burn', icon: Calculator },
    { id: 'asean-hub', label: 'ASEAN 0% Tariff Hub', desc: 'Form E certificates & grid compliance', icon: Globe },
    { id: 'factory-trust', label: '100% Bench Testing', desc: 'ISO 8528 G3 load bank inspection', icon: Building },
    { id: 'parts-service', label: 'Parts & Spares Support', desc: 'Scheduled maintenance kits & OEM spares', icon: Wrench },
    { id: 'technical-faq', label: 'Technical FAQ & Standards', desc: '50Hz/60Hz specifications & voltage guidance', icon: HelpCircle },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    setEngineeringDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isEngineeringActive = engineeringNavItems.some(item => item.id === activeSection);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      
      {/* 1. Ultra-Clean Micro Announcement Ribbon (Prevents any horizontal overflow) */}
      <div className="bg-slate-50 border-b border-slate-100 text-[11px] text-slate-500 py-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-hidden">
          
          {/* Left: Enterprise Factory Credential */}
          <div className="flex items-center gap-2 truncate min-w-0">
            <span className="inline-flex items-center gap-1 text-blue-700 font-bold shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Yuchai Official Partner</span>
            </span>
            <span className="text-slate-300 hidden sm:inline">&bull;</span>
            <span className="text-slate-500 hidden sm:inline truncate">
              50Hz / 60Hz Dual Frequency &bull; Form E 0% Tariff
            </span>
          </div>

          {/* Right: Quick Instant Contact */}
          <div className="flex items-center gap-3 shrink-0 text-xs">
            <a 
              href="https://wa.me/8613635028889" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp: +86 136 3502 8889</span>
            </a>

            <span className="text-slate-200 hidden md:inline">|</span>

            <a 
              href="tel:+867757221888" 
              className="hidden md:inline-flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Phone className="w-3 h-3 text-slate-400" />
              <span>Factory: +86-775-7221888</span>
            </a>
          </div>

        </div>
      </div>

      {/* 2. Main Navigation Bar - Spacious, Clean & Airy (No Cramping) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-6">
          
          {/* Left: Brand Identity */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-all shrink-0">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 font-['Space_Grotesk']">
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
          </div>

          {/* Center: Uncluttered Navigation Links (hidden on < lg to prevent crowding/overflow) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {primaryNavItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeSection === item.id
                    ? 'text-blue-600 bg-blue-50 font-bold'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* "Engineering & Hub" Dropdown */}
            <div className="relative" ref={engineeringRef}>
              <button
                onClick={() => setEngineeringDropdownOpen(!engineeringDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isEngineeringActive || engineeringDropdownOpen
                    ? 'text-blue-600 bg-blue-50 font-bold'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <span>Engineering &amp; Hub</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${engineeringDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {engineeringDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                    Engineering &amp; Export Solutions
                  </div>
                  {engineeringNavItems.map((sec) => {
                    const Icon = sec.icon;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => handleNavClick(sec.id)}
                        className={`w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors cursor-pointer ${
                          activeSection === sec.id
                            ? 'bg-blue-50 text-blue-700'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{sec.label}</div>
                          <div className="text-[11px] text-slate-500 leading-snug mt-0.5">{sec.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right: Actions & Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* ASEAN Grid Dropdown */}
            <div className="relative" ref={countryRef}>
              <button
                onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 py-1.5 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
                title="Filter by target ASEAN market"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="hidden sm:inline">ASEAN Grid</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {countryDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center justify-between">
                    <span>Target Grid Voltage</span>
                    <span className="text-blue-600 font-mono font-bold">50Hz / 60Hz</span>
                  </div>
                  {ASEAN_COUNTRIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCountry(c.id);
                        setCountryDropdownOpen(false);
                        handleNavClick('asean-hub');
                      }}
                      className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-sm">{c.flag}</span>
                        <span className="font-semibold text-slate-800">{c.name}</span>
                      </span>
                      <span className="text-[10px] text-blue-600 font-mono font-semibold">
                        {c.frequency}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Compare Trigger (Only if models selected) */}
            {comparisonCount > 0 && onOpenComparisonModal && (
              <button
                onClick={onOpenComparisonModal}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl font-bold text-xs bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-all cursor-pointer shadow-2xs shrink-0"
                title="Open side-by-side comparison"
              >
                <Scale className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden xs:inline">Compare</span>
                <span className="px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px] font-mono">
                  {comparisonCount}
                </span>
              </button>
            )}

            {/* Primary Request a Quote Button */}
            <button
              id="btn-nav-rfq"
              onClick={() => onOpenRfq()}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all hover:shadow-md cursor-pointer whitespace-nowrap shrink-0"
            >
              <FileText className="w-4 h-4" />
              <span>Request Quote</span>
            </button>

            {/* Mobile / Tablet Menu Button (Shows on < lg) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 cursor-pointer shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* 3. Mobile / Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
          
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2">Navigation</div>
          
          <div className="grid grid-cols-1 gap-1">
            {[...primaryNavItems, ...engineeringNavItems].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {comparisonCount > 0 && onOpenComparisonModal && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenComparisonModal();
              }}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Scale className="w-4 h-4 text-blue-600" />
              <span>View Side-by-Side Comparison ({comparisonCount})</span>
            </button>
          )}

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-2">
              Select Target ASEAN Grid:
            </div>
            
            <div className="grid grid-cols-2 gap-1.5">
              {ASEAN_COUNTRIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCountry(c.id);
                    handleNavClick('asean-hub');
                  }}
                  className="px-2.5 py-2 rounded-xl bg-slate-50 text-xs text-left text-slate-700 border border-slate-200 flex items-center justify-between hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <span>{c.flag}</span>
                    <span className="truncate font-medium">{c.name}</span>
                  </span>
                  <span className="text-[10px] text-blue-600 font-mono font-bold shrink-0">{c.frequency.split('/')[0]}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRfq();
              }}
              className="w-full mt-3 py-3 rounded-xl font-bold text-center bg-blue-600 hover:bg-blue-700 text-white text-xs shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Request Custom Quotation (FOB / CIF)
            </button>
          </div>

        </div>
      )}

    </header>
  );
};
