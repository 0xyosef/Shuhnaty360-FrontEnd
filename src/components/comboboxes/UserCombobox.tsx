import { useUsersOptions } from "@/api/users.api";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

export function UserCombobox({
  value,

  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن مندوب...",
  notFoundText = "لا يوجد مناديب متاحون",
  ...props
}: BaseComboboxProps) {
  const {
    data: usersData,
    ref,
    isLoading,
    hasNextPage,
    setSearch,
  } = useUsersOptions();

  const userOptions = usersData?.items || [];

  return (
    <Combobox
      value={value}
      options={userOptions}
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
