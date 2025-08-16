import { del } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const baseUrl = "https://dummyjson.com/products";

export const useDeleteProduct = ({
  id,
  onSuccess,
}: {
  id: number;
  onSuccess?: () => void;
}) => {
  const queryclient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => del<object>(`${baseUrl}/${id}`, {}),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted");
      onSuccess?.();
    },
    onError: () => {
      toast.error("There has been an error deleting the product");
    },
  });
  return mutation;
};
