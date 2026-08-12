"use client";

import React from "react";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";
import { State } from "./admin-context";

export function Head({ title, sub, action }: { title: string; sub: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 pb-4 border-b border-stone-200/80">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#380D12]">{title}</h2>
        <p className="mt-1 text-xs text-stone-500 font-medium">{sub}</p>
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[24px] border border-amber-900/10 bg-white p-6 shadow-[0_4px_25px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_10px_35px_rgba(0,0,0,0.06)] hover:border-amber-500/20 ${className}`}>
      {children}
    </div>
  );
}

export const inputCls =
  "w-full rounded-2xl border border-stone-200/90 bg-stone-50/70 px-4 py-3 text-xs text-stone-800 placeholder:text-stone-400 outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all font-sans";

export function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] uppercase tracking-widest text-stone-400 font-bold">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className={inputCls}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export function AddBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#380D12] text-amber-200 hover:bg-[#4A151C] hover:text-white font-semibold text-xs py-2.5 px-6 rounded-full shadow-md flex items-center gap-2 transition-all active:scale-95"
    >
      <HiOutlinePlus className="text-sm stroke-[3]" /> {children}
    </button>
  );
}

export function DelBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Delete"
      className="grid size-9 place-items-center rounded-full bg-rose-50 border border-rose-200/60 text-rose-500 hover:bg-rose-100 transition-colors shadow-sm"
    >
      <HiOutlineTrash className="text-sm" />
    </button>
  );
}

export function Toggle({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="flex items-center gap-3 text-xs text-stone-700 font-semibold hover:text-[#380D12] transition-colors"
      role="switch"
      aria-checked={on}
    >
      <span
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
          on ? "bg-[#380D12]" : "bg-stone-200"
        }`}
      >
        <span
          className={`inline-block size-5 transform rounded-full bg-white transition-transform ${
            on ? "translate-x-5" : "translate-x-0.5"
          } my-0.5 shadow-sm`}
        />
      </span>
      {label}
    </button>
  );
}

type ListKey = "events" | "rituals" | "donations" | "testimonials" | "messages";

export function upd(
  setS: React.Dispatch<React.SetStateAction<State>>,
  key: ListKey,
  id: string,
  patch: Record<string, unknown>,
) {
  setS(
    (p) =>
      ({
        ...p,
        [key]: (p[key] as { id: string }[]).map((it) => (it.id === id ? { ...it, ...patch } : it)),
      }) as State,
  );
}

export function del(setS: React.Dispatch<React.SetStateAction<State>>, key: ListKey, id: string) {
  setS(
    (p) =>
      ({
        ...p,
        [key]: (p[key] as { id: string }[]).filter((it) => it.id !== id),
      }) as State,
  );
}
