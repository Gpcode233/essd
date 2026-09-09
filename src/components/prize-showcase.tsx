import Link from "next/link";
import { PrizeData } from "@/lib/types";
import { Icons } from "@/components/icons";

interface PrizeShowcaseProps {
  prizes?: PrizeData[];
}

export default function PrizeShowcase({ prizes }: PrizeShowcaseProps) {
  const defaultPrizes = [
    {
      id: "p1",
      tier: "CHAMPION",
      title: "ESSD 2026 GRAND CHAMPION",
      rewardHeadline: "International Scholarship + Cash Prize + Gold Championship Trophy",
      description: "Prestigious higher education scholarship abroad, official ESSD 2026 Gold Championship Trophy, gold medallions for each debater, and high-speed tech lab infrastructure grant for the winning school.",
      badgeColor: "gold",
    },
    {
      id: "p2",
      tier: "RUNNER_UP",
      title: "1ST RUNNER-UP (FINALIST)",
      rewardHeadline: "Substantial Cash Prize + Silver Plaque + Leadership Fellowship",
      description: "Executive silver plaque, medals for squad debaters, substantial cash award for the debate society, and priority fellowship admission.",
      badgeColor: "orange",
    },
    {
      id: "p3",
      tier: "THIRD_PLACE",
      title: "2ND RUNNER-UP (3RD PLACE)",
      rewardHeadline: "Cash Prize + Bronze Award + School Library Grant",
      description: "State certificate of distinction, bronze trophy, cash prize, and curated academic reference packs for the school.",
      badgeColor: "cream",
    },
    {
      id: "p4",
      tier: "BEST_SPEAKER",
      title: "OVERALL BEST SPEAKER",
      rewardHeadline: "International Youth Summit Delegate + Laptops & Tech Suite",
      description: "Awarded to the debater with highest individual score across all tournament rounds, including high-spec laptops and international delegate sponsorship.",
      badgeColor: "gold",
    },
  ];

  const displayPrizes = prizes && prizes.length > 0 ? prizes : defaultPrizes;
  const championPrize = displayPrizes.find((p) => p.tier === "CHAMPION") || displayPrizes[0];
  const otherPrizes = displayPrizes.filter((p) => p.tier !== "CHAMPION");

  return (
    <section className="relative bg-essd-black text-essd-cream py-16 sm:py-24 border-b border-essd-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-essd-gold bg-essd-gold/10 px-3.5 py-1 border border-essd-gold inline-block mb-3 rounded-full">
            🏆 Championship Honors
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-wide text-essd-cream">
            PRIZES &amp; <span className="text-essd-gold">OPPORTUNITIES</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-essd-cream-muted leading-relaxed font-sans">
            Honoring exceptional intellect, oratorical brilliance, and rigorous debate with life-changing academic scholarships and grand institutional accolades.
          </p>
        </div>

        {/* Visually Dominant Grand Champion Card */}
        {championPrize && (
          <div className="mb-10 relative group">
            {/* Outer Sticker / Poster Border Container */}
            <div className="relative bg-gradient-to-br from-essd-charcoal via-essd-black to-essd-charcoal p-6 sm:p-10 border-4 border-essd-gold shadow-[8px_8px_0px_#0A0A0C] hover:shadow-[12px_12px_0px_#E8A927] transition-all duration-300 rounded-2xl">
              
              <div className="absolute -top-4 left-6 sm:left-10 bg-essd-gold text-essd-black font-mono text-xs sm:text-sm font-black uppercase px-4 py-1 border-2 border-essd-black shadow-[3px_3px_0px_#0A0A0C] flex items-center gap-1.5 rounded-full">
                <Icons.Sparkles className="w-4 h-4 fill-current" />
                Supreme Honor
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
                    <span className="text-xs font-mono font-black text-essd-gold tracking-widest uppercase block">
                      Tier 1 // Apex Reward
                    </span>
                    <span className="text-xl sm:text-2xl font-black font-display text-essd-cream uppercase block mt-1">
                      Grand Champion
                    </span>
                  </div>
                </div>

                {/* Details Column */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-essd-gold/10 text-essd-gold border border-essd-gold/30 text-xs font-mono font-bold uppercase rounded-full">
                    <Icons.GraduationCap className="w-4 h-4" />
                    Global Education Pathway
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-display uppercase text-essd-gold tracking-wide leading-tight">
                    {championPrize.rewardHeadline}
                  </h3>

                  <p className="text-xs sm:text-sm text-essd-cream-muted leading-relaxed font-sans">
                    {championPrize.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-essd-border/80">
                    <div className="flex items-center gap-2 text-xs font-mono text-essd-cream">
                      <Icons.CheckCircle className="w-4 h-4 text-essd-gold flex-shrink-0" />
                      <span>International Scholarship</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-essd-cream">
                      <Icons.CheckCircle className="w-4 h-4 text-essd-gold flex-shrink-0" />
                      <span>Cash Prize for Society</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-essd-cream">
                      <Icons.CheckCircle className="w-4 h-4 text-essd-gold flex-shrink-0" />
                      <span>State Gold Trophy</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Other Prize Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherPrizes.map((p, idx) => (
            <div
              key={p.id || idx}
              className="bg-essd-charcoal border-2 border-essd-border hover:border-essd-orange p-6 flex flex-col justify-between shadow-[4px_4px_0px_#0A0A0C] hover:shadow-[6px_6px_0px_#F25A19] transition-all duration-200 group rounded-2xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-essd-orange uppercase">
                    {p.title}
                  </span>
                  <Icons.Award className="w-5 h-5 text-essd-orange opacity-80 group-hover:opacity-100" />
                </div>

                <h4 className="text-lg font-black font-display uppercase text-essd-cream tracking-wide mb-2 leading-snug">
                  {p.rewardHeadline}
                </h4>

                <p className="text-xs text-essd-cream-muted leading-relaxed mb-4">
                  {p.description}
                </p>
              </div>

              <div className="pt-3 border-t border-essd-border/60 flex items-center justify-between text-[11px] font-mono text-essd-gold">
                <span>Official Award</span>
                <span>Tier 0{idx + 2}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Important Disclaimer Note */}
        <div className="mt-10 p-4 bg-essd-dark/60 border border-essd-border text-center text-xs font-mono text-essd-cream-muted/80 max-w-2xl mx-auto rounded-xl">
          <p>
            * Note: Specific partner institutions, international scholarship allocations, and finalized cash disbursements are subject to official confirmation and protocol by the ESSD 2026 Organizing Secretariat.
          </p>
        </div>

      </div>
    </section>
  );
}
