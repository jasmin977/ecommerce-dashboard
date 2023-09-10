import React from "react";
import PropTypes from "prop-types";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CheckIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListSelectFieldProps<T> {
  form: any;
  items: T[];
  name: string;

  label: string;
}

function ListSelectField<T>({
  form,
  label,
  items,
  name,
}: ListSelectFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full gap-3">
          <FormLabel className="text-base-semibold text-black-2">
            {label}
          </FormLabel>
          <FormControl className="border border-gray-400 no-focus text-black-1">
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center justify-between w-full h-12 px-3 py-2 text-sm border rounded-md border-input dark:bg-dark-3 bg-light-1 hover:cursor-pointer ">
                  <span>
                    {field.value
                      ? (
                          items.find(
                            (item: any) => item.id === field.value
                          ) as any
                        )?.name
                      : "no item selected yet"}
                  </span>
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="flex w-full p-0 " align="start">
                <Command className="flex w-full ">
                  <CommandInput placeholder="Type or search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {items.map((item: any) => (
                        <CommandItem
                          key={item.id}
                          onSelect={() => {
                            field.onChange(item.id);
                          }}
                        >
                          <label className="flex flex-row items-center">
                            <div
                              className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                field.value === item.id
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible"
                              )}
                            >
                              <CheckIcon className={cn("h-4 w-4")} />
                            </div>

                            {item.name}
                          </label>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

ListSelectField.propTypes = {
  form: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListSelectField;
