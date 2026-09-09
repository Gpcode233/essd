import { prisma } from "@/lib/prisma";
import RegistrationsClient from "./registrations-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "School Registrations | ESSD Admin",
  description: "Review and manage secondary school registrations and debater squad rosters.",
};

export default async function AdminRegistrationsPage() {
  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full bg-essd-black text-essd-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <RegistrationsClient initialRegistrations={registrations as any} />
      </div>
    </div>
  );
}
