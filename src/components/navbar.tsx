"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/icons";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Championship", href: "/championship" },
    { name: "Fixtures", href: "/fixtures" },
    { name: "Schools", href: "/schools" },
    { name: "Prizes", href: "/prizes" },
    { name: "FAQ", href: "/#faq" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname?.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top micro-bar for official date & status */}
      <div className="bg-essd-black/90 border-b border-essd-border/60 py-1.5 px-4 text-xs font-mono text-essd-cream-muted hidden md:block backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-1.5 font-bold text-essd-gold uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-essd-orange animate-pulse"></span>
              Official State Tournament
            </span>
            <span className="text-essd-border">|</span>
            <span>16th &amp; 17th October 2026</span>
            <span className="text-essd-border">|</span>
            <span>Enugu State Secretariat Complex</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/admin"
              className="text-essd-cream-muted/70 hover:text-essd-gold transition-colors"
            >
              Organizer Portal
            </Link>
            <span className="text-essd-border">|</span>
            <a
              href="tel:+2349038296513"
              className="flex items-center gap-1.5 text-essd-cream hover:text-essd-gold transition-colors"
            >
              <Icons.Phone className="w-3.5 h-3.5 text-essd-gold" />
              +234 903 829 6513
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full bg-essd-black/95 backdrop-blur-lg border-b border-essd-border transition-all duration-200 ${
          scrolled ? "py-2 shadow-2xl shadow-black/80" : "py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
          
          {/* Brand Anchor with Circular ESSD Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            {/* Circular Logo Frame */}
            <div className="relative flex-shrink-0">
              <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-essd-black via-essd-dark to-essd-gold/30 p-[3px] shadow-[0_0_15px_rgba(232,169,39,0.35)] group-hover:shadow-[0_0_22px_rgba(242,90,25,0.6)] transition-all duration-300">
                <div className="w-full h-full rounded-full bg-essd-black border-2 border-essd-gold/80 overflow-hidden flex items-center justify-center p-1.5 relative">
                  {/* SVG / Logo Graphic representing ESSD Crest */}
                  <div className="w-full h-full rounded-full bg-essd-charcoal flex flex-col items-center justify-center text-center p-0.5 relative">
                    <span className="text-[10px] sm:text-[11px] font-black tracking-tighter text-essd-gold leading-none font-display">
                      ESSD
                    </span>
                    <span className="text-[5px] sm:text-[6px] font-extrabold text-essd-cream-muted uppercase tracking-tight">
                      2026
                    </span>
                    <div className="w-3 h-[1px] bg-essd-orange my-0.5"></div>
                    <span className="text-[4px] sm:text-[5px] font-bold text-essd-orange uppercase">
                      ENUGU
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Title */}
            <div className="flex flex-col">
              <span className="text-xs font-mono font-bold tracking-widest text-essd-gold uppercase">
                Enugu State
              </span>
              <span className="text-sm sm:text-base font-black tracking-tight text-essd-cream uppercase group-hover:text-essd-gold transition-colors font-display">
                Secondary Schools Debate
              </span>
              <span className="text-[10px] font-bold tracking-widest text-essd-orange uppercase -mt-0.5">
                Championship 2026
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 relative ${
                    active
                      ? "text-essd-black bg-essd-gold shadow-sm font-extrabold"
                      : "text-essd-cream hover:text-essd-gold hover:bg-essd-dark/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action CTA */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/register"
              className="relative inline-flex items-center justify-center px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl font-display text-xs sm:text-sm font-black uppercase tracking-wider text-essd-black bg-essd-gold hover:bg-essd-orange hover:text-white border-2 border-essd-cream shadow-[3px_3px_0px_#0A0A0C] hover:shadow-[1px_1px_0px_#0A0A0C] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
            >
              <Icons.Sparkles className="w-4 h-4 mr-1.5 fill-current" />
              Register Your School
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/register"
              className="sm:hidden px-3 py-1.5 bg-essd-gold text-essd-black text-xs font-black uppercase tracking-wider font-display border border-essd-cream rounded-lg"
            >
              Register
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-essd-cream hover:text-essd-gold hover:bg-essd-dark focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <Icons.Close className="w-6 h-6 text-essd-gold" />
              ) : (
                <Icons.Menu className="w-6 h-6 text-essd-gold" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-essd-border bg-essd-black/98 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200 rounded-b-2xl">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 text-sm font-mono font-bold uppercase tracking-wider rounded-xl ${
                    isActive(link.href)
                      ? "bg-essd-gold text-essd-black"
                      : "text-essd-cream hover:bg-essd-dark hover:text-essd-gold"
                  }`}
                >
                  <span>{link.name}</span>
                  <Icons.ChevronRight className="w-4 h-4 opacity-70" />
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-essd-border space-y-2">
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-3 bg-essd-gold text-essd-black font-display font-black text-sm uppercase tracking-wider border-2 border-essd-cream shadow-[3px_3px_0px_#0A0A0C] rounded-xl"
              >
                <Icons.Sparkles className="w-4 h-4 mr-2" />
                Register Your School
              </Link>
              <Link
                href="/championship"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-2.5 bg-essd-charcoal text-essd-cream hover:text-essd-gold font-mono font-bold text-xs uppercase tracking-wider border border-essd-border rounded-xl"
              >
                <Icons.Trophy className="w-3.5 h-3.5 mr-2 text-essd-gold" />
                View Championship Bracket
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
