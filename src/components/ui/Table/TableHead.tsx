import { cn } from "../../../utils/utils";

export type TableColumn = {
  key: string;
  label: string;
  className?: string;
};

type TableHeadProps = {
  columns: TableColumn[];
};

const TableHead = ({ columns }: TableHeadProps) => {
  return (
    <thead>
      <tr className="py-2 px-4 text-right text-nowrap border-b-2 border-[#CCCCCC]">
        {columns.map((col, index) => {
          return (
            <th
              key={col.key}
              className={cn("px-4 py-2 text-left font-medium", col.className)}
            >
              <div
                className={cn(
                  `font-bold flex items-center gap-1 ${index === columns.length - 1 && "ms-4"}`,
                  col.className,
                )}
              >
                {col.label}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
