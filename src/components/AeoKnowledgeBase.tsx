import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Code, 
  Layers, 
  FileText, 
  ExternalLink,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { AEO_FAQ_ITEMS, SCHEMA_ORGANIZATION } from '../data/faqAeo';
import { SEO_KEYWORDS_MATRIX } from '../data/seoMatrix';

interface AeoKnowledgeBaseProps {
  onOpenRfq: (modelId?: string) => void;
}

export const AeoKnowledgeBase: React.FC<AeoKnowledgeBaseProps> = ({ onOpenRfq }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string>('aeo-1');
  const [showSeoMatrix, setShowSeoMatrix] = useState<boolean>(false);
  const [keywordFilter, setKeywordFilter] = useState<string>('');
  const [showJsonLd, setShowJsonLd] = useState<boolean>(false);

  const categories = ['All', 'Fuel & Operating Cost', 'Sizing & Calculation', 'Electrical Standards & ASEAN', 'Prime vs Standby', 'Canopy Types', 'Brand Comparison & Reliability', 'Logistics & ASEAN Import', 'Maintenance & Service'];

  const filteredFaqs = useMemo(() => {
    return AEO_FAQ_ITEMS.filter(f => {
      if (activeCategory !== 'All' && f.category !== activeCategory) return false;
      return true;
    });
  }, [activeCategory]);

  const filteredKeywords = useMemo(() => {
    if (!keywordFilter.trim()) return SEO_KEYWORDS_MATRIX;
    const q = keywordFilter.toLowerCase();
    return SEO_KEYWORDS_MATRIX.filter(k => 
      k.keyword.toLowerCase().includes(q) || 
      k.cluster.toLowerCase().includes(q) || 
      k.targetPage.toLowerCase().includes(q)
    );
  }, [keywordFilter]);

  return (
    <section id="technical-faq" className="bg-slate-50/60 py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" /> AEO & Technical Resource Hub
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Engineering Answers & Technical Knowledge Base
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Verified engineering data, fuel consumption figures, and regulatory answers designed for 
            immediate citation by engineers, buyers, and AI search engines.
          </p>
        </div>

        {/* Top Control Bar: Category Filter & Tool Toggles */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 w-full md:w-auto scrollbar-none">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Tools Toggles */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowSeoMatrix(!showSeoMatrix)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                showSeoMatrix 
                  ? 'bg-blue-50 text-blue-700 border-blue-200 font-bold' 
                  : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>93-Keyword SEO Matrix</span>
            </button>

            <button
              onClick={() => setShowJsonLd(!showJsonLd)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                showJsonLd 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold' 
                  : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-emerald-600" />
              <span>Schema.org JSON-LD</span>
            </button>
          </div>

        </div>

        {/* Optional View: SEO Matrix Drawer */}
        {showSeoMatrix && (
          <div className="mb-10 p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Full 93-Keyword SEO & AEO Target Strategy Matrix
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Three-layer pyramid architecture: Core brand &rarr; Category words &rarr; Exact kW models &rarr; Regional ASEAN landing pages.
                </p>
              </div>
              <input
                type="text"
                placeholder="Filter keywords..."
                value={keywordFilter}
                onChange={(e) => setKeywordFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 w-56 focus:outline-blue-600"
              />
            </div>

            <div className="max-h-72 overflow-y-auto rounded-lg border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-slate-600 sticky top-0 font-mono text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Cluster</th>
                    <th className="py-2.5 px-3">Keyword Query</th>
                    <th className="py-2.5 px-3">Search Intent</th>
                    <th className="py-2.5 px-3">Target Page</th>
                    <th className="py-2.5 px-3">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                  {filteredKeywords.map((k, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="py-2 px-3 text-blue-600 font-semibold">{k.cluster}</td>
                      <td className="py-2 px-3 text-slate-900 font-medium">{k.keyword}</td>
                      <td className="py-2 px-3">{k.intent}</td>
                      <td className="py-2 px-3 text-slate-500">{k.targetPage}</td>
                      <td className="py-2 px-3">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          k.priority === 'High' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {k.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Optional View: Schema JSON-LD Inspector */}
        {showJsonLd && (
          <div className="mb-10 p-5 rounded-2xl bg-white border border-slate-200 space-y-3 font-mono text-xs shadow-sm">
            <div className="flex items-center justify-between text-slate-800 font-bold border-b border-slate-100 pb-2">
              <span>Structured Data Injection: Schema.org Organization (Entity Basis for AI citation)</span>
              <span className="text-[10px] text-emerald-600 font-bold">Validated JSON-LD</span>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 text-emerald-300 overflow-x-auto max-h-60 text-[11px] leading-relaxed">
              {JSON.stringify(SCHEMA_ORGANIZATION, null, 2)}
            </pre>
          </div>
        )}

        {/* Main AEO Accordion Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-${faq.id}`}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'bg-white border-blue-500 shadow-md shadow-blue-900/5'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Accordion Trigger Question */}
                <button
                  onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 shrink-0 mt-0.5 border border-blue-100">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-blue-600 uppercase tracking-wider block mb-1 font-semibold">
                        {faq.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Space_Grotesk'] leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Answer-First Content */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-4 text-xs">
                    
                    {/* Direct 40-60 word Answer-First Block */}
                    <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-slate-800 text-sm leading-relaxed font-medium">
                      <strong className="text-blue-700 block text-xs font-mono uppercase mb-1">
                        Direct Engineering Answer:
                      </strong>
                      {faq.shortAnswer}
                    </div>

                    {/* Evidentiary Points */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block font-mono">
                        Key Engineering Facts & Evidence:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                        {faq.keyPoints.map((point, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA and Inquiry Action */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <span className="text-slate-500 text-[11px]">
                        Need tailored load calculations or fuel budgeting for your project site?
                      </span>
                      <button
                        onClick={() => onOpenRfq(faq.relatedModelId)}
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                      >
                        Request Engineer Consultation &rarr;
                      </button>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
