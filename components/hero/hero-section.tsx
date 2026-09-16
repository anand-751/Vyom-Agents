"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Star,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";
import { AgentSimulator } from "./agent-simulator";
import { KeywordTicker } from "./keyword-ticker";
import { ShimmerButton } from "@/components/ui/shimmer-button";

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

  const openContactModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "contact");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const openVoiceProduct = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("product", "voice-agent");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="relative pt-32 sm:pt-36 pb-20 overflow-hidden bg-white">
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
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-sky-200/50 via-purple-200/40 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.5, 0.25],
          x: [0, -30, 0],
          y: [0, 25, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 right-10 w-[420px] h-[420px] bg-gradient-to-bl from-indigo-200/40 via-sky-100/50 to-transparent rounded-full blur-3xl pointer-events-none"
      />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Live Enterprise Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={openVoiceProduct}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-50/90 border border-slate-200/90 text-slate-700 text-xs font-semibold shadow-xs hover:border-sky-300 hover:bg-sky-50/50 transition-all cursor-pointer mb-7 group"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="tracking-wide">Enterprise Agentic AI & Autonomous Workforce</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.08] mb-6"
          >
            Deploy Your Next-Gen{" "}
            <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Autonomous AI Workforce
            </span>
          </motion.h1>

          {/* Sub-headline with Enterprise Focus */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mb-7"
          >
            Unlocking infinite possibilities in autonomous technology. We architect intelligent{" "}
            <span className="font-semibold text-slate-900">Agentic AI</span> ecosystems and enterprise{" "}
            <span className="font-semibold text-slate-900">AI automation products</span> that transform complex operations into deterministic, 24/7 self-executing workflows.
          </motion.p>

          {/* Dynamic Rotating Thesis Pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-500 mb-9 bg-white/80 backdrop-blur-md border border-slate-200/90 px-4 py-2 rounded-full shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="text-slate-400 font-medium">Core Thesis:</span>
            <div className="relative h-6 overflow-hidden min-w-[260px] sm:min-w-[320px] md:min-w-[380px] text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeTaglineIndex}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 text-slate-900 font-semibold truncate"
                >
                  &ldquo;{BRAND_CONFIG.taglines[activeTaglineIndex]}&rdquo;
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* High-Value Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10"
          >
            <a href="#products" className="w-full sm:w-auto">
              <ShimmerButton className="w-full sm:w-auto px-8 py-3.5 text-sm">
                <span>Explore Flagship Products</span>
                <ArrowRight className="w-4 h-4" />
              </ShimmerButton>
            </a>

            <button
              onClick={openContactModal}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-slate-800 font-semibold text-sm border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80 shadow-xs transition-all flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Schedule Architecture Audit</span>
              <span className="text-[11px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-mono font-bold">
                Free Evaluation
              </span>
            </button>
          </motion.div>

          {/* Social Proof Testimonial Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center gap-3.5 p-3 sm:px-4 sm:py-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs text-left max-w-xl mb-12"
          >
            <div className="flex -space-x-2 shrink-0">
              <span className="w-8 h-8 rounded-full bg-sky-500 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white shadow-xs">DR</span>
              <span className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white shadow-xs">AP</span>
              <span className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white shadow-xs">SK</span>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-amber-500 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-slate-800 font-bold ml-1 text-xs">4.9/5 Practitioner Rating</span>
              </div>
              <p className="text-xs text-slate-600">
                &ldquo;Replaced our 3-shift receptionist desk in 48 hours without a single dropped booking.&rdquo;
              </p>
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
