/**
 * Storage and Session Manager for Shri Mahalaxmi Mandir
 * 
 * Provides strict separation between:
 * - Devotee User Session: user_token, user_details ({ id, name, mobile, email, ... })
 * - Admin Sansthan Session: admin_token, admin_details ({ admin_id, email, role, ... })
 * 
 * Enforces a 1-hour (60 minutes) JWT session lifetime.
 * - For Devotee: silent auto-logout on expiry (NO modal popup).
 * - For Admin: triggers an explicit Session Expired modal popup.
 */

export const STORAGE_KEYS = {
  // User Session Keys
  USER_TOKEN: "user_token",
  USER_DETAILS: "user_details",
  USER_SESSION_EXPIRES_AT: "user_session_expires_at",

  // Admin Session Keys
  ADMIN_TOKEN: "admin_token",
  ADMIN_DETAILS: "admin_details",
  ADMIN_SESSION_EXPIRES_AT: "admin_session_expires_at",
  ADMIN_AUTH: "admin_auth",

  // Legacy fallback key for backwards compatibility
  LEGACY_ACCESS_TOKEN: "access_token",
} as const;

export const SESSION_DURATION_MS = 60 * 60 * 1000; // 1 Hour in milliseconds

export interface StoredUserDetails {
  id: number | string;
  name: string | null;
  mobile: string;
  email?: string | null;
  city?: string | null;
  address?: string | null;
  gotra?: string | null;
  totalBookings?: number;
  totalSpent?: number;
  status?: string;
  login_time?: number;
  expires_at?: number;
  [key: string]: any;
}

export interface StoredAdminDetails {
  admin_id: number | string;
  email: string;
  role?: string;
  login_time?: number;
  expires_at?: number;
  [key: string]: any;
}

// ---------------------------------------------------------------------------
// USER SESSION HELPERS (Devotee)
// ---------------------------------------------------------------------------

export function saveUserSession(token: string, user: Partial<StoredUserDetails>): void {
  if (typeof window === "undefined") return;
  const now = Date.now();
  const expiresAt = now + SESSION_DURATION_MS;

  const userPayload: StoredUserDetails = {
    id: user.id ?? "",
    name: user.name ?? null,
    mobile: user.mobile ?? "",
    email: user.email ?? null,
    city: user.city ?? null,
    address: user.address ?? null,
    gotra: user.gotra ?? null,
    totalBookings: user.totalBookings ?? 0,
    totalSpent: user.totalSpent ?? 0,
    status: user.status ?? "Regular",
    login_time: now,
    expires_at: expiresAt,
  };

  try {
    localStorage.setItem(STORAGE_KEYS.USER_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER_DETAILS, JSON.stringify(userPayload));
    localStorage.setItem(STORAGE_KEYS.USER_SESSION_EXPIRES_AT, String(expiresAt));

    // Keep legacy key synced for user session if admin isn't logged in
    if (!localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH)) {
      localStorage.setItem(STORAGE_KEYS.LEGACY_ACCESS_TOKEN, token);
    }
  } catch (err) {
    console.error("Failed to save user session in localStorage:", err);
  }
}

export function getUserToken(): string | null {
  if (typeof window === "undefined") return null;
  if (isUserSessionExpired()) {
    clearUserSession();
    return null;
  }
  return localStorage.getItem(STORAGE_KEYS.USER_TOKEN) || localStorage.getItem(STORAGE_KEYS.LEGACY_ACCESS_TOKEN);
}

export function getUserDetails(): StoredUserDetails | null {
  if (typeof window === "undefined") return null;
  if (isUserSessionExpired()) {
    clearUserSession();
    return null;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_DETAILS);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function updateStoredUserDetails(partial: Partial<StoredUserDetails>): StoredUserDetails | null {
  if (typeof window === "undefined") return null;
  const existing = getUserDetails();
  if (!existing) return null;

  const merged = { ...existing, ...partial };
  try {
    localStorage.setItem(STORAGE_KEYS.USER_DETAILS, JSON.stringify(merged));
  } catch (err) {
    console.error("Failed to update user details in localStorage:", err);
  }
  return merged;
}

export function isUserSessionExpired(): boolean {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem(STORAGE_KEYS.USER_TOKEN);
  const expiresAt = localStorage.getItem(STORAGE_KEYS.USER_SESSION_EXPIRES_AT);
  if (!token) return false;
  if (!expiresAt) return false;

  return Date.now() > Number(expiresAt);
}

export function clearUserSession(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DETAILS);
    localStorage.removeItem(STORAGE_KEYS.USER_SESSION_EXPIRES_AT);

    // If legacy access_token belongs to user, clear it too
    if (!localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH)) {
      localStorage.removeItem(STORAGE_KEYS.LEGACY_ACCESS_TOKEN);
    }
  } catch (err) {
    console.error("Failed to clear user session from localStorage:", err);
  }
}

// ---------------------------------------------------------------------------
// ADMIN SESSION HELPERS
// ---------------------------------------------------------------------------

export function saveAdminSession(token: string, admin: Partial<StoredAdminDetails>): void {
  if (typeof window === "undefined") return;
  const now = Date.now();
  const expiresAt = now + SESSION_DURATION_MS;

  const adminPayload: StoredAdminDetails = {
    admin_id: admin.admin_id ?? "",
    email: admin.email ?? "",
    role: admin.role ?? "admin",
    login_time: now,
    expires_at: expiresAt,
  };

  try {
    localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.ADMIN_DETAILS, JSON.stringify(adminPayload));
    localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION_EXPIRES_AT, String(expiresAt));
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, "true");
  } catch (err) {
    console.error("Failed to save admin session in localStorage:", err);
  }
}

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN) || localStorage.getItem(STORAGE_KEYS.LEGACY_ACCESS_TOKEN);
}

export function getAdminDetails(): StoredAdminDetails | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_DETAILS);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAdminSessionExpired(): boolean {
  if (typeof window === "undefined") return false;
  const isAdminLoggedIn = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === "true";
  if (!isAdminLoggedIn) return false;

  const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
  const expiresAt = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION_EXPIRES_AT);

  // If flagged as logged in but missing token or past 1 hour, session is expired
  if (!token) return true;
  if (!expiresAt) return false;

  return Date.now() > Number(expiresAt);
}

export function clearAdminSession(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_DETAILS);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION_EXPIRES_AT);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  } catch (err) {
    console.error("Failed to clear admin session from localStorage:", err);
  }
}

// ---------------------------------------------------------------------------
// SESSION EXPIRY EVENT DISPATCHERS
// ---------------------------------------------------------------------------

export function notifyUserSessionExpired(): void {
  if (typeof window === "undefined") return;
  clearUserSession();
  window.dispatchEvent(new CustomEvent("user:session-expired"));
}

export function notifyAdminSessionExpired(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("admin:session-expired"));
}
