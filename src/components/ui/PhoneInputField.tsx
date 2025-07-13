import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Control, useController } from "react-hook-form";

export type PhoneInputFieldProps = {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  error?: string;
  description?: string | string[];
  disabled?: boolean;
  value?: string | undefined;
  countryCodePlaceholder?: string;
};

const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  name,
  control,
  label,
  placeholder = "5xxxxxxxx",
  error,
  description,
  disabled,
  value,
  countryCodePlaceholder = "+966",
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: value,
  });

  const [countryCode, setCountryCode] = useState("+966");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const val =
      field.value && field.value?.trim() !== "+966" ? field.value : value;
    if (val && val !== `${countryCode}${phoneNumber}`) {
      const match = val.match(/^(\+\d{1,3})/);
      if (match) {
        setCountryCode(match[1]);
        setPhoneNumber(val.replace(match[1], ""));
      } else {
        setPhoneNumber(val);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value, value]);

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9+]/g, "");
    const cleanValue = value
      .replace(/^\+*/, "+")
      .replace(/\+/g, (_match, offset) => (offset === 0 ? "+" : ""));
    setCountryCode(cleanValue);
    const fullNumber = cleanValue + phoneNumber;
    field.onChange(fullNumber);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhoneNumber(value);
    const fullNumber = countryCode + value;
    field.onChange(fullNumber);
  };

  return (
    <div className="col-span-1 overflow-hidden flex flex-col gap-1">
      {label && (
        <label
          htmlFor={name}
          className="self-start text-xl mb-2 text-[#1A1A1A]"
        >
          {label}
        </label>
      )}
      <div
        dir="ltr"
        className={cn(
          "flex overflow-hidden gap-2 bg-white text-lg border border-[#CCCCCC] rounded-lg focus-within:ring-1 focus-within:ring-[#DD7E1F]",
          error && "border-red-500",
        )}
      >
        <input
          type="tel"
          value={countryCode}
          onChange={handleCountryCodeChange}
          placeholder={countryCodePlaceholder}
          disabled={disabled}
          className="max-w-16 shrink p-2 focus:outline-hidden "
        />
        <div
          className={cn("h-full w-[.1rem] bg-[#CCCCCC]", error && "bg-red-500")}
        />
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          disabled={disabled}
          className="grow px-2 focus:outline-hidden "
        />
      </div>
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

export default PhoneInputField;
