"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
}

export function ShimmerButton({
  children,
  className,
  shimmerColor = "rgba(255, 255, 255, 0.4)",
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 px-6 py-3 text-xs font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-sky-500/25 active:scale-95",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <motion.span
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 2.5,
          ease: "easeInOut",
        }}
        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
      />
    </button>
  );
}
