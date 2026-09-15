"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Search, 
  Star, 
  Database, 
  Workflow, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ChevronRight,
  TrendingUp,
  Cpu
} from "lucide-react";
import { SERVICES, Service } from "@/lib/constants";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function ServicesSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const serviceIcons: Record<string, any> = {
    aieo: Search,
    reputation: Star,
    rag: Database,
    autopilot: Workflow,
  };

  const handleOpenServiceModal = (queryParam: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", queryParam);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section id="services" className="py-24 relative bg-white border-t border-slate-200/80 overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 bg-dot-subtle pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-100/80 text-indigo-800 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm border border-indigo-200">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Enterprise Agency Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950">
            Enterprise Agentic Capabilities
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From algorithmic LLM visibility (AIEO) and autonomous reputation management to self-correcting RAG infrastructure and end-to-end multi-agent business autopilots.
          </p>
        </div>

        {/* Services Grid (4 Compact Cards in a balanced 2x2 grid with Vengeance UI Spotlight Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((service, index) => {
            const IconComponent = serviceIcons[service.id] || Cpu;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <SpotlightCard
                  spotlightColor="rgba(99, 102, 241, 0.12)"
                  className="rounded-2xl hover:border-indigo-400 hover:shadow-xl transition-all duration-300 group border border-slate-200/90 relative bg-white h-full"
                >
                  <div className="p-5 sm:p-6 flex flex-col justify-between h-full relative z-10">
                    {/* Top Badge & Header */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-50 to-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-slate-400">
                          SERVICE {service.shortCode}
                        </span>
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block mb-0.5">
                        {service.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {service.description}
                      </p>

                      {/* Deliverables Bullet List */}
                      <div className="space-y-1.5 mb-4">
                        {service.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Badges & CTA */}
                    <div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {service.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px] font-mono border border-slate-200 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-medium text-emerald-600 font-mono truncate max-w-[220px]">
                          {service.roiMetric.slice(0, 38)}...
                        </span>
                        <button
                          onClick={() => handleOpenServiceModal(service.queryParam)}
                          className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 flex items-center gap-1 transition-colors shrink-0"
                        >
                          <span>Explore Scope</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Custom Engineering Consultation Banner with Vengeance UI ShimmerButton */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800 relative overflow-hidden"
        >
          <div className="space-y-1 text-center md:text-left z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">
              Bespoke Enterprise Implementations
            </span>
            <h4 className="text-xl sm:text-2xl font-bold">
              Need End-to-End Multi-Agent Autopilot for Your Business Stack?
            </h4>
            <p className="text-sm text-slate-300 max-w-2xl">
              We design, fine-tune, and deploy sovereign agent ecosystems compliant with strict zero-data-retention security protocols.
            </p>
          </div>

          <ShimmerButton
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("modal", "contact");
              router.push(`?${params.toString()}`, { scroll: false });
            }}
            className="shrink-0 z-10 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 text-slate-950 font-extrabold text-xs"
          >
            <span>Consult Principal Architect</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </ShimmerButton>
        </motion.div>
      </div>
    </section>
  );
}

