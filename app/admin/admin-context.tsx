"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { IMG } from "@/src/components/temple/images";
import { adminDashboardApi } from "@/src/lib/api";

export type DevoteeUser = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  city: string;
  regDate: string;
  totalBookings: number;
  totalSpent: number;
  status: "Active" | "VIP" | "Regular";
};

export type SevaBooking = {
  id: string;
  bookingRef: string;
  userName: string;
  mobile: string;
  gotra: string;
  familyMembers: string;
  pujaTitle: string;
  amount: number;
  bookingDate: string;
  pujaSlotDate: string;
  paymentMode: string;
  paymentStatus: "Paid & Confirmed" | "Completed" | "Pending Recitation";
  transactionId: string;
};

export type State = {
  summary: {
    total_users: number;
    total_orders: number;
    total_revenue: number;
    today_bookings: number;
    today_revenue: number;
  };
  gallery: string[];
  events: { id: string; date: string; name: string; note: string }[];
  rituals: { id: string; time: string; name: string }[];
  donations: { id: string; name: string; amount: number; purpose: string; date: string }[];
  testimonials: { id: string; name: string; role: string; text: string; published: boolean }[];
  messages: { id: string; name: string; email: string; text: string; read: boolean }[];
  users: DevoteeUser[];
  bookings: SevaBooking[];
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
  summary: {
    total_users: 0,
    total_orders: 0,
    total_revenue: 0,
    today_bookings: 0,
    today_revenue: 0,
  },
  gallery: [],
  events: [],
  rituals: [],
  donations: [],
  users: [],
  bookings: [],
  testimonials: [],
  messages: [],
  settings: {
    templeName: "",
    tagline: "",
    phone: "",
    email: "",
    address: "",
    openTime: "",
    closeTime: "",
    liveDarshan: false,
    donationsOpen: false,
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
    async function loadData() {
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) setS({ ...initial, ...JSON.parse(raw) });

        // Fetch fresh state from backend
        const backendState = await adminDashboardApi.getState();
        if (backendState) {
          setS(prev => ({ ...prev, ...backendState }));
        }
      } catch (e) {
        console.error("Failed to fetch admin state:", e);
      } finally {
        setHydrated(true);
      }
    }
    loadData();
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
