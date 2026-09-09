import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lga = searchParams.get("lga");

    const whereClause: any = {};
    if (lga && lga !== "ALL") {
      whereClause.lga = lga;
    }

    const schools = await prisma.school.findMany({
      where: whereClause,
      include: {
        teamMembers: true,
      },
      orderBy: [
        { points: "desc" },
        { name: "asc" },
      ],
    });

    return NextResponse.json({ success: true, schools });
  } catch (err: any) {
    console.error("Fetch schools error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch schools" },
      { status: 500 }
    );
  }
}
