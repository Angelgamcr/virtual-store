import { shopApi } from "@/api/shopApi";
import type { Product } from "@/interfaces/product.interface";

export const getProductByIdAction = async (id: string): Promise<Product> => {
  if (!id) throw new Error("Product ID is required");

  if (id === "new") {
    return {
      id: "new",
      title: "",
      description: "",
      slug: "",
      price: 0,
      stock: 0,
      sizes: [],
      gender: "men",
      tags: [],
      images: [],
    } as unknown as Product;
  }

  const { data } = await shopApi.get<Product>(`/products/${id}`);

  const images = data.images.map((image) => {
    if (image.includes("http")) return image;
    return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
  });

  return {
    ...data,
    images,
  };
};
