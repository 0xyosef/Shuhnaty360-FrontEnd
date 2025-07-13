import {
  useShipmentQuery,
  useShipmentsInvoiceOptions,
  useShipmentsOptions,
} from "@/api/shipments.api";
import FormSectionWrapper from "@/components/FormSectionWrapper";
import ComboboxField from "@/components/ui/ComboboxField";
import FormButton from "@/components/ui/FormButton";
import PhoneInputField from "@/components/ui/PhoneInputField";
import StayCostInputField from "@/components/ui/StayCostInputField";
import TextInputField from "@/components/ui/TextInputField";
import { PaymentVoucherSchema } from "@/schemas/payment-voucher.schema";
import { useEffect } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

type PaymentVouchersFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<PaymentVoucherSchema>;
  isLoading: boolean;
  errors: FieldErrors<PaymentVoucherSchema>;
  control: Control<PaymentVoucherSchema>;
  setValue: UseFormSetValue<PaymentVoucherSchema>;
  isEdit?: boolean;
};

const PaymentVouchersForm = ({
  onSubmit,
  register,
  isLoading,
  errors,
  control,
  setValue,
  isEdit,
}: PaymentVouchersFormProps) => {
  const {
    data: shipmentsData,
    isLoading: isLoadingShipments,
    hasNextPage: shipmentsHaveNextPage,
    ref: shipmentsRef,
    setSearch: setShipmentSearch,
  } = useShipmentsOptions();

  const {
    data: invoiceData,
    isLoading: isLoadingInvoices,
    hasNextPage: invoicesHaveNextPage,
    ref: invoicesRef,
    setSearch: setInvoiceSearch,
  } = useShipmentsInvoiceOptions();

  const [fare, premium, stay_cost, days_stayed, deducted, fare_return, ship] =
    useWatch({
      control,
      name: [
        "fare",
        "premium",
        "stay_cost",
        "days_stayed",
        "deducted",
        "fare_return",
        "shipment",
      ],
    });

  const { data: shipmentDetails } = useShipmentQuery(ship);

  useEffect(() => {
    if (shipmentDetails?.data) {
      setValue("receiver_name", shipmentDetails.data.driver?.name as string);
      setValue(
        "receiver_identity",
        shipmentDetails.data.driver?.identity_number as string,
      );
      setValue(
        "receiver_phone",
        shipmentDetails.data.driver?.phone_number as string,
      );
    }
  }, [shipmentDetails?.data, setValue]);

  const total =
    Number(fare || 0) +
    Number(premium || 0) +
    Number(stay_cost || 0) * Number(days_stayed || 0) -
    Number(deducted || 0) +
    Number(fare_return || 0);

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="border border-[#DD7E1F] bg-white rounded-lg p-8 mx-4 md:mx-0"
      >
        <FormSectionWrapper title="الشحنة">
          <ComboboxField
            name="shipment"
            control={control}
            options={shipmentsData?.items || []}
            isLoading={isLoadingShipments}
            hasNextPage={shipmentsHaveNextPage}
            ref={shipmentsRef}
            onSearch={setShipmentSearch}
            setValue={setValue}
            label="الشحنة"
            error={errors.shipment?.message}
          />
          <ComboboxField
            name="shipment"
            control={control}
            options={invoiceData?.items || []}
            isLoading={isLoadingInvoices}
            hasNextPage={invoicesHaveNextPage}
            ref={invoicesRef}
            label="رقم الفاتورة"
            onSearch={setInvoiceSearch}
            error={errors.shipment?.message}
            setValue={setValue}
          />
        </FormSectionWrapper>
        <FormSectionWrapper title="المستلم">
          <TextInputField
            label="المستلم"
            {...register("receiver_name")}
            error={errors.receiver_name?.message}
          />
          <PhoneInputField
            label="رقم المستلم"
            name="receiver_phone"
            control={control}
            value={shipmentDetails?.data.driver?.phone_number}
            error={errors.receiver_phone?.message}
          />
          <TextInputField
            label="رقم الهوية"
            type="number"
            error={errors.receiver_identity?.message}
            {...register("receiver_identity")}
          />
        </FormSectionWrapper>
        <FormSectionWrapper title="التكلفة">
          <TextInputField
            label="التكلفة الأساسية"
            {...register("fare", { valueAsNumber: true })}
            type="number"
            error={errors.fare?.message}
          />
          <TextInputField
            label="الزيادة"
            {...register("premium", { valueAsNumber: true })}
            type="number"
            error={errors.premium?.message}
          />
          <TextInputField
            label="الأجرة المرتجعة"
            {...register("fare_return", { valueAsNumber: true })}
            type="number"
            error={errors.fare_return?.message}
          />
          <StayCostInputField
            control={control}
            register={register}
            errors={errors}
          />
          <TextInputField
            label="خصم"
            {...register("deducted", { valueAsNumber: true })}
            type="number"
            error={errors.deducted?.message}
          />
          <TextInputField
            label="ملاحظات"
            {...register("note")}
            error={errors.note?.message}
          />
          <div className="self-end mb-2">
            <p className="text-2xl font-bold">
              الإجمالي: <span className="font-normal">{total} ر.س</span>
            </p>
          </div>
        </FormSectionWrapper>

        <hr className="border-0 border-t-2 border-dashed border-[#666] my-12" />
        <div className="mt-8">
          <FormButton disabled={isLoading} className="w-full">
            {isEdit ? "تحديث سند الصرف" : "إضافة سند الصرف"}
          </FormButton>
        </div>
      </form>
    </>
  );
};

export default PaymentVouchersForm;
