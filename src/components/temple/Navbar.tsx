import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt4, HiX } from "react-icons/hi";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "History", href: "#history" },
  { label: "Architecture", href: "#architecture" },
  { label: "Rituals", href: "#rituals" },
  { label: "Gallery", href: "#gallery" },
  { label: "Festivals", href: "#festivals" },
  { label: "Darshan", href: "#darshan" },
  { label: "Donate", href: "#donate" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "bg-[color-mix(in_oklab,var(--background)_88%,transparent)] backdrop-blur-xl border-b border-[color-mix(in_oklab,var(--gold)_25%,transparent)] shadow-[0_10px_30px_-20px_rgba(80,40,0,0.25)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-temple flex items-center justify-between py-4">
          <a href="#home" className="flex items-center gap-3 group">
            <span
              className="grid size-10 place-items-center rounded-full"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.92 0.16 88), oklch(0.70 0.17 55))",
                boxShadow: "0 6px 20px -6px color-mix(in oklab, var(--gold) 60%, transparent)",
              }}
            >
              <span className="text-lg font-serif text-[oklch(0.20_0.02_60)]">ॐ</span>
            </span>
            <span className={`font-serif text-xl tracking-wide ${solid ? "text-foreground" : "text-white drop-shadow"}`}>
              Shri Mandir
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`relative text-sm font-medium tracking-wide transition-colors ${
                  solid ? "text-foreground/80 hover:text-foreground" : "text-white/85 hover:text-white"
                } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:scale-x-0 after:origin-right after:bg-[var(--gold)] after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#donate" className="hidden lg:inline-flex btn-gold btn-gold-hover !py-2 !px-5 !text-sm">
            Donate
          </a>

          <button
            aria-label="Open menu"
            className={`lg:hidden grid size-10 place-items-center rounded-full ${solid ? "bg-white/70 text-foreground" : "bg-white/15 text-white backdrop-blur"}`}
            onClick={() => setOpen(true)}
          >
            <HiMenuAlt4 className="size-5" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] lg:hidden"
            style={{ background: "radial-gradient(circle at 70% 0%, #2a1a0b, #0a0604)" }}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="font-serif text-xl text-gradient-gold">Shri Mandir</span>
              <button
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full bg-white/10 text-white"
                onClick={() => setOpen(false)}
              >
                <HiX className="size-5" />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center gap-6 mt-12">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                  className="font-serif text-3xl text-white/90 hover:text-[var(--gold)] transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
              <a href="#donate" onClick={() => setOpen(false)} className="mt-6 btn-gold btn-gold-hover">
                Donate Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
