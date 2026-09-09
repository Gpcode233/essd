import { getSafeMatches, getSafeSchools } from "@/lib/data-service";
import FixturesClient from "./fixtures-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Match Fixtures & Live Results | ESSD 2026",
  description: "Explore all 15 debate match fixtures, timings, motions, venues, and live results for the ESSD 2026 championship.",
};

export default async function FixturesPage() {
  const matches = await getSafeMatches();
  const schools = await getSafeSchools();

  return (
    <div className="w-full bg-essd-black text-essd-cream min-h-screen">
      
      {/* Banner */}
      <section className="relative halftone-bg py-12 sm:py-16 border-b-4 border-essd-black text-essd-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-essd-black text-essd-gold font-mono text-xs font-black uppercase px-3 py-1 border-2 border-essd-cream shadow-[3px_3px_0px_#0A0A0C] mb-3">
              Official Schedule &amp; Results
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight text-essd-black leading-none text-shadow-hard">
              MATCH FIXTURES <br />
              <span className="text-essd-orange bg-essd-black px-3 py-1 inline-block mt-1 border-3 border-essd-cream">
                &amp; LIVE SCORES
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base font-bold text-essd-black/90 font-sans">
              Filter by tournament stage, date, participating school, or match status.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Fixtures Filter & Card List */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FixturesClient initialMatches={matches} schools={schools} />
      </section>

    </div>
  );
}
