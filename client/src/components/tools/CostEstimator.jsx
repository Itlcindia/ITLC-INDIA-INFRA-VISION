import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Calendar, Send, CheckCircle2, PhoneCall } from "lucide-react";
import confetti from "canvas-confetti";
import { MagneticButton } from "../ui/MagneticButton";
import { soundManager } from "../../lib/sound";

export const CostEstimator = () => {
  const [area, setArea] = useState(3500);
  const [projectType, setProjectType] = useState("turnkey"); // "full_home" | "turnkey" | "interior"
  const [tier, setTier] = useState("ultra_prime"); // "premium" | "ultra_prime"

  const rateCard = {
    full_home: { premium: 2100, ultra_prime: 2950, timePer1000: 2.2 },
    turnkey: { premium: 2500, ultra_prime: 3600, timePer1000: 2.6 },
    interior: { premium: 1400, ultra_prime: 2400, timePer1000: 1.5 },
  };

  const rate = rateCard[projectType][tier];
  const totalCost = area * rate;
  const estimatedMonths = Math.max(6, Math.round((area / 1000) * rateCard[projectType].timePer1000));

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹ ${(amount / 10000000).toFixed(2)} Cr`;
    }
    return `₹ ${(amount / 100000).toFixed(2)} Lakhs`;
  };

  const handleWhatsAppQuote = () => {
    soundManager.playSuccessChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FFFFFF", "#38BDF8", "#2563EB", "#60A5FA"],
    });

    const typeLabels = {
      full_home: "Full Home Construction",
      turnkey: "Turnkey Luxury Villa",
      interior: "Bespoke Interior Design",
    };

    const tierLabel = tier === "ultra_prime" ? "Ultra-Prime Italian Tier" : "Premium Tier";
    const text = `Hello INFRA VISION Team! I have calculated an estimate on your website for ${area.toLocaleString()} Sq.Ft (${typeLabels[projectType]} - ${tierLabel}) totaling approximately ${formatCurrency(totalCost)}. I would like to schedule an official architectural consultation.`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919532341000?text=${encodedText}`, "_blank");
  };

  return (
    <section id="cost-estimator" className="relative py-20 px-4 sm:px-8 max-w-5xl mx-auto">
      <div className="rounded-3xl bg-white/95 dark:glass-panel p-6 sm:p-12 border border-slate-200/90 dark:border-white/15 relative overflow-hidden shadow-xl dark:shadow-2xl">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Estimate Your <span className="text-blue-600 dark:text-sky-400">Dream Project</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300">
            Select your plot dimensions and architectural preferences to generate an instant dynamic estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Controls */}
          <div className="space-y-6">
            {/* Control 1: Project Type */}
            <div>
              <label className="block text-xs font-mono text-slate-700 dark:text-gray-300 mb-2 uppercase tracking-wider font-bold">
                1. Project Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "turnkey", label: "Turnkey Villa" },
                  { id: "full_home", label: "Full Civil Home" },
                  { id: "interior", label: "Luxury Interior" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundManager.playHapticClick(650);
                      setProjectType(item.id);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      projectType === item.id
                        ? "bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 text-white border-blue-400 shadow-lg shadow-blue-500/25"
                        : "bg-slate-50 dark:bg-obsidian-surface border-slate-200 dark:border-sky-500/20 text-slate-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-sky-400/40"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Area Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-slate-700 dark:text-gray-300 uppercase tracking-wider font-bold">
                  2. Built-Up Area (Carpet / Slab)
                </label>
                <span className="font-display text-base font-bold text-blue-600 dark:text-sky-400">
                  {area.toLocaleString()} <span className="text-xs font-normal text-slate-500 dark:text-gray-400">Sq.Ft</span>
                </span>
              </div>
              <input
                type="range"
                min="1200"
                max="10000"
                step="100"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-sky-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 dark:text-gray-500 mt-1">
                <span>1,200 Sq.Ft</span>
                <span>5,000 Sq.Ft</span>
                <span>10,000+ Sq.Ft</span>
              </div>
            </div>

            {/* Control 3: Material Quality Tier */}
            <div>
              <label className="block text-xs font-mono text-slate-700 dark:text-gray-300 mb-2 uppercase tracking-wider font-bold">
                3. Architectural Material Spec
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    soundManager.playHapticClick(600);
                    setTier("premium");
                  }}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    tier === "premium"
                      ? "bg-blue-50 dark:bg-white/10 border-blue-500 dark:border-sky-400 text-slate-900 dark:text-white shadow-sm"
                      : "bg-slate-50 dark:bg-obsidian-surface border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Premium Tier</div>
                  <div className="text-[11px] text-slate-500 dark:text-gray-400 mt-0.5">High-grade vitrified tiles, Kohler fittings, standard teak</div>
                </button>

                <button
                  onClick={() => {
                    soundManager.playHapticClick(750);
                    setTier("ultra_prime");
                  }}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    tier === "ultra_prime"
                      ? "bg-blue-50 dark:bg-blue-600/25 border-blue-500 dark:border-sky-400 text-blue-700 dark:text-white shadow-lg shadow-blue-500/10 dark:shadow-sky-500/20"
                      : "bg-slate-50 dark:bg-obsidian-surface border-slate-200 dark:border-sky-500/20 text-slate-500 dark:text-gray-400 hover:border-slate-300 dark:hover:border-sky-400/40"
                  }`}
                >
                  <div className="text-xs font-bold text-blue-600 dark:text-sky-400">Ultra-Prime Luxury</div>
                  <div className="text-[11px] text-slate-500 dark:text-gray-300 mt-0.5">Italian marble, Grohe/Toto, acoustic glass, smart automation</div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Live Breakdown Box */}
          <div className="bg-slate-50/90 dark:bg-obsidian-void/90 rounded-2xl p-6 sm:p-8 border border-blue-300 dark:border-sky-500/40 space-y-6 shadow-sm shadow-blue-500/10 dark:shadow-sky-400/20">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
              <span className="font-mono text-xs text-slate-600 dark:text-sky-200 tracking-wider">ESTIMATED INVESTMENT</span>
              <span className="flex items-center gap-1 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <CheckCircle2 className="h-3 w-3" />
                <span>Zero Overruns</span>
              </span>
            </div>

            <div className="space-y-1">
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {formatCurrency(totalCost)}
              </div>
              <div className="text-xs font-mono text-blue-600 dark:text-sky-400">
                ~ ₹ {rate.toLocaleString()} / Sq.Ft (Inclusive of Architecture & MEP)
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-white/10 text-xs">
              <div className="space-y-1">
                <div className="text-slate-500 dark:text-gray-400 flex items-center gap-1 font-mono text-[11px]">
                  <Calendar className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400" />
                  <span>HANDOVER TIMELINE</span>
                </div>
                <div className="font-bold text-slate-900 dark:text-white text-base">
                  {estimatedMonths} Months
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-500 dark:text-gray-400 font-mono text-[11px]">QUALITY AUDIT</div>
                <div className="font-bold text-blue-600 dark:text-sky-400 text-base">IS-456 Certified</div>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-2">
              <MagneticButton
                onClick={handleWhatsAppQuote}
                variant="primary"
                className="w-full py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                <span>Lock Quote on WhatsApp (+91 953 234 1000)</span>
              </MagneticButton>
              <p className="mt-2 text-center text-[10px] text-slate-400 dark:text-gray-500">
                Direct connect with INFRA VISION's Principal Architect in Golf City, Lucknow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
