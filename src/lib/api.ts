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
  
  const response = await axios({
    url,
    method: (options.method || "GET") as any,
    data: options.body ? (typeof options.body === "string" ? JSON.parse(options.body) : options.body) : undefined,
    headers: options.headers,
  });

  return response.data;
}

export const authApi = {
  login: (phoneNumber: string) => 
    apiFetch<{ message: string; user_id: number }>('/auth/login', { 
      method: 'POST', 
      body: { phone_number: phoneNumber } 
    }),
};

export const userApi = {
  getMe: () => apiFetch<any>('/users/me'),
  updateMe: (data: any) => apiFetch<any>('/users/me', { method: 'PUT', body: data }),
  getStats: () => apiFetch<any>('/users/me/stats'),
};

export const adminUserApi = {
  updateStatus: (id: string | number, status: string) => 
    apiFetch<any>(`/admin/users/${id}/status`, { method: 'PATCH', body: { status } }),
};

export const adminDashboardApi = {
  getState: () => apiFetch<any>('/admin/dashboard/state'),
};
