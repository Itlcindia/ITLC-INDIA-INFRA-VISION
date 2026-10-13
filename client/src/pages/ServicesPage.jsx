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

export const ServicesPage = ({ onInquiryClick }) => {
  const services = [
    {
      id: "residential",
      code: "01 // RESIDENTIAL",
      title: "Residential Construction",
      tagline: "Turnkey luxury villas and bespoke residential estates engineered from foundation to key handover.",
      badge: "Certified Structural Bond",
      icon: Home,
      image: "/images/services/card_residential.jpg",
      paragraph:
        "Custom luxury villas, estates, and eco-friendly smart homes engineered for modern comfort, energy efficiency, and premium longevity.",
      specs: [
        "FE-550D TMT rebar + M-25 Grade concrete casting",
        "LDA / Municipal approval & sanction assistance",
        "Laser-guided soil leveling & reinforced raft foundation",
        "Comprehensive waterproofing and structural engineering assurance",
      ],
      turnaround: "8 – 14 Months Turnkey",
      metric: "Zero Cost Overrun Guarantee",
    },
    {
      id: "commercial",
      code: "02 // COMMERCIAL",
      title: "Commercial Construction",
      tagline: "Grade-A corporate business landmarks, retail complexes, and high-load institutional spaces.",
      badge: "Grade-A Structural Standard",
      icon: Building2,
      image: "/images/services/card_commercial.jpg",
      paragraph:
        "High-performance office complexes, retail centers, and industrial facilities planned with scalable layouts and robust building physics.",
      specs: [
        "Post-tensioned beam-free slabs for vast column-free spans",
        "Acoustic double-glazed facade & thermal curtain walls",
        "Integrated MEP with automated HVAC & fire suppression",
        "IS-456 & IS-1893 seismic compliance audits with cube tests",
      ],
      turnaround: "Milestone-Bound EPC",
      metric: "100% On-Time Delivery",
    },
    {
      id: "renovation",
      code: "03 // RENOVATION",
      title: "Renovation & Remodeling",
      tagline: "Surgical structural retrofitting, heritage revitalizations, and luxury interior overhauls.",
      badge: "Surgical Retrofitting",
      icon: Hammer,
      image: "/images/services/card_renovation.jpg",
      paragraph:
        "Transforming historic or dated structures into contemporary spaces, adding modern utility while maintaining architectural integrity.",
      specs: [
        "Non-destructive carbon-fiber structural retrofitting",
        "Load-bearing wall removal with steel lintel transfers",
        "Italian Calacatta marble re-polishing & acoustic cladding",
        "Full MEP rewiring, plumbing overhauls & modern insulation",
      ],
      turnaround: "45 – 90 Days Fast-Track",
      metric: "Non-Destructive Execution",
    },
    {
      id: "planning",
      code: "04 // ARCHITECTURE",
      title: "Architectural Space Planning",
      tagline: "High-fidelity 3D BIM design, solar-path analysis, and scientific ergonomics for modern living.",
      badge: "3D BIM & Solar Modeling",
      icon: Compass,
      image: "/images/services/card_planning.webp",
      paragraph:
        "Optimized interior load paths, virtual 3D floor plan walk-throughs, and custom room layouts for modern commercial or residential settings.",
      specs: [
        "Micro-millimeter Revit 3D BIM clash-detection modeling",
        "Solar-orientation & aerodynamic cross-ventilation engineering",
        "LDA, Municipal & RERA sanction approval drawings",
        "Photorealistic 4K VR virtual reality walkthroughs",
      ],
      turnaround: "2 – 4 Weeks Delivery",
      metric: "Micro-Millimeter Accuracy",
    },
    {
      id: "civil-engineering",
      code: "05 // CIVIL EPC",
      title: "Turnkey Civil Site Execution",
      tagline: "Heavy RCC framework, deep piling, and complete on-site project management.",
      badge: "Heavy Structural Engineering",
      icon: HardHat,
      image: "/images/services/house_under_construction.jpeg",
      paragraph:
        "Comprehensive civil engineering execution managing on-site earthwork, heavy RCC structural casting, reinforcement steel inspection, and site safety protocol.",
      specs: [
        "Certified site engineering supervisors stationed daily",
        "Ultrasonic testing for concrete core homogeneity",
        "Zero-incident ISO 45001 safety guidelines enforced",
        "Digital daily progress telemetry reports for clients",
      ],
      turnaround: "Contract-Scheduled Milestone",
      metric: "Zero-Incident Site Safety",
    },
    {
      id: "exterior-facade",
      code: "06 // EXTERIOR",
      title: "Exterior Architecture & Facade Design",
      tagline: "Ultra-modern weather-resistant external cladding, stone accents, and geometric aesthetics.",
      badge: "Climate-Resilient Exterior",
      icon: Layers,
      image: "/images/services/exterior_home_design.jpg",
      paragraph:
        "Bespoke exterior elevation engineering utilizing ventilated rainscreen facades, HPL panels, terracotta louvers, and weatherproof exterior coatings.",
      specs: [
        "High-pressure laminate (HPL) & Italian stone cladding",
        "Architectural LED accent illumination channels",
        "UV-resistant weatherproof thermal shielding",
        "Custom acoustic exterior window framing systems",
      ],
      turnaround: "4 – 8 Weeks Execution",
      metric: "15-Year Weather Shield",
    },
    {
      id: "interior-flooring",
      code: "07 // FIT-OUT",
      title: "Luxury Interior Fit-Out & Flooring",
      tagline: "Surgical hardwood installations, bespoke cabinetry, and acoustic wall panels.",
      badge: "Artisanal Woodwork & Stone",
      icon: Paintbrush,
      image: "/images/services/workers_installing_flooring.jpeg",
      paragraph:
        "Precision craftsmanship for custom engineered hardwood floors, moisture-barrier subflooring, acoustic ceiling details, and luxury kitchen island fabrications.",
      specs: [
        "European Oak & Teak engineered hardwood floor leveling",
        "German hardware fittings & Blum soft-close mechanisms",
        "Seamless anti-fungal epoxy grout with diamond honing",
        "Acoustic perforated wall panels for sound absorption",
      ],
      turnaround: "30 – 60 Days Fit-Out",
      metric: "Artisanal Joinery Tolerance",
    },
    {
      id: "corporate-workspace",
      code: "08 // CORPORATE",
      title: "Corporate Minimalist Workspaces",
      tagline: "Ergonomic executive offices, boardrooms, and high-productivity corporate interiors.",
      badge: "Acoustic Minimalist Design",
      icon: Briefcase,
      image: "/images/services/zindaani_corporate.jpg",
      paragraph:
        "Modern corporate workplace layouts crafted with clean architectural lines, open-concept collaboration zones, and smart automated environmental controls.",
      specs: [
        "Acoustic glass partition walls with STC 45 rating",
        "Smart lighting sensors with automated daylight harvesting",
        "Integrated high-speed concealed cable cable-management trays",
        "Ergonomic executive suite furnishings and boardrooms",
      ],
      turnaround: "6 – 10 Weeks Handover",
      metric: "LEED Platinum Ergonomics",
    },
  ];

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
        {services.map((srv, idx) => {
          const IconComp = srv.icon;
          return (
            <div key={srv.id} className="relative group h-full">
              <Card3D
                maxTilt={6}
                className="h-full !p-0 rounded-3xl overflow-hidden bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border border-slate-200/90 dark:border-sky-400/35 group-hover:border-blue-400/60 dark:group-hover:border-sky-400/60 transition-all duration-500 shadow-xl shadow-blue-900/5 dark:shadow-2xl dark:shadow-black/85 ring-1 ring-blue-100 dark:ring-sky-300/20"
              >
                <BorderBeam size={240} duration={12 + (idx % 4) * 2} colorFrom="#38BDF8" colorTo="#2563EB" />

                <div className="flex flex-col sm:flex-row w-full h-full min-h-[380px]">
                  {/* LEFT SIDE: Architectural Photograph (60% Width) */}
                  <div className="relative w-full sm:w-[58%] md:w-[60%] h-64 sm:h-auto min-h-[260px] overflow-hidden shrink-0">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent via-black/10 dark:via-[#0C1B3E]/10 to-transparent dark:to-[#0C1B3E]" />
                    <div className="absolute inset-0 bg-blue-950/10 dark:bg-blue-950/20 mix-blend-overlay" />

                    {/* Top-Left Code Pill */}
                    <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 dark:bg-[#0A1633]/90 backdrop-blur-md border border-white/20 dark:border-sky-400/40 font-mono text-[9px] text-white dark:text-sky-400 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                      <span>{srv.code}</span>
                    </div>

                    {/* Bottom Turnaround Tag on Image */}
                    <div className="absolute bottom-3.5 left-3.5 z-10 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 dark:bg-black/60 backdrop-blur-md border border-white/20 font-mono text-[9px] text-white dark:text-gray-200">
                      <Clock className="h-3 w-3 text-sky-400" />
                      <span>{srv.turnaround}</span>
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
                        {srv.paragraph}
                      </p>
                    </div>

                    {/* Technical Scope Checklist */}
                    <ul className="space-y-1 pt-2.5 border-t border-slate-200 dark:border-sky-400/20 text-[10px] sm:text-[11px] text-slate-700 dark:text-gray-200 font-sans">
                      {srv.specs.map((item, sIdx) => (
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
        })}
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
