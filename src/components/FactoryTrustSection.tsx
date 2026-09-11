import React, { useState } from 'react';
import { 
  Building, 
  ShieldCheck, 
  CheckCircle2, 
  Gauge, 
  Video, 
  Truck, 
  Award, 
  Clock, 
  FileText, 
  Anchor, 
  Phone, 
  Play,
  Sparkles
} from 'lucide-react';
import { factoryTestingWorkshopImg } from '../assets/images';

interface FactoryTrustSectionProps {
  onOpenRfq: () => void;
}

export const FactoryTrustSection: React.FC<FactoryTrustSectionProps> = ({ onOpenRfq }) => {
  const [testingStep, setTestingStep] = useState(4); // 100% load
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const testSteps = [
    { step: '01', percent: '0% No-Load', desc: 'Verify oil pressure >0.3 MPa, charging voltage (27.6V), coolant circulation and electronic governor idling.' },
    { step: '02', percent: '25% Load', desc: 'Check thermal rise on alternator windings and harmonic waveform stabilization.' },
    { step: '03', percent: '50% Load', desc: 'Assess intermediate fuel consumption rate and turbocharger boost pressure response.' },
    { step: '04', percent: '75% Load', desc: 'Confirm continuous operational temperature stabilization in 50°C tropical cooling radiator.' },
    { step: '05', percent: '100% Full PRP', desc: 'Sustain rated prime output for 2 hours; verify voltage regulation within ±1% and frequency deviation ≤0.5%.' },
    { step: '06', percent: '110% Overload', desc: 'Hold 110% emergency overload for 1 hour to certify structural safety and governor torque surge resistance.' },
  ];

  return (
    <section id="factory-trust" className="bg-white py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> E-E-A-T Verified Manufacturing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Factory Direct Quality &amp; 100% Bench Load Testing
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Every Zhiqiang diesel generator is manufactured in our Luchuan industrial facility, 
            wound with in-house copper alternators, and tested on resistive load banks before container shipping.
          </p>
        </div>

        {/* 4 Core Pillars of E-E-A-T */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Experience (经验)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              20+ years of electrical generator manufacturing. Specialized export assembly lines for Vietnam, Indonesia, Philippines, and Malaysia.
            </p>
            <div className="text-[11px] text-blue-700 font-mono font-bold pt-1">
              &bull; 15–25 Day Production Delivery
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Gauge className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Expertise (专业)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full data sheets across all 16 Yuchai engine families. In-house TFW brushless winding with 100% pure copper and Class H insulation.
            </p>
            <div className="text-[11px] text-blue-700 font-mono font-bold pt-1">
              &bull; 30kW to 2200kW Dual Freq 50/60Hz
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Authoritativeness (权威)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Authorized Yuchai marine &amp; genset power partner. Certified Tier 3 emission compliance under the ASEAN AHVER framework.
            </p>
            <div className="text-[11px] text-emerald-700 font-mono font-bold pt-1">
              &bull; SNI, TISI, SIRIM, CR, BPS Ready
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Trust (信任)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transparent NAP+W entity information. Live video inspection calls and third-party inspection (SGS, BV, CCIC) fully welcomed.
            </p>
            <div className="text-[11px] text-indigo-700 font-mono font-bold pt-1">
              &bull; Form E 0% Tariff Documentation
            </div>
          </div>
        </div>

        {/* Interactive Load-Bank Testing Simulation */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Visual Factory Testing Bay Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-xl bg-slate-50 border border-slate-200 p-4 sm:p-5">
            <div className="lg:col-span-4 relative rounded-xl overflow-hidden border border-slate-200 h-48 sm:h-52 bg-slate-100 group">
              <img 
                src={factoryTestingWorkshopImg} 
                alt="Luchuan Zhiqiang Factory Testing Bay" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px]">
                <span className="bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg border border-slate-200 text-blue-700 font-mono font-bold shadow-xs">
                  Station Bay #3 (Load Bank)
                </span>
                <span className="bg-emerald-600 text-white px-2.5 py-1 rounded-lg font-mono font-bold shadow-xs">
                  LIVE BENCH
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-2.5">
              <div className="inline-flex items-center gap-1.5 text-xs text-blue-700 font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> 100% Pre-Shipment Inspection Protocol
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                Every Genset Undergoes 2–4 Hours Of Full-Load Resistive Bench Testing
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prior to ocean container stuffing, each unit is mounted to our heavy-duty test station. We run a full protocol checking lubricating oil pressure, coolant flow velocity, AVR dynamic voltage stabilization under step-load, and governor transient frequency damping.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 font-mono font-medium shadow-2xs">
                  Standard: ISO 8528-5 G3
                </span>
                <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 font-mono font-medium shadow-2xs">
                  Transient Dip: &le; 10%
                </span>
                <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 font-mono font-medium shadow-2xs">
                  Recovery Time: &lt; 3.0s
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-2">
            <div>
              <span className="text-xs font-mono uppercase text-blue-700 font-bold tracking-wider">
                QUALITY ASSURANCE PROTOCOL
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                Standard 6-Stage Resistive Load Bank Quality Verification
              </h3>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 font-semibold">
              ISO 8528-5 G3 Test Standard
            </span>
          </div>

          {/* Test Stage Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {testSteps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setTestingStep(idx)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  testingStep === idx
                    ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className={`text-[10px] font-mono ${testingStep === idx ? 'text-blue-100' : 'text-blue-600 font-bold'}`}>
                  {s.step}
                </div>
                <div className="text-xs font-semibold mt-0.5">{s.percent}</div>
              </button>
            ))}
          </div>

          {/* Current Step Description Card */}
          <div className="p-5 rounded-xl bg-blue-50/50 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono text-blue-700 font-bold uppercase">
                Active Test Phase: {testSteps[testingStep].percent}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {testSteps[testingStep].desc}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Passed 100% Quality Gate
              </span>
            </div>
          </div>

          {/* Factory Entity & Logistics Summary */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div>
              <strong className="text-slate-900 block mb-1">Factory Location &amp; Port Ingress:</strong>
              <p className="leading-relaxed">
                Longhao Entrepreneurship Park, West Ring Road, Luchuan County, Guangxi. 
                Direct inland access to Beibu Gulf Qinzhou Port (3.5 hours) &amp; Guangzhou Nansha Port.
              </p>
            </div>
            <div>
              <strong className="text-slate-900 block mb-1">Live Video Factory Audit:</strong>
              <p className="leading-relaxed">
                Schedule a real-time WeChat or WhatsApp video call with our chief testing engineer to inspect your generator assembly and load-bank run live.
              </p>
            </div>
            <div>
              <strong className="text-slate-900 block mb-1">Container Packing Protocol:</strong>
              <p className="leading-relaxed">
                Heavy steel transport bases, waterproof moisture shrink-wrap, desiccant bags, and heavy wooden crate packaging for ocean container transit.
              </p>
            </div>
          </div>

          {/* Factory Contact Fast CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/8613635028889"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>WhatsApp Video Audit: +86 136 3502 8889</span>
              </a>
              <a
                href="tel:+867757221888"
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors shadow-2xs"
              >
                Landline: +86-775-7221888
              </a>
            </div>

            <button
              onClick={onOpenRfq}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Request Factory FOB / CIF Price List &rarr;
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

