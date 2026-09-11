import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  Zap, 
  Cpu, 
  Fuel, 
  Gauge, 
  ShieldCheck, 
  Globe2, 
  CheckCircle2, 
  Flame, 
  Wind, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { GensetProduct } from '../types';

interface TechnicalDatasheetModalProps {
  product: GensetProduct | null;
  onClose: () => void;
  onOpenRfq: (modelId: string) => void;
}

export const TechnicalDatasheetModal: React.FC<TechnicalDatasheetModalProps> = ({
  product,
  onClose,
  onOpenRfq,
}) => {
  if (!product) return null;

  const handlePrint = () => {
    window.print();
  };

  const fuel50 = product.fuelCurve?.at50Percent || Math.round(product.fuelConsumptionLh * 0.54 * 10) / 10;
  const fuel75 = product.fuelCurve?.at75Percent || Math.round(product.fuelConsumptionLh * 0.77 * 10) / 10;
  const fuel100 = product.fuelConsumptionLh;
  const fuel110 = product.fuelCurve?.at110Percent || Math.round(product.fuelConsumptionLh * 1.13 * 10) / 10;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-5xl rounded-2xl bg-white border border-slate-200 shadow-2xl flex flex-col max-h-[94vh] overflow-hidden print:max-h-none print:border-none print:shadow-none print:rounded-none print:bg-white print:text-black">
        
        {/* Modal Top Control Bar (Hidden on Print) */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900 tracking-tight">
                  Perkins-Grade Technical Specification Sheet
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-mono font-semibold">
                  ISO 8528 G3
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Official Engineering Document &bull; Model {product.model} ({product.primePowerKw}kW / {product.primePowerKva}kVA)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer shadow-2xs"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-blue-600" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenRfq(product.id);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <span>Quote This Spec</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors ml-1 border border-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Datasheet Sheet Container */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-white text-slate-900 print:p-6 print:overflow-visible print:text-black">
          
          {/* Engineering Header Block */}
          <div className="border-b-2 border-blue-600 pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold tracking-wider text-blue-600 uppercase print:text-blue-700">
                  LUCHUAN ZHIQIANG POWER &bull; YUCHAI DIESEL GENERATING SET
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono border border-slate-200 print:bg-slate-100 print:text-slate-800">
                  DOC: TDS-{product.model}-2026
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight print:text-black">
                MODEL: {product.model}
              </h2>
              <div className="text-sm text-slate-600 print:text-slate-700 mt-0.5">
                Prime: <strong className="text-slate-900 print:text-black">{product.primePowerKw} kW ({product.primePowerKva} kVA)</strong> &bull; 
                Standby: <strong className="text-blue-700 print:text-blue-700">{product.standbyPowerKw} kW ({product.standbyPowerKva} kVA)</strong> &bull; 
                50Hz / 60Hz Dual Frequency
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="text-xs text-slate-500 print:text-slate-600 font-mono">
                Cross-Reference Benchmark:
              </div>
              <div className="inline-block px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-bold print:bg-blue-50 print:text-blue-900 print:border-blue-400">
                {product.perkinsBenchmark || 'Perkins Equivalent'}
              </div>
            </div>
          </div>

          {/* Key Electrical Rating Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 print:border-slate-300 print:bg-slate-50">
              <div className="text-[10px] font-mono text-slate-500 print:text-slate-600 uppercase">Prime Power (PRP)</div>
              <div className="text-lg font-black text-slate-900 print:text-black">{product.primePowerKw} kW</div>
              <div className="text-xs text-blue-700 font-mono font-semibold">{product.primePowerKva} kVA (cos φ = 0.8)</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 print:border-slate-300 print:bg-slate-50">
              <div className="text-[10px] font-mono text-slate-500 print:text-slate-600 uppercase">Standby Power (ESP)</div>
              <div className="text-lg font-black text-blue-700 print:text-blue-800">{product.standbyPowerKw} kW</div>
              <div className="text-xs text-slate-500 font-mono">{product.standbyPowerKva} kVA (Emergency)</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 print:border-slate-300 print:bg-slate-50">
              <div className="text-[10px] font-mono text-slate-500 print:text-slate-600 uppercase">Rated Speed / Freq</div>
              <div className="text-lg font-black text-slate-900 print:text-black">1500 / 1800 RPM</div>
              <div className="text-xs text-emerald-700 font-mono font-semibold">50Hz (400V) &bull; 60Hz (220-480V)</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 print:border-slate-300 print:bg-slate-50">
              <div className="text-[10px] font-mono text-slate-500 print:text-slate-600 uppercase">ElectropaK Standard</div>
              <div className="text-lg font-black text-slate-900 print:text-black">50°C Tropical</div>
              <div className="text-xs text-blue-600 font-mono font-semibold">Pre-Packaged Radiator</div>
            </div>
          </div>

          {/* 2-Column Core Engineering Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Diesel Engine Specs */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700 uppercase tracking-wider border-b border-slate-200 pb-1.5 print:border-slate-300 print:text-blue-700">
                <Flame className="w-3.5 h-3.5" /> 1. Yuchai Diesel Engine Architecture
              </div>
              
              <table className="w-full text-xs text-left border-collapse">
                <tbody className="divide-y divide-slate-200 print:divide-slate-200">
                  <tr>
                    <td className="py-1.5 text-slate-500 print:text-slate-600">Engine Model</td>
                    <td className="py-1.5 font-bold text-slate-900 print:text-black text-right font-mono">{product.engineModel}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-500 print:text-slate-600">Cylinders &amp; Arrangement</td>
                    <td className="py-1.5 text-slate-800 print:text-black text-right">{product.cylinders} Cylinders, {product.cylinders > 6 ? 'V-Type' : 'In-line 4-Stroke'}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-500 print:text-slate-600">Total Displacement</td>
                    <td className="py-1.5 text-slate-800 print:text-black text-right font-mono">{product.displacementL} Litres</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-500 print:text-slate-600">Bore × Stroke</td>
                    <td className="py-1.5 text-slate-800 print:text-black text-right font-mono">{product.boreStroke}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-500 print:text-slate-600">Aspiration Type</td>
                    <td className="py-1.5 text-slate-800 print:text-black text-right">{product.aspiration || 'Turbocharged & Air-to-Air Intercooled'}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-500 print:text-slate-600">Governor System</td>
                    <td className="py-1.5 text-emerald-700 print:text-emerald-700 text-right font-medium">{product.governorType} (Isochronous ≤ 0.5%)</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-500 print:text-slate-600">Total Lube Oil Sump Capacity</td>
                    <td className="py-1.5 text-slate-800 print:text-black text-right font-mono">{product.oilCapacityL} Litres</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-500 print:text-slate-600">Specific Fuel Rate</td>
                    <td className="py-1.5 text-emerald-700 print:text-emerald-700 text-right font-mono font-bold">&le; {product.fuelRateGkwh} g/kWh</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-500 print:text-slate-600">Emissions Compliance</td>
                    <td className="py-1.5 text-slate-800 print:text-black text-right">{product.emissionStandard}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Alternator & Electrical Specs */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700 uppercase tracking-wider border-b border-slate-200 pb-1.5 print:border-slate-300 print:text-blue-700">
                <Cpu className="w-3.5 h-3.5" /> 2. TFW Alternator &amp; Electrical Parameters
              </div>

              <table className="w-full text-xs text-left border-collapse">
                <tbody className="divide-y divide-slate-200 print:divide-slate-200">
                  <tr>
                    <td className="py-1.5 text-slate-500 print:text-slate-600">Alternator Model</td>
                    <td className="py-1.5 font-bold text-slate-900 print:text-black text-right font-mono">{product.alternatorModel}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-500 print:text-slate-600">Winding Technology</td>
                    <td className="py-1.5 text-emerald-700 print:text-emerald-700 text-right font-medium">100% Oxygen-Free Copper Winding</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-500 print:text-slate-600">Insulation &amp; Temp Rise Class</td>
                    <td className="py-1.5 text-slate-800 print:text-black text-right font-mono">Class H (VPI Impregnated)</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-500 print:text-slate-600">Protection Degree</td>
                    <td className="py-1.5 text-slate-800 print:text-black text-right font-mono">IP23 (Tropical Anti-Mildew)</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-500 print:text-slate-600">Voltage Regulator (AVR)</td>
                    <td className="py-1.5 text-slate-800 print:text-black text-right">Solid-State SX460 / AS440 (&plusmn;1.0%)</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-500 print:text-slate-600">Harmonic Distortion (THD)</td>
                    <td className="py-1.5 text-slate-800 print:text-black text-right font-mono">&lt; 3.0% (Linear load)</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-500 print:text-slate-600">Telephone Interference</td>
                    <td className="py-1.5 text-slate-800 print:text-black text-right font-mono">THF &lt; 2%, TIF &lt; 50</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-500 print:text-slate-600">Bearing Configuration</td>
                    <td className="py-1.5 text-slate-800 print:text-black text-right">Single Bearing, SAE Flange Coupled</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 text-slate-500 print:text-slate-600">Transient Step Load Dip</td>
                    <td className="py-1.5 text-slate-800 print:text-black text-right font-mono">&le; 15% (ISO 8528-5 Class G3)</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          {/* Fuel Consumption Load Curve (Perkins Standard) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 print:border-slate-300 print:bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700 uppercase tracking-wider print:text-blue-700">
                <Fuel className="w-3.5 h-3.5" /> 3. Fuel Consumption Profile (Density 0.85 kg/L @ 15°C)
              </div>
              <span className="text-[10px] text-slate-500 print:text-slate-600 font-mono">
                Tested according to ISO 3046 / ISO 8528
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 print:bg-white print:border-slate-300 shadow-2xs">
                <div className="text-[10px] text-slate-500 print:text-slate-600 uppercase font-mono">50% Load</div>
                <div className="text-base font-bold text-slate-900 print:text-black mt-0.5">{fuel50} L/h</div>
                <div className="text-[10px] text-slate-500 print:text-slate-600 font-mono">Off-Peak</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 print:bg-white print:border-slate-300 shadow-2xs">
                <div className="text-[10px] text-slate-500 print:text-slate-600 uppercase font-mono">75% Load</div>
                <div className="text-base font-bold text-slate-900 print:text-black mt-0.5">{fuel75} L/h</div>
                <div className="text-[10px] text-emerald-700 print:text-emerald-700 font-mono font-semibold">Continuous Sweet Spot</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 print:bg-white print:border-slate-300 shadow-2xs">
                <div className="text-[10px] text-slate-500 print:text-slate-600 uppercase font-mono">100% Prime</div>
                <div className="text-base font-bold text-emerald-700 print:text-emerald-800 mt-0.5">{fuel100} L/h</div>
                <div className="text-[10px] text-blue-700 print:text-blue-700 font-mono font-semibold">Rated Full Load</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 print:bg-white print:border-slate-300 shadow-2xs">
                <div className="text-[10px] text-slate-500 print:text-slate-600 uppercase font-mono">110% Standby</div>
                <div className="text-base font-bold text-amber-600 print:text-amber-800 mt-0.5">{fuel110} L/h</div>
                <div className="text-[10px] text-slate-500 print:text-slate-600 font-mono">1 Hour in 12</div>
              </div>
            </div>
          </div>

          {/* Physical Dimensions & Acoustic Enclosure Profile */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 print:border-slate-300 print:bg-slate-50 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700 uppercase tracking-wider print:text-blue-700">
              <Layers className="w-3.5 h-3.5" /> 4. Physical Dimensions, Weight &amp; Acoustic Enclosures
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200 print:bg-white print:border-slate-300 space-y-1 shadow-2xs">
                <div className="font-semibold text-slate-900 print:text-black">Open-Skid Type</div>
                <div className="text-slate-500 print:text-slate-600 font-mono text-[11px]">{product.dimensionsMm} mm</div>
                <div className="text-slate-700 print:text-slate-700 font-mono">Weight: {product.dryWeightKg} kg</div>
                <div className="text-[11px] text-slate-500">Noise: ~{product.noiseLevelOpenDb || 95} dB(A) @ 1m</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 print:bg-white print:border-slate-300 space-y-1 shadow-2xs">
                <div className="font-semibold text-blue-700 print:text-blue-800">Soundproof Canopy (Silent)</div>
                <div className="text-slate-500 print:text-slate-600 font-mono text-[11px]">Enclosure thickness 2.0mm steel</div>
                <div className="text-slate-700 print:text-slate-700 font-mono">Weight: {Math.round(product.dryWeightKg * 1.35)} kg</div>
                <div className="text-[11px] text-emerald-700 print:text-emerald-700 font-semibold">Noise: &le; {product.noiseLevelSilentDb || 72} dB(A) @ 7m</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 print:bg-white print:border-slate-300 space-y-1 shadow-2xs">
                <div className="font-semibold text-slate-900 print:text-blue-800">ASEAN Export Compliance</div>
                <div className="text-slate-500 print:text-slate-600">Certificate of Origin Form E (0% Duty)</div>
                <div className="text-slate-700 print:text-slate-700 font-mono">Inspection: 100% Load Bank</div>
                <div className="text-[11px] text-blue-600 print:text-blue-700 font-semibold">Dispatch: 15–25 Days to Port</div>
              </div>
            </div>
          </div>

          {/* Official Sign-off Footer */}
          <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 print:text-slate-600 print:border-slate-300">
            <div>
              Factory: Luchuan Zhiqiang Electric Power Equipment Co., Ltd. &bull; Yuchai Engine High-Tech Industrial Park, Guangxi, China
            </div>
            <div className="font-mono text-slate-600">
              Hotline: +86-775-7221888 &bull; WhatsApp: +86 136 3502 8889
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
