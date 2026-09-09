import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const prizes = await prisma.prize.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ success: true, prizes });
  } catch (err: any) {
    console.error("Fetch prizes error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch prizes" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, rewardHeadline, description, badgeColor, displayOrder } = body;

    if (id) {
      const updated = await prisma.prize.update({
        where: { id },
        data: {
          title,
          rewardHeadline,
          description,
          badgeColor,
          displayOrder: Number(displayOrder) || 0,
        },
      });
      return NextResponse.json({ success: true, prize: updated });
    }

    const created = await prisma.prize.create({
      data: {
        tier: body.tier || "SPECIAL",
        title,
        rewardHeadline,
        description,
        badgeColor: badgeColor || "gold",
        displayOrder: Number(displayOrder) || 0,
      },
    });

    return NextResponse.json({ success: true, prize: created });
  } catch (err: any) {
    console.error("Save prize error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to save prize" },
      { status: 500 }
    );
  }
}
