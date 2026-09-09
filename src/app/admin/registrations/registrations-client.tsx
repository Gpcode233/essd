"use client";

import { useState } from "react";
import { RegistrationData, ENUGU_LGAS } from "@/lib/types";
import Link from "next/link";
import { Icons } from "@/components/icons";

interface RegistrationsClientProps {
  initialRegistrations: RegistrationData[];
}

export default function RegistrationsClient({ initialRegistrations }: RegistrationsClientProps) {
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [selectedReg, setSelectedReg] = useState<RegistrationData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLga, setSelectedLga] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const filtered = registrations.filter((r) => {
    if (selectedLga !== "ALL" && r.lga !== selectedLga) return false;
    if (selectedStatus !== "ALL" && r.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const sName = r.schoolName.toLowerCase();
      const rNum = r.regNumber.toLowerCase();
      const cName = r.contactName.toLowerCase();
      if (!sName.includes(q) && !rNum.includes(q) && !cName.includes(q)) return false;
    }
    return true;
  });

  const exportCSV = () => {
    const headers = ["Reg Number", "School Name", "Type", "LGA", "Captain", "Teacher", "Email", "Phone", "Status", "Date"];
    const rows = filtered.map((r) => [
      `"${r.regNumber}"`,
      `"${r.schoolName}"`,
      `"${r.schoolType}"`,
      `"${r.lga}"`,
      `"${r.captainName}"`,
      `"${r.teacherName}"`,
      `"${r.schoolEmail}"`,
      `"${r.schoolPhone}"`,
      `"${r.status}"`,
      `"${new Date(r.createdAt).toLocaleDateString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ESSD_2026_School_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const parseJsonSafe = (str: any) => {
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
            School Registrations &amp; Squad Rosters
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="inline-flex items-center px-4 py-2 bg-essd-gold text-essd-black font-mono font-bold text-xs uppercase hover:bg-essd-orange hover:text-white transition-colors"
          >
            <Icons.Download className="w-3.5 h-3.5 mr-1.5" />
            Export CSV ({filtered.length})
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-essd-charcoal border border-essd-border p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div>
          <label className="block text-essd-cream-muted uppercase mb-1">Search Keyword</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search school or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-essd-black border border-essd-border focus:border-essd-gold pl-8 pr-3 py-1.5 text-essd-cream font-sans focus:outline-none"
            />
            <Icons.Search className="w-3.5 h-3.5 text-essd-cream-muted absolute left-2.5 top-2" />
          </div>
        </div>

        <div>
          <label className="block text-essd-cream-muted uppercase mb-1">Filter by LGA</label>
          <select
            value={selectedLga}
            onChange={(e) => setSelectedLga(e.target.value)}
            className="w-full bg-essd-black border border-essd-border focus:border-essd-gold px-3 py-1.5 text-essd-cream focus:outline-none"
          >
            <option value="ALL">All LGAs</option>
            {ENUGU_LGAS.map((lga) => (
              <option key={lga} value={lga}>{lga} LGA</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-essd-cream-muted uppercase mb-1">Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-essd-black border border-essd-border focus:border-essd-gold px-3 py-1.5 text-essd-cream focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="APPROVED">Approved / Confirmed</option>
            <option value="PENDING">Pending Review</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-essd-charcoal border-2 border-essd-border overflow-x-auto shadow-[4px_4px_0px_#0A0A0C]">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-essd-black text-essd-gold uppercase border-b border-essd-border">
            <tr>
              <th className="p-3">Reg ID</th>
              <th className="p-3">School Name</th>
              <th className="p-3">LGA</th>
              <th className="p-3">Captain</th>
              <th className="p-3">Coordinator</th>
              <th className="p-3">Debaters</th>
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
                  {reg.schoolName}
                  <span className="block text-[10px] text-essd-cream-muted font-normal">
                    {reg.schoolType}
                  </span>
                </td>
                <td className="p-3 text-essd-cream-muted whitespace-nowrap">
                  {reg.lga}
                </td>
                <td className="p-3 text-essd-cream font-medium">
                  {reg.captainName}
                </td>
                <td className="p-3 text-essd-cream-muted">
                  {reg.teacherName}
                </td>
                <td className="p-3 font-bold text-essd-gold">
                  {reg.debaterCount} Debaters
                </td>
                <td className="p-3 whitespace-nowrap">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
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
                    className="px-2.5 py-1 bg-essd-dark hover:bg-essd-gold hover:text-essd-black text-essd-cream border border-essd-border text-[11px] font-bold transition-colors"
                  >
                    Inspect Roster
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-8 text-center text-xs text-essd-cream-muted">
            No registration records matching your filter criteria.
          </div>
        )}
      </div>

      {/* Selected Registration Inspection Modal */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-essd-charcoal border-4 border-essd-gold p-6 sm:p-8 shadow-[12px_12px_0px_#0A0A0C] text-essd-cream max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-essd-border">
              <div>
                <span className="text-xs font-mono font-bold text-essd-orange block">
                  {selectedReg.regNumber}
                </span>
                <h3 className="text-xl font-black font-display uppercase text-essd-cream">
                  {selectedReg.schoolName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedReg(null)}
                className="p-2 bg-essd-dark text-essd-cream hover:text-essd-orange border border-essd-border text-xs font-mono"
              >
                Close ✕
              </button>
            </div>

            {/* School Logistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono mb-6">
              <div className="p-3 bg-essd-black border border-essd-border space-y-1.5">
                <span className="text-essd-gold font-bold uppercase block text-[10px]">
                  Institution Details
                </span>
                <p><strong>Type:</strong> {selectedReg.schoolType}</p>
                <p><strong>LGA:</strong> {selectedReg.lga} LGA</p>
                <p><strong>Address:</strong> {selectedReg.schoolAddress}</p>
                <p><strong>Email:</strong> {selectedReg.schoolEmail}</p>
                <p><strong>Phone:</strong> {selectedReg.schoolPhone}</p>
              </div>

              <div className="p-3 bg-essd-black border border-essd-border space-y-1.5">
                <span className="text-essd-orange font-bold uppercase block text-[10px]">
                  Coordinator &amp; Patron
                </span>
                <p><strong>Contact:</strong> {selectedReg.contactName}</p>
                <p><strong>Role:</strong> {selectedReg.contactRole}</p>
                <p><strong>Phone:</strong> {selectedReg.contactPhone}</p>
                <p><strong>Email:</strong> {selectedReg.contactEmail}</p>
                <p><strong>Teacher Patron:</strong> {selectedReg.teacherName}</p>
              </div>
            </div>

            {/* Student Debaters */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-mono font-bold uppercase text-essd-gold">
                Registered Student Debaters ({selectedReg.debaterCount}):
              </h4>
              
              <div className="p-3 bg-essd-black border border-essd-gold text-xs font-mono flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-essd-gold uppercase font-bold block">Team Captain:</span>
                  <span className="text-sm font-bold text-essd-cream">👑 {selectedReg.captainName}</span>
                </div>
                <span className="px-2 py-0.5 bg-essd-gold text-essd-black font-bold text-[10px]">Captain</span>
              </div>

              <div className="space-y-1.5">
                {parseJsonSafe(selectedReg.debaterNames).map((name: string, i: number) => {
                  const classes = parseJsonSafe(selectedReg.debaterClasses);
                  const cls = classes[i] || "SS2";
                  return (
                    <div key={i} className="p-2.5 bg-essd-dark border border-essd-border flex items-center justify-between text-xs font-mono">
                      <span>Speaker 0{i + 1}: <strong className="text-essd-cream">{name}</strong></span>
                      <span className="text-essd-cream-muted text-[11px]">{cls}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-essd-border flex items-center justify-between">
              <div className="text-[10px] font-mono text-essd-cream-muted">
                Submitted: {new Date(selectedReg.createdAt).toLocaleString()}
              </div>
              <button
                onClick={() => setSelectedReg(null)}
                className="px-5 py-2 bg-essd-gold text-essd-black font-mono font-bold text-xs uppercase"
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
