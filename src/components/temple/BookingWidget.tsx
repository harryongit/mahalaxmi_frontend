"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  Sparkles,
  Clock,
  Flame,
  X,
  ChevronRight,
  User,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { SectionEyebrow } from "./effects";
import { serviceApi } from "@/src/lib/api";
import { useAuth } from "@/src/context/AuthContext";

// 4 Sacred Service Categories (Darshan & Events removed as requested)
export const DEFAULT_SERVICE_IMAGE = "/assets/default-service.jpg";

export const SERVICE_TYPES = [
  { id: "Puja", label: "Puja", icon: "🕉️" },
  { id: "Chadhava", label: "Chadhava", icon: "📿" },
  { id: "Naivadya", label: "Naivadya", icon: "🍃" },
  { id: "Other", label: "Other", icon: "🙏" },
];

// Helper to return proper dynamic offering label by category (not hardcoded static "Dakshina")
function getOfferingLabel(seva: any): string {
  const cat = (seva?.category || "").toLowerCase();
  if (cat.includes("chadhava") || seva?.category_id === 2) return "Chadhava";
  if (cat.includes("naivadya") || cat.includes("naivedya") || seva?.category_id === 3) return "Bhog Seva";
  if (cat.includes("other") || seva?.category_id === 4) return "Seva Dan";
  return "Dakshina";
}

export function BookingWidget() {
  const router = useRouter();
  const { user, isLoggedIn, login } = useAuth();
  const [activeTab, setActiveTab] = useState("Puja");
  const [selectedPuja, setSelectedPuja] = useState<any>(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");

  // PUBLIC UN-AUTHENTICATED FETCH: No login or Bearer token needed
  const { data: dbServices = [], isLoading } = useQuery({
    queryKey: ["publicServices"],
    queryFn: () => serviceApi.getServices(),
    staleTime: 5 * 1000,
    refetchOnMount: true,
  });

  // Purely dynamic backend services - NO static fallback data
  const allServices: any[] = Array.isArray(dbServices)
    ? dbServices
    : Array.isArray((dbServices as any)?.data)
    ? (dbServices as any).data
    : [];

  // Filter for currently active category and only active services
  const filteredSevas = allServices.filter((s: any) => {
    // 1. Hide if explicitly marked inactive
    if (s.is_active === false) return false;

    // 2. Match category cleanly across naming variations
    const cat = (s.category || "").toLowerCase();
    if (activeTab === "Puja") {
      return cat.includes("puja") || cat.includes("pooja") || s.category_id === 1;
    }
    if (activeTab === "Chadhava") {
      return cat.includes("chadhava") || s.category_id === 2;
    }
    if (activeTab === "Naivadya") {
      return cat.includes("naivadya") || cat.includes("naivedya") || s.category_id === 3;
    }
    if (activeTab === "Other") {
      return (
        cat.includes("other") ||
        s.category_id === 4 ||
        (!cat.includes("puja") &&
          !cat.includes("pooja") &&
          !cat.includes("chadhava") &&
          !cat.includes("naivadya") &&
          !cat.includes("naivedya") &&
          ![1, 2, 3].includes(s.category_id))
      );
    }
    return false;
  });

  // Auto-fill user details if logged in, otherwise start empty
  const handleCloseModal = () => {
    setSelectedPuja(null);
    setIsSubmitting(false);
    setAuthError("");
  };

  const handleSelectPujaCard = (seva: any) => {
    setSelectedPuja(seva);
    setIsSubmitting(false);
    setAuthError("");
    if (isLoggedIn && user) {
      setName(user.name || "");
      const rawMobile = user.mobile || "";
      const digits = rawMobile.replace(/\D/g, "").slice(-10);
      setMobile(digits);
    } else {
      setName("");
      setMobile("");
    }
  };

  // Keep synced if user session changes while modal is open
  useEffect(() => {
    if (selectedPuja) {
      if (isLoggedIn && user) {
        setName(user.name || "");
        const rawMobile = user.mobile || "";
        const digits = rawMobile.replace(/\D/g, "").slice(-10);
        setMobile(digits);
      } else {
        setName("");
        setMobile("");
      }
    }
  }, [selectedPuja, isLoggedIn, user]);

  const handleProceedToCheckoutPage = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    const trimmedName = name.trim();
    const cleanMobile = mobile.replace(/\D/g, "");

    if (!trimmedName) {
      setAuthError("Please enter your name.");
      return;
    }
    if (cleanMobile.length < 10) {
      setAuthError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!selectedPuja) return;

    setIsSubmitting(true);
    try {
      // If user is not logged in, hit login API without OTP
      if (!isLoggedIn) {
        const fullPhone = `+91${cleanMobile}`;
        await login(fullPhone, undefined, trimmedName);
      }

      const pujaIdentifier = selectedPuja.slug || selectedPuja.id;
      router.push(
        `/checkout?puja=${pujaIdentifier}&name=${encodeURIComponent(trimmedName)}&mobile=${cleanMobile}`
      );
    } catch (err: any) {
      console.error("Booking sign-in failed:", err);
      const errMsg =
        err?.response?.data?.message ||
        err?.detail ||
        err?.message ||
        "Could not verify details. Please try again.";
      setAuthError(errMsg);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book-puja" className="relative py-12 md:py-16 bg-[#FCF9F3] text-stone-900 border-t border-amber-200/80">
      <div className="container-temple max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <SectionEyebrow>Fast Online Booking</SectionEyebrow>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] leading-[1.05] text-stone-900">
            Book Your Sacred <span className="text-gradient-gold">Puja & Seva</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-normal">
            Select an offering type below to explore sacred pujas, chadhavas, naivadya, and sevas.
          </p>
        </div>

        {/* 4 SERVICE CATEGORY TABS (Puja, Chadhava, Naivadya, Other) */}
        <div className="flex justify-center overflow-x-auto pb-1.5 scrollbar-none">
          <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 rounded-2xl bg-[#F4EFE6] border border-amber-200/90 shadow-2xs">
            {SERVICE_TYPES.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[#3C0F1A] text-white shadow-sm border border-amber-400/30"
                      : "text-stone-700 hover:text-amber-950 hover:bg-white/60"
                  }`}
                >
                  <span className="text-sm">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtered Sevas Cards Grid */}
        {isLoading && filteredSevas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-stone-500 gap-3">
            <Loader2 className="size-8 animate-spin text-amber-700" />
            <p className="text-xs font-medium">Loading sacred offerings...</p>
          </div>
        ) : filteredSevas.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/90 p-8 space-y-2.5 max-w-lg mx-auto shadow-2xs">
            <span className="text-4xl block">🕉️</span>
            <h4 className="font-serif text-lg font-bold text-stone-800">
              No Active {activeTab} Offerings Available
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              There are currently no active offerings listed under {activeTab}. Please explore another category above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-2">
            {filteredSevas.map((seva: any) => (
              <motion.div
                key={seva.id || seva.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="group relative rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-2xs hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Card Image Banner */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
                  <img
                    src={seva.image || DEFAULT_SERVICE_IMAGE}
                    alt={seva.title}
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        DEFAULT_SERVICE_IMAGE;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Tag Badge */}
                  {seva.tag && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-black shadow-md border border-amber-300">
                      {seva.tag}
                    </span>
                  )}

                  {/* Price Tag & Slot */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <div>
                      <span className="text-[10px] text-amber-200 uppercase tracking-wider block font-semibold">
                        {getOfferingLabel(seva)}
                      </span>
                      <span className="font-serif text-2xl font-bold text-[var(--gold)]">
                        ₹{seva.price}
                      </span>
                    </div>
                    {seva.time && (
                      <div className="flex items-center gap-1 text-[11px] text-white/90 bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10">
                        <Clock className="size-3 text-amber-400 shrink-0" />
                        <span className="truncate max-w-[140px]">{seva.time.split("•")[0]}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                      {seva.title}
                    </h3>
                    {seva.subtitle && (
                      <p className="text-xs font-semibold text-amber-800 mt-0.5">{seva.subtitle}</p>
                    )}
                    {seva.description && (
                      <p className="text-xs text-stone-600 mt-2.5 leading-relaxed font-normal line-clamp-3">
                        {seva.description}
                      </p>
                    )}
                  </div>

                  {/* Action CTA Button */}
                  <button
                    onClick={() => handleSelectPujaCard(seva)}
                    className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#4A1521] via-[#5C1A29] to-[#3B0E19] text-white text-xs font-semibold hover:from-[#5C1A29] hover:to-[#4A1521] shadow-md transition-all flex items-center justify-center gap-2 border border-amber-400/30 cursor-pointer group-hover:scale-[1.01]"
                  >
                    <Flame className="size-4 text-[var(--gold)]" />
                    <span>Book {seva.title}</span>
                    <ChevronRight className="size-4 text-white/50 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* STEP 1 INITIAL MODAL POPUP (Name & Mobile Number) */}
      <AnimatePresence>
        {selectedPuja && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-amber-200/90 bg-[#FAF8F5] text-stone-800 shadow-2xl z-10"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 size-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors z-20 cursor-pointer"
              >
                <X className="size-4" />
              </button>

              <div className="p-6 bg-gradient-to-r from-[#3C0F1A] via-[#4D1624] to-[#2B0A12] text-white text-center relative">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/30 text-[var(--gold)] text-xs font-semibold mb-2">
                  <Sparkles className="size-3.5" />
                  <span>Fast Puja Registration</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gradient-gold">
                  {selectedPuja.title}
                </h3>
                <p className="text-xs text-amber-100/70 mt-1">
                  {getOfferingLabel(selectedPuja)}: <strong className="text-[var(--gold)]">₹{selectedPuja.price}</strong>
                  {selectedPuja.time && ` • ${selectedPuja.time}`}
                </p>
              </div>

              <form onSubmit={handleProceedToCheckoutPage} className="p-6 space-y-4">
                {/* Logged in status or auto-login note */}
                {isLoggedIn && user ? (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span className="truncate">
                      Auto-filled for <strong>{user.name || "Logged-in Devotee"}</strong>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs">
                    <Sparkles className="size-3.5 text-amber-700 shrink-0" />
                    <span>Quick registration — instant sign in without OTP</span>
                  </div>
                )}

                {authError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center gap-2">
                    <X className="size-4 shrink-0 text-red-600" />
                    <span>{authError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs text-stone-700 font-bold mb-1">
                    Your Name *
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3.5 size-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Deshmukh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 font-medium focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-700 font-bold mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-xs text-stone-600 font-bold border-r border-stone-300 pr-2.5">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="98765 43210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                      className="w-full pl-16 pr-4 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 font-medium focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !name.trim() || mobile.length < 10}
                  className={`w-full py-3.5 px-4 rounded-xl font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 mt-2 ${
                    !isSubmitting && name.trim() && mobile.length >= 10
                      ? "bg-gradient-to-r from-[#4A1521] via-[#5C1A29] to-[#3B0E19] text-white hover:opacity-95 cursor-pointer"
                      : "bg-stone-300 text-stone-500 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin text-[var(--gold)]" />
                      <span>Loading Booking Details...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed to Booking Details Page</span>
                      <ArrowRight className="size-4 text-[var(--gold)]" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
