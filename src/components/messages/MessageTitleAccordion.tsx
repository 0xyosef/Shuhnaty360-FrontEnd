import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "../../assets/images/arrow.svg";
import { useState } from "react";

const messageTitleOptions = [
  "شحنة متأخرة",
  "شحنة ملغية",
  "مشكلة في المستندات",
  "تصرف غير لائق",
  "خصم من الراتب",
  "حالة طارئة",
];

const MessageTitleAccordion = () => {
  const [messageSelectedTitle, setMessageSelectedTitle] = useState("");
  return (
    <div>
      <Accordion className="rounded-2xl!">
        <AccordionSummary
          expandIcon={<img src={ExpandMoreIcon} />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="bg-[#FCF2E9]! rounded-2xl!"
        >
          <span className="text-[#DD7E1F]">
            {messageSelectedTitle || "اختر عنوانًا للرسالة"}
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-4">
            {messageTitleOptions.map((option, index) => (
              <span
                key={index}
                onClick={() => setMessageSelectedTitle(option)}
                className="text-[#DD7E1F] cursor-pointer"
              >
                {option}
              </span>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MessageTitleAccordion;
