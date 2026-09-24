import { getSafePrizes } from "@/lib/data-service";
import Hero from "@/components/hero";
import StatsBanner from "@/components/stats-banner";
import HowItWorks from "@/components/how-it-works";
import PrizeShowcase from "@/components/prize-showcase";
import FAQSection from "@/components/faq-section";
import Link from "next/link";
import { Icons } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const prizes = await getSafePrizes();

  return (
    <div className="w-full">
      {/* 1. Visually Powerful Hero Section */}
      <Hero />

      {/* 2. Championship Stats & Next Generation Pillars */}
      <StatsBanner />

      {/* 3. Tournament Format */}
      <section className="relative bg-essd-charcoal text-essd-cream py-16 sm:py-24 border-b border-essd-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-essd-gold/10 border border-essd-gold px-3 py-1 text-essd-gold font-mono text-xs font-bold uppercase tracking-widest mb-3">
                <Icons.Trophy className="w-3.5 h-3.5 text-essd-gold" />
                Individual Debater Championship
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-wide text-essd-cream">
                80+ DEBATERS <br />
                <span className="text-essd-gold">ONE CHAMPIONSHIP CROWN</span>
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <Link
                href="/championship"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-essd-gold text-essd-black hover:bg-essd-orange hover:text-white font-display font-black text-xs uppercase tracking-wider border-2 border-essd-cream shadow-[3px_3px_0px_#0A0A0C] transition-all"
              >
                Explore Championship Rounds
                <Icons.ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>

          <p className="max-w-3xl text-sm sm:text-base text-essd-cream-muted leading-relaxed">
            Individual student debaters from eligible Enugu Town and Enugu Central secondary schools compete through three Day 1 rounds. The top 20 advance to two Grand Finale rounds, followed by The Finals on an on-the-spot motion.
          </p>

        </div>
      </section>

      {/* 4. How It Works Timeline */}
      <HowItWorks />

      {/* 5. Prizes & Opportunities Showcase */}
      <PrizeShowcase prizes={prizes} />

      {/* 6. Frequently Asked Questions */}
      <FAQSection />

      {/* 7. Call To Action Banner */}
      <section className="relative halftone-bg py-16 sm:py-20 border-t-8 border-essd-black text-essd-black overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-block bg-essd-black text-essd-cream px-4 py-1 font-mono text-xs font-black uppercase tracking-widest border-2 border-essd-cream shadow-[3px_3px_0px_#0A0A0C]">
            Enugu State Senior Secondary Schools
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-black font-display uppercase tracking-wide text-essd-black leading-none text-shadow-hard">
            ARE YOU READY TO <br />
            <span className="text-essd-orange bg-essd-black px-4 py-1 inline-block mt-2 border-4 border-essd-cream rotate-[-1deg]">
              TAKE THE STAGE?
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base font-bold text-essd-black/90 font-sans">
            Represent your school as an individual competitor, compete with 80+ debaters from Enugu Town and Enugu Central, and claim the ultimate championship honors.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-essd-black text-essd-gold hover:bg-essd-orange hover:text-white font-display text-base font-black uppercase tracking-wider border-4 border-essd-cream shadow-[6px_6px_0px_#0A0A0C] hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <Icons.Sparkles className="w-5 h-5 mr-2 text-essd-gold" />
              Register as a Debater
            </Link>

            <Link
              href="/championship"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 bg-essd-cream text-essd-black hover:bg-essd-gold font-display text-base font-black uppercase tracking-wider border-4 border-essd-black shadow-[6px_6px_0px_#0A0A0C] transition-all"
            >
              View Championship Format
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
