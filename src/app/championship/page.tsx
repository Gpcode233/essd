import { prisma } from "@/lib/prisma";
import TournamentBracket from "@/components/tournament-bracket";
import Link from "next/link";
import { Trophy, Sparkles, Flame, Shield, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tournament Hub | ESSD 2026 Knockout Championship",
  description: "Follow the 16-school knockout tournament bracket, live match scores, and championship progression.",
};

export default async function ChampionshipPage() {
  const matches = await prisma.match.findMany({
    include: {
      schoolA: true,
      schoolB: true,
      winner: true,
    },
    orderBy: {
      matchNumber: "asc",
    },
  });

  const liveMatches = matches.filter((m) => m.status === "LIVE");
  const upcomingMatches = matches.filter((m) => m.status === "UPCOMING");
  const completedMatches = matches.filter((m) => m.status === "FINAL" || m.status === "COMPLETED");

  return (
    <div className="w-full bg-essd-black text-essd-cream min-h-screen">
      
      {/* Header Banner */}
      <section className="relative halftone-bg py-12 sm:py-16 border-b-4 border-essd-black text-essd-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-essd-black text-essd-gold px-3 py-1 font-mono text-xs font-black uppercase border-2 border-essd-cream shadow-[3px_3px_0px_#0A0A0C] mb-3">
                <Trophy className="w-3.5 h-3.5" />
                Knockout Tournament Central
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight text-essd-black leading-none text-shadow-hard">
                CHAMPIONSHIP <br />
                <span className="text-essd-orange bg-essd-black px-3 py-1 inline-block mt-1 border-3 border-essd-cream">
                  TOURNAMENT HUB
                </span>
              </h1>
            </div>

            {/* Quick Live Status Widget */}
            <div className="bg-essd-black text-essd-cream p-5 border-3 border-essd-cream shadow-[5px_5px_0px_#0A0A0C] max-w-sm">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-essd-gold font-bold uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-essd-orange animate-pulse"></span>
                  Tournament Pulse
                </span>
                <span className="text-essd-cream-muted">16 Teams • 15 Matches</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="p-2 bg-essd-charcoal border border-essd-border">
                  <span className="block text-lg font-black text-essd-orange">{liveMatches.length}</span>
                  <span className="text-[9px] text-essd-cream-muted uppercase">Live</span>
                </div>
                <div className="p-2 bg-essd-charcoal border border-essd-border">
                  <span className="block text-lg font-black text-essd-gold">{upcomingMatches.length}</span>
                  <span className="text-[9px] text-essd-cream-muted uppercase">Upcoming</span>
                </div>
                <div className="p-2 bg-essd-charcoal border border-essd-border">
                  <span className="block text-lg font-black text-green-400">{completedMatches.length}</span>
                  <span className="text-[9px] text-essd-cream-muted uppercase">Final</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tournament Interactive Bracket Canvas */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Helper guide */}
        <div className="p-4 bg-essd-charcoal border-2 border-essd-border mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-essd-cream-muted">
            <span className="px-2 py-0.5 bg-essd-gold text-essd-black font-bold uppercase text-[10px]">
              Tip
            </span>
            <span>Click any match card on the bracket to view motions, judges, debate lineup, and rubrics.</span>
          </div>
          <div className="flex items-center gap-4 text-essd-cream-muted">
            <Link href="/fixtures" className="text-essd-gold hover:underline">
              View Fixture Table →
            </Link>
            <Link href="/schools" className="text-essd-orange hover:underline">
              School Directory →
            </Link>
          </div>
        </div>

        {/* The 16-School Interactive Bracket */}
        <TournamentBracket matches={matches as any} />

      </section>

      {/* Tournament Structure Explainer */}
      <section className="py-12 bg-essd-charcoal border-t border-essd-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-mono">
            
            <div className="p-4 bg-essd-black border border-essd-border space-y-2">
              <span className="text-essd-gold font-bold block uppercase">
                Stage 1: Round of 16
              </span>
              <p className="text-essd-cream-muted leading-relaxed font-sans text-xs">
                8 dual clashes across 2 parallel halls. Standard 8-minute substantive speeches with open POIs.
              </p>
            </div>

            <div className="p-4 bg-essd-black border border-essd-border space-y-2">
              <span className="text-essd-gold font-bold block uppercase">
                Stage 2: Quarter-Finals
              </span>
              <p className="text-essd-cream-muted leading-relaxed font-sans text-xs">
                4 high-intensity matchups. Winning schools advance automatically to Day 2 Semi-Finals.
              </p>
            </div>

            <div className="p-4 bg-essd-black border border-essd-border space-y-2">
              <span className="text-essd-orange font-bold block uppercase">
                Stage 3: Semi-Finals
              </span>
              <p className="text-essd-cream-muted leading-relaxed font-sans text-xs">
                The Final Four clash over impromptu AI ethics motions with 60-minute preparation time.
              </p>
            </div>

            <div className="p-4 bg-essd-black border border-essd-gold space-y-2">
              <span className="text-essd-gold font-bold block uppercase">
                Stage 4: Grand Final
              </span>
              <p className="text-essd-cream-muted leading-relaxed font-sans text-xs">
                The supreme clash on the Secretariat main stage to crown the 2026 ESSD Grand Champion.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
