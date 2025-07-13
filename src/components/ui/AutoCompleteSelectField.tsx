import React, { useState } from "react";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldError,
} from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import { cn } from "../../utils/utils";

export type AutocompleteOption = {
  value: string | number;
  label?: string | number;
};

export type AutocompleteSelectFieldProps = {
  name: string;
  control: Control<any>;
  options: AutocompleteOption[];
  label?: string;
  placeholder?: string;
  error?: string | FieldError;
  disabled?: boolean;
  description?: string | string[];
  isLoading?: boolean;
  onInputChange?: (value: string) => void;
  ref?: React.RefObject<any>;
};

const AutoCompleteSelectField: React.FC<AutocompleteSelectFieldProps> = ({
  name,
  control,
  options,
  label,
  placeholder = "",
  error,
  disabled = false,
  description,
  isLoading,
  onInputChange,
  ref,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const filteredOptions = options.filter((option) =>
    option.label?.toString().toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<any, string>,
  ) => {
    if (!showOptions || filteredOptions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredOptions[highlightedIndex];
      if (selected) {
        field.onChange(selected.value);
        setInputValue(selected.label?.toString() || "");
        setShowOptions(false);
        if (onInputChange) onInputChange(selected.label?.toString() || "");
      }
    }
  };

  return (
    <div className="col-span-1 flex flex-col gap-1 relative">
      {label && (
        <label
          htmlFor={name}
          className="self-start text-xl mb-2 text-[#1A1A1A]"
        >
          {label}
        </label>
      )}
      <Controller
        // key={options.length}
        name={name}
        control={control}
        // shouldUnregister={!options.length}
        render={({ field }) => (
          <>
            <div className="relative w-full">
              <input
                id={name}
                type="text"
                className={cn(
                  "p-2 w-full text-lg border border-[#CCCCCC] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#DD7E1F]",
                  error && "border-red-500",
                  disabled && "bg-gray-100 cursor-not-allowed",
                )}
                placeholder={placeholder}
                value={
                  inputValue ||
                  (field.value
                    ? options.find((o) => o.value === field.value)?.label
                    : "")
                }
                onChange={(e) => {
                  const val = e.target.value.trim();
                  setInputValue(val);
                  setShowOptions(true);
                  setHighlightedIndex(0);
                  const matchedOption = options.find((o) => o.label === val);
                  if (!matchedOption) {
                    field.onChange(undefined);
                  }
                  if (onInputChange) onInputChange(val);
                }}
                onFocus={() => setShowOptions(true)}
                onBlur={() => setTimeout(() => setShowOptions(false), 100)}
                onKeyDown={(e) => handleKeyDown(e, field)}
                disabled={disabled}
                autoComplete="off"
              />
              <span className="pointer-events-none absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {isLoading ? (
                  <FiLoader className="animate-spin" />
                ) : (
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path
                      d="M6 8l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </div>
            {showOptions && filteredOptions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-[#CCCCCC] rounded-lg mt-24 w-full max-h-48 overflow-auto shadow-lg">
                {filteredOptions.map((option, idx) => (
                  <li
                    key={option.value}
                    className={`px-4 py-2 cursor-pointer hover:bg-[#F5F5F5] ${
                      idx === highlightedIndex ? "bg-[#F5F5F5]" : ""
                    }`}
                    onMouseDown={() => {
                      field.onChange(option.value);
                      setInputValue(option.label?.toString() || "");
                      setShowOptions(false);
                      if (onInputChange)
                        onInputChange(option.label?.toString() || "");
                    }}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                  >
                    {option.label}
                  </li>
                ))}
                <li ref={ref} className="h-0" />
                {isLoading ? (
                  <li className="px-4 py-2 flex items-center justify-center cursor-pointer hover:bg-[#F5F5F5]">
                    <FiLoader className="animate-spin" />
                  </li>
                ) : filteredOptions.length === 0 ? (
                  <li className="px-4 py-2 cursor-pointer hover:bg-[#F5F5F5]">
                    لا يوجد نتائج
                  </li>
                ) : null}
              </ul>
            )}
          </>
        )}
      />
      {error && (
        <span className="text-red-500 mt-1 text-sm">
          {typeof error === "string" ? error : error.message}
        </span>
      )}
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

export default AutoCompleteSelectField;
