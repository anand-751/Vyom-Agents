"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Play, Check } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";

export function HeroSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const capabilityCards = [
    { 
      number: "01",
      label: "AI Consulting & Assessment",
      desc: "Readiness audit & strategic ROI roadmap"
    },
    { 
      number: "02",
      label: "Transformative Agent Engineering",
      desc: "Domain-specific autonomous agent architectures"
    },
    { 
      number: "03",
      label: "Agentic Workflow Design",
      desc: "Self-healing deterministic task execution"
    },
    { 
      number: "04",
      label: "Deploy Solution in 14 Days",
      desc: "Rapid enterprise production rollout"
    },
  ];

  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 overflow-hidden bg-[#070A10] text-white min-h-screen min-h-[100dvh] flex flex-col justify-center">
      {/* Background: Earth Sunrise Space Curve Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <Image
          src="/images/hero_space_dawn.jpg"
          alt="Earth dawn space curve"
          fill
          priority
          className="object-cover object-center opacity-65 mix-blend-screen scale-105"
        />
        {/* Minimalist subtle dot matrix grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] opacity-75" />
        
        {/* Soft dark vignette gradients for maximum text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070A10]/95 via-[#070A10]/75 to-[#070A10]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070A10]/80 via-transparent to-[#070A10]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Hero Content & Action CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Category Tag - Lifted upwards with increased bottom spacing */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/15 hover:border-white/30 text-stone-300 hover:text-white text-[10.5px] sm:text-[11.5px] font-mono tracking-widest uppercase mb-5 sm:mb-7 transition-all duration-200 cursor-default select-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>AI AGENTS FOR WHAT&apos;S NEXT</span>
            </motion.div>

            {/* Master Headline - Even Bigger & Bold (3-Line Layout Matching Request) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.65rem] xl:text-[5.35rem] font-black tracking-tight text-white leading-[1.01] mb-5 sm:mb-6"
            >
              Intelligent <br />
              Agents for a{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Bigger <br className="hidden sm:inline" />
                Tomorrow.
              </span>
            </motion.h1>

            {/* Sub-headline: Client-facing vision copy */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm md:text-base lg:text-[16.5px] text-stone-300 font-normal leading-relaxed max-w-xl mb-8 sm:mb-10 lg:mb-12"
            >
              Vyom Agents is an enterprise Agentic AI SaaS company engineering domain-specific autonomous agents that augment human potential and solve real operational bottlenecks.
            </motion.p>

            {/* Action CTAs: Shifted further downside with mt-2 sm:mt-4 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-2 sm:mt-3"
            >
              {/* Primary CTA: Premium "Get Started" Button */}
              <button
                onClick={openContactModal}
                className="relative inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:via-amber-400 hover:to-orange-500 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 active:scale-[0.98] shadow-[0_0_32px_rgba(249,115,22,0.5)] hover:shadow-[0_0_46px_rgba(249,115,22,0.75)] hover:scale-[1.02] border border-orange-300/40 overflow-hidden group"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[350%] transition-transform duration-1000 ease-out pointer-events-none" />
                <span className="relative z-10 font-semibold tracking-wide">Get Started</span>
                <span className="relative z-10 w-5 h-5 rounded-full bg-white/25 border border-white/30 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white/40">
                  <ArrowRight className="w-3 h-3 text-white stroke-[2.5]" />
                </span>
              </button>

              {/* Secondary CTA: Watch Video / View Demos */}
              <Link
                href="/blogs"
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white font-medium text-xs sm:text-sm border border-white/20 hover:border-white/35 backdrop-blur-md transition-all duration-200 active:scale-[0.98] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]"
              >
                <div className="w-5 h-5 rounded-full border border-white/60 bg-white/10 flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5 text-white" />
                </div>
                <span>Watch Video</span>
              </Link>
            </motion.div>

          </div>

          {/* Right Column: 4 Stacked Premium Capability Cards - Expanded Vertically */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="lg:col-span-5 flex flex-col gap-4 sm:gap-4.5 w-full max-w-lg lg:ml-auto"
          >
            {capabilityCards.map((item, idx) => (
              <div
                key={idx}
                className="relative group flex items-center gap-4 p-4 sm:py-4.5 sm:px-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.09] hover:border-orange-500/40 backdrop-blur-xl transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(249,115,22,0.16)] hover:translate-x-1"
              >
                {/* Glowing checkmark badge */}
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/30 group-hover:border-orange-500/60 flex items-center justify-center shrink-0 text-orange-400 group-hover:bg-orange-500/25 transition-all">
                  <Check className="w-4.5 h-4.5 stroke-[2.5]" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs sm:text-[14px] font-semibold text-stone-200 group-hover:text-white transition-colors truncate">
                      {item.label}
                    </h3>
                    <span className="text-[10px] font-mono text-stone-500 group-hover:text-orange-400 transition-colors shrink-0">
                      {item.number}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-400 font-normal leading-relaxed mt-0.5 group-hover:text-stone-300 transition-colors">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
