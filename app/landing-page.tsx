"use client";

import { useEffect, useState } from "react";
import { DM_Sans, Syne } from "next/font/google";

import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingHero from "@/components/landing/LandingHero";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingHowItWorks from "@/components/landing/LandingHowItWorks";
import LandingProductPreview from "@/components/landing/LandingProductPreview";
import LandingCommunity from "@/components/landing/LandingCommunity";
import LandingFooter from "@/components/landing/LandingFooter";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export default function LandingPage({ currentUser }: { currentUser: User | null }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className={`landing-page ${dmSans.variable} ${syne.variable}`}>
      <LandingNavbar scrolled={scrolled} currentUser={currentUser} />
      <LandingHero onWatchDemo={scrollToFeatures} />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingProductPreview />
      <LandingCommunity />
      <LandingFooter />
    </main>
  );
}
