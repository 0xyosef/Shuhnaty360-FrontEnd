export const SHIPMENT_STATUS = [
  {
    id: 1,
    name_ar: "قيد الشحن",
    name_en: "shipping",
  },
  {
    id: 2,
    name_ar: "تم التوصيل",
    name_en: "delivered",
  },
  {
    id: 3,
    name_ar: "مكتملة",
    name_en: "completed",
  },
  {
    id: 4,
    name_ar: "متأخرة",
    name_en: "delayed",
  },
  {
    id: 5,
    name_ar: "مرتجعة",
    name_en: "returned",
  },
  {
    id: 6,
    name_ar: "ملغيه",
    name_en: "cancelled",
  },
];

export const SHIPMENT_STATUS_MAP = new Map(
  SHIPMENT_STATUS.map((status) => [status.name_en, status.id]),
);
