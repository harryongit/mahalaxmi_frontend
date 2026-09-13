import { HomeClient } from "@/src/components/temple/HomeClient";
import { getServerContent } from "@/src/lib/server-content";

export default async function Home() {
  const { testimonials } = await getServerContent();

  return <HomeClient initialTestimonials={testimonials} />;
}