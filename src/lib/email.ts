import { RegistrationData } from "./types";

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  type: string;
}

export async function sendEmail({ to, subject, html, type }: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "ESSD Championship <notifications@essd-championship.ng>",
          to,
          subject,
          html,
        }),
      });
      const data = await res.json();
      return { success: res.ok, data, simulated: false };
    } catch (err) {
      console.error("Resend dispatch error:", err);
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
  schoolName: string;
  regNumber: string;
  captainName: string;
  teacherName: string;
  debaterCount: number;
}) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0A0A0C; color: #FAF6EB; margin: 0; padding: 24px; }
      .container { max-width: 600px; margin: 0 auto; background-color: #141418; border: 2px solid #E8A927; border-radius: 8px; overflow: hidden; }
      .header { background-color: #E8A927; color: #0A0A0C; padding: 24px; text-align: center; }
      .header h1 { margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; }
      .header p { margin: 6px 0 0 0; font-size: 13px; font-weight: 700; }
      .content { padding: 32px 24px; }
      .badge { display: inline-block; background-color: #F25A19; color: #FFF; font-weight: 800; padding: 6px 14px; border-radius: 4px; font-size: 14px; margin-bottom: 20px; }
      .details-box { background-color: #1E1E24; border-left: 4px solid #F25A19; padding: 16px; margin: 20px 0; border-radius: 0 6px 6px 0; }
      .details-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #2A2A33; font-size: 14px; }
      .details-label { color: #E5DEC9; }
      .details-value { font-weight: bold; color: #E8A927; }
      .next-steps { background-color: rgba(232, 169, 39, 0.08); border: 1px dashed #E8A927; padding: 16px; border-radius: 6px; margin-top: 24px; }
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
        <h2 style="margin-top: 0; color: #FAF6EB;">Welcome to the Championship, ${reg.schoolName}!</h2>
        <p style="color: #E5DEC9; line-height: 1.6;">
          Your debate team has officially been registered for the prestigious Enugu State Secondary Schools Debate Championship themed <em>“Beyond the Algorithm: Reimagining Education in the Age of AI”</em>.
        </p>

        <div class="details-box">
          <div class="details-row"><span class="details-label">Registration ID:</span> <span class="details-value">${reg.regNumber}</span></div>
          <div class="details-row"><span class="details-label">School:</span> <span class="details-value">${reg.schoolName}</span></div>
          <div class="details-row"><span class="details-label">Debate Captain:</span> <span class="details-value">${reg.captainName}</span></div>
          <div class="details-row"><span class="details-label">Teacher / Coordinator:</span> <span class="details-value">${reg.teacherName}</span></div>
          <div class="details-row"><span class="details-label">Delegation Size:</span> <span class="details-value">${reg.debaterCount} Debaters</span></div>
          <div class="details-row"><span class="details-label">Event Dates:</span> <span class="details-value">16th & 17th October 2026</span></div>
        </div>

        <div class="next-steps">
          <h3>📌 Important Next Steps:</h3>
          <ol>
            <li>Save your Registration ID (<strong>${reg.regNumber}</strong>) for accreditation check-in.</li>
            <li>Download and print your official team pass badge from the registration portal.</li>
            <li>Round 16 debate fixture pairings and motion disclosures will be announced on the portal.</li>
            <li>Ensure debaters review the WSDC (World Schools Debating Championship) timing standards.</li>
          </ol>
        </div>

        <p style="margin-top: 24px; font-size: 14px; color: #E5DEC9;">
          For inquiries or assistance, reach the secretariat at <strong style="color: #FAF6EB;">+234 903 829 6513</strong> or email <a href="mailto:theplaceeconsults@gmail.com" style="color: #E8A927;">theplaceeconsults@gmail.com</a>.
        </p>
      </div>
      <div class="footer">
        &copy; 2026 Enugu State Secondary Schools Debate Championship (ESSD). All rights reserved.<br>
        Organized by The Placee Consults & Partners.
      </div>
    </div>
  </body>
  </html>
  `;
}

export function generateAdminNotificationEmail(reg: {
  schoolName: string;
  regNumber: string;
  lga: string;
  schoolPhone: string;
  schoolEmail: string;
  contactName: string;
}) {
  return `
  <!DOCTYPE html>
  <html>
  <body style="font-family: sans-serif; background-color: #0A0A0C; color: #FAF6EB; padding: 20px;">
    <div style="max-width: 550px; margin: 0 auto; background: #141418; border-left: 4px solid #E8A927; padding: 20px; border-radius: 6px;">
      <h2 style="color: #E8A927; margin-top: 0;">New School Registration Received! 🏛️</h2>
      <p>A new secondary school has submitted registration for ESSD 2026:</p>
      <ul style="color: #FAF6EB; line-height: 1.8;">
        <li><strong>School:</strong> ${reg.schoolName} (${reg.lga} LGA)</li>
        <li><strong>Reg ID:</strong> ${reg.regNumber}</li>
        <li><strong>Contact Person:</strong> ${reg.contactName}</li>
        <li><strong>Phone:</strong> ${reg.schoolPhone}</li>
        <li><strong>Email:</strong> ${reg.schoolEmail}</li>
      </ul>
      <p style="margin-top: 20px;"><a href="http://localhost:3000/admin/registrations" style="display: inline-block; background: #E8A927; color: #0A0A0C; font-weight: bold; padding: 10px 18px; text-decoration: none; border-radius: 4px;">Open Admin Dashboard</a></p>
    </div>
  </body>
  </html>
  `;
}
