import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLenis } from "@/lib/use-lenis";
import { Loader } from "@/components/temple/Loader";
import { Navbar } from "@/components/temple/Navbar";
import { Hero } from "@/components/temple/Hero";
import {
  About,
  History,
  Architecture,
  Rituals,
  Festivals,
  VirtualDarshan,
  Donate,
  Events,
  Testimonials,
  Location,
} from "@/components/temple/Sections";
import { GalleryBento } from "@/components/temple/GalleryBento";
import { UtsavBanner } from "@/components/temple/UtsavBanner";
import { Footer } from "@/components/temple/Footer";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shri Mandir — A Sacred Journey of Devotion" },
      {
        name: "description",
        content:
          "Step into a centuries-old sanctuary. Explore the history, architecture, rituals, festivals and live darshan of Shri Mandir.",
      },
      { property: "og:title", content: "Shri Mandir — A Sacred Journey of Devotion" },
      { property: "og:description", content: "A cinematic, immersive online experience of an ancient temple." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);
  useLenis();
  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      <main className={`relative ${loaded ? "" : "overflow-hidden h-screen"}`}>
        <Navbar />
        <Hero />
        <About />
        <History />
        <Architecture />
        <Rituals />
        <Gallery />
        <Festivals />
        <VirtualDarshan />
        <Donate />
        <Events />
        <Testimonials />
        <Location />
        <Footer />
      </main>
    </>
  );
}
