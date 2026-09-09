"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/components/icons";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date: October 16, 2026 09:00 AM WAT
    const targetDate = new Date("2026-10-16T09:00:00+01:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-essd-black text-essd-black">
      {/* Massive Poster Art Canvas */}
      <div className="relative w-full halftone-bg py-12 md:py-20 lg:py-24 border-b-8 border-essd-black px-4 sm:px-6 lg:px-8">
        
        {/* Subtle decorative geometric stamps */}
        <div className="absolute top-6 left-6 hidden sm:flex items-center gap-2 bg-essd-black text-essd-cream px-4 py-1.5 font-mono text-xs uppercase font-bold border-2 border-essd-cream rounded-full shadow-[3px_3px_0px_rgba(0,0,0,0.5)] rotate-[-2deg]">
          <Icons.Shield className="w-3.5 h-3.5 text-essd-gold" />
          <span>Official State Championship</span>
        </div>

        <div className="absolute top-6 right-6 hidden sm:flex items-center gap-2 bg-essd-orange text-white px-4 py-1.5 font-mono text-xs uppercase font-bold border-2 border-essd-black rounded-full shadow-[3px_3px_0px_#0A0A0C] rotate-[2deg]">
          <Icons.Mic className="w-3.5 h-3.5" />
          <span>16 Elite Secondary Schools</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header presenter line */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-block relative">
              {/* Circular ESSD Logo Badge at Top of Poster */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 rounded-full bg-essd-black border-3 border-essd-gold p-0.5 shadow-2xl flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/essd-logo.jpg"
                  alt="Enugu State Secondary Schools Debate Championship Official Logo"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
              </div>
              <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] font-black text-essd-black/80">
                The Placee Consults &amp; Partners Presents
              </p>
              <h2 className="text-sm sm:text-xl md:text-2xl font-black font-display tracking-wider text-essd-black uppercase mt-0.5">
                Enugu State Secondary Schools
              </h2>
            </div>
          </div>

          {/* Central Visual Composition: Layered Debaters + Massive Poster Typography */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-6 lg:my-10">
            
            {/* Left Debater Cutout Poster (Male Debater) */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative group">
                {/* Paper-cut sticker container */}
                <div className="relative bg-essd-black p-2 border-4 border-essd-cream rounded-2xl shadow-[8px_8px_0px_#0A0A0C] rotate-[-2deg] transition-transform duration-300 hover:rotate-0 hover:scale-105">
                  <div className="w-56 sm:w-64 h-72 sm:h-80 relative overflow-hidden rounded-xl bg-gradient-to-t from-essd-black via-essd-charcoal to-essd-dark">
                    <Image
                      src="/images/essd-poster.jpg"
                      alt="Championship Debater"
                      fill
                      className="object-cover object-top filter contrast-125 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-essd-black via-transparent to-transparent opacity-80"></div>
                  </div>
                  {/* Sticker Caption */}
                  <div className="absolute bottom-4 left-4 right-4 bg-essd-gold text-essd-black px-3 py-1 font-mono text-xs font-black uppercase text-center rounded-lg border-2 border-essd-black shadow-sm">
                    Speaker 1 • Lead Debater
                  </div>
                </div>
              </div>
            </div>

            {/* Center Massive Headline & Event Theme */}
            <div className="lg:col-span-6 text-center order-1 lg:order-2 space-y-4 sm:space-y-6">
              
              {/* Massive DEBATE CHAMPIONSHIP Typography */}
              <div className="relative py-2 select-none">
                {/* Big Black "DEBATE" Background Word */}
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display tracking-wider text-essd-black uppercase leading-[0.85] text-shadow-hard">
                  DEBATE
                </h1>

                {/* Layered Cursive Script "Debate" overlapping */}
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-essd-cream tracking-wide rotate-[-8deg] pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] font-sans italic opacity-95">
                  Debate
                </span>

                {/* Orange CHAMPIONSHIP banner */}
                <div className="mt-2 sm:mt-3">
                  <span className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-wider text-essd-orange uppercase bg-essd-black px-5 py-2 rounded-xl border-3 border-essd-cream shadow-[5px_5px_0px_#0A0A0C] rotate-[1deg]">
                    CHAMPIONSHIP
                  </span>
                </div>
              </div>

              {/* Theme Block */}
              <div className="max-w-xl mx-auto bg-essd-black text-essd-cream p-5 sm:p-6 rounded-2xl border-4 border-essd-cream shadow-[6px_6px_0px_#0A0A0C] relative">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-essd-gold text-essd-black font-mono text-xs font-black uppercase px-4 py-0.5 rounded-full border-2 border-essd-black shadow-sm">
                  Official 2026 Theme
                </div>
                
                <h3 className="text-lg sm:text-2xl md:text-3xl font-black font-display uppercase tracking-wide text-essd-gold mt-1 leading-snug">
                  “Beyond the Algorithm: <span className="text-essd-orange">Reimagining Education</span> in the Age of AI”
                </h3>
                
                <p className="mt-3 text-xs sm:text-sm text-essd-cream-muted leading-relaxed font-sans">
                  Where brilliant young minds challenge ideas, sharpen their reasoning, and debate the future of education in an AI-driven world.
                </p>
              </div>

              {/* Event Dates & Venue Stamps (Rounded rectangles matching flyer) */}
              <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3">
                <div className="bg-essd-black text-essd-cream px-5 py-2.5 rounded-2xl border-3 border-essd-gold shadow-[4px_4px_0px_#0A0A0C] flex items-center gap-3">
                  <Icons.Calendar className="w-5 h-5 text-essd-gold flex-shrink-0" />
                  <div className="text-left">
                    <span className="text-[10px] font-mono uppercase font-bold text-essd-gold block">
                      Official Date
                    </span>
                    <span className="text-sm sm:text-base font-black font-display tracking-wide uppercase">
                      16th &amp; 17th October 2026
                    </span>
                  </div>
                </div>

                <div className="bg-essd-black text-essd-cream px-5 py-2.5 rounded-2xl border-3 border-essd-orange shadow-[4px_4px_0px_#0A0A0C] flex items-center gap-2.5">
                  <Icons.Location className="w-5 h-5 text-essd-orange flex-shrink-0" />
                  <div className="text-left">
                    <span className="text-[10px] font-mono uppercase font-bold text-essd-orange block">
                      Venue
                    </span>
                    <span className="text-xs sm:text-sm font-bold font-mono uppercase">
                      Enugu State Secretariat
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  href="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-essd-black text-essd-gold hover:bg-essd-orange hover:text-white font-display text-base font-black uppercase tracking-wider rounded-xl border-4 border-essd-cream shadow-[6px_6px_0px_#0A0A0C] hover:shadow-[2px_2px_0px_#0A0A0C] hover:translate-x-1 hover:translate-y-1 transition-all group"
                >
                  <Icons.Sparkles className="w-5 h-5 mr-2 text-essd-gold group-hover:text-white transition-transform" />
                  Register Your School
                  <Icons.ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/championship"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 bg-essd-cream text-essd-black hover:bg-essd-gold font-display text-base font-black uppercase tracking-wider rounded-xl border-4 border-essd-black shadow-[6px_6px_0px_#0A0A0C] hover:shadow-[2px_2px_0px_#0A0A0C] hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <Icons.Trophy className="w-5 h-5 mr-2 text-essd-orange" />
                  View Championship
                </Link>
              </div>

              {/* Secretariat Hotline bar */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 bg-essd-black/90 text-essd-cream-muted px-5 py-2 rounded-full text-xs font-mono border border-essd-black shadow-sm">
                  <span>For enquiries &amp; sponsorship:</span>
                  <a
                    href="tel:+2349038296513"
                    className="text-essd-gold font-bold hover:underline"
                  >
                    +234 903 829 6513
                  </a>
                  <span>|</span>
                  <a
                    href="mailto:theplaceeconsults@gmail.com"
                    className="text-essd-orange font-bold hover:underline"
                  >
                    theplaceeconsults@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right Debater Cutout Poster (Female Debater with glasses) */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end order-3">
              <div className="relative group">
                {/* Paper-cut sticker container */}
                <div className="relative bg-essd-black p-2 border-4 border-essd-cream rounded-2xl shadow-[8px_8px_0px_#0A0A0C] rotate-[2deg] transition-transform duration-300 hover:rotate-0 hover:scale-105">
                  <div className="w-56 sm:w-64 h-72 sm:h-80 relative overflow-hidden rounded-xl bg-gradient-to-t from-essd-black via-essd-charcoal to-essd-dark">
                    <Image
                      src="/images/essd-poster.jpg"
                      alt="Student Debater Presentation"
                      fill
                      className="object-cover object-right scale-110 filter contrast-125"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-essd-black/90 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <span className="inline-block bg-essd-orange text-white font-mono text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase mb-1">
                        Manner &amp; Method
                      </span>
                      <p className="text-xs font-bold text-essd-cream font-mono">
                        Opposition Speaker
                      </p>
                    </div>
                  </div>
                </div>
                {/* Visual Stamp Badge */}
                <div className="absolute -bottom-3 -left-3 bg-essd-gold text-essd-black font-mono text-[10px] font-black uppercase px-3 py-1 rounded-full border-2 border-essd-black shadow-[2px_2px_0px_#0A0A0C] rotate-[-4deg]">
                  Top Adjudicator
                </div>
              </div>
            </div>

          </div>

          {/* Live Tournament Countdown Timer Bar */}
          <div className="mt-8 pt-8 border-t-2 border-essd-black/30">
            <div className="max-w-3xl mx-auto bg-essd-black text-essd-cream p-4 sm:p-6 rounded-2xl border-3 border-essd-cream shadow-[6px_6px_0px_#0A0A0C]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <div className="inline-flex items-center gap-2 text-essd-orange font-mono text-xs font-black uppercase tracking-wider">
                    <span className="h-2.5 w-2.5 rounded-full bg-essd-orange animate-pulse"></span>
                    Championship Countdown
                  </div>
                  <h4 className="text-sm sm:text-base font-bold font-display uppercase text-essd-gold">
                    Tournament Commences In:
                  </h4>
                </div>

                <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                  <div className="bg-essd-charcoal px-3 py-2 rounded-xl border border-essd-border min-w-[58px]">
                    <span className="block text-xl sm:text-2xl font-black font-mono text-essd-gold">
                      {timeLeft.days}
                    </span>
                    <span className="text-[9px] font-mono text-essd-cream-muted uppercase">
                      Days
                    </span>
                  </div>
                  <div className="bg-essd-charcoal px-3 py-2 rounded-xl border border-essd-border min-w-[58px]">
                    <span className="block text-xl sm:text-2xl font-black font-mono text-essd-cream">
                      {timeLeft.hours}
                    </span>
                    <span className="text-[9px] font-mono text-essd-cream-muted uppercase">
                      Hours
                    </span>
                  </div>
                  <div className="bg-essd-charcoal px-3 py-2 rounded-xl border border-essd-border min-w-[58px]">
                    <span className="block text-xl sm:text-2xl font-black font-mono text-essd-cream">
                      {timeLeft.minutes}
                    </span>
                    <span className="text-[9px] font-mono text-essd-cream-muted uppercase">
                      Mins
                    </span>
                  </div>
                  <div className="bg-essd-charcoal px-3 py-2 rounded-xl border border-essd-border min-w-[58px]">
                    <span className="block text-xl sm:text-2xl font-black font-mono text-essd-orange">
                      {timeLeft.seconds}
                    </span>
                    <span className="text-[9px] font-mono text-essd-cream-muted uppercase">
                      Secs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
