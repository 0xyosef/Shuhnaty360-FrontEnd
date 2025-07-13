import ErrorContainer from "@/components/ErrorContainer";
import PageLoader from "@/components/PageLoader";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useClientQuery, useDeleteClient } from "../../api/clients.api";
import DeleteItemCard from "../../components/shipments/deleteItem/DeleteItemCard";
import DeleteItemDialog from "../../components/shipments/deleteItem/deleteItemDialog";

const DeleteClient = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { clientId } = useParams();

  const {
    data: clientRes,
    isLoading: isClientDataLoading,
    error,
    refetch,
  } = useClientQuery(clientId);

  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteClient();

  if (!clientId) {
    navigate("/clients");
    return null;
  }

  if (error) {
    return (
      <ErrorContainer
        error={error}
        onRetry={refetch}
        defaultMessage="حدث خطأ أثناء جلب بيانات العميل"
      />
    );
  }

  const client = clientRes?.data;

  const handleDeleteItemClick = () => {
    deleteMutate(undefined, {
      onSuccess: () => {
        toast.success("تم حذف العميل بنجاح");
        navigate("/clients");
      },
      onError: (e: any) => {
        console.log(e);
        toast.error(
          e?.response?.data?.detail || e?.message || "حدث خطأ أثناء حذف العميل",
        );
      },
    });
  };

  return (
    <>
      {(isDeleting || isClientDataLoading) && <PageLoader />}
      <div className="flex flex-col gap-20">
        <div className="border border-[#DD7E1F] rounded-lg px-6 pt-10 pb-4 mx-4 md:mx-0">
          <div className="w-full flex justify-between items-center relative">
            <div className="flex flex-col gap-2">
              {[
                { label: "الاسم", value: client?.name },
                { label: "العنوان", value: client?.address },
              ].map((item, index) => (
                <div
                  className="flex gap-2 font-medium text-base font-Rubik"
                  key={index}
                >
                  <span>{item.label}: </span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <h1 className="mt-10 mb-4 bg-[#FCF2E9] font-md font-Rubik text-lg text-[#1A1A1A] p-3 rounded-md">
            {client?.dicription}
          </h1>
        </div>
        <div className="flex justify-center items-start h-[70vh] mx-4">
          <DeleteItemCard
            handleDeleteButtonClick={() => setIsDialogOpen(true)}
          />
          <DeleteItemDialog
            label="هل أنت متأكد من حذف العميل"
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            handleDeleteItemClick={handleDeleteItemClick}
          />
        </div>
      </div>
    </>
  );
};

export default DeleteClient;
