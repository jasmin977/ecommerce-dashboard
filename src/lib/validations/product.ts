import * as z from "zod";

export const ProductValidation = z.object({
  name: z.string().nonempty().min(2, { message: "Minimum 2 characters." }),
  description: z.string(),
  categoryId: z.string(),
  brandId: z.string(),
  price: z.number().nonnegative(),
  discount: z.number().nonnegative(),
  stock: z.number().nonnegative(),
  images: z.array(z.string()), // array of strings
});
export const CategoryValidation = z.object({
  name: z.string().nonempty().min(1, { message: "Minimum 2 characters." }),
  //parent: z.string().nonempty().min(1, { message: "Minimum 2 characters." }),
  image: z.string(),
});
export const BrandValidation = z.object({
  name: z.string().nonempty().min(1, { message: "Minimum 2 characters." }),
  image: z.string(),
});
