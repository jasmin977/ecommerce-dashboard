import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("🚀 ~ file: route.ts:8 ~ POST ~ body:", body);

    const {
      product: {
        name,
        categoryId,
        brandId,
        price,
        images,

        stock,
        discount,
        expirationAt,
      },
    } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category is required", { status: 400 });
    }
    if (!brandId) {
      return new NextResponse("Brand is required", { status: 400 });
    }
    if (!images.length) {
      return new NextResponse("Images is required", { status: 400 });
    }

    const savedImages = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const data = image.replace(/^data:image\/\w+;base64,/, "");

      const imageData = Buffer.from(data, "base64");
      const imageFilename = `${Date.now()}_${name.replace(
        /\s+/g,
        "-"
      )}_${i}.jpg`;
      const path = `public/uploads/products/${imageFilename}`;
      const imagePath = `/uploads/products/${imageFilename}`;

      await writeFile(path, imageData);
      savedImages.push(imagePath);
    }

    const productData = {
      name: name,
      price: price,
      stock: stock,
      discount: null,
      expirationAt: null,
      category: { connect: { id: categoryId } },
      brand: { connect: { id: brandId } },
      images: {
        create: savedImages.map((imagePath) => ({ url: imagePath })),
      },
    };

    // Set discount and expirationAt if available, else set them to null
    if (typeof discount !== "undefined") {
      productData.discount = discount;
    } else {
      productData.discount = null;
    }

    if (typeof expirationAt !== "undefined") {
      productData.expirationAt = expirationAt;
    } else {
      productData.expirationAt = null;
    }

    const product = await prismadb.product.create({
      data: productData,
    });
    console.log("🚀 ~ file: route.ts:61 ~ POST ~ product:", product);
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function GET() {
  try {
    const products = await prismadb.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true, // Include the related category object
        brand: true, // Include the related brand object
        images: true,
        OrderItem: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
