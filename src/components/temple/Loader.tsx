"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n = Math.min(100, n + Math.random() * 9 + 3);
      setPct(Math.floor(n));
      if (n >= 100) {
        clearInterval(id);
        setTimeout(() => setDone(true), 350);
        setTimeout(() => onDone(), 1100);
      }
    }, 110);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "radial-gradient(circle at 50% 60%, #1a120b 0%, #0a0604 80%)" }}
        >
          {/* glow */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 50% 55%, color-mix(in oklab, var(--gold) 35%, transparent), transparent 55%)",
            }}
          />
          {/* temple silhouette */}
          <motion.svg
            viewBox="0 0 400 260"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] max-w-[90vw] text-[oklch(0.22_0.03_60)]"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            aria-hidden
          >
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.30 0.04 60)" />
                <stop offset="100%" stopColor="oklch(0.10 0.02 50)" />
              </linearGradient>
            </defs>
            <path
              fill="url(#g)"
              d="M0 260 V200 H40 V160 H70 L90 130 L100 100 L110 70 L120 40 L130 70 L140 100 L150 130 L170 160 H230 L250 130 L260 100 L270 70 L280 40 L290 70 L300 100 L310 130 L330 160 H360 V200 H400 V260 Z"
            />
          </motion.svg>

          <div className="relative z-10 flex flex-col items-center gap-6 text-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative size-24 rounded-full grid place-items-center animate-glow-pulse overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.92 0.16 88) 0%, oklch(0.72 0.18 55) 70%)",
              }}
            >
              <img
                src="/logo.png"
                alt="Ambabai Mahalaxmi Kolhapur Logo"
                className="size-20 object-contain"
              />
            </motion.div>
            <div className="font-serif text-3xl tracking-wide text-gradient-gold">Ambabai Mahalaxmi</div>
            <div className="w-64 h-px bg-white/15 overflow-hidden">
              <motion.div
                className="h-full"
                style={{
                  background: "linear-gradient(90deg, oklch(0.85 0.14 85), oklch(0.70 0.17 55))",
                }}
                animate={{ width: `${pct}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
            <div className="text-xs tracking-[0.3em] uppercase text-white/60">
              Awakening · {pct}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
