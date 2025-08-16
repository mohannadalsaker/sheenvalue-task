import { useDialogStore } from "@/stores";
import { useGetSingleProduct } from "../api/products/useGetSingleProduct";
import { DeleteDialogCard, Loader } from "@/shared/ui";
import PrimaryButton from "@/shared/components/PrimaryButton";
import { useDeleteProduct } from "../api/products/useDeleteProduct";

const ProductDeleteDialog = () => {
  const { openDeleteId, changeOpenDelete } = useDialogStore();
  const { data, isLoading } = useGetSingleProduct(openDeleteId!);
  const { mutate: deleteProduct, isPending } = useDeleteProduct({
    id: openDeleteId!,
    onSuccess: () => {
      changeOpenDelete(null);
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-6">
      <DeleteDialogCard name={data!.title} />
      <div className="flex justify-end gap-3">
        <PrimaryButton
          title="Cancel"
          className="bg-white text-black bg-[url('')] border border-secondary-text"
          onClick={() => changeOpenDelete(null)}
        />
        <PrimaryButton
          title="Delete Product"
          className="text-white bg-[url('')] bg-red-500"
          isLoading={isPending}
          onClick={() => deleteProduct()}
        />
      </div>
    </div>
  );
};

export default ProductDeleteDialog;
