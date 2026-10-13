import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { useCMS } from "../../context/CMSContext";

// Helper function to wrap marquee value seamlessly
const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// 1. TATA Brand Logo (Authentic Deep Blue)
const TataLogo = () => (
  <div className="flex items-center gap-2.5 select-none">
    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#0A4D92] p-1.5 shadow-sm">
      <svg viewBox="0 0 36 36" className="h-full w-full text-white fill-current">
        <path d="M18 4C10.27 4 4 10.27 4 18s6.27 14 14 14 14-6.27 14-14S25.73 4 18 4zm0 4.2c2.24 0 4.33.63 6.1 1.72L19.26 21.95h-2.52L11.9 9.92C13.67 8.83 15.76 8.2 18 8.2zm-8.02 4.59l3.65 9.77H10.6l-3.89-7.48c1-1 2.12-1.78 3.27-2.29zm16.04 0c1.15.51 2.27 1.29 3.27 2.29l-3.89 7.48h-3.03l3.65-9.77z" />
      </svg>
    </div>
    <span className="font-sans text-base sm:text-lg font-black tracking-[0.2em] text-[#0A4D92] dark:text-white">
      TATA
    </span>
  </div>
);

// 2. JSW Steel Brand Logo (Authentic Red & Blue)
const JswLogo = () => (
  <div className="flex items-center gap-2 select-none">
    <div className="flex items-center space-x-0.5">
      <span className="inline-block w-2 h-5 sm:h-6 bg-[#D32F2F] -skew-x-12 rounded-xs shadow-xs" />
      <span className="inline-block w-2 h-6 sm:h-7 bg-[#1565C0] -skew-x-12 rounded-xs shadow-xs" />
    </div>
    <div className="flex items-baseline gap-1">
      <span className="font-sans text-base sm:text-lg font-black tracking-wider text-[#0F172A] dark:text-white">
        JSW
      </span>
      <span className="font-sans text-xs sm:text-sm font-bold tracking-wide text-[#1565C0]">
        Steel
      </span>
    </div>
  </div>
);

// 3. Kajaria Brand Logo (Authentic Crimson)
const KajariaLogo = () => (
  <div className="flex items-center gap-2 select-none">
    <div className="relative flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center">
      <div className="absolute h-4 w-4 rotate-45 bg-[#C62828] rounded-xs shadow-xs" />
      <div className="absolute h-1.5 w-1.5 rotate-45 bg-white rounded-xs" />
    </div>
    <span className="font-serif text-lg sm:text-xl font-black tracking-tight text-[#C62828]">
      Kajaria
    </span>
  </div>
);

// 4. JCB Brand Logo (Authentic Industrial Yellow & Black)
const JcbLogo = () => (
  <div className="flex items-center select-none">
    <div className="bg-[#FFCC00] px-2.5 sm:px-3 py-0.5 rounded-md border border-amber-400 shadow-sm">
      <span className="font-sans text-sm sm:text-base font-black tracking-widest text-black">
        JCB
      </span>
    </div>
  </div>
);

// 5. UltraTech Cement Brand Logo (Authentic Golden Yellow Box)
const UltraTechLogo = () => (
  <div className="flex items-center select-none">
    <div className="bg-[#FFCC00] px-2.5 sm:px-3 py-0.5 rounded-md border border-yellow-400 shadow-sm text-center">
      <div className="font-sans text-xs sm:text-sm font-black italic tracking-tight text-black leading-tight">
        UltraTech
      </div>
      <div className="font-sans text-[7.5px] sm:text-[8.5px] font-black tracking-widest text-black/90 uppercase border-t border-black/40 pt-0.2">
        CEMENT
      </div>
    </div>
  </div>
);

// Render Brand Partner Logo (Preset or Custom)
const renderPartnerLogo = (partner) => {
  if (partner.logo) {
    return (
      <div className="flex items-center gap-2 select-none px-2.5 py-1 rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur-xs border border-sky-300/40 dark:border-sky-400/20 shadow-xs">
        <img
          src={partner.logo}
          alt={partner.name}
          className="h-6 sm:h-7.5 max-w-[120px] object-contain drop-shadow-xs"
        />
        <span className="font-sans text-xs sm:text-sm font-bold tracking-wide text-slate-800 dark:text-white">
          {partner.name}
        </span>
      </div>
    );
  }

  const presetKey = (partner.preset || partner.name || "").toLowerCase();
  if (presetKey.includes("tata")) return <TataLogo />;
  if (presetKey.includes("jsw")) return <JswLogo />;
  if (presetKey.includes("kajaria")) return <KajariaLogo />;
  if (presetKey.includes("jcb")) return <JcbLogo />;
  if (presetKey.includes("ultratech") || presetKey.includes("ultra")) return <UltraTechLogo />;

  return (
    <div className="flex items-center gap-2 select-none px-3 py-1 rounded-xl bg-white/80 dark:bg-[#06112C] border border-sky-400/40 shadow-xs">
      <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
      <span className="font-sans text-xs sm:text-sm font-black tracking-wider text-slate-800 dark:text-white uppercase">
        {partner.name}
      </span>
    </div>
  );
};

export const BrandPartners = () => {
  const { brandPartners } = useCMS();
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  // Track page scroll velocity for dynamic kinetic acceleration
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 35,
    stiffness: 300,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 6], {
    clamp: false,
  });

  const baseX = useMotionValue(0);

  // Smooth frame loop with velocity acceleration
  useAnimationFrame((t, delta) => {
    if (isHovered) return; // Pause on hover for interaction

    let moveBy = 0.055 * (delta / 16.6); // Base smooth drift
    const extra = velocityFactor.get();
    if (extra) {
      moveBy += Math.sign(extra) * Math.min(Math.abs(extra) * 0.18, 0.65);
    }

    baseX.set(baseX.get() - moveBy);
  });

  // Seamless wrap between -50% and 0%
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  // Partners array with staggered float delays for visible wave effect
  const rawList =
    brandPartners && brandPartners.length > 0
      ? brandPartners
      : [
          { id: "tata", name: "TATA Steel", preset: "tata" },
          { id: "jsw", name: "JSW Steel", preset: "jsw" },
          { id: "kajaria", name: "Kajaria", preset: "kajaria" },
          { id: "jcb", name: "JCB Earthmoving", preset: "jcb" },
          { id: "ultratech", name: "UltraTech Cement", preset: "ultratech" },
        ];

  const brandList = rawList.map((p, idx) => ({
    id: p.id || `partner-${idx}`,
    delay: (idx * 0.4) % 2.4,
    component: renderPartnerLogo(p),
  }));

  // Repeat for continuous infinite flow
  const fullList =
    brandList.length >= 8
      ? [...brandList, ...brandList]
      : [...brandList, ...brandList, ...brandList, ...brandList];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-2.5 sm:py-3 bg-gradient-to-r from-blue-50 via-sky-100 to-blue-50 dark:from-[#051330] dark:via-[#0E3574] dark:to-[#051330] border-y border-blue-200 dark:border-sky-400/50 overflow-hidden shadow-md dark:shadow-2xl select-none z-20"
    >
      {/* Blue & White Combo Ambient Lighting Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Core Crisp White Runway Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-[80%] bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[32px]" />
        {/* Sky-Blue Aura Halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-blue-600/25 via-sky-400/40 to-blue-600/25 blur-[20px]" />
      </div>

      {/* Glossy White & Blue Specular Shimmer */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-y-0 w-40 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 z-25"
      />

      {/* Edge Gradient Mask for Smooth Seamless Horizon Fade */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        
        {/* Kinetic Scrolling Track */}
        <motion.div
          style={{ x }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-center gap-8 sm:gap-12 md:gap-14 w-max cursor-pointer py-1"
        >
          {fullList.map((brand, idx) => (
            <motion.div
              key={`${brand.id}-${idx}`}
              animate={{ y: [-3, 3, -3] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: brand.delay,
              }}
              whileHover={{ scale: 1.12, y: -4 }}
              className="flex items-center justify-center transition-all duration-200"
            >
              {brand.component}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
