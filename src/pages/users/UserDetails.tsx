// import PieChart from '../../components/charts/PieChart';

import ErrorContainer from "@/components/ErrorContainer";
import PageLoader from "@/components/PageLoader";
import usePrivilege from "@/hooks/usePrivilege";
import { Privilege } from "@/types";
import { useParams } from "react-router-dom";
import { Users } from "../../../Api";
import { useUserQuery } from "../../api/users.api";
import deleteShipmentIcon from "../../assets/images/delete-shipment-icon.svg";
import editShipmentIcon from "../../assets/images/edit-shipment-icon.svg";
import userIdCardImage from "../../assets/images/users/personal-card.svg";
import mailIcon from "../../assets/images/users/sms.svg";
import EntityShipmentsTable from "../../components/EntityShipmentsTable";
import UserDriverProfileCard from "../../components/usersDrivers/userDriverDetails/userDriverProfileCard/UserDriverProfileCard";

const UsersDetails = () => {
  const { userId } = useParams();
  const { can } = usePrivilege();

  const { isLoading, data, error, refetch } = useUserQuery(userId);

  console.log(data);

  const user: Users | undefined = data?.data;

  const moreInfoData = [
    {
      image: userIdCardImage,
      label: "رقم المعرف (ID)",
      value: user?.id,
    },
    {
      label: "اسم المستخدم",
      value: user?.username,
    },
    {
      label: "الاسم الأول",
      value: user?.first_name,
    },
    {
      label: "الاسم الأخير",
      value: user?.last_name,
    },
    {
      image: mailIcon,
      label: "البريد الإلكتروني",
      value: user?.email,
    },
  ];

  const personalInfoData = {
    name: user?.first_name + " " + user?.last_name,
    status: user?.is_active ? "نشط" : "غير نشط",
  };

  const menuActions = [
    {
      label: "تعديل البيانات",
      icon: editShipmentIcon,
      path: `/users/edit-user/${userId}`,
      privilege: "users:edit" as const,
    },
    {
      label: "حذف البيانات",
      icon: deleteShipmentIcon,
      path: `/users/delete-user/${userId}`,
      privilege: "users:delete" as const,
    },
  ].filter((action) => can(action.privilege as Privilege));

  if (error) {
    return (
      <ErrorContainer
        className="size-full"
        error={error}
        onRetry={refetch}
        defaultMessage="حدث خطأ أثناء جلب بيانات المستخدم"
      />
    );
  }

  return (
    <>
      {isLoading && <PageLoader />}
      <div className="grid col-span-2 lg:grid-cols-3 gap-8">
        <EntityShipmentsTable user={userId} />
        <div className="col-span-1 min-h-screen">
          <div className="w-full shadow-xs bg-white rounded-3xl lg:px-8 py-4 mb-6">
            <UserDriverProfileCard
              personalInfoData={personalInfoData}
              moreInfoData={moreInfoData}
              menuActions={menuActions}
              page="user"
            />
          </div>
          {/* <div className='w-full shadow-xs rounded-3xl md:px-8 py-4 bg-[#FFF]'>
          <div className='flex items-center justify-center gap-2 my-12'>
            <h1 className='text-xl font-bold text-[#333333]'>بيان الشهر</h1>
          </div>
          <PieChart />
        </div> */}
        </div>
      </div>
    </>
  );
};

export default UsersDetails;
