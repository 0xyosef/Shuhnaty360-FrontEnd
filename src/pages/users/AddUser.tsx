import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../../api/users.api";
import PageLoader from "../../components/PageLoader";
import {
  userCreateSchema,
  UserCreateSchemaType,
} from "../../schemas/user.schema";
import UserForm from "./components/UserForm";

const AddUser = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
    setError,
  } = useForm<UserCreateSchemaType>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      is_active: true,
    },
  });

  const { mutate, isPending: isLoading } = useCreateUser();

  const onSubmit = handleSubmit((formData: UserCreateSchemaType) => {
    // const cleanedData = Object.fromEntries(
    //   Object.entries(formData).map(([key, val]) => [
    //     key,
    //     val === "" ? undefined : val,
    //   ]),
    // ) as UserCreateSchemaType;

    // console.log("formData", formData);

    mutate(formData, {
      onSuccess: () => {
        navigate("/users");
      },
      onError: (error) => {
        const errorData = (error as AxiosError).response?.data;
        if (errorData) {
          Object.entries(errorData).forEach(([key, value]) => {
            if (key in formData) {
              setError(key as keyof UserCreateSchemaType, {
                type: "manual",
                message: value,
              });
            }
          });
        }
      },
    });
  });

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <UserForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          register={register}
          setValue={setValue}
          errors={errors}
          control={control}
        />
      </Suspense>
    </>
  );
};

export default AddUser;
