import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (data:any, fileName = "participants.xlsx") => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write the workbook and create a Blob
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });

    saveAs(dataBlob, fileName);
    
};

export const exportToExcelAll = (data: any, fileName = "participants.xlsx") => {
    // Flatten the data for Excel
    const flattenedData = data.flatMap((team: any) => 
      team.playerNames.map((_: any, index: number) => ({
        teamID: team.teamID,
        eventName: team.eventName,
        college: team.college,
        status: team.status,
        transactionId: team.transactionId,
        amount: team.amount,
        playerName: team.playerNames[index],
        enrollment: team.enrollments[index],
        phone: team.phones[index],
        isCaptain: team.isCaptains[index]
      }))
    );
  
    const worksheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { 
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" 
    });
  
    saveAs(dataBlob, fileName);
  };