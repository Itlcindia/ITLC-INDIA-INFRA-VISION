import React from "react";
import { ArrowRight } from "lucide-react";

// Card 4 Immutable Shield:
// Position is strictly fixed at index 3, and image is permanently locked to the Planning conference meeting image.
// Admin panel updates to services can modify cards 1-3, but Card 4 image is shielded from any override.
const HARDLOCKED_CARD_4 = {
  id: "planning",
  badge: "Planning",
  title: "ARCHITECTURAL SPACE PLANNING",
  image: "/images/services/card_planning.webp",
  paragraph:
    "Optimized interior load paths, virtual 3D floor plan walk-throughs, and custom room layouts for modern commercial or residential settings.",
  isLocked: true,
};

const DEFAULT_SERVICES = [
  {
    id: "residential",
    badge: "Construction",
    title: "RESIDENTIAL CONSTRUCTION",
    image: "/images/services/card_residential.jpg",
    paragraph:
      "Custom luxury villas, estates, and eco-friendly smart homes engineered for modern comfort, energy efficiency, and premium longevity.",
  },
  {
    id: "commercial",
    badge: "Construction",
    title: "COMMERCIAL CONSTRUCTION",
    image: "/images/services/card_commercial.jpg",
    paragraph:
      "High-performance office complexes, retail centers, and industrial facilities planned with scalable layouts and robust building physics.",
  },
  {
    id: "renovation",
    badge: "Renovating",
    title: "RENOVATION & REMODELING",
    image: "/images/services/card_renovation.jpg",
    paragraph:
      "Transforming historic or dated structures into contemporary spaces, adding modern utility while maintaining architectural integrity.",
  },
  HARDLOCKED_CARD_4,
];

export const ServicesSection = ({ onInquiryClick, onViewAll, dynamicServices }) => {
  // Use live dynamic services from CMS with fallback
  const displayedServices = Array.isArray(dynamicServices) && dynamicServices.length > 0
    ? dynamicServices.slice(0, 4)
    : DEFAULT_SERVICES;

  return (
    <section id="services" className="relative w-full py-14 sm:py-20 bg-gradient-to-b from-slate-50/60 via-white to-slate-50/40 dark:from-[#061026] dark:via-[#07132B] dark:to-[#061026] transition-colors duration-300">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header: Title on Left, Circular Arrow Button on Right */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-blue-600 dark:text-sky-400 font-semibold block mb-1">
              Core Architectural Practices
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[32px] font-extrabold tracking-wide text-slate-900 dark:text-white uppercase">
              OUR <span className="text-blue-600 dark:text-sky-400">SERVICES</span>
            </h2>
          </div>

          <button
            onClick={onViewAll}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#75445A] hover:bg-[#8A526B] dark:bg-sky-600 dark:hover:bg-sky-500 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
            aria-label="View all services"
            title="View all services"
          >
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 4-Card Grid: Compact Stadium Monolith without dead space */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-start">
          {displayedServices.map((srv) => (
            <div
              key={srv.id}
              onClick={() => onInquiryClick?.(srv)}
              className="group flex flex-col bg-white/95 dark:bg-gradient-to-b dark:from-[#0E204A] dark:to-[#081735] rounded-[28px] sm:rounded-[32px] p-3 sm:p-3.5 border border-slate-200/90 dark:border-sky-400/25 shadow-md hover:shadow-xl hover:shadow-blue-900/10 dark:hover:shadow-sky-500/10 hover:border-blue-500/60 dark:hover:border-sky-400/60 transition-all duration-400 hover:-translate-y-1 cursor-pointer"
            >
              {/* Inner Concentric Image Capsule (Height completely preserved as requested) */}
              <div className="relative w-full aspect-[4/3] sm:h-[225px] overflow-hidden rounded-[20px] sm:rounded-[22px] bg-slate-100 dark:bg-slate-800 shrink-0">
                <img
                  src={srv.image || "/images/services/card_residential.jpg"}
                  alt={srv.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Top-Left Floating Badge Only (No Numbering) */}
                <div className="absolute top-3 left-3 z-10 inline-flex items-center px-3 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/90 shadow-md backdrop-blur-md border border-slate-200/70 dark:border-sky-400/35 text-[11px] font-semibold text-slate-800 dark:text-sky-300 font-mono tracking-wide">
                  {srv.badge || "Certified Standard"}
                </div>
              </div>

              {/* Card Text Content - Compact, Tight & No Empty Gaps */}
              <div className="px-1.5 pt-3 pb-1 sm:px-2 sm:pt-3 sm:pb-1 flex flex-col justify-start">
                <h3 className="font-display text-[14.5px] sm:text-[15.5px] font-bold text-blue-600 dark:text-sky-400 uppercase tracking-wide leading-tight group-hover:text-blue-700 dark:group-hover:text-sky-300 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-[12.5px] sm:text-[13px] text-slate-600 dark:text-slate-300 leading-snug sm:leading-normal mt-1.5 font-sans line-clamp-3">
                  {srv.paragraph || srv.tagline || ""}
                </p>

                {/* Inquire Action Line: Snugly attached directly under paragraph with zero dead space */}
                <div className="pt-2.5 mt-2.5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                  <span className="font-semibold uppercase tracking-wider text-[10.5px]">Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
