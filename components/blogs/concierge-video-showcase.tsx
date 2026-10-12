"use client";

import React, { useState, useRef } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Monitor, 
  Smartphone, 
  ShieldCheck,
  Zap,
  Globe,
  CheckCircle2
} from "lucide-react";

export function ConciergeVideoShowcase() {
  const [activeTab, setActiveTab] = useState<"desktop" | "mobile">("desktop");
  
  // Refs for video elements
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // States - initially PAUSED
  const [desktopPlaying, setDesktopPlaying] = useState(false);
  const [desktopMuted, setDesktopMuted] = useState(true);
  
  const [mobilePlaying, setMobilePlaying] = useState(false);
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

  const toggleDesktopMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!desktopVideoRef.current) return;
    desktopVideoRef.current.muted = !desktopVideoRef.current.muted;
    setDesktopMuted(desktopVideoRef.current.muted);
  };

  const restartDesktop = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const toggleMobileMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!mobileVideoRef.current) return;
    mobileVideoRef.current.muted = !mobileVideoRef.current.muted;
    setMobileMuted(mobileVideoRef.current.muted);
  };

  const restartMobile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!mobileVideoRef.current) return;
    mobileVideoRef.current.currentTime = 0;
    mobileVideoRef.current.play();
    setMobilePlaying(true);
  };

  return (
    <div id="concierge-videos" className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Apple-Style Segmented Control Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 sm:p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-2.5 px-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono tracking-wider text-stone-300 uppercase">
            Interactive Video Showcase
          </span>
        </div>

        {/* Segmented Control Pill */}
        <div className="flex items-center p-1 rounded-xl bg-black/40 border border-white/[0.06] backdrop-blur-md">
          <button
            onClick={() => setActiveTab("desktop")}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeTab === "desktop"
                ? "bg-white/[0.14] text-white shadow-sm border border-white/[0.12] font-semibold"
                : "text-stone-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop Experience (16:9)</span>
          </button>

          <button
            onClick={() => setActiveTab("mobile")}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeTab === "mobile"
                ? "bg-white/[0.14] text-white shadow-sm border border-white/[0.12] font-semibold"
                : "text-stone-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile App View (9:16)</span>
          </button>
        </div>
      </div>

      {/* Unified Studio Stage: Fixed stable height ensures ZERO layout shifts or jumps */}
      <div className="w-full rounded-3xl bg-gradient-to-b from-stone-900/90 to-black/95 border border-white/[0.08] shadow-2xl overflow-hidden">
        
        {/* Studio Viewport Area with Consistent Fixed Height to Guarantee Zero Layout Shifts */}
        <div className="relative w-full h-[440px] sm:h-[500px] md:h-[540px] flex items-center justify-center p-4 sm:p-6 bg-[#030508] overflow-hidden">
          
          {/* Subtle Ambient Studio Backlight */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[450px] h-[300px] bg-orange-500/10 rounded-full blur-[100px]" />
          </div>

          {/* TAB 1: Desktop Experience (16:9 Window Frame) */}
          {activeTab === "desktop" && (
            <div className="w-full max-w-3xl rounded-2xl bg-stone-900/95 border border-white/[0.12] shadow-2xl overflow-hidden relative transition-all duration-300">
              
              {/* Studio Window Bar */}
              <div className="px-4 py-2.5 bg-stone-950/90 border-b border-white/[0.08] flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-[11px] font-mono text-stone-400">
                    concierge.vyomagents.ai
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>1080p Widescreen</span>
                </div>
              </div>

              {/* 16:9 Video Canvas */}
              <div 
                onClick={toggleDesktopPlay}
                className="relative aspect-video bg-black overflow-hidden cursor-pointer group"
                title={desktopPlaying ? "Click in center to pause" : "Click in center to play"}
              >
                <video
                  ref={desktopVideoRef}
                  src="/videos/Concierge_video.mp4"
                  playsInline
                  loop
                  muted={desktopMuted}
                  className="w-full h-full object-cover"
                  onPlay={() => setDesktopPlaying(true)}
                  onPause={() => setDesktopPlaying(false)}
                />

                {/* Apple-grade Centered Play / Pause Glass Badge */}
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
                  desktopPlaying ? "opacity-0 group-hover:opacity-60" : "opacity-100 bg-black/40 backdrop-blur-[2px]"
                }`}>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 text-white backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-center transform transition-transform group-hover:scale-110 active:scale-95">
                    {desktopPlaying ? (
                      <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
                    ) : (
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                    )}
                  </div>
                </div>

                {/* Sleek Floating Bottom Control Bar */}
                <div 
                  onClick={(e) => e.stopPropagation()} 
                  className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleDesktopPlay}
                      className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
                      aria-label={desktopPlaying ? "Pause video" : "Play video"}
                    >
                      {desktopPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                    </button>
                    <button
                      onClick={toggleDesktopMute}
                      className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
                      aria-label={desktopMuted ? "Unmute audio" : "Mute audio"}
                    >
                      {desktopMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={restartDesktop}
                      className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
                      aria-label="Restart video"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="text-[11px] font-mono text-stone-300 bg-black/60 px-2 py-0.5 rounded-md border border-white/10">
                    {desktopPlaying ? "Playing" : "Tap Center to Play"} • 16:9
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Mobile App View (iPhone Bezel Frame inside the exact same studio height) */}
          {activeTab === "mobile" && (
            <div className="h-[340px] sm:h-[420px] md:h-[450px] aspect-[9/16] rounded-[2.5rem] p-2 bg-stone-900 border-2 border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative flex flex-col items-center justify-between transition-all duration-300">
              
              {/* iPhone Dynamic Island / Speaker Notch */}
              <div className="w-20 h-3.5 bg-black rounded-full mb-1 flex items-center justify-center z-10">
                <div className="w-8 h-1 bg-stone-800 rounded-full" />
              </div>

              {/* Mobile Screen Video Area with Center Click Play/Pause */}
              <div 
                onClick={toggleMobilePlay}
                className="relative w-full flex-1 bg-black rounded-[2rem] overflow-hidden cursor-pointer group"
                title={mobilePlaying ? "Click in center to pause" : "Click in center to play"}
              >
                <video
                  ref={mobileVideoRef}
                  src="/videos/Concierge_video1.mp4"
                  playsInline
                  loop
                  muted={mobileMuted}
                  className="w-full h-full object-cover"
                  onPlay={() => setMobilePlaying(true)}
                  onPause={() => setMobilePlaying(false)}
                />

                {/* Centered Glass Play/Pause Badge */}
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
                  mobilePlaying ? "opacity-0 group-hover:opacity-60" : "opacity-100 bg-black/40 backdrop-blur-[2px]"
                }`}>
                  <div className="w-14 h-14 rounded-full bg-white/20 text-white backdrop-blur-xl border border-white/30 shadow-xl flex items-center justify-center transform transition-transform group-hover:scale-110 active:scale-95">
                    {mobilePlaying ? (
                      <Pause className="w-6 h-6 fill-current" />
                    ) : (
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    )}
                  </div>
                </div>

                {/* Floating Bottom Audio Controls */}
                <div 
                  onClick={(e) => e.stopPropagation()} 
                  className="absolute bottom-2.5 inset-x-2.5 p-2 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-between text-white"
                >
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={toggleMobilePlay}
                      className="w-6 h-6 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all cursor-pointer"
                      aria-label={mobilePlaying ? "Pause video" : "Play video"}
                    >
                      {mobilePlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
                    </button>
                    <button
                      onClick={toggleMobileMute}
                      className="w-6 h-6 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all cursor-pointer"
                      aria-label={mobileMuted ? "Unmute audio" : "Mute audio"}
                    >
                      {mobileMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                    </button>
                    <button
                      onClick={restartMobile}
                      className="w-6 h-6 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all cursor-pointer"
                      aria-label="Restart video"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-stone-300">
                    {mobilePlaying ? "Playing" : "Tap to Play"} • 9:16
                  </span>
                </div>
              </div>

              {/* iPhone Home Bar */}
              <div className="w-24 h-1 bg-stone-700 rounded-full mt-1.5" />
            </div>
          )}

        </div>

        {/* Unified Information Footnote: Stable height prevents any content below from shifting */}
        <div className="p-6 bg-stone-900/70 border-t border-white/[0.08] space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>{activeTab === "desktop" ? "Desktop & Tablet Concierge Portal" : "Mobile Smartphone Guest Experience"}</span>
              <span className="text-[10px] font-mono bg-white/[0.08] text-stone-300 border border-white/[0.12] px-2.5 py-0.5 rounded-full">
                {activeTab === "desktop" ? "1280 × 720 (16:9 Widescreen)" : "720 × 1280 (9:16 Portrait PWA)"}
              </span>
            </h3>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              <span>Production Capture</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {activeTab === "desktop" 
              ? "Engineered for in-room tablet kiosks and web guest intake. Guests browse amenities, schedule spa reservations, and make room requests with autonomous multi-step reasoning and instant PMS dispatch."
              : "Zero app store friction. Guests scan a room QR code or tap an NFC tag to instantly launch their personalized AI Concierge with active room credentials pre-loaded."
            }
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06] text-stone-300 flex items-center gap-2 text-xs">
              <Zap className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span className="truncate">{activeTab === "desktop" ? "Instant In-Room Intake" : "One-Tap Guest Service"}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06] text-stone-300 flex items-center gap-2 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">Opera / Cloudbeds / Mews Sync</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06] text-stone-300 flex items-center gap-2 text-xs">
              <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="truncate">45+ Languages Auto-Detected</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
