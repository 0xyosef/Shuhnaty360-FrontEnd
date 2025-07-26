import PageLoader from "@/components/PageLoader";
import { ApiResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DriverList } from "Api";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateDriver } from "../../api/drivers.api";
import DriverForm, {
  DriverFormData,
  driverSchema,
} from "./components/DriverForm";

const AddDriver = ({
  onCreate,
}: {
  onCreate?: (data: ApiResponse<DriverList>) => void;
}) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<DriverFormData>({
    resolver: zodResolver(driverSchema),
  });

  const { mutate, isPending: isLoading } = useCreateDriver();

  const onSubmit = handleSubmit((formData: DriverFormData) => {
    mutate(formData, {
      onSuccess: (data: ApiResponse<DriverList>) => {
        if (onCreate) {
          onCreate(data);
        } else {
          navigate("/drivers");
          toast.success("تم إضافة السائق بنجاح");
        }
      },
      onError: (error: any) => {
        console.error(error);
        toast.error(
          error?.response?.data?.detail || "حدث خطأ أثناء إضافة السائق",
        );
      },
    });
  });

  return (
    <Suspense fallback={<PageLoader />}>
      <DriverForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        setValue={setValue}
        register={register}
        errors={errors}
        control={control}
      />
    </Suspense>
  );
};

export default AddDriver;
