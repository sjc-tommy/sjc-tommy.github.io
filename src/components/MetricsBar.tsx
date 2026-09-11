import React from 'react';
import { Zap, Clock, ShieldCheck, Wrench, CheckCircle, Ship } from 'lucide-react';

export const MetricsBar: React.FC = () => {
  const metrics = [
    {
      icon: Zap,
      value: '30–2200 kW',
      label: 'Full Power Span',
      subtext: '37.5kVA – 2750kVA One-Stop Sourcing',
    },
    {
      icon: Clock,
      value: '50Hz & 60Hz',
      label: 'Dual Frequency',
      subtext: 'Dedicated 1800rpm for Philippines 60Hz',
    },
    {
      icon: Wrench,
      value: '16 Engine Series',
      label: 'Yuchai G-Drive T3',
      subtext: 'Bore 89mm to 200mm Heavy-Duty',
    },
    {
      icon: Ship,
      value: '15–25 Days',
      label: 'Rapid Production',
      subtext: 'Direct Port Dispatch to Nansha/Qinzhou',
    },
    {
      icon: ShieldCheck,
      value: '0% Tariff (Form E)',
      label: 'ASEAN Duty Exemption',
      subtext: 'Full ACFTA Legal Documentation',
    },
    {
      icon: CheckCircle,
      value: '948 Outlets',
      label: 'Global Service Network',
      subtext: 'Direct Yuchai Regional Parts & Tech',
    },
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-7 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div 
                key={idx} 
                className={`pt-4 lg:pt-0 ${idx !== 0 ? 'lg:pl-4' : ''} flex flex-col justify-center`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Space_Grotesk'] tracking-tight">
                    {m.value}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-800">
                  {m.label}
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5" title={m.subtext}>
                  {m.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
