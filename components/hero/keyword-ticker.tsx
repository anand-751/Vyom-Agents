"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Bot, Shield, Cpu, Layers } from "lucide-react";
import { KEYWORDS } from "@/lib/constants";

export function KeywordTicker() {
  // Duplicate for seamless infinite scroll
  const duplicatedKeywords = [...KEYWORDS, ...KEYWORDS];

  return (
    <div className="w-full py-3.5 bg-slate-900 text-white overflow-hidden border-y border-slate-800 relative z-20 shadow-md">
      <div className="flex items-center">
        {/* Static Left Label */}
        <div className="hidden md:flex items-center gap-2 pl-6 pr-4 border-r border-slate-800 shrink-0 z-10 bg-slate-900">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-sky-400 font-bold">
            Core Competencies
          </span>
        </div>

        {/* Marquee Track */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 26,
          }}
          className="flex items-center gap-6 whitespace-nowrap will-change-transform"
        >
          {duplicatedKeywords.map((keyword, index) => {
            const isHighlight = keyword === "Agentic AI" || keyword === "AI Automation Products";

            return (
              <div
                key={index}
                className="flex items-center gap-3 text-xs font-semibold tracking-wide"
              >
                <span
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                    isHighlight
                      ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-sm font-bold scale-105"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {isHighlight && <Sparkles className="w-3 h-3 text-sky-200" />}
                  <span>{keyword}</span>
                </span>
                <span className="text-slate-700 select-none">•</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
