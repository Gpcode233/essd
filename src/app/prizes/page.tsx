import { prisma } from "@/lib/prisma";
import PrizeShowcase from "@/components/prize-showcase";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Prizes & Scholarships | ESSD 2026",
  description: "Explore the championship trophies, international scholarship opportunities, and cash rewards for ESSD 2026.",
};

export default async function PrizesPage() {
  const prizes = await prisma.prize.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="w-full bg-essd-black text-essd-cream min-h-screen">
      {/* Banner */}
      <section className="relative halftone-bg py-12 sm:py-16 border-b-4 border-essd-black text-essd-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-essd-black text-essd-gold font-mono text-xs font-black uppercase px-3 py-1 border-2 border-essd-cream shadow-[3px_3px_0px_#0A0A0C] mb-3">
              Championship Accolades
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight text-essd-black leading-none text-shadow-hard">
              CHAMPIONSHIP <br />
              <span className="text-essd-orange bg-essd-black px-3 py-1 inline-block mt-1 border-3 border-essd-cream">
                PRIZES &amp; AWARDS
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base font-bold text-essd-black/90 font-sans">
              Rewarding oratorical brilliance, critical thought, and academic excellence with prestigious global opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Main Prize Showcase */}
      <PrizeShowcase prizes={prizes as any} />

      {/* Call to action */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="p-8 bg-essd-charcoal border-4 border-essd-gold shadow-[8px_8px_0px_#0A0A0C]">
          <h3 className="text-2xl sm:text-3xl font-black font-display uppercase text-essd-gold">
            Compete for the 2026 State Crown
          </h3>
          <p className="text-xs sm:text-sm text-essd-cream-muted mt-2 max-w-xl mx-auto font-sans">
            School registrations are officially open. Ensure your secondary school enters its delegation before the registration cutoff.
          </p>
          <div className="pt-6">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-essd-gold text-essd-black font-display font-black text-sm uppercase tracking-wider border-2 border-essd-cream shadow-[4px_4px_0px_#0A0A0C] hover:bg-essd-orange hover:text-white transition-all"
            >
              <Sparkles className="w-4 h-4 mr-2 fill-current" />
              Register Your School Today
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
