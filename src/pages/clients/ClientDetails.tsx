import ErrorContainer from "@/components/ErrorContainer";
import PageLoader from "@/components/PageLoader";
import usePrivilege from "@/hooks/usePrivilege";
import { Suspense, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Branch } from "../../../Api";
import { useClientQuery, useDeleteClientBranch } from "../../api/clients.api";
import deleteShipmentIcon from "../../assets/images/delete-shipment-icon.svg";
import editShipmentIcon from "../../assets/images/edit-shipment-icon.svg";
import ActionsMenu from "../../components/actionsMenu/ActionsMenu";
import ClientBranchDetailsSection from "../../components/clients/ClientBranchDetailsSection";
import { Button } from "../../components/ui/button";
import ConfirmationDialog from "../../components/ui/ConfirmationDialog";
import AddClientBranchDialog from "./components/AddClientBranchDialog";

const ClientDetails = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { can } = usePrivilege();
  const [branchToDelete, setBranchToDelete] = useState<number | null>(null);
  const [branchToEdit, setBranchToEdit] = useState<Branch | null>(null);
  const [isBranchFormOpen, setIsBranchFormOpen] = useState(false);

  const {
    data: clientRes,
    isLoading,
    error,
    refetch,
  } = useClientQuery(clientId);

  const { mutate: deleteBranch } = useDeleteClientBranch();

  const handleDelete = () => {
    if (branchToDelete) {
      deleteBranch(branchToDelete, {
        onSuccess: () => {
          setBranchToDelete(null);
        },
      });
    }
  };

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

  const menuActions = [
    {
      label: "تعديل البيانات",
      icon: editShipmentIcon,
      path: `/clients/edit-client/${clientId}`,
      privilege: "clients:edit" as const,
    },
    {
      label: "حذف البيانات",
      icon: deleteShipmentIcon,
      path: `/clients/delete-client/${clientId}`,
      privilege: "clients:delete" as const,
    },
  ].filter((action) => !action.privilege || can(action.privilege));

  return (
    <>
      {isLoading && <PageLoader />}

      <div className="border border-[#DD7E1F] rounded-lg px-6 pt-10 pb-4 mx-4 md:mx-0">
        <div className="w-full flex justify-between items-start sm:items-center relative">
          <div className="flex flex-col gap-2">
            {[
              { label: "الاسم", value: client?.name },
              { label: "العنوان", value: client?.address },
            ].map((item, index) => (
              <div
                className="flex flex-col sm:flex-row gap-2 font-medium text-base font-Rubik"
                key={index}
              >
                <span>{item.label}: </span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <ActionsMenu
              options={menuActions}
              position={`top-7 -left-4 sm:top-11`}
            />
          </div>
        </div>
        <h1 className="my-10 bg-[#FCF2E9] font-md font-Rubik text-lg text-[#1A1A1A] p-3 rounded-md">
          {client?.dicription}
        </h1>
        <Button
          onClick={() => {
            setBranchToEdit(null);
            setIsBranchFormOpen(true);
          }}
        >
          إضافة فرع
        </Button>
        {Array.isArray(client?.branches) && client?.branches.length > 0 && (
          <hr className="border-0 border-t-2 border-dashed border-[#666] my-10" />
        )}
        {Array.isArray(client?.branches) &&
          client?.branches.length > 0 &&
          client?.branches.map((branch, index) => (
            <div key={branch.id}>
              <ClientBranchDetailsSection
                title={branch.name}
                branchNumber={index + 1}
                address={branch.address}
                mapLink={branch.name_address}
                primaryPhone={branch.phone_number}
                secondaryPhone={branch.second_phone_number}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={`border ${!can("clients:edit" as const) ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => {
                    if (can("clients:edit" as const)) {
                      setBranchToEdit(branch);
                      setIsBranchFormOpen(true);
                    } else {
                      // Optionally show a message that user doesn't have permission
                      console.log("No permission to edit branch");
                    }
                  }}
                  disabled={!can("clients:edit" as const)}
                >
                  <img src={editShipmentIcon} alt="" className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="border"
                  size="icon"
                  onClick={() => {
                    if (branch.id && can("clients:delete" as const)) {
                      setBranchToDelete(branch.id);
                    } else {
                      // Optionally show a message that user doesn't have permission
                      console.log("No permission to delete branch");
                    }
                  }}
                >
                  <img src={deleteShipmentIcon} alt="" className="size-4" />
                </Button>
              </ClientBranchDetailsSection>
              {index < (client?.branches?.length || 0) - 1 && (
                <hr className="border-0 border-t-2 border-dashed border-[#666] my-10" />
              )}
            </div>
          ))}
      </div>
      <ConfirmationDialog
        isOpen={branchToDelete !== null}
        onClose={() => setBranchToDelete(null)}
        onConfirm={handleDelete}
        title="تأكيد الحذف"
        description="هل أنت متأكد أنك تريد حذف هذا الفرع؟ لا يمكن التراجع عن هذا الإجراء."
      />
      <Suspense fallback={<PageLoader />}>
        <AddClientBranchDialog
          isOpen={isBranchFormOpen}
          setIsOpen={setIsBranchFormOpen}
          initialData={branchToEdit}
        />
      </Suspense>
    </>
  );
};

export default ClientDetails;
