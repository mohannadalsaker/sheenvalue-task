import { useQuery } from "@tanstack/react-query";
import type { SingleProductData } from "../../types";
import { fetcher } from "@/api/fetcher";

const baseUrl = "https://dummyjson.com/products";

export const useGetSingleProduct = (id: number) => {
  const query = useQuery<SingleProductData>({
    queryKey: ["product", id],
    queryFn: () => fetcher<SingleProductData>(`${baseUrl}/${id}`),
    staleTime: 1000 * 60 * 30,
    enabled: Boolean(id),
  });
  return query;
};
