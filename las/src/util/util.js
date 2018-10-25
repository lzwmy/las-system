import FileSaver from "file-saver";
import XLSX from "xlsx";

/**
 * 
 * @param {*} dom 表格dom
 * @param {*} title  导出标题
 */
export function ToExportExcel(dom,title){
    var wb = XLSX.utils.table_to_book(
        document.querySelector(dom)
    );
    var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
    });
    try {
        FileSaver.saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
            title+".xlsx"
        );
    } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
    }
    return wbout;
}