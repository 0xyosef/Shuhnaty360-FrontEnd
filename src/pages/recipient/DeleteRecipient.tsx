import ErrorContainer from "@/components/ErrorContainer";
import PageLoader from "@/components/PageLoader";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useDeleteRecipient,
  useRecipientQuery,
} from "../../api/recipients.api";
import DeleteItemCard from "../../components/shipments/deleteItem/DeleteItemCard";
import DeleteItemDialog from "../../components/shipments/deleteItem/deleteItemDialog";

const DeleteRecipient = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { recipientId } = useParams();

  const {
    data: recipientData,
    isLoading,
    error,
    refetch,
  } = useRecipientQuery(recipientId as number | undefined);

  const { mutate, isPending: isDeleting } = useDeleteRecipient();

  const recipient = recipientData?.data;

  if (!recipientId) {
    navigate("/recipients");
    return null;
  }

  if (error) {
    return (
      <ErrorContainer
        error={error}
        onRetry={refetch}
        defaultMessage="حدث خطأ أثناء جلب بيانات المستلم"
      />
    );
  }

  const handleDeleteItemClick = () => {
    mutate(recipientId ? parseInt(recipientId) : undefined, {
      onSuccess: () => {
        toast.success("تم حذف العميل بنجاح");
        navigate("/recipients");
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
      {(isDeleting || isLoading) && <PageLoader />}
      <div className="flex flex-col gap-20">
        <div className="border border-[#DD7E1F] rounded-lg px-6 pt-10 pb-4 mx-4 md:mx-0">
          <div className="w-full flex justify-between items-center relative">
            <div className="flex flex-col gap-2">
              {[
                { label: "الاسم", value: recipient?.name },
                { label: "العنوان", value: recipient?.address },
                { label: "رقم الهاتف", value: recipient?.phone_number },
                {
                  label: "رقم الهاتف الثانوي",
                  value: recipient?.second_phone_number || "لا يوجد",
                },
                {
                  label: "البريد الإلكتروني",
                  value: recipient?.email || "لا يوجد",
                },
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
          {/* <h1 className="mt-10 mb-4 bg-[#FCF2E9] font-md font-Rubik text-lg text-[#1A1A1A] p-3 rounded-md">
            {recipient?.city}
          </h1> */}
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

export default DeleteRecipient;
