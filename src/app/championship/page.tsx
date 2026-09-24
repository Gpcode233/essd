import Link from "next/link";
import { DAY1_MOTIONS, DAY2_MOTIONS } from "@/lib/types";
import { Icons } from "@/components/icons";

export const metadata = {
  title: "Championship Rounds & Motions | ESSD 2026",
  description: "Official tournament structure, round progression, elimination stages, and motion themes for ESSD 2026.",
};

export default function ChampionshipPage() {
  return (
    <div className="w-full bg-essd-black text-essd-cream min-h-screen">
      
      {/* Header Banner */}
      <section className="relative halftone-bg py-12 sm:py-16 border-b-4 border-essd-black text-essd-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-essd-black text-essd-gold px-3.5 py-1 font-mono text-xs font-black uppercase border-2 border-essd-cream shadow-[3px_3px_0px_#0A0A0C] mb-3 rounded-full">
              <Icons.Trophy className="w-3.5 h-3.5" />
              Championship Tournament Format
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-wide text-essd-black leading-none text-shadow-hard">
              TOURNAMENT ROUNDS <br />
              <span className="text-essd-orange bg-essd-black px-3.5 py-1 inline-block mt-1 border-3 border-essd-cream rounded-xl">
                &amp; MOTION STAGES
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base font-bold text-essd-black/90 font-sans">
              Two days of rigorous debate. 80+ debaters representing Enugu Central schools competing down to 20 Grand Finalists and the Top 5 Apex Clash.
            </p>
          </div>
        </div>
      </section>

      {/* Tournament Overview Stats */}
      <section className="py-8 bg-essd-charcoal border-b border-essd-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-essd-black border border-essd-border rounded-xl">
              <span className="text-[11px] font-mono text-essd-gold uppercase block">Starting Field</span>
              <span className="text-2xl font-black font-display text-essd-cream">80+ Debaters</span>
              <span className="text-[10px] text-essd-cream-muted block mt-0.5">Enugu Central Schools</span>
            </div>
            <div className="p-4 bg-essd-black border border-essd-border rounded-xl">
              <span className="text-[11px] font-mono text-essd-orange uppercase block">Day 1 Rounds</span>
              <span className="text-2xl font-black font-display text-essd-cream">3 Rounds</span>
              <span className="text-[10px] text-essd-cream-muted block mt-0.5">Elimination down to 20</span>
            </div>
            <div className="p-4 bg-essd-black border border-essd-border rounded-xl">
              <span className="text-[11px] font-mono text-emerald-400 uppercase block">Grand Finalists</span>
              <span className="text-2xl font-black font-display text-essd-cream">20 Debaters</span>
              <span className="text-[10px] text-essd-cream-muted block mt-0.5">Qualify for Day 2</span>
            </div>
            <div className="p-4 bg-essd-black border border-essd-border rounded-xl">
              <span className="text-[11px] font-mono text-amber-400 uppercase block">The Finals</span>
              <span className="text-2xl font-black font-display text-essd-cream">Top 5 Finalists</span>
              <span className="text-[10px] text-essd-cream-muted block mt-0.5">On-the-spot Impromptu</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tournament Breakdown */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* DAY 1: PRELIMINARY & ELIMINATION ROUNDS */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-essd-gold">
            <div>
              <span className="inline-block px-3 py-1 bg-essd-gold/10 text-essd-gold border border-essd-gold/30 rounded-full text-xs font-mono font-bold uppercase mb-2">
                Day 1 • Friday, 16th October 2026
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-display uppercase tracking-wide text-essd-cream">
                DAY 1: PRELIMINARY &amp; ELIMINATION ROUNDS
              </h2>
              <p className="text-xs sm:text-sm text-essd-cream-muted font-sans mt-1">
                80+ secondary school debaters compete across 3 successive rounds. Exactly <strong>20 debaters</strong> will advance to the Grand Finale.
              </p>
            </div>
            <div className="px-4 py-2 bg-essd-charcoal border border-essd-gold/40 rounded-xl text-right">
              <span className="text-[11px] font-mono text-essd-gold uppercase block">Advancement Target</span>
              <span className="text-lg font-black font-display text-essd-cream">Top 20 Advance</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Day 1 - Round 1 */}
            <div className="p-6 bg-essd-charcoal border-2 border-essd-border hover:border-essd-gold transition-all rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 bg-essd-gold/20 text-essd-gold rounded text-xs font-mono font-bold">
                    Round 01
                  </span>
                  <span className="text-xs text-essd-cream-muted font-mono">Preliminary Clash</span>
                </div>
                <h3 className="text-xl font-black font-display uppercase text-essd-cream mb-2">
                  Round 1: Preliminary Round
                </h3>
                <p className="text-xs text-essd-cream-muted leading-relaxed font-sans mb-4">
                  All 80+ registered debaters deliver opening substantive arguments on their 1st chosen Day 1 motion.
                </p>

                <div className="p-3 bg-essd-black rounded-xl border border-essd-border space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-essd-cream-muted">
                    <span>Cohort Size:</span>
                    <strong className="text-essd-cream">80+ Debaters</strong>
                  </div>
                  <div className="flex justify-between text-essd-cream-muted">
                    <span>Motion:</span>
                    <strong className="text-essd-gold">Selected Day 1 Motion 1</strong>
                  </div>
                  <div className="flex justify-between text-red-400">
                    <span>Elimination:</span>
                    <strong>Debaters with lowest rubric points dropped</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-essd-border/60 text-[11px] text-essd-cream-muted font-mono">
                ✓ Free Stance (Proposition or Opposition)
              </div>
            </div>

            {/* Day 1 - Round 2 */}
            <div className="p-6 bg-essd-charcoal border-2 border-essd-border hover:border-essd-gold transition-all rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 bg-essd-gold/20 text-essd-gold rounded text-xs font-mono font-bold">
                    Round 02
                  </span>
                  <span className="text-xs text-essd-cream-muted font-mono">Consolidation</span>
                </div>
                <h3 className="text-xl font-black font-display uppercase text-essd-cream mb-2">
                  Round 2: Consolidation Round
                </h3>
                <p className="text-xs text-essd-cream-muted leading-relaxed font-sans mb-4">
                  Advancing debaters debate their 2nd chosen Day 1 motion with emphasis on rebuttal and dialectical logic.
                </p>

                <div className="p-3 bg-essd-black rounded-xl border border-essd-border space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-essd-cream-muted">
                    <span>Cohort Size:</span>
                    <strong className="text-essd-cream">Advancing Debaters</strong>
                  </div>
                  <div className="flex justify-between text-essd-cream-muted">
                    <span>Motion:</span>
                    <strong className="text-essd-gold">Selected Day 1 Motion 2</strong>
                  </div>
                  <div className="flex justify-between text-red-400">
                    <span>Elimination:</span>
                    <strong>Bottom ranked debaters dropped</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-essd-border/60 text-[11px] text-essd-cream-muted font-mono">
                ✓ Strict Adjudication & Time Management
              </div>
            </div>

            {/* Day 1 - Round 3 */}
            <div className="p-6 bg-essd-charcoal border-2 border-essd-gold shadow-[6px_6px_0px_#0A0A0C] rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs font-mono font-bold">
                    Round 03
                  </span>
                  <span className="text-xs text-emerald-400 font-mono">Grand Finale Qualifier</span>
                </div>
                <h3 className="text-xl font-black font-display uppercase text-essd-cream mb-2">
                  Round 3: Qualifier Round
                </h3>
                <p className="text-xs text-essd-cream-muted leading-relaxed font-sans mb-4">
                  The decisive Day 1 qualifier. Debaters argue their 3rd chosen motion to earn an official ticket to the Grand Finale.
                </p>

                <div className="p-3 bg-essd-black rounded-xl border border-essd-border space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-essd-cream-muted">
                    <span>Cohort Size:</span>
                    <strong className="text-essd-cream">Advancing Debaters</strong>
                  </div>
                  <div className="flex justify-between text-essd-cream-muted">
                    <span>Motion:</span>
                    <strong className="text-essd-gold">Selected Day 1 Motion 3</strong>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Advancing:</span>
                    <strong>Only Top 20 Advance to Day 2</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-essd-border/60 text-[11px] text-emerald-400 font-mono font-bold">
                ★ Top 20 Debaters Qualify for Grand Finale
              </div>
            </div>

          </div>

          {/* Day 1 Motion Pool Recap */}
          <div className="p-6 bg-essd-dark border border-essd-border rounded-2xl">
            <h4 className="text-sm font-black font-display uppercase text-essd-gold mb-3">
              Day 1 Curated Motion Pool (Debaters Pick 3 During Registration):
            </h4>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              {DAY1_MOTIONS.map((m) => (
                <div key={m.id} className="p-3 bg-essd-black rounded-lg border border-essd-border/80">
                  <span className="text-essd-gold font-bold font-mono block text-[11px]">
                    {m.title.split("—")[0]}
                  </span>
                  <p className="text-essd-cream mt-1 leading-snug line-clamp-3">{m.motion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* DAY 2: GRAND FINALE & THE FINALS */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-essd-orange">
            <div>
              <span className="inline-block px-3 py-1 bg-essd-orange/10 text-essd-orange border border-essd-orange/30 rounded-full text-xs font-mono font-bold uppercase mb-2">
                Day 2 • Saturday, 17th October 2026
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-display uppercase tracking-wide text-essd-cream">
                DAY 2: GRAND FINALE &amp; THE FINALS
              </h2>
              <p className="text-xs sm:text-sm text-essd-cream-muted font-sans mt-1">
                The top 20 debaters battle through 2 Grand Finale rounds down to the <strong>Top 5 Finalists</strong> for the apex impromptu championship round.
              </p>
            </div>
            <div className="px-4 py-2 bg-essd-charcoal border border-essd-orange/40 rounded-xl text-right">
              <span className="text-[11px] font-mono text-essd-orange uppercase block">Apex Stage</span>
              <span className="text-lg font-black font-display text-essd-cream">Top 5 in The Finals</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Grand Finale - Round 1 */}
            <div className="p-6 bg-essd-charcoal border-2 border-essd-border hover:border-essd-orange transition-all rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 bg-essd-orange/20 text-essd-orange rounded text-xs font-mono font-bold">
                    Finale Round 01
                  </span>
                  <span className="text-xs text-essd-cream-muted font-mono">Top 20 Clash</span>
                </div>
                <h3 className="text-xl font-black font-display uppercase text-essd-cream mb-2">
                  Grand Finale Round 1
                </h3>
                <p className="text-xs text-essd-cream-muted leading-relaxed font-sans mb-4">
                  The Top 20 qualified debaters debate their 1st chosen Grand Finale motion before the grand panel of judges.
                </p>

                <div className="p-3 bg-essd-black rounded-xl border border-essd-border space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-essd-cream-muted">
                    <span>Participants:</span>
                    <strong className="text-essd-cream">20 Debaters</strong>
                  </div>
                  <div className="flex justify-between text-essd-cream-muted">
                    <span>Motion:</span>
                    <strong className="text-essd-orange">Selected Day 2 Motion 1</strong>
                  </div>
                  <div className="flex justify-between text-red-400">
                    <span>Elimination:</span>
                    <strong>10 Debaters Dropped (Top 10 Advance)</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-essd-border/60 text-[11px] text-essd-cream-muted font-mono">
                ✓ 10 Debaters Advance to Finale Round 2
              </div>
            </div>

            {/* Grand Finale - Round 2 */}
            <div className="p-6 bg-essd-charcoal border-2 border-essd-border hover:border-essd-orange transition-all rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 bg-essd-orange/20 text-essd-orange rounded text-xs font-mono font-bold">
                    Finale Round 02
                  </span>
                  <span className="text-xs text-essd-cream-muted font-mono">Top 10 Semis</span>
                </div>
                <h3 className="text-xl font-black font-display uppercase text-essd-cream mb-2">
                  Grand Finale Round 2
                </h3>
                <p className="text-xs text-essd-cream-muted leading-relaxed font-sans mb-4">
                  The Top 10 debaters face off on their 2nd chosen Grand Finale motion in high-speed rhetorical exchanges.
                </p>

                <div className="p-3 bg-essd-black rounded-xl border border-essd-border space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-essd-cream-muted">
                    <span>Participants:</span>
                    <strong className="text-essd-cream">10 Debaters</strong>
                  </div>
                  <div className="flex justify-between text-essd-cream-muted">
                    <span>Motion:</span>
                    <strong className="text-essd-orange">Selected Day 2 Motion 2</strong>
                  </div>
                  <div className="flex justify-between text-red-400">
                    <span>Elimination:</span>
                    <strong>5 Debaters Dropped (Top 5 Advance)</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-essd-border/60 text-[11px] text-essd-cream-muted font-mono">
                ★ Top 5 Debaters Advance to The Finals
              </div>
            </div>

            {/* The Finals - Apex Stage */}
            <div className="p-6 bg-gradient-to-br from-essd-charcoal via-essd-black to-essd-charcoal border-4 border-essd-gold shadow-[8px_8px_0px_#0A0A0C] rounded-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-essd-gold text-essd-black font-mono text-[10px] font-black uppercase px-3 py-0.5 rounded-bl-lg">
                Apex Stage
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 bg-essd-gold text-essd-black rounded text-xs font-mono font-black">
                    THE FINALS
                  </span>
                  <span className="text-xs text-essd-gold font-mono font-bold">Championship Crown</span>
                </div>
                <h3 className="text-xl font-black font-display uppercase text-essd-cream mb-2">
                  The Finals (Top 5 Apex Clash)
                </h3>
                <p className="text-xs text-essd-cream-muted leading-relaxed font-sans mb-4">
                  The 5 greatest debaters in the state contest for the ultimate crown on an <strong>impromptu motion</strong> revealed on the spot!
                </p>

                <div className="p-3 bg-essd-black rounded-xl border border-essd-gold/40 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-essd-cream-muted">
                    <span>Participants:</span>
                    <strong className="text-essd-gold">Top 5 Finalists</strong>
                  </div>
                  <div className="flex justify-between text-essd-cream-muted">
                    <span>Motion:</span>
                    <strong className="text-essd-gold animate-pulse">Impromptu (Given on the Spot)</strong>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Outcome:</span>
                    <strong>Crowns 1st, 2nd, 3rd, 4th, 5th</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-essd-gold/40 text-xs text-essd-gold font-mono font-bold flex items-center gap-1.5">
                <Icons.Trophy className="w-4 h-4 fill-current" />
                ₦150k + Tech Scholarship + Free Int&apos;l Application
              </div>
            </div>

          </div>

          {/* Day 2 Motion Pool Recap */}
          <div className="p-6 bg-essd-dark border border-essd-border rounded-2xl">
            <h4 className="text-sm font-black font-display uppercase text-essd-orange mb-3">
              Day 2 Grand Finale Motion Pool (Debaters Pick 2 During Registration):
            </h4>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              {DAY2_MOTIONS.map((m) => (
                <div key={m.id} className="p-3 bg-essd-black rounded-lg border border-essd-border/80">
                  <span className="text-essd-orange font-bold font-mono block text-[11px]">
                    {m.title.split("—")[0]}
                  </span>
                  <p className="text-essd-cream mt-1 leading-snug line-clamp-3">{m.motion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Register */}
        <div className="p-8 bg-essd-charcoal border-4 border-essd-gold shadow-[8px_8px_0px_#0A0A0C] rounded-2xl text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black font-display uppercase text-essd-cream">
            Ready to Represent Your Secondary School?
          </h3>
          <p className="text-xs sm:text-sm text-essd-cream-muted max-w-xl mx-auto font-sans">
            Registrations are open for student debaters across Enugu Town and Enugu Central secondary schools. Select your preferred motions now.
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-essd-gold text-essd-black font-display font-black text-sm uppercase tracking-wider border-2 border-essd-cream shadow-[4px_4px_0px_#0A0A0C] hover:bg-essd-orange hover:text-white transition-all rounded-xl"
            >
              <Icons.Sparkles className="w-4 h-4 mr-2 fill-current" />
              Register Debater Now
              <Icons.ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>

      </section>

    </div>
  );
}
