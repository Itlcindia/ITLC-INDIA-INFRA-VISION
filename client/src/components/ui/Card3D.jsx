import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

export const Card3D = ({
  children,
  className,
  containerClassName,
  glare = true,
  maxTilt = 12,
  ...props
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Motion values for smooth desktop mouse tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for buttery smooth physics recovery
  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${maxTilt}deg`, `-${maxTilt}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${maxTilt}deg`, `${maxTilt}deg`]);

  // Handle Desktop Mouse Move
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
    setMousePos({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Mobile Hardware Gyroscope Sensor (DeviceOrientation API)
  useEffect(() => {
    const handleOrientation = (e) => {
      if (window.innerWidth > 768) return; // Only on mobile/tablets
      const gamma = e.gamma; // Left to right tilt [-90, 90]
      const beta = e.beta;   // Front to back tilt [-180, 180]

      if (gamma !== null && beta !== null) {
        // Clamp and normalize to [-0.5, 0.5]
        const clampedGamma = Math.max(-30, Math.min(30, gamma)) / 60;
        const clampedBeta = Math.max(-30, Math.min(30, beta - 45)) / 60;
        x.set(clampedGamma);
        y.set(clampedBeta);
      }
    };

    if (window.DeviceOrientationEvent && typeof window.DeviceOrientationEvent.requestPermission !== 'function') {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [x, y]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative [perspective:1000px] transition-all duration-200", containerClassName)}
      {...props}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative rounded-2xl border transition-all duration-300",
          "bg-white/90 dark:bg-gradient-to-b dark:from-[#0F224D]/95 dark:to-[#091533]/95",
          "border-white/80 dark:border-sky-400/35",
          "backdrop-blur-xl p-6 shadow-xl shadow-blue-900/5 dark:shadow-2xl dark:shadow-black/90 ring-1 ring-blue-100/70 dark:ring-sky-300/20",
          isHovered && "shadow-blue-500/15 dark:shadow-sky-500/25 border-blue-400/50 dark:border-sky-400/60 -translate-y-1.5",
          className
        )}
      >
        {/* Dynamic Cursor Spotlight Sheen */}
        {glare && isHovered && (
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.14), transparent 80%)`,
            }}
          />
        )}
        <div style={{ transform: "translateZ(30px)" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};
