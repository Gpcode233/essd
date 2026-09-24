"use client";

import { useState } from "react";
import { ENUGU_CENTRAL_LGAS, DAY1_MOTIONS, DAY2_MOTIONS } from "@/lib/types";
import { Icons } from "@/components/icons";
import confetti from "canvas-confetti";

const INITIAL_FORM_DATA = {
  // Debater Information
  studentName: "",
  studentClass: "SS2",
  studentGender: "MALE",
  studentEmail: "",
  studentPhone: "",

  // School Information (Enugu Central / Enugu Town)
  schoolName: "",
  schoolType: "PUBLIC",
  schoolAddress: "",
  lga: ENUGU_CENTRAL_LGAS[0],
  state: "Enugu",
  schoolEmail: "",
  schoolPhone: "",

  // Parent / Guardian Information
  parentName: "",
  parentPhone: "",
  parentEmail: "",

  // Supervising Teacher / Patron
  teacherName: "",
  teacherPhone: "",
  teacherEmail: "",

  // Motions Selection
  day1Motions: [] as string[], // Exactly 3 of 6
  day2Motions: [] as string[], // Exactly 2 of 5
  preferredStance: "FREE",

  referralSource: "School Circular / Principal",
  agreedToTerms: true,
};

export default function RegistrationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{
    regNumber: string;
    studentName: string;
    studentClass: string;
    schoolName: string;
    lga: string;
    parentName: string;
    parentPhone: string;
    teacherName: string;
    teacherPhone: string;
    day1Motions: string[];
    day2Motions: string[];
    preferredStance: string;
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

  const toggleDay1Motion = (motionId: string) => {
    setFormData((prev) => {
      const exists = prev.day1Motions.includes(motionId);
      if (exists) {
        return { ...prev, day1Motions: prev.day1Motions.filter((id) => id !== motionId) };
      } else {
        if (prev.day1Motions.length >= 3) {
          setErrorMsg("You can select a maximum of 3 motions for Day 1.");
          return prev;
        }
        setErrorMsg("");
        return { ...prev, day1Motions: [...prev.day1Motions, motionId] };
      }
    });
  };

  const toggleDay2Motion = (motionId: string) => {
    setFormData((prev) => {
      const exists = prev.day2Motions.includes(motionId);
      if (exists) {
        return { ...prev, day2Motions: prev.day2Motions.filter((id) => id !== motionId) };
      } else {
        if (prev.day2Motions.length >= 2) {
          setErrorMsg("You can select a maximum of 2 motions for Day 2 (Grand Finale).");
          return prev;
        }
        setErrorMsg("");
        return { ...prev, day2Motions: [...prev.day2Motions, motionId] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);

    if (!formData.studentName.trim() || !formData.studentClass) {
      setErrorMsg("Please enter the student debater's full name and class.");
      setSubmitting(false);
      return;
    }

    if (!formData.schoolName.trim() || !formData.schoolAddress.trim()) {
      setErrorMsg("Please provide your school name and location in Enugu Central.");
      setSubmitting(false);
      return;
    }

    if (!formData.parentName.trim() || !formData.parentPhone.trim()) {
      setErrorMsg("Please provide the parent/guardian contact details.");
      setSubmitting(false);
      return;
    }

    if (!formData.teacherName.trim() || !formData.teacherPhone.trim()) {
      setErrorMsg("Please provide the supervising Teacher / Debate Patron details.");
      setSubmitting(false);
      return;
    }

    if (formData.day1Motions.length !== 3) {
      setErrorMsg("Please select exactly 3 motions for Day 1.");
      setSubmitting(false);
      return;
    }

    if (formData.day2Motions.length !== 2) {
      setErrorMsg("Please select exactly 2 motions for Day 2 (Grand Finale).");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Registration submission failed.");
      }

      setSuccessData(json.registration);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#E8A927", "#F25A19", "#FAF6EB", "#10B981"],
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Network error. Please try again or contact support.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {successData ? (
        <div className="bg-[#141418] border-2 border-[#E8A927] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden animate-fade-in">
          {/* Header Banner */}
          <div className="text-center pb-8 border-b border-[#2A2A33]">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E8A927] to-[#F25A19] text-[#0A0A0C] mb-4 shadow-lg shadow-[#E8A927]/20">
              <Icons.Award className="w-9 h-9" />
            </div>
            <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              Accreditation Approved & Active
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#FAF6EB] tracking-wide uppercase">
              Official Debater Accreditation Pass
            </h2>
            <p className="text-[#A1A1AA] text-sm mt-1 max-w-lg mx-auto">
              Present this digital badge or your Accreditation ID at the registration desk on 16th October 2026.
            </p>
          </div>

          {/* Accreditation Badge Card */}
          <div className="my-8 p-6 sm:p-8 bg-[#1B1B22] rounded-xl border border-[#E8A927]/30 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2A2A33]">
              <div>
                <span className="text-xs text-[#A1A1AA] uppercase tracking-wider font-mono">Accreditation ID</span>
                <div className="font-heading text-2xl sm:text-3xl text-[#E8A927] tracking-wider mt-0.5">
                  {successData.regNumber}
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-[#A1A1AA] uppercase tracking-wider font-mono">Date Issued</span>
                <div className="text-sm font-medium text-[#FAF6EB]">
                  {new Date(successData.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 py-6 border-b border-[#2A2A33]">
              <div>
                <span className="text-xs text-[#A1A1AA] uppercase tracking-wider font-mono">Competitor Debater</span>
                <p className="text-lg font-bold text-[#FAF6EB] mt-1">{successData.studentName}</p>
                <span className="inline-block px-2.5 py-0.5 mt-1 bg-[#2A2A33] text-[#E8A927] rounded text-xs font-mono">
                  Class: {successData.studentClass}
                </span>
              </div>
              <div>
                <span className="text-xs text-[#A1A1AA] uppercase tracking-wider font-mono">Representing School</span>
                <p className="text-lg font-bold text-[#FAF6EB] mt-1">{successData.schoolName}</p>
                <span className="text-xs text-[#A1A1AA] block mt-1">{successData.lga}</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 py-6 border-b border-[#2A2A33]">
              <div>
                <span className="text-xs text-[#A1A1AA] uppercase tracking-wider font-mono">Supervising Teacher</span>
                <p className="text-sm font-semibold text-[#FAF6EB] mt-1">{successData.teacherName}</p>
                <span className="text-xs text-[#A1A1AA] block mt-0.5 font-mono">{successData.teacherPhone}</span>
              </div>
              <div>
                <span className="text-xs text-[#A1A1AA] uppercase tracking-wider font-mono">Parent / Guardian</span>
                <p className="text-sm font-semibold text-[#FAF6EB] mt-1">{successData.parentName}</p>
                <span className="text-xs text-[#A1A1AA] block mt-0.5 font-mono">{successData.parentPhone}</span>
              </div>
            </div>

            {/* Selected Motions Recap */}
            <div className="pt-6">
              <span className="text-xs text-[#A1A1AA] uppercase tracking-wider font-mono">Selected Motions Breakdown</span>
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                <div className="p-3.5 bg-[#141418] rounded-lg border border-[#2A2A33]">
                  <span className="text-xs font-bold text-[#E8A927] block">Day 1 Rounds (3 Selected):</span>
                  <ul className="mt-1 text-xs text-[#FAF6EB] space-y-1">
                    {successData.day1Motions.map((mId, idx) => {
                      const m = DAY1_MOTIONS.find((item) => item.id === mId);
                      return (
                        <li key={idx} className="line-clamp-2">
                          • <strong className="text-[#E8A927]">{m?.title.split("—")[0] || mId}:</strong> {m?.motion || mId}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="p-3.5 bg-[#141418] rounded-lg border border-[#2A2A33]">
                  <span className="text-xs font-bold text-[#F25A19] block">Day 2 Grand Finale (2 Selected):</span>
                  <ul className="mt-1 text-xs text-[#FAF6EB] space-y-1">
                    {successData.day2Motions.map((mId, idx) => {
                      const m = DAY2_MOTIONS.find((item) => item.id === mId);
                      return (
                        <li key={idx} className="line-clamp-2">
                          • <strong className="text-[#F25A19]">{m?.title.split("—")[0] || mId}:</strong> {m?.motion || mId}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#2A2A33] flex flex-col sm:flex-row items-center justify-between text-xs text-[#A1A1AA] gap-2">
              <span className="flex items-center gap-1.5 text-[#E8A927]">
                <Icons.Location className="w-4 h-4" />
                HOTR Auditorium, House on the Rock Church, Enugu
              </span>
              <span>16th & 17th October 2026 • 8:00 AM WAT</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#E8A927] text-[#0A0A0C] font-bold text-sm hover:bg-[#F25A19] hover:text-[#FAF6EB] transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Icons.Download className="w-4 h-4" />
              Print / Save Debater Pass
            </button>
            <button
              onClick={() => {
                setSuccessData(null);
                setFormData(INITIAL_FORM_DATA);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2A2A33] text-[#FAF6EB] font-bold text-sm hover:bg-[#3A3A44] transition-all"
            >
              Register Another Competitor
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-[#141418] border border-[#2A2A33] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8"
        >
          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-3 animate-shake">
              <Icons.Alert className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Submission Incomplete</p>
                <p className="mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* SECTION 1: Individual Competitor Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#2A2A33]">
              <div className="w-8 h-8 rounded-lg bg-[#E8A927]/10 text-[#E8A927] flex items-center justify-center font-heading font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="font-heading text-xl text-[#FAF6EB] uppercase tracking-wide">
                  Student Competitor Profile
                </h3>
                <p className="text-xs text-[#A1A1AA]">
                  The individual student representing your secondary school in the championship.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#FAF6EB] uppercase tracking-wider mb-1.5">
                  Debater Full Name <span className="text-[#F25A19]">*</span>
                </label>
                <input
                  type="text"
                  name="studentName"
                  required
                  placeholder="e.g. Chinedu Okafor"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#1B1B22] border border-[#2A2A33] rounded-xl text-[#FAF6EB] placeholder-[#71717A] text-sm focus:border-[#E8A927] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#FAF6EB] uppercase tracking-wider mb-1.5">
                  Academic Class <span className="text-[#F25A19]">*</span>
                </label>
                <select
                  name="studentClass"
                  value={formData.studentClass}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#1B1B22] border border-[#2A2A33] rounded-xl text-[#FAF6EB] text-sm focus:border-[#E8A927] focus:outline-none transition-colors"
                >
                  <option value="SS1">SS1 (Senior Secondary 1)</option>
                  <option value="SS2">SS2 (Senior Secondary 2)</option>
                  <option value="SS3">SS3 (Senior Secondary 3)</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#FAF6EB] uppercase tracking-wider mb-1.5">
                  Gender
                </label>
                <select
                  name="studentGender"
                  value={formData.studentGender}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#1B1B22] border border-[#2A2A33] rounded-xl text-[#FAF6EB] text-sm focus:border-[#E8A927] focus:outline-none transition-colors"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#FAF6EB] uppercase tracking-wider mb-1.5">
                  Debater Phone (Optional)
                </label>
                <input
                  type="tel"
                  name="studentPhone"
                  placeholder="080 0000 0000"
                  value={formData.studentPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#1B1B22] border border-[#2A2A33] rounded-xl text-[#FAF6EB] placeholder-[#71717A] text-sm focus:border-[#E8A927] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#FAF6EB] uppercase tracking-wider mb-1.5">
                  Debater Email (Optional)
                </label>
                <input
                  type="email"
                  name="studentEmail"
                  placeholder="student@example.com"
                  value={formData.studentEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#1B1B22] border border-[#2A2A33] rounded-xl text-[#FAF6EB] placeholder-[#71717A] text-sm focus:border-[#E8A927] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: School Information (Enugu Central / Town) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#2A2A33]">
              <div className="w-8 h-8 rounded-lg bg-[#E8A927]/10 text-[#E8A927] flex items-center justify-center font-heading font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="font-heading text-xl text-[#FAF6EB] uppercase tracking-wide">
                  School Information (Enugu Central)
                </h3>
                <p className="text-xs text-[#A1A1AA]">
                  Eligible secondary schools located within Enugu Town / Enugu Central zone.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#FAF6EB] uppercase tracking-wider mb-1.5">
                  Secondary School Name <span className="text-[#F25A19]">*</span>
                </label>
                <input
                  type="text"
                  name="schoolName"
                  required
                  placeholder="e.g. College of the Immaculate Conception (CIC)"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#1B1B22] border border-[#2A2A33] rounded-xl text-[#FAF6EB] placeholder-[#71717A] text-sm focus:border-[#E8A927] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#FAF6EB] uppercase tracking-wider mb-1.5">
                  School Category <span className="text-[#F25A19]">*</span>
                </label>
                <select
                  name="schoolType"
                  value={formData.schoolType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#1B1B22] border border-[#2A2A33] rounded-xl text-[#FAF6EB] text-sm focus:border-[#E8A927] focus:outline-none transition-colors"
                >
                  <option value="PUBLIC">State Public Secondary School</option>
                  <option value="PRIVATE">Private / International College</option>
                  <option value="MISSION">Mission / Diocesan Secondary School</option>
                  <option value="FEDERAL">Federal Unity College</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                    <label className="block text-xs font-semibold text-[#FAF6EB] uppercase tracking-wider mb-1.5">
                      School Email <span className="text-[#F25A19]">*</span>
                    </label>
                    <input
                      type="email"
                      name="schoolEmail"
                      required
                      placeholder="school@example.com"
                      value={formData.schoolEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-[#1B1B22] border border-[#2A2A33] rounded-xl text-[#FAF6EB] placeholder-[#71717A] text-sm focus:border-[#E8A927] focus:outline-none transition-colors"
                    />
                  </div>

              <div>
                    <label className="block text-xs font-semibold text-[#FAF6EB] uppercase tracking-wider mb-1.5">
                      School Physical Address <span className="text-[#F25A19]">*</span>
                </label>
                <input
                  type="text"
                  name="schoolAddress"
                  required
                  placeholder="e.g. Enugu-Onitsha Expressway, Uwani, Enugu"
                  value={formData.schoolAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#1B1B22] border border-[#2A2A33] rounded-xl text-[#FAF6EB] placeholder-[#71717A] text-sm focus:border-[#E8A927] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#FAF6EB] uppercase tracking-wider mb-1.5">
                  Local Government Area (Enugu Central Zone) <span className="text-[#F25A19]">*</span>
                </label>
                <select
                  name="lga"
                  value={formData.lga}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#1B1B22] border border-[#2A2A33] rounded-xl text-[#FAF6EB] text-sm focus:border-[#E8A927] focus:outline-none transition-colors"
                >
                  {ENUGU_CENTRAL_LGAS.map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 3: Parent & Teacher Contacts */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#2A2A33]">
              <div className="w-8 h-8 rounded-lg bg-[#E8A927]/10 text-[#E8A927] flex items-center justify-center font-heading font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="font-heading text-xl text-[#FAF6EB] uppercase tracking-wide">
                  Parent / Guardian & Teacher Verification
                </h3>
                <p className="text-xs text-[#A1A1AA]">
                  Parent consent and supervising debate patron information for student safety and accreditation.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#1B1B22] rounded-xl border border-[#2A2A33] space-y-3">
                <span className="text-xs font-bold text-[#E8A927] uppercase tracking-wider block">
                  Parent / Guardian Contact
                </span>
                <div>
                  <label className="block text-xs text-[#A1A1AA] mb-1">
                    Parent Full Name <span className="text-[#F25A19]">*</span>
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    placeholder="e.g. Mr. Emmanuel Okafor"
                    value={formData.parentName}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 bg-[#141418] border border-[#2A2A33] rounded-lg text-[#FAF6EB] placeholder-[#71717A] text-sm focus:border-[#E8A927] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A1A1AA] mb-1">
                    Parent Phone Number <span className="text-[#F25A19]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="parentPhone"
                    required
                    placeholder="080 1234 5678"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 bg-[#141418] border border-[#2A2A33] rounded-lg text-[#FAF6EB] placeholder-[#71717A] text-sm focus:border-[#E8A927] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A1A1AA] mb-1">
                    Parent Email <span className="text-[#F25A19]">*</span>
                  </label>
                  <input
                    type="email"
                    name="parentEmail"
                    required
                    placeholder="parent@example.com"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 bg-[#141418] border border-[#2A2A33] rounded-lg text-[#FAF6EB] placeholder-[#71717A] text-sm focus:border-[#E8A927] focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 bg-[#1B1B22] rounded-xl border border-[#2A2A33] space-y-3">
                <span className="text-xs font-bold text-[#F25A19] uppercase tracking-wider block">
                  Supervising Teacher / Patron
                </span>
                <div>
                  <label className="block text-xs text-[#A1A1AA] mb-1">
                    Teacher Full Name <span className="text-[#F25A19]">*</span>
                  </label>
                  <input
                    type="text"
                    name="teacherName"
                    required
                    placeholder="e.g. Mrs. Ngozi Eze"
                    value={formData.teacherName}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 bg-[#141418] border border-[#2A2A33] rounded-lg text-[#FAF6EB] placeholder-[#71717A] text-sm focus:border-[#E8A927] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A1A1AA] mb-1">
                    Teacher Phone Number <span className="text-[#F25A19]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="teacherPhone"
                    required
                    placeholder="080 9876 5432"
                    value={formData.teacherPhone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 bg-[#141418] border border-[#2A2A33] rounded-lg text-[#FAF6EB] placeholder-[#71717A] text-sm focus:border-[#E8A927] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A1A1AA] mb-1">Teacher Email (Optional)</label>
                  <input
                    type="email"
                    name="teacherEmail"
                    placeholder="teacher@school.edu.ng"
                    value={formData.teacherEmail}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 bg-[#141418] border border-[#2A2A33] rounded-lg text-[#FAF6EB] placeholder-[#71717A] text-sm focus:border-[#E8A927] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: Motion Selection (Day 1: 3 of 6, Day 2: 2 of 5) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2A33]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E8A927]/10 text-[#E8A927] flex items-center justify-center font-heading font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="font-heading text-xl text-[#FAF6EB] uppercase tracking-wide">
                    Championship Motion Selection
                  </h3>
                  <p className="text-xs text-[#A1A1AA]">
                    Choose your preferred debate motions for Day 1 and Day 2. Debaters are free to defend either stance.
                  </p>
                </div>
              </div>
            </div>

            {/* Day 1 Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-base text-[#E8A927] uppercase tracking-wide">
                    Day 1 Preliminary Motions
                  </h4>
                  <p className="text-xs text-[#A1A1AA]">Choose exactly 3 motions for Day 1&apos;s 3 elimination rounds.</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                    formData.day1Motions.length === 3
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-[#2A2A33] text-[#FAF6EB]"
                  }`}
                >
                  {formData.day1Motions.length} / 3 Selected
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {DAY1_MOTIONS.map((m) => {
                  const isSelected = formData.day1Motions.includes(m.id);
                  return (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => toggleDay1Motion(m.id)}
                      aria-pressed={isSelected}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[#E8A927]/10 border-[#E8A927] text-[#FAF6EB] shadow-md shadow-[#E8A927]/10"
                          : "bg-[#1B1B22] border-[#2A2A33] text-[#A1A1AA] hover:border-[#E8A927]/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-xs font-bold text-[#E8A927] uppercase tracking-wider font-mono">
                          {m.title.split("—")[0]}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs ${
                            isSelected
                              ? "bg-[#E8A927] border-[#E8A927] text-[#0A0A0C] font-bold"
                              : "border-[#3A3A44] bg-[#141418]"
                          }`}
                        >
                          {isSelected && "✓"}
                        </div>
                      </div>
                      <p className="text-xs font-medium text-[#FAF6EB] leading-relaxed">{m.motion}</p>
                      <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded bg-[#141418] text-[#A1A1AA]">
                        Theme: {m.theme}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Day 2 Selection */}
            <div className="space-y-3 pt-4 border-t border-[#2A2A33]">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-base text-[#F25A19] uppercase tracking-wide">
                    Day 2 Grand Finale Motions
                  </h4>
                  <p className="text-xs text-[#A1A1AA]">
                    Choose exactly 2 motions for the Grand Finale rounds. (Top 20 debaters advance).
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                    formData.day2Motions.length === 2
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-[#2A2A33] text-[#FAF6EB]"
                  }`}
                >
                  {formData.day2Motions.length} / 2 Selected
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {DAY2_MOTIONS.map((m) => {
                  const isSelected = formData.day2Motions.includes(m.id);
                  return (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => toggleDay2Motion(m.id)}
                      aria-pressed={isSelected}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[#F25A19]/10 border-[#F25A19] text-[#FAF6EB] shadow-md shadow-[#F25A19]/10"
                          : "bg-[#1B1B22] border-[#2A2A33] text-[#A1A1AA] hover:border-[#F25A19]/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-xs font-bold text-[#F25A19] uppercase tracking-wider font-mono">
                          {m.title.split("—")[0]}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs ${
                            isSelected
                              ? "bg-[#F25A19] border-[#F25A19] text-[#FAF6EB] font-bold"
                              : "border-[#3A3A44] bg-[#141418]"
                          }`}
                        >
                          {isSelected && "✓"}
                        </div>
                      </div>
                      <p className="text-xs font-medium text-[#FAF6EB] leading-relaxed">{m.motion}</p>
                      <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded bg-[#141418] text-[#A1A1AA]">
                        Theme: {m.theme}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Impromptu Notice */}
              <div className="p-3.5 bg-[#1B1B22] rounded-xl border border-dashed border-[#E8A927]/40 flex items-center gap-3">
                <Icons.Sparkles className="w-5 h-5 text-[#E8A927] flex-shrink-0" />
                <p className="text-xs text-[#FAF6EB]">
                  <strong className="text-[#E8A927]">The Finals (Apex Stage):</strong> The final championship motion for the top 5 finalists will be an <em>impromptu motion</em> revealed on the spot.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="pt-4 border-t border-[#2A2A33] space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                className="w-4 h-4 mt-1 rounded border-[#2A2A33] bg-[#1B1B22] text-[#E8A927] focus:ring-[#E8A927] focus:ring-offset-0"
              />
              <span className="text-xs text-[#A1A1AA] leading-relaxed">
                I confirm that all provided student, school, and guardian details are accurate, and that this competitor is prepared to participate at HOTR Auditorium, House on the Rock Church, Enugu on 16th & 17th October 2026.
              </span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E8A927] to-[#F25A19] text-[#0A0A0C] font-heading font-black text-lg sm:text-xl uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-xl shadow-[#E8A927]/20 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Icons.Refresh className="w-5 h-5 animate-spin" />
                  Generating Debater Accreditation...
                </>
              ) : (
                <>
                  Complete Debater Registration
                  <Icons.ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
