import { useClientBranchesOptions } from "@/api/clients.api";
import { useMemo } from "react";
import { Combobox } from "../ui/Combobox";
import { BaseComboboxProps } from "./types";

interface ClientBranchComboboxProps extends BaseComboboxProps {
  clientId?: number | string;
}

export function ClientBranchCombobox({
  value,

  clientId,
  onChange,
  placeholder = "",
  searchPlaceholder = "ابحث عن فرع...",
  notFoundText = "لا يوجد فروع متاحة",
  ...props
}: ClientBranchComboboxProps) {
  const {
    data: clientBranchesData,
    ref,
    isLoading,
    hasNextPage,
    setSearch,
  } = useClientBranchesOptions();

  const branchOptions = useMemo(() => {
    if (!clientId || !clientBranchesData?.items) {
      return [];
    }

    return clientBranchesData?.items.filter(
      (branch) => branch.client === Number(clientId),
    );
  }, [clientId, clientBranchesData]);

  return (
    <Combobox
      value={value}
      options={branchOptions}
      ref={ref}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      onSearch={setSearch}
      onChange={onChange}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      notFoundText={notFoundText}
      disabled={!clientId || props.disabled}
      {...props}
    />
  );
}
