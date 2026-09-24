"use client";

import { useState } from "react";
import { Icons } from "@/components/icons";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Who is eligible to compete in ESSD 2026?",
      a: "Senior secondary school students (SS1 to SS3) representing accredited public, private, mission, and federal unity schools located within Enugu Town and Enugu Central (including Enugu North, Enugu East, Enugu South, and Central urban districts) are eligible. Over 80+ schools are participating.",
    },
    {
      q: "Is registration for individual debaters or teams?",
      a: "Registrations are for individual student debaters representing their secondary school. Each registered student competes individually and selects their preferred motions directly during online registration.",
    },
    {
      q: "Are debaters assigned to fixed Proposition or Opposition sides?",
      a: "No! There are no rigid proposition or opposition team assignments. Debaters are free to select and argue any stance (Proposition or Opposition) on their chosen motions. Scoring is based on dialectical logic, depth of research, rhetorical precision, and rebuttal mastery.",
    },
    {
      q: "How does motion selection work across Day 1 and Day 2?",
      a: "During registration, each debater selects exactly 3 motions from the curated 6-motion pool for Day 1's preliminary and elimination rounds, and 2 motions from the 4-motion pool for the Day 2 Grand Finale. For The Finals (Apex Stage), an impromptu motion is provided on the spot!",
    },
    {
      q: "How many debaters advance to Day 2 (Grand Finale)?",
      a: "Out of 80+ debaters competing on Day 1 across 3 rounds of elimination, exactly 20 debaters will advance to the Grand Finale on Day 2. The Grand Finale further cuts down to Top 10, and then the Top 5 finalists enter The Finals.",
    },
    {
      q: "What prizes and scholarship opportunities are awarded?",
      a: "1st Position receives ₦150k cash prize, gold medal, full tech course scholarship, free international scholarship application & advisory, plus the Gold Championship Trophy for their school. 2nd Position receives ₦100k cash prize, medal, tech scholarship, free int'l scholarship application, and school trophy. 3rd Position receives ₦50k cash prize, medal, tech scholarship, free int'l scholarship application, and school trophy. 4th & 5th Positions receive full tech course scholarships and free international scholarship applications.",
    },
    {
      q: "Where and when will the championship take place?",
      a: "The championship takes place on 16th & 17th October 2026 at HOTR Auditorium, House on the Rock Church, Enugu. Accreditation check-in opens at 8:00 AM on Day 1.",
    },
  ];

  return (
    <section id="faq" className="relative bg-essd-black text-essd-cream py-16 sm:py-24 border-b border-essd-border overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-essd-gold bg-essd-gold/10 px-3.5 py-1 border border-essd-gold inline-block mb-3 rounded-full">
            <Icons.HelpCircle className="w-3.5 h-3.5 inline mr-1" />
            Tournament Knowledge Base
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-wide text-essd-cream">
            FREQUENTLY ASKED <span className="text-essd-gold">QUESTIONS</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-essd-cream-muted font-sans">
            Everything you need to know about individual debater entries, motions, tournament stages, and prizes.
          </p>
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-essd-charcoal border-2 border-essd-border overflow-hidden transition-colors rounded-xl"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-essd-dark/60 transition-colors focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold font-display uppercase text-essd-cream tracking-wide">
                    {faq.q}
                  </span>
                  <Icons.ChevronDown
                    className={`w-5 h-5 text-essd-gold flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-essd-orange" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-essd-cream-muted leading-relaxed font-sans border-t border-essd-border/60 bg-essd-dark/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Strip */}
        <div className="mt-12 p-6 bg-essd-dark border-2 border-essd-border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left rounded-2xl">
          <div>
            <h4 className="text-sm font-bold uppercase font-display text-essd-cream">
              Have further questions about ESSD 2026?
            </h4>
            <p className="text-xs text-essd-cream-muted mt-0.5">
              The championship secretariat is available to assist student debaters and teachers.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+2349038296513"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-essd-gold text-essd-black font-mono font-bold text-xs uppercase rounded-xl hover:bg-essd-orange hover:text-white transition-all"
            >
              <Icons.Phone className="w-3.5 h-3.5" />
              Call Helpline
            </a>
            <a
              href="mailto:theplaceeconsults@gmail.com"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-essd-charcoal border border-essd-border text-essd-cream font-mono font-bold text-xs uppercase rounded-xl hover:border-essd-gold transition-all"
            >
              <Icons.Mail className="w-3.5 h-3.5 text-essd-gold" />
              Email Desk
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
