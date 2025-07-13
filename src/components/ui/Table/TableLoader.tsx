import { Skeleton } from "../skeleton";
import TableCell from "./TableCell";
import TableRow from "./TableRow";

type TableNoDataRowProps = {
  span?: number;
};

const TableLoader = ({ span = 1 }: TableNoDataRowProps) => {
  return (
    <>
      {[...Array(5)].map((_, rowIndex) => (
        <TableRow key={rowIndex} index={1}>
          {[...Array(span)].map((_, cellIndex) => (
            <TableCell key={cellIndex}>
              <Skeleton className="h-4 w-full my-2" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableLoader;
