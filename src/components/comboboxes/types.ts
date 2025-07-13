import { ComboboxProps } from "../ui/Combobox";

export interface ComboboxOption {
  value: string | number;
  label: string | React.ReactNode;
}

export interface BaseComboboxProps
  extends Omit<ComboboxProps, "options" | "onChange"> {
  onChange?: (value: string | number) => void;
}
