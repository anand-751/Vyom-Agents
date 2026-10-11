"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight,
  PhoneCall,
  Sparkles,
  Star,
  Calendar,
  FileCheck,
  Building2,
  CheckCircle2,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

interface DomainUseCase {
  id: string;
  tabLabel: string;
  badge: string;
  headline: string;
  description: string;
  keyPoints: Array<{
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  taskStack: Array<{ label: string; highlight?: boolean; success?: boolean }>;
  quote: {
    text: string;
    author: string;
    role: string;
  };
  metricBadge: string;
}

const DOMAIN_USE_CASES: DomainUseCase[] = [
  {
    id: "hospitality",
    tabLabel: "Hotels & Hospitality",
    badge: "HOTELS & RESORTS",
    headline: "Autonomous front desk, mobile room service & guest booking.",
    description: "Eliminate busy phone lines at check-in, empower guests to request amenities from their phones, and turn departures into 5-star Google reviews.",
    keyPoints: [
      {
        title: "24/7 AI Phone Receptionist",
        description: "Greets callers in 45+ languages, quotes room availability, books reservations directly, and texts instant confirmation links.",
        icon: PhoneCall,
      },
      {
        title: "AI Concierge Self-Service App",
        description: "Enables guests to order room service, schedule housekeeping, and request late check-outs with zero wait times.",
        icon: Sparkles,
      },
      {
        title: "Automated WhatsApp Reviews",
        description: "Follows up with checked-out guests automatically to capture glowing 5-star reviews while routing issues directly to managers.",
        icon: Star,
      },
    ],
    taskStack: [
      { label: "• Inbound Call Answered" },
      { label: "• Room Reservation Booked" },
      { label: "• Room Service Dispatched", highlight: true },
      { label: "• 5-Star Google Review", success: true },
    ],
    quote: {
      text: "Our front desk is no longer overwhelmed during peak check-in hours. Guest inquiries are resolved instantly, and our Google rating jumped to 4.9 stars.",
      author: "Elena Rostova",
      role: "Operations Director, Grandview Hotel Group",
    },
    metricBadge: "35% More Direct Bookings · Zero Wait Times",
  },
  {
    id: "healthcare",
    tabLabel: "Healthcare & Clinics",
    badge: "CLINICS & PRACTICES",
    headline: "Zero dropped patient calls & automated appointment triage.",
    description: "Triage inbound calls 24/7, book patient slots onto doctor calendars without hold times, and slash costly appointment no-shows.",
    keyPoints: [
      {
        title: "24/7 Patient Call Intake",
        description: "Answers every inbound call immediately, triages appointment needs, and books slots onto doctor schedules in real time.",
        icon: PhoneCall,
      },
      {
        title: "Automated WhatsApp & SMS Reminders",
        description: "Sends automated reminder workflows and reschedule options that reduce costly clinic no-shows by more than 60%.",
        icon: Calendar,
      },
      {
        title: "Practice Reputation Engine",
        description: "Engages satisfied patients post-consultation to harvest 5-star Google reviews and cement local top-ranking visibility.",
        icon: Star,
      },
    ],
    taskStack: [
      { label: "• Patient Call Triaged" },
      { label: "• Doctor Slot Booked" },
      { label: "• WhatsApp Reminder Sent", highlight: true },
      { label: "• 5-Star Clinic Review", success: true },
    ],
    quote: {
      text: "Monday morning call spikes used to mean endless voicemails and frustrated patients. Vyom handles booking seamlessly before we even open our doors.",
      author: "Dr. Marcus Vance",
      role: "Managing Partner, Metro Dental & Wellness",
    },
    metricBadge: "60% Fewer No-Shows · 100% Call Coverage",
  },
  {
    id: "finance",
    tabLabel: "Finance & Accounting",
    badge: "FINANCE & BOOKKEEPING",
    headline: "Automated invoice matching, AP/AR & month-end ledger close.",
    description: "Eliminate manual bookkeeping mistakes. Automatically ingest vendor invoices, match bank feeds, and accelerate month-end close cycles.",
    keyPoints: [
      {
        title: "Automated AP/AR Ingestion",
        description: "Extracts line items from vendor invoices and receipts, verifies PO numbers, and logs records without human data entry.",
        icon: FileCheck,
      },
      {
        title: "Bank Feed Reconciliation",
        description: "Matches transactions against accounting ledgers continuously and flags discrepancies with audit-ready documentation.",
        icon: Building2,
      },
      {
        title: "Accelerated Month-End Close",
        description: "Replaces stressful 10-day bookkeeping marathons with deterministic, continuous reconciliation operating 24/7.",
        icon: CheckCircle2,
      },
    ],
    taskStack: [
      { label: "• Vendor Invoices Ingested" },
      { label: "• Bank Feed Line Matched" },
      { label: "• Discrepancy Flagged", highlight: true },
      { label: "• Audit Trail Generated", success: true },
    ],
    quote: {
      text: "What took our finance team 25 hours every week is now reconciled and balanced before our morning coffee. Clean ledgers with zero human error.",
      author: "Sarah Jenkins",
      role: "VP of Finance, ScaleOps Logistics",
    },
    metricBadge: "90% Faster Close · 100% Audit Precision",
  },
  {
    id: "dealerships",
    tabLabel: "Auto & Real Estate",
    badge: "DEALERSHIPS & BROKERAGES",
    headline: "24/7 buyer inquiries, test-drive booking & lead nurture.",
    description: "Turn evening and weekend shoppers into booked test drives and verified client showings with sub-second response times.",
    keyPoints: [
      {
        title: "After-Hours Inbound Voice Agent",
        description: "Answers buyer calls around the clock, quotes inventory details, and schedules test drives directly on sales reps' calendars.",
        icon: PhoneCall,
      },
      {
        title: "Instant WhatsApp Inventory Match",
        description: "Automatically texts interested shoppers vehicle specs, pricing, and video walkthroughs within 30 seconds of an inquiry.",
        icon: MessageSquare,
      },
      {
        title: "Verified Buyer Review Collection",
        description: "Converts happy drive-off buyers into glowing Google reviews that build local dealership trust and outrank competitors.",
        icon: Star,
      },
    ],
    taskStack: [
      { label: "• After-Hours Call Captured" },
      { label: "• Inventory Brochure Sent" },
      { label: "• Test Drive Scheduled", highlight: true },
      { label: "• Verified Buyer Review", success: true },
    ],
    quote: {
      text: "We booked 28 test drives last month from calls that came in after 8:00 PM while the showroom was closed. Pure incremental revenue.",
      author: "Raj Patel",
      role: "General Sales Manager, Premier Auto Group",
    },
    metricBadge: "28+ After-Hours Leads/Mo · 30s Speed-to-Lead",
  },
];

export function UseCasesSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTabId, setActiveTabId] = useState<string>("hospitality");

  const activeUseCase = DOMAIN_USE_CASES.find((d) => d.id === activeTabId) || DOMAIN_USE_CASES[0];

  const openContactModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "contact");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section id="use-cases" className="py-4 sm:py-6 lg:py-8 bg-white text-slate-900 border-t border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-3 sm:mb-4">
          <span className="text-[10px] font-mono font-bold tracking-widest text-orange-600 uppercase block mb-0.5">
            — INDUSTRY DOMAINS WE SERVE
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-950 leading-tight">
            Engineered for real businesses.{" "}
            <span className="text-orange-600">Delivering measurable ROI.</span>
          </h2>
        </div>

        {/* Domain Switcher Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-3.5 sm:mb-4 no-scrollbar">
          {DOMAIN_USE_CASES.map((domain) => (
            <button
              key={domain.id}
              onClick={() => setActiveTabId(domain.id)}
              className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTabId === domain.id
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-950 border border-stone-200/80 hover:border-stone-300"
              }`}
            >
              {domain.tabLabel}
            </button>
          ))}
        </div>

        {/* Interactive Domain Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          
          {/* Left Column: Domain Key Points & Value Drivers */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeUseCase.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                {/* Domain Headline */}
                <h3 className="text-base sm:text-lg font-bold text-slate-950 leading-snug mb-3">
                  {activeUseCase.headline}
                </h3>

                {/* 3 Domain Capabilities */}
                <div className="space-y-1.5 sm:space-y-2 mb-4 w-full">
                  {activeUseCase.keyPoints.map((point, idx) => {
                    const IconComp = point.icon;
                    return (
                      <div key={idx} className="flex items-start gap-2.5 p-2 sm:p-2.5 rounded-xl bg-stone-50 border border-stone-200/70 hover:border-orange-300 transition-colors">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          <IconComp className="w-3.5 h-3.5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="text-[11.5px] sm:text-xs font-bold text-slate-900 leading-tight">
                            {point.title}
                          </h4>
                          <p className="text-[10.5px] sm:text-[11px] text-slate-600 mt-0.5 leading-snug">
                            {point.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <button
                  onClick={openContactModal}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs transition-all active:scale-[0.98] shadow-sm group"
                >
                  <span>Deploy for Your Business</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Visual Card with Exact Image from Mockup + Domain Overlays */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/90 h-[270px] sm:h-[300px] lg:h-[320px] w-full">
              
              {/* Background Image — Preserved Exact Original Image */}
              <Image
                src="/images/usecase_developer.jpg"
                alt="Business professional orchestrating AI agents on laptop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />

              {/* Gradient overlay for text clarity */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

              {/* Dynamic Domain Task Stack floating on laptop screen */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeUseCase.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-4 sm:top-5 left-4 sm:left-5 p-2.5 sm:p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-[9.5px] sm:text-[10px] space-y-1 shadow-xl max-w-[185px]"
                >
                  <div className="text-[8.5px] font-bold uppercase tracking-wider text-stone-400 mb-0.5 border-b border-white/10 pb-0.5">
                    Live Agent Telemetry
                  </div>
                  {activeUseCase.taskStack.map((task, idx) => (
                    <div
                      key={idx}
                      className={
                        task.success
                          ? "text-emerald-400 font-bold"
                          : task.highlight
                          ? "text-orange-400 font-bold"
                          : "text-stone-300"
                      }
                    >
                      {task.label}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Domain Testimonial Bubble at bottom */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeUseCase.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 sm:p-3 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-md"
                >
                  <p className="text-[11px] sm:text-[11.5px] font-medium text-slate-900 italic leading-snug">
                    &ldquo;{activeUseCase.quote.text}&rdquo;
                  </p>
                  <div className="text-[9.5px] text-slate-500 font-mono mt-1 flex items-center justify-between">
                    <span className="font-semibold text-slate-700">
                      — {activeUseCase.quote.author}
                    </span>
                    <span className="text-stone-400 truncate max-w-[150px]">
                      {activeUseCase.quote.role}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
