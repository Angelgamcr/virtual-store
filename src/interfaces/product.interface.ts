import type { User } from "./user.interface";

export interface Product {
  id: string;
  available: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  iva: number;
  category: string;
  sizes: Size[];
  gender: Gender;
  tags: string[];
  images: string[];
  user: User;
}

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";
export type Gender = "kid" | "men" | "women" | "unisex";
// TODO: Category se debe obtener de backend
export type Category = "Lacteos" | "Frutas" | "Pizza" | "Test";
