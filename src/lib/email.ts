import { RegistrationData } from "./types";

interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  type: string;
}

export async function sendEmail({ to, subject, html, type }: EmailPayload) {
  const apiKey = process.env.BREVO_API_KEY;
  const recipients = Array.isArray(to) ? to : [to];

  if (apiKey) {
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: process.env.BREVO_SENDER_NAME || "ESSD Championship",
            email: process.env.BREVO_SENDER_EMAIL || "notifications@essd.com.ng",
          },
          to: recipients.map((email) => ({ email })),
          subject,
          html,
        }),
      });
      const data = await res.json();
      return { success: res.ok, data, simulated: false };
    } catch (err) {
      console.error("Brevo dispatch error:", err);
    }
  }

  // Fallback Simulation Logger (useful for local development or staging)
  console.log(`\n================== [ESSD EMAIL SIMULATOR] ==================`);
  console.log(`Type: ${type}`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`============================================================\n`);

  return { success: true, simulated: true };
}

export function generateRegistrationConfirmationEmail(reg: {
  studentName: string;
  studentClass: string;
  schoolName: string;
  regNumber: string;
  parentName: string;
  teacherName: string;
  day1MotionsCount: number;
  day2MotionsCount: number;
}) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0A0A0C; color: #FAF6EB; margin: 0; padding: 24px; }
      .container { max-width: 600px; margin: 0 auto; background-color: #141418; border: 2px solid #E8A927; border-radius: 12px; overflow: hidden; }
      .header { background-color: #E8A927; color: #0A0A0C; padding: 24px; text-align: center; }
      .header h1 { margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; }
      .header p { margin: 6px 0 0 0; font-size: 13px; font-weight: 700; }
      .content { padding: 32px 24px; }
      .badge { display: inline-block; background-color: #F25A19; color: #FFF; font-weight: 800; padding: 6px 14px; border-radius: 6px; font-size: 14px; margin-bottom: 20px; }
      .details-box { background-color: #1E1E24; border-left: 4px solid #F25A19; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0; }
      .details-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #2A2A33; font-size: 14px; }
      .details-label { color: #E5DEC9; }
      .details-value { font-weight: bold; color: #E8A927; }
      .next-steps { background-color: rgba(232, 169, 39, 0.08); border: 1px dashed #E8A927; padding: 16px; border-radius: 8px; margin-top: 24px; }
      .next-steps h3 { color: #E8A927; margin-top: 0; font-size: 16px; }
      .next-steps ol { margin: 8px 0 0 0; padding-left: 20px; color: #E5DEC9; font-size: 14px; }
      .next-steps li { margin-bottom: 6px; }
      .footer { background-color: #0A0A0C; padding: 20px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #2A2A33; }
      .footer a { color: #E8A927; text-decoration: none; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>ESSD 2026 OFFICIAL REGISTRATION</h1>
        <p>Enugu State Secondary Schools Debate Championship</p>
      </div>
      <div class="content">
        <div class="badge">REGISTRATION CONFIRMED 🎉</div>
        <h2 style="margin-top: 0; color: #FAF6EB;">Welcome to the Championship, ${reg.studentName}!</h2>
        <p style="color: #E5DEC9; line-height: 1.6;">
          You have officially been registered as a competitor representing <strong>${reg.schoolName}</strong> in the Enugu State Secondary Schools Debate Championship themed <em>“Beyond the Algorithm: Reimagining Education in the Age of AI”</em>.
        </p>

        <div class="details-box">
          <div class="details-row"><span class="details-label">Accreditation ID:</span> <span class="details-value">${reg.regNumber}</span></div>
          <div class="details-row"><span class="details-label">Debater:</span> <span class="details-value">${reg.studentName} (${reg.studentClass})</span></div>
          <div class="details-row"><span class="details-label">School:</span> <span class="details-value">${reg.schoolName}</span></div>
          <div class="details-row"><span class="details-label">Parent / Guardian:</span> <span class="details-value">${reg.parentName}</span></div>
          <div class="details-row"><span class="details-label">Teacher / Coordinator:</span> <span class="details-value">${reg.teacherName}</span></div>
          <div class="details-row"><span class="details-label">Selected Motions:</span> <span class="details-value">${reg.day1MotionsCount} (Day 1) + ${reg.day2MotionsCount} (Day 2)</span></div>
          <div class="details-row"><span class="details-label">Event Dates:</span> <span class="details-value">16th & 17th October 2026</span></div>
          <div class="details-row"><span class="details-label">Venue:</span> <span class="details-value">HOTR Auditorium, House on the Rock Church, Enugu</span></div>
        </div>

        <div class="next-steps">
          <h3>📌 Important Next Steps:</h3>
          <ol>
            <li>Save your Accreditation ID (<strong>${reg.regNumber}</strong>) for morning check-in at HOTR Auditorium.</li>
            <li>Download and keep your official accreditation slip from the portal.</li>
            <li>Prepare arguments for your 3 selected Day 1 motions and 2 Grand Finale motions. You are free to debate any stance (Proposition or Opposition).</li>
            <li>Note that exactly 20 debaters from Day 1 will qualify for the Day 2 Grand Finale!</li>
          </ol>
        </div>

        <p style="margin-top: 24px; font-size: 14px; color: #E5DEC9;">
          For inquiries or assistance, reach the secretariat at <strong style="color: #FAF6EB;">+234 903 829 6513</strong> or email <a href="mailto:theplaceeconsults@gmail.com" style="color: #E8A927;">theplaceeconsults@gmail.com</a>.
        </p>
      </div>
      <div class="footer">
        &copy; 2026 Enugu State Secondary Schools Debate Championship (ESSD). All rights reserved.<br>
        Presented by The Placee Educational Consult in collaboration with House on the Rock Church, Enugu.
      </div>
    </div>
  </body>
  </html>
  `;
}

export function generateAdminNotificationEmail(reg: {
  studentName: string;
  studentClass: string;
  schoolName: string;
  regNumber: string;
  lga: string;
  parentPhone: string;
  teacherPhone: string;
  studentEmail?: string | null;
}) {
  return `
  <!DOCTYPE html>
  <html>
  <body style="font-family: sans-serif; background-color: #0A0A0C; color: #FAF6EB; padding: 20px;">
    <div style="max-width: 550px; margin: 0 auto; background: #141418; border-left: 4px solid #E8A927; padding: 20px; border-radius: 8px;">
      <h2 style="color: #E8A927; margin-top: 0;">New Debater Registration Received! 🏛️</h2>
      <p>A new student debater has registered for ESSD 2026:</p>
      <ul style="color: #FAF6EB; line-height: 1.8;">
        <li><strong>Debater:</strong> ${reg.studentName} (${reg.studentClass})</li>
        <li><strong>School:</strong> ${reg.schoolName} (${reg.lga})</li>
        <li><strong>Reg ID:</strong> ${reg.regNumber}</li>
        <li><strong>Parent Phone:</strong> ${reg.parentPhone}</li>
        <li><strong>Teacher Phone:</strong> ${reg.teacherPhone}</li>
        <li><strong>Student Email:</strong> ${reg.studentEmail || "N/A"}</li>
      </ul>
      <p style="margin-top: 20px;"><a href="http://localhost:3000/admin/registrations" style="display: inline-block; background: #E8A927; color: #0A0A0C; font-weight: bold; padding: 10px 18px; text-decoration: none; border-radius: 6px;">Open Admin Dashboard</a></p>
    </div>
  </body>
  </html>
  `;
}
