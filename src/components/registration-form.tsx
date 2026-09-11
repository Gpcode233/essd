"use client";

import { useState } from "react";
import { ENUGU_LGAS } from "@/lib/types";
import { Icons } from "@/components/icons";
import confetti from "canvas-confetti";

const INITIAL_FORM_DATA = {
  schoolName: "",
  schoolType: "PUBLIC",
  schoolAddress: "",
  lga: "Enugu North",
  state: "Enugu",
  schoolEmail: "",
  schoolPhone: "",
  contactName: "",
  contactRole: "Debate Coordinator / Teacher",
  contactPhone: "",
  contactEmail: "",
  // Exactly 2 Student Debaters & Parent Contacts
  debater1Name: "",
  debater1Class: "SS2",
  debater1ParentName: "",
  debater1ParentPhone: "",
  debater1ParentEmail: "",
  debater2Name: "",
  debater2Class: "SS2",
  debater2ParentName: "",
  debater2ParentPhone: "",
  debater2ParentEmail: "",
  captainChoice: "1", // "1" for Debater 1, "2" for Debater 2
  teacherName: "",
  referralSource: "Ministry of Education Circular",
  agreedToTerms: true,
};

export default function RegistrationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{
    regNumber: string;
    schoolName: string;
    lga: string;
    captainName: string;
    teacherName: string;
    debaterCount: number;
    debaterNames: string[];
    createdAt: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);

    if (!formData.schoolName || !formData.schoolEmail || !formData.schoolPhone) {
      setErrorMsg("Please provide all required school contact details.");
      setSubmitting(false);
      return;
    }

    if (!formData.debater1Name.trim() || !formData.debater2Name.trim()) {
      setErrorMsg("Please provide the full names for both student debaters (2 students required).");
      setSubmitting(false);
      return;
    }

    if (!formData.debater1ParentPhone.trim() || !formData.debater2ParentPhone.trim()) {
      setErrorMsg("Please provide parent/guardian phone numbers for both student debaters.");
      setSubmitting(false);
      return;
    }

    if (!formData.teacherName.trim()) {
      setErrorMsg("Please specify the supervising Teacher / Coordinator name.");
      setSubmitting(false);
      return;
    }

    try {
      const debaterNames = [formData.debater1Name.trim(), formData.debater2Name.trim()];
      const debaterClasses = [formData.debater1Class, formData.debater2Class];
      const captainName =
        formData.captainChoice === "1" ? formData.debater1Name.trim() : formData.debater2Name.trim();

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          debaterCount: 2,
          debaterNames,
          debaterClasses,
          captainName,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Registration failed. Please try again.");
      }

      setSuccessData({
        ...data.registration,
        debaterNames,
      });

      // Confetti celebration
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#E8A927", "#F25A19", "#FAF6EB", "#141418"],
      });
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (successData) {
    return (
      <div className="bg-essd-charcoal border-4 border-essd-gold p-6 sm:p-10 shadow-[10px_10px_0px_#0A0A0C] text-essd-cream animate-in zoom-in-95 duration-300 rounded-2xl">
        {/* Success Header */}
        <div className="text-center mb-8 pb-6 border-b border-essd-border">
          <div className="w-16 h-16 rounded-full bg-essd-gold text-essd-black flex items-center justify-center mx-auto mb-4 border-2 border-essd-cream shadow-[0_0_20px_rgba(232,169,39,0.5)]">
            <Icons.CheckCircle className="w-10 h-10" />
          </div>
          <span className="px-3.5 py-1 bg-essd-orange text-white font-mono text-xs font-black uppercase tracking-wider inline-block mb-2 rounded-full">
            Registration Confirmed 🎉
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-display uppercase tracking-wide text-essd-gold">
            You're Officially Registered!
          </h2>
          <p className="text-xs sm:text-sm text-essd-cream-muted mt-2 max-w-lg mx-auto font-sans">
            Your 2-student debate delegation is confirmed for the Enugu State Secondary Schools Debate Championship 2026.
          </p>
        </div>

        {/* Printable Official Pass */}
        <div className="bg-essd-black p-6 sm:p-8 border-4 border-essd-cream shadow-[6px_6px_0px_#0A0A0C] mb-8 relative overflow-hidden rounded-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b-2 border-essd-gold gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-essd-gold text-essd-black font-display font-black text-xs flex items-center justify-center">
                ESSD
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-essd-gold block">
                  Official Team Accreditation Pass
                </span>
                <span className="text-xs sm:text-sm font-bold font-display uppercase text-essd-cream">
                  ESSD State Championship 2026
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-mono text-essd-cream-muted uppercase block">
                Official Registration ID
              </span>
              <span className="text-base sm:text-lg font-mono font-black text-essd-orange tracking-wider">
                {successData.regNumber}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 text-xs font-mono">
            <div className="space-y-2">
              <div className="p-2.5 bg-essd-dark/80 border border-essd-border rounded-xl">
                <span className="text-essd-cream-muted block text-[10px]">Registered School:</span>
                <span className="text-sm font-bold text-essd-gold">{successData.schoolName}</span>
              </div>
              <div className="p-2.5 bg-essd-dark/80 border border-essd-border rounded-xl">
                <span className="text-essd-cream-muted block text-[10px]">LGA / Jurisdiction:</span>
                <span className="font-bold text-essd-cream">{successData.lga} LGA, Enugu State</span>
              </div>
              <div className="p-2.5 bg-essd-dark/80 border border-essd-border rounded-xl">
                <span className="text-essd-cream-muted block text-[10px]">Supervising Coordinator:</span>
                <span className="font-bold text-essd-cream">{successData.teacherName}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 bg-essd-dark/80 border border-essd-gold/60 rounded-xl">
                <span className="text-essd-gold block text-[10px] uppercase font-bold">
                  2 Registered Student Debaters:
                </span>
                <p className="text-sm font-bold text-essd-cream mt-0.5">
                  1. {successData.debaterNames?.[0] || successData.captainName} (Lead)
                </p>
                <p className="text-sm font-bold text-essd-cream">
                  2. {successData.debaterNames?.[1] || "Second Speaker"}
                </p>
              </div>
              <div className="p-2.5 bg-essd-dark/80 border border-essd-border rounded-xl">
                <span className="text-essd-cream-muted block text-[10px]">Event Dates &amp; Venue:</span>
                <span className="font-bold text-essd-gold">16th &amp; 17th Oct 2026 • HOTR Auditorium, Enugu</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-essd-border/80 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-essd-cream-muted gap-2">
            <div className="flex items-center gap-1.5">
              <Icons.Shield className="w-4 h-4 text-essd-gold" />
              <span>Accreditation Valid for 2 Student Debaters + 1 Coordinator</span>
            </div>
            <span className="text-essd-gold font-bold">
              Automatic Matchmaking Upon Registration Close
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-essd-gold text-essd-black font-display font-black text-sm uppercase tracking-wider border-2 border-essd-cream shadow-[4px_4px_0px_#0A0A0C] hover:bg-essd-orange hover:text-white transition-all rounded-xl"
          >
            <Icons.Printer className="w-4 h-4 mr-2" />
            Print / Save Pass (PDF)
          </button>

          <button
            onClick={() => {
              setSuccessData(null);
              setFormData(INITIAL_FORM_DATA);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-essd-dark text-essd-cream hover:text-essd-gold font-mono font-bold text-xs uppercase border border-essd-border rounded-xl"
          >
            Register Another School
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-essd-charcoal border-4 border-essd-border p-6 sm:p-10 shadow-[8px_8px_0px_#0A0A0C] text-essd-cream space-y-8 rounded-2xl"
    >
      {errorMsg && (
        <div className="p-4 bg-red-950/80 border-2 border-red-500 text-red-200 text-xs font-mono flex items-start gap-3 rounded-xl">
          <Icons.Alert className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold uppercase">Submission Error</strong>
            {errorMsg}
          </div>
        </div>
      )}

      {/* Info notice about 2 debaters per school */}
      <div className="p-4 bg-essd-gold/10 border-2 border-essd-gold text-xs font-mono text-essd-cream flex items-start gap-3 rounded-xl">
        <Icons.Trophy className="w-5 h-5 text-essd-gold flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold uppercase text-essd-gold block">
            Official 2-Student Delegation Format:
          </span>
          Each registered secondary school enters a 2-student debate squad (Speaker 1 &amp; Speaker 2) guided by 1 supervising teacher. Once all 16 schools register, the tournament matchmaking draw automatically pairs schools into the Round of 16 bracket!
        </div>
      </div>

      {/* Section 1: School Information */}
      <div>
        <div className="flex items-center gap-2 pb-3 mb-6 border-b-2 border-essd-gold">
          <Icons.School className="w-5 h-5 text-essd-gold" />
          <h3 className="text-lg font-black font-display uppercase tracking-wide text-essd-cream">
            1. School Profile &amp; Location
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-xs font-mono font-bold text-essd-gold uppercase mb-1.5">
              Official School Name *
            </label>
            <input
              type="text"
              name="schoolName"
              required
              placeholder="e.g. College of the Immaculate Conception (CIC) Enugu"
              value={formData.schoolName}
              onChange={handleChange}
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-sans focus:outline-none transition-colors rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-essd-cream-muted uppercase mb-1.5">
              School Type *
            </label>
            <select
              name="schoolType"
              value={formData.schoolType}
              onChange={handleChange}
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-mono focus:outline-none rounded-xl"
            >
              <option value="PUBLIC">Public State Secondary School</option>
              <option value="PRIVATE">Private International / High School</option>
              <option value="MISSION">Mission / Faith-Based College</option>
              <option value="FEDERAL">Federal Unity College</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-essd-cream-muted uppercase mb-1.5">
              Local Government Area (LGA) in Enugu *
            </label>
            <select
              name="lga"
              value={formData.lga}
              onChange={handleChange}
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-mono focus:outline-none rounded-xl"
            >
              {ENUGU_LGAS.map((lga) => (
                <option key={lga} value={lga}>
                  {lga} LGA
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono font-bold text-essd-cream-muted uppercase mb-1.5">
              School Physical Address *
            </label>
            <input
              type="text"
              name="schoolAddress"
              required
              placeholder="e.g. Ogui Road / Independence Layout / University Road Nsukka"
              value={formData.schoolAddress}
              onChange={handleChange}
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-sans focus:outline-none rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-essd-cream-muted uppercase mb-1.5">
              School Official Email *
            </label>
            <input
              type="email"
              name="schoolEmail"
              required
              placeholder="school@example.com"
              value={formData.schoolEmail}
              onChange={handleChange}
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-mono focus:outline-none rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-essd-cream-muted uppercase mb-1.5">
              School Phone Number *
            </label>
            <input
              type="tel"
              name="schoolPhone"
              required
              placeholder="+234 803 000 0000"
              value={formData.schoolPhone}
              onChange={handleChange}
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-mono focus:outline-none rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Contact Person / Coordinator */}
      <div>
        <div className="flex items-center gap-2 pb-3 mb-6 border-b-2 border-essd-orange">
          <Icons.User className="w-5 h-5 text-essd-orange" />
          <h3 className="text-lg font-black font-display uppercase tracking-wide text-essd-cream">
            2. Teacher / Coordinator Contact
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-mono font-bold text-essd-cream-muted uppercase mb-1.5">
              Teacher Coordinator Full Name *
            </label>
            <input
              type="text"
              name="teacherName"
              required
              placeholder="e.g. Mr. Emmanuel Nwankwo"
              value={formData.teacherName}
              onChange={handleChange}
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-sans focus:outline-none rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-essd-cream-muted uppercase mb-1.5">
              Role / Designation *
            </label>
            <input
              type="text"
              name="contactRole"
              required
              placeholder="e.g. Debate Coach / English Dept / Vice Principal"
              value={formData.contactRole}
              onChange={handleChange}
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-sans focus:outline-none rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-essd-cream-muted uppercase mb-1.5">
              Teacher Phone Number *
            </label>
            <input
              type="tel"
              name="contactPhone"
              required
              placeholder="+234 803 123 4567"
              value={formData.contactPhone || formData.schoolPhone}
              onChange={handleChange}
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-mono focus:outline-none rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-essd-cream-muted uppercase mb-1.5">
              Teacher Email Address *
            </label>
            <input
              type="email"
              name="contactEmail"
              required
              placeholder="coordinator@example.com"
              value={formData.contactEmail || formData.schoolEmail}
              onChange={handleChange}
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-mono focus:outline-none rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Section 3: The 2 Student Debaters */}
      <div>
        <div className="flex items-center gap-2 pb-3 mb-6 border-b-2 border-essd-gold">
          <Icons.Users className="w-5 h-5 text-essd-gold" />
          <div>
            <h3 className="text-lg font-black font-display uppercase tracking-wide text-essd-cream">
              3. The Two (2) Student Debaters
            </h3>
            <span className="text-[11px] font-mono text-essd-gold font-bold">
              Register exactly 2 students to represent your secondary school.
            </span>
          </div>
        </div>

        <div className="space-y-5">
          {/* Debater 1 */}
          <div className="p-5 bg-essd-black border-2 border-essd-gold/70 shadow-[3px_3px_0px_#0A0A0C] rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-black uppercase text-essd-gold">
                Student Debater 01 (Lead Speaker) *
              </span>
              <label className="flex items-center gap-1.5 text-xs font-mono text-essd-cream cursor-pointer">
                <input
                  type="radio"
                  name="captainChoice"
                  value="1"
                  checked={formData.captainChoice === "1"}
                  onChange={handleChange}
                  className="text-essd-gold focus:ring-0"
                />
                <span>Designate as Captain 👑</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[11px] font-mono font-bold text-essd-cream-muted uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="debater1Name"
                  required
                  placeholder="First Name &amp; Surname"
                  value={formData.debater1Name}
                  onChange={handleChange}
                  className="w-full bg-essd-dark border border-essd-border px-3 py-2 text-xs text-essd-cream font-sans focus:outline-none focus:border-essd-gold rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono font-bold text-essd-cream-muted uppercase mb-1">
                  Class / Grade *
                </label>
                <select
                  name="debater1Class"
                  value={formData.debater1Class}
                  onChange={handleChange}
                  className="w-full bg-essd-dark border border-essd-border px-3 py-2 text-xs text-essd-cream font-mono focus:outline-none rounded-lg"
                >
                  <option value="SS3">Senior Secondary 3 (SS3)</option>
                  <option value="SS2">Senior Secondary 2 (SS2)</option>
                  <option value="SS1">Senior Secondary 1 (SS1)</option>
                </select>
              </div>
            </div>

            {/* Debater 1 Parent / Guardian Info */}
            <div className="mt-4 pt-3.5 border-t border-essd-border/60">
              <span className="text-[10px] font-mono uppercase font-bold text-essd-gold block mb-2 flex items-center gap-1.5">
                <Icons.User className="w-3.5 h-3.5 text-essd-gold" />
                Student 01 Parent / Guardian Contact Details
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-essd-cream-muted uppercase mb-1">
                    Parent Full Name
                  </label>
                  <input
                    type="text"
                    name="debater1ParentName"
                    placeholder="e.g. Mr. / Mrs. Okonkwo"
                    value={formData.debater1ParentName}
                    onChange={handleChange}
                    className="w-full bg-essd-dark border border-essd-border px-3 py-1.5 text-xs text-essd-cream font-sans focus:outline-none focus:border-essd-gold rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-essd-cream-muted uppercase mb-1">
                    Parent Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="debater1ParentPhone"
                    required
                    placeholder="+234 803 000 0000"
                    value={formData.debater1ParentPhone}
                    onChange={handleChange}
                    className="w-full bg-essd-dark border border-essd-border px-3 py-1.5 text-xs text-essd-cream font-mono focus:outline-none focus:border-essd-gold rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-essd-cream-muted uppercase mb-1">
                    Parent Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="debater1ParentEmail"
                    placeholder="parent@example.com"
                    value={formData.debater1ParentEmail}
                    onChange={handleChange}
                    className="w-full bg-essd-dark border border-essd-border px-3 py-1.5 text-xs text-essd-cream font-mono focus:outline-none focus:border-essd-gold rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Debater 2 */}
          <div className="p-5 bg-essd-black border-2 border-essd-orange/70 shadow-[3px_3px_0px_#0A0A0C] rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-black uppercase text-essd-orange">
                Student Debater 02 (Second Speaker) *
              </span>
              <label className="flex items-center gap-1.5 text-xs font-mono text-essd-cream cursor-pointer">
                <input
                  type="radio"
                  name="captainChoice"
                  value="2"
                  checked={formData.captainChoice === "2"}
                  onChange={handleChange}
                  className="text-essd-orange focus:ring-0"
                />
                <span>Designate as Captain 👑</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[11px] font-mono font-bold text-essd-cream-muted uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="debater2Name"
                  required
                  placeholder="First Name &amp; Surname"
                  value={formData.debater2Name}
                  onChange={handleChange}
                  className="w-full bg-essd-dark border border-essd-border px-3 py-2 text-xs text-essd-cream font-sans focus:outline-none focus:border-essd-orange rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono font-bold text-essd-cream-muted uppercase mb-1">
                  Class / Grade *
                </label>
                <select
                  name="debater2Class"
                  value={formData.debater2Class}
                  onChange={handleChange}
                  className="w-full bg-essd-dark border border-essd-border px-3 py-2 text-xs text-essd-cream font-mono focus:outline-none rounded-lg"
                >
                  <option value="SS3">Senior Secondary 3 (SS3)</option>
                  <option value="SS2">Senior Secondary 2 (SS2)</option>
                  <option value="SS1">Senior Secondary 1 (SS1)</option>
                </select>
              </div>
            </div>

            {/* Debater 2 Parent / Guardian Info */}
            <div className="mt-4 pt-3.5 border-t border-essd-border/60">
              <span className="text-[10px] font-mono uppercase font-bold text-essd-orange block mb-2 flex items-center gap-1.5">
                <Icons.User className="w-3.5 h-3.5 text-essd-orange" />
                Student 02 Parent / Guardian Contact Details
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-essd-cream-muted uppercase mb-1">
                    Parent Full Name
                  </label>
                  <input
                    type="text"
                    name="debater2ParentName"
                    placeholder="e.g. Mr. / Mrs. Eze"
                    value={formData.debater2ParentName}
                    onChange={handleChange}
                    className="w-full bg-essd-dark border border-essd-border px-3 py-1.5 text-xs text-essd-cream font-sans focus:outline-none focus:border-essd-orange rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-essd-cream-muted uppercase mb-1">
                    Parent Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="debater2ParentPhone"
                    required
                    placeholder="+234 803 000 0000"
                    value={formData.debater2ParentPhone}
                    onChange={handleChange}
                    className="w-full bg-essd-dark border border-essd-border px-3 py-1.5 text-xs text-essd-cream font-mono focus:outline-none focus:border-essd-orange rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-essd-cream-muted uppercase mb-1">
                    Parent Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="debater2ParentEmail"
                    placeholder="parent@example.com"
                    value={formData.debater2ParentEmail}
                    onChange={handleChange}
                    className="w-full bg-essd-dark border border-essd-border px-3 py-1.5 text-xs text-essd-cream font-mono focus:outline-none focus:border-essd-orange rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Agreement */}
      <div className="space-y-4 pt-4 border-t border-essd-border">
        <div className="flex items-start gap-3 p-4 bg-essd-dark/60 border border-essd-border rounded-xl">
          <input
            type="checkbox"
            name="agreedToTerms"
            id="agreedToTerms"
            required
            checked={formData.agreedToTerms}
            onChange={handleChange}
            className="mt-1 w-4 h-4 text-essd-gold bg-essd-black border-essd-border rounded focus:ring-0"
          />
          <label htmlFor="agreedToTerms" className="text-xs text-essd-cream-muted font-sans leading-relaxed">
            I confirm that these 2 registered students are currently enrolled in our secondary school, and our school commits to participating in the championship fixtures upon completion of the tournament matchmaking draw.
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 bg-essd-gold text-essd-black hover:bg-essd-orange hover:text-white font-display text-base font-black uppercase tracking-wider border-4 border-essd-cream shadow-[6px_6px_0px_#0A0A0C] hover:shadow-[2px_2px_0px_#0A0A0C] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50 rounded-xl"
        >
          {submitting ? (
            <span>Securing Registration &amp; Slot...</span>
          ) : (
            <>
              <Icons.Sparkles className="w-5 h-5 fill-current" />
              Register 2 Debaters &amp; Secure Slot
              <Icons.ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
