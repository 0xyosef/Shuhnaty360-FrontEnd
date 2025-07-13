import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import FormButton from "../../../components/ui/FormButton";
import { ShipmentSerializerSchema } from "../../../schemas/shipment.schema";
import ShipmentClientSection from "./ShipmentClientSection";
import ShipmentCostSection from "./ShipmentCostSection";
import ShipmentDriverSection from "./ShipmentDriverSection";
import ShipmentRecipientSection from "./ShipmentRecipientSection";
import ShipmentSection from "./ShipmentSection";

type ShipmentsFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<ShipmentSerializerSchema>;
  setValue: UseFormSetValue<ShipmentSerializerSchema>;
  isLoading: boolean;
  errors: FieldErrors<ShipmentSerializerSchema>;
  control: Control<ShipmentSerializerSchema>;
  isEdit?: boolean;
};

const ShipmentsForm = ({
  onSubmit,
  register,
  setValue,
  isLoading,
  errors,
  control,
  isEdit,
}: ShipmentsFormProps) => {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="border border-[#DD7E1F] bg-white rounded-lg p-8 mx-4 md:mx-0"
      >
        <ShipmentDriverSection
          register={register}
          control={control}
          errors={errors}
          setValue={setValue}
        />
        <hr className="border-0 border-t-2 border-dashed border-[] my-12" />
        <ShipmentSection
          register={register}
          control={control}
          errors={errors}
          setValue={setValue}
        />
        <hr className="border-0 border-t-2 border-dashed border-[] my-12" />
        <ShipmentClientSection
          register={register}
          control={control}
          errors={errors}
          setValue={setValue}
        />
        <hr className="border-0 border-t-2 border-dashed border-[] my-12" />
        <ShipmentRecipientSection
          register={register}
          control={control}
          errors={errors}
          setValue={setValue}
        />
        <hr className="border-0 border-t-2 border-dashed border-[] my-12" />
        <ShipmentCostSection
          register={register}
          control={control}
          errors={errors}
        />
        <hr className="border-0 border-t-2 border-dashed border-[] my-12" />
        <FormButton disabled={isLoading} className="w-full">
          {isEdit ? "تحديث الشحنة" : "إضافة الشحنة"}
        </FormButton>
      </form>
    </>
  );
};

export default ShipmentsForm;
