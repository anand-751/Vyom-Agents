import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Vyom Agents",
  description: "Enterprise terms of service, acceptable usage guidelines, and contractual SLA terms for Vyom Agents.",
};

export default function TermsPage() {
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
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-950">Terms & Conditions</h1>
            <p className="text-xs text-stone-500 mt-0.5">Last updated: October 2025</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed pt-6 border-t border-stone-100">
          <section>
            <h2 className="text-base font-bold text-slate-950 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Vyom Agents website, API services, autonomous voice systems, or self-healing RPA workflows, you agree to comply with and be bound by these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-950 mb-2">2. Provision of Autonomous Services</h2>
            <p>
              Vyom Agents provides autonomous software agents, voice telephony services, and enterprise automation infrastructure. We provide 99.8% platform uptime for production tiers and offer deterministic validation guardrails on agent outputs.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-950 mb-2">3. Acceptable Use Policy</h2>
            <p>
              You agree not to use our autonomous agent infrastructure for:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
              <li>Generating fraudulent or deceptive robocalls or unsolicited spam.</li>
              <li>Unauthorized vulnerability probing or penetration testing without prior authorization.</li>
              <li>Circumventing safety bounds, deterministic guardrails, or rate limits.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-950 mb-2">4. Commercial Pricing and Payment Terms</h2>
            <p>
              All listed tier subscriptions (Free, Pro at ₹999/month, Team at ₹2,999/month, and Enterprise) are billed in Indian Rupees (INR) with applicable Goods and Services Tax (GST). Invoices and tax identification details are provided upon subscription renewal.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-slate-950 mb-2">5. Contact and Legal Representation</h2>
            <p>
              Direct inquiries regarding enterprise licensing, Master Service Agreements (MSA), and terms interpretation to <strong>legal@vyomagents.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
