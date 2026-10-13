import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame, animate, useTransform } from "framer-motion";
import {
  Star,
  Quote,
  ShieldCheck,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BorderBeam } from "../ui/BorderBeam";
import { soundManager } from "../../lib/sound";

const testimonials = [
  {
    id: 1,
    name: "Dr. Alok Mehrotra",
    role: "Senior Consultant Surgeon",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
    project: "The Obsidian Villa (6,500 Sq.Ft)",
    location: "Golf City, Lucknow",
    rating: 5,
    review:
      "Our turnkey construction experience with ITLC InfraVision was truly unmatched. From foundation casting to Italian marble fit-out, every single milestone was delivered ahead of schedule. The zero cost-overrun clause was 100% honored.",
  },
  {
    id: 2,
    name: "Sunita & Arvind Verma",
    role: "Tech Founders & Investors",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    project: "Skyline Royal Penthouse (4,200 Sq.Ft)",
    location: "Shaheed Path, Lucknow",
    rating: 5,
    review:
      "Their interior architecture and double-height acoustic glazing finish rival five-star luxury hotel suites. Daily structural test reports for FE-550D rebar and M-25 grade concrete were transparently uploaded to our client portal.",
  },
  {
    id: 3,
    name: "Rajesh Agarwal",
    role: "Managing Director, Logistics",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    project: "Commercial Landmark (12,000 Sq.Ft)",
    location: "Vibhuti Khand, Gomti Nagar",
    rating: 5,
    review:
      "Finding a genuine EPC contractor of this caliber in Lucknow was a challenge until we partnered with InfraVision. Their structural engineering and municipal clearance teams are fully OSHA and IS-compliant. We received our certified structural quality clearance certificate on the exact day of handover.",
  },
  {
    id: 4,
    name: "Col. Sanjeev Rawat (Retd.)",
    role: "Veteran & Estate Owner",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    project: "Verdant Aura Mansion (5,400 Sq.Ft)",
    location: "Vipin Khand, Gomti Nagar",
    rating: 5,
    review:
      "Zero-compromise engineering is genuinely practiced by ITLC. From subterranean raft casting to solar pergola integration, their weekly CCTV drone audit logs gave our entire family complete peace of mind.",
  },
  {
    id: 5,
    name: "Priya & Rohit Tandon",
    role: "Creative Director & Architect",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    project: "The Glass Monolith (8,200 Sq.Ft)",
    location: "Sultanpur Road Corridor",
    rating: 5,
    review:
      "As an architect, I scrutinized every single millimeter. InfraVision executed our cantilevered floorplates and shadow-line cove reveals with micro-millimeter precision. Truly benchmark luxury quality.",
  },
  {
    id: 6,
    name: "Er. Vikram Singhania",
    role: "Infrastructure Lead",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    project: "Corporate Landmark (15,000 Sq.Ft)",
    location: "Transport Nagar Hub",
    rating: 5,
    review:
      "Post-tensioned slab casting without beams requires elite civil expertise. InfraVision's on-site testing labs executed column-free expansive spaces with zero structural deflection.",
  },
];

// Individual 3D Card with Enhanced Inward Cylindrical Curvature & Compact Height
const Testimonial3DCard = ({
  item,
  idx,
  stepAngle,
  rotation,
  radius,
  onCardClick,
  activeIndex,
}) => {
  const cardBaseAngle = idx * stepAngle;

  // Real-time culling: Smoothly fade out cards orbiting beyond 80 degrees
  const opacity = useTransform(rotation, (val) => {
    const total = cardBaseAngle + val;
    const norm = ((total % 360) + 540) % 360 - 180;
    const abs = Math.abs(norm);
    if (abs > 80) return 0;
    return Math.max(0, 1 - (abs / 80) * 0.45);
  });

  const pointerEvents = useTransform(rotation, (val) => {
    const total = cardBaseAngle + val;
    const norm = ((total % 360) + 540) % 360 - 180;
    return Math.abs(norm) > 80 ? "none" : "auto";
  });

  const isFocal = idx === activeIndex;

  return (
    <motion.div
      onClick={() => onCardClick(idx)}
      style={{
        transform: `rotateY(${cardBaseAngle}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
        opacity,
        pointerEvents,
      }}
      // Compact size: 280px-305px width, 255px-268px height (Zero wasted vertical space)
      className="absolute w-[280px] sm:w-[305px] h-[255px] sm:h-[268px] -left-[140px] sm:-left-[152px] -top-[127px] sm:-top-[134px] cursor-pointer"
    >
      {/* Enhanced Inward Cylindrical Curved Glass Panel */}
      <div
        className={`relative w-full h-full rounded-[24px/16px] p-4 sm:p-4.5 flex flex-col justify-between transition-all duration-300 overflow-hidden ${
          isFocal
            ? "bg-white dark:bg-gradient-to-b dark:from-[#16306B] dark:via-[#0E1F47] dark:to-[#08122B] border-2 border-blue-500 dark:border-sky-400 shadow-xl shadow-blue-500/15 dark:shadow-sky-500/35 scale-100 text-slate-800 dark:text-white"
            : "bg-white/90 dark:bg-gradient-to-b dark:from-[#0F224D] dark:to-[#091533] border border-blue-300 dark:border-sky-400/35 ring-1 ring-blue-100 dark:ring-sky-300/15 opacity-90 hover:opacity-100 scale-95 shadow-md dark:shadow-xl dark:shadow-black/80 text-slate-700 dark:text-white"
        }`}
        style={{
          boxShadow: isFocal
            ? "0 20px 40px rgba(30, 58, 138, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)"
            : "0 10px 25px rgba(30, 58, 138, 0.06)",
        }}
      >
        {/* Prominent Inward Curved Neon Rim Highlights on Left & Right */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-sky-400/30 dark:from-sky-400/40 via-sky-400/10 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-sky-400/30 dark:from-sky-400/40 via-sky-400/10 to-transparent" />

        {/* Subtle top cylindrical curve edge line */}
        <div className="pointer-events-none absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Neon border beam on active focal card */}
        {isFocal && (
          <BorderBeam size={200} duration={8} colorFrom="#FFFFFF" colorTo="#38BDF8" />
        )}

        {/* Top Header: Circular User Avatar + Name + Stars (Tight spacing) */}
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-sky-400/20 relative z-10 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Circular User Avatar Image */}
            <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-blue-500 dark:border-sky-400/70 shadow-md shadow-blue-500/10 shrink-0">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>

            <div className="min-w-0">
              <h4 className="font-display text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white truncate">
                {item.name}
              </h4>
              <p className="text-[10px] text-slate-600 dark:text-gray-300 font-medium truncate">
                {item.role}
              </p>
            </div>
          </div>

          {/* 5 Stars Rating */}
          <div className="flex items-center gap-0.5 text-amber-500 dark:text-sky-400 shrink-0">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="h-2.5 w-2.5 fill-amber-400 dark:fill-sky-400 stroke-none" />
            ))}
          </div>
        </div>

        {/* Card Body: Review Quote in compact sleek font with zero wasted space */}
        <div className="py-1 relative z-10 my-0.5">
          <p className="text-[11px] text-slate-700 dark:text-gray-100 leading-relaxed font-sans italic line-clamp-3">
            "{item.review}"
          </p>
        </div>

        {/* Card Footer: Project Name + Location */}
        <div className="pt-2 border-t border-slate-200 dark:border-sky-400/20 flex items-center justify-between text-[10px] font-mono relative z-10 shrink-0">
          <span className="text-blue-700 dark:text-sky-300 truncate font-bold">
            {item.project}
          </span>
          <span className="flex items-center gap-1 text-slate-600 dark:text-gray-400 text-[9px] font-medium shrink-0">
            <MapPin className="h-2.5 w-2.5 text-blue-600 dark:text-sky-400 shrink-0" />
            <span>{item.location}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const TestimonialsSection = () => {
  const total = testimonials.length; // 6 cards
  const stepAngle = 360 / total; // 60 degrees

  // Framer Motion motion value for 60/120Hz GPU-accelerated rotation
  const rotation = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [radius, setRadius] = useState(280);

  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);

  // Responsive radius calculation
  useEffect(() => {
    const updateRadius = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setRadius(165); // Mobile
      } else if (window.innerWidth < 1024) {
        setRadius(230); // Tablet
      } else {
        setRadius(280); // Desktop (compact & sleek)
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Continuous Automatic Slow Rotation with Instant Hover-Pause
  useAnimationFrame((time, delta) => {
    // PAUSE immediately when cursor enters or during drag
    if (isHovered || isDragging) return;

    // Smooth continuous slow rotation: ~4.5 degrees per second
    const speed = 0.0075;
    const nextAngle = rotation.get() - delta * speed;
    rotation.set(nextAngle);

    // Update active index smoothly
    const currentActive = (Math.round(-nextAngle / stepAngle) % total + total) % total;
    if (currentActive !== activeIndex) {
      setActiveIndex(currentActive);
    }
  });

  // Navigate Next Card
  const handleNext = () => {
    soundManager.playHapticClick(720, 0.04);
    const current = rotation.get();
    const target = Math.round(current / stepAngle) * stepAngle - stepAngle;
    animate(rotation, target, {
      type: "spring",
      stiffness: 140,
      damping: 20,
    });
    setActiveIndex((Math.round(-target / stepAngle) % total + total) % total);
  };

  // Navigate Previous Card
  const handlePrev = () => {
    soundManager.playHapticClick(600, 0.04);
    const current = rotation.get();
    const target = Math.round(current / stepAngle) * stepAngle + stepAngle;
    animate(rotation, target, {
      type: "spring",
      stiffness: 140,
      damping: 20,
    });
    setActiveIndex((Math.round(-target / stepAngle) % total + total) % total);
  };

  // Click on a specific card to orbit it to front
  const handleCardClick = (index) => {
    soundManager.playHapticClick(800, 0.03);
    const current = rotation.get();
    const currentNorm = ((current % 360) + 540) % 360 - 180;
    const targetNorm = -index * stepAngle;
    let diff = targetNorm - currentNorm;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    animate(rotation, current + diff, {
      type: "spring",
      stiffness: 140,
      damping: 20,
    });
    setActiveIndex(index);
  };

  // Pointer drag gestures
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragStartAngle.current = rotation.get();
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = currentX - dragStartX.current;
    rotation.set(dragStartAngle.current + deltaX * 0.35);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap to nearest card angle with spring
    const current = rotation.get();
    const snapped = Math.round(current / stepAngle) * stepAngle;
    animate(rotation, snapped, {
      type: "spring",
      stiffness: 160,
      damping: 20,
    });
    setActiveIndex((Math.round(-snapped / stepAngle) % total + total) % total);
    soundManager.playHapticClick(680, 0.03);
  };

  return (
    <section
      id="testimonials"
      className="relative w-full py-20 bg-gradient-to-b from-[#EDF4FB] via-[#E2EDF8] to-[#EDF4FB] dark:from-[#08183A] dark:via-[#0D2456] dark:to-[#08183A] border-y border-sky-200/60 dark:border-sky-400/25 shadow-inner select-none overflow-hidden transition-colors duration-300"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-sky-400/10 dark:bg-sky-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-3 relative z-10">
        <h2 className="font-display text-[26px] sm:text-[31px] font-bold tracking-tight text-slate-900 dark:text-white">
          Client <span className="text-blue-600 dark:text-sky-400">Testimonials</span>
        </h2>
        <p className="text-[13px] text-slate-600 dark:text-gray-400 leading-relaxed">
          Verified trust from premier homeowners and enterprise leaders across Lucknow — explore real project milestones in our interactive 3D spatial orbit.
        </p>
      </div>

      {/* 3D CYLINDER STAGE (Compact Height: 420px) */}
      <div
        className="relative w-full h-[400px] sm:h-[430px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          if (isDragging) handlePointerUp();
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* The 3D Rotating Cylinder Axis (Dead-Center 0,0) */}
        <motion.div
          style={{
            rotateY: rotation,
            transformStyle: "preserve-3d",
          }}
          className="relative w-0 h-0 flex items-center justify-center"
        >
          {testimonials.map((item, idx) => (
            <Testimonial3DCard
              key={item.id}
              item={item}
              idx={idx}
              stepAngle={stepAngle}
              rotation={rotation}
              radius={radius}
              onCardClick={handleCardClick}
              activeIndex={activeIndex}
            />
          ))}
        </motion.div>

        {/* Floor Reflection Mirror Line */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[480px] max-w-full h-[25px] bg-gradient-to-r from-transparent via-sky-500/15 to-transparent blur-xl pointer-events-none" />
        <div className="absolute 0 left-1/2 -translate-x-1/2 w-[320px] max-w-full h-[1px] bg-gradient-to-r from-transparent via-sky-400/50 to-transparent pointer-events-none" />
      </div>

      {/* Minimalist Bottom Navigation Arrows */}
      <div className="relative z-20 flex items-center justify-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          className="h-9 w-9 rounded-full bg-white dark:bg-[#0C1B3E] hover:bg-blue-50 dark:hover:bg-[#142D66] border border-slate-200 dark:border-sky-400/40 hover:border-blue-400 dark:hover:border-sky-400/70 flex items-center justify-center text-slate-700 dark:text-white transition-all cursor-pointer shadow-md dark:shadow-lg active:scale-95 group"
          title="Previous Review"
        >
          <ChevronLeft className="h-4 w-4 text-blue-600 dark:text-sky-400 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={handleNext}
          className="h-9 w-9 rounded-full bg-white dark:bg-[#0C1B3E] hover:bg-blue-50 dark:hover:bg-[#142D66] border border-slate-200 dark:border-sky-400/40 hover:border-blue-400 dark:hover:border-sky-400/70 flex items-center justify-center text-slate-700 dark:text-white transition-all cursor-pointer shadow-md dark:shadow-lg active:scale-95 group"
          title="Next Review"
        >
          <ChevronRight className="h-4 w-4 text-blue-600 dark:text-sky-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
      </div>
    </section>
  );
};
