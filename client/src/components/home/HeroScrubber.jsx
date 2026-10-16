import React, { useRef, useState, useEffect } from "react";

export const HeroScrubber = ({ onExploreClick, onCalculatorClick }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const targetTimeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const isRafRunningRef = useRef(false);
  const animFrameRef = useRef(null);
  const [progressPercent, setProgressPercent] = useState(0);

  // Autoplay and user interaction tracking
  const isAutoplayingRef = useRef(true);
  const hasUserInteractedRef = useRef(false);

  // 3 Construction Lifecycle Stages
  const stages = [
    {
      id: 1,
      number: "01",
      title: "Ground Foundation",
      description: "Earth excavation, site grading, and high-strength concrete foundation pouring.",
      range: [0, 35],
    },
    {
      id: 2,
      number: "02",
      title: "Structural Construction",
      description: "Monolithic RCC framing, rebar grid erection, and modern facade bonding.",
      range: [35, 70],
    },
    {
      id: 3,
      number: "03",
      title: "Handover & Finished",
      description: "Turnkey interior detailing, bespoke luxury living lounge, and key handover.",
      range: [70, 100],
    },
  ];

  // Exact live website RAF LERP loop with 40ms seek throttle (~25fps native sync)
  const renderLoop = () => {
    const video = videoRef.current;
    if (!video) {
      isRafRunningRef.current = false;
      return;
    }

    const target = targetTimeRef.current;
    const current = video.currentTime;
    const diff = target - current;

    if (Math.abs(diff) > 0.002) {
      const now = performance.now();
      // ⭐️ 40ms throttle matching video's native 24-25fps frame rate
      if (now - lastFrameTimeRef.current > 40) {
        // ⭐️ 0.15 LERP factor for buttery smooth inertial glide
        video.currentTime = current + diff * 0.15;
        lastFrameTimeRef.current = now;
      }

      const duration = video.duration;
      if (duration > 0) {
        const pct = Math.round((video.currentTime / duration) * 100);
        setProgressPercent(pct);
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    } else {
      video.currentTime = target;
      isRafRunningRef.current = false;
      const duration = video.duration;
      if (duration > 0) {
        const pct = Math.round((target / duration) * 100);
        setProgressPercent(pct);
      }
    }
  };

  // Direct scroll calculation matching live site
  const handleScroll = () => {
    if (!containerRef.current || !videoRef.current) return;

    // If user has scrolled down past initial threshold, immediately stop autoplay
    if (window.scrollY > 15 && isAutoplayingRef.current) {
      isAutoplayingRef.current = false;
      hasUserInteractedRef.current = true;
      videoRef.current.pause();
    }

    // While autoplay is active at top of page, scroll calculation should not fight video playback
    if (isAutoplayingRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const height = rect.height;
    const winH = window.innerHeight;
    const scrolled = -rect.top;
    const scrollableDist = height - winH;

    if (scrollableDist <= 0) return;

    let fraction = scrolled / scrollableDist;
    fraction = Math.min(1, Math.max(0, fraction));

    const duration = videoRef.current.duration;
    if (!isNaN(duration) && duration > 0) {
      targetTimeRef.current = fraction * duration;
      if (!isRafRunningRef.current) {
        isRafRunningRef.current = true;
        animFrameRef.current = requestAnimationFrame(renderLoop);
      }
    }
  };

  // Helper to start smooth balanced autoplay on initial load
  const startAutoplay = () => {
    const video = videoRef.current;
    if (!video || hasUserInteractedRef.current) return;

    if (window.scrollY > 25) {
      isAutoplayingRef.current = false;
      hasUserInteractedRef.current = true;
      handleScroll();
      return;
    }

    isAutoplayingRef.current = true;
    video.playbackRate = 0.9; // Balanced cinematic speed so all stages are clearly observable
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay may be restricted if browser requires user gesture
        isAutoplayingRef.current = false;
      });
    }
  };

  // Helper to stop autoplay permanently and transition to scroll scrubbing
  const stopAutoplayAndSwitchToScroll = () => {
    if (isAutoplayingRef.current) {
      isAutoplayingRef.current = false;
      hasUserInteractedRef.current = true;
      const video = videoRef.current;
      if (video) {
        video.pause();
      }
    }
  };

  // User input listener (wheel, touchmove, keys)
  const onUserInteraction = () => {
    if (isAutoplayingRef.current) {
      stopAutoplayAndSwitchToScroll();
      handleScroll();
    }
  };

  // Continuous sync of progress indicators during autoplay
  const handleTimeUpdate = () => {
    if (isAutoplayingRef.current && videoRef.current) {
      const video = videoRef.current;
      if (video.duration > 0) {
        const pct = Math.min(100, Math.round((video.currentTime / video.duration) * 100));
        setProgressPercent(pct);
      }
    }
  };

  // When video completes its autoplay run naturally
  const handleVideoEnded = () => {
    if (isAutoplayingRef.current) {
      isAutoplayingRef.current = false;
      setProgressPercent(100);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.preload = "auto";

    // Check if initial scroll is at top
    if (window.scrollY <= 25) {
      startAutoplay();
    } else {
      isAutoplayingRef.current = false;
      hasUserInteractedRef.current = true;
      handleScroll();
    }

    // Interaction listeners: any scroll, wheel, or touch will cancel autoplay and switch to scroll
    const onWheel = () => onUserInteraction();
    const onTouchMove = () => onUserInteraction();
    const onKeyDown = (e) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Space"].includes(e.code)) {
        onUserInteraction();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", handleScroll);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const currentStage =
    progressPercent < 35
      ? stages[0]
      : progressPercent < 70
      ? stages[1]
      : stages[2];

  return (
    <div
      id="hero-container"
      ref={containerRef}
      className="relative h-[400vh] bg-[#F1F5F9] dark:bg-obsidian-void transition-colors duration-500"
    >
      {/* Pinned Sticky Viewport: Height extended up to header with bottom fixed */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-2 sm:pt-2.5 pb-2 px-3 sm:px-6 lg:px-8 select-none">
        
        {/* Subtle Ambient Radial Lighting Glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/3 w-[850px] h-[850px] rounded-full bg-blue-600/10 dark:bg-blue-600/15 blur-[140px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-sky-400/10 blur-[120px]" />
        </div>

        {/* MAIN STAGE: Extended all the way to top under header while bottom stays fixed */}
        <div className="flex-1 w-full max-w-[1540px] mx-auto flex flex-col items-center justify-center min-h-0 z-10 pb-1.5">
          {/* EXPANDED FULL-HEIGHT WIDESCREEN RECTANGULAR BOX */}
          <div className="w-full h-full relative rounded-3xl border border-sky-400/35 overflow-hidden shadow-2xl bg-black">
            
            {/* The Continuous Cinematic Video */}
            <div className="absolute inset-0 z-10 overflow-hidden">
              <video
                ref={videoRef}
                src="/videos/hero_construction_smooth.mp4"
                muted
                autoPlay
                playsInline
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                onLoadedMetadata={() => {
                  if (window.scrollY <= 25 && !hasUserInteractedRef.current) {
                    startAutoplay();
                  } else {
                    handleScroll();
                  }
                }}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Subtle Top Vignette Scrim for Crystal-Clear Navbar Contrast */}
            <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/50 via-black/15 to-transparent pointer-events-none z-20" />

            {/* ◀️ LEFT SIDE: 3-Stage Progress Sliders */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-30 flex flex-col gap-3 w-[200px] sm:w-[240px] pointer-events-none">
              {stages.map((stage) => {
                const [start, end] = stage.range;
                const span = end - start;
                const stageProgress = Math.min(
                  100,
                  Math.max(0, ((progressPercent - start) / span) * 100)
                );
                const isActive =
                  progressPercent >= start &&
                  (progressPercent < end || stage.id === 3);
                const isCompleted = progressPercent >= end;

                return (
                  <div key={stage.id} className="space-y-1">
                    {/* Horizontal Blue-fill Track Line */}
                    <div className="relative h-1 w-full bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-300 transition-all duration-150 ease-out"
                        style={{ width: `${stageProgress}%` }}
                      />
                    </div>
                    {/* Stage Label Below Line */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-display text-[12px] tracking-wide transition-colors duration-200 ${
                          isActive || isCompleted
                            ? "text-white font-bold"
                            : "text-white/45 font-medium"
                        }`}
                      >
                        {stage.title}
                      </span>
                      {isCompleted && (
                        <span className="font-mono text-[9px] text-sky-400 font-bold">
                          ✓
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ▶️ RIGHT SIDE: Compact Transparent Frosted Glass Active Progress Card */}
            <div className="absolute bottom-1 right-2.5 sm:bottom-1.5 sm:right-3.5 z-30 pointer-events-none">
              <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 shadow-lg space-y-0.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[9px] sm:text-[9.5px] text-sky-400 font-bold uppercase tracking-wider block">
                    ACTIVE PROGRESS
                  </span>
                  <span className="font-mono text-[9.5px] sm:text-[10px] text-white font-bold bg-white/15 px-1.5 py-0.5 rounded-full border border-white/20">
                    {progressPercent}%
                  </span>
                </div>

                <h3 className="font-display text-[13px] sm:text-[14px] font-bold text-white leading-tight">
                  {currentStage.number} / {currentStage.title}
                </h3>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM TIMELINE SCRUBBER (Spans across the bottom) */}
        <div className="w-full max-w-[1540px] mx-auto z-30 pt-1 pb-1">
          <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-300 transition-all duration-75 ease-out"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
