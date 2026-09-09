"use client";

import { useState } from "react";
import { PrizeData } from "@/lib/types";
import Link from "next/link";
import { Trophy, ArrowLeft, Save, Edit3, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

interface PrizesEditorProps {
  initialPrizes: PrizeData[];
}

export default function PrizesEditor({ initialPrizes }: PrizesEditorProps) {
  const [prizes, setPrizes] = useState(initialPrizes);
  const [editingPrize, setEditingPrize] = useState<PrizeData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formState, setFormState] = useState({
    title: "",
    rewardHeadline: "",
    description: "",
    badgeColor: "gold",
    displayOrder: 1,
  });

  const handleEdit = (p: PrizeData) => {
    setEditingPrize(p);
    setFormState({
      title: p.title,
      rewardHeadline: p.rewardHeadline,
      description: p.description,
      badgeColor: p.badgeColor || "gold",
      displayOrder: p.displayOrder || 1,
    });
    setMessage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPrize) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/prizes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingPrize.id,
          ...formState,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update prize.");
      }

      setPrizes((prev) =>
        prev.map((p) => (p.id === editingPrize.id ? data.prize : p))
      );

      setMessage({ type: "success", text: `Prize "${formState.title}" updated successfully!` });
      setEditingPrize(null);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to update prize." });
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
            Prizes &amp; Award Packages
          </h1>
          <p className="text-xs font-mono text-essd-cream-muted mt-0.5">
            Modify prize headlines, international scholarships, and cash awards in real-time.
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

      {/* Editing Modal */}
      {editingPrize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleSave}
            className="relative w-full max-w-2xl bg-essd-charcoal border-4 border-essd-gold p-6 sm:p-8 shadow-[12px_12px_0px_#0A0A0C] text-essd-cream max-h-[90vh] overflow-y-auto space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-essd-border">
              <h3 className="text-xl font-black font-display uppercase text-essd-cream">
                Edit Award Tier: {editingPrize.tier}
              </h3>
              <button
                type="button"
                onClick={() => setEditingPrize(null)}
                className="p-2 bg-essd-dark text-essd-cream hover:text-essd-orange border border-essd-border text-xs font-mono"
              >
                Cancel ✕
              </button>
            </div>

            <div className="text-xs font-mono space-y-1">
              <label className="block text-essd-gold uppercase font-bold">Award Title</label>
              <input
                type="text"
                required
                value={formState.title}
                onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                className="w-full bg-essd-black border border-essd-border focus:border-essd-gold px-3 py-2 text-essd-cream font-display font-bold uppercase focus:outline-none"
              />
            </div>

            <div className="text-xs font-mono space-y-1">
              <label className="block text-essd-orange uppercase font-bold">Headline Rewards &amp; Opportunities</label>
              <input
                type="text"
                required
                value={formState.rewardHeadline}
                onChange={(e) => setFormState({ ...formState, rewardHeadline: e.target.value })}
                className="w-full bg-essd-black border border-essd-border focus:border-essd-gold px-3 py-2 text-essd-cream font-sans focus:outline-none"
              />
            </div>

            <div className="text-xs font-mono space-y-1">
              <label className="block text-essd-cream-muted uppercase font-bold">Detailed Award Description</label>
              <textarea
                rows={4}
                required
                value={formState.description}
                onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                className="w-full bg-essd-black border border-essd-border focus:border-essd-gold p-3 text-essd-cream font-sans focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t border-essd-border flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingPrize(null)}
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
                {saving ? "Saving Changes..." : "Save Prize Package"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Prize Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prizes.map((p) => (
          <div
            key={p.id}
            className="bg-essd-charcoal border-2 border-essd-border hover:border-essd-gold p-6 shadow-[4px_4px_0px_#0A0A0C] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-essd-border/80">
                <span className="text-xs font-mono font-bold text-essd-gold uppercase">
                  {p.tier}
                </span>
                <button
                  onClick={() => handleEdit(p)}
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-essd-cream hover:text-essd-orange uppercase"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit
                </button>
              </div>

              <h3 className="text-lg font-black font-display uppercase text-essd-cream mb-1">
                {p.title}
              </h3>
              
              <h4 className="text-sm font-bold text-essd-gold mb-3 font-sans">
                {p.rewardHeadline}
              </h4>

              <p className="text-xs text-essd-cream-muted leading-relaxed font-sans mb-4">
                {p.description}
              </p>
            </div>

            <div className="pt-3 border-t border-essd-border/60 text-[11px] font-mono text-essd-cream-muted">
              Display Order: #{p.displayOrder}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
