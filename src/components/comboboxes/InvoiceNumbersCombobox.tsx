import { useShipmentsInvoiceOptions } from "@/api/shipments.api";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

type InvoiceNumbersComboboxProps = BaseComboboxProps;

export function InvoiceNumbersCombobox({
  value,

  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن رقم الفاتورة...",
  notFoundText = "لا يوجد رقم فاتورة متاحة",
  ...props
}: InvoiceNumbersComboboxProps) {
  const {
    data: shipmentsData,
    ref,
    isLoading,
    hasNextPage,
    setSearch,
  } = useShipmentsInvoiceOptions();

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
