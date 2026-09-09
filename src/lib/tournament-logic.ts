import { MatchData } from "./types";

export interface BracketNode {
  matchNumber: number;
  round: string;
  roundLabel: string;
  roundOrder: number;
  positionInRound: number;
  schoolA?: string | null;
  schoolB?: string | null;
  scoreA?: number | null;
  scoreB?: number | null;
  winner?: string | null;
  status: string;
  motionTopic: string;
  date: string;
  time: string;
  venueName: string;
  nextMatchNumber?: number;
  nextMatchSlot?: "A" | "B";
}

/**
 * Progression Map for 16-school Knockout:
 * Match 1 & 2 -> Match 9 (QF 1: Slot A & Slot B)
 * Match 3 & 4 -> Match 10 (QF 2: Slot A & Slot B)
 * Match 5 & 6 -> Match 11 (QF 3: Slot A & Slot B)
 * Match 7 & 8 -> Match 12 (QF 4: Slot A & Slot B)
 * Match 9 & 10 -> Match 13 (SF 1: Slot A & Slot B)
 * Match 11 & 12 -> Match 14 (SF 2: Slot A & Slot B)
 * Match 13 & 14 -> Match 15 (Final: Slot A & Slot B)
 */
export const TOURNAMENT_PROGRESSION_MAP: Record<
  number,
  { nextMatchNumber: number; slot: "A" | "B" }
> = {
  1: { nextMatchNumber: 9, slot: "A" },
  2: { nextMatchNumber: 9, slot: "B" },
  3: { nextMatchNumber: 10, slot: "A" },
  4: { nextMatchNumber: 10, slot: "B" },
  5: { nextMatchNumber: 11, slot: "A" },
  6: { nextMatchNumber: 11, slot: "B" },
  7: { nextMatchNumber: 12, slot: "A" },
  8: { nextMatchNumber: 12, slot: "B" },
  9: { nextMatchNumber: 13, slot: "A" },
  10: { nextMatchNumber: 13, slot: "B" },
  11: { nextMatchNumber: 14, slot: "A" },
  12: { nextMatchNumber: 14, slot: "B" },
  13: { nextMatchNumber: 15, slot: "A" },
  14: { nextMatchNumber: 15, slot: "B" },
};

export function getNextMatchTarget(matchNumber: number) {
  return TOURNAMENT_PROGRESSION_MAP[matchNumber] || null;
}

export function organizeMatchesByRound(matches: MatchData[]) {
  const sorted = [...matches].sort((a, b) => a.matchNumber - b.matchNumber);
  return {
    roundOf16: sorted.filter((m) => m.round === "ROUND_OF_16"),
    quarterFinals: sorted.filter((m) => m.round === "QUARTER_FINALS"),
    semiFinals: sorted.filter((m) => m.round === "SEMI_FINALS"),
    final: sorted.find((m) => m.round === "FINAL") || null,
    thirdPlace: sorted.find((m) => m.round === "THIRD_PLACE") || null,
  };
}
