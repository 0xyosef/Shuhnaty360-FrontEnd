import repeatIcon from "../../assets/images/refresh-2.svg";

const Messages = ({
  messages,
  selectedMessageIndex,
  setSelectedMessageIndex,
}: any) => {
  return (
    <div className="mt-6">
      {messages.map((message: any, index: number) => (
        <div
          onClick={() => setSelectedMessageIndex(index)}
          key={index}
          className={`my-2 p-5 cursor-pointer flex flex-col rounded-lg ${
            selectedMessageIndex === index && "bg-[#F2F2F2]"
          } transition-all duration-300`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#DD7E1F] text-lg">{message.title}</span>
            <span className="font-Rubik text-[#333333] my-2 text-xs">
              {message.date}
            </span>
          </div>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap font-Rubik text-xs">
            {message.recipients.map(
              (recipient: any, index: number) =>
                `${recipient}${index === message.recipients.length - 1 ? "" : "، "}`,
            )}
          </span>
          <span className="font-Rubik text-[#666666] my-2 text-xs">
            {message.content}
          </span>
          <div className="flex justify-end mt-1">
            <img src={repeatIcon} alt="repeat" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
