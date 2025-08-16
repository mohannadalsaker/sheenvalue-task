import { SelectInput, TextAreaField, TextField } from "@/shared/components";
import { useProductsForm } from "../hooks/useProductsForm";
import PrimaryButton from "@/shared/components/PrimaryButton";
import { Loader } from "@/shared/ui";

const ProductForm = () => {
  const {
    sendForm,
    closeDialog,
    register,
    errors,
    categoryData,
    isloadingProduct,
    isCreating,
    isUpdating,
    isLoadingCategories,
  } = useProductsForm();

  if (isloadingProduct || isLoadingCategories) return <Loader />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendForm();
      }}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-5">
          <div className="flex gap-6">
            <TextField
              label="Title"
              placeholder="Enter title"
              error={errors.title?.message}
              isRequired
              {...register("title")}
            />
            <TextField
              label="Brand"
              placeholder="Enter brand"
              error={errors.brand?.message}
              {...register("brand")}
            />
          </div>
          <TextAreaField
            label="Description"
            placeholder="Enter description"
            error={errors.description?.message}
            isRequired
            {...register("description")}
          />
          <div className="flex gap-6">
            <SelectInput
              label="Category"
              isRequired
              error={errors.category?.message}
              options={categoryData!}
              placeholder="Select category"
              {...register("category")}
            />
            <SelectInput
              label="Availability Status"
              error={errors.stock?.message}
              options={[
                { label: "In Stock", value: "In Stock" },
                { label: "Low Stock", value: "Low Stock" },
              ]}
              placeholder="Select stock"
              {...register("availabilityStatus")}
            />
          </div>
          <div className="flex gap-6">
            <TextField
              label="Price"
              type="number"
              placeholder="Enter price"
              error={errors.price?.message}
              isRequired
              step={"any"}
              {...register("price")}
            />
            <TextField
              label="Stock"
              type="number"
              placeholder="Enter stock"
              error={errors.stock?.message}
              {...register("stock")}
            />
            <TextField
              label="Rating (0 - 5)"
              type="number"
              placeholder="Enter rating"
              step={"any"}
              error={errors.rating?.message}
              min={0}
              max={5}
              {...register("rating")}
            />
          </div>
          <TextField
            label="Product Image Url"
            placeholder="https://example.png"
            error={errors.imageUrl?.message}
            isRequired
            {...register("imageUrl")}
          />
        </div>
        <div className="flex justify-end gap-3">
          <PrimaryButton
            title="Cancel"
            type="button"
            className="bg-white bg-[url('')] text-black border border-secondary-text"
            onClick={closeDialog}
          />
          <PrimaryButton
            title="Add Product"
            type="submit"
            className="text-white"
            isLoading={isCreating || isUpdating}
          />
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
