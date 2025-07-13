import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDownIcon, Loader2 } from "lucide-react";
import { ReactNode, useState } from "react";

type Option = {
  value: string | number;
  label?: string | ReactNode;
};

export type ComboboxProps = {
  options: Option[];
  label?: string;
  value?: string | number;
  description?: string | string[];
  isLoading?: boolean;
  hasNextPage?: boolean;
  ref?: (node?: Element | null | undefined) => void;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  notFoundText?: string;
  className?: string;
  popoverClassName?: string;
  disabled?: boolean;
};

export function Combobox({
  value,
  options,
  onChange,
  onSearch,
  placeholder = "",
  searchPlaceholder = "",
  isLoading,
  hasNextPage,
  ref,
  notFoundText = "لا توجد خيارات متاحة.",
  className = "w-[200px]",
  popoverClassName = "w-[200px] p-0",
  disabled = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const selectedOption = options.find(
    (option) => String(option.value) === String(value),
  );
  const filteredOptions = options.filter((option) =>
    option.label?.toString().toLowerCase().includes(searchValue.toLowerCase()),
  );

  const handleSelect = (option: Option) => {
    onChange?.(String(option.value));
    setOpen(false);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between flex-row-reverse", className)}
          disabled={disabled}
        >
          <span className="truncate text-right">
            {selectedOption?.label || placeholder}
          </span>
          {isLoading ? (
            <Loader2 className="m2-2 size-4 shrink-0 opacity-50 animate-spin" />
          ) : (
            <ChevronsUpDownIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={popoverClassName} align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onValueChange={handleSearch}
          />
          <CommandList>
            <CommandEmpty>{notFoundText}</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value.toString()}
                  onSelect={() => handleSelect(option)}
                  className="cursor-pointer"
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedOption?.value === option.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
              {(isLoading || hasNextPage) && (
                <CommandItem disabled ref={ref}>
                  <Loader2 className="mx-auto size-6 p-1 animate-spin" />
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default Combobox;
