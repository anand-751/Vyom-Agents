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
  "orchestrator": "Self-Healing RPA & Workflow Orchestrator",
  "aieo": "AIEO (AI Engine Optimization)",
  "workforce": "Custom Bespoke Agentic Workforce",
  "automations": "Enterprise AI Automations & APIs",
  "apps": "Custom Desktop / Web Application",
  "rag": "Enterprise RAG & Knowledge Graphs",
  "general-updates": "Vyom Autonomous Intelligence Whitepapers",
};

/**
 * Creates and returns a nodemailer transporter configured for Gmail SMTP
 * or custom SMTP credentials from environment variables.
 */
function getTransporter() {
  const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER;
  // Google App Passwords often have spaces when copied from Google Account; strip them
  const rawPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  const gmailPass = rawPass ? rawPass.replace(/\s+/g, "") : undefined;

  if (!gmailUser || !gmailPass) {
    return null;
  }

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
    // Optional timeout safety
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Sends discovery notification email to the company/admin and a confirmation email to the lead.
 */
export async function sendDiscoveryNotificationEmails(lead: DiscoveryLeadData): Promise<{
  adminSent: boolean;
  clientSent: boolean;
  reason?: string;
}> {
  const transporter = getTransporter();
  const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER;
  const adminNotificationEmail =
    process.env.CONTACT_NOTIFICATION_EMAIL || process.env.GMAIL_USER || "vyomagents@gmail.com";

  if (!transporter || !gmailUser) {
    console.log(
      `[Gmail SMTP] Notice: GMAIL_USER or GMAIL_APP_PASSWORD not configured. Discovery request recorded locally with Ref: ${lead.referenceId}. To enable automatic emails, set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local.`
    );
    return {
      adminSent: false,
      clientSent: false,
      reason: "credentials_not_configured",
    };
  }

  const interestName = INTEREST_LABELS[lead.interest] || lead.interest || "AI Automation";
  const formattedDate = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });
  const senderEmail = process.env.SMTP_FROM || "vyomagents@gmail.com";

  // 1. Internal notification email (to company/admin)
  const adminMailOptions = {
    from: `"Vyom Agents Intake" <${senderEmail}>`,
    to: adminNotificationEmail,
    replyTo: `${lead.name} <${lead.email}>`,
    subject: `⚡ New Technical Discovery: ${lead.company} (${lead.name}) [Ref: ${lead.referenceId}]`,
    text: `
New Technical Discovery Intake Request

Reference ID: ${lead.referenceId}
Submitted At: ${formattedDate} UTC

Prospect Details:
- Name: ${lead.name}
- Work Email: ${lead.email}
- Company: ${lead.company}
- Primary Interest: ${interestName}
- Company Size: ${lead.teamSize || "Not specified"}

Project Scope / Requirements:
${lead.message || "No specific notes provided."}

Reply directly to this email to contact ${lead.name}.
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f17; color: #f1f5f9; margin: 0; padding: 24px; }
    .card { background-color: #111827; border: 1px solid #1f2937; border-radius: 14px; max-width: 600px; margin: 0 auto; overflow: hidden; }
    .header { background: linear-gradient(135deg, #0ea5e9, #38bdf8); padding: 24px; color: #0b0f17; }
    .header h2 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 4px 0 0; font-size: 13px; font-weight: 600; opacity: 0.85; }
    .content { padding: 24px; }
    .token-badge { display: inline-block; background-color: #1e293b; color: #38bdf8; font-family: monospace; font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 6px; margin-bottom: 20px; border: 1px solid #334155; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .info-table td { padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #1f2937; }
    .info-label { color: #94a3b8; font-weight: 600; width: 35%; }
    .info-val { color: #f8fafc; font-weight: 500; }
    .message-box { background-color: #1e293b; border-left: 4px solid #38bdf8; padding: 14px; border-radius: 0 8px 8px 0; margin: 20px 0; font-size: 13px; line-height: 1.6; color: #e2e8f0; }
    .cta-button { display: inline-block; background-color: #38bdf8; color: #0b0f17 !important; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 9999px; margin-top: 10px; }
    .footer { padding: 16px 24px; background-color: #0b0f17; border-top: 1px solid #1f2937; font-size: 11px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>🚀 New Technical Discovery Intake</h2>
      <p>Vyom Agents Enterprise Dispatch Node</p>
    </div>
    <div class="content">
      <span class="token-badge">TOKEN: ${lead.referenceId}</span>
      <table class="info-table">
        <tr>
          <td class="info-label">Full Name</td>
          <td class="info-val"><strong>${lead.name}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Work Email</td>
          <td class="info-val"><a href="mailto:${lead.email}" style="color: #38bdf8; text-decoration: none;">${lead.email}</a></td>
        </tr>
        <tr>
          <td class="info-label">Company</td>
          <td class="info-val"><strong>${lead.company}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Primary Interest</td>
          <td class="info-val">${interestName}</td>
        </tr>
        <tr>
          <td class="info-label">Team Size</td>
          <td class="info-val">${lead.teamSize || "Not specified"}</td>
        </tr>
        <tr>
          <td class="info-label">Timestamp</td>
          <td class="info-val">${formattedDate} UTC</td>
        </tr>
      </table>

      <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.5px;">Project Scope / Requirements:</div>
      <div class="message-box">
        ${lead.message ? lead.message.replace(/\n/g, "<br/>") : "<em>No additional details provided.</em>"}
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="mailto:${lead.email}?subject=Vyom%20Agents%20Discovery%20Session%20-%20${encodeURIComponent(lead.company)}" class="cta-button">
          Reply Directly to ${lead.name}
        </a>
      </div>
    </div>
    <div class="footer">
      Vyom Autonomous Intelligence • 256-bit TLS Encrypted Dispatch
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
    console.log(`[Gmail SMTP] Admin notification sent successfully (MsgID: ${results[0].value.messageId})`);
  } else {
    console.error("[Gmail SMTP] Failed to send admin notification:", results[0].reason?.message || results[0].reason);
  }

  if (results[1].status === "fulfilled") {
    clientSent = true;
    console.log(`[Gmail SMTP] Client confirmation sent to ${lead.email} (MsgID: ${results[1].value.messageId})`);
  } else {
    console.error("[Gmail SMTP] Failed to send client confirmation:", results[1].reason?.message || results[1].reason);
  }

  return { adminSent, clientSent };
}
