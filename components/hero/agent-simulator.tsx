"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  Database, 
  PhoneCall, 
  Calendar, 
  ShieldCheck, 
  Zap,
  Sparkles
} from "lucide-react";

interface StepLog {
  id: string;
  step: string;
  time: string;
  tool: string;
  detail: string;
  status: "done" | "running" | "waiting";
}

export function AgentSimulator() {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [currentStep, setCurrentStep] = useState(2);
  const [elapsedMs, setElapsedMs] = useState(284);

  const scenarios = [
    {
      title: "Inbound Voice Lead & Calendar Sync",
      goal: "User calls via SIP Trunk -> Inbound Voice Agent answers -> Qualifies enterprise lead -> Books demo in Google Calendar -> Sends Slack alert",
      nodes: [
        { name: "Voice Gateway", type: "Twilio / WebRTC", icon: PhoneCall, status: "completed" },
        { name: "Intent Analysis", type: "LLM Reasoning (45ms)", icon: Cpu, status: "completed" },
        { name: "Vector Retrieval", type: "Hybrid RAG / Pinecone", icon: Database, status: "active" },
        { name: "Calendar Dispatch", type: "Google API Tool", icon: Calendar, status: "queued" },
        { name: "Guardrail Verifier", type: "Deterministic Policy", icon: ShieldCheck, status: "queued" },
      ],
      logs: [
        { id: "1", step: "01", time: "0.00s", tool: "VoiceGateway.streamInbound", detail: "Audio stream ingested from +1 (415) 890-2100. Latency: 42ms", status: "done" },
        { id: "2", step: "02", time: "0.14s", tool: "AgentRouter.synthesizeIntent", detail: "Extracted intent: 'Book enterprise discovery call for team of 50'", status: "done" },
        { id: "3", step: "03", time: "0.22s", tool: "VectorStore.queryPricingContext", detail: "Fetched tier specs and available sales engineering calendar slots", status: "done" },
        { id: "4", step: "04", time: "0.28s", tool: "GoogleCalendar.createEvent", detail: "Confirmed slot: Thursday 2:00 PM EST. Invites dispatched to client & AE", status: "running" },
        { id: "5", step: "05", time: "0.32s", tool: "GuardrailEngine.verifyAudit", detail: "Verified compliance with HIPAA/SOC-2 policies. Execution sealed.", status: "waiting" },
      ],
    },
    {
      title: "Self-Healing Back-Office RPA Loop",
      goal: "Extract invoice data from email -> Detect UI change in legacy ERP -> Auto-remediate DOM selector -> Post transaction & reconcile",
      nodes: [
        { name: "Doc Parser", type: "Multimodal Vision OCR", icon: Zap, status: "completed" },
        { name: "Heuristic Map", type: "State Graph", icon: Cpu, status: "completed" },
        { name: "Self-Healing Engine", type: "Auto-Remediation", icon: Sparkles, status: "active" },
        { name: "ERP Mutation", type: "Secure Automation", icon: Database, status: "queued" },
        { name: "Audit Trail", type: "Immutable Replay", icon: ShieldCheck, status: "queued" },
      ],
      logs: [
        { id: "1", step: "01", time: "0.00s", tool: "EmailIngest.extractPDF", detail: "Invoice #INV-9402 parsed. Vendor: Cloudflare Inc. Amount: $14,250", status: "done" },
        { id: "2", step: "02", time: "0.11s", tool: "DOMInspector.locateSubmitButton", detail: "Warning: UI element relocated in latest ERP update (v4.12.0)", status: "done" },
        { id: "3", step: "03", time: "0.19s", tool: "SelfHealingAgent.remapTarget", detail: "Calculated semantic vector likeness: Target matched at (x: 840, y: 310)", status: "done" },
        { id: "4", step: "04", time: "0.26s", tool: "TransactionAgent.commitEntry", detail: "Reconciliation successful. Ledger balance verified with 0% delta", status: "running" },
        { id: "5", step: "05", time: "0.31s", tool: "AuditLogger.signReceipt", detail: "Cryptographic replay token generated and archived to S3", status: "waiting" },
      ],
    },
  ];

  const currentScenario = scenarios[activeScenarioIndex];

  // Micro-simulation step progression
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev >= 4 ? 1 : prev + 1));
        setElapsedMs(Math.floor(210 + Math.random() * 90));
      }, 2600);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="w-full relative rounded-2xl overflow-hidden glass-panel-elevated shadow-glass-elevated border border-slate-200/90">
      {/* Chrome Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="h-4 w-[1px] bg-slate-700 mx-1" />
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-slate-400">vyom-core://</span>
            <span className="text-sky-300 font-semibold">autonomous-runtime.v2</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-800/90 text-slate-300 px-2.5 py-1 rounded-md text-[11px] font-mono border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Telemetry: {elapsedMs}ms latency</span>
          </div>
          <button
            onClick={() => {
              setActiveScenarioIndex((prev) => (prev === 0 ? 1 : 0));
              setCurrentStep(1);
            }}
            className="text-[11px] text-sky-300 hover:text-white flex items-center gap-1 bg-sky-950/60 hover:bg-sky-900/60 px-2 py-1 rounded border border-sky-800/60 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Switch Scenario</span>
          </button>
        </div>
      </div>

      {/* Scenario Title & High-Level Goal Banner */}
      <div className="px-5 py-3 bg-gradient-to-r from-sky-50/90 via-indigo-50/50 to-white border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800 rounded-full border border-sky-200">
              Active Autonomous Workflow
            </span>
            <span className="text-xs font-semibold text-slate-900">{currentScenario.title}</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 font-mono line-clamp-1">
            {currentScenario.goal}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
              isRunning
                ? "bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            {isRunning ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
                <span>Pause Live Run</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>Resume Simulation</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Visual Autonomous Agent Pipeline Nodes */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 tracking-wide uppercase flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-sky-600" />
                Agent Pipeline Graph
              </span>
              <span className="text-[11px] text-slate-500 font-mono">5 Node Pipeline</span>
            </div>

            <div className="space-y-2 relative">
              {/* Connecting vertical line */}
              <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-slate-200" />

              {currentScenario.nodes.map((node, idx) => {
                const IconComponent = node.icon;
                const isNodeActive = idx === currentStep;
                const isNodeDone = idx < currentStep;

                return (
                  <motion.div
                    key={node.name}
                    initial={false}
                    animate={{
                      scale: isNodeActive ? 1.02 : 1,
                    }}
                    className={`relative z-10 flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                      isNodeActive
                        ? "bg-white border-sky-500 shadow-md ring-2 ring-sky-100"
                        : isNodeDone
                        ? "bg-slate-50/90 border-emerald-200"
                        : "bg-white/50 border-slate-200/70 opacity-60"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                        isNodeActive
                          ? "bg-sky-600 text-white shadow-sm"
                          : isNodeDone
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isNodeDone ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : isNodeActive ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                      ) : (
                        <IconComponent className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-900 truncate">
                          {node.name}
                        </p>
                        <span
                          className={`text-[10px] font-mono font-medium ${
                            isNodeActive
                              ? "text-sky-600"
                              : isNodeDone
                              ? "text-emerald-600"
                              : "text-slate-400"
                          }`}
                        >
                          {isNodeActive ? "EXECUTING" : isNodeDone ? "PASSED" : "IDLE"}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono truncate">{node.type}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 text-slate-100 text-xs flex items-center justify-between border border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-medium">Deterministic Guardrail Engine</span>
            </div>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-800">
              100% Policy Pass
            </span>
          </div>
        </div>

        {/* Right Column: Live Autonomous Execution Stream / Terminal */}
        <div className="lg:col-span-7 bg-slate-950 rounded-xl p-4 font-mono text-xs text-slate-300 flex flex-col justify-between shadow-inner border border-slate-800/80">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-200">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Live Agent Execution Logs
              </span>
              <span className="text-emerald-400">● 100% Deterministic</span>
            </div>

            <div className="space-y-2.5">
              {currentScenario.logs.map((log, index) => {
                const isActive = index === currentStep;
                const isPassed = index < currentStep;

                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-2.5 rounded-lg transition-all ${
                      isActive
                        ? "bg-slate-900 border border-sky-500/50 shadow-sm"
                        : isPassed
                        ? "bg-slate-900/50 border border-slate-800/80 opacity-80"
                        : "opacity-35"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-semibold">{log.step}</span>
                        <span className="text-sky-400 font-bold">{log.tool}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{log.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-200 leading-relaxed font-sans">
                      {log.detail}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Engine Status: Autonomous Loop Active</span>
            </div>
            <span className="text-sky-400 font-mono">vyom-agent-swarm-node-01</span>
          </div>
        </div>
      </div>
    </div>
  );
}
