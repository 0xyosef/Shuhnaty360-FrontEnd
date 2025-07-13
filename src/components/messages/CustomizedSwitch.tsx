import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  display: "flex",
  "& .MuiSwitch-switchBase": {
    padding: 1,
    "&.Mui-checked": {
      transform: "translateX(16px)",
      "& + .MuiSwitch-track": {
        backgroundColor: "#FCFCFC",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 24,
    height: 24,
    backgroundColor: "#E6E6E6",
  },
  "& .MuiSwitch-track": {
    borderRadius: 13,
    backgroundColor: "#E6E6E6",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

interface CustomSwitchProps {
  checked: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
}

export default function CustomSwitchComponent({
  checked,
  onChange,
}: CustomSwitchProps) {
  return (
    <CustomSwitch
      sx={{
        "& .MuiSwitch-thumb": {
          backgroundColor: checked ? "#349848" : "#666666",
        },
      }}
      checked={checked}
      onChange={onChange}
    />
  );
}
