import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, MoveHorizontal, Compass } from "lucide-react";

export const BlueprintSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-400/10 border border-sky-400/30 font-mono text-xs text-sky-400">
          <Compass className="h-3.5 w-3.5" />
          <span>X-RAY ENGINEERING PROOF</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Blueprint to <span className="text-sky-400">Reality</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Drag the slider to experience how our architectural CAD blueprints seamlessly translate into turnkey luxury estates.
        </p>
      </div>

      {/* Interactive X-Ray Canvas */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[380px] sm:h-[550px] rounded-3xl overflow-hidden border border-sky-500/20 shadow-2xl bg-obsidian-surface cursor-ew-resize select-none"
      >
        {/* Layer 1: Right Side (Finished Luxury Villa) */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop"
            alt="Finished luxury modern villa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          <div className="absolute top-6 right-6 font-mono text-xs text-emerald-400 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/30">
            [ FINISHED LUXURY RESIDENCE ]
          </div>
        </div>

        {/* Layer 2: Left Side (Architectural CAD Blueprint Wireframe) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
            alt="Architectural structure"
            className="w-full h-full object-cover filter invert contrast-150 hue-rotate-180 brightness-75 mix-blend-luminosity"
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%", maxWidth: "none" }}
          />
          {/* Blueprint Grid Overlay */}
          <div className="absolute inset-0 bg-cad-grid bg-blue-950/70" />
          <div className="absolute top-6 left-6 font-mono text-xs text-sky-400 bg-blue-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-sky-400/40">
            [ CAD / BIM STRUCTURAL BLUEPRINT ]
          </div>
        </div>

        {/* Vertical Divider Laser Line */}
        <div
          onMouseDown={handleMouseDown}
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400 via-white to-blue-600 shadow-lg shadow-sky-400/50 cursor-ew-resize z-20"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Drag Handle Button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/90 border-2 border-sky-400 shadow-xl flex items-center justify-center text-sky-400">
            <MoveHorizontal className="h-5 w-5" />
          </div>
        </div>

        {/* Bottom Helper Instruction */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 font-mono text-xs text-gray-300 pointer-events-none flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-sky-400" />
          <span>DRAG SLIDER TO REVEAL ENGINEERING X-RAY</span>
        </div>
      </div>
    </section>
  );
};
