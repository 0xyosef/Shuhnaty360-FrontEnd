import ErrorContainer from "@/components/ErrorContainer";
import PageLoader from "@/components/PageLoader";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDeleteShipment, useShipmentQuery } from "../../api/shipments.api";
import DeleteItemCard from "../../components/shipments/deleteItem/DeleteItemCard";
import DeleteItemDialog from "../../components/shipments/deleteItem/deleteItemDialog";
import ShipmentStatusOverview from "../../components/shipments/shipment/rejectShipment/ShipmentStatusOverview";

const DeleteShipment = () => {
  const navigate = useNavigate();
  const { shipmentId } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, error, refetch } = useShipmentQuery(shipmentId);
  const { mutate: deleteShipment, isPending } = useDeleteShipment();

  const shipment = data?.data;

  if (!shipmentId) {
    navigate("/shipments/all");
    return null;
  }

  if (error) {
    return (
      <ErrorContainer
        error={error}
        onRetry={refetch}
        defaultMessage="حدث خطأ أثناء جلب بيانات الشحنة"
      />
    );
  }

  const handleDeleteItemClick = async () => {
    setIsDialogOpen(false);
    if (!shipmentId) return;

    deleteShipment(shipmentId, {
      onSuccess: () => {
        navigate("/shipments/all");
      },
      onError: (error: any) => {
        console.error(error);
        const errorMessage =
          error?.response?.data?.detail || "حدث خطأ أثناء حذف الشحنة";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <>
      {(isPending || isLoading) && <PageLoader />}
      <div className="flex flex-col gap-20">
        <ShipmentStatusOverview shipment={shipment} />
        <div className="flex justify-center items-start h-[70vh] mx-4">
          <DeleteItemCard
            handleDeleteButtonClick={() => setIsDialogOpen(true)}
          />
          <DeleteItemDialog
            label="هل أنت متأكد من حذف الشحنة؟"
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            handleDeleteItemClick={handleDeleteItemClick}
          />
        </div>
      </div>
    </>
  );
};

export default DeleteShipment;
