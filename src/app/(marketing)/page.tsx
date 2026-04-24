import type { Metadata } from "next";

import { BusinessTypes } from "@/components/landing/BusinessTypes";
import { Features } from "@/components/landing/Features";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Marquee } from "@/components/landing/Marquee";
import { Pricing } from "@/components/landing/Pricing";
import { Problem } from "@/components/landing/Problem";
import { ROICalculator } from "@/components/landing/ROICalculator";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://kashoai.com",
    languages: { "es-CO": "https://kashoai.com" },
  },
  openGraph: {
    images: [
      {
        url: "https://kashoai.com/og?plan=Pro&monto=3800000",
        width: 1200,
        height: 630,
        alt: "Kasho — Esta semana recuperaste $3.800.000 en leads que ibas a perder.",
      },
    ],
  },
};

export default function HomePage(): React.ReactElement {
  return (
    <main>
      <Hero />
      <Marquee />
      <BusinessTypes />
      <Problem />
      <HowItWorks />
      <ROICalculator />
      <Features />
      <Pricing />
      <FinalCTA />
    </main>
  );
}
