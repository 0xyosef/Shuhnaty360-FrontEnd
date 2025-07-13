import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShipmentFiltersType,
  useShipmentsInfinityQuery,
  useShipmentStatusOptions,
} from "../api/shipments.api";
import { formatDate } from "../utils/formatDate";
import SelectMenu from "./SelectMenu";
import { Table, TableCell, TableRow } from "./ui/Table";

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

const getStatusBgColor = (status: string) => {
  switch (status) {
    case "قيد الشحن":
      return "bg-[#B3E5BD]";
    case "متأخرة":
      return "bg-[#FEDE9A]";
    case "تم التوصيل":
      return "bg-[#E6E6E6]";
    case "ملغية":
      return "bg-[#CD2026]";
    case "مرتجعة":
      return "bg-[#F8D3D4]";
    case "مكتملة":
      return "bg-[#2E853F]";
    default:
      return "bg-gray-300";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "قيد الشحن":
    case "متأخرة":
      return "text-[#071309]";
    case "تم التوصيل":
      return "text-[#333333]";
    case "ملغية":
      return "text-[#F8D3D4]";
    case "مرتجعة":
      return "text-[#CD2026]";
    case "مكتملة":
      return "text-[#B3E5BD]";
    default:
      return "text-[#071309]";
  }
};

type EntityShipmentsTableProps = ShipmentFiltersType;

const EntityShipmentsTable = (props: EntityShipmentsTableProps) => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const { data: statusData } = useShipmentStatusOptions();

  const options = [{ label: "الكل", value: "" }, ...(statusData?.items || [])];

  const status = options.find(
    (option) => option.label === selectedStatus,
  )?.value;

  const { data, isLoading, ref, refetch, error } = useShipmentsInfinityQuery({
    ...props,
    status,
  });

  return (
    <div className="col-span-1 bg-white lg:col-span-2 h-fit shadow-lg rounded-3xl px-8 py-4 w-full overflow-x-auto">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="xs:text-lg text-xl font-bold">قائمة الشحنات</h1>
        <SelectMenu
          options={options}
          selectedItem={selectedStatus}
          setSelectedItem={(value) => {
            if (value === "الكل") {
              setSelectedStatus(null);
            } else {
              setSelectedStatus(value);
            }
          }}
        />
      </div>
      <Table
        dataCount={data?.items.length}
        columns={tableColumns}
        isLoading={isLoading}
        error={error}
        onRetry={refetch}
      >
        {data?.items.map((shipment, index) => (
          <TableRow
            key={`${shipment.id}${index}`}
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
              <span
                className={`py-2 text-center font-medium inline-block rounded-md w-36 text-sm ${
                  shipment.status?.name_ar &&
                  getStatusColor(shipment.status?.name_ar)
                } ${shipment.status?.name_ar && getStatusBgColor(shipment.status.name_ar)}`}
              >
                {shipment.status?.name_ar || "-"}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </Table>
      <div ref={ref} className="h-0" />
    </div>
  );
};

export default EntityShipmentsTable;
