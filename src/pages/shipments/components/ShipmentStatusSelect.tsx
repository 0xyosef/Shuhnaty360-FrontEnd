import usePrivilege from "@/hooks/usePrivilege";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const statusOptions = [
  { value: 1, label: "قيد الشحن" },
  { value: 2, label: "تم التوصيل" },
  { value: 3, label: "مكتملة" },
  { value: 4, label: "متأخرة" },
  { value: 5, label: "مرتجعة" },
  { value: 6, label: "ملغيه" },
];

interface ShipmentStatusProps {
  status: string;
  onStatusChange: (newStatus: { id: number; name_ar: string }) => void;
  className?: string;
}

const getStatusBgColor = (status: string) => {
  switch (status) {
    case "قيد الشحن":
      return "bg-[#B3E5BD] text-[#071309]";
    case "متأخرة":
      return "bg-[#FEDE9A] text-[#191100]";
    case "تم التوصيل":
      return "bg-[#E6E6E6] text-[#333333]";
    case "ملغيه":
      return "bg-[#CD2026] text-[#FCFCFC]";
    case "مرتجعة":
      return "bg-[#F8D3D4] text-[#CD2026]";
    case "مكتملة":
      return "bg-[#2E853F] text-white";
    default:
      return "bg-gray-300";
  }
};

const ShipmentStatusSelect = ({
  status,
  onStatusChange,
  className = "",
}: ShipmentStatusProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { can } = usePrivilege();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleStatusSelect = (newStatus: { id: number; name_ar: string }) => {
    onStatusChange(newStatus);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!can("shipments:edit")) {
    return (
      <div
        className={`py-2 text-center px-3 font-medium rounded-md w-36 text-sm ${getStatusBgColor(status)}`}
      >
        {status}
      </div>
    );
  }

  return (
    <div
      className={`relative z-40 inline-block ${className}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown();
        }}
        className={`py-2 px-3 text-center font-medium rounded-md w-36 text-sm flex items-center justify-between ${getStatusBgColor(status)}`}
      >
        {status}
        <FiChevronDown className="mr-1" />
      </button>

      {isOpen && (
        <div className="absolute flex flex-col z-50 mt-1 w-full bg-white shadow-lg rounded-md py-1">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`w-full text-right px-4 py-2 text-sm hover:bg-gray-100 ${status === option.label ? "bg-gray-100" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                handleStatusSelect({
                  id: option.value,
                  name_ar: option.label,
                });
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShipmentStatusSelect;
