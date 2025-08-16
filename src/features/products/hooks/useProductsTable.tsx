import type { MainTableAction, MainTableColumn } from "@/shared/types";
import { useGetProducts } from "../api/products/useGetAllProducts";
import type { ProductTableRow } from "../types";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDialogStore } from "@/stores";
import { useCallback, useRef, useState } from "react";
import { debounce } from "lodash";

export const useProductsTable = () => {
  const navigate = useNavigate();
  const { changeOpenEdit, changeOpenDelete } = useDialogStore();
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetProducts({ q: searchValue });

  const columns: MainTableColumn<ProductTableRow>[] = [
    {
      key: "title",
      label: "Name",
    },
    {
      key: "price",
      label: "Price",
    },
    {
      key: "category",
      label: "Category",
    },
  ];

  const tableActions: MainTableAction[] = [
    {
      icon: Eye,
      action: (id) => navigate(`view/${id}`),
    },
    {
      icon: Pencil,
      action: (id) => changeOpenEdit(id),
    },
    {
      icon: Trash2,
      action: (id) => changeOpenDelete(id),
      type: "delete",
    },
  ];

  const handleSearch = debounce((value: string) => {
    setSearchValue(value);
  }, 500);

  const handleScroll = useCallback(() => {
    if (tableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
      if (
        scrollTop + clientHeight >= scrollHeight * 0.8 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const rows = data?.pages.flatMap((page) => page.products) || [];
  const totalProducts = data?.pages[0]?.total || 0;

  return {
    rows,
    totalProducts,
    columns,
    isPending: isLoading,
    isFetchingMore: isFetchingNextPage,
    hasMore: hasNextPage,
    tableActions,
    tableRef,
    handleSearch,
    handleScroll,
  };
};
