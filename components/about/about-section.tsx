"use client";

import React from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Zap, 
  BarChart3, 
  ArrowUpRight 
} from "lucide-react";

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

          {/* Right Column: Architectural Headquarters Showcase with User's Exact Composite Graphic */}
          <div className="lg:col-span-7 w-full">
            <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden border border-stone-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.12)] aspect-[16/9] w-full bg-slate-950 group select-none">
              <Image
                src="/images/about_architecture.jpg"
                alt="Vyom Agents Autonomous AI Architecture Headquarters"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
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
