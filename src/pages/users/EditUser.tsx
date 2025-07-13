// import FileUploadInput from '../../components/usersDrivers/FileUploadInput';
import ErrorContainer from "@/components/ErrorContainer";
import PageLoader from "@/components/PageLoader";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useLayoutEffect } from "react";
import {
  Control,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { UsersUpdate } from "../../../Api";
import { useUpdateUser, useUserQuery } from "../../api/users.api";
import {
  UserCreateSchemaType,
  userUpdateSchema,
  UserUpdateSchemaType,
} from "../../schemas/user.schema";
import UserForm from "./components/UserForm";

const EditUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm<UserUpdateSchemaType>({
    resolver: zodResolver(userUpdateSchema),
  });

  const { data: userData, isLoading, error, refetch } = useUserQuery(userId);

  const { mutate, isPending } = useUpdateUser(
    userId ? parseInt(userId) : undefined,
  );

  const onSubmit = handleSubmit((formData: UserUpdateSchemaType) => {
    mutate(formData as UsersUpdate, {
      onSuccess: () => {
        toast.success("تم تعديل المستخدم بنجاح");
        navigate("/users");
      },
    });
  });

  useLayoutEffect(() => {
    if (userData?.data) {
      console.log("userData", userData.data);
      setValue("username", userData.data.username);
      setValue("first_name", userData.data.first_name!);
      setValue("last_name", userData.data.last_name!);
      setValue("company_branch", userData.data.company_branch?.id || 0);
      setValue("email", userData.data.email!);
      setValue("phone", userData.data.phone || "");
      setValue("is_superuser", userData.data.is_superuser);
      setValue("is_staff", userData.data.is_staff);
      setValue("is_active", userData.data.is_active);
    }
  }, [userData, setValue]);

  if (error) {
    return (
      <ErrorContainer
        error={error}
        onRetry={refetch}
        defaultMessage="حدث خطأ أثناء جلب بيانات المستخدم"
      />
    );
  }

  return (
    <>
      {isLoading && <PageLoader />}
      <Suspense fallback={<PageLoader />}>
        <UserForm
          onSubmit={onSubmit}
          isLoading={isLoading || isPending}
          register={register as UseFormRegister<UserCreateSchemaType>}
          setValue={setValue as UseFormSetValue<UserCreateSchemaType>}
          errors={errors}
          control={control as Control<UserCreateSchemaType>}
          isEdit
        />
      </Suspense>
    </>
  );
};

export default EditUser;
