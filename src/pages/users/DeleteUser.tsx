import DeleteItem from "../../components/shipments/deleteItem/DeleteItem";

import ErrorContainer from "@/components/ErrorContainer";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDeleteUser, useUserQuery } from "../../api/users.api";
import image from "../../assets/images/avatar.jpg";
import userIdCardImage from "../../assets/images/users/personal-card.svg";
import mailIcon from "../../assets/images/users/sms.svg";

const DeleteUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const {
    data: userData,
    isLoading: isUserDataLoading,
    error,
    refetch,
  } = useUserQuery(userId);

  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteUser();

  const handleDeleteItemClick = () => {
    deleteMutate(undefined, {
      onSuccess: () => {
        toast.success("تم حذف الموظف بنجاح");
        navigate("/users");
      },
      onError: (e: any) => {
        console.log(e);

        toast.error(
          e?.response?.data?.detail ||
            e?.message ||
            "حدث خطأ أثناء حذف المستخدم",
        );
      },
    });
  };

  const user = userData?.data;

  const moreInfoData = [
    {
      image: userIdCardImage,
      label: "رقم المعرف (ID)",
      value: user?.id,
    },
    {
      label: "اسم المستخدم",
      value: user?.username,
    },
    {
      label: "الاسم الأول",
      value: user?.first_name,
    },
    {
      label: "الاسم الأخير",
      value: user?.last_name,
    },
    {
      image: mailIcon,
      label: "البريد الإلكتروني",
      value: user?.email,
    },
  ];

  const personalData = {
    name: (user?.first_name || "") + " " + (user?.last_name || ""),
    image: image,
  };

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
    <DeleteItem
      moreInfoData={moreInfoData}
      personalData={personalData}
      isLoading={isDeleting || isUserDataLoading}
      handleDeleteItemClick={handleDeleteItemClick}
      page="user"
    />
  );
};

export default DeleteUser;
