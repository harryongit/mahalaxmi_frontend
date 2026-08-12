"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiOutlineArrowDown } from "react-icons/hi";
import { IMG } from "./images";
import { Particles, SunRays } from "./effects";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // mouse parallax
  const [mp, setMp] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMp({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-[100dvh] min-h-[680px] w-full overflow-hidden"
      style={{ background: "#0a0604" }}
    >
      {/* Background image with parallax + zoom */}
      <motion.div
        className="absolute inset-0"
        style={{
          y,
          scale,
          x: mp.x * -14,
        }}
      >
        <img
          src={IMG.hero}
          alt="Ancient temple at sunrise"
          className="size-full object-cover"
          style={{ filter: "saturate(1.05) contrast(1.02) brightness(0.85)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,4,2,0.45) 0%, rgba(8,4,2,0.15) 35%, rgba(8,4,2,0.55) 80%, #0a0604 100%)",
          }}
        />
      </motion.div>

      {/* moving cloud band */}
      <motion.div
        aria-hidden
        style={{ y: yMid }}
        className="absolute inset-x-0 top-[15%] h-40 opacity-50 pointer-events-none"
      >
        <div
          className="absolute inset-0 animate-scroll-x"
          style={{
            width: "200%",
            background:
              "radial-gradient(ellipse at 10% 50%, rgba(255,255,255,0.35), transparent 40%), radial-gradient(ellipse at 30% 60%, rgba(255,235,200,0.25), transparent 35%), radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.3), transparent 45%), radial-gradient(ellipse at 85% 55%, rgba(255,220,170,0.3), transparent 40%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>

      <SunRays />

      {/* Floating birds (svg) */}
      <FlyingBirds />

      {/* Particles: dust + petals */}
      <Particles count={18} kind="dust" />
      <Particles count={10} kind="petal" />

      {/* Bell (top-left) */}
      <div className="pointer-events-none absolute left-6 top-24 hidden md:block">
        <svg width="60" height="100" viewBox="0 0 60 100" className="animate-swing">
          <line x1="30" y1="0" x2="30" y2="20" stroke="oklch(0.75 0.12 80)" strokeWidth="2" />
          <path
            d="M14 30 Q30 18 46 30 L50 60 Q30 70 10 60 Z"
            fill="url(#bellG)"
            stroke="oklch(0.55 0.12 60)"
            strokeWidth="1"
          />
          <circle cx="30" cy="68" r="3" fill="oklch(0.40 0.10 50)" />
          <defs>
            <linearGradient id="bellG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.90 0.16 88)" />
              <stop offset="100%" stopColor="oklch(0.62 0.14 55)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Diya flame (bottom-right) */}
      <div className="pointer-events-none absolute right-10 bottom-32 hidden md:block">
        <div className="relative">
          <div
            className="w-16 h-6 rounded-full"
            style={{
              background: "linear-gradient(180deg, oklch(0.55 0.12 50), oklch(0.30 0.06 40))",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
            }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 -top-10 w-4 h-12 rounded-full animate-flicker"
            style={{
              background:
                "radial-gradient(ellipse at 50% 80%, #fff7c2, #ffb347 50%, transparent 80%)",
              filter: "blur(0.6px)",
            }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 -top-16 w-24 h-24 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,200,120,0.4), transparent 60%)",
            }}
          />
        </div>
      </div>

      {/* incense smoke */}
      <Smoke />

      {/* Content */}
      <motion.div
        style={{ opacity, x: mp.x * 8, y: mp.y * 8 }}
        className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center gap-3 text-[var(--gold)]"
        >
          <span className="h-px w-10 bg-current opacity-60" />
          <span className="text-xs uppercase tracking-[0.4em]">A Sacred Sanctuary</span>
          <span className="h-px w-10 bg-current opacity-60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-serif mt-6 text-[clamp(3rem,9vw,8rem)] leading-[0.95] tracking-tight"
        >
          Shri <span className="text-gradient-gold">Mandir</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.9 }}
          className="mt-6 max-w-xl text-sm md:text-base text-white/80 font-light"
        >
          Where ancient stones still whisper prayers — a thousand years of devotion, carved in
          silence, glowing in light.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#about" className="btn-gold btn-gold-hover">
            Explore the Temple
          </a>
          <a href="#darshan" className="btn-ghost-gold">
            Virtual Darshan
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70"
        >
          <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <HiOutlineArrowDown />
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Smoke() {
  return (
    <div className="pointer-events-none absolute right-12 bottom-44 hidden md:block">
      {Array.from({ length: 4 }).map((_, i) => (
        <span
          key={i}
          className="absolute block rounded-full"
          style={{
            width: 18,
            height: 18,
            left: Math.sin(i) * 6,
            background: "radial-gradient(circle, rgba(255,255,255,0.45), transparent 70%)",
            animation: `float-up ${6 + i}s linear ${i * 1.2}s infinite`,
            filter: "blur(6px)",
          }}
        />
      ))}
    </div>
  );
}

function FlyingBirds() {
  return (
    <svg
      className="absolute top-[18%] left-0 w-full h-24 opacity-70 pointer-events-none"
      viewBox="0 0 1200 100"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <path
            d="M0 50 q5 -8 10 0 q5 -8 10 0"
            fill="none"
            stroke="rgba(40,30,20,0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from={`${-50 - i * 200} ${i * 12}`}
              to={`${1300 + i * 100} ${i * 12 + 20}`}
              dur={`${22 + i * 4}s`}
              repeatCount="indefinite"
            />
          </path>
        </g>
      ))}
    </svg>
  );
}
