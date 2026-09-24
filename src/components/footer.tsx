import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="relative bg-essd-black border-t-4 border-essd-gold text-essd-cream overflow-hidden">
      {/* Decorative top halftone strip */}
      <div className="h-3 w-full halftone-bg opacity-70"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-essd-border/80">
          
          {/* Main Brand Block */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              {/* Circular ESSD Badge in Footer */}
              <div className="w-14 h-14 rounded-full bg-essd-black border-2 border-essd-gold overflow-hidden flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(232,169,39,0.3)]">
                <Image
                  src="/images/essd-logo.jpg"
                  alt="Enugu State Secondary Schools Debate Championship Logo"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div>
                <span className="block text-[11px] font-mono font-bold tracking-widest text-essd-gold uppercase">
                  Official State Tournament
                </span>
                <h3 className="text-lg font-black tracking-tight text-essd-cream uppercase font-display leading-tight">
                  Enugu State Secondary Schools Debate Championship
                </h3>
              </div>
            </div>

            <div className="p-4 bg-essd-charcoal border-l-4 border-essd-orange text-xs text-essd-cream-muted leading-relaxed rounded-2xl">
              <span className="font-bold text-essd-orange block font-mono text-[11px] uppercase mb-1">
                Event Theme:
              </span>
              <p className="italic text-essd-cream font-medium">
                “Beyond the Algorithm: Reimagining Education in the Age of AI”
              </p>
            </div>

            <p className="text-xs text-essd-cream-muted/80 leading-relaxed">
              The premier intellectual battleground for senior secondary school students across Enugu State. Fostering critical thinking, ethical reasoning, and high-impact oratory on the future of learning.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-black uppercase tracking-widest text-essd-gold flex items-center gap-2">
              <span className="w-2 h-2 bg-essd-gold rounded-full"></span>
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/" className="text-essd-cream-muted hover:text-essd-gold transition-colors flex items-center gap-1.5">
                  <Icons.ArrowUpRight className="w-3 h-3 text-essd-gold" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-essd-cream-muted hover:text-essd-gold transition-colors flex items-center gap-1.5">
                  <Icons.ArrowUpRight className="w-3 h-3 text-essd-gold" />
                  About Championship
                </Link>
              </li>
              <li>
                <Link href="/championship" className="text-essd-cream-muted hover:text-essd-gold transition-colors flex items-center gap-1.5">
                  <Icons.ArrowUpRight className="w-3 h-3 text-essd-gold" />
                  Championship Rounds &amp; Motions
                </Link>
              </li>
              <li>
                <Link href="/prizes" className="text-essd-cream-muted hover:text-essd-gold transition-colors flex items-center gap-1.5">
                  <Icons.ArrowUpRight className="w-3 h-3 text-essd-gold" />
                  Prizes &amp; Honors
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-essd-cream-muted hover:text-essd-gold transition-colors flex items-center gap-1.5">
                  <Icons.ArrowUpRight className="w-3 h-3 text-essd-gold" />
                  FAQ &amp; Rules
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-essd-orange font-bold hover:underline transition-colors flex items-center gap-1.5">
                  <Icons.ArrowUpRight className="w-3 h-3 text-essd-orange" />
                  Register Debater
                </Link>
              </li>
            </ul>
          </div>

          {/* Tournament Logistics & Venue */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-black uppercase tracking-widest text-essd-gold flex items-center gap-2">
              <span className="w-2 h-2 bg-essd-gold rounded-full"></span>
              Tournament Secretariat
            </h4>

            <div className="space-y-3 text-xs font-mono text-essd-cream-muted">
              <div className="flex items-start gap-2.5">
                <Icons.Location className="w-4 h-4 text-essd-gold mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-essd-cream font-bold block">HOTR Auditorium</span>
                  <span>House on the Rock Church, Enugu, Nigeria</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Icons.Calendar className="w-4 h-4 text-essd-orange mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-essd-cream font-bold block">16th &amp; 17th October 2026</span>
                  <span>Two-Day State Championship Event</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Icons.Phone className="w-4 h-4 text-essd-gold mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+2349038296513" className="hover:text-essd-gold text-essd-cream">
                    +234 903 829 6513
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Icons.Mail className="w-4 h-4 text-essd-orange mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:theplaceeconsults@gmail.com" className="hover:text-essd-gold text-essd-cream">
                    theplaceeconsults@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-essd-cream-muted/60 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Enugu State Secondary Schools Debate Championship (ESSD). Presented by{" "}
            <span className="text-essd-gold font-bold">The Placee Educational Consult</span> in collaboration with{" "}
            <span className="text-essd-cream font-bold">House on the Rock Church, Enugu</span>.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="/privacy" className="hover:text-essd-gold transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-essd-gold transition-colors">
              Tournament Terms
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-essd-gold transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
