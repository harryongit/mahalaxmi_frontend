"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { User, Flame, Sparkles } from "lucide-react";
import { UserDropdown } from "./UserDropdown";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Rituals", href: "/rituals" },
  { label: "Gallery", href: "/gallery" },
  { label: "Festivals", href: "/festivals" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            className={`rounded-full transition-all duration-500 px-4 sm:px-6 py-2.5 flex items-center justify-between border-2 border-[var(--gold)]/60 shadow-2xl backdrop-blur-2xl ${
              solid
                ? "bg-[#2A0A12]/95 shadow-amber-950/40"
                : "bg-gradient-to-r from-[#3C0F1A]/95 via-[#4D1624]/95 to-[#2B0A12]/95"
            }`}
          >
            {/* Left: Mandir Brand Emblem */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-[var(--gold)] via-amber-200 to-amber-500 shadow-md group-hover:scale-105 transition-transform">
                <img
                  src="/logo.png"
                  alt="Ambabai Mahalaxmi Kolhapur Logo"
                  className="size-8 sm:size-9 rounded-full object-cover border border-amber-100"
                />
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 border-2 border-[#3C0F1A] animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base sm:text-lg font-bold text-gradient-gold leading-none tracking-wide">
                  Ambabai Mahalaxmi
                </span>
                <span className="text-[9px] uppercase tracking-widest text-amber-200/80 font-medium">
                  Kolhapur Mandir
                </span>
              </div>
            </Link>

            {/* Center: Desktop Pill Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5 bg-black/30 p-1 rounded-full border border-amber-400/20 backdrop-blur-md">
              {links.map((l) => {
                const isActive = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-950 shadow-md scale-[1.02]"
                        : "text-amber-100/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Header Actions (Book Seva CTA + User Account) */}
            <div className="flex items-center gap-2.5">
              
              {/* Quick Book Seva CTA Button */}
              <Link
                href="/#book-puja"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-950 font-bold text-xs shadow-lg hover:brightness-110 hover:scale-105 transition-all"
              >
                <Flame className="size-3.5 text-stone-950" />
                <span>Book Seva</span>
              </Link>

              {/* User Account Dropdown Avatar */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="grid size-9 place-items-center rounded-full border-2 border-[var(--gold)]/60 bg-black/40 text-white hover:bg-[var(--gold)]/20 transition-all shadow-md group cursor-pointer"
                  aria-label="User Account"
                >
                  <div className="size-7 rounded-full bg-gradient-to-tr from-[var(--saffron)] to-[var(--gold)] p-[1px] flex items-center justify-center">
                    <div className="size-full rounded-full bg-[#1c0d05] flex items-center justify-center text-white">
                      <User className="size-3.5 text-[var(--gold)]" />
                    </div>
                  </div>
                </button>

                {/* Dropdown Menu anchored right below user icon */}
                <UserDropdown
                  isOpen={userDropdownOpen}
                  onClose={() => setUserDropdownOpen(false)}
                />
              </div>

              {/* Mobile Hamburger Button */}
              <button
                aria-label="Open menu"
                className="lg:hidden grid size-9 place-items-center rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20"
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
            className="fixed inset-0 z-[60] lg:hidden"
            style={{ background: "radial-gradient(circle at 70% 0%, #3C0F1A, #120407)" }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-amber-400/20">
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-bold text-gradient-gold">Ambabai Mahalaxmi</span>
              </div>
              <button
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <HiX className="size-5" />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center gap-6 mt-12 px-6">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
                  className="w-full text-center"
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block py-2.5 font-serif text-2xl font-bold transition-colors ${
                      pathname === l.href ? "text-[var(--gold)]" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <Link
                href="/#book-puja"
                onClick={() => setOpen(false)}
                className="mt-6 w-full py-3.5 rounded-full bg-gradient-to-r from-[var(--gold)] to-amber-300 text-stone-950 font-bold text-sm shadow-xl flex items-center justify-center gap-2"
              >
                <Flame className="size-4" />
                <span>Book Sacred Seva</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
