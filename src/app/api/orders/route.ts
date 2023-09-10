import prismadb from "@/lib/prismadb";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const orders = await prismadb.order.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        customer: {
          include: {
            image: true,
          },
        },
      },
    });

    // Calculate the total price for each order
    const ordersWithTotalPrice = orders.map((order) => {
      const totalOrderPrice = order.orderItems.reduce((total, item) => {
        const itemPrice = item.product.price.toNumber(); // Convert Decimal to number
        // Assuming each OrderItem has a 'quantity' field
        return total + itemPrice * 2;
      }, 0);

      return { ...order, totalOrderPrice };
    });

    return NextResponse.json(ordersWithTotalPrice);
  } catch (error) {
    console.log("[ORDERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
