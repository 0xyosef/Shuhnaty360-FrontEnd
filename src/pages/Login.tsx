import usePrivilege from "@/hooks/usePrivilege";
import { classifyAxiosError } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CgProfile } from "react-icons/cg";
import { CiLock } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import logo from "../assets/images/truck-Logo.svg";
import { useAuth } from "../hooks/useAuth";
import type { LoginCredentials } from "../types";

const loginSchema = z.object({
  username: z.string().min(1, "اسم المستخدم مطلوب"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { privileges, login, loginIsLoading, error, clearError } = useAuth();
  const { can } = usePrivilege();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginCredentials) => {
    clearError();
    login(data);
  };

  useEffect(() => {
    if (privileges) {
      if (can("dashboard:view")) {
        navigate("/dashboard");
      } else if (can("shipments:view")) {
        navigate("/shipments");
      } else if (can("payment-vouchers:view")) {
        navigate("/payment-vouchers");
      } else if (can("users:view")) {
        navigate("/users");
      } else if (can("drivers:view")) {
        navigate("/drivers");
      } else if (can("clients:view")) {
        navigate("/clients");
      } else if (can("recipients:view")) {
        navigate("/recipients");
      } else {
        toast.error("ليس لديك صلاحيات لدخول النظام");
      }
    } else if (error) {
      setValue("password", "");
    } else {
      toast.error(
        classifyAxiosError(error)?.message ||
          "حدث خطاء عند محاولة تسجيل الدخول",
      );
    }
  }, [privileges, can, navigate, error, setValue]);

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="w-full max-w-lg shadow-2xl border bg-[#FCFCFC] mx-2 md:mx-0 px-8 py-6 rounded-xl">
        <div className="flex justify-center items-center mb-4">
          <img src={logo} alt="logo" className="w-24 h-24" />
        </div>
        <h1 className="my-6 text-center font-medium text-2xl">الدخول للحساب</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-1"
        >
          <label htmlFor="userName" className="text-[#333333] text-sm">
            اسم المستخدم
          </label>
          <div className="relative w-full mb-2">
            <input
              id="userName"
              dir="rtl"
              className={`border border-gray-200 w-full rounded-md py-2 ps-10 focus:outline-hidden font-Rubik ${
                errors.username ? "border-red-500" : ""
              }`}
              placeholder="أدخل اسم المستخدم"
              {...register("username")}
            />
            <CgProfile
              size={20}
              color="#666666"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 "
            />
          </div>
          {errors.username && (
            <span className="text-red-500 text-xs mb-2">
              {errors.username.message}
            </span>
          )}
          <label htmlFor="password" className="text-[#333333] text-sm">
            كلمة المرور
          </label>
          <div className="relative w-full mb-2">
            <input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              dir="rtl"
              className={`border border-gray-200 w-full rounded-md py-2 ps-10 focus:outline-hidden font-Rubik ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="أدخل كلمة المرور"
              {...register("password")}
            />
            <CiLock
              size={20}
              color="#666666"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {isPasswordVisible ? (
                <IoEyeOffOutline size={20} color="#666666" />
              ) : (
                <IoEyeOutline size={20} color="#666666" />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs mb-2">
              {errors.password.message}
            </span>
          )}
          {error && (
            <span className="text-red-500 text-xs text-center w-full mb-2">
              {error}
            </span>
          )}
          <button
            className="w-full px-10 py-2 text-[#FCFCFC] font-thin bg-[#DD7E1F] rounded-lg mt-4"
            disabled={loginIsLoading}
          >
            {loginIsLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
