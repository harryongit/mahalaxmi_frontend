import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  HiOutlineChartPie,
  HiOutlinePhotograph,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineGift,
  HiOutlineChatAlt2,
  HiOutlineMail,
  HiOutlineCog,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineArrowLeft,
} from "react-icons/hi";
import { IMG } from "@/components/temple/images";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Temple Admin — Manage Shri Mandir" },
      {
        name: "description",
        content:
          "Admin dashboard to manage the gallery, events, rituals, donations, testimonials and messages of Shri Mandir.",
      },
      { property: "og:title", content: "Temple Admin — Manage Shri Mandir" },
      { property: "og:description", content: "Manage content, events and donations for Shri Mandir." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Admin,
});

type Tab =
  | "overview"
  | "gallery"
  | "events"
  | "rituals"
  | "donations"
  | "testimonials"
  | "messages"
  | "settings";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: HiOutlineChartPie },
  { id: "gallery", label: "Gallery", icon: HiOutlinePhotograph },
  { id: "events", label: "Events", icon: HiOutlineCalendar },
  { id: "rituals", label: "Rituals & Timings", icon: HiOutlineClock },
  { id: "donations", label: "Donations", icon: HiOutlineGift },
  { id: "testimonials", label: "Testimonials", icon: HiOutlineChatAlt2 },
  { id: "messages", label: "Messages", icon: HiOutlineMail },
  { id: "settings", label: "Settings", icon: HiOutlineCog },
];

type State = {
  gallery: string[];
  events: { id: string; date: string; name: string; note: string }[];
  rituals: { id: string; time: string; name: string }[];
  donations: { id: string; name: string; amount: number; purpose: string; date: string }[];
  testimonials: { id: string; name: string; role: string; text: string; published: boolean }[];
  messages: { id: string; name: string; email: string; text: string; read: boolean }[];
  settings: {
    templeName: string;
    tagline: string;
    phone: string;
    email: string;
    address: string;
    openTime: string;
    closeTime: string;
    liveDarshan: boolean;
    donationsOpen: boolean;
    maintenance: boolean;
  };
};

const initial: State = {
  gallery: IMG.gallery,
  events: [
    { id: "e1", date: "2026-12-12", name: "Karthikai Deepam", note: "108,000 lamps, main courtyard" },
    { id: "e2", date: "2027-01-14", name: "Pongal Vizha", note: "Community feast at dawn" },
    { id: "e3", date: "2027-02-26", name: "Annual Yagna", note: "Nine-day fire ritual" },
  ],
  rituals: [
    { id: "r1", time: "05:30", name: "Usha Kala Puja" },
    { id: "r2", time: "08:00", name: "Kalasanthi Abhishekam" },
    { id: "r3", time: "12:00", name: "Uchikala Puja" },
    { id: "r4", time: "18:30", name: "Sayaraksha Deeparadhana" },
    { id: "r5", time: "20:30", name: "Ardha Jama Puja" },
  ],
  donations: [
    { id: "d1", name: "Priya Iyer", amount: 5100, purpose: "Annadanam", date: "2026-07-28" },
    { id: "d2", name: "Ravi Menon", amount: 25000, purpose: "Gopuram Restoration", date: "2026-07-26" },
    { id: "d3", name: "Anya Sharma", amount: 1100, purpose: "Deepam Seva", date: "2026-07-22" },
  ],
  testimonials: [
    { id: "t1", name: "Priya Iyer", role: "Pilgrim, Bengaluru", text: "I have never felt so deeply held by silence.", published: true },
    { id: "t2", name: "Ravi Menon", role: "Architect", text: "The proportions are perfect.", published: true },
  ],
  messages: [
    { id: "m1", name: "Karthik Reddy", email: "karthik@mail.com", text: "May I photograph the morning aarti?", read: false },
    { id: "m2", name: "Meera Joshi", email: "meera@mail.com", text: "I'd like to volunteer for annadanam.", read: true },
  ],
  settings: {
    templeName: "Shri Mandir",
    tagline: "A Sacred Sanctuary",
    phone: "+91 98765 43210",
    email: "seva@shrimandir.org",
    address: "Temple Road, Old Town, Tamil Nadu 620001",
    openTime: "05:00",
    closeTime: "21:00",
    liveDarshan: true,
    donationsOpen: true,
    maintenance: false,
  },
};

const KEY = "temple-admin-state";
const uid = () => Math.random().toString(36).slice(2, 9);

function Admin() {
  const [tab, setTab] = useState<Tab>("overview");
  const [s, setS] = useState<State>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setS({ ...initial, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(s));
  }, [s, hydrated]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-[1400px] flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-0 lg:h-screen lg:w-72 shrink-0 border-b border-border lg:border-b-0 lg:border-r bg-card">
          <div className="p-6">
            <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[var(--saffron)]">
              <HiOutlineArrowLeft /> Back to site
            </Link>
            <h1 className="font-serif mt-5 text-3xl leading-none">
              Temple <span className="text-gradient-gold">Admin</span>
            </h1>
            <p className="mt-2 text-xs text-muted-foreground">{s.settings.templeName} control room</p>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-4 lg:flex-col lg:overflow-visible">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                  tab === t.id
                    ? "bg-[color-mix(in_oklab,var(--gold)_25%,transparent)] text-[var(--maroon)]"
                    : "text-foreground/70 hover:bg-muted"
                }`}
              >
                <t.icon className="text-base" />
                {t.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 md:p-10">
          {tab === "overview" && <Overview s={s} />}
          {tab === "gallery" && <GalleryAdmin s={s} setS={setS} />}
          {tab === "events" && <EventsAdmin s={s} setS={setS} />}
          {tab === "rituals" && <RitualsAdmin s={s} setS={setS} />}
          {tab === "donations" && <DonationsAdmin s={s} setS={setS} />}
          {tab === "testimonials" && <TestimonialsAdmin s={s} setS={setS} />}
          {tab === "messages" && <MessagesAdmin s={s} setS={setS} />}
          {tab === "settings" && <SettingsAdmin s={s} setS={setS} />}
        </main>
      </div>
    </div>
  );
}

type P = { s: State; setS: React.Dispatch<React.SetStateAction<State>> };

/* ---------- shared bits ---------- */
function Head({ title, sub, action }: { title: string; sub: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{sub}</p>
      </div>
      {action}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-5 ${className}`}>{children}</div>
  );
}

const inputCls =
  "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-[var(--gold)]";

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <input type={type} className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function AddBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="btn-gold btn-gold-hover !py-2.5 !text-sm">
      <HiOutlinePlus /> {children}
    </button>
  );
}

function DelBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Delete"
      className="grid size-9 place-items-center rounded-lg text-[var(--maroon)] transition-colors hover:bg-[color-mix(in_oklab,var(--maroon)_12%,transparent)]"
    >
      <HiOutlineTrash />
    </button>
  );
}

/* ---------- panels ---------- */
function Overview({ s }: { s: State }) {
  const total = s.donations.reduce((a, d) => a + d.amount, 0);
  const stats = [
    ["Gallery photos", s.gallery.length],
    ["Upcoming events", s.events.length],
    ["Daily rituals", s.rituals.length],
    ["Unread messages", s.messages.filter((m) => !m.read).length],
  ] as const;

  return (
    <>
      <Head title="Overview" sub="A snapshot of everything happening at the temple." />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([l, v]) => (
          <Card key={l}>
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{l}</div>
            <div className="font-serif mt-3 text-4xl text-[var(--maroon)]">{v}</div>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1 bg-[color-mix(in_oklab,var(--gold)_18%,var(--card))]">
          <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Total donations
          </div>
          <div className="font-serif mt-3 text-4xl text-[var(--maroon)]">
            ₹{total.toLocaleString("en-IN")}
          </div>
          <div className="mt-4 space-y-2">
            {s.donations.slice(0, 3).map((d) => (
              <div key={d.id} className="flex justify-between text-sm">
                <span className="text-foreground/75">{d.name}</span>
                <span>₹{d.amount.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Next events
          </div>
          <ul className="mt-4 divide-y divide-border">
            {s.events.map((e) => (
              <li key={e.id} className="flex items-center justify-between py-3">
                <div>
                  <div className="font-serif text-lg">{e.name}</div>
                  <div className="text-xs text-muted-foreground">{e.note}</div>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--saffron)]">{e.date}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}

function GalleryAdmin({ s, setS }: P) {
  const [url, setUrl] = useState("");
  return (
    <>
      <Head title="Gallery" sub="Add or remove photographs shown on the public gallery wall." />
      <Card className="mb-6">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[260px] flex-1">
            <Field label="Image URL" value={url} onChange={setUrl} />
          </div>
          <AddBtn
            onClick={() => {
              if (!url.trim()) return;
              setS((p) => ({ ...p, gallery: [url.trim(), ...p.gallery] }));
              setUrl("");
            }}
          >
            Add photo
          </AddBtn>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {s.gallery.map((src, i) => (
          <div key={src + i} className="group relative overflow-hidden rounded-2xl border border-border">
            <img src={src} alt={`Gallery item ${i + 1}`} loading="lazy" className="aspect-square w-full object-cover" />
            <button
              onClick={() => setS((p) => ({ ...p, gallery: p.gallery.filter((_, j) => j !== i) }))}
              className="absolute right-2 top-2 grid size-9 place-items-center rounded-full glass-dark text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label={`Remove image ${i + 1}`}
            >
              <HiOutlineTrash />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function EventsAdmin({ s, setS }: P) {
  return (
    <>
      <Head
        title="Events"
        sub="Schedule utsavs and festivals shown in the events section."
        action={
          <AddBtn
            onClick={() =>
              setS((p) => ({
                ...p,
                events: [...p.events, { id: uid(), date: "", name: "New event", note: "" }],
              }))
            }
          >
            New event
          </AddBtn>
        }
      />
      <div className="space-y-4">
        {s.events.map((e) => (
          <Card key={e.id}>
            <div className="grid gap-4 md:grid-cols-[1fr_1fr_2fr_auto] md:items-end">
              <Field label="Date" type="date" value={e.date} onChange={(v) => upd(setS, "events", e.id, { date: v })} />
              <Field label="Name" value={e.name} onChange={(v) => upd(setS, "events", e.id, { name: v })} />
              <Field label="Note" value={e.note} onChange={(v) => upd(setS, "events", e.id, { note: v })} />
              <DelBtn onClick={() => del(setS, "events", e.id)} />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function RitualsAdmin({ s, setS }: P) {
  return (
    <>
      <Head
        title="Rituals & Timings"
        sub="Daily puja schedule published on the rituals section."
        action={
          <AddBtn
            onClick={() =>
              setS((p) => ({ ...p, rituals: [...p.rituals, { id: uid(), time: "06:00", name: "New puja" }] }))
            }
          >
            New ritual
          </AddBtn>
        }
      />
      <div className="space-y-4">
        {s.rituals.map((r) => (
          <Card key={r.id}>
            <div className="grid gap-4 md:grid-cols-[160px_1fr_auto] md:items-end">
              <Field label="Time" type="time" value={r.time} onChange={(v) => upd(setS, "rituals", r.id, { time: v })} />
              <Field label="Ritual" value={r.name} onChange={(v) => upd(setS, "rituals", r.id, { name: v })} />
              <DelBtn onClick={() => del(setS, "rituals", r.id)} />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function DonationsAdmin({ s, setS }: P) {
  const total = s.donations.reduce((a, d) => a + d.amount, 0);
  return (
    <>
      <Head
        title="Donations"
        sub={`Seva contributions received — ₹${total.toLocaleString("en-IN")} total.`}
        action={
          <AddBtn
            onClick={() =>
              setS((p) => ({
                ...p,
                donations: [
                  { id: uid(), name: "New devotee", amount: 0, purpose: "Annadanam", date: new Date().toISOString().slice(0, 10) },
                  ...p.donations,
                ],
              }))
            }
          >
            Record donation
          </AddBtn>
        }
      />
      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <th className="p-4">Devotee</th>
              <th className="p-4">Purpose</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Amount</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {s.donations.map((d) => (
              <tr key={d.id} className="border-b border-border last:border-0">
                <td className="p-3">
                  <input className={inputCls} value={d.name} onChange={(e) => upd(setS, "donations", d.id, { name: e.target.value })} />
                </td>
                <td className="p-3">
                  <input className={inputCls} value={d.purpose} onChange={(e) => upd(setS, "donations", d.id, { purpose: e.target.value })} />
                </td>
                <td className="p-3">
                  <input type="date" className={inputCls} value={d.date} onChange={(e) => upd(setS, "donations", d.id, { date: e.target.value })} />
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    className={`${inputCls} text-right`}
                    value={d.amount}
                    onChange={(e) => upd(setS, "donations", d.id, { amount: Number(e.target.value) })}
                  />
                </td>
                <td className="p-3">
                  <DelBtn onClick={() => del(setS, "donations", d.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

function TestimonialsAdmin({ s, setS }: P) {
  return (
    <>
      <Head
        title="Testimonials"
        sub="Approve and edit devotee voices before they appear on the site."
        action={
          <AddBtn
            onClick={() =>
              setS((p) => ({
                ...p,
                testimonials: [
                  ...p.testimonials,
                  { id: uid(), name: "New devotee", role: "Pilgrim", text: "", published: false },
                ],
              }))
            }
          >
            New testimonial
          </AddBtn>
        }
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {s.testimonials.map((t) => (
          <Card key={t.id}>
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" value={t.name} onChange={(v) => upd(setS, "testimonials", t.id, { name: v })} />
                <Field label="Role" value={t.role} onChange={(v) => upd(setS, "testimonials", t.id, { role: v })} />
              </div>
              <label className="block">
                <span className="mb-1.5 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Quote</span>
                <textarea
                  rows={3}
                  className={inputCls}
                  value={t.text}
                  onChange={(e) => upd(setS, "testimonials", t.id, { text: e.target.value })}
                />
              </label>
              <div className="flex items-center justify-between">
                <Toggle
                  label="Published"
                  on={t.published}
                  onChange={(v) => upd(setS, "testimonials", t.id, { published: v })}
                />
                <DelBtn onClick={() => del(setS, "testimonials", t.id)} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

function MessagesAdmin({ s, setS }: P) {
  return (
    <>
      <Head title="Messages" sub="Enquiries received from the contact form." />
      <div className="space-y-4">
        {s.messages.map((m) => (
          <Card key={m.id} className={m.read ? "" : "border-[var(--gold)]"}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="font-serif text-xl">{m.name}</div>
                <a href={`mailto:${m.email}`} className="text-xs text-[var(--saffron)]">
                  {m.email}
                </a>
                <p className="mt-3 max-w-2xl text-sm text-foreground/80">{m.text}</p>
              </div>
              <div className="flex items-center gap-2">
                <Toggle label="Read" on={m.read} onChange={(v) => upd(setS, "messages", m.id, { read: v })} />
                <DelBtn onClick={() => del(setS, "messages", m.id)} />
              </div>
            </div>
          </Card>
        ))}
        {s.messages.length === 0 && <p className="text-sm text-muted-foreground">No messages yet.</p>}
      </div>
    </>
  );
}

function SettingsAdmin({ s, setS }: P) {
  const set = (patch: Partial<State["settings"]>) =>
    setS((p) => ({ ...p, settings: { ...p.settings, ...patch } }));
  return (
    <>
      <Head title="Settings" sub="Temple identity, contact details and site-wide switches." />
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <div className="grid gap-4">
            <Field label="Temple name" value={s.settings.templeName} onChange={(v) => set({ templeName: v })} />
            <Field label="Tagline" value={s.settings.tagline} onChange={(v) => set({ tagline: v })} />
            <Field label="Address" value={s.settings.address} onChange={(v) => set({ address: v })} />
          </div>
        </Card>
        <Card>
          <div className="grid gap-4">
            <Field label="Phone" value={s.settings.phone} onChange={(v) => set({ phone: v })} />
            <Field label="Email" value={s.settings.email} onChange={(v) => set({ email: v })} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Opens" type="time" value={s.settings.openTime} onChange={(v) => set({ openTime: v })} />
              <Field label="Closes" type="time" value={s.settings.closeTime} onChange={(v) => set({ closeTime: v })} />
            </div>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-3">
            <Toggle label="Live darshan enabled" on={s.settings.liveDarshan} onChange={(v) => set({ liveDarshan: v })} />
            <Toggle label="Donations open" on={s.settings.donationsOpen} onChange={(v) => set({ donationsOpen: v })} />
            <Toggle label="Maintenance mode" on={s.settings.maintenance} onChange={(v) => set({ maintenance: v })} />
          </div>
        </Card>
      </div>
    </>
  );
}

function Toggle({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="flex items-center gap-3 text-sm"
      role="switch"
      aria-checked={on}
    >
      <span
        className={`relative h-6 w-11 rounded-full transition-colors ${
          on ? "bg-[var(--saffron)]" : "bg-muted"
        }`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-card transition-all ${
            on ? "left-[22px]" : "left-0.5"
          }`}
        />
      </span>
      {label}
    </button>
  );
}

/* ---------- helpers ---------- */
type ListKey = "events" | "rituals" | "donations" | "testimonials" | "messages";

function upd(
  setS: P["setS"],
  key: ListKey,
  id: string,
  patch: Record<string, unknown>,
) {
  setS((p) => ({
    ...p,
    [key]: (p[key] as { id: string }[]).map((it) => (it.id === id ? { ...it, ...patch } : it)),
  }) as State);
}

function del(setS: P["setS"], key: ListKey, id: string) {
  setS((p) => ({
    ...p,
    [key]: (p[key] as { id: string }[]).filter((it) => it.id !== id),
  }) as State);
}
