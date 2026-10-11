"use client";

import React from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Phone, 
  Building2, 
  FileText, 
  Zap, 
  BarChart3, 
  ArrowUpRight 
} from "lucide-react";
import { VyomLogoIcon } from "@/components/ui/vyom-logo";

export function AboutSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const openContactModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "contact");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section 
      id="about" 
      className="pt-6 sm:pt-8 lg:pt-10 pb-16 sm:pb-20 lg:pb-24 bg-[#FCFBF8] text-slate-900 border-t border-stone-200/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Split: Left Editorial Vision & Right Headquarters Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-12 sm:mb-16 lg:mb-20">
          
          {/* Left Column: Brand Vision Copy */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-orange-600 uppercase mb-3 sm:mb-4 block">
              — ABOUT US
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-slate-950 leading-[1.14] mb-5 sm:mb-6">
              We believe in a future <br className="hidden sm:inline" />
              built with <span className="text-orange-500 font-extrabold">AI agents.</span>
            </h2>

            <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-normal mb-4 max-w-lg">
              Vyom Agents is an enterprise Agentic AI SaaS company engineering domain-specific autonomous agents that augment human potential and solve real operational bottlenecks.
            </p>

            <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-normal mb-7 sm:mb-8 max-w-lg">
              From conversational voice agents handling 24/7 client inquiries to autonomous accounting operations and reconciliation, we build deterministic systems with strict safety guardrails and zero data retention.
            </p>

            {/* Pill CTA Button: Our Mission */}
            <button
              onClick={openContactModal}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#0B0F19] hover:bg-slate-800 text-white font-semibold text-xs tracking-wide transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
            >
              <span>Our Mission</span>
            </button>
          </div>

          {/* Right Column: Architectural Headquarters Showcase with 3 Floating Product Pills */}
          <div className="lg:col-span-7 w-full">
            <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden border border-stone-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.12)] h-[360px] sm:h-[420px] lg:h-[450px] w-full bg-slate-950 group select-none">
              
              {/* Sunset Glass Architecture Photograph */}
              <Image
                src="/images/about_architecture.jpg"
                alt="Vyom Agents Autonomous Architecture Headquarters"
                fill
                priority
                className="object-cover object-center scale-105 transition-transform duration-1000 ease-out group-hover:scale-100 opacity-95"
              />

              {/* Ambient atmospheric gradients for contrast and depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />

              {/* Glowing SVG Connection Lines linking all 3 cards to the central Vyom Agents card */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden sm:block"
                viewBox="0 0 700 450" 
                fill="none"
              >
                <defs>
                  <linearGradient id="line-voice" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A855F7" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#FB923C" stopOpacity="0.85" />
                  </linearGradient>
                  <linearGradient id="line-concierge" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#FB923C" stopOpacity="0.85" />
                  </linearGradient>
                  <linearGradient id="line-accounting" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#FB923C" stopOpacity="0.85" />
                  </linearGradient>
                </defs>

                {/* Connection 1: Central Vyom Agents card -> AI Voice Agent (top-left) */}
                <path 
                  d="M 300 188 C 260 145, 230 105, 200 75" 
                  stroke="url(#line-voice)" 
                  strokeWidth="1.8" 
                  strokeDasharray="4 4"
                />
                <circle cx="200" cy="75" r="3" fill="#C084FC" />
                <circle cx="300" cy="188" r="3.5" fill="#FB923C" />

                {/* Connection 2: Central Vyom Agents card -> AI Concierge (bottom-left) */}
                <path 
                  d="M 300 226 C 260 270, 230 320, 200 365" 
                  stroke="url(#line-concierge)" 
                  strokeWidth="1.8" 
                  strokeDasharray="4 4"
                />
                <circle cx="200" cy="365" r="3" fill="#38BDF8" />
                <circle cx="300" cy="226" r="3.5" fill="#FB923C" />

                {/* Connection 3: Central Vyom Agents card -> Accounting Agent (right) */}
                <path 
                  d="M 400 207 C 435 207, 465 185, 500 175" 
                  stroke="url(#line-accounting)" 
                  strokeWidth="1.8" 
                  strokeDasharray="4 4"
                />
                <circle cx="500" cy="175" r="3" fill="#FBBF24" />
                <circle cx="400" cy="207" r="3.5" fill="#FB923C" />
              </svg>

              {/* 1. Floating Pill (Top-Left): AI Voice Agent */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="absolute top-[8%] sm:top-[12%] left-[4%] sm:left-[6%] z-20"
              >
                <div className="flex items-center gap-3 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl bg-slate-950/65 hover:bg-slate-950/85 backdrop-blur-xl border border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.36)] transition-all duration-300 hover:scale-[1.03]">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-[13px] text-white leading-tight">
                      AI Voice Agent
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-stone-300 font-medium leading-tight mt-0.5">
                      Never miss a call
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 2. Floating Pill (Bottom-Left): AI Concierge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute bottom-[10%] sm:bottom-[15%] left-[4%] sm:left-[6%] z-20"
              >
                <div className="flex items-center gap-3 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl bg-slate-950/65 hover:bg-slate-950/85 backdrop-blur-xl border border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.36)] transition-all duration-300 hover:scale-[1.03]">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-md shrink-0">
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-[13px] text-white leading-tight">
                      AI Concierge
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-stone-300 font-medium leading-tight mt-0.5">
                      Delight every guest
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 3. CENTER CARD (Exact Center of Building): Vyom Agents Infinity Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="absolute top-[46%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-black/85 backdrop-blur-xl border border-orange-500/60 shadow-[0_0_40px_rgba(249,115,22,0.55)] hover:border-orange-400 hover:shadow-[0_0_50px_rgba(249,115,22,0.7)] transition-all duration-300">
                  <VyomLogoIcon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 drop-shadow-[0_0_12px_rgba(249,115,22,1)]" variant="white" />
                  <span className="font-extrabold text-xs sm:text-sm text-white tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.85)] whitespace-nowrap">
                    Vyom Agents
                  </span>
                </div>
              </motion.div>

              {/* 4. Floating Pill (Right): Accounting Agent */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute top-[32%] sm:top-[34%] right-[3%] sm:right-[5%] z-20"
              >
                <div className="flex items-center gap-3 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl bg-slate-950/65 hover:bg-slate-950/85 backdrop-blur-xl border border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.36)] transition-all duration-300 hover:scale-[1.03]">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shrink-0">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-[13px] text-white leading-tight">
                      Accounting Agent
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-stone-300 font-medium leading-tight mt-0.5">
                      Automate &amp; Reconcile
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

        {/* Bottom Section: Powering the Next Generation of Businesses */}
        <div className="pt-10 sm:pt-14 border-t border-stone-200/70">
          
          {/* Eyebrow & Headline */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="text-[10.5px] sm:text-[11px] font-mono font-bold tracking-widest text-orange-600 uppercase mb-2 sm:mb-2.5 block">
              — POWERING THE NEXT GENERATION OF BUSINESSES
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-950 tracking-tight leading-tight mb-3">
              Intelligent agents. Real operational impact.
            </h3>
            <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
              We help modern businesses automate complex workflows, deliver exceptional experiences, and scale with confidence — powered by safe, reliable, and domain-specific AI agents.
            </p>
          </div>

          {/* 3 Pillars Feature Grid with Orange Pill Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            
            {/* Pillar 1: Faster Execution */}
            <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white/70 border border-stone-200/80 shadow-2xs hover:shadow-xs hover:border-orange-200/80 transition-all">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-orange-50 border border-orange-200/80 flex items-center justify-center text-orange-600 shadow-2xs shrink-0 mt-0.5">
                <Zap className="w-5 h-5 fill-orange-500/20 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm sm:text-base text-slate-950 leading-snug">
                  Faster Execution
                </h4>
                <p className="text-xs sm:text-[12.5px] text-slate-600 leading-relaxed mt-1">
                  Automate time-consuming tasks and reduce response times.
                </p>
              </div>
            </div>

            {/* Pillar 2: Scalable Operations */}
            <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white/70 border border-stone-200/80 shadow-2xs hover:shadow-xs hover:border-orange-200/80 transition-all">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-orange-50 border border-orange-200/80 flex items-center justify-center text-orange-600 shadow-2xs shrink-0 mt-0.5">
                <BarChart3 className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm sm:text-base text-slate-950 leading-snug">
                  Scalable Operations
                </h4>
                <p className="text-xs sm:text-[12.5px] text-slate-600 leading-relaxed mt-1">
                  Handle growing demands effortlessly with autonomous agents.
                </p>
              </div>
            </div>

            {/* Pillar 3: Higher ROI */}
            <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white/70 border border-stone-200/80 shadow-2xs hover:shadow-xs hover:border-orange-200/80 transition-all">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-orange-50 border border-orange-200/80 flex items-center justify-center text-orange-600 shadow-2xs shrink-0 mt-0.5">
                <ArrowUpRight className="w-5 h-5 text-orange-600 stroke-[2.5]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm sm:text-base text-slate-950 leading-snug">
                  Higher ROI
                </h4>
                <p className="text-xs sm:text-[12.5px] text-slate-600 leading-relaxed mt-1">
                  Drive measurable efficiency, profitability, and growth.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
