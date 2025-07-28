import { QRCodeSVG } from "qrcode.react";
import { useLocation } from "react-router-dom";
import type { ShipmentSerializerDetail } from "../../../../Api";
import { formatDate } from "../../../utils/formatDate";
import WaybillInfoRow from "./WaybillInfoRow";

export const Waybill = ({
  shipment,
}: {
  shipment: ShipmentSerializerDetail;
}) => {
  const { pathname } = useLocation();
  const driverDetails = [
    {
      value: "الاسم",
      label: shipment.driver?.name,
    },
    {
      value: "رقم الهوية",
      label: shipment.driver?.identity_number,
    },
    {
      value: "رقم الجوال",
      label: shipment.driver?.phone_number,
    },
  ];

  const truckDetails = [
    {
      value: "نوع الشاحنة",
      label: shipment.truck_type?.name_ar || "-",
    },
    {
      value: "رقم الشاحنة",
      label: shipment.driver?.vehicle_number,
    },
  ];

  const recipientDetails = [
    {
      value: "الاسم",
      label: shipment.recipient?.name,
    },
    {
      value: "بيانات التواصل",
      label: shipment.recipient?.phone_number,
    },
    {
      value: "العنوان",
      label: shipment.recipient?.address,
    },
  ];

  const clientDetails = [
    {
      value: "الاسم",
      label: shipment.client?.name,
    },
    {
      value: "بيانات التواصل",
      label: shipment.client?.phone_number,
    },
    {
      value: "الفرع",
      label: shipment.client_branch?.name,
    },
  ];

  const shipmentDetails = [
    {
      value: "من",
      label: shipment.origin_city?.ar_city,
    },
    {
      value: "إلى",
      label: shipment.destination_city?.ar_city,
    },
    {
      value: "المحتويات",
      label: shipment.contents,
    },
    {
      value: "الوزن",
      label: shipment.weight,
    },
    {
      value: "المندوب",
      label: `${shipment.user?.first_name} ${shipment.user?.last_name}`,
    },
    {
      value: "رقم التتبع",
      label: shipment.tracking_number,
    },
  ];

  return (
    <div
      id="waybill-printable"
      className="m-0 bg-white rounded-2xl p-4 font-Rubik text-[#1a1a1a] text-right"
    >
      <div className="flex gap-0 text-left flex-row justify-between items-start ">
        <div className="font-light">
          <div className="font-bold">AL Jeed Transportation</div>
          <div>
            <span>{shipment.user?.company_branch?.branch_name_en}</span> Branch
          </div>
          <div>
            <span>التاريخ:</span>{" "}
            {formatDate(new Date().toISOString().split("T")[0])}
          </div>
        </div>
        <div>
          <img
            src={
              shipment.user?.company_branch?.company?.company_logo ||
              "/src/assets/images/truck-Logo.svg"
            }
            alt="logo"
            className="w-24"
          />
        </div>
        <div className="font-Almarai text-right">
          <div className="font-bold">مؤسسة الجيد للنقليات</div>
          <div>
            فرع <span>{shipment.user?.company_branch?.branch_name_ar}</span>
          </div>
          <div className="mt-2 px-2 py-1 rounded-lg bg-[#DD7E1F] text-[#FCFCFC]">
            رقم الشحنة: <span>{shipment.id}</span>
          </div>
        </div>
      </div>
      <hr className="border-0 border-t-2 border-solid border-[#666] mt-2 mb-6" />
      <div className="mb-6 relative">
        <div className="text-center font-Almarai font-bold text-lg">
          بوليصة شحن
          <div className="font-semibold text-base">Shipment Policy</div>
        </div>
        <div className="absolute top-4 right-1/4 translate-x-1/2">
          <span className="border-2 p-2 border-[#666]">
            {shipment.tracking_number}
          </span>
        </div>
      </div>

      <div className="">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-span-1">
            <div className="font-Almarai font-bold text-lg mb-1">
              بيانات الشاحنة
            </div>
            {truckDetails.map((row: any, index: any) => (
              <div key={index}>
                <WaybillInfoRow label={row.label} value={row.value} />
              </div>
            ))}
          </div>
          <div className="col-span-1">
            <div className="font-Almarai font-bold text-lg mb-1">
              بيانات السائق
            </div>
            {driverDetails.map((row: any, index: any) => (
              <div key={index}>
                <WaybillInfoRow label={row.label} value={row.value} />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6 bg-[#F2F2F2] p-2 rounded-lg print-bg-gray">
          <div className="col-span-1">
            <div className="font-Almarai font-bold text-lg mb-1">
              بيانات المستلم
            </div>
            {recipientDetails.map((row: any, index: any) => (
              <div key={index}>
                <WaybillInfoRow label={row.label} value={row.value} />
              </div>
            ))}
          </div>
          <div className="col-span-1">
            <div className="font-Almarai font-bold text-lg mb-1">
              بيانات المرسل
            </div>
            {clientDetails.map((row: any, index: any) => (
              <div key={index}>
                <WaybillInfoRow label={row.label} value={row.value} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div dir="rtl" className="grid grid-cols-2">
        <div className="col-span-2">
          <div className="font-Almarai font-bold text-lg mb-1">
            تفاصيل الشحنة
          </div>
        </div>
        {shipmentDetails.map((row: any, index: any) => (
          <div key={index} dir="ltr">
            <WaybillInfoRow label={row.label} value={row.value} />
          </div>
        ))}
      </div>
      <div className="mt-3 bg-[#FCF2E9] border-2 border-[#ffb678] rounded-lg p-2 text-sm">
        <div>:ملاحظات</div>
        {[
          "يرجى التأكد من الشراع الثقيل",
          `يرجى تسليم الشحنة بموعد ${shipment.loading_date ? formatDate(shipment.loading_date) : "-"}`,
          "تأكد من إرجاع جهاز الحرارة",
          "يتم تسليم الفاتوره أو تصويرها فور التنزيل",
          "يتم خصم ١٠٪ في حالم لم يتم تصوير الفاتوره أو تصويرها في الوقت المحدد",
        ].map((item, index) => (
          <div key={index}>{item} -</div>
        ))}
      </div>

      <hr className="border-0 border-t-2 border-solid border-[#666] my-3" />
      <div className="text-center font-Almarai font-semibold text-lg">
        إقرار سائق
      </div>
      <div className="text-sm text-[#1A1A1A] mt-2">
        أتعهد أنا السائق الموضح اسمي ورقم سيارتي أعلاه بأنني مسئول عن كافة
        الأضرار التي تحدث للشحنة. كما أتعهد بتفقد الشحنة أثناء سيري، وأنني مسئول
        عن إبلاغ المؤسسة بأسرع وسيلة ممكنة في حالة حدوث أي طارئ، وهذا إقرار مني
        بذلك.{" "}
      </div>

      <div className="w-full grid grid-cols-3 mt-6">
        <div className="col-span-1 border-b-2 border-[#666] border-dashed">
          <p className="text-center">توقيع الموظف</p>
        </div>
        <div className="col-span-1 text-center">
          <div className="border-2 border-[#DD7E1F] p-1 w-fit m-auto">
            <QRCodeSVG
              value={pathname}
              size={50}
              bgColor="#ffffff"
              fgColor="#212121"
              level="H"
              includeMargin={false}
            />
          </div>
        </div>
        <div className="col-span-1 border-b-2 border-[#666] border-dashed">
          <p className="text-center">توقيع السائق</p>
        </div>
      </div>
    </div>
  );
};
