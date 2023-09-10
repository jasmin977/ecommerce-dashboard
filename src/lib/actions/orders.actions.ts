import apiRequestHandler from "@/config/apiRequestHandler";

export async function getOrders() {
  return apiRequestHandler({
    url: "/api/orders",
    method: "get",
  });
}
export async function deleteOrder(orderId: number) {
  return apiRequestHandler({
    url: `/api/orders/${orderId}`,
    method: "delete",
    data: { orderId: orderId },
  });
}
export async function getOrder(orderId: number) {
  return apiRequestHandler({
    url: `/api/orders/${orderId}`,
    method: "get",

    params: { orderId: orderId },
  });
}
