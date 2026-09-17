"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Github, 
  Twitter, 
  Linkedin,
  Cpu,
  Lock,
  Globe2,
  Mail,
  PhoneCall
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";
import { submitLeadAction } from "@/app/actions/contact";


export function FooterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await submitLeadAction({
        name: "Newsletter Subscriber",
        email,
        company: "Direct Portal",
        interest: "general-updates",
        teamSize: "N/A",
        message: "Subscribed to Vyom Autonomous Intelligence Whitepapers",
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="contact" className="bg-slate-950 text-white relative overflow-hidden pt-20 pb-12 border-t border-slate-800">
      {/* Top subtle radiant border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />

      {/* Atmospheric enterprise ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enterprise Quick-Contact Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 text-sky-400 border border-sky-800 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Enterprise Access Portal</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Ready to Automate with Autonomous Agents?
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Get priority access to our engineering sandbox, live telemetry dashboards, and proprietary voice models.
              </p>
            </div>

            <div className="lg:col-span-5">
              {submitted ? (
                <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-700/80 text-emerald-300 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold text-sm block">Whitepaper & Sandboxes Dispatched</span>
                    <span className="text-xs text-emerald-400/80">Check your inbox for engineering documentation.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter corporate email..."
                      className="px-4 py-3 rounded-full bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 flex-1"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
                    >
                      {loading ? (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Request Access</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 px-2 font-mono">
                    Zero spam. Direct dispatch to technical architects.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links & Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80 text-xs">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-9 w-14 rounded-xl bg-white p-1 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.png"
                  alt="Vyom Agents Logo"
                  width={56}
                  height={36}
                  className="h-full w-auto object-contain mix-blend-multiply"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white">
                  {BRAND_CONFIG.name}
                </span>
                <span className="text-[10px] text-sky-400 font-mono font-medium -mt-1">
                  Agentic AI &bull; AI Automation Products
                </span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm text-xs">
              {BRAND_CONFIG.pitch}
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-700 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-white hover:border-slate-700 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Flagship Products */}
          <div className="space-y-3">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">
              Products
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="?product=voice-agent" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span>AI Receptionist</span>
                  <span className="text-[9px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded font-mono">LIVE</span>
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>Vyom Finance Agent</span>
                  <span className="text-[9px] bg-amber-950 text-amber-300 px-1.5 py-0.2 rounded font-mono">SOON</span>
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>Vyom Finance Workforce</span>
                  <span className="text-[9px] bg-amber-950 text-amber-300 px-1.5 py-0.2 rounded font-mono">SOON</span>
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>Vyom Lawsuit</span>
                  <span className="text-[9px] bg-amber-950 text-amber-300 px-1.5 py-0.2 rounded font-mono">SOON</span>
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>PolicyLens & SafeBrowse</span>
                  <span className="text-[9px] bg-amber-950 text-amber-300 px-1.5 py-0.2 rounded font-mono">SOON</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialized Services */}
          <div className="space-y-3">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">
              Services
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><a href="?tab=rpa-automation" className="hover:text-white transition-colors">Self-Healing RPA & UI</a></li>
              <li><a href="?tab=multiagent-systems" className="hover:text-white transition-colors">Multiagent Systems</a></li>
              <li><a href="?tab=agent-to-agent" className="hover:text-white transition-colors">Agent to Agent (A2A)</a></li>
              <li><a href="?tab=crm-erp" className="hover:text-white transition-colors">Custom CRM / ERP Softwares</a></li>
              <li><a href="?tab=websites" className="hover:text-white transition-colors">Websites & Web Apps</a></li>
              <li><a href="?tab=aieo" className="hover:text-white transition-colors">AIEO Optimization</a></li>
            </ul>
          </div>

          {/* Col 4: Trust & Compliance */}
          <div className="space-y-3">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">
              Trust & Security
            </span>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>SOC-2 Type II Certified</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <Lock className="w-3.5 h-3.5 text-sky-400" />
                <span>Zero Data Retention</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>GDPR & HIPAA Compliant</span>
              </li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Security Architecture</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational
            </span>
            <span>•</span>
            <a href="?modal=contact" className="hover:text-white transition-colors">Contact Enterprise Architecture</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
