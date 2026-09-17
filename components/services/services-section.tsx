"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Search, 
  Star, 
  Database, 
  Workflow, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  TrendingUp,
  Cpu,
  Network,
  ArrowLeftRight,
  Globe2
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function ServicesSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    "rpa-automation": Workflow,
    "multiagent-systems": Network,
    "agent-to-agent": ArrowLeftRight,
    "crm-erp": Layers,
    "websites": Globe2,
    "aieo": Search,
    "reputation": Star,
    "rag": Database,
  };

  const handleOpenServiceModal = (queryParam: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", queryParam);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section id="services" className="py-24 relative bg-white border-t border-slate-200/80 overflow-hidden">
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
            Specialized engineering across self-healing visual automation, multi-agent swarms, custom enterprise ERP/CRM systems, and AI search engine optimization.
          </p>
        </div>

        {/* Compact Services Showcase Grid (8 Cards in a balanced 4-col responsive grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {SERVICES.map((service, index) => {
            const IconComponent = serviceIcons[service.id] || Cpu;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <div
                  onClick={() => handleOpenServiceModal(service.queryParam)}
                  className="cursor-pointer h-full"
                >
                  <SpotlightCard
                    spotlightColor="rgba(99, 102, 241, 0.12)"
                    className="rounded-2xl hover:border-indigo-400 hover:shadow-lg transition-all duration-300 group border border-slate-200/90 relative bg-white h-full"
                  >
                    <div className="p-5 flex flex-col justify-between h-full relative z-10">
                      <div>
                        {/* Top: Icon & Service Code Badge */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-50 to-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-xs">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono font-bold text-slate-400 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/70">
                            SERVICE {service.shortCode}
                          </span>
                        </div>

                        {/* Category & Title */}
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                          {service.category}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-1">
                          {service.title}
                        </h3>

                        {/* Concise One-Liner / Showcase Description */}
                        <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                          {service.description}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {service.techStack.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom: ROI Snippet & Action Arrow */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 text-emerald-700 text-[10px] font-medium truncate max-w-[135px]">
                          <TrendingUp className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{service.roiMetric}</span>
                        </div>

                        <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 flex items-center gap-1 transition-colors shrink-0">
                          <span>Scope</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
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

