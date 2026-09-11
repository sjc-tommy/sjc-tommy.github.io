import React, { useState } from 'react';
import { 
  X, 
  Zap, 
  Fuel, 
  Gauge, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  FileText, 
  Printer, 
  Sliders, 
  Layers, 
  ChevronRight,
  Info,
  HelpCircle,
  PackageCheck
} from 'lucide-react';
import { GensetProduct } from '../types';
import { 
  openSkidGensetImg, 
  silentCanopyGensetImg, 
  containerGensetImg 
} from '../assets/images';

interface ProductDetailModalProps {
  product: GensetProduct | null;
  onClose: () => void;
  onOpenRfq: (modelId: string) => void;
  onOpenDatasheet?: (product: GensetProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenRfq,
  onOpenDatasheet,
}) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'options' | 'applications' | 'faq'>('specs');
  const [selectedCanopyPreview, setSelectedCanopyPreview] = useState<'open' | 'silent' | 'container'>('open');

  if (!product) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        id="product-detail-modal"
        className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 shadow-2xs">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900 font-['Space_Grotesk']">
                  {product.model} &bull; {product.primePowerKw} kW / {product.primePowerKva} kVA
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {product.emissionStandard}
                </span>
                {product.perkinsBenchmark && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                    {product.perkinsBenchmark}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Luchuan Zhiqiang Factory Direct &bull; Powered by Yuchai {product.engineModel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenDatasheet && (
              <button
                onClick={() => onOpenDatasheet(product)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Datasheet PDF</span>
              </button>
            )}
            <button
              onClick={handlePrint}
              title="Print Specification Sheet"
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer border border-slate-200"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer border border-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1 bg-white">
          
          {/* Module 1: Model Overview & Multi-angle / Dimensional Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Image & Canopy Selector */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 h-64 sm:h-72">
                <img
                  src={
                    selectedCanopyPreview === 'silent'
                      ? silentCanopyGensetImg
                      : selectedCanopyPreview === 'container'
                      ? containerGensetImg
                      : openSkidGensetImg
                  }
                  alt={`${product.model} ${selectedCanopyPreview} canopy technical illustration`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-xs font-mono text-blue-700 font-bold border border-slate-200 shadow-xs">
                  {selectedCanopyPreview.toUpperCase()} TYPE CONFIGURATION
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-xs font-mono text-slate-700 border border-slate-200 shadow-xs">
                  Dim: {product.dimensionsMm} mm
                </div>
              </div>

              {/* Canopy View Toggles */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Preview Canopy:</span>
                {(['open', 'silent', 'container'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCanopyPreview(c)}
                    className={`px-3 py-1 rounded-md capitalize font-semibold border transition-colors ${
                      selectedCanopyPreview === c
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    {c} Skid
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Module 2 Core Selling Points */}
            <div className="lg:col-span-6 space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-mono text-blue-700 font-bold uppercase">MODULE 2 &bull; FACTORY ARCHITECTURE</span>
                <h4 className="text-xl font-bold text-slate-900 mt-1">
                  Yuchai Original G-Drive + Zhiqiang TFW Brushless
                </h4>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Genuine Yuchai Heavy-Duty Engine ({product.engineModel}):</strong> {product.cylinders} cylinders, {product.displacementL}L displacement, engineered with alloy cast iron block and reinforced 4-bolt main bearing.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">Self-Produced TFW High-Copper Alternator:</strong> 100% electrolytic copper wire windings, Class H vacuum pressure impregnation, SX460/AS440 AVR with &plusmn;1% regulation.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">50Hz/60Hz Dual Frequency Switchable:</strong> Fully optimized for 1500 RPM (ASEAN 50Hz) or 1800 RPM (Philippines 60Hz 220V/380V/480V).
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">High Fuel Efficiency:</strong> Rated fuel burn is only {product.fuelConsumptionLh} L/h at 100% prime load, saving 15%–20% operational OPEX over its lifetime.
                  </span>
                </div>
              </div>

              {/* Competitive Verdict */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 leading-relaxed">
                <strong className="text-blue-950 font-bold">Market Positioning:</strong> {product.competitiveHighlight}
              </div>
            </div>

          </div>

          {/* Module Navigation Tabs */}
          <div className="border-b border-slate-200 flex items-center gap-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'specs'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Gauge className="w-4 h-4" />
              <span>3. Full Technical Parameters</span>
            </button>

            <button
              onClick={() => setActiveTab('options')}
              className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'options'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>4. Optional Configurations</span>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'applications'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <PackageCheck className="w-4 h-4" />
              <span>5. Applications &amp; Suitability</span>
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'faq'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>6. Model FAQ (AEO)</span>
            </button>
          </div>

          {/* Tab 1: Module 3 Technical Parameters Table */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Complete Engineering Technical Data Sheet ({product.model})
                </h4>
                <span className="text-[11px] text-slate-500 font-mono">
                  Standard Testing: 25°C, 100kPa, Relative Humidity 30%
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-2.5 px-4 bg-slate-50 font-semibold text-slate-700 w-1/4">Genset Model</td>
                      <td className="py-2.5 px-4 text-slate-900 font-mono font-bold w-1/4">{product.model}</td>
                      <td className="py-2.5 px-4 bg-slate-50 font-semibold text-slate-700 w-1/4">Governor Type</td>
                      <td className="py-2.5 px-4 text-slate-800 font-mono w-1/4">{product.governorType}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2.5 px-4 bg-slate-50 font-semibold text-slate-700">Prime Power (PRP)</td>
                      <td className="py-2.5 px-4 text-blue-700 font-mono font-bold">{product.primePowerKw} kW / {product.primePowerKva} kVA</td>
                      <td className="py-2.5 px-4 bg-slate-50 font-semibold text-slate-700">Standby Power (ESP)</td>
                      <td className="py-2.5 px-4 text-slate-800 font-mono">{product.standbyPowerKw} kW / {product.standbyPowerKva} kVA</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2.5 px-4 bg-slate-50 font-semibold text-slate-700">Engine Brand &amp; Model</td>
                      <td className="py-2.5 px-4 text-slate-900 font-mono font-semibold">YUCHAI {product.engineModel}</td>
                      <td className="py-2.5 px-4 bg-slate-50 font-semibold text-slate-700">Cylinders &amp; Layout</td>
                      <td className="py-2.5 px-4 text-slate-800 font-mono">{product.cylinders} Cylinders ({product.cylinders > 6 ? 'V-Type' : 'In-Line'})</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2.5 px-4 bg-slate-50 font-semibold text-slate-700">Displacement</td>
                      <td className="py-2.5 px-4 text-slate-800 font-mono">{product.displacementL} Liters</td>
                      <td className="py-2.5 px-4 bg-slate-50 font-semibold text-slate-700">Bore &times; Stroke</td>
                      <td className="py-2.5 px-4 text-slate-800 font-mono">{product.boreStroke}</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2.5 px-4 bg-slate-50 font-semibold text-slate-700">Rated Fuel Burn (100%)</td>
                      <td className="py-2.5 px-4 text-emerald-700 font-mono font-bold">{product.fuelConsumptionLh} L/h</td>
                      <td className="py-2.5 px-4 bg-slate-50 font-semibold text-slate-700">Specific Fuel Rate</td>
                      <td className="py-2.5 px-4 text-slate-800 font-mono">&le; {product.fuelRateGkwh} g/(kW&middot;h)</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2.5 px-4 bg-slate-50 font-semibold text-slate-700">Alternator Model</td>
                      <td className="py-2.5 px-4 text-blue-700 font-mono font-semibold">{product.alternatorModel}</td>
                      <td className="py-2.5 px-4 bg-slate-50 font-semibold text-slate-700">Insulation &amp; Protection</td>
                      <td className="py-2.5 px-4 text-slate-800 font-mono">Class H / IP21 (IP23 Option)</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2.5 px-4 bg-slate-50 font-semibold text-slate-700">Dimensions (Open Skid)</td>
                      <td className="py-2.5 px-4 text-slate-800 font-mono">{product.dimensionsMm} mm</td>
                      <td className="py-2.5 px-4 bg-slate-50 font-semibold text-slate-700">Dry Net Weight</td>
                      <td className="py-2.5 px-4 text-slate-800 font-mono">{product.dryWeightKg.toLocaleString()} kg</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 bg-slate-50 font-semibold text-slate-700">Emission Compliance</td>
                      <td className="py-2.5 px-4 text-emerald-700 font-semibold">{product.emissionStandard}</td>
                      <td className="py-2.5 px-4 bg-slate-50 font-semibold text-slate-700">Dual Grid Calibration</td>
                      <td className="py-2.5 px-4 text-slate-800 font-mono">50Hz (400V) &amp; 60Hz (220/380/480V)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Module 4 Optional Configurations */}
          {activeTab === 'options' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Soundproof Silent Enclosure (68-75 dBA at 7m)
                </div>
                <p className="text-slate-600 leading-relaxed">
                  2mm thick cold-rolled galvanized steel construction, flame-retardant rockwool sound absorption, internal industrial silencer, dual side access doors with tamper-proof locks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Automatic Transfer Switch (ATS) &amp; SmartGen / DeepSea
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Dual-power mains/generator changeover switch (&lt;10 second transfer), SmartGen HGM6120N or DeepSea DSE7320 digital controller with RS485/Modbus remote cloud monitoring.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Heavy-Duty Mobile Trailer (2-wheel or 4-wheel)
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Torsion bar suspension, pneumatic highway-speed tires, mechanical handbrake, height-adjustable tow hitch, front support wheel, and highway safety lighting kit.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Tropical 50°C Radiator &amp; Engine Water Jacket Pre-Heater
                </div>
                <p className="text-slate-600 leading-relaxed">
                  High-capacity heavy-duty radiator with belt safety guard, 220V thermostatic jacket coolant heater ensuring immediate black-start under adverse ambient conditions.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Module 5 Applications */}
          {activeTab === 'applications' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.applications.map((app, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800">{app}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h5 className="font-bold text-slate-900">Export Logistics &amp; Packaging:</h5>
                <p className="text-slate-600 leading-relaxed">
                  Shipped on heavy steel base skid with export wooden crate or plastic stretch shrink wrap. Form E Certificate of Origin issued by China Customs, qualifying for 0% preferential tariff in Vietnam, Indonesia, the Philippines, Thailand, and Malaysia.
                </p>
              </div>
            </div>
          )}

          {/* Tab 4: Module 6 Model FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">
                  Q: What is the delivery lead time for {product.model}?
                </div>
                <div className="text-slate-600 leading-relaxed">
                  A: Standard open skid units are ready for dispatch within <strong>15–25 days</strong> from order confirmation. Soundproof silent canopy and custom containerized sets require 30–35 days.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">
                  Q: Can {product.model} be configured for Philippines 60Hz 220V/380V?
                </div>
                <div className="text-slate-600 leading-relaxed">
                  A: Yes, our factory provides dedicated 1800 RPM governor calibration and 60Hz winding setup for the Philippine market with full BPS compliance.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">
                  Q: Does Zhiqiang provide OEM branding and custom control panel configurations?
                </div>
                <div className="text-slate-600 leading-relaxed">
                  A: Yes. We support full OEM logo labeling, custom paint colors (RAL codes), ATS panel integration, and synchronized parallel switchboards.
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Module 7: Modal Footer with Fast RFQ Callout */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-xs text-slate-500 block">Export Pricing Terms:</span>
            <span className="text-xs text-blue-700 font-semibold">
              FOB Nansha / Qinzhou Port or CIF ASEAN Ports &bull; Volume Discount Available
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors border border-slate-200 cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenRfq(product.id);
              }}
              className="flex-1 sm:flex-initial py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Get FOB/CIF Quotation for {product.model}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
