import {
  Control,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import FormSectionWrapper from "../../../components/FormSectionWrapper";
import StayCostInputField from "../../../components/ui/StayCostInputField";
import TextInputField from "../../../components/ui/TextInputField";
import { ShipmentSerializerSchema } from "../../../schemas/shipment.schema";

type ShipmentCostSectionProps = {
  register: UseFormRegister<ShipmentSerializerSchema>;
  control: Control<ShipmentSerializerSchema>;
  errors: FieldErrors<ShipmentSerializerSchema>;
};

const ShipmentCostSection = ({
  register,
  control,
  errors,
}: ShipmentCostSectionProps) => {
  const [fare, premium, stay_cost, days_stayed, deducted, fare_return] =
    useWatch({
      control,
      name: [
        "fare",
        "premium",
        "stay_cost",
        "days_stayed",
        "deducted",
        "fare_return",
      ],
    });

  const total =
    Number(fare || 0) +
    Number(premium || 0) +
    Number(stay_cost || 0) * Number(days_stayed || 0) -
    Number(deducted || 0) +
    Number(fare_return || 0);

  return (
    <FormSectionWrapper title="التكلفة ر.س">
      <TextInputField
        label="التكلفة الأساسية"
        error={errors.fare?.message}
        value={fare?.toString()}
        type="number"
        {...register("fare")}
      />
      <TextInputField
        label="الزيادة"
        error={errors.premium?.message}
        value={premium?.toString()}
        type="number"
        {...register("premium")}
      />
      <StayCostInputField
        control={control}
        register={register}
        errors={errors}
      />
      <TextInputField
        label="الخصم"
        error={errors.deducted?.message}
        value={deducted?.toString()}
        type="number"
        {...register("deducted")}
      />
      <TextInputField
        label="الأجرة المرتجعة"
        value={fare_return?.toString()}
        error={errors.fare_return?.message}
        type="number"
        {...register("fare_return")}
      />
      <div className="self-end mb-2">
        <p className="text-2xl font-bold">
          الإجمالي: <span className="font-normal">{total} ر.س</span>
        </p>
      </div>
    </FormSectionWrapper>
  );
};

export default ShipmentCostSection;
