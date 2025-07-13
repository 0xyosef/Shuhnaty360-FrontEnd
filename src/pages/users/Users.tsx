import usePrivilege from "@/hooks/usePrivilege";
import { useState } from "react";
import { FiCheckCircle, FiPlus, FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  useUpdateUserIsActive,
  useUsersInfinityQuery,
} from "../../api/users.api";
import SelectMenu from "../../components/SelectMenu";
import RowToggle from "../../components/ui/RowToggle";
import { Table, TableCell, TableRow } from "../../components/ui/Table";

const selectMenuOptions = [
  { label: "الكل", value: "all" },
  { label: "متاح", value: "available" },
  { label: "غير متاح", value: "notAvailable" },
];

const tableColumns = [
  {
    key: "id",
    label: "(ID)",
  },
  {
    key: "full_name",
    label: "اسم",
  },
  {
    key: "phone",
    label: "رقم الهاتف",
  },
  {
    key: "company_branch",
    label: "الفرع",
  },
  {
    key: "is_staff",
    label: "موظف",
  },
  {
    key: "is_superuser",
    label: "إداري",
  },
  {
    key: "status",
    label: "الحالة",
  },
];

const Users = () => {
  const navigate = useNavigate();
  const { can } = usePrivilege();
  const [selectedUserStatus, setSelectedUserStatus] = useState("الكل");
  // const [searchValue, setSearchValue] = useState("");

  const {
    data: usersData,
    isFetching,
    error,
    hasNextPage,
    ref,
    fetchNextPage,
  } = useUsersInfinityQuery();

  const { mutate } = useUpdateUserIsActive();

  return (
    <>
      <div className="p-4">
        <div
          className={`flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between mb-10`}
        >
          {can("users:create") && (
            <button
              className="flex items-center py-2 px-6 gap-2 rounded-lg bg-[#DD7E1F] text-[#FCFCFC] text-lg"
              onClick={() => {
                navigate("/users/add-user");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              إضافة موظف
              <FiPlus size={24} />
            </button>
          )}
          {/* <SearchInput
            value={searchValue}
            onChange={(e: any) => setSearchValue(e.target.value)}
          /> */}
        </div>
        <div className="shadow-xl rounded-3xl bg-white px-8 py-4">
          <div className="w-full flex justify-between items-center mb-6">
            <h1 className="xs:text-lg text-xl text-nowrap font-bold">
              قائمة الموظفين
            </h1>
            <SelectMenu
              options={selectMenuOptions}
              selectedItem={selectedUserStatus}
              setSelectedItem={setSelectedUserStatus}
            />
          </div>
          <Table
            columns={tableColumns}
            isLoading={isFetching || hasNextPage}
            dataCount={usersData?.items?.length}
            error={error}
            onRetry={fetchNextPage}
            defaultMessage="حدث خطأ أثناء جلب البيانات"
          >
            {usersData?.items &&
              usersData.items.map((item, index) => (
                <TableRow
                  key={item.id}
                  index={index}
                  onClick={() => navigate("/users/user-details/" + item.id)}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{`${item.first_name} ${item.last_name}`}</TableCell>
                  <TableCell>{item.phone || "-"}</TableCell>
                  <TableCell>
                    {item.company_branch?.branch_name_ar || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.is_staff ? (
                      <FiCheckCircle className="text-green-500 size-6 ms-2" />
                    ) : (
                      <FiXCircle className="text-gray-500 size-6 ms-2" />
                    )}
                  </TableCell>
                  <TableCell>
                    {item.is_superuser ? (
                      <FiCheckCircle className="text-green-500 size-6 ms-2" />
                    ) : (
                      <FiXCircle className="text-gray-500 size-6 ms-2" />
                    )}
                  </TableCell>
                  <TableCell>
                    {can("users:edit") ? (
                      <RowToggle
                        checked={!!item.is_active}
                        onChange={(val) => {
                          mutate({
                            id: item.id!,
                            is_active: val,
                          });
                        }}
                      />
                    ) : item.is_active ? (
                      <FiCheckCircle className="text-green-500 size-6 ms-2" />
                    ) : (
                      <FiXCircle className="text-gray-500 size-6 ms-2" />
                    )}
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

export default Users;
