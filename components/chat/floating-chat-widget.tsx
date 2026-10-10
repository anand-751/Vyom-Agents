"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Sparkles, 
  RotateCcw, 
  Minus,
  ArrowRight,
  ChevronRight,
  Lock,
  Layers,
  Calendar,
  CreditCard,
  Search,
  Check,
  Send,
  User,
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";
import { VyomLogoIcon } from "@/components/ui/vyom-logo";

interface ProductCardData {
  title: string;
  subtitle: string;
  imageSrc: string;
  features: string[];
  productParam: string;
}

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  productCard?: ProductCardData;
  isDemoForm?: boolean;
  actionButtons?: Array<{
    label: string;
    action: "contact" | "voice" | "pricing" | "products" | "demo";
  }>;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    sender: "bot",
    text: "Hi! 👋 Welcome to Vyom Agents.\nHow can I help you today?",
    timestamp: "Just now",
  },
];

/**
 * UI-Friendly Markdown & Text Formatter for Bot & User Responses
 */
function FormattedMessage({ text, isUser = false }: { text: string; isUser?: boolean }) {
  if (!text) return null;

  // For user-sent messages: crisp, clear white text with proper line breaking
  if (isUser) {
    return (
      <p className="text-xs sm:text-[12.5px] leading-relaxed text-white font-medium whitespace-pre-wrap">
        {text}
      </p>
    );
  }

  // Normalize escaped newlines (\r\n, \n, literal \n)
  const normalized = text
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\r/g, "\n");

  const lines = normalized.split("\n");

  return (
    <div className="space-y-1.5 text-xs sm:text-[12px] leading-relaxed text-slate-800">
      {lines.map((rawLine, idx) => {
        const line = rawLine.trim();
        if (!line) {
          return <div key={idx} className="h-0.5" />;
        }

        // Bullet point item (•, -, *)
        const bulletMatch = line.match(/^(\*|-|•)\s+(.*)/);
        if (bulletMatch) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-0.5 my-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
              <div className="flex-1 leading-snug text-slate-800">
                {renderInlineMarkdown(bulletMatch[2])}
              </div>
            </div>
          );
        }

        // Numbered list item (1., 2.)
        const numMatch = line.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-0.5 my-0.5">
              <span className="w-3.5 h-3.5 rounded-full bg-stone-100 border border-stone-200 text-[9px] font-bold text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                {numMatch[1]}
              </span>
              <div className="flex-1 leading-snug text-slate-800">
                {renderInlineMarkdown(numMatch[2])}
              </div>
            </div>
          );
        }

        // Subheader (### or ##)
        if (line.startsWith("### ") || line.startsWith("## ")) {
          const headerText = line.replace(/^#+\s+/, "");
          return (
            <h4 key={idx} className="font-bold text-slate-950 text-xs sm:text-[12.5px] pt-1 leading-tight">
              {renderInlineMarkdown(headerText)}
            </h4>
          );
        }

        // Standard paragraph
        return (
          <p key={idx} className="leading-relaxed">
            {renderInlineMarkdown(line)}
          </p>
        );
      })}
    </div>
  );
}

function renderInlineMarkdown(str: string): React.ReactNode {
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={i} className="font-semibold text-slate-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function FloatingChatWidget() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Demo Form State inside chat
  const [demoForm, setDemoForm] = useState({
    name: "",
    email: "",
    company: "",
    interest: "AI Receptionist (Voice Agent)",
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoSubmitting, setDemoSubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-hide tooltip after 10 seconds if not clicked
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const openContactModal = (product?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "contact");
    if (product) params.set("product", product);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleActionClick = (action?: "contact" | "voice" | "pricing" | "products" | "demo") => {
    if (!action) return;
    if (action === "contact") openContactModal();
    if (action === "voice") openContactModal("voice-agent");
    if (action === "pricing") {
      openContactModal();
    }
    if (action === "products") {
      const el = document.getElementById("products");
      el?.scrollIntoView({ behavior: "smooth" });
    }
    if (action === "demo") {
      handleQuickAction("book-demo");
    }
  };

  // Quick Action Card click handlers (Welcome screen 2x2 grid)
  const handleQuickAction = (actionKey: string) => {
    if (actionKey === "explore-products") {
      sendUserMessage("Tell me about your frontline AI products.", {
        text: "Here are our 3 frontline autonomous AI products:\n\n• **AI Receptionist (AI Voice Agent)** — Answers calls 24/7 in 45+ languages, schedules appointments directly into your calendar, and syncs caller info to your CRM.\n• **AI Concierge App** — 24/7 digital guest assistant for room service, amenity requests, and bookings with zero wait times.\n• **Accounting Operations & Reconciliation Agent** — Automatically matches invoices against bank feeds, flags discrepancies, and balances ledgers.\n\nWould you like a demo or more details on any of these?",
        actionButtons: [
          { label: "Book a Demo", action: "demo" },
          { label: "View Products Section", action: "products" },
        ],
      });
    } else if (actionKey === "book-demo") {
      sendUserMessage("I'd like to book a demo.", {
        text: "I can help you book a demo with our team. Please share a few quick details:",
        isDemoForm: true,
      });
    } else if (actionKey === "pricing-roi" || actionKey === "custom-quote") {
      sendUserMessage("Tell me about custom solutions and engagement models.", {
        text: "Our autonomous AI workforces and solutions are scoped custom to your operational volume, systems integration, and specific business workflows.\n\nEvery engagement includes dedicated solutions engineering, custom integrations, deterministic guardrails, and ongoing enterprise support.\n\nWould you like to schedule a discovery call with our engineering team?",
        actionButtons: [
          { label: "Book Discovery Call", action: "contact" },
          { label: "View Products Section", action: "products" },
        ],
      });
    } else if (actionKey === "ask-question") {
      inputRef.current?.focus();
    }
  };

  const sendUserMessage = (userText: string, botPreset?: Partial<ChatMessage>) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);

    if (botPreset) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: botPreset.text || "",
          timestamp: "Just now",
          productCard: botPreset.productCard,
          isDemoForm: botPreset.isDemoForm,
          actionButtons: botPreset.actionButtons,
        };
        setMessages((prev) => [...prev, botMsg]);
      }, 400);
    }
  };

  const handleSendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    setInput("");
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
        content: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed, history: historyPayload }),
      });

      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();

      let reply = data.reply || "I am here to help you deploy autonomous AI agents for your business.";

      let isDemoForm = false;
      const lower = trimmed.toLowerCase();
      if (lower.includes("demo") || lower.includes("book")) {
        isDemoForm = true;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: reply,
          timestamp: "Just now",
          isDemoForm,
          actionButtons: !isDemoForm ? [
            { label: "Book a Demo", action: "demo" },
            { label: "Explore Products", action: "products" },
          ] : undefined,
        },
      ]);
    } catch {
      // Graceful local fallback
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "Vyom Agents builds enterprise Agentic AI solutions for business owners. Would you like to explore our frontline products or schedule a demo?",
          timestamp: "Just now",
          actionButtons: [
            { label: "Explore Products", action: "products" },
            { label: "Book a Demo", action: "demo" },
          ],
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleDemoFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoForm.name || !demoForm.email) return;

    setDemoSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: demoForm.name,
          email: demoForm.email,
          companyName: demoForm.company || "Not provided",
          interestedProduct: demoForm.interest,
          notes: "Submitted via Chatbot Inline Demo Flow",
        }),
      });
      setDemoSubmitted(true);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: `🎉 Thank you, **${demoForm.name}**! Your demo request for **${demoForm.interest}** has been received. Our team will reach out to **${demoForm.email}** shortly.`,
          timestamp: "Just now",
        },
      ]);
    } catch {
      setDemoSubmitted(true);
    } finally {
      setDemoSubmitting(false);
    }
  };

  const resetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setDemoSubmitted(false);
  };

  const isInitialState = messages.length === 1;

  return (
    <aside aria-label="Autonomous AI Assistant" className="pointer-events-auto">
      {/* Floating Action Trigger Button — Matching State 1: Collapsed State */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex items-center gap-3 pointer-events-auto">
        {/* Helper Notification Speech Bubble (Pill on left with arrow pointer) */}
        <AnimatePresence>
          {!isOpen && showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              onClick={() => {
                setIsOpen(true);
                setShowTooltip(false);
              }}
              className="relative hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white border border-stone-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.08)] cursor-pointer hover:border-stone-300 hover:shadow-md transition-all select-none group"
            >
              <div className="text-left">
                <span className="text-[11.5px] font-bold text-slate-900 block leading-tight">
                  Chat with our AI Agent
                </span>
                <span className="text-[10.5px] text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                  Get instant answers{" "}
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-slate-300 hover:text-slate-600 ml-1 p-0.5 rounded transition-colors"
                aria-label="Dismiss tooltip"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary Circular Floating Launcher Button */}
        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
            setShowTooltip(false);
          }}
          className="relative w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#070A10] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(14,165,233,0.4)] border border-sky-400/50 focus:outline-none overflow-hidden group active:scale-95 hover:scale-105 transition-all duration-200 cursor-pointer p-0"
          aria-label={isOpen ? "Close AI chat assistant" : "Open AI chat assistant"}
        >
          {/* Circular Robot Image */}
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
            <Image
              src="/images/chatbot-circle.png"
              alt="Vyom AI Assistant"
              width={60}
              height={60}
              className={`w-full h-full object-cover transition-transform duration-300 ${isOpen ? "brightness-50" : "group-hover:scale-105"}`}
              priority
            />
          </div>

          {/* Luminous Neon Blue Orbital Halo Glow */}
          <div className="absolute inset-0 rounded-full bg-sky-400/10 pointer-events-none group-hover:bg-sky-400/20 transition-colors" />

          {/* Orange Notification Badge (+) on top right */}
          {!isOpen && (
            <span className="absolute top-1 right-1 z-20 flex items-center justify-center w-4 h-4 rounded-full bg-orange-600 text-white text-[10px] font-bold border-2 border-[#070A10] shadow-xs">
              +
            </span>
          )}

          {/* If open, sleek overlay with X close button */}
          {isOpen && (
            <div className="absolute inset-0 z-20 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center">
              <X className="w-5 h-5 text-white transition-transform" />
            </div>
          )}
        </button>
      </div>

      {/* Floating AI Chat Dialog Modal Box — Compact, Ergonomic Ratio (360px x 490px) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-[9998] sm:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-3 bottom-[72px] sm:inset-auto sm:bottom-20 sm:right-6 z-[9999] w-auto sm:w-[360px] h-[490px] max-h-[82vh] bg-white rounded-3xl border border-stone-200/90 shadow-[0_16px_45px_-10px_rgba(0,0,0,0.16)] flex flex-col overflow-hidden text-slate-900"
            >
              {/* Soft Warm/Sky Wave Gradient Wash at bottom */}
              <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-sky-50/50 via-amber-50/20 to-transparent pointer-events-none -z-0" />

              {/* Dialog Header — Exact White Container with Logo Pill */}
              <div className="px-4 py-3 bg-white border-b border-stone-100 flex items-center justify-between shrink-0 relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-sky-400/50 shadow-2xs shrink-0">
                    <Image
                      src="/images/chatbot-circle.png"
                      alt="Vyom AI Agent"
                      width={28}
                      height={28}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-[13px] text-slate-950 leading-tight">
                      Vyom Agents AI
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] text-slate-500 font-medium">Online</span>
                    </div>
                  </div>
                </div>

                {/* Top Controls: Reset, Minimize, Close */}
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={resetChat}
                    title="Reset conversation"
                    className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors"
                    aria-label="Restart chat"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Minimize"
                    className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors"
                    aria-label="Minimize dialog"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Close"
                    className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors"
                    aria-label="Close dialog"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-3 sm:p-3.5 overflow-y-auto space-y-3 scrollbar-none text-xs relative z-10">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl p-3 leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-slate-950 text-white rounded-br-xs shadow-2xs"
                          : "bg-stone-50 border border-stone-200/70 text-slate-800 rounded-tl-xs shadow-2xs space-y-2"
                      }`}
                    >
                      {/* Formatted Markdown & Structured Content */}
                      <FormattedMessage text={msg.text} isUser={msg.sender === "user"} />


                      {/* Interactive Book a Demo Inline Form (Matching State 5) */}
                      {msg.isDemoForm && !demoSubmitted && (
                        <form onSubmit={handleDemoFormSubmit} className="space-y-1.5 mt-2 pt-2 border-t border-stone-200/80 text-left">
                          <div>
                            <label className="text-[9px] font-bold text-slate-700 uppercase tracking-wider block mb-0.5">
                              Full Name
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Enter your name"
                              value={demoForm.name}
                              onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                              className="w-full px-2 py-1 rounded-md border border-stone-200 bg-white text-[11px] text-slate-900 focus:outline-none focus:border-slate-900"
                            />
                          </div>

                          <div>
                            <label className="text-[9px] font-bold text-slate-700 uppercase tracking-wider block mb-0.5">
                              Work Email
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="you@company.com"
                              value={demoForm.email}
                              onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                              className="w-full px-2 py-1 rounded-md border border-stone-200 bg-white text-[11px] text-slate-900 focus:outline-none focus:border-slate-900"
                            />
                          </div>

                          <div>
                            <label className="text-[9px] font-bold text-slate-700 uppercase tracking-wider block mb-0.5">
                              Company Name
                            </label>
                            <input
                              type="text"
                              placeholder="Your company"
                              value={demoForm.company}
                              onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })}
                              className="w-full px-2 py-1 rounded-md border border-stone-200 bg-white text-[11px] text-slate-900 focus:outline-none focus:border-slate-900"
                            />
                          </div>

                          <div>
                            <label className="text-[9px] font-bold text-slate-700 uppercase tracking-wider block mb-0.5">
                              What are you interested in?
                            </label>
                            <select
                              value={demoForm.interest}
                              onChange={(e) => setDemoForm({ ...demoForm, interest: e.target.value })}
                              className="w-full px-2 py-1 rounded-md border border-stone-200 bg-white text-[11px] text-slate-900 focus:outline-none focus:border-slate-900"
                            >
                              <option>AI Receptionist (Voice Agent)</option>
                              <option>AI Concierge App</option>
                              <option>Accounting Operations</option>
                              <option>Custom AI Workforce</option>
                            </select>
                          </div>

                          <button
                            type="submit"
                            disabled={demoSubmitting}
                            className="w-full mt-2 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                          >
                            <span>{demoSubmitting ? "Submitting..." : "Book My Demo"}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </form>
                      )}

                      {/* Interactive Action CTA Buttons */}
                      {msg.actionButtons && msg.actionButtons.length > 0 && (
                        <div className="pt-1.5 flex flex-wrap items-center gap-1.5">
                          {msg.actionButtons.map((btn, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleActionClick(btn.action)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-stone-100 border border-stone-200/90 text-slate-800 text-[10.5px] font-medium transition-all active:scale-95 shadow-2xs"
                            >
                              <span>{btn.label}</span>
                              <ChevronRight className="w-3 h-3 text-slate-500" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Welcome Screen: 4 Action / Quick Prompt Cards in 2x2 Grid (Matching State 2) */}
                {isInitialState && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 gap-2 pt-1"
                  >
                    {/* 1. Explore Our Products */}
                    <button
                      onClick={() => handleQuickAction("explore-products")}
                      className="p-2.5 rounded-xl bg-white border border-stone-200/90 hover:border-stone-300 hover:shadow-xs transition-all text-left flex items-start justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="w-6 h-6 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center mb-1.5">
                          <Layers className="w-3 h-3" />
                        </div>
                        <h4 className="font-bold text-[11px] text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">
                          Explore Our Products
                        </h4>
                        <p className="text-[9.5px] text-slate-500 mt-0.5 leading-tight">
                          Learn about our AI agents
                        </p>
                      </div>
                      <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                    </button>

                    {/* 2. Book a Demo */}
                    <button
                      onClick={() => handleQuickAction("book-demo")}
                      className="p-2.5 rounded-xl bg-white border border-stone-200/90 hover:border-stone-300 hover:shadow-xs transition-all text-left flex items-start justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="w-6 h-6 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center mb-1.5">
                          <Calendar className="w-3 h-3" />
                        </div>
                        <h4 className="font-bold text-[11px] text-slate-900 group-hover:text-orange-600 transition-colors leading-tight">
                          Book a Demo
                        </h4>
                        <p className="text-[9.5px] text-slate-500 mt-0.5 leading-tight">
                          Talk to our team
                        </p>
                      </div>
                      <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                    </button>

                    {/* 3. Custom Quotes / Enterprise Inquiry */}
                    <button
                      onClick={() => handleQuickAction("custom-quote")}
                      className="p-2.5 rounded-xl bg-white border border-stone-200/90 hover:border-stone-300 hover:shadow-xs transition-all text-left flex items-start justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5">
                          <CreditCard className="w-3 h-3" />
                        </div>
                        <h4 className="font-bold text-[11px] text-slate-900 group-hover:text-emerald-600 transition-colors leading-tight">
                          Custom Quotes
                        </h4>
                        <p className="text-[9.5px] text-slate-500 mt-0.5 leading-tight">
                          Tailored project scope
                        </p>
                      </div>
                      <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                    </button>

                    {/* 4. Ask a Question */}
                    <button
                      onClick={() => handleQuickAction("ask-question")}
                      className="p-2.5 rounded-xl bg-white border border-stone-200/90 hover:border-stone-300 hover:shadow-xs transition-all text-left flex items-start justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center mb-1.5">
                          <Search className="w-3 h-3" />
                        </div>
                        <h4 className="font-bold text-[11px] text-slate-900 group-hover:text-purple-600 transition-colors leading-tight">
                          Ask a Question
                        </h4>
                        <p className="text-[9.5px] text-slate-500 mt-0.5 leading-tight">
                          Get instant answers
                        </p>
                      </div>
                      <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                    </button>
                  </motion.div>
                )}

                {/* Bot Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 bg-stone-50 border border-stone-200/80 px-2.5 py-1.5 rounded-xl w-fit"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.3s]" />
                    <span className="text-[10px] text-slate-400 font-medium ml-1">Thinking...</span>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Footer Bar — Rounded Pill Container with Sparkles & Black Submit Circle */}
              <div className="p-2.5 sm:p-3 bg-white border-t border-stone-100 shrink-0 relative z-10 space-y-1.5">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2 bg-white border border-stone-200/90 rounded-full pl-3 pr-1 py-1 focus-within:border-stone-400 focus-within:shadow-xs transition-all shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about products, solutions, or demo..."
                    className="flex-1 bg-transparent text-[11.5px] sm:text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    aria-label="Ask AI assistant"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="w-7 h-7 rounded-full bg-slate-950 hover:bg-slate-800 text-white flex items-center justify-center transition-all shrink-0 active:scale-95 disabled:opacity-40 cursor-pointer"
                    aria-label="Send message"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </form>

                {/* Footer Subtext */}
                <div className="flex items-center justify-between px-1 text-[9.5px] text-slate-400 font-medium select-none">
                  <span className="flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5 text-slate-400" />
                    <span>Powered by Vyom Agents AI</span>
                  </span>
                  <span>Responses may take a few seconds</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </aside>
  );
}
