"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "../data-table-view-options";

import { DataTableFacetedFilter } from "../data-table-faceted-filter";
import { ChevronDown, Plus, Search, X } from "lucide-react";

import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { CustomerStatus, OrderStatus } from "@/constants";
import { DemoDatePicker } from "@/components/cards/date-picker";

export function DataTableToolbar<TData>({ ...props }: any) {
  const table = props.table as Table<TData>;

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="items-end w-full ">
      <div className="flex items-center justify-between py-4">
        <Input
          icon={<Search />}
          placeholder="Filter names..."
          value={
            (table.getColumn("lastname")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) => {
            table.getColumn("lastname")?.setFilterValue(event.target.value);
          }}
          className="  w-[150px] lg:w-[250px]"
        />
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
        </div>
        <DataTableFacetedFilter
          column={table.getColumn("status")}
          title="status"
          sortBy={"status"}
          options={CustomerStatus}
        />
        <div className="w-full ">
          <Label>ISSUED BY </Label>
          <div className="h-2"></div>

          <Input
            type="date"
            value={
              (table.getColumn("created")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) => {
              table.getColumn("created")?.setFilterValue(event.target.value);
            }}
            className="w-full"
          />
        </div>
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
}
