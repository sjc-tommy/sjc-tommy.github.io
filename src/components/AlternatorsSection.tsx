import React, { useState } from 'react';
import { 
  Cpu, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Layers, 
  Zap, 
  Info,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ALTERNATORS_DATA } from '../data/alternators';
import { brushlessCopperAlternatorImg } from '../assets/images';

interface AlternatorsSectionProps {
  onOpenRfq: (modelId?: string) => void;
}

export const AlternatorsSection: React.FC<AlternatorsSectionProps> = ({ onOpenRfq }) => {
  const [selectedSeries, setSelectedSeries] = useState<'TFW' | 'STC'>('TFW');

  const alternators = ALTERNATORS_DATA.filter(a => a.series === selectedSeries);

  return (
    <section id="alternators" className="bg-white py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2">
              <Cpu className="w-3.5 h-3.5 text-blue-600" /> Self-Manufactured Alternators
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
              TFW Brushless & STC Alternator Series
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl">
              Manufactured in-house by Luchuan Zhiqiang Factory. 100% electrolytic pure copper wire, 
              vacuum pressure impregnated (VPI) Class H insulation, and advanced AVR automatic voltage regulation.
            </p>
          </div>

          {/* Series Toggle */}
          <div className="flex rounded-xl p-1 bg-slate-100 border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setSelectedSeries('TFW')}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                selectedSeries === 'TFW'
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              TFW Brushless Series (Primary)
            </button>
            <button
              onClick={() => setSelectedSeries('STC')}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                selectedSeries === 'STC'
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              STC Harmonic Brush Series
            </button>
          </div>
        </div>

        {/* Alternator Showcase Banner with AI Generated Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10 items-center rounded-2xl bg-white border border-slate-200 p-6 shadow-xl shadow-blue-900/5 overflow-hidden relative">
          <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group">
            <img 
              src={brushlessCopperAlternatorImg} 
              alt="Luchuan Zhiqiang TFW Brushless 100% Copper Alternator" 
              referrerPolicy="no-referrer"
              className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
              <span className="bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg border border-slate-200 text-blue-700 font-mono font-bold shadow-xs">
                TFW-4 Brushless Synchronous
              </span>
              <span className="bg-emerald-500/90 backdrop-blur px-2.5 py-1 rounded-lg text-white font-mono text-[11px] shadow-xs">
                100% Cu Winding
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Direct In-House Electrical Winding Quality
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Factory Integrated Alternators: Zero Intermediary Markups
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Unlike generic assemblers who outsource alternators, <strong className="text-slate-900">Luchuan Zhiqiang produces both the stator cores, rotor coils, and final assembly in-house</strong>. 
              This guarantees <strong className="text-blue-700 font-semibold">100% oxygen-free copper wire</strong> instead of cheap copper-clad aluminum (CCA), offering lower harmonic distortion (THD &lt; 3%), superior motor-starting capacity, and 20–30% cost savings for ASEAN buyers.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-mono">Stator / Rotor</div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5">100% Pure Cu</div>
                <div className="text-[10px] text-blue-600 font-medium">Low Heat Rise</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-mono">Insulation</div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5">Class H VPI</div>
                <div className="text-[10px] text-sky-600 font-medium">Tropical Anti-Mold</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-mono">AVR Accuracy</div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5">&plusmn;1% Solid-State</div>
                <div className="text-[10px] text-emerald-600 font-semibold">SX460 / AS440</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-100">
              Cu
            </div>
            <h4 className="text-sm font-bold text-slate-900">100% Electrolytic Pure Copper Wire</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every TFW stator and rotor is wound with premium oxygen-free electrolytic copper wire, guaranteeing minimum internal resistance, low temperature rise, and extreme longevity.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-sm border border-sky-100">
              H
            </div>
            <h4 className="text-sm font-bold text-slate-900">Class H Vacuum Pressure Impregnation</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Treated with multi-pass VPI resin and anti-fungal anti-moisture coating. Designed specifically for tropical high-humidity Southeast Asian environments.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm border border-emerald-100">
              &plusmn;1%
            </div>
            <h4 className="text-sm font-bold text-slate-900">AVR Solid-State Voltage Regulation</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equipped with SX460 / AS440 solid-state electronic AVR modules maintaining stable voltage within &plusmn;1% from no-load to full load, protecting sensitive IT & electronics.
            </p>
          </div>
        </div>

        {/* Alternator Spec Table */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
              {selectedSeries} Series Standard Model Specifications Table
            </h3>
            <span className="text-xs text-blue-600 font-mono font-bold">
              4-Pole &bull; 1500 RPM (50Hz) / 1800 RPM (60Hz)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 uppercase text-[11px] font-semibold">
                  <th className="py-3 px-4">Model</th>
                  <th className="py-3 px-4">Rated Power (kW/kVA)</th>
                  <th className="py-3 px-4">Center H (mm)</th>
                  <th className="py-3 px-4">Voltage</th>
                  <th className="py-3 px-4">Rated Current</th>
                  <th className="py-3 px-4">Regulation</th>
                  <th className="py-3 px-4">Insulation</th>
                  <th className="py-3 px-4">Net Weight</th>
                  <th className="py-3 px-4 text-right">Inquiry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {alternators.map((alt) => (
                  <tr key={alt.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{alt.model}</td>
                    <td className="py-3 px-4 font-mono text-blue-600 font-bold">
                      {alt.ratedPowerKw} kW / {alt.ratedPowerKva} kVA
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">{alt.frameCenterHeight || 'Standard'} mm</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{alt.voltage}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{alt.ratedCurrentA} A</td>
                    <td className="py-3 px-4 font-mono text-emerald-600 font-semibold">{alt.voltageRegulation}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">Class {alt.insulationClass}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{alt.weightKg} kg</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onOpenRfq(alt.id)}
                        className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 border border-blue-200 hover:border-blue-600 text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        RFQ &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
