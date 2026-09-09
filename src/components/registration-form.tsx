"use client";

import { useState } from "react";
import { ENUGU_LGAS } from "@/lib/types";
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, Printer, Download, School, User, Users, BookOpen, ShieldCheck, Trophy } from "lucide-react";
import confetti from "canvas-confetti";

export default function RegistrationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{
    regNumber: string;
    schoolName: string;
    lga: string;
    captainName: string;
    teacherName: string;
    debaterCount: number;
    createdAt: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    schoolName: "",
    schoolType: "PUBLIC",
    schoolAddress: "",
    lga: "Enugu North",
    state: "Enugu",
    schoolEmail: "",
    schoolPhone: "",
    contactName: "",
    contactRole: "Debate Coordinator / Master",
    contactPhone: "",
    contactEmail: "",
    debaterCount: 3,
    debater1Name: "",
    debater1Class: "SS3",
    debater2Name: "",
    debater2Class: "SS2",
    debater3Name: "",
    debater3Class: "SS2",
    debater4Name: "",
    debater4Class: "SS1",
    captainName: "",
    teacherName: "",
    referralSource: "Ministry of Education Circular",
    agreedToTerms: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      setErrorMsg("Please provide all required school contact information.");
      setSubmitting(false);
      return;
    }

    if (!formData.captainName || !formData.teacherName) {
      setErrorMsg("Please specify the Debate Captain and Teacher Coordinator.");
      setSubmitting(false);
      return;
    }

    try {
      const debaterNames = [
        formData.debater1Name,
        formData.debater2Name,
        formData.debater3Name,
      ].filter(Boolean);

      if (formData.debaterCount > 3 && formData.debater4Name) {
        debaterNames.push(formData.debater4Name);
      }

      const debaterClasses = [
        formData.debater1Class,
        formData.debater2Class,
        formData.debater3Class,
      ];
      if (formData.debaterCount > 3) {
        debaterClasses.push(formData.debater4Class);
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          debaterNames,
          debaterClasses,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Registration failed. Please try again.");
      }

      setSuccessData(data.registration);
      // Trigger celebratory confetti
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
      <div className="bg-essd-charcoal border-4 border-essd-gold p-6 sm:p-10 shadow-[10px_10px_0px_#0A0A0C] text-essd-cream animate-in zoom-in-95 duration-300">
        
        {/* Success Header */}
        <div className="text-center mb-8 pb-6 border-b border-essd-border">
          <div className="w-16 h-16 rounded-full bg-essd-gold text-essd-black flex items-center justify-center mx-auto mb-4 border-2 border-essd-cream shadow-[0_0_20px_rgba(232,169,39,0.5)]">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="px-3 py-1 bg-essd-orange text-white font-mono text-xs font-black uppercase tracking-wider inline-block mb-2">
            Registration Successful 🎉
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-display uppercase tracking-tight text-essd-gold">
            You're Officially Registered!
          </h2>
          <p className="text-xs sm:text-sm text-essd-cream-muted mt-2 max-w-lg mx-auto font-sans">
            Your school has secured its official registration for the Enugu State Secondary Schools Debate Championship 2026.
          </p>
        </div>

        {/* Printable Official Accreditation Pass */}
        <div id="printable-badge" className="bg-essd-black p-6 sm:p-8 border-4 border-essd-cream shadow-[6px_6px_0px_#0A0A0C] mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-essd-gold/10 rounded-full blur-xl pointer-events-none"></div>

          {/* Top Pass Strip */}
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

          {/* Pass Body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2 bg-essd-dark/80 border border-essd-border">
                <span className="text-essd-cream-muted block text-[10px]">Registered School:</span>
                <span className="text-sm font-bold text-essd-gold">{successData.schoolName}</span>
              </div>
              <div className="p-2 bg-essd-dark/80 border border-essd-border">
                <span className="text-essd-cream-muted block text-[10px]">LGA / Jurisdiction:</span>
                <span className="font-bold text-essd-cream">{successData.lga} LGA, Enugu State</span>
              </div>
              <div className="p-2 bg-essd-dark/80 border border-essd-border">
                <span className="text-essd-cream-muted block text-[10px]">Debate Delegation Size:</span>
                <span className="font-bold text-essd-cream">{successData.debaterCount} Accredited Debaters</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2 bg-essd-dark/80 border border-essd-border">
                <span className="text-essd-cream-muted block text-[10px]">Debate Team Captain:</span>
                <span className="text-sm font-bold text-essd-cream">{successData.captainName}</span>
              </div>
              <div className="p-2 bg-essd-dark/80 border border-essd-border">
                <span className="text-essd-cream-muted block text-[10px]">Teacher / Coordinator:</span>
                <span className="font-bold text-essd-cream">{successData.teacherName}</span>
              </div>
              <div className="p-2 bg-essd-dark/80 border border-essd-border">
                <span className="text-essd-cream-muted block text-[10px]">Event Dates &amp; Venue:</span>
                <span className="font-bold text-essd-gold">16th &amp; 17th Oct 2026 • Enugu Secretariat</span>
              </div>
            </div>
          </div>

          {/* Bottom accreditation note */}
          <div className="pt-4 border-t border-essd-border/80 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-essd-cream-muted gap-2">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-essd-gold" />
              <span>Accreditation Valid for Main Auditorium Entry</span>
            </div>
            <span className="text-essd-gold font-bold">
              Organized by The Placee Consults
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-essd-gold text-essd-black font-display font-black text-sm uppercase tracking-wider border-2 border-essd-cream shadow-[4px_4px_0px_#0A0A0C] hover:bg-essd-orange hover:text-white transition-all"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print / Save Pass (PDF)
          </button>

          <button
            onClick={() => {
              setSuccessData(null);
              setFormData({
                schoolName: "",
                schoolType: "PUBLIC",
                schoolAddress: "",
                lga: "Enugu North",
                state: "Enugu",
                schoolEmail: "",
                schoolPhone: "",
                contactName: "",
                contactRole: "Debate Coordinator / Master",
                contactPhone: "",
                contactEmail: "",
                debaterCount: 3,
                debater1Name: "",
                debater1Class: "SS3",
                debater2Name: "",
                debater2Class: "SS2",
                debater3Name: "",
                debater3Class: "SS2",
                debater4Name: "",
                debater4Class: "SS1",
                captainName: "",
                teacherName: "",
                referralSource: "Ministry of Education Circular",
                agreedToTerms: true,
              });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-essd-dark text-essd-cream hover:text-essd-gold font-mono font-bold text-xs uppercase border border-essd-border"
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
      className="bg-essd-charcoal border-4 border-essd-border p-6 sm:p-10 shadow-[8px_8px_0px_#0A0A0C] text-essd-cream space-y-8"
    >
      {errorMsg && (
        <div className="p-4 bg-red-950/80 border-2 border-red-500 text-red-200 text-xs font-mono flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold uppercase">Submission Error</strong>
            {errorMsg}
          </div>
        </div>
      )}

      {/* Section 1: School Information */}
      <div>
        <div className="flex items-center gap-2 pb-3 mb-6 border-b-2 border-essd-gold">
          <School className="w-5 h-5 text-essd-gold" />
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
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-sans focus:outline-none transition-colors"
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
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-mono focus:outline-none"
            >
              <option value="PUBLIC">Public State Secondary School</option>
              <option value="PRIVATE">Private International / High School</option>
              <option value="MISSION">Mission / Faith-Based College</option>
              <option value="FEDERAL">Federal Unity College</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-essd-cream-muted uppercase mb-1.5">
              Local Government Area (LGA) *
            </label>
            <select
              name="lga"
              value={formData.lga}
              onChange={handleChange}
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-mono focus:outline-none"
            >
              {ENUGU_LGAS.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
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
              placeholder="e.g. Independence Layout / Ogui Road / University Road Nsukka"
              value={formData.schoolAddress}
              onChange={handleChange}
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-sans focus:outline-none transition-colors"
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
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-mono focus:outline-none transition-colors"
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
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-mono focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Contact Person */}
      <div>
        <div className="flex items-center gap-2 pb-3 mb-6 border-b-2 border-essd-orange">
          <User className="w-5 h-5 text-essd-orange" />
          <h3 className="text-lg font-black font-display uppercase tracking-wide text-essd-cream">
            2. Teacher / Coordinator Contact
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-mono font-bold text-essd-cream-muted uppercase mb-1.5">
              Coordinator Full Name *
            </label>
            <input
              type="text"
              name="contactName"
              required
              placeholder="e.g. Mr. Emmanuel Nwankwo"
              value={formData.contactName}
              onChange={handleChange}
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-sans focus:outline-none"
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
              placeholder="e.g. Debate Coach / English Dept Head / Vice Principal"
              value={formData.contactRole}
              onChange={handleChange}
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-sans focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-essd-cream-muted uppercase mb-1.5">
              Coordinator Phone Number *
            </label>
            <input
              type="tel"
              name="contactPhone"
              required
              placeholder="+234 803 123 4567"
              value={formData.contactPhone}
              onChange={handleChange}
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-mono focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-essd-cream-muted uppercase mb-1.5">
              Coordinator Email *
            </label>
            <input
              type="email"
              name="contactEmail"
              required
              placeholder="coordinator@example.com"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-mono focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Debate Team Squad */}
      <div>
        <div className="flex items-center gap-2 pb-3 mb-6 border-b-2 border-essd-gold">
          <Users className="w-5 h-5 text-essd-gold" />
          <h3 className="text-lg font-black font-display uppercase tracking-wide text-essd-cream">
            3. Debate Team Squad &amp; Speakers
          </h3>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-essd-gold uppercase mb-1.5">
                Debate Team Captain *
              </label>
              <input
                type="text"
                name="captainName"
                required
                placeholder="Full Name of Student Captain"
                value={formData.captainName}
                onChange={handleChange}
                className="w-full bg-essd-black border-2 border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-sans focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-essd-gold uppercase mb-1.5">
                Teacher / Patron In Charge *
              </label>
              <input
                type="text"
                name="teacherName"
                required
                placeholder="Full Name of Supervising Teacher"
                value={formData.teacherName}
                onChange={handleChange}
                className="w-full bg-essd-black border-2 border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-sans focus:outline-none"
              />
            </div>
          </div>

          {/* Debater 1 */}
          <div className="p-4 bg-essd-black border border-essd-border grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-[11px] font-mono font-bold text-essd-cream-muted uppercase mb-1">
                Speaker 1 (Prime Minister / 1st Prop) *
              </label>
              <input
                type="text"
                name="debater1Name"
                required
                placeholder="Student Full Name"
                value={formData.debater1Name}
                onChange={handleChange}
                className="w-full bg-essd-dark border border-essd-border px-3 py-2 text-xs text-essd-cream font-sans focus:outline-none focus:border-essd-gold"
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
                className="w-full bg-essd-dark border border-essd-border px-3 py-2 text-xs text-essd-cream font-mono focus:outline-none"
              >
                <option value="SS3">Senior Secondary 3 (SS3)</option>
                <option value="SS2">Senior Secondary 2 (SS2)</option>
                <option value="SS1">Senior Secondary 1 (SS1)</option>
              </select>
            </div>
          </div>

          {/* Debater 2 */}
          <div className="p-4 bg-essd-black border border-essd-border grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-[11px] font-mono font-bold text-essd-cream-muted uppercase mb-1">
                Speaker 2 (Deputy / 2nd Speaker) *
              </label>
              <input
                type="text"
                name="debater2Name"
                required
                placeholder="Student Full Name"
                value={formData.debater2Name}
                onChange={handleChange}
                className="w-full bg-essd-dark border border-essd-border px-3 py-2 text-xs text-essd-cream font-sans focus:outline-none focus:border-essd-gold"
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
                className="w-full bg-essd-dark border border-essd-border px-3 py-2 text-xs text-essd-cream font-mono focus:outline-none"
              >
                <option value="SS3">Senior Secondary 3 (SS3)</option>
                <option value="SS2">Senior Secondary 2 (SS2)</option>
                <option value="SS1">Senior Secondary 1 (SS1)</option>
              </select>
            </div>
          </div>

          {/* Debater 3 */}
          <div className="p-4 bg-essd-black border border-essd-border grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-[11px] font-mono font-bold text-essd-cream-muted uppercase mb-1">
                Speaker 3 (Whip / Rebuttal Specialist) *
              </label>
              <input
                type="text"
                name="debater3Name"
                required
                placeholder="Student Full Name"
                value={formData.debater3Name}
                onChange={handleChange}
                className="w-full bg-essd-dark border border-essd-border px-3 py-2 text-xs text-essd-cream font-sans focus:outline-none focus:border-essd-gold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono font-bold text-essd-cream-muted uppercase mb-1">
                Class / Grade *
              </label>
              <select
                name="debater3Class"
                value={formData.debater3Class}
                onChange={handleChange}
                className="w-full bg-essd-dark border border-essd-border px-3 py-2 text-xs text-essd-cream font-mono focus:outline-none"
              >
                <option value="SS3">Senior Secondary 3 (SS3)</option>
                <option value="SS2">Senior Secondary 2 (SS2)</option>
                <option value="SS1">Senior Secondary 1 (SS1)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Terms & Referral */}
      <div className="space-y-4 pt-4 border-t border-essd-border">
        <div>
          <label className="block text-xs font-mono font-bold text-essd-cream-muted uppercase mb-1.5">
            How did your school hear about ESSD 2026?
          </label>
          <select
            name="referralSource"
            value={formData.referralSource}
            onChange={handleChange}
            className="w-full bg-essd-black border-2 border-essd-border focus:border-essd-gold px-4 py-2.5 text-sm text-essd-cream font-mono focus:outline-none"
          >
            <option value="Ministry of Education Circular">Enugu State Ministry of Education Circular</option>
            <option value="Official Poster & Social Media">Official Poster &amp; Social Media Artwork</option>
            <option value="Direct Invitation by The Placee Consults">Direct Invitation by The Placee Consults</option>
            <option value="Secondary Schools Association">All Nigeria Confederation of Principals of Secondary Schools (ANCOPSS)</option>
            <option value="Peer School Recommendation">Peer School Recommendation</option>
          </select>
        </div>

        <div className="flex items-start gap-3 p-4 bg-essd-dark/60 border border-essd-border">
          <input
            type="checkbox"
            name="agreedToTerms"
            id="agreedToTerms"
            required
            checked={formData.agreedToTerms}
            onChange={handleChange}
            className="mt-1 w-4 h-4 text-essd-gold bg-essd-black border-essd-border rounded focus:ring-0 focus:ring-offset-0"
          />
          <label htmlFor="agreedToTerms" className="text-xs text-essd-cream-muted font-sans leading-relaxed">
            I confirm that our school administration has authorized this registration, our squad debaters are bona fide registered secondary school students, and we agree to comply with all ESSD 2026 rules and WSDC adjudication standards.
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 bg-essd-gold text-essd-black hover:bg-essd-orange hover:text-white font-display text-base font-black uppercase tracking-wider border-4 border-essd-cream shadow-[6px_6px_0px_#0A0A0C] hover:shadow-[2px_2px_0px_#0A0A0C] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {submitting ? (
            <span>Processing Official Registration...</span>
          ) : (
            <>
              <Sparkles className="w-5 h-5 fill-current" />
              Complete School Registration
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

    </form>
  );
}
