import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { Navbar } from "./components/layout/Navbar";
import { Preloader } from "./components/layout/Preloader";
import { Footer } from "./components/layout/Footer";
import { HeroScrubber } from "./components/home/HeroScrubber";
import { BrandPartners } from "./components/home/BrandPartners";
import { ServicesSection } from "./components/home/ServicesSection";
import { ProjectGallery } from "./components/home/ProjectGallery";
import { InteriorExcellence } from "./components/home/InteriorExcellence";
import { OurMethodology } from "./components/home/OurMethodology";
import { WhyChooseInfra } from "./components/home/WhyChooseInfra";
import { TestimonialsSection } from "./components/home/TestimonialsSection";
import { FAQSection } from "./components/home/FAQSection";
import { NewsInsightsSection } from "./components/home/NewsInsightsSection";
import { ServicesPage } from "./pages/ServicesPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { SiteImagesPage } from "./pages/SiteImagesPage";
import { SiteVideosPage } from "./pages/SiteVideosPage";
import { InteriorPage } from "./pages/InteriorPage";
import { NewsPage } from "./pages/NewsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminPage } from "./pages/AdminPage";
import { LegalPage } from "./pages/LegalPage";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import { ConsultationModal } from "./components/modals/ConsultationModal";
import { Shield } from "lucide-react";
import { useCMS } from "./context/CMSContext";

export function App() {
  const [loading, setLoading] = useState(true);
  const [activeRoute, setActiveRoute] = useState(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
      if (path === "admin") return "admin";
      // Always reset public landing pages back to Home page on browser refresh
      if (path !== "" && path !== "/") {
        try {
          window.history.replaceState(null, "", "/");
        } catch {}
      }
    }
    return "home";
  });
  const [legalTab, setLegalTab] = useState("privacy-policy");
  const [projectCategoryFilter, setProjectCategoryFilter] = useState("all");
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState("Turnkey Luxury Villa");
  const [selectedNewsArticle, setSelectedNewsArticle] = useState(null);
  const lenisRef = useRef(null);

  // Consume live dynamic CMS states
  const {
    homeContent,
    services,
    projects,
    interior,
    siteImages,
    news,
  } = useCMS();

  // Listen to browser forward/back history buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
      if (path === "admin") {
        setActiveRoute("admin");
      } else if (path === "") {
        setActiveRoute("home");
      } else {
        setActiveRoute(path);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Initialize Lenis Smooth Scroll with global ref
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, []);

  // Guarantee instant scroll-to-top on route change to prevent blank screen
  useEffect(() => {
    // 1. Instant native scroll reset
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 2. Lenis immediate reset + height recalculation
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lenisRef.current.resize();
    }

    // 3. Secondary frame check once React has painted new route DOM
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
        lenisRef.current.resize();
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [activeRoute]);

  const handleRouteChange = (route) => {
    const url = route === "home" ? "/" : `/${route}`;
    if (typeof window !== "undefined" && window.location.pathname !== url) {
      window.history.pushState(null, "", url);
    }

    if (route === "my-team" || route === "team") {
      if (activeRoute !== "about") {
        setActiveRoute("about");
        setTimeout(() => {
          const teamEl = document.getElementById("my-team");
          if (teamEl) {
            if (lenisRef.current) {
              lenisRef.current.scrollTo(teamEl, { offset: -90, duration: 1.2 });
            } else {
              teamEl.scrollIntoView({ behavior: "smooth" });
            }
          }
        }, 200);
      } else {
        const teamEl = document.getElementById("my-team");
        if (teamEl) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(teamEl, { offset: -90, duration: 1.2 });
          } else {
            teamEl.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
      return;
    }

    if (["privacy-policy", "terms-of-service", "disclaimer", "legal"].includes(route)) {
      if (route !== "legal") {
        setLegalTab(route);
      }
      setActiveRoute("legal");
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
        lenisRef.current.resize();
      }
      return;
    }

    setActiveRoute(route);
    // Instant jump without smooth lag
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lenisRef.current.resize();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F1F5F9] dark:bg-[#050C1E] bg-[radial-gradient(circle_at_50%_-10%,#D8E8F8_0%,#EEF4FA_40%,#F8FAFC_100%)] dark:bg-[radial-gradient(circle_at_50%_-10%,#0E2458_0%,#06112C_50%,#030714_100%)] bg-fixed text-slate-800 dark:text-gray-100 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300">
      {/* 1. CAD HUD Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 2. Floating Glass Navbar (Hidden on Admin page & while Preloader is active) */}
      {!loading && activeRoute !== "admin" && (
        <Navbar
          activeRoute={activeRoute}
          onRouteChange={handleRouteChange}
          onInquiryClick={() => setIsConsultationOpen(true)}
        />
      )}

      {/* 4. Main Route Viewport with Error Boundary */}
      <main className="relative z-10 min-h-screen">
        <ErrorBoundary>
          {activeRoute === "home" && (
            <>
              {/* 1. Hero 4D Construction to Interior Drone Flythrough */}
              <HeroScrubber
                onExploreClick={() => {
                  const el = document.getElementById("projects");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                onCalculatorClick={() => {
                  setIsConsultationOpen(true);
                }}
              />

              {/* 2. Brand Partnerships Kinetic Marquee */}
              <BrandPartners />

              {/* 3. Our Services */}
              <ServicesSection
                onInquiryClick={(srv) => {
                  handleRouteChange("services");
                  if (srv?.title) {
                    setSelectedServiceForModal(srv.title);
                  }
                  setIsConsultationOpen(true);
                }}
                onViewAll={() => handleRouteChange("services")}
                dynamicServices={services}
              />

              {/* 4. Projects Gallery (Featured 3 on Home Page) */}
              <ProjectGallery
                projects={projects}
                onSelectProject={() => setIsConsultationOpen(true)}
                isHomePage={true}
                onFilterSelect={(cat) => {
                  setProjectCategoryFilter(cat);
                  handleRouteChange("projects");
                }}
                onViewAllProjects={() => {
                  setProjectCategoryFilter("all");
                  handleRouteChange("projects");
                }}
              />

              {/* 5. Interior Excellence */}
              <InteriorExcellence
                onInquiryClick={() => setIsConsultationOpen(true)}
                onExploreMore={() => handleRouteChange("interior")}
              />

              {/* 6. Our Methodology (3-Phase Execution Lifecycle) */}
              <OurMethodology onInquiryClick={() => setIsConsultationOpen(true)} />

              {/* 7. Why Choose Infra Vision */}
              <WhyChooseInfra onInquiryClick={() => setIsConsultationOpen(true)} />

              {/* 7. Client Testimonials */}
              <TestimonialsSection />

              {/* 8. Frequently Asked Questions (FAQ) */}
              <FAQSection onInquiryClick={() => setIsConsultationOpen(true)} />

              {/* 9. News & Architectural Insights */}
              <NewsInsightsSection
                onSelectArticle={(article) => {
                  setSelectedNewsArticle(article);
                  handleRouteChange("news");
                }}
                onExploreMore={() => {
                  setSelectedNewsArticle(null);
                  handleRouteChange("news");
                }}
              />
            </>
          )}

          {activeRoute === "services" && (
            <ServicesPage onInquiryClick={() => setIsConsultationOpen(true)} />
          )}

          {activeRoute === "projects" && (
            <ProjectsPage
              projects={projects}
              onInquiryClick={() => setIsConsultationOpen(true)}
              initialFilter={projectCategoryFilter}
            />
          )}

          {activeRoute === "site-images" && (
            <SiteImagesPage
              onInquiryClick={() => setIsConsultationOpen(true)}
              onRouteChange={handleRouteChange}
            />
          )}

          {activeRoute === "site-videos" && (
            <SiteVideosPage
              onInquiryClick={() => setIsConsultationOpen(true)}
              onRouteChange={handleRouteChange}
            />
          )}

          {activeRoute === "interior" && (
            <InteriorPage onInquiryClick={() => setIsConsultationOpen(true)} />
          )}

          {activeRoute === "news" && (
            <NewsPage
              onInquiryClick={() => setIsConsultationOpen(true)}
              initialArticle={selectedNewsArticle}
              onClearInitialArticle={() => setSelectedNewsArticle(null)}
            />
          )}

          {activeRoute === "about" && (
            <AboutPage onInquiryClick={() => setIsConsultationOpen(true)} />
          )}

          {activeRoute === "contact" && (
            <ContactPage />
          )}

          {activeRoute === "legal" && (
            <LegalPage
              activeTab={legalTab}
              onTabChange={setLegalTab}
              onNavigateBack={() => handleRouteChange("home")}
            />
          )}

          {activeRoute === "admin" && (
            <AdminPage onRouteChange={handleRouteChange} />
          )}
        </ErrorBoundary>
      </main>

      {/* 5. Futuristic Command-Center Footer (Hidden on Admin page) */}
      {activeRoute !== "admin" && <Footer onRouteChange={handleRouteChange} />}

      {/* 6. VIP Consultation Inquiry Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialServiceType={selectedServiceForModal}
      />
    </div>
  );
}

export default App;
