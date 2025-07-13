import {
  usePaymentVoucherQuery,
  useUpdatePaymentVoucher,
} from "@/api/payment-vouchers.api";
import { useShipmentQuery } from "@/api/shipments.api";
import ErrorContainer from "@/components/ErrorContainer";
import PageLoader from "@/components/PageLoader";
import PaymentVouchersForm from "@/pages/payment-vouchers/components/PaymentVouchersForm";
import {
  PaymentVoucherSchema,
  paymentVoucherSchema,
} from "@/schemas/payment-voucher.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentVoucherUpdate } from "Api";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditPaymentVoucher = () => {
  const navigate = useNavigate();
  const { paymentVoucherId } = useParams();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<PaymentVoucherSchema>({
    resolver: zodResolver(paymentVoucherSchema),
  });

  const shipmentId = useWatch({ control, name: "shipment" });
  const { data: shipmentData } = useShipmentQuery(shipmentId);

  const { data, isLoading, error, refetch } =
    usePaymentVoucherQuery(paymentVoucherId);
  const { mutate, isPending } = useUpdatePaymentVoucher(paymentVoucherId);

  const onSubmit = handleSubmit((formData) => {
    const data: PaymentVoucherUpdate = {
      driver: shipmentData?.data?.driver?.id,
      origin_city: shipmentData?.data?.origin_city?.id,
      destination_city: shipmentData?.data?.destination_city?.id,
      client: shipmentData?.data?.client?.id,
      client_branch: shipmentData?.data?.client_branch?.id,
      recipient: shipmentData?.data?.recipient?.id,
      client_invoice_number: shipmentData?.data?.client_invoice_number,
      tracking_number: shipmentData?.data?.tracking_number,
      ...formData,
    };
    mutate(data, {
      onSuccess: () => {
        toast.success("تم تعديل سند الصرف بنجاح");
        navigate("/payment-vouchers");
      },
    });
  });

  useEffect(() => {
    if (data?.data && (data.data.shipment?.id === shipmentId || !shipmentId)) {
      const voucherData = data.data;
      setValue("shipment", voucherData.shipment?.id as number);
      setValue("note", voucherData.note ?? "");
      setValue("fare", voucherData.fare ?? undefined);
      setValue("premium", voucherData.premium ?? undefined);
      setValue("fare_return", voucherData.fare_return ?? undefined);
      setValue("days_stayed", voucherData.days_stayed ?? undefined);
      setValue("stay_cost", voucherData.stay_cost ?? undefined);
      setValue("deducted", voucherData.deducted ?? undefined);
      setValue("receiver_name", voucherData.receiver_name!);
      setValue("receiver_phone", voucherData.receiver_phone!);
      setValue("receiver_identity", voucherData.receiver_identity!);
    } else if (shipmentData?.data) {
      setValue("fare", shipmentData.data.fare);
      setValue("premium", shipmentData.data.premium || 0);
      setValue("fare_return", shipmentData.data.fare_return || 0);
      setValue("days_stayed", shipmentData.data.days_stayed || 0);
      setValue("stay_cost", shipmentData.data.stay_cost || 0);
      setValue("deducted", shipmentData.data.deducted || 0);
    }
  }, [data, setValue, shipmentData, shipmentId]);

  if (error) {
    return (
      <ErrorContainer
        error={error}
        onRetry={refetch}
        defaultMessage="حدث خطأ أثناء جلب بيانات سند الصرف"
      />
    );
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <PaymentVouchersForm
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      isLoading={isPending}
      control={control}
      setValue={setValue}
      isEdit
    />
  );
};

export default EditPaymentVoucher;
