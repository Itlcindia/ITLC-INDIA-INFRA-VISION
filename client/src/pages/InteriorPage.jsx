import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Maximize2,
  X,
  Compass,
  CheckCircle2,
  Send,
} from "lucide-react";
import { BorderBeam } from "../components/ui/BorderBeam";
import { MagneticButton } from "../components/ui/MagneticButton";
import { soundManager } from "../lib/sound";
import { allInteriorSpaces } from "../components/home/InteriorExcellence";
import { useCMS } from "../context/CMSContext";

export const InteriorPage = ({ onInquiryClick }) => {
  const { interior } = useCMS();
  const [inspectItem, setInspectItem] = useState(null);
  const [filter, setFilter] = useState("all");

  const activeSpaces = Array.isArray(interior) ? interior : allInteriorSpaces;

  const filterCategories = [
    { id: "all", label: `All Spaces (${activeSpaces.length})` },
    { id: "Living", label: "Living & Lounge" },
    { id: "Culinary", label: "Kitchen & Dining" },
    { id: "Private", label: "Suites & Wellness" },
  ];

  const filteredSpaces = activeSpaces.filter((space) => {
    if (filter === "all") return true;
    if (filter === "Living") return (space.category || "").includes("Living") || (space.category || "").includes("Lounge") || (space.category || "").includes("Lobby") || (space.category || "").includes("Terrace");
    if (filter === "Culinary") return (space.category || "").includes("Culinary") || (space.category || "").includes("Dining");
    if (filter === "Private") return (space.category || "").includes("Private") || (space.category || "").includes("Wellness") || (space.category || "").includes("Foyer");
    return true;
  });

  const handleOpenLightbox = (item) => {
    soundManager?.playHapticClick?.(600);
    setInspectItem(item);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-16">
      {/* 1. HERO HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-3.5">
        <span className="font-mono text-[13px] uppercase tracking-widest text-blue-600 dark:text-sky-400 font-bold bg-blue-50 dark:bg-sky-500/10 border border-blue-200 dark:border-sky-400/30 px-3.5 py-1 rounded-full">
          Curated Architectural Spaces
        </span>
        <h1 className="font-display text-[28px] sm:text-[34px] font-bold text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
          Curated Interior <span className="text-blue-600 dark:text-sky-400">Design Portfolio</span>
        </h1>
        <p className="text-slate-600 dark:text-gray-400 text-[13px] leading-relaxed max-w-2xl mx-auto">
          Explore all 9 bespoke interior sanctuaries crafted with structural precision, Italian marble finishes, bespoke cabinetry, and tailored lighting design.
        </p>
      </div>

      {/* 2. DESIGN PHILOSOPHY SECTION */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:via-[#0C1B3E] dark:to-[#081533] border border-slate-200/90 dark:border-sky-400/35 ring-1 ring-slate-200/50 dark:ring-sky-300/20 shadow-xl shadow-blue-900/5 dark:shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-blue-600 dark:text-sky-400 font-bold bg-blue-50 dark:bg-sky-500/15 border border-blue-200 dark:border-sky-400/30 px-3 py-1 rounded-full">
              Design Philosophy
            </span>
            <h2 className="font-display text-[26px] sm:text-[31px] font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
              Artistry in Every Detail, Function in Every Plan
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-gray-200 leading-relaxed font-sans">
              <p>
                At INFRA VISION, our interior design methodology is rooted in the synthesis of structural integrity and aesthetic sophistication. We believe an interior space is an organic extension of civil architecture.
              </p>
              <p>
                Our turnkey interior division executes every detail — from Italian Calacatta stone cladding and acoustic fluted panels to smart circadian lighting automation and bespoke furnishings.
              </p>
            </div>
          </div>

          {/* Right Philosophy Real Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 dark:border-sky-400/30 aspect-[4/3] shadow-xl group">
            <img
              src="/images/interior/staircase_lobby.jpg"
              alt="Design Philosophy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 text-[10px] font-mono text-sky-200 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
              CANTILEVERED ATRIUM • 2026
            </div>
          </div>
        </div>
      </div>

      {/* 3. COMPLETE INTERIOR SHOWCASE (ALL 9 SPACES GRID) */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-blue-600 dark:text-sky-400 font-bold">
              VERIFIED SPACES EXHIBITION
            </span>
            <h2 className="font-display text-[26px] sm:text-[30px] font-bold text-slate-900 dark:text-white uppercase">
              Curated Interior Spaces ({activeSpaces.length})
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-slate-100/90 dark:bg-[#0C1B3E] p-1.5 rounded-full border border-slate-200 dark:border-sky-400/30">
            {filterCategories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager?.playHapticClick?.(650);
                  setFilter(tab.id);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  filter === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-sky-500/30"
                    : "text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Spaces Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredSpaces.length === 0 ? (
            <div className="col-span-full text-center py-16 px-6 rounded-3xl bg-blue-50/50 dark:bg-sky-950/20 border border-dashed border-blue-300 dark:border-sky-500/30">
              <Layers className="w-8 h-8 text-blue-500 dark:text-sky-400 mx-auto mb-2 opacity-70" />
              <h3 className="font-display text-base font-bold text-slate-800 dark:text-white">
                No Interior Spaces in this Category
              </h3>
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400 mt-1">
                Add or manage interior rooms from the Admin Control Center (INTERIOR).
              </p>
            </div>
          ) : (
            filteredSpaces.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item)}
              className="group cursor-pointer rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border border-slate-200/90 dark:border-sky-400/35 hover:border-blue-400 dark:hover:border-sky-400 ring-1 ring-blue-100 dark:ring-sky-300/15 shadow-lg shadow-blue-900/5 dark:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Container */}
              <div className="relative aspect-[16/11] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Expand hover icon */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="pt-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-blue-600 dark:text-sky-400">
                    {item.number}
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-sky-500/10 text-blue-700 dark:text-sky-300 border border-blue-200 dark:border-sky-400/30 uppercase">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-display text-[16px] sm:text-[17px] font-bold text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-[13px] text-slate-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                  {item.paragraph}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      </div>

      {/* 4. EXECUTION METHODOLOGY */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:via-[#0B1A3C] dark:to-[#061026] border border-slate-200/90 dark:border-sky-400/35 shadow-xl shadow-blue-900/5 dark:shadow-2xl dark:shadow-black/85 ring-1 ring-slate-200/50 dark:ring-sky-300/20 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="font-mono text-xs text-blue-600 dark:text-sky-400 uppercase tracking-widest font-bold">
            EXECUTION METHODOLOGY
          </span>
          <h2 className="font-display text-[26px] sm:text-[31px] font-bold text-slate-900 dark:text-white">
            Our 3-Stage Interior Methodology
          </h2>
          <p className="text-xs text-slate-600 dark:text-gray-300">
            From virtual 3D photorealistic visualization to material specification and white-glove turnkey installation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "3D Spatial Visualization",
              desc: "Hyper-realistic photorealistic 3D render walkthroughs, lighting simulations, and customized finishes selection.",
            },
            {
              step: "02",
              title: "Material Sourcing & Joinery",
              desc: "Factory-precision modular joinery, imported Italian marble curation, and premium architectural hardware integration.",
            },
            {
              step: "03",
              title: "White-Glove Turnkey Delivery",
              desc: "Dust-free deep cleaning, multi-point quality certification, and complete ready-to-live handover with warranties.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50/90 dark:bg-[#0C1B3E] border border-blue-400 dark:border-sky-400/60 shadow-sm shadow-blue-500/10 dark:shadow-sky-400/20 space-y-2 hover:border-blue-500 dark:hover:border-sky-400/80 transition-colors"
            >
              <span className="font-mono text-xl font-bold text-blue-600 dark:text-sky-400">{item.step}</span>
              <h3 className="font-display text-[14px] font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-[11.5px] sm:text-[12px] text-slate-600 dark:text-gray-200 leading-relaxed font-sans">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Cylindrical Consultation Card */}
      <div className="relative overflow-hidden rounded-full sm:rounded-full py-8 sm:py-10 px-6 sm:px-14 bg-white/95 dark:bg-gradient-to-r dark:from-[#0E204A] dark:via-[#09183B] dark:to-[#050E24] border border-blue-300 dark:border-sky-400/40 ring-1 ring-blue-100 dark:ring-sky-300/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <BorderBeam size={320} duration={10} colorFrom="#38BDF8" colorTo="#2563EB" />

        <div className="space-y-2 max-w-2xl">
          <h3 className="font-display text-[20px] sm:text-[24px] font-bold text-slate-900 dark:text-white tracking-tight">
            Ready to Craft Your <span className="text-blue-600 dark:text-sky-400">Bespoke Interior?</span>
          </h3>
          <p className="text-[13px] sm:text-[14px] text-slate-600 dark:text-gray-300 font-sans leading-relaxed">
            Schedule a physical design consultation with our principal interior architect and review materials, moodboards, and turnkey budget plans.
          </p>
        </div>

        <div className="shrink-0">
          <MagneticButton
            onClick={onInquiryClick}
            variant="primary"
            className="py-3 px-8 text-xs font-semibold rounded-full"
          >
            <span>Book Interior Consultation</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </MagneticButton>
        </div>
      </div>

      {/* 2K/4K FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {inspectItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full bg-[#0B1736] border border-sky-400/40 rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setInspectItem(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:text-sky-300 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative aspect-[16/10] max-h-[65vh] w-full overflow-hidden">
                <img
                  src={inspectItem.image}
                  alt={inspectItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1736] via-transparent to-transparent" />
              </div>

              <div className="p-6 sm:p-8 space-y-3 bg-[#0B1736]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-sky-400 font-bold">
                      {inspectItem.number} • {inspectItem.category}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mt-1 uppercase">
                      {inspectItem.title}
                    </h3>
                    <p className="text-xs text-gray-300 mt-1 font-sans max-w-xl">
                      {inspectItem.paragraph}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setInspectItem(null);
                      if (onInquiryClick) onInquiryClick();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 text-white font-mono text-xs font-semibold shadow-lg shadow-blue-500/30 hover:scale-105 transition-all cursor-pointer shrink-0"
                  >
                    <span>Inquire This Space</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
