"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaInstagram, FaFacebookF, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        e.preventDefault();
        router.push(href);
      }
    }
  };

  return (
    <footer
      className="relative pt-12 pb-6 text-white/80"
      style={{ background: "linear-gradient(180deg, #2A0C14 0%, #150509 100%)" }}
    >
      {/* Top Main Columns */}
      <div className="container-temple grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        
        {/* Column 1: Mandir Brand & Social */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Ambabai Mahalaxmi Kolhapur Logo"
              className="size-10 rounded-full object-cover border border-[var(--gold)]/50 shadow-md"
            />
            <span className="font-serif text-xl text-gradient-gold font-bold">
              Shri Mahalaxmi Mandir, Kolhapur
            </span>
          </div>
          <p className="mt-3 max-w-sm text-xs text-white/70 leading-relaxed font-normal">
            One of the sacred 51 Shakti Peethas in India. A living sanctuary of devotion, Vedic rituals, and divine blessings for prosperity and peace.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { icon: FaInstagram, href: "#", label: "Instagram" },
              { icon: FaFacebookF, href: "#", label: "Facebook" },
              { icon: FaYoutube, href: "#", label: "YouTube" },
              { icon: FaXTwitter, href: "#", label: "X (Twitter)" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <Link
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 hover:border-[var(--gold)] hover:text-[var(--gold)] hover:bg-white/10 transition-colors"
                >
                  <Icon className="size-3.5" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Column 2: Explore Temple */}
        <div>
          <div className="text-xs uppercase font-bold tracking-[0.2em] text-[var(--gold)]">
            Explore Temple
          </div>
          <ul className="mt-3 space-y-2 text-xs">
            {[
              { label: "About Mandir", href: "/about" },
              { label: "Daily Rituals", href: "/rituals" },
              { label: "Photo Gallery", href: "/gallery" },
              { label: "Festivals & Utsavs", href: "/festivals" },
              { label: "Contact Helpline", href: "/contact" },
            ].map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-white/70 hover:text-[var(--gold)] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Devotee Services */}
        <div>
          <div className="text-xs uppercase font-bold tracking-[0.2em] text-[var(--gold)]">
            Devotee Services
          </div>
          <ul className="mt-3 space-y-2 text-xs">
            {[
              { label: "Online Puja Booking", href: "/#book-puja" },
              { label: "Daily Rituals & Aarti", href: "/rituals" },
              { label: "My Seva Bookings", href: "/bookings" },
              { label: "My Profile Account", href: "/profile" },
              { label: "Annadan & Gou Seva", href: "/#donate" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-white/70 hover:text-[var(--gold)] transition-colors font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact & Temple Office Info */}
        <div>
          <div className="text-xs uppercase font-bold tracking-[0.2em] text-[var(--gold)]">
            Temple Contact & Helpline
          </div>
          <div className="mt-3 space-y-2.5 text-xs text-white/80">
            <div className="flex items-start gap-2.5">
              <MapPin className="size-4 text-[var(--gold)] shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                Mahalaxmi Temple Road, Kolhapur, Maharashtra 416012, India
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="size-4 text-[var(--gold)] shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-amber-200">+91 98765 43210</span>
                <span className="block text-white/60">+91 231 265 4321</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Mail className="size-4 text-[var(--gold)] shrink-0 mt-0.5" />
              <div>
                <span className="block">info@mahalaxmikolhapur.com</span>
                <span className="block text-white/60">hello@ambabaimahalaxmi.org</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Horizontal Centered Legal Links Row */}
      <div className="container-temple mt-8 pt-4 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-white/70 pb-3 border-b border-white/5 text-center">
          <Link href="/privacy-policy" className="hover:text-[var(--gold)] transition-colors">
            Privacy Policy
          </Link>
          <span className="text-white/20">•</span>
          <Link href="/terms-and-conditions" className="hover:text-[var(--gold)] transition-colors">
            Terms & Conditions
          </Link>
          <span className="text-white/20">•</span>
          <Link href="/cookie-policy" className="hover:text-[var(--gold)] transition-colors">
            Cookie Policy
          </Link>
          <span className="text-white/20">•</span>
          <Link href="/delete-account" className="text-rose-300 hover:text-rose-200 transition-colors font-medium">
            Delete My Account
          </Link>
        </div>

        {/* Bottom Bar: Copyright (Left) & Developed By External Link (Right) */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/60 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Shri Mahalaxmi Mandir Kolhapur. All rights reserved.
          </div>

          <div className="text-amber-200/90 font-medium">
            Developed by{" "}
            <a
              href="https://prismcosmic.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--gold)] font-bold hover:underline transition-all"
            >
              Prism Cosmic Pvt. Ltd.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
