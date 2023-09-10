"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/models";

function ProductGallery({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images.length > 0 ? product.images[0].url : ""
  );

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };
  return (
    <div className="w-full p-3 ">
      <div className="flex flex-row items-center w-full py-3">
        <p className="mr-2 text-heading4-medium">Product </p>
        <p className="mr-2 text-heading4-medium"> Gallery</p>
        <div className="w-full h-[2px] bg-gray-100 dark:bg-dark-5" />
      </div>

      {product.images.length > 0 ? (
        <div>
          <div className="rounded-[20px]  ">
            <Image
              src={selectedImage}
              alt={product.name}
              width={0}
              height={0}
              sizes="100vw"
              loading="lazy"
              style={{
                width: "100%",
                height: "500px",
                objectFit: "fill",
                borderRadius: "20px",
              }}
            />
          </div>
          <div className="flex flex-row gap-3 py-3 rounded-md hover:cursor-pointer">
            {product.images.map((image, index) => (
              <Image
                width={0}
                height={0}
                sizes="100vw"
                loading="lazy"
                style={{
                  borderRadius: "10px",
                  objectFit: "fill",
                  width: "100px",
                  height: "100px",
                }}
                key={index}
                src={image.url}
                alt={product.name}
                onClick={() => handleImageClick(image.url)}
                className={selectedImage === image.url ? "selected" : ""}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p>No available image</p>
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
