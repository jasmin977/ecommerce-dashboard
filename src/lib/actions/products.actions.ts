import apiRequestHandler from "@/config/apiRequestHandler";

interface PorductDTO {
  name: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  categoryId: string;
  brandId: string;
  images: string[];
}
export async function createProduct(product: PorductDTO) {
  return apiRequestHandler({
    url: "/api/products",
    method: "post",
    data: {
      product,
    },
  });
}
export async function getProducts() {
  return apiRequestHandler({
    url: "/api/products",
    method: "get",
  });
}
export async function deleteProduct(productId: string) {
  return apiRequestHandler({
    url: `/api/products/${productId}`,
    method: "delete",
    data: { productId: productId },
  });
}
export async function getProduct(productId: string) {
  return apiRequestHandler({
    url: `/api/products/${productId}`,
    method: "get",

    params: { productId: productId },
  });
}
