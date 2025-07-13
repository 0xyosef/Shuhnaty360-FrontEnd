import PageLoader from "@/components/PageLoader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Branch, ClientBranchCreate } from "../../../../Api";
import {
  clientBranchSchema,
  useCreateClientBranch,
  useUpdateClientBranch,
} from "../../../api/clients.api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import ClientBranchForm from "./ClientBranchForm";

interface AddClientBranchDialogProps {
  initialData?: Branch | null;
  trigger?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddClientBranchDialog = ({
  initialData,
  trigger,
  isOpen,
  setIsOpen,
}: AddClientBranchDialogProps) => {
  const { clientId } = useParams<{ clientId: string }>();

  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<ClientBranchCreate>({
    resolver: zodResolver(clientBranchSchema),
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          ...initialData,
          client: Number(clientId),
          city: initialData.city.id,
        });
      } else {
        reset({
          name: "",
          address: "",
          name_address: "",
          phone_number: "",
          second_phone_number: "",
          client: Number(clientId),
        });
      }
    }
  }, [initialData, reset, clientId, isOpen]);

  const { mutate: createBranch, isPending: isCreating } =
    useCreateClientBranch();
  const { mutate: updateBranch, isPending: isUpdating } =
    useUpdateClientBranch();

  const onSubmit = (data: ClientBranchCreate) => {
    const mutationData = {
      ...data,
      id: initialData?.id,
    };

    const mutation = isEditMode ? updateBranch : createBranch;

    mutation(mutationData, {
      onSuccess: () => {
        setIsOpen(false);
        reset();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent dir="rtl" className="min-w-[90%]">
        <DialogHeader className="flex-row">
          <DialogTitle>
            {isEditMode ? "تعديل الفرع" : "إضافة فرع جديد"}
          </DialogTitle>
        </DialogHeader>
        <Suspense fallback={<PageLoader />}>
          <ClientBranchForm
            onSubmit={handleSubmit(onSubmit)}
            setValue={setValue}
            isLoading={isCreating || isUpdating}
            register={register}
            errors={errors}
            control={control}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientBranchDialog;
