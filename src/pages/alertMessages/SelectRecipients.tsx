import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DriverList } from "../../../Api";
import leftArrowIcon from "../../assets/images/arrow-left.png";
import Pagination from "../../components/pagination/Pagination";
import SearchInput from "../../components/searchInput/SearchInput";
import SelectMenu from "../../components/SelectMenu";
import DriversTable from "../../components/usersDrivers/DriversTable";
const selectMenuOptions = [
  { label: "الكل", value: "all" },
  { label: "متاح", value: "available" },
  { label: "غير متاح", value: "notAvailable" },
];

const DriversData: DriverList[] = [
  // {
  //   id: 453,
  //   name: "محمد صالح",
  //   branch: "الصناعية الثالثة",
  //   nationality: "مصري",
  //   lastUpdate: "اليوم",
  //   label: "متاح",
  //   status: "available",
  // },
  // {
  //   id: 177,
  //   name: "علي عبد القادر ",
  //   branch: "الدمام",
  //   nationality: "يمني",
  //   lastUpdate: "اليوم",
  //   label: "متاح",
  //   status: "available",
  // },
  // {
  //   id: 826,
  //   name: "عامر بن علي",
  //   branch: "الصناعية الثالثة",
  //   nationality: "سعودي",
  //   lastUpdate: "اليوم",
  //   label: "متاح",
  //   status: "available",
  // },
  // {
  //   id: 600,
  //   name: "محمد الشافعي",
  //   branch: "الدمام",
  //   nationality: "مصري",
  //   lastUpdate: "اليوم",
  //   label: "متاح",
  //   status: "available",
  // },
  // {
  //   id: 154,
  //   name: "كامل بن على",
  //   branch: "الصناعية الثالثة",
  //   nationality: "سعودي",
  //   lastUpdate: "اليوم",
  //   label: "متاح",
  //   status: "available",
  // },
  // {
  //   id: 647,
  //   name: "محمد الشافعي",
  //   branch: "الدمام",
  //   nationality: "سعودي",
  //   lastUpdate: "اليوم",
  //   label: "غير متاح",
  //   status: "notAvailable",
  // },
  // {
  //   id: 877,
  //   name: "كامل بن على",
  //   branch: "الصناعية الثالثة",
  //   nationality: "يمني",
  //   lastUpdate: "أمس",
  //   label: "متاح",
  //   status: "available",
  // },
  // {
  //   id: 274,
  //   name: "محمد الشافعي",
  //   branch: "الدمام",
  //   nationality: "مصري",
  //   lastUpdate: "22/05/2025",
  //   label: "غير متاح",
  //   status: "notAvailable",
  // },
  // {
  //   id: 429,
  //   name: "كامل بن على",
  //   branch: "الصناعية الثالثة",
  //   nationality: "سعودي",
  //   lastUpdate: "الأسبوع الماضي",
  //   label: "متاح",
  //   status: "available",
  // },
  // {
  //   id: 740,
  //   name: "محمد الشافعي",
  //   branch: "الدمام",
  //   nationality: "سعودي",
  //   lastUpdate: "أمس",
  //   label: "متاح",
  //   status: "available",
  // },
  // {
  //   id: 409,
  //   name: "كامل بن على",
  //   branch: "الصناعية الثالثة",
  //   nationality: "مصري",
  //   lastUpdate: "اليوم",
  //   label: "متاح",
  //   status: "available",
  // },
  // {
  //   id: 169,
  //   name: "محمد الشافعي",
  //   branch: "الدمام",
  //   nationality: "مصري",
  //   lastUpdate: "اليوم",
  //   label: "غير متاح",
  //   status: "notAvailable",
  // },
];

const SelectRecipients = () => {
  const navigate = useNavigate();
  const [selectedDriverStatus, setSelectedDriverStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  // const [filteredData, setFilteredData] = useState(DriversData);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPageChange: any) => {
    setItemsPerPage(itemsPerPageChange);
    setCurrentPage(1);
  };

  // const handleSearch = () => {
  //   const filtered = DriversData.filter((driver) =>
  //     driver.name.toLowerCase().includes(searchValue.toLowerCase())
  //   );
  //   setFilteredData(filtered);
  // };

  const filteredData = DriversData.filter((driver) =>
    driver.name.toLowerCase().includes(searchValue.toLowerCase().trim()),
  );

  return (
    <div className="p-4">
      <div
        className={`flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between mb-10`}
      >
        <SearchInput
          value={searchValue}
          onChange={(e: any) => setSearchValue(e.target.value)}
        />

        <button
          className="flex items-center py-2 px-10 gap-2 rounded-lg bg-[#DD7E1F] text-[#FCFCFC] text-lg"
          onClick={() => {
            navigate("/alert-messages");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          متابعة
          <img src={leftArrowIcon} alt="continue" />
        </button>
      </div>
      <div className="shadow-xl rounded-3xl px-8 py-4">
        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">قائمة السائقين</h1>
          <SelectMenu
            options={selectMenuOptions}
            selectedItem={selectedDriverStatus}
            setSelectedItem={setSelectedDriverStatus}
          />
        </div>
        <DriversTable
          selectedStatus={selectedDriverStatus}
          data={filteredData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
        <Pagination
          totalItems={DriversData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default SelectRecipients;
