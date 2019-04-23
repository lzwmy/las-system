import FileSaver from "file-saver";
import XLSX from "xlsx";
import request from "./request.js";

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




/**
 * 获取全部周期
 * @param {*} arr 
 */
export function onGetTime(arr){
    request({
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

/**
 *number保留指定小数位
 *
 * @export
 * @param {*} num  数字
 * @param {*} len  保留的长度,默认保留2位
 * @returns
 */
export function sliceNum(num,len = 2) {    
    let numFloat = parseFloat(num);    
    if (isNaN(numFloat)) {    
        return false;    
    }    
    numFloat = Math.round(num*100)/100;  
    let numS = numFloat.toString();    
    if (numS.indexOf('.') < 0) {    
        numS += '.';    
    }    
    while (len) {    
        numS += '0';
        len--;   
    }    
    return numS;    
} 

/**
 *
 *数组对象去重
 * @export
 * @param {*} arr  去重数组
 * @param {*} key  判断去重的值
 * @returns
 */
export function removeRepeat(arr,key){
    if(arr.length == 0){
        return arr;
    }
    for(let i = 0; i < arr.length; i++) {
		for(let j = i+1; j < arr.length; j++) {
			if(arr[i][key] === arr[j][key]){
				arr.splice(j, 1);
				j = j-1;  // 关键，因为splice()删除元素之后，会使得数组长度减小，此时如果没有j=j-1的话，会导致相同id项在重复两次以上之后无法进行去重，且会错误删除id没有重复的项。
			}
		}
	}
    return arr;
}