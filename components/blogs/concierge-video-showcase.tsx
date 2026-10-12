"use client";

import React, { useState, useRef } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Maximize2, 
  Monitor, 
  Smartphone, 
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Globe,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export function ConciergeVideoShowcase() {
  const [activeTab, setActiveTab] = useState<"dual" | "desktop" | "mobile">("dual");
  
  // Refs for video elements
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // States
  const [desktopPlaying, setDesktopPlaying] = useState(true);
  const [desktopMuted, setDesktopMuted] = useState(true);
  
  const [mobilePlaying, setMobilePlaying] = useState(true);
  const [mobileMuted, setMobileMuted] = useState(true);

  const toggleDesktopPlay = () => {
    if (!desktopVideoRef.current) return;
    if (desktopVideoRef.current.paused) {
      desktopVideoRef.current.play();
      setDesktopPlaying(true);
    } else {
      desktopVideoRef.current.pause();
      setDesktopPlaying(false);
    }
  };

  const toggleDesktopMute = () => {
    if (!desktopVideoRef.current) return;
    desktopVideoRef.current.muted = !desktopVideoRef.current.muted;
    setDesktopMuted(desktopVideoRef.current.muted);
  };

  const restartDesktop = () => {
    if (!desktopVideoRef.current) return;
    desktopVideoRef.current.currentTime = 0;
    desktopVideoRef.current.play();
    setDesktopPlaying(true);
  };

  const toggleMobilePlay = () => {
    if (!mobileVideoRef.current) return;
    if (mobileVideoRef.current.paused) {
      mobileVideoRef.current.play();
      setMobilePlaying(true);
    } else {
      mobileVideoRef.current.pause();
      setMobilePlaying(false);
    }
  };

  const toggleMobileMute = () => {
    if (!mobileVideoRef.current) return;
    mobileVideoRef.current.muted = !mobileVideoRef.current.muted;
    setMobileMuted(mobileVideoRef.current.muted);
  };

  const restartMobile = () => {
    if (!mobileVideoRef.current) return;
    mobileVideoRef.current.currentTime = 0;
    mobileVideoRef.current.play();
    setMobilePlaying(true);
  };

  return (
    <div id="concierge-videos" className="w-full space-y-8">
      {/* Device Mode Selector Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 sm:p-2.5 rounded-2xl bg-stone-900/90 border border-stone-800 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-stone-300 font-semibold tracking-wide">
            LIVE DEMO PLAYER • VYOM CONCIERGE ENGINE
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-950/80 rounded-xl border border-stone-800/80">
          <button
            onClick={() => setActiveTab("dual")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "dual"
                ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20 font-semibold"
                : "text-stone-400 hover:text-white hover:bg-stone-850"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Dual View</span>
          </button>

          <button
            onClick={() => setActiveTab("desktop")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "desktop"
                ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20 font-semibold"
                : "text-stone-400 hover:text-white hover:bg-stone-850"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop Experience</span>
          </button>

          <button
            onClick={() => setActiveTab("mobile")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "mobile"
                ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20 font-semibold"
                : "text-stone-400 hover:text-white hover:bg-stone-850"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile App View</span>
          </button>
        </div>
      </div>

      {/* Videos Layout Grid */}
      <div className={`grid gap-8 items-start ${
        activeTab === "dual" 
          ? "grid-cols-1 lg:grid-cols-12" 
          : "grid-cols-1 max-w-4xl mx-auto"
      }`}>

        {/* Video 1: Desktop / Tablet Web Experience */}
        {(activeTab === "dual" || activeTab === "desktop") && (
          <div className={`${activeTab === "dual" ? "lg:col-span-7" : "w-full"} flex flex-col gap-4`}>
            {/* Window Container */}
            <div className="relative rounded-2xl sm:rounded-3xl bg-stone-900/90 border border-stone-800 shadow-2xl overflow-hidden group">
              {/* Fake Mac Window Bar */}
              <div className="px-4 py-3 bg-stone-950/80 border-b border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-[11px] font-mono text-stone-400 truncate max-w-[160px] sm:max-w-none">
                    concierge.vyomagents.ai — Desktop Experience
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>1080p HD</span>
                </div>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video bg-black overflow-hidden">
                <video
                  ref={desktopVideoRef}
                  src="/videos/Concierge_video.mp4"
                  playsInline
                  autoPlay
                  loop
                  muted={desktopMuted}
                  className="w-full h-full object-cover"
                  onPlay={() => setDesktopPlaying(true)}
                  onPause={() => setDesktopPlaying(false)}
                />

                {/* Video Overlay Controls Bar */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between opacity-95 transition-opacity">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleDesktopPlay}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all"
                      aria-label={desktopPlaying ? "Pause video" : "Play video"}
                    >
                      {desktopPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>
                    <button
                      onClick={toggleDesktopMute}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all"
                      aria-label={desktopMuted ? "Unmute video" : "Mute video"}
                    >
                      {desktopMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={restartDesktop}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all"
                      aria-label="Restart video"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-[11px] font-mono text-stone-300 bg-stone-900/80 px-2 py-1 rounded-md border border-stone-800">
                    Video 1: Desktop Portal
                  </span>
                </div>
              </div>

              {/* Video Info Card */}
              <div className="p-5 sm:p-6 bg-stone-900/60 border-t border-stone-800/80 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>Desktop & Tablet Concierge Portal</span>
                    <span className="text-[10px] font-mono bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full">
                      Kiosk & Web
                    </span>
                  </h3>
                  <span className="text-xs font-mono text-stone-400">Resolution: 1280 × 720</span>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Engineered for large tablet in-room kiosks and desktop guest intake portals. Demonstrates how guests browse amenities, schedule spa reservations, and make room requests with autonomous multi-step reasoning.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 text-stone-300 flex items-center gap-2 text-xs">
                    <Zap className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span className="truncate">Instant Intake</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 text-stone-300 flex items-center gap-2 text-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">PMS Live Sync</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 text-stone-300 flex items-center gap-2 text-xs col-span-2 sm:col-span-1">
                    <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="truncate">45+ Languages</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video 2: Mobile Smartphone Guest App Experience */}
        {(activeTab === "dual" || activeTab === "mobile") && (
          <div className={`${activeTab === "dual" ? "lg:col-span-5" : "w-full max-w-md mx-auto"} flex flex-col gap-4`}>
            {/* Phone Bezel Frame Container */}
            <div className="relative rounded-[2.5rem] p-3 bg-stone-900 border-2 border-stone-700/80 shadow-[0_0_50px_rgba(249,115,22,0.15)] flex flex-col items-center">
              {/* Phone Speaker & Notch */}
              <div className="w-24 h-4 bg-stone-950 rounded-full mb-2 flex items-center justify-center">
                <div className="w-10 h-1 bg-stone-800 rounded-full" />
              </div>

              {/* Mobile Screen */}
              <div className="relative w-full aspect-[9/16] bg-black rounded-[2rem] overflow-hidden border border-stone-800">
                <video
                  ref={mobileVideoRef}
                  src="/videos/Concierge_video1.mp4"
                  playsInline
                  autoPlay
                  loop
                  muted={mobileMuted}
                  className="w-full h-full object-cover"
                  onPlay={() => setMobilePlaying(true)}
                  onPause={() => setMobilePlaying(false)}
                />

                {/* Mobile Floating Controls */}
                <div className="absolute bottom-3 inset-x-3 p-2.5 bg-black/75 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMobilePlay}
                      className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                      aria-label={mobilePlaying ? "Pause mobile video" : "Play mobile video"}
                    >
                      {mobilePlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </button>
                    <button
                      onClick={toggleMobileMute}
                      className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                      aria-label={mobileMuted ? "Unmute mobile video" : "Mute mobile video"}
                    >
                      {mobileMuted ? (
                        <VolumeX className="w-3.5 h-3.5" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={restartMobile}
                      className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                      aria-label="Restart mobile video"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-stone-300">
                    Video 2: Mobile App
                  </span>
                </div>
              </div>

              {/* Bottom Home Indicator */}
              <div className="w-28 h-1 bg-stone-700 rounded-full mt-3" />
            </div>

            {/* Mobile Video Info Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Mobile Guest Experience</span>
                  <span className="text-[10px] font-mono bg-sky-500/20 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded-full">
                    iOS / Android PWA
                  </span>
                </h3>
                <span className="text-xs font-mono text-stone-400">Format: 9:16 Portrait</span>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Zero app store friction. Guests scan a room QR code or click an SMS link to instantly launch their personalized AI Concierge with room credentials pre-loaded.
              </p>

              <div className="space-y-1.5 pt-1 text-xs text-stone-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>One-tap room service & late checkout requests</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sub-second voice and text conversational assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero guest account creation or downloads required</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
