import { API_BASE_URL } from "./api";

export interface ServerContent {
  rituals: any[];
  events: any[];
  testimonials: any[];
  gallery: any[];
}

async function getList(path: string): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/content/${path}`, {
      signal: AbortSignal.timeout(8000),
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const body = await res.json();
    if (body && typeof body === "object" && "data" in body) return Array.isArray(body.data) ? body.data : [];
    return [];
  } catch {
    return [];
  }
}

export async function getServerContent(): Promise<ServerContent> {
  const [rituals, events, testimonials, gallery] = await Promise.all([
    getList("rituals"),
    getList("events"),
    getList("testimonials"),
    getList("gallery"),
  ]);
  return { rituals, events, testimonials, gallery };
}