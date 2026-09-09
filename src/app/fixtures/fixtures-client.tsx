"use client";

import { useState, useMemo } from "react";
import { MatchData, SchoolData } from "@/lib/types";
import MatchModal from "@/components/match-modal";
import { Calendar, Clock, MapPin, Trophy, Users, Search, Filter, Flame, Eye, Award } from "lucide-react";

interface FixturesClientProps {
  initialMatches: MatchData[];
  schools: SchoolData[];
}

export default function FixturesClient({ initialMatches, schools }: FixturesClientProps) {
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);
  const [selectedRound, setSelectedRound] = useState("ALL");
  const [selectedDate, setSelectedDate] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedSchool, setSelectedSchool] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMatches = useMemo(() => {
    return initialMatches.filter((m) => {
      // Round filter
      if (selectedRound !== "ALL" && m.round !== selectedRound) {
        return false;
      }
      // Date filter
      if (selectedDate !== "ALL" && !m.date.includes(selectedDate)) {
        return false;
      }
      // Status filter
      if (selectedStatus !== "ALL") {
        if (selectedStatus === "FINAL" && !(m.status === "FINAL" || m.status === "COMPLETED")) {
          return false;
        }
        if (selectedStatus !== "FINAL" && m.status !== selectedStatus) {
          return false;
        }
      }
      // School filter
      if (selectedSchool !== "ALL") {
        const hasA = m.schoolA?.id === selectedSchool || m.schoolAId === selectedSchool;
        const hasB = m.schoolB?.id === selectedSchool || m.schoolBId === selectedSchool;
        if (!hasA && !hasB) return false;
      }
      // Search query filter (school names or motions)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameA = m.schoolA?.name?.toLowerCase() || "";
        const nameB = m.schoolB?.name?.toLowerCase() || "";
        const motion = m.motionTopic?.toLowerCase() || "";
        if (!nameA.includes(q) && !nameB.includes(q) && !motion.includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [initialMatches, selectedRound, selectedDate, selectedStatus, selectedSchool, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Filter Control Bar */}
      <div className="bg-essd-charcoal border-2 border-essd-border p-5 shadow-[4px_4px_0px_#0A0A0C]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Round Filter */}
          <div>
            <label className="block text-[11px] font-mono font-bold text-essd-gold uppercase mb-1">
              Tournament Stage
            </label>
            <select
              value={selectedRound}
              onChange={(e) => setSelectedRound(e.target.value)}
              className="w-full bg-essd-black border border-essd-border focus:border-essd-gold px-3 py-2 text-xs text-essd-cream font-mono focus:outline-none"
            >
              <option value="ALL">All Stages (15 Matches)</option>
              <option value="ROUND_OF_16">Round of 16 (8)</option>
              <option value="QUARTER_FINALS">Quarter-Finals (4)</option>
              <option value="SEMI_FINALS">Semi-Finals (2)</option>
              <option value="FINAL">Grand Final (1)</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-[11px] font-mono font-bold text-essd-cream-muted uppercase mb-1">
              Event Date
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-essd-black border border-essd-border focus:border-essd-gold px-3 py-2 text-xs text-essd-cream font-mono focus:outline-none"
            >
              <option value="ALL">All Dates (16th &amp; 17th Oct)</option>
              <option value="16th">Day 1 • 16th Oct 2026</option>
              <option value="17th">Day 2 • 17th Oct 2026</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[11px] font-mono font-bold text-essd-cream-muted uppercase mb-1">
              Match Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-essd-black border border-essd-border focus:border-essd-gold px-3 py-2 text-xs text-essd-cream font-mono focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="LIVE">Live Matches Only 🔥</option>
              <option value="UPCOMING">Upcoming Matches</option>
              <option value="FINAL">Completed / Final</option>
            </select>
          </div>

          {/* School Filter */}
          <div>
            <label className="block text-[11px] font-mono font-bold text-essd-cream-muted uppercase mb-1">
              Filter by School
            </label>
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="w-full bg-essd-black border border-essd-border focus:border-essd-gold px-3 py-2 text-xs text-essd-cream font-mono focus:outline-none"
            >
              <option value="ALL">All 16 Schools</option>
              {schools.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Text Search */}
          <div>
            <label className="block text-[11px] font-mono font-bold text-essd-cream-muted uppercase mb-1">
              Search Motion / Team
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-essd-black border border-essd-border focus:border-essd-gold pl-8 pr-3 py-2 text-xs text-essd-cream font-sans focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-essd-cream-muted absolute left-2.5 top-2.5" />
            </div>
          </div>

        </div>
      </div>

      {/* Fixture Count Badge */}
      <div className="flex items-center justify-between text-xs font-mono text-essd-cream-muted">
        <span>Showing {filteredMatches.length} of {initialMatches.length} Matches</span>
        {(selectedRound !== "ALL" || selectedStatus !== "ALL" || selectedSchool !== "ALL" || searchQuery) && (
          <button
            onClick={() => {
              setSelectedRound("ALL");
              setSelectedDate("ALL");
              setSelectedStatus("ALL");
              setSelectedSchool("ALL");
              setSearchQuery("");
            }}
            className="text-essd-orange hover:underline font-bold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Match Fixture Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMatches.map((m) => {
          const isLive = m.status === "LIVE";
          const isFinal = m.status === "FINAL" || m.status === "COMPLETED";
          const isWinnerA = m.winnerId && m.schoolAId && m.winnerId === m.schoolAId;
          const isWinnerB = m.winnerId && m.schoolBId && m.winnerId === m.schoolBId;

          return (
            <div
              key={m.id || m.matchNumber}
              onClick={() => setSelectedMatch(m)}
              className="bg-essd-charcoal border-2 border-essd-border hover:border-essd-gold p-6 shadow-[4px_4px_0px_#0A0A0C] hover:shadow-[6px_6px_0px_#E8A927] hover:-translate-y-1 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-essd-border/80">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-essd-gold text-essd-black font-mono text-xs font-black uppercase">
                      Match #{m.matchNumber < 10 ? `0${m.matchNumber}` : m.matchNumber}
                    </span>
                    <span className="text-xs font-mono text-essd-cream-muted font-bold uppercase">
                      {m.roundLabel}
                    </span>
                  </div>

                  <div>
                    {isLive ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-essd-orange text-white text-[10px] font-mono font-black uppercase rounded animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        LIVE
                      </span>
                    ) : isFinal ? (
                      <span className="px-2 py-0.5 bg-green-950 text-green-300 border border-green-700 font-mono text-[10px] font-bold uppercase">
                        FINAL RESULT
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-essd-dark text-essd-cream-muted font-mono text-[10px] uppercase">
                        UPCOMING
                      </span>
                    )}
                  </div>
                </div>

                {/* Matchup Duel */}
                <div className="space-y-3 mb-4">
                  {/* School A */}
                  <div
                    className={`p-3 border flex items-center justify-between transition-colors ${
                      isWinnerA
                        ? "bg-essd-gold/15 border-essd-gold text-essd-gold font-bold"
                        : m.winnerId
                        ? "bg-essd-dark/40 border-essd-border/40 opacity-60 text-essd-cream-muted"
                        : "bg-essd-black border-essd-border text-essd-cream"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase text-essd-gold block">
                        Proposition
                      </span>
                      <h4 className="text-sm font-bold font-display uppercase truncate max-w-[240px]">
                        {m.schoolA?.name || "TBD (Awaiting Round)"}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black font-mono text-essd-gold">
                        {m.scoreA !== null && m.scoreA !== undefined ? m.scoreA.toFixed(1) : "-"}
                      </span>
                      {isWinnerA && (
                        <span className="block text-[9px] font-mono text-essd-gold font-bold uppercase">
                          Winner
                        </span>
                      )}
                    </div>
                  </div>

                  {/* School B */}
                  <div
                    className={`p-3 border flex items-center justify-between transition-colors ${
                      isWinnerB
                        ? "bg-essd-orange/15 border-essd-orange text-essd-orange font-bold"
                        : m.winnerId
                        ? "bg-essd-dark/40 border-essd-border/40 opacity-60 text-essd-cream-muted"
                        : "bg-essd-black border-essd-border text-essd-cream"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase text-essd-orange block">
                        Opposition
                      </span>
                      <h4 className="text-sm font-bold font-display uppercase truncate max-w-[240px]">
                        {m.schoolB?.name || "TBD (Awaiting Round)"}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black font-mono text-essd-orange">
                        {m.scoreB !== null && m.scoreB !== undefined ? m.scoreB.toFixed(1) : "-"}
                      </span>
                      {isWinnerB && (
                        <span className="block text-[9px] font-mono text-essd-orange font-bold uppercase">
                          Winner
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Motion snippet */}
                <div className="p-3 bg-essd-dark/80 border-l-3 border-essd-gold text-xs text-essd-cream font-sans italic mb-4">
                  “{m.motionTopic}”
                </div>
              </div>

              {/* Card Footer Logistics */}
              <div className="pt-3 border-t border-essd-border/60 flex items-center justify-between text-[11px] font-mono text-essd-cream-muted">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-essd-gold" />
                    {m.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-essd-orange" />
                    {m.time}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-essd-gold font-bold group-hover:underline">
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMatches.length === 0 && (
        <div className="p-12 text-center bg-essd-charcoal border-2 border-dashed border-essd-border">
          <Trophy className="w-10 h-10 text-essd-cream-muted mx-auto mb-3 opacity-40" />
          <h3 className="text-base font-bold font-display uppercase text-essd-cream">
            No Match Fixtures Found
          </h3>
          <p className="text-xs text-essd-cream-muted mt-1 font-mono">
            Try adjusting your search criteria or stage filter.
          </p>
        </div>
      )}

      {/* Selected Match Details Modal */}
      <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
    </div>
  );
}
