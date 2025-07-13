import usePrivilege from "@/hooks/usePrivilege";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useRecipientsInfinityQuery } from "../../api/recipients.api";
import locationIcon from "../../assets/images/location.svg";
import SearchInput from "../../components/searchInput/SearchInput";
import { Table, TableCell, TableRow } from "../../components/ui/Table";
import { TableColumn } from "../../components/ui/Table/TableHead";

const tableColumns: TableColumn[] = [
  {
    key: "id",
    label: "(ID)",
  },
  {
    key: "name",
    label: "اسم",
  },
  {
    key: "phone_number",
    label: "رقم الجوال",
  },
  {
    key: "email",
    label: "البريد الإلكتروني",
  },
  {
    key: "address",
    label: "الموقع",
  },
];

const Recipients = () => {
  const navigate = useNavigate();
  const { can } = usePrivilege();
  const [searchValue, setSearchValue] = useState("");

  const {
    data: recipientsData,
    isFetching,
    hasNextPage,
    ref,
    error,
    fetchNextPage,
  } = useRecipientsInfinityQuery();

  return (
    <>
      <div className="p-4">
        <div
          className={`flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between mb-10`}
        >
          {can("recipients:create") && (
            <button
              className="flex items-center py-2 px-6 gap-2 rounded-lg bg-[#DD7E1F] text-[#FCFCFC] text-lg hover:bg-[#c96e19] transition-colors"
              onClick={() => {
                navigate("/recipients/create");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              إضافة مستلم
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
            <h1 className="text-xl font-bold">قائمة المستلمين</h1>
          </div>
          <Table
            className="w-full overflow-x-auto"
            columns={tableColumns}
            isLoading={isFetching || hasNextPage}
            dataCount={recipientsData?.count}
            error={error}
            onRetry={fetchNextPage}
            defaultMessage="حدث خطأ أثناء جلب بيانات المستلمين"
          >
            {recipientsData?.items &&
              recipientsData.items.map((item, index) => (
                <TableRow
                  key={item.id}
                  index={index}
                  onClick={() => navigate("/recipients/" + item.id)}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.phone_number}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell className="flex items-center justify-center max-w-fit gap-4">
                    <img src={locationIcon} alt="location icon" />
                    <span className="text-base text-[#DD7E1F]">
                      {item.address}
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

export default Recipients;
