<template>
    <el-form label-width="90px" label-position="left">
        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="按入库时间">
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
            <el-col :span="4" :offset="1" :xs="6" :sm="6" :md="6" :lg="5" :xl="4">
                <el-form-item label="入库单号"><el-input v-model="form.whCode" @keyup.enter.native="onSearch" clearable></el-input></el-form-item>
            </el-col>
            <el-col :span="5" :offset="1" >
                <el-button type="primary" @click="onSearch" icon="el-icon-search">查 询</el-button>
                <el-button type="danger" @click="exportExcel('#memberTable','进货单审核表')" icon="el-icon-download">导 出</el-button>
            </el-col>                  
        </el-row>
        <el-row>
            <el-col :span="4" :xs="7" :sm="7" :md="6" :lg="5">
                <el-form-item label="仓库名称"><el-input v-model="form.whName" @keyup.enter.native="onSearch" clearable></el-input></el-form-item>
            </el-col>
            <el-col :span="4" :offset="1" :xs="7" :sm="7" :md="6" :lg="5">
                <el-form-item label="入库类型">
                    <el-select v-model="form.type">
                        <el-option label="采购入库" value="PAW"></el-option>
                        <el-option label="调拨入库" value="TOW"></el-option>
                        <el-option label="盘盈入库" value="PFW"></el-option>
                        <el-option label="其他入库" value="OAW"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1"  :xs="7" :sm="7">
                <el-form-item label="入库总计:"><span>xx单/xx,000.00元</span> </el-form-item>
            </el-col>
        </el-row>

         <el-row>
            <el-col :span="24">
                <el-table 
                    :data="searchData" 
                    id="memberTable" 
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="autohrizeTime" label="入库时间" align="center">
                    </el-table-column>
                    <el-table-column prop="wareCode" label="入库单号" align="center">
                    </el-table-column>
                    <el-table-column prop="wareName" label="仓库名称" align="center">
                    </el-table-column>
                    <el-table-column prop="adjustType" label="类型" align="center">
                    </el-table-column>
                    <el-table-column prop="wareAmount" label="入库单金额" align="center">
                    </el-table-column>
                    <el-table-column label="入库清单" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" type="success" @click="onRead(scope.row.wId)">查 看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="入库发票" align="center">
                        <template slot-scope="scope">
                            <el-button  size="mini" type="success" @click="onEnclosure(scope.row.wId)">查 看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="操作人" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="审批人" align="center">
                    </el-table-column>
                    <el-table-column prop="autohrizeDesc" label="备注" align="center">
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
                    :page-sizes="[10, 20, 30, 50,999]"
                    :total="pageData.total"
                    :current-page="pageData.currentPage"
                    @current-change="onChangePage"  
                    @size-change="handleSizeChange">
                </el-pagination>
            </el-col>
        </el-row>
        <!-- 弹出层组件 -->
        <tableCom ref="dialog"></tableCom>
    </el-form>
</template>


<script>
import {ToExportExcel} from "../../util/util.js";
import tableCom from './dialogCom';
export default {
    name:"stockForm",
    data() {
        return {
            form:{
                whCode:"",
                whName:"",
                type:"",
                time:[],
            },
            loadingTable:false, //加载列表
            searchData: [], //列表数据
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:0,
            },
            //设置时间范围
            pickerOptions: {
                shortcuts: [{
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
    components:{
        tableCom
    },
    methods: {
        //表格数据导出
        exportExcel(dom,title) {  
            if(this.searchData.length==0){
                this.$message({
                    showClose: true,
                    message: '数据为空，无法导出',
                    type: 'warning'
                });
            }else {
                ToExportExcel(dom,title);       
            }
        },
        //改变页数
        onChangePage(currentPage) {
            this.pageData.currentPage = currentPage;
            this.onSearch();
        },
        //选中日期回调
        onChangeDate(data) {
            if(data) {
                let month1 = data[0].getMonth()+1<10? "0"+ (data[0].getMonth()+1): data[0].getMonth()+1;
                let month2 = data[1].getMonth()+1<10? "0"+ (data[1].getMonth()+1): data[1].getMonth()+1;
                let day1 = data[0].getDate()<10? "0"+ data[0].getDate(): data[0].getDate();
                let day2 = data[1].getDate()<10? "0"+ data[1].getDate(): data[1].getDate();
                this.form.time[0] = data[0].getFullYear()+'-'+month1+'-'+ day1;
                this.form.time[1] = data[1].getFullYear()+'-'+month2+'-'+ day2;
            }
        },
        //每页条数改变
        handleSizeChange(pageSize) {
            this.pageData.pageSize = pageSize;
            this.onSearch();
        },
        //点击查询表
        onSearch() {
            this.searchData = [];
            this.loadingTable = true;  
            let transTimeS = "";
            if(this.form.time[0]){
                transTimeS = this.form.time[0]+'/'+this.form.time[1];
            }else{
                transTimeS = "";
            }
            this.$request({
                method:'post',
                url:"/apis/member/findWareInto",
                params:{
                    inTimeS:transTimeS,
                    wareCode:this.form.whCode,
                    wareName:this.form.whName,
                    currentPage:this.pageData.currentPage,
                    adjustType:this.form.type,
                    pageSize:this.pageData.pageSize,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.searchData = response.data.data.list;
                    for(let i in this.searchData){
                        if(this.searchData[i].adjustType=="PAW"){
                            this.searchData[i].adjustType = "采购入库";
                        }else if(this.searchData[i].adjustType=="TOW"){
                            this.searchData[i].adjustType = "调拨入库";
                        }else if(this.searchData[i].adjustType=="PFW"){
                            this.searchData[i].adjustType = "盘盈入库";
                        }else if(this.searchData[i].adjustType=="OAW"){
                            this.searchData[i].adjustType = "其他入库";
                        }
                    }
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.pageSize = response.data.data.pageSize,
                    this.pageData.total = response.data.data.total
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
        },
        //查看清单
        onRead(wId){
            this.$refs.dialog.showTable(wId);
        },
        //查看发票
        onEnclosure(wId){
            this.$refs.dialog.showImg({
                wId:wId,
                sign:1
            });
        }
       
    },
    created() {
        this.onSearch();
    }
};
</script>


