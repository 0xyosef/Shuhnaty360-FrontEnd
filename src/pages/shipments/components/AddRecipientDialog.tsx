import PageLoader from "@/components/PageLoader";
import AddRecipient from "@/pages/recipient/AddRecipient";
import { ApiResponse } from "@/types";
import { X } from "lucide-react";
import { Suspense } from "react";
import { RecipientSerializerCreate } from "../../../../Api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

interface AddDriverDialogProps {
  onCreate: (data: ApiResponse<RecipientSerializerCreate>) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddDriverDialog = ({
  onCreate,
  isOpen,
  setIsOpen,
}: AddDriverDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {isOpen && (
        <DialogTrigger asChild>
          <X />
        </DialogTrigger>
      )}
      <DialogContent
        dir="rtl"
        className="min-w-[90%] max-h-10/12 overflow-y-auto"
      >
        <DialogHeader className="flex-row">
          <DialogTitle>إضافة جديد</DialogTitle>
        </DialogHeader>
        <Suspense fallback={<PageLoader />}>
          <AddRecipient onCreate={onCreate} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

export default AddDriverDialog;
