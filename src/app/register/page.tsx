import RegistrationForm from "@/components/registration-form";
import { Sparkles, Trophy, Calendar, MapPin, CheckCircle, ShieldCheck, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Register Your School | ESSD 2026",
  description: "Official school delegation registration portal for the Enugu State Secondary Schools Debate Championship 2026.",
};

export default function RegisterPage() {
  const steps = [
    "Complete School Profile & Contact details",
    "Designate Debate Team Captain & 3-4 Debaters",
    "Assign Supervising Teacher / Patron Coordinator",
    "Submit to receive instant Registration ID & Accreditation Pass",
  ];

  return (
    <div className="w-full bg-essd-black text-essd-cream min-h-screen">
      
      {/* Banner */}
      <section className="relative halftone-bg py-12 sm:py-16 border-b-4 border-essd-black text-essd-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-essd-black text-essd-gold font-mono text-xs font-black uppercase px-3 py-1 border-2 border-essd-cream shadow-[3px_3px_0px_#0A0A0C] mb-3">
              Official Entry Portal
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight text-essd-black leading-none text-shadow-hard">
              REGISTER YOUR <br />
              <span className="text-essd-orange bg-essd-black px-3 py-1 inline-block mt-1 border-3 border-essd-cream">
                SECONDARY SCHOOL
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base font-bold text-essd-black/90 font-sans">
              Enter your student debate squad for the 2026 Enugu State Championship.
            </p>
          </div>
        </div>
      </section>

      {/* Main Registration Area */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Guidelines & Tournament Info */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Essential Details Box */}
            <div className="p-6 bg-essd-charcoal border-2 border-essd-gold shadow-[4px_4px_0px_#0A0A0C] space-y-4">
              <span className="text-xs font-mono font-black uppercase tracking-wider text-essd-gold flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-essd-gold" />
                Tournament Overview
              </span>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-essd-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-essd-cream block">16th &amp; 17th October 2026</span>
                    <span className="text-essd-cream-muted text-[10px]">Two-Day Championship</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-essd-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-essd-cream block">Enugu State Secretariat Complex</span>
                    <span className="text-essd-cream-muted text-[10px]">Main Auditorium, Independence Layout</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-essd-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-essd-cream block">WSDC Debate Standard</span>
                    <span className="text-essd-cream-muted text-[10px]">3 Debaters + 1 Captain + Coordinator</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="p-6 bg-essd-charcoal border-2 border-essd-border shadow-[4px_4px_0px_#0A0A0C] space-y-3">
              <h4 className="text-sm font-black font-display uppercase text-essd-cream">
                Registration Checklist
              </h4>
              <ul className="space-y-2 text-xs font-mono text-essd-cream-muted">
                {steps.map((st, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-essd-gold mt-0.5 flex-shrink-0" />
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Secretariat Support Card */}
            <div className="p-5 bg-essd-dark/80 border border-essd-border space-y-2 text-xs font-mono">
              <span className="text-essd-orange font-bold uppercase block text-[11px]">
                Registration Helpline
              </span>
              <p className="text-essd-cream-muted">
                Experiencing difficulties registering your institution? Reach the tournament desk directly:
              </p>
              <div className="pt-2 space-y-1">
                <a
                  href="tel:+2349038296513"
                  className="flex items-center gap-2 text-essd-cream font-bold hover:text-essd-gold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-essd-gold" />
                  +234 903 829 6513
                </a>
                <a
                  href="mailto:theplaceeconsults@gmail.com"
                  className="flex items-center gap-2 text-essd-cream font-bold hover:text-essd-gold transition-colors break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-essd-gold" />
                  theplaceeconsults@gmail.com
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Registration Form */}
          <div className="lg:col-span-8">
            <RegistrationForm />
          </div>

        </div>
      </section>

    </div>
  );
}
