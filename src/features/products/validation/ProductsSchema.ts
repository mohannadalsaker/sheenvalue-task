import { z } from "zod";

export const ProductsFormSchema = z.object({
  title: z.string().min(1, "This field is required"),
  description: z.string().min(1, "This field is required"),
  brand: z.string(),
  availabilityStatus: z.enum(["In Stock", "Low Stock"]),
  price: z.string().min(1, "This field is required"),
  stock: z.string(),
  rating: z.string(),
  category: z.string().min(1, "This field is required"),
  imageUrl: z
    .string()
    .min(1, "This field is required")
    .startsWith("http", "Please enter a valid url"),
});

export type ProductsFormFields = z.infer<typeof ProductsFormSchema>;
