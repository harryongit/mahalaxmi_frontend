"use client";

import { useState } from "react";
import { useLenis } from "@/src/lib/use-lenis";
import { Loader } from "@/src/components/temple/Loader";
import { Navbar } from "@/src/components/temple/Navbar";
import { Hero } from "@/src/components/temple/Hero";
import {
  VirtualDarshan,
  Donate,
  Testimonials,
} from "@/src/components/temple/Sections";
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
        <VirtualDarshan />
        <Donate />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}
