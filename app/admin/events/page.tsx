"use client";

import { useAdmin, uid } from "../admin-context";
import { Head, Card, Field, AddBtn, DelBtn, upd, del } from "../admin-ui";
import { adminContentApi } from "@/src/lib/api";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function EventsAdminPage() {
  const { s, setS } = useAdmin();
  const [savingId, setSavingId] = useState<string | null>(null);

  const saveEvent = async (e: any) => {
    setSavingId(e.id);
    try {
      if (typeof e.id === "string" && isNaN(Number(e.id))) {
        // New event (created by uid)
        const data = await adminContentApi.createEvent(e);
        upd(setS, "events", e.id, { id: data.id });
      } else {
        // Update existing event
        await adminContentApi.updateEvent(e.id, e);
      }
      alert("Event saved successfully!");
    } catch (err) {
      alert("Failed to save event");
    } finally {
      setSavingId(null);
    }
  };

  const deleteEvent = async (id: string | number) => {
    if (typeof id === "number" || !isNaN(Number(id))) {
      try {
        await adminContentApi.deleteEvent(id);
      } catch (err) {
        // ignore if not found
      }
    }
    del(setS, "events", String(id));
  };

  return (
    <>
      <Head
        title="Events"
        sub="Schedule utsavs and festivals shown in the events section."
        action={
          <AddBtn
            onClick={() =>
              setS((p) => ({
                ...p,
                events: [...p.events, { id: uid(), date: "", name: "New event", note: "" }],
              }))
            }
          >
            New event
          </AddBtn>
        }
      />
      <div className="space-y-4">
        {s.events.map((e) => (
          <Card key={e.id}>
            <div className="grid gap-4 md:grid-cols-[1fr_1fr_2fr_auto] md:items-end">
              <Field
                label="Date"
                type="text"
                value={e.date || ""}
                onChange={(v) => upd(setS, "events", e.id, { date: v })}
              />
              <Field
                label="Name"
                value={e.name || ""}
                onChange={(v) => upd(setS, "events", e.id, { name: v })}
              />
              <Field
                label="Tag"
                value={e.tag || ""}
                onChange={(v) => upd(setS, "events", e.id, { tag: v })}
              />
              <Field
                label="Deity"
                value={e.deity || ""}
                onChange={(v) => upd(setS, "events", e.id, { deity: v })}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_2fr_auto_auto] md:items-end mt-4">
              <Field
                label="Image URL"
                value={e.image || ""}
                onChange={(v) => upd(setS, "events", e.id, { image: v })}
              />
              <Field
                label="Description"
                value={e.description || e.note || ""}
                onChange={(v) => upd(setS, "events", e.id, { description: v, note: v })}
              />
              
              <button 
                onClick={() => saveEvent(e)}
                disabled={savingId === e.id}
                className="bg-amber-800 text-white font-bold text-xs px-4 h-[44px] rounded-2xl flex items-center gap-2 hover:bg-amber-900 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
              >
                {savingId === e.id ? <Loader2 className="size-4 animate-spin" /> : "Save"}
              </button>
              <DelBtn onClick={() => deleteEvent(e.id)} />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
