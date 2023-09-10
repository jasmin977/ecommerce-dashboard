import prismadb from "@/lib/prismadb";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, image } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!image) {
      return new NextResponse("Image is required", { status: 400 });
    }

    const data = image.replace(/^data:image\/\w+;base64,/, "");

    const imageData = Buffer.from(data, "base64");
    const imageFilename = `${Date.now()}_${name.replace(/\s+/g, "-")}_ .jpg`;
    const path = `public/uploads/brands/${imageFilename}`;
    const imagePath = `/uploads/brands/${imageFilename}`;

    await writeFile(path, imageData);

    const newBrand = await prismadb.category.create({
      data: {
        name: name,
        image: {
          create: { url: imagePath },
        },
      },
    });
    return NextResponse.json(newBrand);
  } catch (error) {
    console.log("[BRANDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const brands = await prismadb.brand.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        image: true,
        products: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });

    return NextResponse.json(brands);
  } catch (error) {
    console.log("[BRANDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
