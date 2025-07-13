import { useCompanyBranchesOptions } from "@/api/profiles.api";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

export function BranchCombobox({
  value,

  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن فرع...",
  notFoundText = "لا يوجد فروع متاحة",
  ...props
}: BaseComboboxProps) {
  const {
    data: branchesData,
    ref,
    isLoading,
    hasNextPage,
    setSearch,
  } = useCompanyBranchesOptions();

  const branchOptions = branchesData?.items || [];

  return (
    <Combobox
      value={value}
      options={branchOptions}
      onChange={onChange}
      ref={ref}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      onSearch={setSearch}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      notFoundText={notFoundText}
      disabled={props.disabled}
      {...props}
    />
  );
}
