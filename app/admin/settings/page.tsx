"use client";

import { useAdmin, State } from "../admin-context";
import { Head, Card, Field, Toggle } from "../admin-ui";

export default function SettingsAdminPage() {
  const { s, setS } = useAdmin();
  const set = (patch: Partial<State["settings"]>) =>
    setS((p) => ({ ...p, settings: { ...p.settings, ...patch } }));

  return (
    <>
      <Head title="Settings" sub="Temple identity, contact details and site-wide switches." />
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <div className="grid gap-4">
            <Field
              label="Temple name"
              value={s.settings.templeName}
              onChange={(v) => set({ templeName: v })}
            />
            <Field
              label="Tagline"
              value={s.settings.tagline}
              onChange={(v) => set({ tagline: v })}
            />
            <Field
              label="Address"
              value={s.settings.address}
              onChange={(v) => set({ address: v })}
            />
          </div>
        </Card>
        <Card>
          <div className="grid gap-4">
            <Field label="Phone" value={s.settings.phone} onChange={(v) => set({ phone: v })} />
            <Field label="Email" value={s.settings.email} onChange={(v) => set({ email: v })} />
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Opens"
                type="time"
                value={s.settings.openTime}
                onChange={(v) => set({ openTime: v })}
              />
              <Field
                label="Closes"
                type="time"
                value={s.settings.closeTime}
                onChange={(v) => set({ closeTime: v })}
              />
            </div>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-3">
            <Toggle
              label="Live darshan enabled"
              on={s.settings.liveDarshan}
              onChange={(v) => set({ liveDarshan: v })}
            />
            <Toggle
              label="Donations open"
              on={s.settings.donationsOpen}
              onChange={(v) => set({ donationsOpen: v })}
            />
            <Toggle
              label="Maintenance mode"
              on={s.settings.maintenance}
              onChange={(v) => set({ maintenance: v })}
            />
          </div>
        </Card>
      </div>
    </>
  );
}
