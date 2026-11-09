"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Sparkles,
  LogIn,
  ChevronRight,
  LogOut,
  Flame,
  Ticket,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  userBookings?: any[];
}

export function UserDropdown({ isOpen, onClose, userBookings = [] }: UserDropdownProps) {
  const { user, isLoggedIn, openLoginModal, logout } = useAuth();
  const router = useRouter();

  const handleProtectedNavigation = (e: React.MouseEvent, path: string) => {
    if (!isLoggedIn) {
      e.preventDefault();
      onClose();
      openLoginModal("login");
    } else {
      onClose();
      router.push(path);
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const displayName = user?.name || "Devotee";
  const displayContact = user?.mobile || user?.email || "";
  const initial = displayName.trim().charAt(0).toUpperCase() || "D";

  return (
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
            className="absolute right-0 top-full mt-2.5 w-76 sm:w-84 rounded-2xl border border-amber-300/60 bg-white text-stone-800 shadow-2xl z-50 p-3.5 space-y-3 font-sans"
            style={{
              boxShadow: "0 14px 40px -8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
            }}
          >
            {/* Pointer Notch pointing up to button */}
            <div className="absolute -top-1.5 right-4 size-3 rotate-45 bg-white border-t border-l border-amber-300/60" />

            {/* Login Callout Card / User Info */}
            {!isLoggedIn ? (
              <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/60 p-3.5 space-y-2.5 relative z-10 shadow-xs">
                <div className="flex items-center gap-2 text-[#3C0F1A]">
                  <Sparkles className="size-4 text-amber-600 shrink-0" />
                  <p className="text-xs font-bold leading-tight">
                    Devotee Sacred Portal
                  </p>
                </div>
                <p className="text-[11px] text-stone-600 leading-normal">
                  Login with your WhatsApp or mobile number to access your bookings, temple receipts, and profile.
                </p>

                <div className="pt-1">
                  <button
                    id="dropdown-login-btn"
                    onClick={() => {
                      onClose();
                      openLoginModal();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#4A1521] to-[#3B0E19] text-white text-xs font-bold hover:brightness-110 shadow-md transition-all flex items-center justify-center gap-2 border border-amber-400/30 cursor-pointer"
                  >
                    <LogIn className="size-3.5 text-[var(--gold)]" />
                    <span>Devotee Login (WhatsApp / Mobile)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-50/90 via-orange-50/50 to-amber-50/90 border border-amber-200/90 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="size-9 rounded-full bg-gradient-to-tr from-[#3C0F1A] to-[#601a2c] border border-amber-300 flex items-center justify-center font-serif font-bold text-amber-200 text-sm shadow-xs">
                    {initial}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-stone-900 text-xs leading-none">
                      {displayName}
                    </h4>
                    <p className="text-[11px] font-mono text-stone-500">
                      {displayContact}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <ShieldCheck className="size-3 text-emerald-600" />
                  <span>Devotee</span>
                </span>
              </div>
            )}

            {/* Section: Devotee Menu Options */}
            <div className="space-y-1">
              <div className="px-2 pt-1 pb-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-2">
                <span>Devotee Services</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>

              {/* Nav items */}
              <div className="space-y-0.5">
                {/* nav_item: My profile */}
                <button
                  type="button"
                  onClick={(e) => handleProtectedNavigation(e, "/profile")}
                  className="w-full text-left group flex items-center justify-between px-3 py-2 rounded-xl hover:bg-amber-50/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="size-7 rounded-lg bg-amber-100/90 border border-amber-300/60 flex items-center justify-center text-amber-900 shrink-0">
                      <User className="size-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-stone-800 group-hover:text-amber-950">
                        My Profile
                      </span>
                      {!isLoggedIn && (
                        <span className="text-[9px] text-amber-800/80">Click to login</span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="size-3.5 text-stone-400 group-hover:text-amber-800 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* nav_item: My Puja Bookings */}
                <button
                  type="button"
                  onClick={(e) => handleProtectedNavigation(e, "/bookings")}
                  className="w-full text-left group flex items-center justify-between px-3 py-2.5 rounded-xl bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200/80 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="size-7 rounded-lg bg-orange-100 border border-orange-300 flex items-center justify-center text-orange-800 shrink-0">
                      <Flame className="size-3.5 text-orange-600" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-stone-900 group-hover:text-amber-950">
                          My Puja Bookings
                        </span>
                        {isLoggedIn && (
                          <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-[var(--gold)] text-stone-950 font-black">
                            {userBookings.length > 0 ? `${userBookings.length} Booked` : "Active"}
                          </span>
                        )}
                      </div>
                      {isLoggedIn && userBookings.length > 0 ? (
                        <span className="text-[10px] text-amber-900 font-bold truncate max-w-[170px]">
                          🌸 {userBookings[0].pujaTitle}
                        </span>
                      ) : (
                        <span className="text-[9px] text-stone-500">
                          {isLoggedIn ? "View scheduled rituals" : "Click to login"}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="size-3.5 text-stone-400 group-hover:text-amber-800 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Festival Offers */}
                <Link
                  href="/festivals"
                  onClick={onClose}
                  className="group flex items-center justify-between px-3 py-2 rounded-xl hover:bg-amber-50/60 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="size-7 rounded-lg bg-amber-100/80 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                      <Ticket className="size-3.5" />
                    </div>
                    <span className="text-xs font-bold text-stone-800 group-hover:text-amber-950">
                      Festival Offers & Utsavs
                    </span>
                  </div>
                  <ChevronRight className="size-3.5 text-stone-400 group-hover:text-amber-800 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Logout Option if Logged In */}
            {isLoggedIn && (
              <div className="pt-1.5 border-t border-stone-200">
                <button
                  id="signout-menu-btn"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-rose-700 hover:bg-rose-50 border border-rose-200/60 text-xs font-bold transition-colors cursor-pointer"
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
  );
}
