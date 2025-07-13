import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Link } from "react-router-dom";
import arrowDownIcon from "../../assets/images/arrow-down.svg";
import shipmentsIcon from "../../assets/images/box.svg";

const NavbarAccordion = ({
  items,
  title,
  selectedItem,
  // setSelectedItem,
  isSidebarOpen,
  setIsSidebarOpen,
}: any) => {
  return (
    <div className="w-full mb-2">
      <Accordion
        onClick={() => !isSidebarOpen && setIsSidebarOpen(true)}
        sx={{
          width: "100%",
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={isSidebarOpen ? <img src={arrowDownIcon} /> : null}
          aria-controls="shipment-status"
        >
          <div
            className={` flex items-center w-full ${
              isSidebarOpen
                ? "justify-start gap-2 -ms-1.5"
                : "justify-center min-w-10"
            }`}
          >
            <img src={shipmentsIcon} alt="shipments" />
            {isSidebarOpen && <span>{title}</span>}
          </div>
        </AccordionSummary>
        {isSidebarOpen && (
          <AccordionDetails>
            {Array.isArray(items) &&
              items.length > 0 &&
              items.map((item, index) => (
                <Link
                  to={item.nav}
                  key={item.name}
                  className={`flex items-center w-full ${
                    index !== items.length - 1 && "mb-4"
                  } px-3 py-2 transition-all duration-300 ${
                    isSidebarOpen ? "justify-start" : "justify-center"
                  } ${
                    selectedItem === item.nav
                      ? "bg-[#DD7E1F] text-[#FCFCFC] rounded-lg"
                      : "hover:bg-[#F9E6D2]"
                  }`}
                >
                  {isSidebarOpen && (
                    <span className={`transition-all duration-300`}>
                      {item.name}
                    </span>
                  )}
                </Link>
              ))}
          </AccordionDetails>
        )}
      </Accordion>
    </div>
  );
};

export default NavbarAccordion;
