"use client";

import { useState, useMemo } from "react";
import { SchoolData, ENUGU_LGAS } from "@/lib/types";
import { Trophy, Users, Award, MapPin, Search, School, Sparkles, CheckCircle2 } from "lucide-react";

interface SchoolsClientProps {
  initialSchools: SchoolData[];
}

export default function SchoolsClient({ initialSchools }: SchoolsClientProps) {
  const [selectedLGA, setSelectedLGA] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSchools = useMemo(() => {
    return initialSchools.filter((s) => {
      if (selectedLGA !== "ALL" && s.lga !== selectedLGA) return false;
      if (selectedType !== "ALL" && s.type !== selectedType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const name = s.name.toLowerCase();
        const lga = s.lga.toLowerCase();
        if (!name.includes(q) && !lga.includes(q)) return false;
      }
      return true;
    });
  }, [initialSchools, selectedLGA, selectedType, searchQuery]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .filter((w) => !["of", "the", "and", "&", "in"].includes(w.toLowerCase()))
      .slice(0, 3)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "MISSION":
        return "Mission / Faith";
      case "FEDERAL":
        return "Federal Unity";
      case "PRIVATE":
        return "Private";
      default:
        return "State Public";
    }
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-essd-charcoal border-2 border-essd-border p-5 shadow-[4px_4px_0px_#0A0A0C]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* LGA Filter */}
          <div>
            <label className="block text-[11px] font-mono font-bold text-essd-gold uppercase mb-1">
              Local Government Area
            </label>
            <select
              value={selectedLGA}
              onChange={(e) => setSelectedLGA(e.target.value)}
              className="w-full bg-essd-black border border-essd-border focus:border-essd-gold px-3 py-2 text-xs text-essd-cream font-mono focus:outline-none"
            >
              <option value="ALL">All 17 LGAs</option>
              {ENUGU_LGAS.map((lga) => (
                <option key={lga} value={lga}>
                  {lga} LGA
                </option>
              ))}
            </select>
          </div>

          {/* School Type Filter */}
          <div>
            <label className="block text-[11px] font-mono font-bold text-essd-cream-muted uppercase mb-1">
              Institution Category
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-essd-black border border-essd-border focus:border-essd-gold px-3 py-2 text-xs text-essd-cream font-mono focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="PUBLIC">State Public Schools</option>
              <option value="MISSION">Mission / Faith Colleges</option>
              <option value="PRIVATE">Private High Schools</option>
              <option value="FEDERAL">Federal Unity Colleges</option>
            </select>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-[11px] font-mono font-bold text-essd-cream-muted uppercase mb-1">
              Search School Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-essd-black border border-essd-border focus:border-essd-gold pl-8 pr-3 py-2 text-xs text-essd-cream font-sans focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-essd-cream-muted absolute left-2.5 top-2.5" />
            </div>
          </div>

        </div>
      </div>

      {/* Directory Count */}
      <div className="flex items-center justify-between text-xs font-mono text-essd-cream-muted">
        <span>Showing {filteredSchools.length} of {initialSchools.length} Participating Schools</span>
      </div>

      {/* School Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((school, idx) => {
          const initials = getInitials(school.name);
          const captain = school.teamMembers?.find((m) => m.role === "CAPTAIN");
          const speakers = school.teamMembers?.filter((m) => m.role !== "CAPTAIN") || [];

          return (
            <div
              key={school.id}
              className="bg-essd-charcoal border-2 border-essd-border hover:border-essd-gold p-6 flex flex-col justify-between shadow-[4px_4px_0px_#0A0A0C] hover:shadow-[6px_6px_0px_#E8A927] hover:-translate-y-1 transition-all duration-200 group"
            >
              <div>
                {/* Top Header with Monogram */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Elegant Monogram Crest */}
                  <div className="w-14 h-14 rounded-full bg-essd-black border-2 border-essd-gold flex items-center justify-center text-essd-gold font-display font-black text-base shadow-[0_0_12px_rgba(232,169,39,0.3)] flex-shrink-0 group-hover:bg-essd-gold group-hover:text-essd-black transition-colors">
                    {initials}
                  </div>

                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-essd-dark text-essd-gold border border-essd-gold/30 font-mono text-[9px] font-bold uppercase">
                        {getTypeLabel(school.type)}
                      </span>
                      {school.seedRank && (
                        <span className="text-[10px] font-mono text-essd-cream-muted">
                          Seed #{school.seedRank}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-black font-display uppercase text-essd-cream leading-snug group-hover:text-essd-gold transition-colors">
                      {school.name}
                    </h3>
                  </div>
                </div>

                {/* Location & Motto */}
                <div className="space-y-1 text-xs font-mono text-essd-cream-muted mb-4 pb-3 border-b border-essd-border/80">
                  <div className="flex items-center gap-1.5 text-essd-cream">
                    <MapPin className="w-3.5 h-3.5 text-essd-orange flex-shrink-0" />
                    <span>{school.lga} LGA, Enugu</span>
                  </div>
                  {school.motto && (
                    <p className="italic text-[11px] text-essd-cream-muted/70 truncate">
                      "{school.motto}"
                    </p>
                  )}
                </div>

                {/* Squad Members */}
                <div className="space-y-2 mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase text-essd-gold block">
                    Accredited Debaters:
                  </span>
                  
                  {captain && (
                    <div className="flex items-center justify-between text-xs font-mono bg-essd-black p-2 border border-essd-border">
                      <span className="font-bold text-essd-cream truncate">
                        👑 {captain.fullName}
                      </span>
                      <span className="text-[10px] text-essd-gold font-bold">{captain.classGrade} (Captain)</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    {speakers.map((sp) => (
                      <div key={sp.id} className="flex items-center justify-between text-[11px] font-mono text-essd-cream-muted px-2 py-1 bg-essd-dark/40">
                        <span className="truncate">{sp.fullName}</span>
                        <span className="text-[10px] text-essd-cream-muted/60">{sp.classGrade}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tournament Stats Footer */}
              <div className="pt-3 border-t border-essd-border/80 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-essd-cream-muted block text-[10px]">Points Rating:</span>
                  <span className="font-bold text-essd-gold text-sm">{school.points} pts</span>
                </div>
                <div className="text-right">
                  <span className="text-essd-cream-muted block text-[10px]">Record (W-L):</span>
                  <span className="font-bold text-essd-cream text-sm">{school.wins}W - {school.losses}L</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
