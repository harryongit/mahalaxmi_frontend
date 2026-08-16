"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  User,
  Sparkles,
  LogIn,
  ChevronRight,
  LogOut,
  Flame,
  Ticket,
} from "lucide-react";
import { LoginModal } from "./LoginModal";

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserDropdown({ isOpen, onClose }: UserDropdownProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<{ name: string; phone: string; email: string } | null>(null);

  const handleLoginSuccess = (userData: { name: string; phone: string; email: string }) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click-outside Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-transparent"
              onClick={onClose}
            />

            {/* Compact Header Profile Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 top-full mt-2.5 w-72 sm:w-80 rounded-2xl border border-stone-200/90 bg-white text-stone-800 shadow-2xl z-50 p-3 space-y-3 font-sans"
              style={{
                boxShadow: "0 12px 36px -8px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)",
              }}
            >
              {/* Pointer Notch pointing up to button */}
              <div className="absolute -top-1.5 right-5 size-3 rotate-45 bg-white border-t border-l border-stone-200" />

              {/* Login Callout Card / User Info */}
              {!isLoggedIn ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3 space-y-2.5 relative z-10">
                  <div className="flex items-center gap-2 text-amber-900">
                    <Sparkles className="size-4 text-amber-600 shrink-0" />
                    <p className="text-xs font-bold leading-tight">
                      To check all available pujas & offers:
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      setShowLoginModal(true);
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#4A1521] via-[#5C1A29] to-[#3B0E19] text-white text-xs font-semibold hover:opacity-95 shadow-sm transition-all flex items-center justify-center gap-1.5 border border-amber-400/30 cursor-pointer"
                  >
                    <LogIn className="size-3.5 text-[var(--gold)]" />
                    <span>Login / Create an account</span>
                  </button>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center font-serif font-bold text-amber-800 text-xs">
                      {user?.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-xs">{user?.name}</h4>
                      <p className="text-[10px] text-stone-500">{user?.phone || user?.email}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Active
                  </span>
                </div>
              )}

              {/* Section: Account Details */}
              <div className="space-y-1">
                <div className="px-2 pt-1 pb-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-2">
                  <span>Account Details</span>
                  <div className="h-px flex-1 bg-stone-200" />
                </div>

                {/* Nav items */}
                <div className="space-y-0.5">
                  {/* nav_item: My profile */}
                  <Link
                    href="/profile"
                    onClick={onClose}
                    className="group flex items-center justify-between px-3 py-2 rounded-xl hover:bg-stone-100 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="size-7 rounded-lg bg-amber-100/80 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
                        <User className="size-3.5" />
                      </div>
                      <span className="text-xs font-bold text-stone-800 group-hover:text-amber-900">
                        My profile
                      </span>
                    </div>
                    <ChevronRight className="size-3.5 text-stone-400 group-hover:text-amber-800 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  {/* nav_item: My Puja Bookings */}
                  <Link
                    href="/bookings"
                    onClick={onClose}
                    className="group flex items-center justify-between px-3 py-2 rounded-xl hover:bg-stone-100 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="size-7 rounded-lg bg-orange-100/80 border border-orange-200 flex items-center justify-center text-orange-800 shrink-0">
                        <Flame className="size-3.5" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-stone-800 group-hover:text-amber-900">
                          My Puja Bookings
                        </span>
                        {isLoggedIn && (
                          <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-amber-100 text-amber-800 font-semibold border border-amber-300">
                            3
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="size-3.5 text-stone-400 group-hover:text-amber-800 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  {/* Festival Offers */}
                  <Link
                    href="/festivals"
                    onClick={onClose}
                    className="group flex items-center justify-between px-3 py-2 rounded-xl hover:bg-stone-100 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="size-7 rounded-lg bg-amber-100/80 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                        <Ticket className="size-3.5" />
                      </div>
                      <span className="text-xs font-bold text-stone-800 group-hover:text-amber-900">
                        Festival Offers
                      </span>
                    </div>
                    <ChevronRight className="size-3.5 text-stone-400 group-hover:text-amber-800 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Logout Option if Logged In */}
              {isLoggedIn && (
                <div className="pt-1 border-t border-stone-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <LogOut className="size-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </motion.div>
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
