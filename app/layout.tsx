import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vyom-agents.vercel.app"),
  title: "Vyom Agents | Deploy Your Next-Gen Autonomous AI Workforce",
  description:
    "Unlocking infinite possibilities in autonomous technology. We architect intelligent Agentic AI ecosystems, conversational voice agents, and self-healing visual RPA systems that transform complex operations into deterministic, 24/7 self-executing workflows.",
  keywords: [
    "Agentic AI",
    "Autonomous Agents",
    "AI Workforce",
    "AI Voice Agent",
    "AI Receptionist",
    "Workflow Orchestrator",
    "Self-Healing RPA",
    "AIEO",
    "Artificial Intelligence Engine Optimization",
    "Vyom Agents",
    "Multiagent Systems",
    "Custom CRM",
  ],
  icons: {
    icon: "/logo-icon.png",
    shortcut: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
  authors: [{ name: "Vyom Agents Engineering Team" }],
  openGraph: {
    title: "Vyom Agents | Deploy Autonomous AI Workforce Today",
    description:
      "Unlocking infinite possibilities in autonomous technology. We architect intelligent Agentic AI ecosystems, conversational voice agents, and self-healing visual RPA workflows.",
    url: "https://vyom-agents.vercel.app",
    siteName: "Vyom Agents",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyom Agents: Autonomous AI Workforce",
    description:
      "Unlocking infinite possibilities in autonomous technology. We architect intelligent agentic ecosystems that transform raw complexity into seamless execution.",
  },
  verification: {
    google: "oChfHC8LnNKHtdaeCKPA-qEz6odSltvpK3hiz1qR0Oo",
    other: {
      "msvalidate.01": "24E976F1447195DAD2BE840AD0C8289D",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://vyom-agents.vercel.app/#organization",
      "name": "Vyom Agents",
      "alternateName": "Vyom Autonomous Intelligence",
      "url": "https://vyom-agents.vercel.app",
      "logo": "https://vyom-agents.vercel.app/logo.png",
      "description":
        "Vyom Agents architects sovereign enterprise Agentic AI ecosystems, conversational voice agents, and self-healing visual RPA systems that transform complex operations into deterministic, 24/7 self-executing workflows.",
      "slogan": "Beyond Automations. Deploy Autonomous AI Workforce Today.",
      "sameAs": ["https://github.com/anand-751/Vyom-Agents"],
      "knowsAbout": [
        "Agentic AI",
        "AI Voice Receptionist",
        "Autonomous Multiagent Swarms",
        "Self-Healing RPA",
        "AI Engine Optimization (AIEO)",
        "Model Context Protocol (MCP)",
        "Enterprise RAG"
      ]
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://vyom-agents.vercel.app/#voice-receptionist",
      "name": "Vyom AI Voice Receptionist",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Cloud, Telephony (Twilio, Asterisk, SIP, WebRTC)",
      "description":
        "Flagship 24/7 conversational voice agent with human-like cadence, native calendar booking, and 45+ languages for medical clinics, dental practices, and enterprise front desks.",
      "offers": [
        {
          "@type": "Offer",
          "name": "Starter Plan",
          "price": "14999",
          "priceCurrency": "INR",
          "description": "Up to 400 verified calls/month, 1-2 provider routing, Hindi/Hinglish/English."
        },
        {
          "@type": "Offer",
          "name": "Professional Plan",
          "price": "23999",
          "priceCurrency": "INR",
          "description": "Up to 700 verified calls/month, up to 5 provider routing, appointment rescheduling."
        },
        {
          "@type": "Offer",
          "name": "Enterprise Plan",
          "price": "33990",
          "priceCurrency": "INR",
          "description": "1,000+ verified calls/month, custom CRM connectors, dedicated solutions architect."
        }
      ]
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://vyom-agents.vercel.app/#orchestrator",
      "name": "Vyom Autonomous Workflow Orchestrator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, Windows, Linux, macOS",
      "description":
        "Next-generation self-healing RPA engine replacing brittle legacy tools (UiPath) with visual neural embeddings, Playwright automation, and 99.8% recovery uptime."
    },
    {
      "@type": "FAQPage",
      "@id": "https://vyom-agents.vercel.app/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Vyom Agents?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vyom Agents is an elite enterprise Agentic AI company that designs autonomous AI workforces, conversational voice receptionists, and self-healing RPA systems for clinics, legal firms, and enterprises."
          }
        },
        {
          "@type": "Question",
          "name": "How does Vyom Agents engage with enterprise clients?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vyom Agents provides custom-engineered autonomous AI deployments with dedicated solutions architecture, custom system connectors, deterministic guardrails, and rapid 14-day rollouts tailored to your operational workflows."
          }
        },
        {
          "@type": "Question",
          "name": "How natural is Vyom's conversational AI Voice Agent?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vyom's AI Voice Receptionist operates with real-time response, supporting natural interruption handling and fluid conversations across 45+ languages."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Vyom AI Ecosystem Flywheel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Vyom AI Ecosystem is a 4-node revenue flywheel: Node 01 AI Voice Agent qualifies and books leads; Node 02 Custom CRM & Apps logs transactions in real time; Node 03 Google Review AI Agent triggers WhatsApp follow-ups to harvest 5-star reviews; and Node 04 AIEO ranks your brand #1 on ChatGPT, Perplexity, and Gemini search."
          }
        },
        {
          "@type": "Question",
          "name": "What is Self-Healing RPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unlike legacy RPA scripts that break when buttons move, Vyom's self-healing RPA uses visual neural embeddings with Playwright to automatically recompute target selectors in real time, achieving 99.8% auto-healed uptime."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable summary" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white text-slate-900 selection:bg-orange-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
