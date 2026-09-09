import Link from "next/link";
import Image from "next/image";
import { Brain, Sparkles, BookOpen, Shield, Target, Award, ArrowRight, Lightbulb, Users, Compass } from "lucide-react";

export const metadata = {
  title: "About ESSD 2026 | Beyond the Algorithm",
  description: "Learn about the mission, pedagogical philosophy, and vision behind the Enugu State Secondary Schools Debate Championship.",
};

export default function AboutPage() {
  const pillars = [
    {
      title: "Education & Pedagogy",
      desc: "Examining how adaptive algorithms, personalized tutoring, and automated assessment fundamentally alter secondary school classrooms.",
      icon: BookOpen,
      color: "border-essd-gold",
    },
    {
      title: "Human Intelligence vs AI",
      desc: "Distinguishing the irreplaceable moral, emotional, and creative sovereignty of human reason from algorithmic computation.",
      icon: Brain,
      color: "border-essd-orange",
    },
    {
      title: "Critical Thinking & Originality",
      desc: "Protecting deep independent research and intellectual rigor against the risks of cognitive passivity and synthetic content generation.",
      icon: Lightbulb,
      color: "border-essd-gold",
    },
    {
      title: "Ethical & Societal Equity",
      desc: "Debating the digital divide across Nigerian urban and rural communities, algorithmic bias, and the sovereignty of indigenous African knowledge.",
      icon: Compass,
      color: "border-essd-orange",
    },
  ];

  return (
    <div className="w-full bg-essd-black text-essd-cream">
      {/* Header Banner */}
      <section className="relative halftone-bg py-16 sm:py-20 border-b-4 border-essd-black text-essd-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-essd-black text-essd-gold font-mono text-xs font-black uppercase px-3 py-1 border-2 border-essd-cream shadow-[3px_3px_0px_#0A0A0C] mb-4">
              Championship Manifesto
            </span>
            <h1 className="text-4xl sm:text-6xl font-black font-display uppercase tracking-tight text-essd-black leading-none text-shadow-hard">
              BEYOND THE <br />
              <span className="text-essd-orange bg-essd-black px-3 py-1 inline-block mt-2 border-3 border-essd-cream">
                ALGORITHM
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg font-bold text-essd-black/90 font-sans leading-relaxed">
              Reimagining Education, Human Agency, and Critical Reasoning in the Age of Artificial Intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* Main Philosophy & Manifesto */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono font-black uppercase tracking-widest text-essd-gold bg-essd-gold/10 px-3 py-1 border border-essd-gold inline-block">
              The Defining Question of Our Generation
            </span>

            <h2 className="text-3xl sm:text-4xl font-black font-display uppercase text-essd-cream tracking-tight leading-tight">
              HOW SHOULD EDUCATION EVOLVE WHEN ALGORITHMS LEARN FASTER THAN CURRICULA?
            </h2>

            <div className="p-5 bg-essd-charcoal border-l-4 border-essd-orange space-y-2 text-sm text-essd-cream-muted leading-relaxed font-sans">
              <p className="italic text-essd-cream font-medium">
                “Artificial intelligence is not merely a tool in the classroom; it is a profound epistemological shift that challenges how human beings think, construct arguments, and discover truth.”
              </p>
            </div>

            <p className="text-sm sm:text-base text-essd-cream-muted leading-relaxed font-sans">
              The Enugu State Secondary Schools Debate Championship (ESSD) is established to give secondary school students an uncompromising intellectual platform to confront this urgent challenge. Rather than superficial discourse on gadget usage, ESSD demands rigorous philosophical, economic, and ethical dissection of AI’s systemic impact on education.
            </p>

            <p className="text-sm text-essd-cream-muted leading-relaxed font-sans">
              Secondary school scholars from across all 17 LGAs of Enugu State will sharpen their reasoning, defend evidence-backed motions under strict international WSDC timing, and prove that authentic human intellect remains the ultimate sovereign in modern society.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-6 py-3 bg-essd-gold text-essd-black font-display font-black text-sm uppercase tracking-wider border-2 border-essd-cream shadow-[4px_4px_0px_#0A0A0C] hover:bg-essd-orange hover:text-white transition-all"
              >
                Register Your School
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/championship"
                className="inline-flex items-center justify-center px-6 py-3 bg-essd-dark text-essd-cream hover:text-essd-gold font-mono font-bold text-xs uppercase border border-essd-border"
              >
                View Tournament Fixtures
              </Link>
            </div>
          </div>

          {/* Visual Poster Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-3 bg-essd-charcoal border-4 border-essd-gold shadow-[10px_10px_0px_#0A0A0C] rotate-[1deg]">
              <div className="w-72 sm:w-80 h-96 relative overflow-hidden bg-essd-dark">
                <Image
                  src="/images/essd-poster.jpg"
                  alt="ESSD Official Poster"
                  fill
                  className="object-cover contrast-110"
                />
              </div>
              <div className="mt-3 p-2 bg-essd-black border border-essd-border text-center">
                <span className="text-[11px] font-mono font-bold text-essd-gold uppercase block">
                  Official ESSD 2026 Poster Artwork
                </span>
                <span className="text-[10px] font-mono text-essd-cream-muted">
                  16th &amp; 17th October 2026 • Enugu Secretariat
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section className="py-16 bg-essd-charcoal border-y border-essd-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase text-essd-orange tracking-widest block mb-2">
              Debate Focus Areas
            </span>
            <h3 className="text-2xl sm:text-4xl font-black font-display uppercase text-essd-cream">
              FOUR PILLARS OF DISCOURSE
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 bg-essd-black border-2 ${p.color} shadow-[4px_4px_0px_#0A0A0C] space-y-3`}
                >
                  <div className="p-3 bg-essd-dark w-fit border border-essd-border text-essd-gold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-black font-display uppercase text-essd-cream tracking-wide">
                    {p.title}
                  </h4>
                  <p className="text-xs text-essd-cream-muted leading-relaxed font-sans">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Event Details & Organizer Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 bg-essd-charcoal border-2 border-essd-border space-y-3">
            <span className="text-xs font-mono font-bold text-essd-gold uppercase block">
              Organizer &amp; Host
            </span>
            <h4 className="text-lg font-black font-display uppercase text-essd-cream">
              The Placee Consults
            </h4>
            <p className="text-xs text-essd-cream-muted leading-relaxed font-sans">
              In strategic partnership with secondary schools, educational administrators, and policy advocates across Enugu State.
            </p>
          </div>

          <div className="p-6 bg-essd-charcoal border-2 border-essd-border space-y-3">
            <span className="text-xs font-mono font-bold text-essd-orange uppercase block">
              Championship Venue
            </span>
            <h4 className="text-lg font-black font-display uppercase text-essd-cream">
              Main Secretariat Auditorium
            </h4>
            <p className="text-xs text-essd-cream-muted leading-relaxed font-sans">
              Enugu State Secretariat Complex, Independence Layout, Enugu. World-class acoustic stage with state-wide live broadcast.
            </p>
          </div>

          <div className="p-6 bg-essd-charcoal border-2 border-essd-border space-y-3">
            <span className="text-xs font-mono font-bold text-essd-gold uppercase block">
              Adjudication Protocol
            </span>
            <h4 className="text-lg font-black font-display uppercase text-essd-cream">
              WSDC Global Standards
            </h4>
            <p className="text-xs text-essd-cream-muted leading-relaxed font-sans">
              Impartial adjudicators evaluating Matter (40%), Manner (40%), and Method (20%), ensuring transparent and rigorous results.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
