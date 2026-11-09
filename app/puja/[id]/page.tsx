"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Sparkles,
  Flame,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ChevronDown,
  Star,
  ArrowRight,
  Heart,
  BookOpen,
  HelpCircle,
  MessageCircle,
  Image as ImageIcon,
  Award,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { serviceApi } from "@/src/lib/api";

export default function PujaDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const pujaId = (params?.id as string) || "";

  const { data: puja, isLoading } = useQuery({
    queryKey: ["service", pujaId],
    queryFn: () => serviceApi.getService(pujaId),
    enabled: !!pujaId,
  });

  // Tabs state: 'overview' | 'benefits' | 'process' | 'gallery' | 'reviews' | 'faqs'
  const [activeTab, setActiveTab] = useState<
    "overview" | "benefits" | "process" | "gallery" | "reviews" | "faqs"
  >("overview");

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Parse helper for dynamic JSON arrays
  const parseItems = (val: any) => {
    if (!val) return [];
    if (typeof val === "string") {
      try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return Array.isArray(val) ? val : [];
  };

  const benefits = useMemo(() => parseItems(puja?.benefits), [puja?.benefits]);
  const process = useMemo(() => parseItems(puja?.process), [puja?.process]);
  const gallery = useMemo(() => parseItems(puja?.gallery), [puja?.gallery]);
  const reviews = useMemo(() => parseItems(puja?.reviews), [puja?.reviews]);
  const faqs = useMemo(() => parseItems(puja?.faqs), [puja?.faqs]);

  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen, count: null },
    { id: "benefits", label: "Benefits", icon: Heart, count: benefits.length },
    { id: "process", label: "Process", icon: Sparkles, count: process.length },
    { id: "gallery", label: "Gallery", icon: ImageIcon, count: gallery.length },
    { id: "reviews", label: "Reviews", icon: Star, count: reviews.length },
    { id: "faqs", label: "FAQs", icon: HelpCircle, count: faqs.length },
  ] as const;

  const [isBooking, setIsBooking] = useState(false);

  const handleBookNow = () => {
    if (puja && !isBooking) {
      setIsBooking(true);
      router.push(`/checkout?puja=${puja.slug || puja.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900 justify-center items-center">
        <Navbar />
        <div className="py-20">Loading puja details...</div>
        <Footer />
      </div>
    );
  }

  if (!puja) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-24 px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-800 mb-4 border border-amber-200">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 mb-2">Seva Offering Not Found</h2>
          <p className="text-stone-600 max-w-md text-sm mb-6">
            The requested seva offering is currently unavailable or inactive. Please view our list of active offerings.
          </p>
          <Link
            href="/rituals"
            className="inline-flex items-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4A1521] via-[#5C1A29] to-[#3B0E19] text-white font-semibold text-xs shadow-md hover:opacity-95 transition-all"
          >
            View Available Offerings
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <Navbar />

      <PageHero
        breadcrumb={`Puja Details / ${puja.title}`}
        badge="Sacred Ritual Seva"
        title={puja.title}
        titleGold="Details & Booking"
        description={puja.subtitle}
      />

      <main className="flex-1 py-10 px-4 sm:px-6">
        <div className="container-temple max-w-6xl mx-auto space-y-8">
          
          {/* Top Hero Overview Banner */}
          <div className="rounded-3xl border border-amber-200/90 bg-white p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row items-center gap-8">
            <img
              src={puja.image || "/assets/default-service.jpg"}
              alt={puja.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/default-service.jpg";
              }}
              className="w-full lg:w-96 h-64 sm:h-72 rounded-2xl object-cover shrink-0 border border-amber-200 shadow-md"
            />

            <div className="space-y-4 flex-1 text-center lg:text-left">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  {puja.category || "Sacred Seva"}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
                  {puja.title}
                </h1>
                <p className="text-sm font-semibold text-amber-800">{puja.subtitle}</p>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                {puja.description}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold pt-2">
                <div className="bg-stone-100 border border-stone-200 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 text-stone-700">
                  <Clock className="size-4 text-amber-800" />
                  <span>{puja.time}</span>
                </div>
                <div className="bg-amber-100 border border-amber-300 px-3.5 py-1.5 rounded-xl text-amber-950 font-bold text-sm">
                  Dakshina: ₹{puja.price}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={handleBookNow}
                  disabled={isBooking}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-[#4A1521] via-[#5C1A29] to-[#3B0E19] text-white font-bold text-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isBooking ? (
                    <>
                      <Loader2 className="size-4 animate-spin text-[var(--gold)]" />
                      <span>Loading Booking Details...</span>
                    </>
                  ) : (
                    <>
                      <Flame className="size-4 text-[var(--gold)]" />
                      <span>Book {puja.title} Now</span>
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Header Bar */}
          <div className="flex overflow-x-auto border-b border-stone-200 pb-2 gap-2 scrollbar-thin">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`shrink-0 px-4 sm:px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    active
                      ? "bg-amber-900 text-white border-amber-900 shadow-md ring-2 ring-amber-400/40"
                      : "bg-white text-stone-600 border-stone-200 hover:border-amber-300 hover:text-amber-900"
                  }`}
                >
                  <Icon className="size-4" />
                  <span>{t.label}</span>
                  {t.count !== null && t.count > 0 && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        active
                          ? "bg-white/20 text-white border border-white/20"
                          : "bg-amber-100 text-amber-900 border border-amber-300"
                      }`}
                    >
                      {t.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="space-y-8">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    Spiritual Significance of {puja.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {puja.description || `Performing ${puja.title} at Goddess Ambabai Mahalaxmi Temple invokes divine grace, wealth, and mental tranquility. Panditjis chant traditional Vedic mantras and recite your Gotra and family member names during the ritual.`}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                      <ShieldCheck className="size-6 text-amber-800 mb-2" />
                      <h4 className="font-serif text-sm font-bold text-stone-900">100% Authentic Seva</h4>
                      <p className="text-xs text-stone-600 mt-1">Conducted by head temple Vedic pujaris at the sanctum.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                      <MessageCircle className="size-6 text-emerald-600 mb-2" />
                      <h4 className="font-serif text-sm font-bold text-stone-900">WhatsApp Proof</h4>
                      <p className="text-xs text-stone-600 mt-1">Photos and video updates sent on your WhatsApp number.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                      <Award className="size-6 text-amber-800 mb-2" />
                      <h4 className="font-serif text-sm font-bold text-stone-900">Prasadam Courier</h4>
                      <p className="text-xs text-stone-600 mt-1">Blessed kumkum & prasad dispatched with live tracking.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. BENEFITS TAB */}
            {activeTab === "benefits" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {benefits.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {benefits.map((b: any, i: number) => (
                      <div
                        key={i}
                        className="rounded-3xl border border-amber-200/90 bg-white p-6 space-y-2 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="size-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm border border-amber-300">
                          0{i + 1}
                        </div>
                        <h3 className="font-serif text-lg font-bold text-stone-900">
                          {b.title || b.name || "Divine Blessing"}
                        </h3>
                        <p className="text-xs text-stone-600 leading-relaxed font-normal">
                          {b.desc || b.description || ""}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center space-y-3">
                    <Heart className="size-8 text-amber-800 mx-auto" />
                    <h4 className="font-serif text-lg font-bold text-stone-800">Sacred Seva Blessings</h4>
                    <p className="text-xs text-stone-500 max-w-md mx-auto">
                      Performing this puja invokes the supreme grace of Sri Mahalaxmi. Consecrated gotra sankalpa and blessings are bestowed upon your entire family.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* 3. PROCESS TAB */}
            {activeTab === "process" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {process.length > 0 ? (
                  <div className="space-y-4">
                    {process.map((p: any, i: number) => (
                      <div
                        key={p.step || i}
                        className="rounded-3xl border border-stone-200 bg-white p-6 flex items-start gap-5 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="size-12 rounded-2xl bg-[#3C0F1A] text-white flex items-center justify-center font-serif text-lg font-bold shrink-0 border border-amber-400">
                          {p.step || i + 1}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-serif text-lg font-bold text-stone-900">
                            {p.title || p.name || `Step ${i + 1}`}
                          </h3>
                          <p className="text-xs text-stone-600 leading-relaxed font-normal">
                            {p.desc || p.description || ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center space-y-3">
                    <Sparkles className="size-8 text-amber-800 mx-auto" />
                    <h4 className="font-serif text-lg font-bold text-stone-800">Vedic Ritual Procedure</h4>
                    <p className="text-xs text-stone-500 max-w-md mx-auto">
                      Conducted with strict adherence to ancient Chalukya-era temple traditions. Head priests perform your Gotra sankalpa followed by holy offerings and aarti.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* 4. GALLERY TAB */}
            {activeTab === "gallery" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {gallery.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gallery.map((img: any, i: number) => {
                      const url = typeof img === "string" ? img : img.url;
                      return (
                        <div
                          key={i}
                          className="rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all h-60"
                        >
                          <img
                            src={url || "/assets/default-service.jpg"}
                            alt="Puja Gallery"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/assets/default-service.jpg";
                            }}
                            className="size-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center space-y-3">
                    <ImageIcon className="size-8 text-amber-800 mx-auto" />
                    <h4 className="font-serif text-lg font-bold text-stone-800">Temple Sanctum Gallery</h4>
                    <p className="text-xs text-stone-500 max-w-md mx-auto">
                      Photos and recorded video clips of your ritual will be sent directly to your registered WhatsApp number on the seva date.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* 5. REVIEWS TAB */}
            {activeTab === "reviews" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((r: any, i: number) => (
                      <div
                        key={i}
                        className="rounded-3xl border border-stone-200 bg-white p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-serif font-bold text-stone-900 text-base">{r.name || "Devotee"}</h4>
                            <span className="text-[11px] text-stone-500 font-medium">
                              {r.location || "India"} • {r.date || "Recently"}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-amber-500">
                            {[...Array(r.rating || 5)].map((_, idx) => (
                              <Star key={idx} className="size-4 fill-amber-500" />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs text-stone-700 italic leading-relaxed">
                          "{r.text || r.review || "Very peaceful and divine seva experience."}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center space-y-3">
                    <Star className="size-8 text-amber-500 mx-auto fill-amber-500" />
                    <h4 className="font-serif text-lg font-bold text-stone-800">Devotee Experiences</h4>
                    <p className="text-xs text-stone-500 max-w-md mx-auto">
                      Thousands of devotees from across India book this sacred offering. Share your experience after participating in the ritual!
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* 6. FAQS TAB */}
            {activeTab === "faqs" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {faqs.length > 0 ? (
                  <div className="space-y-4">
                    {faqs.map((faq: any, i: number) => {
                      const isOpen = openFaqIndex === i;
                      return (
                        <div
                          key={i}
                          className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:border-amber-300 transition-colors"
                        >
                          <button
                            onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                            className="w-full p-5 text-left flex items-center justify-between font-serif text-base font-bold text-stone-900 cursor-pointer"
                          >
                            <span>{faq.q || faq.question}</span>
                            <ChevronDown
                              className={`size-5 text-amber-800 transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {isOpen && (
                            <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                              {faq.a || faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center space-y-3">
                    <HelpCircle className="size-8 text-amber-800 mx-auto" />
                    <h4 className="font-serif text-lg font-bold text-stone-800">Common Seva Questions</h4>
                    <p className="text-xs text-stone-500 max-w-md mx-auto">
                      Physical presence is not required. Panditjis perform your Gotra sankalpa remotely, send WhatsApp updates, and courier the holy prasad to your doorstep.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

          </div>
          
          {/* Bottom Sticky CTA Bar */}
          <div className="p-6 rounded-3xl bg-[#3C0F1A] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div>
              <span className="text-[10px] text-amber-200 uppercase tracking-wider block font-semibold">
                Perform Divine Seva
              </span>
              <h3 className="font-serif text-2xl font-bold text-[var(--gold)]">
                {puja.title} — ₹{puja.price}
              </h3>
            </div>

            <button
              onClick={handleBookNow}
              disabled={isBooking}
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-900 font-bold text-xs shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isBooking ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Loading Booking Details...</span>
                </>
              ) : (
                <>
                  <Flame className="size-4" />
                  <span>Book Seva Now</span>
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
