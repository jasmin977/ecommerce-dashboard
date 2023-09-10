"use client";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ProductValidation } from "@/lib/validations/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useState } from "react";
import { Brand, Category } from "@/models";
import ListSelectField from "../shared/ListSelectField";
import Dropzone from "./components/Dropzone";
import { createProduct } from "@/lib/actions/products.actions";
import { toBase64 } from "@/lib/utils";

interface cretaeProductProps {
  categories: Category[];
  brands: Brand[];
}
function CreateProduct({ brands, categories }: cretaeProductProps) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const pathname = usePathname();

  const [files, setFiles] = useState([]);

  const form = useForm<z.infer<typeof ProductValidation>>({
    resolver: zodResolver(ProductValidation),

    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      brandId: "",
      price: 0,
      stock: 0,
      discount: 0,
      images: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductValidation>) => {
    try {
      setLoading(true);
      if (!files.length) {
        return;
      }

      const updatedImages = [];
      for (const file of files) {
        const base64 = await toBase64(file as File);
        updatedImages.push(base64 as string);
      }
      values.images = updatedImages;

      await createProduct(values);
      router.refresh();
      router.push("/products");
    } catch (error) {
      console.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-10 p-6 hover_card "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="text-base-semibold text-black-2">
                Name
              </FormLabel>
              <FormControl className="border border-gray-400 no-focus bg-light-1 text-black-1">
                <Input placeholder="name of the product" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="text-base-semibold text-black-2">
                Description
              </FormLabel>
              <FormControl className="border border-gray-400 no-focus bg-light-1 text-black-1">
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-8">
          <ListSelectField<Category>
            name={"categoryId"}
            items={categories}
            form={form}
            label="Category"
          />

          <ListSelectField<Brand>
            name={"brandId"}
            items={brands}
            form={form}
            label="Brand"
          />
        </div>
        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-3">
                <FormLabel className="text-base-semibold text-black-2">
                  REGULAR PRICE
                </FormLabel>
                <FormControl className="border border-gray-400 no-focus bg-light-1 text-black-1">
                  <Input
                    type="number"
                    placeholder="Type here.."
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-3">
                <FormLabel className="text-base-semibold text-black-2">
                  DISCOUNT PRICE
                </FormLabel>
                <FormControl className="border border-gray-400 no-focus bg-light-1 text-black-1">
                  <Input
                    type="number"
                    placeholder="Type here.."
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="text-base-semibold text-black-2">
                STOCK
              </FormLabel>
              <FormControl className="border border-gray-400 no-focus bg-light-1 text-black-1">
                <Input
                  type="number"
                  placeholder="Type here.."
                  {...field}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Dropzone
          files={files}
          setFiles={setFiles}
          className="flex flex-col w-full p-16 mt-10 border border-dashed rounded-md dark:bg-dark-2 bg-light-2 border-neutral-200"
        />

        <div>
          <Button type="submit" className="bg-blue" loading={isLoading}>
            Save Product
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateProduct;
