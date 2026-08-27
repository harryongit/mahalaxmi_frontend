"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { IMG } from "./images";
import { Reveal, SectionEyebrow } from "./effects";
import { Sparkles, Maximize2, Tag } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { contentApi } from "@/src/lib/api";

const CATEGORIES = ["All", "Sanctum", "Architecture", "Festivals", "Rituals"];

export function GalleryBento() {
  const { data: galleryData = [], isLoading } = useQuery({
    queryKey: ["content", "gallery"],
    queryFn: contentApi.getGallery,
  });
  const [selectedCat, setSelectedCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);

  const mappedGallery = galleryData.map((item: any) => ({
    src: item.url,
    caption: item.caption || "Sacred Moments",
    category: item.category || "Sanctum",
  }));

  const filtered = selectedCat === "All"
    ? mappedGallery
    : mappedGallery.filter((item: any) => item.category === selectedCat);

  const close = () => setOpen(null);
  const prev = () =>
    setOpen((i) => (i === null ? null : (i + filtered.length - 1) % filtered.length));
  const next = () => setOpen((i) => (i === null ? null : (i + 1) % filtered.length));

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered]);

  return (
    <section id="gallery" className="relative py-16 md:py-24 bg-[#FCF9F3]">
      <div className="container-temple space-y-8">
        
        {/* Header & Category Filter Buttons */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-stone-200 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Visual Archive
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
              Explore Photo Gallery
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-thin">
            {CATEGORIES.map((cat) => {
              const active = selectedCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    active
                      ? "bg-[#3C0F1A] text-white border-[#3C0F1A] shadow-md"
                      : "bg-white text-stone-700 border-amber-200 hover:border-amber-400"
                  }`}
                >
                  {cat === "All" ? "All Photos" : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Photo Grid */}
        {isLoading ? (
          <div className="text-center py-8 text-stone-500">Loading gallery...</div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <motion.div
              key={item.src + i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              onClick={() => setOpen(i)}
              className="group relative rounded-3xl border-2 border-amber-200/90 bg-white overflow-hidden shadow-md hover:border-amber-400 hover:shadow-2xl transition-all duration-300 cursor-pointer h-64 sm:h-72"
            >
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Tag Pill */}
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-stone-950 shadow-md">
                {item.category}
              </span>

              {/* Expand Icon Badge */}
              <div className="absolute top-3 right-3 size-8 rounded-full bg-black/40 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="size-4 text-[var(--gold)]" />
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-serif text-sm sm:text-base font-bold text-amber-200 group-hover:text-white transition-colors leading-tight">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        )}

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {open !== null && filtered[open] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/95 p-4 backdrop-blur-md"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute right-5 top-5 grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <HiX className="size-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer md:left-8"
              aria-label="Previous"
            >
              <HiChevronLeft className="size-7" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer md:right-8"
              aria-label="Next"
            >
              <HiChevronRight className="size-7" />
            </button>

            <motion.figure
              key={open}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-4xl text-center space-y-3"
            >
              <img
                src={filtered[open].src}
                alt={filtered[open].caption}
                className="max-h-[75vh] w-auto mx-auto rounded-2xl border-2 border-amber-300/40 shadow-2xl object-contain"
              />
              <figcaption className="text-amber-200 font-serif text-base font-bold tracking-wide">
                {filtered[open].caption} — <span className="text-white/60 text-xs font-mono">Photo {open + 1} of {filtered.length}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
