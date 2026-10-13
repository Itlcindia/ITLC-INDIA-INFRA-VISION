import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Lock, 
  Cpu, 
  Database, 
  CheckCircle2, 
  ArrowLeft, 
  Scale, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { BorderBeam } from "../components/ui/BorderBeam";
import { soundManager } from "../lib/sound";

export const LegalPage = ({ activeTab = "privacy-policy", onTabChange, onNavigateBack }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  const handleTabClick = (tabId) => {
    soundManager.playHapticClick(600);
    setCurrentTab(tabId);
    if (onTabChange) onTabChange(tabId);
  };

  const tabs = [
    {
      id: "privacy-policy",
      label: "Privacy Policy",
      pill: "DATA PRIVACY & COMPLIANCE",
      icon: ShieldCheck,
      title: "Privacy Policy",
      subtitle: "Comprehensive disclosure on client telemetry, enquiry records, and data protection standards.",
      updated: "July 14, 2026",
      sections: [
        {
          num: "01",
          heading: "1. Information We Collect",
          icon: Database,
          text: "We collect personal information that you voluntarily provide to us when you fill out the contact or proposal forms on our website. This information may include your name, email address, phone number, and project details."
        },
        {
          num: "02",
          heading: "2. How We Use Your Information",
          icon: Cpu,
          text: "We use the collected information to respond to your inquiries, process your contracting proposals, improve website performance, and communicate with you about our project specifications."
        },
        {
          num: "03",
          heading: "3. Data Storage & Security",
          icon: Lock,
          text: "Your data is stored securely and is only accessible by authorized system administrators. We implement industry-standard security measures to prevent unauthorized data access, modification, or leakage."
        }
      ]
    },
    {
      id: "terms-of-service",
      label: "Terms of Service",
      pill: "TERMS & AGREEMENTS",
      icon: FileText,
      title: "Terms of Service",
      subtitle: "Operating guidelines, digital architectural rights, and binding client agreement protocols.",
      updated: "July 14, 2026",
      sections: [
        {
          num: "01",
          heading: "1. Agreement to Terms",
          icon: Scale,
          text: "By accessing or using the services provided by InfraVision and ITLC India Pvt Ltd, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services."
        },
        {
          num: "02",
          heading: "2. Intellectual Property",
          icon: ShieldCheck,
          text: "All website designs, structural models, text, graphics, logos, and digital architectural plans displayed on this website are the property of ITLC India Pvt Ltd and are protected under international copyright law."
        },
        {
          num: "03",
          heading: "3. Limitation of Liability",
          icon: AlertTriangle,
          text: "In no event shall ITLC India Pvt Ltd be liable for any direct, indirect, special, or consequential damages arising out of the use or inability to use the architectural assets or services described on this website."
        }
      ]
    },
    {
      id: "disclaimer",
      label: "Legal Disclaimer",
      pill: "DISCLAIMER NOTICE",
      icon: AlertTriangle,
      title: "Legal Disclaimer",
      subtitle: "Official notice regarding digital architectural representations, estimates, and external resources.",
      updated: "July 14, 2026",
      sections: [
        {
          num: "01",
          heading: "1. General Information Only",
          icon: FileText,
          text: "The content, images, graphics, and architectural details provided on the InfraVision website are intended for general information purposes only. They do not constitute binding contracting quotes or final structural designs."
        },
        {
          num: "02",
          heading: "2. Estimation Accuracy",
          icon: Cpu,
          text: "While we strive to keep estimating formulas and project timelines up to date, actual construction specs, raw material costs, and timeline limits may vary. Final terms are subject to the master service agreement."
        },
        {
          num: "03",
          heading: "3. External Links Disclaimer",
          icon: ExternalLink,
          text: "This website may contain links to external sites (such as Google Maps or partner portals). We are not responsible for the content, privacy policies, or practices of third-party platforms."
        }
      ]
    }
  ];

  const activeData = tabs.find((t) => t.id === currentTab) || tabs[0];

  return (
    <div className="min-h-screen bg-[#030714] text-white pt-28 sm:pt-36 pb-24 px-4 sm:px-6 relative overflow-hidden font-sans">
      
      {/* Background CAD Ambient Effects */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-sky-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto space-y-10 relative z-10">

        {/* Back Navigation & Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={onNavigateBack}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-sky-400 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>RETURN TO OVERVIEW</span>
          </button>
          
          <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
            <span>ITLC LEGAL</span>
            <ChevronRight className="h-3 w-3 text-white/30" />
            <span className="text-sky-400 font-semibold uppercase">{activeData.label}</span>
          </div>
        </div>

        {/* Header Hero Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 font-mono text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-sky-500/10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>{activeData.pill}</span>
          </motion.div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            {activeData.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
            {activeData.subtitle}
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 p-1.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md max-w-xl mx-auto shadow-2xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/30 scale-102"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-sky-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN RECTANGULAR CYLINDRICAL CARD (With 4 Corner Highlight Blue Accents & BorderBeam) */}
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl sm:rounded-[36px] p-8 sm:p-12 md:p-14 bg-gradient-to-b from-[#0F224D] via-[#0A183A] to-[#040A1A] border border-sky-400/40 ring-1 ring-sky-300/25 shadow-2xl shadow-black/90 group"
        >
          {/* Animated Glowing Laser Border Beam */}
          <BorderBeam size={340} duration={9} colorFrom="#38BDF8" colorTo="#2563EB" />

          {/* 4 HIGH-INTENSITY BLUE CORNER HIGHLIGHT ACCENTS (As requested by user) */}
          {/* Top-Left Corner Glow & Precision Bracket */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-sky-500/25 rounded-tl-[36px] blur-2xl pointer-events-none" />
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-sky-400 rounded-tl-lg pointer-events-none shadow-[0_0_12px_rgba(56,189,248,1)]" />
          
          {/* Top-Right Corner Glow & Precision Bracket */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/25 rounded-tr-[36px] blur-2xl pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-sky-400 rounded-tr-lg pointer-events-none shadow-[0_0_12px_rgba(56,189,248,1)]" />

          {/* Bottom-Left Corner Glow & Precision Bracket */}
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-500/25 rounded-bl-[36px] blur-2xl pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-sky-400 rounded-bl-lg pointer-events-none shadow-[0_0_12px_rgba(56,189,248,1)]" />

          {/* Bottom-Right Corner Glow & Precision Bracket */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/25 rounded-br-[36px] blur-2xl pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-sky-400 rounded-br-lg pointer-events-none shadow-[0_0_12px_rgba(56,189,248,1)]" />

          {/* Card Top Telemetry Bar */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-sky-400 tracking-widest uppercase">
                DOCUMENT IDENTIFIER • REF-2026-ITLC
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
                {activeData.title}
              </h2>
            </div>
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-gray-300 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-white font-semibold">Last Updated:</span>
              <span className="text-sky-300 font-bold">{activeData.updated}</span>
            </div>
          </div>

          {/* Content Sections Grid */}
          <div className="relative z-10 pt-8 space-y-6 sm:space-y-8">
            {activeData.sections.map((sec, idx) => {
              const SecIcon = sec.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-7 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-sky-400/20 hover:border-sky-400/60 shadow-lg shadow-black/50 transition-all space-y-3 group/section"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-400 group-hover/section:scale-110 transition-transform">
                        <SecIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover/section:text-sky-300 transition-colors">
                        {sec.heading}
                      </h3>
                    </div>
                    <span className="font-mono text-xs font-bold text-sky-400/60 group-hover/section:text-sky-400 transition-colors">
                      § {sec.num}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans pl-1 sm:pl-2">
                    {sec.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Legal Authority Stamp Footer */}
          <div className="relative z-10 mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>OFFICIAL INFRAVISION ARCHITECTURAL DOSSIER</span>
            </div>
            <span>ITLC INDIA PRIVATE LIMITED • LUCKNOW HQ</span>
          </div>

        </motion.div>

      </div>
    </div>
  );
};
