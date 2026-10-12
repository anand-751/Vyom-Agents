import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Hotel, 
  Bot, 
  Cpu, 
  PhoneCall, 
  Layers, 
  FileText 
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { FooterSection } from "@/components/footer/footer-section";
import { ConciergeVideoShowcase } from "@/components/blogs/concierge-video-showcase";
import { TabModalController } from "@/components/modals/tab-modal-controller";
import { FloatingChatWidget } from "@/components/chat/floating-chat-widget";

export const metadata: Metadata = {
  title: "AI Concierge Video Demos & Architecture Breakdown | Vyom Agents Blogs",
  description:
    "Watch live video walkthroughs of the Vyom AI Concierge App across desktop, tablet, and mobile smartphone views. Learn how autonomous guest intake eliminates front-desk wait times and integrates directly with PMS systems.",
  keywords: [
    "AI Concierge App",
    "Autonomous Guest Service",
    "Hotel AI Agent",
    "Concierge Video Demo",
    "Agentic AI Hospitality",
    "Vyom Agents",
    "Voice AI Receptionist"
  ],
  openGraph: {
    title: "Vyom AI Concierge: Live Video Walkthrough & Technical Deep Dive",
    description: "Watch the 2 flagship video demonstrations of the Vyom AI Concierge in action.",
    url: "https://vyom-agents.vercel.app/blogs",
    siteName: "Vyom Agents",
    type: "article",
  },
};

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-[#070A10] text-white selection:bg-orange-500 selection:text-white">
      {/* Universal Navbar */}
      <Suspense fallback={<div className="h-16 w-full" />}>
        <Navbar />
      </Suspense>

      {/* Top Ambient Glow Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-12 left-1/4 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-24 right-1/4 w-[500px] h-[250px] bg-amber-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 pt-28 sm:pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
          <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-orange-400 font-semibold">Blogs & Intelligence</span>
          <span>/</span>
          <span className="text-stone-300">AI Concierge App</span>
        </div>

        {/* Article Selector Switcher */}
        <div className="p-1.5 rounded-2xl bg-stone-900/90 border border-stone-800 flex flex-col sm:flex-row items-center gap-2">
          <div className="w-full sm:w-1/2 p-3 rounded-xl bg-orange-500/15 border border-orange-500/40 text-left flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              <div>
                <span className="text-[10px] font-mono text-orange-400 uppercase tracking-wider block font-bold">Featured Video Showcase</span>
                <span className="text-xs sm:text-sm font-bold text-white">AI Concierge App (Live Demos)</span>
              </div>
            </div>
            <span className="text-[11px] font-mono bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded">Active</span>
          </div>

          <Link
            href="/blogs/ai-receptionist"
            className="w-full sm:w-1/2 p-3 rounded-xl bg-stone-950/50 hover:bg-stone-800/80 border border-stone-800 hover:border-stone-700 text-left flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-stone-600 group-hover:bg-amber-400 transition-colors" />
              <div>
                <span className="text-[10px] font-mono text-stone-400 group-hover:text-amber-400 uppercase tracking-wider block transition-colors">Executive Playbook</span>
                <span className="text-xs sm:text-sm font-semibold text-stone-300 group-hover:text-white transition-colors">AI Receptionist Business Guide</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-stone-400 group-hover:text-amber-400 flex items-center gap-1 transition-colors">
              <span>Read</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Article Header & Title */}
        <header className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>PRODUCT DEMO & TECHNICAL WHITE-PAPER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Inside the AI Concierge: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
              Autonomous Guest Intake
            </span>{" "}
            Across Web & Mobile
          </h1>

          <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-3xl">
            Watch real-world video walkthroughs of the Vyom AI Concierge in production. Discover how our multi-agent architecture eliminates front-desk bottlenecks, automates in-room dining and amenity requests, and synchronizes live folios into enterprise PMS with zero latency.
          </p>

          {/* Author & Timestamp Bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs text-stone-400 border-t border-stone-800/80">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold text-xs">
                V
              </div>
              <span className="text-stone-200 font-medium">Vyom Engineering Team</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>5 min read • Live Demos Included</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Production Architecture</span>
            </div>
          </div>
        </header>

        {/* 1. PRIMARY VIDEO SHOWCASE (The 2 Concierge Videos) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Watch the Live Video Demos
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                Toggle between the Desktop Kiosk Experience (16:9) and the Native Mobile Smartphone View (9:16).
              </p>
            </div>
            <a
              href="#technical-deep-dive"
              className="text-xs font-mono text-orange-400 hover:text-orange-300 underline underline-offset-4 flex items-center gap-1 transition-colors"
            >
              <span>Skip to Technical Deep Dive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* The Video Showcase Component */}
          <ConciergeVideoShowcase />
        </section>

        {/* 2. TECHNICAL BLOG & ANALYSIS SECTION */}
        <article id="technical-deep-dive" className="space-y-12 max-w-4xl pt-8 border-t border-stone-800/80">
          
          {/* Section: The Problem */}
          <section className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-orange-500 font-mono">01.</span>
              <span>The End of Brittle Portals and Front-Desk Queues</span>
            </h3>
            <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
              Traditional hospitality systems force guests into a painful dilemma: either dial <code className="bg-stone-900 px-2 py-0.5 rounded text-orange-300 font-mono text-xs">“0”</code> and wait on hold for an overworked receptionist, or download a clunky 150MB mobile app requiring account creation, email confirmations, and complex navigation menus.
            </p>
            <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
              The result? Over <strong>82% of hotel guests never download the brand app</strong>, front-desk staff spend up to 40% of their shifts repeating basic information (Wi-Fi passwords, breakfast hours, pool timings), and ancillary revenue from in-room dining and spa services is lost due to high ordering friction.
            </p>
          </section>

          {/* Section: How Vyom AI Concierge Solves This */}
          <section className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-orange-500 font-mono">02.</span>
              <span>Zero-Install Agentic Workflow Architecture</span>
            </h3>
            <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
              As demonstrated in the video clips above, the <strong>Vyom AI Concierge</strong> operates on a zero-friction model. Guests either scan an in-room QR code, tap an NFC tag on their nightstand, or access the desktop/tablet portal directly.
            </p>

            {/* Architecture Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                  01
                </div>
                <h4 className="font-semibold text-white text-sm">Natural Language Intent Intake</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Guests speak or type naturally in their native language: <em className="text-stone-300">&ldquo;Can we get two extra feather pillows and vegan breakfast at 8:30 AM?&rdquo;</em> The agent parses multi-part requests deterministically.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                  02
                </div>
                <h4 className="font-semibold text-white text-sm">Direct PMS & Kitchen Ticket Routing</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Instead of alerting a human clerk to re-type the order, the AI Concierge issues validated API payloads directly to your Property Management System (PMS) and POS kitchen display systems.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                  03
                </div>
                <h4 className="font-semibold text-white text-sm">Automated Folio Billing</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  All room service charges, spa upgrades, and paid amenities post directly to the guest’s active room folio with itemized receipts and zero clerical discrepancy.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                  04
                </div>
                <h4 className="font-semibold text-white text-sm">Instant Housekeeping Dispatch</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Towels, toiletries, and maintenance tickets dispatch autonomously to on-duty staff devices with location tracking and service time monitoring.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Comparison Matrix */}
          <section className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-orange-500 font-mono">03.</span>
              <span>Performance Benchmark Matrix</span>
            </h3>
            <p className="text-stone-300 leading-relaxed text-sm">
              Comparative benchmark across 10,000+ simulated guest interactions across boutique hotels, luxury resorts, and enterprise properties:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-stone-950/80 shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-stone-800 bg-stone-900/90 text-stone-300 font-mono">
                    <th className="p-3.5 sm:p-4">Operational Parameter</th>
                    <th className="p-3.5 sm:p-4 text-stone-400">Legacy Phone Call</th>
                    <th className="p-3.5 sm:p-4 text-stone-400">Traditional Web Portal</th>
                    <th className="p-3.5 sm:p-4 text-orange-400 font-bold bg-orange-500/10">Vyom AI Concierge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 text-stone-300">
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">First Response Latency</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">3 - 8 minutes hold</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">10 - 20 minutes delay</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">&lt; 1.2 Seconds</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">App Download Required</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">No (Phone only)</td>
                    <td className="p-3.5 sm:p-4 text-rose-400">Yes (High drop-off)</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">Zero (PWA / Instant QR)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">Languages Supported</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">Staff dependent</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">1 - 3 pre-translated</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">45+ Native Fluency</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">24/7 Night Availability</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">Constrained staff</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">Static forms</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">100% Autonomous</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 sm:p-4 font-semibold text-white">PMS Direct Sync</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">Manual clerk entry</td>
                    <td className="p-3.5 sm:p-4 text-stone-400">Batch export</td>
                    <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">Real-time Bidirectional API</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Enterprise Security & Integrations */}
          <section className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-orange-500 font-mono">04.</span>
              <span>Enterprise PMS Integrations & Data Privacy</span>
            </h3>
            <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
              Vyom Agents implements zero-retention ephemeral session memory. Guest conversations, room numbers, and credit information are scrubbed immediately following order settlement and never used to train public machine learning models.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "Oracle Opera PMS",
                "Cloudbeds",
                "Mews",
                "Stripe Payments",
                "Toast POS",
                "Agilysys",
                "Twilio SMS & Voice",
                "Slack / Teams Staff Channels",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-xs font-mono text-stone-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </article>

        {/* 3. RELATED PRODUCTS & CASE STUDIES */}
        <section className="pt-8 border-t border-stone-800/80 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Explore More Autonomous AI Products
            </h3>
            <Link
              href="/#products"
              className="text-xs font-mono text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
            >
              <span>View All Offerings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: AI Receptionist */}
            <Link
              href="/blogs/ai-receptionist"
              className="group p-6 rounded-3xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800 hover:border-orange-500/40 transition-all duration-300 space-y-4 block"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase bg-orange-950/80 text-orange-400 border border-orange-800/80 px-2 py-0.5 rounded font-bold">
                  Complete Business Guide
                </span>
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                The Non-Technical Business Guide to AI Receptionists
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Read our honest competitor breakdown, revenue math on missed calls, and industry-by-industry playbook for healthcare, law, home trades, auto, and more.
              </p>
              <div className="text-xs font-semibold text-orange-400 flex items-center gap-1">
                <span>Read Full Industry Playbook</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 2: Accounting Operations */}
            <Link
              href="/?product=reconciliation-ops"
              className="group p-6 rounded-3xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-all duration-300 space-y-4 block"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-all">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase bg-amber-950/80 text-amber-400 border border-amber-800/80 px-2 py-0.5 rounded">
                  Financial Ops
                </span>
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Accounting Operations & Reconciliation Agent
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Autonomous 3-way matching of invoices, bank feeds, and ledgers with 100% accountant oversight and exception handling.
              </p>
              <div className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                <span>View Reconciliation Spec</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* 4. CALL TO ACTION BANNER */}
        <section className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-orange-950/40 border border-stone-800 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-mono">
            <Zap className="w-3 h-3" />
            <span>DEPLOY IN 14 DAYS</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-bold text-white max-w-2xl mx-auto tracking-tight">
            Ready to deploy the AI Concierge for your properties?
          </h3>

          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Let our engineering team set up a private sandbox configured with your branding, menus, and amenities in less than 48 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/?modal=contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-orange-500/30 hover:scale-[1.02] transition-all"
            >
              <span>Book Technical Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-stone-800/80 hover:bg-stone-700/80 text-stone-200 font-medium text-xs sm:text-sm border border-stone-700 transition-all"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </section>

      </div>

      {/* Universal Footer */}
      <Suspense fallback={null}>
        <FooterSection />
      </Suspense>

      {/* Modals & Chat Widget for interactive support */}
      <Suspense fallback={null}>
        <TabModalController />
      </Suspense>

      <Suspense fallback={null}>
        <FloatingChatWidget />
      </Suspense>
    </main>
  );
}
