import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { FooterSection } from "@/components/footer/footer-section";
import { TabModalController } from "@/components/modals/tab-modal-controller";
import { FloatingChatWidget } from "@/components/chat/floating-chat-widget";
import { BlogsContentView } from "@/components/blogs/blogs-content-view";

export const metadata: Metadata = {
  title: "Vyom Agents Intelligence | AI Concierge Demos & AI Receptionist Playbook",
  description:
    "Explore Vyom Agents enterprise intelligence. Watch live interactive video demonstrations of the AI Concierge App and read the definitive architectural executive playbook on deploying 24/7 AI Receptionists (Voice Agents).",
  keywords: [
    "AI Concierge App",
    "AI Receptionist (Voice Agents)",
    "Autonomous Guest Service",
    "Enterprise Voice AI",
    "Hotel AI Agent",
    "Concierge Video Demo",
    "Vyom Agents Blogs"
  ],
  openGraph: {
    title: "Vyom Agents Intelligence | AI Concierge Demos & AI Receptionist Playbook",
    description: "Live interactive video walkthroughs and executive enterprise architecture playbooks.",
    url: "https://vyom-agents.vercel.app/blogs",
    siteName: "Vyom Agents",
    type: "website",
  },
};

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-[#070A10] text-white selection:bg-orange-500 selection:text-white relative">
      {/* Universal Navbar */}
      <Suspense fallback={<div className="h-16 w-full" />}>
        <Navbar />
      </Suspense>

      {/* Top Ambient Glow Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-12 left-1/4 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-24 right-1/4 w-[500px] h-[250px] bg-amber-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Unified Interactive Blogs Content View with Zero-Layout-Shift Tab Switcher */}
      <Suspense fallback={<div className="min-h-screen pt-32 max-w-5xl mx-auto px-4" />}>
        <BlogsContentView />
      </Suspense>

      {/* Universal Footer */}
      <Suspense fallback={null}>
        <FooterSection />
      </Suspense>

      {/* Modals & Chat Widget */}
      <Suspense fallback={null}>
        <TabModalController />
      </Suspense>

      <Suspense fallback={null}>
        <FloatingChatWidget />
      </Suspense>
    </main>
  );
}
