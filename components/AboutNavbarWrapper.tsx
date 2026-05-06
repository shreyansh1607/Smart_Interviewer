"use client";
 
import { useEffect, useState } from "react";
import LandingNavbar from "@/components/landing/LandingNavbar";
 
export default function AboutNavbarWrapper({ currentUser }: { currentUser?: User | null }) {
  const [scrolled, setScrolled] = useState(false);
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  return <LandingNavbar scrolled={scrolled} currentUser={currentUser} />;
}