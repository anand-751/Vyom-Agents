import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Vyom Agents",
  description: "Enterprise privacy policy, zero data retention practices, and compliance standards at Vyom Agents.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF9] text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-stone-200/90 shadow-xs">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-slate-950 mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-950">Privacy Policy</h1>
            <p className="text-xs text-stone-500 mt-0.5">Last updated: October 2025</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed pt-6 border-t border-stone-100">
          <section>
            <h2 className="text-base font-bold text-slate-950 mb-2">1. Overview and Core Privacy Commitment</h2>
            <p>
              At Vyom Agents, we prioritize enterprise data privacy. We design autonomous systems under strict zero data retention standards. We never sell, rent, or monetize your company data or customer records.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-950 mb-2">2. Zero Model Training on Customer Data</h2>
            <p>
              Your enterprise workflows, document inputs, voice streams, and API telemetry are never used to train public or foundational artificial intelligence models. Processing occurs in sandboxed, ephemeral execution harnesses.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-950 mb-2">3. Information Collected</h2>
            <p>
              We collect information you explicitly provide when booking consultations, creating accounts, or subscribing to product updates:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
              <li>Contact details (name, corporate email, phone number, company name).</li>
              <li>Operational configurations and API connection credentials (encrypted via AES-256).</li>
              <li>Anonymized execution telemetry for performance diagnostics and error remediation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-950 mb-2">4. Data Security and Encryption</h2>
            <p>
              All data transmitted through Vyom Agents is protected using TLS 1.3 in transit and AES-256 encryption at rest. Voice streams and agent execution memories are wiped upon task completion.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-950 mb-2">5. Contact Our Privacy Officer</h2>
            <p>
              For security compliance inquiries, SOC-2 verification requests, or data deletion commands, contact our architecture team at <strong>privacy@vyomagents.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
