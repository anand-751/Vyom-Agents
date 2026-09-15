"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PhoneCall, 
  Workflow, 
  Star, 
  Search, 
  Sparkles, 
  ArrowRight, 
  RotateCw, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  ShieldCheck,
  RefreshCw,
  MessageSquare,
  Globe2
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function AiEcosystemSection() {
  const [activeNodeId, setActiveNodeId] = useState<string>("voice-agent");
  const [autoRotate, setAutoRotate] = useState(true);

  const ecosystemNodes = [
    {
      id: "voice-agent",
      step: "01",
      title: "AI Voice Agent",
      subtitle: "Inbound & Outbound Voice Intelligence",
      positionLabel: "Top Node",
      positionClasses: "top-1 left-1/2 -translate-x-1/2",
      icon: PhoneCall,
      color: "from-sky-500 to-blue-600",
      lightBg: "bg-sky-50 border-sky-200 text-sky-700",
      accentGlow: "rgba(14, 165, 233, 0.25)",
      revenueImpact: "+42% Conversion & Zero Missed Calls",
      description:
        "Converses natively with 24/7 inbound callers with sub-400ms latency. Qualifies leads, books calendar slots, and talks directly to your Custom CRM, Web, and Desktop Apps in real time.",
      feedsInto: "Talks directly to your Custom CRM, Web, and Desktop Apps to log customer context & transaction parameters instantly.",
      keyMetrics: ["320ms Latency", "15+ Concurrent Calls", "Direct App Sync"],
    },
    {
      id: "enterprise-software",
      step: "02",
      title: "Custom CRM / Web / Desktop Apps",
      subtitle: "Self-Healing RPA & Workflow Engine",
      positionLabel: "Right Node",
      positionClasses: "right-1 top-1/2 -translate-y-1/2",
      icon: Workflow,
      color: "from-purple-500 to-indigo-600",
      lightBg: "bg-purple-50 border-purple-200 text-purple-700",
      accentGlow: "rgba(168, 85, 247, 0.25)",
      revenueImpact: "100% Hands-Free Operational Scale",
      description:
        "Processes caller requests, updates internal CRM & ERP databases, auto-remediates UI shifts, and hands off completed service records directly to the Google Review AI Agent.",
      feedsInto: "Hands off completed transaction & client details directly to the Google Review AI Agent for customized follow-ups.",
      keyMetrics: ["99.8% Auto-Healed DOM", "Zero Script Fragility", "Auto CRM Mutation"],
    },
    {
      id: "review-agent",
      step: "03",
      title: "Google Review AI Agent",
      subtitle: "Compelling WhatsApp & SMS 5-Star Follow-ups",
      positionLabel: "Bottom Node",
      positionClasses: "bottom-1 left-1/2 -translate-x-1/2",
      icon: Star,
      color: "from-emerald-500 to-teal-600",
      lightBg: "bg-emerald-50 border-emerald-200 text-emerald-700",
      accentGlow: "rgba(16, 185, 129, 0.25)",
      revenueImpact: "+300% 5-Star Google Reviews",
      description:
        "Fetches completed client & service details from your CRM/apps to generate compelling, personalized WhatsApp/SMS follow-ups that harvest 5-star Google Reviews while intercepting complaints.",
      feedsInto: "Surging 5-star Google Reviews and positive rating schemas feed directly into your brand's AIEO domain authority.",
      keyMetrics: ["+300% 5-Star Reviews", "WhatsApp Follow-ups", "Complaint Remediation"],
    },
    {
      id: "aieo",
      step: "04",
      title: "AIEO (AI Engine Optimization)",
      subtitle: "#1 LLM Search & Inbound Growth",
      positionLabel: "Left Node",
      positionClasses: "left-1 top-1/2 -translate-y-1/2",
      icon: Search,
      color: "from-indigo-500 to-sky-600",
      lightBg: "bg-indigo-50 border-indigo-200 text-indigo-700",
      accentGlow: "rgba(99, 102, 241, 0.25)",
      revenueImpact: "#1 Recommended Choice on ChatGPT & Perplexity",
      description:
        "Surging 5-star Google reviews and Knowledge Graph schemas rank your brand as the #1 recommended answer on ChatGPT Search, Perplexity, and Gemini — driving fresh buyer calls back to your AI Voice Agent!",
      feedsInto: "Funnels high-intent buyer calls directly back to your 24/7 AI Voice Agent — completing the infinite growth flywheel!",
      keyMetrics: ["+310% Brand Citations", "Knowledge Graph Structuring", "Perplexity & Gemini Rank"],
    },
  ];

  // Auto-rotate cycle through nodes every 4.5 seconds unless hovered
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setActiveNodeId((prev) => {
        const idx = ecosystemNodes.findIndex((n) => n.id === prev);
        const nextIdx = (idx + 1) % ecosystemNodes.length;
        return ecosystemNodes[nextIdx].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [autoRotate]);

  const activeNode = ecosystemNodes.find((n) => n.id === activeNodeId)!;

  return (
    <section id="ecosystem" className="py-20 relative bg-gradient-to-b from-white via-slate-50/60 to-white border-t border-slate-200/80 overflow-hidden">
      {/* Background Subtle Gradient Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-200/30 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200/20 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100/80 text-indigo-900 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm border border-indigo-200">
            <RotateCw className="w-3.5 h-3.5 text-indigo-600 animate-spin-slow" />
            <span>Autonomous Revenue Flywheel</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950">
            The Vyom <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Ecosystem</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            A continuous, self-reinforcing growth loop: AI Voice Agent talks directly to your Custom CRM/Apps, Review Agent converts client records into 5-star Google Reviews via WhatsApp, and AIEO turns reviews into #1 LLM search citations!
          </p>
        </div>

        {/* Circular Interconnected Ecosystem Visual & Interactive Detail Grid */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          onMouseEnter={() => setAutoRotate(false)}
          onMouseLeave={() => setAutoRotate(true)}
        >
          {/* Left Column: Perfectly Symmetrical Cardinal Circular Node Ecosystem (Lg: 6 cols) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[460px] sm:min-h-[500px] p-2">
            
            {/* Center Core Pulsing Hub */}
            <div className="absolute z-20 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-950 text-white flex flex-col items-center justify-center p-3 text-center shadow-2xl border border-slate-800 group cursor-pointer">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 opacity-30 group-hover:opacity-60 blur-md transition-opacity animate-pulse" />
              <div className="relative z-10 flex flex-col items-center">
                <RefreshCw className="w-5 h-5 text-sky-400 mb-1 animate-spin-slow" />
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-sky-300">
                  Vyom Engine
                </span>
                <span className="text-[8px] text-slate-400 font-mono mt-0.5">
                  Infinite Revenue Loop
                </span>
              </div>
            </div>

            {/* Circular Connecting SVG Orbit Line */}
            <svg className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] pointer-events-none z-0" viewBox="0 0 400 400">
              <circle
                cx="200"
                cy="200"
                r="150"
                fill="none"
                stroke="url(#flywheel-gradient)"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                className="opacity-60"
              />
              <defs>
                <linearGradient id="flywheel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="33%" stopColor="#a855f7" />
                  <stop offset="66%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>

            {/* 4 Perfectly Symmetrical Cardinal Nodes (Top, Right, Bottom, Left - ZERO Overlap) */}
            <div className="relative w-full max-w-[460px] sm:max-w-[540px] h-[360px] sm:h-[420px] flex items-center justify-center">
              {ecosystemNodes.map((node) => {
                const IconComp = node.icon;
                const isActive = node.id === activeNodeId;

                return (
                  <motion.div
                    key={node.id}
                    onClick={() => setActiveNodeId(node.id)}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className={`absolute ${node.positionClasses} z-30 cursor-pointer transition-all duration-300`}
                  >
                    <div
                      className={`relative flex items-center gap-2 px-2.5 py-1.5 rounded-xl border shadow-md backdrop-blur-md transition-all duration-300 ${
                        isActive
                          ? "bg-slate-900 text-white border-sky-400 shadow-xl ring-2 ring-sky-400/30 scale-105"
                          : "bg-white/95 text-slate-900 border-slate-200/90 hover:border-slate-300 hover:shadow-lg"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-r ${node.color} text-white shadow-sm`}
                      >
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left pr-0.5">
                        <span className="text-[9px] font-mono font-bold block text-sky-400 leading-none mb-0.5">
                          NODE {node.step}
                        </span>
                        <span className="text-[11px] sm:text-xs font-bold block leading-tight truncate max-w-[100px] sm:max-w-[130px]">
                          {node.title}
                        </span>
                      </div>
                    </div>

                    {/* Compact Step Pill Badge */}
                    <span
                      className={`absolute -top-1.5 -right-1.5 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-extrabold shadow-sm ${
                        isActive
                          ? "bg-sky-400 text-slate-950"
                          : "bg-slate-100 text-slate-700 border border-slate-300"
                      }`}
                    >
                      {node.step}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Node Details & Interconnected Story (Lg: 6 cols) */}
          <div className="lg:col-span-6">
            <SpotlightCard
              spotlightColor={activeNode.accentGlow}
              className="rounded-3xl p-5 sm:p-6 border border-slate-200/90 bg-white shadow-xl relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Top Pill & Revenue Multiplier Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${activeNode.lightBg}`}>
                        NODE {activeNode.step} • {activeNode.subtitle}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-extrabold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{activeNode.revenueImpact}</span>
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                      {activeNode.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {activeNode.description}
                    </p>
                  </div>

                  {/* Interconnection Handoff Banner */}
                  <div className="p-3 rounded-xl bg-slate-950 text-white border border-slate-800 shadow-sm space-y-1 font-mono text-xs">
                    <div className="flex items-center gap-1.5 text-sky-400 font-bold text-[11px]">
                      <Zap className="w-3.5 h-3.5 text-sky-400" />
                      <span>Interconnected Ecosystem Handoff:</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                      {activeNode.feedsInto}
                    </p>
                  </div>

                  {/* Key Metrics Chips */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {activeNode.keyMetrics.map((metric, i) => (
                      <div key={i} className="p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-900 block truncate">
                          {metric}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Select Nodes Navigation Controls */}
                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">
                      Click any node around circle to inspect
                    </span>
                    <div className="flex gap-1.5">
                      {ecosystemNodes.map((n) => (
                        <button
                          key={n.id}
                          onClick={() => setActiveNodeId(n.id)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            n.id === activeNodeId ? "bg-sky-600 w-5" : "bg-slate-300 hover:bg-slate-400"
                          }`}
                          aria-label={`Select node ${n.step}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </SpotlightCard>
          </div>
        </div>

        {/* 4 Sequential Ecosystem Handoff Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ecosystemNodes.map((node) => {
            const IconComponent = node.icon;

            return (
              <div
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  activeNodeId === node.id
                    ? "bg-slate-900 text-white border-sky-400 shadow-md scale-[1.02]"
                    : "bg-white text-slate-900 border-slate-200/80 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-white bg-gradient-to-r ${node.color}`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                  <span
                    className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      activeNodeId === node.id ? "bg-sky-950 text-sky-300 border border-sky-800" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    STEP {node.step}
                  </span>
                </div>

                <h4 className="text-xs font-bold leading-tight mb-1">
                  {node.title}
                </h4>
                <p
                  className={`text-[10px] leading-relaxed line-clamp-2 ${
                    activeNodeId === node.id ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {node.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
