import React from "react";
import { TiFilter } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { DriverList } from "../../../Api";
import { ColumnFilterDropdown } from "../shipments/shipmentsTable/ColumnFilterDropdown";

const driverStatus = {
  available: "متاح",
  offline: "غير متاح",
  busy: "مشغول",
};

type DriversTableProps = {
  selectedStatus: string;
  data: DriverList[];
  currentPage: number;
  itemsPerPage: number;
};

const DriversTable = ({
  selectedStatus,
  data,
  currentPage,
  itemsPerPage,
}: DriversTableProps) => {
  const navigate = useNavigate();

  const tableRowStyles = "py-2 px-4 text-right text-nowrap";

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-[#B3E5BD]";
      case "busy":
        return "bg-[#CCCCCC]";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "text-[#2E853F]";
      case "busy":
        return "text-[#333333]";
    }
  };

  const filterableColumns = [
    { key: "name", label: "الاسم" },
    { key: "language", label: "اللغة" },
    { key: "nationality", label: "الجنسية" },
    { key: "identity_number", label: "رقم الهوية" },
    { key: "phone_number", label: "رقم الجوال" },
    { key: "vehicle_number", label: "رقم الشاحنة" },
    { key: "status", label: "الحالة" },
  ];

  const tableHeading = [{ key: "id", label: "(ID)" }, ...filterableColumns];

  const initialFilters: any = {};
  filterableColumns.forEach((col: any) => (initialFilters[col.key] = []));

  const uniqueOptions: any = {};
  filterableColumns.forEach((col) => {
    let values = data.map((item: any) => item[col.key]);
    if (col.key === "status") {
      values = values.map((val: DriverList["status"]) => driverStatus[val!]);
    }
    uniqueOptions[col.key] = Array.from(new Set(values)).filter(Boolean);
  });

  const [filters, setFilters] = React.useState(initialFilters);
  const [showFilter, setShowFilter] = React.useState<any>({});

  const filteredData = data.filter(
    (item: DriverList) =>
      Object.keys(filters).every((key) => {
        if (!filters[key] || filters[key].length === 0) return true;
        if (key === "status") {
          const statusText = driverStatus[item[key]!];
          return filters[key].includes(statusText);
        }
        return filters[key].includes(item[key as keyof DriverList]);
      }) &&
      (selectedStatus === "الكل" ||
        driverStatus[item.status!] === selectedStatus),
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getLang = (lang: string | undefined) => {
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

  return (
    <div className={`w-full overflow-x-auto min-h-[40vh]`}>
      <table className={`bg-[#FCFCFC] w-full`}>
        <thead>
          <tr className="border-b-2 border-[#CCCCCC]">
            {tableHeading.map((col, index) => (
              <th key={col.key} className={tableRowStyles + " relative"}>
                <div
                  className={`flex items-center gap-1 ${
                    index === tableHeading.length - 1 && "ms-20"
                  }`}
                >
                  {col.label}
                  {uniqueOptions[col.key] && (
                    <button
                      type="button"
                      onClick={() =>
                        setShowFilter((prev: any) =>
                          prev[col.key] ? {} : { [col.key]: true },
                        )
                      }
                    >
                      <TiFilter
                        size={22}
                        className="text-gray-400 hover:text-gray-900"
                      />
                    </button>
                  )}
                  {showFilter[col.key] && (
                    <div className="z-50">
                      <ColumnFilterDropdown
                        options={uniqueOptions[col.key]}
                        selectedValues={filters[col.key] || []}
                        onChange={(vals: any) =>
                          setFilters((f: any) => ({
                            ...f,
                            [col.key]: vals,
                          }))
                        }
                        onClose={() =>
                          setShowFilter((f: any) => ({
                            ...f,
                            [col.key]: false,
                          }))
                        }
                        placeholder={`ابحث عن ${col.label}...`}
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <div className="h-8"></div>
        <tbody className="font-Rubik text-base font-medium">
          {paginatedData.map((item: DriverList, index: any) => (
            <>
              <tr className={`rounded-lg ${index % 2 === 0 && "bg-[#F2F2F2]"}`}>
                <button
                  key={index}
                  onClick={() => {
                    navigate(`/drivers/driver-details/${item.id}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  style={{ display: "contents" }}
                >
                  <td className={tableRowStyles}>{item.id}</td>
                  <td className={tableRowStyles}>{item.name}</td>
                  <td className={tableRowStyles}>{getLang(item?.language)}</td>
                  <td className={tableRowStyles}>{item.nationality}</td>
                  <td className={tableRowStyles}>{item.identity_number}</td>
                  <td className={tableRowStyles}>{item.phone_number}</td>
                  <td className={tableRowStyles}>{item.vehicle_number}</td>
                  <td className="py-2 px-4 text-center ">
                    <span
                      className={`p-2 inline-block rounded-md w-44 text-sm ${
                        item.status && getStatusColor(item.status)
                      } ${item.status && getStatusBgColor(item.status)}`}
                    >
                      {driverStatus[item.status!]}
                    </span>
                  </td>
                </button>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriversTable;
