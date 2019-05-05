<template>
    <el-form  :model="form" label-width="90px">
        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="按时间查询">
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
            <el-col :span="5" :offset="1" >
                <el-button type="primary" @click="onSearch" icon="el-icon-search">查 询</el-button>
                <el-button @click="exportExcel('#memberTable','财务日报表')" icon="el-icon-download">导 出</el-button>
            </el-col>
        </el-row>

         <el-row>
            <el-col :span="24">
                <el-table 
                    :data="searchData" 
                    id="memberTable" 
                    :cell-style="tableStyle" 
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="reportCode" label="统计日期" align="center" width="90">
                    </el-table-column>
                    <el-table-column prop="completedOrderNum" label="已支付订单数" align="center">
                    </el-table-column>
                    <el-table-column prop="weChatIncome" label="微信收入" align="center">
                    </el-table-column>
                    <el-table-column prop="alipayIncome" label="支付宝收入" align="center">
                    </el-table-column>
                    <el-table-column prop="shoppingPointsIncome" label="购物积分支付" align="center">
                    </el-table-column>
                    <el-table-column prop="orderIncomeTotal" label="订单收入合计" align="center">
                    </el-table-column>
                    <el-table-column prop="weChatRefund" label="微信退款" align="center">
                    </el-table-column>
                    <el-table-column prop="alipayRefund" label="支付宝退款" align="center">
                    </el-table-column>
                    <el-table-column prop="shoppingPointsRefund" label="购物积分退款" align="center" >
                    </el-table-column>
                    <el-table-column prop="orderExpendTotal" label="订单支出合计" align="center" >
                    </el-table-column>
                    <el-table-column prop="weChatTotal" label="微信总计" align="center">
                    </el-table-column>
                    <el-table-column prop="alipayTotal" label="支付宝总计" align="center">
                    </el-table-column>
                    <el-table-column prop="shoppingPointsTotal" label="购物积分总计" align="center">
                    </el-table-column>
                    <el-table-column prop="total" label="总计" align="center">
                    </el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                    </el-table-column>
                    <el-table-column label="操作" width="90" align="center" >
                        <template slot-scope="scope">
                            <el-button  size="mini" type="primary" @click="onSettlement(scope.row)">结 算</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="明细" width="170" align="center" >
                        <template slot-scope="scope">
                            <router-link :to="{path:'/weChatTransaction', query:{time:scope.row.reportCode}}">
                                <el-button  size="mini" type="primary">微信明细</el-button>
                            </router-link>
                            <router-link :to="{path:'/alipayTransaction', query:{time:scope.row.reportCode}}">
                                <el-button  size="mini" type="warning">支付宝明细</el-button>
                            </router-link>
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
                    :page-sizes="[10, 20, 30, 50, 999]"
                    :total="pageData.total"
                    :current-page="pageData.currentPage"
                    @current-change="onChangePage"  
                    @size-change="handleSizeChange">
                </el-pagination>
            </el-col>
        </el-row>
    </el-form>
</template>


<script>
import {ToExportExcel} from "../../../util/util.js";
export default {
    name:"dailyFinance",
    data() {
        return {
            form: {
                time:[]
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
    methods: {
        //改变页数
        onChangePage(currentPage) {
            this.pageData.currentPage = currentPage;
            this.onSearch();
        },
        //每页条数改变
        handleSizeChange(pageSize) {
            this.pageData.pageSize = pageSize;
            this.onSearch();
        },
        //表格样式
        tableStyle({row,columnIndex,rowIndex}){
            if(row.status == "未结算" && columnIndex == 14){
                return 'color:red;'
            }
        },
        //点击查询表
        onSearch() {
            this.searchData = [];
            this.loadingTable = true;  
            let transTimeS = "";
            this.$request({
                method:'post',
                url:"/apis/financial/findAccDayReportByTime",
                params:{
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    timeLeft:this.form.time[0]?this.form.time[0]:'',
                    timeRight:this.form.time[1]?this.form.time[1]:'',
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.searchData = response.data.data.list;
                    this.searchData.forEach((item)=>{
                        if(item.status == 0){
                            item.status = "未结算";
                        }else if(item.status == 1){
                            item.status = "已结算";
                        }
                        item.statisticalTime = item.statisticalTime.slice(0,10);
                    })
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.total = response.data.data.total
                }else{
                    this.$message({
                        message: response.data.msg,
                        type: 'error'
                    });
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
        },
        //结算日报表
        onSettlement(row){
            console.log(row)
            this.$confirm('是否结算 '+ row.reportCode.slice(0,10)+" 报表", '提示', {
                confirmButtonText: '确 定',
                cancelButtonText: '取 消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$request({
                    method:'get',
                    url:"/apis/financial/settlementAccDailyReport",
                    params: {
                        id: row.id,
                        date:new Date().getTime()
                    }
                })
                .then(response=>{
                    if(response.data.code){
                        this.$message({
                            showClose: true,
                            message: "结算成功!",
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            showClose: true,
                            message: response.data.msg,
                            type: 'error'
                        });
                    }
                    this.onSearch();
                })
            }).catch(() => {});
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
    },
    created() {
        this.onSearch();
    }
};
</script>


