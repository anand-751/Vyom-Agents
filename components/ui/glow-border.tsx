"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowBorderProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowBorder({
  children,
  className,
  glowColor = "from-sky-500 via-indigo-500 to-purple-500",
}: GlowBorderProps) {
  return (
    <div className={cn("relative p-[1px] rounded-3xl overflow-hidden group", className)}>
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className={cn(
          "absolute -inset-[100%] bg-gradient-to-r opacity-70 group-hover:opacity-100 blur-sm transition-opacity duration-500",
          glowColor
        )}
      />
      <div className="relative z-10 w-full h-full rounded-[23px] bg-slate-950">
        {children}
      </div>
    </div>
  );
}
