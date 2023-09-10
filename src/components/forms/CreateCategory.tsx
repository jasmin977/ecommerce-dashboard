"use client";

import * as z from "zod";
import axios from "axios";
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
import { CategoryValidation } from "@/lib/validations/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

import { Input } from "../ui/input";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Dropzone from "./components/Dropzone";
import { createCategory } from "@/lib/actions/categories.actions";
import { toBase64 } from "@/lib/utils";

function CreateCategory() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const form = useForm<z.infer<typeof CategoryValidation>>({
    resolver: zodResolver(CategoryValidation),
    defaultValues: {
      name: "",

      image: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof CategoryValidation>) => {
    try {
      setLoading(true);
      if (!files.length) {
        return;
      }

      const base64 = await toBase64(files[0] as File);
      const updatedImage = base64 as string;

      values.image = updatedImage;

      await createCategory(values);
      router.refresh();
      router.push("/categories");
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
        <div className="flex flex-row w-full gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-3">
                <FormLabel className="text-base-semibold text-black-2">
                  Name
                </FormLabel>
                <FormControl className="border border-gray-400 no-focus bg-light-1 text-black-1">
                  <Input placeholder="name of the brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="parent"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-3">
                <FormLabel className="text-base-semibold text-black-2">
                  Parent Category
                </FormLabel>
                <FormControl className="border border-gray-400 no-focus bg-light-1 text-black-1">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="select .." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        <Dropzone
          files={files}
          setFiles={setFiles}
          className="flex flex-col w-full p-16 mt-10 border border-dashed rounded-md dark:bg-dark-2 bg-light-2 border-neutral-200"
        />
        <div>
          <Button type="submit" className="bg-blue" loading={isLoading}>
            Save Category
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateCategory;
