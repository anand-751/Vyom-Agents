import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Vyom Agents | Deploy Your Next-Gen Autonomous AI Workforce",
  description:
    "Unlocking infinite possibilities in autonomous technology. We architect intelligent agentic ecosystems that transform raw complexity into seamless execution.",
  keywords: [
    "Agentic AI",
    "Autonomous Agents",
    "AI Workforce",
    "AI Receptionist",
    "Voice Agent",
    "Workflow Orchestrator",
    "AIEO",
    "Next.js AI",
    "Vyom Agents",
  ],
  authors: [{ name: "Vyom Agents Engineering Team" }],
  openGraph: {
    title: "Vyom Agents — Beyond Automations. Deploy Autonomous AI Workforce Today.",
    description:
      "Unlocking infinite possibilities in autonomous technology. We architect intelligent agentic ecosystems that transform raw complexity into seamless execution.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyom Agents — Autonomous AI Workforce",
    description:
      "Unlocking infinite possibilities in autonomous technology. We architect intelligent agentic ecosystems that transform raw complexity into seamless execution.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-white text-slate-900 selection:bg-sky-100 selection:text-sky-900`}>
        {children}
      </body>
    </html>
  );
}
