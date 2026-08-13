"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineChartPie,
  HiOutlinePhotograph,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineGift,
  HiOutlineChatAlt2,
  HiOutlineMail,
  HiOutlineCog,
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineQuestionMarkCircle,
  HiOutlineAdjustments,
  HiOutlinePlus,
  HiOutlineExternalLink,
  HiOutlineSparkles,
  HiOutlineCloudUpload,
} from "react-icons/hi";
import { AdminProvider, useAdmin } from "./admin-context";

const TABS = [
  { href: "/admin", label: "Overview", icon: HiOutlineChartPie },
  { href: "/admin/gallery", label: "Gallery", icon: HiOutlinePhotograph },
  { href: "/admin/events", label: "Events", icon: HiOutlineCalendar },
  { href: "/admin/rituals", label: "Rituals & Timings", icon: HiOutlineClock },
  { href: "/admin/donations", label: "Donations", icon: HiOutlineGift },
  { href: "/admin/testimonials", label: "Testimonials", icon: HiOutlineChatAlt2 },
  { href: "/admin/messages", label: "Messages", icon: HiOutlineMail },
  { href: "/admin/settings", label: "Settings", icon: HiOutlineCog },
];

function AdminSidebar() {
  const pathname = usePathname();
  const { s } = useAdmin();
  const unreadCount = s.messages.filter((m) => !m.read).length;

  return (
    <aside className="w-full lg:w-72 shrink-0 bg-gradient-to-b from-[#380D12] via-[#2A090E] to-[#1C0508] text-white p-6 flex flex-col justify-between min-h-screen border-r border-amber-900/30 lg:rounded-tr-[40px] lg:rounded-br-[40px] shadow-2xl relative z-20">
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 size-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 size-48 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3.5 mb-8 pb-6 border-b border-amber-900/40">
          <div className="size-11 rounded-2xl overflow-hidden shadow-lg shadow-amber-950/60 border border-amber-300/40">
            <img src="/logo.png" alt="Logo" className="size-full object-cover" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold tracking-wide text-amber-200 leading-tight">
              {s.settings.templeName}
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-amber-300/70 font-semibold">
                Admin Portal
              </span>
            </div>
          </div>
        </div>

        {/* Primary Golden Action Button */}
        <Link
          href="/admin/donations"
          className="w-full mb-6 py-3 px-5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-950/80 hover:brightness-110 active:scale-95 transition-all group"
        >
          <HiOutlinePlus className="text-sm stroke-[3] group-hover:scale-110 transition-transform" />
          <span>Upload New Record</span>
        </Link>

        {/* Navigation Links List */}
        <nav className="space-y-1.5">
          {TABS.map((t) => {
            const isActive = pathname === t.href;
            let countBadge: number | undefined;
            if (t.href === "/admin/messages" && unreadCount > 0) countBadge = unreadCount;

            return (
              <Link
                key={t.href}
                href={t.href}
                className={`flex items-center justify-between px-4 py-2.5 text-xs transition-all ${
                  isActive
                    ? "rounded-full border border-amber-400/70 bg-gradient-to-r from-amber-500/25 to-amber-500/10 text-amber-200 font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)] backdrop-blur-md"
                    : "rounded-xl text-amber-100/75 hover:bg-white/10 hover:text-white font-medium"
                }`}
              >
                <div className="flex items-center gap-3">
                  <t.icon
                    className={`text-base ${
                      isActive ? "text-amber-400 stroke-[2.5]" : "text-amber-300/60"
                    }`}
                  />
                  <span className="tracking-wide">{t.label}</span>
                </div>
                {countBadge !== undefined && (
                  <span className="rounded-full bg-amber-400 text-stone-950 font-mono font-bold text-[10px] px-2 py-0.5 shadow">
                    {countBadge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Storage & System Details Progress Section */}
      <div className="relative z-10 mt-8 pt-6 border-t border-amber-900/40 space-y-4 text-xs">
        <div className="text-[10px] uppercase tracking-widest text-amber-400/80 font-bold flex items-center justify-between">
          <span>STORAGE DETAILS</span>
          <HiOutlineSparkles className="text-amber-400" />
        </div>

        {/* Live Darshan Progress */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-amber-100/90 mb-1.5">
            <div className="flex items-center gap-1.5">
              <HiOutlineCloudUpload className="text-amber-400 text-sm" />
              <span>Live Darshan Stream</span>
            </div>
            <span className="font-mono text-emerald-400 text-[10px] font-bold">Active</span>
          </div>
          <div className="h-2 w-full rounded-full bg-stone-950/80 overflow-hidden border border-amber-900/40 p-0.5">
            <div className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 rounded-full w-full shadow-[0_0_10px_rgba(245,158,11,0.6)] animate-pulse" />
          </div>
        </div>

        {/* Monthly Seva Goal */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-amber-100/90 mb-1.5">
            <div className="flex items-center gap-1.5">
              <HiOutlineGift className="text-amber-400 text-sm" />
              <span>Monthly Seva Collection</span>
            </div>
            <span className="font-mono text-amber-300 text-[10px] font-bold">₹31.2k / ₹50k</span>
          </div>
          <div className="h-2 w-full rounded-full bg-stone-950/80 overflow-hidden border border-amber-900/40 p-0.5">
            <div className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 rounded-full w-[64%] shadow-[0_0_10px_rgba(245,158,11,0.6)]" />
          </div>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-white transition-colors pt-1"
        >
          <span>View Public Website</span>
          <HiOutlineExternalLink className="text-xs" />
        </Link>
      </div>
    </aside>
  );
}

function AdminHeader() {
  const { s } = useAdmin();
  const unreadCount = s.messages.filter((m) => !m.read).length;

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200/80">
      {/* Pill Search Input Bar */}
      <div className="relative w-full max-w-md">
        <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-base" />
        <input
          type="text"
          placeholder="Search temple records, events, donations..."
          className="w-full rounded-full border border-stone-200/90 bg-white shadow-sm pl-11 pr-5 py-2.5 text-xs text-stone-800 placeholder:text-stone-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all font-sans"
        />
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/messages"
          className="relative grid size-10 place-items-center rounded-full bg-white border border-stone-200 text-stone-600 hover:text-[#380D12] hover:border-amber-400 shadow-sm transition-all"
          title="Notifications"
        >
          <HiOutlineBell className="text-lg" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 size-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
          )}
        </Link>

        <button
          className="grid size-10 place-items-center rounded-full bg-white border border-stone-200 text-stone-600 hover:text-[#380D12] shadow-sm transition-all"
          title="Help & FAQ"
        >
          <HiOutlineQuestionMarkCircle className="text-lg" />
        </button>

        <Link
          href="/admin/settings"
          className="grid size-10 place-items-center rounded-full bg-white border border-stone-200 text-stone-600 hover:text-[#380D12] shadow-sm transition-all"
          title="Settings"
        >
          <HiOutlineCog className="text-lg" />
        </Link>

        <div className="h-6 w-px bg-stone-300/80 mx-1" />

        {/* Profile Avatar Badge */}
        <div className="flex items-center gap-2 pl-1">
          <span className="text-xs text-stone-600 font-medium hidden sm:inline">Trustee</span>
          <div className="size-10 rounded-full bg-[#380D12] text-amber-200 font-serif font-bold text-sm flex items-center justify-center shadow-md border-2 border-amber-300">
            J
          </div>
        </div>

        {/* Filter Sliders Icon */}
        <button
          className="grid size-10 place-items-center rounded-full bg-white border border-stone-200 text-stone-600 hover:text-[#380D12] shadow-sm transition-all ml-1"
          title="Filter Controls"
        >
          <HiOutlineAdjustments className="text-lg" />
        </button>
      </div>
    </header>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <div className="min-h-screen w-full bg-[#FAF6F0] flex flex-col lg:flex-row font-sans m-0 p-0">
        <AdminSidebar />
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-x-hidden min-w-0">
          <div>
            <AdminHeader />
            <main>{children}</main>
          </div>
        </div>
      </div>
    </AdminProvider>
  );
}
