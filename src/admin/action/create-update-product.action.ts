import { shopApi } from "@/api/shopApi";
import type { Product } from "@/interfaces/product.interface";
import { sleep } from "@/lib/sleep";

export const createUpdateProductAction = async (
  productLike: Partial<Product>
): Promise<Product> => {
  // Espera 1.5 seg
  await sleep(1500);

  const { id, user, images = [], ...rest } = productLike;

  const isCreating = id === "new";

  rest.stock = Number(rest.stock || 0);
  rest.price = Number(rest.price || 0);

  const { data } = await shopApi<Product>({
    url: isCreating ? "/products" : `/products/${id}`,
    method: isCreating ? "POST" : "PATCH",
    data: rest,
  });

  return {
    ...data,
    images: data.images.map((image) => {
      if (image.includes("http")) return image;
      return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
    }),
  };
};
