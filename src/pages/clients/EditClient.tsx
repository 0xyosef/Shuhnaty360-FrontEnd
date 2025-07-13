import ErrorContainer from "@/components/ErrorContainer";
import PageLoader from "@/components/PageLoader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useClientQuery, useUpdateClient } from "../../api/clients.api";
import ClientForm, {
  ClientFormData,
  clientSchema,
} from "./components/ClientForm";

const EditClient = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  const { data, isLoading, error, refetch } = useClientQuery(clientId);

  const { mutate, isPending: isUpdating } = useUpdateClient(clientId);

  const onSubmit = handleSubmit((formData: ClientFormData) => {
    mutate(formData, {
      onSuccess: () => {
        toast.success("تم تعديل العميل بنجاح");
        navigate("/clients");
      },
    });
  });

  useEffect(() => {
    if (data?.data) {
      const client = data.data;
      setValue("name", client.name);
      setValue("email", client.email);
      setValue("address", client.address);
      setValue(
        "Commercial_registration_number",
        client.Commercial_registration_number,
      );
      setValue("dicription", client.dicription);
      setValue("phone_number", client.phone_number);
      setValue("second_phone_number", client.second_phone_number);
    }
  }, [data, setValue]);

  if (error) {
    return (
      <ErrorContainer
        error={error}
        onRetry={refetch}
        defaultMessage="حدث خطأ أثناء جلب بيانات العميل"
      />
    );
  }

  return (
    <>
      {isLoading && <PageLoader />}
      <ClientForm
        onSubmit={onSubmit}
        isLoading={isUpdating}
        register={register}
        control={control}
        errors={errors}
      />
    </>
  );
};

export default EditClient;
