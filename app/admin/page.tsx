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
} from "react-icons/hi";

export default function AdminOverviewPage() {
  const { s } = useAdmin();
  const total = s.donations.reduce((a, d) => a + d.amount, 0);
  const unreadCount = s.messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-8">
      <Head
        title="Temple Operations Overview"
        sub={`Real-time dashboard for ${s.settings.templeName}.`}
      />

      {/* 4 Stat Metric Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
              Total Seva Collections
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg">
              <HiOutlineGift />
            </div>
          </div>
          <div className="font-serif mt-3 text-3xl font-bold text-[#3B1210]">
            ₹{total.toLocaleString("en-IN")}
          </div>
          <div className="mt-2 text-xs text-stone-500 flex items-center justify-between">
            <span>{s.donations.length} records verified</span>
            <Link href="/admin/donations" className="text-amber-600 font-semibold hover:underline">
              View →
            </Link>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
              Gallery Media
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg">
              <HiOutlinePhotograph />
            </div>
          </div>
          <div className="font-serif mt-3 text-3xl font-bold text-[#3B1210]">
            {s.gallery.length} Photos
          </div>
          <div className="mt-2 text-xs text-stone-500 flex items-center justify-between">
            <span>Public gallery archive</span>
            <Link href="/admin/gallery" className="text-amber-600 font-semibold hover:underline">
              Manage →
            </Link>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
              Upcoming Utsavs
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg">
              <HiOutlineCalendar />
            </div>
          </div>
          <div className="font-serif mt-3 text-3xl font-bold text-[#3B1210]">
            {s.events.length} Festivals
          </div>
          <div className="mt-2 text-xs text-stone-500 flex items-center justify-between">
            <span>Next: {s.events[0]?.name || "N/A"}</span>
            <Link href="/admin/events" className="text-amber-600 font-semibold hover:underline">
              Schedule →
            </Link>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
              Enquiries Inbox
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg">
              <HiOutlineMail />
            </div>
          </div>
          <div className="font-serif mt-3 text-3xl font-bold text-[#3B1210]">
            {s.messages.length} Messages
          </div>
          <div className="mt-2 text-xs text-stone-500 flex items-center justify-between">
            <span className="text-rose-600 font-semibold">{unreadCount} unread</span>
            <Link href="/admin/messages" className="text-amber-600 font-semibold hover:underline">
              Open →
            </Link>
          </div>
        </Card>
      </div>

      {/* Main Grid: Recent Donations + Daily Timings */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Devotee Seva */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#3B1210]">
                Recent Devotee Offerings
              </h3>
              <p className="text-xs text-stone-400">Latest recorded seva contributions</p>
            </div>
            <Link
              href="/admin/donations"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              View All <HiOutlineArrowRight />
            </Link>
          </div>

          <div className="divide-y divide-stone-100">
            {s.donations.map((d) => (
              <div key={d.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-amber-100 text-[#3B1210] font-serif font-bold text-sm flex items-center justify-center">
                    {d.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-800">{d.name}</div>
                    <div className="text-[11px] text-stone-400">
                      {d.purpose} • {d.date}
                    </div>
                  </div>
                </div>
                <div className="text-right font-serif font-bold text-sm text-[#3B1210]">
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
              <h3 className="font-serif text-lg font-bold text-[#3B1210]">
                Daily Puja Timings
              </h3>
              <p className="text-xs text-stone-400">Schedule published for devotees</p>
            </div>
            <Link
              href="/admin/rituals"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700"
            >
              Edit
            </Link>
          </div>

          <div className="space-y-3">
            {s.rituals.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <HiOutlineClock className="text-amber-600 text-base" />
                  <span className="font-mono font-bold text-stone-800">{r.time}</span>
                  <span className="text-stone-600 font-medium">{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
