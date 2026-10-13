import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HardHat,
  ArrowRight,
  Film
} from "lucide-react";
import { BorderBeam } from "../components/ui/BorderBeam";
import { MagneticButton } from "../components/ui/MagneticButton";
import { soundManager } from "../lib/sound";
import { useCMS } from "../context/CMSContext";

const siteImagesData = [
  {
    id: 1,
    src: "/images/site/img_6a747267bb4ef2.54998377.webp",
    title: "Column Shuttering & Casting on Foundation",
    stage: "foundation",
    stageLabel: "Foundation & Columns",
    tag: "SITE SUPERVISION",
  },
  {
    id: 2,
    src: "/images/site/img_6a74726a871fc7.99468710.webp",
    title: "Ground Floor Red Brick Masonry & Lintel Bands",
    stage: "masonry",
    stageLabel: "Brick Masonry",
    tag: "SITE SUPERVISION",
  },
  {
    id: 3,
    src: "/images/site/img_6a74726d5b0d67.23364176.webp",
    title: "Structural Team & Client Joint Walkthrough",
    stage: "supervision",
    stageLabel: "Site Supervision",
    tag: "EXPERT SITE VISIT",
  },
  {
    id: 4,
    src: "/images/site/img_6a74726ef39384.39079974.webp",
    title: "Interior Masonry & Structural Layout Review",
    stage: "supervision",
    stageLabel: "Site Supervision",
    tag: "SITE CONSULTATION",
  },
  {
    id: 5,
    src: "/images/site/img_6a74727116b7f4.89964579.webp",
    title: "Multi-Tier Commercial Complex Framing",
    stage: "finishing",
    stageLabel: "Multi-Story & Finishing",
    tag: "EXPERT SITE VISIT",
  },
  {
    id: 6,
    src: "/images/site/img_6a747273a77268.59601493.webp",
    title: "Roof Slab Shuttering & Timber Prop Alignment",
    stage: "rcc",
    stageLabel: "RCC Slab & Shuttering",
    tag: "SLAB INSPECTION",
  },
  {
    id: 7,
    src: "/images/site/img_6a74727619d761.76827409.webp",
    title: "Civil Engineers & Architectural Field Review",
    stage: "supervision",
    stageLabel: "Site Supervision",
    tag: "EXPERT SITE VISIT",
  },
  {
    id: 8,
    src: "/images/site/img_6a7472bf4478b8.67351463.webp",
    title: "Multi-Story Residential Complex Finishing",
    stage: "finishing",
    stageLabel: "Multi-Story & Finishing",
    tag: "PROJECT SITE",
  },
  {
    id: 9,
    src: "/images/site/img_6a7472ed34d679.24001538.webp",
    title: "Expansive Column-Free Commercial Hall",
    stage: "rcc",
    stageLabel: "RCC Slab & Shuttering",
    tag: "RCC STRUCTURE",
  },
  {
    id: 10,
    src: "/images/site/img_6a7472ee223009.79125061.webp",
    title: "Heavy RCC Column Casting with Vertical Rebars",
    stage: "foundation",
    stageLabel: "Foundation & Columns",
    tag: "SITE SUPERVISION",
  },
  {
    id: 11,
    src: "/images/site/img_6a7472ef38ff26.88550411.webp",
    title: "Precision Internal Partition & Mortar Work",
    stage: "masonry",
    stageLabel: "Brick Masonry",
    tag: "SITE SUPERVISION",
  },
  {
    id: 12,
    src: "/images/site/img_6a7472f08fb470.59801387.webp",
    title: "Commercial Center Framing & Material Stacking",
    stage: "finishing",
    stageLabel: "Multi-Story & Finishing",
    tag: "EXPERT SITE VISIT",
  },
  {
    id: 13,
    src: "/images/site/img_6a7472f229ea20.17441479.webp",
    title: "Ceiling Slab Shuttering & Formwork Inspection",
    stage: "rcc",
    stageLabel: "RCC Slab & Shuttering",
    tag: "SLAB INSPECTION",
  },
  {
    id: 14,
    src: "/images/site/img_6a7472f2af5254.87236074.webp",
    title: "Homeowner Consultation with Civil Specialist",
    stage: "supervision",
    stageLabel: "Site Supervision",
    tag: "SITE CONSULTATION",
  }
];

export const SiteImagesPage = ({ onInquiryClick, onRouteChange }) => {
  const { siteImages } = useCMS();
  const [activeStage, setActiveStage] = useState("all");

  const currentImages = siteImages && siteImages.length > 0 ? siteImages : siteImagesData;

  const stages = [
    { id: "all", label: "All Works", count: currentImages.length },
    { id: "foundation", label: "Foundation & Columns", count: currentImages.filter(i => i.stage === "foundation").length },
    { id: "rcc", label: "RCC & Slab Formwork", count: currentImages.filter(i => i.stage === "rcc").length },
    { id: "masonry", label: "Brick Masonry", count: currentImages.filter(i => i.stage === "masonry").length },
    { id: "supervision", label: "Site Supervision", count: currentImages.filter(i => i.stage === "supervision").length },
    { id: "finishing", label: "Finishing & Handover", count: currentImages.filter(i => i.stage === "finishing").length },
  ];

  const filteredPhotos = currentImages.filter((item) => {
    return activeStage === "all" || item.stage === activeStage;
  });

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-10 sm:space-y-12">
      
      {/* 1. Page Header with HUD Tech Badging */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-sky-500/10 border border-blue-200 dark:border-sky-400/30 font-mono text-[11px] sm:text-xs text-blue-600 dark:text-sky-400 font-semibold shadow-sm">
          <HardHat className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400" />
          <span>VERIFIED ON-SITE CIVIL PROGRESS ARCHIVE</span>
        </div>

        <h1 className="font-display text-[28px] sm:text-[36px] font-bold text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
          Ground Construction <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 dark:from-sky-400 dark:to-blue-500">Photo Logs</span>
        </h1>

        <p className="text-slate-600 dark:text-gray-300 text-[13px] sm:text-[14px] leading-relaxed max-w-2xl mx-auto">
          No 3D renders or computer-generated graphics. An authentic visual archive of real structural shuttering, rebar reinforcement, slab casting, and certified on-ground civil inspections across active Lucknow and NCR project sites.
        </p>
      </div>

      {/* 2. Unified Single-Row Stage Filter Bar with Direct Video Link */}
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
                    layoutId="active-stage-pill"
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

          {/* Video Option in the same filter bar */}
          <button
            onClick={() => onRouteChange && onRouteChange("site-videos")}
            className="px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 bg-gradient-to-r from-sky-500/20 to-blue-600/20 hover:from-sky-500 hover:to-blue-600 text-sky-400 hover:text-white border border-sky-400/40 shadow-sm"
          >
            <Film className="h-3.5 w-3.5 text-sky-400 animate-pulse" />
            <span>Site Videos ➔</span>
          </button>
        </div>
      </div>

      {/* 3. Pure Image Cards Grid (Stable, High-End Card Motion, Uniform Top-Left Badge, "ON SITE" Bottom-Right) */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredPhotos.map((photo, index) => (
            <motion.div
              layout
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              className="h-full"
            >
              {/* Stable Premium Card (No 3D tilt/wobble, gentle lift on hover) */}
              <div className="relative h-full overflow-hidden rounded-2xl bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border border-slate-200/90 dark:border-sky-400/35 hover:border-blue-500/80 dark:hover:border-sky-400/80 ring-1 ring-blue-100 dark:ring-sky-300/15 shadow-xl shadow-blue-900/5 dark:shadow-2xl dark:shadow-black/85 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-sky-500/15 group">
                <BorderBeam size={160} duration={12} colorFrom="#38BDF8" colorTo="#2563EB" />

                {/* Photo Viewport with Left Shift to protect ITLC Logo from right-edge clipping */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-950 w-full">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="w-[107%] max-w-none h-[108%] object-cover object-top -translate-x-3 sm:-translate-x-4 transition-transform duration-500 ease-out origin-top group-hover:scale-[1.03]"
                  />

                  {/* Subtle Gradient Scrim at top and bottom */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />

                  {/* Top-Left Badge with Consistent Font Size & Styling */}
                  <div className="absolute top-3 left-3 z-10 flex items-center">
                    <span className="px-3 py-1 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold text-white uppercase tracking-wider shadow-lg">
                      {photo.tag}
                    </span>
                  </div>

                  {/* Bottom-Right "ON SITE" Badge */}
                  <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-400/60 text-[10px] font-mono font-bold text-emerald-400 shadow-xl">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ON SITE</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 4. Cylindrical Consultation Card */}
      <div className="relative overflow-hidden rounded-3xl sm:rounded-full py-8 sm:py-10 px-6 sm:px-14 bg-white/95 dark:bg-gradient-to-r dark:from-[#0E204A] dark:via-[#09183B] dark:to-[#050E24] border border-blue-300 dark:border-sky-400/40 ring-1 ring-blue-100 dark:ring-sky-300/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <BorderBeam size={320} duration={10} colorFrom="#38BDF8" colorTo="#2563EB" />

        <div className="space-y-2 max-w-2xl">
          <h3 className="font-display text-[20px] sm:text-[24px] font-bold text-slate-900 dark:text-white tracking-tight">
            Want to Inspect Our <span className="text-blue-600 dark:text-sky-400">Live Sites in Lucknow?</span>
          </h3>
          <p className="text-[13px] sm:text-[14px] text-slate-600 dark:text-gray-300 font-sans leading-relaxed">
            We invite prospective homeowners and enterprise clients to inspect our active construction sites across Golf City and Shaheed Path to verify our concrete grades, structural steel binding, and shuttering precision in person.
          </p>
        </div>

        <div className="shrink-0">
          <MagneticButton
            onClick={onInquiryClick}
            variant="primary"
            className="py-3 px-8 text-xs font-semibold rounded-full"
          >
            <span>Book In-Person Site Visit</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </MagneticButton>
        </div>
      </div>

    </div>
  );
};
