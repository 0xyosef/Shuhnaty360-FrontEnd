import usePrivilege from "@/hooks/usePrivilege";
import { Privilege } from "@/types";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { PiPackageDuotone } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import clientsIcon from "../../assets/images/clients.svg";
import logOutIcon from "../../assets/images/log-out.svg";
import logo from "../../assets/images/logo.png";
import usersIcon from "../../assets/images/people.svg";
import statisticsIcon from "../../assets/images/statistics.svg";
import truckIcon from "../../assets/images/truck.svg";
import { useSidebar } from "../../context/SidebarContext";
import { useAuth } from "../../hooks/useAuth";
import { SHIPMENT_STATUS } from "../../utils/constants";
import NavbarAccordion from "./NavbarAccordion";

const iconsStyles = "filter invert brightness-0";

const items = [
  {
    nav: "/dashboard",
    name: "لوحة المعلومات",
    icon: (selectedItem: string) => (
      <img
        src={statisticsIcon}
        alt="statistics"
        className={`${selectedItem === "/dashboard" ? iconsStyles : ""}`}
      />
    ),
    permission: "dashboard:view",
  },
  [
    {
      nav: "/shipments/all",
      name: "كل الشحنات",
      permission: "shipments:view",
    },
    ...SHIPMENT_STATUS.map((status) => ({
      nav: `/shipments/${status.name_en}`,
      name: status.name_ar,
      permission: "shipments:view",
    })),
  ],
  {
    nav: "/payment-vouchers",
    name: "سندات الصرف",
    icon: (selectedItem: string) => (
      <img
        src={statisticsIcon}
        alt="payment-vouchers"
        className={`${selectedItem.startsWith("/payment-vouchers") ? iconsStyles : ""}`}
      />
    ),
    permission: "payment-vouchers:view",
  },
  {
    nav: "/users",
    name: "الموظفين",
    icon: (selectedItem: string) => (
      <img
        src={usersIcon}
        alt="users"
        className={`${selectedItem.startsWith("/users") ? iconsStyles : ""}`}
      />
    ),
    permission: "users:view",
  },
  {
    nav: "/drivers",
    name: "السائقين",
    icon: (selectedItem: string) => (
      <img
        src={truckIcon}
        alt="drivers"
        className={`${selectedItem.startsWith("/drivers") ? iconsStyles : ""}`}
      />
    ),
    permission: "drivers:view",
  },
  {
    nav: "/clients",
    name: "العملاء",
    icon: (selectedItem: string) => (
      <img
        src={clientsIcon}
        alt="clients"
        className={`${selectedItem.startsWith("/clients") ? iconsStyles : ""}`}
      />
    ),
    permission: "clients:view",
  },
  {
    nav: "/recipients",
    name: "المستلمين",
    icon: (selectedItem: string) => (
      <img
        src={clientsIcon}
        alt="recipients"
        className={`${selectedItem.startsWith("/recipients") ? iconsStyles : ""}`}
      />
    ),
    permission: "recipients:view",
  },
];

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();
  const { can } = usePrivilege();

  const sidebarItems = useMemo(() => {
    return items.filter((item) => {
      if (Array.isArray(item)) {
        return item.some((subItem) => can(subItem.permission as Privilege));
      }
      return can(item.permission as Privilege);
    });
  }, [can]);

  useEffect(() => {
    const checkView = () => {
      setIsMobileScreen(window.innerWidth < 1024);
    };

    const debouncedCheckView = debounce(checkView, 100);

    checkView();
    window.addEventListener("resize", debouncedCheckView);
    return () => window.removeEventListener("resize", debouncedCheckView);
  }, []);

  useEffect(() => {
    if (isMobileScreen && isSidebarOpen) {
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.height = "";
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.height = "";
      document.body.style.overflow = "auto";
    };
  }, [isMobileScreen, isSidebarOpen]);

  return (
    <div className="h-full">
      {isMobileScreen && !isSidebarOpen ? (
        <button
          onClick={() => {
            setIsSidebarOpen(true);
          }}
          className={`fixed top-4 right-4 z-50 p-2 bg-[#E6E6E6] rounded-md lg:hidden`}
        >
          <IoMdMenu size={24} />
        </button>
      ) : (
        <>
          {isSidebarOpen && (
            <div className="fixed lg:hidden inset-0 bg-black bg-opacity-50 z-40" />
          )}
          <aside
            className={`bg-[#E6E6E6] transition-all duration-300 flex flex-col justify-between p-8 ${
              isSidebarOpen ? "w-[278px] items-end" : "w-[104px] items-center"
            } fixed lg:static z-50 h-full overflow-y-auto`}
          >
            <div
              className={`w-full flex flex-col ${
                isSidebarOpen ? "items-end" : "items-center"
              }`}
            >
              {isSidebarOpen ? (
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                  }}
                >
                  <IoCloseOutline size={24} />
                </button>
              ) : (
                <button onClick={() => setIsSidebarOpen(true)}>
                  <IoMdMenu size={24} />
                </button>
              )}

              {isSidebarOpen && <img src={logo} alt="logo" className="mt-10" />}
              <div className="w-full mt-10">
                {sidebarItems.map((item, index) =>
                  Array.isArray(item) ? (
                    <NavbarAccordion
                      key={index}
                      icon={<PiPackageDuotone size={24} />}
                      title="الشحنات"
                      items={item}
                      isSidebarOpen={isSidebarOpen}
                      setIsSidebarOpen={setIsSidebarOpen}
                      selectedItem={location.pathname}
                    />
                  ) : (
                    <Link
                      to={item.nav}
                      key={item.name}
                      className={`flex items-center w-full gap-2 mb-4 ${
                        isSidebarOpen ? "p-3" : "p-2"
                      } transition-all duration-300 ${
                        isSidebarOpen ? "justify-start" : "justify-center"
                      } ${
                        location.pathname.startsWith(item.nav)
                          ? "bg-[#DD7E1F] rounded-lg text-[#FCFCFC]"
                          : ""
                      }`}
                    >
                      <span>{item.icon(location.pathname)}</span>
                      {isSidebarOpen && <span>{item.name}</span>}
                    </Link>
                  ),
                )}
              </div>
            </div>
            <button
              onClick={logout}
              className={`flex items-center w-full gap-2 ${
                isSidebarOpen ? "p-3" : "p-2"
              } transition-all duration-300 mb-4 ${
                isSidebarOpen ? "justify-start" : "justify-center"
              }`}
            >
              <span>
                <img src={logOutIcon} alt="log-out" />
              </span>
              {isSidebarOpen && <span>تسجيل الخروج</span>}
            </button>
          </aside>
        </>
      )}
    </div>
  );
};

export default Sidebar;
