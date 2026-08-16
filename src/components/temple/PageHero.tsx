"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Sparkles, Home } from "lucide-react";

interface PageHeroProps {
  badge?: string;
  title: string;
  titleGold?: string;
  description: string;
  breadcrumb: string;
}

export function PageHero({
  badge,
  title,
  titleGold,
  description,
  breadcrumb,
}: PageHeroProps) {
  return (
    <section className="relative pt-24 pb-8 md:pt-28 md:pb-10 bg-gradient-to-r from-[#2A0C14] via-[#3C0F1A] to-[#1F070E] text-white border-b-2 border-[var(--gold)]/40 shadow-xl overflow-hidden">
      {/* Ambient Backdrop Glow */}
      <div className="absolute top-0 right-1/4 size-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-temple max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Left Text Content */}
          <div className="space-y-2">
            {/* Breadcrumb Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-1.5 text-xs text-amber-200/80 font-medium"
            >
              <Link href="/" className="hover:text-[var(--gold)] transition-colors flex items-center gap-1">
                <Home className="size-3 text-[var(--gold)]" />
                <span>Home</span>
              </Link>
              <ChevronRight className="size-3 text-[var(--gold)]/70" />
              <span className="text-[var(--gold)] font-bold">{breadcrumb}</span>
            </motion.div>

            {/* Page Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight"
            >
              {title} {titleGold && <span className="text-gradient-gold italic">{titleGold}</span>}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-xs sm:text-sm text-amber-100/80 max-w-xl font-normal leading-relaxed"
            >
              {description}
            </motion.p>
          </div>

          {/* Right Badge Pill */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[var(--gold)]/15 border border-[var(--gold)]/40 text-[var(--gold)] text-xs font-bold shrink-0 shadow-lg backdrop-blur-md"
            >
              <Sparkles className="size-3.5 text-[var(--gold)]" />
              <span>{badge}</span>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
