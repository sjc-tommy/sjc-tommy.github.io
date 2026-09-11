import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Send, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Building, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Clock,
  Printer,
  Download,
  MessageSquare
} from 'lucide-react';
import { GENSET_PRODUCTS } from '../data/gensets';
import { ASEAN_COUNTRIES } from '../data/asean';
import { CanopyType, RfqFormData } from '../types';

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedModelId?: string;
  initialKw?: number;
  initialFreq?: string;
  initialCanopy?: string;
}

export const RfqModal: React.FC<RfqModalProps> = ({
  isOpen,
  onClose,
  preselectedModelId,
  initialKw,
  initialFreq,
  initialCanopy,
}) => {
  const [formData, setFormData] = useState<RfqFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phoneOrWhatsApp: '',
    country: 'Vietnam',
    targetGensetModel: preselectedModelId || 'tfw-100',
    requiredKw: initialKw || 100,
    frequency: (initialFreq as any) || '50Hz / 400V',
    canopyType: (initialCanopy as CanopyType) || 'silent',
    quantity: 1,
    incoterm: 'CIF Haiphong',
    includeAts: true,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  if (!isOpen) return null;

  const currentGenset = GENSET_PRODUCTS.find(g => g.id === formData.targetGensetModel) || GENSET_PRODUCTS[4];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handlePrintQuotation = () => {
    setIsExportingPdf(true);
    setTimeout(() => {
      window.print();
      setIsExportingPdf(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        id="rfq-quotation-modal"
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 font-['Space_Grotesk']">
                Official B2B RFQ Quotation &amp; Spec Sheet Request
              </h3>
              <p className="text-xs text-slate-500">
                Direct Factory Pricing (FOB / CIF) &bull; 48-Hour Official Quotation Guarantee
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer border border-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 flex-1 bg-white">
          {submitted ? (
            /* Submission Success State */
            <div className="text-center py-10 space-y-6 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 font-['Space_Grotesk']">
                  Quotation Request Received!
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.fullName}</strong> ({formData.companyName}). 
                  Our ASEAN export engineering desk has received your request for{' '}
                  <strong className="text-blue-700">{currentGenset.model} ({currentGenset.primePowerKw} kW)</strong>.
                </p>
              </div>

              {/* Inquiry Summary Slip */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between border-b border-slate-200 pb-1.5 text-slate-500">
                  <span>Target Model:</span>
                  <span className="text-slate-900 font-bold">{currentGenset.model} ({currentGenset.primePowerKw}kW)</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5 text-slate-500">
                  <span>Engine:</span>
                  <span className="text-slate-800">Yuchai {currentGenset.engineModel}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5 text-slate-500">
                  <span>Frequency / Grid:</span>
                  <span className="text-blue-700 font-semibold">{formData.frequency}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5 text-slate-500">
                  <span>Incoterms &amp; Dest:</span>
                  <span className="text-slate-800">{formData.incoterm}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Form E Certificate:</span>
                  <span className="text-emerald-700 font-bold">Included (0% Duty)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handlePrintQuotation}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
                >
                  <Printer className="w-4 h-4 text-blue-600" />
                  <span>Print Formal Spec Summary</span>
                </button>

                <a
                  href={`https://wa.me/8613635028889?text=Hello%20Zhiqiang%20Power,%20I%20have%20submitted%20an%20RFQ%20for%20model%20${currentGenset.model}%20(${currentGenset.primePowerKw}kW)%20for%20${formData.companyName}%20in%20${formData.country}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Fast-Track via WhatsApp (+86 136 3502 8889)</span>
                </a>
              </div>
            </div>
          ) : (
            /* Main RFQ Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Product Pre-selection & Parameter Summary */}
              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase text-blue-700 font-bold">
                    1. Selected Genset Model &amp; Engineering Configuration
                  </span>
                  <span className="text-[11px] text-emerald-700 font-mono font-semibold">
                    Tier 3 Compliant &bull; 100% Cu TFW Alternator
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="text-slate-600 block mb-1 font-medium">Select Generator Model:</label>
                    <select
                      value={formData.targetGensetModel}
                      onChange={(e) => setFormData({ ...formData, targetGensetModel: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono font-bold text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      {GENSET_PRODUCTS.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.model} ({g.primePowerKw}kW / {g.primePowerKva}kVA) - Yuchai {g.engineModel}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-600 block mb-1 font-medium">Frequency / Voltage Standard:</label>
                    <select
                      value={formData.frequency}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      <option value="50Hz / 400V">50Hz / 400V (Vietnam, Indonesia, Thailand, Malaysia)</option>
                      <option value="60Hz / 220V-380V">60Hz / 220V-380V (Philippines 1800 RPM)</option>
                      <option value="Custom">Custom High-Voltage (6.3kV / 10.5kV)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-600 block mb-1 font-medium">Housing / Canopy Type:</label>
                    <select
                      value={formData.canopyType}
                      onChange={(e) => setFormData({ ...formData, canopyType: e.target.value as CanopyType })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      <option value="open">Open Skid (Plant Room / Low Cost)</option>
                      <option value="silent">Soundproof Silent Canopy (68-75 dBA)</option>
                      <option value="container">Weatherproof Container (20ft / 40ft)</option>
                      <option value="trailer">Mobile Wheel Trailer (Towable)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Accessories Checkboxes */}
                <div className="pt-3 mt-3 border-t border-slate-200 flex flex-wrap items-center gap-6 text-xs text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.includeAts}
                      onChange={(e) => setFormData({ ...formData, includeAts: e.target.checked })}
                      className="rounded accent-blue-600 w-4 h-4"
                    />
                    <span>Include Automatic Transfer Switch (ATS SmartGen Panel)</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-600">Order Quantity:</span>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) || 1 })}
                      className="w-16 px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-900 font-mono text-center text-xs focus:border-blue-500 outline-none"
                    />
                    <span className="text-slate-600">Units</span>
                  </div>
                </div>
              </div>

              {/* Destination Port & Delivery Logistics */}
              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase text-blue-700 font-bold">
                    2. Trade Term &amp; Destination Port
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    ACFTA Form E (0% Duty) Included with Shipping Documents
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-600 block mb-1 font-medium">Target Country:</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      {ASEAN_COUNTRIES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.flag} {c.name} ({c.mainCert})
                        </option>
                      ))}
                      <option value="Other">Other Global Destination</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-600 block mb-1 font-medium">Trade Term / Incoterm:</label>
                    <select
                      value={formData.incoterm}
                      onChange={(e) => setFormData({ ...formData, incoterm: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      <option value="FOB Nansha/Qinzhou">FOB Guangzhou Nansha / Qinzhou Port</option>
                      <option value="CIF Haiphong">CIF Haiphong (Vietnam)</option>
                      <option value="CIF Manila">CIF Manila (Philippines)</option>
                      <option value="CIF Jakarta">CIF Tanjung Priok, Jakarta (Indonesia)</option>
                      <option value="CIF Klang">CIF Port Klang (Malaysia)</option>
                      <option value="CIF Bangkok">CIF Bangkok / Laem Chabang (Thailand)</option>
                      <option value="EXW Factory">EXW Factory (Luchuan, Guangxi)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 space-y-3">
                <span className="text-xs font-mono uppercase text-blue-700 font-bold block">
                  3. Importer / Buyer Contact Information
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-700 block mb-1 font-medium">Full Contact Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nguyen Van Tuan / John Santos"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 block mb-1 font-medium">Company / Project Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Saigon Electrics Co. / Manila Power Solutions"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 block mb-1 font-medium">Business Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="buyer@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 block mb-1 font-medium">WhatsApp or Phone Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="+84 90... / +63 917..."
                      value={formData.phoneOrWhatsApp}
                      onChange={(e) => setFormData({ ...formData, phoneOrWhatsApp: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-700 block mb-1 text-xs font-medium">Project Notes or Special Requirements (Optional):</label>
                  <textarea
                    rows={2}
                    placeholder="Specific ambient temperature, altitude, paralleling requirements, or desired delivery date..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Submit CTA Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>We reply with itemized FOB/CIF quotation &amp; CAD drawings within 24–48 hours.</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handlePrintQuotation}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-200 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Spec Slip</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Request for Quotation (RFQ)</span>
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
