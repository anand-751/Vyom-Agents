"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  X, 
  PhoneCall, 
  Workflow, 
  Check, 
  ShieldCheck, 
  Cpu, 
  Clock, 
  Layers, 
  Calendar, 
  Volume2, 
  FileText, 
  Sparkles,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { Product } from "@/lib/constants";
import { VoiceDemoPlayer } from "../products/voice-demo-player";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onBookCall: () => void;
}

export function ProductModal({ product, onClose, onBookCall }: ProductModalProps) {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail) {
      setWaitlistSubmitted(true);
    }
  };

  const isVoice = product.id === "voice-agent";

  return (
    <div className="flex flex-col max-h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sky-400">
            {isVoice ? <PhoneCall className="w-5 h-5" /> : <Workflow className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                {product.badge}
              </span>
              <span className="text-xs text-slate-300 font-mono">Vyom Engine Series</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold">{product.name}</h3>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content Body */}
      <div className="p-6 overflow-y-auto space-y-6 text-sm">
        <div className="space-y-6">
          <p className="text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {isVoice ? (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Live Voice Interruption & Latency Simulation
              </h4>
              <VoiceDemoPlayer />
            </div>
          ) : (
            <div className="bg-slate-900 rounded-xl p-5 text-white border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-300 font-bold uppercase">
                  Self-Healing Autonomous RPA Protocol
                </span>
                <span className="text-[10px] bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded font-mono">
                  Beta Stage: V0.9.4
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Unlike traditional brittle bots, our orchestrator deploys visual neural embeddings to identify interface targets even across significant CSS, DOM, or operating system interface changes.
              </p>
              {!waitlistSubmitted ? (
                <form onSubmit={handleWaitlistSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    placeholder="Enter work email for VIP priority access..."
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold rounded-lg transition-all"
                  >
                    Request Invite
                  </button>
                </form>
              ) : (
                <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>You are #142 on the priority beta invite queue!</span>
                </div>
              )}
            </div>
          )}

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Core Capabilities & Guardrails
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2"
                >
                  <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTAs */}
      <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-slate-500">
          Need a live POC running on your company phone lines or software stack?
        </span>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onClose}
            className="w-1/2 sm:w-auto px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onBookCall}
            className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md transition-all"
          >
            <span>Book Technical Discovery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
