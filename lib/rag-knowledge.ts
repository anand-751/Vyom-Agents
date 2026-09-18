export interface KnowledgeChunk {
  id: string;
  title: string;
  category: string;
  content: string;
  keywords: string[];
  suggestedAction?: {
    label: string;
    action: "contact" | "voice" | "roi" | "services";
  };
}

export const VYOM_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  // 1. Company Overview & Core Thesis
  {
    id: "company-overview",
    title: "About Vyom Agents & Mission",
    category: "Company & Mission",
    content: `Vyom Agents (Vyom Autonomous Intelligence) is an elite enterprise Agentic AI & AI Automation company.
Brand Pitch: "Unlocking infinite possibilities in autonomous technology. We architect intelligent Agentic AI ecosystems and enterprise AI automation products that transform complex operations into deterministic, 24/7 self-executing workflows."
Core Thesis: "Beyond Automations. Deploy Autonomous AI Workforce Today."
Unlike brittle traditional automation tools (such as Zapier, Make, or legacy RPA bots) that crash whenever an interface changes or an unexpected edge case occurs, Vyom Agents builds sovereign, multi-agent systems with self-evaluating reasoning loops, dynamic tool calling, and self-healing visual automation.
Key Metrics:
- Sub-400ms Voice Agent Response Latency
- 99.4% Multi-Step Task Execution Accuracy with self-healing verification
- 10x Operational Throughput Multiplier (continuous 24/7 run-time)
- 100% Deterministic Tool Safety guaranteed by role-based policy guardrails.`,
    keywords: ["about", "company", "who are you", "what is vyom", "mission", "vision", "overview", "pitch"],
    suggestedAction: { label: "Schedule Architecture Call", action: "contact" },
  },

  // 2. Flagship Product: AI Voice Receptionist
  {
    id: "product-voice-agent",
    title: "AI Voice Receptionist (Live Flagship Product)",
    category: "Proprietary Products",
    content: `The AI Receptionist is Vyom Agents' flagship live enterprise product for 24/7 inbound reception and outbound campaigns.
Key Capabilities:
- Operates with ultra-low sub-400ms latency (typically 320ms end-to-end for STT + LLM Reasoning + TTS).
- Natural conversational flow with human-like interruption tolerance: users can interrupt mid-sentence without lag.
- Native bidirectional synchronization with Google Calendar, Microsoft Outlook, and custom EHR/CRM databases (Salesforce, HubSpot, custom SQL).
- Multilingual fluency across 45+ languages including English, Hindi, Hinglish, Spanish, French, German, and Mandarin with natural regional accents.
- Direct telephony carrier integration (Twilio, Asterisk, SIP trunks, WebRTC) with 15+ concurrent calls handled simultaneously with zero hold times.
- Security & Compliance: SOC-2 Type II, HIPAA compliant, and end-to-end TLS 1.3 audio streams.
- Solves: 100% of missed after-hours calls, boosts appointment conversion by +42%, and replaces up to 3 receptionist phone desk shifts (~120+ manual phone hours/month).`,
    keywords: ["voice", "receptionist", "phone", "call", "voice agent", "audio", "dental", "inbound", "outbound", "telephony", "calendar", "latency", "missed calls"],
    suggestedAction: { label: "Test Live Voice Demo", action: "voice" },
  },

  // 3. Flagship Product: Self-Healing RPA Engine
  {
    id: "product-orchestrator",
    title: "Self-Healing RPA & Multi-Agent UI Automation",
    category: "Proprietary Products",
    content: `Vyom's Autonomous Workflow Orchestrator is a next-gen self-healing RPA engine that replaces brittle legacy RPA bots (such as UiPath).
Key Capabilities:
- Uses visual neural embeddings and Playwright browser & desktop automation instead of fragile CSS/XPath selectors.
- When an enterprise ERP, CRM, or web UI updates and buttons relocate, the engine automatically calculates semantic vector likeness and auto-remediates the target selector in real-time (99.8% auto-healed uptime).
- Features an embedded AI Compliance & Audit Agent that performs real-time document verification, invoice extraction, cryptographic token signing, and immutable audit logs.
- Eliminates 180+ hours of manual data entry per team each month, providing 300% more resilience than legacy automation scripts.`,
    keywords: ["rpa", "self-healing", "orchestrator", "automation", "uipath", "ui", "dom", "playwright", "vision", "invoice", "erp", "desktop"],
    suggestedAction: { label: "View Enterprise Services", action: "services" },
  },

  // 4. Upcoming Products Pipeline
  {
    id: "upcoming-products",
    title: "R&D Pipeline: Upcoming Stealth Products",
    category: "Proprietary Products",
    content: `Vyom Agents has 5 specialized autonomous AI products currently in stealth development:
1. Vyom Finance Agent: Accounts payable automation, invoice reconciliation, and autonomous ledger verification.
2. Vyom Finance Workforce: Complete multi-agent finance team handling payroll, invoice matching, and cash flow forecasting.
3. Vyom Lawsuit: Legal AI for contract analysis, discovery audit, and regulatory compliance verification.
4. Vyom PolicyLens: Browser intelligence agent that analyzes terms of service, privacy policies, and compliance shifts in real time.
5. Vyom SafeBrowse: Autonomous secure browsing agent that enforces enterprise data leak prevention (DLP) and blocks malicious DOM injections.
All upcoming products are currently waitlist-only and undergoing SOC-2 compliance sealing.`,
    keywords: ["upcoming", "pipeline", "stealth", "finance agent", "lawsuit", "legal", "policylens", "safebrowse", "future"],
    suggestedAction: { label: "Join Product Waitlist", action: "contact" },
  },

  // 5. AI Ecosystem Flywheel
  {
    id: "ai-ecosystem",
    title: "The Vyom AI Ecosystem Flywheel",
    category: "Architecture & Ecosystem",
    content: `The Vyom AI Ecosystem is a continuous, self-reinforcing 4-node revenue flywheel:
Node 01: AI Voice Agent converses natively with 24/7 inbound callers with sub-400ms latency, qualifying leads and booking appointments (+42% conversion, zero missed calls).
Node 02: Custom CRM / Web / Desktop Apps log transaction parameters, auto-remediate UI shifts with self-healing RPA, and pass completed service records to Node 03.
Node 03: Google Review AI Agent fetches client details to trigger personalized WhatsApp/SMS follow-ups, intercepting dissatisfaction and harvesting +300% 5-star Google Reviews.
Node 04: AIEO (AI Engine Optimization) leverages surging reviews and Knowledge Graph schemas to rank your brand as the #1 recommended answer on ChatGPT Search, Perplexity, and Gemini.
This sends high-intent buyer calls right back to Node 01, completing an infinite autonomous growth loop!`,
    keywords: ["ecosystem", "flywheel", "fly wheel", "loop", "google review", "whatsapp", "nodes", "review agent", "infinite"],
    suggestedAction: { label: "Explore Ecosystem", action: "services" },
  },

  // 6. Pricing & ROI Calculator
  {
    id: "pricing-roi",
    title: "Pricing Tiers & ROI Calculator",
    category: "Pricing & Plans",
    content: `Vyom AI Receptionist offers 3 transparent enterprise pricing tiers:
1. Starter Plan:
   - ₹14,999 / month ($180/mo) for Web Voice; ₹17,499 / month ($210/mo) with Direct Phone Carrier Telephony included.
   - Up to 400 verified calls/month.
   - 1–2 Provider / Doctor Routing.
   - Hindi, Hinglish & English Fluency + Clinic Knowledge Base.
2. Professional Plan (Most Popular):
   - ₹23,999 / month ($280/mo) for Web Voice; ₹26,499 / month ($310/mo) with Telephony included.
   - Up to 700 verified calls/month.
   - Up to 5 Doctor / Provider Routing.
   - Direct Carrier Telephony, Appointment Rescheduling Workflows, Call Recording & Analytics.
3. Enterprise Plan:
   - ₹33,990 / month ($400/mo) for Web Voice; ₹36,490 / month ($430/mo) with Telephony included.
   - Up to 1,000+ calls/month (scalable up to 2,000+ calls with custom scaled per-call rates).
   - 10–15+ Doctors & Multi-Department Triage, Custom CRM Connectors, Dedicated Solutions Architect, 24/7 SLA.
Financial ROI Benchmark:
A human receptionist desk running 24/7 (3 shifts) costs ₹75,000–₹120,000/mo ($900–$1,500/mo). Vyom saves direct labor costs while preserving 30% of calls that would otherwise be missed after-hours, typically delivering 4.2x to 7.8x net ROI in the first 30 days.`,
    keywords: ["pricing", "cost", "rates", "fees", "how much", "starter", "professional", "enterprise", "roi", "savings", "calculator", "inr", "usd", "plan"],
    suggestedAction: { label: "Open ROI Calculator", action: "roi" },
  },

  // 7. Core Agency Services
  {
    id: "agency-services",
    title: "Enterprise Agency Capabilities & Services",
    category: "Services",
    content: `Vyom Agents provides 7 specialized engineering services for enterprises:
1. Self-Healing RPA & UI Automation: Playwright & vision LLMs automating desktop and browser interfaces with 99.8% auto-healed uptime.
2. Multiagent Systems: Collaborative agent swarms with supervisor-worker topologies (LangGraph / State Machines) for complex multi-step workflows.
3. Agent to Agent (A2A) Protocols: Machine-to-machine negotiation protocols and shared state ledgers enabling autonomous inter-agent coordination.
4. Custom CRM / ERP Softwares: Bespoke operational dashboards, database mutation pipelines, and native agent connectors for Salesforce, SAP, and HubSpot.
5. Websites & Web Apps: High-performance, reactive web platforms with embedded conversational voice widgets and real-time telemetry.
6. AIEO (AI Engine Optimization): Knowledge Graph structuring and schema injection ensuring your brand ranks #1 on ChatGPT, Claude, and Perplexity search.
7. Enterprise RAG Chatbots: Hybrid vector search (Pinecone, pgvector) with rerankers and contextual memory for zero-hallucination internal knowledge retrieval.`,
    keywords: ["services", "capabilities", "agency", "what can you build", "a2a", "agent to agent", "crm", "erp", "web apps", "custom software", "rag"],
    suggestedAction: { label: "View Enterprise Services", action: "services" },
  },

  // 8. Tech Stack & Integration Mesh
  {
    id: "tech-stack",
    title: "Supported Tech Stack & Enterprise Mesh",
    category: "Engineering & Tech Stack",
    content: `Vyom Agents is built on industry-leading open standards and modern frameworks:
- Standards: Model Context Protocol (MCP) by Anthropic for secure client-server tool connections; OpenAPI & JSON Schema function calling.
- Orchestration: LangGraph state graphs, CrewAI role-based multi-agent teams, Temporal.io durable execution.
- Vector & State Memory: Pinecone, Qdrant, ChromaDB, FAISS, Weaviate, pgvector (PostgreSQL), and Redis semantic caching.
- Foundation Models: Claude 3.5 Sonnet/Opus, GPT-4o, Gemini 1.5 Pro, and Groq ultra-fast Llama 3.3 / Llama 3.1 / Mixtral for sub-second inference.
- Tracing & Evals: LangSmith, Langfuse, Ragas, and DeepEval automated scoring suites.
- CRM/ERP Connectors: Salesforce, HubSpot, SAP S/4HANA, QuickBooks, Twilio WebRTC, and Google Workspace.`,
    keywords: ["tech stack", "mcp", "model context protocol", "groq", "langgraph", "crewai", "pinecone", "qdrant", "redis", "postgresql", "python", "typescript"],
    suggestedAction: { label: "Consult Principal Architect", action: "contact" },
  },

  // 9. Safety, Guardrails & Compliance
  {
    id: "safety-compliance",
    title: "Deterministic Safety Guardrails & Compliance",
    category: "Security & Guardrails",
    content: `Security and deterministic execution are core pillars of Vyom Agents:
- Harness Engineering: Every agent process is wrapped in sandboxed test harnesses that evaluate state transitions before committing transactions.
- Deterministic Guardrails: Strict input/output schema validators and policy enforcement layers guarantee zero hallucinations and deterministic tool calling.
- Zero Data Retention: Ephemeral execution memory ensures proprietary client IP and customer data are never stored or used to train public models.
- Certified Compliance: SOC-2 Type II compliant processes, HIPAA compliant for healthcare appointment routing, and GDPR compliant with 256-bit TLS encryption.`,
    keywords: ["security", "safety", "guardrails", "hipaa", "soc-2", "soc2", "gdpr", "compliance", "data privacy", "hallucination", "zero retention"],
    suggestedAction: { label: "Book Security Audit", action: "contact" },
  },

  // 10. Booking & Contact Details
  {
    id: "contact-booking",
    title: "Booking a Technical Discovery Call",
    category: "Contact & Implementation",
    content: `How to get started with Vyom Agents:
- Clients can schedule a 30-minute architectural audit and live POC demonstration directly on this website.
- Implementation SLA: Live telephony prototypes deployed within 48 hours.
- Typical Enterprise Sprint: 2 to 4 weeks from architecture review to production pilot deployment.
- IP Ownership: 100% client code and fine-tuned model ownership.
- All technical discussions are conducted under mutual Non-Disclosure Agreement (NDA).`,
    keywords: ["contact", "book", "schedule", "hire", "demo", "meeting", "call", "architect", "audit", "how to start"],
    suggestedAction: { label: "Book Discovery Call Now", action: "contact" },
  },
];

/**
 * High-speed semantic similarity retrieval function for RAG
 */
export function retrieveRagContext(query: string, topK: number = 3): {
  chunks: KnowledgeChunk[];
  combinedContext: string;
  bestAction?: KnowledgeChunk["suggestedAction"];
} {
  const cleanQuery = query.toLowerCase().trim();
  const queryWords = cleanQuery.split(/\s+/).filter((w) => w.length > 2);

  const scoredChunks = VYOM_KNOWLEDGE_BASE.map((chunk) => {
    let score = 0;

    // 1. Exact keyword match
    for (const kw of chunk.keywords) {
      if (cleanQuery.includes(kw.toLowerCase())) {
        score += 8;
      }
    }

    // 2. Title & category match
    if (cleanQuery.includes(chunk.title.toLowerCase())) {
      score += 10;
    }
    if (cleanQuery.includes(chunk.category.toLowerCase())) {
      score += 6;
    }

    // 3. Word-level overlap in content
    const contentLower = chunk.content.toLowerCase();
    for (const word of queryWords) {
      if (contentLower.includes(word)) {
        score += 2;
      }
      if (chunk.keywords.some((k) => k.includes(word))) {
        score += 3;
      }
    }

    return { chunk, score };
  });

  scoredChunks.sort((a, b) => b.score - a.score);

  const topChunks = scoredChunks.slice(0, topK).map((s) => s.chunk);
  const bestAction = topChunks.find((c) => c.suggestedAction)?.suggestedAction;

  const combinedContext = topChunks
    .map((c) => `### Source: ${c.title} (${c.category})\n${c.content}`)
    .join("\n\n---\n\n");

  return {
    chunks: topChunks,
    combinedContext,
    bestAction,
  };
}
