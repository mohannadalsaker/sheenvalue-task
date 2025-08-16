import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import type { ProductCategoryData } from "../../types";

const baseUrl = "https://dummyjson.com/products";

export const useGetCategories = () => {
  const query = useQuery<
    ProductCategoryData[],
    Error,
    { label: string; value: string }[]
  >({
    queryKey: ["categories"],
    queryFn: () => fetcher<ProductCategoryData[]>(`${baseUrl}/categories`),
    staleTime: "static",
    select: (data): { label: string; value: string }[] => {
      return data.map((ele) => ({
        label: ele.name,
        value: ele.slug,
      }));
    },
  });
  return query;
};
