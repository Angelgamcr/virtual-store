import { shopApi } from "@/api/shopApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const registerAction = async (
  fullName: string,
  email: string,
  password: string,
  companySlug: string
): Promise<AuthResponse> => {
  try {
    // Your register logic here
    const { data } = await shopApi.post<AuthResponse>("/auth/register", {
      fullname: fullName,
      email,
      password,
      companySlug,
    });
    return data;
  } catch (error) {
    console.error("Register failed:", error);
    throw error;
  }
};
