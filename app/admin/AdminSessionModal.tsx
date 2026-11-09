"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, LogIn, Clock } from "lucide-react";
import { clearAdminSession, isAdminSessionExpired } from "@/src/lib/storage";

export function AdminSessionModal() {
  const [isExpired, setIsExpired] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 1. Listen for 401 custom event dispatched by API client
    const handleExpiredEvent = () => {
      setIsExpired(true);
    };

    window.addEventListener("admin:session-expired", handleExpiredEvent);

    // 2. Proactive check every 10 seconds for 1-hour expiration
    const interval = setInterval(() => {
      if (isAdminSessionExpired()) {
        setIsExpired(true);
      }
    }, 10000);

    // Check once immediately
    if (isAdminSessionExpired()) {
      setIsExpired(true);
    }

    return () => {
      window.removeEventListener("admin:session-expired", handleExpiredEvent);
      clearInterval(interval);
    };
  }, []);

  const handleReLogin = () => {
    clearAdminSession();
    setIsExpired(false);
    router.push("/admin/login");
  };

  return (
    <AnimatePresence>
      {isExpired && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Dark Glassmorphism Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-stone-950/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#2A090E] via-[#1C0508] to-[#120407] p-7 text-center text-white shadow-2xl shadow-black/80 font-sans"
          >
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -top-12 -left-12 size-40 rounded-full bg-amber-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -right-12 size-40 rounded-full bg-rose-500/15 blur-3xl" />

            {/* Expired Icon Badge */}
            <div className="relative mx-auto mb-5 grid size-16 place-items-center rounded-2xl border border-amber-400/40 bg-gradient-to-br from-amber-500/20 to-rose-500/20 text-amber-300 shadow-inner">
              <ShieldAlert className="size-8 text-amber-400 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white">
                <Clock className="size-3" />
              </span>
            </div>

            {/* Headings */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-300">
                <span>Security Notice</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-gradient-gold">
                Admin Session Expired
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed pt-1">
                Your 1-hour session has expired for security reasons. Please log in again to continue accessing the Temple Sansthan Admin Dashboard.
              </p>
            </div>

            {/* Action Button */}
            <div className="mt-7">
              <button
                type="button"
                onClick={handleReLogin}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--gold)] via-amber-400 to-amber-300 py-3 text-xs font-bold text-stone-950 shadow-lg shadow-amber-950/40 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
              >
                <LogIn className="size-4" />
                <span>Log In Again</span>
              </button>
            </div>

            <p className="mt-4 text-[10px] text-stone-500">
              Shri Mahalaxmi Mandir Sansthan · Secure Admin Gateway
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
