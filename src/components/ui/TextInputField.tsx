import { cn } from "../../utils/utils";

export type TextInputFieldProps = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  description?: string;
  name?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextInputField = ({
  type = "text",
  placeholder = "",
  label,
  description,
  value,
  onChange,
  name,
  error,
  disabled,
  ...props
}: TextInputFieldProps) => {
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
      <input
        id={props.id}
        type={type}
        placeholder={placeholder}
        className={cn(
          "p-2 text-lg border border-[#CCCCCC] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#DD7E1F]",
          error && "border-red-500",
          disabled && "bg-gray-100 cursor-not-allowed",
        )}
        value={value?.toString()}
        onChange={onChange}
        name={name}
        autoComplete="off"
        disabled={disabled}
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

export default TextInputField;
