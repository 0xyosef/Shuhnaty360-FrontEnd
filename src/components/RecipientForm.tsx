import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useCitiesOptions } from "../api/cities.api";
import { RecipientSerializerSchema } from "../schemas/recipient.schema";
import Card from "./ui/Card";
import ComboboxField from "./ui/ComboboxField";
import TextInputField from "./ui/TextInputField";

type RecipientFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
  register: UseFormRegister<RecipientSerializerSchema>;
  errors: FieldErrors<RecipientSerializerSchema>;
  control: Control<RecipientSerializerSchema>;
  setValue: UseFormSetValue<RecipientSerializerSchema>;
  isEdit?: boolean;
};

const RecipientForm = ({
  onSubmit,
  isLoading,
  register,
  errors,
  control,
  setValue,
  isEdit = false,
}: RecipientFormProps) => {
  const {
    data: cities,
    isLoading: isLoadingCities,
    hasNextPage: hasNextCityPage,
    ref: cityRef,
    setSearch: setCitySearch,
  } = useCitiesOptions();

  const cityOptions = cities?.items || [];

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <div className="w-full grid md:grid-cols-2 gap-10 my-10">
          <TextInputField
            label="اسم المستلم"
            error={errors.name?.message}
            {...register("name")}
          />
          <TextInputField
            label="العنوان"
            error={errors.address?.message}
            {...register("address")}
          />
          <TextInputField
            label="رقم الهاتف"
            error={errors.phone_number?.message}
            {...register("phone_number")}
          />
          <TextInputField
            label="رقم هاتف إضافي"
            error={errors.second_phone_number?.message}
            {...register("second_phone_number")}
          />
          <TextInputField
            label="البريد الإلكتروني"
            error={errors.email?.message}
            {...register("email")}
          />
          <ComboboxField
            name="city"
            label="المدينة"
            options={cityOptions}
            isLoading={isLoadingCities || hasNextCityPage}
            error={errors.city?.message}
            control={control}
            setValue={setValue}
            ref={cityRef}
            onSearch={setCitySearch}
          />
        </div>
        <hr className="border-0 border-t-2 border-dashed border-[#666] my-12" />
        <button
          disabled={isLoading}
          className="w-full py-4 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4"
        >
          {isEdit ? "تعديل المستلم" : "إضافة المستلم"}
        </button>
      </form>
    </Card>
  );
};

export default RecipientForm;
