<template>
    <el-form  :model="form" label-width="80px" label-position="left">
        <el-row>
            <el-col :span="4">
                <el-form-item label="会员编号">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="2">
                <el-form-item label="信息修改类型:" label-width="100px">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option v-for="(items,index) in select1" :key="index" :label="items" :value="items"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>      

        <el-row>
            <el-col :span="4">
                <el-form-item label="审核状态">
                    <el-select v-model="form.state" placeholder="请选择">
                        <el-option v-for="(items,index) in select2" :key="index" :label="items" :value="items"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="创建时间">
                    <el-date-picker 
                        v-model="form.time" 
                        type="daterange" 
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"
                        :picker-options="pickerOptions"
                        @change="onChangeDate">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="2">
                <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
                <el-button size="mini" @click="exportExcel">导出</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <el-table 
                :data="searchData" 
                border size="mini" 
                id="memberTable" 
                v-loading="loadingTable" 
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading">
                    <el-table-column type="index" align="center" width="50px">
                    </el-table-column>
                     <el-table-column prop="mCode" label="会员编号" sortable align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="reviewStatus" label="审核状态" align="center" width="140px"> 
                    </el-table-column>
                    <el-table-column prop="mName" label="会员姓名" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="updateType" label="修改类型" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="修改时间" sortable align="center" width="160px">
                    </el-table-column>
                    <el-table-column prop="" label="操作人" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="" label="审批人" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="updateMemo" label="修改备注" align="center">
                    </el-table-column>
                    <el-table-column prop="reviewMemo" label="审核备注" align="center">
                    </el-table-column>
                    <el-table-column label="修改详情" align="center" width="120px">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="onShowDetails(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <br>
        <el-row type="flex" justify="center">
            <el-col :span="8" align="center">
                <el-pagination
                    :page-size="pageData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="[10, 20, 30, 40,pageData.total]"
                    :total="pageData.total"
                    :current-page="pageData.currentPage"
                    @current-change="onChangePage"  
                    @size-change="handleSizeChange">
                </el-pagination>
            </el-col>
        </el-row>

        <!-- 弹出层组件 -->
        <dialog-com></dialog-com>

    </el-form>
</template>


<script>
import util from "../../../util/util.js";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
    data() {
        return {
            loadingTable:true, //加载列表
            select1:['全部','修改基本信息','修改敏感信息','会员更名','更改推荐人','更改会员级别','与老会员绑定'],
            select2:['全部','无需审核','待审','审核通过','已驳回'],
            form: {
                currentPage: "",  //当前页
                id: "", //会员编号
                name: "", //姓名
                type:"全部", //信息修改类型
                state:"全部", //审核状态
                time: ["",""] //时间
            },
            //修改记录数据
            searchData: [],
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:20,
                total:null,
            },
            //设置时间范围
            pickerOptions: {
                shortcuts: [
                {
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, 
                {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            }
        };
    },
    methods: {
        //改变页数
        onChangePage(currentPage) {
            this.form.currentPage = currentPage;
            this.onSearch();
        },
        //每页条数改变
        handleSizeChange(pageSize) {
            this.pageData.pageSize = pageSize;
            this.onSearch();
        },
        //选中日期回调
        onChangeDate( data) {
            if(data) {
                this.form.time[0] = data[0].getFullYear()+'-'+(data[0].getMonth()+1)+'-'+data[0].getDate()+' '+data[0].getHours()+':'+data[0].getMinutes()+':'+ data[0].getSeconds()
                this.form.time[1] = data[1].getFullYear()+'-'+(data[1].getMonth()+1)+'-'+data[1].getDate()+' '+data[1].getHours()+':'+data[1].getMinutes()+':'+ data[1].getSeconds()
            }
       },
        //点击查询修改记录
        onSearch() { 
            this.loadingTable = true; 
            //审核状态
            let reviewStatus = "";
            if(this.form.state=="全部"){
                reviewStatus="";
            }else if(this.form.state=="无需审核"){
                reviewStatus=3;
            }else if(this.form.state=="待审"){
                reviewStatus=0;
            }else if(this.form.state=="审核通过"){
                reviewStatus=2;
            }else if(this.form.state=="已驳回"){
                reviewStatus=1;
            }
            //信息修改类型
            let Infotype = "";
            if(this.form.type=="全部"){
                Infotype="";
            }else if(this.form.type=="修改基本信息"){
                Infotype=0;
            }else if(this.form.type=="修改敏感信息"){
                Infotype=1;
            }else if(this.form.type=="会员更名"){
                Infotype=2;
            }else if(this.form.type=="更改推荐人"){
                Infotype=3;
            }else if(this.form.type=="更改会员级别"){
                Infotype=4;
            }else if(this.form.type=="与老会员绑定"){
                Infotype=5;
            }
            //时间
            let timeStart = "";
            let timeEnd = "";
            if(this.form.time){
                timeStart = this.form.time[0];
                timeEnd = this.form.time[1];
            }
            this.$axios({
                method:'post',
                url:"/apis/member/findEditAll",
                params:{
                    currentPage:this.form.currentPage,
                    pageSize:this.pageData.pageSize,
                    mCode:this.form.id,
                    mName:this.form.name,
                    updateType:Infotype,
                    reviewStatus:reviewStatus,
                    updateTimeStar:timeStart,
                    updateTimeEnd:timeEnd,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.searchData = response.data.data.list;
                    for(var i = 0; i< this.searchData.length; i++ ){
                        if(this.searchData[i].reviewStatus==0){
                            this.searchData[i].reviewStatus="待审";
                        }else if(this.searchData[i].reviewStatus==1){
                            this.searchData[i].reviewStatus="驳回";
                        }else if(this.searchData[i].reviewStatus==2){
                            this.searchData[i].reviewStatus="审核通过";
                        }else{
                            this.searchData[i].reviewStatus="无需审核";
                        }

                        if(this.searchData[i].updateType==0){
                            this.searchData[i].updateType="修改基本信息";
                        }else if(this.searchData[i].updateType==1){
                            this.searchData[i].updateType="修改敏感信息";
                        }else if(this.searchData[i].updateType==2){
                            this.searchData[i].updateType="会员更名";
                        }else if(this.searchData[i].updateType==3){
                            this.searchData[i].updateType="更改推荐人";
                        }else if(this.searchData[i].updateType==4){
                            this.searchData[i].updateType="更改会员级别";
                        }else if(this.searchData[i].updateType==5){
                            this.searchData[i].updateType="与老会员绑定";
                        }else{
                            this.searchData[i].updateType="";
                        }
                    }
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.pageSize = response.data.data.pageSize,
                    this.pageData.total = response.data.data.total
                }else {

                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
        },
        //点击查看详情
        onShowDetails(data) {
            util.$emit("DialoChangeDetails",{
                data:data,
                showSubmit:false
            });
        },
        //表格数据导出
        exportExcel() {                  
            if(this.searchData.length==0){
                this.$message({
                    showClose: true,
                    message: '数据为空，无法导出',
                    type: 'warning'
                });
            }else {
                new Promise((resolve,reject)=>{
                    this.pageData.pageSize = this.pageData.total;
                    this.onSearch();
                    setTimeout(()=>{
                        resolve();
                    },500)
                })
                .then(()=>{
                    var wb = XLSX.utils.table_to_book(
                        document.querySelector("#memberTable")
                    );
                    var wbout = XLSX.write(wb, {
                        bookType: "xlsx",
                        bookSST: true,
                        type: "array"
                    });
                    try {
                        FileSaver.saveAs(
                            new Blob([wbout], { type: "application/octet-stream" }),
                            "修改记录列表.xlsx"
                        );
                    } catch (e) {
                        if (typeof console !== "undefined") console.log(e, wbout);
                    }
                    this.pageData.pageSize = 20;
                    this.onSearch();
                    return wbout;
                })
                
            }
        },
    },
    created() {
        this.onSearch();
    }
};
</script>

<style>
</style>
