import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Compass, Shield, Sun, Moon } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import { soundManager } from "../../lib/sound";
import { useTheme } from "../../context/ThemeContext";

export const Navbar = ({ activeRoute, onRouteChange, onInquiryClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (activeRoute === "home") {
        const heroEl = document.getElementById("hero-container");
        if (heroEl) {
          const rect = heroEl.getBoundingClientRect();
          // heroEl is pinned until scroll reaches end of hero.
          // rect.bottom is the bottom edge of hero section relative to viewport.
          // When hero completes and partnership section approaches, rect.bottom drops near window.innerHeight:
          const heroFinished = rect.bottom <= window.innerHeight + 120;
          setIsScrolled(heroFinished);
        } else {
          setIsScrolled(window.scrollY > 40);
        }
      } else {
        setIsScrolled(window.scrollY > 40);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeRoute]);

  const isHeroTransparent = activeRoute === "home" && !isScrolled;

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "interior", label: "Interior" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id) => {
    soundManager.playHapticClick(700);
    onRouteChange(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pt-1 sm:pt-1.5 pointer-events-none">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 transition-all duration-500 ${
            isScrolled
              ? "bg-white/90 dark:bg-[#0E204A]/90 backdrop-blur-xl shadow-xl shadow-slate-900/10 dark:shadow-black/80 scale-95 border border-slate-200/80 dark:border-white/15"
              : isHeroTransparent
              ? "bg-transparent border-transparent shadow-none"
              : "bg-white/80 dark:bg-obsidian-surface/75 backdrop-blur-md border border-slate-200/60 dark:border-white/10 shadow-md shadow-slate-900/5 dark:shadow-black/50"
          } w-full max-w-6xl`}
        >
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer focus:outline-none shrink-0"
          >
            <img
              src="/images/company_logo.png"
              alt="ITLC India Pvt Ltd"
              className="h-12 sm:h-[50px] w-auto object-contain shrink-0 drop-shadow-sm"
            />
            <div className="flex flex-col items-center justify-center text-center">
              <span
                className={`font-display text-base sm:text-lg font-bold tracking-wider leading-none text-center transition-colors duration-300 ${
                  isHeroTransparent
                    ? "text-white drop-shadow-md"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                INFRA<span className="text-blue-500 dark:text-sky-400">VISION</span>
              </span>
              <span
                className={`font-sans text-[7.5px] sm:text-[8px] uppercase font-semibold tracking-wide mt-0.5 leading-none text-center whitespace-nowrap transition-colors duration-300 ${
                  isHeroTransparent
                    ? "text-sky-200 drop-shadow-sm"
                    : "text-slate-600 dark:text-sky-200/80"
                }`}
              >
                ITLC INDIA PVT LTD
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div
            className={`hidden md:flex items-center gap-1 rounded-full px-2 py-1 transition-all duration-300 ${
              isHeroTransparent
                ? "bg-black/35 backdrop-blur-md border border-white/20 shadow-lg shadow-black/20"
                : "bg-slate-100/90 dark:bg-black/40 border border-blue-300 dark:border-sky-400/60 shadow-sm shadow-blue-400/10 dark:shadow-sky-400/20"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeRoute === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-4 py-1.5 text-xs font-medium tracking-wide transition-colors duration-200 rounded-full cursor-pointer ${
                    isActive
                      ? isHeroTransparent
                        ? "text-white font-bold"
                        : "text-blue-700 dark:text-white font-semibold"
                      : isHeroTransparent
                      ? "text-slate-200 hover:text-white"
                      : "text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-gray-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className={`absolute inset-0 rounded-full ${
                        isHeroTransparent
                          ? "bg-blue-600/60 border border-sky-400/70 shadow-sm shadow-sky-400/30"
                          : "bg-blue-100 dark:bg-blue-600/20 border border-blue-300 dark:border-sky-400/60 shadow-sm shadow-blue-400/20 dark:shadow-sky-400/30"
                      }`}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action Hub (Day/Night Theme Toggle, Audio, Consultation) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* ☀️ / 🌙 Day & Night Mode Switcher (Icon Only) */}
            <button
              onClick={toggleTheme}
              title={isDark ? "Switch to Daylight Luxury Mode" : "Switch to Midnight Cyber Mode"}
              className={`flex items-center justify-center h-9 w-9 rounded-full transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 group ${
                isHeroTransparent
                  ? "border border-white/25 bg-black/35 backdrop-blur-md hover:border-white/50 text-white"
                  : "border border-sky-400/40 bg-slate-100/80 dark:bg-white/5 hover:border-sky-400/80"
              }`}
            >
              {isDark ? (
                <Moon className="h-4 w-4 text-sky-400 group-hover:rotate-12 transition-transform" />
              ) : (
                <Sun className="h-4 w-4 text-amber-500 group-hover:rotate-45 transition-transform" />
              )}
            </button>

            {/* Magnetic CTA Consultation Button -> Redirect to Contact Landing Page */}
            <MagneticButton
              onClick={() => handleNavClick("contact")}
              variant="primary"
              className="hidden sm:inline-flex py-2 px-4 text-xs font-semibold"
            >
              <span>Consultation</span>
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </MagneticButton>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden flex h-9 w-9 items-center justify-center rounded-full transition-colors cursor-pointer ${
                isHeroTransparent
                  ? "border border-white/25 bg-black/35 backdrop-blur-md text-white"
                  : "border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-white/5 text-slate-700 dark:text-gray-200"
              }`}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 rounded-3xl bg-white/95 dark:bg-[#0C1B3E]/95 backdrop-blur-2xl p-6 shadow-2xl md:hidden border border-slate-200 dark:border-white/15"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left py-2.5 px-4 rounded-xl font-display text-sm tracking-wide transition-colors ${
                    activeRoute === link.id
                      ? "bg-blue-50 dark:bg-sky-400/10 text-blue-600 dark:text-sky-400 font-semibold border border-blue-200 dark:border-sky-400/30"
                      : "text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
                <MagneticButton
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavClick("contact");
                  }}
                  variant="primary"
                  className="w-full text-xs py-3"
                >
                  Book Private Site Visit
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
