"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { adminBookingApi, adminUserApi } from "@/src/lib/api";
import { useAdmin } from "./admin-context";
import { Head, Card } from "./admin-ui";
import {
  Sparkles,
  Flame,
  CalendarPlus,
  UploadCloud,
  Coins,
  ArrowUpRight,
} from "lucide-react";
import {
  HiOutlinePhotograph,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineGift,
  HiOutlineMail,
  HiOutlineArrowRight,
  HiOutlinePlus,
  HiOutlineCheckCircle,
  HiOutlineUserGroup,
  HiOutlinePhone,
} from "react-icons/hi";

export default function AdminOverviewPage() {
  const { s } = useAdmin();
  const unreadCount = s.messages.filter((m) => !m.read).length;

  const { data: dbBookingsData = [] } = useQuery({
    queryKey: ["admin", "dashboardLiveBookings"],
    queryFn: adminBookingApi.getAllBookings,
    staleTime: 5000,
  });

  const liveBookings: any[] = Array.isArray(dbBookingsData)
    ? dbBookingsData
    : Array.isArray((dbBookingsData as any)?.data)
    ? (dbBookingsData as any).data
    : [];

  const allBookings = liveBookings.length > 0 ? liveBookings : (s.bookings || []);
  const confirmedCount = allBookings.filter((b) => b.paymentStatus === "Paid & Confirmed" || b.paymentStatus === "Completed").length;
  const failedCount = allBookings.filter((b) => b.paymentStatus === "Payment Failed" || b.paymentStatus?.toLowerCase().includes("fail")).length;

  const { data: dbDevoteesData = [] } = useQuery({
    queryKey: ["admin", "dashboardLiveDevotees"],
    queryFn: adminUserApi.getUsers,
    staleTime: 5000,
  });

  const liveDevotees: any[] = Array.isArray(dbDevoteesData)
    ? dbDevoteesData
    : Array.isArray((dbDevoteesData as any)?.data)
    ? (dbDevoteesData as any).data
    : [];

  const allDevotees = liveDevotees.length > 0 ? liveDevotees : (s.users || []);

  return (
    <div className="space-y-8 font-sans">
      <Head
        title="Temple Operations & Management Dashboard"
        sub={`Official Sansthan management portal for ${s.settings.templeName}.`}
      />

      {/* Quick Action Operations - Distinct, Executive Interactive Action Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Quick Administrative Actions
            </h3>
          </div>
          <span className="text-[11px] text-stone-400 font-medium hidden sm:inline">
            Direct Operations Launcher
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Action 1: Add New Puja Seva */}
          <Link
            href="/admin/rituals"
            className="group relative flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-stone-200/90 hover:border-amber-500/80 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 via-transparent to-transparent rounded-bl-full pointer-events-none" />
            <div className="size-11 rounded-xl bg-gradient-to-br from-[#3C0F1A] via-[#4A1522] to-[#24080F] text-amber-300 flex items-center justify-center shadow-xs border border-amber-500/30 group-hover:scale-105 transition-transform shrink-0">
              <Flame className="size-5 text-amber-300" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <h4 className="font-serif text-sm font-bold text-stone-900 group-hover:text-[#3C0F1A] transition-colors truncate">
                  Add Puja Seva
                </h4>
                <div className="size-6 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center group-hover:bg-[#3C0F1A] group-hover:text-amber-300 transition-colors shrink-0">
                  <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
              <p className="text-[11px] text-stone-500 truncate mt-0.5">
                New ritual or gotra booking
              </p>
            </div>
          </Link>

          {/* Action 2: Schedule Utsav Event */}
          <Link
            href="/admin/events"
            className="group relative flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-stone-200/90 hover:border-amber-400 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-400/10 via-transparent to-transparent rounded-bl-full pointer-events-none" />
            <div className="size-11 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 text-amber-900 flex items-center justify-center shadow-xs border border-amber-300/80 group-hover:scale-105 transition-transform shrink-0">
              <CalendarPlus className="size-5 text-amber-800" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <h4 className="font-serif text-sm font-bold text-stone-900 group-hover:text-amber-900 transition-colors truncate">
                  Schedule Festival
                </h4>
                <div className="size-6 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors shrink-0">
                  <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
              <p className="text-[11px] text-stone-500 truncate mt-0.5">
                Temple utsav & celebration
              </p>
            </div>
          </Link>

          {/* Action 3: Upload Gallery Photo */}
          <Link
            href="/admin/gallery"
            className="group relative flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-stone-200/90 hover:border-indigo-400 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 via-transparent to-transparent rounded-bl-full pointer-events-none" />
            <div className="size-11 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-900 flex items-center justify-center shadow-xs border border-indigo-200/80 group-hover:scale-105 transition-transform shrink-0">
              <UploadCloud className="size-5 text-indigo-700" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <h4 className="font-serif text-sm font-bold text-stone-900 group-hover:text-indigo-950 transition-colors truncate">
                  Upload Media
                </h4>
                <div className="size-6 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center group-hover:bg-indigo-700 group-hover:text-white transition-colors shrink-0">
                  <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
              <p className="text-[11px] text-stone-500 truncate mt-0.5">
                Sanctum photos & videos
              </p>
            </div>
          </Link>

          {/* Action 4: Record Seva Donation */}
          <Link
            href="/admin/donations"
            className="group relative flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-stone-200/90 hover:border-emerald-500 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 via-transparent to-transparent rounded-bl-full pointer-events-none" />
            <div className="size-11 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-900 flex items-center justify-center shadow-xs border border-emerald-200/80 group-hover:scale-105 transition-transform shrink-0">
              <Coins className="size-5 text-emerald-700" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <h4 className="font-serif text-sm font-bold text-stone-900 group-hover:text-emerald-950 transition-colors truncate">
                  Record Seva Daan
                </h4>
                <div className="size-6 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors shrink-0">
                  <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
              <p className="text-[11px] text-stone-500 truncate mt-0.5">
                Counter receipt & 80G daan
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* 6 Stat Metric Cards - 3 Columns with generous width, clean typography, NO truncation */}
      <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* 1. Registered Devotees */}
        <Card className="p-5 rounded-2xl relative overflow-hidden border-stone-200/90 hover:border-amber-400 hover:shadow-md transition-all bg-gradient-to-br from-amber-50/40 via-white to-white">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-bold">
              Registered Devotees
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center text-lg shrink-0">
              <HiOutlineUserGroup />
            </div>
          </div>
          <div className="font-serif mt-2.5 text-3xl font-bold text-[#3C0F1A]">
            {allDevotees.length || s.summary.total_users || 0}
          </div>
          <div className="mt-3 pt-3 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
            <span>Verified devotee accounts</span>
            <Link href="/admin/users" className="text-amber-800 font-bold hover:underline inline-flex items-center gap-1">
              <span>View All</span>
              <HiOutlineArrowRight className="size-3" />
            </Link>
          </div>
        </Card>

        {/* 2. Total Seva Collections */}
        <Card className="p-5 rounded-2xl relative overflow-hidden border-stone-200/90 hover:border-amber-400 hover:shadow-md transition-all bg-gradient-to-br from-amber-50/40 via-white to-white">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-bold">
              Total Seva Collections
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center text-lg shrink-0">
              <HiOutlineGift />
            </div>
          </div>
          <div className="font-serif mt-2.5 text-3xl font-bold text-[#3C0F1A]">
            ₹{s.summary.total_revenue.toLocaleString("en-IN")}
          </div>
          <div className="mt-3 pt-3 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
            <span>{s.donations.length} records verified</span>
            <Link href="/admin/donations" className="text-amber-800 font-bold hover:underline inline-flex items-center gap-1">
              <span>View All</span>
              <HiOutlineArrowRight className="size-3" />
            </Link>
          </div>
        </Card>

        {/* 3. Online Puja Bookings */}
        <Card className="p-5 rounded-2xl relative overflow-hidden border-stone-200/90 hover:border-amber-400 hover:shadow-md transition-all bg-gradient-to-br from-orange-50/40 via-white to-white">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-bold">
              Online Puja Bookings
            </span>
            <div className="size-9 rounded-xl bg-orange-500/10 text-orange-700 flex items-center justify-center shrink-0">
              <Sparkles className="size-4.5" />
            </div>
          </div>
          <div className="font-serif mt-2.5 text-3xl font-bold text-[#3C0F1A]">
            {allBookings.length}
          </div>
          <div className="mt-3 pt-3 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">{confirmedCount} Paid</span>
              {failedCount > 0 && <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold text-[11px]">{failedCount} Failed</span>}
            </div>
            <Link href="/admin/users" className="text-amber-800 font-bold hover:underline inline-flex items-center gap-1">
              <span>Manage</span>
              <HiOutlineArrowRight className="size-3" />
            </Link>
          </div>
        </Card>

        {/* 4. Published Sevas & Rituals */}
        <Card className="p-5 rounded-2xl relative overflow-hidden border-stone-200/90 hover:border-amber-400 hover:shadow-md transition-all bg-gradient-to-br from-amber-50/20 via-white to-white">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-bold">
              Published Sevas & Rituals
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center text-lg shrink-0">
              <HiOutlineClock />
            </div>
          </div>
          <div className="font-serif mt-2.5 text-3xl font-bold text-[#3C0F1A]">
            {s.rituals.length}
          </div>
          <div className="mt-3 pt-3 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
            <span>Daily Aarti & Vedic Pujas</span>
            <Link href="/admin/rituals" className="text-amber-800 font-bold hover:underline inline-flex items-center gap-1">
              <span>Manage Sevas</span>
              <HiOutlineArrowRight className="size-3" />
            </Link>
          </div>
        </Card>

        {/* 5. Upcoming Utsavs */}
        <Card className="p-5 rounded-2xl relative overflow-hidden border-stone-200/90 hover:border-amber-400 hover:shadow-md transition-all bg-gradient-to-br from-amber-50/20 via-white to-white">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-bold">
              Upcoming Utsavs & Festivals
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center text-lg shrink-0">
              <HiOutlineCalendar />
            </div>
          </div>
          <div className="font-serif mt-2.5 text-3xl font-bold text-[#3C0F1A]">
            {s.events.length}
          </div>
          <div className="mt-3 pt-3 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
            <span>Next: {s.events[0]?.name || "None scheduled"}</span>
            <Link href="/admin/events" className="text-amber-800 font-bold hover:underline inline-flex items-center gap-1">
              <span>Schedule</span>
              <HiOutlineArrowRight className="size-3" />
            </Link>
          </div>
        </Card>

        {/* 6. Devotee Enquiries Inbox */}
        <Card className="p-5 rounded-2xl relative overflow-hidden border-stone-200/90 hover:border-amber-400 hover:shadow-md transition-all bg-gradient-to-br from-amber-50/20 via-white to-white">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-stone-500 font-bold">
              Devotee Enquiries Inbox
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center text-lg shrink-0">
              <HiOutlineMail />
            </div>
          </div>
          <div className="font-serif mt-2.5 text-3xl font-bold text-[#3C0F1A]">
            {s.messages.length}
          </div>
          <div className="mt-3 pt-3 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
            {unreadCount > 0 ? (
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold text-[11px]">{unreadCount} unread message{unreadCount === 1 ? "" : "s"}</span>
            ) : (
              <span>All enquiries attended</span>
            )}
            <Link href="/admin/messages" className="text-amber-800 font-bold hover:underline inline-flex items-center gap-1">
              <span>Open Inbox</span>
              <HiOutlineArrowRight className="size-3" />
            </Link>
          </div>
        </Card>
      </div>

      {/* Dedicated Card: Recent Online Puja Bookings */}
      <Card className="border-amber-300/80 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-100">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#3C0F1A] flex items-center gap-2 flex-wrap">
              <Sparkles className="size-4.5 text-amber-700" />
              <span>Recent Online Puja Bookings</span>
              <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                {allBookings.length} Total
              </span>
            </h3>
            <p className="text-xs text-stone-500">Real-time devotee puja registrations and gotra recitations</p>
          </div>
          <Link
            href="/admin/users"
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 shrink-0"
          >
            Manage All Bookings <HiOutlineArrowRight />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead>
              <tr className="border-b border-stone-200 text-[10px] uppercase tracking-wider text-stone-500 font-bold bg-stone-50">
                <th className="py-2.5 px-3">Ref ID</th>
                <th className="py-2.5 px-3">Devotee</th>
                <th className="py-2.5 px-3">Puja Seva</th>
                <th className="py-2.5 px-3">Gotra & Sankalpa</th>
                <th className="py-2.5 px-3">Slot Date</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {allBookings.slice(0, 5).map((b: any) => (
                <tr key={b.id} className="hover:bg-amber-50/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-amber-900">{b.bookingRef}</td>
                  <td className="py-2.5 px-3">
                    <strong className="text-stone-900 block">{b.userName}</strong>
                    <span className="text-[10px] text-stone-500 font-mono">{b.mobile}</span>
                  </td>
                  <td className="py-2.5 px-3 font-bold text-[#3C0F1A]">{b.pujaTitle}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-amber-800">Gotra: {b.gotra || "Kashyapa"}</span>
                    {b.sankalp && <span className="block text-[10px] text-stone-500 truncate max-w-[150px]">"{b.sankalp}"</span>}
                  </td>
                  <td className="py-2.5 px-3 text-stone-700 font-medium">{b.pujaSlotDate}</td>
                  <td className="py-2.5 px-3 font-serif font-bold text-amber-950">₹{b.amount}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-block ${
                      b.paymentStatus === "Completed"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : b.paymentStatus === "Paid & Confirmed"
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : b.paymentStatus === "Payment Failed" || b.paymentStatus?.toLowerCase().includes("fail")
                        ? "bg-rose-100 text-rose-800 border border-rose-300"
                        : "bg-blue-100 text-blue-900 border border-blue-300"
                    }`}>
                      {b.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {allBookings.length === 0 && (
            <div className="py-6 text-center text-xs text-stone-500">
              No online puja bookings recorded yet.
            </div>
          )}
        </div>
      </Card>

      {/* Main Grid: Recent Offerings + Daily Timings */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Devotee Seva */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#3C0F1A]">
                Recent Devotee Seva Offerings
              </h3>
              <p className="text-xs text-stone-500">Latest recorded online and offline contributions</p>
            </div>
            <Link
              href="/admin/donations"
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              View All <HiOutlineArrowRight />
            </Link>
          </div>

          <div className="divide-y divide-stone-100">
            {s.donations.slice(0, 5).map((d) => (
              <div key={d.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-amber-100 text-[#3C0F1A] font-serif font-bold text-sm flex items-center justify-center border border-amber-200">
                    {(d.name || "D").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">{d.name || "Anonymous Devotee"}</div>
                    <div className="text-[11px] text-stone-500">
                      {d.purpose || "General Seva"} • {d.date || "N/A"}
                    </div>
                  </div>
                </div>
                <div className="text-right font-serif font-bold text-sm text-[#3C0F1A]">
                  +₹{Number(d.amount || 0).toLocaleString("en-IN")}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Daily Puja Schedule */}
        <Card className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#3C0F1A]">
                Daily Puja Timings
              </h3>
              <p className="text-xs text-stone-500">Active schedule for devotees</p>
            </div>
            <Link
              href="/admin/rituals"
              className="text-xs font-semibold text-amber-700 hover:text-amber-800"
            >
              Manage
            </Link>
          </div>

          <div className="space-y-3">
            {s.rituals.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <HiOutlineClock className="text-amber-800 text-base shrink-0" />
                  <span className="font-mono font-bold text-stone-900">{r.time}</span>
                  <span className="text-stone-700 font-medium">{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recently Registered Devotees Section */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-100">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#3C0F1A]">
              Recently Registered Devotees
            </h3>
            <p className="text-xs text-stone-500">Devotees registered via WhatsApp / Mobile OTP on the temple portal</p>
          </div>
          <Link
            href="/admin/users"
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 shrink-0"
          >
            Manage All Devotees ({allDevotees.length}) <HiOutlineArrowRight />
          </Link>
        </div>

        {allDevotees.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allDevotees.slice(0, 4).map((u: any) => (
              <div
                key={u.id}
                className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/80 flex items-center gap-3 hover:shadow-xs transition-all"
              >
                <div className="size-10 rounded-xl bg-[#3C0F1A] text-amber-200 font-serif font-bold text-sm flex items-center justify-center border border-amber-300 shrink-0">
                  {((u.name || "Devotee").trim().charAt(0) || "D").toUpperCase()}
                </div>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <div>
                    <h5 className="font-bold text-xs text-stone-900 truncate">
                      {u.name && u.name.trim() ? u.name : "Devotee"}
                    </h5>
                  </div>
                  <p className="text-[11px] font-mono text-stone-500 truncate flex items-center gap-1">
                    <HiOutlinePhone className="size-3 text-amber-700 shrink-0" />
                    <span>{u.mobile || "-"}</span>
                  </p>
                  <p className="text-[10px] text-stone-400 truncate">
                    {u.city && u.city.trim() ? u.city : "-"} • {u.regDate || "-"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-stone-400">
            No registered devotees recorded yet.
          </div>
        )}
      </Card>
    </div>
  );
}
