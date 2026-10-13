import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle2, Clock, Globe } from "lucide-react";
import confetti from "canvas-confetti";
import { MagneticButton } from "../components/ui/MagneticButton";
import { soundManager } from "../lib/sound";
import { useCMS } from "../context/CMSContext";

export const ContactPage = () => {
  const { homeContent, contactContent, addInquiry } = useCMS();
  const officeAddress = contactContent?.officeAddress || homeContent?.corporateAddress || "G1/0049, Olive Wood Villa, Golf City, Lucknow, Uttar Pradesh – 226030";
  const primaryPhone = contactContent?.directHotline || homeContent?.phonePrimary || "(+91) 953 234 1000";
  const emailDesk = contactContent?.emailDesk || homeContent?.officialEmail || "info.itlcindia@gmail.com";
  const visitingHours = contactContent?.visitingHours || "Monday – Saturday: 9:00 AM – 8:00 PM IST";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Turnkey Villa Construction",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playSuccessChime();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#FFFFFF", "#38BDF8", "#2563EB"],
    });
    setSubmitted(true);

    // Save lead into CMS store to notify Admin
    if (addInquiry) {
      addInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        type: "Contact Landing Page",
        service: formData.service,
        message: formData.message,
      });
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-14">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="font-mono text-[13px] text-blue-600 dark:text-sky-400 tracking-widest uppercase bg-blue-50 dark:bg-sky-500/10 px-3.5 py-1 rounded-full border border-blue-200 dark:border-sky-400/30 font-semibold inline-block shadow-sm">
          Let's Connect
        </span>
        <h1 className="font-display text-[28px] sm:text-[32px] font-bold text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
          Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 dark:from-sky-400 dark:to-blue-500">INFRA VISION</span>
        </h1>
        <p className="text-slate-600 dark:text-gray-400 text-[12px] leading-relaxed">
          Discuss architectural planning, request building audits, or invite bids on active tenders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info (Col Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border border-blue-300 dark:border-sky-400/35 ring-1 ring-blue-100 dark:ring-sky-300/20 shadow-xl shadow-blue-900/5 dark:shadow-2xl space-y-6">
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Principal Headquarters
            </h3>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-sky-500/15 border border-blue-200 dark:border-sky-400/40 flex items-center justify-center text-blue-600 dark:text-sky-400 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-xs text-blue-600 dark:text-sky-300 font-bold">VISIT STUDIO</div>
                  <div className="text-slate-900 dark:text-white font-medium leading-relaxed mt-0.5 font-sans">
                    {officeAddress}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-500/40 flex items-center justify-center text-blue-600 dark:text-sky-400 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-xs text-blue-600 dark:text-sky-300 font-bold">PHONE & WHATSAPP</div>
                  <a href={`tel:${primaryPhone.replace(/\s+/g, "")}`} className="text-slate-900 dark:text-white font-bold hover:text-blue-600 dark:hover:text-sky-400 transition-colors mt-0.5 block">
                    {primaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-[#0C1B3E] border border-blue-200 dark:border-sky-400/30 flex items-center justify-center text-slate-700 dark:text-gray-200 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-xs text-blue-600 dark:text-sky-300 font-bold">OFFICIAL EMAIL</div>
                  <a href={`mailto:${emailDesk}`} className="text-slate-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-sky-400 transition-colors mt-0.5 block">
                    {emailDesk}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-xs text-blue-600 dark:text-sky-300 font-bold">OFFICE TIMINGS</div>
                  <div className="text-slate-900 dark:text-white font-medium mt-0.5 font-sans">
                    {visitingHours}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-sky-400/20 font-mono text-xs text-slate-500 dark:text-gray-300 flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-600 dark:text-sky-400" />
              <span>CORPORATE PARENT: ITLC INDIA PVT LTD</span>
            </div>
          </div>
        </div>

        {/* Contact Form (Col Span 7) */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border border-blue-300 dark:border-sky-400/35 ring-1 ring-blue-100 dark:ring-sky-300/20 shadow-xl shadow-blue-900/5 dark:shadow-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Send Direct Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-slate-700 dark:text-gray-200 uppercase mb-1 font-bold">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pankaj"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0C1B3E] border border-slate-200 dark:border-sky-400/30 text-slate-900 dark:text-white text-sm focus:border-blue-500 dark:focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-slate-700 dark:text-gray-200 uppercase mb-1 font-bold">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 953 234 1000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0C1B3E] border border-slate-200 dark:border-sky-400/30 text-slate-900 dark:text-white text-sm focus:border-blue-500 dark:focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-slate-700 dark:text-gray-200 uppercase mb-1 font-bold">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0C1B3E] border border-slate-200 dark:border-sky-400/30 text-slate-900 dark:text-white text-sm focus:border-blue-500 dark:focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-slate-700 dark:text-gray-200 uppercase mb-1 font-bold">Select Service</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0C1B3E] border border-slate-200 dark:border-sky-400/30 text-slate-900 dark:text-white text-xs focus:border-blue-500 dark:focus:border-sky-400 focus:outline-none"
                    >
                      <option value="Turnkey Villa Construction">Turnkey Villa Construction</option>
                      <option value="Full Home Construction">Full Home Construction</option>
                      <option value="Interior Architecture">Interior Architecture</option>
                      <option value="Civil Contracting">Civil Contracting</option>
                      <option value="Structural Engineering">Structural Engineering</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-slate-700 dark:text-gray-200 uppercase mb-1 font-bold">Project Details / Plot Location</label>
                  <textarea
                    rows="3"
                    placeholder="Tell us about your plot location, expected carpet area, and questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0C1B3E] border border-slate-200 dark:border-sky-400/30 text-slate-900 dark:text-white text-sm focus:border-blue-500 dark:focus:border-sky-400 focus:outline-none resize-none"
                  />
                </div>

                <MagneticButton type="submit" variant="primary" className="w-full py-3.5 text-xs font-bold">
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </MagneticButton>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 dark:text-emerald-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Message Transmitted!</h3>
                <p className="text-slate-600 dark:text-gray-300 text-sm max-w-sm mx-auto">
                  Thank you! Our engineering office in Golf City, Lucknow has received your brief and will connect shortly.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        service: "Turnkey Villa Construction",
                        message: "",
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white font-mono text-xs font-semibold transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
