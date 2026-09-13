import { FestivalsClient } from "@/src/components/temple/FestivalsClient";
import { getServerContent } from "@/src/lib/server-content";

export default async function FestivalsPage() {
  const { events } = await getServerContent();

  return <FestivalsClient initialEvents={events} />;
}