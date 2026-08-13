"use client";

import { useState } from "react";
import { useLenis } from "@/src/lib/use-lenis";
import { Navbar } from "@/src/components/temple/Navbar";
import { Footer } from "@/src/components/temple/Footer";
import { motion } from "framer-motion";
import { Reveal, SectionEyebrow } from "@/src/components/temple/effects";
import {
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlinePhone,
  HiOutlineMail,
} from "react-icons/hi";
import { IMG } from "@/src/components/temple/images";

export default function ContactPage() {
  useLenis();
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <main className="relative">
        <Navbar />

        {/* Page Hero Banner */}
        <section
          className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden text-white text-center"
          style={{ background: "linear-gradient(180deg, #1a0f08 0%, #2a1508 50%, #0a0604 100%)" }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(212,160,60,0.3), transparent 60%)",
            }}
          />
          <div className="container-temple relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center gap-3 text-[var(--gold)]"
            >
              <span className="h-px w-10 bg-current opacity-60" />
              <span className="text-xs uppercase tracking-[0.4em]">Get In Touch</span>
              <span className="h-px w-10 bg-current opacity-60" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
              className="font-serif mt-6 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-tight"
            >
              Contact <span className="text-gradient-gold">Us</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="mt-6 max-w-xl mx-auto text-sm md:text-base text-white/75 font-light"
            >
              Have questions about visiting the temple, rituals, or donations? We'd love to hear
              from you.
            </motion.p>
          </div>
        </section>

        {/* Contact Details + Form */}
        <section className="relative py-28 md:py-40 overflow-hidden">
          <div className="container-temple grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — Info + Map */}
            <div>
              <Reveal>
                <SectionEyebrow>Visit &amp; Contact</SectionEyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] mt-6 leading-[1.05]">
                  Find your way to the{" "}
                  <span className="text-gradient-gold">sanctuary.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <ul className="mt-8 space-y-6 text-foreground/80">
                  <li className="flex gap-4">
                    <HiOutlineLocationMarker className="size-5 mt-1 text-[var(--saffron)] shrink-0" />
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-sm opacity-80">
                        Mahalaxmi Temple Road, Kolhapur, Maharashtra 416012
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <HiOutlineClock className="size-5 mt-1 text-[var(--saffron)] shrink-0" />
                    <div>
                      <div className="font-medium">Open Daily</div>
                      <div className="text-sm opacity-80">
                        5:00 AM – 12:30 PM &nbsp;·&nbsp; 4:00 PM – 9:30 PM
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <HiOutlinePhone className="size-5 mt-1 text-[var(--saffron)] shrink-0" />
                    <div>
                      <div className="font-medium">+91 231 265 4321</div>
                      <div className="text-sm opacity-80">
                        Parking available near the temple complex.
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <HiOutlineMail className="size-5 mt-1 text-[var(--saffron)] shrink-0" />
                    <div>
                      <div className="font-medium">hello@ambabaimahalaxmi.org</div>
                      <div className="text-sm opacity-80">
                        For events, donations and volunteer inquiries.
                      </div>
                    </div>
                  </li>
                </ul>
              </Reveal>

              {/* Map Placeholder */}
              <Reveal delay={0.3}>
                <div className="mt-10 relative aspect-[4/3] rounded-3xl overflow-hidden border border-border">
                  <img
                    src={IMG.location}
                    alt="Map of temple location"
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/40" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="relative grid place-items-center">
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{
                          animation: "ripple-pulse 2.4s ease-out infinite",
                          background: "color-mix(in oklab, var(--gold) 70%, transparent)",
                        }}
                      />
                      <span className="relative grid size-12 place-items-center rounded-full bg-white text-[var(--maroon)] shadow-lg">
                        <HiOutlineLocationMarker className="size-6" />
                      </span>
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right — Contact Form */}
            <div>
              <Reveal delay={0.15}>
                <div className="rounded-3xl bg-card border border-border p-8 md:p-10 shadow-[0_30px_80px_-30px_rgba(80,30,0,0.15)]">
                  <h3 className="font-serif text-2xl md:text-3xl">Send us a message</h3>
                  <p className="mt-2 text-sm text-foreground/65">
                    We'll respond within 24–48 hours.
                  </p>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-10 text-center py-16"
                    >
                      <div className="text-5xl mb-4">🙏</div>
                      <h4 className="font-serif text-2xl text-[var(--maroon)]">
                        Thank you!
                      </h4>
                      <p className="mt-2 text-foreground/70 text-sm">
                        Your message has been received. We'll be in touch soon.
                      </p>
                    </motion.div>
                  ) : (
                    <form
                      className="mt-8 space-y-5"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubmitted(true);
                      }}
                    >
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/70 mb-1.5 block">
                            Name
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Your name"
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-[var(--gold)] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/70 mb-1.5 block">
                            Email
                          </label>
                          <input
                            required
                            type="email"
                            placeholder="you@example.com"
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-[var(--gold)] transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/70 mb-1.5 block">
                          Subject
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="What is this regarding?"
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-[var(--gold)] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/70 mb-1.5 block">
                          Message
                        </label>
                        <textarea
                          required
                          rows={5}
                          placeholder="Your message..."
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-[var(--gold)] transition-colors resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn-gold btn-gold-hover w-full !py-3.5"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
