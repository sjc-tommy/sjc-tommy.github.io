import React, { useState } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  Award, 
  FileCheck2, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  FileText,
  Building,
  Zap,
  ArrowRight
} from 'lucide-react';
import { ASEAN_COUNTRIES } from '../data/asean';
import { AseanCountry } from '../types';

interface AseanComplianceHubProps {
  selectedCountryId: string;
  onSelectCountry: (countryId: string) => void;
  onOpenRfq: (modelId?: string) => void;
}

export const AseanComplianceHub: React.FC<AseanComplianceHubProps> = ({
  selectedCountryId,
  onSelectCountry,
  onOpenRfq,
}) => {
  const activeCountry = ASEAN_COUNTRIES.find(c => c.id === selectedCountryId) || ASEAN_COUNTRIES[0];

  return (
    <section id="asean-hub" className="bg-white py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Globe className="w-3.5 h-3.5 text-blue-600" /> Regional Market Access &bull; ASEAN Focused
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            ASEAN Electrical Grid & Regulatory Compliance Center
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Luchuan Zhiqiang provides certified, import-ready diesel generator sets designed to meet local voltage, 
            frequency (50Hz vs 60Hz), national certifications (SNI, TISI, SIRIM, CR, BPS), and Tier 3 equivalent emissions.
          </p>
        </div>

        {/* Tier 3 Emission Compliance Callout Banner */}
        <div className="mb-10 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                AHVER Framework &bull; ASEAN Tier 3 Emission Standard Compliance
              </h4>
              <p className="text-xs text-emerald-800/90 mt-1 leading-relaxed">
                Since January 2024, Thailand, Vietnam, Indonesia, Malaysia, Philippines, and Cambodia enforce Tier 3 equivalent emission limits on stationary generators &gt;19kW. 
                All Zhiqiang Yuchai T3 models (GB 20891 Non-Road Stage III) fully comply, ensuring zero customs rejection risk.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
            100% AHVER READY
          </span>
        </div>

        {/* Country Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {ASEAN_COUNTRIES.map((country) => (
            <button
              key={country.id}
              onClick={() => onSelectCountry(country.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer border ${
                activeCountry.id === country.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20 font-bold scale-105'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className="text-base">{country.flag}</span>
              <span>{country.name}</span>
              <span className="text-[10px] opacity-75 font-mono">({country.frequency})</span>
            </button>
          ))}
        </div>

        {/* Detailed Active Country Compliance Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xl shadow-blue-900/5 space-y-8">
          
          {/* Header Row: Country Profile & Zhiqiang Factory Status */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl sm:text-5xl">{activeCountry.flag}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-slate-900 font-['Space_Grotesk']">
                    {activeCountry.name} ({activeCountry.chineseName})
                  </h3>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {activeCountry.mainCert}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Competent Regulatory Agency: <strong className="text-slate-800">{activeCountry.certAgency}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[11px] text-slate-500 block">Zhiqiang Factory Status:</span>
                <span className="text-xs font-bold text-blue-600 font-mono">
                  {activeCountry.zhiqiangStatus}
                </span>
              </div>
            </div>
          </div>

          {/* 4 Core Pillars for the Target Market */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            
            {/* 1. Grid Parameters */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-600 font-semibold">
                <Zap className="w-4 h-4 text-blue-600" />
                <span>Electrical Grid Standards</span>
              </div>
              <div className="text-base font-bold text-slate-900 font-mono">
                {activeCountry.voltageFrequency}
              </div>
              <p className="text-slate-600 leading-relaxed">
                {activeCountry.id === 'philippines' 
                  ? 'High speed 1800 RPM 4-pole alternator pairing required. Fully factory-calibrated.'
                  : 'Standard 1500 RPM 50Hz configuration. Wide voltage range tolerance (+/-10%).'
                }
              </p>
            </div>

            {/* 2. Certification & Safety */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-600 font-semibold">
                <FileCheck2 className="w-4 h-4 text-blue-600" />
                <span>Mandatory Certification</span>
              </div>
              <div className="text-sm font-bold text-blue-700">
                {activeCountry.mainCert}
              </div>
              <div className="text-[11px] text-slate-500">
                Compliance Processing: <strong className="text-slate-800">{activeCountry.complianceTime}</strong>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Zhiqiang provides full technical files, factory test records, and agency audit coordination.
              </p>
            </div>

            {/* 3. Tariff Exemption (Form E) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-600 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Preferential Tariff Advantage</span>
              </div>
              <div className="text-sm font-bold text-emerald-700">
                0% Import Tariff (Form E)
              </div>
              <p className="text-slate-600 leading-relaxed">
                {activeCountry.tariffBenefit}
              </p>
            </div>

            {/* 4. Priority Power Demand */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-600 font-semibold">
                <Building className="w-4 h-4 text-sky-600" />
                <span>Key Demand Power Range</span>
              </div>
              <div className="text-sm font-bold text-sky-700">
                {activeCountry.priorityPowerRange}
              </div>
              <p className="text-slate-600 leading-relaxed">
                Optimized inventory models for fast ocean shipment within 15–25 days.
              </p>
            </div>

          </div>

          {/* Market Insights & Localized Engineering Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                Market Insights & Application Dynamics:
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeCountry.marketInsights}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                Factory Engineering & Configuration Notes:
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeCountry.specialNotes}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-600">
              Need assistance with <strong className="text-slate-800">{activeCountry.name}</strong> customs clearance or local testing protocols?
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onOpenRfq()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Request {activeCountry.name} Compliant Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
