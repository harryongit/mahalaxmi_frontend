"use client";

import Link from "next/link";
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
} from "react-icons/hi";

export default function AdminOverviewPage() {
  const { s } = useAdmin();
  const total = s.donations.reduce((a, d) => a + d.amount, 0);
  const unreadCount = s.messages.filter((m) => !m.read).length;

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

      {/* 4 Stat Metric Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
            ₹{total.toLocaleString("en-IN")}
          </div>
          <div className="mt-2 text-xs text-stone-500 flex items-center justify-between">
            <span>{s.donations.length} records verified</span>
            <Link href="/admin/donations" className="text-amber-700 font-semibold hover:underline">
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
            {s.donations.map((d) => (
              <div key={d.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-amber-100 text-[#3C0F1A] font-serif font-bold text-sm flex items-center justify-center border border-amber-200">
                    {d.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">{d.name}</div>
                    <div className="text-[11px] text-stone-500">
                      {d.purpose} • {d.date}
                    </div>
                  </div>
                </div>
                <div className="text-right font-serif font-bold text-sm text-[#3C0F1A]">
                  +₹{d.amount.toLocaleString("en-IN")}
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
    </div>
  );
}
