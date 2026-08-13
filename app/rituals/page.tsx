"use client";

import { useLenis } from "@/src/lib/use-lenis";
import { Navbar } from "@/src/components/temple/Navbar";
import { Rituals } from "@/src/components/temple/Sections";
import { Footer } from "@/src/components/temple/Footer";
import { motion } from "framer-motion";

export default function RitualsPage() {
  useLenis();

  return (
    <>
      <main className="relative">
        <Navbar />

        {/* Page Hero Banner */}
        <section
          className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden text-white text-center"
          style={{ background: "linear-gradient(180deg, #1a0f08 0%, #2a1508 50%, #0a0604 100%)" }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(212,160,60,0.3), transparent 60%)",
            }}
          />

          <div className="container-temple relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center gap-3 text-[var(--gold)]"
            >
              <span className="h-px w-10 bg-current opacity-60" />
              <span className="text-xs uppercase tracking-[0.4em]">Sacred Traditions</span>
              <span className="h-px w-10 bg-current opacity-60" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
              className="font-serif mt-6 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-tight"
            >
              Daily <span className="text-gradient-gold">Rituals</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="mt-6 max-w-xl mx-auto text-sm md:text-base text-white/75 font-light"
            >
              From the first dawn bell to the night lullaby — discover the sacred rhythms that have
              echoed through Ambabai Mahalaxmi Temple for centuries.
            </motion.p>
          </div>
        </section>

        <Rituals />
        <Footer />
      </main>
    </>
  );
}
