"use client";

import React from "react";
import Image from "next/image";

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

/**
 * Full Brand Logo Component using animated video from assets/download.mp4
 */
export function VyomBrandLogo({
  isScrolled = false,
  className = "",
}: {
  isScrolled?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      {/* Animated Video Logo from assets/download.mp4 */}
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 rounded-xl overflow-hidden shadow-xs border border-white/20 bg-white">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/logo-animated.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Brand Title */}
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
