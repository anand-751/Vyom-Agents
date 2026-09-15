import React, { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero/hero-section";
import { ProductsSection } from "@/components/products/products-section";
import { AiEcosystemSection } from "@/components/ecosystem/ai-ecosystem-section";
import { RoiCalculator } from "@/components/interactive/roi-calculator";
import { AgenticExplorer } from "@/components/explorer/agentic-explorer";
import { ServicesSection } from "@/components/services/services-section";
import { TechStackShowcase } from "@/components/techstack/tech-stack-showcase";
import { WhyUsSection } from "@/components/comparison/why-us-section";
import { FooterSection } from "@/components/footer/footer-section";
import { TabModalController } from "@/components/modals/tab-modal-controller";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white relative">
      <Suspense fallback={<div className="h-16 w-full" />}>
        <Navbar />
      </Suspense>

      <Suspense fallback={null}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={null}>
        <ProductsSection />
      </Suspense>

      {/* Autonomous AI Ecosystem Flywheel Section */}
      <Suspense fallback={null}>
        <AiEcosystemSection />
      </Suspense>

      {/* Interactive Business ROI & Solution Configurator */}
      <Suspense fallback={null}>
        <RoiCalculator />
      </Suspense>

      {/* Interactive User & Company Knowledge Explorer */}
      <Suspense fallback={null}>
        <AgenticExplorer />
      </Suspense>

      <Suspense fallback={null}>
        <ServicesSection />
      </Suspense>

      {/* Wide Tech Stack & Enterprise Integrations */}
      <TechStackShowcase />

      <WhyUsSection />

      <FooterSection />

      {/* Query Param Multi-Tab Modal Controller */}
      <Suspense fallback={null}>
        <TabModalController />
      </Suspense>
    </main>
  );
}
