import { getSafeSchools, getSafeMatches, getSafePrizes, getSafeRegistrations } from "@/lib/data-service";
import Link from "next/link";
import { Icons } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Portal | ESSD 2026",
  description: "Official administrative dashboard for the Enugu State Secondary Schools Debate Championship.",
};

export default async function AdminDashboardPage() {
  const [schools, registrations, matches, prizes] = await Promise.all([
    getSafeSchools(),
    getSafeRegistrations(),
    getSafeMatches(),
    getSafePrizes(),
  ]);

  const liveMatches = matches.filter((m) => m.status === "LIVE");
  const completedMatches = matches.filter((m) => m.status === "FINAL" || m.status === "COMPLETED");

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
              Enugu State Secretariat Operations • Helpline: +234 903 829 6513
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

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-6 bg-essd-charcoal border-2 border-essd-border space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-essd-cream-muted">
              <span>Confirmed Roster</span>
              <Icons.Users className="w-4 h-4 text-essd-gold" />
            </div>
            <div className="text-3xl font-black font-display text-essd-gold">
              {schools.length}
            </div>
            <span className="text-[11px] font-mono text-essd-cream-muted block">
              Participating Institutions
            </span>
          </div>

          <div className="p-6 bg-essd-charcoal border-2 border-essd-border space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-essd-cream-muted">
              <span>Portal Registrations</span>
              <Icons.FileText className="w-4 h-4 text-essd-orange" />
            </div>
            <div className="text-3xl font-black font-display text-essd-orange">
              {registrations.length}
            </div>
            <span className="text-[11px] font-mono text-essd-cream-muted block">
              Verified Entries Received
            </span>
          </div>

          <div className="p-6 bg-essd-charcoal border-2 border-essd-border space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-essd-cream-muted">
              <span>Matches Tracked</span>
              <Icons.Trophy className="w-4 h-4 text-green-400" />
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
              <span>Prizes Configured</span>
              <Icons.Sparkles className="w-4 h-4 text-essd-gold" />
            </div>
            <div className="text-3xl font-black font-display text-essd-cream">
              {prizes.length}
            </div>
            <span className="text-[11px] font-mono text-essd-cream-muted block">
              Award Tiers
            </span>
          </div>

        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 bg-essd-charcoal border-2 border-essd-border hover:border-essd-gold flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-essd-gold uppercase">
                  Tournament Control
                </span>
                <Icons.Trophy className="w-5 h-5 text-essd-gold" />
              </div>
              <h3 className="text-lg font-black font-display uppercase text-essd-cream">
                Fixtures &amp; Live Scorekeeper
              </h3>
              <p className="text-xs text-essd-cream-muted leading-relaxed font-sans mt-2">
                Enter judge scores, toggle live status, assign debate motions, and automatically advance winners through the knockout bracket.
              </p>
            </div>
            <Link
              href="/admin/fixtures"
              className="inline-flex items-center text-xs font-mono font-bold text-essd-gold hover:text-essd-orange uppercase pt-2"
            >
              Open Scorekeeper →
            </Link>
          </div>

          <div className="p-6 bg-essd-charcoal border-2 border-essd-border hover:border-essd-gold flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-essd-orange uppercase">
                  School Accreditation
                </span>
                <Icons.Users className="w-5 h-5 text-essd-orange" />
              </div>
              <h3 className="text-lg font-black font-display uppercase text-essd-cream">
                Registrations &amp; Rosters
              </h3>
              <p className="text-xs text-essd-cream-muted leading-relaxed font-sans mt-2">
                Review submitted school profiles, inspect the 2 student debaters, captains, teacher contacts, and export team lists as CSV.
              </p>
            </div>
            <Link
              href="/admin/registrations"
              className="inline-flex items-center text-xs font-mono font-bold text-essd-gold hover:text-essd-orange uppercase pt-2"
            >
              Manage School Entries →
            </Link>
          </div>

          <div className="p-6 bg-essd-charcoal border-2 border-essd-border hover:border-essd-gold flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-essd-gold uppercase">
                  Event Settings
                </span>
                <Icons.Settings className="w-5 h-5 text-essd-gold" />
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

      </div>
    </div>
  );
}
