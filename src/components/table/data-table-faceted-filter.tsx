import * as React from "react";
import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface DataTableFacetedFilterProps<TData, TValue, T> {
  column?: Column<TData, TValue>;
  title?: string;
  options: T[];
  sortBy: keyof T;
}

export function DataTableFacetedFilter<TData, TValue, T>({
  column,
  title,
  options,
  sortBy,
}: DataTableFacetedFilterProps<TData, TValue, T>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set<string>(column?.getFilterValue() as string[]);

  return (
    <div className="w-full">
      <Label className="uppercase">{title} by</Label>
      <div className="h-2" />
      <Popover>
        <Select>
          <PopoverTrigger asChild>
            <SelectTrigger>
              <SelectValue>
                {selectedValues?.size > 0 && (
                  <>
                    <Badge
                      variant="secondary"
                      className="px-1 font-normal rounded-sm lg:hidden"
                    >
                      {selectedValues.size}
                    </Badge>
                    <div className="hidden space-x-1 lg:flex">
                      {selectedValues.size > 2 ? (
                        <Badge
                          variant="secondary"
                          className="px-1 font-normal rounded-sm"
                        >
                          {selectedValues.size} selected
                        </Badge>
                      ) : (
                        options
                          .filter((option) =>
                            selectedValues.has(option[sortBy] as any)
                          )
                          .map((option) => (
                            <Badge
                              variant="secondary"
                              key={option[sortBy] as any}
                              className="px-1 font-normal rounded-sm"
                            >
                              {option[sortBy] as any}
                            </Badge>
                          ))
                      )}
                    </div>
                  </>
                )}
              </SelectValue>
            </SelectTrigger>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <SelectContent>
              <Command>
                <CommandInput placeholder={title} />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => {
                      const isSelected = selectedValues.has(
                        option[sortBy] as any
                      );
                      return (
                        <CommandItem
                          key={option[sortBy] as any}
                          onSelect={() => {
                            if (isSelected) {
                              selectedValues.delete(option[sortBy] as any);
                            } else {
                              selectedValues.add(option[sortBy] as any);
                            }
                            const filterValues = Array.from(selectedValues);
                            column?.setFilterValue(
                              filterValues.length ? filterValues : undefined
                            );
                          }}
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50 [&_svg]:invisible"
                            )}
                          >
                            <Check className={cn("h-4 w-4")} />
                          </div>

                          <span>{option[sortBy] as any}</span>
                          {facets?.get(option[sortBy]) && (
                            <span className="flex items-center justify-center w-4 h-4 ml-auto font-mono text-xs">
                              {facets.get(option[sortBy])}
                            </span>
                          )}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                  {selectedValues.size > 0 && (
                    <>
                      <CommandSeparator />
                      <CommandGroup>
                        <CommandItem
                          onSelect={() => column?.setFilterValue(undefined)}
                          className="justify-center text-center"
                        >
                          Clear filters
                        </CommandItem>
                      </CommandGroup>
                    </>
                  )}
                </CommandList>
              </Command>
            </SelectContent>
          </PopoverContent>
        </Select>
      </Popover>
    </div>
  );
}
