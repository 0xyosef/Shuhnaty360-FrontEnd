import ErrorContainer from "@/components/ErrorContainer";
import PageLoader from "@/components/PageLoader";
import usePrivilege from "@/hooks/usePrivilege";
import { Privilege } from "@/types";
import { useParams } from "react-router-dom";
import { useDriverQuery } from "../../api/drivers.api";
import deleteShipmentIcon from "../../assets/images/delete-shipment-icon.svg";
import editShipmentIcon from "../../assets/images/edit-shipment-icon.svg";
import truckIcon from "../../assets/images/truck.svg";
import callIcon from "../../assets/images/users/call.svg";
import flagIcon from "../../assets/images/users/flag.svg";
import userIdCardImage from "../../assets/images/users/personal-card.svg";
import EntityShipmentsTable from "../../components/EntityShipmentsTable";
import UserDriverProfileCard from "../../components/usersDrivers/userDriverDetails/userDriverProfileCard/UserDriverProfileCard";

const DriverDetails = () => {
  const { driverId } = useParams();
  const { can } = usePrivilege();

  const {
    data: driverDetailsRes,
    isLoading,
    error,
    refetch,
  } = useDriverQuery(driverId);

  const driver = driverDetailsRes?.data;

  const personalInfoData = {
    name: driver?.name,
    status: driver?.status,
  };

  const moreInfoData = [
    {
      image: userIdCardImage,
      label: "رقم المعرف (ID)",
      value: driver?.id,
    },
    {
      image: userIdCardImage,
      label: "رقم الهوية",
      value: driver?.identity_number,
    },
    {
      image: callIcon,
      label: "رقم التواصل",
      value: driver?.phone_number,
    },
    {
      image: flagIcon,
      label: "الجنسية",
      value: driver?.nationality,
    },
    {
      image: truckIcon,
      label: "نوع الشاحنة",
      value: driver?.truck_type,
    },
    {
      image: callIcon,
      label: "رقم الشاحنة",
      value: driver?.vehicle_number,
    },
  ];

  const menuActions = [
    {
      label: "تعديل البيانات",
      icon: editShipmentIcon,
      path: `/drivers/edit-driver/${driver?.id}`,
      privilege: "drivers:edit" as const,
    },
    {
      label: "حذف البيانات",
      icon: deleteShipmentIcon,
      path: `/drivers/delete-driver/${driver?.id}`,
      privilege: "drivers:delete" as const,
    },
  ].filter((action) => can(action.privilege as Privilege));

  if (error) {
    return (
      <ErrorContainer
        error={error}
        onRetry={refetch}
        defaultMessage="حدث خطأ أثناء جلب بيانات السائق"
      />
    );
  }

  return (
    <>
      {isLoading && <PageLoader />}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <EntityShipmentsTable driver={driverId} />
        <div className="col-span-1 min-h-screen">
          <div className="w-full shadow-xs bg-white rounded-3xl lg:px-8 py-4 mb-6">
            <UserDriverProfileCard
              personalInfoData={personalInfoData}
              moreInfoData={moreInfoData}
              menuActions={menuActions}
            />
          </div>
          {/* <hr className='border-0 border-t-2 border-[#999999] mx-8' />
        <div className=' mt-8 shadow-xs rounded-2xl px-8 py-4 border-[3px] border-[#CD2026] bg-[#FCE9EA] font-Rubik w-[90%] md:w-[80%] m-auto'>
          <h1 className='font-bold text-center text-xl'>بيانات الرخصة</h1>
          <div className='w-full mt-8'>
            {licenseInfo.map((item, index) => (
              <div
                key={index}
                className='flex items-center justify-between mt-4'
              >
                <span className='font-medium xs:text-sm text-base text-nowrap'>{item.label}</span>
                <div className='md:grow flex items-center gap-2'>
                  <div className='md:grow border-t-2 border-[#999999] border-dashed mx-2'></div>
                  <span className='xs:text-sm text-base text-nowrap'>{item.value}</span>
                </div>
              </div>
            ))}
            <h1 className='font-bold text-xl text-[#CD2026] text-center mt-8'>منتهية</h1>
          </div>
        </div> */}
          {/* <div className='w-full shadow-xs rounded-3xl px-8 py-4 bg-[#FFF]'>
          <div className='flex items-center justify-center gap-2 mt-12 mb-12'>
            <h1 className='text-xl font-bold text-[##1A1A1A]'>بيان الشهر</h1>
          </div>
          <PieChart />
        </div> */}
        </div>
      </div>
    </>
  );
};

export default DriverDetails;
