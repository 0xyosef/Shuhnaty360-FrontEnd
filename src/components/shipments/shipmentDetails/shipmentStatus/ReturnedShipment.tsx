import inShippingIcon from "../../../../assets/images/in-shipping-truck.svg";
import inTransitIcon from "../../../../assets/images/in-transit-truck.svg";
import underReviewIcon from "../../../../assets/images/under-review-truck.svg";
// import CancelledShipmentIcon from '../../../../assets/images/cancelled-shipment-truck.svg';
import returnedShipmentIcon from "../../../../assets/images/returned-shipment-truck.svg";

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
    title: "قيد المراجعة",
    image: underReviewIcon,
    date: "15 يناير 2025 م",
    name: "بواسطة صالح حسين",
  },
  // {
  //   id: 4,
  //   verticalLineBgColor: '#CD2026',
  //   title: 'ملغية',
  //   image: CancelledShipmentIcon,
  //   date: '15 يناير 2025 م',
  //   name: 'بواسطة صالح حسين',
  // },
  {
    id: 5,
    title: "مرتجعة",
    image: returnedShipmentIcon,
    date: "15 يناير 2025 م",
    name: "بواسطة صالح حسين",
  },
];

const ReturnedShipment = () => {
  return (
    <>
      <div className="flex flex-col gap-20 items-start w-full">
        {phases.map((phase, index) => (
          <div key={phase.id} className="relative w-full">
            {/* {index !== phases.length - 1 && (
              <div
                className={`absolute right-2 top-12 h-[calc(100%+3rem)] w-[2px] rounded-lg bg-[${
                  phase.verticalLineBgColor ? phase.verticalLineBgColor : '#B3B3B3'
                }]`}
              ></div>
            )} */}
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
      <div className="text-[#CD2026] font-Rubik w-full text-center">
        <h1 className="font-medium text-2xl my-8 w-full">مرتجعة</h1>
        <div className="w-full flex flex-col items-center gap-2 bg-[#F8D3D4] py-2 px-6 rounded-lg">
          <h1 className="text-lg font-medium">بتاريخ 25 يناير 2025 م</h1>
          <h1 className=" text-xs w-full mt-3 font-medium">بواسطة صالح حسين</h1>
        </div>
      </div>
    </>
  );
};

export default ReturnedShipment;
