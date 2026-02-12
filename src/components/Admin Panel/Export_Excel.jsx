import * as XLSX from 'xlsx';

const exportToExcel = (data, fileName) => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Convert the data array to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); // "Sheet1" is the name of the sheet

  // Write the workbook and trigger a download
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export default exportToExcel;