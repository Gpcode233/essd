"use client";

import { useState } from "react";
import { MatchData, SchoolData } from "@/lib/types";
import Link from "next/link";
import { Trophy, ArrowLeft, Save, Sparkles, CheckCircle2, AlertCircle, Clock, Calendar, MapPin, Award, RefreshCw } from "lucide-react";

interface FixturesManagerProps {
  initialMatches: MatchData[];
  schools: SchoolData[];
}

export default function FixturesManager({ initialMatches, schools }: FixturesManagerProps) {
  const [matches, setMatches] = useState(initialMatches);
  const [editingMatch, setEditingMatch] = useState<MatchData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formState, setFormState] = useState({
    scoreA: "",
    scoreB: "",
    winnerId: "",
    status: "UPCOMING",
    motionTopic: "",
    date: "",
    time: "",
    venueName: "",
    judges: "",
  });

  const handleEditClick = (m: MatchData) => {
    setEditingMatch(m);
    setFormState({
      scoreA: m.scoreA !== null && m.scoreA !== undefined ? String(m.scoreA) : "",
      scoreB: m.scoreB !== null && m.scoreB !== undefined ? String(m.scoreB) : "",
      winnerId: m.winnerId || "",
      status: m.status || "UPCOMING",
      motionTopic: m.motionTopic || "",
      date: m.date || "",
      time: m.time || "",
      venueName: m.venueName || "",
      judges: m.judges || "",
    });
    setMessage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMatch) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/fixtures/${editingMatch.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scoreA: formState.scoreA ? parseFloat(formState.scoreA) : null,
          scoreB: formState.scoreB ? parseFloat(formState.scoreB) : null,
          winnerId: formState.winnerId || null,
          status: formState.status,
          motionTopic: formState.motionTopic,
          date: formState.date,
          time: formState.time,
          venueName: formState.venueName,
          judges: formState.judges,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update match.");
      }

      // Re-fetch all fixtures to show the updated bracket state & winner advancement
      const refreshedRes = await fetch("/api/fixtures");
      const refreshedData = await refreshedRes.json();
      if (refreshedData.matches) {
        setMatches(refreshedData.matches);
      }

      setMessage({ type: "success", text: `Match #${editingMatch.matchNumber} successfully updated and bracket progression applied!` });
      setEditingMatch(null);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Error saving match." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-essd-border gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center text-xs font-mono text-essd-gold hover:underline gap-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-essd-cream">
            Fixtures &amp; Live Scorekeeper
          </h1>
          <p className="text-xs font-mono text-essd-cream-muted mt-0.5">
            Record judge points and automatically advance winners to the next knockout round.
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 border-2 text-xs font-mono flex items-center gap-2 ${
            message.type === "success"
              ? "bg-green-950/90 border-green-500 text-green-200"
              : "bg-red-950/90 border-red-500 text-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Edit Match Modal */}
      {editingMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleSave}
            className="relative w-full max-w-2xl bg-essd-charcoal border-4 border-essd-gold p-6 sm:p-8 shadow-[12px_12px_0px_#0A0A0C] text-essd-cream max-h-[90vh] overflow-y-auto space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-essd-border">
              <div>
                <span className="text-xs font-mono font-bold text-essd-gold uppercase">
                  Match Controller
                </span>
                <h3 className="text-xl font-black font-display uppercase text-essd-cream">
                  Editing Match #{editingMatch.matchNumber} ({editingMatch.roundLabel})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingMatch(null)}
                className="p-2 bg-essd-dark text-essd-cream hover:text-essd-orange border border-essd-border text-xs font-mono"
              >
                Cancel ✕
              </button>
            </div>

            {/* Teams Duel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-essd-black p-4 border border-essd-border">
              {/* Team A */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-essd-gold uppercase font-bold block">
                  Proposition School
                </span>
                <h4 className="text-sm font-bold font-display uppercase text-essd-cream">
                  {editingMatch.schoolA?.name || "TBD"}
                </h4>
                <div>
                  <label className="block text-[11px] font-mono text-essd-cream-muted mb-1">
                    Score (Points)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="e.g. 84.5"
                    value={formState.scoreA}
                    onChange={(e) => setFormState({ ...formState, scoreA: e.target.value })}
                    className="w-full bg-essd-dark border border-essd-border px-3 py-1.5 text-xs text-essd-gold font-mono font-bold focus:outline-none focus:border-essd-gold"
                  />
                </div>
              </div>

              {/* Team B */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-essd-orange uppercase font-bold block">
                  Opposition School
                </span>
                <h4 className="text-sm font-bold font-display uppercase text-essd-cream">
                  {editingMatch.schoolB?.name || "TBD"}
                </h4>
                <div>
                  <label className="block text-[11px] font-mono text-essd-cream-muted mb-1">
                    Score (Points)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    placeholder="e.g. 78.0"
                    value={formState.scoreB}
                    onChange={(e) => setFormState({ ...formState, scoreB: e.target.value })}
                    className="w-full bg-essd-dark border border-essd-border px-3 py-1.5 text-xs text-essd-orange font-mono font-bold focus:outline-none focus:border-essd-orange"
                  />
                </div>
              </div>
            </div>

            {/* Status & Winner Select */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="block text-essd-cream-muted uppercase mb-1 font-bold">
                  Match Status *
                </label>
                <select
                  value={formState.status}
                  onChange={(e) => setFormState({ ...formState, status: e.target.value })}
                  className="w-full bg-essd-black border border-essd-border focus:border-essd-gold px-3 py-2 text-essd-cream focus:outline-none"
                >
                  <option value="UPCOMING">Upcoming</option>
                  <option value="LIVE">Live On Stage 🔥</option>
                  <option value="FINAL">Final (Declared Winner)</option>
                </select>
              </div>

              <div>
                <label className="block text-essd-cream-muted uppercase mb-1 font-bold">
                  Declare Winner (Auto-Advances)
                </label>
                <select
                  value={formState.winnerId}
                  onChange={(e) => setFormState({ ...formState, winnerId: e.target.value })}
                  className="w-full bg-essd-black border border-essd-border focus:border-essd-gold px-3 py-2 text-essd-gold focus:outline-none font-bold"
                >
                  <option value="">-- Auto Determine by Highest Score --</option>
                  {editingMatch.schoolA && (
                    <option value={editingMatch.schoolA.id}>{editingMatch.schoolA.name} (Prop)</option>
                  )}
                  {editingMatch.schoolB && (
                    <option value={editingMatch.schoolB.id}>{editingMatch.schoolB.name} (Opp)</option>
                  )}
                </select>
              </div>
            </div>

            {/* Motion Topic */}
            <div className="text-xs font-mono">
              <label className="block text-essd-cream-muted uppercase mb-1 font-bold">
                Debate Motion Topic
              </label>
              <textarea
                rows={2}
                value={formState.motionTopic}
                onChange={(e) => setFormState({ ...formState, motionTopic: e.target.value })}
                className="w-full bg-essd-black border border-essd-border focus:border-essd-gold p-3 text-xs text-essd-cream font-sans focus:outline-none"
              />
            </div>

            {/* Logistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="block text-essd-cream-muted uppercase mb-1">Time Slot</label>
                <input
                  type="text"
                  value={formState.time}
                  onChange={(e) => setFormState({ ...formState, time: e.target.value })}
                  className="w-full bg-essd-black border border-essd-border px-3 py-2 text-essd-cream focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-essd-cream-muted uppercase mb-1">Date</label>
                <input
                  type="text"
                  value={formState.date}
                  onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                  className="w-full bg-essd-black border border-essd-border px-3 py-2 text-essd-cream focus:outline-none"
                />
              </div>
            </div>

            {/* Save Buttons */}
            <div className="pt-4 border-t border-essd-border flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingMatch(null)}
                className="px-4 py-2 bg-essd-dark text-essd-cream hover:bg-essd-black text-xs font-mono uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-essd-gold text-essd-black font-mono font-black text-xs uppercase hover:bg-essd-orange hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                {saving ? "Saving Updates..." : "Save Match & Advance"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Matches List Table */}
      <div className="bg-essd-charcoal border-2 border-essd-border overflow-x-auto shadow-[4px_4px_0px_#0A0A0C]">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-essd-black text-essd-gold uppercase border-b border-essd-border">
            <tr>
              <th className="p-3">Match</th>
              <th className="p-3">Stage</th>
              <th className="p-3">Proposition (A)</th>
              <th className="p-3">Opposition (B)</th>
              <th className="p-3">Score A</th>
              <th className="p-3">Score B</th>
              <th className="p-3">Status</th>
              <th className="p-3">Winner</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-essd-border/60">
            {matches.map((m) => (
              <tr key={m.id} className="hover:bg-essd-dark/60 transition-colors">
                <td className="p-3 font-bold text-essd-gold whitespace-nowrap">
                  #{m.matchNumber < 10 ? `0${m.matchNumber}` : m.matchNumber}
                </td>
                <td className="p-3 text-essd-cream-muted whitespace-nowrap">
                  {m.roundLabel}
                </td>
                <td className="p-3 font-bold text-essd-cream">
                  {m.schoolA?.name || <span className="text-essd-cream-muted/50 italic">TBD</span>}
                </td>
                <td className="p-3 font-bold text-essd-cream">
                  {m.schoolB?.name || <span className="text-essd-cream-muted/50 italic">TBD</span>}
                </td>
                <td className="p-3 font-black text-essd-gold">
                  {m.scoreA !== null && m.scoreA !== undefined ? m.scoreA.toFixed(1) : "-"}
                </td>
                <td className="p-3 font-black text-essd-orange">
                  {m.scoreB !== null && m.scoreB !== undefined ? m.scoreB.toFixed(1) : "-"}
                </td>
                <td className="p-3 whitespace-nowrap">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                    m.status === "LIVE"
                      ? "bg-essd-orange text-white animate-pulse"
                      : m.status === "FINAL" || m.status === "COMPLETED"
                      ? "bg-green-950 text-green-300 border border-green-700"
                      : "bg-essd-dark text-essd-cream-muted"
                  }`}>
                    {m.status}
                  </span>
                </td>
                <td className="p-3 font-bold text-essd-gold">
                  {m.winner?.name || "-"}
                </td>
                <td className="p-3 text-right whitespace-nowrap">
                  <button
                    onClick={() => handleEditClick(m)}
                    className="px-3 py-1 bg-essd-gold hover:bg-essd-orange text-essd-black hover:text-white font-bold text-[11px] transition-colors"
                  >
                    Edit / Score
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
