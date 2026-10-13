import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Compass, MapPin, Mail, Phone, 
  Copy, Check, ArrowUpRight, ShieldCheck, Home, Key, Palette, 
  HardHat, Building2, ExternalLink, Globe, Newspaper 
} from "lucide-react";
import { soundManager } from "../../lib/sound";
import { useCMS } from "../../context/CMSContext";

export const Footer = ({ onRouteChange }) => {
  const { homeContent, services: cmsServices = [] } = useCMS();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const officialEmail = homeContent?.officialEmail || "info.itlcindia@gmail.com";
  const primaryPhone = homeContent?.phonePrimary || "(+91) 953 234 1000";
  const officeAddress = homeContent?.corporateAddress || "G1/0049, Olive Wood Villa, Golf City, Lucknow, Uttar Pradesh – 226030";

  const handleCopyEmail = () => {
    soundManager.playSuccessChime();
    navigator.clipboard.writeText(officialEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleNav = (route) => {
    soundManager.playHapticClick(600);
    if (onRouteChange) {
      onRouteChange(route);
    }
  };

  // Dynamic Architectural Services from CMS
  const services = Array.isArray(cmsServices) && cmsServices.length > 0
    ? cmsServices.slice(0, 4).map((s) => ({
        id: s.id,
        title: s.title,
        icon: s.id === "residential" ? Home : s.id === "commercial" ? Building2 : s.id === "renovation" ? HardHat : Compass,
        desc: s.tagline || s.paragraph || "Turnkey structural and architectural execution.",
        route: "services",
      }))
    : [
        { 
          id: "residential", 
          title: "Residential Construction", 
          icon: Home, 
          desc: "Turnkey luxury villas & estates engineered from ground to key.",
          route: "services"
        },
        { 
          id: "commercial", 
          title: "Commercial Construction", 
          icon: Building2, 
          desc: "Grade-A corporate hubs & retail architectural landmarks.",
          route: "services"
        },
        { 
          id: "renovation", 
          title: "Renovating and Remodelling", 
          icon: HardHat, 
          desc: "Surgical retrofitting, structural rebirth & interior overhauls.",
          route: "services"
        },
        { 
          id: "planning", 
          title: "Architectural & Space Planning", 
          icon: Compass, 
          desc: "3D BIM clash-detection, solar-path & spatial blueprints.",
          route: "services"
        },
      ];

  const footerNavLinks = [
    { id: "home", label: "HOME" },
    { id: "services", label: "SERVICES" },
    { id: "projects", label: "PROJECTS" },
    { id: "interior", label: "INTERIOR" },
    { id: "about", label: "ABOUT" },
    { id: "contact", label: "CONTACT" },
    { id: "my-team", label: "MY TEAM" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0D1D44] via-[#08122B] to-[#030714] text-gray-200 pt-11 pb-7 sm:pt-12 sm:pb-7 overflow-hidden border-t border-sky-400/40">
      {/* 1. Continuous Glowing Laser Horizon Beam */}
      <div className="absolute top-0 left-0 right-0 laser-horizon" />

      {/* Subtle CAD Grid background */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Top Section: Brand + Services Bento Grid */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-[52px]">
          
          {/* Block 1: Brand & Social Telemetry Hub */}
          <div className="w-full lg:w-[165px] xl:w-[170px] shrink-0 flex flex-col items-center justify-center text-center space-y-3.5 py-1 lg:-translate-x-7 xl:-translate-x-9">
            <button
              onClick={() => handleNav("home")}
              className="flex flex-col items-center text-center group cursor-pointer focus:outline-none shrink-0"
            >
              <img
                src="/images/company_logo.png"
                alt="ITLC India Pvt Ltd"
                className="h-14 sm:h-16 w-auto object-contain mx-auto -translate-y-2 sm:-translate-y-2.5 mb-1 group-hover:-translate-y-3 group-hover:scale-105 transition-all"
              />
              <span className="font-display text-[12px] sm:text-[13px] font-bold tracking-widest text-white uppercase block mb-1 leading-none">
                ITLC INDIA PVT LTD
              </span>
              <div className="relative inline-block pb-1.5">
                <span className="font-display text-xl sm:text-2xl font-black tracking-wider leading-none block">
                  <span className="text-blue-500">INFRA</span>
                  <span className="text-white">VISION</span>
                </span>
                {/* Two-tone underline (left white, right blue) */}
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] flex rounded-full overflow-hidden">
                  <div className="w-1/2 bg-white" />
                  <div className="w-1/2 bg-blue-500" />
                </div>
              </div>
            </button>

            {/* Social Channel Tiles */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                title="Instagram"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-slate-900/80 border border-white/10 text-white hover:text-sky-400 hover:border-sky-400/60 hover:bg-slate-800 transition-all hover:scale-110 shadow-lg"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                title="Facebook"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-slate-900/80 border border-white/10 text-white hover:text-blue-400 hover:border-blue-400/60 hover:bg-slate-800 transition-all hover:scale-110 shadow-lg"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                title="YouTube"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-slate-900/80 border border-white/10 text-white hover:text-red-500 hover:border-red-500/60 hover:bg-slate-800 transition-all hover:scale-110 shadow-lg"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
            </div>
          </div>

          {/* Block 2: 4 Core Architectural Services + HQ Operations Badge Below */}
          <div className="w-full lg:w-[460px] xl:w-[490px] shrink-0 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[13px] sm:text-[15px] font-bold tracking-wider uppercase text-white">
                  CORE ARCHITECTURAL SERVICES
                </span>
                <button 
                  onClick={() => handleNav("services")}
                  className="text-[11px] font-mono font-semibold text-sky-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>VIEW ALL</span>
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>

              {/* Original Compact 2x2 Services Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[52px] gap-y-2 sm:gap-y-2.5">
                {services.map((srv) => {
                  const IconComponent = srv.icon;
                  return (
                    <button
                      key={srv.id}
                      onClick={() => handleNav(srv.route)}
                      className="w-full text-left p-2.5 rounded-xl bg-gradient-to-b from-[#0F224D] to-[#091533] border border-sky-400/30 hover:border-sky-400/70 hover:from-[#142D66] hover:to-[#0C1B3E] shadow-xl shadow-black/80 ring-1 ring-sky-300/15 transition-all duration-300 group cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <div className="p-1 rounded-lg bg-sky-500/15 text-sky-400 group-hover:scale-110 group-hover:bg-sky-400/30 transition-all shrink-0">
                          <IconComponent className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors truncate">
                          {srv.title}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-300 leading-tight">
                        {srv.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Operations Indicator (Positioned directly under the 4 services cards, aligned to bottom of hotline card) */}
            <div className="mt-3.5 sm:mt-auto p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between font-mono text-[11px] px-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span className="text-emerald-400 font-bold">● HQ OPERATIONS ACTIVE</span>
              </div>
              <span className="text-gray-400 text-[9.5px]">COMMISSIONS OPEN IN LUCKNOW</span>
            </div>
          </div>

          {/* Block 3: Direct Contact Information */}
          <div className="w-full lg:w-[260px] xl:w-[275px] shrink-0 flex flex-col justify-between lg:translate-x-7 xl:translate-x-9">
            <span className="font-mono text-[13px] sm:text-[15px] font-bold tracking-wider uppercase text-white block mb-2">
              HEADQUARTERS & CONTACT
            </span>

            <div className="space-y-2 text-xs flex-1 flex flex-col justify-between">
              {/* Address */}
              <div 
                onClick={() => handleNav("contact")}
                className="p-2.5 rounded-xl bg-gradient-to-b from-[#0F224D] to-[#091533] border border-sky-400/30 hover:border-sky-400/60 shadow-xl shadow-black/80 ring-1 ring-sky-300/15 space-y-0.5 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-sky-400 font-mono text-[10px] font-bold">
                  <MapPin className="h-3 w-3" />
                  <span>PRINCIPAL OFFICE</span>
                </div>
                <p className="text-gray-200 leading-relaxed font-sans text-[11px] group-hover:text-white transition-colors">
                  {officeAddress}
                </p>
              </div>

              {/* Email with 1-Click Copy */}
              <button
                onClick={handleCopyEmail}
                className="w-full text-left p-2.5 rounded-xl bg-gradient-to-b from-[#0F224D] to-[#091533] border border-sky-400/30 hover:border-sky-400/70 shadow-xl shadow-black/80 ring-1 ring-sky-300/15 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="space-y-0.5">
                  <div className="text-[9px] font-mono text-gray-300">OFFICIAL EMAIL</div>
                  <div className="text-xs font-semibold text-white group-hover:text-sky-300 transition-colors truncate">
                    {officialEmail}
                  </div>
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-gray-300 group-hover:text-white shrink-0">
                  {copiedEmail ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                </div>
              </button>

              {/* Phone Dial Trigger */}
              <a
                href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
                className="block p-2.5 rounded-xl bg-gradient-to-b from-[#0F224D] to-[#091533] border border-sky-400/30 hover:border-emerald-400/70 shadow-xl shadow-black/80 ring-1 ring-sky-300/15 transition-colors group cursor-pointer"
              >
                <div className="text-[9px] font-mono text-gray-300">DIRECT HOTLINE</div>
                <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5 mt-0.5">
                  <Phone className="h-3 w-3 text-emerald-400" />
                  <span>{primaryPhone}</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Quick Links & Legal Hub (Single Row with Optimized Spacing) */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap lg:flex-nowrap items-center justify-between gap-2.5 sm:gap-3 text-xs text-gray-400">
          {/* Internal Routes (Option B: Kinetic Laser Underline & Arrow Slide) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 lg:gap-3 font-mono text-[10.5px] sm:text-[11px]">
            {footerNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="group relative py-0.5 text-gray-300 hover:text-white transition-colors flex items-center gap-0.5 cursor-pointer"
              >
                <span className="tracking-wider font-semibold">{link.label}</span>
                <span className="text-sky-400 text-[9px] opacity-0 -translate-x-1 translate-y-0.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200">
                  ↗
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-sky-400 to-blue-500 group-hover:w-full transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              </button>
            ))}

            <span className="text-white/20 hidden sm:inline">|</span>

            <button
              onClick={() => handleNav("site-images")}
              className="group relative py-0.5 text-sky-400 hover:text-white transition-colors flex items-center gap-0.5 cursor-pointer"
            >
              <span className="tracking-wider font-semibold">SITE IMAGES</span>
              <span className="text-sky-300 text-[9px] opacity-0 -translate-x-1 translate-y-0.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200">
                ↗
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-sky-400 to-blue-500 group-hover:w-full transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            </button>

            <button
              onClick={() => handleNav("news")}
              className="group relative py-0.5 text-sky-400 hover:text-white transition-colors flex items-center gap-0.5 cursor-pointer"
            >
              <span className="tracking-wider font-semibold">NEWS & BLOGS</span>
              <span className="text-sky-300 text-[9px] opacity-0 -translate-x-1 translate-y-0.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200">
                ↗
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-sky-400 to-blue-500 group-hover:w-full transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            </button>

            <span className="text-white/20 hidden sm:inline">|</span>

            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="group relative py-0.5 flex items-center gap-1 hover:text-white transition-colors"
            >
              <Globe className="h-3 w-3 text-gray-400 group-hover:text-sky-400 transition-colors" />
              <span className="tracking-wider font-semibold">SITEMAP</span>
            </a>
          </div>

          {/* Legal Links (Internal Routes to LegalPage) */}
          <div className="shrink-0 flex items-center gap-2 sm:gap-2.5 text-[10px] font-mono whitespace-nowrap">
            <button
              onClick={() => handleNav("privacy-policy")}
              className="hover:text-sky-400 transition-colors cursor-pointer focus:outline-none"
            >
              Privacy Policy
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => handleNav("terms-of-service")}
              className="hover:text-sky-400 transition-colors cursor-pointer focus:outline-none"
            >
              Terms of Service
            </button>
            <span className="text-white/20">•</span>
            <button
              onClick={() => handleNav("disclaimer")}
              className="hover:text-sky-400 transition-colors cursor-pointer focus:outline-none"
            >
              Disclaimer
            </button>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-4 border-t border-white/10 text-center text-[11px] text-gray-400 font-mono">
          © 2015-2026 InfraVision by ITLC India Pvt Ltd. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
