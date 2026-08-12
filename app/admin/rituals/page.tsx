"use client";

import { useAdmin, uid } from "../admin-context";
import { Head, Card, Field, AddBtn, DelBtn, upd, del } from "../admin-ui";

export default function RitualsAdminPage() {
  const { s, setS } = useAdmin();

  return (
    <>
      <Head
        title="Rituals & Timings"
        sub="Daily puja schedule published on the rituals section."
        action={
          <AddBtn
            onClick={() =>
              setS((p) => ({
                ...p,
                rituals: [...p.rituals, { id: uid(), time: "06:00", name: "New puja" }],
              }))
            }
          >
            New ritual
          </AddBtn>
        }
      />
      <div className="space-y-4">
        {s.rituals.map((r) => (
          <Card key={r.id}>
            <div className="grid gap-4 md:grid-cols-[160px_1fr_auto] md:items-end">
              <Field
                label="Time"
                type="time"
                value={r.time}
                onChange={(v) => upd(setS, "rituals", r.id, { time: v })}
              />
              <Field
                label="Ritual"
                value={r.name}
                onChange={(v) => upd(setS, "rituals", r.id, { name: v })}
              />
              <DelBtn onClick={() => del(setS, "rituals", r.id)} />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
