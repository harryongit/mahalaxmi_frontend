"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";

// Only the 3 Official Temple Assets
const HERO_SLIDES = [
  {
    id: "devi-darshan",
    src: "/assets/devi.png",
    title: "श्री अंबाबाई महालक्ष्मी माता दर्शन",
    englishTitle: "Goddess Shri Ambabai Mahalaxmi Darshan",
  },
  {
    id: "puja-seva",
    src: "/assets/puja.png",
    title: "पवित्र महापूजा व अभिषेक सेवा",
    englishTitle: "Sacred Puja & Vedic Abhishek",
  },
  {
    id: "temple-sanctum",
    src: "/assets/temple.png",
    title: "श्री क्षेत्र करवीर निवासिनी महालक्ष्मी मंदिर",
    englishTitle: "Shri Mahalaxmi Mandir Kolhapur",
  },
];

// Fluid Directional Swipe Animation Variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? "100%" : "-100%",
    opacity: 0.5,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: {
      x: { duration: 0.75, ease: [0.25, 1, 0.5, 1] as const },
      opacity: { duration: 0.4 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction >= 0 ? "-100%" : "100%",
    opacity: 0.5,
    transition: {
      x: { duration: 0.75, ease: [0.25, 1, 0.5, 1] as const },
      opacity: { duration: 0.4 },
    },
  }),
};

export function Hero() {
  const [[currentIndex, direction], setSlideState] = useState([0, 1]);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const currentSlide = HERO_SLIDES[currentIndex];

  const paginate = (newDirection: number) => {
    setSlideState(([prevIndex]) => {
      const nextIndex = (prevIndex + newDirection + HERO_SLIDES.length) % HERO_SLIDES.length;
      return [nextIndex, newDirection];
    });
  };

  const jumpToSlide = (targetIndex: number) => {
    setSlideState(([prevIndex]) => {
      const dir = targetIndex >= prevIndex ? 1 : -1;
      return [targetIndex, dir];
    });
  };

  // Continuous 4-Second Automatic Swipe
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) paginate(1); // Swipe left -> next
      else paginate(-1);         // Swipe right -> prev
    }
    setTouchStartX(null);
  };

  const scrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("book-puja");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/rituals";
    }
  };

  return (
    <section
      id="home"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-[100svh] min-h-[580px] max-h-[860px] w-full overflow-hidden flex flex-col justify-between items-start text-left pt-24 sm:pt-28 pb-4 select-none"
    >
      {/* ========================================================================= */}
      {/* 1. BACKGROUND IMAGE DISPLAY (devi.png, puja.png, temple.png)              */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 size-full"
            style={{ willChange: "transform" }}
          >
            <img
              src={currentSlide.src}
              alt={currentSlide.englishTitle}
              className="size-full object-cover object-center"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Soft Vignette Gradient: Ensures text on left is clear while image remains vibrant */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(10, 2, 5, 0.92) 0%, rgba(10, 2, 5, 0.72) 42%, rgba(10, 2, 5, 0.28) 68%, rgba(10, 2, 5, 0.50) 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(10, 2, 5, 0.65) 0%, transparent 22%, transparent 78%, rgba(8, 1, 3, 0.95) 100%)",
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. REFINED, PROFESSIONAL LEFT-ALIGNED HERO CONTENT                        */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-auto">
        <div className="max-w-xl text-left space-y-3.5 sm:space-y-4">
          
          {/* Sacred Invocation Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-amber-400/40 backdrop-blur-md shadow-md"
          >
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-serif font-bold text-xs sm:text-[13px] text-amber-300 tracking-wide">
              ॥ श्री करवीर निवासिनी महालक्ष्मी प्रसन्न ॥
            </span>
          </motion.div>

          {/* Clean, Elegant Temple Title (No clutter, prominent gold gradient) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-1"
          >
            <h1 className="font-cinzel-dec text-2xl sm:text-4xl lg:text-[50px] font-bold text-white tracking-wide leading-[1.18] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Shri Ambabai <br />
              <span className="text-gradient-gold">Mahalaxmi Mandir</span>
            </h1>
          </motion.div>

          {/* Crisp, Professional 1-Sentence Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-200/90 text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-lg"
          >
            Dakshin Kashi, Kolhapur — Sacred 51 Shakti Peetha. Book authentic daily Pujas, Abhishek & Gotra Sankalpa with sanctified Prasad.
          </motion.p>

          {/* Refined Action Buttons (Primary CTA + Quick Link) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-2 flex flex-wrap items-center justify-start gap-3"
          >
            <a
              href="#book-puja"
              onClick={scrollToBooking}
              className="py-3 px-6 sm:px-7 rounded-full bg-gradient-to-r from-[var(--gold)] via-amber-300 to-amber-500 text-stone-950 font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:shadow-[0_0_40px_rgba(245,158,11,0.75)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Flame className="size-4 text-stone-950" />
              <span>Book Puja Seva Online</span>
            </a>

            <Link
              href="/darshan-timings"
              className="py-3 px-5 rounded-full bg-black/45 hover:bg-black/65 border border-amber-400/40 hover:border-amber-400 text-amber-200 hover:text-white text-xs sm:text-sm font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Darshan Timings</span>
              <ArrowRight className="size-3.5 text-amber-300" />
            </Link>
          </motion.div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. REFINED BOTTOM CONTROLS & CAPTION                                      */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-1">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 border-t border-white/10 pt-2.5">
          {/* Active Slide Caption Badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-amber-200 font-serif bg-black/60 px-3.5 py-1 rounded-full border border-amber-400/30 backdrop-blur-md inline-flex items-center gap-2 shadow-sm"
            >
              <Sparkles className="size-3 text-amber-300 shrink-0" />
              <span>{currentSlide.title}</span>
            </motion.div>
          </AnimatePresence>

          {/* Controls: Dots + Compact Prev/Next Chevrons */}
          <div className="flex items-center gap-3">
            {/* 3 Navigation Indicator Dots */}
            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => jumpToSlide(idx)}
                  className={`transition-all rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? "w-7 h-1.5 bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                      : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Chevrons neatly docked in bottom bar (no longer floating over text) */}
            <div className="flex items-center gap-1 pl-2 border-l border-white/15">
              <button
                type="button"
                onClick={() => paginate(-1)}
                className="size-7 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 hover:border-amber-400/60 text-white/80 hover:text-amber-200 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                className="size-7 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 hover:border-amber-400/60 text-white/80 hover:text-amber-200 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
