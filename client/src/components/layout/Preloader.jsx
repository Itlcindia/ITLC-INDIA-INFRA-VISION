import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian-void text-white bg-cad-grid"
      >
        {/* 3D Gyroscope with High-Contrast White ITLC Logo Container */}
        <div className="relative mb-8 h-36 w-36 flex items-center justify-center [perspective:800px]">
          {/* Laser Crosshair background lines */}
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-sky-400/40 to-transparent" />
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

          {/* 3D Orbit 1 (Tilted X-Axis) with Orbiting Cyan Photon */}
          <div 
            className="absolute inset-1 rounded-full border-2 border-sky-400/40 border-dotted flex items-start justify-center pointer-events-none"
            style={{
              transformStyle: "preserve-3d",
              animation: "preloaderGyro1 4.5s linear infinite"
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#38bdf8] -mt-1.5" />
          </div>

          {/* 3D Orbit 2 (Tilted Y-Axis) with Orbiting Blue Photon */}
          <div 
            className="absolute inset-4 rounded-full border border-blue-500/50 flex items-end justify-center pointer-events-none"
            style={{
              transformStyle: "preserve-3d",
              animation: "preloaderGyro2 5.5s linear infinite"
            }}
          >
            <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa] -mb-1" />
          </div>

          {/* Center ITLC Logo with White Background for Maximum Visibility */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-20 h-20 rounded-full bg-white border-2 border-sky-400 shadow-xl shadow-sky-500/40 ring-4 ring-sky-400/20 flex items-center justify-center p-2.5"
          >
            <img 
              src="/images/company_logo.png" 
              alt="ITLC Logo" 
              className="w-full h-full object-contain filter drop-shadow-sm" 
            />
          </motion.div>
        </div>

        <style>{`
          @keyframes preloaderGyro1 {
            0% { transform: rotateX(65deg) rotateZ(0deg); }
            100% { transform: rotateX(65deg) rotateZ(360deg); }
          }
          @keyframes preloaderGyro2 {
            0% { transform: rotateY(65deg) rotateZ(0deg); }
            100% { transform: rotateY(65deg) rotateZ(-360deg); }
          }
        `}</style>

        {/* Brand typography */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="font-display text-2xl font-bold tracking-[0.3em] text-white">
            INFRA <span className="text-sky-400">VISION</span>
          </div>
          <div className="mt-2 font-mono text-xs text-sky-200/70 tracking-wider">
            [ INITIALIZING SPATIAL BIM ENGINE: {progress}% ]
          </div>
        </motion.div>

        {/* Minimal Progress Bar */}
        <div className="mt-6 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-white via-sky-400 to-blue-600"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-4 font-mono text-[10px] text-gray-500">
          SYS.LOC // 26.7925° N, 80.9982° E • LUCKNOW
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
