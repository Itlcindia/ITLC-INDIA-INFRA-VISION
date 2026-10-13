import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HardHat,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Camera,
  Film
} from "lucide-react";
import { BorderBeam } from "../components/ui/BorderBeam";
import { MagneticButton } from "../components/ui/MagneticButton";
import { soundManager } from "../lib/sound";
import { useCMS } from "../context/CMSContext";

export const SiteVideosPage = ({ onInquiryClick, onRouteChange }) => {
  const { siteVideos = [] } = useCMS();
  const [activeStage, setActiveStage] = useState("all");
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  const stages = [
    { id: "all", label: "All Works", count: siteVideos.length },
    { id: "foundation", label: "Foundation & Columns", count: siteVideos.filter(i => i.stage === "foundation").length },
    { id: "rcc", label: "RCC & Slab Formwork", count: siteVideos.filter(i => i.stage === "rcc").length },
    { id: "masonry", label: "Brick Masonry", count: siteVideos.filter(i => i.stage === "masonry").length },
    { id: "supervision", label: "Site Supervision", count: siteVideos.filter(i => i.stage === "supervision").length },
    { id: "finishing", label: "Finishing & Handover", count: siteVideos.filter(i => i.stage === "finishing").length },
  ];

  const filteredVideos = siteVideos.filter((item) => {
    return activeStage === "all" || item.stage === activeStage;
  });

  const togglePlay = (id) => {
    soundManager.playHapticClick(650);
    setPlayingVideoId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-10 sm:space-y-12">
      
      {/* 1. Page Header with HUD Tech Badging */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-sky-500/10 border border-blue-200 dark:border-sky-400/30 font-mono text-[11px] sm:text-xs text-blue-600 dark:text-sky-400 font-semibold shadow-sm">
          <Film className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400" />
          <span>VERIFIED ON-SITE CIVIL VIDEO FOOTAGE</span>
        </div>

        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
          Construction Site <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 dark:from-sky-400 dark:to-blue-500">Video Logs</span>
        </h1>

        <p className="text-slate-600 dark:text-gray-300 text-[13px] sm:text-[14px] leading-relaxed max-w-2xl mx-auto">
          High-definition real on-ground video footage capturing active slab casting timelapses, civil engineering walkthroughs, and drone aerial structural progression across Lucknow sites.
        </p>

        {/* Media Switcher: Switch back to Photo Archive */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => onRouteChange && onRouteChange("site-images")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#0C1B3E] dark:hover:bg-[#132A5E] text-slate-700 dark:text-sky-300 border border-slate-300 dark:border-sky-400/35 font-mono text-xs font-semibold shadow-sm transition-all hover:scale-105 cursor-pointer"
          >
            <Camera className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400" />
            <span>Switch to Photo Archive (14 Photos)</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* 2. Unified Single-Row Stage Filter Bar */}
      <div className="flex items-center justify-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 bg-slate-100/90 dark:bg-[#0C1B3E] p-1.5 rounded-full border border-slate-200/80 dark:border-sky-400/35 shadow-sm dark:shadow-lg">
          {stages.map((stg) => {
            const isActive = activeStage === stg.id;
            return (
              <button
                key={stg.id}
                onClick={() => {
                  soundManager.playHapticClick(650);
                  setActiveStage(stg.id);
                }}
                className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "text-white shadow-md shadow-sky-500/30"
                    : "text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-video-stage-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-sky-500"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{stg.label}</span>
                <span
                  className={`relative z-10 text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-black/10 dark:bg-white/10 text-gray-400"
                  }`}
                >
                  {stg.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Pure Video Cards Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredVideos.map((video, index) => {
            const isPlaying = playingVideoId === video.id;

            return (
              <motion.div
                layout
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                className="h-full"
              >
                <div className="relative h-full overflow-hidden rounded-2xl bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border border-slate-200/90 dark:border-sky-400/35 hover:border-blue-500/80 dark:hover:border-sky-400/80 ring-1 ring-blue-100 dark:ring-sky-300/15 shadow-xl shadow-blue-900/5 dark:shadow-2xl dark:shadow-black/85 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-sky-500/15 group">
                  <BorderBeam size={160} duration={12} colorFrom="#38BDF8" colorTo="#2563EB" />

                  {/* Video Viewport */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-slate-950 w-full cursor-pointer" onClick={() => togglePlay(video.id)}>
                    <video
                      src={video.src}
                      autoPlay={isPlaying}
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />

                    {/* Subtle Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />

                    {/* Top-Left Stage Badge */}
                    <div className="absolute top-3 left-3 z-10 flex items-center">
                      <span className="px-3 py-1 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold text-white uppercase tracking-wider shadow-lg">
                        {video.tag}
                      </span>
                    </div>

                    {/* Center Play / Pause Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className={`h-14 w-14 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all transform ${isPlaying ? "opacity-0 group-hover:opacity-100 scale-90" : "opacity-90 group-hover:scale-110 shadow-2xl"}`}>
                        {isPlaying ? <Pause className="h-6 w-6 text-sky-400" /> : <Play className="h-6 w-6 fill-white text-white ml-0.5" />}
                      </div>
                    </div>

                    {/* Audio Toggle on Playing Video */}
                    {isPlaying && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMuted(!isMuted);
                        }}
                        className="absolute top-3 right-3 z-20 h-8 w-8 rounded-full bg-black/75 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-sky-400 transition-colors"
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
                      </button>
                    )}

                    {/* Bottom-Right Video Telemetry Badge */}
                    <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-sky-400/60 text-[10px] font-mono font-bold text-sky-400 shadow-xl">
                      <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                      <span>{video.duration} // LIVE FOOTAGE</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* 4. Cylindrical Consultation Card */}
      <div className="relative overflow-hidden rounded-3xl sm:rounded-full py-8 sm:py-10 px-6 sm:px-14 bg-white/95 dark:bg-gradient-to-r dark:from-[#0E204A] dark:via-[#09183B] dark:to-[#050E24] border border-blue-300 dark:border-sky-400/40 ring-1 ring-blue-100 dark:ring-sky-300/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <BorderBeam size={320} duration={10} colorFrom="#38BDF8" colorTo="#2563EB" />

        <div className="space-y-2 max-w-2xl">
          <h3 className="font-display text-[20px] sm:text-[24px] font-bold text-slate-900 dark:text-white tracking-tight">
            Want a Live Drone Walkthrough of Your <span className="text-blue-600 dark:text-sky-400">Site in Lucknow?</span>
          </h3>
          <p className="text-[13px] sm:text-[14px] text-slate-600 dark:text-gray-300 font-sans leading-relaxed">
            We record and deliver weekly 4K drone aerial surveys and high-definition civil milestone documentation for every client build.
          </p>
        </div>

        <div className="shrink-0">
          <MagneticButton
            onClick={onInquiryClick}
            variant="primary"
            className="py-3 px-8 text-xs font-semibold rounded-full"
          >
            <span>Book Live Video Walkthrough</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </MagneticButton>
        </div>
      </div>

    </div>
  );
};
