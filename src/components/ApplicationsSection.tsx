import React from 'react';
import { 
  Building2, 
  HardHat, 
  Activity, 
  Radio, 
  Anchor, 
  Factory, 
  Zap, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

interface ApplicationsSectionProps {
  onOpenRfq: (modelId?: string) => void;
  onFilterPowerRange: (range: string) => void;
}

export const ApplicationsSection: React.FC<ApplicationsSectionProps> = ({
  onOpenRfq,
  onFilterPowerRange,
}) => {
  const applications = [
    {
      id: 'data-center',
      title: 'Hyperscale & Telecom Data Centers',
      tagline: 'Tier III / IV Standby Power & Fast Block-Load Step Response',
      icon: Building2,
      powerRange: '500 kW – 2200 kW',
      powerFilter: '1000-2200',
      models: 'TFW-500, TFW-1000, TFW-2000 (10.5kV HV Available)',
      requirements: [
        'Instant step-load acceptance within 3 seconds (&le;10% frequency dip).',
        'N+1 and 2N parallel synchronization with DeepSea/ComAp controllers.',
        'High-voltage 6.3kV / 10.5kV alternator winding options for low-loss transmission.',
      ],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'mining',
      title: 'Mining, Quarrying & Off-Grid Extraction',
      tagline: 'Heavy Sand & Dust Filtration with Massive Torque Reserve',
      icon: HardHat,
      powerRange: '200 kW – 1000 kW',
      powerFilter: '400-900',
      models: 'TFW-200, TFW-400, TFW-800',
      requirements: [
        'Heavy-duty 10.34L to 39.58L cast iron engine block resists structural vibration.',
        'Dual-stage desert air pre-filters and oversized fuel-water separators.',
        'Supports frequent direct-on-line (DOL) startup of crushers and slurry pumps.',
      ],
      image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'hospital',
      title: 'Hospitals & Critical Healthcare Facilities',
      tagline: 'Zero-Tolerance Blackout Prevention with Acoustic Quiet Canopies',
      icon: Activity,
      powerRange: '100 kW – 500 kW',
      powerFilter: '100-300',
      models: 'TFW-100, TFW-200, TFW-500 (Silent Canopy)',
      requirements: [
        'Automatic Transfer Switch (ATS) transfer within &lt;10 seconds.',
        'Ultra-quiet acoustic sound attenuation (&le;68 dBA at 7m) for patient comfort.',
        'Jacket water pre-heater maintains engine at 40°C for instant full-load pickup.',
      ],
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'industrial',
      title: 'Industrial Manufacturing & Textile Mills',
      tagline: '24/7 Prime Continuous Operation & Low Fuel Operating Expense',
      icon: Factory,
      powerRange: '100 kW – 600 kW',
      powerFilter: '100-300',
      models: 'TFW-100, TFW-150, TFW-300',
      requirements: [
        'Bosch HPCR common rail injection minimizes diesel consumption to &le;198 g/kWh.',
        'Dual-frequency 50Hz/60Hz export adaptability across Vietnam, Indonesia & Philippines.',
        'Continuous prime rating with 10% overload reserve capability for peak shifts.',
      ],
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'telecom',
      title: 'Telecom Towers & Microgrid Repeaters',
      tagline: 'Unattended Remote Sites with 1000L Extended Fuel Base Tanks',
      icon: Radio,
      powerRange: '30 kW – 100 kW',
      powerFilter: '30-80',
      models: 'TFW-30, TFW-50, TFW-80',
      requirements: [
        '4G / IoT cloud monitoring module for real-time fuel, oil pressure and battery status.',
        'Up to 7–14 days continuous autonomy on integrated base fuel tanks.',
        'Tamper-resistant anti-theft silent canopy locks for remote hilltop deployments.',
      ],
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'island',
      title: 'Island Electrification & Marine Harbors',
      tagline: 'Tropical 50°C Radiators & Anti-Corrosive Marine Protection',
      icon: Anchor,
      powerRange: '300 kW – 2200 kW',
      powerFilter: '1000-2200',
      models: 'TFW-300, TFW-1000, TFW-1500 (Containerized)',
      requirements: [
        'Anti-salt-spray epoxy paint coating and stainless steel exterior hardware.',
        'Tropicalized heavy copper radiators for ambient temperatures up to 50°C.',
        'CSC certified 20ft / 40ft containerized weatherproof housings for harsh sea winds.',
      ],
      image: 'https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="applications" className="bg-slate-50/60 py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-blue-600" /> Proven Field Applications
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Engineered For Severe Southeast Asian Operating Conditions
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            From hot tropical islands to remote nickel mines and high-reliability hospital centers, 
            Zhiqiang generator sets deliver unwavering power output.
          </p>
        </div>

        {/* 6 Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app) => {
            const Icon = app.icon;
            return (
              <div
                key={app.id}
                className="rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group shadow-xs"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={app.image}
                      alt={app.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                    
                    <div className="absolute top-3 left-3 p-2 rounded-lg bg-white/95 text-blue-600 border border-slate-200 shadow-xs backdrop-blur">
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="absolute bottom-3 right-3 bg-blue-600 text-white font-mono font-bold text-[10px] px-2.5 py-1 rounded-md shadow-xs">
                      {app.powerRange}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {app.title}
                      </h3>
                      <p className="text-xs text-blue-600 mt-1 font-semibold">
                        {app.tagline}
                      </p>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600">
                      {app.requirements.map((req, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{req}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                      <span>Suggested Sets:</span>{' '}
                      <strong className="text-slate-800 font-mono">{app.models}</strong>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onFilterPowerRange(app.powerFilter)}
                    className="text-xs text-slate-600 hover:text-blue-600 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>View Matching Models</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenRfq()}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 border border-blue-200 hover:border-blue-600 text-xs font-bold transition-all cursor-pointer"
                  >
                    Inquire Project &rarr;
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
