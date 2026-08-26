"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Sparkles,
  LogIn,
  X,
  ChevronRight,
  ShieldCheck,
  LogOut,
  Flame,
  Ticket,
  CheckCircle2,
import { Phone, Mail, ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/src/lib/api";
import { LoginModal } from "./LoginModal";

interface UserSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserSidebar({ isOpen, onClose }: UserSidebarProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [localUser, setLocalUser] = useState<{ name: string; phone: string; email: string } | null>(null);

  // Fetch real user data
  const { data: user } = useQuery({
    queryKey: ["user", "me"],
    queryFn: userApi.getMe,
    enabled: isLoggedIn,
  });

  const { data: stats } = useQuery({
    queryKey: ["user", "stats"],
    queryFn: userApi.getStats,
    enabled: isLoggedIn,
  });

  const handleLoginSuccess = (userData: { name: string; phone: string; email: string }) => {
    setLocalUser(userData);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLocalUser(null);
  };

  const displayName = user?.first_name 
    ? `${user.first_name} ${user.last_name || ""}`.trim() 
    : localUser?.name;
  
  const displayPhone = user?.phone_number || localUser?.phone;
  const displayEmail = user?.email || localUser?.email;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[70] bg-stone-950/60 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Sidebar Drawer - Combination of Light & Dark Theme */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 z-[75] h-full w-full max-w-md bg-[#FAF8F5] text-stone-800 shadow-2xl border-l border-amber-200/80 flex flex-col overflow-hidden"
            >
              {/* Dark Regal Header (Dark Accent) */}
              <div className="relative p-6 bg-gradient-to-r from-[#3C0F1A] via-[#4D1624] to-[#2B0A12] text-white overflow-hidden border-b border-[var(--gold)]/30 shadow-md">
                <div className="absolute top-0 right-0 size-48 bg-[var(--gold)]/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3.5">
                    <div className="size-11 rounded-full bg-gradient-to-tr from-[var(--gold)] to-amber-200 p-0.5 shadow-lg shrink-0">
                      <div className="size-full rounded-full bg-[#2E0B14] flex items-center justify-center text-[var(--gold)] font-serif text-lg font-bold">
                        {isLoggedIn && displayName ? displayName.charAt(0) : <User className="size-5" />}
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold tracking-wider text-[var(--gold)] uppercase block">
                        Ambabai Mahalaxmi Seva
                      </span>
                      <h3 className="font-serif text-xl font-bold text-white leading-tight">
                        {isLoggedIn ? `Namaste, ${displayName?.split(" ")[0]}` : "Devotee Portal"}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="size-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/15"
                    aria-label="Close sidebar"
                  >
                    <X className="size-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Light Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {/* Banner Card: To check all available pujas & offers */}
                {!isLoggedIn ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-2xl border border-amber-300/60 p-5 bg-gradient-to-br from-[#FFFBF2] via-[#FFF6E5] to-[#FDF0D5] shadow-md group"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-800 border border-amber-400/40 shrink-0">
                        <Sparkles className="size-5 text-amber-600 animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                          Devotee Exclusive
                        </span>
                        <h4 className="text-sm font-bold text-stone-900 leading-snug">
                          To check all available pujas & offers:
                        </h4>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="mt-4 w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#4A1521] via-[#5C1A29] to-[#3B0E19] text-white text-sm font-semibold hover:from-[#5C1A29] hover:to-[#4A1521] shadow-lg transition-all flex items-center justify-center gap-2 border border-[var(--gold)]/30 group-hover:scale-[1.01]"
                    >
                      <LogIn className="size-4 text-[var(--gold)]" />
                      <span>Login / Create an account</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-stone-200 p-4 bg-white shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center font-serif font-bold text-amber-800 text-base">
                        {displayName?.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-stone-900 text-sm">{displayName}</h4>
                        <p className="text-xs text-stone-500">{displayPhone || displayEmail}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <CheckCircle2 className="size-3 text-emerald-600" /> Active
                    </span>
                  </motion.div>
                )}

                {/* Account Details Header */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
                      Account Details
                    </span>
                    <div className="h-px flex-1 bg-stone-300/70" />
                  </div>

                  {/* Nav items */}
                  <div className="space-y-2.5">
                    {/* nav_item: My profile */}
                    <a
                      href="/profile"
                      onClick={onClose}
                      className="group flex items-center justify-between p-3.5 rounded-2xl border border-stone-200/80 bg-white hover:bg-amber-50/60 hover:border-amber-400/80 transition-all duration-200 shadow-xs"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="size-10 rounded-xl bg-amber-100/80 border border-amber-300/60 flex items-center justify-center text-amber-800 group-hover:scale-105 transition-transform">
                          <User className="size-5" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-stone-800 group-hover:text-amber-900 transition-colors">
                            My profile
                          </h5>
                          <p className="text-xs text-stone-500">Personal details & preferences</p>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-stone-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-all" />
                    </a>

                    {/* nav_item: My Puja Bookings */}
                    <a
                      href="/bookings"
                      onClick={onClose}
                      className="group flex items-center justify-between p-3.5 rounded-2xl border border-stone-200/80 bg-white hover:bg-amber-50/60 hover:border-amber-400/80 transition-all duration-200 shadow-xs"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="size-10 rounded-xl bg-orange-100/80 border border-orange-300/60 flex items-center justify-center text-orange-800 group-hover:scale-105 transition-transform">
                          <Flame className="size-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-sm font-bold text-stone-800 group-hover:text-amber-900 transition-colors">
                              My Puja Bookings
                            </h5>
                            {isLoggedIn && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800 font-semibold border border-amber-300">
                                {stats?.active_orders ?? 3} Active
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-500">View active & past puja reservations</p>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-stone-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-all" />
                    </a>

                    {/* Festival Offers Nav Item */}
                    <a
                      href="/festivals"
                      onClick={onClose}
                      className="group flex items-center justify-between p-3.5 rounded-2xl border border-stone-200/80 bg-white hover:bg-amber-50/60 hover:border-amber-400/80 transition-all duration-200 shadow-xs"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="size-10 rounded-xl bg-amber-100/80 border border-amber-300/60 flex items-center justify-center text-amber-700 group-hover:scale-105 transition-transform">
                          <Ticket className="size-5" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-stone-800 group-hover:text-amber-900 transition-colors">
                            Special Festival Pujas & Offers
                          </h5>
                          <p className="text-xs text-stone-500">Navratri & Kirnotsav packages</p>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-stone-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-all" />
                    </a>

                    {/* Support Nav Item */}
                    <a
                      href="/contact"
                      onClick={onClose}
                      className="group flex items-center justify-between p-3.5 rounded-2xl border border-stone-200/80 bg-white hover:bg-amber-50/60 hover:border-amber-400/80 transition-all duration-200 shadow-xs"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="size-10 rounded-xl bg-emerald-100/80 border border-emerald-300/60 flex items-center justify-center text-emerald-800 group-hover:scale-105 transition-transform">
                          <ShieldCheck className="size-5" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-stone-800 group-hover:text-amber-900 transition-colors">
                            Temple Helpline & Support
                          </h5>
                          <p className="text-xs text-stone-500">24/7 Live darshan & ritual guidance</p>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-stone-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-all" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-stone-200 bg-stone-100/80">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors text-sm font-semibold"
                  >
                    <LogOut className="size-4" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <div className="text-center space-y-0.5">
                    <p className="font-serif text-sm text-stone-800 font-bold">
                      ॥ श्री अंबाबाई प्रसन्न ॥
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Ambabai Mahalaxmi Temple Official Devotee Portal
                    </p>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Login / Register Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
