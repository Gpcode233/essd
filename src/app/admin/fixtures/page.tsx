import { prisma } from "@/lib/prisma";
import FixturesManager from "./fixtures-manager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Fixtures & Live Scorekeeper | ESSD Admin",
  description: "Live score entry, winner selection, and automatic knockout bracket advancement.",
};

export default async function AdminFixturesPage() {
  const [matches, schools] = await Promise.all([
    prisma.match.findMany({
      include: {
        schoolA: true,
        schoolB: true,
        winner: true,
      },
      orderBy: { matchNumber: "asc" },
    }),
    prisma.school.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="w-full bg-essd-black text-essd-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <FixturesManager initialMatches={matches as any} schools={schools as any} />
      </div>
    </div>
  );
}
