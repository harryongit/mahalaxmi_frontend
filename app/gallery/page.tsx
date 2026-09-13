import { Navbar } from "@/src/components/temple/Navbar";
import { GalleryBento } from "@/src/components/temple/GalleryBento";
import { Footer } from "@/src/components/temple/Footer";
import { PageHero } from "@/src/components/temple/PageHero";
import { SmoothScroll } from "@/src/components/temple/SmoothScroll";
import { getServerContent } from "@/src/lib/server-content";

export default async function GalleryPage() {
  const { gallery } = await getServerContent();

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-stone-900">
      <SmoothScroll />
      <Navbar />

      <PageHero
        breadcrumb="Photo Gallery"
        badge="1000+ Photo Archive"
        title="Sacred Photo"
        titleGold="Gallery"
        description="Explore visual moments of grace, ancient stone carvings, sunrise Kirnotsav, and night festival lamps captured at Shri Ambabai Temple."
      />

      <main className="flex-1">
        <GalleryBento initialData={gallery} />
      </main>

      <Footer />
    </div>
  );
}