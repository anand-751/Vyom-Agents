"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  PhoneCall, 
  Calendar, 
  RotateCcw, 
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Zap,
  MessageSquare,
  HelpCircle
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
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    sender: "bot",
    text: "Hello! 👋 I'm Vyom's autonomous sales & architecture AI assistant. How can I help you accelerate your enterprise workflow today?",
    timestamp: "Just now",
  },
];

const SUGGESTED_QUERIES = [
  "How does the Voice Agent work?",
  "What is Self-Healing RPA?",
  "Calculate ROI for our team",
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
      setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
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

  const generateBotReply = (userText: string): { reply: string; action?: ChatMessage["actionButton"] } => {
    const lower = userText.toLowerCase();

    if (lower.includes("voice") || lower.includes("receptionist") || lower.includes("phone") || lower.includes("call")) {
      return {
        reply: "Our AI Receptionist operates with sub-400ms latency, native Google Calendar & EHR/CRM synchronization, and human-like interruption handling across 45+ languages. Would you like to test the live audio demo?",
        action: { label: "Test Live Voice Demo", action: "voice" }
      };
    }

    if (lower.includes("rpa") || lower.includes("self-healing") || lower.includes("automation") || lower.includes("orchestrator")) {
      return {
        reply: "Vyom's Self-Healing RPA engine uses visual neural embeddings rather than brittle CSS/XPath selectors. If your legacy ERP or web UI changes, our engine auto-remediates target selectors in real time with zero workflow crashes.",
        action: { label: "View Enterprise Services", action: "services" }
      };
    }

    if (lower.includes("pricing") || lower.includes("roi") || lower.includes("cost") || lower.includes("save") || lower.includes("rate")) {
      return {
        reply: "Our pricing scales deterministically from Starter (₹14,999 / $180/mo) to Professional (₹23,999 / $280/mo), typically recouping 4.2x to 7.8x ROI by eliminating missed patient calls and automating back-office entry. You can drag our interactive ROI calculator right on this page!",
        action: { label: "Open ROI Calculator", action: "roi" }
      };
    }

    if (lower.includes("contact") || lower.includes("book") || lower.includes("schedule") || lower.includes("demo") || lower.includes("talk") || lower.includes("hire") || lower.includes("meeting")) {
      return {
        reply: "I can connect you directly with our Principal Solutions Architect for a tailored system audit. Let's schedule your discovery call right away!",
        action: { label: "Book Discovery Call Now", action: "contact" }
      };
    }

    if (lower.includes("multiagent") || lower.includes("multi-agent") || lower.includes("crm") || lower.includes("erp") || lower.includes("tech")) {
      return {
        reply: "We build custom Agent-to-Agent (A2A) topologies, Model Context Protocol (MCP) server meshes, and unified Custom CRM/ERP software that let autonomous agents manage end-to-end business operations 24/7.",
        action: { label: "Explore Services", action: "services" }
      };
    }

    return {
      reply: "Thank you for reaching out! Vyom Agents specializes in custom autonomous AI workforces, ultra-fast conversational voice agents, and self-healing automation. Would you like to schedule a quick 15-minute architecture call or explore our live voice product?",
      action: { label: "Book Discovery Call", action: "contact" }
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate natural AI thought/typing delay (600ms - 1100ms)
    setTimeout(() => {
      const { reply, action } = generateBotReply(query);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actionButton: action,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 850);
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
      {/* Floating Action Trigger Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
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

        {/* Primary Circular Floating Launcher Button */}
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-14 h-14 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-[0_8px_30px_rgba(2,132,199,0.35)] border border-slate-800 focus:outline-none overflow-hidden group"
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
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="relative z-10"
              >
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="relative z-10 flex items-center justify-center"
              >
                <Bot className="w-6 h-6 text-sky-400 group-hover:text-white transition-colors" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Floating AI Chat Dialog Modal Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed inset-x-3 bottom-22 sm:inset-auto sm:bottom-24 sm:right-6 z-50 w-auto sm:w-[420px] h-[550px] max-h-[82vh] bg-slate-950/95 backdrop-blur-2xl rounded-3xl border border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden text-white"
          >
            {/* Dialog Header */}
            <div className="px-5 py-3.5 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-[1px] shadow-sm">
                  <div className="w-full h-full rounded-[11px] bg-slate-950 flex items-center justify-center text-sky-400">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-white leading-tight">
                      {BRAND_CONFIG.name} AI
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sky-950/80 text-sky-300 border border-sky-800/80">
                      v2.4
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online &bull; Sub-400ms Reasoning
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
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800 text-xs sm:text-sm">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md rounded-br-xs"
                        : "bg-slate-900 border border-slate-800/90 text-slate-200 shadow-xs rounded-bl-xs"
                    }`}
                  >
                    <p className="whitespace-pre-line text-xs sm:text-[13px]">{msg.text}</p>

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

              {/* Bot Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl w-fit"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.3s]" />
                  <span className="text-[11px] text-slate-400 ml-1 font-mono">Vyom Agent is thinking...</span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            {messages.length <= 3 && (
              <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/70 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
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
                  placeholder="Ask Vyom AI about solutions, pricing..."
                  className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
                  aria-label="Ask AI assistant"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className={`p-1.5 rounded-xl transition-all ${
                    input.trim()
                      ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md active:scale-95 cursor-pointer"
                      : "text-slate-600 cursor-not-allowed"
                  }`}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-500 font-mono">
                <span>Deterministic Enterprise AI Engine</span>
                <span>Press Enter ↵</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
