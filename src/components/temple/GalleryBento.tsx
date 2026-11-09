"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiChevronLeft, HiChevronRight, HiPlay } from "react-icons/hi";
import { Sparkles, Maximize2, Video, Image as ImageIcon, Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { contentApi, getMediaUrl, GalleryItem } from "@/src/lib/api";

const CATEGORIES = [
  "All",
  "Sanctum",
  "Architecture",
  "Festivals",
  "Rituals",
  "Video",
  "Others",
];

export function GalleryBento({ initialData }: { initialData?: any[] }) {
  const [selectedCat, setSelectedCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);

  const { data: galleryData = [], isLoading } = useQuery({
    queryKey: ["content", "gallery"],
    queryFn: () => contentApi.getGallery(),
    initialData,
  });

  const mappedGallery = galleryData.map((item: any) => {
    const isVideo =
      item.media_type === "video" ||
      Boolean(item.url && item.url.match(/\.(mp4|webm|mov|mkv|ogg)$/i));
    const rawCategory = item.category?.trim();
    const resolvedCategory = rawCategory || (isVideo ? "Video" : "Sanctum");

    return {
      id: item.id,
      src: getMediaUrl(item.url),
      rawUrl: item.url,
      media_type: isVideo ? ("video" as const) : ("image" as const),
      category: resolvedCategory,
      caption: item.title || item.caption || (isVideo ? "Temple Video" : "Sacred Moments"),
    };
  });

  const filtered = mappedGallery.filter((item: any) => {
    if (selectedCat === "All") return true;
    if (selectedCat === "Video") {
      return (
        item.category?.toLowerCase() === "video" ||
        item.media_type === "video"
      );
    }
    return item.category?.toLowerCase() === selectedCat.toLowerCase();
  });

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header Section */}
        <div className="space-y-4 border-b border-stone-200 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                <Sparkles className="size-3.5 text-amber-600" />
                Darshan & Visual Archive
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
                Sacred Gallery by Category
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                Explore temple sanctum, carvings, festivals, daily rituals, and sacred videos captured at Shri Ambabai Temple.
              </p>
            </div>
          </div>

          {/* All Category Filter Tabs (Wrapped without horizontal scroll) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-2">
            {CATEGORIES.map((cat) => {
              const active = selectedCat === cat;
              const count =
                cat === "All"
                  ? mappedGallery.length
                  : mappedGallery.filter((item: any) => {
                      if (cat === "Video") {
                        return (
                          item.category?.toLowerCase() === "video" ||
                          item.media_type === "video"
                        );
                      }
                      return item.category?.toLowerCase() === cat.toLowerCase();
                    }).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer flex items-center gap-2 select-none ${
                    active
                      ? "bg-[#3C0F1A] text-amber-200 border-[#3C0F1A] shadow-md ring-2 ring-amber-500/20"
                      : "bg-white text-stone-700 border-amber-200/90 hover:border-amber-400 hover:bg-amber-50/50 shadow-sm"
                  }`}
                >
                  {cat === "Video" && <Video className="size-3.5" />}
                  <span>{cat === "All" ? "All Media" : cat}</span>
                  <span
                    className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      active
                        ? "bg-amber-300/20 text-amber-200 border border-amber-400/30"
                        : "bg-amber-100/80 text-amber-900 border border-amber-200"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Media Grid */}
        {isLoading ? (
          <div className="text-center py-16 text-stone-500 font-medium">Loading sacred gallery...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white/60 border border-dashed border-amber-300 rounded-3xl p-8">
            <p className="font-serif text-lg font-bold text-stone-700">No media available in "{selectedCat}"</p>
            <p className="text-xs text-stone-500 mt-1">Check back soon or select another category above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item, i) => {
              const isVideo = item.media_type === "video";
              return (
                <motion.div
                  key={(item.src || "") + i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setOpen(i)}
                  className="group relative rounded-3xl border-2 border-amber-200/90 bg-black overflow-hidden shadow-md hover:border-amber-400 hover:shadow-2xl transition-all duration-300 cursor-pointer h-64 sm:h-72"
                >
                  {isVideo ? (
                    <>
                      <video
                        src={item.src}
                        muted
                        preload="metadata"
                        playsInline
                        className="size-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                      />
                      {/* Video Play Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="size-14 rounded-full bg-black/60 border-2 border-amber-400 text-amber-300 flex items-center justify-center backdrop-blur-md shadow-xl group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-stone-950 transition-all">
                          <HiPlay className="size-7 ml-1" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.caption}
                      loading="lazy"
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-stone-950 shadow-md">
                      <Tag className="size-2.5" />
                      {item.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {isVideo && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white shadow-md">
                          <Video className="size-3" />
                          Video
                        </span>
                      )}
                      <div className="size-8 rounded-full bg-black/50 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="size-4 text-amber-300" />
                      </div>
                    </div>
                  </div>

                  {/* Caption Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                    <p className="font-serif text-sm sm:text-base font-bold text-amber-200 group-hover:text-white transition-colors leading-tight line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </motion.div>
              );
            })}
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
            className="fixed inset-0 z-[100] grid place-items-center bg-black/95 p-4 sm:p-8 backdrop-blur-md"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
              aria-label="Close"
            >
              <HiX className="size-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer md:left-8 z-10"
              aria-label="Previous"
            >
              <HiChevronLeft className="size-7" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer md:right-8 z-10"
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
              className="max-h-[85vh] max-w-5xl text-center space-y-4 w-full flex flex-col items-center justify-center"
            >
              {filtered[open].media_type === "video" ? (
                <video
                  src={filtered[open].src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[75vh] w-auto max-w-full mx-auto rounded-2xl border-2 border-amber-300/40 shadow-2xl bg-black"
                />
              ) : (
                <img
                  src={filtered[open].src}
                  alt={filtered[open].caption}
                  className="max-h-[75vh] w-auto max-w-full mx-auto rounded-2xl border-2 border-amber-300/40 shadow-2xl object-contain"
                />
              )}
              <figcaption className="text-amber-200 font-serif text-sm sm:text-base font-bold tracking-wide">
                <span className="inline-block px-2.5 py-0.5 rounded text-xs mr-2 font-sans font-semibold uppercase bg-amber-500/20 text-amber-300 border border-amber-400/40">
                  {filtered[open].category}
                </span>
                {filtered[open].caption} —{" "}
                <span className="text-white/60 text-xs font-mono">
                  {open + 1} of {filtered.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
