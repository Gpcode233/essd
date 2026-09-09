import { getSafeSchools } from "@/lib/data-service";
import SchoolsClient from "./schools-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Participating Schools Directory | ESSD 2026",
  description: "Explore the 16 elite secondary schools representing Enugu State in the 2026 Debate Championship.",
};

export default async function SchoolsPage() {
  const schools = await getSafeSchools();

  return (
    <div className="w-full bg-essd-black text-essd-cream min-h-screen">
      
      {/* Banner */}
      <section className="relative halftone-bg py-12 sm:py-16 border-b-4 border-essd-black text-essd-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-essd-black text-essd-gold font-mono text-xs font-black uppercase px-3 py-1 border-2 border-essd-cream shadow-[3px_3px_0px_#0A0A0C] mb-3">
              Official Team Directory
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight text-essd-black leading-none text-shadow-hard">
              PARTICIPATING <br />
              <span className="text-essd-orange bg-essd-black px-3 py-1 inline-block mt-1 border-3 border-essd-cream">
                SECONDARY SCHOOLS
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base font-bold text-essd-black/90 font-sans">
              Accredited secondary school institutions across all 17 LGAs of Enugu State.
            </p>
          </div>
        </div>
      </section>

      {/* Directory Client */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SchoolsClient initialSchools={schools} />
      </section>

    </div>
  );
}
