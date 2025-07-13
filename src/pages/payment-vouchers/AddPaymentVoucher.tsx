import { useCreatePaymentVoucher } from "@/api/payment-vouchers.api";
import { useShipmentQuery } from "@/api/shipments.api";
import PaymentVouchersForm from "@/pages/payment-vouchers/components/PaymentVouchersForm";
import {
  PaymentVoucherSchema,
  paymentVoucherSchema,
} from "@/schemas/payment-voucher.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentVoucherCreate } from "Api";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddPaymentVoucher = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<PaymentVoucherSchema>({
    resolver: zodResolver(paymentVoucherSchema),
  });
  const shipmentId = useWatch({ control, name: "shipment" });
  const { data: shipmentData } = useShipmentQuery(shipmentId);

  const { mutate, status } = useCreatePaymentVoucher();

  const onSubmit = handleSubmit((formData) => {
    const data: PaymentVoucherCreate = {
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
        navigate("/payment-vouchers");
      },
    });
  });

  useEffect(() => {
    if (shipmentData?.data) {
      setValue("fare", shipmentData.data.fare);
      setValue("premium", shipmentData.data.premium || 0);
      setValue("fare_return", shipmentData.data.fare_return || 0);
      setValue("days_stayed", shipmentData.data.days_stayed || 0);
      setValue("stay_cost", shipmentData.data.stay_cost || 0);
      setValue("deducted", shipmentData.data.deducted || 0);
    }
  }, [setValue, shipmentData]);

  useEffect(() => {
    const shipmentTempId = sessionStorage.getItem("shipmentId");
    if (shipmentTempId) {
      setValue("shipment", Number(shipmentTempId));
    }
    sessionStorage.removeItem("shipmentId");
  }, [setValue]);

  return (
    <PaymentVouchersForm
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      isLoading={status === "pending"}
      control={control}
      setValue={setValue}
    />
  );
};

export default AddPaymentVoucher;
