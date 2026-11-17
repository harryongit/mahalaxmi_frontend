"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa6";
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
      className="relative pt-12 pb-6 text-white/80 font-sans"
      style={{ background: "linear-gradient(180deg, #2A0C14 0%, #150509 100%)" }}
    >
      {/* Top Main Columns */}
      <div className="container-temple max-w-6xl mx-auto px-4 sm:px-6 grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">

        {/* Column 1: Mandir Brand & Helpline */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Ambabai Mahalaxmi Kolhapur Logo"
              className="size-10 rounded-full object-cover border border-[var(--gold)]/50 shadow-md"
            />
            <span className="font-serif text-xl text-gradient-gold font-bold">
              Shri Mahalaxmi Mandir
            </span>
          </div>
          <p className="mt-3 max-w-sm text-xs text-white/70 leading-relaxed font-normal">
            One of the sacred 51 Shakti Peethas in India. A living sanctuary of devotion, Vedic rituals, and divine blessings for prosperity and peace.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/5 hover:border-[var(--gold)] hover:text-[var(--gold)] hover:bg-white/10 transition-colors"
              title="Follow on Instagram"
            >
              <FaInstagram className="size-3.5" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/5 hover:border-[var(--gold)] hover:text-[var(--gold)] hover:bg-white/10 transition-colors"
              title="Follow on Facebook"
            >
              <FaFacebookF className="size-3.5" />
            </a>
            <a
              href="https://wa.me/919371623260?text=Namaste%20Mandir%20Office"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/5 hover:border-[var(--gold)] hover:text-[var(--gold)] hover:bg-white/10 transition-colors"
              title="Chat on WhatsApp (+91 93716 23260)"
            >
              <FaWhatsapp className="size-3.5" />
            </a>
          </div>
        </div>

        {/* Column 2: Explore Temple (Active working pages) */}
        <div>
          <div className="text-xs uppercase font-bold tracking-[0.2em] text-[var(--gold)]">
            Explore Temple
          </div>
          <ul className="mt-3 space-y-2.5 text-xs">
            {[
              { label: "About Mandir", href: "/about" },
              { label: "Temple History", href: "/temple-history" },
              { label: "Darshan & Aarti Timings", href: "/darshan-timings" },
              { label: "Sacred Photo Gallery", href: "/gallery" },
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

        {/* Column 3: Devotee Services (Active working services) */}
        <div>
          <div className="text-xs uppercase font-bold tracking-[0.2em] text-[var(--gold)]">
            Devotee Services
          </div>
          <ul className="mt-3 space-y-2.5 text-xs">
            {[
              { label: "Book Online Puja", href: "/rituals" },
              { label: "Record Seva Donation", href: "/donate" },
              { label: "My Puja Bookings", href: "/bookings" },
              { label: "Devotee FAQs", href: "/faq" },
              { label: "How to Reach Temple", href: "/how-to-reach" },
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
          <div className="mt-3 space-y-3 text-xs text-white/80">
            <div className="flex items-start gap-2.5">
              <MapPin className="size-4 text-[var(--gold)] shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                Mahalaxmi Temple Road, Kolhapur, Maharashtra 416012, India
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="size-4 text-[var(--gold)] shrink-0 mt-0.5" />
              <div>
                <a href="tel:+919371623260" className="block font-bold text-amber-200 hover:underline">
                  +91 93716 23260
                </a>
                <a href="tel:+912312654321" className="block text-white/60 hover:underline">
                  +91 231 265 4321
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Mail className="size-4 text-[var(--gold)] shrink-0 mt-0.5" />
              <div>
                <a href="mailto:info@mahalaxmikolhapur.com" className="block hover:underline hover:text-[var(--gold)]">
                  info@mahalaxmikolhapur.com
                </a>
                <a href="mailto:seva@ambabaimahalaxmi.org" className="block text-white/60 hover:underline hover:text-[var(--gold)]">
                  seva@ambabaimahalaxmi.org
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Horizontal Centered Legal Links Row */}
      <div className="container-temple max-w-6xl mx-auto px-4 sm:px-6 mt-8 pt-4 border-t border-white/10">
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
