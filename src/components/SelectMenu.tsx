import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type SelectMenuProps = {
  selectedItem: string | null;
  setSelectedItem: (value: string) => void;
  options: { label?: string | number; value: string | number }[];
};

const SelectMenu = ({
  selectedItem,
  setSelectedItem,
  options,
}: SelectMenuProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedItem(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectedItem || "الكل"}
        sx={{
          color: "#666666",
          fontSize: "14px",
          justifyContent: "end",
          fontFamily: "Rubik",
        }}
        onChange={handleChange}
      >
        {options.map((option: any) => (
          <MenuItem
            key={option.label}
            value={option.label}
            sx={{
              color: "#666666",
              fontSize: "14px",
              justifyContent: "end",
              fontFamily: "Rubik",
              ":hover": { backgroundColor: "#DD7E1F", color: "#FCFCFC" },
              "&.Mui-selected": {
                backgroundColor: "#FCFCFC !important",
                color: "#666666",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#DD7E1F !important",
                color: "#FCFCFC",
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectMenu;
