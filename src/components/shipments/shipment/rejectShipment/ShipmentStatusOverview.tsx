import { useNavigate } from "react-router-dom";
import { ShipmentSerializerDetail } from "../../../../../Api";
import arrowLeft from "../../../../assets/images/arrow-left-2.svg";
import truckIcon from "../../../../assets/images/truck-tick.svg";
import { formatDate } from "../../../../utils/formatDate";

const ShipmentStatusOverview = ({
  shipment,
}: {
  shipment: ShipmentSerializerDetail | undefined;
}) => {
  const navigate = useNavigate();

  return (
    <div className="border border-[#DD7E1F] rounded-lg p-4 mx-4">
      <div className="grid grid-cols-12">
        <div className="col-span-7 flex gap-2">
          <h1 className="font-bold text-lg md:text-2xl">
            {shipment?.origin_city?.ar_city}
          </h1>
          <hr className="border-0 border-t-[3px] border-[#1A1A1A] my-6 grow mt-4" />{" "}
        </div>
        <div className="col-span-1 flex flex-col items-center gap-2">
          <img src={truckIcon} alt="truck icon" />
          <h1 className="text-[#4D4D4D] font-Rubik text-sm md:text-lg text-nowrap">
            {shipment?.status?.name_ar}
          </h1>
        </div>
        <div className="col-span-3 flex gap-2">
          <hr className="border-0 border-t-[3px] border-[#1A1A1A] my-6 grow mt-4" />
          <h1 className="font-bold text-lg md:text-2xl">
            {shipment?.destination_city?.ar_city}
          </h1>
        </div>
        <button
          onClick={() => {
            navigate("/shipments/all");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="col-span-1 w-full flex justify-end items-end"
        >
          <img src={arrowLeft} alt="arrow-left" />
        </button>
      </div>

      <div className="w-11/12 flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between md:items-center mt-6 font-Rubik text-[#333] text-sm md:text-base">
        <h1 className="text-nowrap">
          تاريخ التحميل:{" "}
          <span>
            {shipment?.loading_date ? formatDate(shipment.loading_date) : "-"}
          </span>
        </h1>
        <h1 className="text-nowrap">
          تاريخ الوصول المتوقع:{" "}
          <span>
            {shipment?.expected_arrival_date
              ? formatDate(shipment.expected_arrival_date)
              : "-"}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default ShipmentStatusOverview;
