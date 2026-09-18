"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  Users, 
  ShieldCheck, 
  Calendar,
  Check,
  Building2,
  Stethoscope,
  Wrench,
  Laptop,
  Coins,
  Zap,
  TrendingDown,
  UserCheck
} from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

interface ReceptionistTier {
  id: "starter" | "professional" | "enterprise";
  name: string;
  badge?: string;
  monthlyFeeINR: number;
  telephonyFeeINR: number;
  monthlyFeeUSD: number;
  telephonyFeeUSD: number;
  maxCalls: number;
  maxDoctors: string;
  description: string;
  highlights: string[];
}

const TIERS: ReceptionistTier[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyFeeINR: 14999,
    telephonyFeeINR: 17499,
    monthlyFeeUSD: 180,
    telephonyFeeUSD: 210,
    maxCalls: 400,
    maxDoctors: "1–2 Provider / Doctor Routing",
    description: "Ideal for single-location clinics & practices starting with automated voice reception.",
    highlights: [
      "Up to 400 verified calls/month",
      "1–2 Doctor / Provider Routing",
      "Web Voice Interface + AI Receptionist",
      "Clinic Knowledge Base & FAQs",
      "Hindi, Hinglish & English Fluency",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    badge: "MOST POPULAR",
    monthlyFeeINR: 23999,
    telephonyFeeINR: 26499,
    monthlyFeeUSD: 280,
    telephonyFeeUSD: 310,
    maxCalls: 700,
    maxDoctors: "Up to 5 Doctors / Multi-Provider",
    description: "For growing practices needing multi-doctor routing, appointment rescheduling & call recording analytics.",
    highlights: [
      "Up to 700 verified calls/month",
      "Up to 5 Doctor / Provider Routing",
      "Direct Carrier Telephony + Web Voice",
      "Advanced Appointment & Reschedule Workflows",
      "Call Recording & Analytics Dashboard",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    badge: "LARGE PRACTICES",
    monthlyFeeINR: 33990,
    telephonyFeeINR: 36490,
    monthlyFeeUSD: 400,
    telephonyFeeUSD: 430,
    maxCalls: 1000,
    maxDoctors: "10–15+ Doctors & Multi-Department",
    description: "Designed for hospitals, multi-department polyclinics, and high-volume healthcare centers.",
    highlights: [
      "Up to 1,000+ calls/month (scalable to 2,000+)",
      "10–15 Doctors + Multi-Department Triage",
      "Custom Clinic Business Logic & CRM Connectors",
      "Dedicated Solutions Architect & 24/7 SLA",
      "Higher Concurrent Call Scaling",
    ],
  },
];

const SUPPORTED_INDUSTRIES = [
  { 
    id: "healthcare", 
    name: "Clinics & Healthcare", 
    icon: Stethoscope, 
    avgMissedCallLoss: 1200,
    howAgentHelps: "Handles 24/7 patient appointment bookings, doctor schedule priority routing, pre-visit intake instructions, and insurance FAQ triage without hold delays.",
    financialImpactDesc: "Deploying 24/7 healthcare AI voice reception eliminates 100% of unanswered patient after-hours calls, automates appointment scheduling into EHRs, and replaces up to 3 receptionist shifts (~120+ hrs/mo manual phone work). Preserved patient appointments add direct top-line practice revenue with zero overhead."
  },
  { 
    id: "field", 
    name: "Field Services & Repairs", 
    icon: Wrench, 
    avgMissedCallLoss: 1500,
    howAgentHelps: "Dispatches emergency technician callouts 24/7, captures job site location & issue details, schedules dispatch slots, and fires instant SMS confirmations.",
    financialImpactDesc: "Capturing emergency dispatch calls around the clock prevents high-value repair jobs from going to competitors. Automates job site intake, location logging, and tech notifications—saving ~130+ dispatch hours monthly and directly boosting completed service job revenue."
  },
  { 
    id: "saas", 
    name: "B2B SaaS & Tech", 
    icon: Laptop, 
    avgMissedCallLoss: 2500,
    howAgentHelps: "Qualifies high-intent inbound demo leads, books AE calendar slots directly, triages urgent support tickets, and syncs custom requirements into CRM.",
    financialImpactDesc: "Instantly qualifies inbound voice prospects against ideal buyer profiles and books AE discovery calls on calendars in real time. Eliminates slow email follow-ups, saves ~140+ SDR phone hours monthly, and maximizes high-ACV deal conversion speed."
  },
  { 
    id: "client-intake", 
    name: "Enterprise Client Intake", 
    icon: Building2, 
    avgMissedCallLoss: 1800,
    howAgentHelps: "Screens high-value client inquiries, collects consultation criteria, verifies preliminary case details, and schedules partner discovery calls.",
    financialImpactDesc: "Streamlines multi-department client intake, verifies preliminary consultation criteria, and routes priority accounts to partners instantly. Replaces manual phone desk shifts (~150+ hours saved monthly), ensuring premium client retention and zero dropped leads."
  },
];

export function RoiCalculator() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedTierId, setSelectedTierId] = useState<"starter" | "professional" | "enterprise">("professional");
  const [includeTelephony, setIncludeTelephony] = useState<boolean>(false);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [selectedIndustry, setSelectedIndustry] = useState(SUPPORTED_INDUSTRIES[0]);
  const [estimatedMonthlyCalls, setEstimatedMonthlyCalls] = useState<number>(700);

  // Sync tier tab click with slider position
  const handleSelectTier = (tierId: "starter" | "professional" | "enterprise") => {
    setSelectedTierId(tierId);
    const targetTier = TIERS.find((t) => t.id === tierId);
    if (targetTier) {
      setEstimatedMonthlyCalls(targetTier.maxCalls);
    }
  };

  // Sync slider drag with active tier selection
  const handleSliderChange = (calls: number) => {
    setEstimatedMonthlyCalls(calls);
    if (calls <= 400) {
      setSelectedTierId("starter");
    } else if (calls <= 700) {
      setSelectedTierId("professional");
    } else {
      setSelectedTierId("enterprise");
    }
  };

  const activeTier = TIERS.find((t) => t.id === selectedTierId) || TIERS[1];

  // Base pricing
  const basePrice = currency === "INR"
    ? (includeTelephony ? activeTier.telephonyFeeINR : activeTier.monthlyFeeINR)
    : (includeTelephony ? activeTier.telephonyFeeUSD : activeTier.monthlyFeeUSD);

  // Scaled pricing calculation for high volume (over tier max up to 2000 calls)
  const isOverTierCap = estimatedMonthlyCalls > activeTier.maxCalls;
  const extraCallVolume = Math.max(0, estimatedMonthlyCalls - activeTier.maxCalls);
  const perCallRate = currency === "INR" ? 33 : 0.40;
  const totalMonthlyCost = basePrice + Math.round(extraCallVolume * perCallRate);

  // Human receptionist benchmark: ₹75,000/mo ($900/mo) for 24/7 3-shift coverage
  const human24x7Cost = estimatedMonthlyCalls > 1000
    ? (currency === "INR" ? 120000 : 1500)
    : (currency === "INR" ? 75000 : 900);

  const directMonthlySavings = Math.max(0, human24x7Cost - totalMonthlyCost);

  // Formula: 30% of selected calls saved/booked * doctor fee (₹500 / $6)
  const savedBookings = Math.round(estimatedMonthlyCalls * 0.30);
  const doctorConsultFee = currency === "INR" ? 500 : 6;
  const recoveredRevenue = savedBookings * doctorConsultFee;

  const totalValueGenerated = directMonthlySavings + recoveredRevenue;
  const roiMultiplier = (totalValueGenerated / Math.max(1, totalMonthlyCost)).toFixed(1);

  const handleOpenDiscovery = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "contact");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section id="roi" className="py-24 relative bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100/90 text-sky-800 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm border border-sky-200"
          >
            <Calculator className="w-3.5 h-3.5 text-sky-600" />
            <span>Interactive Business ROI & Volume Configurator</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950"
          >
            AI Voice Receptionist <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Interactive Pricing & ROI Calculator</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed"
          >
            Select your tier and drag the monthly call volume slider up to <strong>2,000 calls</strong> to project direct labor cost savings and recovered revenue in real time.
          </motion.p>
        </div>

        {/* Master Consolidated Interactive ROI Calculator Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto rounded-3xl bg-slate-950 text-white p-4 sm:p-8 md:p-10 shadow-2xl border border-slate-800 relative overflow-hidden group"
        >
          {/* Subtle Background Glow Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-sky-500/15 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Card Header Controls: Plan Tiers Selector + Currency & Telephony Switchers */}
          <div className="pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-slate-800 space-y-5 sm:space-y-6">
            
            {/* Top Bar: Tier Selector Tabs */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold flex items-center gap-1.5 mb-1">
                  <Coins className="w-3.5 h-3.5 text-sky-400" />
                  Select Official Receptionist Tier
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Customized for Your Practice Size
                </h3>
              </div>

              {/* Tier Pill Switcher */}
              <div className="flex bg-slate-900 p-1 sm:p-1.5 rounded-2xl border border-slate-800/90 shadow-inner w-full lg:w-auto">
                {TIERS.map((tier) => {
                  const isSelected = selectedTierId === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => handleSelectTier(tier.id)}
                      className={`flex-1 lg:flex-none px-2.5 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all relative ${
                        isSelected
                          ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                      }`}
                    >
                      <span>{tier.name}</span>
                      {tier.badge && isSelected && (
                        <span className="ml-1 sm:ml-1.5 px-1 py-0.2 rounded text-[8px] sm:text-[9px] bg-white/20 font-mono">
                          ★
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Currency & Telephony Switch Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-3 sm:p-3.5 rounded-2xl border border-slate-800/80 text-xs">
              
              {/* Currency Selector */}
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold">Currency:</span>
                <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
                  <button
                    onClick={() => setCurrency("INR")}
                    className={`px-3 py-1 rounded-md font-bold transition-all ${
                      currency === "INR" ? "bg-sky-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    ₹ INR
                  </button>
                  <button
                    onClick={() => setCurrency("USD")}
                    className={`px-3 py-1 rounded-md font-bold transition-all ${
                      currency === "USD" ? "bg-sky-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    $ USD
                  </button>
                </div>
              </div>

              {/* Telephony Channel Option */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-slate-400 font-semibold">Channel:</span>
                <button
                  onClick={() => setIncludeTelephony(!includeTelephony)}
                  className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-2 border transition-all text-xs ${
                    includeTelephony
                      ? "bg-sky-950/80 border-sky-500 text-sky-300 shadow-sm"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  <PhoneCall className={`w-3.5 h-3.5 ${includeTelephony ? "text-sky-400" : "text-slate-500"}`} />
                  <span>{includeTelephony ? "Carrier Phone Included" : "Web Voice Only"}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Card Body: Interactive Inputs (Left) & Financial Output (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Inputs Column */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Active Tier Info Box */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-extrabold text-white">{activeTier.name} Plan</span>
                    {activeTier.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-sky-950 text-sky-400 border border-sky-800">
                        {activeTier.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-white font-mono">
                      {currency === "INR" ? `₹${totalMonthlyCost.toLocaleString()}` : `$${totalMonthlyCost.toLocaleString()}`}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block">/ month</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {activeTier.description}
                </p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span className="text-slate-400">Base Plan Cap: <strong className="text-sky-400">{activeTier.maxCalls} calls</strong></span>
                  <span className="text-slate-400">Routing: <strong className="text-white">{activeTier.maxDoctors}</strong></span>
                </div>
              </div>

              {/* Industry / Practice Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Select Practice / Business Type:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SUPPORTED_INDUSTRIES.map((ind) => {
                    const Icon = ind.icon;
                    const isIndSelected = selectedIndustry.id === ind.id;
                    return (
                      <button
                        key={ind.id}
                        onClick={() => setSelectedIndustry(ind)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-medium flex items-center gap-2 transition-all ${
                          isIndSelected
                            ? "bg-sky-950/90 border-sky-500 text-white shadow-sm ring-1 ring-sky-400"
                            : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isIndSelected ? "text-sky-400" : "text-slate-500"}`} />
                        <span className="truncate">{ind.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Call Volume Slider Container (50 to 2,000 calls) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-200 tracking-wide">
                    Estimated Monthly Inbound Calls:
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-sky-950/80 border border-sky-800 text-sky-400 font-mono font-bold text-xs">
                    <PhoneCall className="w-3 h-3 text-sky-400 shrink-0" />
                    <span>{estimatedMonthlyCalls.toLocaleString()} calls / mo</span>
                  </div>
                </div>
                
                <div className="pt-1">
                  <input
                    type="range"
                    min={50}
                    max={2000}
                    step={50}
                    value={estimatedMonthlyCalls}
                    onChange={(e) => handleSliderChange(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500/50"
                  />
                </div>

                <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-0">
                  <span className={estimatedMonthlyCalls <= 400 ? "text-sky-400 font-bold" : ""}>400 calls (₹15k)</span>
                  <span className={estimatedMonthlyCalls > 400 && estimatedMonthlyCalls <= 700 ? "text-sky-400 font-bold" : ""}>700 calls (₹24k)</span>
                  <span className={estimatedMonthlyCalls > 700 && estimatedMonthlyCalls <= 1000 ? "text-sky-400 font-bold" : ""}>1,000 calls (₹33k)</span>
                  <span className={estimatedMonthlyCalls > 1000 ? "text-sky-400 font-bold" : ""}>2,000 calls</span>
                </div>

                {/* Dynamic Live Formula Breakdown Box */}
                <div className="p-3 rounded-xl bg-sky-950/60 border border-sky-800/70 text-[11px] font-mono text-sky-200 space-y-1.5 mt-2">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Total Selected Calls:</span>
                    <strong className="text-white font-bold">{estimatedMonthlyCalls.toLocaleString()} calls</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-[10px] uppercase font-bold text-sky-400">30% Preserved Calls:</span>
                    <strong className="text-sky-300 font-bold">30% × {estimatedMonthlyCalls} = {savedBookings} calls saved</strong>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-sky-800/60 text-emerald-400 font-bold">
                    <span className="text-[10px] uppercase font-bold text-emerald-400">Revenue Profit ({savedBookings} × {currency === "INR" ? "₹500" : "$6"}):</span>
                    <span className="text-xs font-mono font-extrabold">{currency === "INR" ? `₹${recoveredRevenue.toLocaleString()}` : `$${recoveredRevenue.toLocaleString()}`} / mo</span>
                  </div>
                </div>

                {isOverTierCap && (
                  <div className="p-2.5 rounded-lg bg-sky-950/70 border border-sky-800/80 text-[10px] text-sky-300 font-mono flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-sky-400 shrink-0" />
                      <span>Volume beyond {activeTier.maxCalls} call cap</span>
                    </span>
                    <span className="font-bold text-white bg-sky-900/60 px-1.5 py-0.5 rounded border border-sky-700/60">
                      Custom Scaled Rate
                    </span>
                  </div>
                )}
              </div>

            </div>

            {/* Right Financial Projections Column */}
            <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-4 sm:space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Projected Financial Impact
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {roiMultiplier}x Net ROI
                </span>
              </div>

              {/* 2 Key Result Metric Cards */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                
                <div className="p-3 sm:p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono block">Direct Labor Savings</span>
                  <span className="text-lg sm:text-2xl font-extrabold text-emerald-400 font-mono mt-1 block truncate">
                    {currency === "INR" ? `₹${directMonthlySavings.toLocaleString()}` : `$${directMonthlySavings.toLocaleString()}`}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 block mt-1">vs 24/7 human desk</span>
                </div>

                <div className="p-3 sm:p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono block">Preserved Revenue</span>
                  <span className="text-lg sm:text-2xl font-extrabold text-sky-400 font-mono mt-1 block truncate">
                    {currency === "INR" ? `₹${recoveredRevenue.toLocaleString()}` : `$${recoveredRevenue.toLocaleString()}`}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 block mt-1">~{savedBookings} saved calls @ {currency === "INR" ? "₹500" : "$6"} fee</span>
                </div>

              </div>

              {/* Financial & Operational Impact Description Box (Max 70 Words) - Dynamic Per Domain */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 text-xs text-slate-300 leading-relaxed space-y-2">
                <div className="flex items-center gap-2 font-bold text-white text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>How Vyom Saves Manual Work & Boosts Revenue ({selectedIndustry.name})</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={selectedIndustry.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-[11px] text-slate-300 leading-normal"
                  >
                    {selectedIndustry.financialImpactDesc}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Financial Specs */}
              <div className="space-y-2 text-xs text-slate-300 pt-1">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Total Calculated Monthly Fee:</span>
                  <span className="font-mono font-bold text-white">
                    {currency === "INR" ? `₹${totalMonthlyCost.toLocaleString()}` : `$${totalMonthlyCost.toLocaleString()}`} / month
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <span className="text-slate-400">30% Preserved Calls & Revenue Profit:</span>
                  <span className="font-mono font-bold text-emerald-400">{savedBookings} calls saved ({currency === "INR" ? "₹500" : "$6"} / fee)</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Implementation SLA:</span>
                  <span className="font-mono font-bold text-purple-300">Live Telephony in 48 Hours</span>
                </div>
              </div>

              {/* Action Button with Vengeance UI ShimmerButton */}
              <ShimmerButton
                onClick={handleOpenDiscovery}
                className="w-full py-3.5 rounded-full text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <span>Book Live Demo for {activeTier.name} Plan</span>
                <ArrowRight className="w-4 h-4" />
              </ShimmerButton>

            </div>

          </div>

          {/* Bottom Highlights List */}
          <div className="mt-8 pt-6 border-t border-slate-800/90 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
            {activeTier.highlights.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}


