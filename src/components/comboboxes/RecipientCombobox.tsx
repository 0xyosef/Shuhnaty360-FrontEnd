import { useRecipientsOptions } from "@/api/recipients.api";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

export function RecipientCombobox({
  value,

  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن مستلم...",
  notFoundText = "لا يوجد مستلمون متاحون",
  ...props
}: BaseComboboxProps) {
  const {
    data: recipientsData,
    ref,
    isLoading,
    hasNextPage,
    setSearch,
  } = useRecipientsOptions();

  const recipientOptions = recipientsData?.items || [];

  return (
    <Combobox
      value={value}
      options={recipientOptions}
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
