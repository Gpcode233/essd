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
          <div className="lg:col-span-2 space-y-4">
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
                  Knockout Bracket
                </Link>
              </li>
              <li>
                <Link href="/fixtures" className="text-essd-cream-muted hover:text-essd-gold transition-colors flex items-center gap-1.5">
                  <Icons.ArrowUpRight className="w-3 h-3 text-essd-gold" />
                  Fixtures &amp; Results
                </Link>
              </li>
              <li>
                <Link href="/schools" className="text-essd-cream-muted hover:text-essd-gold transition-colors flex items-center gap-1.5">
                  <Icons.ArrowUpRight className="w-3 h-3 text-essd-gold" />
                  Participating Schools
                </Link>
              </li>
              <li>
                <Link href="/prizes" className="text-essd-cream-muted hover:text-essd-gold transition-colors flex items-center gap-1.5">
                  <Icons.ArrowUpRight className="w-3 h-3 text-essd-gold" />
                  Prizes &amp; Awards
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-essd-orange font-bold hover:underline transition-colors flex items-center gap-1.5">
                  <Icons.ArrowUpRight className="w-3 h-3 text-essd-orange" />
                  Register School
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Secretariat Info */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-black uppercase tracking-widest text-essd-gold flex items-center gap-2">
              <span className="w-2 h-2 bg-essd-orange rounded-full"></span>
              Secretariat &amp; Enquiries
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <Icons.Calendar className="w-4 h-4 text-essd-gold mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-essd-cream font-bold block">16th &amp; 17th October 2026</span>
                  <span className="text-essd-cream-muted text-[11px]">Two-Day Championship Tournament</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icons.Phone className="w-4 h-4 text-essd-orange mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="tel:+2349038296513"
                    className="text-essd-cream font-bold hover:text-essd-gold transition-colors block"
                  >
                    +234 903 829 6513
                  </a>
                  <span className="text-essd-cream-muted text-[11px]">Official Tournament Helpline</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icons.Mail className="w-4 h-4 text-essd-gold mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="mailto:theplaceeconsults@gmail.com"
                    className="text-essd-cream font-bold hover:text-essd-gold transition-colors block break-all"
                  >
                    theplaceeconsults@gmail.com
                  </a>
                  <span className="text-essd-cream-muted text-[11px]">Sponsorship &amp; Official Inquiries</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icons.Location className="w-4 h-4 text-essd-cream-muted mt-0.5 flex-shrink-0" />
                <span className="text-essd-cream-muted text-[11px]">
                  HOTR Auditorium, House on the Rock Church, Enugu, Enugu State, Nigeria
                </span>
              </div>
            </div>
          </div>

          {/* Admin & Security Seal */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-black uppercase tracking-widest text-essd-gold flex items-center gap-2">
              <span className="w-2 h-2 bg-essd-gold rounded-full"></span>
              Governance
            </h4>
            <div className="p-3 bg-essd-dark/80 border border-essd-border rounded-2xl text-center space-y-2">
              <Icons.Shield className="w-6 h-6 text-essd-gold mx-auto" />
              <span className="block text-[11px] font-mono font-bold text-essd-cream uppercase">
                Adjudication Standard
              </span>
              <p className="text-[10px] text-essd-cream-muted">
                Governed by World Schools Debating Championship (WSDC) scoring rubrics.
              </p>
              <Link
                href="/admin"
                className="inline-block mt-2 text-[10px] font-mono font-bold text-essd-gold hover:underline"
              >
                Organizer Access →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-essd-cream-muted/60">
          <p>
            &copy; 2026 Enugu State Secondary Schools Debate Championship (ESSD). All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-center sm:text-right">
            <span className="text-essd-gold">Presented by The Placee Educational Consult in collaboration with House on the Rock Church, Enugu</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
