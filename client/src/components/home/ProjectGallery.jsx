import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, X, Send, ArrowRight } from "lucide-react";
import { Card3D } from "../ui/Card3D";
import { BorderBeam } from "../ui/BorderBeam";
import { MagneticButton } from "../ui/MagneticButton";
import { soundManager } from "../../lib/sound";

export const initialProjects = [
  {
    id: 1,
    title: "Modern Duplex Residence",
    category: "villa",
    categoryLabel: "Residential",
    city: "Lucknow",
    year: "2024",
    carpetArea: "4,800 Sq.Ft",
    status: "Completed",
    location: "Lucknow",
    imageDay: "/images/projects/abhijeet_sinha_residence.jpg",
    imageNight: "/images/projects/abhijeet_sinha_residence.jpg",
    description: "A contemporary multi-storey luxury residence featuring cantilevered balconies, natural teak soffits, recessed warm architectural lighting, and landscaped perimeter fencing.",
    progress: 100,
    isOngoing: false,
  },
  {
    id: 2,
    title: "Premium Colonial Residence",
    category: "villa",
    categoryLabel: "Residential",
    city: "Lucknow",
    year: "2024",
    carpetArea: "7,500 Sq.Ft",
    status: "Completed",
    location: "Lucknow",
    imageDay: "/images/projects/neoclassical_royal_villa.jpg",
    imageNight: "/images/projects/neoclassical_royal_villa.jpg",
    description: "An elegant multi-storey residence inspired by colonial architecture, featuring grand columns, luxurious balconies, and sophisticated design elements.",
    progress: 100,
    isOngoing: false,
  },
  {
    id: 3,
    title: "Contemporary Geometric Villa",
    category: "villa",
    categoryLabel: "Residential",
    city: "Lucknow",
    year: "2023",
    carpetArea: "5,200 Sq.Ft",
    status: "Completed",
    location: "Lucknow",
    imageDay: "/images/projects/modern_portal_villa_front.jpg",
    imageNight: "/images/projects/modern_portal_villa_angle.jpg",
    description: "A signature contemporary residence featuring dual-tone architectural portals, custom CNC jali screens, glass balustrades, and a private rooftop entertainment deck.",
    progress: 100,
    isOngoing: false,
  },
  {
    id: 4,
    title: "Modern Stilt Residence",
    category: "apartment",
    categoryLabel: "Residential",
    city: "Lucknow",
    year: "2024",
    carpetArea: "6,200 Sq.Ft",
    status: "Completed",
    location: "Lucknow",
    imageDay: "/images/projects/stilt_luxury_residence_357.jpg",
    imageNight: "/images/projects/stilt_luxury_residence_357.jpg",
    description: "A multistory luxury apartment residence featuring double stilt parking, exterior warm wood cladding, vertical architectural illumination bands, and modern terrace parapet.",
    progress: 100,
    isOngoing: false,
  },
  {
    id: 5,
    title: "Prime Commercial Landmark",
    category: "turnkey",
    categoryLabel: "Commercial",
    city: "Lucknow",
    year: "2024",
    carpetArea: "11,500 Sq.Ft",
    status: "Completed",
    location: "Lucknow",
    imageDay: "/images/projects/commercial_retail_showroom.jpg",
    imageNight: "/images/projects/commercial_retail_front.jpg",
    description: "A prime commercial retail landmark featuring double-height frameless glass showroom glazing, exterior timber accents, and rooftop terrace lounge.",
    progress: 100,
    isOngoing: false,
  },
  {
    id: 6,
    title: "Classic Turret Residence",
    category: "villa",
    categoryLabel: "Residential",
    city: "Lucknow",
    year: "2025",
    carpetArea: "4,500 Sq.Ft",
    status: "Under Construction",
    location: "Lucknow",
    imageDay: "/images/projects/contemporary_turret_villa_123.jpg",
    imageNight: "/images/projects/contemporary_turret_villa_123.jpg",
    description: "A Mediterranean-inspired contemporary residence featuring a pitched slate turret roof, vertical amber glass stairwell shaft, decorative boundary wall, and integrated portico.",
    progress: 82,
    isOngoing: true,
    currentPhase: "Exterior Stone Cladding ➔ Glass Installation",
  },
  {
    id: 7,
    title: "Classic Dual-Tone Villa",
    category: "villa",
    categoryLabel: "Residential",
    city: "Lucknow",
    year: "2023",
    carpetArea: "5,800 Sq.Ft",
    status: "Completed",
    location: "Lucknow",
    imageDay: "/images/projects/modern_portal_villa_angle.jpg",
    imageNight: "/images/projects/modern_portal_villa_front.jpg",
    description: "A corner-plot luxury estate designed for expansive panoramic views, wraparound cantilevered balconies, vertical timber louvers, and landscaped garden setbacks.",
    progress: 100,
    isOngoing: false,
  },
  {
    id: 8,
    title: "Modern Commercial Plaza",
    category: "turnkey",
    categoryLabel: "Commercial",
    city: "Lucknow",
    year: "2025",
    carpetArea: "9,800 Sq.Ft",
    status: "Under Construction",
    location: "Lucknow",
    imageDay: "/images/projects/commercial_retail_front.jpg",
    imageNight: "/images/projects/commercial_retail_showroom.jpg",
    description: "A modern commercial retail plaza featuring structural silicone curtain walls, reinforced concrete cantilever canopy, and dedicated terrace lounge deck.",
    progress: 74,
    isOngoing: true,
    currentPhase: "Facade Glazing & Interior MEP Execution",
  },
];

export const ProjectGallery = ({
  projects = initialProjects,
  onSelectProject,
  className = "",
  containerClassName = "",
  isHomePage = false,
  initialCategory = "all",
  onFilterSelect,
  onViewAllProjects,
}) => {
  const [filter, setFilter] = useState(initialCategory || "all");
  const [nightModes, setNightModes] = useState({});
  const [lightboxProject, setLightboxProject] = useState(null);

  useEffect(() => {
    if (initialCategory) {
      setFilter(initialCategory);
    }
  }, [initialCategory]);

  const toggleNightMode = (id, e) => {
    e.stopPropagation();
    soundManager.playHapticClick(800);
    setNightModes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShareDossier = (project, e) => {
    e.stopPropagation();
    soundManager.playSuccessChime();
    const text = `INFRA VISION Architectural Dossier: Check out "${project.title}" (${project.carpetArea}, ${project.location}). Handled by INFRA VISION Lucknow: https://infra-vision.itlcindia.com/projects`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const safeProjects = Array.isArray(projects) ? projects : initialProjects;
  const filteredProjects = safeProjects.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  // On Home page, display strictly top 3 showcase cards; on Projects landing page, display all filtered projects
  const displayProjects = isHomePage ? safeProjects.slice(0, 3) : filteredProjects;

  return (
    <section
      id="projects"
      className={`relative w-full ${className || "py-24 bg-[#F8FAFC] dark:bg-[#050C1E]"} transition-colors duration-300`}
    >
      <div className={`relative max-w-7xl mx-auto ${containerClassName || "px-4 sm:px-8"}`}>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-3 max-w-xl">
          <h2 className="font-display text-[26px] sm:text-[31px] font-bold tracking-tight text-slate-900 dark:text-white">
            Landmark <span className="text-blue-600 dark:text-sky-400">Residences</span>
          </h2>
          <p className="text-[13px] text-slate-600 dark:text-gray-300 leading-relaxed">
            Architectural landmarks, bespoke luxury residences, and precision-engineered commercial spaces across Lucknow.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 bg-slate-100/90 dark:bg-[#0C1B3E] p-1.5 rounded-full border border-slate-200/80 dark:border-sky-400/35 shadow-sm dark:shadow-lg">
          {[
            { id: "all", label: "All Works" },
            { id: "villa", label: "Luxury Villas" },
            { id: "apartment", label: "Apartments" },
            { id: "turnkey", label: "Turnkey EPC" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playHapticClick(650);
                if (isHomePage && onFilterSelect) {
                  onFilterSelect(tab.id);
                } else {
                  setFilter(tab.id);
                }
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                (!isHomePage && filter === tab.id)
                  ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-sky-500/30"
                  : "text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Motion Cards Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {displayProjects.map((project) => {
            const isNight = nightModes[project.id];
            return (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightboxProject(project)}
                className="cursor-pointer group h-full"
              >
                <Card3D className="h-full flex flex-col justify-between overflow-hidden p-0 bg-white/95 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border border-white/90 dark:border-sky-400/35 hover:border-blue-400/60 dark:hover:border-sky-400/60 ring-1 ring-blue-100 dark:ring-sky-300/15 shadow-xl shadow-blue-900/5 dark:shadow-2xl dark:shadow-black/85 transition-all duration-300">
                  {project.status === "Completed" && (
                    <BorderBeam size={180} duration={14} colorFrom="#38BDF8" colorTo="#2563EB" />
                  )}

                  {/* Photo Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-obsidian-surface shrink-0">
                    <img
                      src={project.imageDay}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                    {/* Top-Left Category Badge: "Residential" only (No icons on image) */}
                    <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-slate-900/85 dark:bg-[#071330]/90 text-white dark:text-sky-300 border border-white/20 dark:border-sky-400/40 backdrop-blur-md shadow-md inline-block">
                        {project.categoryLabel || (project.category === "turnkey" ? "Commercial" : "Residential")}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-display text-[17px] sm:text-[18px] font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-[13px] text-slate-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Location (Left, One Word) with icon & Year (Right) with icon */}
                    <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-gray-300 font-medium">
                        <MapPin className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                        <span>{project.city || "Lucknow"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-gray-300 font-medium">
                        <Calendar className="h-3.5 w-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                        <span>{project.year || "2024"}</span>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* On Home page: Prominent View All Projects button redirecting to landing page */}
      {isHomePage && (
        <div className="mt-12 text-center">
          <button
            onClick={onViewAllProjects}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 hover:from-blue-500 hover:to-sky-400 text-white font-mono text-xs font-bold tracking-wider uppercase shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all cursor-pointer"
          >
            <span>Explore All {safeProjects.length} Verified Projects</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl overflow-y-auto"
            onClick={() => setLightboxProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-3xl overflow-hidden border-2 border-sky-400 ring-1 ring-sky-300/30 shadow-2xl bg-gradient-to-b from-[#0F224D] to-[#091533] p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxProject(null)}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white hover:text-sky-400 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* High-Res Photo */}
                <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-sky-400/30">
                  <img
                    src={nightModes[lightboxProject.id] ? lightboxProject.imageNight : lightboxProject.imageDay}
                    alt={lightboxProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#0C1B3E]/90 border border-sky-400/40 px-3 py-1 rounded-full text-xs font-mono text-white">
                    {lightboxProject.status}
                  </div>
                </div>

                {/* Specs and Details */}
                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-xs text-sky-400 uppercase tracking-wider font-bold">
                      PROJECT SPECIFICATION SHEET
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                      {lightboxProject.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5 font-mono text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-400/30 font-semibold">
                        {lightboxProject.categoryLabel || (lightboxProject.category === "turnkey" ? "Commercial" : "Residential")}
                      </span>
                      <span className="text-emerald-400 font-semibold">{lightboxProject.status}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-200 leading-relaxed font-sans">
                    {lightboxProject.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-sky-400/20 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-[#0C1B3E] border border-sky-400/30">
                      <div className="text-gray-300">CARPET AREA</div>
                      <div className="text-white font-bold text-sm mt-0.5">{lightboxProject.carpetArea}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0C1B3E] border border-sky-400/30">
                      <div className="text-gray-300">EXECUTION BOND</div>
                      <div className="text-sky-400 font-bold text-sm mt-0.5">100% Turnkey</div>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <MagneticButton
                      onClick={() => {
                        window.open(
                          `https://wa.me/919532341000?text=${encodeURIComponent(
                            `Hello INFRA VISION Team, I would like to inquire about "${lightboxProject.title}".`
                          )}`,
                          "_blank"
                        );
                      }}
                      variant="primary"
                      className="flex-1 py-3 text-xs font-semibold"
                    >
                      <Send className="h-4 w-4" />
                      <span>Inquire About This Property</span>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
};
