import { Dialog, MainTable } from "@/shared/components";
import FeatureHeader from "@/shared/components/FeatureHeader";
import { Loader } from "@/shared/ui";
import { useDialogStore } from "@/stores";
import { useProductsTable } from "../hooks/useProductsTable";
import type { ProductTableRow } from "../types";
import ProductDeleteDialog from "./ProductDeleteDialog";
import ProductForm from "./ProductForm";

const ProductsDataPage = () => {
  const {
    isOpenAdd,
    openEditId,
    openDeleteId,
    changeOpenDelete,
    toggleOpenAdd,
    changeOpenEdit,
  } = useDialogStore();
  const {
    columns,
    handleSearch,
    totalProducts,
    rows,
    tableActions,
    tableRef,
    handleScroll,
    isFetchingMore,
  } = useProductsTable();

  return (
    <div className="flex flex-col gap-4 h-full w-full overflow-hidden">
      <Dialog
        isOpen={isOpenAdd || Boolean(openEditId)}
        title={isOpenAdd ? "Add Product" : "Edit Product"}
        onClose={() => {
          if (isOpenAdd) toggleOpenAdd();
          else changeOpenEdit(null);
        }}
      >
        <ProductForm />
      </Dialog>
      <Dialog
        isOpen={Boolean(openDeleteId)}
        title={"Delete Product"}
        subTitle="The action cannot be undone, the product will be permenantly removed from your inventory."
        onClose={() => {
          changeOpenDelete(null);
        }}
      >
        <ProductDeleteDialog />
      </Dialog>
      <FeatureHeader
        buttonTitle="Add Product"
        onClickAdd={() => {
          toggleOpenAdd();
        }}
        onSearch={(e) => handleSearch(e.target.value)}
        title="Products"
        description={`Manage your products inventory (${
          totalProducts || 0
        } products)`}
        hasMultiView={false}
      />
      {false ? (
        <Loader />
      ) : (
        <div
          className="w-full h-full overflow-auto"
          onScroll={handleScroll}
          ref={tableRef}
        >
          <MainTable<ProductTableRow>
            columns={columns}
            data={rows!}
            actions={tableActions}
          />
          {isFetchingMore && (
            <div className="flex justify-center p-4">
              <Loader />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsDataPage;
