"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ArrowRight,
  PhoneCall,
  Sparkles
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";

export function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openContactModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "contact");
    router.push(`?${params.toString()}`, { scroll: false });
    setMobileMenuOpen(false);
  };

  const openVoiceProduct = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("product", "voice-agent");
    router.push(`?${params.toString()}`, { scroll: false });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Products", href: "#products" },
    { name: "AI Ecosystem", href: "#ecosystem" },
    { name: "Pricing & ROI", href: "#roi" },
    { name: "Services", href: "#services" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "Why Us", href: "#why-us" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-2xl border-b border-slate-200/70 shadow-sm py-3.5 sm:py-4"
          : "bg-transparent py-5 sm:py-7"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative h-12 sm:h-13 w-15 sm:w-16 rounded-2xl bg-white border border-slate-200/80 p-1.5 flex items-center justify-center shadow-xs group-hover:border-sky-400 group-hover:shadow-glow transition-all duration-300 overflow-hidden shrink-0">
              <Image
                src="/logo.png"
                alt="Vyom Agents Logo"
                width={68}
                height={52}
                className="h-full w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-sky-700 transition-colors">
                {BRAND_CONFIG.name}
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase text-sky-600 -mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Autonomous AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links — iPhone Glass Segmented Bar */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/[0.04] backdrop-blur-2xl p-2 rounded-full border border-black/[0.08] shadow-[0_8px_32px_0_rgba(15,23,42,0.06),inset_0_1px_1px_0_rgba(255,255,255,0.95)] ring-1 ring-black/[0.03] relative">
            {/* Apple Specular Top Reflection */}
            <div className="absolute inset-x-5 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/95 to-transparent pointer-events-none" />
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-5 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 rounded-full transition-all duration-150 hover:bg-slate-900/[0.09] active:bg-slate-900/[0.18] active:scale-[0.95] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)] group"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute inset-x-3 top-0.5 h-[1px] bg-gradient-to-r from-transparent via-white/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={openVoiceProduct}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950 px-4.5 py-2.5 rounded-full bg-slate-900/[0.05] hover:bg-slate-900/[0.10] active:bg-slate-900/[0.20] border border-black/[0.08] hover:border-black/[0.14] backdrop-blur-2xl shadow-[0_2px_8px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all active:scale-[0.95] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)]"
            >
              <PhoneCall className="w-4 h-4 text-sky-600" />
              <span>Voice Demo</span>
            </button>

            <button
              onClick={openContactModal}
              className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none active:scale-[0.96] transition-transform"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 rounded-full transition-all group-hover:scale-105" />
              <span className="relative flex items-center gap-2 px-5.5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold transition-all group-hover:bg-slate-800 active:bg-slate-950 shadow-md">
                <span>Book Discovery Call</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2.5">
            <button
              onClick={openContactModal}
              className="px-3.5 py-2 bg-slate-900 text-white rounded-full text-xs font-semibold shadow-xs hover:bg-slate-800 active:bg-slate-950 active:scale-95 transition-all"
            >
              Book Call
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 hover:text-slate-950 rounded-xl bg-slate-900/[0.05] hover:bg-slate-900/[0.10] active:bg-slate-900/[0.20] border border-black/[0.08] active:scale-90 transition-all backdrop-blur-xl"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200/80 px-4 pt-2 pb-6 space-y-1 shadow-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-900/[0.07] active:bg-slate-900/[0.15] active:scale-[0.98] rounded-xl transition-all"
              >
                {link.name}
              </a>
            ))}


            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={openVoiceProduct}
                className="w-full py-2.5 text-xs font-semibold text-sky-700 bg-sky-50 rounded-xl flex items-center justify-center gap-2 border border-sky-200"
              >
                <PhoneCall className="w-4 h-4 text-sky-600" />
                <span>Test Live Voice Agent</span>
              </button>
              <button
                onClick={openContactModal}
                className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-xl flex items-center justify-center gap-2 shadow-md"
              >
                <span>Book Discovery Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
