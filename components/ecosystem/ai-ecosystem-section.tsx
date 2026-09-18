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
  positionLabel: string;
  positionClasses: string;
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
    subtitle: "Custom CRM / Web / Desktop Apps",
    positionLabel: "Right Node",
    positionClasses: "right-1 top-1/2 -translate-y-1/2",
    icon: Database,
    color: "from-purple-500 to-indigo-600",
    lightBg: "bg-purple-50 border-purple-200 text-purple-700",
    accentGlow: "rgba(168, 85, 247, 0.25)",
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
    <section id="ecosystem" className="py-20 relative bg-gradient-to-b from-white via-slate-50/60 to-white border-t border-slate-200/80 overflow-hidden">
      {/* Background Subtle Gradient Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-200/30 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200/20 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100/80 text-indigo-900 text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs border border-indigo-200">
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
          {/* Left Column: Animated Cardinal Circular Node Ecosystem (Lg: 6 cols) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[380px] sm:min-h-[500px] p-2 overflow-hidden sm:overflow-visible">
            
            {/* Center Core Pulsing Hub */}
            <div 
              onClick={() => {
                const idx = ECOSYSTEM_NODES.findIndex((n) => n.id === activeNodeId);
                const nextIdx = (idx + 1) % ECOSYSTEM_NODES.length;
                setActiveNodeId(ECOSYSTEM_NODES[nextIdx].id);
              }}
              className="absolute z-20 w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center cursor-pointer group"
            >
              {/* Pulsing Luminous Halo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500/25 via-indigo-500/25 to-purple-500/25 blur-xl group-hover:scale-110 transition-transform duration-500" />

              {/* Outer Rotating Dashed Orbital Ring */}
              <div className="absolute inset-1 rounded-full border-2 border-dashed border-sky-400/50 animate-spin-slow pointer-events-none" />

              {/* Counter-Rotating Inner Dotted Ring */}
              <div className="absolute inset-3 rounded-full border border-dotted border-indigo-400/40 animate-spin-reverse-slow pointer-events-none" />

              {/* Center Core Sphere */}
              <div className="relative z-10 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-slate-950 text-white flex flex-col items-center justify-center p-2 sm:p-3 text-center shadow-2xl border border-indigo-500/40 group-hover:border-sky-400/70 transition-all duration-300">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/60 via-slate-950 to-slate-950 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center mb-0.5 sm:mb-1 text-sky-400 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all shadow-glow">
                    <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono font-extrabold uppercase tracking-wider text-sky-300 leading-tight">
                    Vyom Engine
                  </span>
                  <span className="text-[7px] sm:text-[8px] text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                    Infinite Loop
                  </span>
                </div>
              </div>
            </div>

            {/* High-Quality Animated SVG Orbital System */}
            <svg 
              className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] pointer-events-none z-0" 
              viewBox="0 0 400 400"
            >
              <defs>
                <linearGradient id="flywheel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="33%" stopColor="#a855f7" />
                  <stop offset="66%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#6366f1" />
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
                stroke="#38bdf8"
                strokeWidth="1.5"
                animate={{
                  r: [48, 150],
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
                stroke="#a855f7"
                strokeWidth="1.5"
                animate={{
                  r: [48, 150],
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
              {/* Core to Node 01 (Top) */}
              <line
                x1="200" y1="200" x2="200" y2="55"
                stroke={activeNodeId === "voice-agent" ? "#0ea5e9" : "#cbd5e1"}
                strokeWidth={activeNodeId === "voice-agent" ? "2" : "1"}
                strokeDasharray="4 4"
                className={activeNodeId === "voice-agent" ? "animate-dash-flow opacity-90" : "opacity-30"}
              />
              {/* Core to Node 02 (Right) */}
              <line
                x1="200" y1="200" x2="345" y2="200"
                stroke={activeNodeId === "enterprise-software" ? "#a855f7" : "#cbd5e1"}
                strokeWidth={activeNodeId === "enterprise-software" ? "2" : "1"}
                strokeDasharray="4 4"
                className={activeNodeId === "enterprise-software" ? "animate-dash-flow opacity-90" : "opacity-30"}
              />
              {/* Core to Node 03 (Bottom) */}
              <line
                x1="200" y1="200" x2="200" y2="345"
                stroke={activeNodeId === "review-agent" ? "#10b981" : "#cbd5e1"}
                strokeWidth={activeNodeId === "review-agent" ? "2" : "1"}
                strokeDasharray="4 4"
                className={activeNodeId === "review-agent" ? "animate-dash-flow opacity-90" : "opacity-30"}
              />
              {/* Core to Node 04 (Left) */}
              <line
                x1="200" y1="200" x2="55" y2="200"
                stroke={activeNodeId === "aieo" ? "#6366f1" : "#cbd5e1"}
                strokeWidth={activeNodeId === "aieo" ? "2" : "1"}
                strokeDasharray="4 4"
                className={activeNodeId === "aieo" ? "animate-dash-flow opacity-90" : "opacity-30"}
              />

              {/* Main Connecting SVG Orbit Line with Flowing Dash Animation */}
              <circle
                cx="200"
                cy="200"
                r="150"
                fill="none"
                stroke="url(#flywheel-gradient)"
                strokeWidth="2.5"
                strokeDasharray="8 8"
                className="animate-dash-flow opacity-70"
              />

              {/* Secondary Concentric Orbital Track with Reverse Dash Flow */}
              <circle
                cx="200"
                cy="200"
                r="115"
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
                {/* Photon 1: Sky Blue */}
                <circle cx="200" cy="50" r="5" fill="#0ea5e9" filter="url(#particle-glow)" />
                <circle cx="200" cy="50" r="2" fill="#ffffff" />

                {/* Photon 2: Purple */}
                <circle cx="350" cy="200" r="5" fill="#a855f7" filter="url(#particle-glow)" />
                <circle cx="350" cy="200" r="2" fill="#ffffff" />

                {/* Photon 3: Emerald */}
                <circle cx="200" cy="350" r="5" fill="#10b981" filter="url(#particle-glow)" />
                <circle cx="200" cy="350" r="2" fill="#ffffff" />

                {/* Photon 4: Indigo */}
                <circle cx="50" cy="200" r="5" fill="#6366f1" filter="url(#particle-glow)" />
                <circle cx="50" cy="200" r="2" fill="#ffffff" />
              </motion.g>

              {/* Secondary Counter-Orbiting Micro-Particles */}
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "200px 200px" }}
              >
                <circle cx="200" cy="85" r="3" fill="#38bdf8" opacity="0.7" filter="url(#particle-glow)" />
                <circle cx="315" cy="200" r="3" fill="#c084fc" opacity="0.7" filter="url(#particle-glow)" />
                <circle cx="200" cy="315" r="3" fill="#34d399" opacity="0.7" filter="url(#particle-glow)" />
                <circle cx="85" cy="200" r="3" fill="#818cf8" opacity="0.7" filter="url(#particle-glow)" />
              </motion.g>
            </svg>

            {/* 4 Perfectly Symmetrical Cardinal Nodes */}
            <div className="relative w-full max-w-[340px] sm:max-w-[540px] h-[340px] sm:h-[420px] flex items-center justify-center">
              {ECOSYSTEM_NODES.map((node) => {
                const IconComp = node.icon;
                const isActive = node.id === activeNodeId;

                return (
                  <motion.div
                    key={node.id}
                    onClick={() => setActiveNodeId(node.id)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    animate={{
                      y: isActive ? [0, -4, 0] : [0, -2, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`absolute ${node.positionClasses} z-30 cursor-pointer transition-all duration-300`}
                  >
                    {/* Active Pulsing Halo Ring */}
                    {isActive && (
                      <span className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 opacity-40 blur-sm animate-pulse pointer-events-none" />
                    )}

                    <div
                      className={`relative flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl border shadow-md backdrop-blur-md transition-all duration-300 ${
                        isActive
                          ? "bg-slate-900 text-white border-sky-400 shadow-xl ring-2 ring-sky-400/30 scale-105"
                          : "bg-white/95 text-slate-900 border-slate-200/90 hover:border-slate-300 hover:shadow-lg"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-r ${node.color} text-white shadow-sm`}
                      >
                        <IconComp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      <div className="text-left pr-0.5">
                        <span className="text-[8px] sm:text-[9px] font-mono font-bold block text-sky-400 leading-none mb-0.5">
                          NODE {node.step}
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold block leading-tight truncate max-w-[70px] sm:max-w-[130px]">
                          {node.title}
                        </span>
                      </div>
                    </div>

                    {/* Step Pill Badge */}
                    <span
                      className={`absolute -top-1.5 -right-1.5 px-1.5 py-0.2 rounded-full text-[8px] sm:text-[9px] font-mono font-extrabold shadow-sm ${
                        isActive
                          ? "bg-sky-400 text-slate-950 font-bold"
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
              className="rounded-3xl p-4 sm:p-6 border border-slate-200/90 bg-white shadow-xl relative overflow-hidden"
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
                  <div className="p-3.5 rounded-2xl bg-slate-950 text-white border border-slate-800 shadow-sm space-y-1 font-mono text-xs relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-center gap-1.5 text-sky-400 font-bold text-[11px]">
                      <Zap className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                      <span>Interconnected Ecosystem Handoff:</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                      {activeNode.feedsInto}
                    </p>
                  </div>

                  {/* Key Metrics Chips */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
                    {activeNode.keyMetrics.map((metric, i) => (
                      <div key={i} className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 transition-colors">
                        <span className="text-[9px] sm:text-[11px] font-bold text-slate-900 block truncate">
                          {metric}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Navigation & Live Cycle Indicator */}
                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                      <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                      <span>{autoRotate ? "Auto-cycling flywheel (hover to pause)" : "Paused on active node"}</span>
                    </div>
                    <div className="flex gap-1.5 items-center">
                      {ECOSYSTEM_NODES.map((n) => (
                        <button
                          key={n.id}
                          onClick={() => setActiveNodeId(n.id)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            n.id === activeNodeId ? "bg-sky-600 w-5" : "bg-slate-300 hover:bg-slate-400 w-2"
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
