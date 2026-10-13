import React from "react";
import { motion } from "framer-motion";
import { 
  Wrench, ShieldCheck, Leaf, Building2, 
  CheckCircle2, ArrowRight, Shield 
} from "lucide-react";
import { Card3D } from "../ui/Card3D";
import { BorderBeam } from "../ui/BorderBeam";
import { MagneticButton } from "../ui/MagneticButton";

export const WhyChooseInfra = ({ onInquiryClick }) => {
  return (
    <section id="methodology" className="relative w-full py-20 bg-[#F8FAFC] dark:bg-[#050C1E] transition-colors duration-300">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <h2 className="font-display text-[26px] sm:text-[31px] font-bold tracking-tight text-slate-900 dark:text-white">
          Why Choose <span className="text-blue-600 dark:text-sky-400">Infra Vision</span>
        </h2>
        <p className="text-[13px] text-slate-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
          Our collaborative team of licensed structural engineers, architects, and master craftsmen ensures every single detail aligns with our client's vision. From ground breaking to key handover, our commitment to green practices, safety, and modern design stands unmatched.
        </p>
      </div>

      {/* TOP ROW: 3 Core Methodology Pillars (Exact Screenshot Content) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* Card 1: End-to-End Solutions */}
        <div className="relative group">
          <Card3D className="h-full bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border border-white/90 dark:border-sky-400/35 hover:border-blue-400/60 dark:hover:border-sky-400/60 ring-1 ring-blue-100 dark:ring-sky-300/20 shadow-xl shadow-blue-900/5 dark:shadow-2xl dark:shadow-black/85 p-7 sm:p-8 flex flex-col justify-between transition-colors text-center items-center">
            <BorderBeam size={180} duration={12} colorFrom="#38BDF8" colorTo="#2563EB" />
            <div className="space-y-4 flex flex-col items-center">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-sky-500/15 border border-blue-200 dark:border-sky-400/40 flex items-center justify-center text-blue-600 dark:text-sky-400 shadow-sm dark:shadow-lg dark:shadow-sky-500/15 group-hover:scale-110 transition-transform">
                <Wrench className="h-6 w-6 stroke-[2]" />
              </div>
              <h3 className="font-display text-[16px] sm:text-[17px] font-bold text-slate-900 dark:text-white tracking-wider">
                END-TO-END SOLUTIONS
              </h3>
              <p className="text-[12px] sm:text-[13px] text-slate-600 dark:text-gray-200 leading-relaxed max-w-xs">
                From initial architectural blueprints and zoning clearances to final handover structural compliance inspections.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-slate-200 dark:border-sky-400/20 w-full flex items-center justify-center gap-1.5 text-[10px] font-mono text-blue-600 dark:text-sky-400 font-bold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>SINGLE CONTRACT ACCOUNTABILITY</span>
            </div>
          </Card3D>
        </div>

        {/* Card 2: Safety Integrity */}
        <div className="relative group">
          <Card3D className="h-full bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border border-white/90 dark:border-sky-400/35 hover:border-blue-400/60 dark:hover:border-sky-400/60 ring-1 ring-blue-100 dark:ring-sky-300/20 shadow-xl shadow-blue-900/5 dark:shadow-2xl dark:shadow-black/85 p-7 sm:p-8 flex flex-col justify-between transition-colors text-center items-center">
            <div className="space-y-4 flex flex-col items-center">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-sky-500/15 border border-blue-200 dark:border-sky-400/40 flex items-center justify-center text-blue-600 dark:text-sky-400 shadow-sm dark:shadow-lg dark:shadow-sky-500/15 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6 stroke-[2]" />
              </div>
              <h3 className="font-display text-[16px] sm:text-[17px] font-bold text-slate-900 dark:text-white tracking-wider">
                SAFETY INTEGRITY
              </h3>
              <p className="text-[12px] sm:text-[13px] text-slate-600 dark:text-gray-200 leading-relaxed max-w-xs">
                Enforcing a zero-incident safety culture backed by certified OSHA-regulated audits and strict weekly site reviews.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-slate-200 dark:border-sky-400/20 w-full flex items-center justify-center gap-1.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>ZERO-INCIDENT COMPLIANCE</span>
            </div>
          </Card3D>
        </div>

        {/* Card 3: Sustainable Engineering */}
        <div className="relative group">
          <Card3D className="h-full bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border border-white/90 dark:border-sky-400/35 hover:border-blue-400/60 dark:hover:border-sky-400/60 ring-1 ring-blue-100 dark:ring-sky-300/20 shadow-xl shadow-blue-900/5 dark:shadow-2xl dark:shadow-black/85 p-7 sm:p-8 flex flex-col justify-between transition-colors text-center items-center">
            <div className="space-y-4 flex flex-col items-center">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-400/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm dark:shadow-lg dark:shadow-emerald-500/15 group-hover:scale-110 transition-transform">
                <Leaf className="h-6 w-6 stroke-[2]" />
              </div>
              <h3 className="font-display text-[16px] sm:text-[17px] font-bold text-slate-900 dark:text-white tracking-wider">
                SUSTAINABLE ENGINEERING
              </h3>
              <p className="text-[12px] sm:text-[13px] text-slate-600 dark:text-gray-200 leading-relaxed max-w-xs">
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

      {/* BOTTOM ROW: Large Asymmetric Card (Exact Screenshot Content & Layout) */}
      <div className="relative group">
        <Card3D className="bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:via-[#0C1B3E] dark:to-[#091533] border border-white/90 dark:border-sky-400/35 ring-1 ring-blue-100 dark:ring-sky-300/20 shadow-xl shadow-blue-900/5 dark:shadow-2xl dark:shadow-black/85 p-8 sm:p-10 rounded-3xl">
          <BorderBeam size={280} duration={14} colorFrom="#38BDF8" colorTo="#2563EB" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Sub-Section (Col Span 7) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-600/30 border border-blue-200 dark:border-sky-400/40 font-mono text-[10px] text-blue-700 dark:text-sky-300 font-bold uppercase tracking-wider">
                POWERED BY ITLC INDIA PVT LTD
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-500/20 border border-blue-200 dark:border-sky-400/40 text-blue-600 dark:text-sky-400">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-[20px] sm:text-[24px] font-bold text-slate-900 dark:text-white tracking-wide">
                    PREMIUM CONSTRUCTION & DESIGN SERVICES
                  </h3>
                </div>
                <p className="text-[13px] sm:text-[14px] text-slate-600 dark:text-gray-200 leading-relaxed max-w-xl">
                  InfraVision is powered by ITLC India Pvt. Ltd., delivering end-to-end expertise in modern building construction, luxury villas, modular kitchen systems, and premium interior architecture designed to elevate modern living.
                </p>
              </div>

              {/* 4 Official Compliance Checkmarks from Screenshot */}
              <div className="pt-3 border-t border-slate-200 dark:border-sky-400/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px] font-mono font-semibold text-slate-600 dark:text-gray-200">
                <div className="flex items-center gap-1.5 text-blue-700 dark:text-sky-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                  <span>INDUSTRY STANDARDS</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-700 dark:text-sky-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                  <span>QUALITY ENGINEERING</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-700 dark:text-sky-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                  <span>OSHA CERTIFIED</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-700 dark:text-sky-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                  <span>LEED COMPLIANT</span>
                </div>
              </div>
            </div>

            {/* Right Sub-Section: Dedicated Expert Support Card (Col Span 5) */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 dark:bg-[#0C1B3E] border border-blue-300 dark:border-sky-400/50 rounded-2xl p-6 sm:p-7 space-y-4 shadow-md shadow-blue-500/5 dark:shadow-xl dark:shadow-black/60">
                <h4 className="font-display text-[16px] sm:text-[17px] font-bold text-slate-900 dark:text-white tracking-wide">
                  DEDICATED EXPERT SUPPORT
                </h4>
                <p className="text-[12px] sm:text-[13px] text-slate-600 dark:text-gray-200 leading-relaxed font-sans">
                  Need assistance with your home construction plans, modular kitchen designs, or interior styling layout? Consult with our specialists today.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onInquiryClick}
                    className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 hover:from-blue-700 hover:to-sky-600 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all cursor-pointer group border border-blue-400/30"
                  >
                    <span>Consult Now</span>
                    <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </Card3D>
      </div>
      </div>

    </section>
  );
};
