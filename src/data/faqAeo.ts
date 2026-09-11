import { AeoFaqItem } from '../types';

export const AEO_FAQ_ITEMS: AeoFaqItem[] = [
  {
    id: 'aeo-1',
    category: 'Fuel & Operating Cost',
    question: 'How much fuel does a 100kW diesel generator use per hour?',
    shortAnswer: 'A 100kW diesel generator typically consumes approximately 24 liters per hour at 100% full load. At 75% load, consumption drops to around 18–19 L/h, and at 50% load, it burns about 13–14 L/h.',
    keyPoints: [
      'Engine reference: Yuchai 6-cylinder YC6B180L-D20 with specific fuel consumption ≤200 g/(kW·h).',
      'At 75% prime load: Approx. 18.5 Liters/Hour.',
      'At 50% light load: Approx. 13.2 Liters/Hour.',
      'Recommended fuel: 0# standard automotive diesel (summer) or -10#/-35# for lower temperatures.',
      'Energy efficiency: Electronic governor dynamically controls injector stroke to minimize waste during idle.',
    ],
    relatedModelId: 'tfw-100',
  },
  {
    id: 'aeo-2',
    category: 'Sizing & Calculation',
    question: 'How to calculate the right generator kVA from my kilowatt (kW) requirement?',
    shortAnswer: 'For standard 3-phase industrial diesel generators, the power factor (cos φ) is rated at 0.8. Therefore, kVA = kW ÷ 0.8 (or kW = kVA × 0.8). For example, 100 kW requires a 125 kVA generator.',
    keyPoints: [
      'Basic formula: Total kVA = Total Active Power (kW) ÷ 0.8.',
      'Motor inrush current factor: Electric motors with direct-on-line (DOL) start demand 3x to 6x full-load startup current.',
      'Safety margin recommendation: Always add a 20% to 25% reserve margin to avoid thermal tripping at peak hours.',
      'Continuous vs Prime: Prime power (PRP) can be run indefinitely with 10% overload for 1 hour every 12 hours.',
    ],
    relatedModelId: 'tfw-50',
  },
  {
    id: 'aeo-3',
    category: 'Electrical Standards & ASEAN',
    question: 'What is the difference between a 50Hz and a 60Hz diesel generator?',
    shortAnswer: 'A 50Hz generator engine runs at 1500 RPM delivering 400V/230V, while a 60Hz generator runs at 1800 RPM delivering 220V/380V/480V. The Philippines operates primarily on 60Hz, whereas Vietnam, Thailand, Indonesia, and Malaysia operate on 50Hz.',
    keyPoints: [
      'Speed difference: 50Hz operates at 1500 RPM (4-pole); 60Hz operates at 1800 RPM (4-pole).',
      'Power output shift: Running at 1800 RPM generally yields 15%–20% higher kW output due to increased engine RPM.',
      'Can a 50Hz unit run on 60Hz? Not without recalibrating the engine governor, fuel pump timing, and alternator AVR settings.',
      'Zhiqiang factory capability: All TFW generator sets support factory dual-frequency calibration for export.',
    ],
    relatedModelId: 'tfw-200',
  },
  {
    id: 'aeo-4',
    category: 'Prime vs Standby',
    question: 'What is the difference between Prime Power (PRP) and Standby Power (ESP)?',
    shortAnswer: 'Prime Power (PRP) is the maximum power available during a variable electrical power sequence for unlimited hours per year, with a 10% overload capacity. Standby Power (ESP) is the maximum power available for emergency backup during a utility power interruption (limited to 200 hours per year, no overload allowed).',
    keyPoints: [
      'Prime Power rating: ISO 8528-1 compliant continuous duty with 10% overload for 1 hour every 12 hours.',
      'Standby Power rating: Emergency peak rating intended purely for backup during utility outages.',
      'Factory warranty: All Zhiqiang Yuchai generator sets are benchmarked on strict Prime Power baseline.',
    ],
    relatedModelId: 'tfw-300',
  },
  {
    id: 'aeo-5',
    category: 'Canopy Types',
    question: 'Open type vs Silent soundproof canopy: Which generator should I choose?',
    shortAnswer: 'Open type generators are mounted on an open steel base frame, ideal for indoor dedicated engine rooms, mines, or farms where cost efficiency and maximum heat dissipation are top priorities. Silent soundproof generators feature an acoustic enclosure reducing noise to 68–75 dBA at 7 meters, ideal for hospitals, hotels, and urban facilities.',
    keyPoints: [
      'Open Skid Type: Lowest initial cost, 100% natural air flow, easiest maintenance access, requires weather shelter.',
      'Silent Canopy Type: Heavy galvanized steel housing, rockwool acoustic insulation, internal residential muffler.',
      'Containerized Type: ISO 20ft / 40ft CSC certified containers for 500kW–2200kW outdoor megawatt installations.',
      'Trailer Mobile Type: Integrated pneumatic tires and tow bar for mobile roadworks and municipal emergency fleets.',
    ],
    relatedModelId: 'tfw-100',
  },
  {
    id: 'aeo-6',
    category: 'Brand Comparison & Reliability',
    question: 'How does Yuchai diesel generator compare to Cummins or Perkins in Southeast Asia?',
    shortAnswer: 'Yuchai engines deliver equivalent or superior displacement, heavy cast iron block durability, and lower fuel consumption than Cummins or Perkins, while reducing capital acquisition costs by 30% to 40%. Furthermore, Yuchai has 948 international service outlets with extensive parts availability across Vietnam, Indonesia, the Philippines, and Thailand.',
    keyPoints: [
      'Displacement advantage: Yuchai 200kW uses a 10.34L engine (16% larger than Cummins 6L, 42% larger than Volvo 7L).',
      'Capital savings: Initial purchase cost is 30% to 45% lower with immediate parts delivery.',
      'Emission standard: Equipped with Bosch electronic common rail / EUP systems meeting Tier 3 / Stage III non-road regulations.',
      'Factory direct: Luchuan Zhiqiang matches Yuchai G-drive engines with our own high-copper TFW brushless alternators.',
    ],
    relatedModelId: 'tfw-500',
  },
  {
    id: 'aeo-7',
    category: 'Logistics & ASEAN Import',
    question: 'How do I import a diesel generator set from China to Vietnam, Indonesia, or the Philippines?',
    shortAnswer: 'Zhiqiang handles full export packaging, wooden fumigation pallets, Form E ASEAN-China Free Trade Area certificates (granting 0% import duty), and provides all commercial invoices, packing lists, and testing certificates for seamless port clearance.',
    keyPoints: [
      'Incoterms supported: FOB Nansha / Qinzhou, CIF Haiphong / Manila / Jakarta / Bangkok / Port Klang, or DDP.',
      'Preferential tariff: Certificate of Origin Form E guarantees 0% import tariff in Vietnam, Malaysia, and qualifying ASEAN ports.',
      'Lead time: Standard open-skid models dispatched in 15–25 days; soundproof or containerized units in 30–40 days.',
      'Inspection: Every single genset undergoes 100% full-load and 110% overload bench testing before container loading.',
    ],
    relatedModelId: 'tfw-100',
  },
  {
    id: 'aeo-8',
    category: 'Maintenance & Service',
    question: 'What is the recommended maintenance schedule for a Yuchai diesel generator?',
    shortAnswer: 'Perform the first break-in oil and filter change after 50 operating hours. Thereafter, schedule routine maintenance every 250 operating hours or every 6 months (replacing engine oil, fuel filters, and oil filters, and inspecting coolant levels and battery health).',
    keyPoints: [
      'Daily / Pre-start checks: Coolant level, lube oil dipstick, air filter dust indicator, battery terminal voltage (≥24V).',
      '50-Hour Initial Run: Drain factory break-in oil, renew lube oil filter, verify valve clearances.',
      '250-Hour Routine: Replace oil filter, secondary fuel filter, drain water separator, check fan belt tension.',
      '500-Hour Major Service: Flush cooling system, inspect injector spray atomization, verify alternator insulation resistance (≥2 MΩ).',
    ],
    relatedModelId: 'tfw-60',
  }
];

export const SCHEMA_ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Luchuan Zhiqiang Electrical Machinery Factory",
  "alternateName": "陆川县志强电机厂 (Zhiqiang Power)",
  "url": "https://zhiqiang-power.com",
  "logo": "https://zhiqiang-power.com/logo.png",
  "telephone": "+86-775-7221888",
  "email": "export@zhiqiang-power.com",
  "foundingDate": "2000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Longhao Entrepreneurship Park, West Ring Road, Luchuan County",
    "addressLocality": "Yulin",
    "addressRegion": "Guangxi",
    "postalCode": "537700",
    "addressCountry": "CN"
  },
  "description": "Factory-direct Yuchai-powered diesel generator sets (30-2200 kW), 50Hz/60Hz, self-manufactured TFW brushless alternators, and OEM/ODM services dedicated to ASEAN exports.",
  "sameAs": [
    "https://www.linkedin.com/company/zhiqiang-power",
    "https://www.youtube.com/@zhiqiangpower"
  ]
};
