import Link from "next/link";
import { Icons } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-essd-dark border-2 border-essd-gold/30 text-essd-gold mb-2">
          <span className="font-display text-4xl font-black">404</span>
        </div>
        <h1 className="text-3xl font-display font-black uppercase text-essd-cream">
          Page Not Found
        </h1>
        <p className="text-sm font-mono text-essd-cream-muted leading-relaxed">
          The tournament page you requested does not exist.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-essd-gold text-essd-black font-display font-black text-sm uppercase tracking-wider border border-essd-cream shadow-[3px_3px_0px_#0A0A0C]"
          >
            <Icons.ArrowLeft className="w-4 h-4 mr-2" />
            Return Home
          </Link>
          <Link
            href="/fixtures"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-essd-charcoal text-essd-cream font-mono font-bold text-xs uppercase tracking-wider border border-essd-border hover:border-essd-gold"
          >
            <Icons.Trophy className="w-4 h-4 mr-2 text-essd-gold" />
            View Fixtures
          </Link>
        </div>
      </div>
    </div>
  );
}
