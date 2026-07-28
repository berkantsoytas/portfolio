import TerminalHero from "@/components/TerminalHero";
import RecentSection from "@/components/RecentSection";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col gap-16">
        <TerminalHero />
        <RecentSection />
      </div>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
