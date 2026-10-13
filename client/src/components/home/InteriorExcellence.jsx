import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { soundManager } from "../../lib/sound";
import { useCMS } from "../../context/CMSContext";

export const allInteriorSpaces = [
  {
    id: "living-room",
    number: "01",
    title: "LUXURY LIVING ROOM",
    category: "Living Suite",
    image: "/images/interior/living_room.jpg",
    paragraph: "A double-height living salon framed by bookmatched Italian marble accents, bespoke low-profile seating, warm acoustic ceiling battens, and recessed cove lighting.",
  },
  {
    id: "modular-kitchen",
    number: "02",
    title: "MODULAR KITCHEN STUDIO",
    category: "Culinary Suite",
    image: "/images/interior/modular_kitchen.jpg",
    paragraph: "Monolithic quartz waterfall island integrated with smart induction, soft-close acrylic cabinetry, concealed pantry storage, and designer warm accent fixtures.",
  },
  {
    id: "master-bedroom",
    number: "03",
    title: "MASTER BEDROOM SANCTUARY",
    category: "Private Suite",
    image: "/images/interior/master_bedroom.jpg",
    paragraph: "A serene master sanctuary anchored by backlit natural teak wall battens, plush upholstered headboard, circadian lighting, and custom dressing vanity.",
  },
  {
    id: "dining-room",
    number: "04",
    title: "BESPOKE DINING PAVILION",
    category: "Dining Suite",
    image: "/images/interior/dining_room.jpg",
    paragraph: "Formal dining space blending smoked quartz dining surface, ergonomic velvet dining chairs, sculptural pendant lighting, and seamless exterior glass connection.",
  },
  {
    id: "foyer-pooja",
    number: "05",
    title: "ENTRANCE FOYER & MANDIR",
    category: "Foyer Suite",
    image: "/images/interior/foyer_pooja.jpg",
    paragraph: "Grand arrival foyer featuring laser-cut geometric brass partitions, serene dedicated pooja alcove, backlit alabaster niche, and integrated storage credenza.",
  },
  {
    id: "luxury-bathroom",
    number: "06",
    title: "SPA WELLNESS BATHROOM",
    category: "Wellness Suite",
    image: "/images/interior/luxury_bathroom.jpg",
    paragraph: "A wellness retreat clad in large-format porcelain stone tiling, freestanding soaking tub, concealed German thermostatic fittings, and frameless glass shower enclosure.",
  },
  {
    id: "family-lounge",
    number: "07",
    title: "EXECUTIVE FAMILY LOUNGE",
    category: "Lounge Suite",
    image: "/images/interior/family_lounge.jpg",
    paragraph: "Private upstairs lounge engineered with acoustic fluted paneling, bespoke media console, integrated book library, and plush modular sectional seating.",
  },
  {
    id: "staircase-lobby",
    number: "08",
    title: "DUPLEX STAIRCASE LOBBY",
    category: "Architectural Lobby",
    image: "/images/interior/staircase_lobby.jpg",
    paragraph: "Cantilevered floating timber tread staircase paired with structural glass balustrades, recessed riser LED illumination, and vertical architectural atrium volume.",
  },
  {
    id: "balcony-terrace",
    number: "09",
    title: "OUTDOOR BALCONY DECK",
    category: "Terrace Suite",
    image: "/images/interior/balcony_terrace.jpg",
    paragraph: "Weather-resistant teak deck featuring contemporary outdoor lounge seating, biophilic vertical garden wall, ambient low-voltage illumination, and city skyline vistas.",
  },
];

export const InteriorExcellence = ({ onInquiryClick, onExploreMore }) => {
  const { interior } = useCMS();
  const displaySpaces = Array.isArray(interior) ? interior : allInteriorSpaces;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const timerRef = useRef(null);

  // Store previous offsets to detect circular wrap jumps and suppress transform transition
  const prevOffsetsRef = useRef({});

  // Screen size detector
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pre-decode all interior textures to ensure instant 60fps GPU caching
  useEffect(() => {
    displaySpaces.forEach((space) => {
      const img = new Image();
      img.src = space.image;
    });
  }, [displaySpaces]);

  // Continuous Automatic Animation (Smooth 2.8s autoplay, resets on interaction)
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displaySpaces.length);
    }, 2800);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [displaySpaces.length]);

  const handleNext = () => {
    soundManager?.playHapticClick?.(500);
    setActiveIndex((prev) => (prev + 1) % displaySpaces.length);
    startTimer();
  };

  const handlePrev = () => {
    soundManager?.playHapticClick?.(500);
    setActiveIndex((prev) => (prev - 1 + displaySpaces.length) % displaySpaces.length);
    startTimer();
  };

  const handleCardClick = (idx) => {
    if (idx === activeIndex) {
      if (onExploreMore) onExploreMore();
    } else {
      soundManager?.playHapticClick?.(600);
      setActiveIndex(idx);
      startTimer();
    }
  };

  // Circular offset calculation for 9 cards: [-4, -3, -2, -1, 0, 1, 2, 3, 4]
  const getOffset = (index) => {
    const total = displaySpaces.length;
    let offset = (index - activeIndex) % total;
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;
    return offset;
  };

  // Scrolltide "Depth Carousel" 3D Transform Calculation
  // Turns each card further edge-on as it recedes, until sides stack into slivers
  const getCardStyle = (index, item) => {
    const offset = getOffset(index);
    const absOffset = Math.abs(offset);
    const isCenter = offset === 0;

    // Detect wrap jumps across boundary (e.g. -4 to +4)
    const prevOffset = prevOffsetsRef.current[item.id] !== undefined ? prevOffsetsRef.current[item.id] : offset;
    const isWrapping = Math.abs(offset - prevOffset) > 1.5;

    let translateX = 0;
    let translateZ = 0;
    let rotateY = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 100;
    let pointerEvents = "auto";

    if (isCenter) {
      // 1. Center Active Hero Card: Wide, flat facing camera
      translateX = 0;
      translateZ = 0;
      rotateY = 0;
      scale = 1;
      opacity = 1;
      zIndex = 100;
    } else if (absOffset === 1) {
      // 2. Immediate Left/Right Card: Angled in 3D
      const sign = Math.sign(offset);
      translateX = isMobile ? sign * 120 : sign * 230;
      translateZ = isMobile ? -75 : -130;
      rotateY = isMobile ? sign * -35 : sign * -44;
      scale = isMobile ? 0.85 : 0.86;
      opacity = 0.88;
      zIndex = 80;
    } else if (absOffset === 2) {
      // 3. Second Layer (Sliver 1): Steeper edge-on angle, stacking behind
      const sign = Math.sign(offset);
      translateX = isMobile ? sign * 195 : sign * 385;
      translateZ = isMobile ? -145 : -250;
      rotateY = isMobile ? sign * -56 : sign * -66;
      scale = isMobile ? 0.72 : 0.74;
      opacity = 0.65;
      zIndex = 60;
    } else if (absOffset === 3) {
      // 4. Third Layer (Sliver 2): Deep edge-on sliver, stacking close
      const sign = Math.sign(offset);
      translateX = isMobile ? sign * 245 : sign * 490;
      translateZ = isMobile ? -210 : -350;
      rotateY = isMobile ? sign * -72 : sign * -78;
      scale = isMobile ? 0.62 : 0.64;
      opacity = 0.42;
      zIndex = 40;
    } else {
      // 5. Outer Edge Layer (Sliver 3 / Edge Dissolve): Barely visible sliver dissolving into edges
      const sign = Math.sign(offset);
      translateX = isMobile ? sign * 280 : sign * 565;
      translateZ = isMobile ? -270 : -430;
      rotateY = isMobile ? sign * -80 : sign * -84;
      scale = isMobile ? 0.54 : 0.56;
      opacity = 0.18;
      zIndex = 20;
      pointerEvents = "none";
    }

    // Suppress animation when wrapping behind the scenes so it snaps instantly without flying across
    const transition = isWrapping
      ? "none"
      : "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1)";

    return {
      style: {
        transform: `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        zIndex,
        pointerEvents,
        transition,
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        willChange: "transform, opacity",
      },
      isCenter,
    };
  };

  // Update previous offsets after each render commit
  useEffect(() => {
    displaySpaces.forEach((item, index) => {
      prevOffsetsRef.current[item.id] = getOffset(index);
    });
  }, [activeIndex, displaySpaces]);

  return (
    <section
      id="interior"
      className="relative w-full py-20 sm:py-24 bg-gradient-to-b from-[#EDF4FB] via-[#E2EDF8] to-[#EDF4FB] dark:from-[#08183A] dark:via-[#0D2456] dark:to-[#08183A] border-y border-sky-200/60 dark:border-sky-400/25 shadow-inner overflow-hidden transition-colors duration-300"
    >
      {/* Ambient Lighting Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-blue-500/10 dark:bg-sky-500/15 blur-[130px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-slate-200/80 dark:border-white/10 pb-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-sky-400/10 border border-blue-500/20 dark:border-sky-400/30 text-blue-600 dark:text-sky-300 text-xs font-mono font-semibold">
              <Compass className="h-3.5 w-3.5" />
              <span>3D DEPTH CAROUSEL SHOWCASE</span>
            </div>
            <h2 className="font-display text-[26px] sm:text-[32px] font-bold tracking-tight text-slate-900 dark:text-white uppercase">
              Interior Design <span className="text-blue-600 dark:text-sky-400">Architecture Showcase</span>
            </h2>
            <p className="text-[13px] text-slate-600 dark:text-gray-300 leading-relaxed">
              From virtual blueprints to final material curation, explore our multi-dimensional architectural spaces turning into perspective depth.
            </p>
          </div>

          {/* Top-Right Arrow Action Button leading to Interior Landing Page */}
          <div className="shrink-0 flex items-center">
            <button
              onClick={() => {
                soundManager?.playHapticClick?.(600);
                if (onExploreMore) onExploreMore();
              }}
              className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white dark:from-sky-500/20 dark:to-blue-600/30 dark:hover:from-sky-400 dark:hover:to-blue-500 dark:text-sky-300 dark:hover:text-black border border-blue-500 dark:border-sky-400/40 text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-blue-500/20 hover:scale-105"
              title="Explore Interior Landing Page"
            >
              <span>Explore All {allInteriorSpaces.length} Spaces</span>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 dark:bg-sky-400/20 group-hover:bg-white group-hover:text-blue-600 dark:group-hover:bg-black dark:group-hover:text-sky-300 transition-colors">
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </button>
          </div>
        </div>

        {/* 3D DEPTH CAROUSEL STAGE CONTAINER (Scrolltide Plain CSS 3D Depth) */}
        <div
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const touchEndX = e.changedTouches[0].clientX;
            if (touchStartX.current - touchEndX > 50) handleNext();
            else if (touchEndX - touchStartX.current > 50) handlePrev();
          }}
          className="relative py-2 sm:py-4 flex flex-col items-center select-none"
        >
          {/* Edge Dissolve Vignettes: Sides dissolve softly into background like the video */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-16 w-16 sm:w-32 bg-gradient-to-r from-[#EDF4FB] dark:from-[#08183A] to-transparent z-40" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-16 w-16 sm:w-32 bg-gradient-to-l from-[#EDF4FB] dark:from-[#08183A] to-transparent z-40" />

          {/* 3D Stage with Hardware Perspective */}
          <div
            className="relative h-[340px] sm:h-[365px] md:h-[385px] w-full flex items-center justify-center"
            style={{
              perspective: "1100px",
              perspectiveOrigin: "50% 50%",
              transformStyle: "preserve-3d",
            }}
          >
            {displaySpaces.map((item, idx) => {
              const { style: cardStyle, isCenter } = getCardStyle(idx, item);

              return (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(idx)}
                  style={{
                    ...cardStyle,
                    transformStyle: "preserve-3d",
                  }}
                  className={`absolute w-[290px] sm:w-[335px] md:w-[370px] h-[310px] sm:h-[330px] md:h-[345px] rounded-3xl overflow-hidden cursor-pointer group flex flex-col p-3.5 sm:p-4 bg-white dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#081533] border ${
                    isCenter
                      ? "ring-2 ring-sky-400 dark:ring-sky-400 shadow-[0_0_35px_rgba(56,189,248,0.30)] dark:shadow-[0_0_40px_rgba(56,189,248,0.40)] border-sky-400/60"
                      : "ring-1 ring-slate-300/60 dark:ring-white/10 hover:ring-sky-400/50 dark:hover:ring-sky-400/50 border-slate-200/80 dark:border-sky-400/20 shadow-lg"
                  }`}
                >
                  {/* Active Card Ambient Glow Halo (Pure GPU) */}
                  {isCenter && (
                    <div className="pointer-events-none absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-blue-500/20 via-sky-400/30 to-blue-600/20" />
                  )}

                  {/* Top Photo Container - Crisp, Full-Width */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="eager"
                      decoding="async"
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                        isCenter ? "scale-105 group-hover:scale-108" : "scale-100"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Card Content Details - Tight & Compact Spacing */}
                  <div className="pt-2.5 pb-0.5 space-y-1 flex-1 flex flex-col justify-start">
                    {/* Interior Name */}
                    <h3 className="font-display text-[15px] sm:text-[16.5px] font-bold text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors leading-snug truncate">
                      {item.title}
                    </h3>

                    {/* Paragraph (Max 3 Lines, directly under title) */}
                    <p className="text-[12px] sm:text-[12.5px] text-slate-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                      {item.paragraph}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls (Chevron Buttons & Pagination Dots) */}
          <div className="flex items-center justify-center gap-4 mt-6 z-50">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-white dark:bg-[#0C1B3E] border border-slate-200 dark:border-sky-400/30 text-slate-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors shadow-md cursor-pointer hover:scale-105"
              title="Previous Space"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {displaySpaces.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleCardClick(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex
                      ? "w-7 bg-blue-600 dark:bg-sky-400 shadow-md shadow-sky-400/40"
                      : "w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40"
                  }`}
                  title={`View space 0${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-white dark:bg-[#0C1B3E] border border-slate-200 dark:border-sky-400/30 text-slate-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-sky-400 transition-colors shadow-md cursor-pointer hover:scale-105"
              title="Next Space"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom Callout / Navigation to Landing Page */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              soundManager?.playHapticClick?.(600);
              if (onExploreMore) onExploreMore();
            }}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 hover:from-blue-500 hover:to-sky-400 text-white font-mono text-xs font-bold tracking-wider uppercase shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all cursor-pointer"
          >
            <span>Explore All {allInteriorSpaces.length} Curated Interior Spaces</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
