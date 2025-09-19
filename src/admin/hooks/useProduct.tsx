import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductByIdAction } from "../action/get-product-by-id.action";
import type { Product } from "@/interfaces/product.interface";
import { createUpdateProductAction } from "../action/create-update-product.action";

export const useProduct = (id: string) => {

  const queryClient = useQueryClient();// Brinda toda la informacion para modificar el query

  const query = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes,
    // enabled: !!id
  })


  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      // Invalidar cache
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({
        queryKey: ['product', { id: product.id.toString() }]
      })

      // Actualizar queryData
      queryClient.setQueryData(['products', { id: product.id.toString() }], product)

    }
  });


  return {
    ...query,
    mutation
  };
}