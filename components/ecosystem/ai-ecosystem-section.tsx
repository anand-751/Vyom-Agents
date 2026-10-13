"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneCall,
  Database,
  Star,
  Search,
  Sparkles,
  ArrowRight,
  RotateCw,
  TrendingUp,
  Zap,
  CheckCircle2,
  Cpu,
  Activity
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export interface EcosystemNode {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  chipTitle: string;
  chipDesc: string;
  positionLabel: string;
  xPercent: number;
  yPercent: number;
  transformStyle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  lightBg: string;
  accentGlow: string;
  revenueImpact: string;
  description: string;
  feedsInto: string;
  keyMetrics: string[];
}

export const ECOSYSTEM_NODES: EcosystemNode[] = [
  {
    id: "voice-agent",
    step: "01",
    title: "AI Voice Agent",
    subtitle: "Inbound & Outbound Voice Intelligence",
    chipTitle: "AI Voice Agent",
    chipDesc: "24/7 Voice Intake",
    positionLabel: "Top Node",
    xPercent: 50,
    yPercent: 15,
    transformStyle: "translate(-50%, -100%) translateY(-6px)",
    icon: PhoneCall,
    color: "from-orange-500 to-amber-600",
    lightBg: "bg-orange-50 border-orange-200 text-orange-700",
    accentGlow: "rgba(234, 88, 12, 0.25)",
    revenueImpact: "+42% Conversion & Zero Missed Calls",
    description:
      "Converses natively with 24/7 inbound callers in real time. Qualifies leads, books calendar slots, and talks directly to your Custom CRM, Web, and Desktop Apps.",
    feedsInto: "Talks directly to your Custom CRM, Web, and Desktop Apps to log customer context & transaction parameters instantly.",
    keyMetrics: ["Natural Cadence", "15+ Concurrent Calls", "Direct App Sync"],
  },
  {
    id: "enterprise-software",
    step: "02",
    title: "Custom CRM / Web Apps",
    subtitle: "Custom CRM / Web / Desktop Apps",
    chipTitle: "Custom CRM / Web Apps",
    chipDesc: "Web & Desktop Portals",
    positionLabel: "Right Node",
    xPercent: 85,
    yPercent: 50,
    transformStyle: "translate(0%, -50%) translateX(6px)",
    icon: Database,
    color: "from-zinc-700 to-slate-900",
    lightBg: "bg-stone-100 border-stone-200 text-slate-800",
    accentGlow: "rgba(30, 41, 59, 0.25)",
    revenueImpact: "100% Operational Visibility & Sync",
    description:
      "Processes caller requests, updates internal CRM & ERP databases, synchronizes customer and patient records, and hands off completed service records directly to the Google Review AI Agent.",
    feedsInto: "Hands off completed transaction & client details directly to the Google Review AI Agent for customized follow-ups.",
    keyMetrics: ["Unified CRM Hub", "Web & Desktop Portals", "Real-Time DB Sync"],
  },
  {
    id: "review-agent",
    step: "03",
    title: "Google Review AI Agent",
    subtitle: "Compelling WhatsApp & SMS 5-Star Follow-ups",
    chipTitle: "Google Review AI Agent",
    chipDesc: "5-Star Reputation",
    positionLabel: "Bottom Node",
    xPercent: 50,
    yPercent: 85,
    transformStyle: "translate(-50%, 0%) translateY(6px)",
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
    chipTitle: "AIEO",
    chipDesc: "AI Engine Optimization",
    positionLabel: "Left Node",
    xPercent: 15,
    yPercent: 50,
    transformStyle: "translate(-100%, -50%) translateX(-6px)",
    icon: Search,
    color: "from-sky-500 to-blue-600",
    lightBg: "bg-sky-50 border-sky-200 text-sky-700",
    accentGlow: "rgba(14, 165, 233, 0.25)",
    revenueImpact: "#1 Recommended Choice on ChatGPT & Perplexity",
    description:
      "Surging 5-star Google reviews and Knowledge Graph schemas rank your brand as the #1 recommended answer on ChatGPT Search, Perplexity, and Gemini — driving fresh buyer calls back to your AI Voice Agent!",
    feedsInto: "Funnels high-intent buyer calls directly back to your 24/7 AI Voice Agent — completing the infinite growth flywheel!",
    keyMetrics: ["+310% Brand Citations", "Knowledge Graph Structuring", "Perplexity & Gemini Rank"],
  },
];

export function AiEcosystemSection() {
  const [activeNodeId, setActiveNodeId] = useState<string>("voice-agent");
  const [autoRotate, setAutoRotate] = useState(true);

  // Auto-rotate cycle through nodes every 4.5 seconds unless hovered
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setActiveNodeId((prev) => {
        const idx = ECOSYSTEM_NODES.findIndex((n) => n.id === prev);
        const nextIdx = (idx + 1) % ECOSYSTEM_NODES.length;
        return ECOSYSTEM_NODES[nextIdx].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [autoRotate]);

  const activeNode = ECOSYSTEM_NODES.find((n) => n.id === activeNodeId) || ECOSYSTEM_NODES[0];

  return (
    <section id="ecosystem" className="py-16 sm:py-20 relative bg-white border-t border-stone-200/80 overflow-hidden">
      {/* Background Subtle Gradient Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-orange-100/30 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-[11px] font-mono font-bold tracking-widest text-orange-600 uppercase block mb-2">
            — AUTONOMOUS REVENUE FLYWHEEL
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 leading-tight">
            The Vyom <span className="text-orange-600">AI Ecosystem</span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            A continuous, self-reinforcing growth loop: AI Voice Agent talks directly to your Custom CRM/Apps, Review Agent converts client records into 5-star Google Reviews via WhatsApp, and AIEO turns reviews into #1 LLM search citations!
          </p>
        </div>

        {/* Circular Interconnected Ecosystem Visual & Interactive Detail Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto"
          onMouseEnter={() => setAutoRotate(false)}
          onMouseLeave={() => setAutoRotate(true)}
        >
          {/* Left Column: Animated Cardinal Circular Node Ecosystem (Lg: 7 cols) */}
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[320px] sm:min-h-[380px] p-2 overflow-visible">

            {/* Unified Symmetrical Orbit Stage Wrapper */}
            <div className="relative w-[280px] h-[280px] sm:w-[330px] sm:h-[330px] flex items-center justify-center shrink-0">

              {/* Center Core Pulsing Hub */}
              <div
                onClick={() => {
                  const idx = ECOSYSTEM_NODES.findIndex((n) => n.id === activeNodeId);
                  const nextIdx = (idx + 1) % ECOSYSTEM_NODES.length;
                  setActiveNodeId(ECOSYSTEM_NODES[nextIdx].id);
                }}
                className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center cursor-pointer group"
              >
                {/* Pulsing Luminous Halo */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500/25 via-indigo-500/25 to-purple-500/25 blur-xl group-hover:scale-110 transition-transform duration-500" />

                {/* Outer Rotating Dashed Orbital Ring */}
                <div className="absolute inset-1 rounded-full border-2 border-dashed border-sky-400/50 animate-spin-slow pointer-events-none" />

                {/* Counter-Rotating Inner Dotted Ring */}
                <div className="absolute inset-2.5 rounded-full border border-dotted border-indigo-400/40 animate-spin-reverse-slow pointer-events-none" />

                {/* Center Core Sphere */}
                <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-950 text-white flex flex-col items-center justify-center p-1.5 sm:p-2 text-center shadow-2xl border border-indigo-500/40 group-hover:border-sky-400/70 transition-all duration-300">
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/60 via-slate-950 to-slate-950 pointer-events-none" />

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center mb-0.5 text-sky-400 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all shadow-glow">
                      <Cpu className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </div>
                    <span className="text-[7.5px] sm:text-[8.5px] font-mono font-extrabold uppercase tracking-wider text-sky-300 leading-tight">
                      Vyom Engine
                    </span>
                    <span className="text-[6px] sm:text-[7px] text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                      Infinite Loop
                    </span>
                  </div>
                </div>
              </div>

              {/* High-Quality Animated SVG Orbital System: Exactly Sized 100% to Container */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 400 400"
              >
                <defs>
                  <linearGradient id="flywheel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ea580c" />
                    <stop offset="33%" stopColor="#71717a" />
                    <stop offset="66%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>

                  {/* Glow Filter for Particles */}
                  <filter id="particle-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Sonar Radar Pulse Waves expanding from Center Hub */}
                <motion.circle
                  cx="200"
                  cy="200"
                  r="50"
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth="1.5"
                  animate={{
                    r: [48, 140],
                    opacity: [0.65, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <motion.circle
                  cx="200"
                  cy="200"
                  r="50"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="1.5"
                  animate={{
                    r: [48, 140],
                    opacity: [0.65, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />

                {/* Cardinal Radial Laser Beams to each Node */}
                {/* Core to Node 01 (Top: 200, 60) */}
                <line
                  x1="200" y1="200" x2="200" y2="60"
                  stroke={activeNodeId === "voice-agent" ? "#ea580c" : "#e2e8f0"}
                  strokeWidth={activeNodeId === "voice-agent" ? "2" : "1"}
                  strokeDasharray="4 4"
                  className={activeNodeId === "voice-agent" ? "animate-dash-flow opacity-90" : "opacity-30"}
                />
                {/* Core to Node 02 (Right: 340, 200) */}
                <line
                  x1="200" y1="200" x2="340" y2="200"
                  stroke={activeNodeId === "enterprise-software" ? "#71717a" : "#e2e8f0"}
                  strokeWidth={activeNodeId === "enterprise-software" ? "2" : "1"}
                  strokeDasharray="4 4"
                  className={activeNodeId === "enterprise-software" ? "animate-dash-flow opacity-90" : "opacity-30"}
                />
                {/* Core to Node 03 (Bottom: 200, 340) */}
                <line
                  x1="200" y1="200" x2="200" y2="340"
                  stroke={activeNodeId === "review-agent" ? "#10b981" : "#e2e8f0"}
                  strokeWidth={activeNodeId === "review-agent" ? "2" : "1"}
                  strokeDasharray="4 4"
                  className={activeNodeId === "review-agent" ? "animate-dash-flow opacity-90" : "opacity-30"}
                />
                {/* Core to Node 04 (Left: 60, 200) */}
                <line
                  x1="200" y1="200" x2="60" y2="200"
                  stroke={activeNodeId === "aieo" ? "#0284c7" : "#e2e8f0"}
                  strokeWidth={activeNodeId === "aieo" ? "2" : "1"}
                  strokeDasharray="4 4"
                  className={activeNodeId === "aieo" ? "animate-dash-flow opacity-90" : "opacity-30"}
                />

                {/* Main Connecting SVG Orbit Line with Flowing Dash Animation (r=140) */}
                <circle
                  cx="200"
                  cy="200"
                  r="140"
                  fill="none"
                  stroke="url(#flywheel-gradient)"
                  strokeWidth="2.5"
                  strokeDasharray="8 8"
                  className="animate-dash-flow opacity-70"
                />

                {/* Secondary Concentric Orbital Track with Reverse Dash Flow (r=105) */}
                <circle
                  cx="200"
                  cy="200"
                  r="105"
                  fill="none"
                  stroke="url(#flywheel-gradient)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  className="animate-dash-flow-reverse opacity-40"
                />

                {/* 4 Continuous Orbiting Data Photons traveling around perimeter */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "200px 200px" }}
                >
                  {/* Photon 1: Orange (Top: 200, 60) */}
                  <circle cx="200" cy="60" r="5" fill="#ea580c" filter="url(#particle-glow)" />
                  <circle cx="200" cy="60" r="2" fill="#ffffff" />

                  {/* Photon 2: Zinc (Right: 340, 200) */}
                  <circle cx="340" cy="200" r="5" fill="#71717a" filter="url(#particle-glow)" />
                  <circle cx="340" cy="200" r="2" fill="#ffffff" />

                  {/* Photon 3: Emerald (Bottom: 200, 340) */}
                  <circle cx="200" cy="340" r="5" fill="#10b981" filter="url(#particle-glow)" />
                  <circle cx="200" cy="340" r="2" fill="#ffffff" />

                  {/* Photon 4: Sky (Left: 60, 200) */}
                  <circle cx="60" cy="200" r="5" fill="#0284c7" filter="url(#particle-glow)" />
                  <circle cx="60" cy="200" r="2" fill="#ffffff" />
                </motion.g>

                {/* Secondary Counter-Orbiting Micro-Particles */}
                <motion.g
                  animate={{ rotate: -360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "200px 200px" }}
                >
                  <circle cx="200" cy="95" r="3" fill="#ea580c" opacity="0.7" filter="url(#particle-glow)" />
                  <circle cx="305" cy="200" r="3" fill="#a1a1aa" opacity="0.7" filter="url(#particle-glow)" />
                  <circle cx="200" cy="305" r="3" fill="#34d399" opacity="0.7" filter="url(#particle-glow)" />
                  <circle cx="95" cy="200" r="3" fill="#38bdf8" opacity="0.7" filter="url(#particle-glow)" />
                </motion.g>
              </svg>

              {/* 4 Perfectly Symmetrical Cardinal Nodes - Placed on the Outer Edges */}
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                {ECOSYSTEM_NODES.map((node) => {
                  const IconComp = node.icon;
                  const isActive = node.id === activeNodeId;

                  return (
                    <div
                      key={node.id}
                      style={{
                        position: "absolute",
                        left: `${node.xPercent}%`,
                        top: `${node.yPercent}%`,
                        transform: node.transformStyle,
                      }}
                      className="z-30 pointer-events-auto"
                    >
                      <motion.div
                        onClick={() => setActiveNodeId(node.id)}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                        animate={{
                          y: isActive ? [0, -3, 0] : [0, -1.5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="relative cursor-pointer transition-all duration-300"
                      >
                        {/* Active Pulsing Halo Ring */}
                        {isActive && (
                          <span className="absolute -inset-1.5 rounded-2xl bg-orange-500 opacity-40 blur-sm animate-pulse pointer-events-none" />
                        )}

                        <div
                          className={`relative flex items-center gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl border shadow-xs backdrop-blur-md transition-all duration-300 ${
                            isActive
                              ? "bg-slate-950 text-white border-orange-500 shadow-md ring-2 ring-orange-500/20 scale-105"
                              : "bg-white/95 text-slate-900 border-stone-200/90 hover:border-stone-300 hover:shadow-xs"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-r ${node.color} text-white shadow-2xs`}
                          >
                            <IconComp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          </div>
                          <div className="text-left pr-0.5 whitespace-nowrap">
                            <span className="text-[7px] sm:text-[8px] font-mono font-bold block text-orange-500 leading-none mb-0.5">
                              NODE {node.step}
                            </span>
                            <span className="text-[9px] sm:text-[10px] font-bold block leading-tight">
                              {node.chipTitle}
                            </span>
                            <span className="text-[7px] sm:text-[7.5px] font-medium block leading-none text-slate-500 dark:text-slate-400 mt-0.5">
                              {node.chipDesc}
                            </span>
                          </div>
                        </div>

                        {/* Step Pill Badge */}
                        <span
                          className={`absolute -top-1.5 -right-1.5 px-1.5 py-0.2 rounded-full text-[7.5px] sm:text-[8px] font-mono font-extrabold shadow-2xs ${
                            isActive
                              ? "bg-orange-500 text-white font-bold"
                              : "bg-stone-100 text-slate-700 border border-stone-300"
                          }`}
                        >
                          {node.step}
                        </span>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Active Node Details & Interconnected Story (Lg: 5 cols) */}
          <div className="lg:col-span-5">
            <SpotlightCard
              spotlightColor={activeNode.accentGlow}
              className="rounded-2xl p-4 sm:p-5 border border-stone-200/90 bg-white shadow-2xs relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3 sm:space-y-3.5"
                >
                  {/* Top Pill & Revenue Multiplier Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wide border ${activeNode.lightBg}`}>
                        NODE {activeNode.step} • {activeNode.subtitle}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[10.5px] font-mono font-extrabold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                      <span>{activeNode.revenueImpact}</span>
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {activeNode.title}
                    </h3>
                    <p className="mt-1 text-[11.5px] sm:text-[12.5px] text-slate-600 leading-relaxed">
                      {activeNode.description}
                    </p>
                  </div>

                  {/* Interconnection Handoff Banner */}
                  <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950 text-white border border-stone-800 shadow-2xs space-y-1 font-mono text-xs relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-center gap-1.5 text-orange-400 font-bold text-[10px] sm:text-[10.5px]">
                      <Zap className="w-3 h-3 text-orange-400 animate-pulse" />
                      <span>Interconnected Ecosystem Handoff:</span>
                    </div>
                    <p className="text-[10.5px] text-slate-300 font-sans leading-relaxed">
                      {activeNode.feedsInto}
                    </p>
                  </div>

                  {/* Key Metrics Chips */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
                    {activeNode.keyMetrics.map((metric, i) => (
                      <div key={i} className="p-1.5 sm:p-2 rounded-xl bg-stone-50 border border-stone-200/80 hover:border-orange-300 transition-colors">
                        <span className="text-[8.5px] sm:text-[10px] font-bold text-slate-900 block truncate">
                          {metric}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Navigation & Live Cycle Indicator */}
                  <div className="pt-2.5 border-t border-stone-200 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] font-mono text-slate-400">
                      <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                      <span>{autoRotate ? "Auto-cycling flywheel (hover to pause)" : "Paused on active node"}</span>
                    </div>
                    <div className="flex gap-1.5 items-center">
                      {ECOSYSTEM_NODES.map((n) => (
                        <button
                          key={n.id}
                          onClick={() => setActiveNodeId(n.id)}
                          className={`h-2 rounded-full transition-all duration-300 ${n.id === activeNodeId ? "bg-orange-600 w-5" : "bg-stone-300 hover:bg-stone-400 w-2"
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

      </div>
    </section>
  );
}
