"use client";

import { useAdmin, uid } from "../admin-context";
import { Head, Card, AddBtn, DelBtn, inputCls, upd, del } from "../admin-ui";

export default function DonationsAdminPage() {
  const { s, setS } = useAdmin();
  const total = s.donations.reduce((a, d) => a + d.amount, 0);

  return (
    <>
      <Head
        title="Donations"
        sub={`Seva contributions received — ₹${total.toLocaleString("en-IN")} total.`}
        action={
          <AddBtn
            onClick={() =>
              setS((p) => ({
                ...p,
                donations: [
                  {
                    id: uid(),
                    name: "New devotee",
                    amount: 0,
                    purpose: "Annadanam",
                    date: new Date().toISOString().slice(0, 10),
                  },
                  ...p.donations,
                ],
              }))
            }
          >
            Record donation
          </AddBtn>
        }
      />
      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <th className="p-4">Devotee</th>
              <th className="p-4">Purpose</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Amount</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {s.donations.map((d) => (
              <tr key={d.id} className="border-b border-border last:border-0">
                <td className="p-3">
                  <input
                    className={inputCls}
                    value={d.name}
                    onChange={(e) => upd(setS, "donations", d.id, { name: e.target.value })}
                  />
                </td>
                <td className="p-3">
                  <input
                    className={inputCls}
                    value={d.purpose}
                    onChange={(e) => upd(setS, "donations", d.id, { purpose: e.target.value })}
                  />
                </td>
                <td className="p-3">
                  <input
                    type="date"
                    className={inputCls}
                    value={d.date}
                    onChange={(e) => upd(setS, "donations", d.id, { date: e.target.value })}
                  />
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    className={`${inputCls} text-right`}
                    value={d.amount}
                    onChange={(e) =>
                      upd(setS, "donations", d.id, { amount: Number(e.target.value) })
                    }
                  />
                </td>
                <td className="p-3">
                  <DelBtn onClick={() => del(setS, "donations", d.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}
