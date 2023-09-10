import apiRequestHandler from "@/config/apiRequestHandler";

export async function getCustomers() {
  return apiRequestHandler({
    url: "/api/customers",
    method: "get",
  });
}
export async function deleteCustomer(customerId: string) {
  return apiRequestHandler({
    url: `/api/customers/${customerId}`,
    method: "delete",
    data: { customerId: customerId },
  });
}
export async function getCustomer(customerId: string) {
  return apiRequestHandler({
    url: `/api/customers/${customerId}`,
    method: "get",

    params: { customerId: customerId },
  });
}
