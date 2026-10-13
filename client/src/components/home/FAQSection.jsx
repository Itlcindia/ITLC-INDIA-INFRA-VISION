import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Plus,
  ArrowRight,
} from "lucide-react";
import { BorderBeam } from "../ui/BorderBeam";
import { soundManager } from "../../lib/sound";

export const FAQSection = ({ onInquiryClick }) => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const faqItems = [
    {
      id: "pricing_structure",
      code: "01 // ESTIMATION & BILLING",
      question: "How is the construction budget and milestone schedule structured?",
      answer:
        "Before ground excavation begins, our structural engineering team delivers a transparent, itemized Bill of Quantities (BOQ). Payments are strictly linked to on-site civil milestones, ensuring you only pay as each phase is inspected and approved.",
    },
    {
      id: "custom_design",
      code: "02 // ARCHITECTURE & LAYOUT",
      question: "Can I customize the architectural layouts and floor plans for my plot?",
      answer:
        "Yes. Our senior architects and engineering teams tailor complete floor plans, structural layouts, and photorealistic 3D elevations based on your plot dimensions, lifestyle requirements, and aesthetic preferences.",
    },
    {
      id: "remote_tracking",
      code: "03 // SITE MONITORING",
      question: "Can I monitor real-time site progression remotely if I reside outside Lucknow or abroad?",
      answer:
        "Yes. Every client receives access to our Client Portal where our on-site supervisors upload regular high-resolution photo updates, progress footage, and verified material batch test reports directly to your mobile dashboard.",
    },
    {
      id: "quality_assurance",
      code: "04 // QUALITY & SUPPORT",
      question: "What quality standards and post-handover support do you provide?",
      answer:
        "Every completed residence undergoes comprehensive structural testing covering concrete strength, rebar placements, and multi-layer waterproofing. Additionally, we provide dedicated defect liability maintenance with on-call engineers for all architectural finishes and MEP systems.",
    },
  ];

  const handleToggle = (index) => {
    soundManager.playHapticClick(openIndex === index ? 600 : 780, 0.04);
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full py-14 sm:py-16 bg-[#F8FAFC] dark:bg-[#050C1E] overflow-hidden select-none transition-colors duration-300">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-[400px] h-[400px] bg-sky-500/5 dark:bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        {/* 2-Column Asymmetric Compact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start relative z-10">
          {/* LEFT COLUMN (5 Columns): Sticky Beacon & Knowledge Console */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="space-y-2">
              <h2 className="font-display text-[26px] sm:text-[31px] font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                Clarity Before <span className="text-blue-600 dark:text-sky-400">Construction FAQs</span>
              </h2>
              <p className="text-[13px] text-slate-600 dark:text-gray-400 leading-relaxed">
                Transparency is the ultimate luxury in modern construction. Clear, definitive answers for every civil engineering milestone, architectural blueprint, and cost projection.
              </p>
            </div>

            {/* Interactive Advisory Glass Card (Compact & Sleek) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border border-white/90 dark:border-sky-400/35 backdrop-blur-xl shadow-xl shadow-blue-900/5 dark:shadow-2xl dark:shadow-black/90 ring-1 ring-blue-100 dark:ring-sky-300/20 space-y-3.5 relative overflow-hidden group hover:border-blue-400/60 dark:hover:border-sky-400/60 transition-all">
              <div className="absolute top-0 right-0 w-28 h-28 bg-sky-500/10 blur-xl rounded-full pointer-events-none" />

              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-lg bg-blue-50 dark:bg-sky-500/15 border border-blue-200 dark:border-sky-400/40 flex items-center justify-center text-blue-600 dark:text-sky-400 shadow-sm shrink-0">
                  <HelpCircle className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[9px] text-blue-600 dark:text-sky-300 uppercase tracking-widest block font-bold">
                    DIRECT ENGINEER HOTLINE
                  </span>
                  <h4 className="font-display text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                    Have a Unique Plot or Question?
                  </h4>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-gray-300 leading-relaxed font-sans">
                Our Senior Civil Structural Engineers provide direct technical consultations on architectural blueprints, soil strata test reports, and turnkey civil specifications.
              </p>

              <button
                onClick={onInquiryClick}
                className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 hover:from-blue-500 hover:to-sky-400 border border-sky-300/50 text-white font-mono text-[11px] font-bold flex items-center justify-between transition-all cursor-pointer group/btn shadow-lg shadow-sky-500/25"
              >
                <span>Consult Principal Architect</span>
                <ArrowRight className="h-3.5 w-3.5 text-white group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Metrics Pill Strip */}
            <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-white/90 dark:bg-[#0C1B3E] border border-slate-200 dark:border-sky-400/30 text-center sm:text-left shadow-sm">
                <span className="text-blue-600 dark:text-sky-400 font-bold block text-xs">&lt; 15 Mins</span>
                <span className="text-slate-600 dark:text-gray-300 text-[9px] font-medium">Average Response</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/90 dark:bg-[#0C1B3E] border border-slate-200 dark:border-sky-400/30 text-center sm:text-left shadow-sm">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold block text-xs">Milestone-Bound</span>
                <span className="text-slate-600 dark:text-gray-300 text-[9px] font-medium">Transparent Billing</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (7 Columns): Compact Accordion Cards */}
          <div className="lg:col-span-7 space-y-2.5">
            {faqItems.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <motion.div
                  key={item.id}
                  layout
                  className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "bg-white dark:bg-gradient-to-b dark:from-[#142D66] dark:to-[#0C1B3E] border-2 border-blue-500 dark:border-sky-400 shadow-xl shadow-blue-500/10 dark:shadow-sky-500/25"
                      : "bg-white/90 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border border-blue-300 dark:border-sky-400/35 hover:border-blue-400/60 dark:hover:border-sky-400/60 ring-1 ring-blue-100 dark:ring-sky-300/15 shadow-md dark:shadow-xl dark:shadow-black/80"
                  }`}
                >
                  {/* BorderBeam on active open item */}
                  {isOpen && (
                    <BorderBeam size={220} duration={8} colorFrom="#38BDF8" colorTo="#2563EB" />
                  )}

                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => handleToggle(idx)}
                    className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-3.5 cursor-pointer transition-colors"
                  >
                    <div className="space-y-1.5 pr-2 min-w-0 flex-1">
                      {/* Code Badge */}
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-[#0C1B3E] px-2 py-0.5 rounded border border-blue-200 dark:border-sky-400/40 font-bold">
                          {item.code}
                        </span>
                      </div>

                      {/* Question Title */}
                      <h3
                        className={`font-display text-xs sm:text-sm font-bold leading-snug transition-colors ${
                          isOpen ? "text-blue-700 dark:text-white" : "text-slate-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-white"
                        }`}
                      >
                        {item.question}
                      </h3>
                    </div>

                    {/* Morphing Kinetic Plus/Minus Icon Pill */}
                    <div
                      className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-blue-600 dark:bg-sky-500 text-white shadow-md shadow-sky-500/40 rotate-45"
                          : "bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-sky-400/30 hover:border-blue-400 hover:text-blue-600 rotate-0"
                      }`}
                    >
                      <Plus className="h-3.5 w-3.5 transition-transform duration-300" />
                    </div>
                  </button>

                  {/* Smooth Animated Accordion Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.2, delay: 0.08 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.12 },
                          },
                        }}
                      >
                        <div className="px-4 sm:px-4.5 pb-4 pt-1 space-y-2 border-t border-slate-200 dark:border-sky-400/20">
                          {/* Answer Text */}
                          <p className="text-[11px] sm:text-xs text-slate-700 dark:text-gray-200 leading-relaxed font-sans font-normal">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
