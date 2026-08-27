"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { API_BASE_URL } from "@/src/lib/api";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return; // Don't track admin panel visits

    fetch(`${API_BASE_URL}/analytics/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: pathname }),
    }).catch(err => console.error("Analytics tracking failed", err));
  }, [pathname]);

  return null;
}
