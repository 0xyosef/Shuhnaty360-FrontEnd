import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TextAreaField from "@/components/ui/TextAreaField";
import {
  paymentVoucherRejectionSchema,
  PaymentVoucherRejectionSchema,
} from "@/schemas/payment-voucher.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PaymentVoucherRejectionSchema) => void;
  isLoading: boolean;
};

export default function PaymentVoucherRejectionDialog({
  onOpenChange,
  open,
  onSubmit,
  isLoading,
}: Props) {
  const form = useForm<PaymentVoucherRejectionSchema>({
    resolver: zodResolver(paymentVoucherRejectionSchema),
    defaultValues: {
      rejection_reason: "",
    },
  });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-right">
            هل أنت متأكد من رفض سند الصرف؟
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 !text-right"
          dir="rtl"
        >
          <TextAreaField
            label="سبب الرفض"
            placeholder="سبب الرفض"
            {...form.register("rejection_reason")}
            error={form.formState.errors.rejection_reason?.message}
          />
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={isLoading}>
              حفظ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
