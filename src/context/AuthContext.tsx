"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authApi, userApi } from "@/src/lib/api";
import {
  getUserToken,
  getUserDetails,
  clearUserSession,
  isUserSessionExpired,
  updateStoredUserDetails,
  saveUserSession,
} from "@/src/lib/storage";
import { useQueryClient } from "@tanstack/react-query";

export interface DevoteeUser {
  id: number | string;
  name: string | null;
  mobile: string;
  email: string | null;
  gotra?: string | null;
  gan?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  pin_code?: string | null;
  country?: string | null;
  totalBookings?: number;
  totalSpent?: number;
  status?: string;
  created_at?: string;
  login_time?: number;
  expires_at?: number;
}

interface AuthContextType {
  user: DevoteeUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isLoginModalOpen: boolean;
  modalTab: "login" | "signup";
  openLoginModal: (tab?: "login" | "signup") => void;
  closeLoginModal: () => void;
  login: (phone: string, otp?: string, name?: string, email?: string) => Promise<{ success: boolean; message: string; is_new_user?: boolean }>;
  requestOtp: (phone: string) => Promise<{ message: string; otp?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateUserLocal: (updatedData: Partial<DevoteeUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Pre-seed with cached user details from localStorage to prevent flash of guest state
  const [user, setUser] = useState<DevoteeUser | null>(() => {
    if (typeof window === "undefined") return null;
    if (isUserSessionExpired()) {
      clearUserSession();
      return null;
    }
    return getUserDetails() as DevoteeUser | null;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"login" | "signup">("login");
  const queryClient = useQueryClient();

  const handleSilentLogout = useCallback(() => {
    clearUserSession();
    setUser(null);
    queryClient.removeQueries({ queryKey: ["user"] });
  }, [queryClient]);

  const refreshUser = useCallback(async () => {
    if (typeof window === "undefined") return;

    if (isUserSessionExpired()) {
      handleSilentLogout();
      setIsLoading(false);
      return;
    }

    const token = getUserToken();
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const userData = await userApi.getProfile();
      if (userData && userData.id) {
        setUser(userData);
        updateStoredUserDetails(userData);
      } else {
        handleSilentLogout();
      }
    } catch (err: any) {
      // If token expired (401), automatically log out silently with NO modal popup
      if (err?.status === 401 || err?.response?.status === 401) {
        handleSilentLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }, [handleSilentLogout]);

  // Initial load
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // Periodic check for 1-hour session expiration + custom event listener
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkInterval = setInterval(() => {
      if (isUserSessionExpired()) {
        handleSilentLogout();
      }
    }, 15000); // Check every 15 seconds

    const onExpiredEvent = () => {
      handleSilentLogout();
    };

    window.addEventListener("user:session-expired", onExpiredEvent);
    return () => {
      clearInterval(checkInterval);
      window.removeEventListener("user:session-expired", onExpiredEvent);
    };
  }, [handleSilentLogout]);

  const openLoginModal = useCallback((tab: "login" | "signup" = "login") => {
    setModalTab(tab);
    setIsLoginModalOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
  }, []);

  const handleRequestOtp = useCallback(async (phone: string) => {
    const trimmed = phone.trim();
    const cleanPhone = trimmed.startsWith("+")
      ? "+" + trimmed.slice(1).replace(/\D/g, "")
      : "+" + trimmed.replace(/\D/g, "");
    return await authApi.requestOtp(cleanPhone);
  }, []);

  const handleLogin = useCallback(
    async (phone: string, otp?: string, name?: string, email?: string) => {
      const trimmed = phone.trim();
      const cleanPhone = trimmed.startsWith("+")
        ? "+" + trimmed.slice(1).replace(/\D/g, "")
        : "+" + trimmed.replace(/\D/g, "");
      const res = await authApi.login(cleanPhone, otp, name?.trim(), email?.trim());

      // If backend returned user data directly, update context immediately
      if (res?.user) {
        setUser(res.user);
      }

      // Invalidate queries so components re-fetch fresh data
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      queryClient.invalidateQueries({ queryKey: ["user", "stats"] });
      queryClient.invalidateQueries({ queryKey: ["user", "bookings"] });

      // Fetch fresh profile
      await refreshUser();
      setIsLoginModalOpen(false);
      return {
        success: true,
        message: res.message || "Login successful. Jai Mata Di!",
        is_new_user: (res as any)?.is_new_user,
      };
    },
    [queryClient, refreshUser]
  );

  const handleLogout = useCallback(() => {
    handleSilentLogout();
  }, [handleSilentLogout]);

  const updateUserLocal = useCallback((updatedData: Partial<DevoteeUser>) => {
    setUser((prev) => {
      if (!prev) return null;
      const merged = { ...prev, ...updatedData };
      updateStoredUserDetails(merged);
      return merged;
    });
  }, []);

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    isLoading,
    isLoginModalOpen,
    modalTab,
    openLoginModal,
    closeLoginModal,
    login: handleLogin,
    requestOtp: handleRequestOtp,
    logout: handleLogout,
    refreshUser,
    updateUserLocal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
