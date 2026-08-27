import { apiClient } from "@/src/lib/api";

export interface AdminLoginPayload {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  message: string;
  admin_id: number;
  access_token: string;
  token_type?: string;
}

export const authService = {
  /**
   * Admin Login API Request
   * Endpoint: POST /admin/auth/login
   */
  adminLogin: async (payload: AdminLoginPayload): Promise<AdminLoginResponse> => {
    const response = await apiClient.post<AdminLoginResponse>("/admin/auth/login", payload);
    return response.data;
  },
};
