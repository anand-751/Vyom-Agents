import nodemailer from "nodemailer";

export interface DiscoveryLeadData {
  name: string;
  email: string;
  company: string;
  interest: string;
  teamSize?: string;
  message?: string;
  referenceId: string;
}

const INTEREST_LABELS: Record<string, string> = {
  "voice-agent": "AI Voice Receptionist (Sub-400ms)",
  "reconciliation-ops": "Agentic AI Multi-Agent Reconciliation & Accounts Operations",
  "orchestrator": "Self-Healing RPA & Workflow Orchestrator",
  "aieo": "AIEO (AI Engine Optimization)",
  "workforce": "Custom Bespoke Agentic Workforce",
  "automations": "Enterprise AI Automations & APIs",
  "apps": "Custom Desktop / Web Application",
  "rag": "Enterprise RAG & Knowledge Graphs",
  "general-updates": "Vyom Autonomous Intelligence Whitepapers",
};

const DISCOVERY_ANALYSIS_MAP: Record<string, { summary: string; auditChecklist: string[] }> = {
  "voice-agent": {
    summary:
      "Client seeks 24/7 conversational voice intelligence to eliminate hold times, capture after-hours inquiries, and automate appointment bookings with sub-400ms human cadence.",
    auditChecklist: [
      "Analyze current inbound call volume, peak rush periods, and estimated missed call revenue loss",
      "Map target calendar/EHR/CRM systems (e.g. Google Calendar, Outlook, HubSpot, Salesforce)",
      "Prepare customized live voice receptionist prototype in their industry domain",
    ],
  },
  "reconciliation-ops": {
    summary:
      "Client seeks an autonomous multi-agent workforce for Bank/Credit Card Reconciliation, Smart Transaction Categorization, AP 3-Way Matching, AR & Overdue Collections, Journal Entry Assistance, Month-End Close, and Human-in-the-Loop Exception Approval.",
    auditChecklist: [
      "Audit current monthly bank/credit-card transaction feeds, import mechanisms, and ledger mismatch rates",
      "Evaluate AP invoice intake channels, OCR line-item accuracy, 3-way PO matching rules, and exception routing",
      "Review chart of accounts classification, recurring/accrual journal cadence, and month-end close checklist bottlenecks",
      "Configure accountant review thresholds (approvals, rejections, corrections) and ERP sync (SAP, NetSuite, QuickBooks)",
    ],
  },
  "orchestrator": {
    summary:
      "Client seeks self-healing visual UI automation and multi-agent RPA to replace fragile bots, automate cross-platform software workflows, and eliminate manual data entry.",
    auditChecklist: [
      "Audit manual desktop and browser GUI tasks causing administrative bottlenecks",
      "Map out invoice matching, document verification, and ERP reconciliation steps",
      "Establish self-healing Playwright and multi-vision model fallback topology",
    ],
  },
  "aieo": {
    summary:
      "Client aims to dominate brand entity authority and citation frequency as the #1 recommended answer on ChatGPT Search, Perplexity, and Google Gemini.",
    auditChecklist: [
      "Benchmark current brand and competitor recommendation frequency across major LLMs",
      "Audit domain entity authority, Knowledge Graph structure, and JSON-LD synthetic schema",
      "Formulate prompt-surface optimization and citation displacement strategy",
    ],
  },
  "workforce": {
    summary:
      "Client seeks an autonomous multi-agent swarm with hierarchical supervisor-worker coordination across internal databases, microservices, and third-party APIs.",
    auditChecklist: [
      "Identify high-friction human handoffs between departments slowing throughput",
      "Review API endpoints, databases, and microservices for agent tool calling",
      "Define state machines, memory persistence, and human-in-the-loop escalation bounds",
    ],
  },
  "automations": {
    summary:
      "Client seeks custom enterprise workflow automations and API integrations to eliminate data silos and convert manual tasks into 24/7 autonomous pipelines.",
    auditChecklist: [
      "Catalog disconnected software systems (CRM, billing, ERP, internal dashboards)",
      "Design webhook event streams, data validation schemas, and automated rollback logic",
      "Calculate time savings and throughput velocity ROI",
    ],
  },
  "apps": {
    summary:
      "Client requires a modern, high-performance web or desktop application engineered for seamless customer self-service and local operational workflows.",
    auditChecklist: [
      "Define core user journeys, data structures, and conversion touchpoints",
      "Evaluate offline/desktop hardware integrations (scanners, receipt printers, POS)",
      "Map UI/UX architectural requirements and deployment timeline",
    ],
  },
  "rag": {
    summary:
      "Client requires an enterprise RAG knowledge graph and private AI copilot trained securely over internal manuals, contracts, and company documentation.",
    auditChecklist: [
      "Inventory unstructured enterprise documents (PDFs, knowledge bases, tickets)",
      "Design semantic chunking, vector embedding, and hybrid retrieval architecture",
      "Enforce strict role-based access control (RBAC) and zero data retention compliance",
    ],
  },
};

/**
 * Creates and returns a nodemailer transporter configured for Brevo / SMTP relay
 */
function getTransporter() {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

  if (!smtpUser || !smtpPass) {
    return null;
  }

  const host = process.env.SMTP_HOST || "smtp-relay.brevo.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Sends discovery notification email to vyomagents@gmail.com and a confirmation email to the lead.
 */
export async function sendDiscoveryNotificationEmails(lead: DiscoveryLeadData): Promise<{
  adminSent: boolean;
  clientSent: boolean;
  reason?: string;
}> {
  const transporter = getTransporter();
  const adminNotificationEmail =
    process.env.CONTACT_NOTIFICATION_EMAIL || "vyomagents@gmail.com";
  const senderEmail = process.env.SMTP_FROM || "vyomagents@gmail.com";

  if (!transporter) {
    console.log(
      `[SMTP Mailer] Notice: SMTP credentials (SMTP_USER / SMTP_PASS) not configured. Discovery request recorded locally with Ref: ${lead.referenceId}.`
    );
    return {
      adminSent: false,
      clientSent: false,
      reason: "credentials_not_configured",
    };
  }

  const interestName = INTEREST_LABELS[lead.interest] || lead.interest || "AI Automation";
  const discoveryAnalysis = DISCOVERY_ANALYSIS_MAP[lead.interest] || {
    summary:
      "Client has requested an architectural assessment to modernize business operations using autonomous AI systems.",
    auditChecklist: [
      "Review client's specific business workflow and target operational goals",
      "Identify high-impact automation quick-wins and systems integration points",
      "Prepare personalized demonstration and ROI projection for discovery call",
    ],
  };

  const formattedDate = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });

  // 1. Internal notification email (to vyomagents@gmail.com)
  const adminMailOptions = {
    from: `"Vyom Discovery Intake" <${senderEmail}>`,
    to: adminNotificationEmail,
    replyTo: `${lead.name} <${lead.email}>`,
    subject: `💼 Client Business Discovery: ${lead.name} (${lead.company}) — ${interestName}`,
    text: `
============================================================
NEW CLIENT BUSINESS PROBLEM & DISCOVERY INTAKE
============================================================

A prospective client has submitted an inquiry on the website describing their operational challenge and requested an architectural discovery audit.

1. CLIENT & BUSINESS PROFILE:
• Client Name: ${lead.name}
• Corporate Email: ${lead.email}
• Company / Business: ${lead.company}
• Team / Company Scale: ${lead.teamSize ? lead.teamSize + " employees" : "Not specified"}
• Reference Token: ${lead.referenceId}
• Submitted At: ${formattedDate} UTC

2. CLIENT'S SUBMITTED QUERY & PROBLEM STATEMENT (FROM FORM):
• Target Solution Selected: ${interestName}
• What the Client Wrote in the Form:
${
  lead.message && lead.message.trim().length > 0
    ? `"${lead.message}"`
    : `(Client did not write extra scope notes. Primary requested focus is ${interestName}.)`
}

3. INITIAL BUSINESS PROBLEM DISCOVERY ANALYSIS:
• Problem Focus:
  ${discoveryAnalysis.summary}

• Recommended Initial Audit Checklist for Call Preparation:
  1. ${discoveryAnalysis.auditChecklist[0]}
  2. ${discoveryAnalysis.auditChecklist[1]}
  3. ${discoveryAnalysis.auditChecklist[2]}

NEXT STEP:
Reply directly to ${lead.name} at ${lead.email} to coordinate their 30-minute discovery session and live demonstration.
============================================================
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #080c14; color: #f1f5f9; margin: 0; padding: 24px; }
    .card { background-color: #0f172a; border: 1px solid #1e293b; border-radius: 16px; max-width: 640px; margin: 0 auto; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
    .header { background: linear-gradient(135deg, #0284c7, #38bdf8); padding: 26px 28px; color: #082f49; }
    .header-badge { display: inline-block; background-color: rgba(8, 47, 73, 0.2); color: #082f49; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 4px 10px; border-radius: 6px; margin-bottom: 6px; }
    .header h2 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: #082f49; }
    .header p { margin: 6px 0 0; font-size: 13px; font-weight: 600; color: #0c4a6e; }
    .content { padding: 28px; }
    .alert-banner { background-color: #082f49; border-left: 4px solid #38bdf8; padding: 14px 16px; border-radius: 0 10px 10px 0; margin-bottom: 24px; font-size: 13.5px; line-height: 1.5; color: #e0f2fe; }
    .section-title { font-size: 11px; font-weight: 800; text-transform: uppercase; color: #38bdf8; letter-spacing: 1px; margin-bottom: 12px; }
    .token-badge { float: right; background-color: #1e293b; color: #38bdf8; font-family: monospace; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 6px; border: 1px solid #334155; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #1e293b; border-radius: 10px; overflow: hidden; border: 1px solid #334155; }
    .info-table tr:last-child td { border-bottom: none; }
    .info-table td { padding: 11px 14px; font-size: 13px; border-bottom: 1px solid #334155; }
    .info-label { color: #94a3b8; font-weight: 600; width: 36%; }
    .info-val { color: #f8fafc; font-weight: 500; }
    .problem-box { background-color: #131c31; border: 1px solid #223554; border-radius: 12px; padding: 18px; margin-bottom: 24px; }
    .problem-quote { font-size: 14px; line-height: 1.6; color: #f8fafc; font-style: normal; margin: 0; }
    .analysis-card { background: linear-gradient(180deg, #131d33, #0f172a); border: 1px solid #1e3a5f; border-radius: 12px; padding: 18px 20px; margin-bottom: 26px; }
    .analysis-summary { font-size: 13px; line-height: 1.6; color: #cbd5e1; margin-bottom: 14px; }
    .checklist-item { display: flex; align-items: flex-start; gap: 10px; font-size: 12.5px; line-height: 1.5; color: #94a3b8; margin-bottom: 8px; }
    .checklist-item:last-child { margin-bottom: 0; }
    .checklist-dot { width: 6px; height: 6px; background-color: #38bdf8; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
    .cta-container { text-align: center; margin: 28px 0 10px; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #0284c7, #38bdf8); color: #082f49 !important; text-decoration: none; font-weight: 800; font-size: 13px; padding: 13px 28px; border-radius: 9999px; box-shadow: 0 10px 15px -3px rgba(14, 165, 233, 0.3); }
    .footer { padding: 18px 28px; background-color: #0b1120; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b; text-align: center; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="header-badge">Client Business Query</span>
      <h2>💼 New Technical Discovery Request</h2>
      <p>A client has submitted an operational bottleneck and requested an architectural audit.</p>
    </div>
    
    <div class="content">
      <div class="alert-banner">
        <strong>${lead.name}</strong> from <strong>${lead.company}</strong> has submitted an intake query for <strong>${interestName}</strong>.
      </div>

      <!-- 1. Client Profile -->
      <div class="section-title">
        <span>1. Client & Organization Profile</span>
        <span class="token-badge">TOKEN: ${lead.referenceId}</span>
      </div>
      <table class="info-table">
        <tr>
          <td class="info-label">Client Name</td>
          <td class="info-val"><strong>${lead.name}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Corporate Email</td>
          <td class="info-val"><a href="mailto:${lead.email}" style="color: #38bdf8; text-decoration: none; font-weight: 600;">${lead.email}</a></td>
        </tr>
        <tr>
          <td class="info-label">Company / Business</td>
          <td class="info-val"><strong>${lead.company}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Company Scale</td>
          <td class="info-val">${lead.teamSize ? lead.teamSize + " employees" : "Not specified"}</td>
        </tr>
        <tr>
          <td class="info-label">Submitted At</td>
          <td class="info-val">${formattedDate} UTC</td>
        </tr>
      </table>

      <!-- 2. Client Business Problem Statement -->
      <div class="section-title">
        <span>2. Client's Submitted Business Query & Scope</span>
      </div>
      <div class="problem-box">
        <div style="font-size: 11px; text-transform: uppercase; color: #38bdf8; font-weight: 700; margin-bottom: 8px;">
          Requested Automation: ${interestName}
        </div>
        <div style="font-size: 11px; color: #94a3b8; font-weight: 600; margin-bottom: 6px;">
          What the client wrote in the form:
        </div>
        <p class="problem-quote">
          ${
            lead.message && lead.message.trim().length > 0
              ? `"${lead.message.replace(/\n/g, "<br/>")}"`
              : `<em style="color: #94a3b8;">Client did not enter additional scope notes in the form. Focus discovery on ${interestName}.</em>`
          }
        </p>
      </div>

      <!-- 3. Initial Business Problem Discovery Analysis -->
      <div class="section-title">
        <span>3. Initial Problem Discovery & Audit Preparation</span>
      </div>
      <div class="analysis-card">
        <div style="font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 6px;">
          Strategic Context & Problem Focus:
        </div>
        <div class="analysis-summary">
          ${discoveryAnalysis.summary}
        </div>
        <div style="font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 8px;">
          Recommended Initial Audit Checklist for Discovery Call:
        </div>
        ${discoveryAnalysis.auditChecklist
          .map(
            (item) => `
          <div class="checklist-item">
            <span class="checklist-dot"></span>
            <span>${item}</span>
          </div>
        `
          )
          .join("")}
      </div>

      <!-- 4. Quick Action Button -->
      <div class="cta-container">
        <a href="mailto:${lead.email}?subject=Vyom%20Agents%20Discovery%20Session%20-%20${encodeURIComponent(lead.company)}" class="cta-button">
          Reply Directly to ${lead.name} & Schedule Audit
        </a>
      </div>
    </div>

    <div class="footer">
      Vyom Autonomous Intelligence • Client Discovery & Architectural Intake Node<br>
      Confidential Enterprise Intake • <a href="https://vyom-agents.vercel.app" style="color: #38bdf8; text-decoration: none;">vyom-agents.vercel.app</a>
    </div>
  </div>
</body>
</html>
    `,
  };

  // 2. Client confirmation email (to lead)
  const clientMailOptions = {
    from: `"Vyom Agents Architecture" <${senderEmail}>`,
    to: lead.email,
    subject: `Discovery Request Confirmed: Vyom Agents Architectural Audit (Ref: ${lead.referenceId})`,
    text: `
Hello ${lead.name},

Thank you for requesting a Technical Discovery session with Vyom Agents for ${lead.company}.

Your intake request has been logged under Reference ID: ${lead.referenceId}.

What Happens Next:
1. Architectural Review: A Principal Agentic AI Architect will review your target workflow and specifications (${interestName}).
2. Live Demonstration: We will connect with you within 4 business hours to coordinate a focused 30-minute demonstration and technical audit tailored to your team.
3. Security & NDA: All discussions and technical requirements are protected under our mutual non-disclosure policy with zero data retention.

Your Submitted Details:
- Company: ${lead.company}
- Focus Area: ${interestName}
- Company Size: ${lead.teamSize || "Not specified"}

In the meantime, feel free to test our live voice receptionist or explore our autonomous products at https://vyom-agents.vercel.app

Best regards,

Vyom Agents Architecture & Engineering Team
https://vyom-agents.vercel.app
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f17; color: #f1f5f9; margin: 0; padding: 24px; }
    .card { background-color: #111827; border: 1px solid #1f2937; border-radius: 14px; max-width: 600px; margin: 0 auto; overflow: hidden; }
    .header { background: linear-gradient(135deg, #0284c7, #0ea5e9); padding: 28px 24px; color: #ffffff; text-align: center; }
    .header h2 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.9; }
    .content { padding: 28px 24px; }
    .badge { display: inline-block; background-color: #0c4a6e; color: #38bdf8; font-family: monospace; font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 6px; margin-bottom: 20px; border: 1px solid #0369a1; }
    .steps { background-color: #1e293b; border-radius: 12px; padding: 18px; margin: 20px 0; border: 1px solid #334155; }
    .step-item { display: flex; align-items: flex-start; margin-bottom: 12px; font-size: 13px; line-height: 1.5; color: #cbd5e1; }
    .step-item:last-child { margin-bottom: 0; }
    .step-num { background-color: #38bdf8; color: #0b0f17; font-weight: 800; font-size: 11px; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0; margin-top: 2px; }
    .summary-card { background-color: #0b0f17; border: 1px solid #1f2937; border-radius: 8px; padding: 14px 16px; margin: 20px 0; font-size: 13px; }
    .summary-row { display: flex; justify-content: space-between; padding: 4px 0; }
    .summary-label { color: #94a3b8; }
    .summary-val { color: #f8fafc; font-weight: 600; }
    .cta-button { display: inline-block; background-color: #38bdf8; color: #0b0f17 !important; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 26px; border-radius: 9999px; }
    .footer { padding: 20px 24px; background-color: #0b0f17; border-top: 1px solid #1f2937; font-size: 11px; color: #64748b; text-align: center; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>Technical Discovery Scheduled</h2>
      <p>Vyom Agents Autonomous Intelligence</p>
    </div>
    <div class="content">
      <div style="text-align: center;">
        <span class="badge">REFERENCE TOKEN: ${lead.referenceId}</span>
      </div>

      <p style="font-size: 14px; line-height: 1.6; color: #e2e8f0; margin-top: 0;">
        Hello <strong>${lead.name}</strong>,
      </p>
      <p style="font-size: 13px; line-height: 1.6; color: #cbd5e1;">
        Thank you for submitting your intake request for <strong>${lead.company}</strong>. We have registered your session in our architectural audit queue.
      </p>

      <div class="steps">
        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #38bdf8; margin-bottom: 12px; letter-spacing: 0.5px;">What Happens Next</div>
        <div class="step-item">
          <div class="step-num">1</div>
          <div><strong>Architectural Audit:</strong> A Principal Agentic AI Architect will evaluate your workflow bottlenecks and integration requirements.</div>
        </div>
        <div class="step-item">
          <div class="step-num">2</div>
          <div><strong>Live Demo Scheduling:</strong> Our team will reach out within <strong>4 business hours</strong> with personalized time slots for a 30-minute tailored proof-of-concept demonstration.</div>
        </div>
        <div class="step-item">
          <div class="step-num">3</div>
          <div><strong>Zero Data Retention & NDA:</strong> All workflow details, API endpoints, and business processes shared remain strictly confidential under mutual NDA.</div>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-row">
          <span class="summary-label">Target Solution:</span>
          <span class="summary-val">${interestName}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Company Size:</span>
          <span class="summary-val">${lead.teamSize || "Not specified"}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Submission Status:</span>
          <span class="summary-val" style="color: #4ade80;">✓ Queued for Audit</span>
        </div>
      </div>

      <div style="text-align: center; margin: 28px 0 10px;">
        <a href="https://vyom-agents.vercel.app?product=voice-agent" class="cta-button">
          Test Live Voice Receptionist Demo
        </a>
      </div>
    </div>
    <div class="footer">
      Vyom Autonomous Intelligence • SOC-2 Type II & HIPAA PHI Compliant<br>
      Enterprise Autonomous AI Workforce Architecture • <a href="https://vyom-agents.vercel.app" style="color: #38bdf8; text-decoration: none;">vyom-agents.vercel.app</a>
    </div>
  </div>
</body>
</html>
    `,
  };

  let adminSent = false;
  let clientSent = false;

  const results = await Promise.allSettled([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(clientMailOptions),
  ]);

  if (results[0].status === "fulfilled") {
    adminSent = true;
    console.log(`[SMTP Mailer] Admin notification sent successfully (MsgID: ${results[0].value.messageId})`);
  } else {
    console.error("[SMTP Mailer] Failed to send admin notification:", results[0].reason?.message || results[0].reason);
  }

  if (results[1].status === "fulfilled") {
    clientSent = true;
    console.log(`[SMTP Mailer] Client confirmation sent to ${lead.email} (MsgID: ${results[1].value.messageId})`);
  } else {
    console.error("[SMTP Mailer] Failed to send client confirmation:", results[1].reason?.message || results[1].reason);
  }

  return { adminSent, clientSent };
}
