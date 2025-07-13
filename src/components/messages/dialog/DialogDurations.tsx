import { useState } from "react";
import { PiSunDimLight } from "react-icons/pi";

const durations = ["يوم واحد", "3 أيام", "أسبوع"];

const DialogDurations = () => {
  const [selectedDuration, setSelectedDuration] = useState(durations[2]);

  return (
    <div className="grid grid-cols-3 gap-2 my-4 font-Rubik">
      {durations.map((duration, index) => (
        <div
          onClick={() => setSelectedDuration(duration)}
          key={index}
          className={`px-4 py-7 rounded-xl transition-all duration-300 col-span-1 flex flex-col items-center gap-2 ${
            selectedDuration === duration
              ? "bg-[#DD7E1F] text-[#FCFCFC]"
              : "text-[#DD7E1F]"
          }`}
        >
          <PiSunDimLight size={32} />
          <span className="text-nowrap">{duration}</span>
        </div>
      ))}
    </div>
  );
};

export default DialogDurations;
