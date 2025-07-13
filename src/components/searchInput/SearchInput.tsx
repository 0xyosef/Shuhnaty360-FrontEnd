import { ReactNode } from "react";
// import filterIcon from "../../assets/images/filter.svg";
import searchIcon from "../../assets/images/search.svg";

const SearchInput = ({
  value,
  onChange,
  styles = "",
  suffixIcon,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  styles?: string;
  suffixIcon?: ReactNode;
}) => {
  return (
    <div
      dir="rtl"
      className={`relative bg-white flex items-center border border-gray-300 rounded-md px-10 w-full max-w-sm  ${styles}`}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="ابحث هنا"
        className={`grow outline-hidden py-3 placeholder-gray-400 bg-transparent font-Rubik`}
      />
      <img
        src={searchIcon}
        alt="box Search icon"
        className="w-6 h-6 absolute right-2 cursor-pointer"
      />
      {suffixIcon && (
        <div className="w-6 h-6 absolute left-4 cursor-pointer">
          {suffixIcon}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
