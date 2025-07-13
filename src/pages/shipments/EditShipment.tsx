import ErrorContainer from "@/components/ErrorContainer";
import PageLoader from "@/components/PageLoader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useShipmentQuery, useUpdateShipment } from "../../api/shipments.api";
import {
  shipmentSerializerSchema,
  ShipmentSerializerSchema,
} from "../../schemas/shipment.schema";
import { formateDateTime } from "../../utils/formatDate";
import ShipmentsForm from "./components/ShipmentsForm";

const EditShipment = () => {
  const navigate = useNavigate();
  const { shipmentId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ShipmentSerializerSchema>({
    resolver: zodResolver(shipmentSerializerSchema),
  });

  const { data, isLoading, error, refetch } = useShipmentQuery(shipmentId);

  const { mutate, isPending } = useUpdateShipment(shipmentId);

  const onSubmit = handleSubmit((formData) => {
    mutate(
      {
        ...formData,
      },
      {
        onSuccess: () => {
          toast.success("تم تعديل الشحنة بنجاح");
          navigate("/shipments/all");
        },
      },
    );
  });

  useEffect(() => {
    if (data?.data) {
      const shipmentData = data.data;
      setValue("driver", shipmentData.driver?.id as number);
      setValue(
        "driver_phone_number",
        shipmentData.driver_phone_number as string,
      );
      setValue("vehicle_number", shipmentData.vehicle_number as string);
      setValue("truck_type", shipmentData.truck_type?.id as number);
      setValue("client", shipmentData.client?.id as number);
      setValue("client_branch", shipmentData.client_branch?.id as number);
      setValue("client_invoice_number", shipmentData.client_invoice_number);
      setValue("loading_date", formateDateTime(shipmentData.loading_date!)!);
      setValue(
        "expected_arrival_date",
        formateDateTime(shipmentData.expected_arrival_date!)!,
      );
      setValue(
        "actual_delivery_date",
        formateDateTime(shipmentData.actual_delivery_date!)!,
      );
      setValue("origin_city", shipmentData.origin_city?.id as number);
      setValue("destination_city", shipmentData.destination_city?.id as number);
      setValue("contents", shipmentData.contents);
      setValue("notes", shipmentData.notes);
      setValue("status", shipmentData.status?.id as number);
      setValue("fare", shipmentData.fare || 0);
      setValue("deducted", shipmentData.deducted);
      setValue("days_stayed", shipmentData.days_stayed);
      setValue("days_to_arrive", shipmentData.days_to_arrive);
      setValue("fare_return", shipmentData.fare_return);
      setValue("recipient", shipmentData.recipient?.id as number);
      setValue("stay_cost", shipmentData.stay_cost);
      setValue("weight", shipmentData.weight);
      setValue("premium", shipmentData.premium);
    }
  }, [data, setValue]);

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
      <ShipmentsForm
        onSubmit={onSubmit}
        register={register}
        setValue={setValue}
        errors={errors}
        isLoading={isPending}
        control={control}
      />
    </>
  );
};

export default EditShipment;
