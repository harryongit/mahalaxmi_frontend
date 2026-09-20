import { FestivalsClient } from "@/src/components/temple/FestivalsClient";
import { getServerContent } from "@/src/lib/server-content";
import { JsonLd } from "@/src/components/JsonLd";
import { SITE_URL, TEMPLE_ADDRESS } from "@/src/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Festivals of Karveer Nivasini Ambabai Temple Kolhapur",
  description:
    "Explore the major festivals celebrated at Shree Karveer Niwasini Ambabai Mahalaxmi Kolhapur, including Kirnotsav, Navratri, Rathotsav, and Deepotsav.",
};

export default async function FestivalsPage() {
  const { events } = await getServerContent();
  
  const eventSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Sharadiya Navratri Utsav",
      startDate: "2026-09-22",
      endDate: "2026-10-02",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: "Shree Karveer Niwasini Ambabai Mahalaxmi Temple",
        address: TEMPLE_ADDRESS,
      },
      description: "Nine sacred nights honoring Goddess Mahalaxmi in Her 9 auspicious Alankar forms.",
    },
    {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Kirnotsav (Sun Rays Festival)",
      startDate: "2026-11-09",
      endDate: "2026-11-11",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: "Shree Karveer Niwasini Ambabai Mahalaxmi Temple",
        address: TEMPLE_ADDRESS,
      },
      description: "Kirnotsav is a rare natural miracle where setting sun rays fall on Goddess Ambabai.",
    }
  ];

  return (
    <>
      <JsonLd data={eventSchemas} />
      <FestivalsClient initialEvents={events} />
    </>
  );
}