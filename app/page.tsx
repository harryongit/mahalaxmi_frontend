"use client";

import { useState } from "react";
import { useLenis } from "@/src/lib/use-lenis";
import { Loader } from "@/src/components/temple/Loader";
import { Navbar } from "@/src/components/temple/Navbar";
import { Hero } from "@/src/components/temple/Hero";
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
} from "@/src/components/temple/Sections";
import { GalleryBento } from "@/src/components/temple/GalleryBento";
import { UtsavBanner } from "@/src/components/temple/UtsavBanner";
import { Footer } from "@/src/components/temple/Footer";

export default function Home() {
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
        <GalleryBento />
        <Festivals />
        <UtsavBanner />
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
