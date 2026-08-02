import { useEffect, useMemo, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { IMG } from "./images";
import { Reveal } from "./effects";

function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function UtsavBanner() {
  // next Diwali-style utsav, ~11 days out from first render
  const target = useMemo(() => Date.now() + 11 * 86400000 + 23 * 3600000 + 54 * 60000, []);
  const t = useCountdown(target);

  const units: [string, number][] = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Minutes", t.minutes],
    ["Seconds", t.seconds],
  ];

  return (
    <section id="utsav" className="relative py-16 md:py-24">
      <div className="container-temple">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] shadow-[0_40px_100px_-40px_rgba(80,30,0,0.55)]">
            <img
              src={IMG.festival}
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
                Diwali <em className="not-italic text-gradient-gold italic">Deep Utsav</em>
              </h2>
              <p className="mt-5 max-w-md text-white/75 leading-relaxed">
                108,000 diyas will light the sanctuary in a single evening of prayer,
                music, and prasad. Reserve your seat now.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                {units.map(([label, value]) => (
                  <div
                    key={label}
                    className="w-[92px] rounded-2xl border border-white/15 bg-white/10 px-3 py-4 text-center backdrop-blur-md"
                  >
                    <div className="font-serif text-3xl text-[var(--gold)]">
                      {String(value).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-white/65">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#donate"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-card px-7 py-3.5 text-sm font-medium text-[var(--maroon)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Reserve My Seat <HiArrowRight />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
