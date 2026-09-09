"use client";

import { useState } from "react";
import { Icons } from "@/components/icons";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Which secondary schools are eligible to register for ESSD 2026?",
      a: "All accredited public, private, mission/faith-based, and federal unity secondary schools situated across all 17 Local Government Areas of Enugu State are eligible. Each school registers an official delegation comprising exactly 2 student debaters (Speaker 1 and Speaker 2, with one selected as team captain) and 1 supervising teacher coordinator.",
    },
    {
      q: "What is the official debate format and timing standard?",
      a: "ESSD 2026 adheres to the World Schools Debating Championship (WSDC) format. Each round features structured substantive speeches from Proposition and Opposition speakers, followed by reply speeches, with Points of Information (POIs) accepted during the designated speech windows.",
    },
    {
      q: "How are tournament motions selected and announced?",
      a: "All motions are curated around the core theme 'Beyond the Algorithm: Reimagining Education in the Age of AI'. Prepared motions for the Round of 16 are published 2 weeks prior to the event. Impromptu motions for Semi-Finals and Finals will be released with 1 hour of supervised preparation time.",
    },
    {
      q: "Where and when will the championship take place?",
      a: "The tournament takes place on 16th & 17th October 2026 at the Main Auditorium, Enugu State Secretariat Complex, Independence Layout, Enugu. Accreditation starts at 08:00 AM on Day 1.",
    },
    {
      q: "What happens after our school submits the registration form?",
      a: "Upon submission, your school receives an immediate unique Registration ID (e.g. ESSD-2026-EN-XXXX), a downloadable printable official accreditation slip with QR code, and a confirmation email. The secretariat will follow up with debate guidebooks and tournament logistics.",
    },
    {
      q: "How can corporate sponsors or partners get involved?",
      a: "Sponsorship and partnership inquiries are warmly welcomed. Please contact the tournament secretariat directly at +234 903 829 6513 or email theplaceeconsults@gmail.com.",
    },
  ];

  return (
    <section id="faq" className="relative bg-essd-black text-essd-cream py-16 sm:py-24 border-b border-essd-border overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-essd-gold bg-essd-gold/10 px-3 py-1 border border-essd-gold inline-block mb-3">
            <Icons.HelpCircle className="w-3.5 h-3.5 inline mr-1" />
            Knowledge Base
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-essd-cream">
            FREQUENTLY ASKED <span className="text-essd-gold">QUESTIONS</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-essd-cream-muted font-sans">
            Everything you need to know about the Enugu State Secondary Schools Debate Championship.
          </p>
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-essd-charcoal border-2 border-essd-border overflow-hidden transition-colors"
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
        <div className="mt-12 p-6 bg-essd-dark border-2 border-essd-border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold uppercase font-display text-essd-cream">
              Still have questions about ESSD 2026?
            </h4>
            <p className="text-xs text-essd-cream-muted mt-0.5">
              Our championship secretariat is available to assist your school.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+2349038296513"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-essd-gold text-essd-black font-mono font-bold text-xs uppercase"
            >
              <Icons.Phone className="w-3.5 h-3.5" />
              Call Secretariat
            </a>
            <a
              href="mailto:theplaceeconsults@gmail.com"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-essd-charcoal text-essd-cream hover:text-essd-gold border border-essd-border font-mono font-bold text-xs uppercase"
            >
              <Icons.Mail className="w-3.5 h-3.5" />
              Email Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
