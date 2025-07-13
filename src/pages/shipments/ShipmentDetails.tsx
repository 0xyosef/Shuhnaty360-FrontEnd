import ErrorContainer from "@/components/ErrorContainer";
import PageLoader from "@/components/PageLoader";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/utils/formatDate";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useShipmentQuery,
  useUpdateShipmentStatus,
} from "../../api/shipments.api";
import deleteShipmentIcon from "../../assets/images/delete-shipment-icon.svg";
import editShipmentIcon from "../../assets/images/edit-shipment-icon.svg";
import ActionsMenu from "../../components/actionsMenu/ActionsMenu";
import PrintWaybillDialog from "../../components/shipments/shipment/PrintWaybillDialog";
import ShipmentDetailsInfoSection from "../../components/shipments/shipmentDetails/infoSection/ShipmentDetailsInfoSection";
import ShipmentStatus from "../../components/shipments/shipmentDetails/shipmentStatus/ShipmentStatus";
import ShipmentStatusSelect from "./components/ShipmentStatusSelect";

const ShipmentDetails = () => {
  const { shipmentId } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data, isLoading, error, refetch } = useShipmentQuery(shipmentId);
  const { mutate } = useUpdateShipmentStatus(shipmentId);

  const shipment = data?.data;

  const totalStayConst =
    Number(shipment?.days_stayed) * Number(shipment?.stay_cost);

  const menuActions = [
    {
      label: "تعديل الشحنة",
      icon: editShipmentIcon,
      path: `/shipments/edit-shipment/${shipmentId}`,
      privilege: "shipments:edit",
    },
    {
      label: "حذف الشحنة",
      icon: deleteShipmentIcon,
      path: `/shipments/delete-shipment/${shipmentId}`,
      privilege: "shipments:delete",
    },
  ];

  const clientData = [
    { label: "الاسم", value: shipment?.client?.name || "-" },
    { label: "العنوان", value: shipment?.client?.address || "-" },
    { label: "الفرع", value: shipment?.client_branch?.name || "-" },
    { label: "الفرع", value: "-" },
  ];

  const recipientData = [
    { label: "الاسم", value: shipment?.recipient?.name || "-" },
    { label: "العنوان", value: shipment?.recipient?.address || "-" },
    {
      label: "بيانات التواصل",
      value: shipment?.recipient?.phone_number || "-",
    },
  ];

  const driverData = [
    { label: "الاسم", value: shipment?.driver?.name || "-" },
    { label: "نوع الشاحنة", value: shipment?.truck_type?.name_ar || "-" },
    { label: "رقم الشاحنة", value: shipment?.driver?.vehicle_number || "-" },
  ];

  const shipmentData = [
    { label: "رقم التتبع", value: shipment?.tracking_number || "-" },
    { label: "من", value: shipment?.origin_city?.ar_city || "-" },
    { label: "الى", value: shipment?.destination_city?.ar_city || "-" },
    { label: "المحتويات", value: shipment?.contents || "-" },
    { label: "الوزن", value: shipment?.weight || "-" },
    { label: "عدد ايام المبيت", value: shipment?.days_stayed || 0 },
  ];

  const shipmentCost = [
    {
      label: "التكلفة الأساسية",
      value: `${shipment?.fare || "0"} ر.س`,
    },
    {
      label: "الزيادة ",
      value: `${shipment?.premium || "0"} ر.س`,
    },
    {
      label: `تكلفة المبيت (${shipment?.days_stayed || "0"} ليلة)`,
      value: `${totalStayConst || "0"} ر.س`,
    },
    {
      label: "ايجار رجعة",
      value: `${shipment?.fare_return || 0} ر.س`,
    },
    {
      label: "الزيادة",
      value: `${shipment?.premium || "0"} ر.س`,
    },
    {
      label: "الخصم",
      value: `${shipment?.deducted || "0"} ر.س`,
    },
  ];

  if (error) {
    return (
      <ErrorContainer
        error={error}
        onRetry={refetch}
        defaultMessage="حدث خطأ أثناء جلب بيانات الشحنة"
      />
    );
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <Card>
        <div className="grid xs:grid-cols-10 grid-cols-12 gap-8">
          <div className={`xs:col-span-10 col-span-12 lg:col-span-9`}>
            <div className="absolute -left-8 top-0 bottom-0 w-px bg-[#B3B3B3] hidden lg:block"></div>
            <div className="flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl font-bold">السائق</h1>
              <div className="flex items-center gap-2">
                {(user?.id === shipment?.user?.id || user?.is_superuser) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      sessionStorage.setItem(
                        "shipmentId",
                        shipment?.id?.toString() || "",
                      );
                      navigate("/payment-vouchers/add");
                    }}
                  >
                    إضافة سند
                  </Button>
                )}
                <ShipmentStatusSelect
                  status={shipment?.status?.name_ar || ""}
                  onStatusChange={(status) => {
                    mutate({
                      id: shipment?.id || 0,
                      status: status.id,
                      status_name: status.name_ar,
                    });
                  }}
                />
                <ActionsMenu options={menuActions} position="top-16 left-4" />
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 font-Rubik text-[#333333] text-base">
              <ShipmentDetailsInfoSection data={driverData} />
            </div>
            <hr className="border-0 border-t-2 border-dashed border-[#666666] my-12" />{" "}
            <div className="grid grid-cols-1 gap-8 lg:gap-0 lg:grid-cols-2 font-Rubik text-[#333333]">
              <ShipmentDetailsInfoSection
                title="بيانات المرسل"
                data={clientData}
              />
              <ShipmentDetailsInfoSection
                title="بيانات المستلم"
                data={recipientData}
              />
            </div>
            <hr className="border-0 border-t-2 border-dashed border-[#666666] my-12" />{" "}
            <div>
              <ShipmentDetailsInfoSection
                title="تفاصيل الشحنة"
                data={shipmentData}
              />
              <div className="bg-[#F8F8F8] w-full rounded-lg py-4 px-3 flex flex-col items-start gap-2 font-Rubik text-[#333333] border border-[#CCC] mt-6 mb-12 xs:text-base text-lg font-medium">
                {[
                  "يرجى التأكد من الشراع الثقيل",
                  `يرجى تسليم الشحنة بموعد ${shipment?.loading_date ? formatDate(shipment.loading_date) : "-"}`,
                  "تأكد من إرجاع جهاز الحرارة",
                  "يتم تسليم الفاتوره أو تصويرها فور التنزيل",
                  "يتم خصم ١٠٪ في حالم لم يتم تصوير الفاتوره أو تصويرها في الوقت المحدد",
                ].map((item, index) => (
                  <span key={index}>- {item}</span>
                ))}
              </div>
              <div className="w-full p-6 bg-[#FCF2E9] rounded-lg">
                <h1 className="text-2xl text-center sm:text-start font-bold font-Almarai text-[#DD7E1F]">
                  تكلفة الشحنة
                </h1>
                <hr className="border-0 border-t-2 border-dashed border-[#B3B3B3] my-6" />{" "}
                <div className="flex flex-col items-start gap-2 my-6 w-full font-Rubik text-[#333333] font-bold xs:text-sm text-lg">
                  {shipmentCost.map((item, index) => (
                    <div
                      key={index}
                      className="w-full flex justify-between items-center"
                    >
                      <span className="">{item.label}</span>{" "}
                      <span className="">{item.value}</span>
                    </div>
                  ))}
                </div>
                <hr className="border-0 border-t-2 border-dashed border-[#666666]" />{" "}
                <div className="w-full flex justify-between items-center mt-6 font-Rubik text-[#333333] font-bold xs:text-base text-lg">
                  <span>الإجمالي</span>{" "}
                  <span className="xs:text-nowrap">
                    {shipment?.total_cost || "0"} ر.س
                  </span>
                </div>
              </div>
              <div className="my-10 w-full flex flex-col gap-2 sm:flex-row sm:gap-0 justify-center items-center font-Rubik text-[#666666] text-xl sm:text-2xl">
                <span>المندوب المسئول:</span>
                <span>
                  {shipment?.user?.first_name} {shipment?.user?.last_name}
                </span>
              </div>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="w-full text-center text-xl sm:text-2xl  rounded-lg py-3 text-[#FCFCFC] bg-[#DD7E1F]"
              >
                طباعة البوليصة
              </button>
            </div>
          </div>

          {shipment?.history && shipment?.history?.length > 0 ? (
            <div className="xs:col-span-10 col-span-12 lg:col-span-3">
              <ShipmentStatus history={shipment.history} />
            </div>
          ) : (
            <div className={`mt-4 xs:col-span-10 col-span-12 lg:col-span-3`}>
              {" "}
              <h1 className="text-center font-Rubik font-medium">
                تقرير الشحنة غير متوفر
              </h1>
            </div>
          )}
        </div>
      </Card>
      {shipment && (
        <PrintWaybillDialog
          shipment={shipment}
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
        />
      )}
    </>
  );
};

export default ShipmentDetails;
