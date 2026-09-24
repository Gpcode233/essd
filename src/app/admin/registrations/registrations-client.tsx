"use client";

import { useState } from "react";
import { RegistrationData, ENUGU_CENTRAL_LGAS, DAY1_MOTIONS, DAY2_MOTIONS } from "@/lib/types";
import Link from "next/link";
import { Icons } from "@/components/icons";

interface RegistrationsClientProps {
  initialRegistrations: RegistrationData[];
}

export default function RegistrationsClient({ initialRegistrations }: RegistrationsClientProps) {
  const [registrations] = useState(initialRegistrations);
  const [selectedReg, setSelectedReg] = useState<RegistrationData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLga, setSelectedLga] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const filtered = registrations.filter((r) => {
    if (selectedLga !== "ALL" && r.lga !== selectedLga) return false;
    if (selectedStatus !== "ALL" && r.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const sName = r.schoolName?.toLowerCase() || "";
      const rNum = r.regNumber?.toLowerCase() || "";
      const dName = r.studentName?.toLowerCase() || "";
      if (!sName.includes(q) && !rNum.includes(q) && !dName.includes(q)) return false;
    }
    return true;
  });

  const exportCSV = () => {
    const headers = ["Reg Number", "Debater Name", "Class", "School Name", "Type", "LGA", "Parent Name", "Parent Phone", "Teacher Name", "Teacher Phone", "Status", "Date Registered"];
    const rows = filtered.map((r) => [
      `"${r.regNumber}"`,
      `"${r.studentName}"`,
      `"${r.studentClass}"`,
      `"${r.schoolName}"`,
      `"${r.schoolType}"`,
      `"${r.lga}"`,
      `"${r.parentName}"`,
      `"${r.parentPhone}"`,
      `"${r.teacherName}"`,
      `"${r.teacherPhone}"`,
      `"${r.status}"`,
      `"${new Date(r.createdAt).toLocaleDateString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ESSD_2026_Debater_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const parseJsonSafe = (str: any): string[] => {
    if (!str) return [];
    if (Array.isArray(str)) return str;
    try {
      return JSON.parse(str);
    } catch {
      return [str];
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-essd-border gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center text-xs font-mono text-essd-gold hover:underline gap-1 mb-1"
          >
            <Icons.ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-essd-cream">
            Debater Registrations &amp; Competitor Profiles
          </h1>
          <p className="text-xs text-essd-cream-muted font-mono mt-0.5">
            {registrations.length} total debater registrations • {filtered.length} matching current filter
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="inline-flex items-center px-4 py-2 bg-essd-gold text-essd-black font-mono font-bold text-xs uppercase hover:bg-essd-orange hover:text-white transition-colors rounded-xl"
          >
            <Icons.Download className="w-3.5 h-3.5 mr-1.5" />
            Export CSV ({filtered.length})
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-essd-charcoal border border-essd-border p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono rounded-2xl">
        <div>
          <label className="block text-essd-cream-muted uppercase mb-1">Search Keyword</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search debater name, school, or reg ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-essd-black border border-essd-border focus:border-essd-gold pl-8 pr-3 py-1.5 text-essd-cream font-sans focus:outline-none rounded-xl"
            />
            <Icons.Search className="w-3.5 h-3.5 text-essd-cream-muted absolute left-2.5 top-2" />
          </div>
        </div>

        <div>
          <label className="block text-essd-cream-muted uppercase mb-1">Filter by LGA (Enugu Central)</label>
          <select
            value={selectedLga}
            onChange={(e) => setSelectedLga(e.target.value)}
            className="w-full bg-essd-black border border-essd-border focus:border-essd-gold px-3 py-1.5 text-essd-cream focus:outline-none rounded-xl"
          >
            <option value="ALL">All Enugu Central LGAs</option>
            {ENUGU_CENTRAL_LGAS.map((lga) => (
              <option key={lga} value={lga}>{lga}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-essd-cream-muted uppercase mb-1">Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-essd-black border border-essd-border focus:border-essd-gold px-3 py-1.5 text-essd-cream focus:outline-none rounded-xl"
          >
            <option value="ALL">All Statuses</option>
            <option value="APPROVED">Approved / Confirmed</option>
            <option value="PENDING">Pending Review</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-essd-charcoal border-2 border-essd-border overflow-x-auto shadow-[4px_4px_0px_#0A0A0C] rounded-2xl">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-essd-black text-essd-gold uppercase border-b border-essd-border">
            <tr>
              <th className="p-3">Reg ID</th>
              <th className="p-3">Debater Name</th>
              <th className="p-3">School</th>
              <th className="p-3">LGA</th>
              <th className="p-3">Day 1 Motions</th>
              <th className="p-3">Day 2 Motions</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-essd-border/60">
            {filtered.map((reg) => (
              <tr key={reg.id} className="hover:bg-essd-dark/60 transition-colors">
                <td className="p-3 font-bold text-essd-orange font-mono whitespace-nowrap">
                  {reg.regNumber}
                </td>
                <td className="p-3 font-bold text-essd-cream">
                  {reg.studentName}
                  <span className="block text-[10px] text-essd-cream-muted font-normal">
                    {reg.studentClass} • {reg.studentGender || "—"}
                  </span>
                </td>
                <td className="p-3 text-essd-cream">
                  <span className="font-medium block">{reg.schoolName}</span>
                  <span className="text-[10px] text-essd-cream-muted">{reg.schoolType}</span>
                </td>
                <td className="p-3 text-essd-cream-muted whitespace-nowrap">
                  {reg.lga}
                </td>
                <td className="p-3 font-bold text-essd-gold">
                  {parseJsonSafe(reg.day1Motions).length} / 3 Selected
                </td>
                <td className="p-3 font-bold text-essd-orange">
                  {parseJsonSafe(reg.day2Motions).length} / 2 Selected
                </td>
                <td className="p-3 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                    reg.status === "APPROVED"
                      ? "bg-green-950 text-green-300 border border-green-700"
                      : reg.status === "PENDING"
                      ? "bg-yellow-950 text-yellow-300 border border-yellow-700"
                      : "bg-red-950 text-red-300 border border-red-700"
                  }`}>
                    {reg.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => setSelectedReg(reg)}
                    className="px-2.5 py-1 bg-essd-dark hover:bg-essd-gold hover:text-essd-black text-essd-cream border border-essd-border text-[11px] font-bold transition-colors rounded-lg"
                  >
                    Inspect Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-8 text-center text-xs text-essd-cream-muted">
            No debater registrations matching your filter criteria.
          </div>
        )}
      </div>

      {/* Selected Registration Inspection Modal */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-essd-charcoal border-4 border-essd-gold p-6 sm:p-8 shadow-[12px_12px_0px_#0A0A0C] text-essd-cream max-h-[90vh] overflow-y-auto rounded-2xl">
            
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-essd-border">
              <div>
                <span className="text-xs font-mono font-bold text-essd-orange block">
                  {selectedReg.regNumber}
                </span>
                <h3 className="text-xl font-black font-display uppercase text-essd-cream">
                  {selectedReg.studentName}
                </h3>
                <span className="text-xs text-essd-cream-muted font-mono">
                  {selectedReg.studentClass} • {selectedReg.schoolName}
                </span>
              </div>
              <button
                onClick={() => setSelectedReg(null)}
                className="p-2 bg-essd-dark text-essd-cream hover:text-essd-orange border border-essd-border text-xs font-mono rounded-lg"
              >
                Close ✕
              </button>
            </div>

            {/* School & Teacher Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono mb-6">
              <div className="p-3 bg-essd-black border border-essd-border space-y-1.5 rounded-xl">
                <span className="text-essd-gold font-bold uppercase block text-[10px]">
                  School Details
                </span>
                <p><strong>School:</strong> {selectedReg.schoolName}</p>
                <p><strong>Type:</strong> {selectedReg.schoolType}</p>
                <p><strong>LGA:</strong> {selectedReg.lga}</p>
                <p><strong>Address:</strong> {selectedReg.schoolAddress}</p>
                <p><strong>School Email:</strong> {selectedReg.schoolEmail || "—"}</p>
                <p><strong>School Phone:</strong> {selectedReg.schoolPhone || "—"}</p>
              </div>

              <div className="p-3 bg-essd-black border border-essd-border space-y-1.5 rounded-xl">
                <span className="text-essd-orange font-bold uppercase block text-[10px]">
                  Teacher / Patron
                </span>
                <p><strong>Name:</strong> {selectedReg.teacherName}</p>
                <p><strong>Phone:</strong>{" "}
                  {selectedReg.teacherPhone ? (
                    <a href={`tel:${selectedReg.teacherPhone}`} className="text-essd-gold hover:underline">
                      {selectedReg.teacherPhone}
                    </a>
                  ) : "—"}
                </p>
                <p><strong>Email:</strong>{" "}
                  {selectedReg.teacherEmail ? (
                    <a href={`mailto:${selectedReg.teacherEmail}`} className="text-essd-orange hover:underline">
                      {selectedReg.teacherEmail}
                    </a>
                  ) : "—"}
                </p>
              </div>
            </div>

            {/* Parent Contact */}
            <div className="p-3 bg-essd-black border border-essd-border text-xs font-mono rounded-xl mb-6 space-y-1.5">
              <span className="text-essd-gold font-bold uppercase block text-[10px]">👨‍👩‍👧 Parent / Guardian Contact</span>
              <p><strong>Name:</strong> {selectedReg.parentName || "—"}</p>
              <p><strong>Phone:</strong>{" "}
                {selectedReg.parentPhone ? (
                  <a href={`tel:${selectedReg.parentPhone}`} className="text-essd-gold font-bold hover:underline">
                    {selectedReg.parentPhone}
                  </a>
                ) : "—"}
              </p>
              {selectedReg.parentEmail && (
                <p><strong>Email:</strong>{" "}
                  <a href={`mailto:${selectedReg.parentEmail}`} className="text-essd-orange hover:underline">
                    {selectedReg.parentEmail}
                  </a>
                </p>
              )}
            </div>

            {/* Selected Motions */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-mono font-bold uppercase text-essd-gold">
                Selected Motions:
              </h4>

              <div className="p-3 bg-essd-black border border-essd-border rounded-xl space-y-2 text-xs font-mono">
                <span className="text-essd-gold font-bold text-[10px] uppercase block">
                  Day 1 Motions (3 Selected):
                </span>
                {parseJsonSafe(selectedReg.day1Motions).map((mId: string, i: number) => {
                  const m = DAY1_MOTIONS.find((item) => item.id === mId);
                  return (
                    <div key={i} className="text-essd-cream text-[11px] leading-snug">
                      <strong className="text-essd-gold">{m?.title || mId}</strong>
                      {m && <p className="text-essd-cream-muted mt-0.5">{m.motion}</p>}
                    </div>
                  );
                })}
                {parseJsonSafe(selectedReg.day1Motions).length === 0 && (
                  <p className="text-essd-cream-muted">No Day 1 motions recorded.</p>
                )}
              </div>

              <div className="p-3 bg-essd-black border border-essd-border rounded-xl space-y-2 text-xs font-mono">
                <span className="text-essd-orange font-bold text-[10px] uppercase block">
                  Day 2 Grand Finale Motions (2 Selected):
                </span>
                {parseJsonSafe(selectedReg.day2Motions).map((mId: string, i: number) => {
                  const m = DAY2_MOTIONS.find((item) => item.id === mId);
                  return (
                    <div key={i} className="text-essd-cream text-[11px] leading-snug">
                      <strong className="text-essd-orange">{m?.title || mId}</strong>
                      {m && <p className="text-essd-cream-muted mt-0.5">{m.motion}</p>}
                    </div>
                  );
                })}
                {parseJsonSafe(selectedReg.day2Motions).length === 0 && (
                  <p className="text-essd-cream-muted">No Day 2 motions recorded.</p>
                )}
              </div>

              <div className="p-3 bg-essd-dark border border-dashed border-essd-gold/40 rounded-xl text-xs font-mono">
                <span className="text-essd-gold font-bold text-[10px] uppercase block">The Finals:</span>
                <p className="text-essd-cream-muted italic mt-0.5">Impromptu motion provided on the spot at the apex stage.</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-essd-border flex items-center justify-between">
              <div className="text-[10px] font-mono text-essd-cream-muted">
                Registered: {new Date(selectedReg.createdAt).toLocaleString()}
              </div>
              <button
                onClick={() => setSelectedReg(null)}
                className="px-5 py-2 bg-essd-gold text-essd-black font-mono font-bold text-xs uppercase rounded-xl"
              >
                Done Inspecting
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
