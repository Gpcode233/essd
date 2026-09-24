import Link from "next/link";
import { PrizeData } from "@/lib/types";
import { Icons } from "@/components/icons";

interface PrizeShowcaseProps {
  prizes?: PrizeData[];
}

export default function PrizeShowcase({ prizes }: PrizeShowcaseProps) {
  const defaultPrizes: PrizeData[] = [
    {
      id: "prize-1",
      tier: "CHAMPION",
      position: "1st Position (State Champion)",
      cashPrize: "₦150,000",
      rewardHeadline: "₦150k Cash Prize + Tech Scholarship + Free Int'l Scholarship Application + Trophy",
      benefits: [
        "₦150,000 Cash Prize for the Champion Debater",
        "Official ESSD 2026 Gold Championship Trophy for the School",
        "Gold Medal of Distinction",
        "Full Scholarship to study any Tech Course of choice",
        "Free International Scholarship Application & Consultation",
      ],
      description: "Crown of the Enugu State Secondary Schools Debate Champion with grand cash, scholarship, and trophy honors.",
      iconName: "Trophy",
      badgeColor: "gold",
      displayOrder: 1,
    },
    {
      id: "prize-2",
      tier: "RUNNER_UP",
      position: "2nd Position (Runner-Up)",
      cashPrize: "₦100,000",
      rewardHeadline: "₦100k Cash Prize + Tech Scholarship + Free Int'l Scholarship Application + Trophy",
      benefits: [
        "₦100,000 Cash Prize for the Debater",
        "Official ESSD 2026 Silver Championship Trophy for the School",
        "Silver Medal of Distinction",
        "Full Scholarship to study any Tech Course of choice",
        "Free International Scholarship Application & Consultation",
      ],
      description: "Exceptional debating accolade celebrating high-level rhetoric, analytical mastery, and scholastic distinction.",
      iconName: "Medal",
      badgeColor: "orange",
      displayOrder: 2,
    },
    {
      id: "prize-3",
      tier: "THIRD_PLACE",
      position: "3rd Position (Third Place)",
      cashPrize: "₦50,000",
      rewardHeadline: "₦50k Cash Prize + Tech Scholarship + Free Int'l Scholarship Application + Trophy",
      benefits: [
        "₦50,000 Cash Prize for the Debater",
        "Official ESSD 2026 Bronze Championship Trophy for the School",
        "Bronze Medal of Distinction",
        "Full Scholarship to study any Tech Course of choice",
        "Free International Scholarship Application & Consultation",
      ],
      description: "Distinguished bronze award honoring remarkable oratory, logic, and dialectical excellence.",
      iconName: "Award",
      badgeColor: "cream",
      displayOrder: 3,
    },
    {
      id: "prize-4",
      tier: "FOURTH_FIFTH",
      position: "4th & 5th Positions (Finalists)",
      cashPrize: null,
      rewardHeadline: "Full Tech Course Scholarship + Free Int'l Scholarship Application",
      benefits: [
        "Full Scholarship to study any Tech Course of choice",
        "Free International Scholarship Application & Advisory",
        "Certificate of Grand Finale Distinction",
        "Membership into the ESSD Alumni Scholars Circle",
      ],
      description: "Apex finalist honors unlocking global academic pathways and digital skills acceleration.",
      iconName: "GraduationCap",
      badgeColor: "gold",
      displayOrder: 4,
    },
  ];

  const displayPrizes = prizes && prizes.length > 0 ? prizes : defaultPrizes;
  const championPrize = displayPrizes.find((p) => p.tier === "CHAMPION") || displayPrizes[0];
  const otherPrizes = displayPrizes.filter((p) => p.tier !== "CHAMPION");

  return (
    <section className="relative bg-essd-black text-essd-cream py-16 sm:py-24 border-b border-essd-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Note: Subtitle removed as requested in Point 8 */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-essd-gold bg-essd-gold/10 px-3.5 py-1 border border-essd-gold inline-block mb-3 rounded-full">
            🏆 Championship Honors
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-wide text-essd-cream">
            PRIZES &amp; <span className="text-essd-gold">OPPORTUNITIES</span>
          </h2>
        </div>

        {/* Visually Dominant Grand Champion Card (1st Position) */}
        {championPrize && (
          <div className="mb-10 relative group">
            <div className="relative bg-gradient-to-br from-essd-charcoal via-essd-black to-essd-charcoal p-6 sm:p-10 border-4 border-essd-gold shadow-[8px_8px_0px_#0A0A0C] hover:shadow-[12px_12px_0px_#E8A927] transition-all duration-300 rounded-2xl">
              
              <div className="absolute -top-4 left-6 sm:left-10 bg-essd-gold text-essd-black font-mono text-xs sm:text-sm font-black uppercase px-4 py-1 border-2 border-essd-black shadow-[3px_3px_0px_#0A0A0C] flex items-center gap-1.5 rounded-full">
                <Icons.Sparkles className="w-4 h-4 fill-current" />
                1st Position • Supreme State Champion
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-2">
                
                {/* Trophy Graphic / Icon Column */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-essd-black border-2 border-essd-gold/50 text-center relative overflow-hidden rounded-xl">
                  <div className="relative z-10">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-essd-gold/20 border-2 border-essd-gold p-1 flex items-center justify-center mx-auto mb-4">
                      <div className="w-full h-full rounded-full bg-essd-black flex items-center justify-center">
                        <Icons.Trophy className="w-12 h-12 sm:w-14 sm:h-14 text-essd-gold" />
                      </div>
                    </div>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-[#E8A927] block">
                      ₦150,000
                    </span>
                    <span className="text-xs font-mono font-black text-essd-gold tracking-widest uppercase block mt-1">
                      Cash Prize + Trophy
                    </span>
                  </div>
                </div>

                {/* Details Column */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-essd-gold/10 text-essd-gold border border-essd-gold/30 text-xs font-mono font-bold uppercase rounded-full">
                    <Icons.GraduationCap className="w-4 h-4" />
                    Tech Scholarship + Free Int&apos;l Application + School Trophy
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-black font-display text-essd-cream uppercase tracking-wide">
                    {championPrize.position || "1st Position (State Champion)"}
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-2.5 pt-2">
                    {championPrize.benefits && championPrize.benefits.map((b: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-mono text-essd-cream">
                        <Icons.CheckCircle className="w-4 h-4 text-essd-gold mt-0.5 flex-shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <Link
                      href="/register"
                      className="px-6 py-3 bg-essd-gold text-essd-black font-display font-black text-xs uppercase tracking-wider border-2 border-essd-cream shadow-[4px_4px_0px_#0A0A0C] hover:bg-essd-orange hover:text-white transition-all inline-flex items-center gap-2 rounded-xl"
                    >
                      <Icons.Sparkles className="w-4 h-4 fill-current" />
                      Register To Compete
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* 2nd, 3rd, and 4th/5th Position Prize Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherPrizes.map((prize, idx) => {
            const isRunnerUp = prize.tier === "RUNNER_UP";
            const isThird = prize.tier === "THIRD_PLACE";
            const borderColor = isRunnerUp
              ? "border-essd-orange"
              : isThird
              ? "border-amber-600/70"
              : "border-essd-border";

            return (
              <div
                key={prize.id || idx}
                className={`p-6 bg-essd-charcoal border-2 ${borderColor} shadow-[6px_6px_0px_#0A0A0C] hover:shadow-[8px_8px_0px_#E8A927] transition-all flex flex-col justify-between rounded-2xl`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[11px] font-mono font-black uppercase px-3 py-1 rounded-full border ${
                        isRunnerUp
                          ? "bg-essd-orange/10 text-essd-orange border-essd-orange"
                          : isThird
                          ? "bg-amber-600/10 text-amber-500 border-amber-600"
                          : "bg-essd-gold/10 text-essd-gold border-essd-gold"
                      }`}
                    >
                      {prize.position}
                    </span>
                    {prize.cashPrize && (
                      <span className="text-lg font-black font-mono text-[#E8A927]">
                        {prize.cashPrize}
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg sm:text-xl font-black font-display text-essd-cream uppercase tracking-wide mb-3">
                    {prize.rewardHeadline}
                  </h4>

                  <div className="space-y-2 pt-2 border-t border-essd-border/60">
                    {prize.benefits && prize.benefits.map((b: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-mono text-essd-cream-muted">
                        <Icons.CheckCircle className="w-3.5 h-3.5 text-essd-gold mt-0.5 flex-shrink-0" />
                        <span className="leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-essd-border/40">
                  <span className="text-[10px] font-mono uppercase text-essd-cream-muted block">
                    Venue & Accreditation
                  </span>
                  <span className="text-xs font-bold text-essd-cream block mt-0.5">
                    HOTR Auditorium, Enugu • Oct 2026
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
