"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Layers, 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Server,
  Zap,
  Workflow
} from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  role: string;
  tag: string;
}

const TECH_CATEGORIES = [
  { id: "all", label: "Full Stack Overview", icon: Layers },
  { id: "ai", label: "Agentic AI Core", icon: Cpu },
  { id: "enterprise", label: "ERP & CRM Connectors", icon: Server },
  { id: "data", label: "Vector & State Memory", icon: Database },
  { id: "evals", label: "Tracing & Evals", icon: ShieldCheck },
];

const TECH_ITEMS: TechItem[] = [
  // --- AGENTIC AI CORE TAB ONLY (The 8 requested Agentic AI specification cards) ---
  { 
    name: "Model Context Protocol (MCP)", 
    category: "ai", 
    role: "Open standard created to replace bespoke API glue code, allowing agents to connect securely to local/remote servers (file systems, GitHub, SQL databases, Slack) using a unified client-server interface.", 
    tag: "Protocol Standard" 
  },
  { 
    name: "Native Function & Tool Calling", 
    category: "ai", 
    role: "OpenAPI schemas and JSON Schema passed directly into LLM endpoints to trigger deterministic, structured outputs and tool execution loops.", 
    tag: "Schema Execution" 
  },
  { 
    name: "LangGraph & CrewAI Orchestration", 
    category: "ai", 
    role: "Graph-based frameworks with state nodes & edges (LangGraph) and role-based multi-agent teams (CrewAI) for stateful task handoffs.", 
    tag: "Agent Topology" 
  },
  { 
    name: "Vector Databases (Semantic Memory)", 
    category: "ai", 
    role: "ChromaDB, FAISS, Pinecone, Qdrant, Weaviate, Milvus, and pgvector used to query enterprise knowledge bases via dense vector retrieval (RAG).", 
    tag: "Dense RAG Memory" 
  },
  { 
    name: "Episodic & State Memory", 
    category: "ai", 
    role: "Redis, PostgreSQL, and Letta (MemGPT) storing conversation histories, intermediate agent thoughts, and long-term user preferences across multiple sessions.", 
    tag: "Long-Term Memory" 
  },
  { 
    name: "Tracing & Observability Tools", 
    category: "ai", 
    role: "LangSmith, Langfuse, Phoenix (Arize), and Weights & Biases Weave logging LLM prompts, function inputs, tool outputs, and step execution timelines.", 
    tag: "Telemetry & Logs" 
  },
  { 
    name: "Evals & Trajectory Frameworks", 
    category: "ai", 
    role: "Ragas, DeepEval, and DSPy automated scoring suites testing agent trajectory accuracy and tool-calling success rates over benchmark datasets.", 
    tag: "Automated Evals" 
  },
  { 
    name: "Frontier & Open-Source LLMs", 
    category: "ai", 
    role: "Claude 3.5 Sonnet/Opus, GPT-4o, and Gemini 1.5 Pro for complex reasoning, alongside Llama 3, Mistral, and Qwen 2.5 on vLLM/Ollama for low-latency local execution.", 
    tag: "Foundation Models" 
  },

  // --- FULL STACK OVERVIEW / ENTERPRISE / DATA / EVALS CARDS ---
  { name: "Next.js & React Framework", category: "all-only", role: "Server-side rendering, API route orchestration, and real-time interactive user interfaces.", tag: "Frontend Runtime" },
  { name: "TypeScript Type Mesh", category: "all-only", role: "End-to-end type safety, strict interface contracts, and schema validation across microservices.", tag: "Language" },
  { name: "Python Multi-Agent Engine", category: "all-only", role: "Asynchronous multi-agent execution runtime, numerical compute, and LLM reasoning mesh.", tag: "AI Engine" },
  { name: "Rust High-Speed Core", category: "all-only", role: "Ultra-low-latency native desktop automation, memory-safe execution, and system IPC.", tag: "Performance" },
  { name: "Salesforce & HubSpot CRM", category: "enterprise", role: "Autonomous lead qualification, opportunity logging, and contact sync with zero human friction.", tag: "CRM Connector" },
  { name: "SAP S/4HANA & QuickBooks", category: "enterprise", role: "Self-healing invoice reconciliation, ledger updates, and automated inventory tracking.", tag: "ERP Connector" },
  { name: "Google Workspace & EHR", category: "enterprise", role: "Bidirectional Google Calendar scheduling, Gmail sync, and healthcare EHR interoperability.", tag: "Productivity" },
  { name: "Slack & WhatsApp API", category: "enterprise", role: "Instant autonomous alerting, human-in-the-loop approvals, and 5-star review follow-ups.", tag: "Messaging" },
  { name: "PostgreSQL & pgvector", category: "data", role: "Relational enterprise database with native vector embeddings & similarity search.", tag: "Vector DB" },
  { name: "Pinecone & Qdrant", category: "data", role: "Serverless low-latency vector indexing for high-throughput enterprise RAG pipelines.", tag: "Vector Index" },
  { name: "ChromaDB & FAISS", category: "data", role: "Lightweight, high-performance in-memory vector storage and similarity search for local agent state memory & RAG.", tag: "Vector State Memory" },
  { name: "Redis Semantic Cache", category: "data", role: "Sub-millisecond prompt caching, short-term scratchpads, and state persistence.", tag: "In-Memory Cache" },
  { name: "AWS & Cloud Infrastructure", category: "all-only", role: "Dedicated VPCs, EC2 GPU clusters, S3 object storage, and sovereign cloud deployments.", tag: "Cloud Infrastructure" },
  { name: "LangSmith & Langfuse", category: "evals", role: "Real-time prompt tracing, step latency tracking, token cost attribution, and execution graph visualization.", tag: "Tracing & Telemetry" },
  { name: "Ragas & DeepEval Suite", category: "evals", role: "Automated LLM-as-a-judge scoring frameworks testing agent trajectory accuracy, context precision, and safety.", tag: "Automated Evals" },
  { name: "Arize Phoenix & W&B Weave", category: "evals", role: "Open-source telemetry tracing, evaluation datasets, and real-time production performance monitoring.", tag: "Observability Mesh" },
  { name: "DSPy Optimization Engine", category: "evals", role: "Declarative prompt compilation and automated self-correcting prompt tuning loops based on trajectory metrics.", tag: "Prompt Compiler" },
];

export function TechStackShowcase() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems = activeFilter === "all" 
    ? TECH_ITEMS.filter((item) => item.category === "all-only" || item.category === "enterprise" || item.category === "data" || item.category === "evals") 
    : TECH_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section id="tech-stack" className="py-20 relative bg-slate-50/70 border-t border-slate-200/80 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-sky-100/40 via-purple-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>Enterprise Integration Mesh</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950">
            Engineered for Any Tech Stack & Infrastructure
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Vyom Agents leverages open standards (MCP, OpenAPI), stateful multi-agent topologies (LangGraph, CrewAI), semantic memory (RAG vector DBs), and observability suites for deterministic enterprise execution.
          </p>
        </div>

        {/* Category Tabs Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {TECH_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeFilter === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md scale-105"
                    : "bg-white text-slate-600 hover:text-slate-950 border border-slate-200 hover:border-slate-300"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-sky-400" : "text-slate-400"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Grid of Tech Stack & Connectors */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence>
            {filteredItems.map((tech) => (
              <motion.div
                layout
                key={tech.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-sky-300 hover:shadow-md transition-all group flex flex-col justify-between h-full min-h-[160px]"
              >
                <div>
                  <div className="flex items-start justify-between gap-2.5 mb-2.5">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                      {tech.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-slate-100 text-slate-600 border border-slate-200/80 shrink-0 mt-0.5">
                      {tech.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {tech.role}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                    <span>Production Ready</span>
                  </span>
                  <span className="text-slate-400 group-hover:text-sky-600 transition-colors font-medium">
                    Standard Spec
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Callout */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <ShieldCheck className="w-6 h-6 text-sky-600 shrink-0 mx-auto sm:mx-0" />
            <span>
              <strong>Need a custom MCP server or specialized RAG pipeline?</strong> Vyom Agents builds custom Model Context Protocol adapters and localized vector memory indexes.
            </span>
          </div>
          <a
            href="?modal=contact"
            className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs transition-colors shrink-0 flex items-center gap-1"
          >
            <span>Request MCP Integration</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
