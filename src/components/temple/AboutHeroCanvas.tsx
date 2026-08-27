"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 50;

function pad(n: number) {
  return String(n).padStart(3, "0");
}

export function AboutHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];
    
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/temple-frames/ezgif-frame-${pad(i)}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setLoaded(true);
        }
      };
      imgArray.push(img);
    }
    setImages(imgArray);
  }, []);

  // Draw frame on canvas
  const drawImage = (index: number) => {
    if (!loaded || !canvasRef.current || !images[index - 1]) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    
    const img = images[index - 1];
    
    // Fill background black to avoid edge artifacts
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Draw centered, covering the canvas like object-fit: cover
    const scale = Math.max(
      canvasRef.current.width / img.width,
      canvasRef.current.height / img.height
    );
    const w = img.width * scale;
    const h = img.height * scale;
    const x = canvasRef.current.width / 2 - w / 2;
    const y = canvasRef.current.height / 2 - h / 2;
    
    ctx.drawImage(img, x, y, w, h);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    drawImage(Math.round(latest));
  });

  useEffect(() => {
    // Initial draw once loaded
    if (loaded && canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      drawImage(1);
    }
    
    // Handle resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        drawImage(Math.round(frameIndex.get()));
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loaded]);

  // Story Points Setup (7 Points)
  // We'll create custom animation values for each point
  // 1: Arrival (0.00 - 0.08)
  const o1 = useTransform(scrollYProgress, [0, 0.04, 0.08], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.04, 0.08], [0, 0, -25]);

  // 2: Sacred Heritage (0.15 - 0.26)
  const o2 = useTransform(scrollYProgress, [0.13, 0.15, 0.24, 0.26], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.13, 0.15, 0.24, 0.26], [30, 0, 0, -25]);

  // 3: 51 Shakti Peethas (0.30 - 0.40)
  const o3 = useTransform(scrollYProgress, [0.28, 0.30, 0.38, 0.40], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.28, 0.30, 0.38, 0.40], [30, 0, 0, -25]);

  // 4: Architecture (0.45 - 0.55)
  const o4 = useTransform(scrollYProgress, [0.43, 0.45, 0.53, 0.55], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.43, 0.45, 0.53, 0.55], [30, 0, 0, -25]);

  // 5: Craftsmanship (0.60 - 0.70)
  const o5 = useTransform(scrollYProgress, [0.58, 0.60, 0.68, 0.70], [0, 1, 1, 0]);
  const y5 = useTransform(scrollYProgress, [0.58, 0.60, 0.68, 0.70], [30, 0, 0, -25]);

  // 6: The Shikhara (0.75 - 0.85)
  const o6 = useTransform(scrollYProgress, [0.73, 0.75, 0.83, 0.85], [0, 1, 1, 0]);
  const y6 = useTransform(scrollYProgress, [0.73, 0.75, 0.83, 0.85], [30, 0, 0, -25]);

  // 7: Return (0.90 - 1.00)
  const o7 = useTransform(scrollYProgress, [0.88, 0.90, 1.0, 1.0], [0, 1, 1, 1]);
  const y7 = useTransform(scrollYProgress, [0.88, 0.90, 1.0, 1.0], [30, 0, 0, 0]);

  const [progressText, setProgressText] = useState("01 — HERITAGE");

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.10) setProgressText("01 — HERITAGE");
    else if (v < 0.3) setProgressText("02 — SHAKTI");
    else if (v < 0.45) setProgressText("03 — ARCHITECTURE");
    else if (v < 0.6) setProgressText("04 — CRAFT");
    else if (v < 0.75) setProgressText("05 — SHIKHARA");
    else setProgressText("06 — HERITAGE");
  });

  const cardStyle = "bg-black/30 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl";

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-black text-white">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        <canvas ref={canvasRef} className="absolute inset-0 size-full object-cover" />
        
        {/* Subtle Dark Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Corner Vignette Blur to hide watermarks */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none backdrop-blur-xl" 
          style={{
            maskImage: 'radial-gradient(ellipse 90% 90% at center, transparent 40%, black 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at center, transparent 40%, black 95%)'
          }}
        />

        {/* Loading State */}
        {!loaded && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
            <span className="text-sm font-serif tracking-widest text-white/50 animate-pulse">ENTERING TEMPLE...</span>
          </div>
        )}

        {/* Global Progress Indicator */}
        <motion.div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-40 hidden md:flex">
          <span className="text-[10px] tracking-widest font-mono text-white/50">01</span>
          <div className="w-[1px] h-32 bg-white/20 relative">
            <motion.div 
              className="absolute top-0 w-[1px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>
          <span className="text-[10px] tracking-widest font-mono text-white/50">06</span>
          <motion.div className="absolute top-[120%] -left-12 rotate-90 whitespace-nowrap text-[8px] tracking-[0.3em] font-bold text-white/30 uppercase">
            {progressText}
          </motion.div>
        </motion.div>

        {/* --- STORY BLOCKS --- */}
        <div className="absolute inset-0 z-20 pointer-events-none p-6 md:p-16 flex items-center">
          
          {/* 1: Arrival (Centered) */}
          <motion.div 
            style={{ opacity: o1, y: y1 }}
            animate={progressText !== "01 — HERITAGE" ? { opacity: 0, display: "none" } : { display: "flex" }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 drop-shadow-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-white tracking-wide shadow-black/50">
              SHRI MAHALAXMI AMBABAI MANDIR
            </h1>
            <p className="mt-4 text-xl md:text-3xl font-serif text-white/90">
              The Divine Heart of Kolhapur
            </p>
            <div className="mt-12 flex flex-col items-center gap-2 text-white/60">
              <span className="text-[10px] uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">Scroll to explore</span>
              <div className="w-[1px] h-10 bg-gradient-to-b from-white/50 to-transparent animate-pulse mt-2" />
            </div>
          </motion.div>

          {/* 2: Sacred Heritage (Right Aligned) */}
          <motion.div 
            style={{ opacity: o2, y: y2 }}
            className={`absolute right-8 md:right-32 top-1/2 -translate-y-1/2 max-w-[340px] ${cardStyle}`}
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-4 font-bold">01 / Heritage</div>
            <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/20 pb-6">A Living Temple</h2>
            <p className="text-sm font-medium leading-relaxed text-white/90">
              Shri Mahalaxmi Ambabai Mandir is one of the most revered temples of Kolhapur.
            </p>
          </motion.div>

          {/* 3: 51 Shakti Peethas (Left Aligned) */}
          <motion.div 
            style={{ opacity: o3, y: y3 }}
            className={`absolute left-8 md:left-32 top-1/2 -translate-y-1/2 max-w-[340px] ${cardStyle}`}
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-4 font-bold">02 / Shakti</div>
            <div className="text-7xl font-serif text-white mb-2 leading-none text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500">51</div>
            <h2 className="text-2xl font-serif text-white mb-6 border-b border-white/20 pb-6">SHAKTI PEETHAS</h2>
            <p className="text-sm font-medium leading-relaxed text-white/90">
              The temple holds an important place in the Shakti tradition and is deeply revered by devotees.
            </p>
          </motion.div>

          {/* 4: Architecture (Right Aligned, slightly lower) */}
          <motion.div 
            style={{ opacity: o4, y: y4 }}
            className={`absolute right-8 md:right-32 top-[60%] -translate-y-1/2 max-w-[340px] ${cardStyle}`}
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-4 font-bold">03 / Architecture</div>
            <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/20 pb-6">A Geometry of Devotion</h2>
            <p className="text-sm font-medium leading-relaxed text-white/90">
              Every column, carving and ornamental detail contributes to the temple's sacred character.
            </p>
          </motion.div>

          {/* 5: Details/Craftsmanship (Left Aligned) */}
          <motion.div 
            style={{ opacity: o5, y: y5 }}
            className={`absolute left-8 md:left-32 top-1/2 -translate-y-1/2 max-w-[340px] ${cardStyle}`}
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-4 font-bold flex items-center gap-4">
              04 / Craftsmanship
            </div>
            <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/20 pb-6">Every Stone Tells a Story</h2>
            <p className="text-sm font-medium leading-relaxed text-white/90">
              Intricate pillars, carvings and sculptural details preserve centuries of craftsmanship.
            </p>
          </motion.div>

          {/* 6: The Shikhara (Top Right Aligned) */}
          <motion.div 
            style={{ opacity: o6, y: y6 }}
            className={`absolute right-8 md:right-32 top-[40%] -translate-y-1/2 max-w-[340px] ${cardStyle}`}
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-4 font-bold">05 / The Shikhara</div>
            <h2 className="text-3xl font-serif text-white mb-6 border-b border-white/20 pb-6">From Stone Toward the Sky</h2>
            <p className="text-sm font-medium leading-relaxed text-white/90">
              A vertical expression of devotion, geometry and architectural tradition.
            </p>
          </motion.div>

          {/* 7: Return (Centered) */}
          <motion.div 
            style={{ opacity: o7, y: y7 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <div className={`inline-block ${cardStyle} p-10 md:p-12`}>
              <div className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-6 font-bold">06 / Sanctuary</div>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 border-b border-white/20 pb-8">A LIVING HERITAGE</h2>
              <div className="text-lg font-serif text-white/90 space-y-2">
                <p>Ancient tradition.</p>
                <p>Living devotion.</p>
                <p>One sacred home.</p>
              </div>
            </div>
          </motion.div>
          
        </div>

      </div>
    </div>
  );
}
