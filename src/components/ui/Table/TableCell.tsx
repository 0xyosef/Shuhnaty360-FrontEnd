import { cn } from "../../../utils/utils";

type TableCellProps = {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
  onClick?: () => void;
};

const TableCell = ({
  className,
  children,
  colSpan,
  onClick,
}: TableCellProps) => {
  return (
    <td
      colSpan={colSpan}
      className={cn(
        "py-2 px-4 text-right text-nowrap max-w-52 text-ellipsis overflow-hidden",
        className,
      )}
      onClick={onClick}
    >
      {children || "-"}
    </td>
  );
};

export default TableCell;
