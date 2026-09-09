import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const round = searchParams.get("round");
    const status = searchParams.get("status");

    const whereClause: any = {};
    if (round && round !== "ALL") {
      whereClause.round = round;
    }
    if (status && status !== "ALL") {
      whereClause.status = status;
    }

    const matches = await prisma.match.findMany({
      where: whereClause,
      include: {
        schoolA: true,
        schoolB: true,
        winner: true,
      },
      orderBy: {
        matchNumber: "asc",
      },
    });

    return NextResponse.json({ success: true, matches });
  } catch (err: any) {
    console.error("Fetch fixtures error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch fixtures" },
      { status: 500 }
    );
  }
}
