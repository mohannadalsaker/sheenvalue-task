import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProductsFormFields } from "../../validation/ProductsSchema";
import { put } from "@/api/mutator";
import { toast } from "react-toastify";

const baseUrl = "https://dummyjson.com/products";

export const useUpdateProduct = ({
  id,
  onSuccess,
}: {
  id: number;
  onSuccess?: () => void;
}) => {
  const queryclient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: Partial<ProductsFormFields>) =>
      put<Partial<ProductsFormFields>>(`${baseUrl}/${id}`, data),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["product"] });
      queryclient.invalidateQueries({ queryKey: ["product", id] });
      toast.success("Product updated");
      onSuccess?.();
    },
    onError: () => {
      toast.error("There has been an error updating the product");
    },
  });
  return mutation;
};
