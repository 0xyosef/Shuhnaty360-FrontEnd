import { Button } from "./button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent dir="rtl">
        <DialogHeader className="flex-row">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p>{description}</p>
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            تأكيد
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
