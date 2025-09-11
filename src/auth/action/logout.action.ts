// TODO: Aplicar logout
import { shopApi } from "@/api/shopApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const logoutAction = async (): Promise<AuthResponse> => {
  try {
    // Your login logic here
    const { data } = await shopApi.post<AuthResponse>("/auth/logout");
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
