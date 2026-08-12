"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { IMG } from "@/src/components/temple/images";

export type State = {
  gallery: string[];
  events: { id: string; date: string; name: string; note: string }[];
  rituals: { id: string; time: string; name: string }[];
  donations: { id: string; name: string; amount: number; purpose: string; date: string }[];
  testimonials: { id: string; name: string; role: string; text: string; published: boolean }[];
  messages: { id: string; name: string; email: string; text: string; read: boolean }[];
  settings: {
    templeName: string;
    tagline: string;
    phone: string;
    email: string;
    address: string;
    openTime: string;
    closeTime: string;
    liveDarshan: boolean;
    donationsOpen: boolean;
    maintenance: boolean;
  };
};

export const initial: State = {
  gallery: IMG.gallery,
  events: [
    {
      id: "e1",
      date: "2026-12-12",
      name: "Karthikai Deepam",
      note: "108,000 lamps, main courtyard",
    },
    { id: "e2", date: "2027-01-14", name: "Pongal Vizha", note: "Community feast at dawn" },
    { id: "e3", date: "2027-02-26", name: "Annual Yagna", note: "Nine-day fire ritual" },
  ],
  rituals: [
    { id: "r1", time: "05:30", name: "Usha Kala Puja" },
    { id: "r2", time: "08:00", name: "Kalasanthi Abhishekam" },
    { id: "r3", time: "12:00", name: "Uchikala Puja" },
    { id: "r4", time: "18:30", name: "Sayaraksha Deeparadhana" },
    { id: "r5", time: "20:30", name: "Ardha Jama Puja" },
  ],
  donations: [
    { id: "d1", name: "Priya Iyer", amount: 5100, purpose: "Annadanam", date: "2026-07-28" },
    {
      id: "d2",
      name: "Ravi Menon",
      amount: 25000,
      purpose: "Gopuram Restoration",
      date: "2026-07-26",
    },
    { id: "d3", name: "Anya Sharma", amount: 1100, purpose: "Deepam Seva", date: "2026-07-22" },
  ],
  testimonials: [
    {
      id: "t1",
      name: "Priya Iyer",
      role: "Pilgrim, Bengaluru",
      text: "I have never felt so deeply held by silence.",
      published: true,
    },
    {
      id: "t2",
      name: "Ravi Menon",
      role: "Architect",
      text: "The proportions are perfect.",
      published: true,
    },
  ],
  messages: [
    {
      id: "m1",
      name: "Karthik Reddy",
      email: "karthik@mail.com",
      text: "May I photograph the morning aarti?",
      read: false,
    },
    {
      id: "m2",
      name: "Meera Joshi",
      email: "meera@mail.com",
      text: "I'd like to volunteer for annadanam.",
      read: true,
    },
  ],
  settings: {
    templeName: "Shri Mandir",
    tagline: "A Sacred Sanctuary",
    phone: "+91 98765 43210",
    email: "seva@shrimandir.org",
    address: "Temple Road, Old Town, Tamil Nadu 620001",
    openTime: "05:00",
    closeTime: "21:00",
    liveDarshan: true,
    donationsOpen: true,
    maintenance: false,
  },
};

const KEY = "temple-admin-state";

type AdminContextType = {
  s: State;
  setS: React.Dispatch<React.SetStateAction<State>>;
  hydrated: boolean;
};

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [s, setS] = useState<State>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setS({ ...initial, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(s));
  }, [s, hydrated]);

  return <AdminContext.Provider value={{ s, setS, hydrated }}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}

export const uid = () => Math.random().toString(36).slice(2, 9);
