"use client";

import { useState } from "react";
import { useAdmin, uid } from "../admin-context";
import { Head, Card, Field, AddBtn, DelBtn, upd, del } from "../admin-ui";

export default function RitualsAdminPage() {
  const { s, setS } = useAdmin();

  // New Puja Form state
  const [showAddPuja, setShowAddPuja] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newPrice, setNewPrice] = useState("551");
  const [newTime, setNewTime] = useState("Daily • 07:00 AM");
  const [newImage, setNewImage] = useState("https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=800");
  const [newDesc, setNewDesc] = useState("");

  const handleAddPujaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPujaItem = {
      id: uid(),
      time: newTime,
      name: `${newTitle} (₹${newPrice})`,
    };

    setS((p) => ({
      ...p,
      rituals: [...p.rituals, newPujaItem],
    }));

    setShowAddPuja(false);
    setNewTitle("");
    setNewSubtitle("");
    setNewPrice("551");
    setNewDesc("");
  };

  return (
    <div className="space-y-8">
      <Head
        title="Manage Puja Sevas & Daily Ritual Timings"
        sub="Publish and update Puja Sevas available for devotees on the website and mobile app."
        action={
          <AddBtn onClick={() => setShowAddPuja(true)}>
            + Add New Puja Seva
          </AddBtn>
        }
      />

      {/* Add New Puja Seva Form Modal/Card */}
      {showAddPuja && (
        <Card className="border-2 border-amber-400 bg-amber-50/50 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-amber-200 pb-3">
            <h3 className="font-serif text-lg font-bold text-amber-950">Add New Puja Seva Offerings</h3>
            <button
              onClick={() => setShowAddPuja(false)}
              className="text-stone-400 hover:text-stone-700 text-xs font-bold"
            >
              Cancel ✕
            </button>
          </div>

          <form onSubmit={handleAddPujaSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Puja Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahasahasranama Kumkumarchan"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Subtitle / Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. 1000 Lotus Archana Offering"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Dakshina Amount (₹) *</label>
                <input
                  type="number"
                  required
                  placeholder="551"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Schedule / Timings *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Daily • 06:00 AM & 05:00 PM"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Image URL</label>
              <input
                type="text"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="font-bold text-stone-700 block mb-1">Description & Benefits</label>
              <textarea
                rows={2}
                placeholder="Brief summary of spiritual benefits and ritual significance..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-800 text-white font-bold hover:bg-amber-900 shadow-sm"
              >
                Publish Puja Seva
              </button>
              <button
                type="button"
                onClick={() => setShowAddPuja(false)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-600 font-bold"
              >
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Published Rituals & Puja Sevas List */}
      <div className="space-y-4">
        <h3 className="font-serif text-lg font-bold text-stone-900">Active Published Rituals ({s.rituals.length})</h3>

        {s.rituals.map((r) => (
          <Card key={r.id}>
            <div className="grid gap-4 md:grid-cols-[160px_1fr_auto] md:items-end">
              <Field
                label="Timing / Schedule"
                value={r.time}
                onChange={(v) => upd(setS, "rituals", r.id, { time: v })}
              />
              <Field
                label="Puja Seva Title & Dakshina"
                value={r.name}
                onChange={(v) => upd(setS, "rituals", r.id, { name: v })}
              />
              <DelBtn onClick={() => del(setS, "rituals", r.id)} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
