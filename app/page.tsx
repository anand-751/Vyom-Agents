import React, { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero/hero-section";
import { ProductsSection } from "@/components/products/products-section";
import { AiEcosystemSection } from "@/components/ecosystem/ai-ecosystem-section";
import { UseCasesSection } from "@/components/usecases/use-cases-section";
import { PricingSection } from "@/components/pricing/pricing-section";
import { AboutSection } from "@/components/about/about-section";
import { FooterSection } from "@/components/footer/footer-section";
import { TabModalController } from "@/components/modals/tab-modal-controller";
import { FloatingChatWidget } from "@/components/chat/floating-chat-widget";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white relative selection:bg-orange-500 selection:text-white">
      {/* Universal Clean Navbar */}
      <Suspense fallback={<div className="h-16 w-full" />}>
        <Navbar />
      </Suspense>

      {/* 1. Hero Section (Earth Dawn Space Horizon) */}
      <Suspense fallback={null}>
        <HeroSection />
      </Suspense>

      {/* 2. Products Section (Our Products 3 Cards) */}
      <Suspense fallback={null}>
        <ProductsSection />
      </Suspense>

      {/* 3. The Vyom AI Ecosystem (Autonomous Revenue Flywheel) */}
      <Suspense fallback={null}>
        <AiEcosystemSection />
      </Suspense>

      {/* 4. Use Cases Section (Built for people who build the future) */}
      <Suspense fallback={null}>
        <UseCasesSection />
      </Suspense>

      {/* 4. Pricing Section (Simple, transparent pricing) */}
      <Suspense fallback={null}>
        <PricingSection />
      </Suspense>

      {/* 5. About Us Section (Human Potential Amplified) */}
      <Suspense fallback={null}>
        <AboutSection />
      </Suspense>

      {/* 6. Dark Footer Section (Ready to build with Vyom Agents?) */}
      <Suspense fallback={null}>
        <FooterSection />
      </Suspense>

      {/* Minimal Modals & Assistant */}
      <Suspense fallback={null}>
        <TabModalController />
      </Suspense>

      <Suspense fallback={null}>
        <FloatingChatWidget />
      </Suspense>
    </main>
  );
}
