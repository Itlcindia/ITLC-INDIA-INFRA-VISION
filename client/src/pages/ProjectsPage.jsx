import React from "react";
import { ArrowRight } from "lucide-react";
import { ProjectGallery, initialProjects } from "../components/home/ProjectGallery";
import { MagneticButton } from "../components/ui/MagneticButton";
import { BorderBeam } from "../components/ui/BorderBeam";

export const ProjectsPage = ({ projects = initialProjects, onInquiryClick, initialFilter = "all" }) => {
  const safeProjects =
    Array.isArray(projects) && projects.length > 0 ? projects : initialProjects;

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-10 sm:space-y-12">
      {/* 1. Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="font-mono text-[13px] text-blue-600 dark:text-sky-400 tracking-widest uppercase bg-blue-50 dark:bg-sky-500/10 px-3.5 py-1 rounded-full border border-blue-200 dark:border-sky-400/30 font-semibold inline-block shadow-sm">
          Our Portfolio Showcase
        </span>
        <h1 className="font-display text-[28px] sm:text-[32px] font-bold text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 dark:from-sky-400 dark:to-blue-500">Projects</span>
        </h1>
        <p className="text-slate-600 dark:text-gray-400 text-[12px] leading-relaxed">
          A selective exhibition of residential estates, commercial office hubs, and green industrial conversions.
        </p>
      </div>

      {/* 2. Authentic Project Gallery (Day/Night Mode + Lightbox + WhatsApp Dossier) */}
      <div>
        <ProjectGallery
          projects={safeProjects}
          onSelectProject={onInquiryClick}
          className="pt-2 pb-4 bg-transparent"
          containerClassName="px-0"
          isHomePage={false}
          initialCategory={initialFilter}
        />
      </div>

      {/* 3. Cylindrical Consultation Card */}
      <div className="relative overflow-hidden rounded-full sm:rounded-full py-8 sm:py-10 px-6 sm:px-14 bg-white/95 dark:bg-gradient-to-r dark:from-[#0E204A] dark:via-[#09183B] dark:to-[#050E24] border border-blue-300 dark:border-sky-400/40 ring-1 ring-blue-100 dark:ring-sky-300/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <BorderBeam size={320} duration={10} colorFrom="#38BDF8" colorTo="#2563EB" />

        <div className="space-y-2 max-w-2xl">
          <h3 className="font-display text-[20px] sm:text-[24px] font-bold text-slate-900 dark:text-white tracking-tight">
            Ready to Build Your <span className="text-blue-600 dark:text-sky-400">Custom Venture?</span>
          </h3>
          <p className="text-[13px] sm:text-[14px] text-slate-600 dark:text-gray-300 font-sans leading-relaxed">
            Collaborate with InfraVision to design blueprint mockups, secure municipal permits, and estimate structural timelines.
          </p>
        </div>

        <div className="shrink-0">
          <MagneticButton
            onClick={onInquiryClick}
            variant="primary"
            className="py-3 px-8 text-xs font-semibold rounded-full"
          >
            <span>Book Architectural Consultation</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};
