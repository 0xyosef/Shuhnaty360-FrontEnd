import React from "react";
import { cn } from "../../utils/utils";

export type TextAreaFieldProps = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
  description?: string;
  name?: string;
  error?: string;
  containerClassName?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextAreaField = ({
  placeholder = "",
  label,
  description,
  value,
  onChange,
  name,
  containerClassName,
  className,
  error,
  ...props
}: TextAreaFieldProps) => {
  return (
    <div className={cn("col-span-1 flex flex-col gap-1", containerClassName)}>
      {label && (
        <label
          htmlFor={props.id}
          className="self-start text-xl mb-2 text-[#1A1A1A]"
        >
          {label}
        </label>
      )}
      <textarea
        id={props.id}
        placeholder={placeholder}
        className={cn(
          "p-2 text-lg border rounded-lg border-[#CCCCCC] resize-none! focus:outline-hidden focus:ring-1 focus:ring-[#DD7E1F]",
          error && "border-red-500",
          className,
        )}
        value={value}
        onChange={onChange}
        name={name}
        {...props}
      />
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

export default TextAreaField;
