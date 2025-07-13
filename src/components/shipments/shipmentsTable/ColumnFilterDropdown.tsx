// ColumnFilterDropdown.jsx
import React from "react";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import { MdCancelPresentation } from "react-icons/md";

export function ColumnFilterDropdown({
  options,
  selectedValues,
  onChange,
  onClose,
  isPickupDate,
  loadingAtSort,
  setLoadingAtSort,
  placeholder = "ابحث...",
}: any) {
  const [search, setSearch] = React.useState("");
  return (
    <div className="absolute left-0 z-50 bg-white border p-4 rounded-lg shadow-lg w-60 mt-3">
      <input
        className="w-full mb-2 border rounded-sm px-2 py-1"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {isPickupDate && (
        <div className="w-full flex items-center justify-between mb-2">
          <div className="flex flex-col items-start font-Rubik font-medium">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setLoadingAtSort("asc")}
            >
              <span
                style={{
                  fontSize: 10,
                  lineHeight: 1,
                  color: loadingAtSort === "asc" ? "#DD7E1F" : "#aaa",
                }}
              >
                <HiSortAscending
                  size={16}
                  className={`${loadingAtSort === "asc" ? "#DD7E1F" : "text-gray-500"}`}
                />
              </span>
              <span>تصاعدي</span>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setLoadingAtSort("desc")}
            >
              <span
                style={{
                  fontSize: 10,
                  lineHeight: 1,
                  color: loadingAtSort === "desc" ? "#DD7E1F" : "#aaa",
                }}
              >
                <HiSortDescending
                  size={16}
                  className={`${loadingAtSort === "desc" ? "#DD7E1F" : "text-gray-500"}`}
                />
              </span>
              <span>تنازلي</span>
            </div>
          </div>
          {loadingAtSort && (
            <div
              className="flex items-center gap-1 cursor-pointer font-Rubik font-medium"
              onClick={() => setLoadingAtSort(undefined)}
              style={{
                fontSize: 12,
                lineHeight: 1,
                color: "#CC2222",
                marginTop: 2,
              }}
            >
              <span>
                <MdCancelPresentation color="#CC2222" size={16} />
              </span>
              <span className="text-sm">إلغاء الترتيب</span>
            </div>
          )}
        </div>
      )}
      <div style={{ maxHeight: 140, overflowY: "auto" }}>
        {options
          .filter(
            (opt: any) =>
              opt &&
              opt.toString().toLowerCase().includes(search.toLowerCase()),
          )
          .map((opt: any) => (
            <div key={opt} className="mb-2 flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedValues.includes(opt)}
                onChange={(e) => {
                  onChange(
                    e.target.checked
                      ? [...selectedValues, opt]
                      : selectedValues.filter((v: any) => v !== opt),
                  );
                }}
              />
              <span className="font-medium font-Rubik">{opt}</span>
            </div>
          ))}
      </div>
      <div className="grid grid-cols-2 gap-4 w-full font-Rubik font-medium mt-2">
        <button
          className="col-span-1 bg-[#DD7E1F] text-[#FCFCFC] border border-[#DD7E1F] py-1 rounded-lg"
          onClick={onClose}
        >
          تأكيد
        </button>
        <button
          className="col-span-1 bg-[#FCFCFC] text-[#DD7E1F] border border-[#DD7E1F] py-1 rounded-lg"
          onClick={() => onChange([])}
        >
          إعادة تعيين
        </button>
      </div>
    </div>
  );
}
