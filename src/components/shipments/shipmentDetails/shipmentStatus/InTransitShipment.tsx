import inShippingIcon from "../../../../assets/images/in-shipping-truck.svg";
import inTransitIcon from "../../../../assets/images/in-transit-truck.svg";

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
];

const InTransitShipment = () => {
  return (
    <>
      <div className="flex flex-col gap-20 items-start w-full">
        {phases.map((phase, index) => (
          <div key={phase.id} className="relative w-full">
            {index !== phases.length - 1 && (
              <div
                className={`absolute right-2 top-12 h-[calc(100%+3rem)] w-[2px] rounded-lg bg-[#B3B3B3]`}
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

      <h1 className="text-[#DD7E1F] font-medium text-xl font-Rubik text-center mt-8">
        الشحنة في طريقها للعميل
      </h1>
    </>
  );
};

export default InTransitShipment;
