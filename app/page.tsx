import TerminalHero from "@/components/TerminalHero";
import RecentSection from "@/components/RecentSection";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <TerminalHero />
      <RecentSection />
    </div>
  );
}
