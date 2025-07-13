import inShippingIcon from "../../../../assets/images/in-shipping-truck.svg";
import inTransitIcon from "../../../../assets/images/in-transit-truck.svg";
import underReviewIcon from "../../../../assets/images/under-review-truck.svg";
import deliveredShipmentIcon from "../../../../assets/images/delivered-shipment-truck.svg";

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
    verticalLineBgColor: "#DD7E1F",
    title: "في الطريق",
    image: inTransitIcon,
    date: "15 يناير 2025 م",
    name: "بواسطة صالح حسين",
  },
  {
    id: 3,
    title: "قيد المراجعة",
    image: underReviewIcon,
    date: "15 يناير 2025 م",
    name: "بواسطة صالح حسين",
  },
  {
    id: 4,
    title: "تم التوصيل",
    image: deliveredShipmentIcon,
    date: "15 يناير 2025 م",
    name: "بواسطة صالح حسين",
  },
];

const DeliveredShipment = () => {
  return (
    <>
      <div className="flex flex-col gap-20 items-start w-full relative">
        {phases.map((phase, index) => (
          <div key={phase.id} className="relative w-full">
            {index !== phases.length - 1 && (
              <div
                className={`absolute right-2 top-12 h-[calc(100%+3rem)] w-[2px] rounded-lg bg-[${
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
      </div>

      <h1 className="text-[#2E853F] font-medium text-2xl text-center my-8 font-Rubik ">
        تم التوصيل
      </h1>
      <div className="bg-[#D9F2DE] w-full py-2 px-6 text-[#2E853F] rounded-lg font-Rubik">
        <div className="w-full flex justify-between items-center">
          <span>تم التوصيل</span>
          <span className="text-sm font-medium">30 يناير 2025 م</span>
        </div>
        <h1 className="text-center text-xs w-full mt-3">بواسطة صالح حسين</h1>
      </div>
    </>
  );
};

export default DeliveredShipment;
