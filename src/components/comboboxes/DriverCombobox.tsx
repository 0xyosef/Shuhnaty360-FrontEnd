import { useDriversOptions } from "@/api/drivers.api";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

export function DriverCombobox({
  value,

  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن سائق...",
  notFoundText = "لا يوجد سائقون متاحون",
  ...props
}: BaseComboboxProps) {
  const {
    data: driversData,
    ref,
    isLoading,
    hasNextPage,
    setSearch,
  } = useDriversOptions();

  const driverOptions = driversData?.items || [];

  return (
    <Combobox
      value={value}
      options={driverOptions}
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
