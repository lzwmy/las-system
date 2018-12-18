import FileSaver from "file-saver";
import XLSX from "xlsx";
import axios from 'axios'

/**
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



//获取全部周期
export function onGetTime(arr){
    axios({
        method:'get',
        url:"/apis/member/findPeriodAll",
        params:{
            currentPage:1,
            pageSize:10000,
            date:new Date().getTime()
        }
    })     
    .then(response=>{
        if(response.data.code){
            let year = null;
            let list = response.data.data.list;
            list.map(item=>{
                let obj1 = {
                    value : item.periodCode.slice(0,4),
                    label : item.periodCode.slice(0,4),
                    children : []
                };
                if(year != obj1['value']){
                    arr.push(obj1);
                    year = obj1['value'];
                }

                arr.forEach(element => {
                    if(element.value == item.periodCode.slice(0,4)){
                        let obj2 = {
                            value: item.periodCode.slice(4,6),
                            label: item.periodCode.slice(4,6)
                        }
                        element.children.push(obj2)
                    }
                });
            })
        }
    })
}