import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateClient } from "../../api/clients.api";
import ClientForm, {
  ClientFormData,
  clientSchema,
} from "./components/ClientForm";

const AddClient = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  const { mutate, isPending: isLoading } = useCreateClient();

  const onSubmit = handleSubmit((formData: ClientFormData) => {
    mutate(formData, {
      onSuccess: () => {
        toast.success("تم إضافة العميل بنجاح");
        navigate("/clients");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.detail || "حدث خطأ أثناء إضافة العميل",
        );
      },
    });
  });

  return (
    <ClientForm
      onSubmit={onSubmit}
      isLoading={isLoading}
      register={register}
      control={control}
      errors={errors}
    />
  );
};

export default AddClient;
