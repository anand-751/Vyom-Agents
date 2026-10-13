"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Globe, 
  PhoneCall, 
  Layers, 
  TrendingUp,
  Stethoscope, 
  Scale, 
  Wrench, 
  Home, 
  UtensilsCrossed, 
  Car, 
  Landmark,
  Monitor
} from "lucide-react";
import { ConciergeVideoShowcase } from "@/components/blogs/concierge-video-showcase";

export function BlogsContentView() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "receptionist" ? "receptionist" : "concierge";
  const [activeTab, setActiveTab] = useState<"concierge" | "receptionist">(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "receptionist") {
      setActiveTab("receptionist");
    } else if (tabParam === "concierge") {
      setActiveTab("concierge");
    }
  }, [searchParams]);

  const switchTab = (tab: "concierge" | "receptionist") => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <div className="relative z-10 pt-28 sm:pt-32 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* 1. Universal Stable Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-stone-400">
        <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-orange-400 font-semibold">Blogs &amp; Intelligence</span>
        <span>/</span>
        <span className="text-stone-300">
          {activeTab === "concierge" ? "AI Concierge App" : "AI Receptionist (Voice Agents)"}
        </span>
      </nav>

      {/* 2. Apple-Grade Segmented Tab Controller (Fixed Frame: Zero Layout Shift) */}
      <div 
        role="tablist"
        aria-label="Blog Topics"
        className="w-full p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl shadow-xl grid grid-cols-1 sm:grid-cols-2 gap-1.5"
      >
        {/* Tab 1: AI Concierge App */}
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "concierge"}
          onClick={() => switchTab("concierge")}
          className={`w-full p-3.5 rounded-xl text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
            activeTab === "concierge"
              ? "bg-white/[0.12] border border-white/[0.15] text-white shadow-md shadow-black/40"
              : "bg-transparent hover:bg-white/[0.04] text-stone-400 hover:text-stone-200 border border-transparent"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={`w-2.5 h-2.5 rounded-full transition-colors ${
              activeTab === "concierge" 
                ? "bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]" 
                : "bg-stone-600"
            }`} />
            <div>
              <span className={`text-[10px] font-mono uppercase tracking-wider block font-semibold transition-colors ${
                activeTab === "concierge" ? "text-orange-400" : "text-stone-500"
              }`}>
                Featured Video Showcase
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-tight">
                AI Concierge App (Live Demos)
              </span>
            </div>
          </div>
          <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded transition-colors ${
            activeTab === "concierge"
              ? "bg-orange-500/20 text-orange-300 font-bold border border-orange-500/30"
              : "text-stone-500"
          }`}>
            {activeTab === "concierge" ? "Active" : "View"}
          </span>
        </button>

        {/* Tab 2: AI Receptionist (Voice Agents) */}
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "receptionist"}
          onClick={() => switchTab("receptionist")}
          className={`w-full p-3.5 rounded-xl text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
            activeTab === "receptionist"
              ? "bg-white/[0.12] border border-white/[0.15] text-white shadow-md shadow-black/40"
              : "bg-transparent hover:bg-white/[0.04] text-stone-400 hover:text-stone-200 border border-transparent"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={`w-2.5 h-2.5 rounded-full transition-colors ${
              activeTab === "receptionist" 
                ? "bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]" 
                : "bg-stone-600"
            }`} />
            <div>
              <span className={`text-[10px] font-mono uppercase tracking-wider block font-semibold transition-colors ${
                activeTab === "receptionist" ? "text-orange-400" : "text-stone-500"
              }`}>
                Enterprise Solution
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-tight">
                AI Receptionist (Voice Agents)
              </span>
            </div>
          </div>
          <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded transition-colors ${
            activeTab === "receptionist"
              ? "bg-orange-500/20 text-orange-300 font-bold border border-orange-500/30"
              : "text-stone-500"
          }`}>
            {activeTab === "receptionist" ? "Active" : "Read"}
          </span>
        </button>
      </div>

      {/* 3. DYNAMIC CONTENT: ONLY DATA UNDER THE TAB RENDERS */}
      {activeTab === "concierge" ? (
        <div className="space-y-16 animate-in fade-in duration-200">
          
          {/* Article Header */}
          <header className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>EXECUTIVE BUSINESS BRIEFING &amp; PRODUCT BLUEPRINT</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              The AI Concierge: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                Turn Guest Requests Into Instant Revenue
              </span>{" "}
              — Without Adding Front-Desk Headcount
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-3xl">
              A practical briefing for hotel, resort, and boutique hospitality owners: Discover how a zero-download conversational AI concierge eliminates front-desk phone queues, automates in-room dining orders in under 1.2 seconds, and gives your human staff the freedom to deliver unforgettable 5-star guest hospitality.
            </p>

            {/* Author & Timestamp Bar */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs text-stone-400 border-t border-stone-800/80">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold text-xs">
                  V
                </div>
                <span className="text-stone-200 font-medium">Vyom Enterprise Solutions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>5 min read • Live Video Walkthroughs Included</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Turnkey 14-Day PMS Integration</span>
              </div>
            </div>
          </header>

          {/* PRIMARY VIDEO SHOWCASE */}
          <section className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Watch the Live Interactive Video Demos
                </h2>
                <p className="text-xs sm:text-sm text-stone-400 mt-1">
                  Experience how your guests interact with the AI Concierge on Desktop Kiosks (16:9) and Smartphone Mobile Screens (9:16).
                </p>
              </div>
              <a
                href="#concierge-business-pitch"
                className="text-xs font-mono text-orange-400 hover:text-orange-300 underline underline-offset-4 flex items-center gap-1 transition-colors"
              >
                <span>Read the Executive Pitch &amp; ROI Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Zero-Layout-Shift Video Showcase */}
            <ConciergeVideoShowcase />
          </section>

          {/* BUSINESS PITCH & LAYMAN BREAKDOWN SECTION */}
          <article id="concierge-business-pitch" className="space-y-12 max-w-4xl pt-8 border-t border-stone-800/80">
            
            {/* Section 01: The Real Business Problem */}
            <section className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-orange-500 font-mono">01.</span>
                <span>The Everyday Friction That Costs Hospitality Businesses Money</span>
              </h3>
              <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
                If you run a hotel, resort, or serviced residence, you know the daily balancing act your front desk faces. A guest walks up to check in, and right in the middle of greeting them, the front-desk phone rings. It&apos;s Room 304 asking for extra towels. Two seconds later, line two rings with Room 512 wanting room service.
              </p>
              <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
                Your staff is trapped between helping the guest standing right in front of them and answering a ringing phone. Meanwhile, the guest calling from their room is stuck on hold for 5 to 8 minutes. Often, they give up, hang up, and order food on UberEats or DoorDash instead of ordering from your hotel&apos;s kitchen.
              </p>
              <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
                Many properties tried solving this by building expensive custom mobile apps. But industry data shows that <strong>over 85% of guests refuse to download an app</strong> just for a 2-night stay. The result? High development costs, frustrated guests, overworked front-desk staff, and tens of thousands of dollars in lost in-room dining sales.
              </p>
            </section>

            {/* Section 02: How The Product Is Designed */}
            <section className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-orange-500 font-mono">02.</span>
                <span>How the Vyom AI Concierge Is Designed (Simple, Zero-App, Instant)</span>
              </h3>
              <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
                We designed the <strong>Vyom AI Concierge</strong> with one guiding principle: <em>zero friction for the guest, zero complexity for your team.</em>
              </p>
              <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
                There is <strong>no app to download, no password to remember, and no sign-up form</strong>. When a guest enters their room, they simply scan a beautiful QR code on their desk or tap an NFC tag with their smartphone. Instantly, an elegant, branded web concierge opens in their browser. For guests in the lobby or elevator foyer, the same experience runs smoothly on touch-screen desktop kiosks.
              </p>
              <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
                Even better, it speaks <strong>over 45 languages with native fluency</strong>. When international travelers visit from Japan, Germany, or Brazil, they can type or speak in their native tongue, and the AI concierge responds instantly and accurately in that language while notifying your English-speaking team with translated tickets.
              </p>
            </section>

            {/* Section 03: The 4 Steps Automated */}
            <section className="space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-orange-500 font-mono">03.</span>
                <span>The 4 Exact Steps of Your Business That Are Automated</span>
              </h3>
              <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
                Here is exactly what happens behind the scenes when a guest makes a request—in plain English, with zero technical jargon:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                    01
                  </div>
                  <h4 className="font-semibold text-white text-sm">Step 1: Instant In-Room Dining &amp; Bar Orders</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    A guest simply types or says: <em className="text-stone-300">&ldquo;Can we get two club sandwiches, an iced matcha latte, and extra napkins to Room 408?&rdquo;</em> The AI understands the room number, checks item availability, confirms dietary preferences, and sends the ticket straight to your kitchen POS printer or tablet. No phone call needed.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                    02
                  </div>
                  <h4 className="font-semibold text-white text-sm">Step 2: Automated Room Folio Billing</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Instead of a front-desk receptionist manually typing paper receipts into the computer at checkout, every room service order, spa booking, and paid amenity charge posts directly to the guest&apos;s active room folio in your hotel software (Opera, Cloudbeds, Mews) with zero billing errors.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                    03
                  </div>
                  <h4 className="font-semibold text-white text-sm">Step 3: Instant Answers to Routine Inquiries (24/7)</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Over 70% of guest calls are for the same repetitive questions: <em className="text-stone-300">&ldquo;What is the Wi-Fi password? What time does the pool close? Can I get late checkout at 1:00 PM?&rdquo;</em> The AI concierge answers these in under 1.2 seconds, 24 hours a day, saving your team dozens of phone interruptions every single shift.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                    04
                  </div>
                  <h4 className="font-semibold text-white text-sm">Step 4: Smart Housekeeping &amp; Maintenance Dispatch</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Requests for fresh towels, dental kits, luggage pickup, or room temperature adjustments automatically create a task on your on-duty housekeeping team&apos;s mobile device. Your staff sees the room number, priority, and request immediately, complete with status tracking when completed.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 04: Working with Human Workforce */}
            <section className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-orange-500 font-mono">04.</span>
                <span>How It Works Alongside Your Human Workforce (Better Together)</span>
              </h3>
              <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
                One of the most common questions hotel owners ask us is: <em>&ldquo;Will this replace the personal human touch our brand is known for?&rdquo;</em>
              </p>
              <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
                The answer is an emphatic <strong>NO</strong>. In fact, it does the exact opposite: <strong>it protects and elevates the human touch</strong>.
              </p>
              <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 text-stone-300 space-y-3">
                <p className="text-sm">
                  Think about what burns your staff out: it isn&apos;t greeting a family or making a personalized recommendation for an anniversary dinner. It&apos;s answering the phone 80 times an afternoon to repeat the Wi-Fi password, tell someone where the ice machine is, or handwrite a room service order.
                </p>
                <p className="text-sm">
                  By having the <strong>Vyom AI Concierge handle 100% of the repetitive, routine inquiries</strong>, your human staff is finally free to do what humans do best: look up, smile, greet guests by name, handle VIP arrangements, and deliver genuine, warm hospitality. When a guest has a sensitive concern or a special anniversary request, the AI smoothly routes the conversation directly to your on-duty manager with full context.
                </p>
              </div>
            </section>

            {/* Section 05: Speed Efficiency & ROI Benchmark */}
            <section className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-orange-500 font-mono">05.</span>
                <span>Speed Efficiency &amp; Real Business ROI</span>
              </h3>
              <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
                How does the AI Concierge change the operational speed and financial efficiency of your property? Here is the real-world comparison:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-stone-950/80 shadow-xl">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-stone-800 bg-stone-900/90 text-stone-300 font-mono">
                      <th className="p-3.5 sm:p-4">Operational Metric</th>
                      <th className="p-3.5 sm:p-4 text-stone-400">Traditional Phone Call (&ldquo;0&rdquo;)</th>
                      <th className="p-3.5 sm:p-4 text-stone-400">Custom Hotel Mobile App</th>
                      <th className="p-3.5 sm:p-4 text-orange-400 font-bold bg-orange-500/10">Vyom AI Concierge</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-300">
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-white">Guest Wait Time (Hold Time)</td>
                      <td className="p-3.5 sm:p-4 text-rose-400">3 - 8 minutes hold time</td>
                      <td className="p-3.5 sm:p-4 text-stone-400">10 - 20 minutes ticket delay</td>
                      <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">&lt; 1.2 Seconds (Instant)</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-white">Guest Adoption Rate</td>
                      <td className="p-3.5 sm:p-4 text-stone-400">Requires picking up phone</td>
                      <td className="p-3.5 sm:p-4 text-rose-400">&lt; 15% download the app</td>
                      <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">&gt; 82% Instant QR Engagement</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-white">Languages Handled</td>
                      <td className="p-3.5 sm:p-4 text-stone-400">Limited to on-duty staff</td>
                      <td className="p-3.5 sm:p-4 text-stone-400">1 - 2 static translations</td>
                      <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">45+ Native Fluency</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-white">Night-Shift (After-Hours) Coverage</td>
                      <td className="p-3.5 sm:p-4 text-rose-400">Severe staff shortages</td>
                      <td className="p-3.5 sm:p-4 text-stone-400">Static unresponsive forms</td>
                      <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">100% Autonomous 24/7/365</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-white">Room Service &amp; Amenity Revenue</td>
                      <td className="p-3.5 sm:p-4 text-stone-400">High friction = lost orders</td>
                      <td className="p-3.5 sm:p-4 text-stone-400">Unused by majority</td>
                      <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">+34% Incremental Order Volume</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 sm:p-4 font-semibold text-white">Front-Desk Phone Volume</td>
                      <td className="p-3.5 sm:p-4 text-rose-400">Constant ringing &amp; burnout</td>
                      <td className="p-3.5 sm:p-4 text-stone-400">Minimal reduction</td>
                      <td className="p-3.5 sm:p-4 text-emerald-400 font-bold bg-orange-500/5">Cuts Routine Phone Load by 70%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 06: Seamless PMS Integrations & Privacy */}
            <section className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-orange-500 font-mono">06.</span>
                <span>Works Seamlessly with Your Existing Property Systems</span>
              </h3>
              <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
                You do not need to replace your existing hotel software or purchase expensive new hardware. The Vyom AI Concierge integrates directly into the enterprise property management systems, payment processors, and messaging tools you already use every day:
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  "Oracle Opera PMS",
                  "Cloudbeds",
                  "Mews",
                  "Toast POS",
                  "Stripe Payments",
                  "Agilysys",
                  "Twilio SMS & WhatsApp",
                  "Slack & Teams Staff Alerts",
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

          {/* Related Articles Banner */}
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
              {/* Card 1: AI Receptionist (Voice Agents) */}
              <button
                type="button"
                onClick={() => switchTab("receptionist")}
                className="group p-6 rounded-3xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800 hover:border-orange-500/40 transition-all duration-300 space-y-4 block text-left cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-2 py-0.5 rounded font-bold">
                    Enterprise Flagship
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                  AI Receptionist (Voice Agents)
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Autonomous voice intelligence answering calls 24/7 on ring one. Features real-time calendar booking, CRM integration, competitor benchmark, and industry-by-industry rollout blueprints.
                </p>
                <div className="text-xs font-semibold text-orange-400 flex items-center gap-1">
                  <span>Explore Enterprise Architecture &amp; Playbook</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

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
                  Accounting Operations &amp; Reconciliation Agent
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

          {/* CTA Banner */}
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
      ) : (
        <div className="space-y-16 animate-in fade-in duration-200">
          
          {/* Article Header */}
          <header className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>EXECUTIVE BUSINESS BRIEFING &amp; OPERATIONAL PLAYBOOK</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              The AI Receptionist: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                Stop Losing High-Paying Clients
              </span>{" "}
              to Unanswered Phone Calls
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-3xl">
              A straight-talking executive briefing for business owners, medical directors, and practice leaders: Learn how an autonomous conversational AI voice assistant answers every incoming call on Ring One, books qualified appointments into your calendar 24/7, and empowers your human staff to focus on high-touch client relationships without burnout.
            </p>

            {/* Author & Timestamp Bar */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs text-stone-400 border-t border-stone-800/80">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold text-xs">
                  V
                </div>
                <span className="text-stone-200 font-medium">Vyom Enterprise Solutions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>6 min read • Executive Practice Blueprint</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Hardware Required • 14-Day Setup</span>
              </div>
            </div>
          </header>

          {/* Executive Impact Highlights Banner */}
          <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-orange-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <Zap className="w-4 h-4" />
              <span>Executive Business Impact Summary</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1">
                <span className="text-stone-400 block text-[11px] font-mono uppercase">Immediate Client Retention</span>
                <p className="text-white font-semibold">85% of prospective clients who hit a voicemail hang up and immediately dial your nearest competitor.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1">
                <span className="text-stone-400 block text-[11px] font-mono uppercase">Zero Hold Times</span>
                <p className="text-white font-semibold">Answers 15+ calls simultaneously on Ring One with sub-600ms conversational speed and natural human cadence.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1">
                <span className="text-stone-400 block text-[11px] font-mono uppercase">Staff Leverage &amp; ROI</span>
                <p className="text-white font-semibold">Cuts routine phone interruptions by 70% while capturing 100% of evening and weekend appointment revenue.</p>
              </div>
            </div>
          </div>

          {/* MAIN ARTICLE BODY */}
          <article className="space-y-14 text-stone-300 leading-relaxed text-sm sm:text-base max-w-4xl">
            
            {/* SECTION 1: THE REAL PROBLEM */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-orange-500 font-mono">01.</span>
                <span>The Silent Revenue Killer in Modern Business: The Missed Phone Call</span>
              </h2>
              <p>
                As a business owner, you spend significant capital and effort on marketing, search rankings, website design, and building your reputation. When a customer picks up the phone to call your office, they aren&apos;t just &ldquo;browsing&rdquo;—they are a high-intent buyer with an urgent need, an open wallet, and a desire to book immediately.
              </p>
              <p>
                Yet in most businesses, the phone lines face a physical bottleneck. Your front desk staff can only speak to one person at a time. If they are checking in an in-person customer, processing paperwork, or already on line one, incoming callers either hear endless ringing, get placed on hold, or land in voicemail.
              </p>
              <p>
                Here is the harsh reality: <strong>over 85% of callers who reach a voicemail do not leave a message</strong>. They hang up, tap back into Google search, and call the next business down the page.
              </p>

              <div className="p-5 rounded-2xl bg-orange-950/30 border border-orange-500/30 text-stone-200 space-y-2">
                <h4 className="font-bold text-orange-400 text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>The Real Math of Missed Calls</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-300">
                  If your average client or customer is worth $1,200, missing just <strong>two prospective calls a day</strong> costs your business over <strong>$600,000 every single year in lost top-line revenue</strong>. That isn&apos;t just missed calls—that is revenue handed directly to your competitors.
                </p>
              </div>
            </section>

            {/* SECTION 2: HOW THE PRODUCT IS DESIGNED */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-orange-500 font-mono">02.</span>
                <span>How the AI Receptionist Is Designed (Natural, Warm, Instant)</span>
              </h2>
              <p>
                The Vyom AI Receptionist is <strong>not</strong> an annoying &ldquo;Press 1 for Sales, Press 2 for Billing&rdquo; automated phone menu. Those robotic systems frustrate customers and drive them away.
              </p>
              <p>
                Instead, our voice agent sounds and acts like your most articulate, courteous front-desk employee:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                    01
                  </div>
                  <h4 className="font-semibold text-white text-sm">Answers on Ring One (Zero Hold Time)</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Picks up incoming calls within 600 milliseconds. Even if 10 customers call at the exact same moment during a busy morning rush, every single caller is greeted immediately by their own dedicated voice agent.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                    02
                  </div>
                  <h4 className="font-semibold text-white text-sm">Natural Human Speech &amp; Interruption Recovery</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Uses natural conversational inflection, pauses thoughtfully, and handles interruptions gracefully. If a caller cuts in with a new question or corrects their date of birth, the AI listens and adapts without talking over them.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                    03
                  </div>
                  <h4 className="font-semibold text-white text-sm">Live Calendar &amp; Software Integration</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Directly connected to your Google Calendar, Microsoft Outlook, Calendly, or industry software (Dentrix, Clio, ServiceTitan, CDK). It checks your real-time schedule and locks in confirmed appointments during the call.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                    04
                  </div>
                  <h4 className="font-semibold text-white text-sm">Strict Business Guardrails (Zero Guesswork)</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Trained strictly on your exact business policies, pricing parameters, service areas, and intake criteria. It never guesses or makes unapproved commitments.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: THE 4 BUSINESS STEPS AUTOMATED */}
            <section className="space-y-5">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-orange-500 font-mono">03.</span>
                <span>The 4 Steps of Your Business That Are Automated</span>
              </h2>
              <p>
                Here is the step-by-step customer journey when a caller rings your business, explained in plain terms:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                    01
                  </div>
                  <h4 className="font-semibold text-white text-sm">Step 1: 24/7 Call Intake on Ring One</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Greets the caller with your customized, professional greeting whether it is 2:00 PM on a Tuesday or 11:30 PM on a Saturday. No busy signals, no hold music, and no missed opportunities.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                    02
                  </div>
                  <h4 className="font-semibold text-white text-sm">Step 2: Smart Client Intake &amp; Lead Qualification</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Asks the essential qualifying questions your business requires: What service are they looking for? What is their address or location? What is their timeline and urgency? It captures their full name, phone number, and email accurately.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                    03
                  </div>
                  <h4 className="font-semibold text-white text-sm">Step 3: Direct Appointment Scheduling &amp; SMS Confirmation</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Reads open slots from your live calendar and confirms the time slot directly with the customer. The instant the call ends, the customer receives an automated SMS text confirmation with appointment details and calendar invite.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                    04
                  </div>
                  <h4 className="font-semibold text-white text-sm">Step 4: Immediate CRM Sync &amp; Priority Alerting</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Creates or updates the customer record in your CRM with an organized call summary and audio transcript. If the caller has an acute emergency or is a high-value commercial lead, the AI sends an instant priority alert to your on-call team.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: WORKING WITH HUMAN WORKFORCE */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-orange-500 font-mono">04.</span>
                <span>How It Works Alongside Your Human Workforce (Better Together)</span>
              </h2>
              <p>
                Many owners wonder: <em>&ldquo;Is this meant to replace my front desk team?&rdquo;</em>
              </p>
              <p>
                The answer is <strong>no</strong>. The AI Receptionist is designed to <strong>supercharge and protect your human staff</strong>, not replace them.
              </p>
              <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 text-stone-300 space-y-3">
                <p className="text-sm">
                  Constant phone interruptions are the #1 cause of front-desk burnout, mistakes, and turnover in service businesses. Every time your receptionist is interrupted by a ringing phone while helping a patient or client in person, quality of service suffers.
                </p>
                <p className="text-sm">
                  With the AI Voice Agent acting as your <strong>first line of defense</strong>:
                </p>
                <ul className="text-xs sm:text-sm space-y-2 list-disc list-inside text-stone-300">
                  <li><strong>Spam &amp; Robocalls Filtered:</strong> Your staff never has to answer another car warranty or spam call again.</li>
                  <li><strong>Routine FAQs Handled:</strong> Questions about directions, business hours, accepted insurance, or pricing ranges are answered instantly without disturbing staff.</li>
                  <li><strong>In-Person Focus:</strong> Your receptionists can give 100% of their attention to patients and clients standing right in front of them.</li>
                  <li><strong>Warm Live Transfers:</strong> When an important caller specifically requests a human or has a complex clinical/legal emergency, the AI performs a seamless live transfer to your staff with full caller background.</li>
                </ul>
              </div>
            </section>

            {/* SECTION 5: COMPETITOR ANALYSIS */}
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-orange-500 font-mono">05.</span>
                <span>Speed Efficiency &amp; Comparison: Why Legacy Solutions Fail</span>
              </h2>
              <p>
                How does Vyom compare to human answering services (like Ruby) and generic DIY voice wrappers?
              </p>

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
                <h3 className="text-lg font-bold text-white">Why Off-the-Shelf AI Voice Bots Create Headaches for Business Owners:</h3>
                <p>
                  Many business owners have tried basic AI phone tools or automated prompts and found them frustrating. When a system pauses for 3 seconds before responding, talks over your customer, or makes up inaccurate answers, it damages your business reputation.
                </p>
                <p>
                  Vyom AI Receptionists are custom-calibrated for real business environments. The AI recognizes conversational pauses, stays strictly within your approved guidelines, and if a customer has a complex or delicate situation, it smoothly connects them to your designated team member in real time.
                </p>
              </div>
            </section>

            {/* SECTION 6: INDUSTRY BY INDUSTRY BREAKDOWN */}
            <section className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                  <span className="text-orange-500 font-mono">06.</span>
                  <span>Tailored Solutions for Your Specific Industry</span>
                </h2>
                <p className="text-stone-400 text-sm">
                  Every business operates differently. Here is how our AI Receptionist is customized to automate front-line client communication in your sector:
                </p>
              </div>

              {/* Industry 1: Healthcare */}
              <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">1. Healthcare, Dental &amp; Medical Practices</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-300">
                  Patients seeking appointments need immediate attention and compassion. During morning rushes when staff are checking in patients, the AI books appointments, confirms insurance questions, and handles routine queries so patients never get sent to voicemail.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Direct schedule booking into your existing clinical software</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Instant answers for accepted insurance, clinic hours, and directions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Automatic SMS confirmation and calendar invites sent to patients</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Immediate live transfer to on-call clinical staff for urgent symptoms</span>
                  </div>
                </div>
              </div>

              {/* Industry 2: Legal Firms */}
              <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">2. Law Firms &amp; Professional Legal Practices</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-300">
                  When someone needs an attorney, they call the first firm they find. If nobody answers, they immediately call the next firm. Our AI conducts professional intake, gathers case facts, and schedules paid consultations round-the-clock.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Structured confidential intake gathering key facts and urgency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Immediate consultation booking directly on attorney calendars</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Filters out unqualified inquiries before they reach billing attorneys</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Syncs caller notes into your case management software (Clio, MyCase)</span>
                  </div>
                </div>
              </div>

              {/* Industry 3: Home Services */}
              <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">3. Home &amp; Field Services (HVAC, Plumbing, Roofing, Electrical)</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-300">
                  When a furnace breaks in winter or a pipe bursts at night, homeowners call until a human or responsive agent answers. The first contractor to answer gets the job. Our voice agent answers on ring one, books the service window, and dispatches your technicians.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Zero missed emergency dispatch calls during storm and peak surges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Captures caller address, equipment issue, and preferred time window</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Connects into ServiceTitan, Housecall Pro, and Jobber schedules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Instantly alerts on-duty techs with full job and customer details</span>
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
                  Prospective buyers calling from yard signs or listings want answers right now. The AI qualifies buyer readiness, pre-screens rental applicants, and books property walkthroughs while transferring high-value buyers directly to your top agents.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Pre-qualifies buyers by budget, pre-approval status, and move timeline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Books viewing appointments directly onto agent calendars</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Handles routine tenant maintenance requests and routes work orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Live warm transfer of high-intent cash buyers and investors</span>
                  </div>
                </div>
              </div>

              {/* Industry 5: Hospitality */}
              <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <UtensilsCrossed className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">5. Restaurants, Hospitality &amp; Event Venues</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-300">
                  During peak dinner rush or hotel check-in, staff cannot stand by the phone. The AI takes table reservations, answers parking and dress-code questions, and captures event inquiries without interrupting your front-of-house staff.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Books table reservations directly through OpenTable or Resy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Answers questions about parking, private rooms, dietary options, and hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Collects party size and dates for private banquet inquiries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Works alongside the Vyom AI Concierge for guest self-service</span>
                  </div>
                </div>
              </div>

              {/* Industry 6: Automotive */}
              <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Car className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">6. Dealerships &amp; Automotive Service Centers</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-300">
                  Service bays generate significant high-margin revenue, but service advisors are often too busy with in-person customers to answer calls. The AI books routine maintenance, captures vehicle details, and schedules test drives.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Schedules routine oil changes, tire rotations, and warranty repairs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Records customer vehicle year, model, mileage, and reported symptoms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Books showroom appointments and test drives for vehicle shoppers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Syncs directly with your dealership management calendar</span>
                  </div>
                </div>
              </div>

              {/* Industry 7: Wealth & Financial */}
              <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">7. Financial Advisors, Accounting &amp; Insurance Firms</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-300">
                  During peak tax season or open enrollment, advisory teams are swamped. The AI screens prospective clients, collects their paperwork requirements, and schedules discovery calls with the right advisor.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-400 pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Automatically sends pre-consultation document checklists to clients</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Qualifies prospective clients based on their specific advisory needs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Highest security standards with zero exposure of sensitive client finances</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Direct calendar synchronization with Microsoft 365, Google, and CRM</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: EASY ROLLOUT */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-orange-500 font-mono">07.</span>
                <span>Effortless 14-Day Rollout (Zero Technical Burden on You)</span>
              </h2>
              <p>
                You do not need an IT department or software engineers. Our team handles the entire setup, testing, and connection for you in three straightforward steps:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <span className="text-xs font-mono text-orange-400 font-bold block">STEP 1: DAYS 1 - 4</span>
                  <h4 className="font-bold text-white text-sm">Business Knowledge &amp; Calendar Setup</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    We learn your exact services, pricing guidelines, office hours, and scheduling rules, and connect the agent to your calendar and CRM.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <span className="text-xs font-mono text-orange-400 font-bold block">STEP 2: DAYS 5 - 10</span>
                  <h4 className="font-bold text-white text-sm">Voice Testing &amp; Practice Calls</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    We provide you with a private phone number so you and your team can test call the AI, listen to its voice, and fine-tune its responses until you are completely satisfied.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <span className="text-xs font-mono text-orange-400 font-bold block">STEP 3: DAYS 11 - 14</span>
                  <h4 className="font-bold text-white text-sm">One-Click Phone Forwarding Go-Live</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Simply forward your phone number to the agent whenever you want coverage (after hours, when lines are busy, or 24/7). Zero equipment to buy or install.
                  </p>
                </div>
              </div>
            </section>

          </article>

          {/* CTA Banner */}
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

              <button
                type="button"
                onClick={() => switchTab("concierge")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-stone-800/80 hover:bg-stone-700/80 text-stone-200 font-medium text-xs sm:text-sm border border-stone-700 transition-all cursor-pointer"
              >
                <Monitor className="w-4 h-4 text-stone-400" />
                <span>View AI Concierge Video Demos</span>
              </button>
            </div>
          </section>

        </div>
      )}

    </div>
  );
}
