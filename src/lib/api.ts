import axios, { AxiosError } from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://server.ambabaimahalaxmi.com/api/v1";

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

/** Raw client: returns the full envelope; errors become ApiError. */
export const rawClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

rawClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeError(error))
);

/** Public client: automatically unwraps `data` from the envelope so callers get the payload directly. */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response) => {
    const body = response.data;
    if (body && typeof body === "object" && "success" in body && "data" in body) {
      response.data = body.data;
    }
    return response;
  },
  (error) => Promise.reject(normalizeError(error))
);

function authHeaders(): Record<string, string> {
  let token: string | null = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token");
  }
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
  const response = await apiClient.request({
    url,
    method: (options.method || "GET") as any,
    data:
      options.body !== undefined
        ? typeof options.body === "string"
          ? JSON.parse(options.body)
          : options.body
        : undefined,
    headers: { ...options.headers, ...authHeaders() },
  });
  return response.data as T;
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
    headers: authHeaders(),
  });
  return response.data as ApiEnvelope<T>;
}

export const authApi = {
  login: async (phoneNumber: string) => {
    const data = await apiFetch<{ message: string; user_id: number; access_token: string }>('/auth/login', {
      method: 'POST',
      body: { phone_number: phoneNumber },
    });
    if (typeof window !== "undefined" && data?.access_token) {
      localStorage.setItem("access_token", data.access_token);
    }
    return data;
  },
};

export const userApi = {
  getMe: () => apiFetch<any>('/users/me'),
  updateMe: (data: any) => apiFetch<any>('/users/me', { method: 'PUT', body: data }),
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
  updateStatus: (bookingRef: string, status: string) =>
    apiFetch<any>(`/bookings/${bookingRef}/status`, { method: 'PATCH', body: { paymentStatus: status } }),
};

export const bookingApi = {
  createBooking: (payload: any) =>
    apiFetch<any>('/bookings/', { method: 'POST', body: payload }),
  getUserBookings: () =>
    apiFetch<any[]>('/bookings/me'),
};

export const paymentApi = {
  createOrder: (amount: number) =>
    apiFetch<{ order_id: string; amount: number; currency: string }>('/payments/create-order', {
      method: 'POST',
      body: { amount },
    }),
  verifySignature: (payload: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) =>
    apiFetch<{ status: string; message: string }>('/payments/verify', {
      method: 'POST',
      body: payload,
    }),
};

export const contentApi = {
  getGallery: () => apiFetch<any[]>('/content/gallery'),
  getRituals: () => apiFetch<any[]>('/content/rituals'),
  getEvents: () => apiFetch<any[]>('/content/events'),
  getTestimonials: () => apiFetch<any[]>('/content/testimonials'),
  getSettings: () => apiFetch<any>('/content/settings'),
};

export const serviceApi = {
  getServices: () => apiFetch<any[]>('/services/'),
  getService: (slug: string) => apiFetch<any>(`/services/${slug}`),
};

export const enquiryApi = {
  respondToEnquiry: (id: string | number, reply: string) =>
    apiFetch<any>(`/enquiries/admin/${id}/respond`, { method: 'PATCH', body: { admin_reply: reply } }),
};

export const adminContentApi = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    let token: string | null = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("access_token");
    }

    const response = await fetch(`${API_BASE_URL}/admin/content/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      let message = "Upload failed";
      try {
        const errData = await response.json();
        message = errData?.message || errData?.detail || message;
      } catch { /* ignore parse errors */ }
      throw new ApiError(message, response.status);
    }
    return response.json();
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

  createGalleryImage: (data: { url: string }) => apiFetch<any>('/admin/content/gallery', { method: 'POST', body: data }),
  deleteGalleryImage: (id: string | number) => apiFetch<any>(`/admin/content/gallery/${id}`, { method: 'DELETE' }),
};
