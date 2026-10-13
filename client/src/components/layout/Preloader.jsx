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
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian-void text-white bg-cad-grid"
      >
        {/* Animated Laser Crosshair */}
        <div className="relative mb-8 h-24 w-24 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-sky-400/30 border-dashed"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-12 w-12 rounded-full border border-blue-400/60 flex items-center justify-center"
          >
            <div className="h-2 w-2 rounded-full bg-sky-400 shadow-lg shadow-sky-400" />
          </motion.div>
          
          {/* Laser Crosshair lines */}
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-sky-400/40 to-transparent" />
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        </div>

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
