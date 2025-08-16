import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { ProductsData, ProductTableRow } from "../../types";
import { fetcher } from "@/api/fetcher";
import type { QueryParams } from "@/shared/types";

const baseUrl = "https://dummyjson.com/products";
const LIMIT = 30;

export const useGetProducts = ({ q }: Partial<QueryParams>) => {
  return useInfiniteQuery<
    { products: ProductsData[]; total: number },
    Error,
    InfiniteData<{ products: ProductTableRow[]; total: number }>
  >({
    queryKey: ["products", q],
    queryFn: ({ pageParam = 0 }) => {
      const skip = Number(pageParam) * LIMIT;
      return fetcher<{ products: ProductsData[]; total: number }>(
        `${baseUrl}${q ? `/search?q=${q}` : ""}${
          q ? `&skip=${skip}&limit=${LIMIT}` : `?skip=${skip}&limit=${LIMIT}`
        }`
      );
    },
    staleTime: 1000 * 60 * 30,
    select: (data) => {
      return {
        ...data,
        pages: data.pages.map((page) => ({
          products: page.products.map((ele) => ({
            id: ele.id,
            title: ele.title,
            price: `$${ele.price}`,
            category: ele.category,
          })),
          total: page.total,
        })),
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.length * LIMIT;
      // Continue fetching if we haven't reached the total and last page was full
      return loadedItems < lastPage.total && lastPage.products.length === LIMIT
        ? allPages.length
        : undefined;
    },
    initialPageParam: 0,
  });
};
