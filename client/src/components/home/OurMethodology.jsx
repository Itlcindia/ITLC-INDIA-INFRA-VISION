import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, HardHat, KeyRound, ArrowRight, CheckCircle2 } from "lucide-react";
import { BorderBeam } from "../ui/BorderBeam";
import { soundManager } from "../../lib/sound";

export const OurMethodology = ({ onInquiryClick }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "blueprint",
      num: "01",
      icon: Compass,
      phase: "PHASE 01 • VISION & BIM",
      title: "Vision & Architectural Blueprint",
      desc: "Our design team translates your core vision into structural 3D blueprints, spatial calculations, and eco-certified material selections.",
      image: "/images/methodology/blueprint_discussion.webp",
      badgeColor: "bg-blue-600 text-white",
      tag: "ARCHITECTURAL VISION",
    },
    {
      id: "construction",
      num: "02",
      icon: HardHat,
      phase: "PHASE 02 • SITE EXECUTION",
      title: "Precision Execution & Build",
      desc: "Our engineers enforce OSHA safety compliance, monitor structural integrity, and manages daily building site logistics for flawless execution.",
      image: "/images/methodology/construction_execution.webp",
      badgeColor: "bg-sky-500 text-white",
      tag: "OSHA & LOGISTICS",
    },
    {
      id: "handover",
      num: "03",
      icon: KeyRound,
      phase: "PHASE 03 • AUDIT & HANDOVER",
      title: "Final Inspection & Handover",
      desc: "We perform strict safety audits, complete extensive site cleaning, and deliver premium structural documents alongside the physical keys.",
      image: "/images/methodology/final_handover.webp",
      badgeColor: "bg-emerald-500 text-white",
      tag: "KEYS & AUDIT",
    },
  ];

  const handleStepSelect = (index) => {
    if (activeStep !== index) {
      soundManager?.playHapticClick?.(550);
      setActiveStep(index);
    }
  };

  return (
    <section
      id="our-methodology"
      className="relative w-full py-20 sm:py-24 bg-gradient-to-b from-[#F8FAFC] via-[#EEF4FB] to-[#F8FAFC] dark:from-[#050C1E] dark:via-[#091533] dark:to-[#050C1E] border-t border-slate-200/80 dark:border-sky-400/20 transition-colors duration-300 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-sky-500/10 dark:bg-sky-500/15 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-blue-500/10 dark:bg-sky-400/10 border border-blue-500/20 dark:border-sky-400/30 text-blue-600 dark:text-sky-300 text-xs font-mono font-semibold">
            <span>EXECUTION LIFECYCLE • 3 MASTER PHASES</span>
          </div>
          <h2 className="font-display text-[26px] sm:text-[31px] font-bold tracking-tight text-slate-900 dark:text-white">
            Our Architectural <span className="text-blue-600 dark:text-sky-400">Execution Methodology</span>
          </h2>
          <p className="text-[13px] text-slate-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            From initial 3D BIM clash-detection to monolithic civil execution and certified turnkey key handover — every project follows an unbroken chain of precision.
          </p>
        </div>

        {/* CONCEPT B: Interactive Expanding Accordion Stage */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-5 h-auto md:h-[460px] w-full">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const IconComponent = step.icon;

            return (
              <div
                key={step.id}
                onClick={() => handleStepSelect(idx)}
                onMouseEnter={() => handleStepSelect(idx)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group shadow-xl ${
                  isActive
                    ? "md:flex-[2.4] h-[380px] md:h-full ring-2 ring-blue-500 dark:ring-sky-400 shadow-blue-500/20 dark:shadow-sky-400/30"
                    : "md:flex-1 h-[140px] md:h-full ring-1 ring-slate-200 dark:ring-white/10 hover:ring-blue-400/50 dark:hover:ring-sky-400/40 opacity-90 md:opacity-80 hover:opacity-100"
                }`}
              >
                {/* Active Running Border Beam */}
                {isActive && (
                  <BorderBeam size={280} duration={10} colorFrom="#38BDF8" colorTo="#2563EB" />
                )}

                {/* Background Image with Dark Vignette */}
                <img
                  src={step.image}
                  alt={step.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out ${
                    isActive ? "scale-105" : "scale-100 group-hover:scale-105"
                  }`}
                />
                
                {/* Contrast Gradient Overlays */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? "bg-gradient-to-t from-black/95 via-black/50 to-black/20"
                      : "bg-gradient-to-t from-black/95 via-black/70 to-black/40 md:bg-black/60 md:hover:bg-black/50"
                  }`}
                />

                {/* Top Phase Header Tag */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-8 h-8 rounded-full font-mono text-xs font-bold flex items-center justify-center shadow-lg transition-transform duration-300 ${
                        isActive
                          ? `${step.badgeColor} scale-110 shadow-blue-500/50`
                          : "bg-white/20 backdrop-blur-md text-white"
                      }`}
                    >
                      {step.num}
                    </span>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 hidden sm:inline-block">
                      {step.phase}
                    </span>
                  </div>

                  <span className="font-mono text-[9px] uppercase tracking-wider text-sky-300 bg-sky-500/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-sky-400/30">
                    {step.tag}
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 z-20 flex flex-col justify-end space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1.5 rounded-xl transition-colors duration-300 ${
                        isActive
                          ? "bg-blue-600/30 text-sky-300 border border-sky-400/40"
                          : "bg-white/10 text-white border border-white/10"
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <h3 className="font-display text-[20px] sm:text-[24px] font-bold text-white tracking-wide drop-shadow-md">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description Paragraph: Fully visible when expanded */}
                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      isActive
                        ? "max-h-28 opacity-100 mt-1"
                        : "md:max-h-0 md:opacity-0 max-h-16 opacity-80"
                    }`}
                  >
                    <p className="text-[13px] sm:text-[14px] text-gray-200 leading-relaxed font-sans max-w-xl">
                      {step.desc}
                    </p>
                  </div>

                  {/* Progress Indicator Dots inside card */}
                  {isActive && (
                    <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-sky-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                      <span className="tracking-wider uppercase font-semibold">
                        ACTIVE LIFECYCLE STAGE
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Quick Indicator Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-gradient-to-r dark:from-[#0E1E45] dark:to-[#081533] border border-slate-200 dark:border-sky-400/25 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider">
              LIFECYCLE CONTROLS:
            </span>
            <div className="flex items-center gap-2">
              {steps.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => handleStepSelect(idx)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                    activeStep === idx
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                      : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-white"
                  }`}
                >
                  {step.num} {step.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onInquiryClick}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-600 dark:text-sky-300 hover:underline cursor-pointer"
          >
            <span>DISCUSS YOUR PROJECT LIFECYCLE</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
