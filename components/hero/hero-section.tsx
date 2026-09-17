"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ChevronRight 
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";
import { AgentSimulator } from "./agent-simulator";
import { KeywordTicker } from "./keyword-ticker";

export function HeroSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTaglineIndex, setActiveTaglineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTaglineIndex((prev) => (prev + 1) % BRAND_CONFIG.taglines.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const openVoiceProduct = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("product", "voice-agent");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="relative pt-[116px] sm:pt-[148px] pb-24 sm:pb-30 overflow-hidden bg-white min-h-[85vh] flex flex-col justify-center">
      {/* Subtle Background Grid and Dynamic Animated Ambient Glow Overlays */}
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-80" />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.6, 0.35],
          x: [0, 25, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-sky-200/50 via-purple-200/40 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.5, 0.25],
          x: [0, -30, 0],
          y: [0, 25, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-28 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-200/40 via-sky-100/50 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          
          {/* Live Enterprise Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={openVoiceProduct}
            className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-slate-50/90 border border-slate-200/90 text-slate-700 text-xs sm:text-sm font-semibold shadow-xs hover:border-sky-300 hover:bg-sky-50/50 transition-all cursor-pointer mb-8 group"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="tracking-wide">Enterprise Agentic AI & Autonomous Workforce</span>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
          </motion.div>

          {/* Master Headline — Bigger, Covering First Page with Smooth Fade-in */}
          <motion.h1
            initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.5rem] font-black tracking-tight text-slate-950 leading-[1.04] mb-8 max-w-6xl mx-auto"
          >
            Deploy Your Next-Gen{" "}
            <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Autonomous AI Workforce
            </span>
          </motion.h1>

          {/* Sub-headline with Core Value Proposition & Smooth Fade-in */}
          <motion.p
            initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl md:text-2xl text-slate-600 font-normal leading-relaxed max-w-4xl mx-auto mb-10"
          >
            Unlocking infinite possibilities in autonomous technology. We architect intelligent{" "}
            <span className="font-semibold text-slate-900">Agentic AI</span> ecosystems and enterprise{" "}
            <span className="font-semibold text-slate-900">AI automation products</span> that transform complex operations into deterministic, 24/7 self-executing workflows.
          </motion.p>

          {/* Dynamic Rotating Core Thesis Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 text-sm sm:text-base font-semibold text-slate-600 bg-white/90 backdrop-blur-xl border border-slate-200/90 px-6 py-3 rounded-full shadow-sm mb-16"
          >
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Core Thesis</span>
            </div>
            <div className="relative h-7 overflow-hidden min-w-[280px] sm:min-w-[360px] md:min-w-[420px] text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeTaglineIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 text-slate-900 font-semibold truncate pt-0.5"
                >
                  &ldquo;{BRAND_CONFIG.taglines[activeTaglineIndex]}&rdquo;
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

        {/* Live Interactive Agent Simulation Node Engine */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          <AgentSimulator />
        </motion.div>

        {/* 4 Enterprise Metric Counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {BRAND_CONFIG.metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-xs flex flex-col justify-center text-center hover:border-sky-300 hover:shadow-md transition-all cursor-default group"
            >
              <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                {metric.value}
              </span>
              <span className="text-xs font-semibold text-slate-800 mt-1">
                {metric.label}
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 font-mono">
                {metric.change}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Continuous Keywords Marquee */}
        <div className="mt-14 -mx-4 sm:-mx-6 lg:-mx-8">
          <KeywordTicker />
        </div>
      </div>
    </section>
  );
}
