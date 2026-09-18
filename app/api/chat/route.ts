import { NextRequest, NextResponse } from "next/server";
import { retrieveRagContext } from "@/lib/rag-knowledge";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, history } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query parameter is required." },
        { status: 400 }
      );
    }

    // 1. Perform RAG context retrieval across all Vyom enterprise information
    const { chunks, combinedContext, bestAction } = retrieveRagContext(query, 3);
    const ragSources = chunks.map((c) => c.title);

    // 2. Check if GROQ_API_KEY is configured
    const apiKey = process.env.GROQ_API_KEY;

    if (apiKey) {
      try {
        const groq = new Groq({ apiKey });

        const messages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [
          {
            role: "system",
            content: `You are Vyom AI, the elite enterprise Autonomous Sales & Architecture AI Assistant for Vyom Agents (Vyom Autonomous Intelligence).
Your purpose is to assist prospective enterprise clients, CTOs, doctors, and engineers with technical authority, clarity, and precision.

GROUNDING CONTEXT (Use ONLY this verified company knowledge):
${combinedContext}

INSTRUCTIONS:
1. Always base your answers strictly on the verified grounding context above.
2. Be concise, executive, and compelling (2-4 sentences or clean bullet points).
3. If asked about pricing, quote the exact tiers (Starter: ₹14,999 / $180/mo; Professional: ₹23,999 / $280/mo; Enterprise: ₹33,990 / $400/mo).
4. If asked about voice reception, highlight sub-400ms latency, native calendar booking, 45+ languages, and carrier telephony integration.
5. If asked about RPA or automation, explain our visual self-healing neural embeddings and 99.8% recovery uptime vs brittle legacy bots.
6. Invite the user to book an architecture audit or test the live voice demo when appropriate.`,
          },
        ];

        // Append recent conversation history if provided
        if (Array.isArray(history)) {
          for (const msg of history.slice(-4)) {
            messages.push({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text,
            });
          }
        }

        // Add current user query
        messages.push({
          role: "user",
          content: query,
        });

        const completion = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages,
          temperature: 0.3,
          max_tokens: 350,
        });

        const reply = completion.choices[0]?.message?.content?.trim() || "";

        if (reply) {
          return NextResponse.json({
            success: true,
            reply,
            actionButton: bestAction,
            ragSources,
            engine: "groq-llama-3.3-70b",
          });
        }
      } catch (groqError: any) {
        console.warn("Groq API error, falling back to deterministic RAG:", groqError?.message || groqError);
      }
    }

    // 3. High-fidelity Deterministic RAG Synthesizer Fallback
    // Generates an instant, highly accurate response directly from top matching knowledge chunks
    const topChunk = chunks[0];
    let synthesizedReply = "";

    const lower = query.toLowerCase();

    if (lower.includes("book") || lower.includes("schedule") || lower.includes("contact") || lower.includes("hire") || lower.includes("demo call")) {
      synthesizedReply = "You can schedule a 30-minute architectural audit and live proof-of-concept demonstration with our Principal Solutions Architect right here. We deliver live telephony prototypes within 48 hours under mutual NDA.";
    } else if (lower.includes("price") || lower.includes("cost") || lower.includes("fee") || lower.includes("rate") || lower.includes("inr") || lower.includes("dollar")) {
      synthesizedReply = "Vyom's AI Receptionist starts at ₹14,999/mo ($180) for Starter (up to 400 calls), ₹23,999/mo ($280) for Professional (up to 700 calls with rescheduling workflows), and ₹33,990/mo ($400) for Enterprise (1,000+ calls, custom CRM & 24/7 SLA). Would you like to view our interactive ROI calculator or book a demo?";
    } else if (lower.includes("voice") || lower.includes("receptionist") || lower.includes("audio") || lower.includes("phone call")) {
      synthesizedReply = "Our flagship AI Voice Receptionist operates with sub-400ms latency, native Google Calendar & EHR synchronization, and human-like interruption handling across 45+ languages. It handles 15+ concurrent calls without hold times, capturing 100% of after-hours leads.";
    } else if (lower.includes("rpa") || lower.includes("self-healing") || lower.includes("automation") || lower.includes("orchestrator") || lower.includes("uipath")) {
      synthesizedReply = "Vyom's Self-Healing RPA engine uses visual neural embeddings with Playwright rather than fragile XPath/CSS selectors. When target buttons or legacy ERP interfaces shift, our engine auto-remediates target selectors in real time with 99.8% recovery uptime.";
    } else if (lower.includes("ecosystem") || lower.includes("flywheel") || lower.includes("review") || lower.includes("whatsapp")) {
      synthesizedReply = "The Vyom AI Ecosystem forms an autonomous growth loop: AI Voice Agents book appointments, Custom CRM software executes transactions, Review Agents harvest 5-star Google Reviews via WhatsApp, and AIEO ranks your brand #1 on ChatGPT and Perplexity Search.";
    } else if (lower.includes("security") || lower.includes("hipaa") || lower.includes("soc") || lower.includes("guardrail") || lower.includes("data")) {
      synthesizedReply = "All Vyom agent workflows run inside deterministic test harnesses with strict input/output policy validators. We operate under zero data retention, SOC-2 Type II protocols, and HIPAA compliance for healthcare appointment triage.";
    } else if (topChunk) {
      synthesizedReply = `${topChunk.content.split("\n\n")[0]}\n\nWould you like to explore our live product demos or schedule an architectural consultation?`;
    } else {
      synthesizedReply = "Vyom Agents specializes in custom autonomous AI workforces, sub-400ms conversational voice agents, and self-healing RPA systems. How can I assist your team today?";
    }

    return NextResponse.json({
      success: true,
      reply: synthesizedReply,
      actionButton: bestAction,
      ragSources,
      engine: "rag-verified-knowledge",
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error processing chat query." },
      { status: 500 }
    );
  }
}
