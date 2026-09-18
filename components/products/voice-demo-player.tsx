"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, Mic, CheckCircle, Sparkles } from "lucide-react";

interface SampleCall {
  id: string;
  industry: string;
  caller: string;
  agentResponse: string;
  duration: string;
  latency: string;
  audioUrl: string;
}

const SAMPLE_CALLS: SampleCall[] = [
  {
    id: "dental",
    industry: "Dental Clinic",
    caller: "“Hi, I need to reschedule my root canal for tomorrow morning, and check if Delta Dental is accepted.”",
    agentResponse: "“Certainly! I can move that to tomorrow at 10:30 AM with Dr. Aris. Delta Dental is fully in-network. Shall I confirm this and text your appointment pass?”",
    duration: "0:24",
    latency: "310ms",
    audioUrl: "/audio/ai-in.mp3",
  },
  {
    id: "saas",
    industry: "Enterprise SaaS",
    caller: "“We have 200 engineers needing SOC-2 compliance automation. Can we speak to an enterprise architect?”",
    agentResponse: "“I’d be glad to arrange that. I have Marcus, our Lead Solutions Architect, free today at 3 PM or tomorrow at 11 AM EST. Which works best for your team?”",
    duration: "0:19",
    latency: "340ms",
    audioUrl: "/audio/ai-in.mp3",
  },
  {
    id: "hvac",
    industry: "Emergency Services",
    caller: "“Our commercial chiller failed and the server room temperature is climbing rapidly!”",
    agentResponse: "“Understood, flagging this as Critical P1. Dispatching technician Tyler to your facility right now, ETA 28 minutes. I’m transmitting live dispatch tracking to your mobile.”",
    duration: "0:28",
    latency: "290ms",
    audioUrl: "/audio/ai-in.mp3",
  },
];

export function VoiceDemoPlayer() {
  const [selectedCallId, setSelectedCallId] = useState<string>("dental");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState<string>("0:00");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeCall = SAMPLE_CALLS.find((c) => c.id === selectedCallId) || SAMPLE_CALLS[0];

  useEffect(() => {
    const audio = new Audio(activeCall.audioUrl);
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        const pct = (audio.currentTime / audio.duration) * 100;
        setProgress(pct);
        const mins = Math.floor(audio.currentTime / 60);
        const secs = Math.floor(audio.currentTime % 60);
        setCurrentTimeFormatted(`${mins}:${secs < 10 ? "0" : ""}${secs}`);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTimeFormatted("0:00");
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, [selectedCallId, activeCall.audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Audio playback error:", err);
      });
    }
  };

  const handleSelectTab = (callId: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setSelectedCallId(callId);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTimeFormatted("0:00");
  };

  return (
    <div className="bg-slate-900 rounded-xl p-3.5 sm:p-4 text-white border border-slate-800 shadow-md">
      {/* Top bar with industry switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-mono text-slate-300 font-semibold text-[10px] sm:text-[11px]">
            Live Voice Simulator ({activeCall.latency})
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg">
          {SAMPLE_CALLS.map((call) => (
            <button
              key={call.id}
              onClick={() => handleSelectTab(call.id)}
              className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] font-medium transition-all ${
                selectedCallId === call.id
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {call.industry}
            </button>
          ))}
        </div>
      </div>

      {/* Waveform & Playback Controls */}
      <div className="bg-slate-950/80 rounded-lg p-3 border border-slate-800/80 mb-3 flex items-center gap-3">
        <button
          onClick={togglePlay}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-95 shadow-md shrink-0 ${
            isPlaying
              ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
              : "bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:brightness-110"
          }`}
          aria-label={isPlaying ? "Pause audio preview" : "Play audio preview"}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        {/* Animated Waveform Visualizer */}
        <div className="flex-1 flex items-center gap-[3px] h-9 px-2 overflow-hidden">
          {Array.from({ length: 32 }).map((_, i) => {
            const height = isPlaying
              ? Math.sin((i + progress / 10) * 0.8) * 14 + 16
              : (i % 4) * 4 + 6;
            return (
              <motion.span
                key={i}
                animate={{ height: `${height}px` }}
                transition={{ duration: 0.15 }}
                className={`w-1 rounded-full ${
                  i < (progress / 100) * 32
                    ? "bg-sky-400"
                    : "bg-slate-700"
                }`}
              />
            );
          })}
        </div>

        <div className="text-right text-[11px] font-mono text-slate-400 shrink-0">
          <span className="text-white font-bold">{isPlaying ? currentTimeFormatted : "0:00"}</span> / {activeCall.duration}
        </div>
      </div>

      {/* Transcript Preview */}
      <div className="space-y-2 text-xs">
        <div className="flex items-start gap-2 bg-slate-800/40 p-2 rounded-lg border border-slate-800">
          <div className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center shrink-0 text-[10px] font-bold">
            C
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Inbound Caller</span>
            <p className="text-slate-300 italic text-[11px]">{activeCall.caller}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 bg-sky-950/40 p-2 rounded-lg border border-sky-900/60">
          <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
            V
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase text-sky-400">Vyom Voice Agent</span>
              <span className="text-[9px] bg-sky-900/80 text-sky-300 px-1.5 py-0.2 rounded font-mono">
                {activeCall.latency}
              </span>
            </div>
            <p className="text-slate-200 text-[11px] font-medium">{activeCall.agentResponse}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
