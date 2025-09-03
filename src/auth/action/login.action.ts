import { shopApi } from "@/api/shopApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const loginAction = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    // Your login logic here
    const { data } = await shopApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
