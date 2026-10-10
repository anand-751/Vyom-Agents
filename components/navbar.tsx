"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";
import { VyomBrandLogo } from "@/components/ui/vyom-logo";

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
    { name: "Ecosystem", href: "#ecosystem" },
    { name: "Use Cases", href: "#use-cases" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-stone-200/80 shadow-xs py-3 text-slate-900"
          : "bg-transparent pt-5 sm:pt-6 pb-3 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center shrink-0">
            <VyomBrandLogo isScrolled={isScrolled} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={`hidden md:flex items-center gap-1 p-1 rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-stone-100/90 border border-stone-200/80 backdrop-blur-md shadow-xs"
              : "bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
          }`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-full text-[13px] font-medium tracking-wide transition-all duration-200 border border-transparent ${
                  isScrolled
                    ? "text-slate-600 hover:text-slate-950 hover:bg-white hover:border-stone-200/60 hover:shadow-xs"
                    : "text-stone-300 hover:text-white hover:bg-white/10 hover:backdrop-blur-md hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.07)]"
                }`}
              >
                <span>{link.name}</span>
              </a>
            ))}
          </nav>

          {/* Right Action CTA (Pill Button Matching Brand Theme) */}
          <div className="hidden md:flex items-center shrink-0">
            <button
              onClick={openContactModal}
              className={`relative group inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 active:scale-[0.98] overflow-hidden ${
                isScrolled
                  ? "bg-slate-950 hover:bg-slate-800 text-white shadow-md border border-slate-800"
                  : "bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:via-amber-400 hover:to-orange-500 text-white shadow-[0_0_22px_rgba(249,115,22,0.4)] hover:shadow-[0_0_32px_rgba(249,115,22,0.65)] border border-orange-300/35 hover:scale-[1.02]"
              }`}
            >
              {/* Shimmer sweep */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[350%] transition-transform duration-1000 ease-out pointer-events-none" />
              <span className="relative z-10 font-medium">Get Started</span>
              <span className="relative z-10 w-4 h-4 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:bg-white/30">
                <ArrowRight className="w-2.5 h-2.5 text-white" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={openContactModal}
              className="px-3.5 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-xs font-semibold shadow-[0_0_12px_rgba(249,115,22,0.35)] border border-orange-300/30"
            >
              Get Started
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 rounded-lg border transition-all ${
                isScrolled
                  ? "text-slate-700 border-stone-200 bg-stone-100"
                  : "text-white border-white/20 bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-stone-950 text-white border-b border-stone-800 px-6 py-4 space-y-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-stone-300 hover:text-white"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-stone-800">
              <button
                onClick={openContactModal}
                className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-xs font-semibold shadow-[0_0_16px_rgba(249,115,22,0.4)] border border-orange-300/30"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
