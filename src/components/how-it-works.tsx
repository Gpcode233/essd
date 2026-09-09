import Link from "next/link";
import { Icons } from "@/components/icons";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "REGISTER",
      subtitle: "Schools Enter Roster",
      description: "Secondary schools across Enugu State register their official delegation (2 debaters with designated captain, and 1 teacher coordinator).",
      icon: Icons.User,
      highlight: "Online Registration Portal",
    },
    {
      step: "02",
      title: "QUALIFY",
      subtitle: "Seeding & Group Draw",
      description: "Accredited schools enter the official state championship draw and receive their Round of 16 tournament bracket seedings and motions.",
      icon: Icons.Shuffle,
      highlight: "16-School Knockout Draw",
    },
    {
      step: "03",
      title: "DEBATE",
      subtitle: "Live State Battles",
      description: "Squads lock horns at the Enugu State Secretariat Auditorium under strict WSDC rules (Matter, Manner, Method, Cross-Examination).",
      icon: Icons.Mic,
      highlight: "16th & 17th Oct 2026",
    },
    {
      step: "04",
      title: "ADVANCE",
      subtitle: "Knockout Progression",
      description: "Winners of each round advance automatically through Quarter-Finals and Semi-Finals on the live tournament digital bracket.",
      icon: Icons.TrendingUp,
      highlight: "Real-time Bracket Updates",
    },
    {
      step: "05",
      title: "CHAMPION",
      subtitle: "The Grand Coronation",
      description: "The supreme finalists clash in the Grand Final. The champion claims international scholarships, millions in cash, and the Gold Trophy.",
      icon: Icons.Trophy,
      highlight: "Scholarship & Gold Trophy",
    },
  ];

  return (
    <section className="relative bg-essd-black text-essd-cream py-16 sm:py-24 border-b border-essd-border overflow-hidden">
      {/* Halftone subtle background texture */}
      <div className="absolute inset-0 halftone-dark opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono font-black uppercase tracking-widest text-essd-orange bg-essd-orange/10 px-3.5 py-1 border border-essd-orange inline-block mb-3 rounded-full">
              Championship Roadmap
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-wide text-essd-cream">
              HOW THE TOURNAMENT <br />
              <span className="text-essd-gold">UNFOLDS</span>
            </h2>
          </div>
          <div className="max-w-md text-xs sm:text-sm text-essd-cream-muted leading-relaxed font-sans">
            From official registration to the grand coronation, follow the connected pathway that tests every argument, speech, and rebuttal.
          </div>
        </div>

        {/* Connected Timeline / Path Visual */}
        <div className="relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-essd-gold via-essd-orange to-essd-gold -translate-y-8 z-0 opacity-60"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              const isLast = idx === steps.length - 1;
              return (
                <div
                  key={idx}
                  className={`relative p-6 border-2 transition-all duration-200 shadow-[4px_4px_0px_#0A0A0C] hover:-translate-y-2 flex flex-col justify-between rounded-2xl ${
                    isLast
                      ? "bg-gradient-to-b from-essd-charcoal to-essd-black border-essd-gold shadow-[6px_6px_0px_#E8A927]"
                      : "bg-essd-charcoal border-essd-border hover:border-essd-orange"
                  }`}
                >
                  {/* Step Number Tag */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-2xl font-black font-display ${isLast ? "text-essd-gold" : "text-essd-orange"}`}>
                        {item.step}
                      </span>
                      <div className={`p-2.5 rounded-full border ${isLast ? "bg-essd-gold text-essd-black border-essd-cream" : "bg-essd-black text-essd-gold border-essd-border"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-black font-display uppercase text-essd-cream tracking-wide">
                      {item.title}
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-essd-gold block mb-2">
                      {item.subtitle}
                    </span>

                    <p className="text-xs text-essd-cream-muted leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-essd-border/60 flex items-center gap-1.5 text-[10px] font-mono text-essd-cream font-bold">
                    <Icons.CheckCircle className="w-3.5 h-3.5 text-essd-gold" />
                    <span>{item.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* CTA Bar below timeline */}
        <div className="mt-14 p-6 sm:p-8 bg-essd-dark border-3 border-essd-gold flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[6px_6px_0px_#0A0A0C] rounded-2xl">
          <div>
            <h4 className="text-lg sm:text-xl font-black font-display uppercase text-essd-cream">
              Ready to Represent Your Secondary School?
            </h4>
            <p className="text-xs sm:text-sm text-essd-cream-muted mt-1 font-sans">
              Registration is currently open for secondary schools across all 17 LGAs of Enugu State.
            </p>
          </div>
          <Link
            href="/register"
            className="flex-shrink-0 inline-flex items-center justify-center px-6 py-3 bg-essd-gold text-essd-black font-display font-black text-sm uppercase tracking-wider border-2 border-essd-cream shadow-[3px_3px_0px_#0A0A0C] hover:bg-essd-orange hover:text-white transition-colors rounded-xl"
          >
            Register Team Today
            <Icons.ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

      </div>
    </section>
  );
}
