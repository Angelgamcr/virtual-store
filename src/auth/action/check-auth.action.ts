import { shopApi } from "@/api/shopApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const checkAuthAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem("access-token");
  if (!token) throw new Error("No token found");

  try {
    const { data } = await shopApi.get<AuthResponse>("/auth/check-status");
    // localStorage.setItem("access-token", data.accessToken);
    return data;
  } catch (error) {
    console.log("Check Status failed:", error);
    // localStorage.removeItem("access-token");
    throw new Error("Failed to check auth status");
  }
};
