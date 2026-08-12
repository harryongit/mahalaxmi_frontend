"use client";

import { useAdmin, uid } from "../admin-context";
import { Head, Card, Field, AddBtn, DelBtn, Toggle, inputCls, upd, del } from "../admin-ui";

export default function TestimonialsAdminPage() {
  const { s, setS } = useAdmin();

  return (
    <>
      <Head
        title="Testimonials"
        sub="Approve and edit devotee voices before they appear on the site."
        action={
          <AddBtn
            onClick={() =>
              setS((p) => ({
                ...p,
                testimonials: [
                  ...p.testimonials,
                  { id: uid(), name: "New devotee", role: "Pilgrim", text: "", published: false },
                ],
              }))
            }
          >
            New testimonial
          </AddBtn>
        }
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {s.testimonials.map((t) => (
          <Card key={t.id}>
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Name"
                  value={t.name}
                  onChange={(v) => upd(setS, "testimonials", t.id, { name: v })}
                />
                <Field
                  label="Role"
                  value={t.role}
                  onChange={(v) => upd(setS, "testimonials", t.id, { role: v })}
                />
              </div>
              <label className="block">
                <span className="mb-1.5 block text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                  Quote
                </span>
                <textarea
                  rows={3}
                  className={inputCls}
                  value={t.text}
                  onChange={(e) => upd(setS, "testimonials", t.id, { text: e.target.value })}
                />
              </label>
              <div className="flex items-center justify-between">
                <Toggle
                  label="Published"
                  on={t.published}
                  onChange={(v) => upd(setS, "testimonials", t.id, { published: v })}
                />
                <DelBtn onClick={() => del(setS, "testimonials", t.id)} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
