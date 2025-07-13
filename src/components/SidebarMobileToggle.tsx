import { IoMdMenu } from "react-icons/io";
import { useSidebar } from "./ui/sidebar";

const SidebarMobileToggle = () => {
  const { isMobile, setOpenMobile } = useSidebar();

  return isMobile ? (
    <button
      onClick={() => {
        console.log("open");
        setOpenMobile(true);
      }}
      className="fixed top-4 right-4 z-50 p-2 bg-[#E6E6E6] rounded-md"
    >
      <IoMdMenu size={24} />
    </button>
  ) : null;
};

export default SidebarMobileToggle;
