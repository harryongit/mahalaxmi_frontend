import { HomeClient } from "@/src/components/temple/HomeClient";
import { getServerContent } from "@/src/lib/server-content";

export default async function Home() {
  const { testimonials, gallery } = await getServerContent();

  return <HomeClient initialTestimonials={testimonials} initialGallery={gallery} />;
}