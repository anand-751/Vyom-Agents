import React, { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero/hero-section";
import { ProductsSection } from "@/components/products/products-section";
import { AiEcosystemSection } from "@/components/ecosystem/ai-ecosystem-section";
import { RoiCalculator } from "@/components/interactive/roi-calculator";
import { ServicesSection } from "@/components/services/services-section";
import { TechStackShowcase } from "@/components/techstack/tech-stack-showcase";
import { WhyUsSection } from "@/components/comparison/why-us-section";
import { FooterSection } from "@/components/footer/footer-section";
import { TabModalController } from "@/components/modals/tab-modal-controller";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white relative selection:bg-sky-500 selection:text-white">
      {/* Universal Frosted Navbar */}
      <Suspense fallback={<div className="h-16 w-full" />}>
        <Navbar />
      </Suspense>

      {/* Hero Section with Atmospheric Lighting, Agent Simulator & Marquee */}
      <Suspense fallback={null}>
        <HeroSection />
      </Suspense>

      <div className="section-divider" />

      {/* Flagship Proprietary Autonomous Products & Live Audio Player */}
      <Suspense fallback={null}>
        <ProductsSection />
      </Suspense>

      <div className="section-divider" />

      {/* Autonomous AI Ecosystem Flywheel & Interactive Node Inspector */}
      <Suspense fallback={null}>
        <AiEcosystemSection />
      </Suspense>

      <div className="section-divider" />

      {/* Interactive Business ROI & Volume Configurator */}
      <Suspense fallback={null}>
        <RoiCalculator />
      </Suspense>

      <div className="section-divider" />

      {/* Core Enterprise Engineering Services Grid */}
      <Suspense fallback={null}>
        <ServicesSection />
      </Suspense>

      <div className="section-divider" />

      {/* Enterprise Integration Mesh & Tech Stack Showcase */}
      <Suspense fallback={null}>
        <TechStackShowcase />
      </Suspense>

      <div className="section-divider" />

      {/* Why Choose Vyom: Comparison Matrix & Trust Pillars */}
      <WhyUsSection />

      {/* Enterprise Access Portal & Footer */}
      <FooterSection />

      {/* Deep-Linked Multi-Tab Modal & Lead Drawer Controller */}
      <Suspense fallback={null}>
        <TabModalController />
      </Suspense>
    </main>
  );
}
