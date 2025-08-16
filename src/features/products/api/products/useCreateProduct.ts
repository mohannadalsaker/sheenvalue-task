import { post } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProductsFormFields } from "../../validation/ProductsSchema";
import { toast } from "react-toastify";

const baseUrl = "https://dummyjson.com/products";

export const useCreateProduct = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryclient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: ProductsFormFields) => post(`${baseUrl}/add`, data),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Product created");
      onSuccess?.();
    },
    onError: () => {
      toast.error("There has been an error creating the product");
    },
  });
  return mutation;
};
