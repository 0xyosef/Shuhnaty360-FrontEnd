import React from "react";

export type SelectFieldProps = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  label?: string;
  description?: string | string[];
  name?: string;
  error?: string;
  options: { value: string | number; label?: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectField = ({
  value,
  onChange,
  placeholder = "",
  label,
  description,
  name,
  error,
  options,
  ...props
}: SelectFieldProps) => {
  return (
    <div className="col-span-1 flex flex-col gap-1">
      {label && (
        <label
          htmlFor={props.id}
          className="self-start text-xl mb-2 text-[#1A1A1A]"
        >
          {label}
        </label>
      )}
      <select
        id={props.id}
        name={name}
        value={value}
        onChange={onChange}
        className={`p-3 text-lg border ${
          error ? "border-red-500" : "border-[#CCCCCC]"
        } rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#DD7E1F] bg-white`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 mt-1 text-sm">{error}</span>}
      {description && (
        <div className="text-[#999] font-Rubik text-sm">
          {Array.isArray(description) ? (
            <ul className="list-disc list-inside">
              {description.map((desc, index) => (
                <li key={index} className="text-[#666666]">
                  {desc}
                </li>
              ))}
            </ul>
          ) : (
            <span>{description}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectField;
