import { useCompanyBranchesOptions } from "@/api/profiles.api";
import Card from "@/components/ui/Card";
import ComboboxField from "@/components/ui/ComboboxField";
import FormButton from "@/components/ui/FormButton";
import PhoneInputField from "@/components/ui/PhoneInputField";
import TextInputField from "@/components/ui/TextInputField";
import Toggle from "@/components/ui/Toggle";
import { UserCreateSchemaType } from "@/schemas/user.schema";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
type UserFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
  register: UseFormRegister<UserCreateSchemaType>;
  setValue: UseFormSetValue<UserCreateSchemaType>;
  errors: FieldErrors<UserCreateSchemaType>;
  control: Control<UserCreateSchemaType>;
  isEdit?: boolean;
};

const UserForm = ({
  onSubmit,
  isLoading,
  register,
  setValue,
  errors,
  control,
  isEdit = false,
}: UserFormProps) => {
  const {
    data: companyBranches,
    isLoading: isLoadingBranches,
    hasNextPage,
    ref,
    setSearch,
  } = useCompanyBranchesOptions();

  const companyBranchOptions = companyBranches?.items || [];

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <div className="w-full grid md:grid-cols-2 gap-10 my-10">
          <TextInputField
            label="اسم المستخدم"
            error={errors.username?.message}
            {...register("username")}
          />
          <TextInputField
            label="البريد الإلكتروني"
            error={errors.email?.message}
            type="email"
            {...register("email")}
          />
          <TextInputField
            label="كلمة المرور"
            error={errors.password?.message}
            type="password"
            {...register("password")}
          />
          <TextInputField
            label="تأكيد كلمة المرور"
            error={errors.password2?.message}
            type="password"
            {...register("password2")}
          />
          <TextInputField
            label="الاسم الأول"
            error={errors.first_name?.message}
            {...register("first_name")}
          />
          <TextInputField
            label="الاسم الأخير"
            error={errors.last_name?.message}
            {...register("last_name")}
          />
          <PhoneInputField
            label="رقم التواصل"
            error={errors.phone?.message}
            control={control}
            name="phone"
          />
          <ComboboxField
            label="الفرع"
            name="company_branch"
            options={companyBranchOptions}
            isLoading={isLoadingBranches || hasNextPage}
            control={control}
            error={errors.company_branch?.message}
            setValue={setValue}
            ref={ref}
            onSearch={setSearch}
          />
          {/* <AutoCompleteSelectField
            label="الفرع"
            name="company_branch"
            options={companyBranchOptions}
            isLoading={isLoadingBranches}
            control={control}
            error={errors.company_branch?.message}
          /> */}
          <Toggle
            name="is_staff"
            control={control}
            label="موظف"
            error={errors.is_staff?.message}
          />
          <Toggle
            name="is_superuser"
            description="إذا كان المستخدم إداريًا، فسيكون لديه جميع الصلاحيات. يرجى التأكيد على هذا الخيار بعناية."
            control={control}
            label="إداري"
            error={errors.is_superuser?.message}
          />
          <Toggle
            name="is_active"
            control={control}
            label="فعال"
            error={errors.is_active?.message}
          />
        </div>
        <hr className="border-0 border-t-2 border-dashed border-[#666] my-12" />
        <FormButton disabled={isLoading} type="submit" className="w-full">
          {isEdit ? "تعديل الموظف" : "إضافة الموظف"}
        </FormButton>
      </form>
    </Card>
  );
};

export default UserForm;
