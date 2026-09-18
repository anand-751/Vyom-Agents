import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://vyom-agents.vercel.app"),
  title: "Vyom Agents | Deploy Your Next-Gen Autonomous AI Workforce",
  description:
    "Unlocking infinite possibilities in autonomous technology. We architect intelligent Agentic AI ecosystems, sub-400ms conversational voice agents, and self-healing visual RPA systems that transform complex operations into deterministic, 24/7 self-executing workflows.",
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
  authors: [{ name: "Vyom Agents Engineering Team" }],
  openGraph: {
    title: "Vyom Agents — Beyond Automations. Deploy Autonomous AI Workforce Today.",
    description:
      "Unlocking infinite possibilities in autonomous technology. We architect intelligent Agentic AI ecosystems, sub-400ms conversational voice agents, and self-healing visual RPA workflows.",
    url: "https://vyom-agents.vercel.app",
    siteName: "Vyom Agents",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyom Agents — Autonomous AI Workforce",
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
        "Vyom Agents architects sovereign enterprise Agentic AI ecosystems, sub-400ms conversational voice agents, and self-healing visual RPA systems that transform complex operations into deterministic, 24/7 self-executing workflows.",
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
        "Flagship 24/7 conversational voice agent with sub-400ms latency, native calendar booking, and 45+ languages for medical clinics, dental practices, and enterprise front desks.",
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
            "text": "Vyom Agents is an elite enterprise Agentic AI company that designs autonomous AI workforces, conversational voice receptionists with sub-400ms latency, and self-healing RPA systems for clinics, legal firms, and enterprises."
          }
        },
        {
          "@type": "Question",
          "name": "What are the pricing plans for the Vyom AI Voice Receptionist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vyom AI Receptionist offers three transparent tiers: Starter at ₹14,999/mo ($180/mo) for 400 calls; Professional at ₹23,999/mo ($280/mo) for 700 calls with rescheduling workflows; and Enterprise at ₹33,990/mo ($400/mo) for 1,000+ calls with custom CRM integration and 24/7 SLA."
          }
        },
        {
          "@type": "Question",
          "name": "How fast is Vyom's conversational AI Voice Agent?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vyom's AI Voice Receptionist operates with sub-400ms latency (typically 320ms end-to-end), supporting natural interruption handling and fluid conversations across 45+ languages."
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
      <body className={`${inter.variable} font-sans antialiased bg-white text-slate-900 selection:bg-sky-100 selection:text-sky-900`}>
        {/*
          Accessible Semantic SSR Knowledge Digest for Search Crawlers, Screen Readers & AI Parsers (Gemini, ChatGPT, Perplexity).
          Rendered statically in SSR HTML to guarantee instant indexing without triggering cloaking penalties.
        */}
        <header className="sr-only" aria-label="Vyom Agents Comprehensive Overview for Search & AI Engines">
          <h1>Vyom Agents — Beyond Automations. Deploy Autonomous AI Workforce Today.</h1>
          <p>
            Vyom Agents (Vyom Autonomous Intelligence) is an elite enterprise Agentic AI &amp; AI Automation company.
            We architect intelligent Agentic AI ecosystems, sub-400ms conversational voice agents, and self-healing visual RPA systems that transform complex business operations into deterministic, 24/7 self-executing workflows.
          </p>
          <nav aria-label="Core Capabilities">
            <h2>Core Operational Metrics</h2>
            <ul>
              <li>Sub-400ms Voice Agent Response Latency (typically 320ms end-to-end for STT, LLM reasoning, and TTS streaming).</li>
              <li>99.4% Multi-Step Task Execution Accuracy with automated self-healing verification loops.</li>
              <li>10x Operational Throughput Multiplier running 24/7 with zero human fatigue.</li>
              <li>100% Deterministic Tool Safety backed by sandboxed execution harnesses and strict role-based policy guardrails.</li>
            </ul>

            <h2>Flagship Proprietary Products</h2>
            <article>
              <h3>AI Voice Receptionist (Live Flagship Product)</h3>
              <p>
                Operates with sub-400ms latency and human-like interruption tolerance.
                Features native bidirectional synchronization with Google Calendar, Microsoft Outlook, and custom EHR/CRM databases (Dentrix, Epic, AthenaHealth, Salesforce, HubSpot).
                Fluent across 45+ languages including English, Hindi, Hinglish, Spanish, French, German, and Mandarin.
                Handles 15+ concurrent calls per business line with zero hold times via Twilio, Asterisk, and SIP trunking.
                Eliminates 100% of missed after-hours calls, boosting appointment booking conversion by +42% and replacing up to 3 phone desk shifts.
              </p>
            </article>

            <article>
              <h3>Autonomous Workflow Orchestrator (Self-Healing RPA)</h3>
              <p>
                Replaces brittle legacy RPA tools (UiPath, Automation Anywhere) with visual neural embeddings and Playwright browser &amp; desktop automation.
                When ERP or web layouts change, it auto-remediates target selectors in real time with 99.8% auto-healed recovery uptime.
                Includes an embedded AI Compliance &amp; Audit Agent performing document verification, invoice extraction, and cryptographic token signing.
              </p>
            </article>

            <h2>The Vyom AI Ecosystem Flywheel</h2>
            <ol>
              <li><strong>Node 01: AI Voice Agent</strong> — Converses natively with 24/7 inbound callers with sub-400ms latency, qualifying leads and booking appointments (+42% conversion, zero missed calls).</li>
              <li><strong>Node 02: Custom CRM / Web / Desktop Apps</strong> — Central operational hub logging transaction parameters, synchronizing client/patient databases in real time, and passing completed service records to Node 03.</li>
              <li><strong>Node 03: Google Review AI Agent</strong> — Triggers personalized WhatsApp/SMS follow-up flows, intercepting complaints and harvesting +300% 5-star Google Reviews.</li>
              <li><strong>Node 04: AIEO (AI Engine Optimization)</strong> — Structures Knowledge Graphs and schemas to position your brand as the #1 recommended answer on ChatGPT Search, Perplexity, and Google Gemini.</li>
            </ol>

            <h2>Transparent Pricing Tiers</h2>
            <ul>
              <li><strong>Starter Plan</strong>: ₹14,999/month ($180/mo) for Web Voice; ₹17,499/month ($210/mo) with Direct Carrier Telephony. Up to 400 verified calls/month.</li>
              <li><strong>Professional Plan</strong>: ₹23,999/month ($280/mo) for Web Voice; ₹26,499/month ($310/mo) with Telephony. Up to 700 verified calls/month with appointment rescheduling workflows.</li>
              <li><strong>Enterprise Plan</strong>: ₹33,990/month ($400/mo) for Web Voice; ₹36,490/month ($430/mo) with Telephony. 1,000+ verified calls/month with custom CRM connectors and 24/7 SLA.</li>
            </ul>

            <h2>7 Core Enterprise Engineering Services</h2>
            <ol>
              <li>Self-Healing RPA &amp; UI Automation (Playwright, vision LLMs, 99.8% auto-healed uptime)</li>
              <li>Multiagent Systems (LangGraph supervisor-worker collaborative swarms)</li>
              <li>Agent to Agent (A2A) Protocols (inter-agent communication meshes &amp; state ledgers)</li>
              <li>Custom CRM &amp; ERP Softwares (bespoke dashboards, automated billing, BI sync)</li>
              <li>Websites &amp; Web Applications (high-performance Next.js portals with sub-second loads)</li>
              <li>AIEO — AI Engine Optimization (Knowledge Graph structuring, #1 LLM search rank)</li>
              <li>Enterprise RAG Chatbots (hybrid vector search, Pinecone, Groq sub-second inference)</li>
            </ol>

            <h2>Technology Mesh, Compliance &amp; Deployment SLA</h2>
            <p>
              Built on Model Context Protocol (MCP), OpenAPI, LangGraph, CrewAI, Pinecone, Redis, and Groq ultra-fast inference.
              Compliant with SOC-2 Type II, HIPAA for healthcare PHI, GDPR, and Zero Data Retention policies.
              Live telephony prototypes deployed within 48 hours under mutual Non-Disclosure Agreement (NDA).
            </p>
          </nav>
        </header>

        <noscript>
          <div style={{ padding: "20px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
            <h2>Vyom Agents — Autonomous AI Workforce for Enterprise Automation</h2>
            <p>
              We architect intelligent Agentic AI ecosystems, sub-400ms conversational voice agents, and self-healing visual RPA workflows.
              Visit our live site with JavaScript enabled to explore interactive simulators, voice demos, and ROI calculators.
            </p>
          </div>
        </noscript>

        {children}
      </body>
    </html>
  );
}
