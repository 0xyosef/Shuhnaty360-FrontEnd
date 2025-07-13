import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div
      dir="rtl"
      className="my-8 flex flex-col md:flex-row justify-between gap-4 md:gap-0 md:items-center"
    >
      <div className="flex items-center">
        <span className="me-2 text-[#666666]">عرض النتائج:</span>
        <FormControl sx={{ minWidth: 70 }} size="small">
          <Select
            labelId="items-per-page-select-label "
            id="items-per-page-select"
            value={itemsPerPage}
            onChange={(e) => {
              onItemsPerPageChange(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 20, 30].map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{
                  justifyContent: "end",
                  fontFamily: "Rubik",
                  ":hover": { backgroundColor: "#DD7E1F", color: "#FCFCFC" },
                  "&.Mui-selected": {
                    backgroundColor: "#FCFCFC !important",
                    color: "#1A1A1A",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#DD7E1F !important",
                    color: "#FCFCFC",
                  },
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setCurrentPage(currentPage - 1);
              onPageChange(currentPage - 1);
            }}
            disabled={currentPage === 1}
            className="text-[#DD7E1F] disabled:text-gray-400"
          >
            السابق
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(index + 1);
                onPageChange(index + 1);
              }}
              className={`px-3.5 font-bold py-1.5 text-center text-sm rounded-lg ${
                currentPage === index + 1
                  ? "bg-[#DD7E1F] text-[#FCFCFC]"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => {
              setCurrentPage(currentPage + 1);
              onPageChange(currentPage + 1);
            }}
            disabled={currentPage === totalPages}
            className="text-[#DD7E1F] disabled:text-gray-400"
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
