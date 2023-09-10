import { Product } from "@/models";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { dateFormat } from "@/lib/utils";
import {
  Boxes,
  DollarSign,
  ShieldCheck,
  ShoppingCart,
  Store,
} from "lucide-react";

function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="w-full p-3 ">
      <div className="flex items-center py-3 ">
        <p className="mr-2 text-heading4-medium">Product </p>
        <p className="mr-2 text-heading4-medium">Details </p>
        <div className="w-full h-[2px] bg-gray-100 dark:bg-dark-5" />
      </div>
      <div className="flex flex-col gap-5 ">
        <p className="text-heading3-bold">
          Formal suits for men wedding slim fit 3 piece dress business party
          jacket
        </p>
        <div className="flex flex-row gap-4">
          <div className="flex flex-row w-[150px] items-center gap-2">
            <Store />
            <h5 className="text-heading4-medium">Brand</h5>
          </div>
          <span>:</span>
          <p className="text-body-medium">{product.brand?.name}</p>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-row w-[150px] items-center gap-2">
            <Boxes />
            <h5 className="text-heading4-medium">Category</h5>
          </div>
          <span>:</span>
          <p className="text-body-medium">{product.category?.name}</p>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-row w-[150px] items-center gap-2  ">
            <DollarSign />
            <h5 className="text-heading4-medium">Price</h5>
          </div>
          <span className="text-body-normal">:</span>
          <div className="flex gap-1">
            <p className="text-body-medium">{product.price} DT</p>
            <p className="text-red-600 line-through text-body-medium ">
              {product.price} DT
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-row w-[150px] items-center gap-2">
            <ShoppingCart />
            <h5 className="text-heading4-medium">Stock</h5>
          </div>
          <span>:</span>
          <p className="text-body-medium">{product.stock} piece</p>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-row w-[150px] items-center gap-2">
            <ShieldCheck />
            <h5 className="text-heading4-medium">Published</h5>
          </div>
          <span>:</span>
          <p className="text-body-medium">{dateFormat(product.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
