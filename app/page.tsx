'use client';
import HeroSection from "@/components/hero";
import { DailyProvider } from "@daily-co/daily-react"
export default function Home() {
  return (
    <DailyProvider>
      <HeroSection/>
    </DailyProvider>
  )
}
