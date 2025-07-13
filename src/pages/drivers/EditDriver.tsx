import ErrorContainer from "@/components/ErrorContainer";
import PageLoader from "@/components/PageLoader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useDriverQuery,
  useTruckTypesOptions,
  useUpdateDriver,
} from "../../api/drivers.api";
import DriverForm, {
  DriverFormData,
  driverSchema,
} from "./components/DriverForm";

const EditDriver = () => {
  const navigate = useNavigate();
  const { driverId } = useParams();

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm<DriverFormData>({
    resolver: zodResolver(driverSchema),
  });

  const {
    data: driverData,
    isLoading,
    error,
    refetch,
  } = useDriverQuery(driverId);

  const { data: truckTypesRes } = useTruckTypesOptions();

  const truckType = truckTypesRes?.items.find(
    (type) => type.label === driverData?.data?.truck_type,
  )?.value;

  const { mutate } = useUpdateDriver(driverId);

  const onSubmit = handleSubmit((formData: DriverFormData) => {
    mutate(formData, {
      onSuccess: () => {
        navigate("/drivers");
        toast.success("تم تعديل السائق بنجاح");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.detail || "حدث خطأ أثناء تعديل السائق",
        );
      },
    });
  });

  console.log(driverData?.data);

  useEffect(() => {
    if (driverData?.data) {
      setValue("name", driverData.data.name);
      setValue("phone_number", driverData.data.phone_number);
      setValue("identity_number", driverData.data.identity_number);
      setValue("truck_type", truckType);
      setValue("status", driverData.data.status);
      setValue("is_active", driverData.data.is_active);
      setValue("language", driverData.data.language);
      setValue("nationality", driverData.data.nationality);
      setValue("vehicle_number", driverData.data.vehicle_number);
    }
  }, [driverData, register, setValue, truckType]);

  if (error) {
    return (
      <ErrorContainer
        error={error}
        onRetry={refetch}
        defaultMessage="حدث خطأ أثناء جلب بيانات السائق"
      />
    );
  }

  return (
    <>
      {isLoading && <PageLoader />}
      <Suspense fallback={<PageLoader />}>
        <DriverForm
          key={truckType}
          isEdit
          onSubmit={onSubmit}
          isLoading={isLoading}
          register={register}
          setValue={setValue}
          errors={errors}
          control={control}
        />
      </Suspense>
    </>
  );
};

export default EditDriver;
