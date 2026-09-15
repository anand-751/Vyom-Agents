"use server";

export interface LeadSubmission {
  name: string;
  email: string;
  company: string;
  interest: string;
  teamSize?: string;
  message?: string;
}

export interface LeadResponse {
  success: boolean;
  referenceId?: string;
  error?: string;
}

export async function submitLeadAction(data: LeadSubmission): Promise<LeadResponse> {
  // Input validation
  if (!data.email || !data.email.includes("@")) {
    return { success: false, error: "Please provide a valid corporate email address." };
  }

  if (!data.name || data.name.trim().length < 2) {
    return { success: false, error: "Please provide your full name." };
  }

  try {
    // Generate unique enterprise reference ID
    const referenceId = `VYOM-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    // Forwarding to NestJS microservice or CRM webhook if configured
    const nestJsBackendUrl = process.env.NESTJS_BACKEND_URL;
    if (nestJsBackendUrl) {
      await fetch(`${nestJsBackendUrl}/api/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Vyom-Source": "nextjs-landing-portal",
        },
        body: JSON.stringify({
          ...data,
          referenceId,
          submittedAt: new Date().toISOString(),
        }),
      });
    }

    // Emulate low-latency processing
    await new Promise((resolve) => setTimeout(resolve, 650));

    return {
      success: true,
      referenceId,
    };
  } catch (err: any) {
    console.error("[Vyom Agents] Lead capture error:", err);
    return {
      success: false,
      error: "Unable to process request at this time. Please contact enterprise@vyomagents.ai directly.",
    };
  }
}
