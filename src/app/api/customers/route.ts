import prismadb from "@/lib/prismadb";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const customers = await prismadb.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orders: {
          include: {
            orderItems: {
              include: {
                product: true,
              },
            },
          },
        },
        image: true,
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.log("[CUSTOMERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
