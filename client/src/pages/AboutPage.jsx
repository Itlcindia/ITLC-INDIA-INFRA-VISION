import React, { useState, useEffect } from "react";
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
  ChevronRight,
  ArrowUpRight,
  ExternalLink,
  X,
  Award
} from "lucide-react";
import { Card3D } from "../components/ui/Card3D";
import { BorderBeam } from "../components/ui/BorderBeam";
import { MagneticButton } from "../components/ui/MagneticButton";
import { soundManager } from "../lib/sound";
import { useCMS } from "../context/CMSContext";

// Intelligent regex-driven editorial bio bullet lines formatter with dark blue font highlights
const HIGHLIGHT_REGEX_STR = "(\\b\\d+\\+?\\s*years?(?:\\s+of)?(?:\\s+(?:industry\\s+)?experience)?\\b|reputed brands like|reputed brands\\b|(?:Sleek|HomeTown|EVOK|Hindware|Hettich|Hafele|Tata|TATA Tiscon|L&T|DLF|Godrej|Kohler|Jaquar|Saint-Gobain|Asian Paints|Ultratech|SPA Delhi|IIT Roorkee|Autodesk|INFRA VISION|ITLC India|ITLC)\\b|skilled in\\b|space planning|furniture design|material selection|specializing in\\b|residential|commercial|office interiors|quality|craftsmanship|client satisfaction|Interior Designer|Principal Spatial Architect|Chief Structural & Civil Site Engineer|Senior MEP & 3D BIM Director|Civil Site Engineer|BIM Director)";

const SPLIT_HIGHLIGHT_REGEX = new RegExp(HIGHLIGHT_REGEX_STR, "gi");
const TEST_HIGHLIGHT_REGEX = new RegExp(`^${HIGHLIGHT_REGEX_STR}$`, "i");

const BRAND_NAMES_LIST = [
  "Sleek",
  "HomeTown",
  "EVOK",
  "Hindware",
  "Hettich",
  "Hafele",
  "Tata",
  "TATA Tiscon",
  "L&T",
  "DLF",
  "Godrej",
  "Kohler",
  "Jaquar",
  "Saint-Gobain",
  "Asian Paints",
  "Ultratech"
];

const BRAND_TEST_REGEX = new RegExp(`^(?:${BRAND_NAMES_LIST.map((b) => b.replace(/[-\\/\\^$*+?.()|[\\]{}]/g, "\\$&")).join("|")})$`, "i");

export const parseBioToBulletLines = (rawText) => {
  if (!rawText) return [];

  const text = String(rawText).trim();
  const rawParagraphs = text.split(/\n+/).map((p) => p.trim()).filter(Boolean);

  let lines = [];

  // If already entered as 5+ distinct lines (e.g. from Admin Line-by-Line Editor), preserve them directly
  if (rawParagraphs.length >= 5) {
    lines = rawParagraphs
      .map((p) => p.replace(/^\s*(?:[•\-\*]|\d+[\.\)])\s*/, "").trim())
      .filter((p) => {
        if (!p) return false;
        if (p.length < 50 && /^\d+\+?\s*years?(?:\s+of)?(?:\s+industry)?(?:\s+experience)?$/i.test(p)) {
          return false;
        }
        return true;
      });
  } else {
    for (const para of rawParagraphs) {
      // Strip explicit bullet indicators (- , • , * , 1. , 1) ) but preserve numbers like "23+ Years"
      const cleanPara = para.replace(/^\s*(?:[•\-\*]|\d+[\.\)])\s*/, "").trim();
      if (!cleanPara) continue;

      // Filter out standalone experience headlines (e.g., "23+ Years of Industry Experience")
      // because the modal already displays "TOTAL INDUSTRY EXPERIENCE: 23+ Years Exp" in a dedicated card right above
      if (cleanPara.length < 50 && /^\d+\+?\s*years?(?:\s+of)?(?:\s+industry)?(?:\s+experience)?$/i.test(cleanPara)) {
        continue;
      }

      // Split sentences using regex (avoiding abbreviations like Ar., Er., Dr., etc.)
      const sentences = cleanPara
        .split(/(?<!\b(?:Ar|Er|Dr|Mr|Mrs|Ms|vs|e\.g|i\.e))\.\s+|;\s+/g)
        .map((s) => s.trim().replace(/\.$/, ""))
        .filter(Boolean);

      for (const sent of sentences) {
        // Split on major clause boundaries
        const clauseSplitRegex = /(?=,\s*(?:specializing in|skilled in|experienced in|with a strong focus on|with a focus on|spearheading|pioneering|combining|enforcing|under (?:his|her|their)|guaranteeing|certified as)\b)/gi;

        const subClauses = sent
          .split(clauseSplitRegex)
          .map((c) => c.replace(/^,\s*/, "").trim())
          .filter(Boolean);

        lines.push(...subClauses);
      }
    }
  }

  // Capitalize first character of each line
  lines = lines
    .map((line) => {
      const l = line.trim();
      if (!l) return "";
      return l.charAt(0).toUpperCase() + l.slice(1);
    })
    .filter(Boolean);

  // If candidate lines are fewer than 5, decompose long lines (> 60 chars) at comma boundaries
  if (lines.length < 5) {
    const splitLines = [];
    for (const line of lines) {
      if (lines.length + splitLines.length < 5 && line.length > 60 && line.includes(",")) {
        const commaIdx = line.indexOf(",", 25);
        if (commaIdx !== -1 && commaIdx < line.length - 15) {
          const p1 = line.slice(0, commaIdx).trim();
          let p2 = line.slice(commaIdx + 1).trim();
          p2 = p2.charAt(0).toUpperCase() + p2.slice(1);
          splitLines.push(p1, p2);
          continue;
        }
      }
      splitLines.push(line);
    }
    lines = splitLines;
  }

  // Guarantee minimum 5 distinct, high-impact bullet lines for any team member
  const fallbackPillars = [
    "Over two decades of verified industry leadership and high-precision execution.",
    "Specialized in residential, commercial, and luxury turnkey architectural styling.",
    "Skilled in space planning, interior drafting, and premium finish coordination.",
    "Extensive collaboration with tier-1 reputed brands and certified material suppliers.",
    "Committed to millimeter-perfect craftsmanship, site safety, and client satisfaction."
  ];

  while (lines.length < 5) {
    lines.push(fallbackPillars[lines.length]);
  }

  return lines;
};

const renderHighlightedBioText = (text) => {
  if (!text) return null;

  const parts = text.split(SPLIT_HIGHLIGHT_REGEX);

  return parts.map((part, idx) => {
    if (!part) return null;

    if (TEST_HIGHLIGHT_REGEX.test(part.trim())) {
      // Auto-capitalize reputed brand names in UPPERCASE (like EVOK)
      const isBrand = BRAND_TEST_REGEX.test(part.trim());
      const displayText = isBrand ? part.toUpperCase() : part;

      return (
        <span
          key={idx}
          className="font-bold text-blue-700 dark:text-sky-400"
        >
          {displayText}
        </span>
      );
    }

    return part;
  });
};

const formatBioWithHighlights = (rawText) => {
  const bulletLines = parseBioToBulletLines(rawText);

  return (
    <ul className="space-y-2.5">
      {bulletLines.map((line, lIdx) => (
        <li key={lIdx} className="flex items-start gap-2.5 text-left">
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-sky-400 shadow-[0_0_8px_#2563EB] shrink-0 mt-1.5" />
          <p className="flex-1 text-slate-700 dark:text-slate-200 text-xs sm:text-[13px] font-sans leading-relaxed text-left">
            {renderHighlightedBioText(line)}
          </p>
        </li>
      ))}
    </ul>
  );
};

export const AboutPage = ({ onInquiryClick }) => {
  const { team = [], aboutContent = {} } = useCMS();
  const [selectedMemberForModal, setSelectedMemberForModal] = useState(null);

  // Lock background scroll when modal drawer is open
  useEffect(() => {
    if (selectedMemberForModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMemberForModal]);

  const teamMembers = Array.isArray(team) ? team : [];

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
                {aboutContent?.heading || "Pioneering Premium Construction & Architecture"}
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-gray-200 leading-relaxed font-sans">
              <p>
                {aboutContent?.missionStatement || "For over 10 years, InfraVision by ITLC India Private Limited has stood at the intersection of aesthetic design and structural integrity. We treat every project not just as a building, but as a monument to precision engineering."}
              </p>
              <p>
                {aboutContent?.founderQuote || "Our collaborative team of architects, project managers, and expert builders ensure that each detail aligns with our client's vision. From ground breaking to key handover, our commitment to green practices, safety, and modern design stands unmatched."}
              </p>
            </div>

            {/* 3 Metric Stats (Exp, Projects, Quality Record) */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#08132D] border border-blue-400 dark:border-sky-400/60 text-center space-y-1 shadow-sm shadow-blue-500/10 dark:shadow-sky-400/20">
                <div className="font-display text-2xl sm:text-4xl font-extrabold text-blue-600 dark:text-sky-400">
                  {aboutContent?.foundingYear ? `${Math.max(1, new Date().getFullYear() - parseInt(aboutContent.foundingYear || "2012"))}+` : "10+"}
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-slate-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                  Years Exp
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#08132D] border border-blue-400 dark:border-sky-400/60 text-center space-y-1 shadow-sm shadow-blue-500/10 dark:shadow-sky-400/20">
                <div className="font-display text-2xl sm:text-4xl font-extrabold text-blue-600 dark:text-sky-400">
                  {aboutContent?.completedVillas || "120+"}
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-slate-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                  Projects
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#08132D] border border-blue-400 dark:border-sky-400/60 text-center space-y-1 shadow-sm shadow-blue-500/10 dark:shadow-sky-400/20">
                <div className="font-display text-2xl sm:text-4xl font-extrabold text-blue-600 dark:text-sky-400">
                  {aboutContent?.onTimeRecord || "100%"}
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-slate-700 dark:text-gray-300 font-semibold uppercase tracking-wider">
                  Quality Rate
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
              className="relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-sky-400/40 shadow-2xl group aspect-[4/3] w-full bg-[#07132F]"
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

      {/* 4. ELITE ENGINEERING & DESIGN LEADERSHIP (MODERN EDITORIAL SHOWCASE) */}
      <div id="my-team" className="space-y-8 scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 dark:bg-sky-400/10 border border-blue-400/30 text-blue-600 dark:text-sky-300 text-xs font-mono font-semibold">
              <Users className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400" />
              <span>LEADERSHIP & ARCHITECTURAL CADRE</span>
            </div>
            <h2 className="font-display text-[26px] sm:text-[32px] font-bold tracking-tight text-slate-900 dark:text-white">
              Architects of Legacy, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500 dark:from-sky-400 dark:via-blue-400 dark:to-cyan-300">Masters of Civil Execution</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 font-sans max-w-2xl">
              A multidisciplinary leadership team bridging architectural imagination with IS-456 structural durability. Tap "View Dossier" to explore each specialist's full background.
            </p>
          </div>
        </div>

        {/* Editorial Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 items-stretch">
          {teamMembers.length === 0 ? (
            <div className="col-span-full w-full text-center py-14 px-6 rounded-3xl bg-blue-50/50 dark:bg-sky-950/20 border border-dashed border-blue-300 dark:border-sky-500/30">
              <Users className="w-10 h-10 text-blue-500 dark:text-sky-400 mx-auto mb-2 opacity-70" />
              <p className="font-mono text-sm text-slate-700 dark:text-slate-300 font-semibold">
                No team members currently active in the leadership roster.
              </p>
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400 mt-1">
                Add specialists or engineers from the Admin Control Center (MY TEAM).
              </p>
            </div>
          ) : (
            teamMembers.map((member, idx) => {
              const memberImg = member.photo || member.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop";
              const roleText = member.role || "Lead Specialist";
              const qualText = member.qualification || member.credentials || "B.Tech Civil";
              const expText = member.experience || "10+ Years Exp";
              const tagText = member.tag || qualText || "IS-456 STRUCTURAL LEAD";

              const specsList = Array.isArray(member.specs) && member.specs.length > 0
                ? member.specs
                : (qualText 
                    ? qualText.split(",").map(s => s.trim()).filter(Boolean)
                    : ["Certified Lead", "Site Supervision", "Grade-A Execution"]);

              return (
                <div
                  key={member.id || idx}
                  className="group relative rounded-3xl bg-white/95 dark:bg-gradient-to-b dark:from-[#0B1A3C] dark:via-[#07132F] dark:to-[#040C20] border border-slate-200 dark:border-sky-400/25 hover:border-sky-400/60 dark:hover:border-sky-400/80 shadow-xl hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500 flex flex-col justify-between overflow-hidden p-1.5 sm:p-2"
                >
                  {/* Nested Image Frame (Expanded Width/Height with Ultra-Slim Hairline Gap) */}
                  <div className="relative h-[290px] sm:h-[320px] w-full rounded-[20px] overflow-hidden bg-slate-900 border border-slate-200/90 dark:border-sky-400/40 shadow-md ring-1 ring-black/5 dark:ring-sky-300/10 shrink-0">
                    <img
                      src={memberImg}
                      alt={member.name}
                      className="w-full h-full object-contain p-2 pb-16 pt-9 filter contrast-[1.05] group-hover:scale-105 transition-all duration-700 ease-out"
                      loading="lazy"
                    />
                    
                    {/* Dark gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040C20]/90 via-[#040C20]/20 to-transparent pointer-events-none" />

                    {/* Top floating pill tags */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-sky-300 font-mono text-[9.5px] font-bold tracking-wider uppercase truncate">
                        {tagText}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-600/80 backdrop-blur-md border border-sky-300/30 text-white font-mono text-[9.5px] font-bold shrink-0">
                        {expText}
                      </span>
                    </div>

                    {/* Bottom identity overlaid on photo */}
                    <div className="absolute bottom-3 inset-x-3.5 z-10 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                        <span className="text-[9px] font-mono font-bold tracking-widest text-sky-300 uppercase">
                          OFFICIAL SPECIALIST
                        </span>
                      </div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight leading-tight group-hover:text-sky-300 transition-colors">
                        {member.name}
                      </h3>
                      <p className="font-mono text-[11px] text-slate-300 font-medium truncate">
                        {roleText}
                      </p>
                    </div>
                  </div>

                  {/* Lower Excerpt & View More Trigger */}
                  <div className="pt-3.5 pb-1.5 px-2.5 space-y-3 flex flex-col justify-between flex-1">
                    {/* Short Bio preview */}
                    <p className="text-[11.5px] sm:text-xs text-slate-600 dark:text-gray-300 font-sans line-clamp-2 leading-relaxed text-justify [text-justify:inter-word]">
                      {member.bio || member.viewMoreText || "Key contributor to INFRA VISION's architectural engineering leadership."}
                    </p>

                    {/* Specialization Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {specsList.slice(0, 3).map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-sky-500/10 border border-blue-200/60 dark:border-sky-400/20 text-blue-700 dark:text-sky-300 font-mono text-[9.5px] font-semibold truncate"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* "View Dossier & Bio" Button */}
                    <div className="pt-2 border-t border-slate-100 dark:border-sky-400/15">
                      <button
                        onClick={() => {
                          soundManager?.playHapticClick?.(600);
                          setSelectedMemberForModal(member);
                        }}
                        className="w-full py-2 px-3.5 rounded-xl bg-slate-100 hover:bg-blue-600 dark:bg-sky-500/10 dark:hover:bg-gradient-to-r dark:hover:from-blue-600 dark:hover:to-sky-500 border border-slate-200 dark:border-sky-400/30 text-slate-800 dark:text-sky-300 hover:text-white dark:hover:text-white font-mono text-[11px] font-bold tracking-wider uppercase flex items-center justify-between transition-all duration-300 group/btn cursor-pointer shadow-sm hover:shadow-lg hover:shadow-sky-500/25"
                      >
                        <span>View Dossier & Bio</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 dark:text-sky-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 4.1 VIEW MORE / FULL DOSSIER MODAL DRAWER */}
      {selectedMemberForModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md"
          onClick={() => setSelectedMemberForModal(null)}
          data-lenis-prevent="true"
        >
          <div
            className="relative w-full max-w-xl bg-white dark:bg-[#07132F] border-2 border-sky-400/50 rounded-2xl sm:rounded-3xl shadow-2xl shadow-sky-500/20 overflow-hidden flex flex-col max-h-[78vh] sm:max-h-[75vh] text-slate-900 dark:text-white"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
          >
            {/* Modal Header */}
            <div className="px-5 py-3 border-b border-slate-200 dark:border-sky-400/20 flex items-center justify-between bg-slate-50 dark:bg-black/20 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-sky-400 animate-ping" />
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-sky-400 uppercase tracking-wider">
                  OFFICIAL LEADERSHIP DOSSIER
                </span>
              </div>
              <button
                onClick={() => setSelectedMemberForModal(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-300 transition-colors cursor-pointer"
                aria-label="Close dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div 
              className="p-4 sm:p-6 space-y-4 overflow-y-auto overscroll-contain no-scrollbar"
              data-lenis-prevent="true"
            >
              {/* Identity Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 border-b border-slate-200 dark:border-sky-400/20 text-center sm:text-left">
                <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden border-2 border-sky-400/60 shadow-xl bg-slate-900 shrink-0 flex items-center justify-center p-1.5">
                  <img
                    src={selectedMemberForModal.photo || selectedMemberForModal.image}
                    alt={selectedMemberForModal.name}
                    className="w-full h-full object-contain filter contrast-[1.05]"
                  />
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-blue-600 dark:text-sky-400 uppercase">
                    INFRA VISION ARCHITECTURAL ROSTER
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedMemberForModal.name}
                  </h3>
                  <p className="font-mono text-xs text-sky-600 dark:text-sky-300 font-bold">
                    {selectedMemberForModal.role}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-0.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-sky-300 font-mono text-[11px] font-bold border border-blue-400/30">
                      {selectedMemberForModal.qualification || selectedMemberForModal.credentials || "B.Tech Civil"}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-sky-300 font-mono text-[11px] font-bold border border-blue-400/30">
                      {selectedMemberForModal.experience || "10+ Years Exp"}
                    </span>
                    {selectedMemberForModal.linkedin && (
                      <a
                        href={selectedMemberForModal.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-0.5 rounded-full bg-[#0A66C2]/15 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white dark:text-sky-300 dark:hover:text-white font-mono text-[11px] font-bold border border-[#0A66C2]/30 flex items-center gap-1.5 transition-all"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Highlighted Experience & Organization Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/15 via-sky-500/10 to-transparent border border-sky-400/40 shadow-sm flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-sky-400/50 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-mono text-[9.5px] uppercase font-bold text-sky-600 dark:text-sky-300 tracking-wider">
                      TOTAL INDUSTRY EXPERIENCE
                    </span>
                    <span className="font-display text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate block">
                      {selectedMemberForModal.experience || "23+ Years Exp"}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/15 via-blue-500/10 to-transparent border border-blue-400/40 shadow-sm flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/20 border border-blue-400/50 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-blue-500 dark:text-sky-300" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-mono text-[9.5px] uppercase font-bold text-blue-600 dark:text-sky-300 tracking-wider">
                      COMPANY & AFFILIATION
                    </span>
                    <span className="font-display text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate block">
                      {selectedMemberForModal.company || selectedMemberForModal.previous_companies || "ITLC INDIA PVT LTD"}
                    </span>
                  </div>
                </div>
              </div>

              {/* View More Full Narrative with Dynamic Editorial Bullet Lines */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono text-xs font-bold text-slate-500 dark:text-sky-400 uppercase tracking-widest">
                    EXECUTIVE PROFILE & CREDENTIALS
                  </h4>
                  <span className="font-mono text-[10px] text-blue-700 dark:text-sky-400 bg-blue-500/10 border border-blue-400/30 px-2 py-0.5 rounded-full font-bold">
                    VERIFIED BULLET RECORD
                  </span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-sky-400/20 text-slate-700 dark:text-slate-200">
                  {formatBioWithHighlights(selectedMemberForModal.viewMoreText || selectedMemberForModal.bio || "Key contributor to INFRA VISION's architectural engineering leadership.")}
                </div>
              </div>

              {/* Specializations & Certified Skills */}
              <div className="space-y-1.5">
                <h4 className="font-mono text-xs font-bold text-slate-500 dark:text-sky-400 uppercase tracking-widest">
                  CORE COMPETENCIES & CERTIFIED SKILLS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(Array.isArray(selectedMemberForModal.specs) && selectedMemberForModal.specs.length > 0
                    ? selectedMemberForModal.specs
                    : (selectedMemberForModal.qualification || selectedMemberForModal.credentials || "Grade-A Execution, Structural Supervision, Design Quality")
                        .split(",")
                        .map(s => s.trim())
                        .filter(Boolean)
                  ).map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center gap-2 p-2 rounded-xl bg-blue-50/60 dark:bg-sky-500/10 border border-blue-200/60 dark:border-sky-400/20 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification Seal */}
              <div className="pt-3 border-t border-slate-200 dark:border-sky-400/20 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span>VERIFIED ITLC INDIA INFRA VISION</span>
                <span className="font-serif italic text-blue-600 dark:text-sky-400">
                  {selectedMemberForModal.name} ~
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-slate-200 dark:border-sky-400/20 flex items-center justify-between bg-slate-50 dark:bg-black/20 shrink-0">
              <button
                onClick={() => setSelectedMemberForModal(null)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white font-mono text-xs font-bold cursor-pointer hover:bg-slate-300 dark:hover:bg-white/20 transition-all"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedMemberForModal(null);
                  onInquiryClick();
                }}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-mono text-xs font-bold cursor-pointer shadow-lg shadow-sky-500/25 flex items-center gap-1.5 transition-all"
              >
                <span>Consult With Specialist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

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
