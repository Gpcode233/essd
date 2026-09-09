import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getNextMatchTarget } from "@/lib/tournament-logic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const {
      scoreA,
      scoreB,
      winnerId,
      status,
      motionTopic,
      date,
      time,
      venueName,
      judges,
    } = body;

    // Fetch the current match
    const currentMatch = await prisma.match.findUnique({
      where: { id },
      include: { schoolA: true, schoolB: true },
    });

    if (!currentMatch) {
      return NextResponse.json(
        { success: false, message: "Match not found" },
        { status: 404 }
      );
    }

    // Determine final winner if scores provided or winner explicitly selected
    let calculatedWinnerId = winnerId;
    if (scoreA !== undefined && scoreB !== undefined && scoreA !== null && scoreB !== null) {
      if (scoreA > scoreB && currentMatch.schoolAId) {
        calculatedWinnerId = currentMatch.schoolAId;
      } else if (scoreB > scoreA && currentMatch.schoolBId) {
        calculatedWinnerId = currentMatch.schoolBId;
      }
    }

    const updatedMatch = await prisma.match.update({
      where: { id },
      data: {
        scoreA: scoreA !== undefined ? Number(scoreA) : currentMatch.scoreA,
        scoreB: scoreB !== undefined ? Number(scoreB) : currentMatch.scoreB,
        winnerId: calculatedWinnerId !== undefined ? calculatedWinnerId : currentMatch.winnerId,
        status: status || currentMatch.status,
        motionTopic: motionTopic || currentMatch.motionTopic,
        date: date || currentMatch.date,
        time: time || currentMatch.time,
        venueName: venueName || currentMatch.venueName,
        judges: judges || currentMatch.judges,
      },
      include: {
        schoolA: true,
        schoolB: true,
        winner: true,
      },
    });

    // Automatic Knockout Bracket Advancement
    if (calculatedWinnerId && (status === "FINAL" || status === "COMPLETED")) {
      const nextTarget = getNextMatchTarget(currentMatch.matchNumber);
      if (nextTarget) {
        const nextMatch = await prisma.match.findUnique({
          where: { matchNumber: nextTarget.nextMatchNumber },
        });

        if (nextMatch) {
          const updateData: any = {};
          if (nextTarget.slot === "A") {
            updateData.schoolAId = calculatedWinnerId;
          } else {
            updateData.schoolBId = calculatedWinnerId;
          }

          await prisma.match.update({
            where: { id: nextMatch.id },
            data: updateData,
          });
        }
      }
    }

    return NextResponse.json({ success: true, match: updatedMatch });
  } catch (err: any) {
    console.error("Update match error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update match" },
      { status: 500 }
    );
  }
}
