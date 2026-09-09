import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, generateRegistrationConfirmationEmail, generateAdminNotificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      schoolName,
      schoolType,
      schoolAddress,
      lga,
      state = "Enugu",
      schoolEmail,
      schoolPhone,
      contactName,
      contactRole,
      contactPhone,
      contactEmail,
      debaterCount = 3,
      debaterNames = [],
      debaterClasses = [],
      captainName,
      teacherName,
      referralSource,
    } = body;

    if (!schoolName || !schoolEmail || !schoolPhone || !captainName || !teacherName) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate unique Registration ID e.g. ESSD-2026-EN-4921
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const lgaPrefix = lga ? lga.substring(0, 2).toUpperCase() : "EN";
    const regNumber = `ESSD-2026-${lgaPrefix}-${randomCode}`;

    // Create Registration record in DB
    const registration = await prisma.registration.create({
      data: {
        regNumber,
        schoolName,
        schoolType: schoolType || "PUBLIC",
        schoolAddress: schoolAddress || "Enugu State",
        lga: lga || "Enugu North",
        state,
        schoolEmail,
        schoolPhone,
        contactName: contactName || teacherName,
        contactRole: contactRole || "Debate Coordinator",
        contactPhone: contactPhone || schoolPhone,
        contactEmail: contactEmail || schoolEmail,
        debaterCount: Number(debaterCount) || 3,
        debaterNames: JSON.stringify(debaterNames),
        debaterClasses: JSON.stringify(debaterClasses),
        captainName,
        teacherName,
        referralSource: referralSource || "Direct",
        agreedToTerms: true,
        status: "APPROVED",
      },
    });

    // Also link / register school if not already existing
    const slug = schoolName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const existingSchool = await prisma.school.findUnique({
      where: { name: schoolName },
    });

    if (!existingSchool) {
      const createdSchool = await prisma.school.create({
        data: {
          name: schoolName,
          slug: `${slug}-${randomCode}`,
          type: schoolType || "PUBLIC",
          address: schoolAddress,
          lga: lga || "Enugu North",
          state,
          email: schoolEmail,
          phone: schoolPhone,
          status: "REGISTERED",
        },
      });

      // Add debater team members
      if (Array.isArray(debaterNames)) {
        for (let i = 0; i < debaterNames.length; i++) {
          const name = debaterNames[i];
          if (name && typeof name === "string") {
            const isCaptain = name.toLowerCase() === captainName.toLowerCase();
            const grade = debaterClasses[i] || "SS2";
            await prisma.teamMember.create({
              data: {
                schoolId: createdSchool.id,
                fullName: name,
                role: isCaptain ? "CAPTAIN" : "SPEAKER",
                classGrade: grade,
              },
            });
          }
        }
      }
    }

    // Send confirmation email to School & Coordinator
    const schoolEmailHtml = generateRegistrationConfirmationEmail({
      schoolName,
      regNumber,
      captainName,
      teacherName,
      debaterCount: Number(debaterCount) || 3,
    });

    await sendEmail({
      to: schoolEmail,
      subject: `ESSD 2026 — Registration Confirmed (${regNumber})`,
      html: schoolEmailHtml,
      type: "REGISTRATION_CONFIRMATION",
    });

    // Send internal admin alert
    const adminEmailHtml = generateAdminNotificationEmail({
      schoolName,
      regNumber,
      lga: lga || "Enugu",
      schoolPhone,
      schoolEmail,
      contactName: contactName || teacherName,
    });

    await sendEmail({
      to: "theplaceeconsults@gmail.com",
      subject: `New School Registration: ${schoolName} (${regNumber})`,
      html: adminEmailHtml,
      type: "ADMIN_NOTIFICATION",
    });

    return NextResponse.json({
      success: true,
      registration: {
        id: registration.id,
        regNumber: registration.regNumber,
        schoolName: registration.schoolName,
        lga: registration.lga,
        captainName: registration.captainName,
        teacherName: registration.teacherName,
        debaterCount: registration.debaterCount,
        createdAt: registration.createdAt.toISOString(),
      },
    });
  } catch (err: any) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to process registration" },
      { status: 500 }
    );
  }
}
