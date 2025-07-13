import TableCell from "./TableCell";
import TableRow from "./TableRow";

type TableNoDataRowProps = {
  span?: number;
};

const TableNoDataRow = ({ span = 1 }: TableNoDataRowProps) => {
  return (
    <TableRow index={1}>
      <TableCell colSpan={span} className="text-center py-4">
        لا توجد بيانات لعرضها
      </TableCell>
    </TableRow>
  );
};

export default TableNoDataRow;
