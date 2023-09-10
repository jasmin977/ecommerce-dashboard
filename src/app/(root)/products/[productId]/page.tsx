import { getProduct } from "@/lib/actions/products.actions";
import ProductGallery from "./components/product-gallery";
import ProductDescription from "./components/product-desc";
import ProductDetails from "./components/product-details";
import Link from "next/link";

interface Props {}

async function Page({ params }: { params: { productId: string } }) {
  if (!params.productId) return null;

  const product = (await getProduct(params.productId)).data;
  return (
    <div>
      <div className="flex justify-between w-full px-6 py-5 mb-5 bg-white hover_card">
        <h2 className=" text-heading3-bold">Product View</h2>

        <p>
          <Link className="text-blue hover:underline" href={"/"}>
            Home{" "}
          </Link>
          {"~"}
          <Link className="text-blue hover:underline" href={"/products"}>
            Products{" "}
          </Link>{" "}
          ~ Product View
        </p>
      </div>
      <div className="px-6 py-5 bg-white hover_card">
        <div className="flex flex-col mb-7 sm:flex-row">
          <ProductGallery product={product} />
          <ProductDetails product={product} />
        </div>
        <ProductDescription />
      </div>
    </div>
  );
}

export default Page;
