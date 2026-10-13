import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, TrendingUp, Compass, CheckCircle2, Ruler } from "lucide-react";
import { Card3D } from "../ui/Card3D";
import { BorderBeam } from "../ui/BorderBeam";

export const BentoGrid = () => {
  return (
    <section className="relative w-full py-24 bg-[#050C1E]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-sky-400/30 font-mono text-xs text-sky-400 font-semibold tracking-wider">
          <span>PRECISION ARCHITECTURE METRICS</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Engineered Beyond <span className="text-sky-400">Ordinary Conventions</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          We deliver institutional structural integrity, bespoke civil precision, and turnkey architectural excellence designed for generations.
        </p>
      </div>

      {/* Asymmetric Bento Arrangement */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: The Massive Scale Hero Card (Col Span 2) */}
        <div className="md:col-span-2 relative group">
          <Card3D className="h-full bg-gradient-to-b from-[#0F224D] to-[#091533] border border-sky-400/35 hover:border-sky-400/60 ring-1 ring-sky-300/20 shadow-2xl shadow-black/85 p-8 sm:p-10 flex flex-col justify-between">
            <BorderBeam size={250} duration={10} colorFrom="#FFFFFF" colorTo="#38BDF8" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-sky-400 tracking-widest uppercase font-bold">
                  DELIVERY MILESTONES // LUCKNOW & NCR
                </span>
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="font-display text-5xl sm:text-7xl font-bold text-white tracking-tight">
                1.4M<span className="text-sky-400">+</span>
              </div>
              <div className="text-lg font-semibold text-gray-100">
                Square Feet of Ultra-Luxury Living Engineered & Delivered
              </div>
              <p className="text-sm text-gray-200 max-w-lg leading-relaxed">
                From Golf City Lucknow to prime urban corridors — every villa and estate is handed over with strict structural BIM compliance and zero-delay timeline commitments.
              </p>
            </div>

            <div className="pt-8 border-t border-sky-400/20 grid grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <div className="text-sky-400 font-bold text-base">100%</div>
                <div className="text-gray-300">On-Time Possession</div>
              </div>
              <div>
                <div className="text-blue-400 font-bold text-base">450+</div>
                <div className="text-gray-300">Luxury Homes Built</div>
              </div>
              <div>
                <div className="text-white font-bold text-base">0 Defect</div>
                <div className="text-gray-300">Audit Handover</div>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Card 2: Structural Integrity Shield (Col Span 1) */}
        <div className="relative group">
          <Card3D className="h-full bg-gradient-to-b from-[#0F224D] to-[#091533] border border-sky-400/35 hover:border-sky-400/60 ring-1 ring-sky-300/20 shadow-2xl shadow-black/85 p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-sky-500/15 border border-sky-400/40 flex items-center justify-center text-sky-400 shadow-lg shadow-sky-500/15">
                <ShieldCheck className="h-6 w-6 stroke-[2]" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                Engineered Structural <span className="text-sky-400">Integrity & Quality</span>
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed">
                FE 550D TMT rebar reinforcement, waterproof double-membrane tanking, and verified IS-456 structural standards compliance.
              </p>
            </div>

            <div className="pt-6 border-t border-sky-400/20 font-mono text-[11px] text-gray-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-sky-400" />
              <span>OFFICIALLY BONDED & CERTIFIED</span>
            </div>
          </Card3D>
        </div>

        {/* Card 3: Material Telemetry & Biophilic Finishes */}
        <div className="relative group">
          <Card3D className="h-full bg-gradient-to-b from-[#0F224D] to-[#091533] border border-sky-400/35 hover:border-sky-400/60 ring-1 ring-sky-300/20 shadow-2xl shadow-black/85 p-8 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-sky-500/15 border border-sky-400/40 flex items-center justify-center text-sky-400">
              <Ruler className="h-6 w-6 stroke-[2]" />
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              Bespoke Italian <span className="text-sky-400">Material Palettes</span>
            </h3>
            <p className="text-xs text-gray-200 leading-relaxed">
              Calacatta marble installations, acoustic double-glazed soundproof French windows, and architectural low-glare cove lighting suites.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-1 rounded bg-[#0C1B3E] text-gray-200 border border-sky-400/25">ITALIAN MARBLE</span>
              <span className="px-2 py-1 rounded bg-[#0C1B3E] text-gray-200 border border-sky-400/25">SMART HVAC</span>
              <span className="px-2 py-1 rounded bg-[#0C1B3E] text-gray-200 border border-sky-400/25">SOLAR READY</span>
            </div>
          </Card3D>
        </div>

        {/* Card 4: End-to-End EPC Turnkey Execution (Col Span 2) */}
        <div className="md:col-span-2 relative group">
          <Card3D className="h-full bg-gradient-to-b from-[#0F224D] to-[#091533] border border-sky-400/35 hover:border-sky-400/60 ring-1 ring-sky-300/20 shadow-2xl shadow-black/85 p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-xs text-sky-400 tracking-widest uppercase font-bold">
                COMPLETE PEACE OF MIND
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Turnkey Execution: <span className="text-sky-400">From Vision to Physical Handover</span>
              </h3>
              <p className="text-sm text-gray-200 max-w-xl leading-relaxed">
                Architectural blueprints, Municipal & LDA approvals, Structural civil engineering, Bespoke interiors, and Smart home automation — all under one unified accountability framework.
              </p>
            </div>

            <div className="pt-6 border-t border-sky-400/20 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Single Point of Accountability</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Zero Cost Overruns Guarantee</span>
              </div>
            </div>
          </Card3D>
        </div>

      </div>
      </div>
    </section>
  );
};
