"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HiOutlineChartPie,
  HiOutlinePhotograph,
  HiOutlineClock,
  HiOutlineGift,
  HiOutlineChatAlt2,
  HiOutlineMail,
  HiOutlineUserGroup,
  HiOutlineBell,
  HiOutlineExternalLink,
  HiOutlineLogout,
  HiOutlineChartBar,
  HiOutlineMenuAlt2,
  HiOutlineX,
} from "react-icons/hi";
import { AdminProvider, useAdmin } from "./admin-context";
import { clearAdminSession } from "@/src/lib/storage";
import { AdminSessionModal } from "./AdminSessionModal";

const TABS = [
  { href: "/admin", label: "Overview", icon: HiOutlineChartPie },
  { href: "/admin/users", label: "Devotees & Bookings", icon: HiOutlineUserGroup },
  { href: "/admin/rituals", label: "Puja & Services", icon: HiOutlineClock },
  { href: "/admin/gallery", label: "Gallery", icon: HiOutlinePhotograph },
  { href: "/admin/donations", label: "Donations", icon: HiOutlineGift },
  { href: "/admin/testimonials", label: "Testimonials", icon: HiOutlineChatAlt2 },
  { href: "/admin/messages", label: "Enquiry", icon: HiOutlineMail },
  { href: "/admin/analytics", label: "Analytics", icon: HiOutlineChartBar },
];

function AdminSidebarContent({
  onClose,
  isMobile = false,
}: {
  onClose?: () => void;
  isMobile?: boolean;
}) {
  const pathname = usePathname();
  const { s } = useAdmin();
  const unreadCount = s.messages.filter((m) => !m.read).length;

  return (
    <>
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 size-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 size-48 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Brand Logo Header */}
        <div className="flex items-center justify-between pb-5 border-b border-amber-900/40">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-0.5 rounded-full bg-gradient-to-tr from-[var(--gold)] via-amber-300 to-amber-500 shadow-lg shadow-amber-950/60 shrink-0">
              <img
                src="/logo.png"
                alt="Shri Mahalaxmi Mandir Logo"
                className="size-9 sm:size-10 rounded-full object-cover border border-amber-100"
              />
            </div>
            <div className="min-w-0">
              <h1 className="font-serif text-base sm:text-lg font-bold tracking-wide text-amber-200 leading-tight truncate">
                {s.settings.templeName}
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-[10px] uppercase tracking-widest text-amber-300/70 font-semibold truncate">
                  Admin Portal
                </span>
              </div>
            </div>
          </div>

          {/* Close Button on Mobile Drawer */}
          {isMobile && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 transition-colors cursor-pointer shrink-0 ml-2"
              title="Close Menu"
              aria-label="Close Menu"
            >
              <HiOutlineX className="size-5" />
            </button>
          )}
        </div>

        {/* Navigation Links List */}
        <nav className="space-y-1.5">
          {TABS.map((t) => {
            const isActive = pathname === t.href;
            let countBadge: number | undefined;
            if (t.href === "/admin/messages" && unreadCount > 0) countBadge = unreadCount;
            if (t.href === "/admin/users" && s.bookings?.length > 0) countBadge = s.bookings.length;

            return (
              <Link
                key={t.href}
                href={t.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3.5 sm:px-4 py-2.5 text-xs transition-all ${
                  isActive
                    ? "rounded-full border border-amber-400/70 bg-gradient-to-r from-amber-500/25 to-amber-500/10 text-amber-200 font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)] backdrop-blur-md"
                    : "rounded-xl text-amber-100/75 hover:bg-white/10 hover:text-white font-medium"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <t.icon
                    className={`text-base shrink-0 ${
                      isActive ? "text-amber-400 stroke-[2.5]" : "text-amber-300/60"
                    }`}
                  />
                  <span className="tracking-wide truncate">{t.label}</span>
                </div>
                {countBadge !== undefined && (
                  <span className="rounded-full bg-amber-400 text-stone-950 font-mono font-bold text-[10px] px-2 py-0.5 shadow shrink-0 ml-2">
                    {countBadge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="relative z-10 mt-8 pt-5 border-t border-amber-900/40 text-xs shrink-0">
        <Link
          href="/"
          target="_blank"
          onClick={onClose}
          className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-white transition-colors"
        >
          <span>View Public Website</span>
          <HiOutlineExternalLink className="text-xs" />
        </Link>
      </div>
    </>
  );
}

function AdminHeader({ onOpenMobile }: { onOpenMobile: () => void }) {
  const { s } = useAdmin();
  const router = useRouter();
  const unreadCount = s.messages.filter((m) => !m.read).length;

  const handleLogout = () => {
    clearAdminSession();
    router.push("/admin/login");
  };

  return (
    <header className="flex items-center justify-between gap-3 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-stone-200/80 font-sans">
      {/* Left: Mobile Menu Toggle & Title */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
        <button
          type="button"
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-[#380D12] hover:border-amber-400 shadow-xs cursor-pointer transition-colors shrink-0"
          title="Open Admin Navigation Menu"
          aria-label="Open Navigation Menu"
        >
          <HiOutlineMenuAlt2 className="size-5" />
        </button>

        <div className="min-w-0">
          <h2 className="font-serif text-base sm:text-lg lg:text-xl font-bold text-[#3C0F1A] truncate">
            Temple Sansthan Admin Dashboard
          </h2>
          <span className="text-[11px] sm:text-xs text-stone-500 font-medium truncate block">
            Shri Mahalaxmi Mandir, Kolhapur
          </span>
        </div>
      </div>

      {/* Right: Notifications & Logout */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <Link
          href="/admin/messages"
          className="relative grid size-9 sm:size-10 place-items-center rounded-full bg-white border border-stone-200 text-stone-600 hover:text-[#380D12] hover:border-amber-400 shadow-xs transition-all"
          title="Devotee Enquiries"
        >
          <HiOutlineBell className="text-base sm:text-lg" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 size-2 sm:size-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
          )}
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-600 hover:text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          title="Logout from Admin Portal"
        >
          <HiOutlineLogout className="text-sm stroke-[2.5]" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Auto-close drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Lock body scroll on mobile when drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // On Admin Login page, render ONLY the login card without sidebar or header
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <>
      <AdminSessionModal />
      <div className="min-h-screen w-full bg-[#FAF6F0] flex flex-col lg:flex-row items-start font-sans m-0 p-0">
        {/* Mobile Backdrop Overlay */}
        {isMobileOpen && (
          <div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity lg:hidden"
            aria-hidden="true"
          />
        )}

        {/* Mobile Slide-Over Drawer Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-80 bg-gradient-to-b from-[#380D12] via-[#2A090E] to-[#1C0508] text-white p-5 sm:p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto font-sans ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <AdminSidebarContent onClose={() => setIsMobileOpen(false)} isMobile />
        </aside>

        {/* Desktop Sticky Left Sidebar */}
        <aside className="hidden lg:flex w-64 xl:w-72 shrink-0 bg-gradient-to-b from-[#380D12] via-[#2A090E] to-[#1C0508] text-white p-5 xl:p-6 flex-col justify-between sticky top-0 h-screen max-h-screen overflow-y-auto border-r border-amber-900/30 lg:rounded-tr-[32px] lg:rounded-br-[32px] shadow-2xl relative z-20 font-sans scrollbar-none">
          <AdminSidebarContent />
        </aside>

        {/* Main Workspace Area */}
        <div className="flex-1 p-3.5 sm:p-5 lg:p-6 xl:p-8 flex flex-col justify-between overflow-x-hidden min-w-0 w-full">
          <div>
            <AdminHeader onOpenMobile={() => setIsMobileOpen(true)} />
            <main className="min-w-0 w-full">{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminProvider>
  );
}
