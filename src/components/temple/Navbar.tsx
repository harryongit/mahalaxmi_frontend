"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { User, Flame, Sparkles, LogIn, LogOut, ShieldCheck, Ticket, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { bookingApi } from "@/src/lib/api";
import { UserDropdown } from "./UserDropdown";
import { useAuth } from "@/src/context/AuthContext";

const baseLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Rituals", href: "/rituals" },
  { label: "Gallery", href: "/gallery" },
  { label: "Festivals", href: "/festivals" },
  { label: "Donate", href: "/donate" },
];



export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, openLoginModal, logout } = useAuth();

  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Fetch logged in user's bookings for header display
  const { data: userBookingsData = [] } = useQuery({
    queryKey: ["user", "bookings"],
    queryFn: bookingApi.getUserBookings,
    enabled: isLoggedIn,
    staleTime: 5 * 1000,
  });

  const bookingsList: any[] = Array.isArray(userBookingsData)
    ? userBookingsData
    : Array.isArray((userBookingsData as any)?.data)
    ? (userBookingsData as any).data
    : [];

  const latestBooking = bookingsList[0];

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string, isProtected?: boolean) => {
    if (isProtected && !isLoggedIn) {
      e.preventDefault();
      openLoginModal("login");
      return;
    }
  };

  const displayName = user?.name || "Devotee";
  const initial = displayName.trim().charAt(0).toUpperCase() || "D";

  return (
    <>
      {/* Floating Curved Royal Header Container */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 px-3 sm:px-6 pt-3 pointer-events-none"
      >
        <div className="max-w-6xl mx-auto pointer-events-auto">
          <div
            className={`rounded-full transition-all duration-500 px-3 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between border-2 border-[var(--gold)]/60 shadow-2xl backdrop-blur-2xl ${solid
              ? "bg-[#2A0A12]/95 shadow-amber-950/40"
              : "bg-gradient-to-r from-[#3C0F1A]/95 via-[#4D1624]/95 to-[#2B0A12]/95"
              }`}
          >
            {/* Left: Mandir Brand Emblem */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-[var(--gold)] via-amber-200 to-amber-500 shadow-md group-hover:scale-105 transition-transform">
                <img
                  src="/logo.png"
                  alt="Ambabai Mahalaxmi Kolhapur Logo"
                  className="size-8 sm:size-9 rounded-full object-cover border border-amber-100"
                />

              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm sm:text-lg font-bold text-gradient-gold leading-none tracking-wide">
                  Ambabai Mahalaxmi
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-amber-200/80 font-medium">
                  Kolhapur Mandir
                </span>
              </div>
            </Link>

            {/* Center: Desktop Pill Navigation */}
            <nav className="hidden lg:flex items-center gap-1 ">
              {baseLinks.map((l) => {
                const isActive = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${isActive
                      ? "bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-950 shadow-md scale-[1.02]"
                      : "text-amber-100/80 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    {l.label}
                  </Link>
                );
              })}


            </nav>

            {/* Right: Header Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* User My Puja Booking Button in Header */}
              {isLoggedIn && (
                <Link
                  href="/bookings"
                  title={latestBooking ? `Booked: ${latestBooking.pujaTitle}` : "My Puja Bookings"}
                  className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-300/50 text-amber-200 hover:text-white text-xs font-bold transition-all shadow-md group cursor-pointer"
                >
                  <Flame className="size-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="truncate max-w-[150px]">
                    {latestBooking ? latestBooking.pujaTitle : "My Bookings"}
                  </span>
                  {bookingsList.length > 0 && (
                    <span className="size-4.5 px-1 rounded-full bg-[var(--gold)] text-stone-950 text-[10px] font-black flex items-center justify-center shrink-0">
                      {bookingsList.length}
                    </span>
                  )}
                </Link>
              )}

              {/* Quick Book Seva CTA Button */}
              <Link
                href="/rituals"
                className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-950 font-bold text-xs shadow-lg hover:brightness-110 hover:scale-105 transition-all"
              >
                <Flame className="size-3.5 text-stone-950" />
                <span>Book Puja</span>
              </Link>


              {/* User Account Dropdown Avatar */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="relative grid size-9 place-items-center rounded-full border border-[var(--gold)]/70 bg-black/40 text-[var(--gold)] hover:bg-[var(--gold)]/20 hover:border-[var(--gold)] transition-all shadow-md group cursor-pointer"
                  aria-label="User Account Menu"
                >
                  {isLoggedIn ? (
                    <span className="font-serif font-bold text-xs text-[var(--gold)]">
                      {initial}
                    </span>
                  ) : (
                    <User className="size-4 text-[var(--gold)] group-hover:scale-110 transition-transform" />
                  )}

                  {isLoggedIn && (
                    <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 border-2 border-[#3C0F1A] animate-pulse" />
                  )}
                </button>

                {/* Dropdown Menu anchored right below user icon */}
                <UserDropdown
                  isOpen={userDropdownOpen}
                  onClose={() => setUserDropdownOpen(false)}
                  userBookings={bookingsList}
                />
              </div>

              {/* Mobile Hamburger Button */}
              <button
                aria-label="Open menu"
                className="lg:hidden grid size-9 place-items-center rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <HiMenuAlt4 className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] lg:hidden flex flex-col justify-between overflow-y-auto"
            style={{ background: "radial-gradient(circle at 70% 0%, #3C0F1A, #120407)" }}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-amber-400/20">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-xl font-bold text-gradient-gold">
                    Ambabai Mahalaxmi
                  </span>
                </div>
                <button
                  aria-label="Close menu"
                  className="grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <HiX className="size-5" />
                </button>
              </div>

              {/* User Identity or Sign In Banner on Mobile */}
              <div className="px-6 pt-5">
                {isLoggedIn ? (
                  <>
                    <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-400/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)] flex items-center justify-center font-serif text-base font-bold text-[var(--gold)]">
                          {initial}
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-white text-sm">
                            {displayName}
                          </h4>
                          <p className="text-[11px] text-amber-200/70">
                            {user?.mobile || user?.email}
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        Verified
                      </span>
                    </div>

                    {/* Mobile My Puja Bookings Link */}
                    <Link
                      href="/bookings"
                      onClick={() => setOpen(false)}
                      className="mt-3 p-3 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-between text-white hover:bg-amber-500/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="size-8 rounded-xl bg-[var(--gold)] text-stone-950 flex items-center justify-center font-bold shadow-xs">
                          <Flame className="size-4" />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-amber-200">My Puja Bookings</span>
                            {bookingsList.length > 0 && (
                              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-[var(--gold)] text-stone-950">
                                {bookingsList.length}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-white/90 truncate max-w-[200px] font-medium">
                            {latestBooking ? `🌸 ${latestBooking.pujaTitle}` : "View scheduled rituals"}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-amber-300" />
                    </Link>
                  </>
                ) : (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#4A1521] to-[#3B0E19] border border-amber-400/30 text-white space-y-2.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-4 text-[var(--gold)]" />
                      <span className="text-xs font-bold">Devotee Access Portal</span>
                    </div>
                    <p className="text-[11px] text-amber-100/75 leading-tight">
                      Sign in to view your bookings, temple receipts, and profile.
                    </p>
                    <button
                      onClick={() => {
                        setOpen(false);
                        openLoginModal("login");
                      }}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-950 font-bold text-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <LogIn className="size-3.5" />
                      <span>Devotee Login</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col items-center justify-center gap-3 mt-6 px-6">
                {baseLinks.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 + i * 0.03, duration: 0.3 }}
                    className="w-full text-center"
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`block py-2 font-serif text-xl font-bold transition-colors ${pathname === l.href
                        ? "text-[var(--gold)]"
                        : "text-white/80 hover:text-white"
                        }`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}



                <Link
                  href="/#book-puja"
                  onClick={() => setOpen(false)}
                  className="mt-4 w-full py-3.5 rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-950 font-bold text-sm shadow-xl flex items-center justify-center gap-2"
                >
                  <Flame className="size-4" />
                  <span>Book Sacred Seva</span>
                </Link>
              </nav>
            </div>

            {/* Mobile Drawer Footer with Sign Out */}
            {isLoggedIn && (
              <div className="p-6 border-t border-amber-400/20">
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-rose-500/20"
                >
                  <LogOut className="size-4" />
                  <span>Sign Out of Account</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
