"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/models";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import DeleteDialog from "@/components/modals/DeleteProduct";
import { deleteProduct } from "@/lib/actions/products.actions";
import { DataTableColumnHeader } from "../data-table-column-header";

export const productscolumns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,

    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="font-medium truncate ">
            {row.original.category?.name}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.original.category?.name);
    },
  },
  {
    accessorKey: "brand",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="brand" />
    ),
    cell: ({ row }) => <div>{row.original.brand?.name}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.original.brand?.name);
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="price" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium ">{row.getValue("price")} DT</div>;
    },
  },
  {
    accessorKey: "published",
    header: () => <div className="text-center">Published</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium ">
          <Switch checked={row.getValue("published")} />
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const productId = row.original.id;
      return (
        <div className="flex justify-center gap-2 ">
          <Link href={`/products/${productId}`}>
            <Button variant="secondary" className="w-8 h-8 p-0">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>

          <Button variant="default" size={"icon"} className="w-8 h-8 p-0">
            <Pencil className="w-4 h-4" />
          </Button>
          <DeleteDialog deleteFunc={() => deleteProduct(productId)} />
        </div>
      );
    },
  },
];
