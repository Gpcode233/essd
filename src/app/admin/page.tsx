import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users, Trophy, Calendar, Sparkles, CheckCircle2, ShieldAlert, ArrowRight, Settings, FileText, Send } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Portal | ESSD 2026",
  description: "Official administrative dashboard for the Enugu State Secondary Schools Debate Championship.",
};

export default async function AdminDashboardPage() {
  const [schoolsCount, registrationsCount, matches, prizes] = await Promise.all([
    prisma.school.count(),
    prisma.registration.count(),
    prisma.match.findMany({
      include: { schoolA: true, schoolB: true, winner: true },
      orderBy: { matchNumber: "asc" },
    }),
    prisma.prize.findMany({ orderBy: { displayOrder: "asc" } }),
  ]);

  const liveMatches = matches.filter((m) => m.status === "LIVE");
  const completedMatches = matches.filter((m) => m.status === "FINAL" || m.status === "COMPLETED");
  const upcomingMatches = matches.filter((m) => m.status === "UPCOMING");

  return (
    <div className="w-full bg-essd-black text-essd-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-essd-border gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-essd-gold text-essd-black font-mono text-xs font-black uppercase mb-2">
              Organizer Operations
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-display uppercase tracking-tight text-essd-cream">
              ESSD 2026 Admin Dashboard
            </h1>
            <p className="text-xs text-essd-cream-muted font-mono mt-1">
              Enugu State Secretariat Operations • Secretariat Helpline: +234 903 829 6513
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/fixtures"
              className="px-4 py-2.5 bg-essd-gold text-essd-black font-mono font-bold text-xs uppercase hover:bg-essd-orange hover:text-white transition-colors"
            >
              Update Live Scores
            </Link>
            <Link
              href="/admin/registrations"
              className="px-4 py-2.5 bg-essd-charcoal text-essd-cream hover:text-essd-gold border border-essd-border font-mono font-bold text-xs uppercase transition-colors"
            >
              Manage Registrations
            </Link>
          </div>
        </div>

        {/* Quick Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-6 bg-essd-charcoal border-2 border-essd-border space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-essd-cream-muted">
              <span>Total Seeded Schools</span>
              <Users className="w-4 h-4 text-essd-gold" />
            </div>
            <div className="text-3xl font-black font-display text-essd-gold">
              {schoolsCount}
            </div>
            <span className="text-[11px] font-mono text-essd-cream-muted block">
              16 Participating Finalists
            </span>
          </div>

          <div className="p-6 bg-essd-charcoal border-2 border-essd-border space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-essd-cream-muted">
              <span>Portal Registrations</span>
              <FileText className="w-4 h-4 text-essd-orange" />
            </div>
            <div className="text-3xl font-black font-display text-essd-orange">
              {registrationsCount}
            </div>
            <span className="text-[11px] font-mono text-essd-cream-muted block">
              Verified Institution Submissions
            </span>
          </div>

          <div className="p-6 bg-essd-charcoal border-2 border-essd-border space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-essd-cream-muted">
              <span>Live / Completed Matches</span>
              <Trophy className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-3xl font-black font-display text-green-400">
              {completedMatches.length} / {matches.length}
            </div>
            <span className="text-[11px] font-mono text-essd-cream-muted block">
              {liveMatches.length} Currently Active On Stage
            </span>
          </div>

          <div className="p-6 bg-essd-charcoal border-2 border-essd-border space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-essd-cream-muted">
              <span>Configured Prizes</span>
              <Sparkles className="w-4 h-4 text-essd-gold" />
            </div>
            <div className="text-3xl font-black font-display text-essd-cream">
              {prizes.length}
            </div>
            <span className="text-[11px] font-mono text-essd-cream-muted block">
              Editable Award Categories
            </span>
          </div>

        </div>

        {/* Action Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Module 1: Fixtures & Knockout Engine */}
          <div className="p-6 bg-essd-charcoal border-2 border-essd-border hover:border-essd-gold flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-essd-gold uppercase">
                  Tournament Control
                </span>
                <Trophy className="w-5 h-5 text-essd-gold" />
              </div>
              <h3 className="text-lg font-black font-display uppercase text-essd-cream">
                Fixtures &amp; Live Scorekeeper
              </h3>
              <p className="text-xs text-essd-cream-muted leading-relaxed font-sans mt-2">
                Enter judge scores, set live status, assign debate motions, and automatically advance winners to subsequent knockout rounds.
              </p>
            </div>
            <Link
              href="/admin/fixtures"
              className="inline-flex items-center text-xs font-mono font-bold text-essd-gold hover:text-essd-orange uppercase pt-2"
            >
              Open Fixture Controller →
            </Link>
          </div>

          {/* Module 2: Registrations & Team Rosters */}
          <div className="p-6 bg-essd-charcoal border-2 border-essd-border hover:border-essd-gold flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-essd-orange uppercase">
                  School Accreditation
                </span>
                <Users className="w-5 h-5 text-essd-orange" />
              </div>
              <h3 className="text-lg font-black font-display uppercase text-essd-cream">
                Registrations &amp; Rosters
              </h3>
              <p className="text-xs text-essd-cream-muted leading-relaxed font-sans mt-2">
                Review submitted school profiles, inspect student debaters, captains, teacher contacts, and export team lists as CSV.
              </p>
            </div>
            <Link
              href="/admin/registrations"
              className="inline-flex items-center text-xs font-mono font-bold text-essd-gold hover:text-essd-orange uppercase pt-2"
            >
              Manage School Entries →
            </Link>
          </div>

          {/* Module 3: Prize & Event Settings */}
          <div className="p-6 bg-essd-charcoal border-2 border-essd-border hover:border-essd-gold flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-essd-gold uppercase">
                  Event Settings
                </span>
                <Settings className="w-5 h-5 text-essd-gold" />
              </div>
              <h3 className="text-lg font-black font-display uppercase text-essd-cream">
                Prizes &amp; Content Editor
              </h3>
              <p className="text-xs text-essd-cream-muted leading-relaxed font-sans mt-2">
                Update prize descriptions, international scholarship details, trophy sponsorships, and contact guidelines without code edits.
              </p>
            </div>
            <Link
              href="/admin/prizes"
              className="inline-flex items-center text-xs font-mono font-bold text-essd-gold hover:text-essd-orange uppercase pt-2"
            >
              Edit Prize Details →
            </Link>
          </div>

        </div>

        {/* Live Matches Quick Status Table */}
        <div className="bg-essd-charcoal border-2 border-essd-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black font-display uppercase text-essd-cream">
              Recent Matches Snapshot
            </h3>
            <Link
              href="/admin/fixtures"
              className="text-xs font-mono text-essd-gold hover:underline"
            >
              View All 15 Matches →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-essd-black text-essd-gold uppercase border-b border-essd-border">
                <tr>
                  <th className="p-3">Match</th>
                  <th className="p-3">Stage</th>
                  <th className="p-3">Proposition</th>
                  <th className="p-3">Opposition</th>
                  <th className="p-3">Scores</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Winner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-essd-border/60">
                {matches.slice(0, 6).map((m) => (
                  <tr key={m.id} className="hover:bg-essd-dark/60">
                    <td className="p-3 font-bold text-essd-gold">
                      #{m.matchNumber}
                    </td>
                    <td className="p-3 text-essd-cream-muted">{m.roundLabel}</td>
                    <td className="p-3 font-bold text-essd-cream">
                      {m.schoolA?.name || "TBD"}
                    </td>
                    <td className="p-3 font-bold text-essd-cream">
                      {m.schoolB?.name || "TBD"}
                    </td>
                    <td className="p-3 font-bold">
                      {m.scoreA !== null ? m.scoreA.toFixed(1) : "-"} : {m.scoreB !== null ? m.scoreB.toFixed(1) : "-"}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                        m.status === "LIVE" ? "bg-essd-orange text-white" : m.status === "FINAL" ? "bg-green-900 text-green-300" : "bg-essd-dark text-essd-cream-muted"
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-essd-gold">
                      {m.winner?.name || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
