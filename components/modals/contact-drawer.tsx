"use client";

import React, { useState } from "react";
import { 
  X, 
  Send, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Building, 
  Mail, 
  User, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { submitLeadAction } from "@/app/actions/contact";

interface ContactDrawerProps {
  onClose: () => void;
}

export function ContactDrawer({ onClose }: ContactDrawerProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "voice-agent",
    teamSize: "10-50",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await submitLeadAction(formData);
      if (res.success) {
        setIsSuccess(true);
      } else {
        setErrorMsg(res.error || "Failed to submit request.");
      }
    } catch (err: any) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between bg-white text-slate-900 shadow-2xl border-l border-slate-200">
      {/* Drawer Header */}
      <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-semibold">
              Fast-Track Enterprise Intake
            </span>
          </div>
          <h3 className="text-xl font-bold">Book Technical Discovery</h3>
        </div>

        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          aria-label="Close drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Body */}
      <div className="p-6 overflow-y-auto flex-1">
        {isSuccess ? (
          <div className="py-12 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900">
              Discovery Request Received!
            </h4>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              A Principal Agentic AI Architect from Vyom Agents will review your technical specifications and contact you within 4 business hours.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 w-full text-left space-y-1">
              <span className="font-mono text-slate-400 uppercase text-[10px] block">Reference Token:</span>
              <span className="font-mono font-bold text-sky-700">VYOM-REQ-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <p className="text-slate-600 text-xs leading-relaxed">
              Schedule a 30-minute architectural audit and live proof-of-concept demonstration tailored to your organization’s workflow bottlenecks.
            </p>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alex Rivera"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Work Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@enterprise.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Company / Organization *
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Acme Corp"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Primary Interest
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
                >
                  <option value="voice-agent">AI Voice Receptionist</option>
                  <option value="orchestrator">Workflow Orchestrator</option>
                  <option value="aieo">AIEO (LLM Optimization)</option>
                  <option value="workforce">Custom Agentic Workforce</option>
                  <option value="automations">AI Automations & APIs</option>
                  <option value="apps">Custom Desktop/Web App</option>
                  <option value="rag">Enterprise RAG Chatbots</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Company Size
                </label>
                <select
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
                >
                  <option value="1-10">1 - 10 employees</option>
                  <option value="10-50">10 - 50 employees</option>
                  <option value="50-250">50 - 250 employees</option>
                  <option value="250+">250+ Enterprise</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Project Scope / Key Requirements
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your current bottleneck, target integration (e.g. Salesforce, Twilio, SAP), or volume..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none"
              />
            </div>

            <div className="p-3 bg-sky-50/70 border border-sky-200 rounded-xl text-sky-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span className="text-[11px]">
                Under strict Mutual Non-Disclosure Agreement (NDA). Zero data retention on proprietary IP.
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all mt-4"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Connecting to Dispatch Queue...</span>
                </>
              ) : (
                <>
                  <span>Schedule Architectural Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Drawer Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500 font-mono">
        Vyom Agents Dispatch Node // 256-bit TLS Encrypted
      </div>
    </div>
  );
}
