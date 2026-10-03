"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  PhoneCall, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Eye, 
  Lock, 
  FileText, 
  Landmark,
  Scale 
} from "lucide-react";
import { PRODUCTS } from "@/lib/constants";
import { VoiceDemoPlayer } from "./voice-demo-player";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const UPCOMING_PRODUCTS = [
  {
    id: "lawsuit",
    name: "Vyom Lawsuit",
    category: "Legal AI",
    icon: Scale,
  },
  {
    id: "policylens",
    name: "Vyom PolicyLens",
    category: "Browser Intel",
    icon: Eye,
  },
  {
    id: "safebrowse",
    name: "Vyom SafeBrowse",
    category: "Browser Intel",
    icon: ShieldCheck,
  },
];


export function ProductsSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  const handleProductClick = (queryParam: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("product", queryParam);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const voiceProduct = PRODUCTS.find((p) => p.id === "voice-agent")!;
  const reconciliationProduct = PRODUCTS.find((p) => p.id === "reconciliation-ops")!;

  return (
    <section id="products" className="py-20 relative bg-slate-50/50 border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-sm border border-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Proprietary Autonomous Products</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950">
            Flagship Autonomous AI Products
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Enterprise conversational voice intelligence and multi-agent financial operations swarms.
          </p>
        </div>

        {/* Flagship Products Showcase */}
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5">
          {/* Premier Flagship Live Product Card: AI Voice Receptionist */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <SpotlightCard
              spotlightColor="rgba(14, 165, 233, 0.12)"
              className="rounded-2xl hover:border-sky-400/80 transition-all duration-300 relative overflow-hidden group shadow-md bg-white"
            >
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 z-20" />

              <div className="p-3.5 sm:p-5 pt-4 sm:pt-5 relative z-10">
                {/* Badge Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold tracking-wide uppercase bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {voiceProduct.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold tracking-wider">PRODUCT 01 &bull; LIVE DEPLOYMENT</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
                  {/* Left Column (7 cols): Info & Features */}
                  <div className="lg:col-span-7 space-y-2.5">
                    <div className="flex items-start gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                        <PhoneCall className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                          {voiceProduct.name}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-sky-700 font-medium mt-0.5">
                          {voiceProduct.tagline}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {voiceProduct.description}
                    </p>

                    {/* Key Highlights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
                      {voiceProduct.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700 bg-slate-50/80 p-1.5 rounded-lg border border-slate-200/60">
                          <div className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                          <span className="leading-snug text-[10.5px]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column (5 cols): Audio Player Widget & Action Panel */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-200/80">
                    <div>
                      <div className="flex items-center justify-between mb-2 text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                        <span>Interactive Voice Preview</span>
                        <span className="text-sky-600 font-semibold">Real-Time Audio</span>
                      </div>

                      {/* Interactive Audio Preview Widget */}
                      <div className="mb-2">
                        <VoiceDemoPlayer />
                      </div>

                      {/* Live Specs Grid */}
                      <div className="grid grid-cols-3 gap-1.5 text-center text-xs font-mono mb-2.5">
                        <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
                          <span className="text-slate-900 font-bold block text-xs">Real-Time</span>
                          <span className="text-[9px] text-slate-500">Audio Stream</span>
                        </div>
                        <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
                          <span className="text-slate-900 font-bold block text-xs">45+</span>
                          <span className="text-[9px] text-slate-500">Languages</span>
                        </div>
                        <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
                          <span className="text-slate-900 font-bold block text-xs">15+</span>
                          <span className="text-[9px] text-slate-500">Concurrent</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                      <button
                        onClick={() => handleProductClick(voiceProduct.queryParam)}
                        className="w-full py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all group-hover:shadow-glow cursor-pointer"
                      >
                        <span>{voiceProduct.primaryCta}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams.toString());
                          params.set("modal", "contact");
                          params.set("interest", "voice-agent");
                          router.push(`?${params.toString()}`, { scroll: false });
                        }}
                        className="w-full py-1 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-[10.5px] font-semibold flex items-center justify-center gap-1.5 border border-slate-300 transition-colors cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5 text-sky-600" />
                        <span>Schedule Live Voice Test Call</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Upcoming Flagship Product Card: Multi-Agent Reconciliation / Accounts Operations */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <SpotlightCard
              spotlightColor="rgba(99, 102, 241, 0.12)"
              className="rounded-2xl hover:border-indigo-400/80 transition-all duration-300 relative overflow-hidden group shadow-md bg-white"
            >
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 z-20" />

              <div className="p-3.5 sm:p-5 pt-4 sm:pt-5 relative z-10">
                {/* Badge Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold tracking-wide uppercase bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
                    <Clock className="w-3 h-3 text-amber-700" />
                    {reconciliationProduct.badge} &bull; PRIVATE BETA
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold tracking-wider">
                    PRODUCT 02 &bull; AUTONOMOUS RECONCILIATION SWARM
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
                  {/* Left Column (7 cols): Info, Modules Tabs & Task Breakdown */}
                  <div className="lg:col-span-7 space-y-2.5">
                    <div className="flex items-start gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                        <Landmark className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                          {reconciliationProduct.name}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-indigo-700 font-medium mt-0.5">
                          {reconciliationProduct.tagline}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {reconciliationProduct.description}
                    </p>

                    {/* 7 Operational Modules Tab Navigator */}
                    <div className="pt-0.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-slate-500">
                          7 Core Operational Pillars
                        </span>
                        <span className="text-[9.5px] font-mono text-indigo-600 font-semibold">
                          Click to view tasks
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-1.5">
                        {reconciliationProduct.modules?.map((mod, idx) => {
                          const isSelected = activeModuleIndex === idx;
                          return (
                            <button
                              key={mod.id}
                              onClick={() => setActiveModuleIndex(idx)}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-indigo-600 text-white shadow-2xs"
                                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              }`}
                            >
                              {mod.title.replace(/^\d+\.\s*/, "")}
                            </button>
                          );
                        })}
                      </div>

                      {/* Active Module Task Checklist Display */}
                      {reconciliationProduct.modules && reconciliationProduct.modules[activeModuleIndex] && (
                        <div className="p-2 rounded-lg bg-indigo-50/70 border border-indigo-200/80 space-y-1">
                          <div className="font-bold text-slate-900 text-[10.5px] flex items-center justify-between">
                            <span className="text-indigo-950 font-bold">
                              {reconciliationProduct.modules[activeModuleIndex].title}
                            </span>
                            <span className="text-[8.5px] font-mono px-1.5 py-0.2 rounded bg-indigo-200/70 text-indigo-800 font-semibold">
                              Automated + Review
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-0.5">
                            {reconciliationProduct.modules[activeModuleIndex].bullets.map((bullet, i) => (
                              <div key={i} className="flex items-start gap-1.5 text-[10px] text-slate-700 bg-white/90 p-1.5 rounded-md border border-indigo-100/90 shadow-2xs">
                                <div className="w-3 h-3 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                                  <Check className="w-2 h-2" />
                                </div>
                                <span className="leading-tight text-[10px]">{bullet}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column (5 cols): Multi-Agent Operational Flow & Action Panel */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-200/80">
                    <div>
                      <div className="flex items-center justify-between mb-1.5 text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                        <span>Human-in-the-Loop Safeguard</span>
                        <span className="text-indigo-600 font-semibold">Policy Guardrails</span>
                      </div>

                      {/* Swarm Loop Execution Preview */}
                      <div className="bg-slate-900 rounded-lg p-2.5 text-white border border-slate-800 space-y-1 mb-2 font-mono text-[10px] shadow-inner">
                        <div className="flex items-center justify-between text-[9px] pb-1 border-b border-slate-800">
                          <span className="text-amber-400 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            Swarm Loop Active
                          </span>
                          <span className="text-emerald-400 text-[8.5px]">Zero Hallucination</span>
                        </div>
                        <div className="space-y-0.5 text-[9.5px]">
                          <div className="flex items-center justify-between py-0.5 px-1 rounded bg-slate-800/70">
                            <span className="text-slate-300">Routine Matches</span>
                            <span className="text-emerald-400">AI Auto-Executes</span>
                          </div>
                          <div className="flex items-center justify-between py-0.5 px-1 rounded bg-slate-800/70">
                            <span className="text-slate-300">Uncertain / Discrepancy</span>
                            <span className="text-amber-300">Accountant Review</span>
                          </div>
                          <div className="flex items-center justify-between py-0.5 px-1 rounded bg-slate-800/70">
                            <span className="text-slate-300">Human Authority</span>
                            <span className="text-sky-300">Approve / Reject / Edit</span>
                          </div>
                          <div className="flex items-center justify-between py-0.5 px-1 rounded bg-slate-800/70">
                            <span className="text-slate-300">Month-End Balance</span>
                            <span className="text-purple-300">Trial Balance Balanced</span>
                          </div>
                        </div>
                      </div>

                      {/* Live Specs Grid */}
                      <div className="grid grid-cols-3 gap-1.5 text-center text-xs font-mono mb-2.5">
                        <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
                          <span className="text-slate-900 font-bold block text-xs">99.9%</span>
                          <span className="text-[9px] text-slate-500">Accuracy</span>
                        </div>
                        <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
                          <span className="text-slate-900 font-bold block text-xs">95%</span>
                          <span className="text-[9px] text-slate-500">Faster Close</span>
                        </div>
                        <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-2xs">
                          <span className="text-slate-900 font-bold block text-xs">80+ hrs</span>
                          <span className="text-[9px] text-slate-500">Saved/Mo</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                      <button
                        onClick={() => handleProductClick(reconciliationProduct.queryParam)}
                        className="w-full py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all group-hover:shadow-glow cursor-pointer"
                      >
                        <span>Request Priority Beta Access</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams.toString());
                          params.set("modal", "contact");
                          params.set("interest", "reconciliation-ops");
                          router.push(`?${params.toString()}`, { scroll: false });
                        }}
                        className="w-full py-1 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-[10.5px] font-semibold flex items-center justify-center gap-1.5 border border-slate-300 transition-colors cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Schedule Accounts Discovery Call</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* Upcoming Products Pipeline — Titles Marked as Upcoming with Grey Smoke Effect */}
        <div className="mt-14 pt-10 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5 border border-slate-200">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>R&D Pipeline</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                Upcoming Products
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Stealth Engineering &bull; In Active Development
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 max-w-4xl mx-auto">
            {UPCOMING_PRODUCTS.map((prod, index) => {
              const IconComp = prod.icon;
              return (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="rounded-2xl border border-slate-200/90 bg-white/90 p-3.5 shadow-2xs relative overflow-hidden flex flex-col justify-between group hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  {/* Top: Category Tag & Upcoming Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded-full text-[8.5px] font-mono font-bold uppercase tracking-wide bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        UPCOMING
                      </span>
                      <span className="text-[9.5px] font-mono font-bold text-slate-400">
                        {prod.category}
                      </span>
                    </div>

                    {/* Icon & Title ONLY */}
                    <div className="flex items-start gap-2.5 mt-1 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug pt-0.5">
                        {prod.name}
                      </h4>
                    </div>
                  </div>

                  {/* Lower Card: Shrouded with Grey Smoke Effect */}
                  <div className="relative h-20 rounded-xl overflow-hidden mt-2.5 border border-slate-200/70 bg-gradient-to-b from-slate-100/70 via-slate-200/60 to-slate-300/80 shadow-inner">
                    {/* Layer 1: Base Fog Mist Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-400/50 via-slate-300/30 to-transparent backdrop-blur-[6px]" />

                    {/* Layer 2: Drifting Atmospheric Smoke Waves */}
                    <motion.div
                      animate={{
                        x: ["-15%", "15%", "-15%"],
                        opacity: [0.6, 0.85, 0.6],
                      }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -inset-x-12 bottom-0 h-20 bg-gradient-to-t from-slate-500/40 via-slate-400/25 to-transparent blur-md pointer-events-none"
                    />

                    {/* Layer 3: Radial Smoke Cloud */}
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-700 via-slate-400 to-transparent pointer-events-none" />

                    {/* Layer 4: Shrouded Stealth Indicator in Center of Smoke */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center gap-1 text-center p-2">
                      <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/75 backdrop-blur-md border border-slate-300/90 shadow-2xs">
                        <Lock className="w-2.5 h-2.5 text-slate-600" />
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-700">
                          In Stealth Development
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500">
                        Architecture Sealed &bull; Waitlist Only
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

