import React from "react";

export function Skeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse bg-stone-200/80 rounded-xl ${className}`}
      {...props}
    />
  );
}

export function DarkSkeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse bg-white/10 rounded-xl ${className}`}
      {...props}
    />
  );
}

/**
 * PujaCardSkeleton: 1-to-1 match for the sacred Puja/Seva card in BookingWidget.
 */
export function PujaCardSkeleton() {
  return (
    <div className="rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-2xs flex flex-col justify-between h-[440px] animate-pulse">
      {/* Image Banner */}
      <div className="h-48 sm:h-52 w-full bg-stone-200 relative">
        <div className="absolute top-3.5 left-3.5 h-5 w-20 rounded-full bg-stone-300" />
        <div className="absolute bottom-3 left-3 h-5 w-28 rounded-lg bg-stone-300" />
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="h-6 w-3/4 rounded-lg bg-stone-200" />
          <div className="h-3.5 w-full rounded bg-stone-100" />
          <div className="h-3.5 w-5/6 rounded bg-stone-100" />
        </div>

        {/* Price & Action Row */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-3 w-14 rounded bg-stone-100" />
            <div className="h-6 w-20 rounded-lg bg-stone-200" />
          </div>
          <div className="h-10 w-28 rounded-xl bg-amber-200/70" />
        </div>
      </div>
    </div>
  );
}

/**
 * FestivalCardSkeleton: 1-to-1 match for major festival cards in FestivalsClient.
 */
export function FestivalCardSkeleton() {
  return (
    <div className="rounded-3xl border-2 border-amber-200/90 bg-white overflow-hidden shadow-lg flex flex-col justify-between h-[520px] animate-pulse">
      {/* Banner */}
      <div className="h-60 w-full bg-stone-200 relative">
        <div className="absolute top-4 left-4 h-6 w-28 rounded-full bg-amber-200/80" />
        <div className="absolute bottom-4 left-4 h-7 w-44 rounded-xl bg-stone-300" />
      </div>

      {/* Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="h-7 w-3/4 rounded-lg bg-stone-200" />
          <div className="h-4 w-full rounded bg-stone-100" />
          <div className="h-4 w-5/6 rounded bg-stone-100" />

          {/* Highlights */}
          <div className="space-y-2 pt-2">
            <div className="h-3.5 w-4/5 rounded bg-amber-100/70" />
            <div className="h-3.5 w-3/4 rounded bg-amber-100/70" />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-amber-100">
          <div className="h-11 w-full rounded-2xl bg-amber-200/80" />
        </div>
      </div>
    </div>
  );
}

/**
 * RitualCardSkeleton: 1-to-1 match for daily rituals in Sections.tsx.
 */
export function RitualCardSkeleton() {
  return (
    <div className="h-full rounded-2xl p-6 bg-white/70 backdrop-blur border border-amber-200/60 shadow-2xs space-y-4 animate-pulse">
      <div className="size-12 rounded-full bg-amber-200/60" />
      <div className="h-3 w-20 rounded bg-amber-300/60 mt-3" />
      <div className="h-6 w-3/4 rounded-md bg-stone-300/70" />
      <div className="space-y-1.5 pt-1">
        <div className="h-3.5 w-full rounded bg-stone-200/60" />
        <div className="h-3.5 w-4/5 rounded bg-stone-200/60" />
      </div>
    </div>
  );
}

/**
 * GalleryCardSkeleton: 1-to-1 match for media grid in GalleryBento & Sections.
 */
export function GalleryCardSkeleton() {
  return (
    <div className="h-64 sm:h-72 rounded-3xl border-2 border-amber-200/80 bg-stone-200/80 overflow-hidden relative animate-pulse shadow-md">
      <div className="absolute top-4 left-4 h-5 w-16 rounded-full bg-stone-300/80" />
      <div className="absolute bottom-4 left-4 right-4 h-5 w-2/3 rounded-lg bg-stone-300/80" />
    </div>
  );
}

/**
 * DarkCardSkeleton: 1-to-1 match for dark sections (PujaServices / Festivals in Sections.tsx).
 */
export function DarkCardSkeleton() {
  return (
    <div className="h-full rounded-2xl glass-dark p-7 border border-white/10 space-y-5 animate-pulse">
      <div className="flex justify-between items-center pb-4 border-b border-white/10">
        <div className="h-6 w-1/2 rounded-lg bg-white/15" />
        <div className="h-6 w-20 rounded-lg bg-white/15" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-white/10" />
        <div className="h-4 w-4/5 rounded bg-white/10" />
      </div>
      <div className="space-y-2 pt-3">
        <div className="h-3.5 w-2/3 rounded bg-white/10" />
        <div className="h-3.5 w-3/4 rounded bg-white/10" />
      </div>
      <div className="h-10 w-full rounded-xl bg-white/15 mt-4" />
    </div>
  );
}

/**
 * BookingCardSkeleton: 1-to-1 match for devotee bookings in app/bookings/page.tsx.
 */
export function BookingCardSkeleton() {
  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm animate-pulse">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="h-5 w-24 rounded-full bg-stone-200" />
          <div className="h-5 w-32 rounded-lg bg-stone-200" />
        </div>
        <div className="h-6 w-20 rounded-md bg-stone-200" />
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <div className="h-3 w-16 rounded bg-stone-100" />
          <div className="h-5 w-36 rounded bg-stone-200" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3 w-16 rounded bg-stone-100" />
          <div className="h-5 w-28 rounded bg-stone-200" />
        </div>
        <div className="space-y-1.5 sm:text-right">
          <div className="h-3 w-16 rounded bg-stone-100 sm:ml-auto" />
          <div className="h-6 w-20 rounded bg-amber-200 sm:ml-auto" />
        </div>
      </div>
    </div>
  );
}

/**
 * PujaDetailSkeleton: 1-to-1 match for app/puja/[id]/page.tsx.
 */
export function PujaDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-pulse space-y-8">
      {/* Breadcrumb & Title */}
      <div className="space-y-3">
        <div className="h-4 w-48 rounded bg-stone-200" />
        <div className="h-10 w-2/3 rounded-xl bg-stone-300" />
        <div className="h-4 w-1/2 rounded bg-stone-200" />
      </div>

      {/* 2-Column Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="h-80 w-full rounded-3xl bg-stone-200" />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-9 w-20 rounded-xl bg-stone-200" />
            ))}
          </div>
          <div className="space-y-3 pt-2">
            <div className="h-4 w-full rounded bg-stone-100" />
            <div className="h-4 w-5/6 rounded bg-stone-100" />
            <div className="h-4 w-4/6 rounded bg-stone-100" />
          </div>
        </div>

        {/* Right Sticky Sidebar */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 space-y-4 shadow-sm">
            <div className="h-6 w-1/2 rounded-lg bg-stone-200" />
            <div className="h-10 w-32 rounded-xl bg-amber-200" />
            <div className="h-12 w-full rounded-xl bg-stone-100" />
            <div className="h-12 w-full rounded-xl bg-amber-800/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

