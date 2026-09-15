"use client";

import React, { useState } from "react";
import { 
  X, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  ArrowRight, 
  Clock, 
  Zap, 
  ShieldCheck, 
  TrendingUp,
  Code
} from "lucide-react";
import { Service, SERVICES } from "@/lib/constants";

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
  onBookCall: () => void;
}

export function ServiceModal({ service, onClose, onBookCall }: ServiceModalProps) {
  const [activeTab, setActiveTab] = useState<"scope" | "stack" | "roi">("scope");

  return (
    <div className="flex flex-col max-h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-200 border border-indigo-700">
              Agency Service {service.shortCode}
            </span>
            <span className="text-xs text-slate-400 font-mono">{service.category}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold">{service.title}</h3>
        </div>

        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 bg-slate-50/70 text-xs font-semibold text-slate-600">
        <button
          onClick={() => setActiveTab("scope")}
          className={`pb-3 border-b-2 px-3 transition-colors ${
            activeTab === "scope"
              ? "border-indigo-600 text-indigo-700 font-bold"
              : "border-transparent hover:text-slate-900"
          }`}
        >
          Scope & Deliverables
        </button>
        <button
          onClick={() => setActiveTab("stack")}
          className={`pb-3 border-b-2 px-3 transition-colors ${
            activeTab === "stack"
              ? "border-indigo-600 text-indigo-700 font-bold"
              : "border-transparent hover:text-slate-900"
          }`}
        >
          Tech Stack & Architecture
        </button>
        <button
          onClick={() => setActiveTab("roi")}
          className={`pb-3 border-b-2 px-3 transition-colors ${
            activeTab === "roi"
              ? "border-indigo-600 text-indigo-700 font-bold"
              : "border-transparent hover:text-slate-900"
          }`}
        >
          Projected ROI & Timeline
        </button>
      </div>

      {/* Body Content */}
      <div className="p-6 overflow-y-auto space-y-6 text-sm">
        {activeTab === "scope" && (
          <div className="space-y-6">
            <p className="text-slate-600 leading-relaxed">
              {service.description}
            </p>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Deliverable Blueprint
              </h4>
              <div className="space-y-2.5">
                {service.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                      {idx + 1}
                    </div>
                    <div>
                      <span className="font-semibold block">{item.split("&")[0]}</span>
                      <span className="text-slate-500">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "stack" && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Supported Technologies & Frameworks
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {service.techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900 text-white font-mono text-xs flex items-center gap-2 border border-slate-800"
                  >
                    <Code className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="truncate">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Deterministic Verification Protocol
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                All workflows built by Vyom implement strict schema validation (Pydantic/Zod), retry backoffs, dead-letter routing, and full observability telemetry (OpenTelemetry/Langfuse).
              </p>
            </div>
          </div>
        )}

        {activeTab === "roi" && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-gradient-to-tr from-indigo-50 via-sky-50 to-white border border-indigo-200">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase mb-1">
                <TrendingUp className="w-4 h-4" />
                Validated Impact Metric
              </div>
              <p className="text-xl font-extrabold text-slate-900">
                {service.roiMetric}
              </p>
              <p className="text-xs text-slate-600 mt-2">
                Derived from real-world enterprise deployments across financial services, healthcare, and high-growth B2B SaaS organizations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-1">Sprint Timeline:</span>
                <span className="font-bold text-slate-900">2 - 4 Weeks to Production Pilot</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block mb-1">IP Ownership:</span>
                <span className="font-bold text-slate-900">100% Client Code & Model Ownership</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-slate-500">
          Ready to review implementation specs with an engineering director?
        </span>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onClose}
            className="w-1/2 sm:w-auto px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onBookCall}
            className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md transition-all"
          >
            <span>Request Architecture Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
