import { getSafeMatches, getSafeSchools } from "@/lib/data-service";
import FixturesManager from "./fixtures-manager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Fixtures & Live Scorekeeper | ESSD Admin",
  description: "Live score entry, winner selection, and automatic knockout bracket advancement.",
};

export default async function AdminFixturesPage() {
  const [matches, schools] = await Promise.all([
    getSafeMatches(),
    getSafeSchools(),
  ]);

  return (
    <div className="w-full bg-essd-black text-essd-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <FixturesManager initialMatches={matches} schools={schools} />
      </div>
    </div>
  );
}
