import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Stethoscope, 
  Scale, 
  Wrench, 
  Home, 
  UtensilsCrossed, 
  Car, 
  Landmark, 
  Sparkles, 
  TrendingUp,
  Monitor
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { FooterSection } from "@/components/footer/footer-section";
import { TabModalController } from "@/components/modals/tab-modal-controller";
import { FloatingChatWidget } from "@/components/chat/floating-chat-widget";

export const metadata: Metadata = {
  title: "AI Receptionist (Voice Agents): The Enterprise Executive Guide | Vyom Agents",
  description:
    "An executive guide to deploying autonomous AI Voice Receptionists. Comprehensive competitor analysis, revenue math on missed calls, and industry-by-industry customer service architecture.",
  keywords: [
    "AI Receptionist (Voice Agents)",
    "AI Voice Agent Competitor Analysis",
    "Enterprise Voice Automation",
    "Healthcare AI Receptionist",
    "Legal Intake AI",
    "HVAC Home Services Voice AI",
    "Vyom Agents Voice AI"
  ],
  openGraph: {
    title: "AI Receptionist (Voice Agents): The Enterprise Executive Guide",
    description: "Competitor comparison, operational ROI, and industry-by-industry customer service architecture.",
    url: "https://vyom-agents.vercel.app/blogs/ai-receptionist",
    siteName: "Vyom Agents",
    type: "article",
  },
};

export default function AiReceptionistBlogPage() {
  return (
    <main className="min-h-screen bg-[#070A10] text-white selection:bg-orange-500 selection:text-white">
      {/* Universal Navbar */}
      <Suspense fallback={<div className="h-16 w-full" />}>
        <Navbar />
      </Suspense>

      {/* Top Ambient Glow Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-12 left-1/3 w-[650px] h-[320px] bg-orange-500/12 rounded-full blur-[130px]" />
        <div className="absolute top-28 right-1/4 w-[500px] h-[260px] bg-amber-500/10 rounded-full blur-[110px]" />
      </div>

      <div className="relative z-10 pt-28 sm:pt-32 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
          <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <Link href="/blogs" className="hover:text-white transition-colors">
            <span>Blog</span>
          </Link>
          <span>/</span>
          <span className="text-orange-400 font-semibold">AI Receptionist (Voice Agents)</span>
        </div>

        {/* Dual-Article Selector Switcher Bar */}
        <div className="p-1.5 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col sm:flex-row items-center gap-2 shadow-xl">
          <Link
            href="/blogs"
            className="w-full sm:w-1/2 p-3 rounded-xl bg-stone-950/50 hover:bg-stone-800/80 border border-stone-800 hover:border-stone-700 text-left flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-stone-600 group-hover:bg-orange-400 transition-colors" />
              <div>
                <span className="text-[10px] font-mono text-stone-400 group-hover:text-orange-400 uppercase tracking-wider block transition-colors">Featured Video Showcase</span>
                <span className="text-xs sm:text-sm font-semibold text-stone-300 group-hover:text-white transition-colors">AI Concierge App (Live Demos)</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-stone-400 group-hover:text-orange-400 flex items-center gap-1 transition-colors">
              <span>View</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          <div className="w-full sm:w-1/2 p-3 rounded-xl bg-orange-500/15 border border-orange-500/40 text-left flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              <div>
                <span className="text-[10px] font-mono text-orange-400 uppercase tracking-wider block font-bold">Enterprise Solution</span>
                <span className="text-xs sm:text-sm font-bold text-white">AI Receptionist (Voice Agents)</span>
              </div>
            </div>
            <span className="text-[11px] font-mono bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded font-bold">Active</span>
          </div>
        </div>

        {/* Article Header */}
        <header className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>EXECUTIVE BRIEFING &amp; INDUSTRY PLAYBOOK</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
            AI Receptionist (Voice Agents): <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
              Autonomous 24/7 Voice Intelligence
            </span>{" "}
            for Modern Enterprise
          </h1>

          <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-3xl">
            In competitive markets, the greatest source of revenue attrition isn&apos;t marketing inefficiency—it is the unanswered incoming phone call. Explore how enterprise organizations eliminate hold times, capture high-intent after-hours demand, and replace legacy call centers with deterministic, sub-second conversational voice agents.
          </p>

          {/* Author & Timestamp Bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs text-stone-400 border-t border-stone-800/80">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold text-xs">
                V
              </div>
              <span className="text-stone-200 font-medium">Vyom Agents Solutions Architecture</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>7 min read • Enterprise Executive Brief</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>14-Day Production SLA</span>
            </div>
          </div>
        </header>

        {/* Executive Impact Highlights Banner */}
        <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 text-orange-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Zap className="w-4 h-4" />
            <span>Executive Performance Summary</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1">
              <span className="text-stone-400 block text-[11px] font-mono uppercase">Inbound Retention</span>
              <p className="text-white font-semibold">85% of callers who hit voicemail hang up and contact a competitor immediately.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1">
              <span className="text-stone-400 block text-[11px] font-mono uppercase">Concurrency SLA</span>
              <p className="text-white font-semibold">15+ simultaneous concurrent calls answered on ring one with sub-600ms streaming latency.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1">
              <span className="text-stone-400 block text-[11px] font-mono uppercase">Operational Efficiency</span>
              <p className="text-white font-semibold">Cuts frontline desk phone load by 70% while capturing 100% of after-hours appointment revenue.</p>
            </div>
          </div>
        </div>

        {/* MAIN BODY OF ARTICLE */}
        <article className="space-y-14 text-stone-300 leading-relaxed text-sm sm:text-base">
          
          {/* SECTION 1: THE REAL PROBLEM */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="text-orange-500 font-mono">01.</span>
              <span>The Operational Cost of Missed Inbound Demand</span>
            </h2>
            <p>
              Across frontline enterprises—from multi-provider medical clinics and legal partnerships to automotive dealerships and commercial contracting firms—the telephone remains the highest-converting customer acquisition channel. Callers represent high-intent buyers seeking immediate resolution.
            </p>
            <p>
              Yet, traditional operations introduce severe physical bottlenecks: staff assisting in-person clients, peak-hour call surges, and after-hours operational blackouts.
            </p>
            <p>
              Industry telemetry reveals a clear reality: <strong>over 85% of callers who encounter voicemail do not leave a message</strong>. They immediately return to search results and dial the next service provider.
            </p>

            <div className="p-5 rounded-2xl bg-orange-950/30 border border-orange-500/30 text-stone-200 space-y-2">
              <h4 className="font-bold text-orange-400 text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Quantifying Pipeline Attrition</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-300">
                In an enterprise where client or patient lifetime value (LTV) averages $1,500, forfeiting just <strong>two missed inquiries per business day</strong> represents over <strong>$700,000 in annualized top-line revenue lost</strong> directly to responsive market competitors.
              </p>
            </div>
          </section>

          {/* SECTION 2: CORE ARCHITECTURE */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="text-orange-500 font-mono">02.</span>
              <span>Core Architecture: How the Autonomous Voice Agent Operates</span>
            </h2>
            <p>
              The Vyom AI Receptionist is not a rigid interactive voice response (IVR) phone tree, nor is it a brittle text-to-speech script. It is an autonomous, multi-tiered conversational voice intelligence engineered on real-time neural streaming pipelines:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                  01
                </div>
                <h4 className="font-semibold text-white text-sm">Sub-600ms Real-Time Audio Streaming</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Leveraging high-speed neural audio pipelines, the agent streams conversational responses in under 600 milliseconds, eliminating awkward machine pauses.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                  02
                </div>
                <h4 className="font-semibold text-white text-sm">Natural Interruption Handling</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Callers can interrupt mid-sentence with clarifications, corrections, or new questions. The voice engine gracefully yields and recalibrates in real time.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                  03
                </div>
                <h4 className="font-semibold text-white text-sm">Bidirectional Calendar &amp; CRM Sync</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Queries real-time availability across enterprise calendars (Google Workspace, Microsoft Outlook, Dentrix, Clio, ServiceTitan) and writes verified appointment records.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                  04
                </div>
                <h4 className="font-semibold text-white text-sm">Deterministic Policy Guardrails</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Operates strictly within your company&apos;s verified pricing, clinical intake rules, and escalation protocols. Zero factual hallucination.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3: COMPETITOR ANALYSIS */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="text-orange-500 font-mono">03.</span>
              <span>Enterprise Competitor Analysis &amp; Operational Benchmarks</span>
            </h2>
            <p>
              A comparative evaluation against legacy answering services, outsourced BPO call centers, and first-generation DIY voice wrappers:
            </p>

            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-stone-950/80 shadow-2xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-stone-800 bg-stone-900/90 text-stone-300 font-mono">
                    <th className="p-3.5 sm:p-4">Operational Dimension</th>
                    <th className="p-3.5 sm:p-4 text-stone-400">Human Answering Services (e.g., Ruby)</th>
                    <th className="p-3.5 sm:p-4 text-stone-400">First-Gen DIY Voice Bots (Bland / Retell)</th>
                    <th className="p-3.5 sm:p-4 text-orange-400 font-bold bg-orange-500/10">Vyom AI Receptionist (Voice Agents)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 text-stone-300">
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">Cost Predictability</td>
                    <td className="p-3.5 sm:p-4 text-rose-400">$600 - $3,000/mo (Overage penalties per minute)</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">Unpredictable raw API token usage + dev labor</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">Transparent enterprise tiering with zero call caps</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">Concurrent Call Throughput</td>
                    <td className="p-3.5 sm:p-4 text-rose-400">Single call queue (Excess callers placed on hold)</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">Scalable, but prone to concurrency throttling</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">15+ Concurrent Call Ingestion with Zero Hold Time</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">Speech Fluidity &amp; Latency</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">Human, but variable script adherence</td>
                    <td className="p-3.5 sm:p-4 text-rose-400">1.8s - 3.2s latency (Robotic pauses, talks over users)</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">&lt; 600ms Real-Time Streaming (Human Cadence)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">Direct Calendar &amp; CRM Sync</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">Manual message slips; frequent typos in intake</td>
                    <td className="p-3.5 sm:p-4 text-rose-400">Requires complex custom webhook development</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">Native Two-Way Calendar &amp; CRM Synchronization</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">Hallucination &amp; Policy Guardrails</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">Human agents frequently misstate policies</td>
                    <td className="p-3.5 sm:p-4 text-rose-400">High risk of hallucinating unapproved terms</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">Deterministic Policy Guardrails (Zero Guesswork)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">Implementation Overhead</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">Staff onboarding &amp; recurring turnover cycles</td>
                    <td className="p-3.5 sm:p-4 text-rose-400">Requires dedicated software engineering team</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">Turnkey Deployment managed by Vyom Engineers in 14 Days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-bold text-white">The Engineering Flaw of Generic Voice Wrappers:</h3>
              <p>
                First-generation voice bots built on raw open-source wrappers frequently fail in commercial deployments due to three technical flaws: high round-trip latency, inability to recover gracefully when interrupted, and absence of schema-enforced output guardrails.
              </p>
              <p>
                Vyom Agents deploys an isolated execution harness with deterministic policy assertions. If an ambiguous or non-standard customer edge case emerges, the agent executes a structured fallback protocol—either transferring the caller to designated on-duty personnel or compiling an emergency priority ticket.
              </p>
            </div>
          </section>

          {/* SECTION 4: INDUSTRY BY INDUSTRY BREAKDOWN */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-orange-500 font-mono">04.</span>
                <span>Industry-Specific Customer Service Architecture at Scale</span>
              </h2>
              <p className="text-stone-400 text-sm">
                How the AI Receptionist is configured across key frontline enterprise verticals:
              </p>
            </div>

            {/* Industry 1: Healthcare */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">1. Healthcare, Dental &amp; Specialty Health Networks</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300">
                Patient intake requires empathy, precision, and compliance. The voice agent handles high-volume appointment booking, pre-procedure guidance, and emergency triage without hold queues.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Direct schedule sync into Dentrix, Epic, and AthenaHealth</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Insurance carrier verification &amp; pre-appointment prep FAQ</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Automated SMS appointment confirmations and calendar invites</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Strict clinical escalation protocols for acute medical symptoms</span>
                </div>
              </div>
            </div>

            {/* Industry 2: Legal Firms */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">2. Law Firms &amp; Professional Advisory</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300">
                For personal injury, litigation, corporate, and family law practices, lead intake latency directly impacts case acquisition. The agent conducts confidential, structured case qualification 24/7.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Structured intake gathering key facts, jurisdiction, and timelines</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Preliminary conflict-of-interest pre-screening assertions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Discovery consultation booking directly on attorney calendars</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Bidirectional sync with Clio, MyCase, and LawPay platforms</span>
                </div>
              </div>
            </div>

            {/* Industry 3: Home Services */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">3. Commercial &amp; Residential Field Services (HVAC, Plumbing, Electrical)</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300">
                In emergency field trades, speed to response determines job win rates. When systems fail during extreme weather, the agent dispatches technicians and books repair jobs instantly.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Zero missed emergency service calls during peak dispatch hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Captures caller location, equipment make/model, and issue urgency</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Native integration into ServiceTitan, Housecall Pro, and Jobber</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Dispatches high-priority notifications to on-call field technicians</span>
                </div>
              </div>
            </div>

            {/* Industry 4: Real Estate */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Home className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">4. Real Estate Brokerages, Asset Management &amp; Leasing</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300">
                Prospective buyers and corporate tenants calling from sign riders or digital portals require instantaneous scheduling. The agent qualifies intent and books property tours.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Pre-qualifies buyers by financing verification, budget, and move date</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Schedules agent-accompanied or automated self-guided walkthroughs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Tenant maintenance intake routing directly to property managers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Live warm transfer of high-value investors directly to listing brokers</span>
                </div>
              </div>
            </div>

            {/* Industry 5: Hospitality */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">5. Hospitality, Luxury Resorts &amp; Fine Dining</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300">
                During dinner service or guest check-in rushes, front-desk staff cannot balance phone lines with in-person VIP service. The voice agent handles reservations and property inquiries seamlessly.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Direct table reservation booking through OpenTable and Resy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Answers property policies, valet parking, and private event packages</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Captures banquet inquiries and routes RFPs to event directors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Integrates with the Vyom AI Concierge for guest self-service</span>
                </div>
              </div>
            </div>

            {/* Industry 6: Automotive */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Car className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">6. Automotive Dealership Groups &amp; Service Centers</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300">
                Fixed operations and service lanes generate significant high-margin revenue but suffer from dropped customer calls. The agent handles service scheduling and test-drive inquiries.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Schedules routine maintenance, warranty work, and recall service</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Ingests vehicle VIN, mileage, and reported customer symptoms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Schedules showroom appointments and test drives for active inventory</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Syncs directly with CDK Global, Reynolds &amp; Reynolds, and DealerSocket</span>
                </div>
              </div>
            </div>

            {/* Industry 7: Wealth Management */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Landmark className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">7. Wealth Management, CPA &amp; Insurance Underwriting</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300">
                During cyclical surges—such as annual tax deadlines or benefits enrollment—advisors cannot spend hours answering repetitive procedural questions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Dispatches pre-meeting documentation checklists automatically</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Pre-qualifies asset size, entity structure, and advisory scope</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Enterprise data governance: zero training on sensitive financial numbers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Direct synchronization with Wealthbox, Redtail, and Salesforce Financial</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: ENTERPRISE DEPLOYMENT METHODOLOGY */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="text-orange-500 font-mono">05.</span>
              <span>Enterprise Implementation Methodology (14-Day Production Rollout)</span>
            </h2>
            <p>
              Deploying voice automation requires zero internal engineering overhead from your team. Vyom Agents manages the rollout via our turnkey 3-phase framework:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                <span className="text-xs font-mono text-orange-400 font-bold block">PHASE 1: DAYS 1 - 4</span>
                <h4 className="font-bold text-white text-sm">Knowledge Ingestion &amp; Schema Mapping</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Ingestion of corporate knowledge bases, scheduling constraints, CRM schemas, and escalation parameters into secure vector structures.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                <span className="text-xs font-mono text-orange-400 font-bold block">PHASE 2: DAYS 5 - 10</span>
                <h4 className="font-bold text-white text-sm">Telephony Sandbox &amp; Boundary Testing</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Calibration of voice latency, interruption recovery, and boundary cases on private sandbox telephone numbers prior to production cutover.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                <span className="text-xs font-mono text-orange-400 font-bold block">PHASE 3: DAYS 11 - 14</span>
                <h4 className="font-bold text-white text-sm">Zero-Downtime SIP / PBX Cutover</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Seamless SIP trunking or conditional carrier call-forwarding. Immediate 24/7 autonomous reception with zero hardware requirements.
                </p>
              </div>
            </div>
          </section>

        </article>

        {/* BOTTOM CALL TO ACTION BANNER */}
        <section className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-orange-950/40 border border-stone-800 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-mono">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>ENTERPRISE DISCOVERY &amp; DEMONSTRATION</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-bold text-white max-w-2xl mx-auto tracking-tight">
            Schedule a Technical Discovery Call for Your Organization
          </h3>

          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Connect with our systems architects to evaluate your inbound call volume, review CRM integration surfaces, and test a private voice simulation tailored to your brand.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/?modal=contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-orange-500/30 hover:scale-[1.02] transition-all"
            >
              <span>Book Enterprise Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/blogs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-stone-800/80 hover:bg-stone-700/80 text-stone-200 font-medium text-xs sm:text-sm border border-stone-700 transition-all"
            >
              <Monitor className="w-4 h-4 text-stone-400" />
              <span>View AI Concierge Video Demos</span>
            </Link>
          </div>
        </section>

      </div>

      {/* Universal Footer */}
      <Suspense fallback={null}>
        <FooterSection />
      </Suspense>

      {/* Modals & Chat Widget */}
      <Suspense fallback={null}>
        <TabModalController />
      </Suspense>

      <Suspense fallback={null}>
        <FloatingChatWidget />
      </Suspense>
    </main>
  );
}
