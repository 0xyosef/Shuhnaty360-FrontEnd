import React from "react";

type TableRowProps = {
  index: number;
  children: React.ReactNode;
  onClick?: () => void;
};

const TableRow = ({ index, children, onClick }: TableRowProps) => {
  return (
    <tr
      className={`rounded-lg ${index % 2 === 0 && "bg-[#F2F2F2]"}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {children}
    </tr>
  );
};

export default TableRow;
