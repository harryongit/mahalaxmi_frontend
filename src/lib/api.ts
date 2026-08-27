import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://server.ambabaimahalaxmi.com/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function apiFetch<T>(
  endpoint: string,
  options: { method?: string; body?: any; headers?: any } = {}
): Promise<T> {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;

  // Read JWT token from localStorage
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token");
  }

  const response = await axios({
    url,
    method: (options.method || "GET") as any,
    data: options.body ? (typeof options.body === "string" ? JSON.parse(options.body) : options.body) : undefined,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return response.data;
}

export const authApi = {
  login: async (phoneNumber: string) => {
    const data = await apiFetch<{ message: string; user_id: number; access_token: string }>('/auth/login', {
      method: 'POST',
      body: { phone_number: phoneNumber }
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
      body: { status } 
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
      body: { amount }
    }),
  verifySignature: (payload: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) =>
    apiFetch<{ status: string; message: string }>('/payments/verify', {
      method: 'POST',
      body: payload
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
