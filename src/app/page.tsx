'use client';

import React, { useState } from "react";
import dynamic from "next/dynamic";

// ── ABOVE THE FOLD: load eagerly ──────────────────────────────
import { NoticeTicker } from "@/components/NoticeTicker";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DeveloperShowcase } from "@/components/DeveloperShowcase";
import { InteractiveLoader } from "@/components/InteractiveLoader";
import { AnimatePresence } from "framer-motion";

// ── BELOW THE FOLD: lazy-load (split into separate JS chunks) ─
const TeachersSlideshow = dynamic(
  () => import("@/components/TeachersSlideshow").then(m => ({ default: m.TeachersSlideshow })),
  { ssr: false }
);
const HeadmasterMessage = dynamic(
  () => import("@/components/HeadmasterMessage").then(m => ({ default: m.HeadmasterMessage }))
);
const CampusSlideshow = dynamic(
  () => import("@/components/CampusSlideshow").then(m => ({ default: m.CampusSlideshow })),
  { ssr: false }
);
const DailyActivities = dynamic(
  () => import("@/components/DailyActivities").then(m => ({ default: m.DailyActivities })),
  { ssr: false }
);
const NoticeBoard = dynamic(
  () => import("@/components/NoticeBoard").then(m => ({ default: m.NoticeBoard }))
);
const GallerySection = dynamic(
  () => import("@/components/GallerySection").then(m => ({ default: m.GallerySection })),
  { ssr: false }
);
const TeachersSection = dynamic(
  () => import("@/components/TeachersSection").then(m => ({ default: m.TeachersSection })),
  { ssr: false }
);
const ContactSection = dynamic(
  () => import("@/components/ContactSection").then(m => ({ default: m.ContactSection }))
);
const Footer = dynamic(
  () => import("@/components/Footer").then(m => ({ default: m.Footer }))
);

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <InteractiveLoader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <main className="min-h-screen flex flex-col">
        <NoticeTicker />
        <Navbar />
        <Hero />
        <TeachersSlideshow />
        <HeadmasterMessage />
        <CampusSlideshow />
        <DailyActivities />
        <NoticeBoard />
        <GallerySection />
        <TeachersSection />
        <ContactSection />
        <Footer />
        <DeveloperShowcase />
      </main>
    </>
  );
}
