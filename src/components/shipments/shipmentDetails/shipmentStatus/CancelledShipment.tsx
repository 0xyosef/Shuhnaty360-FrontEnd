import inShippingIcon from "../../../../assets/images/in-shipping-truck.svg";
import inTransitIcon from "../../../../assets/images/in-transit-truck.svg";
import underReviewIcon from "../../../../assets/images/under-review-truck.svg";
// import CancelledShipmentIcon from '../../../../assets/images/cancelled-shipment-truck.svg';
import { useState } from "react";
import editIcon from "../../../../assets/images/edit-icon.svg";

const phases = [
  {
    id: 1,
    title: "قيد الشحن",
    image: inShippingIcon,
    date: "15 يناير 2025 م",
    name: "بواسطة صالح حسين",
  },
  {
    id: 2,
    title: "في الطريق",
    image: inTransitIcon,
    date: "15 يناير 2025 م",
    name: "بواسطة صالح حسين",
  },
  {
    id: 3,
    verticalLineBgColor: "#CD2026",
    title: "قيد المراجعة",
    image: underReviewIcon,
    date: "15 يناير 2025 م",
    name: "بواسطة صالح حسين",
  },
  // {
  //   id: 4,
  //   title: 'تم الرفض',
  //   image: CancelledShipmentIcon,
  //   date: '15 يناير 2025 م',
  //   name: 'لقد رفضتها بتاريخ',
  // },
];

const updateShipmentStatusActions = ["استلام الشحنة", "تصنيفها كمرتجعة"];

const CancelledShipment = () => {
  const [isUpdateShipmentStatusArea, setIsUpdateShipmentStatusArea] =
    useState(false);

  return (
    <>
      <div className="flex flex-col gap-20 items-start w-full">
        {phases.map((phase, index) => (
          <div key={phase.id} className="relative w-full">
            {(index !== phases.length - 1 || isUpdateShipmentStatusArea) && (
              <div
                className={`absolute right-2 top-12 ${
                  index === phases.length - 1 && isUpdateShipmentStatusArea
                    ? "h-[calc(100%+4.5rem)]"
                    : "h-[calc(100%+3rem)]"
                } w-[2px] rounded-lg bg-[${
                  phase.verticalLineBgColor
                    ? phase.verticalLineBgColor
                    : "#B3B3B3"
                }]`}
              ></div>
            )}
            <div
              className={`flex font-Rubik w-full gap-4 ${index === 0 && "-ms-2.5"}`}
            >
              <img src={phase.image} alt={phase.title} />
              <div className="flex flex-col justify-between gap-4 w-full">
                <h2 className="text-lg">{phase.title}</h2>
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[#666666] text-xs">{phase.name}</h4>
                  <span className="text-[#666666] text-xs">{phase.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isUpdateShipmentStatusArea &&
          updateShipmentStatusActions.map((action, index) => (
            <div key={index} className="relative w-full mt-12">
              {index !== updateShipmentStatusActions.length - 1 && (
                <div
                  className={`absolute right-2 top-5 h-[calc(100%+6.5rem)] w-[2px] rounded-lg bg-[#B3B3B3]`}
                ></div>
              )}
              <div className="flex font-Rubik w-full gap-4 text-[#666666]">
                <input
                  type="radio"
                  name="status"
                  id=""
                  className="w-4 h-4"
                  style={{ marginRight: "1px" }}
                />
                <label className="text-base">{action}</label>
              </div>
            </div>
          ))}
      </div>

      {!isUpdateShipmentStatusArea ? (
        <>
          <h1 className="text-[#CD2026] font-medium text-2xl text-center my-8 font-Rubik">
            ملغية
          </h1>
          <button
            className="flex justify-center items-center gap-2 w-full"
            onClick={() => setIsUpdateShipmentStatusArea(true)}
          >
            <span className="font-Rubik text-[#DD7E1F] text-lg">
              تحديث الحالة
            </span>
            <img src={editIcon} alt="" />
          </button>
        </>
      ) : (
        <button className="mt-8 bg-[#DD7E1F] w-full py-2 rounded-lg text-[#FCFCFC] font-Rubik">
          تحديث الحالة
        </button>
      )}
    </>
  );
};

export default CancelledShipment;
