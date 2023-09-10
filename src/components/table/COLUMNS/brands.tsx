"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Brand } from "@/models";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import DeleteDialog from "@/components/modals/DeleteProduct";
import { DataTableColumnHeader } from "../data-table-column-header";
import { dateFormat } from "@/lib/utils";
import Image from "next/image";
import { deleteBrand } from "@/lib/actions/brands.actions";

export const brandscolumns: ColumnDef<Brand>[] = [
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
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
      <div>
        <Image
          alt="d"
          width={50}
          height={50}
          src={row.original.image?.url as string}
        />{" "}
      </div>
    ),
  },
  {
    accessorKey: "products",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Products" />
    ),
    cell: ({ row }) => (
      <div className="p-1 hover:cursor-pointer">
        {row.original.products.length}{" "}
      </div>
    ),

    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.original.products.length);
    },
  },

  {
    accessorKey: "published",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Published" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium ">{dateFormat(row.original.createdAt)}</div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.original.createdAt);
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const brandId = row.original.id;
      return (
        <div className="flex justify-center gap-2 ">
          <Link href={`/brands/${brandId}`}>
            <Button variant="secondary" className="w-8 h-8 p-0">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>

          <Button variant="default" size={"icon"} className="w-8 h-8 p-0">
            <Pencil className="w-4 h-4" />
          </Button>
          <DeleteDialog deleteFunc={() => deleteBrand(brandId)} />
        </div>
      );
    },
  },
];
