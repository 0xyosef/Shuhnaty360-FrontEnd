import {
  Control,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { cn } from "../../utils/utils";

type StayCostInputFieldSchema = {
  days_stayed: number;
  stay_cost: number;
} & any;

export type StayCostInputFieldProps = {
  register: UseFormRegister<StayCostInputFieldSchema>;
  errors: FieldErrors<StayCostInputFieldSchema>;
  control: Control<StayCostInputFieldSchema>;
};

const StayCostInputField = ({
  register,
  errors,
  control,
}: StayCostInputFieldProps) => {
  const [daysStayed, stayCost] = useWatch({
    control,
    name: ["days_stayed", "stay_cost"],
  });

  const daysStayedRegister = register("days_stayed");
  const stayCostRegister = register("stay_cost");

  const total = Number(daysStayed || 0) * Number(stayCost || 0);

  return (
    <div className="col-span-1 flex flex-col gap-1">
      <label className="self-start text-xl mb-2 text-[#1A1A1A]">المبيت</label>
      <div
        className={cn(
          "flex overflow-hidden gap-2 bg-white text-lg border border-[#CCCCCC] rounded-lg focus-within:ring-1 focus-within:ring-[#DD7E1F]",
          (errors.stay_cost?.message || errors.days_stayed?.message) &&
            "border-red-500",
        )}
      >
        <input
          placeholder="عدد الليالي"
          type="number"
          value={daysStayed?.toString()}
          className="w-1/5 p-2 focus:outline-hidden "
          autoComplete="off"
          {...daysStayedRegister}
          onChange={(e) => {
            daysStayedRegister.onChange(e);
          }}
        />
        <div
          className={cn(
            "h-full w-[.1rem] bg-[#CCCCCC]",
            (errors.stay_cost?.message || errors.days_stayed?.message) &&
              "bg-red-500",
          )}
        />
        <input
          placeholder="تكلفة المبيت لليلة الواحدة"
          type="number"
          value={stayCost?.toString()}
          className="grow px-2 focus:outline-hidden "
          autoComplete="off"
          {...stayCostRegister}
          onChange={(e) => {
            stayCostRegister.onChange(e);
          }}
        />
      </div>
      {errors.days_stayed?.message && (
        <span className="text-red-500 mt-1 text-sm">
          {errors.days_stayed?.message as string}
        </span>
      )}
      {errors.stay_cost?.message && (
        <span className="text-red-500 mt-1 text-sm">
          {errors.stay_cost?.message as string}
        </span>
      )}
      <div className="text-[#999] font-Rubik text-sm">
        <span>{total ? `${total} ر.س` : "تظهر هنا تكلفة المبيت"}</span>
      </div>
    </div>
  );
};

export default StayCostInputField;
