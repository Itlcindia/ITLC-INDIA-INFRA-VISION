import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Phone } from "lucide-react";
import confetti from "canvas-confetti";
import { MagneticButton } from "../ui/MagneticButton";
import { soundManager } from "../../lib/sound";
import { useCMS } from "../../context/CMSContext";

export const ConsultationModal = ({ isOpen, onClose, initialServiceType }) => {
  const { addInquiry } = useCMS();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "Turnkey Luxury Villa",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        projectType: initialServiceType || "Turnkey Luxury Villa",
        message: "",
      });
    }
  }, [isOpen, initialServiceType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playSuccessChime();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#FFFFFF", "#38BDF8", "#2563EB", "#60A5FA"],
    });
    setIsSubmitted(true);

    // Record inquiry lead in CMS
    if (addInquiry) {
      addInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        type: "Site Consultation Modal",
        service: formData.projectType,
        budget: "Direct Discussion",
        message: formData.message || "Requested direct architectural consultation.",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/20 shadow-2xl bg-white dark:bg-obsidian-card text-slate-900 dark:text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 h-9 w-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {!isSubmitted ? (
            <div>
              <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-sky-400 font-mono text-xs font-semibold tracking-wider uppercase">
                <span>PRIVATE ARCHITECTURAL INQUIRY</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-1">
                Book Site <span className="text-blue-600 dark:text-sky-400">Architectural Consultation</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-gray-400 mb-6">
                Direct connect with INFRA VISION's Principal Architectural Team in Golf City, Lucknow.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-[11px] text-slate-700 dark:text-gray-300 uppercase mb-1 font-bold">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pankaj"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-obsidian-surface border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:border-blue-500 dark:focus:border-sky-400 focus:outline-none placeholder-slate-400 dark:placeholder-gray-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-[11px] text-slate-700 dark:text-gray-300 uppercase mb-1 font-bold">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-obsidian-surface border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:border-blue-500 dark:focus:border-sky-400 focus:outline-none placeholder-slate-400 dark:placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-slate-700 dark:text-gray-300 uppercase mb-1 font-bold">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="client@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-obsidian-surface border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:border-blue-500 dark:focus:border-sky-400 focus:outline-none placeholder-slate-400 dark:placeholder-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-slate-700 dark:text-gray-300 uppercase mb-1 font-bold">Service Type</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-obsidian-surface border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-blue-500 dark:focus:border-sky-400 focus:outline-none"
                  >
                    <option value="Residential Construction">Residential Construction</option>
                    <option value="Commercial Construction">Commercial Construction</option>
                    <option value="Renovation & Remodeling">Renovation & Remodeling</option>
                    <option value="Architectural Space Planning">Architectural Space Planning</option>
                    <option value="Turnkey Luxury Villa">Turnkey Luxury Villa</option>
                    <option value="Luxury Interior Design">Luxury Interior Design</option>
                    <option value="Commercial Civil Contracting">Commercial Civil Contracting</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-slate-700 dark:text-gray-300 uppercase mb-1 font-bold">Plot Location / Notes</label>
                  <textarea
                    rows="2"
                    placeholder="e.g. Golf City Sector 4, 3200 sq.ft plot ready for construction"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-obsidian-surface border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-blue-500 dark:focus:border-sky-400 focus:outline-none resize-none placeholder-slate-400 dark:placeholder-gray-500"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  variant="primary"
                  className="w-full py-3.5 text-xs font-bold mt-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Consultation Inquiry</span>
                </MagneticButton>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 dark:text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                Inquiry Received!
              </h3>
              <p className="text-sm text-slate-600 dark:text-gray-300 max-w-sm mx-auto">
                Thank you, <span className="text-blue-600 dark:text-sky-400 font-semibold">{formData.name}</span>. Our senior architectural engineer will contact you shortly at <span className="text-slate-900 dark:text-white font-mono">{formData.phone}</span>.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      phone: "",
                      email: "",
                      projectType: initialServiceType || "Turnkey Luxury Villa",
                      message: "",
                    });
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white font-mono text-xs font-semibold transition-all cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
                <MagneticButton onClick={onClose} variant="secondary" className="w-full sm:w-auto py-2.5 px-6 text-xs">
                  Return to Exploration
                </MagneticButton>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
