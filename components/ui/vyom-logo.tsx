"use client";

import React from "react";
import { motion } from "framer-motion";

interface VyomLogoProps {
  className?: string;
  variant?: "black" | "white" | "gradient";
}

/**
 * Standard crisp infinity symbol icon for static contexts
 */
export function VyomLogoIcon({
  className = "w-5 h-5",
  variant = "gradient",
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
            ? "#f97316"
            : "#0f172a"
        }
      />
    </svg>
  );
}

/**
 * High-Quality Code-Driven Animated Logo
 * - Draws the signature infinity curve over 3-4 seconds with glowing gradient stroke
 * - Luminous energy comet trails the curve
 * - Radiant ambient bloom pulses at the center loop
 * - Automatically repeats its animation loop every 5 seconds continuously
 * - Smooth entrance fade-in with crisp typography
 */
export function AnimatedVyomLogo({
  isScrolled = false,
  className = "",
}: {
  isScrolled?: boolean;
  className?: string;
}) {
  const infinityPath =
    "M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.26-8-12.356-8-5.096 0-5.096 8 0 8 5.096 0 7.261-8 12.356-8z";

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      
      {/* Animated Infinity SVG Icon Container */}
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0 flex items-center justify-center">
        
        {/* Soft Ambient Radial Bloom (Pulses every 5s cycle) */}
        <motion.div
          animate={{
            scale: [0.85, 1.25, 0.95, 0.85],
            opacity: [0.2, 0.75, 0.35, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500/40 via-amber-400/30 to-orange-600/40 blur-md pointer-events-none"
        />

        {/* Crisp Vector Infinity Animation */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full relative z-10 overflow-visible drop-shadow-[0_0_12px_rgba(249,115,22,0.65)]"
        >
          <defs>
            {/* Signature Electric Orange -> Gold Gradient */}
            <linearGradient id="vyomLoopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="35%" stopColor="#f97316" />
              <stop offset="70%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>

            {/* Radiant Laser Trail Gradient */}
            <linearGradient id="vyomLaserTrail" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#fed7aa" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>

            {/* Neon Glow Filter */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Layer 1: Subtle Semi-transparent Guide Track */}
          <path
            d={infinityPath}
            stroke={isScrolled ? "rgba(249, 115, 22, 0.2)" : "rgba(255, 255, 255, 0.16)"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Layer 2: Main Electric Path Drawing & Breathing Loop (3.2s draw + repeat every 5s) */}
          <motion.path
            d={infinityPath}
            stroke="url(#vyomLoopGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neonGlow)"
            animate={{
              pathLength: [0, 1, 1, 0],
              pathOffset: [0, 0, 1, 1],
              opacity: [0.3, 1, 1, 0.3],
            }}
            transition={{
              duration: 5,
              times: [0, 0.65, 0.85, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Layer 3: High-Energy Traveling Light Pulse along the Curve */}
          <motion.path
            d={infinityPath}
            stroke="url(#vyomLaserTrail)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 22"
            animate={{
              strokeDashoffset: [0, -52],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>

        {/* Central Luminous Energy Sparkle at the crossover knot */}
        <motion.div
          animate={{
            scale: [0, 1.4, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 5,
            times: [0.3, 0.45, 0.6],
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_16px_#f97316] pointer-events-none z-20"
        />
      </div>

      {/* Typography: Staggered Entrance + Light Shimmer Every 5s */}
      <div className="relative overflow-hidden py-0.5">
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`font-extrabold text-[16px] sm:text-[17px] tracking-tight leading-none transition-colors duration-300 block ${
            isScrolled ? "text-slate-950" : "text-white"
          }`}
        >
          Vyom Agents
        </motion.span>

        {/* Traveling Horizon Shimmer on Text (Repeats every 5s with logo motion) */}
        <motion.div
          animate={{
            x: ["-120%", "220%"],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            repeatDelay: 3.2, // 1.8s + 3.2s = 5.0s cycle
            ease: "easeInOut",
          }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-orange-400/25 to-transparent pointer-events-none -skew-x-12"
        />
      </div>

    </div>
  );
}

/**
 * Universal Brand Logo component exporting AnimatedVyomLogo
 */
export function VyomBrandLogo({
  isScrolled = false,
  className = "",
}: {
  isScrolled?: boolean;
  className?: string;
}) {
  return <AnimatedVyomLogo isScrolled={isScrolled} className={className} />;
}
