import { prisma } from "@/lib/prisma";
import PrizesEditor from "./prizes-editor";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Prize Settings | ESSD Admin",
  description: "Customize championship prize awards, international scholarships, and recognition perks.",
};

export default async function AdminPrizesPage() {
  const prizes = await prisma.prize.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="w-full bg-essd-black text-essd-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <PrizesEditor initialPrizes={prizes as any} />
      </div>
    </div>
  );
}
