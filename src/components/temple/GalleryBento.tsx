import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { IMG } from "./images";
import { Reveal, SectionEyebrow } from "./effects";

const CAPTIONS = [
  "Pillared corridor at dusk",
  "Gopuram in morning mist",
  "Temple bells before aarti",
  "Deepam floating on the ghat",
  "Offering of light",
  "Carved stone guardians",
  "Marigold thresholds",
  "The eastern courtyard",
  "Sanctum in golden hour",
  "Evening prayer",
  "Festival of a thousand lamps",
  "Silence between hymns",
];

/** Bento-style asymmetric layout inspired by editorial gallery walls */
const SPANS = [
  "md:col-span-3 md:row-span-2",
  "md:col-span-3 md:row-span-1",
  "md:col-span-3 md:row-span-1",
  "md:col-span-3 md:row-span-2",
  "md:col-span-3 md:row-span-1",
  "md:col-span-3 md:row-span-1",
  "md:col-span-4 md:row-span-1",
  "md:col-span-4 md:row-span-1",
  "md:col-span-4 md:row-span-1",
  "md:col-span-6 md:row-span-1",
  "md:col-span-3 md:row-span-1",
  "md:col-span-3 md:row-span-1",
];

export function GalleryBento() {
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
    <section
      id="gallery"
      className="relative py-28 md:py-40"
      style={{
        background:
          "linear-gradient(180deg, var(--background), color-mix(in oklab, var(--gold) 10%, var(--background)) 50%, var(--background))",
      }}
    >
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

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 md:auto-rows-[190px] gap-5">
          {IMG.gallery.map((src, i) => (
            <Reveal key={src} delay={(i % 6) * 0.05} className={SPANS[i % SPANS.length]}>
              <button
                onClick={() => setOpen(i)}
                className="group relative block h-full w-full min-h-[220px] overflow-hidden rounded-[26px] bg-card p-2 shadow-[0_24px_60px_-30px_rgba(80,30,0,0.45)] transition-transform duration-500 hover:-translate-y-1.5"
                aria-label={`Open ${CAPTIONS[i % CAPTIONS.length]}`}
              >
                <span className="block h-full w-full overflow-hidden rounded-[20px]">
                  <img
                    src={src}
                    alt={CAPTIONS[i % CAPTIONS.length]}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                </span>
                <span
                  className="pointer-events-none absolute inset-2 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(20,8,2,0.75) 100%)",
                  }}
                />
                <span className="pointer-events-none absolute bottom-6 left-6 right-6 translate-y-3 text-left text-sm font-light text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {CAPTIONS[i % CAPTIONS.length]}
                </span>
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
            className="fixed inset-0 z-[80] grid place-items-center bg-black/90 p-4"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute right-5 top-5 grid size-11 place-items-center rounded-full glass-dark text-white"
              aria-label="Close"
            >
              <HiX />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full glass-dark text-white md:left-10"
              aria-label="Previous"
            >
              <HiChevronLeft />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full glass-dark text-white md:right-10"
              aria-label="Next"
            >
              <HiChevronRight />
            </button>
            <motion.figure
              key={open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-5xl"
            >
              <img
                src={IMG.gallery[open]}
                alt={CAPTIONS[open % CAPTIONS.length]}
                className="max-h-[78vh] rounded-2xl object-contain"
              />
              <figcaption className="mt-4 text-center text-sm tracking-wide text-white/70">
                {CAPTIONS[open % CAPTIONS.length]}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
