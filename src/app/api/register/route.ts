import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, generateRegistrationConfirmationEmail, generateAdminNotificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      studentName,
      studentClass,
      studentGender,
      studentEmail,
      studentPhone,
      schoolName,
      schoolType = "PUBLIC",
      schoolAddress,
      lga = "Enugu North",
      state = "Enugu",
      schoolEmail,
      schoolPhone,
      parentName,
      parentPhone,
      parentEmail,
      teacherName,
      teacherPhone,
      teacherEmail,
      day1Motions = [],
      day2Motions = [],
      preferredStance = "FREE",
      referralSource,
    } = body;

    // Validation
    if (!studentName || !studentClass || !schoolName || !schoolAddress || !parentName || !parentPhone || !parentEmail || !teacherName || !teacherPhone) {
      return NextResponse.json(
        { success: false, message: "Missing required registration fields" },
        { status: 400 }
      );
    }

    if (typeof parentEmail !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parentEmail)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid parent/guardian email address" },
        { status: 400 }
      );
    }

    if (!Array.isArray(day1Motions) || day1Motions.length !== 3) {
      return NextResponse.json(
        { success: false, message: "Please select exactly 3 preferred motions for Day 1" },
        { status: 400 }
      );
    }

    if (!Array.isArray(day2Motions) || day2Motions.length !== 2) {
      return NextResponse.json(
        { success: false, message: "Please select exactly 2 preferred motions for Day 2 (Grand Finale)" },
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
        studentName,
        studentClass,
        studentGender: studentGender || null,
        studentEmail: studentEmail || null,
        studentPhone: studentPhone || null,
        schoolName,
        schoolType: schoolType || "PUBLIC",
        schoolAddress: schoolAddress || "Enugu State",
        lga: lga || "Enugu North",
        state,
        schoolEmail: schoolEmail || null,
        schoolPhone: schoolPhone || null,
        parentName,
        parentPhone,
        parentEmail: parentEmail || null,
        teacherName,
        teacherPhone,
        teacherEmail: teacherEmail || null,
        day1Motions: JSON.stringify(day1Motions),
        day2Motions: JSON.stringify(day2Motions),
        preferredStance: preferredStance || "FREE",
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
          email: schoolEmail || teacherEmail || null,
          phone: schoolPhone || teacherPhone || null,
          status: "REGISTERED",
        },
      });

      // Add debater as team member
      await prisma.teamMember.create({
        data: {
          schoolId: createdSchool.id,
          fullName: studentName,
          role: "SPEAKER",
          classGrade: studentClass,
          email: studentEmail || null,
          phone: studentPhone || null,
        },
      });
    }

    // Send confirmation email to Student/Parent/Teacher if email provided
    const recipientEmail = studentEmail || parentEmail || teacherEmail || schoolEmail;
    if (recipientEmail) {
      const confirmationEmailHtml = generateRegistrationConfirmationEmail({
        studentName,
        studentClass,
        schoolName,
        regNumber,
        parentName,
        teacherName,
        day1MotionsCount: day1Motions.length,
        day2MotionsCount: day2Motions.length,
      });

      await sendEmail({
        to: recipientEmail,
        subject: `ESSD 2026 — Debater Accreditation Confirmed (${regNumber})`,
        html: confirmationEmailHtml,
        type: "REGISTRATION_CONFIRMATION",
      });
    }

    // Send internal admin alert
    const adminEmailHtml = generateAdminNotificationEmail({
      studentName,
      studentClass,
      schoolName,
      regNumber,
      lga: lga || "Enugu",
      parentPhone,
      teacherPhone,
      studentEmail,
    });

    await sendEmail({
      to: "theplaceeconsults@gmail.com",
      subject: `New Debater Registration: ${studentName} (${schoolName}) [${regNumber}]`,
      html: adminEmailHtml,
      type: "ADMIN_NOTIFICATION",
    });

    return NextResponse.json({
      success: true,
      registration: {
        id: registration.id,
        regNumber: registration.regNumber,
        studentName: registration.studentName,
        studentClass: registration.studentClass,
        schoolName: registration.schoolName,
        lga: registration.lga,
        parentName: registration.parentName,
        parentPhone: registration.parentPhone,
        teacherName: registration.teacherName,
        teacherPhone: registration.teacherPhone,
        day1Motions,
        day2Motions,
        preferredStance: registration.preferredStance,
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
