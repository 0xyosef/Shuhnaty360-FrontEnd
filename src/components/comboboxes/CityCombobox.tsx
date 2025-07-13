import { useCitiesOptions } from "@/api/cities.api";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

interface CityComboboxProps extends BaseComboboxProps {
  type?: "origin" | "destination";
}

export function CityCombobox({
  value,

  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن مدينة...",
  notFoundText = "لا توجد مدن متاحة",
  ...props
}: CityComboboxProps) {
  const {
    data: citiesData,
    ref,
    isLoading,
    hasNextPage,
    setSearch,
  } = useCitiesOptions();

  const cityOptions = citiesData?.items || [];

  return (
    <Combobox
      value={value}
      options={cityOptions}
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
