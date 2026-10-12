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
  Building2, 
  Stethoscope, 
  Scale, 
  Wrench, 
  Home, 
  UtensilsCrossed, 
  Car, 
  Landmark, 
  Sparkles, 
  XCircle,
  HelpCircle,
  TrendingUp,
  Users
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { FooterSection } from "@/components/footer/footer-section";
import { TabModalController } from "@/components/modals/tab-modal-controller";
import { FloatingChatWidget } from "@/components/chat/floating-chat-widget";

export const metadata: Metadata = {
  title: "The Non-Technical Business Guide to AI Receptionists | Vyom Agents",
  description:
    "Discover how growing businesses replace missed calls with human-like AI Voice Receptionists. Read our honest competitor analysis, ROI breakdown, and industry-by-industry playbook for scaling customer service.",
  keywords: [
    "AI Receptionist for Business",
    "AI Voice Agent Competitor Analysis",
    "Customer Service Automation",
    "Healthcare AI Receptionist",
    "Legal Intake AI",
    "HVAC Home Services Voice AI",
    "Vyom Agents Voice AI"
  ],
  openGraph: {
    title: "Why Growing Businesses Are Replacing Voicemail with AI Receptionists",
    description: "Honest competitor comparison, real-world ROI, and heading-by-heading industry guide.",
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
          <span className="text-orange-400 font-semibold">AI Receptionist Business Guide</span>
        </div>

        {/* Article Header */}
        <header className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>EXECUTIVE PLAYBOOK & COMPETITOR BENCHMARK</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
            The Non-Technical Business Guide to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
              AI Receptionists:
            </span>{" "}
            Never Miss a High-Value Customer Again
          </h1>

          <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-3xl">
            If you run a clinic, law firm, dealership, or service business, your biggest competitor isn&apos;t the company down the street—it&apos;s your voicemail. Here is how autonomous voice AI picks up on the first ring, books real appointments, and outperforms traditional call centers at a fraction of the cost.
          </p>

          {/* Author & Timestamp Bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs text-stone-400 border-t border-stone-800/80">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold text-xs">
                V
              </div>
              <span className="text-stone-200 font-medium">Vyom Agents Strategic Advisory</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>7 min read • Written for Founders & Operators</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Turnkey 14-Day Deployment</span>
            </div>
          </div>
        </header>

        {/* Quick Highlights Box for Busy Execs */}
        <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-orange-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <Zap className="w-4 h-4" />
            <span>Executive Summary in 30 Seconds</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1">
              <span className="text-stone-400 block text-[11px]">The Problem</span>
              <p className="text-white font-medium">85% of callers who reach voicemail never call back. They hire whoever answers first.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1">
              <span className="text-stone-400 block text-[11px]">The Solution</span>
              <p className="text-white font-medium">An AI voice agent that sounds warmly human, handles 15+ calls at once, and books into your calendar.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1">
              <span className="text-stone-400 block text-[11px]">The Bottom Line</span>
              <p className="text-white font-medium">Cuts front-desk phone load by 70%, captures after-hours sales, and costs 80% less than human call centers.</p>
            </div>
          </div>
        </div>

        {/* MAIN BODY OF ARTICLE */}
        <article className="space-y-14 text-stone-300 leading-relaxed text-sm sm:text-base">
          
          {/* SECTION 1: THE REAL PROBLEM */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="text-orange-500 font-mono">01.</span>
              <span>The Expensive Bleed: What Really Happens When Your Phone Rings</span>
            </h2>
            <p>
              Picture this familiar Tuesday afternoon scenario: Your front-desk coordinator is currently greeting an in-person client, answering a question about an invoice, and checking the computer screen. Suddenly, line one rings. Three seconds later, line two rings.
            </p>
            <p>
              Neither call gets answered in time. Both roll to voicemail.
            </p>
            <p>
              In your mind, you assume: <em className="text-stone-200">&ldquo;They will leave a message and we&apos;ll call them right back.&rdquo;</em> But consumer behavior studies tell a brutal truth: <strong>over 85% of callers who hit voicemail do not leave a message</strong>. Instead, they hit the back button on Google search and call the next business on the list.
            </p>
            <div className="p-5 rounded-2xl bg-orange-950/30 border border-orange-500/30 text-stone-200 space-y-2">
              <h4 className="font-bold text-orange-400 text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>The Revenue Math You Cannot Afford to Ignore</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-300">
                If your average customer or patient lifetime value is $1,200, and your business misses just <strong>2 qualified calls per day</strong>, you are forfeiting <strong>$60,000+ every single month</strong> in potential revenue. You are literally paying for marketing to drive leads directly to your competitors.
              </p>
            </div>
          </section>

          {/* SECTION 2: WHAT IS AN AI RECEPTIONIST */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="text-orange-500 font-mono">02.</span>
              <span>What Exactly Is an AI Receptionist? (No Tech Jargon)</span>
            </h2>
            <p>
              When people hear &ldquo;AI on the phone,&rdquo; they usually imagine the dreaded robotic voice trees of the 1990s: <em>&ldquo;Press 1 for hours of operation, Press 2 to wait on hold for 25 minutes.&rdquo;</em>
            </p>
            <p>
              <strong>That is NOT what this is.</strong>
            </p>
            <p>
              A next-generation AI Receptionist like the Vyom Voice Agent is an intelligent, warm conversational entity that operates just like a top-tier receptionist who memorized your entire business handbook.
            </p>
            <ul className="space-y-2.5 pl-2">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span><strong>Answers on ring one, 24/7/365:</strong> Zero hold times. Even if 15 clients call at the exact same second on a holiday, every single person gets greeted immediately.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span><strong>Natural human speech &amp; interruption tolerance:</strong> If the caller interrupts with &ldquo;Wait, actually my daughter needs the appointment, not me,&rdquo; the AI smoothly acknowledges, adjusts, and continues without stuttering or breaking.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span><strong>Real 2-way scheduling &amp; CRM sync:</strong> It checks your real Google Calendar, Outlook, Dentrix, or Clio schedules in real time, books open slots, and texts the caller a confirmation link before they hang up.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span><strong>Multilingual fluency in 45+ languages:</strong> If a caller speaks in Spanish, Hindi, French, or Mandarin, the agent instantly responds in that language without transferring them.</span>
              </li>
            </ul>
          </section>

          {/* SECTION 3: COMPETITOR ANALYSIS */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="text-orange-500 font-mono">03.</span>
              <span>Honest Competitor Analysis: How Does Vyom Compare?</span>
            </h2>
            <p>
              To make an informed decision for your business, you need to understand how the Vyom AI Receptionist stacks up against traditional human answering services, overseas call centers, and generic first-generation AI tools:
            </p>

            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-stone-950/80 shadow-2xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-stone-800 bg-stone-900/90 text-stone-300 font-mono">
                    <th className="p-3.5 sm:p-4">Key Capability</th>
                    <th className="p-3.5 sm:p-4 text-stone-400">Human Answering Service (e.g., Ruby)</th>
                    <th className="p-3.5 sm:p-4 text-stone-400">Generic AI Bots (e.g., Bland/Retell DIY)</th>
                    <th className="p-3.5 sm:p-4 text-orange-400 font-bold bg-orange-500/10">Vyom Enterprise AI Receptionist</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 text-stone-300">
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">Monthly Cost &amp; Overages</td>
                    <td className="p-3.5 sm:p-4 text-rose-400">$600 - $3,000/mo (Penalized per minute)</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">$200 - $500/mo + Developer engineering costs</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">Predictable flat pricing with zero per-call penalty</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">Concurrent Call Capacity</td>
                    <td className="p-3.5 sm:p-4 text-rose-400">1 call at a time (Others placed on hold)</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">Scalable, but requires API infrastructure</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">15+ Concurrent Calls on Ring One (Zero Hold Time)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">Speech Latency &amp; Fluidity</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">Human, but quality varies by shift</td>
                    <td className="p-3.5 sm:p-4 text-rose-400">1.8s - 3.0s delay (Awkward pauses, talks over users)</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">&lt; 600ms Real-time sub-second streaming</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">Direct Calendar &amp; CRM Sync</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">Manual note taking; often misspell names</td>
                    <td className="p-3.5 sm:p-4 text-rose-400">Requires Zapier/Webhook tinkering</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">Native 2-Way API Sync (Instant Booking &amp; Confirmation)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">Accuracy &amp; Hallucination Guardrails</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">Agents forget details or miss complex rules</td>
                    <td className="p-3.5 sm:p-4 text-rose-400">High risk of hallucinations or false promises</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">Deterministic Policy Guardrails (Zero Guesswork)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">Setup Effort for Business Owner</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">1 - 2 weeks training; recurring churn</td>
                    <td className="p-3.5 sm:p-4 text-rose-400">Requires in-house AI engineer or prompt coder</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">100% Turnkey: Vyom engineers configure everything in 14 days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-bold text-white">Why &ldquo;Cheap AI Voice Bots&rdquo; Fail in Business:</h3>
              <p>
                Many businesses try cheap DIY AI voice tools and abandon them within a week. Why? Because generic LLM voice bots suffer from <strong>high audio latency</strong> (awkward 2-second silences that make callers ask &ldquo;Hello? Are you there?&rdquo;), <strong>lack of interruption awareness</strong> (they keep speaking while the customer tries to clarify something), and <strong>hallucination risks</strong> (making up policies or prices).
              </p>
              <p>
                Vyom Agents solves this by using a proprietary <strong>real-time voice streaming pipeline</strong> backed by strict <strong>deterministic guardrails</strong>. If the AI doesn&apos;t have verified authority to confirm an unusual question, it smoothly offers to route the call directly to your priority cell phone or draft a high-priority ticket for your team.
              </p>
            </div>
          </section>

          {/* SECTION 4: INDUSTRY BY INDUSTRY BREAKDOWN */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-orange-500 font-mono">04.</span>
                <span>How the AI Receptionist Serves Every Industry at Scale</span>
              </h2>
              <p className="text-stone-400 text-sm">
                Each industry has unique intake rules, compliance mandates, and operational stakes. Here is how Vyom AI Receptionist adapts across frontline sectors:
              </p>
            </div>

            {/* Industry 1: Healthcare */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">1. Healthcare, Dental &amp; Specialty Medical Clinics</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300">
                Patients who call a clinic are often in discomfort or anxious. Forcing them into voicemail or a 10-minute hold queue damages your practice reputation and patient compliance.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Immediate patient intake &amp; calendar booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>EHR/PMS sync (Dentrix, Epic, AthenaHealth)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Answers insurance, prep instructions &amp; clinic hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Emergency red-flag triage &amp; urgent physician paging</span>
                </div>
              </div>
            </div>

            {/* Industry 2: Legal Firms */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">2. Law Firms &amp; Legal Consultancies</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300">
                In personal injury, criminal defense, or family law, potential clients search online in moments of distress. If you don&apos;t answer their call within 60 seconds, they call the firm ranked below you.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Confidential intake capturing key facts of the case</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Qualifies budget, jurisdiction &amp; statute of limitations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Schedules initial discovery consultations on partner calendars</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Direct Clio, MyCase &amp; LawPay integration</span>
                </div>
              </div>
            </div>

            {/* Industry 3: Home Services */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">3. Home Services &amp; Contractors (HVAC, Plumbing, Roofing)</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300">
                When a basement is flooding or an AC unit dies during a 100°F heatwave, nobody waits around. Speed to lead is everything.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Answers 24/7/365 while technicians are on job sites</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Captures caller address, system brand &amp; urgency level</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Dispatches emergency repair slots directly to field dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Syncs directly with ServiceTitan, Housecall Pro &amp; Jobber</span>
                </div>
              </div>
            </div>

            {/* Industry 4: Real Estate */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Home className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">4. Real Estate Brokerages &amp; Property Management</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300">
                Realtors spend half their days in showings. Potential homebuyers and tenants calling from yard signs or Zillow want immediate walkthrough confirmations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Instantly pre-qualifies buyers by budget and timeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Books self-guided or agent-led property tours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Handles tenant maintenance intake &amp; vendor dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Routes hot buyers directly to the listing agent&apos;s phone</span>
                </div>
              </div>
            </div>

            {/* Industry 5: Hospitality & Restaurants */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">5. Hospitality, Boutique Hotels &amp; Fine Dining</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300">
                During dinner rush or check-in rushes, staff are physically handling in-person guests. Callers asking about table reservations or check-in hours should never hear a busy signal.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Books dining reservations via OpenTable or Resy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Answers parking, dress code, dietary &amp; amenity questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Captures private event &amp; wedding banquet inquiries</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Syncs seamlessly with hotel PMS and concierge workflows</span>
                </div>
              </div>
            </div>

            {/* Industry 6: Auto Dealerships */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Car className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">6. Automotive Dealerships &amp; Service Centers</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300">
                Service lanes are notorious for unanswered calls. Customers calling to book a 60,000-mile inspection or recall repair often face endless rings.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Books routine maintenance &amp; diagnostic appointments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Collects vehicle VIN, mileage &amp; customer symptoms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Schedules test drives for high-intent shoppers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Direct Reynolds &amp; Reynolds, CDK Global &amp; DealerSocket sync</span>
                </div>
              </div>
            </div>

            {/* Industry 7: Financial Services */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Landmark className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">7. Financial Advisory, CPA &amp; Insurance Agencies</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300">
                During tax season or annual enrollment, call volumes surge by 400%. CPAs and advisors cannot spend their afternoons answering &ldquo;What documents do I need to bring?&rdquo;
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Pre-appointment checklist dispatch via SMS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Qualifies portfolio size &amp; planning requirements</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Zero training on client financial records (Zero data retention)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Integrates with Wealthbox, Redtail &amp; Salesforce Financial</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: HOW DEPLOYMENT WORKS */}
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="text-orange-500 font-mono">05.</span>
              <span>How We Deploy in 14 Days (Without Burdening Your Staff)</span>
            </h2>
            <p>
              You do not need to hire a developer, learn code, or redesign your phone lines. Vyom Agents manages the entire implementation end-to-end:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                <span className="text-xs font-mono text-orange-400 font-bold block">DAYS 1 - 4</span>
                <h4 className="font-bold text-white text-sm">Knowledge Ingestion</h4>
                <p className="text-xs text-stone-400">
                  We ingest your services, pricing guidelines, FAQs, hours, staff names, and calendar booking rules.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                <span className="text-xs font-mono text-orange-400 font-bold block">DAYS 5 - 10</span>
                <h4 className="font-bold text-white text-sm">Voice Sandbox Testing</h4>
                <p className="text-xs text-stone-400">
                  You and your team call a dedicated private test phone number from your mobile phones. We calibrate accents, tone, and guardrails until it sounds flawless.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                <span className="text-xs font-mono text-orange-400 font-bold block">DAYS 11 - 14</span>
                <h4 className="font-bold text-white text-sm">One-Click Go-Live</h4>
                <p className="text-xs text-stone-400">
                  You simply forward your existing business phone number when busy or after hours. Instant coverage with zero hardware required.
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
            <span>TEST A LIVE VOICE SIMULATION</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-bold text-white max-w-2xl mx-auto tracking-tight">
            Want to hear how the AI Receptionist sounds for your specific business?
          </h3>

          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Schedule a 20-minute discovery call with our team. We will set up a live phone simulation customized with your company name, services, and calendar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/?modal=contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-orange-500/30 hover:scale-[1.02] transition-all"
            >
              <span>Schedule Voice Demo Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/blogs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-stone-800/80 hover:bg-stone-700/80 text-stone-200 font-medium text-xs sm:text-sm border border-stone-700 transition-all"
            >
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
