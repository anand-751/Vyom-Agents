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
    id: "rpa-automation",
    title: "Self-Healing RPA & UI Automation",
    shortCode: "01",
    category: "Visual Automation",
    description:
      "Playwright and multi-vision LLM engine that automates complex desktop and browser interfaces, self-healing DOM selector shifts with zero script breakage while embedded AI agents audit compliance.",
    deliverables: [
      "Playwright browser & desktop GUI automation with vision-based self-healing selector fallback",
      "Embedded Compliance & Audit Agent performing real-time transaction verification",
      "Zero script breakage: auto-remediates DOM shifts, modal popups, and layout changes",
      "Multi-agent swarm topology for automated contract processing and ERP reconciliation",
    ],
    techStack: ["Playwright", "Multi-Vision LLMs", "Python", "TypeScript", "REST"],
    roiMetric: "99.8% auto-healed execution uptime beating traditional RPA",
    queryParam: "rpa-automation",
  },
  {
    id: "multiagent-systems",
    title: "Multiagent Systems",
    shortCode: "02",
    category: "Swarm Orchestration",
    description:
      "Collaborative autonomous agent swarms utilizing supervisor-worker topologies to plan, execute, cross-evaluate, and verify complex multi-step enterprise workflows with zero human babysitting.",
    deliverables: [
      "Hierarchical supervisor-worker agent topologies (LangGraph / State Machines)",
      "Dynamic planner, researcher, executor, and QA verifier agent coordination",
      "Short-term operational scratchpads + long-term episodic vector memory stores",
      "Deterministic safety guardrails with strict schema assertions & rollback logic",
    ],
    techStack: ["LangGraph", "Temporal.io", "AutoGen", "Python", "Docker"],
    roiMetric: "10x operational throughput with 100% hands-free cross-system execution",
    queryParam: "multiagent-systems",
  },
  {
    id: "agent-to-agent",
    title: "Agent to Agent (A2A) Systems",
    shortCode: "03",
    category: "Inter-Agent Protocol",
    description:
      "Peer-to-peer inter-agent communication meshes and standardized protocols allowing disparate enterprise agents to negotiate, delegate tasks, and stream real-time data securely across silos.",
    deliverables: [
      "Standardized Agent Protocol & JSON-RPC inter-agent communication mesh",
      "Autonomous task delegation, bidding, and cross-organization agent handoffs",
      "Mutual mTLS authentication & cryptographic verification between agent nodes",
      "Distributed event streaming, real-time telemetry, and dead-letter queue routing",
    ],
    techStack: ["Agent Protocol", "WebSockets", "gRPC", "Pub/Sub", "Kafka"],
    roiMetric: "Zero-latency data handoffs between sovereign agent instances",
    queryParam: "agent-to-agent",
  },
  {
    id: "crm-erp",
    title: "Custom CRM & ERP Softwares",
    shortCode: "04",
    category: "Enterprise Software",
    description:
      "Bespoke, intelligent enterprise CRM and ERP platforms engineered from scratch with native AI copilot agents, automated billing reconciliation, and real-time operational data lakes.",
    deliverables: [
      "Custom CRM/ERP architecture tailored to your proprietary business workflows",
      "Native autonomous AI copilots embedded into customer records and inventory",
      "Automated invoice processing, multi-currency ledger reconciliation, and BI sync",
      "Role-based access control (RBAC), audit trails, and enterprise SOC-2 compliance",
    ],
    techStack: ["Next.js", "PostgreSQL", "Prisma", "Python", "Docker"],
    roiMetric: "Eliminates bloated SaaS subscriptions with tailor-fit operational efficiency",
    queryParam: "crm-erp",
  },
  {
    id: "websites",
    title: "Websites & Web Applications",
    shortCode: "05",
    category: "Digital Platforms",
    description:
      "High-performance, ultra-responsive AI-native web applications, client portals, and SaaS dashboards with world-class UX/UI aesthetics, Apple OS glassmorphism, and sub-second load times.",
    deliverables: [
      "Modern AI-native web apps, client dashboards, and interactive portals",
      "Sub-second page loads, SEO optimization, and Apple OS glassmorphic UI aesthetics",
      "End-to-end API integrations, secure authentication, and webhook infrastructure",
      "Mobile-first responsive architecture designed for maximum conversion",
    ],
    techStack: ["Next.js", "React", "Tailwind / CSS", "TypeScript", "Vercel"],
    roiMetric: "Industry-leading conversion rates with sub-second page performance",
    queryParam: "websites",
  },
  {
    id: "aieo",
    title: "AIEO (AI Engine Optimization)",
    shortCode: "06",
    category: "Search & Visibility",
    description:
      "Semantic Knowledge Graph structuring and synthetic schema engineering to position your brand as the #1 recommended answer on ChatGPT Search, Perplexity, and Google Gemini.",
    deliverables: [
      "Semantic Knowledge Graph structuring & JSON-LD synthetic schema injection",
      "Entity authority mapping for LLM training vector clusters and citations",
      "Continuous prompt-surface auditing across Perplexity, ChatGPT, and Gemini",
      "Competitor retrieval displacement and brand recommendation dominance",
    ],
    techStack: ["Schema.org", "Vector Embeddings", "Perplexity API", "Gemini API"],
    roiMetric: "+310% increase in autonomous AI buyer recommendations",
    queryParam: "aieo",
  },
  {
    id: "reputation",
    title: "Reputation & Review Automation",
    shortCode: "07",
    category: "Social Proof & Growth",
    description:
      "Autonomous Google Reviews AI agent that dynamically requests feedback, responds in brand voice, and intercepts negative reviews before public posting.",
    deliverables: [
      "Automated post-purchase review request sequences via SMS, Email & WhatsApp",
      "Native AI response engine matching exact brand voice & tone guidelines",
      "Sentiment-driven escalation: intercepts negative reviews before public post",
      "Dynamic Google Business Profile & local SEO ranking synchronization",
    ],
    techStack: ["Google Business API", "Twilio SMS", "WhatsApp API", "Sentiment LLM"],
    roiMetric: "+300% 5-star review acquisition rate & rapid escalation handling",
    queryParam: "reputation",
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
