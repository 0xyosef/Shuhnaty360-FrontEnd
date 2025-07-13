import * as XLSX from "xlsx";

export const exportToExcel = (data: any[], fileName: string) => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Convert data to worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Generate Excel file and trigger download
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};
