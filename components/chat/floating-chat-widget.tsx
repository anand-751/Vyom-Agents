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
  actionButtons?: Array<{
    label: string;
    action: "contact" | "voice" | "roi" | "services";
  }>;
  ragSources?: string[];
  engine?: string;
  intent?: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    sender: "bot",
    text: "Hi! 👋 Welcome to Vyom Agents. How can I help you today?",
    timestamp: "Just now",
    actionButtons: [
      { label: "AI Voice Demo", action: "voice" },
      { label: "Explore Services", action: "services" },
      { label: "Book a Call", action: "contact" },
    ],
  },
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

  // Local fallback reply generator if network request fails (Strictly under 150 words)
  const generateFallbackReply = (userText: string): { reply: string; actionButtons: ChatMessage["actionButtons"] } => {
    const lower = userText.toLowerCase().trim();
    const clean = lower.replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
    const oneWord = clean.replace(/\s+/g, "");

    // 1a. Greetings (hi, hii, hiii, hey, heyy, hello, namaste, etc.)
    const isSingleGreetingWord = /^(h+i+|h+e+y+|h+e+l+l+o+|h+o+l+a+|howdy|yo+|hiya|sup|namaste|greetings)$/i.test(oneWord);
    const isGreetingPhrase = /^((h+i+|h+e+y+|h+e+l+l+o+|h+o+l+a+)\s+(there|friend|bro|buddy|team|all|vyom|ai))$/i.test(clean);
    const isTimeGreeting = /^(good\s+(morning|afternoon|evening|day|night))$/i.test(clean);
    const isShortHi = (clean.startsWith("hi ") || clean.startsWith("hello ") || clean.startsWith("hey ")) && clean.split(" ").length <= 3;

    if (isSingleGreetingWord || isGreetingPhrase || isTimeGreeting || isShortHi) {
      return {
        reply: "Hi there! 👋 How can I help you today? Feel free to ask about our AI voice receptionist, self-healing RPA, or tell me about your business.",
        actionButtons: [
          { label: "AI Voice Demo", action: "voice" },
          { label: "Explore Services", action: "services" },
          { label: "Book a Call", action: "contact" },
        ],
      };
    }

    // 1b. "How are you"
    if (/^(how\s+are\s+you|how\s+r\s+u|how\s+are\s+u|hows\s+it\s+going|how\s+do\s+you\s+do|how\s+are\s+things|hows\s+everything)$/i.test(clean)) {
      return {
        reply: "I'm doing great, thanks for asking! 😊 How are you doing today? How can I assist you with Vyom Agents?",
        actionButtons: [
          { label: "AI Voice Demo", action: "voice" },
          { label: "Book a Call", action: "contact" },
        ],
      };
    }

    // 1c. "Who are you" / "Tell me about your company"
    if (
      /\b(tell\s+me\s+about\s+(your\s+company|the\s+company|vyom|vyom\s+agents|yourself)|what\s+is\s+(your\s+company|the\s+company|vyom|vyom\s+agents|this\s+company|it)|who\s+are\s+you|what\s+do\s+you\s+do|what\s+can\s+you\s+do|introduce\s+yourself)\b/i.test(clean) ||
      /^(who\s+are\s+you|what\s+is\s+vyom|what\s+is\s+vyom\s+agents|what\s+do\s+you\s+do|what\s+can\s+you\s+do|introduce\s+yourself|tell\s+me\s+about\s+(yourself|vyom|vyom\s+agents))$/i.test(clean)
    ) {
      return {
        reply: "Vyom Agents (Vyom Autonomous Intelligence) is an enterprise Agentic AI SaaS company engineering autonomous AI agents and intelligent workflows that transform business operations from front-desk to back-office.\n\nWe build custom conversational AI voice agents, self-healing RPA bots, multi-agent swarms, and AI reputation systems.\n\nWhat kind of business or workflows are you looking to automate?",
        actionButtons: [
          { label: "Explore AI Agents", action: "services" },
          { label: "AI Voice Demo", action: "voice" },
          { label: "Book a Call", action: "contact" },
        ],
      };
    }

    // 1d. Gratitude
    if (/\b(thank\s+you|thanks|thx|thank\s+u|many\s+thanks|appreciate\s+it)\b/i.test(clean) && clean.split(" ").length <= 6) {
      return {
        reply: "You're very welcome! 😊 Let me know if you need anything else or if you'd like to test our live voice demo or discuss an automation.",
        actionButtons: [
          { label: "AI Voice Demo", action: "voice" },
          { label: "Book a Call", action: "contact" },
        ],
      };
    }

    // 1e. Affirmation
    if (/^(ok|okay|cool|great|awesome|perfect|nice|got\s+it|understood|sure|alright)$/i.test(clean)) {
      return {
        reply: "Sounds great! Feel free to ask any questions or let me know whenever you'd like to see a demo or discuss your use case.",
        actionButtons: [
          { label: "AI Voice Demo", action: "voice" },
          { label: "Explore Services", action: "services" },
        ],
      };
    }

    // 1f. Farewell
    if (/^(bye|goodbye|see\s+you|see\s+ya|have\s+a\s+good\s+day|cya|take\s+care)$/i.test(clean)) {
      return {
        reply: "Goodbye! Have a great day ahead! 👋 Feel free to reach back out anytime you have questions about Vyom Agents.",
        actionButtons: [
          { label: "Book a Call", action: "contact" },
        ],
      };
    }

    // 2. Out-of-Scope Check (Exempt business contexts)
    const hasBusinessTerms = /\b(restaurant|dining|cafe|food|business|voice|receptionist|call|phone|leads|review|booking|automation)\b/i.test(lower);
    if (!hasBusinessTerms && /\b(recipe|cook|bake|weather|cricket|football|nba|movie|song|joke|homework)\b/i.test(lower)) {
      return {
        reply: "I apologize, but as Vyom AI, I specialize exclusively in enterprise Agentic AI, autonomous workflows, and custom AI agents. I cannot assist with topics outside of technology and business automation.\n\nWould you like to explore how Vyom Agents can transform operations for your business?",
        actionButtons: [
          { label: "Explore AI Agents", action: "services" },
          { label: "Book a Call", action: "contact" },
        ],
      };
    }

    // 3. Service: Websites & Web Applications
    if (
      lower.includes("website") ||
      lower.includes("web app") ||
      lower.includes("portal") ||
      lower.includes("landing page") ||
      lower.includes("web design") ||
      lower.includes("build site") ||
      lower.includes("build website") ||
      lower.includes("create website") ||
      lower.includes("develop website")
    ) {
      if (
        lower.includes("restaurant") ||
        lower.includes("food") ||
        lower.includes("dining") ||
        lower.includes("cafe") ||
        lower.includes("bistro") ||
        lower.includes("bakery") ||
        lower.includes("bar") ||
        lower.includes("pizzeria")
      ) {
        return {
          reply:
            "Yes, absolutely! Vyom designs and develops high-performance, AI-native websites specifically tailored for restaurants:\n\n1. Interactive Menus & Online Ordering: Mobile-first Next.js web storefronts with commission-free direct online food ordering.\n2. Table Reservations & Embedded AI Voice: Direct table booking synced with our embedded conversational voice widget for instant guest FAQs.\n3. Automated Google Reviews: WhatsApp/SMS post-dining sequences to harvest +300% 5-star Google reviews.\n\nFor proper consultation around building your restaurant website, kindly contact us for a free consultation!",
          actionButtons: [
            { label: "Book Free Consultation", action: "contact" },
            { label: "Explore Services", action: "services" },
            { label: "AI Voice Demo", action: "voice" },
          ],
        };
      } else {
        return {
          reply:
            "Yes, absolutely! Vyom engineers high-performance, AI-native websites, client portals, and SaaS dashboards tailored for modern enterprises:\n\n1. Next.js Full-Stack Architecture: Sub-second page loads, SEO optimization, and Apple OS glassmorphic visual UI.\n2. Embedded AI Capabilities: Native conversational voice widgets, automated booking, and client self-service portals.\n3. Conversion-Driven UX: Mobile-first responsive design engineered for maximum visitor-to-customer conversion.\n\nFor proper consultation around your website or portal, kindly contact us for a free consultation!",
          actionButtons: [
            { label: "Book Free Consultation", action: "contact" },
            { label: "Explore Services", action: "services" },
            { label: "AI Voice Demo", action: "voice" },
          ],
        };
      }
    }

    // 4. Domain: Restaurant & Food Hospitality
    if (
      lower.includes("restaurant") ||
      lower.includes("food") ||
      lower.includes("dining") ||
      lower.includes("cafe") ||
      lower.includes("bistro") ||
      lower.includes("catering") ||
      lower.includes("bakery") ||
      lower.includes("bar") ||
      lower.includes("pizzeria")
    ) {
      return {
        reply:
          "For Restaurants & Food Businesses, Vyom automates high-friction front-desk and growth operations with zero human overhead:\n\n1. AI Voice Agent: Handles 24/7 inbound phone orders, table reservations, and menu/dietary FAQs with sub-400ms latency — eliminating missed calls during peak dining rush.\n2. Google Review & Reputation Agent: Automatically sends post-dining WhatsApp/SMS review requests to harvest +300% 5-star Google Reviews and catch negative feedback early.\n3. Autonomous RPA: Automates supplier invoice reconciliation and daily sales reporting.\n\nFor proper consultation around your business, kindly contact us for a free consultation!",
        actionButtons: [
          { label: "AI Voice Demo", action: "voice" },
          { label: "Book Free Consultation", action: "contact" },
          { label: "Explore Services", action: "services" },
        ],
      };
    }

    // 4. Domain: Healthcare & Clinic
    if (lower.includes("dental") || lower.includes("clinic") || lower.includes("health") || lower.includes("doctor") || lower.includes("patient")) {
      return {
        reply: "For Healthcare & Clinics, Vyom provides 2 core solutions:\n\n1. AI Voice Receptionist (Live): 24/7 patient booking with sub-400ms latency, syncing natively with Google Calendar, Dentrix & Epic (+42% conversion, zero missed calls).\n2. Self-Healing RPA & Review Agent: Automates patient intake and harvests +300% 5-star patient reviews on Google.\n\nFor proper consultation around your business, kindly contact us for a free consultation!",
        actionButtons: [
          { label: "Test Live Voice Demo", action: "voice" },
          { label: "Book Free Consultation", action: "contact" },
        ],
      };
    }

    // 4. Domain: Legal
    if (lower.includes("legal") || lower.includes("law") || lower.includes("attorney")) {
      return {
        reply: "For Legal Practices, Vyom automates client intake and document extraction with 2 targeted solutions:\n\n1. AI Voice Receptionist (Live): Sub-400ms 24/7 intake triage, conflict screening, and consultation scheduling.\n2. Self-Healing RPA & Multiagent Systems: Extracts court filings, contracts, and evidence without script breakage (99.8% recovery uptime).\n\nWould you like to schedule an architectural consultation?",
        actionButtons: [
          { label: "Test Voice Demo", action: "voice" },
          { label: "Schedule Consultation", action: "contact" },
        ],
      };
    }

    // 5. Product: Voice Receptionist
    if (lower.includes("voice") || lower.includes("receptionist") || lower.includes("phone") || lower.includes("call")) {
      return {
        reply: "Our flagship AI Voice Receptionist operates with sub-400ms latency (320ms typical), native Google Calendar & EHR/CRM sync, and human-like interruption handling across 45+ languages. It boosts appointment conversion by +42%.\n\nWould you like to test the live voice demo?",
        actionButtons: [
          { label: "Test Live Voice Demo", action: "voice" },
          { label: "Book Discovery Call", action: "contact" },
        ],
      };
    }

    // 6. Product: RPA & UI Automation
    if (lower.includes("rpa") || lower.includes("self-healing") || lower.includes("automation") || lower.includes("orchestrator") || lower.includes("uipath")) {
      return {
        reply: "Vyom's Self-Healing RPA engine beats legacy bots (UiPath, Selenium) using visual neural embeddings with Playwright. When target interfaces shift, it auto-remediates target selectors in real time with 99.8% recovery uptime.\n\nWould you like to explore our automation deliverables or schedule an audit?",
        actionButtons: [
          { label: "View Enterprise Services", action: "services" },
          { label: "Schedule Audit Call", action: "contact" },
        ],
      };
    }

    // 7. Product: Pricing & ROI
    if (lower.includes("pricing") || lower.includes("roi") || lower.includes("cost") || lower.includes("save") || lower.includes("rate")) {
      return {
        reply: "Our AI Receptionist offers 3 transparent tiers: Starter at ₹14,999/mo ($180) for 400 calls, Professional at ₹23,999/mo ($280) for 700 calls, and Enterprise at ₹33,990/mo ($400) for 1,000+ calls with custom CRM.\n\nWould you like to open our interactive ROI calculator?",
        actionButtons: [
          { label: "Open ROI Calculator", action: "roi" },
          { label: "Book Discovery Call", action: "contact" },
        ],
      };
    }

    // Default Collaborative Discovery Fallback
    return {
      reply: "Vyom Agents is an enterprise Agentic AI SaaS company engineering autonomous AI agents and intelligent workflows to transform modern businesses. Tell me about your industry or use case to explore tailored solutions.",
      actionButtons: [
        { label: "Explore AI Agents", action: "services" },
        { label: "Test Voice Demo", action: "voice" },
        { label: "Book a Call", action: "contact" },
      ],
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
          actionButtons: data.actionButtons || (data.actionButton ? [data.actionButton] : []),
          ragSources: data.ragSources,
          engine: data.engine,
          intent: data.intent,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error("Empty response");
      }
    } catch (error) {
      console.warn("Live chat API request failed, using local collaborative fallback:", error);
      const { reply, actionButtons } = generateFallbackReply(query);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actionButton: actionButtons?.[0],
        actionButtons,
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
              <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 scrollbar-none text-xs sm:text-sm">
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

                      {/* Interactive CTA Buttons (2 to 3 Recommended Products/Services) */}
                      {(() => {
                        const buttons = (msg.actionButtons && msg.actionButtons.length > 0)
                          ? msg.actionButtons
                          : (msg.actionButton ? [msg.actionButton] : []);
                        if (buttons.length === 0) return null;
                        return (
                          <div className="mt-2.5 pt-2 border-t border-slate-800/70 flex flex-wrap items-center gap-1.5">
                            {buttons.map((btn, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleActionClick(btn.action)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 text-sky-300 hover:text-white text-[11px] sm:text-xs font-medium transition-all active:scale-95"
                              >
                                <span>{btn.label}</span>
                                <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
                              </button>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </motion.div>
                ))}

                {/* Bot Typing Indicator with Collaborative Discovery & RAG Animation */}
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
                      <span>Collaborative Discovery & RAG reasoning...</span>
                    </span>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>


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
                    placeholder="Ask Vyom AI about autonomous agents, workflows, solutions..."
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
                    <span>Discovery Agent • Guardrails & Max 150 Words</span>
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
