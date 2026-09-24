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
    { name: "Championship Rounds", href: "/championship" },
    { name: "Prizes & Honors", href: "/prizes" },
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
            <span>HOTR Auditorium, Enugu</span>
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
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-essd-black via-essd-dark to-essd-gold/40 p-[2px] shadow-[0_0_15px_rgba(232,169,39,0.35)] group-hover:shadow-[0_0_22px_rgba(242,90,25,0.6)] transition-all duration-300">
                <div className="w-full h-full rounded-full bg-essd-black border-2 border-essd-gold/80 overflow-hidden flex items-center justify-center relative">
                  <Image
                    src="/images/essd-logo.jpg"
                    alt="Enugu State Secondary Schools Debate Championship Logo"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover rounded-full"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Brand Titles */}
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-essd-gold uppercase leading-none">
                The Placee Consults &amp; HOTR Present
              </span>
              <span className="font-display text-lg sm:text-xl font-black tracking-tight text-essd-cream uppercase leading-tight group-hover:text-essd-gold transition-colors">
                ESSD 2026
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 font-mono text-xs font-bold uppercase tracking-wider">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 transition-all relative ${
                    active
                      ? "text-essd-gold font-black bg-essd-charcoal/80 border border-essd-gold/40 rounded-lg"
                      : "text-essd-cream-muted hover:text-essd-cream hover:bg-essd-charcoal/40 rounded-lg"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Primary CTA Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/register"
              className="px-5 py-2.5 bg-essd-gold text-essd-black font-display font-black text-xs uppercase tracking-wider border-2 border-essd-cream shadow-[3px_3px_0px_#0A0A0C] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-essd-orange hover:text-white transition-all rounded-xl flex items-center gap-1.5"
            >
              <Icons.Sparkles className="w-4 h-4 fill-current" />
              Register Debater
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-essd-cream hover:text-essd-gold focus:outline-none rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <Icons.Close className="w-6 h-6" />
            ) : (
              <Icons.Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-essd-black border-b border-essd-border px-4 pt-3 pb-6 space-y-2 animate-fade-in font-mono text-xs uppercase font-bold">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl transition-colors ${
                    active
                      ? "bg-essd-gold text-essd-black font-black"
                      : "text-essd-cream hover:bg-essd-charcoal"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-essd-border/80 flex flex-col gap-2.5">
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-essd-gold text-essd-black font-display font-black text-xs uppercase tracking-wider border-2 border-essd-cream shadow-[3px_3px_0px_#0A0A0C] rounded-xl"
              >
                Register Debater
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-essd-cream-muted text-xs hover:text-essd-gold"
              >
                Organizer Admin Login →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
