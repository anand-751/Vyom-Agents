/**
 * Vyom Agents Enterprise RAG Knowledge Base & Sliding-Window Chunking Engine
 * Configured with:
 * - Chunk Size: 250 words (~325 tokens)
 * - Chunk Overlap: 50 words (~65 tokens)
 */

export const RAG_CHUNK_SIZE = 250;
export const RAG_CHUNK_OVERLAP = 50;

export interface SourceDocument {
  id: string;
  title: string;
  category: string;
  fullText: string;
  keywords: string[];
  suggestedAction?: {
    label: string;
    action: "contact" | "voice" | "roi" | "services";
  };
}

export interface RagChunk {
  id: string;
  docId: string;
  title: string;
  category: string;
  chunkIndex: number;
  totalChunks: number;
  content: string;
  keywords: string[];
  wordCount: number;
  suggestedAction?: {
    label: string;
    action: "contact" | "voice" | "roi" | "services";
  };
}

// 1. Comprehensive Raw Source Documents
export const VYOM_SOURCE_DOCUMENTS: SourceDocument[] = [
  {
    id: "about-vyom-mission",
    title: "Vyom Agents Company Overview & Core Thesis",
    category: "Company & Mission",
    keywords: [
      "about", "company", "who are you", "what is vyom", "mission", "vision",
      "overview", "pitch", "thesis", "autonomous workforce", "founders"
    ],
    suggestedAction: { label: "Schedule Architecture Call", action: "contact" },
    fullText: `Vyom Agents (Vyom Autonomous Intelligence) is an elite enterprise Agentic AI & AI Automation company.
Our Brand Pitch is: "Unlocking infinite possibilities in autonomous technology. We architect intelligent Agentic AI ecosystems and enterprise AI automation products that transform complex business operations into deterministic, 24/7 self-executing workflows."
Core Thesis: "Beyond Automations. Deploy Autonomous AI Workforce Today."
Unlike brittle traditional automation tools (such as Zapier, Make, or legacy RPA bots) that crash whenever an interface changes or an unexpected edge case occurs, Vyom Agents builds sovereign, multi-agent systems with self-evaluating reasoning loops, dynamic tool calling, and self-healing visual automation.
Key Operational Metrics:
1. Sub-400ms Voice Agent Response Latency (typically 320ms end-to-end for STT, LLM reasoning, and TTS streaming).
2. 99.4% Multi-Step Task Execution Accuracy with automated self-healing verification and reflection loops.
3. 10x Operational Throughput Multiplier: continuous 24/7 execution capacity without human fatigue or downtime.
4. 100% Deterministic Tool Safety guaranteed by strict role-based policy guardrails and sandboxed execution harnesses.
We serve healthcare clinics, dental networks, legal firms, logistics operators, financial institutions, and enterprise SaaS companies across North America, Europe, India, and the Middle East.`,
  },
  {
    id: "flagship-voice-receptionist",
    title: "AI Voice Receptionist (Live Flagship Product)",
    category: "Proprietary Products",
    keywords: [
      "voice", "receptionist", "phone", "call", "voice agent", "audio", "dental",
      "inbound", "outbound", "telephony", "calendar", "latency", "missed calls", "reception"
    ],
    suggestedAction: { label: "Test Live Voice Demo", action: "voice" },
    fullText: `The AI Receptionist is Vyom Agents' flagship live enterprise product engineered for 24/7 inbound reception, multi-provider triage, and intelligent outbound patient/client campaigns.
Key Technical Capabilities:
- Operates with ultra-low sub-400ms latency (typically 320ms end-to-end for STT + LLM Reasoning + TTS). Callers experience natural, immediate human cadence with zero awkward conversational dead-air.
- Human-like interruption tolerance: users can interrupt mid-sentence without audio stuttering or logic degradation.
- Native bidirectional synchronization with Google Calendar, Microsoft Outlook, Cal.com, and custom EHR/CRM databases (including Dentrix, Epic, AthenaHealth, Salesforce, HubSpot, and custom SQL backends).
- Multilingual fluency across 45+ languages including English, Hindi, Hinglish, Spanish, French, German, and Mandarin with natural regional phonetics and localized idioms.
- Direct telephony carrier integration (Twilio, Asterisk, SIP trunks, WebRTC) capable of handling 15+ concurrent calls simultaneously with zero hold times or busy signals.
- Security & Compliance: SOC-2 Type II certified infrastructure, HIPAA compliant for healthcare protected health information (PHI), and end-to-end TLS 1.3 audio streaming.
- Business Impact: Solves 100% of missed after-hours calls, boosts appointment booking conversion by +42%, and replaces up to 3 receptionist phone desk shifts (~120+ manual phone hours per month).`,
  },
  {
    id: "flagship-self-healing-rpa",
    title: "Self-Healing RPA & Autonomous Workflow Orchestrator",
    category: "Proprietary Products",
    keywords: [
      "rpa", "self-healing", "orchestrator", "automation", "uipath", "ui", "dom",
      "playwright", "vision", "invoice", "erp", "desktop", "browser", "selectors"
    ],
    suggestedAction: { label: "View Enterprise Services", action: "services" },
    fullText: `Vyom's Autonomous Workflow Orchestrator is a next-generation self-healing RPA engine that replaces brittle legacy RPA bots (such as UiPath, Automation Anywhere, and Selenium scripts).
Key Technical Architecture:
- Uses visual neural embeddings and Playwright browser & desktop automation instead of fragile CSS or XPath selectors.
- When an enterprise ERP, CRM, or external web portal updates its DOM and buttons relocate, the engine automatically computes semantic vector likeness and auto-remediates the target selector in real-time (achieving 99.8% auto-healed uptime).
- Features an embedded AI Compliance & Audit Agent that performs real-time document verification, invoice extraction, cryptographic token signing, and immutable audit logging.
- Eliminates 180+ hours of manual data entry per team each month, providing 300% more resilience and zero maintenance overhead compared to legacy automation scripts.
- Integrates seamlessly with legacy Windows desktop applications, terminal emulators, SAP S/4HANA, Oracle NetSuite, and modern cloud web portals.`,
  },
  {
    id: "stealth-rd-pipeline",
    title: "R&D Pipeline: Stealth Autonomous Products",
    category: "Proprietary Products",
    keywords: [
      "upcoming", "pipeline", "stealth", "finance agent", "lawsuit", "legal",
      "policylens", "safebrowse", "future", "workforce", "research"
    ],
    suggestedAction: { label: "Join Product Waitlist", action: "contact" },
    fullText: `Vyom Agents has 5 specialized autonomous AI products currently in stealth development and enterprise beta testing:
1. Vyom Finance Agent: Autonomous accounts payable automation, invoice reconciliation, three-way purchase order matching, and ledger verification.
2. Vyom Finance Workforce: Complete multi-agent financial swarm handling payroll validation, invoice matching, cash flow forecasting, and automated anomaly flagging.
3. Vyom Lawsuit: Legal AI system for contract analysis, discovery audit, clause risk scoring, and regulatory compliance verification across jurisdictions.
4. Vyom PolicyLens: Browser intelligence agent that analyzes terms of service, privacy policies, and compliance shifts across third-party SaaS vendors in real time.
5. Vyom SafeBrowse: Autonomous secure browsing agent that enforces enterprise data leak prevention (DLP), sandboxes DOM execution, and blocks malicious payload injections.
All upcoming products are currently waitlist-only and undergoing SOC-2 compliance sealing before public deployment.`,
  },
  {
    id: "ai-ecosystem-flywheel",
    title: "The Vyom AI Ecosystem Flywheel",
    category: "Architecture & Ecosystem",
    keywords: [
      "ecosystem", "flywheel", "fly wheel", "loop", "google review", "whatsapp",
      "nodes", "review agent", "infinite", "aieo", "chatgpt search", "growth"
    ],
    suggestedAction: { label: "Explore Ecosystem", action: "services" },
    fullText: `The Vyom AI Ecosystem is a continuous, self-reinforcing 4-node autonomous revenue flywheel:
Node 01: AI Voice Agent converses natively with 24/7 inbound callers with sub-400ms latency, qualifying leads and booking appointments (+42% conversion rate, zero missed calls).
Node 02: Custom CRM / Web / Desktop Apps log transaction parameters, auto-remediate UI shifts with self-healing RPA, and pass completed service records to Node 03.
Node 03: Google Review AI Agent fetches client details to trigger personalized WhatsApp/SMS follow-up flows, intercepting dissatisfaction before public posting and harvesting +300% 5-star Google Reviews.
Node 04: AIEO (AI Engine Optimization) leverages surging high-authority reviews and Knowledge Graph schemas to rank your brand as the #1 recommended answer on ChatGPT Search, Perplexity, and Google Gemini.
This funnel directs high-intent buyer inquiries straight back to Node 01, completing an infinite autonomous growth loop with zero incremental ad spend!`,
  },
  {
    id: "pricing-plans-roi",
    title: "Pricing Tiers & Interactive ROI Calculator",
    category: "Pricing & Plans",
    keywords: [
      "pricing", "cost", "rates", "fees", "how much", "starter", "professional",
      "enterprise", "roi", "savings", "calculator", "inr", "usd", "plan", "tiers"
    ],
    suggestedAction: { label: "Open ROI Calculator", action: "roi" },
    fullText: `Vyom AI Receptionist offers 3 transparent enterprise pricing tiers with zero hidden setup fees:
1. Starter Plan:
   - ₹14,999 / month ($180/mo) for Web Voice; ₹17,499 / month ($210/mo) with Direct Phone Carrier Telephony included.
   - Includes up to 400 verified calls per month.
   - 1–2 Provider / Doctor Routing.
   - Hindi, Hinglish & English Fluency + Clinic Knowledge Base integration.
2. Professional Plan (Most Popular):
   - ₹23,999 / month ($280/mo) for Web Voice; ₹26,499 / month ($310/mo) with Telephony included.
   - Includes up to 700 verified calls per month.
   - Up to 5 Doctor / Provider Routing.
   - Direct Carrier Telephony, Appointment Rescheduling Workflows, Call Recording & Real-time Analytics Dashboard.
3. Enterprise Plan:
   - ₹33,990 / month ($400/mo) for Web Voice; ₹36,490 / month ($430/mo) with Telephony included.
   - Includes 1,000+ calls per month (scalable to 2,500+ calls with custom volume discounts).
   - 10–15+ Doctors & Multi-Department Triage, Custom CRM Connectors, Dedicated Solutions Architect, 24/7 Priority SLA.
Financial ROI Comparison:
A human receptionist desk running 24/7 (requiring 3 rotating shifts) costs ₹75,000–₹120,000/mo ($900–$1,500/mo). Vyom cuts direct labor overhead while capturing 30% of calls that would otherwise be missed after business hours, delivering 4.2x to 7.8x net ROI in the first 30 days.`,
  },
  {
    id: "agency-engineering-services",
    title: "Enterprise Agency Engineering Services",
    category: "Services",
    keywords: [
      "services", "capabilities", "agency", "what can you build", "a2a",
      "agent to agent", "crm", "erp", "web apps", "custom software", "rag"
    ],
    suggestedAction: { label: "View Enterprise Services", action: "services" },
    fullText: `Vyom Agents provides 7 specialized engineering services for enterprises seeking sovereign autonomous capabilities:
1. Self-Healing RPA & UI Automation: Playwright & vision LLMs automating desktop and browser interfaces with 99.8% auto-healed uptime.
2. Multiagent Systems: Collaborative agent swarms with supervisor-worker topologies (LangGraph / State Machines) for complex multi-step workflows.
3. Agent to Agent (A2A) Protocols: Machine-to-machine negotiation protocols and shared state ledgers enabling autonomous inter-agent coordination without human intervention.
4. Custom CRM / ERP Softwares: Bespoke operational dashboards, database mutation pipelines, and native agent connectors for Salesforce, SAP, and HubSpot.
5. Websites & Web Apps: High-performance, reactive web platforms with embedded conversational voice widgets and real-time telemetry.
6. AIEO (AI Engine Optimization): Knowledge Graph structuring and schema injection ensuring your brand ranks #1 on ChatGPT, Claude, and Perplexity search.
7. Enterprise RAG Chatbots: Hybrid vector search (Pinecone, pgvector) with cross-encoder rerankers and contextual memory for zero-hallucination internal knowledge retrieval.`,
  },
  {
    id: "tech-stack-integrations",
    title: "Supported Tech Stack & Enterprise Mesh",
    category: "Engineering & Tech Stack",
    keywords: [
      "tech stack", "mcp", "model context protocol", "groq", "langgraph",
      "crewai", "pinecone", "qdrant", "redis", "postgresql", "python", "typescript", "architecture"
    ],
    suggestedAction: { label: "Consult Principal Architect", action: "contact" },
    fullText: `Vyom Agents is built on industry-leading open standards, resilient frameworks, and high-speed inference engines:
- Protocols: Model Context Protocol (MCP) by Anthropic for secure client-server tool connections; OpenAPI & JSON Schema deterministic function calling.
- Multi-Agent Orchestration: LangGraph state graphs, CrewAI role-based multi-agent swarms, Temporal.io durable workflow execution.
- Vector & State Memory: Pinecone, Qdrant, ChromaDB, FAISS, Weaviate, pgvector (PostgreSQL), and Redis semantic caching.
- Foundation Models: Claude 3.5 Sonnet/Opus, GPT-4o, Gemini 1.5 Pro, and Groq ultra-fast Llama 3.3 / Llama 3.1 / Mixtral for sub-second inference.
- Tracing & Evals: LangSmith, Langfuse, Ragas, and DeepEval automated scoring suites.
- CRM/ERP Connectors: Salesforce, HubSpot, SAP S/4HANA, QuickBooks, Twilio WebRTC, and Google Workspace.`,
  },
  {
    id: "security-safety-compliance",
    title: "Deterministic Safety Guardrails & Compliance Standards",
    category: "Security & Guardrails",
    keywords: [
      "security", "safety", "guardrails", "hipaa", "soc-2", "soc2", "gdpr",
      "compliance", "data privacy", "hallucination", "zero retention", "encryption"
    ],
    suggestedAction: { label: "Book Security Audit", action: "contact" },
    fullText: `Security, data sovereignty, and deterministic execution are foundational to all Vyom Agents systems:
- Harness Engineering: Every agent process is wrapped in sandboxed test harnesses that evaluate state transitions before committing transactions to production databases.
- Deterministic Guardrails: Strict input/output schema validators and policy enforcement layers guarantee zero hallucinations and deterministic tool calling.
- Zero Data Retention: Ephemeral execution memory ensures proprietary client IP and customer data are never stored or used to train public models.
- Certified Compliance: SOC-2 Type II compliant processes, HIPAA compliant for healthcare appointment routing, and GDPR compliant with 256-bit TLS encryption.
- Role-Based Access Control: Granular permission boundaries prevent autonomous agents from performing out-of-scope actions.`,
  },
  {
    id: "discovery-booking-sla",
    title: "Booking Discovery Calls & Implementation SLAs",
    category: "Contact & Implementation",
    keywords: [
      "contact", "book", "schedule", "hire", "demo", "meeting", "call",
      "architect", "audit", "how to start", "sla", "nda", "timeline"
    ],
    suggestedAction: { label: "Book Discovery Call Now", action: "contact" },
    fullText: `How to engage and deploy with Vyom Agents:
- Clients can schedule a 30-minute architectural audit and live POC demonstration directly on this website.
- Implementation SLA: Live telephony prototypes deployed within 48 hours.
- Typical Enterprise Sprint: 2 to 4 weeks from architecture review to production pilot deployment.
- IP Ownership: 100% client code and fine-tuned model ownership.
- All technical discussions are conducted under mutual Non-Disclosure Agreement (NDA).
- Post-deployment support includes 24/7 telemetry monitoring and continuous model fine-tuning.`,
  },
];

/**
 * Sliding Window Chunker
 * Splitting text with exact Chunk Size: 250 words and Overlap: 50 words
 */
export function chunkTextSlidingWindow(
  text: string,
  chunkSize: number = RAG_CHUNK_SIZE,
  chunkOverlap: number = RAG_CHUNK_OVERLAP
): string[] {
  const words = text.trim().split(/\s+/);
  if (words.length <= chunkSize) {
    return [text.trim()];
  }

  const chunks: string[] = [];
  const stride = Math.max(1, chunkSize - chunkOverlap); // 250 - 50 = 200

  for (let i = 0; i < words.length; i += stride) {
    const chunkWords = words.slice(i, i + chunkSize);
    chunks.push(chunkWords.join(" "));
    if (i + chunkSize >= words.length) {
      break;
    }
  }

  return chunks;
}

/**
 * Initialize all indexed RAG chunks with Chunk Size: 250 and Overlap: 50
 */
export function buildRagChunkIndex(): RagChunk[] {
  const indexedChunks: RagChunk[] = [];

  for (const doc of VYOM_SOURCE_DOCUMENTS) {
    const textChunks = chunkTextSlidingWindow(doc.fullText, RAG_CHUNK_SIZE, RAG_CHUNK_OVERLAP);
    textChunks.forEach((chunkContent, idx) => {
      indexedChunks.push({
        id: `${doc.id}-chunk-${idx + 1}`,
        docId: doc.id,
        title: `${doc.title} (Part ${idx + 1}/${textChunks.length})`,
        category: doc.category,
        chunkIndex: idx + 1,
        totalChunks: textChunks.length,
        content: chunkContent,
        keywords: doc.keywords,
        wordCount: chunkContent.split(/\s+/).length,
        suggestedAction: doc.suggestedAction,
      });
    });
  }

  return indexedChunks;
}

export const VYOM_RAG_CHUNKS: RagChunk[] = buildRagChunkIndex();

/**
 * High-speed semantic similarity retrieval function for RAG with 250/50 chunks
 */
export function retrieveRagContext(query: string, topK: number = 4): {
  chunks: RagChunk[];
  combinedContext: string;
  bestAction?: RagChunk["suggestedAction"];
  totalIndexedChunks: number;
} {
  const cleanQuery = query.toLowerCase().trim();
  const queryWords = cleanQuery.split(/\s+/).filter((w) => w.length > 2);

  const scoredChunks = VYOM_RAG_CHUNKS.map((chunk) => {
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

    // 3. Word-level overlap in chunk content
    const contentLower = chunk.content.toLowerCase();
    for (const word of queryWords) {
      if (contentLower.includes(word)) {
        score += 2.5;
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
    .map(
      (c) =>
        `### Source: ${c.title} [Category: ${c.category} | Words: ${c.wordCount} | Chunk ${c.chunkIndex}/${c.totalChunks}]\n${c.content}`
    )
    .join("\n\n---\n\n");

  return {
    chunks: topChunks,
    combinedContext,
    bestAction,
    totalIndexedChunks: VYOM_RAG_CHUNKS.length,
  };
}
