"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  HiOutlineSun,
  HiOutlineFire,
  HiOutlineSparkles,
  HiOutlineMoon,
  HiOutlinePlay,
  HiOutlineVolumeUp,
  HiOutlineVolumeOff,
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiX,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { IMG } from "./images";
import { Particles, Reveal, SectionEyebrow } from "./effects";

/* ----------------------- ABOUT ----------------------- */
export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const ty = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" ref={ref} className="relative py-28 md:py-40 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' /></filter><rect width='100%25' height='100%25' filter='url(%23n)' /></svg>\")",
        }}
      />
      <div className="container-temple grid lg:grid-cols-2 gap-14 items-center relative">
        <motion.div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(80,30,0,0.35)]">
          <motion.img
            src={IMG.about}
            alt="Temple interior, soft lamps glowing"
            className="size-full object-cover"
            style={{ scale, y: ty }}
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-[color-mix(in_oklab,var(--gold)_30%,transparent)] rounded-3xl pointer-events-none" />
          <div
            className="absolute -bottom-6 -right-6 size-28 rounded-full grid place-items-center text-2xl font-serif text-[var(--stone-deep)]"
            style={{
              background: "radial-gradient(circle, oklch(0.92 0.16 88), oklch(0.70 0.17 55))",
              boxShadow: "0 20px 40px -10px color-mix(in oklab, var(--gold) 50%, transparent)",
            }}
          >
            1102 AD
          </div>
        </motion.div>

        <div>
          <Reveal>
            <SectionEyebrow>About the Temple</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] mt-6 leading-[1.05]">
              A sanctuary woven from{" "}
              <span className="text-gradient-gold">stone, fire and song.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-foreground/75 leading-relaxed max-w-xl">
              For nearly a millennium, Shri Mandir has stood as a living testament to devotion.
              Built by master sculptors and consecrated under the morning star, its sanctum still
              holds the same lamp that was first lit by the founding priest.
            </p>
          </Reveal>

          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {[
              { t: "Mission", d: "To preserve sacred tradition with grace and openness." },
              { t: "Vision", d: "A spiritual home for every seeker, of every path." },
              { t: "Values", d: "Reverence. Service. Compassion. Beauty." },
            ].map((b, i) => (
              <Reveal key={b.t} delay={0.3 + i * 0.08}>
                <div className="rounded-2xl p-5 bg-card border border-border hover-lift">
                  <div className="font-serif text-xl text-[var(--maroon)]">{b.t}</div>
                  <p className="mt-2 text-sm text-foreground/70">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- HISTORY ----------------------- */
const milestones = [
  {
    year: "1102",
    title: "The First Stone",
    text: "Master sculptor Vishvakarma lays the foundation upon a riverbank shrine.",
  },
  {
    year: "1387",
    title: "Gopuram Raised",
    text: "Seven tiers of mythological figures rise toward the sky.",
  },
  {
    year: "1612",
    title: "Court Patronage",
    text: "Royal endowment funds the great Mandapam and copper-clad doors.",
  },
  {
    year: "1894",
    title: "Restoration",
    text: "Scholars from across the subcontinent restore the inner sanctum.",
  },
  {
    year: "1978",
    title: "Living Heritage",
    text: "Recognized as a protected monument; daily rituals continue uninterrupted.",
  },
  {
    year: "Today",
    title: "Open to the World",
    text: "A sanctuary welcoming pilgrims and travelers from every continent.",
  },
];

export function History() {
  return (
    <section
      id="history"
      className="relative py-28 md:py-40 bg-[oklch(0.96_0.018_82)] overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(212,160,60,0.18), transparent 50%), radial-gradient(ellipse at 0% 100%, rgba(140,40,40,0.10), transparent 50%)",
        }}
      />
      <div className="container-temple relative">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <SectionEyebrow>Our History</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] mt-6 leading-[1.05]">
              Nine centuries, etched in <span className="text-gradient-gold">stone & memory</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-20 relative">
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--gold) 60%, transparent), color-mix(in oklab, var(--maroon) 50%, transparent), transparent)",
            }}
          />
          <ul className="space-y-16">
            {milestones.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <li key={m.year} className="relative grid md:grid-cols-2 gap-8 items-center">
                  <div
                    className={`${left ? "md:order-1 md:text-right md:pr-16" : "md:order-2 md:pl-16"}`}
                  >
                    <Reveal y={20}>
                      <div className="inline-block">
                        <div className="font-serif text-5xl text-gradient-gold">{m.year}</div>
                        <div className="font-serif text-2xl mt-2">{m.title}</div>
                        <p className="text-foreground/70 mt-3 max-w-md">{m.text}</p>
                      </div>
                    </Reveal>
                  </div>
                  <div className={`${left ? "md:order-2" : "md:order-1"}`} />
                  <span
                    className="absolute left-1/2 -translate-x-1/2 size-4 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, oklch(0.92 0.16 88), oklch(0.65 0.16 55))",
                      boxShadow: "0 0 0 6px rgba(212,160,60,0.15)",
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- ARCHITECTURE ----------------------- */
const archLabels = [
  { id: "gopuram", label: "Gopuram", x: 50, y: 12, d: "The seven-tiered tower of carved deities" },
  {
    id: "entrance",
    label: "Main Entrance",
    x: 50,
    y: 80,
    d: "Copper-clad doors with floral reliefs",
  },
  { id: "mandapam", label: "Mandapam", x: 22, y: 55, d: "Pillared assembly hall for gatherings" },
  { id: "sanctum", label: "Sanctum", x: 76, y: 50, d: "Garbhagriha — the innermost chamber" },
  { id: "pillars", label: "Pillars", x: 30, y: 70, d: "Granite columns with mythic carvings" },
  {
    id: "carvings",
    label: "Carvings",
    x: 70,
    y: 25,
    d: "Bas-reliefs of dancers and celestial beings",
  },
];

export function Architecture() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const [active, setActive] = useState<string>("gopuram");

  return (
    <section
      id="architecture"
      ref={ref}
      className="relative py-28 md:py-40 overflow-hidden bg-[oklch(0.13_0.02_60)] text-white"
    >
      {/* light sweep */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(255,210,140,0.18) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 6s linear infinite",
        }}
      />
      <div className="container-temple relative">
        <div className="max-w-2xl">
          <Reveal>
            <SectionEyebrow>Architecture</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] mt-6 leading-[1.05]">
              A geometry of <span className="text-gradient-gold">devotion.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-white/70 max-w-lg">
              Every column, every carving aligns to a sacred grid — drawing the eye upward, toward
              the sanctum and the sky beyond.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
          <motion.div
            style={{ rotate }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10"
          >
            <img
              src={IMG.architecture}
              alt="Temple architecture"
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {archLabels.map((l) => (
              <button
                key={l.id}
                onMouseEnter={() => setActive(l.id)}
                onFocus={() => setActive(l.id)}
                className="group absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
                style={{ left: `${l.x}%`, top: `${l.y}%` }}
              >
                <span className="relative grid place-items-center">
                  <span
                    className="absolute inset-0 rounded-full animate-glow-pulse"
                    style={{ background: "rgba(212,160,60,0.5)" }}
                  />
                  <span
                    className="relative size-3 rounded-full ring-2 ring-white/60"
                    style={{ background: "oklch(0.85 0.14 80)" }}
                  />
                </span>
                <span
                  className={`whitespace-nowrap text-xs uppercase tracking-[0.25em] px-3 py-1 rounded-full transition-all ${active === l.id
                      ? "bg-[var(--gold)] text-[oklch(0.2_0.02_60)]"
                      : "bg-black/40 text-white/80 backdrop-blur"
                    }`}
                >
                  {l.label}
                </span>
              </button>
            ))}
          </motion.div>

          <div className="space-y-3">
            {archLabels.map((l) => (
              <button
                key={l.id}
                onMouseEnter={() => setActive(l.id)}
                onFocus={() => setActive(l.id)}
                className={`w-full text-left rounded-2xl border px-5 py-4 transition-all ${active === l.id
                    ? "bg-white/[0.06] border-[var(--gold)]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-xl">{l.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">
                    {String(archLabels.indexOf(l) + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-sm text-white/65 mt-1">{l.d}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- RITUALS ----------------------- */
const rituals = [
  {
    time: "5:30 AM",
    title: "Suprabhatam",
    icon: HiOutlineSun,
    text: "The temple awakens with hymns of the dawn.",
  },
  {
    time: "7:00 AM",
    title: "Abhishekam",
    icon: HiOutlineSparkles,
    text: "Sacred bathing of the deity with milk, honey & rose.",
  },
  {
    time: "12:00 PM",
    title: "Archana",
    icon: HiOutlineFire,
    text: "Offerings of flowers, fruit and chanted names.",
  },
  {
    time: "6:30 PM",
    title: "Sandhya Aarti",
    icon: HiOutlineFire,
    text: "Lamps lifted in spirals of golden light.",
  },
  {
    time: "8:30 PM",
    title: "Shayana",
    icon: HiOutlineMoon,
    text: "The deity is laid to rest with whispered lullabies.",
  },
];

export function Rituals() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // sunrise -> sunset gradient
  const bg = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "linear-gradient(180deg, #FFE9C9 0%, #FCF9F3 100%)",
      "linear-gradient(180deg, #FBD9A6 0%, #FCF1DC 100%)",
      "linear-gradient(180deg, #3a1f1a 0%, #1a0f0a 100%)",
    ],
  );
  const textColor = useTransform(scrollYProgress, [0, 0.7, 1], ["#3a2a1a", "#3a2a1a", "#f8efe0"]);

  return (
    <motion.section
      id="rituals"
      ref={ref}
      style={{ background: bg, color: textColor }}
      className="relative py-28 md:py-40 overflow-hidden"
    >
      <div className="container-temple relative">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <SectionEyebrow>Daily Rituals</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] mt-6 leading-[1.05]">
              From the first <span className="text-gradient-gold">dawn-bell</span> to the night
              lullaby.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {rituals.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.title} delay={i * 0.08}>
                <article className="group h-full rounded-2xl p-6 bg-[color-mix(in_oklab,white_70%,transparent)] backdrop-blur border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] hover-lift">
                  <div className="grid size-12 place-items-center rounded-full text-[var(--maroon)] bg-[color-mix(in_oklab,var(--gold)_25%,transparent)] transition-transform duration-500 group-hover:rotate-12">
                    <Icon className="size-6" />
                  </div>
                  <div className="mt-5 text-xs uppercase tracking-[0.3em] text-[var(--saffron)]">
                    {r.time}
                  </div>
                  <div className="font-serif text-2xl mt-1">{r.title}</div>
                  <p className="text-sm opacity-75 mt-2">{r.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

/* ----------------------- FESTIVALS ----------------------- */
export function Festivals() {
  const festivals = [
    { name: "Diwali", date: "Nov 12", desc: "A river of lamps lining every step of the temple." },
    { name: "Maha Shivaratri", date: "Mar 8", desc: "An all-night vigil of chanting and dance." },
    { name: "Navaratri", date: "Oct 14", desc: "Nine nights honoring the divine feminine." },
    {
      name: "Brahmotsavam",
      date: "May 22",
      desc: "Annual chariot procession through the old town.",
    },
  ];
  return (
    <section id="festivals" className="relative py-28 md:py-44 overflow-hidden text-white">
      <div className="absolute inset-0">
        <img
          src={IMG.festival}
          alt="Festival night at the temple"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,8,2,0.55),rgba(8,2,0,0.85))]" />
      </div>
      <Particles count={26} kind="spark" />
      <Particles count={10} kind="petal" />

      {/* rangoli ring */}
      <motion.div
        aria-hidden
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -left-40 top-1/3 w-[420px] h-[420px] opacity-30 pointer-events-none hidden md:block"
      >
        <svg viewBox="0 0 200 200" className="size-full">
          <g fill="none" stroke="oklch(0.85 0.14 75)" strokeWidth="0.5">
            <circle cx="100" cy="100" r="90" />
            <circle cx="100" cy="100" r="70" strokeDasharray="2 4" />
            <circle cx="100" cy="100" r="50" />
            {Array.from({ length: 16 }).map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="10"
                x2="100"
                y2="40"
                transform={`rotate(${i * 22.5} 100 100)`}
              />
            ))}
          </g>
        </svg>
      </motion.div>

      <div className="container-temple relative">
        <div className="max-w-2xl">
          <Reveal>
            <SectionEyebrow>Festivals</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] mt-6 leading-[1.0]">
              Nights of <span className="text-gradient-gold">fire, flowers and song.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-white/75 max-w-lg">
              When the festival season arrives, the temple becomes a beacon visible from miles away
              — every column ribboned in marigold, every lamp lit.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {festivals.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.08}>
              <div className="glass-dark rounded-2xl p-6 hover-lift">
                <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">
                  {f.date}
                </div>
                <div className="font-serif text-3xl mt-2">{f.name}</div>
                <p className="text-sm text-white/70 mt-3">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- VIRTUAL DARSHAN ----------------------- */
export function VirtualDarshan() {
  const [muted, setMuted] = useState(true);
  return (
    <section
      id="darshan"
      className="relative py-28 md:py-40 overflow-hidden bg-[oklch(0.13_0.02_60)] text-white"
    >
      <div className="container-temple relative">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <SectionEyebrow>Virtual Darshan</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] mt-6 leading-[1.05]">
              Step into the <span className="text-gradient-gold">sanctum</span>, from anywhere.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 relative aspect-[16/9] max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 group">
            <img
              src={IMG.darshan}
              alt="Live view of the sanctum"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-transparent to-black/50" />

            <button
              className="absolute inset-0 grid place-items-center"
              aria-label="Play virtual darshan"
            >
              <span className="relative grid place-items-center">
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    animation: "ripple-pulse 2.4s ease-out infinite",
                    background: "color-mix(in oklab, var(--gold) 60%, transparent)",
                  }}
                />
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    animation: "ripple-pulse 2.4s ease-out infinite",
                    animationDelay: "1s",
                    background: "color-mix(in oklab, var(--gold) 60%, transparent)",
                  }}
                />
                <span
                  className="relative grid size-20 md:size-24 place-items-center rounded-full text-[oklch(0.2_0.02_60)] animate-glow-pulse"
                  style={{
                    background: "radial-gradient(circle, oklch(0.92 0.16 88), oklch(0.70 0.17 55))",
                  }}
                >
                  <HiOutlinePlay className="size-8 md:size-10" />
                </span>
              </span>
            </button>

            <button
              onClick={() => setMuted((m) => !m)}
              className="absolute bottom-5 right-5 grid size-11 place-items-center rounded-full glass-dark text-white hover:scale-105 transition-transform"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <HiOutlineVolumeOff /> : <HiOutlineVolumeUp />}
            </button>

            <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs glass-dark">
              <span className="size-2 rounded-full bg-red-500 animate-pulse" />
              Live · 1,284 watching
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------- DONATIONS ----------------------- */
export function Donate() {
  return (
    <section id="donate" className="relative py-28 md:py-40 overflow-hidden">
      <div className="container-temple">
        <div
          className="relative rounded-[2rem] overflow-hidden p-10 md:p-16"
          style={{
            background:
              "radial-gradient(ellipse at 20% 20%, oklch(0.92 0.16 88) 0%, oklch(0.74 0.17 60) 40%, oklch(0.45 0.13 35) 100%)",
          }}
        >
          <Particles count={14} kind="spark" />
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center relative">
            <div>
              <SectionEyebrow>Seva & Donations</SectionEyebrow>
              <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] mt-6 leading-[1.05] text-[oklch(0.20_0.02_60)]">
                Your offering keeps the lamp burning.
              </h2>
              <p className="mt-5 max-w-xl text-[oklch(0.25_0.04_50)]/85">
                Every contribution supports daily rituals, preservation of ancient carvings, and the
                meals served to thousands of pilgrims each day.
              </p>
            </div>

            <div className="relative">
              {/* lotus */}
              <motion.svg
                viewBox="0 0 200 200"
                className="absolute -top-10 -right-6 size-40 opacity-40"
                animate={{ rotate: [0, 8, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <g fill="oklch(0.45 0.18 30 / 0.7)">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ellipse
                      key={i}
                      cx="100"
                      cy="60"
                      rx="18"
                      ry="40"
                      transform={`rotate(${i * 45} 100 100)`}
                    />
                  ))}
                  <circle cx="100" cy="100" r="14" fill="oklch(0.92 0.16 88)" />
                </g>
              </motion.svg>
              <a
                href="#"
                className="relative inline-flex items-center justify-center px-10 py-5 rounded-full font-medium text-[oklch(0.20_0.02_60)] bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] hover:scale-105 transition-transform"
              >
                Donate Now
                <span className="ml-3">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- EVENTS ----------------------- */
export function Events() {
  const events = [
    { date: "Dec 12", name: "Karthikai Deepam", count: { d: 12, h: 8, m: 22 } },
    { date: "Jan 14", name: "Pongal Vizha", count: { d: 45, h: 4, m: 11 } },
    { date: "Feb 26", name: "Annual Yagna", count: { d: 88, h: 17, m: 5 } },
  ];
  return (
    <section id="events" className="relative py-28 md:py-40 bg-[oklch(0.96_0.018_82)]">
      <div className="container-temple">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <SectionEyebrow>Upcoming Events</SectionEyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] mt-6 leading-[1.05]">
                What's <span className="text-gradient-gold">next</span> at the temple
              </h2>
            </Reveal>
          </div>
          <a
            href="#"
            className="btn-ghost-gold !text-foreground !border-[color-mix(in_oklab,var(--gold)_50%,transparent)] !bg-white"
          >
            View calendar
          </a>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {events.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.1}>
              <div className="rounded-2xl bg-card border border-border p-7 hover-lift">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-[0.3em] text-[var(--saffron)]">
                    {e.date}
                  </div>
                  <HiOutlineClock className="text-[var(--maroon)]" />
                </div>
                <h3 className="font-serif text-2xl mt-3">{e.name}</h3>
                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  {[
                    ["Days", e.count.d],
                    ["Hours", e.count.h],
                    ["Mins", e.count.m],
                  ].map(([l, v]) => (
                    <div
                      key={l as string}
                      className="rounded-xl py-3 bg-[color-mix(in_oklab,var(--gold)_15%,transparent)]"
                    >
                      <div className="font-serif text-2xl text-[var(--maroon)]">{v}</div>
                      <div className="text-[10px] uppercase tracking-[0.2em] opacity-70">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- TESTIMONIALS ----------------------- */
const testimonials = [
  {
    name: "Priya Iyer",
    role: "Pilgrim, Bengaluru",
    text: "Walking into the sanctum at dawn — I have never felt so deeply held by silence.",
  },
  {
    name: "Ravi Menon",
    role: "Architect",
    text: "The proportions are perfect. Centuries before geometry was written down, it was carved here.",
  },
  {
    name: "Anya Sharma",
    role: "Devotee, London",
    text: "I visit every December. It is the only place where I remember who I really am.",
  },
  {
    name: "Karthik Reddy",
    role: "Photographer",
    text: "The light at 5:42 AM through the eastern pillar — there's nothing like it on earth.",
  },
  {
    name: "Meera Joshi",
    role: "Volunteer",
    text: "Serving meals here taught me what devotion in action looks like.",
  },
  {
    name: "Arjun Nair",
    role: "Historian",
    text: "A living archive. Every stone has a story, and the priests still know them.",
  },
];

export function Testimonials() {
  const row = [...testimonials, ...testimonials];
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container-temple text-center max-w-2xl mx-auto">
        <SectionEyebrow>Voices of Devotees</SectionEyebrow>
        <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] mt-6 leading-[1.05]">
          A thousand journeys, <span className="text-gradient-gold">one sanctuary.</span>
        </h2>
      </div>
      <div className="mt-14 relative">
        <div className="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        <div className="flex gap-6 animate-scroll-x" style={{ width: "max-content" }}>
          {row.map((t, i) => (
            <article
              key={i}
              className="w-[340px] shrink-0 rounded-2xl glass-panel p-6 shadow-[0_15px_40px_-20px_rgba(80,30,0,0.25)]"
            >
              <p className="text-foreground/85 leading-relaxed">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="size-10 rounded-full grid place-items-center font-serif text-[var(--maroon)] bg-[color-mix(in_oklab,var(--gold)_25%,transparent)]">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="text-xs text-foreground/60">{t.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------- LOCATION ----------------------- */
export function Location() {
  return (
    <section id="contact" className="relative py-28 md:py-40 overflow-hidden">
      <div className="container-temple grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border">
            <img
              src={IMG.location}
              alt="Map of temple location"
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/40" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="relative grid place-items-center">
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    animation: "ripple-pulse 2.4s ease-out infinite",
                    background: "color-mix(in oklab, var(--gold) 70%, transparent)",
                  }}
                />
                <span className="relative grid size-12 place-items-center rounded-full bg-white text-[var(--maroon)] shadow-lg">
                  <HiOutlineLocationMarker className="size-6" />
                </span>
              </span>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <SectionEyebrow>Visit & Contact</SectionEyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] mt-6 leading-[1.05]">
              Find your way to the <span className="text-gradient-gold">sanctuary.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-8 space-y-5 text-foreground/80">
              <li className="flex gap-4">
                <HiOutlineLocationMarker className="size-5 mt-1 text-[var(--saffron)]" />
                <div>
                  <div className="font-medium">Address</div>
                  <div className="text-sm opacity-80">
                    12 Temple Street, Old Town, Tamil Nadu 600001
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <HiOutlineClock className="size-5 mt-1 text-[var(--saffron)]" />
                <div>
                  <div className="font-medium">Open Daily</div>
                  <div className="text-sm opacity-80">
                    5:00 AM – 12:30 PM &nbsp;·&nbsp; 4:00 PM – 9:30 PM
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <HiOutlinePhone className="size-5 mt-1 text-[var(--saffron)]" />
                <div>
                  <div className="font-medium">+91 44 1234 5678</div>
                  <div className="text-sm opacity-80">
                    Parking available across the southern courtyard.
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <HiOutlineMail className="size-5 mt-1 text-[var(--saffron)]" />
                <div>
                  <div className="font-medium">hello@shrimandir.org</div>
                  <div className="text-sm opacity-80">
                    For events, donations and volunteer inquiries.
                  </div>
                </div>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.3}>
            <a href="#" className="mt-10 btn-gold btn-gold-hover">
              Get directions
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- GALLERY w/ Lightbox ----------------------- */
export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const close = () => setOpen(null);
  const prev = () =>
    setOpen((i) => (i === null ? null : (i + IMG.gallery.length - 1) % IMG.gallery.length));
  const next = () => setOpen((i) => (i === null ? null : (i + 1) % IMG.gallery.length));

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section id="gallery" className="relative py-28 md:py-40">
      <div className="container-temple">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <SectionEyebrow>Photo Gallery</SectionEyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] mt-6 leading-[1.05]">
                Moments of <span className="text-gradient-gold">grace.</span>
              </h2>
            </Reveal>
          </div>
          <p className="max-w-sm text-foreground/70">
            Across seasons and ceremonies — selected from the temple's living archive.
          </p>
        </div>

        <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {IMG.gallery.map((src, i) => (
            <Reveal key={src} delay={(i % 6) * 0.05}>
              <button
                onClick={() => setOpen(i)}
                className="group mb-5 block w-full overflow-hidden rounded-2xl border border-border relative"
                aria-label={`Open image ${i + 1}`}
              >
                <img
                  src={src}
                  alt={`Temple photograph ${i + 1}`}
                  loading="lazy"
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                />
                <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-transparent group-hover:ring-[color-mix(in_oklab,var(--gold)_60%,transparent)] transition-colors" />
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 110%, color-mix(in oklab, var(--gold) 50%, transparent), transparent 50%)",
                  }}
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/90 grid place-items-center p-4"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-5 right-5 grid size-11 place-items-center rounded-full glass-dark text-white"
              aria-label="Close"
            >
              <HiX />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 grid size-12 place-items-center rounded-full glass-dark text-white"
              aria-label="Previous"
            >
              <HiChevronLeft className="size-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 grid size-12 place-items-center rounded-full glass-dark text-white"
              aria-label="Next"
            >
              <HiChevronRight className="size-6" />
            </button>
            <motion.img
              key={open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              src={IMG.gallery[open]}
              alt={`Temple photograph ${open + 1}`}
              className="max-h-[88vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
