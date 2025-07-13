import React from "react";

type TableFilterProps = {
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
};

const TableFilter: React.FC<TableFilterProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder,
}) => {
  const handleOptionChange = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="border rounded-sm p-2 w-full"
      />
      <div className="absolute z-10 bg-white border rounded-sm shadow-lg mt-1 w-full">
        {options.map((option) => (
          <label key={option} className="block p-2 hover:bg-gray-100">
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              onChange={() => handleOptionChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TableFilter;
