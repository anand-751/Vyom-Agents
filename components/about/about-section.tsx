"use client";

import React from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const openContactModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "contact");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section id="about" className="py-16 sm:py-20 bg-white text-slate-900 border-t border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-[11px] font-mono font-bold tracking-widest text-orange-600 uppercase mb-2">
              — ABOUT US
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 leading-tight mb-4">
              We believe in a future <br className="hidden sm:block" />
              built with AI agents.
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 max-w-xl">
              Vyom Agents is an enterprise Agentic AI SaaS company engineering domain-specific autonomous agents that augment human potential and solve real operational bottlenecks.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 max-w-xl">
              From conversational voice receptionists answering 24/7 client inquiries to autonomous accounting operations swarms, we engineer deterministic systems backed by strict safety guardrails and zero data retention.
            </p>

            {/* Pill CTA Button matching template */}
            <button
              onClick={openContactModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs transition-all active:scale-[0.98] shadow-sm group"
            >
              <span>Our Mission</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Right Column: Exact Architecture Image from Mockup */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/90 h-[340px] sm:h-[380px] w-full">
              
              <Image
                src="/images/about_architecture.jpg"
                alt="Modern curved architecture building at sunset"
                fill
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              {/* Text overlay on building (Matching Template) */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                  Human Potential. <br />
                  <span className="text-orange-400">Amplified.</span>
                </div>
                <p className="text-[11px] text-stone-300 font-mono mt-1">
                  Deterministic autonomous systems.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
