import CreateProduct from "@/components/forms/CreateProduct";
import { getBrands } from "@/lib/actions/brands.actions";
import { getCategories } from "@/lib/actions/categories.actions";
import Link from "next/link";

async function Page({}) {
  const brands = (await getBrands()).data;
  const categories = (await getCategories()).data;

  return (
    <div>
      <div className="flex justify-between w-full px-6 py-5 mb-5 bg-white hover_card">
        <h2 className=" text-heading3-bold">Product Upload</h2>

        <p>
          <Link className="text-blue hover:underline" href={"/"}>
            Home{" "}
          </Link>{" "}
          ~ Product ~ Upload
        </p>
      </div>
      <CreateProduct brands={brands} categories={categories} />
    </div>
  );
}

export default Page;
