import usePrivilege from "@/hooks/usePrivilege";
import { useEffect, useRef, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const ActionsMenu = ({ options }: any) => {
  const navigate = useNavigate();
  const [isShipmentActionsMenuOpen, setIsShipmentActionsMenuOpen] =
    useState(false);
  const { can } = usePrivilege();

  const menuOptions = options.filter((item: any) => can(item.privilege));

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsShipmentActionsMenuOpen(false);
      }
    };

    if (isShipmentActionsMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShipmentActionsMenuOpen]);

  if (menuOptions.length === 0) return null;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsShipmentActionsMenuOpen(!isShipmentActionsMenuOpen)}
      >
        <HiDotsVertical size={24} />
      </button>
      {isShipmentActionsMenuOpen && (
        <div
          ref={menuRef}
          className={`absolute flex flex-col justify-center w-42 gap-4 rounded-lg px-3 py-3 bg-[#FCFCFC] border border-[#CCCCCC] shadow-lg font-Rubik top-10 left-4 z-10`}
        >
          {menuOptions.map((item: any, index: any) => (
            <button
              key={index}
              className="flex items-center gap-2 w-fit"
              onClick={() => {
                navigate(item.path);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img src={item.icon} alt={item.label} />
              <span className="text-nowrap">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionsMenu;
