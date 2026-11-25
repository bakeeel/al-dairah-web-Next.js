"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import Preloader from "@/components/Preloader";
import { CustomCursor, ScrollProgress } from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HeroSection";
import StatsBar from "@/sections/StatsBar";
import AboutSection from "@/sections/AboutSection";
import ServicesSection from "@/sections/ServicesSection";
import HowWeWork from "@/sections/HowWeWork";
import FleetSection from "@/sections/FleetSection";
import SafetySection from "@/sections/SafetySection";
import CoverageMap from "@/sections/CoverageMap";
import QuoteCalculator from "@/sections/QuoteCalculator";
import { WhyUsAndFaq } from "@/sections/WhyUsAndFaq";
import { ContactSection } from "@/sections/ContactSection";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <HeroSection />
      <StatsBar />
      <AboutSection />
      <ServicesSection />
      <HowWeWork />
      <FleetSection />
      <SafetySection />
      <CoverageMap />
      <QuoteCalculator />
      <WhyUsAndFaq />
      <ContactSection />

      <FloatingWhatsApp />
      <Footer />
    </main>
  );
}