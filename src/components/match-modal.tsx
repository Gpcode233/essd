"use client";

import { MatchData } from "@/lib/types";
import { X, Trophy, Calendar, Clock, MapPin, Users, Flame, Shield, CheckCircle2, Award } from "lucide-react";

interface MatchModalProps {
  match: MatchData | null;
  onClose: () => void;
}

export default function MatchModal({ match, onClose }: MatchModalProps) {
  if (!match) return null;

  const isLive = match.status === "LIVE";
  const isFinal = match.status === "FINAL" || match.status === "COMPLETED";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-essd-charcoal border-4 border-essd-gold p-6 sm:p-8 shadow-[12px_12px_0px_#0A0A0C] text-essd-cream max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-essd-dark text-essd-cream hover:text-essd-orange hover:bg-essd-black transition-colors border border-essd-border"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="px-3 py-1 bg-essd-gold text-essd-black font-mono text-xs font-black uppercase tracking-wider">
            Match #{match.matchNumber < 10 ? `0${match.matchNumber}` : match.matchNumber}
          </div>
          <span className="text-xs font-mono font-bold text-essd-cream-muted uppercase">
            {match.roundLabel}
          </span>
          {isLive && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-essd-orange text-white text-[11px] font-mono font-black uppercase rounded-full animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              LIVE ON STAGE
            </span>
          )}
          {isFinal && (
            <span className="px-2.5 py-0.5 bg-green-900/80 text-green-300 border border-green-500/50 text-[11px] font-mono font-bold uppercase">
              FINAL RESULT
            </span>
          )}
        </div>

        {/* Matchup Banner */}
        <div className="bg-essd-black p-5 border-2 border-essd-border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-4 text-center">
            
            {/* School A */}
            <div className={`md:col-span-5 p-4 border ${match.winnerId === match.schoolA?.id ? "border-essd-gold bg-essd-gold/10" : "border-essd-border/60 bg-essd-dark/60"}`}>
              <span className="text-[10px] font-mono uppercase text-essd-gold block mb-1">
                Proposition Side
              </span>
              <h3 className="text-base sm:text-lg font-black font-display uppercase text-essd-cream">
                {match.schoolA?.name || "TBD (Awaiting Round)"}
              </h3>
              {match.schoolA?.lga && (
                <span className="text-[11px] font-mono text-essd-cream-muted">
                  {match.schoolA.lga} LGA
                </span>
              )}
              {match.scoreA !== null && match.scoreA !== undefined && (
                <div className="mt-2 text-3xl font-black font-mono text-essd-gold">
                  {match.scoreA.toFixed(1)} <span className="text-xs text-essd-cream-muted">pts</span>
                </div>
              )}
              {match.winnerId === match.schoolA?.id && (
                <div className="mt-2 inline-flex items-center gap-1 text-xs font-mono font-bold text-essd-gold uppercase">
                  <Award className="w-3.5 h-3.5" />
                  Winner / Advanced
                </div>
              )}
            </div>

            {/* VS Badge */}
            <div className="md:col-span-1 flex flex-col items-center justify-center">
              <span className="w-9 h-9 rounded-full bg-essd-orange text-white font-display font-black text-sm flex items-center justify-center border-2 border-essd-cream shadow-[2px_2px_0px_#0A0A0C]">
                VS
              </span>
            </div>

            {/* School B */}
            <div className={`md:col-span-5 p-4 border ${match.winnerId === match.schoolB?.id ? "border-essd-gold bg-essd-gold/10" : "border-essd-border/60 bg-essd-dark/60"}`}>
              <span className="text-[10px] font-mono uppercase text-essd-orange block mb-1">
                Opposition Side
              </span>
              <h3 className="text-base sm:text-lg font-black font-display uppercase text-essd-cream">
                {match.schoolB?.name || "TBD (Awaiting Round)"}
              </h3>
              {match.schoolB?.lga && (
                <span className="text-[11px] font-mono text-essd-cream-muted">
                  {match.schoolB.lga} LGA
                </span>
              )}
              {match.scoreB !== null && match.scoreB !== undefined && (
                <div className="mt-2 text-3xl font-black font-mono text-essd-orange">
                  {match.scoreB.toFixed(1)} <span className="text-xs text-essd-cream-muted">pts</span>
                </div>
              )}
              {match.winnerId === match.schoolB?.id && (
                <div className="mt-2 inline-flex items-center gap-1 text-xs font-mono font-bold text-essd-gold uppercase">
                  <Award className="w-3.5 h-3.5" />
                  Winner / Advanced
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Debate Motion Topic */}
        <div className="p-4 bg-essd-dark border-l-4 border-essd-gold mb-6 space-y-1.5">
          <span className="text-[11px] font-mono font-black uppercase text-essd-gold block">
            Debate Motion / Topic:
          </span>
          <p className="text-sm sm:text-base font-bold text-essd-cream italic leading-snug">
            “{match.motionTopic}”
          </p>
        </div>

        {/* Logistics & Adjudicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono mb-6">
          <div className="p-3 bg-essd-black border border-essd-border space-y-2">
            <div className="flex items-center gap-2 text-essd-gold font-bold">
              <Calendar className="w-4 h-4" />
              <span>{match.date}</span>
            </div>
            <div className="flex items-center gap-2 text-essd-cream-muted">
              <Clock className="w-4 h-4 text-essd-orange" />
              <span>{match.time} WAT</span>
            </div>
            <div className="flex items-start gap-2 text-essd-cream-muted">
              <MapPin className="w-4 h-4 text-essd-gold flex-shrink-0 mt-0.5" />
              <span>{match.venueName}</span>
            </div>
          </div>

          <div className="p-3 bg-essd-black border border-essd-border space-y-2">
            <div className="flex items-center gap-2 text-essd-gold font-bold">
              <Users className="w-4 h-4" />
              <span>Adjudication Panel:</span>
            </div>
            <p className="text-essd-cream-muted text-[11px] leading-relaxed">
              {match.judges}
            </p>
          </div>
        </div>

        {/* Scoring Criteria Summary */}
        <div className="p-4 bg-essd-black/60 border border-essd-border/80 text-xs text-essd-cream-muted space-y-2">
          <span className="font-bold text-essd-cream block uppercase font-mono text-[11px]">
            WSDC Scoring Rubric Breakdown:
          </span>
          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            <div className="p-2 bg-essd-dark border border-essd-border">
              <span className="block font-bold text-essd-gold">Matter (40%)</span>
              <span className="text-[10px]">Logic &amp; Evidence</span>
            </div>
            <div className="p-2 bg-essd-dark border border-essd-border">
              <span className="block font-bold text-essd-orange">Manner (40%)</span>
              <span className="text-[10px]">Delivery &amp; Poise</span>
            </div>
            <div className="p-2 bg-essd-dark border border-essd-border">
              <span className="block font-bold text-essd-cream">Method (20%)</span>
              <span className="text-[10px]">Structure &amp; Rebuttal</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
