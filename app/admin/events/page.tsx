"use client";

import { useAdmin, uid } from "../admin-context";
import { Head, Card, Field, AddBtn, DelBtn, upd, del } from "../admin-ui";

export default function EventsAdminPage() {
  const { s, setS } = useAdmin();

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
                type="date"
                value={e.date}
                onChange={(v) => upd(setS, "events", e.id, { date: v })}
              />
              <Field
                label="Name"
                value={e.name}
                onChange={(v) => upd(setS, "events", e.id, { name: v })}
              />
              <Field
                label="Note"
                value={e.note}
                onChange={(v) => upd(setS, "events", e.id, { note: v })}
              />
              <DelBtn onClick={() => del(setS, "events", e.id)} />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
