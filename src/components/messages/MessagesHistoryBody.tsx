import { useState } from "react";
import CustomSwitchComponent from "./CustomizedSwitch";
import { useNavigate } from "react-router-dom";
import MessageTitleAccordion from "./MessageTitleAccordion";
import repeatIcon from "../../assets/images/refresh-3.svg";
import sendIcon from "../../assets/images/send.svg";
import RepeatMessageDialog from "./dialog/RepeatMessageDialog";

const MessagesHistoryBody = ({ data, index, selectedCategory }: any) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  return (
    <div className="w-full lg:ps-16 py-2">
      <div className="w-full flex justify-between items-center mb-4">
        <span className="text-[#333333] text-base">إرسال إلى:</span>
        <button
          onClick={() => navigate("/alert-messages/select-recipients")}
          className="text-[#DD7E1F] font-Rubik text-sm underline"
        >
          تعديل
        </button>
      </div>
      {data[index] && (
        <h1 className="overflow-hidden text-ellipsis whitespace-nowrap font-Rubik text-sm text-[#666666]">
          {data[index].recipients.join("، ")}
        </h1>
      )}
      {selectedCategory === "repeated" && (
        <div
          className={`flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 sm:gap-0 ${
            isChecked
              ? "bg-[#67CB7B] text-[#FCFCFC]"
              : "bg-[#CCC] text-[#666666]"
          } p-2 font-Rubik text-sm mt-4`}
        >
          <span>رسالة كل 6 ساعات لمدة أسبوع</span>
          <span>باقٍ على الانتهاء: 3 أيام و19 ساعة</span>
          <CustomSwitchComponent
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
        </div>
      )}
      <div className="flex flex-col gap-6 text-[#FCFCFC] font-Rubik mt-8 bg-[#ECF8EF] sm:px-6 py-2">
        {data[index] && (
          <>
            {Array.isArray(data[index].messages) &&
              Array.from({ length: 4 }).map((_, i) => {
                const message = data[index].messages[0];
                return (
                  <div
                    key={i}
                    className="bg-[#DD7E1F] p-2 sm:p-4 rounded-xl sm:w-80"
                  >
                    <h1 className="mb-4 ">{message.content}</h1>
                    <p className="text-end text-xs">{message.time}</p>
                  </div>
                );
              })}
          </>
        )}
      </div>

      <div className="mt-10 mb-4">
        <MessageTitleAccordion />
      </div>
      <div>
        <input
          type="text"
          placeholder="أدخل نص الرسالة"
          className="w-full p-2 border-none rounded-lg outline-hidden font-Rubik"
        />
        <div
          className={`mt-6 flex justify-end items-center ${
            selectedCategory === "repeated" && "gap-4"
          }`}
        >
          {selectedCategory === "repeated" && (
            <button onClick={() => setIsDialogVisible(true)}>
              {" "}
              <img src={repeatIcon} alt="repeat" />
            </button>
          )}
          <button className="bg-[#DD7E1F] p-2 rounded-full">
            <img src={sendIcon} alt="send" />
          </button>
        </div>
      </div>
      <RepeatMessageDialog
        isDialogVisible={isDialogVisible}
        setIsDialogVisible={setIsDialogVisible}
      />
    </div>
  );
};

export default MessagesHistoryBody;
