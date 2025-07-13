import { useState } from "react";

const times = ["6 ساعات", "12 ساعة", "24 ساعة"];

const sharedStyles = [
  "border-r-[#864D13] border-[#FCF2E9]",
  "border-r-[#DD7E1F] border-[#F2F2F2]",
];

const borderStyles = [
  {
    selected: sharedStyles[0],
    unselected: sharedStyles[1],
    transform: "rotate(-45deg)",
  },
  {
    selected: `border-t-[#864D13] ${sharedStyles[0]}`,
    unselected: `border-t-[#DD7E1F] ${sharedStyles[1]}`,
    transform: "rotate(-315deg)",
  },
  {
    selected: "border-[#864D13]",
    unselected: "border-[#DD7E1F]",
    transform: "",
  },
];

const getStyles = (index: number, isSelected: boolean) => {
  const { selected, unselected } = borderStyles[index];
  return `absolute inset-0 rounded-full border-8 transition-all duration-300 ${
    isSelected ? selected : unselected
  }`;
};

const DialogTimes = () => {
  const [selectedTime, setSelectedTime] = useState(times[0]);

  return (
    <div className="grid grid-cols-1 place-items-center sm:grid-cols-3 my-4 font-Rubik">
      {times.map((time, index) => (
        <div
          key={index}
          className={`col-span-1 p-4 rounded-xl transition-all duration-300 ${
            selectedTime === time ? "bg-[#DD7E1F]" : ""
          }`}
          onClick={() => setSelectedTime(time)}
        >
          <div className="flex items-center justify-center w-24 h-24 relative text-[#DD7E1F]">
            <div
              className={getStyles(index, selectedTime === time)}
              style={{
                transform: borderStyles[index].transform,
              }}
            ></div>
            <span
              className={`text-sm transition-all duration-300 ${
                selectedTime === time ? "text-[#FCFCFC]" : ""
              }`}
            >
              {time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DialogTimes;
