import { useShipmentsOptions } from "@/api/shipments.api";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

type ShipmentsComboboxProps = BaseComboboxProps;

export function ShipmentsCombobox({
  value,

  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن شحنة...",
  notFoundText = "لا يوجد شحنات متاحة",
  ...props
}: ShipmentsComboboxProps) {
  const {
    data: shipmentsData,
    ref,
    isLoading,
    hasNextPage,
    setSearch,
  } = useShipmentsOptions();

  return (
    <Combobox
      value={value}
      options={shipmentsData?.items || []}
      ref={ref}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      onSearch={setSearch}
      onChange={onChange}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      notFoundText={notFoundText}
      {...props}
    />
  );
}
