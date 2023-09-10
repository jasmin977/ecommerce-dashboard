"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Order, Product } from "@/models";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import DeleteDialog from "@/components/modals/DeleteProduct";
import { DataTableColumnHeader } from "../data-table-column-header";
import { deleteOrder } from "@/lib/actions/orders.actions";
import {
  dateFormat,
  formatDateToYYYYMMDD,
  getColorByStatus,
  hexToRgba,
} from "@/lib/utils";
import Image from "next/image";

export const orderscolumns: ColumnDef<Order>[] = [
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
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Image
            alt="customer"
            width={40}
            height={40}
            src={row.original.customer.image?.url as string}
            style={{
              borderRadius: "100px",
            }}
          />{" "}
          {row.original.customer.fisrtname}
        </div>
      );
    },

    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.original.customer.fisrtname);
    },
  },
  {
    accessorKey: "products",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Products" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="font-medium truncate ">
            {row.original.orderItems.length} products
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.original.orderItems.length);
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <div className="font-medium ">{row.original.totalOrderPrice}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.original.totalOrderPrice);
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STATUS" />
    ),
    cell: ({ row }) => {
      const color = getColorByStatus(row.getValue("status"));

      return (
        <div>
          <span
            className="p-1 font-medium rounded-md "
            style={{ backgroundColor: hexToRgba(color, 0.3), color: color }}
          >
            {row.getValue("status")}{" "}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.original.status);
    },
  },
  {
    accessorKey: "created",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Published" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium ">
          <div className="font-medium ">
            {dateFormat(row.original.createdAt)}
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const formattedDate = formatDateToYYYYMMDD(
        new Date(row.original.createdAt)
      );
      return value.includes(formattedDate);
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const orderId = row.original.id;
      return (
        <div className="flex justify-center gap-2 ">
          <Link href={`/orders/${orderId}`}>
            <Button variant="secondary" className="w-8 h-8 p-0">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>

          <DeleteDialog deleteFunc={() => deleteOrder(orderId)} />
        </div>
      );
    },
  },
];
