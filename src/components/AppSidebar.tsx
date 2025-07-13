import usePrivilege from "@/hooks/usePrivilege";
import { Privilege } from "@/types";
import { ChevronDown } from "lucide-react";
import { useMemo } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import shipmentsIcon from "../assets/images/box.svg";
import clientsIcon from "../assets/images/clients.svg";
import logOutIcon from "../assets/images/log-out.svg";
import logo from "../assets/images/logo.png";
import usersIcon from "../assets/images/people.svg";
import statisticsIcon from "../assets/images/statistics.svg";
import truckIcon from "../assets/images/truck.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "../components/ui/sidebar";
import { useAuth } from "../hooks/useAuth";
import { SHIPMENT_STATUS } from "../utils/constants";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const items = [
  {
    nav: "/dashboard",
    name: "لوحة المعلومات",
    icon: (
      <img
        src={statisticsIcon}
        alt="statistics"
        className="mr-1 brightness-0"
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
    icon: (
      <img
        src={statisticsIcon}
        alt="payment-vouchers"
        className="mr-1 brightness-0"
      />
    ),
    permission: "payment-vouchers:view",
  },
  {
    nav: "/users",
    name: "الموظفين",
    icon: <img src={usersIcon} alt="users" className="mr-1 brightness-0" />,
    permission: "users:view",
  },
  {
    nav: "/drivers",
    name: "السائقين",
    icon: <img src={truckIcon} alt="drivers" className="mr-0.5 brightness-0" />,
    permission: "drivers:view",
  },
  {
    nav: "/clients",
    name: "العملاء",
    icon: <img src={clientsIcon} alt="clients" className="brightness-0" />,
    permission: "clients:view",
  },
  {
    nav: "/recipients",
    name: "المستلمين",
    icon: <img src={clientsIcon} alt="recipients" className="brightness-0" />,
    permission: "recipients:view",
  },
];

const AppSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const { state, setOpen, open, isMobile } = useSidebar();
  const { can } = usePrivilege();

  const sidebarItems = useMemo(() => {
    return items.filter((item) => {
      if (Array.isArray(item)) {
        return item.some((subItem) => can(subItem.permission as Privilege));
      }
      return can(item.permission as Privilege);
    });
  }, [can]);

  // if (sidebarItems.length <= 1) {
  //   return null;
  // }

  return (
    <Sidebar
      side="right"
      collapsible="icon"
      className="bg-[#E6E6E6] text-[#333333]"
    >
      <SidebarHeader className="bg-[#E6E6E6] py-10">
        <SidebarMenu>
          {!isMobile && (
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => {
                  setOpen(!open);
                }}
                className="hover:bg-transparent active:bg-transparent mb-4 w-full mr-auto flex justify-between items-center bg-[#E6E6E6] rounded-md"
              >
                <IoMdMenu size={24} className={open ? "opacity-0" : ""} />
                <IoCloseOutline size={24} className={open ? "" : "opacity-0"} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            {state !== "collapsed" ? (
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            ) : null}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-[#E6E6E6]">
        <SidebarGroup>
          <SidebarMenu className="space-y-2">
            {sidebarItems.map((item, index) => {
              if (Array.isArray(item)) {
                return (
                  <SidebarMenuItem key={index}>
                    <Collapsible key={index} className="group/collapsible">
                      <CollapsibleTrigger
                        className="w-full"
                        onClick={() => {
                          if (state === "collapsed") {
                            setOpen(true);
                          }
                        }}
                      >
                        <SidebarMenuButton
                          size="lg"
                          className="flex w-full items-center gap-2 !hover:bg-black data-[active=true]:bg-[#2281e0] hover:data-[active=true]:bg-[#2281e0] data-[active=true]:text-black data-[active=true]:invert"
                          isActive={location.pathname.startsWith("/shipments")}
                          asChild
                        >
                          <div>
                            <img
                              src={shipmentsIcon}
                              alt="shipments"
                              className="mr-1 brightness-0"
                            />
                            <span className="text-lg">الشحنات</span>
                            <ChevronDown className="mr-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="space-y-1 mt-2">
                          {item.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.name}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={location.pathname === subItem.nav}
                                className="w-full justify-start py-6 text-lg data-[active=true]:bg-[#2281e0] data-[active=true]:text-black data-[active=true]:invert"
                              >
                                <Link
                                  to={subItem.nav}
                                  className="text-[#333333]"
                                >
                                  {subItem.name}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                );
              } else {
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      size="lg"
                      asChild
                      isActive={location.pathname.startsWith(item.nav)}
                      className="w-full justify-start gap-2 data-[active=true]:bg-[#2281e0] data-[active=true]:text-black data-[active=true]:invert"
                    >
                      <Link to={item.nav} className="text-[#333333]">
                        <div className="flex items-center gap-2">
                          {item.icon}
                          <span className="text-lg">{item.name}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-[#E6E6E6]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={logout}
              className="w-full justify-start gap-2 py-5"
            >
              <img src={logOutIcon} alt="log-out" />
              <span className="text-lg">تسجيل الخروج</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
