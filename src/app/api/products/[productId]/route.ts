import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const productId = params.productId;

    if (!productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await prismadb.product.findFirst({
      where: {
        id: productId,
      },
      include: {
        category: true,
        brand: true,
        images: true,
      },
    });

    if (!product) {
      return new NextResponse("product not found", { status: 405 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await prismadb.product.findFirst({
      where: {
        id: body.productId,
      },
    });

    if (!product) {
      return new NextResponse("product not found", { status: 405 });
    }

    const deletedProduct = await prismadb.product.delete({
      where: {
        id: body.productId,
      },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
