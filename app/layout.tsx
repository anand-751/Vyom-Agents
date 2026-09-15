import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://vyom-agents.vercel.app"),
  title: "Vyom Agents | Deploy Your Next-Gen Autonomous AI Workforce",
  description:
    "Unlocking infinite possibilities in autonomous technology. We architect intelligent agentic ecosystems that transform raw complexity into seamless execution.",
  keywords: [
    "Agentic AI",
    "Autonomous Agents",
    "AI Workforce",
    "AI Voice Agent",
    "AI Receptionist",
    "Workflow Orchestrator",
    "AIEO",
    "Artificial Intelligence Engine Optimization",
    "Vyom Agents",
  ],
  authors: [{ name: "Vyom Agents Engineering Team" }],
  openGraph: {
    title: "Vyom Agents — Beyond Automations. Deploy Autonomous AI Workforce Today.",
    description:
      "Unlocking infinite possibilities in autonomous technology. We architect intelligent agentic ecosystems that transform raw complexity into seamless execution.",
    url: "https://vyom-agents.vercel.app",
    siteName: "Vyom Agents",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyom Agents — Autonomous AI Workforce",
    description:
      "Unlocking infinite possibilities in autonomous technology. We architect intelligent agentic ecosystems that transform raw complexity into seamless execution.",
  },
  verification: {
    google: "oChfHC8LnNKHtdaeCKPA-qEz6odSltvpK3hiz1qR0Oo",
    other: {
      "msvalidate.01": "24E976F1447195DAD2BE840AD0C8289D",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://vyom-agents.vercel.app/#organization",
      "name": "Vyom Agents",
      "url": "https://vyom-agents.vercel.app",
      "logo": "https://vyom-agents.vercel.app/logo.png",
      "description": "Architecting intelligent autonomous AI agentic ecosystems for enterprise workflow automation and revenue growth.",
      "sameAs": [
        "https://github.com/anand-751/Vyom-Agents"
      ]
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://vyom-agents.vercel.app/#software",
      "name": "Vyom Autonomous AI Workforce",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white text-slate-900 selection:bg-sky-100 selection:text-sky-900`}>
        {children}
      </body>
    </html>
  );
}
