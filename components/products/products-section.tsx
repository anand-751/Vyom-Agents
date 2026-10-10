"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ArrowRight, 
  Bot, 
  Workflow, 
  Network, 
  ArrowLeftRight, 
  Layers, 
  Globe, 
  Search, 
  Star, 
  TrendingUp 
} from "lucide-react";
import { SERVICES } from "@/lib/constants";

export function ProductsSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>("All Products");

  const categories = [
    "All Products",
    "Services"
  ];

  const handleProductClick = (queryParam: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "contact");
    params.set("product", queryParam);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleServiceClick = (queryParam: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", queryParam);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const frontlineProducts = [
    {
      id: "voice-receptionist",
      name: "AI Receptionist (AI Voice Agent)",
      category: "Voice AI",
      tagline: "Never miss a customer call again with 24/7 natural voice intake.",
      description: "Answers every incoming customer call 24/7 with a warm, natural human voice. Takes appointments directly into your calendar, answers questions, and logs customer details automatically so you never lose a client to voicemail.",
      tags: ["24/7 Call Intake", "Instant Booking", "45+ Languages"],
      imageSrc: "/images/ai_receptionist_agent.jpg",
      queryParam: "voice-agent"
    },
    {
      id: "concierge-app",
      name: "AI Concierge App",
      category: "Client Concierge",
      tagline: "Instant 24/7 digital assistant for your guests and clients.",
      description: "A friendly digital assistant right on your guests' phones. Handles room service, bookings, and instant requests 24/7—freeing up your front desk staff while delivering a VIP customer experience.",
      tags: ["Guest Self-Service", "Zero Wait Times", "Mobile & Web"],
      imageSrc: "/images/ai_concierge_app.jpg",
      queryParam: "concierge-app"
    },
    {
      id: "accounting-reconciliation",
      name: "Accounting Operations & Reconciliation Agent",
      category: "Financial Ops",
      tagline: "Automate your invoice matching and bank reconciliations.",
      description: "Automatically matches your bank statements with incoming invoices, tracks customer payments, and balances your ledgers. Saves dozens of hours each week and catches costly billing mistakes before month-end.",
      tags: ["Auto-Reconciliation", "Invoice Matching", "Zero Errors"],
      imageSrc: "/images/accounting_reconciliation_agent.jpg",
      queryParam: "reconciliation-ops"
    }
  ];

  const SERVICE_ICONS: Record<string, React.ReactNode> = {
    "rpa-automation": <Workflow className="w-4 h-4" />,
    "multiagent-systems": <Network className="w-4 h-4" />,
    "agent-to-agent": <ArrowLeftRight className="w-4 h-4" />,
    "crm-erp": <Layers className="w-4 h-4" />,
    "websites": <Globe className="w-4 h-4" />,
    "aieo": <Search className="w-4 h-4" />,
    "reputation": <Star className="w-4 h-4" />,
  };

  return (
    <section id="products" className="py-16 sm:py-20 bg-[#F9F9F8] text-slate-900 border-t border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono font-bold tracking-widest text-orange-600 uppercase block mb-2">
              — OUR OFFERINGS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 leading-tight">
              Powerful Agents for{" "}
              <span className="text-orange-600">Real Work.</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeCategory === "All Products"
                ? "Enterprise Agentic AI SaaS products engineered to handle frontline voice reception, digital concierge intake, and financial operations."
                : "Bespoke engineering services—from self-healing RPA to multiagent swarms, custom CRM/ERP platforms, and search engine visibility."}
            </p>
          </div>
        </div>

        {/* Tab Filter Pills: All Products & Services with Clear Spacing */}
        <div className="flex items-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap active:scale-[0.98] ${
                activeCategory === cat
                  ? "bg-slate-950 text-white shadow-sm ring-1 ring-slate-950"
                  : "bg-white text-slate-600 hover:text-slate-950 border border-stone-200/90 hover:border-stone-300 shadow-2xs"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 1. All Products Tab Content: 3 Frontline Product Cards */}
        {activeCategory === "All Products" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {frontlineProducts.map((card) => (
              <div
                key={card.id}
                className="flex flex-col justify-between rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-sm hover:border-stone-300 transition-all overflow-hidden group"
              >
                <div>
                  {/* Full Visible Image Header */}
                  <div className="relative w-full aspect-[16/11] bg-stone-900/5 overflow-hidden border-b border-stone-100">
                    <Image
                      src={card.imageSrc}
                      alt={card.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-600 block mb-1">
                      {card.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-950 mb-1.5 group-hover:text-orange-600 transition-colors">
                      {card.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Tags & Action Arrow */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-stone-100 mt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium text-slate-600 px-2.5 py-0.5 rounded-full bg-stone-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleProductClick(card.queryParam)}
                    className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-slate-700 group-hover:border-slate-950 group-hover:bg-slate-950 group-hover:text-white transition-all shrink-0 ml-2"
                    aria-label={`Open details for ${card.name}`}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Services Tab Content: Compact Cards with Signature Orange & Black Theme */}
        {activeCategory === "Services" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.queryParam)}
                className="flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-xs hover:border-orange-500/40 transition-all cursor-pointer group"
              >
                <div>
                  {/* Top Header: Black/Orange Icon + SERVICE 0X Badge */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center text-orange-400 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600 transition-colors shrink-0 shadow-2xs">
                      {SERVICE_ICONS[service.id] || <Bot className="w-4 h-4" />}
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500 bg-stone-100 group-hover:bg-orange-50 group-hover:text-orange-700 px-2.5 py-0.5 rounded-full transition-colors">
                      SERVICE {service.shortCode}
                    </span>
                  </div>

                  {/* Category in Signature Orange */}
                  <span className="text-[10px] font-mono font-bold tracking-wider text-orange-600 uppercase block mb-1">
                    {service.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-slate-950 mb-1 leading-snug group-hover:text-orange-600 transition-colors line-clamp-1">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] text-slate-600 leading-relaxed mb-3 line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Footer: Metric + Scope Action Link */}
                <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between mt-auto gap-2">
                  <div className="flex items-center gap-1.5 text-[10.5px] font-semibold text-emerald-600 truncate min-w-0">
                    <TrendingUp className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">{service.roiMetric}</span>
                  </div>

                  <div className="text-[11px] font-bold text-slate-950 group-hover:text-orange-600 flex items-center gap-1 transition-colors shrink-0">
                    <span>Scope</span>
                    <ArrowRight className="w-3 h-3 text-slate-700 group-hover:text-orange-600 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
