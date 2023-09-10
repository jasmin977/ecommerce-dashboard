"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "../data-table-view-options";

import { DataTableFacetedFilter } from "../data-table-faceted-filter";
import { ChevronDown, Plus, Search, X } from "lucide-react";
import { Brand, Category } from "@/models";
import Link from "next/link";

import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

export function DataTableToolbar<TData>({ brands, categories, ...props }: any) {
  const table = props.table as Table<TData>;

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="items-end w-full ">
      <div className="flex items-center justify-between py-4">
        <Input
          icon={<Search />}
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="  w-[150px] lg:w-[250px]"
        />

        <Link href="/categories/new">
          <Button className="shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </Link>
      </div>
      <div className="flex justify-end w-full ">
        {isFiltered && (
          <Button
            variant="destructive"
            onClick={() => table.resetColumnFilters()}
          >
            <X className="w-4 h-4 mr-2" />
            Reset
          </Button>
        )}
      </div>
      <div className="flex gap-3">
        <div className="w-full ">
          <Label>SHOW BY</Label>
          <div className="h-2"></div>

          <Popover>
            <PopoverTrigger className="w-full ">
              <div className="flex items-center justify-between w-full h-12 px-3 py-2 text-sm border rounded-md border-input bg-background hover:cursor-pointer ">
                <span>{table.getState().pagination.pageSize}</span>
                <ChevronDown className="w-4 h-4 opacity-50" />
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="relative w-full overflow-hidden "
            >
              {[5, 10].map((pageSize) => (
                <div
                  className="rounded-sm py:2 hover:cursor-pointer hover:bg-slate-100"
                  key={pageSize}
                  onClick={() => {
                    table.setPageSize(pageSize);
                  }}
                >
                  {pageSize}
                </div>
              ))}
            </PopoverContent>
          </Popover>
          {/*     <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
        </div>

        {/*    {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="Categories"
            sortBy="name"
            options={categories}
          />
        )}
        {table.getColumn("category") && (
          <DataTableFacetedFilter
            sortBy="image"
            column={table.getColumn("brand")}
            title="Brands"
            options={categories}
          />
        )} */}
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
}
