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

  // States - initially PAUSED as requested
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
    <div id="concierge-videos" className="w-full space-y-8">
      {/* Device Mode Selector Bar (Dual View Removed) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 sm:p-2.5 rounded-2xl bg-stone-900/90 border border-stone-800 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-stone-300 font-semibold tracking-wide">
            INTERACTIVE VIDEO DEMO • TAP SCREEN TO PLAY / PAUSE
          </span>
        </div>

        {/* View Switcher Tabs (Desktop & Mobile) */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-950/80 rounded-xl border border-stone-800/80">
          <button
            onClick={() => setActiveTab("desktop")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "desktop"
                ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20 font-semibold"
                : "text-stone-400 hover:text-white hover:bg-stone-850"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop Experience (16:9)</span>
          </button>

          <button
            onClick={() => setActiveTab("mobile")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "mobile"
                ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20 font-semibold"
                : "text-stone-400 hover:text-white hover:bg-stone-850"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile App View (9:16)</span>
          </button>
        </div>
      </div>

      {/* Videos Layout Container */}
      <div className="w-full max-w-4xl mx-auto">

        {/* View 1: Desktop / Tablet Web Experience */}
        {activeTab === "desktop" && (
          <div className="w-full flex flex-col gap-4 animate-in fade-in duration-300">
            {/* Window Container */}
            <div className="relative rounded-2xl sm:rounded-3xl bg-stone-900/90 border border-stone-800 shadow-2xl overflow-hidden group">
              {/* Fake Mac Window Bar */}
              <div className="px-4 py-3 bg-stone-950/80 border-b border-stone-800 flex items-center justify-between select-none">
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

              {/* Video Player Area with Click to Play/Pause */}
              <div 
                onClick={toggleDesktopPlay}
                className="relative aspect-video bg-black overflow-hidden cursor-pointer group/player"
                title={desktopPlaying ? "Click anywhere to pause" : "Click anywhere to play"}
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

                {/* Big Center Play/Pause Button Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
                  desktopPlaying ? "opacity-0 group-hover/player:opacity-40" : "opacity-100 bg-black/40 backdrop-blur-[2px]"
                }`}>
                  <div className="w-20 h-20 rounded-full bg-orange-500/90 text-white shadow-[0_0_40px_rgba(249,115,22,0.6)] flex items-center justify-center transform transition-transform group-hover/player:scale-110 active:scale-95 border-2 border-white/30">
                    {desktopPlaying ? (
                      <Pause className="w-9 h-9 fill-current" />
                    ) : (
                      <Play className="w-9 h-9 fill-current ml-1" />
                    )}
                  </div>
                  {!desktopPlaying && (
                    <span className="absolute mt-28 px-3 py-1 rounded-full bg-stone-900/90 border border-stone-700 text-xs font-medium text-stone-200 shadow-md">
                      Click to Play Video
                    </span>
                  )}
                </div>

                {/* Bottom Overlay Controls Bar */}
                <div 
                  onClick={(e) => e.stopPropagation()} 
                  className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex items-center justify-between opacity-95 transition-opacity"
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleDesktopPlay}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
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
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
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
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
                      aria-label="Restart video"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-[11px] font-mono text-stone-300 bg-stone-900/80 px-2.5 py-1 rounded-md border border-stone-800">
                    {desktopPlaying ? "Playing" : "Paused"} • Desktop Portal
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
                  <span className="text-xs font-mono text-stone-400">Resolution: 1280 × 720 (16:9)</span>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Engineered for in-room tablet kiosks and web guest intake. Guests browse amenities, schedule spa reservations, and make room requests with autonomous multi-step reasoning and instant PMS dispatch.
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

        {/* View 2: Mobile Smartphone Guest App Experience */}
        {activeTab === "mobile" && (
          <div className="w-full max-w-md mx-auto flex flex-col gap-4 animate-in fade-in duration-300">
            {/* Phone Bezel Frame Container */}
            <div className="relative rounded-[2.5rem] p-3.5 bg-stone-900 border-2 border-stone-700/80 shadow-[0_0_60px_rgba(249,115,22,0.18)] flex flex-col items-center">
              {/* Phone Speaker & Notch */}
              <div className="w-24 h-4 bg-stone-950 rounded-full mb-2 flex items-center justify-center">
                <div className="w-10 h-1 bg-stone-800 rounded-full" />
              </div>

              {/* Mobile Screen with Click to Play/Pause */}
              <div 
                onClick={toggleMobilePlay}
                className="relative w-full aspect-[9/16] bg-black rounded-[2rem] overflow-hidden border border-stone-800 cursor-pointer group/mobileplayer"
                title={mobilePlaying ? "Click anywhere to pause" : "Click anywhere to play"}
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

                {/* Big Center Play/Pause Button Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
                  mobilePlaying ? "opacity-0 group-hover/mobileplayer:opacity-40" : "opacity-100 bg-black/40 backdrop-blur-[2px]"
                }`}>
                  <div className="w-16 h-16 rounded-full bg-orange-500/90 text-white shadow-[0_0_30px_rgba(249,115,22,0.6)] flex items-center justify-center transform transition-transform group-hover/mobileplayer:scale-110 active:scale-95 border-2 border-white/30">
                    {mobilePlaying ? (
                      <Pause className="w-7 h-7 fill-current" />
                    ) : (
                      <Play className="w-7 h-7 fill-current ml-0.5" />
                    )}
                  </div>
                  {!mobilePlaying && (
                    <span className="absolute mt-24 px-2.5 py-0.5 rounded-full bg-stone-900/90 border border-stone-700 text-[11px] font-medium text-stone-200 shadow-md">
                      Tap to Play
                    </span>
                  )}
                </div>

                {/* Mobile Floating Bottom Controls */}
                <div 
                  onClick={(e) => e.stopPropagation()} 
                  className="absolute bottom-3 inset-x-3 p-2.5 bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-between text-white"
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMobilePlay}
                      className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all cursor-pointer"
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
                      className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all cursor-pointer"
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
                      className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all cursor-pointer"
                      aria-label="Restart mobile video"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-stone-300">
                    {mobilePlaying ? "Playing" : "Paused"} • 9:16
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
