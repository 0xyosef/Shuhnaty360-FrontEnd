import {
  useDriverQuery,
  useDriversOptions,
  useTruckTypesOptions,
} from "@/api/drivers.api";
import { useShipmentQuery } from "@/api/shipments.api";
import ComboboxField from "@/components/ui/ComboboxField";
import PhoneInputField from "@/components/ui/PhoneInputField";
import TextInputField from "@/components/ui/TextInputField";
import { ShipmentSerializerSchema } from "@/schemas/shipment.schema";
import { useEffect, useMemo } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { useParams } from "react-router-dom";
import FormSectionWrapper from "../../../components/FormSectionWrapper";

type ShipmentDriverSectionProps = {
  register: UseFormRegister<ShipmentSerializerSchema>;
  errors: FieldErrors<ShipmentSerializerSchema>;
  control: Control<ShipmentSerializerSchema>;
  setValue: UseFormSetValue<ShipmentSerializerSchema>;
};

const ShipmentDriverSection = ({
  register,
  errors,
  control,
  setValue,
}: ShipmentDriverSectionProps) => {
  const { shipmentId } = useParams();
  const { data: shipmentData } = useShipmentQuery(shipmentId);

  const selectedDriverId = useWatch({
    control,
    name: "driver",
  });

  const selectedDriver = shipmentData?.data
    ? {
        value: shipmentData.data.driver?.id as number,
        label: shipmentData.data.driver?.name,
      }
    : undefined;

  const selectedTruckType = shipmentData?.data
    ? {
        value: shipmentData.data.truck_type?.id as number,
        label: shipmentData.data.truck_type?.name_ar,
      }
    : undefined;

  const {
    data: drivers,
    isLoading: isLoadingDrivers,
    setSearch: setDriverSearch,
    hasNextPage: hasNextDriverPage,
    ref: driverRef,
  } = useDriversOptions();
  const {
    data: truckTypes,
    isLoading: isLoadingTruckTypes,
    setSearch: setTruckTypeSearch,
    hasNextPage: hasNextTruckTypePage,
    ref: truckTypeRef,
  } = useTruckTypesOptions();
  const { data: driverData } = useDriverQuery(selectedDriverId);

  const driverOptions = drivers?.items || [];
  const truckTypeOptions = useMemo(() => truckTypes?.items || [], [truckTypes]);

  useEffect(() => {
    if (selectedDriverId === shipmentData?.data.driver?.id) {
      setValue(
        "driver_phone_number",
        shipmentData?.data.driver_phone_number as string,
      );
      setValue("vehicle_number", shipmentData?.data.vehicle_number as string);
      setValue("truck_type", shipmentData?.data.truck_type?.id as number);
    } else if (driverData?.data) {
      setValue("driver_phone_number", driverData?.data.phone_number);
      setValue("vehicle_number", driverData?.data.vehicle_number);
      const truckType = truckTypeOptions.find(
        (type) => type.label === driverData?.data.truck_type,
      );
      setValue("truck_type", truckType?.value as number);
    }
  }, [selectedDriverId, setValue, truckTypeOptions, driverData, shipmentData]);

  return (
    <FormSectionWrapper title="السائق">
      <ComboboxField
        name="driver"
        label="الاسم"
        control={control}
        options={driverOptions}
        error={errors.driver?.message}
        isLoading={isLoadingDrivers}
        selectedOption={selectedDriver}
        hasNextPage={hasNextDriverPage}
        onSearch={setDriverSearch}
        setValue={setValue}
        ref={driverRef}
      />
      <PhoneInputField
        name="driver_phone_number"
        control={control}
        label="رقم الهاتف"
        error={errors.driver_phone_number?.message}
      />
      <TextInputField label="رقم الشاحنة" {...register("vehicle_number")} />
      <ComboboxField
        key={selectedDriverId}
        name="truck_type"
        label="نوع الشاحنة"
        control={control}
        options={truckTypeOptions}
        error={errors.truck_type?.message}
        isLoading={isLoadingTruckTypes}
        selectedOption={selectedTruckType}
        hasNextPage={hasNextTruckTypePage}
        onSearch={setTruckTypeSearch}
        setValue={setValue}
        ref={truckTypeRef}
      />
    </FormSectionWrapper>
  );
};

export default ShipmentDriverSection;
