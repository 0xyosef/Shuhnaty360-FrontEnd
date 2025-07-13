import { Control, Controller, FieldError } from "react-hook-form";
import { cn } from "../../utils/utils";

interface ToggleProps {
  name: string;
  control: Control<any>;
  label?: string;
  error?: string | FieldError;
  id?: string;
  description?: string | string[];
  disabled?: boolean;
}

const Toggle = ({
  name,
  control,
  label,
  error,
  id,
  description,
  disabled,
}: ToggleProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-1">
          <label
            htmlFor={id || name}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <span
              className={cn(
                "relative inline-block w-12 h-7 transition-colors duration-200 bg-gray-300",
                field.value && "bg-[#DD7E1F]",
                "rounded-full",
              )}
            >
              <input
                type="checkbox"
                id={id || name}
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className="sr-only peer"
                disabled={disabled}
              />
              <span
                className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  field.value ? "translate-x-5" : ""
                }`}
              />
            </span>
            {label && <span className="text-lg">{label}</span>}
          </label>
          {error && (
            <span className="text-red-500 text-sm">
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
      )}
    />
  );
};

export default Toggle;
