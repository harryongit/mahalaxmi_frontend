"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { IMG } from "./images";
import { Reveal } from "./effects";
import { useQuery } from "@tanstack/react-query";
import { contentApi, getMediaUrl } from "@/src/lib/api";

const INITIAL_COUNTDOWN = {
  days: 11,
  hours: 23,
  minutes: 54,
  seconds: 0,
};

function useCountdown(target: number) {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(0);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted || target === 0 || now === 0) {
    return INITIAL_COUNTDOWN;
  }

  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function UtsavBanner() {
  const { data: events = [] } = useQuery({
    queryKey: ["content", "events"],
    queryFn: contentApi.getEvents,
  });

  const nextEvent = events.length > 0 ? events[0] : null;
  const [target, setTarget] = useState(0);

  useEffect(() => {
    if (nextEvent?.from_date) {
      const parsed = Date.parse(nextEvent.from_date);
      if (!isNaN(parsed) && parsed > Date.now()) {
        setTarget(parsed);
        return;
      }
    }
    // Auspicious upcoming utsav countdown (~11 days out)
    setTarget(Date.now() + 11 * 86400000 + 23 * 3600000 + 54 * 60000);
  }, [nextEvent]);

  const t = useCountdown(target);

  const units: [string, number][] = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Minutes", t.minutes],
    ["Seconds", t.seconds],
  ];

  return (
    <section id="utsav" className="relative py-16 md:py-24">
      <div className="container-temple max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] shadow-[0_40px_100px_-40px_rgba(80,30,0,0.55)]">
            <img
              src={getMediaUrl(nextEvent?.image) || IMG.festival}
              alt="Thousands of oil lamps lit across the temple courtyard"
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(100deg, rgba(28,10,6,0.92) 0%, rgba(40,14,8,0.75) 45%, rgba(60,22,10,0.35) 100%)",
              }}
            />
            <div className="relative px-7 py-14 md:px-16 md:py-20 max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.42em] text-white/70">
                Upcoming Utsav
              </p>
              <h2 className="font-serif mt-5 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] text-white">
                {nextEvent?.title || nextEvent?.name || (
                  <>Diwali <em className="not-italic text-gradient-gold italic">Deep Utsav</em></>
                )}
              </h2>
              <p className="mt-5 max-w-md text-white/75 leading-relaxed line-clamp-3">
                {nextEvent?.description ||
                  "Witness the sacred festive periods and illuminated evening lamps in honor of Goddess Ambabai Mahalaxmi."}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                {units.map(([label, value]) => (
                  <div
                    key={label}
                    className="w-[92px] rounded-2xl border border-white/15 bg-white/10 px-3 py-4 text-center backdrop-blur-md"
                  >
                    <div
                      suppressHydrationWarning
                      className="font-serif text-3xl text-[var(--gold)]"
                    >
                      {String(value).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-white/65">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/festivals"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-card px-7 py-3.5 text-sm font-medium text-[var(--maroon)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Explore Festival Details <HiArrowRight />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
