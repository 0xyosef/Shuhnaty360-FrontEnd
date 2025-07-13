import { useState } from "react";

import InfoRow from "../../usersDrivers/userDriverDetails/userDriverProfileCard/infoRow/InfoRow";
import { useSidebar } from "../../../context/SidebarContext";
import DeleteItemCard from "./DeleteItemCard";
import DeleteItemDialog from "./deleteItemDialog";

const DeleteItem = ({
  moreInfoData,
  personalData,
  handleDeleteItemClick,
  isLoading,
  page,
}: any) => {
  const { isSidebarOpen } = useSidebar();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      {isLoading && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 ${
            isSidebarOpen && "lg:transform -translate-x-[5%]"
          }`}
        >
          <span className="loader"></span>
        </div>
      )}
      <div className="flex flex-col gap-20 mx-4 md:mx-0 mb-10 md:mb-0">
        <div className="w-full grid grid-cols-1 gap-16 md:gap-0 md:grid-cols-5 border border-[#DD7E1F] rounded-2xl">
          {" "}
          <div className="col-span-1 w-full h-full flex flex-col justify-center mt-4 md:-mt-4 items-center">
            {/* <div className='rounded-full border-2 border-[#2E853F] w-24 h-24 lg:w-28 lg:h-28'>
            <img
              src={personalData.image}
              alt='avatar pic'
              className='w-full h-full rounded-full object-cover'
            />
            <h1 className='mt-4 mb-2 text-[#1A1A1A] font-bold text-lg lg:text-2xl text-nowrap'>
              {personalData.name}
            </h1>
          </div> */}
            <h1 className="mt-4 mb-2 text-[#1A1A1A] font-bold text-lg lg:text-2xl text-nowrap">
              {personalData.name}
            </h1>
          </div>
          <div className="col-span-1 md:col-span-4">
            <div className="flex flex-col gap-2 px-4 md:px-8 py-2">
              {moreInfoData.map((row: any, index: any) => (
                <div key={index}>
                  <InfoRow
                    image={row.image}
                    label={row.label}
                    value={row.value}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-start h-[70vh]">
          <DeleteItemCard
            handleDeleteButtonClick={() => setIsDialogOpen(true)}
          />
          <DeleteItemDialog
            label={
              page === "driver"
                ? "هل أنت متأكد من حذف السائق"
                : page === "user"
                  ? "هل أنت متأكد من حذف المستخدم"
                  : "هل أنت متأكد من حذف العنصر"
            }
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            handleDeleteItemClick={handleDeleteItemClick}
          />
        </div>
      </div>
    </>
  );
};

export default DeleteItem;
