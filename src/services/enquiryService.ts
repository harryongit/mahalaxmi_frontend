import { apiClient } from "@/src/lib/api";

export interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface EnquiryResponse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  admin_reply?: string | null;
  created_at: string;
  updated_at?: string | null;
}

export const enquiryService = {
  /**
   * Create Devotee Enquiry (Public API)
   * Endpoint: POST /enquiries/
   */
  createEnquiry: async (payload: EnquiryPayload): Promise<EnquiryResponse> => {
    const response = await apiClient.post<EnquiryResponse>("/enquiries/", payload);
    return response.data;
  },

  /**
   * Fetch All Enquiries for Admin Dashboard
   * Endpoint: GET /enquiries/admin
   */
  getAdminEnquiries: async (): Promise<EnquiryResponse[]> => {
    const response = await apiClient.get<EnquiryResponse[]>("/enquiries/admin");
    return response.data;
  },

  /**
   * Admin Reply to Enquiry
   * Endpoint: PATCH /enquiries/admin/{id}/respond
   */
  respondToEnquiry: async (id: number, admin_reply: string): Promise<EnquiryResponse> => {
    const response = await apiClient.patch<EnquiryResponse>(`/enquiries/admin/${id}/respond`, {
      admin_reply,
    });
    return response.data;
  },
};
