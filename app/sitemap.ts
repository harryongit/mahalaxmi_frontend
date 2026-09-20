import type { MetadataRoute } from "next";
import { SITE_URL } from "@/src/lib/seo";

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/rituals", changeFrequency: "weekly", priority: 0.8 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.5 },
  { path: "/festivals", changeFrequency: "weekly", priority: 0.9 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/darshan-timings", changeFrequency: "weekly", priority: 0.9 },
  { path: "/temple-history", changeFrequency: "monthly", priority: 0.6 },
  { path: "/how-to-reach", changeFrequency: "monthly", priority: 0.7 },
  { path: "/online-puja", changeFrequency: "weekly", priority: 0.9 },
  { path: "/prasadam", changeFrequency: "monthly", priority: 0.6 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { path: "/shree-ambabai-temple-kolhapur", changeFrequency: "monthly", priority: 0.9 },
  { path: "/navratri", changeFrequency: "yearly", priority: 0.8 },
  { path: "/temples-in-kolhapur", changeFrequency: "monthly", priority: 0.7 },
  { path: "/donate", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/delete-account", changeFrequency: "yearly", priority: 0.2 },
  { path: "/accommodation", changeFrequency: "monthly", priority: 0.7 },
  { path: "/parking", changeFrequency: "yearly", priority: 0.7 },
  { path: "/nearby-attractions", changeFrequency: "monthly", priority: 0.8 },
  { path: "/vip-darshan", changeFrequency: "monthly", priority: 0.9 },
  { path: "/mantras", changeFrequency: "monthly", priority: 0.8 },
  { path: "/108-names", changeFrequency: "monthly", priority: 0.8 },
  { path: "/panchang", changeFrequency: "daily", priority: 0.9 },
  { path: "/kundli", changeFrequency: "weekly", priority: 0.8 },
];

const PUJA_SLUGS = [
  "s1",
  "s2",
  "s3",
  "s4",
  "s5",
  "s6",
  "c1",
  "c2",
  "c3",
  "n1",
  "n2",
  "n3",
  "o1",
  "o2",
  "o3",
  "d1",
  "d2",
  "e1",
  "e2",
  "e3",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const pujaEntries = PUJA_SLUGS.map((slug) => ({
    url: `${SITE_URL}/puja/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...pujaEntries];
}