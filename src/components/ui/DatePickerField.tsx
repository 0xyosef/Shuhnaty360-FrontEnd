import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Control, Controller, FieldError } from "react-hook-form";
import { cn } from "../../utils/utils";

export type DatePickerFieldProps = {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  error?: string | FieldError;
  description?: string | string[];
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  timeFormat?: string;
  className?: string;
};

const CalendarIcon = () => (
  <svg
    className="end-2 absolute translate-y-2"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M8 2V5"
      stroke="#999999"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 2V5"
      stroke="#999999"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 9.08984H20.5"
      stroke="#999999"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
      stroke="#999999"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.6947 13.6992H15.7037"
      stroke="#999999"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.6947 16.6992H15.7037"
      stroke="#999999"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.9955 13.6992H12.0045"
      stroke="#999999"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.9955 16.6992H12.0045"
      stroke="#999999"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.29431 13.6992H8.30329"
      stroke="#999999"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.29431 16.6992H8.30329"
      stroke="#999999"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  name,
  control,
  label,
  placeholder = "",
  error,
  description,
  minDate,
  maxDate,
  disabled = false,
  dateFormat = "YYYY-MM-dd",
  showTimeSelect = false,
  timeFormat = "HH:mm",
  className = "",
}) => {
  return (
    <div className="col-span-1 flex flex-col gap-1">
      {label && (
        <label
          htmlFor={name}
          className="self-start text-xl mb-2 text-[#1A1A1A]"
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            id={name}
            selected={field.value ? new Date(field.value) : null}
            onChange={(date) => {
              field.onChange(date?.toISOString());
            }}
            onBlur={field.onBlur}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            dateFormat={dateFormat}
            showTimeSelect={showTimeSelect}
            timeFormat={timeFormat}
            placeholderText={placeholder}
            icon={<CalendarIcon />}
            popperPlacement="bottom-start"
            showIcon
            // popperContainer={({ children }) => <div dir="ltr">{children}</div>}
            // calendarIconClassName="end-2 center"
            className={cn(
              "p-2 text-lg border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#DD7E1F] w-full",
              error ? "border-red-500" : "border-[#CCCCCC]",
              disabled && "bg-gray-100 cursor-not-allowed",
              className,
            )}
            autoComplete="off"
          />
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

export default DatePickerField;
