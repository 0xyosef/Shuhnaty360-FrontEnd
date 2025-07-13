import { CiLock } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import logo from "../../../assets/images/truck-Logo.svg";
import { useState } from "react";

const DeleteItemCard = ({ handleDeleteButtonClick }: any) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="w-full md:w-1/3 shadow-2xl border bg-[#FCFCFC] px-8 py-6 rounded-xl">
      <div className="flex justify-center items-center mb-4">
        <img src={logo} alt="logo" className="w-24 h-24" />
      </div>
      <h1 className="my-6 text-center text-xl font-bold">
        أدخل كلمة المرور للحذف
      </h1>
      <div className="flex flex-col items-start gap-1">
        <label htmlFor="password" className="text-[#333333] text-sm">
          كلمة المرور
        </label>
        <div className="relative w-full mb-4">
          <input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            dir="rtl"
            className="border border-gray-200 w-full rounded-md py-2 ps-10 focus:outline-hidden font-Rubik"
            placeholder="أدخل كلمة المرور"
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
          >
            {isPasswordVisible ? (
              <IoEyeOffOutline size={20} color="#666666" />
            ) : (
              <IoEyeOutline size={20} color="#666666" />
            )}
          </button>
        </div>
        <button
          onClick={handleDeleteButtonClick}
          className="w-full px-10 py-2 text-[#FCFCFC] font-thin bg-[#CD2026] rounded-lg mt-4"
        >
          تأكيد الحذف
        </button>
      </div>
    </div>
  );
};

export default DeleteItemCard;
