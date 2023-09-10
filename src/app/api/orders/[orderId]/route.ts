import prismadb from "@/lib/prismadb";
import { Order } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
interface OrderWithTotal extends Order {
  totalOrderPrice: number;
}
export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const orderId = parseInt(params.orderId, 10);

    if (isNaN(orderId)) {
      return new NextResponse("Invalid Order id", { status: 400 });
    }

    const order = await prismadb.order.findFirst({
      where: {
        id: orderId,
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

    if (!order) {
      return new NextResponse("order not found", { status: 405 });
    }

    const totalOrderPrice = order.orderItems.reduce((total, item) => {
      const itemPrice = item.product.price.toNumber();

      return total + itemPrice * 2;
    }, 0);

    const orderWithTotal: OrderWithTotal = { ...order, totalOrderPrice };

    return NextResponse.json(orderWithTotal);
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.orderId) {
      return new NextResponse("Order id is required", { status: 400 });
    }

    const order = await prismadb.order.findFirst({
      where: {
        id: body.orderId,
      },
    });

    if (!order) {
      return new NextResponse("order not found", { status: 405 });
    }

    const deletedOrder = await prismadb.order.delete({
      where: {
        id: body.orderId,
      },
    });

    return NextResponse.json(deletedOrder);
  } catch (error) {
    console.log("[ORDER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
