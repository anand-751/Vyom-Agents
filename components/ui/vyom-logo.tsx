import React from "react";

interface VyomLogoProps {
  className?: string;
  variant?: "black" | "white" | "gradient";
}

/**
 * Crisp Infinity Symbol Icon matching Vyom Agents Brand Identity
 */
export function VyomLogoIcon({
  className = "w-5 h-5",
  variant = "black",
}: {
  className?: string;
  variant?: "black" | "white" | "gradient";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Vyom Agents Infinity Logo"
    >
      <path
        d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.26-8-12.356-8-5.096 0-5.096 8 0 8 5.096 0 7.261-8 12.356-8z"
        stroke={
          variant === "white"
            ? "#ffffff"
            : variant === "gradient"
            ? "#0ea5e9"
            : "#0f172a"
        }
      />
    </svg>
  );
}

import Image from "next/image";

/**
 * Full Brand Logo Component using direct assets/logo.png with no background
 * And "Autonomous AI" text removed as requested
 */
export function VyomBrandLogo({
  isScrolled = false,
  className = "",
}: {
  isScrolled?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Direct Logo Image from assets/logo.png (No background container) */}
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
        <Image
          src="/images/logo.png"
          alt="Vyom Agents Logo"
          width={40}
          height={40}
          className="w-full h-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]"
          priority
        />
      </div>

      {/* Brand Title (Autonomous AI removed) */}
      <span
        className={`font-bold text-[16px] sm:text-[17px] tracking-tight leading-none transition-colors ${
          isScrolled ? "text-slate-950" : "text-white"
        }`}
      >
        Vyom Agents
      </span>
    </div>
  );
}
