import { z } from "zod";
import { fixHtmlFormOptionalFields } from "../utils/utils";

export const paymentVoucherSchema = fixHtmlFormOptionalFields(
  z.object({
    shipment: z.number({ required_error: "الرجاء اختيار الشحنة" }),
    note: z.string().optional(),
    fare: z.coerce
      .number({
        invalid_type_error: "التكلفة الأساسية يجب أن تكون رقمًا",
      })
      .nonnegative({
        message: "التكلفة الأساسية يجب أن تكون أكبر من أو يساوي صفر",
      })
      .optional(),
    premium: z.coerce
      .number({
        invalid_type_error: "الزيادة يجب أن تكون رقمًا",
      })
      .nonnegative({
        message: "الزيادة يجب أن تكون أكبر من أو يساوي صفر",
      })
      .optional(),
    fare_return: z.coerce
      .number({
        invalid_type_error: "التكلفة الأساسية المرتجعة يجب أن تكون رقمًا",
      })
      .nonnegative({
        message: "التكلفة الأساسية المرتجعة يجب أن تكون أكبر من أو يساوي صفر",
      })
      .optional(),
    days_stayed: z.coerce
      .number({
        invalid_type_error: "عدد أيام المبيت يجب أن يكون رقمًا",
      })
      .nonnegative({
        message: "عدد أيام المبيت يجب أن يكون أكبر من أو يساوي صفر",
      })
      .optional(),
    stay_cost: z.coerce
      .number({
        invalid_type_error: "تكلفة المبيت يجب أن تكون رقمًا",
      })
      .nonnegative({
        message: "تكلفة المبيت يجب أن تكون أكبر من أو يساوي صفر",
      })
      .optional(),
    deducted: z.coerce
      .number({
        invalid_type_error: "الخصم يجب أن يكون رقمًا",
      })
      .nonnegative({
        message: "الخصم يجب أن يكون أكبر من أو يساوي صفر",
      })
      .optional(),
    receiver_name: z.string({
      message: "اسم المستلم مطلوب",
    }),
    receiver_phone: z.string({
      message: "رقم هاتف المستلم مطلوب",
    }),
    receiver_identity: z.string({
      message: "رقم هوية المستلم مطلوب",
    }),
  }),
);

export type PaymentVoucherSchema = z.infer<typeof paymentVoucherSchema>;

export const paymentVoucherRejectionSchema = z.object({
  rejection_reason: z.string().min(1, "الرجاء إدخال سبب الرفض"),
});

export type PaymentVoucherRejectionSchema = z.infer<
  typeof paymentVoucherRejectionSchema
>;
