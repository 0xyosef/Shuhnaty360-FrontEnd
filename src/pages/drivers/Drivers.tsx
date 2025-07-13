import usePrivilege from "@/hooks/usePrivilege";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDriversInfinityQuery } from "../../api/drivers.api";
import SearchInput from "../../components/searchInput/SearchInput";
import SelectMenu from "../../components/SelectMenu";
import { Table, TableCell, TableRow } from "../../components/ui/Table";

const selectMenuOptions = [
  { label: "الكل", value: "" },
  { label: "متاح", value: "available" },
  { label: "غير متاح", value: "offline" },
  { label: "مشغول", value: "busy" },
];

const tableColumns = [
  {
    key: "id",
    label: "(ID)",
  },
  {
    key: "name",
    label: "اسم",
  },
  {
    key: "language",
    label: "اللغة",
  },
  {
    key: "nationality",
    label: "الجنسية",
  },
  {
    key: "phone_number",
    label: "رقم الجوال",
  },
  {
    key: "vehicle_number",
    label: "رقم الشاحنة",
  },
  {
    key: "status",
    label: "الحالة",
  },
];

const getStatusBgColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-[#B3E5BD]";
    case "busy":
      return "bg-red-200";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "text-[#2E853F]";
    case "busy":
      return "text-red-500";
  }
};

const getLang = (lang: string) => {
  switch (lang) {
    case "ar":
      return "العربية";
    case "en":
      return "الانجليزية";
    case "ur":
      return "أردو";
    default:
      return lang;
  }
};
const Drivers = () => {
  const navigate = useNavigate();
  const { can } = usePrivilege();
  const [selectedDriverStatus, setSelectedDriverStatus] = useState("الكل");
  const [searchValue, setSearchValue] = useState("");

  const {
    data: driversData,
    isFetching,
    hasNextPage,
    ref,
    error,
    fetchNextPage,
  } = useDriversInfinityQuery({ search: searchValue });

  return (
    <>
      <div className="p-4">
        <div
          className={`flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between mb-10`}
        >
          {can("drivers:create") && (
            <button
              className="flex items-center py-2 px-6 gap-2 rounded-lg bg-[#DD7E1F] text-[#FCFCFC] text-lg"
              onClick={() => {
                navigate("/drivers/add-driver");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              إضافة سائق
              <FiPlus size={24} />
            </button>
          )}
          <SearchInput
            value={searchValue}
            onChange={(e: any) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="shadow-xl rounded-3xl bg-white px-8 py-4">
          <div className="w-full flex justify-between items-center mb-6">
            <h1 className="xs:text-lg text-xl text-nowrap font-bold">
              قائمة السائقين
            </h1>
            <SelectMenu
              options={selectMenuOptions}
              selectedItem={selectedDriverStatus}
              setSelectedItem={setSelectedDriverStatus}
            />
          </div>
          <Table
            columns={tableColumns}
            isLoading={isFetching || hasNextPage}
            dataCount={driversData?.items?.length}
            error={error}
            onRetry={fetchNextPage}
            defaultMessage="حدث خطأ أثناء جلب بيانات السائقين"
          >
            {driversData?.items &&
              driversData.items.map((item, index) => (
                <TableRow
                  key={item.id}
                  index={index}
                  onClick={() => navigate("/drivers/driver-details/" + item.id)}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {item.language && getLang(item.language)}
                  </TableCell>
                  <TableCell>{item.nationality}</TableCell>
                  <TableCell>{item.phone_number}</TableCell>
                  <TableCell>{item.vehicle_number}</TableCell>
                  <TableCell>
                    <span
                      className={`py-2 text-center font-medium inline-block rounded-md w-44 text-sm ${
                        item.status && getStatusColor(item.status)
                      } ${item.status && getStatusBgColor(item.status)}`}
                    >
                      {item.status === "available" ? "متاح" : "غير متاح"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </Table>
          <div ref={ref} className="h-0" />
        </div>
      </div>
    </>
  );
};

export default Drivers;
