import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MessagesHistoryBody from "../../components/messages/MessagesHistoryBody";
import MessagesHistoryPanel from "../../components/messages/MessagesHistoryPanel";
import NoSelectedMessages from "../../components/messages/NoSelectedMessages";

const messageHistoryData = [
  {
    title: "شحنة متأخرة",
    date: "6/1/2025",
    recipients: [
      "طارق سمير",
      "محمد خالد",
      "إسلام محمد",
      "محمد صالح",
      "سالم محمد",
      "خالد علي",
      "طارق سمير",
      "محمد خالد",
      "إسلام محمد",
      "محمد صالح",
      "سالم محمد",
      "خالد علي",
      "طارق سمير",
      "محمد خالد",
      "إسلام محمد",
      "محمد صالح",
      "سالم محمد",
      "خالد علي",
    ],
    messages: [
      {
        content:
          "برجاء إرجاع الفواتير الخاصة بالشحنات المتأخرة لتفادي الخصم من الراتب",
        time: "8:45 ص",
      },
    ],
  },
  {
    title: "شحنة متأخرة",
    date: "6/1/2025",
    recipients: [
      "إسلام محمد",
      "محمد صالح",
      "سالم محمد",
      "خالد علي",
      "طارق سمير",
      "محمد خالد",
      "إسلام محمد",
      "محمد صالح",
      "سالم محمد",
      "خالد علي",
      "طارق سمير",
      "محمد خالد",
      "إسلام محمد",
      "محمد صالح",
      "سالم محمد",
      "خالد علي",
      "طارق سمير",
      "محمد خالد",
    ],
    messages: [
      {
        content:
          "برجاء إرجاع الفواتير الخاصة بالشحنات المتأخرة لتفادي الخصم من الراتب",
        time: "8:45 ص",
      },
    ],
  },
  {
    title: "شحنة متأخرة",
    date: "6/1/2025",
    recipients: [
      "خالد علي",
      "طارق سمير",
      "محمد خالد",
      "إسلام محمد",
      "محمد صالح",
      "سالم محمد",
      "خالد علي",
      "طارق سمير",
      "محمد خالد",
      "إسلام محمد",
      "محمد صالح",
      "سالم محمد",
      "خالد علي",
      "طارق سمير",
      "محمد خالد",
      "إسلام محمد",
      "محمد صالح",
      "سالم محمد",
    ],
    messages: [
      {
        content:
          "برجاء إرجاع الفواتير الخاصة بالشحنات المتأخرة لتفادي الخصم من الراتب",
        time: "8:45 ص",
      },
    ],
  },
  {
    title: "شحنة متأخرة",
    date: "6/1/2025",
    recipients: [
      "سالم محمد",
      "خالد علي",
      "طارق سمير",
      "محمد خالد",
      "إسلام محمد",
      "محمد صالح",
      "سالم محمد",
      "خالد علي",
      "طارق سمير",
      "محمد خالد",
      "إسلام محمد",
      "محمد صالح",
      "سالم محمد",
      "خالد علي",
      "طارق سمير",
      "محمد خالد",
      "إسلام محمد",
      "محمد صالح",
    ],
    messages: [
      {
        content:
          "برجاء إرجاع الفواتير الخاصة بالشحنات المتأخرة لتفادي الخصم من الراتب",
        time: "8:45 ص",
      },
    ],
  },
  {
    title: "شحنة متأخرة",
    date: "6/1/2025",
    recipients: [
      "محمد صالح",
      "سالم محمد",
      "خالد علي",
      "طارق سمير",
      "محمد خالد",
      "إسلام محمد",
      "محمد صالح",
      "سالم محمد",
      "خالد علي",
      "طارق سمير",
      "محمد خالد",
      "إسلام محمد",
      "محمد صالح",
      "سالم محمد",
      "خالد علي",
      "طارق سمير",
      "محمد خالد",
      "إسلام محمد",
    ],
    messages: [
      {
        content:
          "برجاء إرجاع الفواتير الخاصة بالشحنات المتأخرة لتفادي الخصم من الراتب",
        time: "8:45 ص",
      },
    ],
  },
];

const AlertMessages = () => {
  const [selectedCategory, setSelectedCategory] = useState("repeated");
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<
    null | number
  >(null);
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 lg:ms-4 border border-[#DD7E1F] rounded-2xl px-4 mx-4 lg:mx-0">
      {" "}
      <MessagesHistoryPanel
        data={messageHistoryData}
        index={selectedMessageIndex}
        selectedCategory={selectedCategory}
        setIndex={setSelectedMessageIndex}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="col-span-1 lg:col-span-9">
        {selectedMessageIndex !== null ? (
          <MessagesHistoryBody
            data={messageHistoryData}
            index={selectedMessageIndex}
            selectedCategory={selectedCategory}
          />
        ) : (
          <NoSelectedMessages />
        )}
      </div>
      <button
        onClick={() => {
          navigate("/alert-messages/select-recipients");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`p-3 rounded-full bg-[#DD7E1F] fixed bottom-12 transition-all duration-300 lg:right-40`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M36.6666 12.3841V22.3841C36.6666 24.8841 35.8332 26.9675 34.3666 28.4341C32.9166 29.8841 30.8333 30.7174 28.3333 30.7174V34.2675C28.3333 35.6008 26.8499 36.4008 25.7499 35.6675L18.3333 30.7174H14.7999C14.9333 30.2174 14.9999 29.7008 14.9999 29.1675C14.9999 27.4675 14.3499 25.9008 13.2833 24.7175C12.0833 23.3508 10.2999 22.5008 8.33325 22.5008C6.46659 22.5008 4.76659 23.2675 3.54993 24.5175C3.39993 23.8508 3.33325 23.1341 3.33325 22.3841V12.3841C3.33325 7.38411 6.66659 4.05078 11.6666 4.05078H28.3333C33.3333 4.05078 36.6666 7.38411 36.6666 12.3841Z"
            stroke="#FCFCFC"
            stroke-width="2.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.0001 29.1667C15.0001 29.7 14.9334 30.2167 14.8001 30.7167C14.6501 31.3833 14.3834 32.0333 14.0334 32.6C12.8834 34.5333 10.7667 35.8333 8.33341 35.8333C6.61675 35.8333 5.06674 35.1833 3.90008 34.1166C3.40008 33.6833 2.96673 33.1667 2.63339 32.6C2.01673 31.6 1.66675 30.4167 1.66675 29.1667C1.66675 27.3667 2.38342 25.7167 3.55009 24.5167C4.76676 23.2667 6.46675 22.5 8.33341 22.5C10.3001 22.5 12.0834 23.35 13.2834 24.7167C14.3501 25.9 15.0001 27.4667 15.0001 29.1667Z"
            stroke="#FCFCFC"
            stroke-width="2.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.8167 29.1328H5.8501"
            stroke="#FCFCFC"
            stroke-width="2.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.3335 26.6992V31.6825"
            stroke="#FCFCFC"
            stroke-width="2.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.1667 17.5H25.8334"
            stroke="#FCFCFC"
            stroke-width="2.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default AlertMessages;
