import { ShipmentHistory } from "Api";
import CancelledShipmentIcon from "../../../../assets/images/cancelled-shipment-truck.svg";
import deliveredShipmentIcon from "../../../../assets/images/delivered-shipment-truck.svg";
import inShippingIcon from "../../../../assets/images/in-shipping-truck.svg";
import inTransitIcon from "../../../../assets/images/in-transit-truck.svg";
import returnedShipmentIcon from "../../../../assets/images/returned-shipment-truck.svg";
import underReviewIcon from "../../../../assets/images/under-review-truck.svg";

const statusIcons: any = {
  "قيد الشحن": inShippingIcon,
  "في الطريق": inTransitIcon,
  "قيد المراجعة": underReviewIcon,
  "تم التوصيل": deliveredShipmentIcon,
  ملغيه: CancelledShipmentIcon,
  مرتجعة: returnedShipmentIcon,
};
const ShipmentStatus = ({ history }: { history: ShipmentHistory[] }) => {
  function formatDate(dateStr: string) {
    if (!dateStr) return "";
    const dt = new Date(dateStr);
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const dd = String(dt.getDate()).padStart(2, "0");
    const hh = String(dt.getHours()).padStart(2, "0");
    const min = String(dt.getMinutes()).padStart(2, "0");
    return `${hh}:${min}  ${yyyy}-${mm}-${dd}`;
  }
  return (
    <div className="py-8 px-6">
      <h1 className="text-center text-[#DD7E1F] text-xl font-bold">
        تقرير الشحنة
      </h1>
      <hr className="border-0 border-t-2 border-dashed border-[#B3B3B3] my-6" />
      <div className="flex flex-col gap-20 items-start w-full">
        {history.map((phase, index: number) => (
          <div key={phase.id} className="relative w-full">
            {index !== history.length - 1 && (
              <div
                className={`absolute right-2 top-12 h-[calc(100%+3rem)] w-[2px] rounded-lg bg-[$]`}
              ></div>
            )}
            <div
              className={`flex font-Rubik w-full gap-4 ${index === 0 && "-ms-2.5"}`}
            >
              <img src={statusIcons[phase.status?.name_ar as string]} />
              <div className="flex flex-col justify-between gap-4 w-full">
                <h2 className="text-lg">{phase.status?.name_ar}</h2>
                <div className="flex justify-between items-center w-full">
                  <h4 className="text-[#666666] text-xs">{phase.notes}</h4>
                  <span className="text-[#666666] text-xs">
                    {phase.updated_at && formatDate(phase.updated_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShipmentStatus;
