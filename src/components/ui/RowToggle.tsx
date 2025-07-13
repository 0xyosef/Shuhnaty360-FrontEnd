import { cn } from "../../utils/utils";

interface RowToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  disabled?: boolean;
}

const RowToggle = ({ checked, onChange, id, disabled }: RowToggleProps) => (
  <label
    className={cn(
      "relative inline-block w-12 h-7 transition-colors duration-200 bg-gray-300",
      checked && "bg-[#DD7E1F]",
      "rounded-full",
      disabled && "opacity-50 cursor-not-allowed",
    )}
    onClick={(e) => e.stopPropagation()}
    style={{ cursor: disabled ? "not-allowed" : "pointer" }}
  >
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => {
        e.stopPropagation();
        onChange(e.target.checked);
      }}
      className="sr-only peer"
      disabled={disabled}
      tabIndex={0}
    />
    <span
      className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
        checked ? "translate-x-5" : ""
      }`}
    />
  </label>
);

export default RowToggle;
