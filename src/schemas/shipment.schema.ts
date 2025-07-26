import * as z from "zod";
import { fixHtmlFormOptionalFields } from "../utils/utils";

export const shipmentSerializerSchema = fixHtmlFormOptionalFields(
  z.object({
    driver: z.number({
      required_error: "السائق مطلوب",
      invalid_type_error: "السائق يجب أن يكون رقمًا",
    }),
    vehicle_number: z.string({
      required_error: "رقم الشاحنة مطلوب",
      invalid_type_error: "رقم الشاحنة يجب أن يكون نصًا",
    }),
    driver_phone_number: z.string({
      required_error: "رقم الهاتف مطلوب",
      invalid_type_error: "رقم الهاتف يجب أن يكون نصًا",
    }),
    truck_type: z.number({
      required_error: "نوع الشاحنة مطلوب",
      invalid_type_error: "نوع الشاحنة يجب أن يكون رقمًا",
    }),
    origin_city: z.number({
      required_error: "مدينة التحميل مطلوبة",
      invalid_type_error: "مدينة التحميل يجب أن تكون رقمًا",
    }),
    destination_city: z.number({
      required_error: "مدينة الوجهة مطلوبة",
      invalid_type_error: "مدينة الوجهة يجب أن تكون رقمًا",
    }),
    loading_date: z
      .string({
        required_error: "تاريخ التحميل مطلوب",
        invalid_type_error: "تاريخ التحميل يجب أن يكون نصًا",
      })
      .datetime({
        message: "تاريخ التحميل غير صالح",
      }),
    days_to_arrive: z
      .number({
        required_error: "عدد أيام الوصول مطلوب",
        invalid_type_error: "عدد أيام الوصول يجب أن يكون رقمًا",
      })
      .nonnegative({
        message: "عدد أيام الوصول يجب أن يكون أكبر من أو يساوي صفر",
      })
      .nullable()
      .optional(),
    expected_arrival_date: z
      .string({
        required_error: "تاريخ الوصول المتوقع مطلوب",
        invalid_type_error: "تاريخ الوصول المتوقع يجب أن يكون نصًا",
      })
      .datetime({
        message: "تاريخ الوصول المتوقع غير صالح",
      }),
    actual_delivery_date: z
      .string({
        invalid_type_error: "تاريخ الاستلام يجب أن يكون نصًا",
      })
      .datetime({
        message: "تاريخ الاستلام غير صالح",
      })
      .nullable()
      .optional(),
    contents: z
      .string({
        invalid_type_error: "محتويات الشحنة يجب أن تكون نصًا",
      })
      .min(1, { message: "محتويات الشحنة مطلوبة" })
      .nullable()
      .optional(),
    weight: z.coerce
      .number({
        invalid_type_error: "وزن الشحنة يجب أن يكون رقمًا",
      })
      .nonnegative({
        message: "وزن الشحنة مطلوب ويجب أن يكون أكبر من أو يساوي صفر",
      })
      .nullable()
      .optional(),
    notes: z
      .string({
        invalid_type_error: "ملاحظات الشحنة يجب أن تكون نصًا",
      })
      .nullable()
      .optional(),
    client: z.number({
      required_error: "العميل مطلوب",
      invalid_type_error: "العميل يجب أن يكون رقمًا",
    }),
    client_branch: z
      .number({
        required_error: "فرع العميل مطلوب",
        invalid_type_error: "فرع العميل يجب أن يكون رقمًا",
      })
      .nonnegative({
        message: "فرع العميل مطلوب",
      }),
    client_invoice_number: z
      .string({
        invalid_type_error: "رقم فاتورة العميل يجب أن يكون نصًا",
      })
      .min(1, {
        message: "رقم فاتورة العميل مطلوب",
      })
      .max(50, { message: "رقم فاتورة العميل يجب ألا يزيد عن 50 حرفًا" })
      .nullable()
      .optional(),
    notes_customer: z
      .string({
        invalid_type_error: "ملاحظات العميل يجب أن تكون نصًا",
      })
      .nullable()
      .optional(),
    recipient: z
      .number({
        invalid_type_error: "المستلم يجب أن يكون رقمًا",
      })
      .nullable()
      .optional(),
    notes_recipient: z
      .string({
        invalid_type_error: "ملاحظات المستلم يجب أن تكون نصًا",
      })
      .nullable()
      .optional(),
    fare: z.coerce
      .number({
        required_error: "التكلفة الأساسية مطلوبة",
        invalid_type_error: "التكلفة الأساسية يجب أن تكون رقمًا",
      })
      .nonnegative({
        message: "التكلفة الأساسية يجب أن تكون أكبر من أو يساوي صفر",
      }),
    premium: z.coerce
      .number({
        invalid_type_error: "الزيادة يجب أن تكون رقمًا",
      })
      .nonnegative({
        message: "الزيادة يجب أن تكون أكبر من أو يساوي صفر",
      })
      .nullable()
      .optional(),
    fare_return: z.coerce
      .number({
        invalid_type_error: "التكلفة الأساسية المرتجعة يجب أن تكون رقمًا",
      })
      .nonnegative({
        message: "التكلفة الأساسية المرتجعة يجب أن تكون أكبر من أو يساوي صفر",
      })
      .nullable()
      .optional(),
    days_stayed: z.coerce
      .number({
        invalid_type_error: "عدد أيام المبيت يجب أن يكون رقمًا",
      })
      .nonnegative({
        message: "عدد أيام المبيت يجب أن يكون أكبر من أو يساوي صفر",
      })
      .nullable()
      .optional(),
    stay_cost: z.coerce
      .number({
        invalid_type_error: "تكلفة المبيت يجب أن تكون رقمًا",
      })
      .nonnegative({
        message: "تكلفة المبيت يجب أن تكون أكبر من أو يساوي صفر",
      })
      .nullable()
      .optional(),
    deducted: z.coerce
      .number({
        invalid_type_error: "الخصم يجب أن يكون رقمًا",
      })
      .nonnegative({
        message: "الخصم يجب أن يكون أكبر من أو يساوي صفر",
      })
      .nullable()
      .optional(),
    status: z.coerce.number({
      required_error: "حالة الشحنة مطلوبة",
      invalid_type_error: "الحالة يجب أن تكون رقمًا",
    }),
  }),
);

export type ShipmentSerializerSchema = z.infer<typeof shipmentSerializerSchema>;
