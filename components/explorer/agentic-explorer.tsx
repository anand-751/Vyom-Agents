"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Search, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  MessageSquare,
  HelpCircle,
  ExternalLink,
  Layers
} from "lucide-react";
import { COMPANY_KNOWLEDGE, KEYWORDS, BRAND_CONFIG } from "@/lib/constants";

export function AgenticExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTopicId, setSelectedTopicId] = useState<string>("agentic-ai");
  const [customQuery, setCustomQuery] = useState("");
  const [activeResponse, setActiveResponse] = useState<any>(COMPANY_KNOWLEDGE[0]);

  // Handle clicking a topic chip
  const handleSelectTopic = (topic: typeof COMPANY_KNOWLEDGE[0]) => {
    setSelectedTopicId(topic.id);
    setActiveResponse(topic);
    setCustomQuery("");
  };

  // Handle custom query search / synthesis
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    const lower = customQuery.toLowerCase();

    // Semantic keyword matching against company knowledge
    let matched = COMPANY_KNOWLEDGE.find(
      (k) =>
        lower.includes(k.id) ||
        lower.includes(k.trigger.toLowerCase()) ||
        k.keyPoints.some((p) => lower.includes(p.toLowerCase().split(" ")[0]))
    );

    if (!matched) {
      if (lower.includes("voice") || lower.includes("receptionist") || lower.includes("phone") || lower.includes("call")) {
        matched = COMPANY_KNOWLEDGE.find((k) => k.id === "ai-products");
      } else if (lower.includes("security") || lower.includes("hipaa") || lower.includes("privacy") || lower.includes("data") || lower.includes("soc")) {
        matched = COMPANY_KNOWLEDGE.find((k) => k.id === "security");
      } else if (lower.includes("seo") || lower.includes("google") || lower.includes("search") || lower.includes("perplexity") || lower.includes("chatgpt")) {
        matched = COMPANY_KNOWLEDGE.find((k) => k.id === "aieo");
      } else if (lower.includes("workforce") || lower.includes("team") || lower.includes("custom") || lower.includes("agents")) {
        matched = COMPANY_KNOWLEDGE.find((k) => k.id === "custom-workforce");
      } else {
        matched = {
          id: "custom-answer",
          trigger: customQuery,
          title: `Understanding Vyom: "${customQuery}"`,
          category: "Vyom Autonomous Intelligence",
          summary: `${BRAND_CONFIG.pitch} Vyom Agents specializes in Agentic AI and AI Automation Products. We eliminate operational bottlenecks by engineering autonomous multi-agent teams, human-like voice agents, and self-healing workflow engines tailored to your exact business specifications.`,
          keyPoints: [
            "Agentic AI Architecture: Multi-step reasoning with adaptive self-evaluation",
            "AI Automation Products: Live AI Voice Receptionist + Autonomous Workflow Orchestrator",
            "Zero Data Retention: 100% confidential, isolated sandbox execution",
            "Continuous 24/7 autonomous run-time with deterministic verification",
          ],
          actionLabel: "Book Technical Discovery Call",
          actionLink: "?modal=contact",
          badge: "Agent Synthesis",
        };
      }
    }

    if (matched) {
      setSelectedTopicId(matched.id);
      setActiveResponse(matched);
    }
  };

  const handleActionClick = (link: string) => {
    if (link.startsWith("?")) {
      const paramParts = link.replace("?", "").split("=");
      const params = new URLSearchParams(searchParams.toString());
      params.set(paramParts[0], paramParts[1]);
      router.push(`?${params.toString()}`, { scroll: false });
    } else if (link.startsWith("#")) {
      const el = document.querySelector(link);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 relative bg-gradient-to-b from-white via-sky-50/30 to-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Keywords */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/90 text-sky-800 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm border border-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Interactive Company & Agentic AI Explorer</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950">
            Discover How <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Agentic AI & AI Automation</span> Works
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Interact with our knowledge core to explore Vyom Agents&apos; autonomous architecture, live products, proprietary benchmarks, and harness engineering guardrails.
          </p>
        </div>

        {/* Interactive Console Card */}
        <div className="max-w-4xl mx-auto rounded-3xl glass-panel-elevated overflow-hidden border border-slate-200/90 shadow-glass-elevated">
          
          {/* Top Control Bar & Input Field */}
          <div className="p-5 bg-slate-900 text-white border-b border-slate-800">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-sm text-slate-100 block">
                    Vyom Autonomous Intelligence Engine
                  </span>
                  <span className="text-[11px] text-sky-400 font-mono">
                    ● Real-Time System Knowledge Base Active
                  </span>
                </div>
              </div>

              <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-mono border border-slate-700 hidden sm:inline-block">
                Prompt or Select Topic Below
              </span>
            </div>

            {/* Interactive Query Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="Ask about Vyom Agents: 'How does the voice agent work?', 'What is AI Automation?', 'Harness engineering & guardrails'..."
                className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Analyze</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Topic Chips */}
            <div className="flex flex-wrap gap-2 mt-3.5 pt-3 border-t border-slate-800/80">
              {COMPANY_KNOWLEDGE.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    selectedTopicId === topic.id
                      ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-sm scale-105"
                      : "bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700/80"
                  }`}
                >
                  {topic.trigger}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Response View */}
          <div className="p-5 sm:p-6 bg-white text-slate-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeResponse.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Title & Category Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200">
                      {activeResponse.badge}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {activeResponse.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-600 font-medium">
                    Verified Technical Blueprint
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                  {activeResponse.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeResponse.summary}
                </p>

                {/* Key Technical Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {activeResponse.keyPoints.map((point: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 text-xs text-slate-800 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA Bar */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Harness Engineering & Deterministic AI Safety</span>
                  </div>

                  <button
                    onClick={() => handleActionClick(activeResponse.actionLink)}
                    className="w-full sm:w-auto px-5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all group"
                  >
                    <span>{activeResponse.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
