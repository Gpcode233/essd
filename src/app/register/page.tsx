import RegistrationForm from "@/components/registration-form";
import { Icons } from "@/components/icons";

export const metadata = {
  title: "Register Debater | ESSD 2026",
  description: "Official competitor registration portal for the Enugu State Secondary Schools Debate Championship 2026.",
};

export default function RegisterPage() {
  const steps = [
    "Enter Student Competitor profile (SS1 - SS3)",
    "Select Secondary School in Enugu Town / Central",
    "Provide Parent / Guardian & Teacher contacts",
    "Select 3 Day 1 Motions & 2 Grand Finale Motions",
    "Submit to receive instant Debater Accreditation Pass",
  ];

  return (
    <div className="w-full bg-essd-black text-essd-cream min-h-screen">
      
      {/* Banner */}
      <section className="relative halftone-bg py-12 sm:py-16 border-b-4 border-essd-black text-essd-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-essd-black text-essd-gold font-mono text-xs font-black uppercase px-3.5 py-1 border-2 border-essd-cream shadow-[3px_3px_0px_#0A0A0C] mb-3 rounded-full">
              Official Entry Portal
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-wide text-essd-black leading-none text-shadow-hard">
              REGISTER COMPETITOR <br />
              <span className="text-essd-orange bg-essd-black px-3.5 py-1 inline-block mt-1 border-3 border-essd-cream rounded-xl">
                ENUGU CENTRAL SCHOOLS
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base font-bold text-essd-black/90 font-sans">
              Enter individual student debaters representing secondary schools across Enugu Town / Enugu Central.
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
            <div className="p-6 bg-essd-charcoal border-2 border-essd-gold shadow-[4px_4px_0px_#0A0A0C] space-y-4 rounded-2xl">
              <span className="text-xs font-mono font-black uppercase tracking-wider text-essd-gold flex items-center gap-1.5">
                <Icons.Trophy className="w-4 h-4 text-essd-gold" />
                Tournament Overview
              </span>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-start gap-2.5">
                  <Icons.Calendar className="w-4 h-4 text-essd-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-essd-cream block">16th &amp; 17th October 2026</span>
                    <span className="text-essd-cream-muted text-[10px]">Two-Day Championship</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Icons.Location className="w-4 h-4 text-essd-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-essd-cream block">HOTR Auditorium, Enugu</span>
                    <span className="text-essd-cream-muted text-[10px]">House on the Rock Church, Enugu</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Icons.Shield className="w-4 h-4 text-essd-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-essd-cream block">Individual Debater Format</span>
                    <span className="text-essd-cream-muted text-[10px]">Free Stance • 80+ Debaters • Top 20 to Grand Finale</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Box */}
            <div className="p-6 bg-essd-charcoal border-2 border-essd-border shadow-[4px_4px_0px_#0A0A0C] space-y-3 rounded-2xl">
              <h4 className="text-sm font-black font-display uppercase text-essd-cream">
                Registration Checklist
              </h4>
              <ul className="space-y-2 text-xs font-mono text-essd-cream-muted">
                {steps.map((st, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Icons.CheckCircle className="w-3.5 h-3.5 text-essd-gold mt-0.5 flex-shrink-0" />
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Secretariat Support Card */}
            <div className="p-5 bg-essd-dark/80 border border-essd-border space-y-2 text-xs font-mono rounded-2xl">
              <span className="text-essd-orange font-bold uppercase block text-[11px]">
                Registration Helpline
              </span>
              <p className="text-essd-cream-muted leading-relaxed">
                Need assistance with competitor registration or motion clarification? Contact the Championship Secretariat:
              </p>
              <div className="pt-2 text-essd-cream space-y-1">
                <p>📞 <strong className="text-essd-gold">+234 903 829 6513</strong></p>
                <p>✉️ <strong className="text-essd-gold">theplaceeconsults@gmail.com</strong></p>
              </div>
            </div>

          </div>

          {/* Right Column: Registration Form Component */}
          <div className="lg:col-span-8">
            <RegistrationForm />
          </div>

        </div>
      </section>

    </div>
  );
}
