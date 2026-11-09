import axios, { AxiosError } from "axios";
import {
  getUserToken,
  getAdminToken,
  saveUserSession,
  clearUserSession,
  updateStoredUserDetails,
  notifyUserSessionExpired,
  notifyAdminSessionExpired,
} from "./storage";

export {
  getUserToken,
  getAdminToken,
  saveUserSession,
  clearUserSession,
  updateStoredUserDetails,
  notifyUserSessionExpired,
  notifyAdminSessionExpired,
};

// Server API: "https://server.ambabaimahalaxmi.com/api/v1"
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

/**
 * Standard API envelope returned by the backend for every 2xx response:
 *   { success: true, message: string, data: T }
 * and for failures (raised as ApiError):
 *   { success: false, message: string, errors?: any }
 */
export interface ApiEnvelope<T = any> {
  success: boolean;
  message: string;
  data: T;
  errors?: any;
}

/** Normalized error thrown by every API call. `message` is the server's human-readable text. */
export class ApiError extends Error {
  status: number;
  errors?: any;
  constructor(message: string, status: number, errors?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

function normalizeError(err: any): ApiError {
  if (err instanceof ApiError) return err;
  const resp = (err as AxiosError)?.response;
  if (resp) {
    const data: any = resp.data || {};
    const message =
      data?.message ||
      data?.detail ||
      (typeof data === "string" ? data : null) ||
      (err as AxiosError)?.message ||
      "Request failed";
    return new ApiError(message, resp.status, data?.errors);
  }
  if ((err as AxiosError)?.request) {
    return new ApiError("Network error. Please check your connection.", 0);
  }
  return new ApiError(err?.message || "Something went wrong", 0);
}

function isEndpointAdmin(url?: string): boolean {
  if (!url) return false;
  return (
    url.includes("/admin") ||
    url.includes("/enquiries/admin") ||
    url.includes("/devotees")
  );
}

function getAppropriateToken(url?: string): string | null {
  if (typeof window === "undefined") return null;
  const isAdmin =
    isEndpointAdmin(url) ||
    window.location.pathname.startsWith("/admin");
  return isAdmin ? getAdminToken() : getUserToken();
}

function handle401Error(url?: string) {
  if (typeof window === "undefined") return;
  const isAdmin =
    isEndpointAdmin(url) ||
    window.location.pathname.startsWith("/admin");
  if (isAdmin) {
    notifyAdminSessionExpired();
  } else {
    notifyUserSessionExpired();
  }
}

/** Raw client: returns the full envelope; errors become ApiError. */
export const rawClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

rawClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getAppropriateToken(config.url);
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

rawClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normErr = normalizeError(error);
    if (normErr.status === 401) {
      handle401Error(error?.config?.url);
    }
    return Promise.reject(normErr);
  }
);

/** Public client: automatically unwraps `data` from the envelope so callers get the payload directly. */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getAppropriateToken(config.url);
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const body = response.data;
    if (body && typeof body === "object" && "success" in body && "data" in body) {
      if (body.data === null || body.data === undefined) {
        response.data = { message: body.message, success: body.success };
      } else if (typeof body.data === "object" && !Array.isArray(body.data)) {
        if (!("message" in body.data) && body.message) {
          body.data.message = body.message;
        }
        response.data = body.data;
      } else {
        response.data = body.data;
      }
    }
    return response;
  },
  (error) => {
    const normErr = normalizeError(error);
    if (normErr.status === 401) {
      handle401Error(error?.config?.url);
    }
    return Promise.reject(normErr);
  }
);

function authHeaders(url?: string): Record<string, string> {
  const token = getAppropriateToken(url);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Low-level request. Resolves with the unwrapped `data` payload and rejects with an `ApiError`
 * whose `.message` is the server's personalized message (also available on `.status` / `.errors`).
 */
export async function apiFetch<T>(
  endpoint: string,
  options: { method?: string; body?: any; headers?: any } = {}
): Promise<T> {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  try {
    const response = await apiClient.request({
      url,
      method: (options.method || "GET") as any,
      data:
        options.body !== undefined
          ? typeof options.body === "string"
            ? JSON.parse(options.body)
            : options.body
          : undefined,
      headers: { ...authHeaders(url), ...options.headers },
    });
    return response.data as T;
  } catch (err: any) {
    if (err?.status === 401) {
      handle401Error(url);
    }
    throw err;
  }
}

/**
 * Request that returns the FULL envelope `{ success, message, data }` so the caller can
 * display the server's personalized success message.
 */
export async function apiRequest<T = any>(
  endpoint: string,
  method: string = "GET",
  body?: any
): Promise<ApiEnvelope<T>> {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  const response = await rawClient.request({
    url,
    method: method as any,
    data: body,
    headers: authHeaders(url),
  });
  return response.data as ApiEnvelope<T>;
}

export const authApi = {
  requestOtp: (phoneNumber: string) =>
    apiFetch<{ message: string; otp?: string }>('/auth/request-otp', {
      method: 'POST',
      body: { phone_number: phoneNumber },
    }),
  login: async (phoneNumber: string, otp?: string, name?: string, email?: string) => {
    const payload: any = { phone_number: phoneNumber };
    if (otp && otp.trim()) payload.otp = otp.trim();
    if (name && name.trim()) payload.name = name.trim();
    if (email && email.trim()) payload.email = email.trim();

    const data = await apiFetch<{
      message: string;
      user_id?: number | string;
      access_token: string;
      token_type?: string;
      user?: any;
      is_new_user?: boolean;
    }>('/auth/login', {
      method: 'POST',
      body: payload,
    });
    if (typeof window !== "undefined" && data?.access_token) {
      saveUserSession(data.access_token, data.user || { id: data.user_id, mobile: phoneNumber, name });
    }
    return data;
  },
  logout: () => {
    clearUserSession();
  },
};

export const userApi = {
  getMe: () => apiFetch<any>('/users/me'),
  getProfile: () => apiFetch<any>('/users/me'),
  updateMe: async (data: any) => {
    const res = await apiFetch<any>('/users/me', { method: 'PUT', body: data });
    if (res) {
      updateStoredUserDetails(res);
    }
    return res;
  },
  updateProfile: async (data: any) => {
    const res = await apiFetch<any>('/users/me', { method: 'PUT', body: data });
    if (res) {
      updateStoredUserDetails(res);
    }
    return res;
  },
  getStats: () => apiFetch<any>('/users/me/stats'),
};

export const adminUserApi = {
  getUsers: () => apiFetch<any[]>('/devotees'),
  updateStatus: (userId: string, status: string) =>
    apiFetch<any>(`/admin/users/${userId}/status`, {
      method: 'PATCH',
      body: { status },
    }),
};

export const adminDashboardApi = {
  getState: () => apiFetch<any>('/admin/dashboard/state'),
};

export const adminBookingApi = {
  getAllBookings: () => apiFetch<any[]>('/bookings/'),
  updateStatus: (bookingRef: string, status: string) =>
    apiFetch<any>(`/bookings/${bookingRef}/status`, { method: 'PATCH', body: { paymentStatus: status } }),
};

export const bookingApi = {
  createBooking: (payload: any) =>
    apiFetch<any>('/bookings/', { method: 'POST', body: payload }),
  getUserBookings: () =>
    apiFetch<any[]>('/bookings/me'),
  getInvoiceUrl: (bookingRef: string) =>
    `${API_BASE_URL}/bookings/${bookingRef}/invoice`,
};

export const paymentApi = {
  createOrder: (amount: number) =>
    apiFetch<{ order_id: string; amount: number; currency: string; key_id?: string }>('/payments/create-order', {
      method: 'POST',
      body: { amount },
    }),
  verifySignature: (payload: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) =>
    apiFetch<{ status: string; message: string }>('/payments/verify', {
      method: 'POST',
      body: payload,
    }),
};

export interface GalleryItem {
  id: number;
  url: string;
  media_type: "image" | "video";
  title?: string | null;
  category?: string | null;
  is_active: boolean;
  created_at?: string | null;
}

export function getMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("blob:") ||
    url.startsWith("data:")
  ) {
    return url;
  }
  const backendOrigin = API_BASE_URL.replace(/\/api\/v1\/?$/, "");
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${backendOrigin}${cleanPath}`;
}

export interface DonationItem {
  id: number;
  name: string | null;
  amount: number;
  purpose: string | null;
  date: string | null;
  payment_id: string | null;
  email: string | null;
  phone: string | null;
}

export interface DonationStats {
  total_amount: number;
  total_count: number;
  recent_donations: DonationItem[];
}

export interface EventItem {
  id: number | string;
  title?: string;
  name?: string;
  from_date?: string;
  to_date?: string;
  date?: string;
  time?: string;
  description?: string;
  image?: string;
  tag?: string;
  deity?: string;
  note?: string;
  highlights?: string[];
}

export const contentApi = {
  getGallery: async (category?: string): Promise<GalleryItem[]> => {
    // Public landing page & gallery without token
    const url =
      category && category.toLowerCase() !== "all"
        ? `${API_BASE_URL}/content/gallery?category=${encodeURIComponent(category)}`
        : `${API_BASE_URL}/content/gallery`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch gallery");
    }
    const json = await res.json();
    return (json?.data || json) as GalleryItem[];
  },
  getRituals: () => apiFetch<any[]>('/content/rituals'),
  getEvents: () => apiFetch<EventItem[]>('/content/events'),
  getFestivalDates: () => apiFetch<any[]>('/content/festival-dates'),
  getTestimonials: () => apiFetch<any[]>('/content/testimonials'),
  getSettings: () => apiFetch<any>('/content/settings'),
  getDonations: (limit?: number) =>
    apiFetch<DonationItem[]>(limit ? `/content/donations?limit=${limit}` : '/content/donations'),
  getDonationStats: () =>
    apiFetch<DonationStats>('/content/donations/stats'),
  createDonation: (data: any) => apiFetch<DonationItem>('/content/donations', { method: 'POST', body: data }),
  createTestimonial: (data: any) => apiFetch<any>('/content/testimonials', { method: 'POST', body: data }),
};

export const serviceApi = {
  getServices: (category?: string) =>
    apiFetch<any[]>(category ? `/services/?category=${encodeURIComponent(category)}` : '/services/'),
  getService: (ident: string | number) => apiFetch<any>(`/services/${ident}`),
  getCategories: () => apiFetch<any[]>('/services/categories/'),
  getAddOns: (category?: string) =>
    apiFetch<any[]>(category && category.toLowerCase() !== 'all' ? `/services/addons/?category=${encodeURIComponent(category)}` : '/services/addons/'),
};

export const enquiryApi = {
  respondToEnquiry: (id: string | number, reply: string) =>
    apiFetch<any>(`/enquiries/admin/${id}/respond`, { method: 'PATCH', body: { admin_reply: reply } }),
};

export const adminContentApi = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const token = getAdminToken();

    const response = await fetch(`${API_BASE_URL}/admin/content/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    let resJson: any = null;
    try {
      resJson = await response.json();
    } catch {
      /* ignore parse errors */
    }

    if (!response.ok) {
      if (response.status === 401) {
        notifyAdminSessionExpired();
      }
      const message = resJson?.message || resJson?.detail || "Upload failed";
      throw new ApiError(message, response.status, resJson?.errors);
    }

    const dataObj = resJson?.data || resJson;
    return {
      success: resJson?.success ?? true,
      message: resJson?.message || dataObj?.message || "Image uploaded successfully",
      url: dataObj?.url || resJson?.url,
      filename: dataObj?.filename || resJson?.filename,
      data: dataObj,
    };
  },

  createEvent: (data: any) => apiFetch<any>('/admin/content/events', { method: 'POST', body: data }),
  updateEvent: (id: string | number, data: any) => apiFetch<any>(`/admin/content/events/${id}`, { method: 'PUT', body: data }),
  deleteEvent: (id: string | number) => apiFetch<any>(`/admin/content/events/${id}`, { method: 'DELETE' }),

  createRitual: (data: any) => apiFetch<any>('/admin/content/rituals', { method: 'POST', body: data }),
  updateRitual: (id: string | number, data: any) => apiFetch<any>(`/admin/content/rituals/${id}`, { method: 'PUT', body: data }),
  deleteRitual: (id: string | number) => apiFetch<any>(`/admin/content/rituals/${id}`, { method: 'DELETE' }),

  createService: (data: any) => apiFetch<any>('/admin/content/services', { method: 'POST', body: data }),
  updateService: (id: string | number, data: any) => apiFetch<any>(`/admin/content/services/${id}`, { method: 'PUT', body: data }),
  deleteService: (id: string | number) => apiFetch<any>(`/admin/content/services/${id}`, { method: 'DELETE' }),

  getGallery: () => apiFetch<GalleryItem[]>('/admin/content/gallery'),
  createGalleryImage: (data: { url: string; media_type?: string; title?: string; category?: string }) =>
    apiFetch<GalleryItem>('/admin/content/gallery', { method: 'POST', body: data }),
  uploadGalleryFile: async (file: File, title?: string, category?: string): Promise<GalleryItem> => {
    const formData = new FormData();
    formData.append('file', file);
    if (title) formData.append('title', title);
    if (category) formData.append('category', category);

    const token = getAdminToken();

    const response = await fetch(`${API_BASE_URL}/admin/content/gallery/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        notifyAdminSessionExpired();
      }
      let message = "Upload failed";
      try {
        const errData = await response.json();
        message = errData?.message || errData?.detail || message;
      } catch { /* ignore parse errors */ }
      throw new ApiError(message, response.status);
    }
    const json = await response.json();
    return (json?.data || json) as GalleryItem;
  },
  toggleGalleryStatus: (id: string | number) =>
    apiFetch<GalleryItem>(`/admin/content/gallery/${id}/toggle`, { method: 'PATCH' }),
  deleteGalleryImage: (id: string | number) =>
    apiFetch<any>(`/admin/content/gallery/${id}`, { method: 'DELETE' }),

  getDonations: (q?: string) =>
    apiFetch<DonationItem[]>(q ? `/admin/content/donations?q=${encodeURIComponent(q)}` : '/admin/content/donations'),
  createDonation: (data: Partial<DonationItem>) =>
    apiFetch<DonationItem>('/admin/content/donations', { method: 'POST', body: data }),
  updateDonation: (id: string | number, data: Partial<DonationItem>) =>
    apiFetch<DonationItem>(`/admin/content/donations/${id}`, { method: 'PUT', body: data }),
  deleteDonation: (id: string | number) =>
    apiFetch<any>(`/admin/content/donations/${id}`, { method: 'DELETE' }),
  getAddOns: (category?: string) =>
    apiFetch<any[]>(category && category.toLowerCase() !== 'all' ? `/admin/content/addons?category=${encodeURIComponent(category)}` : '/admin/content/addons'),
  createAddOn: (data: any) =>
    apiFetch<any>('/admin/content/addons', { method: 'POST', body: data }),
  updateAddOn: (id: string | number, data: any) =>
    apiFetch<any>(`/admin/content/addons/${id}`, { method: 'PUT', body: data }),
  toggleAddOnStatus: (id: string | number, is_active: boolean) =>
    apiFetch<any>(`/admin/content/addons/${id}/status?is_active=${is_active}`, { method: 'PATCH' }),
  deleteAddOn: (id: string | number) =>
    apiFetch<any>(`/admin/content/addons/${id}`, { method: 'DELETE' }),
};

