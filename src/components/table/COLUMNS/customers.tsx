"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Customer } from "@/models";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ban, Eye, Pencil } from "lucide-react";
import DeleteDialog from "@/components/modals/DeleteProduct";
import { DataTableColumnHeader } from "../data-table-column-header";

import {
  dateFormat,
  formatDateToYYYYMMDD,
  getCustomerColorByStatus,
  hexToRgba,
} from "@/lib/utils";
import Image from "next/image";
import { deleteCustomer } from "@/lib/actions/customers.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const customerscolumns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center gap-2 pr-2">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
        <span className="font-medium truncate ">UID</span>
      </div>
    ),
    cell: ({ row }) => {
      const pageIndex = row.index + 1;
      return (
        <div className="flex items-center gap-2 pr-2">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
          <span className="font-medium truncate ">#{pageIndex}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "lastname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NAME" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={""} alt="customer" />
            <AvatarFallback>
              {row.original.fisrtname[0]}
              {row.original.lastname[0]}
            </AvatarFallback>
          </Avatar>
          {row.getValue("lastname")} {row.original.fisrtname}
        </div>
      );
    },

    enableHiding: false,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PHONE" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="font-medium truncate ">
            {row.original.phoneNumber}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ADDRESS" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="font-medium truncate ">{row.original.address}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "psw",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PASSWORD" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="font-medium truncate ">{row.original.password}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STATUS" />
    ),
    cell: ({ row }) => {
      const color = getCustomerColorByStatus(row.getValue("status"));

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
      <DataTableColumnHeader column={column} title="CREATED AT" />
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
    header: () => <div className="text-center">ACTIONS</div>,
    cell: ({ row }) => {
      const customerId = row.original.id;
      return (
        <div className="flex justify-center gap-2 ">
          <Link href={`/customers/${customerId}`}>
            <Button variant="secondary" className="w-8 h-8 p-0">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <Button variant="default" size={"icon"} className="w-8 h-8 p-0">
            <Pencil className="w-4 h-4" />
          </Button>
          <DeleteDialog
            icon={<Ban className="w-4 h-4" />}
            deleteFunc={() => deleteCustomer(customerId)}
          />
        </div>
      );
    },
  },
];
