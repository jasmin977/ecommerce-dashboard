import apiRequestHandler from "@/config/apiRequestHandler";

interface CatgeoryDTO {
  name: string;
  image: string;
}
export async function createCategory(category: CatgeoryDTO) {
  return apiRequestHandler({
    url: "/api/categories",
    method: "post",
    data: {
      category,
    },
  });
}
export async function getCategories() {
  return apiRequestHandler({
    url: "/api/categories",
    method: "get",
  });
}
export async function deleteCategory(categoryId: string) {
  return apiRequestHandler({
    url: `/api/categories/${categoryId}`,
    method: "delete",
    data: { categoryId: categoryId },
  });
}
export async function getCategory(categoryId: string) {
  return apiRequestHandler({
    url: `/api/categories/${categoryId}`,
    method: "get",

    params: { categoryId: categoryId },
  });
}
