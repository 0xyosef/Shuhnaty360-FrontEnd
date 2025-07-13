import PageLoader from "@/components/PageLoader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateRecipient } from "../../api/recipients.api";
import RecipientForm from "../../components/RecipientForm";
import {
  recipientSerializerSchema,
  RecipientSerializerSchema,
} from "../../schemas/recipient.schema";

const AddRecipient = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
  } = useForm<RecipientSerializerSchema>({
    resolver: zodResolver(recipientSerializerSchema),
  });

  const { mutate, isPending: isLoading } = useCreateRecipient();

  const onSubmit = handleSubmit((formData: RecipientSerializerSchema) => {
    mutate(formData, {
      onSuccess: () => {
        toast.success("تم إضافة العميل بنجاح");
        navigate("/recipients");
      },
    });
  });

  return (
    <Suspense fallback={<PageLoader />}>
      <RecipientForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        register={register}
        control={control}
        errors={errors}
        setValue={setValue}
      />
    </Suspense>
  );
};

export default AddRecipient;
