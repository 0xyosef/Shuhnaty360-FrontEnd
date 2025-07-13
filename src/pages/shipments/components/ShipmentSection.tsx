import { useCitiesOptions } from "@/api/cities.api";
import {
  useShipmentQuery,
  useShipmentStatusOptions,
} from "@/api/shipments.api";
import ComboboxField from "@/components/ui/ComboboxField";
import DatePickerField from "@/components/ui/DatePickerField";
import TextAreaField from "@/components/ui/TextAreaField";
import TextInputField from "@/components/ui/TextInputField";
import { ShipmentSerializerSchema } from "@/schemas/shipment.schema";
import { useEffect, useMemo, useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { useParams } from "react-router-dom";
import FormSectionWrapper from "../../../components/FormSectionWrapper";

type ShipmentSectionProps = {
  register: UseFormRegister<ShipmentSerializerSchema>;
  control: Control<ShipmentSerializerSchema>;
  errors: FieldErrors<ShipmentSerializerSchema>;
  setValue: UseFormSetValue<ShipmentSerializerSchema>;
};

const ShipmentSection = ({
  register,
  control,
  errors,
  setValue,
}: ShipmentSectionProps) => {
  const { shipmentId } = useParams();
  const { data: shipmentData } = useShipmentQuery(shipmentId);

  const {
    data: cities,
    setSearch: setCitySearch,
    hasNextPage: hasNextCityPage,
    ref: cityRef,
    isLoading: isLoadingCities,
  } = useCitiesOptions();
  const {
    data: statuses,
    setSearch: setStatusSearch,
    hasNextPage: hasNextStatusPage,
    ref: statusRef,
    isLoading: isLoadingStatuses,
  } = useShipmentStatusOptions();

  const selectedStatus = useWatch({
    control,
    name: "status",
  });

  const [showActualDeliveryDate, setShowActualDeliveryDate] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [actualDeliveryDate, contents] = useWatch({
    control,
    name: ["actual_delivery_date", "contents"],
  });

  const hasActualDeliveryDate =
    !!actualDeliveryDate || !!errors.actual_delivery_date?.message;
  const hasContents = !!contents;

  const selectedOriginCity = shipmentData?.data
    ? {
        value: shipmentData.data.origin_city?.id as number,
        label: shipmentData.data.origin_city?.ar_city,
      }
    : undefined;

  const selectedDestinationCity = shipmentData?.data
    ? {
        value: shipmentData.data.destination_city?.id as number,
        label: shipmentData.data.destination_city?.ar_city,
      }
    : undefined;

  const selectedStatusOption = shipmentData?.data
    ? {
        value: shipmentData.data.status?.id as number,
        label: shipmentData.data.status?.name_ar,
      }
    : undefined;

  const cityOptions = useMemo(() => {
    return cities?.items || [];
  }, [cities]);

  const statusOptions = useMemo(() => {
    return statuses?.items || [];
  }, [statuses]);

  useEffect(() => {
    if (!selectedStatus) {
      const status = statusOptions.find((s) => s.label === "قيد الشحن");
      if (status) {
        setValue("status", status.value);
      }
      return;
    }
    const status = statusOptions.find(
      (status) => status.value === selectedStatus,
    );
    if (status) {
      setValue("status", status.value);
    }
  }, [selectedStatus, setValue, statusOptions]);

  useEffect(() => {
    setShowActualDeliveryDate(hasActualDeliveryDate || showActualDeliveryDate);
  }, [hasActualDeliveryDate, showActualDeliveryDate]);

  useEffect(() => {
    setShowContent(hasContents || showContent);
  }, [hasContents, showContent]);

  return (
    <FormSectionWrapper title="الشحنة">
      <ComboboxField
        name="origin_city"
        label="تحميل من"
        options={cityOptions}
        error={errors.origin_city?.message}
        control={control}
        onSearch={setCitySearch}
        setValue={setValue}
        isLoading={isLoadingCities}
        selectedOption={selectedOriginCity}
        hasNextPage={hasNextCityPage}
        ref={cityRef}
      />
      <ComboboxField
        name="destination_city"
        label="توصيل إلى"
        options={cityOptions}
        error={errors.destination_city?.message}
        control={control}
        onSearch={setCitySearch}
        setValue={setValue}
        isLoading={isLoadingCities}
        selectedOption={selectedDestinationCity}
        hasNextPage={hasNextCityPage}
        ref={cityRef}
      />
      <DatePickerField
        label="تاريخ التحميل"
        name="loading_date"
        error={errors.loading_date?.message}
        description="يتم تحديد تاريخ التحميل بشكل تلقائي حسب تاريخ اليوم، إذا كانت الشحنة تستلزم تاريخا محددا للتحميل يمكنك التعديل بناء عليه."
        control={control}
      />
      <DatePickerField
        label="تاريخ التسليم"
        name="expected_arrival_date"
        error={errors.expected_arrival_date?.message}
        description="أكّد مع المستلم التاريخ الدقيق للاستلام"
        control={control}
      />
      <TextInputField
        label="الوزن (بالطن)"
        type="number"
        error={errors.weight?.message}
        {...register("weight")}
        step={0.01}
      />
      <ComboboxField
        name="status"
        label="حالة الشحنة"
        options={statusOptions}
        error={errors.status?.message}
        control={control}
        onSearch={setStatusSearch}
        setValue={setValue}
        isLoading={isLoadingStatuses}
        selectedOption={selectedStatusOption}
        hasNextPage={hasNextStatusPage}
        ref={statusRef}
      />
      {showActualDeliveryDate ? (
        <>
          <DatePickerField
            label="تاريح استلام الشحنه"
            name="actual_delivery_date"
            error={errors.actual_delivery_date?.message}
            description="في حال استلم العميل الشحنه فقط يرجى ادخال تاريح استلام الشحنه"
            control={control}
          />
          <span />
        </>
      ) : (
        <button
          className="py-4 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4"
          type="button"
          onClick={() => setShowActualDeliveryDate(!showActualDeliveryDate)}
        >
          إضافة تاريخ استلام الشحنة
        </button>
      )}

      {showContent ? (
        <TextAreaField
          label="المحتويات"
          className="min-h-40"
          containerClassName="col-span-2"
          error={errors.contents?.message}
          {...register("contents")}
        />
      ) : (
        <button
          className="py-4 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4"
          type="button"
          onClick={() => setShowContent(!showContent)}
        >
          إضافة المحتويات
        </button>
      )}
    </FormSectionWrapper>
  );
};

export default ShipmentSection;
