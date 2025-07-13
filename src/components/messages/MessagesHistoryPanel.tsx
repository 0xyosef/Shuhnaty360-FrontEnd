import { useState } from "react";
import SearchInput from "../searchInput/SearchInput";
import Messages from "./Messages";

const MessagesHistoryPanel = ({
  data,
  index,
  setIndex,
  selectedCategory,
  setSelectedCategory,
}: any) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="col-span-1 lg:col-span-3 relative">
      <div className="p-6 flex items-center">
        {[
          { label: "مرة واحدة", value: "once" },
          { label: "مكررة", value: "repeated" },
        ].map((item: any, index: number) => (
          <button
            onClick={() => setSelectedCategory(item.value)}
            key={index}
            className={`w-1/2 text-lg transition-all duration-300 ${
              selectedCategory === item.value
                ? "text-[#DD7E1F] border-b-4 border-[#DD7E1F]"
                : "text-[#666666] border-b-2 border-[#CCCCCC]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <SearchInput
        value={searchValue}
        onChange={(e: any) => setSearchValue(e.target.value)}
        styles="rounded-2xl!"
      />
      <Messages
        messages={data}
        selectedMessageIndex={index}
        setSelectedMessageIndex={setIndex}
      />
      <div className="absolute -left-8 top-0 bottom-0 w-px bg-[#DD7E1F] hidden lg:block"></div>
    </div>
  );
};

export default MessagesHistoryPanel;
