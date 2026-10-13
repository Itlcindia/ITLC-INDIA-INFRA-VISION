import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "../../lib/utils";

export const MagneticButton = ({
  children,
  className,
  onClick,
  magneticStrength = 0.35,
  variant = "primary", // "primary" | "secondary" | "glass"
  ...props
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * magneticStrength;
    const deltaY = (clientY - centerY) * magneticStrength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const variantStyles = {
    primary: "bg-gradient-to-r from-blue-600 via-sky-400 to-blue-700 text-white font-bold hover:brightness-110 shadow-xl shadow-sky-500/40 border border-sky-300/60 hover:shadow-sky-400/60 ring-1 ring-white/30",
    secondary: "bg-[#0D1D44] text-white border border-sky-400/50 hover:border-sky-400 hover:bg-sky-500/25 hover:text-white shadow-xl",
    glass: "glass-pill text-white hover:border-sky-400 hover:text-white shadow-xl",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm tracking-wide transition-colors duration-200 cursor-pointer overflow-hidden group",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {isHovered && (
        <motion.span
          layoutId="magnetic-glow"
          className="absolute inset-0 -z-0 bg-white/10 rounded-full"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  );
};
