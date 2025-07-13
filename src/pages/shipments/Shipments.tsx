import FiltersPopover from "@/components/searchInput/FiltersPopover";
import usePrivilege from "@/hooks/usePrivilege";
import { SHIPMENT_STATUS_MAP } from "@/utils/constants";
import { exportToExcel } from "@/utils/exportToExcel";
import { useRef, useState } from "react";
import { FiDownload, FiPlus } from "react-icons/fi";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import {
  ShipmentFiltersType,
  useShipmentsInfinityQuery,
  useUpdateShipmentStatus,
} from "../../api/shipments.api";
import SearchInput from "../../components/searchInput/SearchInput";
import { Table, TableCell, TableRow } from "../../components/ui/Table";
import { formatDate } from "../../utils/formatDate";
import { ShipmentFilters } from "./components/ShipmentFilters";
import ShipmentStatusSelect from "./components/ShipmentStatusSelect";

const tableColumns = [
  { label: "رقم الشحنة", key: "id" },
  { label: "المندوب", key: "user" },
  { label: "المرسل", key: "client" },
  { label: "المستلم", key: "recipient" },
  { label: "السائق", key: "driver" },
  { label: "المصدر", key: "origin_city" },
  { label: "الوجهة", key: "destination_city" },
  { label: "تاريخ التحميل", key: "loading_at" },
  { label: "حالة الشحنة", key: "status" },
];

const Shipments = () => {
  const navigate = useNavigate();
  const { can } = usePrivilege();
  const { shipmentName } = useParams<{ shipmentName?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedValue] = useDebounce(searchParams.get("search"), 500);
  const filtersPopoverRef = useRef<{
    open: boolean;
    setOpen: (open: boolean) => void;
  }>(null);

  const [filters, setFilters] = useState<ShipmentFiltersType>({});

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const status =
    (shipmentName && SHIPMENT_STATUS_MAP.get(shipmentName)) || undefined;

  const params = { search: debouncedValue, status, ...filters };

  const handleExportToExcel = () => {
    if (!shipmentsData) return;

    // Map the items to match exactly what's shown in the table
    const shipmentsDataForExport = shipmentsData.map((shipment) => ({
      "رقم الشحنة": shipment.id || "-",
      المندوب: shipment.user
        ? `${shipment.user.first_name || ""} ${shipment.user.last_name || ""}`.trim() ||
          "-"
        : "-",
      المرسل: shipment.client
        ? `${shipment.client.name || ""}${shipment.client_branch?.name ? ` - ${shipment.client_branch.name}` : ""}`.trim() ||
          "-"
        : "-",
      المستلم: shipment.recipient?.name || "-",
      السائق: shipment.driver?.name || "-",
      المصدر: shipment.origin_city?.ar_city || "-",
      الوجهة: shipment.destination_city?.ar_city || "-",
      "تاريخ التحميل": shipment.loading_date
        ? formatDate(shipment.loading_date)
        : "-",
      "حالة الشحنة": shipment.status?.name_ar || "-",
    }));

    exportToExcel(
      shipmentsDataForExport,
      `شحنات_${new Date().toISOString().split("T")[0]}`,
    );
  };

  const { data, isFetching, hasNextPage, ref, error, fetchNextPage } =
    useShipmentsInfinityQuery(params);
  const { mutate } = useUpdateShipmentStatus(params);

  const handleStatusChange = (
    id: number,
    status: { id: number; name_ar: string },
  ) => {
    mutate({
      id,
      status: status.id,
      status_name: status.name_ar,
    });
  };

  const shipmentsData = data?.items || [];

  return (
    <div className="p-4">
      <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between mb-10">
        <div className="flex grow-1 items-center gap-2 w-full md:w-auto">
          {can("shipments:create") && (
            <button
              onClick={() => {
                navigate("/shipments/add-shipment");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-primary hover:bg-primary/90"
            >
              <span>إضافة شحنة</span>
              <FiPlus size={20} />
            </button>
          )}
          <button
            onClick={handleExportToExcel}
            className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
            title="تصدير إلى إكسل"
          >
            <FiDownload size={20} />
            <span className="hidden sm:inline">تصدير</span>
          </button>
        </div>
        <div className="flex-1 max-w-2xl">
          <SearchInput
            value={searchParams.get("search") || ""}
            onChange={(e) =>
              setSearchParams(
                (prev) => {
                  if (e.target.value.trim()) {
                    prev.set("search", e.target.value.trim());
                  } else {
                    prev.delete("search");
                  }
                  return prev;
                },
                { replace: true },
              )
            }
            suffixIcon={
              <FiltersPopover
                ref={filtersPopoverRef}
                activeFilterCount={activeFilterCount}
              >
                <ShipmentFilters
                  initialFilters={filters}
                  hideStatus={!!shipmentName}
                  onApply={(filters) => {
                    setFilters(filters);
                    filtersPopoverRef.current?.setOpen(false);
                  }}
                  onClear={() => {
                    setFilters({});
                    filtersPopoverRef.current?.setOpen(false);
                  }}
                />
              </FiltersPopover>
            }
          />
        </div>
      </div>
      <div className="shadow-xl rounded-3xl bg-white px-8 py-4">
        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-base md:text-xl font-bold">قائمة الشحنات</h1>
        </div>
        <Table
          className="w-full overflow-x-auto"
          columns={tableColumns}
          isLoading={isFetching || hasNextPage}
          dataCount={shipmentsData?.length}
          error={error}
          onRetry={fetchNextPage}
          defaultMessage="حدث خطأ أثناء جلب بيانات الشحنات"
        >
          {shipmentsData &&
            shipmentsData.map((shipment, index) => (
              <TableRow
                key={shipment.id}
                index={index}
                onClick={() =>
                  navigate("/shipments/shipment-details/" + shipment.id)
                }
              >
                <TableCell>{shipment.id}</TableCell>
                <TableCell>{`${shipment.user?.first_name} ${shipment.user?.last_name}`}</TableCell>
                <TableCell>{`${shipment.client?.name} - ${shipment.client_branch?.name}`}</TableCell>
                <TableCell>{shipment.recipient?.name}</TableCell>
                <TableCell>{shipment.driver?.name}</TableCell>
                <TableCell>{shipment.origin_city?.ar_city}</TableCell>
                <TableCell>{shipment.destination_city?.ar_city}</TableCell>
                <TableCell className="text-center">
                  {shipment.loading_date && formatDate(shipment.loading_date)}
                </TableCell>
                <TableCell>
                  <ShipmentStatusSelect
                    status={shipment.status?.name_ar || ""}
                    onStatusChange={(status) =>
                      handleStatusChange(shipment.id!, status)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
        </Table>
        <div ref={ref} className="h-0" />
      </div>
    </div>
  );
};

export default Shipments;
