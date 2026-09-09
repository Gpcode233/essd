"use client";

import { useState } from "react";
import { MatchData } from "@/lib/types";
import { organizeMatchesByRound } from "@/lib/tournament-logic";
import MatchModal from "./match-modal";
import { Icons } from "@/components/icons";

interface TournamentBracketProps {
  matches: MatchData[];
}

export default function TournamentBracket({ matches }: TournamentBracketProps) {
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);
  const [mobileRoundTab, setMobileRoundTab] = useState<"R16" | "QF" | "SF" | "FINAL">("R16");

  const { roundOf16, quarterFinals, semiFinals, final } = organizeMatchesByRound(matches);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "LIVE":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-essd-orange text-white font-mono text-[9px] font-black uppercase rounded-full animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            LIVE
          </span>
        );
      case "FINAL":
      case "COMPLETED":
        return (
          <span className="px-2 py-0.5 bg-green-950 text-green-400 border border-green-700/60 font-mono text-[9px] font-bold uppercase rounded-full">
            FINAL
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 bg-essd-dark text-essd-cream-muted font-mono text-[9px] uppercase rounded-full">
            UPCOMING
          </span>
        );
    }
  };

  const renderSchoolSlot = (
    name: string | undefined | null,
    score: number | null | undefined,
    isWinner: boolean,
    isEliminated: boolean,
    slotNumber: string,
    isA: boolean
  ) => {
    return (
      <div
        className={`flex items-center justify-between px-3 py-2 transition-all border-b last:border-b-0 ${
          isWinner
            ? "bg-essd-gold/20 text-essd-gold font-bold border-essd-gold/40"
            : isEliminated
            ? "bg-essd-black/40 text-essd-cream-muted/60 opacity-60 border-essd-border/40"
            : "bg-essd-black/80 text-essd-cream border-essd-border/60 hover:bg-essd-dark"
        }`}
      >
        <div className="flex items-center gap-2 overflow-hidden pr-2">
          <span
            className={`w-2 h-2 rounded-full flex-shrink-0 ${
              isWinner
                ? "bg-essd-gold shadow-[0_0_6px_#E8A927]"
                : isA
                ? "bg-essd-gold/60"
                : "bg-essd-orange/60"
            }`}
          ></span>
          <span className="text-xs font-mono font-bold truncate">
            {name || (
              <span className="text-essd-cream-muted/60 italic">
                Awaiting Registration ({slotNumber})
              </span>
            )}
          </span>
        </div>
        <span
          className={`font-mono text-xs font-black ml-2 ${
            isWinner ? "text-essd-gold" : isA ? "text-essd-gold" : "text-essd-orange"
          }`}
        >
          {score !== null && score !== undefined ? score.toFixed(1) : "-"}
        </span>
      </div>
    );
  };

  const renderTreeNode = (m: MatchData | null, matchLabel: string) => {
    if (!m) {
      return (
        <div className="w-[240px] bg-essd-charcoal/50 border-2 border-dashed border-essd-border/50 p-4 text-center text-xs font-mono text-essd-cream-muted rounded-xl">
          Awaiting Qualification
        </div>
      );
    }

    const isWinnerA = Boolean(m.winnerId && m.schoolAId && m.winnerId === m.schoolAId);
    const isWinnerB = Boolean(m.winnerId && m.schoolBId && m.winnerId === m.schoolBId);
    const hasWinner = isWinnerA || isWinnerB;

    return (
      <div
        onClick={() => setSelectedMatch(m)}
        className="w-[250px] bg-essd-charcoal border-2 border-essd-border hover:border-essd-gold transition-all duration-200 cursor-pointer shadow-[4px_4px_0px_#0A0A0C] hover:shadow-[6px_6px_0px_#E8A927] hover:-translate-y-0.5 group relative select-none rounded-xl overflow-hidden"
      >
        {/* Node Header */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-essd-dark border-b border-essd-border text-[10px] font-mono">
          <span className="font-bold text-essd-gold uppercase">
            M#{m.matchNumber < 10 ? `0${m.matchNumber}` : m.matchNumber} • {m.time}
          </span>
          <div className="flex items-center gap-1">
            {getStatusBadge(m.status)}
            <Icons.Eye className="w-3 h-3 text-essd-cream-muted opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
          </div>
        </div>

        {/* Schools in Match */}
        <div className="divide-y divide-essd-border/40">
          {renderSchoolSlot(
            m.schoolA?.name,
            m.scoreA,
            isWinnerA,
            hasWinner && !isWinnerA,
            "Slot 1",
            true
          )}
          {renderSchoolSlot(
            m.schoolB?.name,
            m.scoreB,
            isWinnerB,
            hasWinner && !isWinnerB,
            "Slot 2",
            false
          )}
        </div>

        {/* Motion snippet tooltip bar */}
        <div className="px-3 py-1 bg-essd-black/90 border-t border-essd-border/50 text-[9px] text-essd-cream-muted truncate italic">
          “{m.motionTopic}”
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      
      {/* Visual Bracket Stage Banner */}
      <div className="hidden lg:grid grid-cols-4 gap-10 mb-8 text-center font-mono">
        <div className="p-3 bg-essd-charcoal border-2 border-essd-border shadow-[3px_3px_0px_#0A0A0C] rounded-xl">
          <span className="text-sm font-black uppercase tracking-wider text-essd-gold block font-display">
            ROUND OF 16
          </span>
          <span className="text-[10px] text-essd-cream-muted uppercase font-bold">
            8 Matches • 16 Oct
          </span>
        </div>

        <div className="p-3 bg-essd-charcoal border-2 border-essd-border shadow-[3px_3px_0px_#0A0A0C] rounded-xl">
          <span className="text-sm font-black uppercase tracking-wider text-essd-gold block font-display">
            QUARTER-FINALS
          </span>
          <span className="text-[10px] text-essd-cream-muted uppercase font-bold">
            4 Matches • 16 Oct
          </span>
        </div>

        <div className="p-3 bg-essd-charcoal border-2 border-essd-border shadow-[3px_3px_0px_#0A0A0C] rounded-xl">
          <span className="text-sm font-black uppercase tracking-wider text-essd-gold block font-display">
            SEMI-FINALS
          </span>
          <span className="text-[10px] text-essd-cream-muted uppercase font-bold">
            2 Matches • 17 Oct
          </span>
        </div>

        <div className="p-3 bg-gradient-to-r from-essd-black to-essd-charcoal border-2 border-essd-gold shadow-[0_0_15px_rgba(232,169,39,0.3)] rounded-xl">
          <span className="text-sm font-black uppercase tracking-wider text-essd-gold block font-display flex items-center justify-center gap-1">
            <Icons.Trophy className="w-4 h-4 text-essd-gold" />
            GRAND FINAL
          </span>
          <span className="text-[10px] text-essd-cream-muted uppercase font-bold">
            Coronation • 17 Oct
          </span>
        </div>
      </div>

      {/* Desktop Connected Tree Bracket (>= lg breakpoint) */}
      <div className="hidden lg:block overflow-x-auto pb-10">
        <div className="min-w-[1180px] relative flex items-center justify-between gap-6 py-4">
          
          {/* Column 1: Round of 16 (8 Matches) */}
          <div className="flex flex-col gap-6 relative z-10">
            {roundOf16.map((m) => (
              <div key={m.id || m.matchNumber} className="relative flex items-center">
                {renderTreeNode(m, "Round of 16")}
                {/* Horizontal branch line exiting to QF */}
                <div className="w-8 h-[2px] bg-essd-gold/60"></div>
              </div>
            ))}
          </div>

          {/* Column 2: Quarter-Finals (4 Matches with Branch Connectors) */}
          <div className="flex flex-col gap-36 relative z-10">
            {quarterFinals.map((m, idx) => (
              <div key={m.id || m.matchNumber} className="relative flex items-center">
                {/* Incoming fork bracket connector from 2 R16 matches */}
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex items-center">
                  <div className="w-4 h-[126px] border-l-2 border-t-2 border-b-2 border-essd-gold/60"></div>
                  <div className="w-4 h-[2px] bg-essd-gold/60"></div>
                </div>

                {renderTreeNode(m, "Quarter-Final")}

                {/* Outgoing branch line to SF */}
                <div className="w-8 h-[2px] bg-essd-gold/60"></div>
              </div>
            ))}
          </div>

          {/* Column 3: Semi-Finals (2 Matches with Branch Connectors) */}
          <div className="flex flex-col gap-96 relative z-10">
            {semiFinals.map((m, idx) => (
              <div key={m.id || m.matchNumber} className="relative flex items-center">
                {/* Incoming fork bracket connector from 2 QF matches */}
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex items-center">
                  <div className="w-4 h-[270px] border-l-2 border-t-2 border-b-2 border-essd-gold/60"></div>
                  <div className="w-4 h-[2px] bg-essd-gold/60"></div>
                </div>

                {renderTreeNode(m, "Semi-Final")}

                {/* Outgoing branch line to Final */}
                <div className="w-8 h-[2px] bg-essd-gold/60"></div>
              </div>
            ))}
          </div>

          {/* Column 4: Grand Final (1 Match + Champion Crown Podium) */}
          <div className="flex flex-col items-center justify-center relative z-10 pl-4">
            <div className="relative flex items-center">
              {/* Incoming fork bracket connector from 2 SF matches */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex items-center">
                <div className="w-4 h-[550px] border-l-2 border-t-2 border-b-2 border-essd-gold/60"></div>
                <div className="w-4 h-[2px] bg-essd-gold/60"></div>
              </div>

              <div className="space-y-4">
                {/* Champion Badge Banner */}
                <div className="p-3 bg-gradient-to-r from-essd-gold via-essd-orange to-essd-gold text-essd-black font-display font-black text-xs uppercase tracking-wider text-center border-2 border-essd-cream shadow-[0_0_20px_rgba(232,169,39,0.5)] flex items-center justify-center gap-1.5 rounded-xl">
                  <Icons.Trophy className="w-4 h-4 fill-current" />
                  <span>🏆 ESSD 2026 GRAND CHAMPION</span>
                </div>

                {renderTreeNode(final, "Grand Final")}

                {/* Champion Result Podium Card */}
                {final?.winner && (
                  <div className="p-4 bg-essd-black border-3 border-essd-gold shadow-[6px_6px_0px_#E8A927] text-center space-y-1 animate-in zoom-in-95 rounded-2xl">
                    <span className="text-[10px] font-mono text-essd-gold uppercase font-bold block">
                      Reigning State Champion:
                    </span>
                    <h4 className="text-base font-black font-display uppercase text-essd-cream">
                      🎉 {final.winner.name}
                    </h4>
                    <span className="text-xs font-mono text-essd-orange font-bold block">
                      Full International Scholarship + Gold Trophy
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Bracket View (< lg breakpoint) */}
      <div className="lg:hidden">
        {/* Round Switcher Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-essd-charcoal border border-essd-border rounded-xl text-center font-mono text-xs font-bold uppercase mb-4">
          <button
            onClick={() => setMobileRoundTab("R16")}
            className={`py-2 px-1 transition-colors rounded-lg ${
              mobileRoundTab === "R16"
                ? "bg-essd-gold text-essd-black font-extrabold shadow-sm"
                : "text-essd-cream-muted hover:text-essd-cream"
            }`}
          >
            R16 (8)
          </button>
          <button
            onClick={() => setMobileRoundTab("QF")}
            className={`py-2 px-1 transition-colors rounded-lg ${
              mobileRoundTab === "QF"
                ? "bg-essd-gold text-essd-black font-extrabold shadow-sm"
                : "text-essd-cream-muted hover:text-essd-cream"
            }`}
          >
            QF (4)
          </button>
          <button
            onClick={() => setMobileRoundTab("SF")}
            className={`py-2 px-1 transition-colors rounded-lg ${
              mobileRoundTab === "SF"
                ? "bg-essd-gold text-essd-black font-extrabold shadow-sm"
                : "text-essd-cream-muted hover:text-essd-cream"
            }`}
          >
            SF (2)
          </button>
          <button
            onClick={() => setMobileRoundTab("FINAL")}
            className={`py-2 px-1 transition-colors rounded-lg ${
              mobileRoundTab === "FINAL"
                ? "bg-essd-orange text-white font-extrabold shadow-sm"
                : "text-essd-cream-muted hover:text-essd-cream"
            }`}
          >
            FINAL 🏆
          </button>
        </div>

        {/* Mobile Matches Cards List */}
        <div className="space-y-4">
          {mobileRoundTab === "R16" && roundOf16.map((m) => (
            <div key={m.id || m.matchNumber} className="w-full">
              {renderTreeNode(m, "Round of 16")}
            </div>
          ))}
          {mobileRoundTab === "QF" && quarterFinals.map((m) => (
            <div key={m.id || m.matchNumber} className="w-full">
              {renderTreeNode(m, "Quarter-Final")}
            </div>
          ))}
          {mobileRoundTab === "SF" && semiFinals.map((m) => (
            <div key={m.id || m.matchNumber} className="w-full">
              {renderTreeNode(m, "Semi-Final")}
            </div>
          ))}
          {mobileRoundTab === "FINAL" && (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-essd-gold via-essd-orange to-essd-gold text-essd-black text-center border-2 border-essd-cream font-display font-black text-sm uppercase rounded-xl">
                🏆 ESSD 2026 GRAND CHAMPIONSHIP FINAL
              </div>
              {renderTreeNode(final, "Grand Final")}
            </div>
          )}
        </div>
      </div>

      {/* Selected Match Details Modal */}
      <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
    </div>
  );
}
