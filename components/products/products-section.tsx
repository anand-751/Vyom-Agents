"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  PhoneCall, 
  Workflow, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Globe2, 
  Calendar, 
  Database,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Eye,
  Lock,
  FileText,
  Landmark
} from "lucide-react";
import { PRODUCTS } from "@/lib/constants";
import { VoiceDemoPlayer } from "./voice-demo-player";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const UPCOMING_PRODUCTS = [
  {
    id: "finance-agent",
    name: "Vyom Finance Agent",
    category: "Accounts Payable",
    icon: FileText,
  },
  {
    id: "finance-workforce",
    name: "Vyom Finance Workforce",
    category: "Finance AI",
    icon: Landmark,
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

  const handleProductClick = (queryParam: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("product", queryParam);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const voiceProduct = PRODUCTS.find((p) => p.id === "voice-agent")!;
  const orchestratorProduct = PRODUCTS.find((p) => p.id === "orchestrator")!;

  return (
    <section id="products" className="py-24 relative bg-slate-50/50 border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm border border-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Proprietary Autonomous Products</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950">
            Flagship Autonomous AI Products
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Engineered with ultra-low latency voice models, Playwright vision self-healing engines, and embedded compliance audit agents.
          </p>
        </div>

        {/* 2-Card Flagship Grid with Vengeance UI Spotlight Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: AI Receptionist Inbound & Outbound Voice Agent */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard
              spotlightColor="rgba(14, 165, 233, 0.12)"
              className="rounded-3xl hover:border-sky-400/80 transition-all duration-300 relative overflow-hidden group shadow-md bg-white h-full"
            >
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 z-20" />

              <div className="p-5 sm:p-6 pt-6 sm:pt-7 flex flex-col justify-between h-full relative z-10">
                <div>
                  {/* Badge Header Row */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {voiceProduct.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-semibold">PRODUCT 01</span>
                  </div>

                  {/* Icon & Title Row */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      {voiceProduct.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {voiceProduct.description}
                  </p>

                  {/* Interactive Audio Preview Widget */}
                  <div className="mb-4">
                    <VoiceDemoPlayer />
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-2 mb-6">
                    {voiceProduct.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions & Metrics */}
                <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-mono w-full sm:w-auto justify-between sm:justify-start">
                    <div>
                      <span className="text-slate-900 font-bold block text-xs sm:text-sm">320ms</span>
                      <span className="text-[10px]">Latency</span>
                    </div>
                    <div className="h-5 w-[1px] bg-slate-200" />
                    <div>
                      <span className="text-slate-900 font-bold block text-xs sm:text-sm">45+</span>
                      <span className="text-[10px]">Languages</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleProductClick(voiceProduct.queryParam)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all group-hover:shadow-glow"
                  >
                    <span>{voiceProduct.primaryCta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 2: Self-Healing RPA Engine & Multi-Agent UI Automation */}
          <motion.div
            id="upcoming"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <SpotlightCard
              spotlightColor="rgba(168, 85, 247, 0.12)"
              className="rounded-3xl hover:border-purple-400/80 transition-all duration-300 relative overflow-hidden group shadow-md bg-white h-full"
            >
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 z-20" />

              <div className="p-5 sm:p-6 pt-6 sm:pt-7 flex flex-col justify-between h-full relative z-10">
                <div>
                  {/* Badge Header Row */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-purple-100 text-purple-900 border border-purple-300">
                      <Clock className="w-3 h-3 text-purple-700" />
                      {orchestratorProduct.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-semibold">PRODUCT 02</span>
                  </div>

                  {/* Icon & Title Row */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                      <Workflow className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      {orchestratorProduct.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {orchestratorProduct.description}
                  </p>

                  {/* Visual Self-Healing Architecture Diagram */}
                  <div className="bg-slate-950 rounded-xl p-3 text-white border border-slate-800 shadow-md mb-4 space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[11px]">
                      <span className="font-mono text-purple-400 font-bold flex items-center gap-1.5">
                        <Eye className="w-3 h-3 text-purple-400" />
                        Playwright + Vision Fallback Architecture
                      </span>
                      <span className="text-[9px] bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-800 font-mono font-bold">
                        Beats Traditional RPA
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono">
                      <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <span className="text-sky-400 block font-bold mb-0.5">01. Playwright</span>
                        <span className="text-slate-400 text-[9px]">GUI Automation</span>
                      </div>
                      <div className="bg-purple-950/80 p-2 rounded-lg border border-purple-800/80">
                        <span className="text-purple-300 block font-bold mb-0.5">02. Vision Heal</span>
                        <span className="text-slate-300 text-[9px]">Selector Healing</span>
                      </div>
                      <div className="bg-emerald-950/80 p-2 rounded-lg border border-emerald-800/80">
                        <span className="text-emerald-400 block font-bold mb-0.5">03. Audit Agent</span>
                        <span className="text-slate-300 text-[9px]">Compliance Check</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-2 mb-6">
                    {orchestratorProduct.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions & Metrics */}
                <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-mono w-full sm:w-auto justify-between sm:justify-start">
                    <div>
                      <span className="text-slate-900 font-bold block text-xs sm:text-sm">99.8%</span>
                      <span className="text-[10px]">Uptime</span>
                    </div>
                    <div className="h-5 w-[1px] bg-slate-200" />
                    <div>
                      <span className="text-slate-900 font-bold block text-xs sm:text-sm">180+ hrs</span>
                      <span className="text-[10px]">Time Saved</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleProductClick(orchestratorProduct.queryParam)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow-glow"
                  >
                    <span>{orchestratorProduct.primaryCta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* Upcoming Products Pipeline — Titles Marked as Upcoming with Grey Smoke Effect */}
        <div className="mt-16 pt-12 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-mono font-bold uppercase tracking-wider mb-2 border border-slate-200">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>R&D Pipeline</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Upcoming Products
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Stealth Engineering &bull; In Active Development
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {UPCOMING_PRODUCTS.map((prod, index) => {
              const IconComp = prod.icon;
              return (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="rounded-3xl border border-slate-200/90 bg-white/90 p-5 shadow-xs relative overflow-hidden flex flex-col justify-between group hover:border-slate-300 hover:shadow-md transition-all"
                >
                  {/* Top: Category Tag & Upcoming Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wide bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        UPCOMING
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        {prod.category}
                      </span>
                    </div>

                    {/* Icon & Title ONLY */}
                    <div className="flex items-start gap-3 mt-2 mb-2">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 leading-snug pt-0.5">
                        {prod.name}
                      </h4>
                    </div>
                  </div>

                  {/* Lower Card: Shrouded with Grey Smoke Effect */}
                  <div className="relative h-28 rounded-2xl overflow-hidden mt-4 border border-slate-200/70 bg-gradient-to-b from-slate-100/70 via-slate-200/60 to-slate-300/80 shadow-inner">
                    {/* Layer 1: Base Fog Mist Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-400/50 via-slate-300/30 to-transparent backdrop-blur-[6px]" />

                    {/* Layer 2: Drifting Atmospheric Smoke Waves */}
                    <motion.div
                      animate={{
                        x: ["-15%", "15%", "-15%"],
                        opacity: [0.6, 0.85, 0.6],
                      }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -inset-x-12 bottom-0 h-24 bg-gradient-to-t from-slate-500/40 via-slate-400/25 to-transparent blur-md pointer-events-none"
                    />

                    {/* Layer 3: Radial Smoke Cloud */}
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-700 via-slate-400 to-transparent pointer-events-none" />

                    {/* Layer 4: Shrouded Stealth Indicator in Center of Smoke */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center gap-1.5 text-center p-3">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/75 backdrop-blur-md border border-slate-300/90 shadow-xs">
                        <Lock className="w-3 h-3 text-slate-600" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700">
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

