import { useClientsOptions } from "@/api/clients.api";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

export function ClientCombobox({
  value,

  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن عميل...",
  notFoundText = "لا يوجد عملاء متاحون",
  ...props
}: BaseComboboxProps) {
  const {
    data: clientsData,
    ref,
    isLoading,
    hasNextPage,
    setSearch,
  } = useClientsOptions();

  const clientOptions = clientsData?.items || [];

  return (
    <Combobox
      value={value}
      options={clientOptions}
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
