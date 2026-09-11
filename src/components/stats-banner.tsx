import { Icons } from "@/components/icons";

export default function StatsBanner() {
  const stats = [
    { number: "16", label: "SCHOOLS", sub: "Elite Senior Teams", icon: Icons.Users, color: "text-essd-gold" },
    { number: "02", label: "DAYS", sub: "16th & 17th Oct 2026", icon: Icons.Calendar, color: "text-essd-orange" },
    { number: "01", label: "CHAMPION", sub: "Gold Trophy & Scholarship", icon: Icons.Trophy, color: "text-essd-gold" },
    { number: "01", label: "STATE-WIDE STAGE", sub: "HOTR Auditorium, Enugu", icon: Icons.Target, color: "text-essd-cream" },
  ];

  const competencies = [
    { name: "Critical Thinking", desc: "Rigorous logical analysis of complex AI policies & educational paradigms", icon: Icons.Brain },
    { name: "Public Speaking", desc: "Commanding poise, eloquent delivery, and persuasion under pressure", icon: Icons.Flame },
    { name: "Deep Research", desc: "Evidence-backed arguments drawing from global and Nigerian pedagogical data", icon: Icons.Lightbulb },
    { name: "Reasoning & Logic", desc: "Dissecting fallacies, crafting resilient rebuttals in real-time", icon: Icons.Compass },
    { name: "Confidence & Poise", desc: "Commanding the podium before state adjudicators and thousands of peers", icon: Icons.Award },
    { name: "Intellectual Curiosity", desc: "Challenging conventional assumptions about technology and human agency", icon: Icons.Sparkles },
  ];

  return (
    <section className="relative bg-essd-black text-essd-cream py-16 sm:py-24 border-b border-essd-border overflow-hidden">
      {/* Subtle background checker */}
      <div className="absolute inset-0 checker-grid opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-essd-gold/10 border border-essd-gold px-3.5 py-1 text-essd-gold font-mono text-xs font-bold uppercase tracking-widest mb-3 rounded-full">
            <Icons.Brain className="w-3.5 h-3.5" />
            Empowering Enugu's Youth
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-wide text-essd-cream leading-tight">
            THE NEXT GENERATION <br className="hidden sm:block" />
            <span className="text-essd-gold underline decoration-essd-orange decoration-4">OF THINKERS</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-essd-cream-muted leading-relaxed">
            ESSD is not just a competition; it is a transformative state-wide platform designed to empower secondary school scholars with the intellectual rigor needed to navigate and lead the artificial intelligence revolution.
          </p>
        </div>

        {/* 4 Massive Editorial Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-essd-charcoal p-6 sm:p-8 border-2 border-essd-border hover:border-essd-gold transition-all duration-200 shadow-[4px_4px_0px_#0A0A0C] hover:shadow-[6px_6px_0px_#E8A927] hover:-translate-y-1 group rounded-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-essd-cream-muted/50 uppercase">
                    Stat // 0{idx + 1}
                  </span>
                  <Icon className={`w-5 h-5 ${item.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                </div>
                <div className={`text-4xl sm:text-6xl font-black font-display ${item.color} leading-none tracking-wide mb-2`}>
                  {item.number}
                </div>
                <div className="text-base sm:text-lg font-black font-display uppercase text-essd-cream tracking-wide">
                  {item.label}
                </div>
                <div className="text-xs font-mono text-essd-cream-muted mt-1">
                  {item.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Core Pillars / Competencies Grid */}
        <div className="pt-8 border-t border-essd-border/80">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-black font-display uppercase text-essd-gold tracking-wide">
              Core Competencies Championed
            </h3>
            <p className="text-xs font-mono text-essd-cream-muted mt-1">
              Cultivating the essential human capabilities that algorithms cannot duplicate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competencies.map((comp, idx) => {
              const Icon = comp.icon;
              return (
                <div
                  key={idx}
                  className="bg-essd-dark/60 border border-essd-border p-5 rounded-2xl hover:bg-essd-charcoal hover:border-essd-orange/60 transition-all flex items-start gap-4"
                >
                  <div className="p-3 bg-essd-black border border-essd-gold/40 text-essd-gold flex-shrink-0 rounded-xl">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold font-display uppercase text-essd-cream tracking-wide">
                      {comp.name}
                    </h4>
                    <p className="text-xs text-essd-cream-muted mt-1 leading-relaxed">
                      {comp.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
