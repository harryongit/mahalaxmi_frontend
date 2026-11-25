"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  ChevronLeft,
  ChevronRight,
  Sparkles,
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
    }, 4000);
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
      className="relative min-h-[92vh] sm:min-h-screen w-full overflow-hidden flex flex-col justify-between items-start text-left pt-28 sm:pt-36 pb-6 select-none"
    >
      {/* ========================================================================= */}
      {/* 1. THREE OFFICIAL BACKGROUND IMAGES (devi.png, puja.png, temple.png)       */}
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

        {/* High-Contrast Gradient: Left-to-right vignette so left text is crystal clear while image is vibrant */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(8, 1, 3, 0.90) 0%, rgba(8, 1, 3, 0.75) 45%, rgba(8, 1, 3, 0.40) 75%, rgba(8, 1, 3, 0.60) 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(8, 1, 3, 0.70) 0%, transparent 25%, transparent 75%, rgba(6, 1, 2, 0.92) 100%)",
          }}
        />
      </div>

      {/* Manual Swipe Chevron Buttons */}
      <button
        type="button"
        onClick={() => paginate(-1)}
        className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 size-11 rounded-full bg-black/55 hover:bg-black/85 border border-amber-400/60 hover:border-amber-300 text-amber-200 hover:text-white backdrop-blur-md items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-2xl"
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-5" />
      </button>

      <button
        type="button"
        onClick={() => paginate(1)}
        className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 size-11 rounded-full bg-black/55 hover:bg-black/85 border border-amber-400/60 hover:border-amber-300 text-amber-200 hover:text-white backdrop-blur-md items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-2xl"
        aria-label="Next slide"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* ========================================================================= */}
      {/* 2. LEFT-ALIGNED HERO CONTENT                                              */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-auto">
        <div className="max-w-2xl text-left space-y-4 sm:space-y-6">
          
          {/* Sacred Sanskrit Invocation Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/75 border border-amber-400/60 backdrop-blur-md shadow-xl"
          >
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-serif font-bold text-xs sm:text-sm text-amber-300 tracking-wide">
              ॥ श्री करवीर निवासिनी महालक्ष्मी प्रसन्न ॥
            </span>
            <span className="text-amber-400/50">•</span>
            <span className="text-xs text-stone-200 font-medium">Kolhapur</span>
          </motion.div>

          {/* Temple Name / Headline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
              Shri Ambabai Mahalaxmi Temple
            </h1>
            <div className="font-serif text-xl sm:text-3xl lg:text-4xl font-semibold text-amber-300 tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Dakshin Kashi · Kolhapur
            </div>
          </motion.div>

          {/* Mandatory 1-Line Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-stone-100 text-sm sm:text-base font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] max-w-xl"
          >
            Official digital portal. Book daily Puja, Abhishek and Gotra Sankalpa with sacred prasad delivered to your home.
          </motion.p>

          {/* Single Primary Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pt-2 flex flex-wrap items-center justify-start gap-3.5"
          >
            <a
              href="#book-puja"
              onClick={scrollToBooking}
              className="py-3.5 sm:py-4 px-8 sm:px-10 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-stone-950 font-bold text-sm sm:text-base shadow-[0_0_35px_rgba(245,158,11,0.6)] hover:shadow-[0_0_50px_rgba(245,158,11,0.85)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <Flame className="size-5 text-stone-950" />
              <span>Book Puja Seva Online</span>
            </a>
          </motion.div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MINIMAL SLIDE INDICATORS & PROPER HIGH-CONTRAST CAPTION                */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/10 pt-3">
          {/* Caption with Sparkles icon instead of emoji */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="text-xs sm:text-sm text-amber-200 font-serif bg-black/75 px-4 py-1.5 rounded-full border border-amber-400/40 backdrop-blur-md inline-flex items-center gap-2 shadow-lg"
            >
              <Sparkles className="size-3.5 text-amber-300 shrink-0" />
              <span>{currentSlide.title}</span>
            </motion.div>
          </AnimatePresence>

          {/* 3 Clean Navigation Dots */}
          <div className="flex items-center gap-2.5">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => jumpToSlide(idx)}
                className={`transition-all rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? "w-8 h-2 bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                    : "w-2.5 h-2.5 bg-white/45 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}: ${slide.englishTitle}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
