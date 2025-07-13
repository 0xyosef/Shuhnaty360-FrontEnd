import * as z from "zod";
import { fixHtmlFormOptionalFields } from "../utils/utils";

export const userCreateSchema = z.object({
  username: z
    .string({
      required_error: "اسم المستخدم مطلوب",
      invalid_type_error: "اسم المستخدم يجب أن يكون نصًا",
    })
    .trim()
    .min(1, { message: "اسم المستخدم مطلوب" })
    .max(150, { message: "اسم المستخدم يجب ألا يزيد عن 150 حرفًا" })
    .regex(/^[\w.@+-]+$/, {
      message: "اسم المستخدم يحتوي على رموز غير مسموحة",
    }),
  email: z
    .string({
      invalid_type_error: "البريد الإلكتروني يجب أن يكون نصًا",
    })
    .trim()
    .email({ message: "صيغة البريد الإلكتروني غير صحيحة" })
    .optional()
    .or(z.literal("")),
  password: z
    .string({
      required_error: "كلمة المرور مطلوبة",
      invalid_type_error: "كلمة المرور يجب أن تكون نصًا",
    })
    .trim()
    .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" })
    .max(150, { message: "كلمة المرور يجب ألا تزيد عن 150 حرفًا" }),
  password2: z
    .string({
      required_error: "تأكيد كلمة المرور مطلوب",
      invalid_type_error: "تأكيد كلمة المرور يجب أن يكون نصًا",
    })
    .trim()
    .min(8, { message: "تأكيد كلمة المرور يجب أن تكون 8 أحرف على الأقل" })
    .max(150, { message: "تأكيد كلمة المرور يجب ألا تزيد عن 150 حرفًا" }),
  first_name: z
    .string({
      required_error: "الاسم الأول مطلوب",
      invalid_type_error: "الاسم الأول يجب أن يكون نصًا",
    })
    .trim()
    .min(1, { message: "الاسم الأول مطلوب" })
    .max(150, { message: "الاسم الأول يجب ألا يزيد عن 150 حرفًا" }),
  last_name: z
    .string({
      required_error: "الاسم الأخير مطلوب",
      invalid_type_error: "الاسم الأخير يجب أن يكون نصًا",
    })
    .trim()
    .min(1, { message: "الاسم الأخير مطلوب" })
    .max(150, { message: "الاسم الأخير يجب ألا يزيد عن 150 حرفًا" }),
  is_staff: z.boolean({ coerce: true }).optional(),
  is_superuser: z.boolean({ coerce: true }).optional(),
  is_active: z.boolean({ coerce: true }).optional(),
  phone: z
    .string({
      invalid_type_error: "رقم التواصل يجب أن يكون نصًا",
    })
    .trim()
    .regex(/^\+\d+$/, {
      message: "رقم التواصل يجب أن يبدأ بـ + ويحتوي على أرقام فقط",
    })
    .optional()
    .or(z.literal("")),
  company_branch: z
    .number({
      invalid_type_error: "الفرع مطلوب",
      coerce: true,
    })
    .gt(0, {
      message: "الفرع مطلوب",
    })
    .optional(),
});

export const userUpdateSchema = fixHtmlFormOptionalFields(
  userCreateSchema.partial({
    password: true,
    password2: true,
  }),
);

export type UserCreateSchemaType = z.infer<typeof userCreateSchema>;
export type UserUpdateSchemaType = z.infer<typeof userUpdateSchema>;
