export interface Product {
  id: string;
  name: string;
  badge: string;
  badgeType: "live" | "upcoming";
  tagline: string;
  description: string;
  features: string[];
  metrics: { label: string; value: string }[];
  primaryCta: string;
  secondaryCta?: string;
  queryParam: string;
  specs: {
    latency: string;
    languages: string;
    integrations: string;
    compliance: string;
  };
}

export interface Service {
  id: string;
  title: string;
  shortCode: string;
  category: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  roiMetric: string;
  queryParam: string;
}

export const KEYWORDS = [
  "Agentic AI Products",
  "AI Automation Architecture",
  "Harness Engineering",
  "Deterministic Safety Guardrails",
  "Autonomous AI Workforce",
  "Self-Healing RPA Engines",
  "Sub-400ms Voice Agents",
  "Multi-Agent Swarm Topology",
  "AIEO (AI Engine Optimization)",
  "Enterprise Tool Orchestration",
  "Hybrid RAG Knowledge Graphs",
  "Zero Data Retention",
];

export const COMPANY_KNOWLEDGE = [
  {
    id: "agentic-ai",
    trigger: "AI Automation vs Traditional",
    title: "What is AI Automation & How Does It Differ From Legacy Automation?",
    category: "AI Automation Architecture",
    summary:
      "Traditional automations (Zapier, Make, basic RPA) rely on fragile 'if-this-then-that' rules that break whenever an API schema or UI layout changes. AI Automation deploys autonomous, multi-step reasoning models that perceive dynamic environments, plan multi-hop action paths, evaluate intermediate outcomes, and self-heal automatically.",
    keyPoints: [
      "Dynamic multi-step reasoning with self-evaluation loops",
      "Perceives unstructured text, messy audio, PDFs, and graphical UIs",
      "Dynamic tool calling with strict schema validation and error fallback",
      "Autonomous self-healing when buttons or APIs change",
    ],
    actionLabel: "Compare Capabilities",
    actionLink: "#why-us",
    badge: "Core Thesis",
  },
  {
    id: "ai-products",
    trigger: "Agentic AI Products",
    title: "What Agentic AI Products Does Vyom Agents Offer?",
    category: "Agentic AI Products",
    summary:
      "Vyom Agents engineers two flagship autonomous products: 1) The AI Receptionist (Live Product) delivering human-like voice conversations with sub-400ms latency, native calendar booking, and CRM sync. 2) The Autonomous Workflow Orchestrator (Coming Soon) featuring self-healing RPA and cross-platform desktop task execution.",
    keyPoints: [
      "AI Receptionist: 45+ languages, sub-400ms latency, multi-tenant telephony",
      "Workflow Orchestrator: Visual DOM/GUI introspection, self-healing RPA",
      "Zero human babysitting: Auto-remediates UI drift with vector matching",
      "Harness engineering & deterministic guardrail safety checks",
    ],
    actionLabel: "Explore AI Voice Agent",
    actionLink: "?product=voice-agent",
    badge: "Live Products",
  },
  {
    id: "custom-workforce",
    trigger: "Custom Agentic Workforce",
    title: "How Does Vyom Deploy Bespoke Autonomous Workforces?",
    category: "Enterprise Workforce",
    summary:
      "We architect multi-agent collaborative teams where specialized agents act as Planner, Researcher, Executor, and QA Verifier. These agents coordinate across your internal microservices, databases, and third-party APIs with zero hallucination and strict role-based access control.",
    keyPoints: [
      "Hierarchical supervisor-worker agent topologies (LangGraph / State Machines)",
      "Short-term operational scratchpads + long-term episodic vector memory",
      "Direct integration with ERPs, CRMs, Billing systems, and custom APIs",
      "Harness engineering & deterministic policy guardrails",
    ],
    actionLabel: "View Workforce Specs",
    actionLink: "?tab=workforce",
    badge: "Custom Agency",
  },
  {
    id: "aieo",
    trigger: "AIEO (AI Engine Optimization)",
    title: "What is AIEO & Why Does Your Brand Need It?",
    category: "Search & Visibility",
    summary:
      "As users shift from traditional search engines to ChatGPT, Claude, and Perplexity, AIEO (AI Engine Optimization) ensures your enterprise data, brand, and products are indexed, authoritative, and cited as primary answers by autonomous agents and LLMs.",
    keyPoints: [
      "Knowledge Graph structuring and JSON-LD synthetic schema injection",
      "Entity authority mapping for LLM vector clusters and citations",
      "Continuous prompt-surface auditing and competitor retrieval displacement",
      "Up to +310% increase in brand recommendation frequency",
    ],
    actionLabel: "Explore AIEO Blueprint",
    actionLink: "?tab=aieo",
    badge: "Emerging Standard",
  },
  {
    id: "security",
    trigger: "Harness Engineering & Guardrails",
    title: "How Vyom Enforces Harness Engineering & Guardrail Safety",
    category: "Harness & Safety Engineering",
    summary:
      "Every Vyom agent execution is enclosed within rigorous test harnesses and deterministic guardrail frameworks. Input schema validators, output assertion bounds, and real-time state evaluators ensure zero hallucinations, zero runaway execution loops, and absolute execution safety.",
    keyPoints: [
      "Harness Engineering: Sandboxed test harnesses & real-time state evaluation",
      "Deterministic Guardrails: Strict input/output policy bounds & zero hallucination",
      "Zero Data Retention: Ephemeral execution memory with total privacy",
      "Continuous runtime monitoring & deterministic safety verification",
    ],
    actionLabel: "Consult Principal Architect",
    actionLink: "?modal=contact",
    badge: "Safety Architecture",
  },
];

export const BRAND_CONFIG = {
  name: "Vyom Agents",
  pitch:
    "Unlocking infinite possibilities in autonomous technology. We architect intelligent agentic ecosystems that transform raw complexity into seamless execution.",
  taglines: [
    "Engineering the Autonomous Workforce of Tomorrow.",
    "Beyond Automations. Deploy Autonomous AI Workforce Today.",
    "Intelligent Agents. Custom Software. Infinite Scale.",
  ],
  status: "Autonomous Systems Operational",
  metrics: [
    { value: "<400ms", label: "Voice Agent Response Latency", change: "Zero perceptual delay" },
    { value: "99.4%", label: "Multi-Step Task Execution Accuracy", change: "Self-healing verification" },
    { value: "10x", label: "Operational Throughput Multiplier", change: "Continuous 24/7 run-time" },
    { value: "100%", label: "Deterministic Tool Safety", change: "Role-based policy guardrails" },
  ],
};

export const PRODUCTS: Product[] = [
  {
    id: "voice-agent",
    name: "AI Receptionist Inbound & Outbound Voice Agent",
    badge: "LIVE PRODUCT",
    badgeType: "live",
    tagline: "Ultra-low latency conversational voice intelligence for 24/7 inbound reception & outbound campaigns.",
    description:
      "Enterprise-grade inbound and outbound conversational AI receptionist capable of natural interruptions, tone adaptation, dynamic calendar scheduling, outbound appointment confirmations, lead qualification, and instantaneous CRM data synchronization.",
    features: [
      "Natural conversational flow with sub-400ms human-like interruption tolerance",
      "Inbound reception + Outbound appointment confirmation & lead recall calls",
      "Native bidirectional Google Calendar, Outlook, and EHR/CRM sync",
      "Multilingual fluency across 45+ languages with localized regional accents",
      "HIPAA, GDPR, and SOC-2 compliant encrypted audio streaming pipelines",
    ],
    metrics: [
      { label: "Latency", value: "320ms" },
      { label: "Call Capacity", value: "15+ Concurrent Calls" },
      { label: "Booking Conversion", value: "+42%" },
    ],
    primaryCta: "Listen to Demo / View Details",
    secondaryCta: "Schedule Live Test Call",
    queryParam: "voice-agent",
    specs: {
      latency: "Sub-400ms end-to-end (STT + LLM Reasoning + TTS)",
      languages: "English, Spanish, Hindi, French, German, Japanese, Mandarin (45+ total)",
      integrations: "Twilio, Asterisk, SIP Trunks, Google Calendar, HubSpot, Salesforce",
      compliance: "SOC-2 Type II, HIPAA Compliant, End-to-End TLS 1.3 Audio Streams",
    },
  },
  {
    id: "orchestrator",
    name: "Self-Healing RPA Engine & Multi-Agent UI Automation",
    badge: "UPCOMING PRODUCT",
    badgeType: "upcoming",
    tagline: "Self-healing visual UI automation engine powered by Playwright, multi-vision LLMs, and embedded compliance audit agents.",
    description:
      "Beating traditional RPA bots (like UiPath) with zero selector fragility. Our engine seamlessly handles desktop and web GUI tasks with computer vision introspection, Playwright browser automation, and automatic self-healing fallback to multi-vision models when selectors drift, while an embedded AI agent performs continuous audit and compliance verification.",
    features: [
      "Playwright browser & desktop app automation with vision-based self-healing selector fallback",
      "Embedded Compliance & Audit Agent performing real-time transaction & document verification",
      "Zero script breakage: auto-remediates DOM shifts, modal popups, and layout changes",
      "Multi-agent swarm topology for automated contract processing and ERP reconciliation",
      "Beats legacy RPA with 99.8% execution uptime and zero developer maintenance",
    ],
    metrics: [
      { label: "Failure Recovery", value: "99.8% Auto-Healed" },
      { label: "Time Savings", value: "180+ hrs/mo per team" },
      { label: "Uptime vs Legacy RPA", value: "+300% Resilience" },
    ],
    primaryCta: "Join Waitlist & Priority Beta",
    secondaryCta: "Read Technical Whitepaper",
    queryParam: "orchestrator-waitlist",
    specs: {
      latency: "Real-time visual state verification (~150ms per action step)",
      languages: "Python, Playwright, Multi-Vision LLMs, TypeScript, REST",
      integrations: "SAP, Salesforce, QuickBooks, Web Apps, Desktop Software, Legacy Systems",
      compliance: "Embedded Compliance Audit Agent, Ephemeral Memory, Zero Training on Private Data",
    },
  },
];

export const SERVICES: Service[] = [
  {
    id: "aieo",
    title: "AIEO (Artificial Intelligence Engine Optimization)",
    shortCode: "01",
    category: "Search & Visibility",
    description:
      "Optimizing your client's digital presence so their brand, products, and services are the #1 recommended choice when buyers query Perplexity, ChatGPT Search, or Google Gemini. Value Prop: Traditional SEO is dying. We ensure your business is the #1 choice when AI agents do the shopping for humans.",
    deliverables: [
      "Semantic Knowledge Graph structuring & JSON-LD synthetic schema injection",
      "Entity authority mapping for LLM training vector clusters and citations",
      "Benchmark auditing across leading LLM search platforms (Perplexity, ChatGPT, Gemini)",
      "Continuous prompt-surface monitoring & competitor retrieval displacement",
    ],
    techStack: ["Schema.org", "Vector Embeddings", "Perplexity API", "Gemini Search API"],
    roiMetric: "Traditional SEO is dying. Be the #1 choice when AI agents shop for humans.",
    queryParam: "aieo",
  },
  {
    id: "reputation",
    title: "Reputation & Growth Automation (Google Reviews AI Agent)",
    shortCode: "02",
    category: "Social Proof & Growth",
    description:
      "An autonomous agent that integrates with CRM and Google Business Profile to dynamically request reviews post-purchase, respond to feedback natively using brand guidelines, and automatically flag/escalate negative reviews before they go public.",
    deliverables: [
      "Automated post-purchase review request sequences via SMS, Email & WhatsApp",
      "Native AI response engine matching exact brand voice & tone guidelines",
      "Sentiment-driven escalation engine: automatically flags & routes negative reviews before public post",
      "Dynamic Google Business Profile & local SEO ranking synchronization",
    ],
    techStack: ["Google Business API", "Twilio SMS", "WhatsApp API", "Sentiment LLM"],
    roiMetric: "+300% 5-star review acquisition rate & early complaint remediation",
    queryParam: "reputation",
  },
  {
    id: "rag",
    title: "Enterprise Infrastructure (Custom Self-Correcting RAG Bots)",
    shortCode: "03",
    category: "Knowledge Intelligence",
    description:
      "Moving beyond standard vector search. Building Retrieval-Augmented Generation (RAG) pipelines with reflection loops. If the bot retrieves the wrong data, a critique agent catches it, rewrites the query, and corrects the answer before the user sees it.",
    deliverables: [
      "Self-correcting reflection loops: Critique agent audits retrieved documents and rewrites queries automatically",
      "Dense semantic vector search + BM25 sparse keyword hybrid retrieval with Cohere reranking",
      "Document ingestion pipelines for unstructured PDFs, contracts, manuals, and internal wikis",
      "Verifiable citation highlighting with page & paragraph precision",
    ],
    techStack: ["Pinecone / Qdrant", "LlamaIndex", "LangGraph Reflection", "Cohere Rerank"],
    roiMetric: "Zero hallucination guarantee backed by self-correcting reflection critique loops",
    queryParam: "rag",
  },
  {
    id: "autopilot",
    title: "End-to-End Business Autopilot (Multi-Agent Orchestration)",
    shortCode: "04",
    category: "Multi-Agent Swarms",
    description:
      "Connecting your custom web/desktop apps with AI automations. Workflow: A Sales Agent closes a lead → prompts Compliance Agent to auto-generate and check contract → triggers Onboarding Agent to set up client dashboard. Zero human clicks.",
    deliverables: [
      "Multi-agent swarm topology connecting web apps, desktop tools, and enterprise APIs",
      "Automated lead-to-onboarding handoffs (Sales Agent → Compliance Agent → Onboarding Agent)",
      "Contract auto-generation, legal clause verification, and client dashboard provisioning",
      "Deterministic audit trails and human-in-the-loop fallback thresholds",
    ],
    techStack: ["LangGraph", "Temporal.io", "Python / Rust Engine", "Next.js / WebSockets"],
    roiMetric: "100% hands-free cross-system execution with zero human clicks",
    queryParam: "autopilot",
  },
];

export const COMPARISON_ITEMS = [
  {
    feature: "Decision Making & Resilience",
    traditional: "Fragile UiPath / RPA scripts; breaks whenever a button or selector changes",
    vyom: "Playwright + Multi-Vision LLM fallback; self-heals DOM selector shifts automatically",
  },
  {
    feature: "Input & Document Handling",
    traditional: "Strict OCR forms; fails on unstructured PDFs, messy scans, or natural text",
    vyom: "Multimodal vision & embedded compliance agents for real-time document verification",
  },
  {
    feature: "Workflow Handoffs",
    traditional: "Isolated bot scripts requiring manual trigger and babysitting",
    vyom: "Multi-agent swarm orchestration (Sales → Compliance → Onboarding) with 0 human clicks",
  },
  {
    feature: "Search & Brand Visibility",
    traditional: "Traditional SEO targeting obsolete keywords on classic search engines",
    vyom: "AIEO (AI Engine Optimization) making your brand #1 on ChatGPT, Perplexity & Gemini",
  },
  {
    feature: "Reputation Management",
    traditional: "Manual email surveys with slow responses and unhandled bad reviews",
    vyom: "Autonomous Google Reviews AI Agent: intercepts bad reviews before public posting",
  },
];
