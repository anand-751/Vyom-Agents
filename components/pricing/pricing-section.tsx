"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, ArrowRight, Bot } from "lucide-react";

export function PricingSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const openContactModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "contact");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const tiers = [
    {
      id: "starter",
      name: "Starter",
      tagline: "Essential AI receptionist for single practices & clinics.",
      monthlyPrice: "₹14,999",
      yearlyPrice: "₹11,999",
      popular: false,
      features: [
        "Up to 400 verified calls / month",
        "1–2 Provider / staff routing",
        "Sub-second voice response latency",
        "Google & Outlook Calendar sync",
        "Hindi & English conversational fluency"
      ],
      ctaText: "Get Started",
      ctaType: "outline"
    },
    {
      id: "pro",
      name: "Professional",
      tagline: "For growing multi-provider practices & teams.",
      monthlyPrice: "₹23,999",
      yearlyPrice: "₹18,999",
      popular: true,
      features: [
        "Up to 700 verified calls / month",
        "Up to 5 Provider / doctor routing",
        "Direct carrier telephony & WebRTC",
        "Appointment rescheduling workflows",
        "Live call recording & CRM sync",
        "Priority architectural support"
      ],
      ctaText: "Get Started",
      ctaType: "primary"
    },
    {
      id: "enterprise",
      name: "Enterprise",
      tagline: "For multi-location clinics & high-volume enterprises.",
      monthlyPrice: "₹33,990",
      yearlyPrice: "₹26,990",
      popular: false,
      features: [
        "1,000+ verified calls / month",
        "10–15+ Doctors & department triage",
        "Custom EHR, ERP & CRM connectors",
        "Dedicated solutions architect",
        "24/7 Guaranteed SLA response"
      ],
      ctaText: "Get Started",
      ctaType: "outline"
    }
  ];

  return (
    <section id="pricing" className="py-16 sm:py-20 bg-[#FBFBFA] text-slate-900 border-t border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-mono font-bold tracking-widest text-orange-600 uppercase mb-2">
            — PRICING
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 leading-tight">
            Simple, transparent <span className="text-orange-600">pricing.</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Predictable monthly billing with zero hidden setup fees. Replace missed calls with guaranteed conversions.
          </p>

          {/* Pill Billing Switcher */}
          <div className="mt-6 inline-flex items-center gap-1 p-1 rounded-full bg-stone-200/70 border border-stone-300/80">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1 rounded-full text-xs font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-slate-950 text-white shadow-2xs"
                  : "text-slate-700 hover:text-slate-950"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === "yearly"
                  ? "bg-slate-950 text-white shadow-2xs"
                  : "text-slate-700 hover:text-slate-950"
              }`}
            >
              <span>Yearly</span>
              <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-orange-100 text-orange-700">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto mb-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all bg-white ${
                tier.popular
                  ? "border-2 border-orange-500 shadow-sm relative"
                  : "border border-stone-200/90 shadow-2xs hover:border-stone-300"
              }`}
            >
              <div>
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-[9.5px] font-mono font-bold uppercase tracking-wider mb-3">
                    Most Popular
                  </div>
                )}

                <div className="mb-3">
                  <h3 className="text-lg font-bold text-slate-950">{tier.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{tier.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 my-5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-mono">
                    {billingCycle === "monthly" ? tier.monthlyPrice : tier.yearlyPrice}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/month</span>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 mb-6 pt-3 border-t border-stone-100">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Pill Button */}
              <button
                onClick={openContactModal}
                className={`w-full py-2 rounded-full text-xs font-semibold transition-all active:scale-[0.98] ${
                  tier.popular
                    ? "bg-slate-950 hover:bg-slate-800 text-white shadow-2xs"
                    : "bg-white hover:bg-stone-100 text-slate-900 border border-stone-200"
                }`}
              >
                {tier.ctaText}
              </button>
            </div>
          ))}
        </div>

        {/* Custom High-Volume Enterprise Banner */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-white border border-stone-200/90 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center shrink-0 text-white shadow-2xs">
              <Bot className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-950">Bespoke Enterprise &amp; Custom Swarms</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                On-premise deployment, tailored integrations with SAP/Epic/Dentrix, and 24/7 dedicated solutions engineering.
              </p>
            </div>
          </div>

          <button
            onClick={openContactModal}
            className="w-full sm:w-auto px-5 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-900 border border-stone-300 font-semibold text-xs transition-all active:scale-[0.98] shrink-0"
          >
            Contact Sales
          </button>
        </div>

      </div>
    </section>
  );
}
