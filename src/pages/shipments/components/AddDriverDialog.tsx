import PageLoader from "@/components/PageLoader";
import AddDriver from "@/pages/drivers/AddDriver";
import { ApiResponse } from "@/types";
import { X } from "lucide-react";
import { Suspense } from "react";
import { DriverList } from "../../../../Api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

interface AddDriverDialogProps {
  onCreate: (data: ApiResponse<DriverList>) => void;
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
          <DialogTitle>إضافة سائق جديد</DialogTitle>
        </DialogHeader>
        <Suspense fallback={<PageLoader />}>
          <AddDriver onCreate={onCreate} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

export default AddDriverDialog;
