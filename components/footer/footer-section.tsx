"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ArrowRight, 
  Instagram,
  Twitter, 
  Linkedin,
  Youtube
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/constants";
import { VyomBrandLogo } from "@/components/ui/vyom-logo";

export function FooterSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const openContactModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "contact");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <footer id="contact" className="bg-[#070A10] text-white relative overflow-hidden pt-14 pb-8 border-t border-stone-800">
      
      {/* Subtle warm amber glow */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[200px] bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Dark CTA Banner */}
        <div className="rounded-2xl bg-stone-900/90 border border-stone-800 p-6 sm:p-10 mb-10 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-white">
                Ready to build with Vyom Agents?
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Deploy autonomous multi-agent workforces and conversational voice agents engineered for enterprise scale.
              </p>
            </div>
            
            <button
              onClick={openContactModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-stone-200 text-slate-950 font-semibold text-xs sm:text-sm transition-all active:scale-[0.98] shadow-sm group shrink-0"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Links Navigation Bar (Matching Template) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-b border-stone-800/80 text-xs">
          
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <VyomBrandLogo isScrolled={false} />
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6 text-stone-400 font-medium flex-wrap">
            <a href="/#products" className="hover:text-white transition-colors">Products</a>
            <a href="/#use-cases" className="hover:text-white transition-colors">Use Cases</a>
            <Link href="/blogs" className="hover:text-white transition-colors">Blog</Link>
            <a href="/#tech-stack" className="hover:text-white transition-colors">Developers</a>
            <a href="/#about" className="hover:text-white transition-colors">Company</a>
          </div>

        </div>

        {/* Bottom Legal & Socials Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <p>© 2025 {BRAND_CONFIG.name}. All rights reserved.</p>
          
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-stone-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-stone-300 transition-colors">
              Terms
            </Link>
            <button onClick={openContactModal} className="hover:text-stone-300 transition-colors">
              Contact
            </button>
            <div className="flex items-center gap-3 pl-2 text-stone-400">
              <a 
                href="https://www.instagram.com/vyom_agents" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                title="Instagram @vyom_agents"
                aria-label="Instagram @vyom_agents"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="YouTube">
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
