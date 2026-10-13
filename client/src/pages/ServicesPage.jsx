import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Building2,
  Hammer,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  FileCheck,
  Award,
  Clock,
  Paintbrush,
  HardHat,
  Briefcase,
} from "lucide-react";
import { Card3D } from "../components/ui/Card3D";
import { BorderBeam } from "../components/ui/BorderBeam";
import { MagneticButton } from "../components/ui/MagneticButton";
import { useCMS } from "../context/CMSContext";

export const ServicesPage = ({ onInquiryClick }) => {
  const { services: cmsServices = [] } = useCMS();
  const services = Array.isArray(cmsServices) ? cmsServices : [];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-14">
      {/* 1. Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="font-mono text-[13px] text-blue-600 dark:text-sky-400 tracking-widest uppercase bg-blue-50 dark:bg-sky-500/10 px-3.5 py-1 rounded-full border border-blue-200 dark:border-sky-400/30 font-semibold inline-block shadow-sm">
          Premium Architecture & Contracting
        </span>
        <h1 className="font-display text-[28px] sm:text-[34px] font-bold text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
          Our Structural & <span className="text-blue-600 dark:text-sky-400">Interior Services</span>
        </h1>
        <p className="text-slate-600 dark:text-gray-400 text-[13px] leading-relaxed">
          From ground-breaking civil excavations and commercial landmarks to surgical interior fit-outs and BIM architectural planning.
        </p>
      </div>

      {/* 2. All Services Editorial Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {services.length === 0 ? (
          <div className="col-span-full text-center py-16 px-6 rounded-3xl bg-blue-50/50 dark:bg-sky-950/20 border border-dashed border-blue-300 dark:border-sky-500/30 space-y-2">
            <Briefcase className="w-10 h-10 text-blue-500 dark:text-sky-400 mx-auto mb-2 opacity-70" />
            <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white">
              No Services Currently Listed
            </h3>
            <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
              Add structural or interior architectural services from the Admin Control Center (SERVICES).
            </p>
          </div>
        ) : (
          services.map((srv, idx) => {
            const IconComp = srv.icon || Briefcase;
            const srvImg = srv.image || "/images/services/card_residential.jpg";
            const srvCode = srv.code || `0${idx + 1} // ${(srv.title || "SERVICE").split(" ")[0].toUpperCase()}`;
            const srvTurnaround = srv.turnaround || "Turnkey Precision Delivery";
            const srvPara = srv.paragraph || srv.tagline || "Engineered with modern building physics, structural safety, and turnkey quality.";
            const srvSpecs = Array.isArray(srv.specs) && srv.specs.length > 0
              ? srv.specs
              : [
                  "IS-456 structural compliance audit",
                  "Site supervision & batch cube tests",
                  "Grade-A engineering warranty",
                ];

            return (
              <div key={srv.id || idx} className="relative group h-full">
                <Card3D
                  maxTilt={6}
                  className="h-full !p-0 rounded-3xl overflow-hidden bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border border-slate-200/90 dark:border-sky-400/35 group-hover:border-blue-400/60 dark:group-hover:border-sky-400/60 transition-all duration-500 shadow-xl shadow-blue-900/5 dark:shadow-2xl dark:shadow-black/85 ring-1 ring-blue-100 dark:ring-sky-300/20"
                >
                  <BorderBeam size={240} duration={12 + (idx % 4) * 2} colorFrom="#38BDF8" colorTo="#2563EB" />

                  <div className="flex flex-col sm:flex-row w-full h-full min-h-[380px]">
                    {/* LEFT SIDE: Architectural Photograph (60% Width) */}
                    <div className="relative w-full sm:w-[58%] md:w-[60%] h-64 sm:h-auto min-h-[260px] overflow-hidden shrink-0">
                      <img
                        src={srvImg}
                        alt={srv.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent via-black/10 dark:via-[#0C1B3E]/10 to-transparent dark:to-[#0C1B3E]" />
                      <div className="absolute inset-0 bg-blue-950/10 dark:bg-blue-950/20 mix-blend-overlay" />

                      {/* Top-Left Code Pill */}
                      <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 dark:bg-[#0A1633]/90 backdrop-blur-md border border-white/20 dark:border-sky-400/40 font-mono text-[9px] text-white dark:text-sky-400 shadow-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                        <span>{srvCode}</span>
                      </div>

                      {/* Bottom Turnaround Tag on Image */}
                      <div className="absolute bottom-3.5 left-3.5 z-10 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 dark:bg-black/60 backdrop-blur-md border border-white/20 font-mono text-[9px] text-white dark:text-gray-200">
                        <Clock className="h-3 w-3 text-sky-400" />
                        <span>{srvTurnaround}</span>
                      </div>
                    </div>

                    {/* RIGHT SIDE: Text, Specs & Action Body (40% Width) */}
                    <div className="w-full sm:w-[42%] md:w-[40%] p-4 sm:p-5 flex flex-col justify-between bg-white/95 dark:bg-[#0C1B3E] z-10 space-y-3 transition-colors">
                      {/* Top: Title + Icon */}
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-[16px] sm:text-[17px] font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-300 transition-colors leading-snug">
                          {srv.title}
                        </h3>
                        <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-sky-500/15 border border-blue-200 dark:border-sky-400/40 flex items-center justify-center text-blue-600 dark:text-sky-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-all shadow-sm shrink-0">
                          <IconComp className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Paragraph */}
                      <div>
                        <p className="text-[12px] sm:text-[13px] text-slate-600 dark:text-gray-200 leading-relaxed font-sans mt-0.5 line-clamp-3">
                          {srvPara}
                        </p>
                      </div>

                      {/* Technical Scope Checklist */}
                      <ul className="space-y-1 pt-2.5 border-t border-slate-200 dark:border-sky-400/20 text-[10px] sm:text-[11px] text-slate-700 dark:text-gray-200 font-sans">
                        {srvSpecs.map((item, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400 mt-0.5 shrink-0" />
                            <span className="leading-tight text-slate-700 dark:text-gray-200">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Bottom CTA Button */}
                      <div className="pt-2">
                        <button
                          onClick={onInquiryClick}
                          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 hover:from-blue-700 hover:to-sky-600 border border-sky-400/40 text-white font-mono text-xs font-semibold flex items-center justify-between transition-all cursor-pointer group/btn shadow-md shadow-blue-500/20"
                        >
                          <span className="text-white font-semibold">Request Consultation</span>
                          <ArrowRight className="h-3.5 w-3.5 text-white group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </div>
            );
          })
        )}
      </div>

      {/* 3. 4-Step Execution Protocol */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:via-[#0B1A3C] dark:to-[#061026] border border-slate-200 dark:border-sky-400/35 ring-1 ring-blue-100 dark:ring-sky-300/20 space-y-8 backdrop-blur-xl shadow-xl shadow-blue-900/5 dark:shadow-2xl">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-display text-[26px] sm:text-[31px] font-bold text-slate-900 dark:text-white">
            How We Deliver <span className="text-blue-600 dark:text-sky-400">Your Landmark</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            A milestone-guaranteed workflow designed to ensure zero cost overruns and 100% engineering compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
          {[
            {
              step: "01",
              title: "3D BIM & Soil Dynamics",
              desc: "Non-destructive soil load testing, architectural floorplans, 3D clash detection, and guaranteed fixed cost sheet.",
            },
            {
              step: "02",
              title: "LDA Sanctions & Ground Piling",
              desc: "Statutory LDA municipal approvals, laser-leveled raft foundation casting, and anti-termite chemical barrier injection.",
            },
            {
              step: "03",
              title: "RCC Superstructure & MEP",
              desc: "M-25 concrete framing, FE-550D TMT rebar reinforcement, acoustic plumbing conduits, and electrical wiring installation.",
            },
            {
              step: "04",
              title: "Handover & Quality Clearance",
              desc: "Italian marble diamond honing, smart HVAC integration, final deep cleanup, and formal structural quality clearance handover.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-slate-50/90 dark:bg-[#0C1B3E] border border-blue-400 dark:border-sky-400/60 hover:border-blue-500 dark:hover:border-sky-400/80 transition-all space-y-3 group shadow-sm shadow-blue-500/10 dark:shadow-sky-400/20"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600 dark:text-sky-400 group-hover:scale-110 transition-transform">
                  {item.step}
                </span>
                <span className="w-2 h-2 rounded-full bg-blue-400/40 dark:bg-sky-400/40 group-hover:bg-blue-600 dark:group-hover:bg-sky-400" />
              </div>
              <div className="font-bold text-[14px] text-slate-900 dark:text-white font-sans">{item.title}</div>
              <p className="text-[11.5px] sm:text-[12px] text-slate-600 dark:text-gray-200 font-sans leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Cylindrical Consultation Card */}
      <div className="relative overflow-hidden rounded-full sm:rounded-full py-8 sm:py-10 px-6 sm:px-14 bg-white/95 dark:bg-gradient-to-r dark:from-[#0E204A] dark:via-[#09183B] dark:to-[#050E24] border border-blue-300 dark:border-sky-400/40 ring-1 ring-blue-100 dark:ring-sky-300/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <BorderBeam size={320} duration={10} colorFrom="#38BDF8" colorTo="#2563EB" />

        <div className="space-y-2 max-w-2xl">
          <h3 className="font-display text-[20px] sm:text-[24px] font-bold text-slate-900 dark:text-white tracking-tight">
            Need a Customized Structural Bid?
          </h3>
          <p className="text-[13px] sm:text-[14px] text-slate-600 dark:text-gray-300 font-sans leading-relaxed">
            Contact our project estimations desk to review blueprints, environmental guidelines, and scheduling drafts.
          </p>
        </div>

        <div className="shrink-0">
          <MagneticButton
            onClick={onInquiryClick}
            variant="primary"
            className="py-3 px-8 text-xs font-semibold rounded-full"
          >
            <span>Consultation</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};
