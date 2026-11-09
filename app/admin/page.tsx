"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { adminBookingApi } from "@/src/lib/api";
import { useAdmin } from "./admin-context";
import { Head, Card } from "./admin-ui";
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

  return (
    <div className="space-y-8 font-sans">
      <Head
        title="Temple Operations & Management Dashboard"
        sub={`Official Sansthan management portal for ${s.settings.templeName}.`}
      />

      {/* Quick Action Shortcuts Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mr-2">
          Quick Operations:
        </span>
        
        <Link
          href="/admin/rituals"
          className="py-2 px-4 rounded-xl bg-[#3C0F1A] text-white font-bold text-xs shadow-sm hover:opacity-95 flex items-center gap-1.5 border border-amber-400/30"
        >
          <HiOutlinePlus className="text-sm stroke-[3]" />
          <span>+ Add New Puja Seva</span>
        </Link>

        <Link
          href="/admin/events"
          className="py-2 px-4 rounded-xl bg-amber-100 text-amber-950 font-bold text-xs border border-amber-300 hover:bg-amber-200 flex items-center gap-1.5"
        >
          <HiOutlinePlus className="text-sm stroke-[3]" />
          <span>+ Schedule Utsav Event</span>
        </Link>

        <Link
          href="/admin/gallery"
          className="py-2 px-4 rounded-xl bg-stone-100 text-stone-800 font-bold text-xs border border-stone-300 hover:bg-stone-200 flex items-center gap-1.5"
        >
          <HiOutlinePlus className="text-sm stroke-[3]" />
          <span>+ Upload Gallery Photo</span>
        </Link>

        <Link
          href="/admin/donations"
          className="py-2 px-4 rounded-xl bg-stone-100 text-stone-800 font-bold text-xs border border-stone-300 hover:bg-stone-200 flex items-center gap-1.5"
        >
          <HiOutlinePlus className="text-sm stroke-[3]" />
          <span>+ Record Seva Donation</span>
        </Link>
      </div>

      {/* 5 Stat Metric Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="relative overflow-hidden border-amber-200 hover:border-amber-400 transition-all bg-gradient-to-br from-amber-50/50 to-orange-50/30">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
              Registered Devotees
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg">
              <HiOutlineUserGroup />
            </div>
          </div>
          <div className="font-serif mt-3 text-3xl font-bold text-[#3C0F1A]">
            {s.summary.total_users || s.users?.length || 0}
          </div>
          <div className="mt-2 text-xs text-stone-500 flex items-center justify-between">
            <span>Verified accounts</span>
            <Link href="/admin/users" className="text-amber-700 font-semibold hover:underline">
              View All →
            </Link>
          </div>
        </Card>

        <Card className="relative overflow-hidden border-amber-200 hover:border-amber-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
              Total Seva Collections
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg">
              <HiOutlineGift />
            </div>
          </div>
          <div className="font-serif mt-3 text-3xl font-bold text-[#3C0F1A]">
            ₹{s.summary.total_revenue.toLocaleString("en-IN")}
          </div>
          <div className="mt-2 text-xs text-stone-500 flex items-center justify-between">
            <span>{s.donations.length} records verified</span>
            <Link href="/admin/donations" className="text-amber-700 font-semibold hover:underline">
              View All →
            </Link>
          </div>
        </Card>

        <Card className="relative overflow-hidden border-amber-200 hover:border-amber-400 transition-all bg-gradient-to-br from-orange-50/50 to-amber-50/40">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
              Online Puja Bookings
            </span>
            <div className="size-9 rounded-xl bg-orange-500/10 text-orange-700 flex items-center justify-center text-lg font-bold">
              🕉️
            </div>
          </div>
          <div className="font-serif mt-3 text-3xl font-bold text-[#3C0F1A]">
            {allBookings.length}
          </div>
          <div className="mt-2 text-xs text-stone-500 flex items-center justify-between">
            <span className="text-emerald-700 font-bold">{confirmedCount} Paid</span>
            {failedCount > 0 && <span className="text-rose-600 font-bold">{failedCount} Failed</span>}
            <Link href="/admin/users" className="text-amber-700 font-semibold hover:underline">
              View All →
            </Link>
          </div>
        </Card>

        <Card className="relative overflow-hidden border-amber-200 hover:border-amber-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
              Published Sevas & Rituals
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg">
              <HiOutlineClock />
            </div>
          </div>
          <div className="font-serif mt-3 text-3xl font-bold text-[#3C0F1A]">
            {s.rituals.length} Sevas
          </div>
          <div className="mt-2 text-xs text-stone-500 flex items-center justify-between">
            <span>Daily Aarti & Pujas</span>
            <Link href="/admin/rituals" className="text-amber-700 font-semibold hover:underline">
              Manage →
            </Link>
          </div>
        </Card>

        <Card className="relative overflow-hidden border-amber-200 hover:border-amber-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
              Upcoming Utsavs
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg">
              <HiOutlineCalendar />
            </div>
          </div>
          <div className="font-serif mt-3 text-3xl font-bold text-[#3C0F1A]">
            {s.events.length} Festivals
          </div>
          <div className="mt-2 text-xs text-stone-500 flex items-center justify-between">
            <span>Next: {s.events[0]?.name || "N/A"}</span>
            <Link href="/admin/events" className="text-amber-700 font-semibold hover:underline">
              Schedule →
            </Link>
          </div>
        </Card>

        <Card className="relative overflow-hidden border-amber-200 hover:border-amber-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
              Devotee Enquiries Inbox
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg">
              <HiOutlineMail />
            </div>
          </div>
          <div className="font-serif mt-3 text-3xl font-bold text-[#3C0F1A]">
            {s.messages.length} Messages
          </div>
          <div className="mt-2 text-xs text-stone-500 flex items-center justify-between">
            <span className="text-rose-600 font-semibold">{unreadCount} unread</span>
            <Link href="/admin/messages" className="text-amber-700 font-semibold hover:underline">
              Open Inbox →
            </Link>
          </div>
        </Card>
      </div>

      {/* Dedicated Card: Recent Online Puja Bookings */}
      <Card className="border-amber-300/80 shadow-md">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#3C0F1A] flex items-center gap-2">
              <span>🕉️ Recent Online Puja Bookings</span>
              <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                {allBookings.length} Total
              </span>
            </h3>
            <p className="text-xs text-stone-500">Real-time devotee puja registrations and gotra recitations</p>
          </div>
          <Link
            href="/admin/users"
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
          >
            Manage All Bookings <HiOutlineArrowRight />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
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
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#3C0F1A]">
              Recently Registered Devotees
            </h3>
            <p className="text-xs text-stone-500">Devotees registered via WhatsApp / Mobile OTP on the temple portal</p>
          </div>
          <Link
            href="/admin/users"
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
          >
            Manage All Devotees ({s.users?.length || 0}) <HiOutlineArrowRight />
          </Link>
        </div>

        {s.users && s.users.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {s.users.slice(0, 4).map((u) => (
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
