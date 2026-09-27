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
            "Yes, absolutely! We build modern digital storefronts and websites designed specifically for cafes and restaurants:\n\n1. Digital Menu & Online Ordering: Customers can browse your menu, customize items, and pay straight from their phones without third-party commission fees.\n2. Instant Kitchen & Staff Alerts: New orders ping your team immediately so food is prepared without delay.\n3. Automatic Digital Receipts & Reviews: Sends bills directly via WhatsApp or SMS, and helps collect 5-star Google reviews from happy diners.\n\nWould you like to schedule a free consultation to see how this fits your cafe?",
          actionButtons: [
            { label: "Book Free Consultation", action: "contact" },
            { label: "Explore Solutions", action: "services" },
            { label: "AI Voice Demo", action: "voice" },
          ],
        };
      } else {
        return {
          reply:
            "Yes, absolutely! We design and build fast, modern websites and client portals tailored for your business:\n\n1. Built For Growth: Clean mobile-friendly design that makes it effortless for visitors to become paying customers.\n2. Built-In 24/7 Assistant: Online booking, interactive inquiries, and customer self-service built right in.\n3. Complete Ownership: You own 100% of your website and customer data with zero recurring marketplace fees.\n\nWould you like to schedule a free consultation to chat about your website?",
          actionButtons: [
            { label: "Book Free Consultation", action: "contact" },
            { label: "Explore Solutions", action: "services" },
            { label: "AI Voice Demo", action: "voice" },
          ],
        };
      }
    }

    // Desktop Applications & Invoicing/Orders
    if (
      lower.includes("desktop") ||
      lower.includes("invoice") ||
      lower.includes("invoices") ||
      lower.includes("order") ||
      lower.includes("orders")
    ) {
      return {
        reply:
          "We build custom software designed to keep your daily operations fast, organized, and error-free:\n\n1. Fast Invoicing & Order Tracking: Create and send bills in seconds, match supplier orders, and track customer payments without messy paper trails.\n2. Works Offline & Connects Locally: Syncs smoothly with your receipt printers, barcode scanners, and accounting tools.\n3. Automatic Reminders: Flags unpaid bills and sends status updates to your customers automatically.\n\nWould you like to schedule a free consultation to discuss your specific software needs?",
        actionButtons: [
          { label: "Book Free Consultation", action: "contact" },
          { label: "Explore Solutions", action: "services" },
          { label: "AI Voice Demo", action: "voice" },
        ],
      };
    }

    // Automotive & Car Dealerships
    if (lower.includes("dealership") || lower.includes("dealer") || lower.includes("car dealer") || lower.includes("automotive")) {
      return {
        reply:
          "For car dealerships, we help you capture every buyer lead and cut down on paperwork:\n\n1. 24/7 Phone Lead Capture: Answers buyer inquiries, books test drives, and qualifies trade-in leads instantly, even on weekends and evenings when you're off the lot.\n2. Digital Showroom: A clean website showcasing your live inventory with online financing requests and booking.\n3. Fast Invoicing & Paperwork Automation: Software that handles parts and vehicle invoices, tracks customer orders, and cuts hours of manual paperwork.\n\nWould you like to schedule a free consultation to see this in action?",
        actionButtons: [
          { label: "Book Free Consultation", action: "contact" },
          { label: "AI Voice Demo", action: "voice" },
          { label: "Explore Solutions", action: "services" },
        ],
      };
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
          "For cafes and food businesses, we help streamline your rush hours from order taking to billing:\n\n1. 24/7 Phone & Digital Ordering: Takes customer phone orders and provides a mobile menu so guests can order and pay with zero wait times.\n2. Kitchen & Staff Alerts: Instantly notifies your kitchen and team whenever an order or table booking comes in.\n3. Automatic Digital Receipts & Reviews: Sends bills directly via WhatsApp or SMS, and helps you collect 5-star Google reviews from satisfied guests.\n\nWould you like to schedule a free consultation to see how this works for your cafe?",
        actionButtons: [
          { label: "AI Voice Demo", action: "voice" },
          { label: "Book Free Consultation", action: "contact" },
          { label: "Explore Solutions", action: "services" },
        ],
      };
    }

    // 4. Domain: Healthcare & Clinic
    if (lower.includes("dental") || lower.includes("clinic") || lower.includes("health") || lower.includes("doctor") || lower.includes("patient")) {
      return {
        reply:
          "For clinics and healthcare practices, we eliminate phone tag and paperwork headaches:\n\n1. 24/7 Appointment Scheduling: An AI phone assistant answers patient calls and books directly onto your doctor's calendar so no patient call is missed.\n2. Automated Intake & Reminders: Sends digital intake forms and SMS reminders to reduce no-shows.\n3. 5-Star Reviews: Automatically invites satisfied patients to leave positive Google reviews.\n\nWould you like to try our live voice demo or book a quick consultation?",
        actionButtons: [
          { label: "Test Live Voice Demo", action: "voice" },
          { label: "Book Free Consultation", action: "contact" },
        ],
      };
    }

    // 4. Domain: Legal
    if (lower.includes("legal") || lower.includes("law") || lower.includes("attorney")) {
      return {
        reply:
          "For law practices, we streamline client intake and document handling:\n\n1. 24/7 Phone Triage: An AI phone assistant screens caller inquiries, checks basic details, and schedules consultations around the clock.\n2. Document & Record Automation: Automatically organizes case files, contracts, and forms without manual data entry.\n\nWould you like to schedule a free consultation to explore how this works?",
        actionButtons: [
          { label: "Test Voice Demo", action: "voice" },
          { label: "Schedule Consultation", action: "contact" },
        ],
      };
    }

    // 5. Product: Voice Receptionist
    if (lower.includes("voice") || lower.includes("receptionist") || lower.includes("phone") || lower.includes("call")) {
      return {
        reply:
          "Our AI phone assistant answers customer calls 24/7 without keeping anyone waiting on hold. It speaks naturally, answers questions, takes orders, and books appointments directly onto your calendar in real time. This means you never miss a customer or new inquiry, even during peak rush hours or when your doors are closed.\n\nWould you like to test our live voice demo?",
        actionButtons: [
          { label: "Test Live Voice Demo", action: "voice" },
          { label: "Book a Call", action: "contact" },
        ],
      };
    }

    // 6. Product: RPA & UI Automation
    if (lower.includes("rpa") || lower.includes("self-healing") || lower.includes("automation") || lower.includes("orchestrator") || lower.includes("uipath") || lower.includes("workflow")) {
      return {
        reply:
          "We replace tedious manual computer tasks with smart automated software workflows. Whether it's pulling invoice details, updating customer records, or syncing orders across your tools, our software handles it automatically in the background with zero manual data entry mistakes.\n\nWould you like to schedule a quick chat to discuss automating your workflows?",
        actionButtons: [
          { label: "Explore Solutions", action: "services" },
          { label: "Schedule a Chat", action: "contact" },
        ],
      };
    }

    // 7. Product: Pricing & ROI
    if (lower.includes("pricing") || lower.includes("roi") || lower.includes("cost") || lower.includes("save") || lower.includes("rate")) {
      return {
        reply:
          "We keep our pricing simple and transparent with three flexible plans: Starter (around ₹14,999/mo), Professional (₹23,999/mo), and Enterprise (₹33,990/mo) depending on your volume and custom setup. Most businesses easily earn back their investment by capturing after-hours leads and orders that would have otherwise slipped away. Would you like to check out our savings calculator?",
        actionButtons: [
          { label: "Open Savings Calculator", action: "roi" },
          { label: "Book a Call", action: "contact" },
        ],
      };
    }

    // Default Collaborative Discovery Fallback
    return {
      reply:
        "Vyom takes care of repetitive daily tasks so you and your team can focus on serving customers and growing:\n\n1. 24/7 Inbound Phone Assistant: Answers questions, takes orders, and books appointments around the clock so you never lose a customer.\n2. Digital Storefront & Reputation: A clean, modern website with automated WhatsApp review requests to build your 5-star reputation.\n3. Paperwork & Billing Automation: Automatically creates invoices, tracks orders, and updates your records without manual data entry.\n\nLet's schedule a free consultation to see how we can help your business!",
      actionButtons: [
        { label: "Book Free Consultation", action: "contact" },
        { label: "AI Voice Demo", action: "voice" },
        { label: "Explore Solutions", action: "services" },
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
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end gap-2.5 pointer-events-auto">
        {/* Helper Notification Tooltip (positioned at the top of the chatbot icon) */}
        <AnimatePresence>
          {!isOpen && showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.9 }}
              onClick={() => {
                setIsOpen(true);
                setShowTooltip(false);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-xl text-xs font-semibold text-slate-800 dark:text-slate-100 cursor-pointer hover:border-sky-400 transition-all hover:scale-105 group select-none whitespace-nowrap"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Chat with Vyom AI Agent</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-1 p-0.5 rounded transition-colors"
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
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-white leading-tight">
                        {BRAND_CONFIG.name} AI
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        Online
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Autonomous Solutions Architect
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
