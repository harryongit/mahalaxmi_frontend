"use client";

import { FaInstagram, FaFacebookF, FaYoutube, FaXTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <footer
      className="relative pt-20 pb-10 text-white/80"
      style={{ background: "linear-gradient(180deg, #1a0f08 0%, #0a0604 100%)" }}
    >
      <div className="container-temple grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Ambabai Mahalaxmi Kolhapur Logo"
              className="size-10 rounded-full object-cover"
            />
            <span className="font-serif text-xl text-gradient-gold">Ambabai Mahalaxmi Kolhapur</span>
          </div>
          <p className="mt-5 max-w-sm text-sm text-white/65 leading-relaxed">
            A living sanctuary of devotion, art and silence — open to every seeker, every day, since
            1102 AD.
          </p>
          <div className="mt-6 flex gap-3">
            {[FaInstagram, FaFacebookF, FaYoutube, FaXTwitter].map((I, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social"
                className="grid size-10 place-items-center rounded-full border border-white/10 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
              >
                <I />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Explore</div>
          <ul className="mt-5 space-y-3 text-sm">
            {["About", "History", "Architecture", "Gallery", "Festivals"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="hover:text-white">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Participate</div>
          <ul className="mt-5 space-y-3 text-sm">
            {["Daily Rituals", "Virtual Darshan", "Donate", "Volunteer", "Contact"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-white">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Newsletter</div>
          <p className="mt-5 text-sm text-white/65">
            Receive monthly notes from the temple — festivals, rituals and reflections.
          </p>
          <form className="mt-5 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="min-w-0 flex-1 rounded-full bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-[var(--gold)]"
            />
            <button type="submit" className="btn-gold btn-gold-hover !py-3 !px-5 !text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="container-temple mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/55">
        <div>© {new Date().getFullYear()} Ambabai Mahalaxmi Kolhapur. All rights reserved.</div>
        <div className="flex gap-5">
          <a href="#" className="hover:text-white">
            Privacy
          </a>
          <a href="#" className="hover:text-white">
            Terms
          </a>
          <a href="#" className="hover:text-white">
            Accessibility
          </a>
        </div>
      </div>
    </footer>
  );
}
