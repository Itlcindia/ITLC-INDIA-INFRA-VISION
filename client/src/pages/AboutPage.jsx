import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Wrench, 
  ShieldCheck, 
  Leaf, 
  ArrowRight, 
  Building2, 
  PhoneCall, 
  CheckCircle2,
  Users,
  Palette,
  HardHat,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Card3D } from "../components/ui/Card3D";
import { BorderBeam } from "../components/ui/BorderBeam";
import { MagneticButton } from "../components/ui/MagneticButton";
import { soundManager } from "../lib/sound";

export const AboutPage = ({ onInquiryClick }) => {
  const [openCards, setOpenCards] = useState({});
  const scrollTrackRef = useRef(null);

  const toggleCard = (index) => {
    soundManager?.playHapticClick?.(600);
    setOpenCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const scrollTrack = (offset) => {
    soundManager?.playHapticClick?.(450);
    scrollTrackRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  const teamMembers = [
    {
      id: "interior",
      badgeTitle: "INTERIOR",
      badgeSub: "DESIGNER",
      tag: "SPATIAL ARCHITECTURE & FINISHES",
      decree: "INTERIOR ARCHITECTURAL DECREE",
      name: "Ar. Ananya Sharma",
      role: "Lead Interior Architect & Spatial Stylist",
      experience: "8+ Years Exp",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      bio: "8+ years specializing in luxury bespoke residences, bookmatched Italian Calacatta marble curation, automated circadian lighting layouts, and acoustic spatial serenity across Lucknow.",
      specs: [
        "65+ Luxury Villas Styled",
        "Italian Stone Curation",
        "3D BIM Clash-Free",
        "Circadian Light Flow"
      ],
      signature: "Ar. Ananya Sharma ~"
    },
    {
      id: "civil",
      badgeTitle: "CIVIL",
      badgeSub: "ENGINEER",
      tag: "IS-456 STRUCTURAL EXECUTION",
      decree: "CIVIL STRUCTURAL DECREE",
      name: "Er. Rajesh Verma",
      role: "Chief Structural & Civil Site Engineer",
      experience: "12+ Years Exp",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      bio: "12+ years executing monolithic raft foundations, non-destructive concrete cube tests, and certified TATA Tiscon FE-550D rebar grid placements under strict OSHA zero-incident safety.",
      specs: [
        "80+ Landmark Sites Cast",
        "Seismic Zone 3 Audits",
        "Drone Telemetry Lead",
        "OSHA Zero-Incident"
      ],
      signature: "Er. Rajesh Verma ~"
    },
    {
      id: "bim",
      badgeTitle: "BIM & MEP",
      badgeSub: "DIRECTOR",
      tag: "3D BIM & MEP INFRASTRUCTURE",
      decree: "DIGITAL TWIN BIM DECREE",
      name: "Er. Sameer Khan",
      role: "Senior MEP & 3D BIM Director",
      experience: "9+ Years Exp",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
      bio: "9+ years coordinating micro-millimeter 3D BIM clash-detection, automated HVAC ducting, acoustic conduit isolation, and LEED-compliant energy management grids with zero site delays.",
      specs: [
        "70+ Turnkey Milestones",
        "Micro-Clash Resolution",
        "Concealed MEP Grids",
        "LEED Energy Standards"
      ],
      signature: "Er. Sameer Khan ~"
    }
  ];
  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-14">
      
      {/* 1. HERO HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-mono text-[13px] text-blue-600 dark:text-sky-400 tracking-widest uppercase bg-blue-50 dark:bg-sky-500/10 px-3.5 py-1 rounded-full border border-blue-200 dark:border-sky-400/30 font-semibold">
          Pioneering Premium Construction
        </span>
        <h1 className="font-display text-[28px] sm:text-[32px] font-bold text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 dark:from-sky-400 dark:to-blue-500">Us</span>
        </h1>
        <p className="text-slate-600 dark:text-gray-400 text-[12px] leading-relaxed">
          Learn about our core pillars, engineering history, and technical certifications.
        </p>
      </div>

      {/* 2. WHO WE ARE (Large Showcase Image + Editorial + Metrics) */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:via-[#0C1B3E] dark:to-[#081533] border border-slate-200/90 dark:border-sky-400/35 ring-1 ring-slate-200/50 dark:ring-sky-300/20 shadow-xl shadow-blue-900/5 dark:shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text & Metrics */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-blue-600 dark:text-sky-400 font-bold bg-blue-50 dark:bg-sky-500/15 border border-blue-200 dark:border-sky-400/30 px-3 py-1 rounded-full">
                Who We Are
              </span>
              <h2 className="font-display text-[26px] sm:text-[31px] font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                Pioneering Premium Construction & Architecture
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-gray-200 leading-relaxed font-sans">
              <p>
                For over 10 years, InfraVision by ITLC India Private Limited has stood at the intersection of aesthetic design and structural integrity. We treat every project not just as a building, but as a monument to precision engineering.
              </p>
              <p>
                Our collaborative team of architects, project managers, and expert builders ensure that each detail aligns with our client's vision. From ground breaking to key handover, our commitment to green practices, safety, and modern design stands unmatched.
              </p>
            </div>

            {/* 3 Metric Stats (10 Years Exp, 120 Projects, 45 Awards) */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#08132D] border border-blue-400 dark:border-sky-400/60 text-center space-y-1 shadow-sm shadow-blue-500/10 dark:shadow-sky-400/20">
                <div className="font-display text-2xl sm:text-4xl font-extrabold text-blue-600 dark:text-sky-400">
                  10
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-slate-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                  Years Exp
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#08132D] border border-blue-400 dark:border-sky-400/60 text-center space-y-1 shadow-sm shadow-blue-500/10 dark:shadow-sky-400/20">
                <div className="font-display text-2xl sm:text-4xl font-extrabold text-blue-600 dark:text-sky-400">
                  120
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-slate-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                  Projects
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#08132D] border border-blue-400 dark:border-sky-400/60 text-center space-y-1 shadow-sm shadow-blue-500/10 dark:shadow-sky-400/20">
                <div className="font-display text-2xl sm:text-4xl font-extrabold text-blue-600 dark:text-sky-400">
                  45
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-slate-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                  Awards
                </div>
              </div>
            </div>
          </div>

          {/* Right Large Showcase Image (Bada image with luxury border & motion) */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-sky-400/40 shadow-2xl group min-h-[380px] sm:min-h-[460px] flex items-center justify-center bg-[#07132F]"
            >
              {/* Running Neon Border Light */}
              <BorderBeam size={280} duration={12} colorFrom="#38BDF8" colorTo="#2563EB" />

              <img
                src="/images/about_team.webp"
                alt="ITLC India Leadership & Architecture Consultation Meeting"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Contrast Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-display text-base sm:text-lg font-bold drop-shadow-md">
                    ITLC India Executive Team
                  </h4>
                  <p className="text-[11px] font-mono text-sky-300">
                    Principal Architecture & Engineering Consultation
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* 3. TECHNICAL EXCELLENCE // OUR CORE QUALITY STANDARDS (3 Cards with Top-Center Icons) */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-600 dark:text-sky-400 font-bold bg-blue-50 dark:bg-sky-500/10 border border-blue-200 dark:border-sky-400/30 px-3.5 py-1 rounded-full">
            TECHNICAL EXCELLENCE
          </span>
          <h2 className="font-display text-[26px] sm:text-[31px] font-bold text-slate-900 dark:text-white tracking-tight">
            Our Core Quality Standards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: END-TO-END SOLUTIONS */}
          <div className="relative group">
            <Card3D className="h-full bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border border-blue-300 dark:border-sky-400/35 hover:border-blue-500/60 dark:hover:border-sky-400/60 ring-1 ring-blue-100 dark:ring-sky-300/15 shadow-xl shadow-blue-900/5 dark:shadow-2xl dark:shadow-black/85 p-8 flex flex-col justify-between transition-all text-center items-center rounded-3xl">
              <BorderBeam size={180} duration={12} colorFrom="#38BDF8" colorTo="#2563EB" />
              
              <div className="space-y-4 flex flex-col items-center">
                {/* Top Center Icon */}
                <div className="h-14 w-14 rounded-2xl bg-blue-50 dark:bg-sky-500/15 border border-blue-200 dark:border-sky-400/40 flex items-center justify-center text-blue-600 dark:text-sky-400 shadow-sm dark:shadow-lg dark:shadow-sky-500/15 group-hover:scale-110 transition-transform">
                  <Wrench className="h-7 w-7 stroke-[2]" />
                </div>

                <h3 className="font-display text-[16px] sm:text-[17px] font-bold text-slate-900 dark:text-white tracking-wider">
                  END-TO-END SOLUTIONS
                </h3>

                <p className="text-[12px] sm:text-[13px] text-slate-600 dark:text-gray-200 leading-relaxed font-sans max-w-xs">
                  From initial architectural blueprints and zoning clearances to final handover structural compliance inspections.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-200 dark:border-sky-400/20 w-full flex items-center justify-center gap-1.5 text-[10px] font-mono text-blue-600 dark:text-sky-400 font-bold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>SINGLE CONTRACT ACCOUNTABILITY</span>
              </div>
            </Card3D>
          </div>

          {/* Card 2: SAFETY INTEGRITY */}
          <div className="relative group">
            <Card3D className="h-full bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border border-blue-300 dark:border-sky-400/35 hover:border-blue-500/60 dark:hover:border-sky-400/60 ring-1 ring-blue-100 dark:ring-sky-300/15 shadow-xl shadow-blue-900/5 dark:shadow-2xl dark:shadow-black/85 p-8 flex flex-col justify-between transition-all text-center items-center rounded-3xl">
              <div className="space-y-4 flex flex-col items-center">
                {/* Top Center Icon */}
                <div className="h-14 w-14 rounded-2xl bg-blue-50 dark:bg-sky-500/15 border border-blue-200 dark:border-sky-400/40 flex items-center justify-center text-blue-600 dark:text-sky-400 shadow-sm dark:shadow-lg dark:shadow-sky-500/15 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-7 w-7 stroke-[2]" />
                </div>

                <h3 className="font-display text-[16px] sm:text-[17px] font-bold text-slate-900 dark:text-white tracking-wider">
                  SAFETY INTEGRITY
                </h3>

                <p className="text-[12px] sm:text-[13px] text-slate-600 dark:text-gray-200 leading-relaxed font-sans max-w-xs">
                  Enforcing a zero-incident safety culture backed by certified OSHA-regulated audits and strict weekly site reviews.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-200 dark:border-sky-400/20 w-full flex items-center justify-center gap-1.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>ZERO-INCIDENT COMPLIANCE</span>
              </div>
            </Card3D>
          </div>

          {/* Card 3: SUSTAINABLE ENGINEERING */}
          <div className="relative group">
            <Card3D className="h-full bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border border-blue-300 dark:border-sky-400/35 hover:border-blue-500/60 dark:hover:border-sky-400/60 ring-1 ring-blue-100 dark:ring-sky-300/15 shadow-xl shadow-blue-900/5 dark:shadow-2xl dark:shadow-black/85 p-8 flex flex-col justify-between transition-all text-center items-center rounded-3xl">
              <div className="space-y-4 flex flex-col items-center">
                {/* Top Center Icon */}
                <div className="h-14 w-14 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-400/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm dark:shadow-lg dark:shadow-emerald-500/15 group-hover:scale-110 transition-transform">
                  <Leaf className="h-7 w-7 stroke-[2]" />
                </div>

                <h3 className="font-display text-[16px] sm:text-[17px] font-bold text-slate-900 dark:text-white tracking-wider">
                  SUSTAINABLE ENGINEERING
                </h3>

                <p className="text-[12px] sm:text-[13px] text-slate-600 dark:text-gray-200 leading-relaxed font-sans max-w-xs">
                  Incorporating green eco-concrete mixtures, thermal insulation systems, and LEED-compliant energy-efficient layouts.
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-200 dark:border-sky-400/20 w-full flex items-center justify-center gap-1.5 text-[10px] font-mono text-emerald-600 dark:text-sky-400 font-bold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>LEED ECO-CERTIFIED DESIGN</span>
              </div>
            </Card3D>
          </div>

        </div>
      </div>

      {/* 4. ELITE ENGINEERING & DESIGN LEADERSHIP (MY TEAM SCROLLABLE CARDS) */}
      <div id="my-team" className="space-y-8 scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 dark:bg-sky-400/10 border border-blue-400/30 text-blue-600 dark:text-sky-300 text-xs font-mono font-semibold">
              <Users className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400" />
              <span>MY TEAM • LEADERSHIP</span>
            </div>
            <h2 className="font-display text-[26px] sm:text-[31px] font-bold tracking-tight text-slate-900 dark:text-white">
              Elite Engineering & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 dark:from-sky-400 dark:to-blue-500">Design Leadership</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 font-sans max-w-xl">
              Tap the circular badge to unfurl each specialist's verified architectural dossier.
            </p>
          </div>

          {/* Left/Right Horizontal Scroll Navigation Buttons */}
          <div className="flex items-center justify-center sm:justify-end gap-2.5 shrink-0">
            <button
              onClick={() => scrollTrack(-360)}
              aria-label="Scroll team left"
              className="p-2.5 rounded-full bg-white dark:bg-[#0C1B3E] hover:bg-blue-50 dark:hover:bg-[#132A5E] border border-blue-300 dark:border-sky-400/40 text-blue-600 dark:text-sky-300 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTrack(360)}
              aria-label="Scroll team right"
              className="p-2.5 rounded-full bg-white dark:bg-[#0C1B3E] hover:bg-blue-50 dark:hover:bg-[#132A5E] border border-blue-300 dark:border-sky-400/40 text-blue-600 dark:text-sky-300 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Horizontal Scrollable Cards */}
        <div
          ref={scrollTrackRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 px-1 items-start"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {teamMembers.map((member, idx) => {
            const isOpen = !!openCards[idx];

            return (
              <div
                key={member.id}
                className="snap-center shrink-0 w-[320px] sm:w-[365px] flex flex-col items-center"
              >
                {/* Top Architectural Titanium Cylinder Rod */}
                <div className="w-full h-14 bg-gradient-to-r from-slate-100 via-blue-50 to-slate-100 dark:from-[#0B1A3C] dark:via-[#132A5E] dark:to-[#0B1A3C] rounded-full shadow-xl border border-blue-300 dark:border-sky-400/40 flex items-center justify-between px-3 relative z-30">
                  <div className="w-5 h-8 rounded-l-full bg-gradient-to-r from-blue-600 to-sky-500 shadow-inner flex items-center justify-center border border-white/20">
                    <span className="w-1.5 h-3 rounded-full bg-white/40" />
                  </div>

                  <div className="font-mono text-[10px] font-bold text-blue-700 dark:text-sky-300 tracking-[0.2em] uppercase truncate px-2 text-center">
                    {member.decree}
                  </div>

                  <div className="w-5 h-8 rounded-r-full bg-gradient-to-r from-sky-500 to-blue-600 shadow-inner flex items-center justify-center border border-white/20">
                    <span className="w-1.5 h-3 rounded-full bg-white/40" />
                  </div>
                </div>

                {/* The Unrolling Dossier Sheet (Grid template rows transition for smooth unfurl) */}
                <div
                  className={`w-[92%] -mt-2 relative z-20 grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:via-[#0A1838] dark:to-[#05112B] border-x-2 border-b-2 border-blue-400 dark:border-sky-400/60 rounded-b-3xl shadow-2xl p-5 pt-8 pb-10 space-y-3.5 text-slate-900 dark:text-white">
                      
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-sky-400/20 pb-2 text-[9px] font-mono font-bold text-blue-600 dark:text-sky-300">
                        <span>{member.tag}</span>
                        <span>{member.experience}</span>
                      </div>

                      {/* Photo + Beside it: Name, Role, Bio */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-24 h-28 shrink-0 rounded-2xl overflow-hidden border-2 border-blue-400 dark:border-sky-400/60 shadow-lg bg-blue-50 dark:bg-sky-500/10">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        <div className="space-y-1 min-w-0">
                          <span className="text-[9px] font-mono font-bold tracking-wider text-blue-600 dark:text-sky-400 uppercase">
                            OFFICIAL SPECIALIST
                          </span>
                          <h3 className="font-display text-[16px] sm:text-[17px] font-bold text-slate-900 dark:text-white leading-tight">
                            {member.name}
                          </h3>
                          <p className="font-mono text-[9.5px] font-bold text-blue-600 dark:text-sky-300">
                            {member.role}
                          </p>
                          <p className="text-[12px] sm:text-[13px] text-slate-600 dark:text-gray-300 font-sans leading-relaxed pt-0.5">
                            {member.bio}
                          </p>
                        </div>
                      </div>

                      {/* Competencies */}
                      <div className="pt-2 border-t border-slate-200 dark:border-sky-400/20 grid grid-cols-2 gap-1.5 text-[10px] font-mono text-slate-700 dark:text-gray-200 font-semibold">
                        {member.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-1 truncate">
                            <span className="text-blue-600 dark:text-sky-400">•</span>
                            <span className="truncate">{spec}</span>
                          </div>
                        ))}
                      </div>

                      {/* Official Verification & Signature Row */}
                      <div className="pt-2 border-t border-slate-200 dark:border-sky-400/20 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-gray-400">
                        <span>VERIFIED ITLC INDIA</span>
                        <span className="font-serif italic text-xs font-bold text-blue-600 dark:text-sky-400">
                          {member.signature}
                        </span>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Circular Seal (Physically bonded directly to bottom center of the letter) */}
                <div className="relative z-40 -mt-7 flex justify-center w-full">
                  <button
                    onClick={() => toggleCard(idx)}
                    aria-label={`Toggle ${member.name} profile`}
                    className="w-20 h-20 sm:w-[84px] sm:h-[84px] rounded-full bg-gradient-to-br from-blue-600 via-sky-500 to-blue-800 dark:from-[#1E3A8A] dark:via-[#0284C7] dark:to-[#081533] border-2 border-white dark:border-sky-300 shadow-2xl shadow-blue-500/40 dark:shadow-sky-400/50 flex flex-col items-center justify-center p-1.5 text-center cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 ring-2 ring-blue-400/30"
                  >
                    <span className="text-[10px] sm:text-[10.5px] font-mono font-black text-white leading-none uppercase tracking-wider drop-shadow-md">
                      {member.badgeTitle}
                    </span>
                    <span className="text-[9.5px] sm:text-[10px] font-mono font-black text-sky-100 leading-tight uppercase tracking-wider drop-shadow-md mt-0.5">
                      {member.badgeSub}
                    </span>
                    <div className="mt-1 flex items-center gap-1 text-[8px] font-mono font-black text-white bg-black/40 dark:bg-black/50 px-2 py-0.5 rounded-full border border-white/30 shadow-inner">
                      <span>{isOpen ? "▲ WRAP" : "▼ TAP OPEN"}</span>
                    </div>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 5. CYLINDRICAL CONSULTATION CARD (LAST SECTION) */}
      <div className="relative overflow-hidden rounded-full sm:rounded-full py-8 sm:py-10 px-6 sm:px-14 bg-white/95 dark:bg-gradient-to-r dark:from-[#0E204A] dark:via-[#09183B] dark:to-[#050E24] border border-blue-300 dark:border-sky-400/40 ring-1 ring-blue-100 dark:ring-sky-300/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <BorderBeam size={320} duration={10} colorFrom="#38BDF8" colorTo="#2563EB" />

        <div className="space-y-2 max-w-2xl">
          <h3 className="font-display text-[20px] sm:text-[24px] font-bold text-slate-900 dark:text-white tracking-tight">
            Need Professional Engineering Consultation?
          </h3>
          <p className="text-[13px] sm:text-[14px] text-slate-600 dark:text-gray-300 font-sans leading-relaxed">
            Schedule a call with our registered AIA architects and OSHA coordinators to review your designs.
          </p>
        </div>

        <div className="shrink-0">
          <MagneticButton
            onClick={onInquiryClick}
            variant="primary"
            className="py-3 px-8 text-xs font-semibold rounded-full"
          >
            <span>Contact Our Engineers</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </MagneticButton>
        </div>
      </div>

    </div>
  );
};
