"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  Server, 
  Award, 
  Zap, 
  Clock, 
  Cpu 
} from "lucide-react";
import { COMPARISON_ITEMS } from "@/lib/constants";

export function WhyUsSection() {
  return (
    <section id="why-us" className="py-24 relative bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>The Agentic Paradigm Shift</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950">
            Why Forward-Thinking Enterprises Choose Vyom
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Legacy automations break the moment a button moves or an API responds differently. Vyom Autonomous Agents continuously adapt, self-evaluate, and execute with resilient precision.
          </p>
        </div>

        {/* Comparison Matrix Table / Cards */}
        <div className="rounded-3xl glass-panel-elevated overflow-hidden border border-slate-200/90 shadow-glass-elevated mb-16">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-slate-900 text-white p-4 sm:p-5 text-xs font-mono uppercase tracking-wider">
            <div className="col-span-12 md:col-span-4 font-bold text-slate-300">
              Capability Dimension
            </div>
            <div className="hidden md:block col-span-4 text-rose-300 font-semibold">
              Traditional Rigid Scripts & Legacy Bots
            </div>
            <div className="hidden md:block col-span-4 text-sky-400 font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Vyom Autonomous AI Workforce & Self-Healing RPA Engines
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-slate-200/80">
            {COMPARISON_ITEMS.map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="grid grid-cols-12 p-5 sm:p-6 hover:bg-white/90 transition-colors items-start gap-4"
              >
                <div className="col-span-12 md:col-span-4">
                  <span className="font-bold text-slate-900 text-sm block">
                    {item.feature}
                  </span>
                </div>

                {/* Legacy RPA */}
                <div className="col-span-12 md:col-span-4 flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 bg-rose-50/50 md:bg-transparent p-3 md:p-0 rounded-xl">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="md:hidden text-[10px] font-bold text-rose-700 uppercase block mb-1">
                      Traditional Automation:
                    </span>
                    <span>{item.traditional}</span>
                  </div>
                </div>

                {/* Vyom Agents */}
                <div className="col-span-12 md:col-span-4 flex items-start gap-2.5 text-xs sm:text-sm text-slate-900 bg-sky-50/70 md:bg-transparent p-3 md:p-0 rounded-xl font-medium">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="md:hidden text-[10px] font-bold text-sky-700 uppercase block mb-1">
                      Vyom Autonomous Engine:
                    </span>
                    <span>{item.vyom}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enterprise Harness Engineering & Safety Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Harness Engineering</h4>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
                Every agent process is wrapped in sandboxed test harnesses that evaluate state transitions and prevent runaway execution loops.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Deterministic Safety Guardrails</h4>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
                Strict input/output schema validators and policy enforcement layers guarantee zero hallucinations and deterministic tool calling.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Zero Data Retention</h4>
              <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
                Your proprietary enterprise data is never stored or used to train foundational models. Ephemeral memory handles execution with total privacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
