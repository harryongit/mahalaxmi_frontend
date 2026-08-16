import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

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
