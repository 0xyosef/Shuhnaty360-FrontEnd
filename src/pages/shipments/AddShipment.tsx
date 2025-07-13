import PageLoader from "@/components/PageLoader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateShipment } from "../../api/shipments.api";
import {
  ShipmentSerializerSchema,
  shipmentSerializerSchema,
} from "../../schemas/shipment.schema";
import ShipmentsForm from "./components/ShipmentsForm";

const AddShipment = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ShipmentSerializerSchema>({
    resolver: zodResolver(shipmentSerializerSchema),
  });

  const { mutate, status } = useCreateShipment();

  const onSubmit = handleSubmit((formData) => {
    mutate(formData, {
      onSuccess: () => {
        toast.success("تم إضافة الشحنة بنجاح");
        navigate("/shipments/all");
      },
    });
  });

  return (
    <Suspense fallback={<PageLoader />}>
      <ShipmentsForm
        onSubmit={onSubmit}
        register={register}
        setValue={setValue}
        errors={errors}
        isLoading={status === "pending"}
        control={control}
      />
    </Suspense>
  );
};

export default AddShipment;
