import { useShipmentStatusOptions } from "@/api/shipments.api";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

export function StatusCombobox({
  value,

  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن حالة...",
  notFoundText = "لا توجد حالات متاحة",
  ...props
}: BaseComboboxProps) {
  const {
    data: statusData,
    ref,
    isLoading,
    hasNextPage,
    setSearch,
  } = useShipmentStatusOptions();

  const statusOptions = statusData?.items || [];

  return (
    <Combobox
      value={value}
      options={statusOptions}
      ref={ref}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      onSearch={setSearch}
      onChange={onChange}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      notFoundText={notFoundText}
      disabled={props.disabled}
      {...props}
    />
  );
}
