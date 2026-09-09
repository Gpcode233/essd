import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // 1. Fetch all confirmed/registered schools
    const registeredSchools = await prisma.school.findMany({
      orderBy: { createdAt: "asc" },
    });

    // 2. Fetch the 8 Round of 16 matches (matchNumber 1 to 8)
    const r16Matches = await prisma.match.findMany({
      where: { round: "ROUND_OF_16" },
      orderBy: { matchNumber: "asc" },
    });

    if (r16Matches.length === 0) {
      return NextResponse.json(
        { success: false, message: "Round of 16 matches not initialized." },
        { status: 400 }
      );
    }

    // 3. Match registered schools into the 8 Round of 16 pairs (16 slots total)
    // Slot 1 (Match 1 Prop), Slot 2 (Match 1 Opp), Slot 3 (Match 2 Prop), etc.
    for (let i = 0; i < 8; i++) {
      const match = r16Matches[i];
      const schoolA = registeredSchools[i * 2] || null;
      const schoolB = registeredSchools[i * 2 + 1] || null;

      await prisma.match.update({
        where: { id: match.id },
        data: {
          schoolAId: schoolA ? schoolA.id : null,
          schoolBId: schoolB ? schoolB.id : null,
          status: "UPCOMING",
          scoreA: null,
          scoreB: null,
          winnerId: null,
        },
      });
    }

    // Reset subsequent rounds (QF, SF, Final) to await winners
    await prisma.match.updateMany({
      where: {
        round: { in: ["QUARTER_FINALS", "SEMI_FINALS", "FINAL"] },
      },
      data: {
        schoolAId: null,
        schoolBId: null,
        scoreA: null,
        scoreB: null,
        winnerId: null,
        status: "UPCOMING",
      },
    });

    const updatedMatches = await prisma.match.findMany({
      include: { schoolA: true, schoolB: true, winner: true },
      orderBy: { matchNumber: "asc" },
    });

    return NextResponse.json({
      success: true,
      message: `Tournament draw generated: matched ${registeredSchools.length} registered schools into the championship bracket.`,
      registeredCount: registeredSchools.length,
      matches: updatedMatches,
    });
  } catch (err: any) {
    console.error("Tournament draw error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to generate tournament draw" },
      { status: 500 }
    );
  }
}
