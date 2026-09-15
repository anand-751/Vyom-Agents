"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight, 
  Activity,
  Cpu,
  Layers,
  PhoneCall
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";

export function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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

  const navLinks = [
    { name: "Products", href: "#products" },
    { name: "AI Ecosystem", href: "#ecosystem" },
    { name: "Services", href: "#services" },
    { name: "Why Us", href: "#why-us" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official Logo with Infinite Loop */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-14 rounded-xl bg-white border border-slate-200/90 p-1 flex items-center justify-center shadow-sm group-hover:border-sky-400 group-hover:shadow-glow transition-all duration-300 overflow-hidden">
              <img
                src="/logo.png"
                alt="Vyom Agents Logo"
                className="h-full w-auto object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-950 via-slate-800 to-indigo-950 bg-clip-text text-transparent">
                {BRAND_CONFIG.name}
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-sky-600 -mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Agentic AI & Automation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1 rounded-full border border-slate-200/80 backdrop-blur-sm shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-white rounded-full transition-all duration-200 shadow-none hover:shadow-sm"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("product", "voice-agent");
                router.push(`?${params.toString()}`, { scroll: false });
              }}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-sky-600 px-3 py-2 rounded-lg hover:bg-sky-50/60 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-sky-500" />
              <span>Voice Agent Demo</span>
            </button>

            <button
              onClick={openContactModal}
              className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 rounded-full transition-all group-hover:scale-105" />
              <span className="relative flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold transition-all group-hover:bg-slate-800 shadow-sm">
                <span>Book Discovery Call</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={openContactModal}
              className="px-3 py-1.5 bg-slate-900 text-white rounded-full text-xs font-medium"
            >
              Book Call
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-950 rounded-lg hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50/50 rounded-lg"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("product", "voice-agent");
                  router.push(`?${params.toString()}`, { scroll: false });
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-xs font-semibold text-sky-700 bg-sky-50 rounded-lg flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-sky-600" />
                <span>Test Live Voice Agent</span>
              </button>
              <button
                onClick={openContactModal}
                className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg flex items-center justify-center gap-2 shadow-md"
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
