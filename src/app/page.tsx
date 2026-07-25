'use client';

import React, { useState } from "react";
import { NoticeTicker } from "@/components/NoticeTicker";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HeadmasterMessage } from "@/components/HeadmasterMessage";
import { CampusSlideshow } from "@/components/CampusSlideshow";
import { DailyActivities } from "@/components/DailyActivities";
import { NoticeBoard } from "@/components/NoticeBoard";
import { GallerySection } from "@/components/GallerySection";
import { TeachersSection } from "@/components/TeachersSection";
import { TeachersSlideshow } from "@/components/TeachersSlideshow";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { InteractiveLoader } from "@/components/InteractiveLoader";
import { AnimatePresence } from "framer-motion";

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
      </main>
    </>
  );
}
