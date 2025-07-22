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
import { ReactNode, useEffect, useImperativeHandle, useState } from "react";
import {
  Control,
  Controller,
  FieldError,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

export type Option = {
  value: string | number;
  label?: string | ReactNode;
};

export type ComboboxProps = {
  options: Option[];
  label?: string;
  name: string;
  control: Control<any>;
  error?: string | FieldError;
  description?: string | string[];
  isLoading?: boolean;
  hasNextPage?: boolean;
  ref?: (node?: Element | null | undefined) => void;
  setValue: UseFormSetValue<any>;
  selectedOption?: Option;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  notFoundText?: string;
  className?: string;
  popoverClassName?: string;
  disabled?: boolean;
  imperativeRef?: React.Ref<{ setSelectedOption: (option: Option) => void }>;
};

export function ComboboxField({
  options = [],
  label,
  name,
  control,
  error,
  description,
  isLoading,
  hasNextPage,
  ref,
  setValue,
  selectedOption,
  onChange,
  onSearch,
  placeholder = "",
  searchPlaceholder = "",
  notFoundText = "لا توجد خيارات متاحة.",
  className,
  popoverClassName = "p-0",
  disabled = false,
  imperativeRef,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [internalSelectedOption, setInternalSelectedOption] = useState<
    Option | undefined
  >(selectedOption);
  useImperativeHandle(imperativeRef, () => ({
    setSelectedOption: (option: Option) => {
      setInternalSelectedOption(option);
    },
  }));

  const value = useWatch({
    control,
    name,
  });

  const filteredOptions = searchValue
    ? options.filter((option) =>
        option.label
          ?.toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()),
      )
    : options;

  const handleSelect = (option: Option) => {
    setInternalSelectedOption(option);
    setValue(name, option.value);
    onChange?.(String(option.value));
    setOpen(false);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  useEffect(() => {
    const option = options.find((option) => option.value === value);
    if (!option) return;
    setInternalSelectedOption(option);
  }, [value, options]);

  return (
    <div className="col-span-1 w-full flex flex-col gap-1 relative">
      {label && (
        <label
          htmlFor={name}
          className="self-start text-xl mb-2 text-[#1A1A1A]"
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={() => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  "justify-between w-full py-[1.40rem] text-lg border border-[#CCCCCC] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#DD7E1F]",
                  className,
                )}
                disabled={disabled}
              >
                <span className="truncate text-left">
                  {internalSelectedOption?.label || placeholder}
                </span>
                {isLoading ? (
                  <Loader2 className="m2-2 size-4 shrink-0 opacity-50 animate-spin" />
                ) : (
                  <ChevronsUpDownIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className={cn("w-full", popoverClassName)}
              dir="rtl"
              align="start"
            >
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
                            internalSelectedOption?.value === option.value
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
        )}
      />
      {error && (
        <span className="text-red-500 mt-1 text-sm">
          {typeof error === "string" ? error : error.message}
        </span>
      )}
      {description && (
        <div className="text-[#999] font-Rubik text-sm">
          {Array.isArray(description) ? (
            <ul className="list-disc list-inside">
              {description.map((desc, index) => (
                <li key={index} className="text-[#666666]">
                  {desc}
                </li>
              ))}
            </ul>
          ) : (
            <span>{description}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default ComboboxField;
