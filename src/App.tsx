import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MetricsBar } from './components/MetricsBar';
import { InteractiveSizer } from './components/InteractiveSizer';
import { ProductCatalog } from './components/ProductCatalog';
import { EnginesSection } from './components/EnginesSection';
import { AlternatorsSection } from './components/AlternatorsSection';
import { PartsAndServiceSection } from './components/PartsAndServiceSection';
import { AseanComplianceHub } from './components/AseanComplianceHub';
import { ApplicationsSection } from './components/ApplicationsSection';
import { FactoryTrustSection } from './components/FactoryTrustSection';
import { AeoKnowledgeBase } from './components/AeoKnowledgeBase';
import { ProductConfigurator } from './components/ProductConfigurator';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ModelComparisonModal } from './components/ModelComparisonModal';
import { TechnicalDatasheetModal } from './components/TechnicalDatasheetModal';
import { RfqModal } from './components/RfqModal';
import { Footer } from './components/Footer';
import { GensetProduct } from './types';
import { GENSET_PRODUCTS } from './data/gensets';
import { MessageSquare, FileText, ChevronUp, ChevronDown } from 'lucide-react';
import { BUSINESS } from './data/site';

export default function App() {
  const [activePowerFilter, setActivePowerFilter] = useState('30-80');
  const [selectedCountryId, setSelectedCountryId] = useState('vietnam');
  
  // Comparison state (Perkins-style side-by-side engine comparator)
  const [comparisonList, setComparisonList] = useState<GensetProduct[]>([
    GENSET_PRODUCTS[1], // 50kW
    GENSET_PRODUCTS[3], // 150kW
  ]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  // Technical Datasheet state (Perkins-grade printable PDF datasheet)
  const [selectedProductForDatasheet, setSelectedProductForDatasheet] = useState<GensetProduct | null>(null);

  // Modal states
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqPreselectedModel, setRfqPreselectedModel] = useState<string | undefined>(undefined);
  const [rfqInitialKw, setRfqInitialKw] = useState<number | undefined>(undefined);
  const [rfqInitialFreq, setRfqInitialFreq] = useState<string | undefined>(undefined);
  const [rfqInitialCanopy, setRfqInitialCanopy] = useState<string | undefined>(undefined);

  const [selectedProductForSpecs, setSelectedProductForSpecs] = useState<GensetProduct | null>(null);

  // Open RFQ modal with optional prefill
  const handleOpenRfq = (modelId?: string) => {
    setRfqPreselectedModel(modelId || 'tfw-100');
    setRfqInitialKw(undefined);
    setRfqInitialFreq(undefined);
    setRfqInitialCanopy(undefined);
    setRfqModalOpen(true);
  };

  const handleOpenRfqWithData = (modelId: string, kw: number, freq: string, canopy: string) => {
    setRfqPreselectedModel(modelId);
    setRfqInitialKw(kw);
    setRfqInitialFreq(freq);
    setRfqInitialCanopy(canopy);
    setRfqModalOpen(true);
  };

  const handleViewSpecs = (product: GensetProduct) => {
    setSelectedProductForSpecs(product);
  };

  const handleOpenDatasheet = (product: GensetProduct) => {
    setSelectedProductForDatasheet(product);
  };

  const handleToggleCompare = (product: GensetProduct) => {
    setComparisonList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        // Replace the last one or keep max 3
        return [...prev.slice(1), product];
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromCompare = (modelId: string) => {
    setComparisonList((prev) => prev.filter((p) => p.id !== modelId));
  };

  const handleAddToCompare = (product: GensetProduct) => {
    setComparisonList((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      if (prev.length >= 3) return [...prev.slice(1), product];
      return [...prev, product];
    });
  };

  const handleNavigateTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] w-full max-w-full overflow-x-hidden">
      
      {/* Top Navigation — every menu item navigates to a real page */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenRfq={handleOpenRfq}
          onNavigateTo={handleNavigateTo}
          onFilterPowerRange={(range) => {
            setActivePowerFilter(range);
            handleNavigateTo('products');
          }}
        />

        {/* 2. Core Metrics Strip */}
        <MetricsBar />

        {/* 3. Interactive Sizing & Fuel Calculator */}
        <InteractiveSizer
          onOpenRfqWithData={handleOpenRfqWithData}
          onViewSpecs={handleViewSpecs}
        />

        {/* 4. Product Catalog (30-2200kW) with Perkins Series Benchmarks */}
        <ProductCatalog
          onOpenRfq={handleOpenRfq}
          onViewSpecs={handleViewSpecs}
          onOpenDatasheet={handleOpenDatasheet}
          comparisonList={comparisonList}
          onToggleCompare={handleToggleCompare}
          onOpenComparisonModal={() => setIsComparisonModalOpen(true)}
          activePowerFilter={activePowerFilter}
          setActivePowerFilter={setActivePowerFilter}
          featured={true}
        />

        {/* 5. Yuchai Engine Series */}
        <EnginesSection onOpenRfq={handleOpenRfq} />

        {/* 6. In-House Alternators (TFW Brushless & STC) */}
        <AlternatorsSection onOpenRfq={handleOpenRfq} />

        {/* 7. Product Configurator — Build Your Custom Genset */}
        <ProductConfigurator onOpenRfq={handleOpenRfq} />

        {/* 8. Perkins-Style Parts & Service Lifecycle Center */}
        <PartsAndServiceSection onOpenRfq={handleOpenRfq} />

        {/* 9. ASEAN Compliance Hub */}
        <AseanComplianceHub
          selectedCountryId={selectedCountryId}
          onSelectCountry={setSelectedCountryId}
          onOpenRfq={handleOpenRfq}
        />

        {/* 10. Severe Applications */}
        <ApplicationsSection
          onOpenRfq={handleOpenRfq}
          onFilterPowerRange={(range) => {
            setActivePowerFilter(range);
            handleNavigateTo('products');
          }}
        />

        {/* 11. Factory Quality & Load Bank Testing */}
        <FactoryTrustSection onOpenRfq={() => handleOpenRfq()} />

        {/* 12. AEO Answer-First Knowledge Base */}
        <AeoKnowledgeBase onOpenRfq={handleOpenRfq} />
      </main>

      {/* Footer */}
      <Footer
        onOpenRfq={() => handleOpenRfq()}
        onNavigateTo={handleNavigateTo}
        onSelectCountry={(countryId) => {
          setSelectedCountryId(countryId);
          handleNavigateTo('asean-hub');
        }}
      />

      {/* WhatsApp & RFQ Dock — inline at bottom of main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-end gap-3">
        <a
          href={`https://wa.me/${BUSINESS.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Direct WhatsApp with Chief Engineer"
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg hover:scale-105 transition-all text-xs font-bold"
        >
          <MessageSquare className="w-4 h-4 shrink-0" />
          <span className="text-[11px]">WhatsApp Engineer</span>
        </a>

        <button
          onClick={() => handleOpenRfq()}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 hover:scale-105 transition-all text-xs font-bold cursor-pointer border border-blue-500/50"
        >
          <FileText className="w-4 h-4 shrink-0" />
          <span className="text-[11px]">Get Instant Quote</span>
        </button>
      </div>

      {/* Floating one-screen Up / Down navigation buttons */}
      <div className="fixed bottom-5 right-3 z-40 flex flex-col gap-2">
        <button
          onClick={() => window.scrollBy({ top: -window.innerHeight * 0.85, behavior: 'smooth' })}
          title="Scroll up one screen"
          aria-label="Scroll up"
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-lg backdrop-blur transition-colors hover:border-blue-300 hover:text-blue-600 cursor-pointer"
        >
          <ChevronUp className="w-4.5 h-4.5" />
        </button>
        <button
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
          title="Scroll down one screen"
          aria-label="Scroll down"
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-lg backdrop-blur transition-colors hover:border-blue-300 hover:text-blue-600 cursor-pointer"
        >
          <ChevronDown className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* 7-Module Product Technical Specification Modal */}
      <ProductDetailModal
        product={selectedProductForSpecs}
        onClose={() => setSelectedProductForSpecs(null)}
        onOpenRfq={(modelId) => handleOpenRfq(modelId)}
        onOpenDatasheet={handleOpenDatasheet}
      />

      {/* Perkins-Style Side-by-Side Model Comparator Modal */}
      <ModelComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        selectedModels={comparisonList}
        onRemoveModel={handleRemoveFromCompare}
        onAddModel={handleAddToCompare}
        onOpenRfq={(modelId) => handleOpenRfq(modelId)}
        onViewSpecs={(product) => setSelectedProductForSpecs(product)}
      />

      {/* Perkins-Grade Printable Technical Specification Sheet (PDF) */}
      <TechnicalDatasheetModal
        product={selectedProductForDatasheet}
        onClose={() => setSelectedProductForDatasheet(null)}
        onOpenRfq={(modelId) => handleOpenRfq(modelId)}
      />

      {/* Official B2B Request For Quotation (RFQ) Modal */}
      <RfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        preselectedModelId={rfqPreselectedModel}
        initialKw={rfqInitialKw}
        initialFreq={rfqInitialFreq}
        initialCanopy={rfqInitialCanopy}
      />

    </div>
  );
}
