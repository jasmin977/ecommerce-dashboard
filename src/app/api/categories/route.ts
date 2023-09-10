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
    const path = `public/uploads/categories/${imageFilename}`;
    const imagePath = `/uploads/categories/${imageFilename}`;

    await writeFile(path, imageData);

    const newCategory = await prismadb.category.create({
      data: {
        name: name,
        image: {
          create: { url: imagePath },
        },
      },
    });

    return NextResponse.json(newCategory);
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const categories = await prismadb.category.findMany({
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

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
