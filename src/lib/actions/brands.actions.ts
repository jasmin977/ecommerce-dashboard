import apiRequestHandler from "@/config/apiRequestHandler";

interface BrandDTO {
  name: string;
  image: string;
}
export async function createBrand(brand: BrandDTO) {
  return apiRequestHandler({
    url: "/api/brands",
    method: "post",
    data: {
      brand,
    },
  });
}
export async function getBrands() {
  return apiRequestHandler({
    url: "/api/brands",
    method: "get",
  });
}
export async function deleteBrand(brandId: string) {
  return apiRequestHandler({
    url: `/api/brands/${brandId}`,
    method: "delete",
    data: { brandId: brandId },
  });
}
export async function getBrand(brandId: string) {
  return apiRequestHandler({
    url: `/api/brands/${brandId}`,
    method: "get",

    params: { brandId: brandId },
  });
}
