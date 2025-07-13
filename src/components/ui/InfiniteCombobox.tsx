"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2, Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
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

export interface InfiniteComboboxOption<T = any> {
  value: string | number;
  label: string;
  raw?: T;
}

interface QueryResult<T> {
  items: T[];
  hasMore: boolean;
  nextPage?: number;
}

interface InfiniteComboboxProps<T extends FieldValues, TData> {
  name: Path<T>;
  control?: Control<T>;
  queryKey?: string[];
  queryFn?: (page: number, search: string) => Promise<QueryResult<TData>>;
  getOptionLabel: (item: TData) => string;
  getOptionValue: (item: TData) => string | number;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  description?: string;
  className?: string;
  onSelect?: (value: TData) => void;
  // New props for external data and ref
  data?: TData[];
  loadMoreRef?:
    | React.RefObject<HTMLDivElement>
    | ((node: HTMLDivElement | null) => void);
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
  onLoadMore?: () => void;
}

export function InfiniteCombobox<T extends FieldValues, TData>({
  name,
  control,
  queryKey = [],
  queryFn,
  getOptionLabel,
  getOptionValue,
  label,
  placeholder = "Search...",
  error,
  disabled = false,
  description,
  className,
  onSelect,
  data: externalData,
  loadMoreRef: externalLoadMoreRef,
  hasNextPage: externalHasNextPage,
  isFetchingNextPage: externalIsFetchingNextPage,
  isLoading: externalIsLoading,
  onLoadMore: externalOnLoadMore,
}: InfiniteComboboxProps<T, TData>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] =
    useState<InfiniteComboboxOption<TData> | null>(null);
  const defaultLoadMoreRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = externalLoadMoreRef || defaultLoadMoreRef;

  // Use external data if provided, otherwise use the query
  const {
    data: queryData,
    fetchNextPage,
    hasNextPage: hasNextPageFromQuery,
    isFetchingNextPage: isFetchingNextPageFromQuery,
    isLoading: isLoadingFromQuery,
  } = useInfiniteQuery<QueryResult<TData>, Error>({
    queryKey: [...queryKey, search],
    queryFn: (context) => {
      if (!queryFn) return Promise.resolve({ items: [], hasMore: false });
      const pageParam =
        typeof context.pageParam === "number" ? context.pageParam : 1;
      return queryFn(pageParam, search);
    },
    enabled: !externalData, // Only enable the query if external data is not provided
    initialPageParam: 1,
    getNextPageParam: (lastPage: QueryResult<TData>) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Use props if provided, otherwise use the query result
  const isLoading = externalIsLoading ?? isLoadingFromQuery;
  const isFetchingNextPage =
    externalIsFetchingNextPage ?? isFetchingNextPageFromQuery;
  const hasNextPage = externalHasNextPage ?? hasNextPageFromQuery ?? false;

  // Memoize the options to prevent unnecessary recalculations
  const options = React.useMemo(() => {
    if (externalData) {
      return externalData.map((item: TData) => ({
        value: getOptionValue(item),
        label: getOptionLabel(item),
        raw: item,
      }));
    }

    return (queryData?.pages?.flatMap((page: QueryResult<TData>) =>
      page.items.map((item: TData) => ({
        value: getOptionValue(item),
        label: getOptionLabel(item),
        raw: item,
      })),
    ) || []) as InfiniteComboboxOption<TData>[];
  }, [externalData, queryData, getOptionLabel, getOptionValue]);

  // Set up the ref callback for the load more trigger
  const setLoadMoreTriggerRef = (node: HTMLDivElement | null) => {
    if (typeof loadMoreRef === "function") {
      loadMoreRef(node);
    } else if (loadMoreRef && "current" in loadMoreRef) {
      (loadMoreRef as React.MutableRefObject<HTMLDivElement | null>).current =
        node;
    }

    // Also set the default ref for internal use
    if (node) {
      defaultLoadMoreRef.current = node;
    }
  };

  // Set up the ref callback for the last item
  const setLastItemRef = (node: HTMLDivElement | null, index: number) => {
    if (index === options.length - 1) {
      if (typeof loadMoreRef === "function") {
        loadMoreRef(node);
      } else if (loadMoreRef && "current" in loadMoreRef) {
        (loadMoreRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node;
      }

      // Also set the default ref for internal use
      if (node) {
        defaultLoadMoreRef.current = node;
      }
    }
  };

  // Handle loading more items when the loadMoreRef becomes visible
  useEffect(() => {
    const node = defaultLoadMoreRef.current;
    if (!node) return;

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        if (externalOnLoadMore) {
          externalOnLoadMore();
        } else if (fetchNextPage) {
          fetchNextPage();
        }
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, externalOnLoadMore]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleSelect = (option: InfiniteComboboxOption<TData>) => {
    setSelectedValue(option);
    if (onSelect && option.raw) {
      onSelect(option.raw);
    }
  };

  // Using loadMoreRef for infinite scrolling

  // Reset selected value when search changes
  useEffect(() => {
    setSelectedValue(null);
  }, [search]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label className="text-sm font-medium leading-none">{label}</label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between font-normal"
                disabled={disabled}
              >
                {selectedValue?.label || field.value?.label || placeholder}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder={placeholder}
                  value={search}
                  onValueChange={handleSearch}
                />
                <CommandList>
                  {isLoading && !options.length ? (
                    <div className="py-6 text-center text-sm">
                      <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                    </div>
                  ) : (
                    <CommandEmpty>No results found.</CommandEmpty>
                  )}
                  <CommandGroup>
                    {options.map((option, index) => {
                      const isSelected =
                        selectedValue?.value === option.value ||
                        field.value === option.value;
                      return (
                        <CommandItem
                          key={`${option.value}-${index}`}
                          value={option.value.toString()}
                          onSelect={() => {
                            field.onChange(option.value);
                            handleSelect(option);
                            setOpen(false);
                          }}
                          className="cursor-pointer"
                          ref={(node) => setLastItemRef(node, index)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              isSelected ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      );
                    })}
                    {isFetchingNextPage && (
                      <div className="flex justify-center py-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    )}
                    {/* This is a hidden element that will trigger loading more items when it becomes visible */}
                    <div
                      ref={setLoadMoreTriggerRef}
                      className="h-1 w-full"
                      aria-hidden="true"
                    />
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
