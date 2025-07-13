import {
  useApprovePaymentVoucher,
  usePaymentVoucherQuery,
} from "@/api/payment-vouchers.api";
import ErrorContainer from "@/components/ErrorContainer";
import PageLoader from "@/components/PageLoader";
import usePrivilege from "@/hooks/usePrivilege";
import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import { PaymentVoucherRejectionSchema } from "@/schemas/payment-voucher.schema";
import { Printer } from "lucide-react";
import PaymentVoucherRejectionDialog from "./components/PaymentVoucherRejectionDialog";
import PrintableVoucher from "./components/PrintableVoucher";

const PaymentVoucherDetails = () => {
  const { paymentVoucherId } = useParams<{ paymentVoucherId: string }>();
  const { can } = usePrivilege();
  const [rejectionDialog, setRejectionDialog] = useState(false);

  const {
    data: voucherData,
    isLoading,
    error: voucherError,
    refetch: refetchVoucher,
  } = usePaymentVoucherQuery(paymentVoucherId);

  const { mutate, isPending } = useApprovePaymentVoucher(paymentVoucherId);

  const voucher = voucherData?.data;

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    onBeforePrint: async () => document.body.classList.add("is-printing"),
    onAfterPrint: () => document.body.classList.remove("is-printing"),
  });

  if (voucherError) {
    return (
      <ErrorContainer
        error={voucherError}
        onRetry={() => {
          if (voucherError) refetchVoucher();
        }}
        defaultMessage="حدث خطأ أثناء جلب بيانات سند الصرف"
      />
    );
  }

  const basicInfo = [
    { label: "", value: "" },
    { label: "رقم سند الصرف", value: voucher?.id || "-" },
    { label: "رقم الشحنة", value: voucher?.shipment?.id || "-" },
    {
      label: "تاريخ الإنشاء",
      value: voucher?.created_at
        ? new Date(voucher.created_at).toLocaleDateString("ar-EG")
        : "-",
    },
    {
      label: "آخر تحديث",
      value: voucher?.updated_at
        ? new Date(voucher.updated_at).toLocaleDateString("ar-EG")
        : "-",
    },
    {
      label: "حالة الاعتماد",
      value:
        voucher?.approval_status === "approved"
          ? "معتمد"
          : voucher?.approval_status === "rejected"
            ? "مرفوض"
            : "بانتظار الاعتماد",
      className:
        voucher?.approval_status === "approved"
          ? "text-green-600"
          : voucher?.approval_status === "rejected"
            ? "text-red-600"
            : "text-amber-600",
    },
    ...(voucher?.approval_status === "rejected"
      ? [{ label: "سبب الرفض", value: voucher?.rejection_reason || "-" }]
      : []),
    ...(voucher?.reviewed_by
      ? [{ label: "معتمد من قبل", value: voucher?.reviewed_by || "-" }]
      : []),
    {
      label: "من",
      value: voucher?.shipment?.origin_city?.ar_city || "-",
    },
    {
      label: "إلى",
      value: voucher?.shipment?.destination_city?.ar_city || "-",
    },
    { label: "المستلم", value: voucher?.receiver_name || "-" },
    { label: "المندوب", value: voucher?.created_by || "-" },
    { label: "المحاسب", value: voucher?.reviewed_by || "-" },
  ];

  const driverInfo = [
    { label: "اسم السائق", value: voucher?.shipment?.driver?.name || "-" },
    {
      label: "نوع السيارة",
      value: voucher?.shipment?.truck_type?.name_ar || "-",
    },
    {
      label: "رقم السيارة",
      value: voucher?.shipment?.driver?.vehicle_number || "-",
    },
    {
      label: "رقم الهاتف",
      value: voucher?.shipment?.driver?.phone_number || "-",
    },
  ];

  const senderInfo = [
    { label: "اسم المرسل", value: voucher?.shipment?.client?.name || "-" },
    { label: "العنوان", value: voucher?.shipment?.client?.address || "-" },
    { label: "الفرع", value: voucher?.shipment?.client_branch?.name || "-" },
    {
      label: "رقم الفاتورة",
      value: voucher?.shipment?.client_invoice_number || "-",
    },
  ];

  const recipientInfo = [
    { label: "اسم المستلم", value: voucher?.shipment?.recipient?.name || "-" },
    { label: "العنوان", value: voucher?.shipment?.recipient?.address || "-" },
    {
      label: "بيانات التواصل",
      value: voucher?.shipment?.recipient?.phone_number || "-",
    },
  ];

  const financialInfo = [
    { label: "التكلفة الأساسية", value: `${voucher?.fare || 0} ر.س` },
    { label: "الزيادة", value: `${voucher?.premium || 0} ر.س` },
    {
      label: `تكلفة المبيت (${voucher?.days_stayed || 0} ليلة)`,
      value: `${Number(voucher?.days_stayed || 0) * Number(voucher?.shipment?.stay_cost || 0) || 0} ر.س`,
    },
    {
      label: "ايجار رجعة",
      value: `${voucher?.fare_return || 0} ر.س`,
    },
    { label: "الخصم", value: `${voucher?.deducted || 0} ر.س` },
    { label: "الإجمالي", value: `${voucher?.total_cost || 0} ر.س` },
  ];

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="mx-4">
      {voucher && (
        <>
          <PrintableVoucher
            ref={printRef}
            voucher={voucher}
            shipment={voucher.shipment!}
          />
          <Card>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold font-Almarai">
                تفاصيل سند الصرف
              </h1>
              <div className="flex items-center gap-2">
                {can("payment-vouchers:approve") &&
                  voucher?.approval_status === "pending" && (
                    <div className="flex gap-2 border-e-2 border-[#E1E1E1] px-2">
                      <Button
                        disabled={isPending}
                        onClick={() => {
                          mutate({
                            id: voucher.id!,
                            approval_status: "approved",
                            rejection_reason: "",
                          });
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      >
                        اعتماد
                      </Button>
                      <Button
                        disabled={isPending}
                        onClick={() => setRejectionDialog(true)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        رفض
                      </Button>
                    </div>
                  )}
                {voucher.approval_status === "approved" ? (
                  <Button
                    onClick={handlePrint}
                    className="bg-[#DD7E1F] hover:bg-[#c96e19] text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Printer className="size-5" />
                    طباعة
                  </Button>
                ) : (
                  <Button>
                    <Link to={`/payment-vouchers/edit/${paymentVoucherId}`}>
                      تعديل
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <InfoSection
              title="البينات الأساسية"
              data={basicInfo}
              className="mb-8 md:grid grid-cols-2"
            />
            <hr className="border-0 border-t-2 border-dashed border-[#666666] my-8" />

            <InfoSection title="السائق" data={driverInfo} className="mb-8" />
            <hr className="border-0 border-t-2 border-dashed border-[#666666] my-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <InfoSection title="بيانات المرسل" data={senderInfo} />
              <InfoSection title="بيانات المستلم" data={recipientInfo} />
            </div>
            <hr className="border-0 border-t-2 border-dashed border-[#666666] my-8" />
            <div className="w-full p-6 bg-[#FCF2E9] rounded-lg">
              <h1 className="text-2xl text-center sm:text-start font-bold font-Almarai text-[#DD7E1F]">
                التكلفة
              </h1>
              <hr className="border-0 border-t-2 border-dashed border-[#B3B3B3] my-6" />{" "}
              <div className="flex flex-col items-start gap-2 my-6 w-full font-Rubik text-[#333333] font-bold xs:text-sm text-lg">
                {financialInfo.map((item, index) => (
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
                  {voucher?.total_cost || "0"} ر.س
                </span>
              </div>
            </div>
          </Card>
        </>
      )}
      <PaymentVoucherRejectionDialog
        open={rejectionDialog}
        onOpenChange={setRejectionDialog}
        isLoading={isPending}
        onSubmit={(data: PaymentVoucherRejectionSchema) => {
          if (!voucher?.id) return;
          mutate(
            {
              id: voucher.id,
              approval_status: "rejected",
              rejection_reason: data.rejection_reason,
            },
            {
              onSuccess: () => {
                setRejectionDialog(false);
              },
            },
          );
        }}
      />
    </div>
  );
};

export default PaymentVoucherDetails;

const InfoSection = ({
  dir,
  title,
  data,
  className = "",
}: {
  dir?: "rtl" | "ltr";
  title: string;
  data: { label: string; value: React.ReactNode; className?: string }[];
  className?: string;
}) => (
  <div dir={dir} className={`flex flex-col gap-1 ${className}`}>
    <h2 className="text-xl font-bold font-Almarai text-[#333333]">{title}</h2>
    {data.map((item, index) => (
      <div
        key={index}
        className={`flex items-center gap-2 ${index === 0 ? "mt-6" : "mt-4"}`}
      >
        <span className="text-[#666666]">{item.label}:</span>
        <span className={item.className || "font-semibold text-[#333333]"}>
          {item.value}
        </span>
      </div>
    ))}
  </div>
);
