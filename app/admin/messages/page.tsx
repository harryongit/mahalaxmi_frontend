"use client";

import { useAdmin } from "../admin-context";
import { Head, Card, DelBtn, Toggle, upd, del } from "../admin-ui";

export default function MessagesAdminPage() {
  const { s, setS } = useAdmin();

  return (
    <>
      <Head title="Messages" sub="Enquiries received from the contact form." />
      <div className="space-y-4">
        {s.messages.map((m) => (
          <Card key={m.id} className={m.read ? "" : "border-[var(--gold)]"}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="font-serif text-xl">{m.name}</div>
                <a href={`mailto:${m.email}`} className="text-xs text-[var(--saffron)]">
                  {m.email}
                </a>
                <p className="mt-3 max-w-2xl text-sm text-foreground/80">{m.text}</p>
              </div>
              <div className="flex items-center gap-2">
                <Toggle
                  label="Read"
                  on={m.read}
                  onChange={(v) => upd(setS, "messages", m.id, { read: v })}
                />
                <DelBtn onClick={() => del(setS, "messages", m.id)} />
              </div>
            </div>
          </Card>
        ))}
        {s.messages.length === 0 && (
          <p className="text-sm text-muted-foreground">No messages yet.</p>
        )}
      </div>
    </>
  );
}
