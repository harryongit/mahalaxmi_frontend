"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Volume2, VolumeX } from "lucide-react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Ensure video starts playing automatically across all devices
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay was prevented, playing muted fallback:", err);
      });
    }
  }, []);

  const toggleAudio = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
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
      className="relative min-h-[92vh] sm:min-h-screen w-full overflow-hidden flex flex-col justify-between items-center text-center pt-28 sm:pt-36 pb-6 select-none"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC BACKGROUND VIDEO (/assets/hero-video.mp4)                     */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/assets/hero-video.mp4"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          poster="/assets/gallery/IMG-20261009-WA0014.jpg"
          className="size-full object-cover object-center scale-105"
        />

        {/* High-Contrast Cinematic Gradient Overlays */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(8, 1, 3, 0.76) 0%, rgba(8, 1, 3, 0.48) 35%, rgba(8, 1, 3, 0.58) 65%, rgba(5, 1, 2, 0.92) 100%)",
          }}
        />
        {/* Radial Vignette for focused center typography */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(5, 1, 2, 0.65) 100%)",
          }}
        />
      </div>

      {/* Audio Mute/Unmute Floating Button */}
      <button
        type="button"
        onClick={toggleAudio}
        className="absolute right-4 sm:right-8 bottom-6 z-30 inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/85 border border-amber-400/50 text-amber-200 text-xs font-semibold backdrop-blur-md shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
        title={isMuted ? "Unmute Temple Video Audio" : "Mute Audio"}
        aria-label={isMuted ? "Unmute Temple Video Audio" : "Mute Audio"}
      >
        {isMuted ? (
          <>
            <VolumeX className="size-4 text-amber-400" />
            <span className="hidden sm:inline text-[11px]">Unmute Audio</span>
          </>
        ) : (
          <>
            <Volume2 className="size-4 text-emerald-400 animate-pulse" />
            <span className="hidden sm:inline text-[11px]">Audio Playing</span>
          </>
        )}
      </button>

      {/* ========================================================================= */}
      {/* 2. HERO CONTENT                                                            */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 my-auto space-y-5 sm:space-y-6">
        
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
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
            Shri Ambabai Mahalaxmi Temple
          </h1>
          <div className="font-serif text-xl sm:text-3xl md:text-4xl font-semibold text-amber-300 tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            Dakshin Kashi · Kolhapur
          </div>
        </motion.div>

        {/* Mandatory 1-Line Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-stone-100 text-sm sm:text-base max-w-lg mx-auto font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
        >
          Official digital portal. Book daily Puja, Abhishek and Gotra Sankalpa with sacred prasad delivered to your home.
        </motion.p>

        {/* Single Primary Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="pt-2 flex justify-center"
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

      {/* ========================================================================= */}
      {/* 3. BOTTOM CINEMATIC DARSHAN BADGE                                          */}
      {/* ========================================================================= */}
      <div className="relative z-20 pb-2">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xs sm:text-sm text-amber-200 font-serif bg-black/80 px-4 py-1.5 rounded-full border border-amber-400/40 backdrop-blur-md inline-flex items-center gap-2 shadow-lg"
        >
          <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
          <span>श्री अंबाबाई महालक्ष्मी मंदिर • पवित्र दर्शन</span>
        </motion.div>
      </div>
    </section>
  );
}
