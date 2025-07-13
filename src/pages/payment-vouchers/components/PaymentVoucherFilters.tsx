import { PaymentVoucherFilters as FilterType } from "@/api/payment-vouchers.api";
import { ClientCombobox, RecipientCombobox } from "@/components/comboboxes";
import { BranchCombobox } from "@/components/comboboxes/BranchCombobox";
import { InvoiceNumbersCombobox } from "@/components/comboboxes/InvoiceNumbersCombobox";
import { ShipmentsCombobox } from "@/components/comboboxes/ShipmentsCombobox";
import { UserCombobox } from "@/components/comboboxes/UserCombobox";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/DatePicker";
import usePrivilege from "@/hooks/usePrivilege";
import { Suspense, useState } from "react";
import { PaymentVoucherFiltersSkeleton } from "./PaymentVoucherFiltersSkeleton";

interface PaymentVoucherFiltersProps {
  initialFilters?: FilterType;
  onApply: (filters: FilterType) => void;
  onClear: () => void;
}

export function PaymentVoucherFilters({
  initialFilters = {},
  onApply,
  onClear,
}: PaymentVoucherFiltersProps) {
  const { can } = usePrivilege();
  const [tempFilters, setTempFilters] = useState<FilterType>(initialFilters);

  const handleFilterChange = (
    key: keyof FilterType,
    value: string | number | undefined,
  ) => {
    setTempFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const handleClear = () => {
    setTempFilters({});
    onClear();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(tempFilters);
  };

  const handleDateChange = (
    key: "loading_date__gte" | "loading_date__lte",
    date: Date | undefined,
  ) => {
    setTempFilters((prev) => ({
      ...prev,
      [key]: date,
    }));
  };

  return (
    <Suspense fallback={<PaymentVoucherFiltersSkeleton />}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {can("users:view") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              المندوب
            </label>
            <UserCombobox
              value={tempFilters.created_by}
              onChange={(value) =>
                handleFilterChange(
                  "created_by",
                  value ? Number(value) : undefined,
                )
              }
              className="w-full"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
            الفرع
          </label>
          <BranchCombobox
            value={tempFilters.issuing_branch}
            onChange={(value) =>
              handleFilterChange(
                "issuing_branch",
                value ? Number(value) : undefined,
              )
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
            الشحنة
          </label>
          <ShipmentsCombobox
            value={tempFilters.shipment}
            onChange={(value) =>
              handleFilterChange("shipment", value ? Number(value) : undefined)
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
            الفاتورة
          </label>
          <InvoiceNumbersCombobox
            value={tempFilters.invoice}
            onChange={(value) =>
              handleFilterChange("invoice", value ? Number(value) : undefined)
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
            الفرع
          </label>
          <ClientCombobox
            value={tempFilters.issuing_branch}
            onChange={(value) =>
              handleFilterChange(
                "issuing_branch",
                value ? Number(value) : undefined,
              )
            }
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
            المستلم
          </label>
          <RecipientCombobox
            value={tempFilters.invoice}
            onChange={(value) =>
              handleFilterChange("invoice", value ? Number(value) : undefined)
            }
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              إلى تاريخ
            </label>
            <DatePicker
              date={tempFilters.loading_date__lte}
              onDateChange={(date) =>
                handleDateChange("loading_date__lte", date)
              }
              className="w-full"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              من تاريخ
            </label>
            <DatePicker
              date={tempFilters.loading_date__gte}
              onDateChange={(date) =>
                handleDateChange("loading_date__gte", date)
              }
              className="w-full"
              placeholder=""
            />
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-700 border-gray-300"
            onClick={handleClear}
          >
            مسح الكل
          </Button>
          <Button size="sm" onClick={handleSubmit}>
            تطبيق
          </Button>
        </div>
      </form>
    </Suspense>
  );
}
