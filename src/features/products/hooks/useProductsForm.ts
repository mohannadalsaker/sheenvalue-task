import { useDialogStore } from "@/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useGetCategories } from "../api/categories/useGetAllCategories";
import { useCreateProduct } from "../api/products/useCreateProduct";
import { useGetSingleProduct } from "../api/products/useGetSingleProduct";
import { useUpdateProduct } from "../api/products/useUpdateProduct";
import {
  ProductsFormSchema,
  type ProductsFormFields,
} from "../validation/ProductsSchema";

export const useProductsForm = () => {
  const { openEditId, isOpenAdd, changeOpenEdit, toggleOpenAdd } =
    useDialogStore();
  const {
    formState: { errors },
    control,
    reset,
    register,
    handleSubmit,
  } = useForm<ProductsFormFields>({
    resolver: zodResolver(ProductsFormSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      imageUrl: "",
      price: "0",
      brand: "",
      rating: "",
      availabilityStatus: "In Stock",
      stock: "0",
    },
  });

  const { data, isLoading } = useGetSingleProduct(openEditId!);
  const { data: categoryData, isLoading: isLoadingCategories } =
    useGetCategories();
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct({
    onSuccess: () => {
      reset();
      toggleOpenAdd();
    },
  });
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct({
    id: openEditId!,
    onSuccess: () => {
      reset();
      changeOpenEdit(null);
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        category: data.category,
        description: data.description,
        price: String(data.price),
        imageUrl: data.images[0],
        brand: data.brand,
        rating: String(data.rating),
        availabilityStatus: data.availabilityStatus,
        stock: String(data.stock),
      });
    }
  }, [data]);

  const onSubmit: SubmitHandler<ProductsFormFields> = (data) => {
    if (openEditId) {
      updateProduct(data);
    } else {
      createProduct(data);
    }
  };

  const sendForm = handleSubmit(onSubmit);

  const closeDialog = () => {
    if (isOpenAdd) toggleOpenAdd();
    else changeOpenEdit(null);
  };

  return {
    isloadingProduct: isLoading,
    errors,
    control,
    isCreating,
    isUpdating,
    categoryData,
    isLoadingCategories,
    register,
    sendForm,
    closeDialog,
  };
};
