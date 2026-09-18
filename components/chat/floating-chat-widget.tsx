"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  ArrowRight,
  Zap,
  ShieldCheck
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    action: "contact" | "voice" | "roi" | "services";
  };
  ragSources?: string[];
  engine?: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    sender: "bot",
    text: "Hello! 👋 I'm Vyom's autonomous sales & architecture AI assistant, connected live to our enterprise knowledge base. How can I assist your team with our Voice Agents, Self-Healing RPA, or custom workflows today?",
    timestamp: "Just now",
  },
];

const SUGGESTED_QUERIES = [
  "How does the Voice Agent work?",
  "What is Self-Healing RPA?",
  "Calculate ROI & pricing",
  "Schedule Architecture Call",
];

export function FloatingChatWidget() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-hide tooltip after 9 seconds if not clicked
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when messages update or typing changes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const openContactModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "contact");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const openVoiceProduct = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("product", "voice-agent");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleActionClick = (action?: "contact" | "voice" | "roi" | "services") => {
    if (!action) return;
    if (action === "contact") openContactModal();
    if (action === "voice") openVoiceProduct();
    if (action === "roi") {
      const el = document.getElementById("roi");
      el?.scrollIntoView({ behavior: "smooth" });
    }
    if (action === "services") {
      const el = document.getElementById("services");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Local fallback reply generator if network request fails
  const generateFallbackReply = (userText: string): { reply: string; action?: ChatMessage["actionButton"] } => {
    const lower = userText.toLowerCase();

    if (lower.includes("voice") || lower.includes("receptionist") || lower.includes("phone") || lower.includes("call")) {
      return {
        reply: "Our flagship AI Voice Receptionist operates with sub-400ms latency, native Google Calendar & EHR/CRM sync, and human-like interruption handling across 45+ languages. Would you like to test the live audio demo?",
        action: { label: "Test Live Voice Demo", action: "voice" }
      };
    }

    if (lower.includes("rpa") || lower.includes("self-healing") || lower.includes("automation") || lower.includes("orchestrator")) {
      return {
        reply: "Vyom's Self-Healing RPA engine uses visual neural embeddings with Playwright rather than fragile XPath/CSS selectors. When target interfaces shift, it auto-remediates target selectors in real time with 99.8% recovery uptime.",
        action: { label: "View Enterprise Services", action: "services" }
      };
    }

    if (lower.includes("pricing") || lower.includes("roi") || lower.includes("cost") || lower.includes("save") || lower.includes("rate")) {
      return {
        reply: "Our AI Receptionist starts at ₹14,999/mo ($180) for Starter, ₹23,999/mo ($280) for Professional, and ₹33,990/mo ($400) for Enterprise. Clients typically recoup 4.2x to 7.8x ROI by capturing after-hours missed leads.",
        action: { label: "Open ROI Calculator", action: "roi" }
      };
    }

    if (lower.includes("contact") || lower.includes("book") || lower.includes("schedule") || lower.includes("demo") || lower.includes("hire")) {
      return {
        reply: "I can connect you directly with our Principal Solutions Architect for a tailored system audit. We deliver live telephony prototypes within 48 hours under mutual NDA!",
        action: { label: "Book Discovery Call Now", action: "contact" }
      };
    }

    return {
      reply: "Vyom Agents specializes in custom autonomous AI workforces, ultra-fast conversational voice agents, and self-healing automation. Would you like to schedule an architecture call or explore our live voice product?",
      action: { label: "Book Discovery Call", action: "contact" }
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // Call live RAG + Groq API endpoint
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          history: messages.slice(-4).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();

      if (data && data.reply) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actionButton: data.actionButton,
          ragSources: data.ragSources,
          engine: data.engine,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error("Empty response");
      }
    } catch (error) {
      console.warn("Live chat API request failed, using local RAG fallback:", error);
      const { reply, action } = generateFallbackReply(query);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actionButton: action,
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <aside aria-label="Autonomous AI Assistant" className="pointer-events-auto">
      {/* Floating Action Trigger Button — Positioned with Maximum Z-Index */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex items-center gap-3 pointer-events-auto">
        {/* Helper Notification Tooltip (visible initially) */}
        <AnimatePresence>
          {!isOpen && showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.9 }}
              onClick={() => {
                setIsOpen(true);
                setShowTooltip(false);
              }}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-lg text-xs font-semibold text-slate-800 cursor-pointer hover:border-sky-400 transition-all hover:scale-105 group"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Chat with Vyom AI Agent</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-slate-400 hover:text-slate-600 ml-1"
                aria-label="Dismiss tooltip"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary Circular Floating Launcher Button — Standard button with touch support */}
        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
            setShowTooltip(false);
          }}
          className="relative w-14 h-14 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-[0_8px_30px_rgba(2,132,199,0.4)] border border-slate-800 focus:outline-none overflow-hidden group active:scale-95 hover:scale-105 transition-all duration-200 cursor-pointer"
          aria-label={isOpen ? "Close AI chat assistant" : "Open AI chat assistant"}
        >
          {/* Animated gradient spinning halo */}
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-[2px] rounded-full bg-slate-950 flex items-center justify-center" />

          {/* Active status indicator dot */}
          {!isOpen && (
            <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
          )}

          {/* Dynamic Icon */}
          <div className="relative z-10 flex items-center justify-center">
            {isOpen ? (
              <X className="w-6 h-6 text-white transition-transform rotate-0" />
            ) : (
              <Bot className="w-6 h-6 text-sky-400 group-hover:text-white transition-colors" />
            )}
          </div>
        </button>
      </div>

      {/* Floating AI Chat Dialog Modal Box */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop Overlay — Tap anywhere outside to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[9998] sm:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-2 bottom-[74px] sm:inset-auto sm:bottom-24 sm:right-6 z-[9999] w-auto sm:w-[420px] h-[520px] max-h-[calc(100dvh-85px)] sm:max-h-[620px] bg-slate-950/98 backdrop-blur-2xl rounded-3xl border border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden text-white"
            >
              {/* Dialog Header */}
              <div className="px-4 sm:px-5 py-3.5 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-[1px] shadow-sm shrink-0">
                    <div className="w-full h-full rounded-[11px] bg-slate-950 flex items-center justify-center text-sky-400">
                      <Bot className="w-5 h-5" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-extrabold text-sm text-white leading-tight">
                        {BRAND_CONFIG.name} AI
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-950/90 text-sky-300 border border-sky-800/80">
                        Groq gpt-120B
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 hidden xs:inline-flex">
                        250/50 RAG
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Hard Guardrails & Grounding Active
                    </span>
                  </div>
                </div>

                {/* Top Controls */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={resetChat}
                    title="Reset conversation"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                    aria-label="Restart chat"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                    aria-label="Close dialog"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800 text-xs sm:text-sm">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-3.5 sm:px-4 py-2.5 leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md rounded-br-xs"
                          : "bg-slate-900 border border-slate-800/90 text-slate-200 shadow-xs rounded-bl-xs"
                      }`}
                    >
                      <p className="whitespace-pre-line text-xs sm:text-[13px]">{msg.text}</p>

                      {/* RAG Source Indicator */}
                      {msg.ragSources && msg.ragSources.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-slate-800/70 flex flex-wrap items-center gap-1.5">
                          <span className="text-[9px] font-mono text-sky-400 flex items-center gap-1">
                            <Zap className="w-2.5 h-2.5 text-sky-400" />
                            <span>RAG Grounded:</span>
                          </span>
                          <span className="text-[9px] font-mono text-slate-400 truncate max-w-[200px]">
                            {msg.ragSources[0]}
                          </span>
                        </div>
                      )}

                      {/* Optional Interactive CTA Button inside Bot Message */}
                      {msg.actionButton && (
                        <button
                          onClick={() => handleActionClick(msg.actionButton?.action)}
                          className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-300 hover:text-white text-xs font-semibold transition-all active:scale-95"
                        >
                          <span>{msg.actionButton.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </motion.div>
                ))}

                {/* Bot Typing Indicator with Live RAG Animation */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-2 rounded-2xl w-fit"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.3s]" />
                    <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono flex items-center gap-1 ml-1">
                      <Sparkles className="w-3 h-3 text-sky-400 animate-pulse" />
                      <span>Retrieving RAG embeddings & reasoning...</span>
                    </span>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Chips */}
              {messages.length <= 3 && (
                <div className="px-3.5 sm:px-4 py-2 bg-slate-900/60 border-t border-slate-800/70 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
                  {SUGGESTED_QUERIES.map((query) => (
                    <button
                      key={query}
                      onClick={() => handleSendMessage(query)}
                      className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium border border-slate-700/80 transition-all shrink-0 active:scale-95"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Footer Bar */}
              <div className="p-3 bg-slate-900 border-t border-slate-800 shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-2xl px-3 py-1.5 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500/30 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Vyom AI about voice models, pricing, RPA..."
                    className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
                    aria-label="Ask AI assistant"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className={`p-1.5 rounded-xl transition-all ${
                      input.trim() && !isTyping
                        ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md active:scale-95 cursor-pointer"
                        : "text-slate-600 cursor-not-allowed"
                    }`}
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="flex items-center justify-between mt-2 px-1 text-[9px] sm:text-[10px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Hard Guardrails • 250/50 RAG Harness</span>
                  </span>
                  <span>Press Enter ↵</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </aside>
  );
}
