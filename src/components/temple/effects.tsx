"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

// Lightweight floating particles / petals using pure CSS animations.
export function Particles({
  count = 14,
  kind = "dust",
}: {
  count?: number;
  kind?: "dust" | "petal" | "spark";
}) {
  // reduce on mobile
  const [n, setN] = useState(count);
  useEffect(() => {
    const apply = () => setN(window.innerWidth < 768 ? Math.max(5, Math.floor(count / 2)) : count);
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [count]);

  const items = useMemo(
    () =>
      Array.from({ length: n }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: kind === "petal" ? 10 + Math.random() * 14 : 2 + Math.random() * 4,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 18,
        drift: Math.random() > 0.5 ? "float-up" : "drift-down",
      })),
    [n, kind],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute block rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background:
              kind === "petal"
                ? "radial-gradient(circle at 30% 30%, #fff2c2, #f5a623 70%, #a04a00)"
                : kind === "spark"
                  ? "radial-gradient(circle, rgba(255,220,140,0.95), rgba(255,180,80,0))"
                  : "radial-gradient(circle, rgba(255,240,200,0.7), rgba(255,200,120,0))",
            borderRadius: kind === "petal" ? "60% 40% 70% 30% / 50% 60% 40% 50%" : "9999px",
            animation: `${kind === "petal" ? "drift-down" : p.drift} ${p.duration}s linear ${p.delay}s infinite`,
            filter: kind === "spark" ? "blur(0.5px)" : undefined,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}

export function SunRays() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 50% -10%, rgba(255,210,140,0.55) 0%, rgba(255,180,90,0.15) 25%, transparent 60%)",
        mixBlendMode: "screen",
      }}
    />
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[var(--saffron)]">
      <span className="h-px w-10 bg-current opacity-50" />
      <span className="text-xs uppercase tracking-[0.35em]">{children}</span>
      <span className="h-px w-10 bg-current opacity-50" />
    </div>
  );
}
